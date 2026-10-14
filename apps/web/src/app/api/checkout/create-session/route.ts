import { NextRequest, NextResponse } from 'next/server';
import { createCheckoutSession } from '@repo/payments';
import { ProductSlugSchema } from '@repo/domain';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const productSlug = ProductSlugSchema.parse(body.productSlug);
    const email = body.email ? String(body.email) : undefined;
    const origin = req.nextUrl.origin;
    const currency = body.currency === 'USD' ? 'USD' : 'NGN';

    const result = await createCheckoutSession({
      productSlug,
      email,
      originUrl: origin,
      currency,
    });

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to initialize checkout' },
      { status: 400 }
    );
  }
}
