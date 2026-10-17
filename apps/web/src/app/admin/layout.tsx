import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { validateSession } from '@repo/auth';
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Dumbbell,
  History,
  ExternalLink,
  ShieldCheck,
  LogOut,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Platform Operations & Control — Creator Fitness',
  description: 'Operational admin dashboard for members, payments, entitlements, and content.',
};

export const dynamic = 'force-dynamic';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('fitness_session_token')?.value;
  const user = await validateSession(sessionToken);

  // In production, ensure user has admin role
  if (!user) {
    redirect('/sign-in?reason=unauthorized');
  }

  if (user.role !== 'admin') {
    redirect('/home');
  }

  const navItems = [
    { label: 'Overview', href: '/admin', icon: LayoutDashboard },
    { label: 'Users & Entitlements', href: '/admin/users', icon: Users },
    { label: 'Payments', href: '/admin/payments', icon: CreditCard },
    { label: 'Content CMS', href: '/admin/content', icon: Dumbbell },
    { label: 'Activity & Audit', href: '/admin/activity', icon: History },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1C1A18] flex flex-col md:flex-row font-sans">
      {/* Left Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-[#E7E2DA] flex flex-col justify-between shrink-0 shadow-xs">
        <div>
          {/* Brand Header */}
          <div className="h-16 px-6 border-b border-[#E7E2DA] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded bg-[#9a4023] text-white flex items-center justify-center font-bold text-xs font-serif shadow-xs">
                M
              </span>
              <div className="flex flex-col">
                <span className="font-bold text-xs tracking-wider text-[#1C1A18]">
                  METHOD ADMIN
                </span>
                <span className="text-[10px] text-[#635F5B] uppercase tracking-wider">
                  Operations Console
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-[#635F5B] hover:text-[#1C1A18] hover:bg-[#F1F5F9] rounded-lg transition-colors"
                >
                  <Icon className="w-4 h-4 text-[#635F5B]" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-[#E7E2DA] space-y-2">
          <Link
            href="/home"
            className="flex items-center justify-between px-3 py-2 text-xs font-medium text-[#635F5B] hover:text-[#1C1A18] hover:bg-[#F1F5F9] rounded-lg transition-colors"
          >
            <span>View Member App</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <form action="/api/auth/sign-out" method="POST">
            <button
              type="submit"
              className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
            >
              <span>Sign Out</span>
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-[#E7E2DA] px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#635F5B] uppercase tracking-wider">
              Platform Administration
            </span>
            <span className="text-stone-300">•</span>
            <span className="text-xs text-[#9a4023] font-medium font-mono">
              {user.email}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live Deployment
            </span>
          </div>
        </header>

        {/* Page Container */}
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}
