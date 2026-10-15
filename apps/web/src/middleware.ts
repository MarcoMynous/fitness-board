import { NextRequest, NextResponse } from 'next/server';

// Protected route paths requiring active authentication
const PROTECTED_PREFIXES = [
  '/home',
  '/training',
  '/cookbook',
  '/progress',
  '/profile',
  '/onboarding',
];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const sessionToken = req.cookies.get('fitness_session_token')?.value;

  const isProtectedRoute = PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );

  // 1. If trying to access protected route without a session token, redirect to sign-in
  if (isProtectedRoute && !sessionToken) {
    const signInUrl = new URL('/sign-in', req.url);
    signInUrl.searchParams.set('reason', 'unauthorized');
    return NextResponse.redirect(signInUrl);
  }

  // 2. If already logged in and visiting sign-in, redirect directly to member dashboard
  if (pathname === '/sign-in' && sessionToken) {
    return NextResponse.redirect(new URL('/home', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/home/:path*',
    '/training/:path*',
    '/cookbook/:path*',
    '/progress/:path*',
    '/profile/:path*',
    '/onboarding/:path*',
    '/sign-in',
  ],
};
