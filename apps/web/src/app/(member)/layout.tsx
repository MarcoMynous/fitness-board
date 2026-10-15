import React from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { validateSession } from '@repo/auth';
import { DashboardLayoutClient } from '@/components/dashboard/DashboardLayoutClient';

export const dynamic = 'force-dynamic';

export default async function MemberLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('fitness_session_token')?.value;

  const user = await validateSession(sessionToken);

  if (!user) {
    redirect('/sign-in');
  }

  return (
    <DashboardLayoutClient user={user as any}>
      {children}
    </DashboardLayoutClient>
  );
}
