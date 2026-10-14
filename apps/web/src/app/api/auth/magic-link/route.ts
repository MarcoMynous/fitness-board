import { NextRequest, NextResponse } from 'next/server';
import { requestMagicLink } from '@repo/auth';
import { RequestMagicLinkSchema } from '@repo/domain';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parseResult = RequestMagicLinkSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        { error: parseResult.error.errors[0]?.message || 'Invalid email address' },
        { status: 400 }
      );
    }

    const origin = req.nextUrl.origin;
    const ipAddress = req.headers.get('x-forwarded-for') || undefined;
    const userAgent = req.headers.get('user-agent') || undefined;

    const result = await requestMagicLink({
      email: parseResult.data.email,
      ipAddress,
      userAgent,
      originUrl: origin,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error requesting magic link:', error);
    return NextResponse.json(
      { error: 'An error occurred while generating your sign-in link.' },
      { status: 500 }
    );
  }
}
