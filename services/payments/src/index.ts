import Stripe from 'stripe';
import crypto from 'crypto';
import { eq } from 'drizzle-orm';
import { db, users, payments, entitlements, magicLinkTokens, auditEvents } from '@repo/database';
import { PRODUCTS, ProductSlug } from '@repo/domain';
import { sendPurchaseReceiptEmail } from '@repo/email';
import { initializePaystackPayment } from './paystack';

export * from './paystack';



const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
export const stripe = stripeSecretKey
  ? new Stripe(stripeSecretKey, { apiVersion: '2025-02-24.acacia' as any })
  : null;

export async function createCheckoutSession({
  productSlug,
  email,
  originUrl,
  currency = 'NGN',
}: {
  productSlug: ProductSlug;
  email?: string;
  originUrl: string;
  currency?: 'NGN' | 'USD';
}) {
  const product = PRODUCTS[productSlug];
  if (!product) {
    throw new Error(`Invalid product slug: ${productSlug}`);
  }

  // 1. Paystack Integration
  if (process.env.PAYSTACK_SECRET_KEY) {
    if (!email) {
      return {
        mode: 'checkout_redirect' as const,
        url: `${originUrl}/checkout/initiate?product=${productSlug}`,
      };
    }

    const callbackUrl = `${originUrl}/checkout/paystack-callback?product=${productSlug}`;
    const amountInKoboOrCents =
      currency === 'NGN' ? product.priceInNgn * 100 : product.priceInCents;

    const paystackResult = await initializePaystackPayment({
      email,
      amountInKoboOrCents,
      currency,
      callbackUrl,
      productSlug,
    });

    if (paystackResult.mode === 'paystack') {
      return {
        mode: 'paystack' as const,
        url: paystackResult.authorizationUrl,
        reference: paystackResult.reference,
      };
    }
  }

  // 2. Stripe Checkout
  if (stripe) {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: email,

    line_items: [
      {
        price_data: {
          currency: product.currency,
          product_data: {
            name: product.name,
            description: product.description,
          },
          unit_amount: product.priceInCents,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    metadata: {
      productSlug,
    },
    success_url: `${originUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${originUrl}/#pricing`,
  });

    return {
      mode: 'stripe' as const,
      url: session.url,
      sessionId: session.id,
    };
  }

  // 3. Fallback to simulation
  return {
    mode: 'simulation' as const,
    simulatedUrl: `${originUrl}/checkout/simulate?product=${productSlug}${email ? `&email=${encodeURIComponent(email)}` : ''}`,
    product,
  };
}


export async function processSuccessfulPayment({
  checkoutSessionId,
  customerEmail,
  productSlug,
  amountInCents,
  originUrl,
  source = 'stripe_checkout',
}: {
  checkoutSessionId: string;
  customerEmail: string;
  productSlug: ProductSlug;
  amountInCents: number;
  originUrl: string;
  source?: 'stripe_checkout' | 'simulation';
}) {
  const normalizedEmail = customerEmail.trim().toLowerCase();
  const product = PRODUCTS[productSlug];

  if (!product) {
    throw new Error(`Product not found: ${productSlug}`);
  }

  // 1. Idempotency Check: check if payment record already exists
  const existingPayment = await db.query.payments.findFirst({
    where: eq(payments.stripeCheckoutSessionId, checkoutSessionId),
  });

  if (existingPayment) {
    console.log(`Payment already processed for checkout session ${checkoutSessionId}. Skipping.`);
    return { success: true, alreadyProcessed: true };
  }

  // 2. Ensure User exists or create new user
  let user = await db.query.users.findFirst({
    where: eq(users.email, normalizedEmail),
  });

  if (!user) {
    const [newUser] = await db
      .insert(users)
      .values({
        email: normalizedEmail,
        role: 'member',
        status: 'active',
        onboardingCompleted: false,
      })
      .returning();
    user = newUser;
  }

  // 3. Record Payment
  await db.insert(payments).values({
    userId: user.id,
    customerEmail: normalizedEmail,
    stripeCheckoutSessionId: checkoutSessionId,
    productSlug,
    amountInCents,
    currency: product.currency,
    status: source === 'simulation' ? 'simulated' : 'succeeded',
  });

  // 4. Grant Entitlements
  const now = new Date();
  for (const entitlementType of product.entitlements) {
    // Check if user already has an active entitlement for this type
    const existingEntitlement = await db.query.entitlements.findFirst({
      where: (e, { and, eq }) => and(eq(e.userId, user!.id), eq(e.accessType, entitlementType)),
    });

    if (!existingEntitlement) {
      await db.insert(entitlements).values({
        userId: user.id,
        accessType: entitlementType,
        status: 'active',
        source: productSlug === 'bundle' ? 'bundle' : source,
        startsAt: now,
      });
    } else if (existingEntitlement.status !== 'active') {
      await db
        .update(entitlements)
        .set({ status: 'active', revokedAt: null, revokedReason: null, updatedAt: now })
        .where(eq(entitlements.id, existingEntitlement.id));
    }
  }

  // 5. Generate and send Magic Link Sign-In Link
  const rawToken = crypto.randomBytes(32).toString('hex');
  const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex');
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour for initial purchase link

  await db.insert(magicLinkTokens).values({
    tokenHash,
    email: normalizedEmail,
    userId: user.id,
    expiresAt,
    consumedAt: null,
  });

  const verifyUrl = `${originUrl}/auth/verify?token=${rawToken}`;
  const amountFormatted = `$${(amountInCents / 100).toFixed(2)}`;

  await sendPurchaseReceiptEmail({
    email: normalizedEmail,
    productName: product.name,
    amountFormatted,
    verifyUrl,
  });

  // 6. Record Audit Event
  await db.insert(auditEvents).values({
    actorType: 'system',
    action: 'payment.completed',
    targetType: 'user',
    targetId: user.id,
    metadata: {
      checkoutSessionId,
      productSlug,
      amountInCents,
      entitlements: product.entitlements,
    },
  });

  return {
    success: true,
    user,
    verifyUrl,
  };
}
