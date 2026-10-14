import { NextRequest, NextResponse } from 'next/server';
import { verifyPaystackTransaction, processSuccessfulPayment } from '@repo/payments';
import { ProductSlug } from '@repo/domain';

export async function POST(req: NextRequest) {
  try {
    const { reference, productSlug } = await req.json();

    if (!reference) {
      return NextResponse.json({ error: 'Transaction reference is required' }, { status: 400 });
    }

    const paystackData = await verifyPaystackTransaction(reference);

    if (!paystackData.status || paystackData.data?.status !== 'success') {
      return NextResponse.json(
        { error: 'Payment was not successful or could not be verified by Paystack' },
        { status: 400 }
      );
    }

    const customerEmail = paystackData.data.customer?.email;
    const amountInCentsOrKobo = paystackData.data.amount;
    const origin = req.nextUrl.origin;
    const slug = (productSlug || paystackData.data.metadata?.productSlug || 'bundle') as ProductSlug;

    const result = await processSuccessfulPayment({
      checkoutSessionId: reference,
      customerEmail,
      productSlug: slug,
      amountInCents: amountInCentsOrKobo,
      originUrl: origin,
      source: 'stripe_checkout', // standard verified payment
    });

    return NextResponse.json({
      success: true,
      verifyUrl: result.verifyUrl,
      reference,
    });
  } catch (error: any) {
    console.error('Error verifying Paystack transaction:', error);
    return NextResponse.json(
      { error: error.message || 'Verification failed' },
      { status: 500 }
    );
  }
}
