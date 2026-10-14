import { NextRequest, NextResponse } from 'next/server';
import { verifyPaystackWebhookSignature, processSuccessfulPayment } from '@repo/payments';
import { ProductSlug } from '@repo/domain';

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-paystack-signature');

    const isValid = verifyPaystackWebhookSignature(rawBody, signature);
    if (!isValid) {
      console.warn('Invalid Paystack webhook signature rejected');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    const event = JSON.parse(rawBody);

    if (event.event === 'charge.success') {
      const data = event.data;
      const reference = data.reference;
      const customerEmail = data.customer?.email;
      const amount = data.amount;
      const productSlug = (data.metadata?.productSlug || 'bundle') as ProductSlug;
      const origin = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

      console.log(`Processing verified Paystack charge for ${customerEmail} (ref: ${reference})`);

      await processSuccessfulPayment({
        checkoutSessionId: reference,
        customerEmail,
        productSlug,
        amountInCents: amount,
        originUrl: origin,
        source: 'stripe_checkout',
      });
    }

    return NextResponse.json({ status: 'success' });
  } catch (error: any) {
    console.error('Error handling Paystack webhook:', error);
    return NextResponse.json(
      { error: error.message || 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
