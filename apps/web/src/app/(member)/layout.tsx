import React from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { validateSession } from '@repo/auth';
import { Dumbbell, Utensils, TrendingUp, User, Home, LogOut } from 'lucide-react';

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

  if (!user.onboardingCompleted) {
    redirect('/onboarding');
  }

  const navItems = [
    { label: 'Home', href: '/home', icon: Home },
    { label: 'Training', href: '/training', icon: Dumbbell },
    { label: 'Cookbook', href: '/cookbook', icon: Utensils },
    { label: 'Progress', href: '/progress', icon: TrendingUp },
    { label: 'Profile', href: '/profile', icon: User },
  ];

  return (
    <div className="min-h-screen bg-surface-base text-stone-primary flex flex-col pb-20 md:pb-0">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-surface-base/90 backdrop-blur-md border-b border-stone-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/home" className="flex items-center gap-2 group">
            <span className="w-8 h-8 rounded-lg bg-brand-burgundy text-white flex items-center justify-center font-bold text-sm tracking-wider font-serif">
              M
            </span>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-base tracking-tight text-stone-primary">
                THE METHOD
              </span>
              <span className="text-[10px] tracking-widest uppercase text-stone-secondary font-medium">
                Member Area
              </span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-2 text-sm font-medium text-stone-secondary hover:text-stone-primary transition-colors py-1"
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Profile Mini Badge & Sign Out */}
          <div className="flex items-center gap-3">
            <Link
              href="/profile"
              className="text-xs text-stone-secondary hover:text-stone-primary font-medium hidden sm:block"
            >
              {user.profile?.displayName || user.email}
            </Link>
            <form action="/api/auth/sign-out" method="POST">
              <button
                type="submit"
                className="p-2 text-stone-secondary hover:text-stone-primary hover:bg-stone-sunken rounded-lg transition-colors"
                title="Sign out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Main Page Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 md:py-10">
        {children}
      </main>

      {/* Mobile Bottom Tab Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-border md:hidden">
        <div className="grid grid-cols-5 h-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center justify-center gap-1 text-[11px] font-medium text-stone-secondary hover:text-brand-burgundy transition-colors active:scale-95"
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
