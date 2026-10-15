'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Dumbbell,
  Utensils,
  TrendingUp,
  User,
  HelpCircle,
  LogOut,
  Menu,
  X,
  Bell,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

interface DashboardLayoutClientProps {
  user: {
    id: string;
    email: string;
    profile?: {
      fullName?: string;
      displayName?: string;
      fitnessGoal?: string;
      experienceLevel?: string;
      weeklyWorkoutTarget?: number;
    } | null;
  };
  children: React.ReactNode;
}

const NAV_ITEMS = [
  { label: 'Home', href: '/home', icon: Home },
  { label: 'Training', href: '/training', icon: Dumbbell },
  { label: 'Cookbook', href: '/cookbook', icon: Utensils },
  { label: 'Progress', href: '/progress', icon: TrendingUp },
  { label: 'Profile', href: '/profile', icon: User },
];

export const DashboardLayoutClient: React.FC<DashboardLayoutClientProps> = ({
  user,
  children,
}) => {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const displayName = user.profile?.displayName || user.profile?.fullName?.split(' ')[0] || 'Amaka';

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1d1b19] flex flex-col font-sans selection:bg-[#9a4023] selection:text-white">
      {/* ========================================================
          MOBILE OVERLAY BACKDROP
         ======================================================== */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-[#1C1A18]/60 backdrop-blur-xs z-40 lg:hidden transition-opacity"
        />
      )}

      {/* ========================================================
          SLIDING LUXURY SIDEBAR (Desktop & Mobile Drawer)
         ======================================================== */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-[#F2EDE4] border-r border-[#E4DDD3]/70 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        {/* Top: Brand Header & Navigation */}
        <div className="flex flex-col p-6 space-y-8">
          {/* Logo & Mobile Close Button */}
          <div className="flex items-center justify-between">
            <Link
              href="/home"
              className="flex items-center gap-3 group"
              onClick={() => setSidebarOpen(false)}
            >
              <div className="w-9 h-9 rounded-full bg-[#9a4023] text-[#FAF7F2] flex items-center justify-center font-serif font-bold text-lg shadow-sm transition-transform group-hover:scale-105">
                K
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-[20px] font-bold text-[#1d1b19] tracking-tight leading-none">
                  Kinfolk &amp; Core
                </span>
                <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#9a4023] mt-1">
                  Sanctuary
                </span>
              </div>
            </Link>

            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="p-1.5 rounded-lg text-[#56423d] hover:bg-[#EAE3D6] lg:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="flex flex-col space-y-1.5">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href ||
                (item.href !== '/home' && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-[14px] font-semibold transition-all ${
                    isActive
                      ? 'bg-[#9a4023] text-white shadow-sm font-bold'
                      : 'text-[#56423d] hover:bg-[#EAE3D6] hover:text-[#1d1b19]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#786b66]'}`} />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section: Help & Logout */}
        <div className="p-6 border-t border-[#E4DDD3]/70 space-y-2">
          <Link
            href="/profile#support"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-[13px] font-medium text-[#56423d] hover:bg-[#EAE3D6] transition-colors"
          >
            <HelpCircle className="w-4 h-4 text-[#786b66]" />
            <span>Help &amp; Sanctuary Care</span>
          </Link>

          <form action="/api/auth/sign-out" method="POST">
            <button
              type="submit"
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-[13px] font-medium text-[#ba1a1a] hover:bg-[#ffdad6]/40 transition-colors cursor-pointer text-left"
            >
              <LogOut className="w-4 h-4 text-[#ba1a1a]" />
              <span>Sign Out</span>
            </button>
          </form>
        </div>
      </aside>

      {/* ========================================================
          MAIN BODY WITH SLIDE-AWARE OFFSET (lg:pl-72)
         ======================================================== */}
      <div className="lg:pl-72 flex-1 flex flex-col min-h-screen">
        {/* Top Header Navigation */}
        <header className="sticky top-0 z-30 bg-[#FAF7F2]/90 backdrop-blur-xl border-b border-[#E4DDD3]/70 px-4 sm:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-xl text-[#1d1b19] hover:bg-[#EAE3D6] lg:hidden cursor-pointer"
              aria-label="Open navigation sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Personalized Member Greeting */}
            <div>
              <h2 className="font-serif text-[17px] sm:text-[19px] font-bold text-[#1d1b19] leading-tight flex items-center gap-1.5">
                <span>Good morning, {displayName}</span>
                <span className="text-[16px]">👋🏽</span>
              </h2>
              <p className="text-[11px] sm:text-[12px] text-[#786b66] leading-tight font-medium mt-0.5">
                Week 3 of your transformation program
              </p>
            </div>
          </div>

          {/* Right Header Badges: Notification Bell & Avatar */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="relative p-2 rounded-xl text-[#56423d] hover:bg-[#EAE3D6] transition-colors cursor-pointer"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#9a4023] ring-2 ring-[#FAF7F2]" />
            </button>

            <Link
              href="/profile"
              className="flex items-center gap-2.5 pl-2 py-1 pr-1 rounded-full hover:bg-[#EAE3D6]/70 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-[#cde5d7] text-[#0a1f17] font-serif font-bold text-[13px] flex items-center justify-center ring-1 ring-[#4d6358]/30">
                {displayName.charAt(0)}
              </div>
              <span className="text-[13px] font-bold text-[#1d1b19] hidden sm:inline pr-2">
                {displayName}
              </span>
            </Link>
          </div>
        </header>

        {/* Dynamic Content Viewport */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-6 sm:py-8">
          {children}
        </main>
      </div>
    </div>
  );
};
