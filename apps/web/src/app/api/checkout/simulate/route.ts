import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { processSuccessfulPayment } from '@repo/payments';
import { ProductSlugSchema, PRODUCTS } from '@repo/domain';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const productSlug = ProductSlugSchema.parse(body.productSlug);
    const email = String(body.email || '').trim().toLowerCase();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email address is required' }, { status: 400 });
    }

    const product = PRODUCTS[productSlug];
    const origin = req.nextUrl.origin;
    const mockSessionId = `sim_cs_${crypto.randomBytes(16).toString('hex')}`;

    const result = await processSuccessfulPayment({
      checkoutSessionId: mockSessionId,
      customerEmail: email,
      productSlug,
      amountInCents: product.priceInCents,
      originUrl: origin,
      source: 'simulation',
    });

    return NextResponse.json({
      success: true,
      verifyUrl: result.verifyUrl,
      sessionId: mockSessionId,
    });
  } catch (error: any) {
    console.error('Error in simulated checkout:', error);
    return NextResponse.json(
      { error: error.message || 'Payment simulation failed' },
      { status: 500 }
    );
  }
}
