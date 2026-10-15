import crypto from 'crypto';
import { db, users, payments, magicLinkTokens, sessions, entitlements, profiles, auditEvents, eq, and, gt, isNull } from '@repo/database';
import { sendMagicLinkEmail } from '@repo/email';
import { checkRateLimit } from './ratelimit';
import { verifyTurnstileToken } from './turnstile';

export * from './ratelimit';
export * from './turnstile';
export * from './better-auth';

export function hashToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex');
}

export function generateToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

const TOKEN_EXPIRY_MINUTES = 15;
const SESSION_EXPIRY_DAYS = 30;

export async function requestMagicLink({
  email,
  ipAddress,
  userAgent,
  originUrl,
  turnstileToken,
}: {
  email: string;
  ipAddress?: string;
  userAgent?: string;
  originUrl: string;
  turnstileToken?: string | null;
}) {
  const normalizedEmail = email.trim().toLowerCase();

  // 1. Bot Verification via Cloudflare Turnstile
  if (turnstileToken !== undefined) {
    const turnstileResult = await verifyTurnstileToken({
      token: turnstileToken,
      remoteIp: ipAddress,
    });
    if (!turnstileResult.success) {
      return {
        success: false,
        error: turnstileResult.error || 'Bot verification failed. Please try again.',
      };
    }
  }

  // 2. Rate Limiting via Redis (or in-memory sliding window)
  const rateLimitKey = ipAddress ? `ip:${ipAddress}` : `email:${normalizedEmail}`;
  const rateLimit = await checkRateLimit(`magic_link:${rateLimitKey}`, 5, 600);

  if (!rateLimit.success) {
    return {
      success: false,
      error: 'Too many requests. Please wait a few minutes before requesting another sign-in link.',
    };
  }

  // 3. Look up user or check pending payment
  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, normalizedEmail),
  });


  // Always return generic success to prevent email enumeration
  // But if user does not exist yet (no purchase made), we can still record/issue or log
  // If the user hasn't purchased, they shouldn't get an active member session
  // However, for first-time purchasers whose user record was created by Stripe webhook, existingUser exists.
  let userId: string | null = null;

  if (existingUser) {
    userId = existingUser.id;
  } else {
    // If user doesn't exist, check if there's any completed payment for this email
    const payment = await db.query.payments.findFirst({
      where: eq(payments.customerEmail, normalizedEmail),
    });

    if (payment) {
      // Create user on-the-fly if payment was confirmed
      const [newUser] = await db
        .insert(users)
        .values({
          email: normalizedEmail,
          role: 'member',
          status: 'active',
          onboardingCompleted: false,
        })
        .returning();
      userId = newUser.id;
    }
  }

  // Generate single-use opaque token
  const rawToken = generateToken();
  const tokenHash = hashToken(rawToken);
  const expiresAt = new Date(Date.now() + TOKEN_EXPIRY_MINUTES * 60 * 1000);

  // Store hashed token in database
  await db.insert(magicLinkTokens).values({
    tokenHash,
    email: normalizedEmail,
    userId: userId || undefined,
    expiresAt,
    consumedAt: null,
    ipAddress,
    userAgent,
  });

  const verifyUrl = `${originUrl}/auth/verify?token=${rawToken}`;

  let emailDeliveryNotice: string | null = null;
  try {
    await sendMagicLinkEmail({
      email: normalizedEmail,
      verifyUrl,
    });
  } catch (err: any) {
    emailDeliveryNotice = err?.message || 'Email delivery error';
    console.warn('[Magic Link Email Notice]:', emailDeliveryNotice);
  }

  // Audit event
  await db.insert(auditEvents).values({
    actorType: 'system',
    action: 'magic_link.requested',
    targetType: 'user',
    targetId: userId || normalizedEmail,
    metadata: { email: normalizedEmail, ipAddress, deliveryNotice: emailDeliveryNotice },
    ipAddress,
  });

  return {
    success: true,
    message: emailDeliveryNotice
      ? `SMTP notice: ${emailDeliveryNotice}`
      : 'A secure access link has been dispatched to your inbox.',
    deliveryNotice: emailDeliveryNotice,
    devVerifyUrl: verifyUrl,
  };
}

export async function verifyMagicLinkToken({
  token,
}: {
  token: string;
}) {
  const tokenHash = hashToken(token);
  const now = new Date();

  // Atomically claim the token: find where token_hash matches, not consumed, not expired
  const [consumedToken] = await db
    .update(magicLinkTokens)
    .set({ consumedAt: now })
    .where(
      and(
        eq(magicLinkTokens.tokenHash, tokenHash),
        isNull(magicLinkTokens.consumedAt),
        gt(magicLinkTokens.expiresAt, now)
      )
    )
    .returning();

  if (!consumedToken) {
    return {
      success: false,
      error: 'This sign-in link is invalid or has already expired. Please request a new link.',
    };
  }

  // Find or create the user
  let user = consumedToken.userId
    ? await db.query.users.findFirst({
        where: eq(users.id, consumedToken.userId),
        with: {
          profile: true,
          entitlements: true,
        },
      })
    : await db.query.users.findFirst({
        where: eq(users.email, consumedToken.email),
        with: {
          profile: true,
          entitlements: true,
        },
      });

  if (!user) {
    // Check if user should be created
    const [newUser] = await db
      .insert(users)
      .values({
        email: consumedToken.email,
        role: 'member',
        status: 'active',
        onboardingCompleted: false,
      })
      .returning();

    user = {
      ...newUser,
      profile: null as any,
      entitlements: [],
    };
  }

  // Update user lastSeenAt
  await db
    .update(users)
    .set({ lastSeenAt: now })
    .where(eq(users.id, user.id));

  // Create session
  const sessionToken = generateToken();
  const sessionExpiresAt = new Date(Date.now() + SESSION_EXPIRY_DAYS * 24 * 60 * 60 * 1000);

  await db.insert(sessions).values({
    sessionToken,
    userId: user.id,
    expiresAt: sessionExpiresAt,
    lastActiveAt: now,
  });

  // Record audit
  await db.insert(auditEvents).values({
    actorId: user.id,
    actorType: user.role === 'admin' ? 'admin' : 'user',
    action: 'auth.magic_link_verified',
    targetType: 'user',
    targetId: user.id,
    metadata: { email: user.email },
  });

  return {
    success: true,
    sessionToken,
    user,
    route: !user.onboardingCompleted ? '/onboarding' : '/home',
  };
}

export async function validateSession(sessionToken?: string | null) {
  if (!sessionToken) return null;

  const now = new Date();
  const session = await db.query.sessions.findFirst({
    where: and(
      eq(sessions.sessionToken, sessionToken),
      gt(sessions.expiresAt, now)
    ),
    with: {
      user: {
        with: {
          profile: true,
          entitlements: true,
        },
      },
    },
  });

  if (!session || !session.user || session.user.status !== 'active') {
    return null;
  }

  return session.user;
}

export async function revokeSession(sessionToken: string) {
  await db.delete(sessions).where(eq(sessions.sessionToken, sessionToken));
}
