import { NextRequest, NextResponse } from 'next/server';
import { verifyMagicLinkToken } from '@repo/auth';

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token');

  if (!token) {
    return NextResponse.redirect(new URL('/sign-in?error=missing_token', req.url));
  }

  const result = await verifyMagicLinkToken({ token });

  if (!result.success || !result.sessionToken) {
    return NextResponse.redirect(
      new URL('/sign-in?error=expired_or_invalid', req.url)
    );
  }

  const destination = result.route || '/home';
  const response = NextResponse.redirect(new URL(destination, req.url));

  // Set secure session cookie
  response.cookies.set({
    name: 'fitness_session_token',
    value: result.sessionToken,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  });

  return response;
}
