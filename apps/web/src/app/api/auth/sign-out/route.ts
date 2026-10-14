import { NextRequest, NextResponse } from 'next/server';
import { revokeSession } from '@repo/auth';

export async function POST(req: NextRequest) {
  const sessionToken = req.cookies.get('fitness_session_token')?.value;
  if (sessionToken) {
    try {
      await revokeSession(sessionToken);
    } catch (e) {
      console.error('Error revoking session:', e);
    }
  }

  const response = NextResponse.json({ success: true, redirect: '/' });
  response.cookies.delete('fitness_session_token');
  return response;
}
