import crypto from 'crypto';
import { ProductSlug, PRODUCTS } from '@repo/domain';

const PAYSTACK_BASE_URL = 'https://api.paystack.co';

export interface InitializePaystackParams {
  email: string;
  amountInKoboOrCents: number;
  currency?: 'NGN' | 'USD';
  callbackUrl: string;
  productSlug: ProductSlug;
}

export async function initializePaystackPayment({
  email,
  amountInKoboOrCents,
  currency = 'NGN',
  callbackUrl,
  productSlug,
}: InitializePaystackParams) {
  const secretKey = process.env.PAYSTACK_SECRET_KEY;

  if (!secretKey) {
    // Return simulated checkout if key is not set
    return {
      mode: 'simulation' as const,
      simulatedUrl: `${new URL(callbackUrl).origin}/checkout/simulate?product=${productSlug}&email=${encodeURIComponent(email)}`,
    };
  }

  const response = await fetch(`${PAYSTACK_BASE_URL}/transaction/initialize`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${secretKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      amount: amountInKoboOrCents,
      currency,
      callback_url: callbackUrl,
      metadata: {
        productSlug,
        custom_fields: [
          {
            display_name: 'Product',
            variable_name: 'product_name',
            value: PRODUCTS[productSlug]?.name || productSlug,
          },
        ],
      },
    }),
  });

  const data = await response.json();

  if (!data.status) {
    throw new Error(data.message || 'Failed to initialize Paystack transaction');
  }

  return {
    mode: 'paystack' as const,
    authorizationUrl: data.data.authorization_url,
    accessCode: data.data.access_code,
    reference: data.data.reference,
  };
}

export async function verifyPaystackTransaction(reference: string) {
  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  if (!secretKey) {
    throw new Error('Paystack secret key is not configured');
  }

  const response = await fetch(`${PAYSTACK_BASE_URL}/transaction/verify/${reference}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${secretKey}`,
    },
  });

  const data = await response.json();
  return data;
}

export function verifyPaystackWebhookSignature(
  rawBody: string,
  signatureHeader?: string | null
): boolean {
  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  if (!secretKey || !signatureHeader) return false;

  const hash = crypto.createHmac('sha512', secretKey).update(rawBody).digest('hex');
  return hash === signatureHeader;
}
