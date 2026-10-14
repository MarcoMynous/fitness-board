import { NextRequest, NextResponse } from 'next/server';
import { validateSession } from '@repo/auth';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const sessionToken = req.cookies.get('fitness_session_token')?.value;
    const user = await validateSession(sessionToken);

    if (!user) {
      return NextResponse.json({ authenticated: false, user: null });
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        onboardingCompleted: user.onboardingCompleted,
        profile: user.profile,
        entitlements: user.entitlements.map((e) => ({
          accessType: e.accessType,
          status: e.status,
          startsAt: e.startsAt,
          endsAt: e.endsAt,
        })),
      },
    });
  } catch (err: any) {
    console.error('Error in /api/auth/me:', err);
    return NextResponse.json({ authenticated: false, user: null }, { status: 500 });
  }
}
