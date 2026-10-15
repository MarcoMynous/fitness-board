'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, User } from 'lucide-react';

interface LandingHeaderProps {
  user: { email: string } | null;
  currency: 'NGN' | 'USD';
  setCurrency: (c: 'NGN' | 'USD') => void;
  onCheckout: () => void;
  isLoading: boolean;
}

export function LandingHeader({
  user,
  currency,
  setCurrency,
  onCheckout,
  isLoading,
}: LandingHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-canvas-cream/90 backdrop-blur-xl border-b border-border-subtle shadow-[0_1px_8px_rgba(28,26,24,0.04)]">
      <div className="h-20 max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between gap-space-md">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-space-sm focus:outline-none group">
          <div className="w-9 h-9 rounded-xl bg-primary text-on-primary flex items-center justify-center font-serif font-bold text-base shadow-sm group-hover:scale-105 transition-transform">
            K
          </div>
          <span className="font-serif font-bold text-[22px] text-deep-charcoal tracking-tight">
            Kinfolk &amp; Core
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-space-lg">
          <a
            href="#program"
            className="text-[14px] font-semibold text-muted-charcoal hover:text-deep-charcoal transition-colors"
          >
            Program
          </a>
          <a
            href="#dashboard-preview"
            className="text-[14px] font-semibold text-muted-charcoal hover:text-deep-charcoal transition-colors"
          >
            What&apos;s Inside
          </a>
          <a
            href="#results"
            className="text-[14px] font-semibold text-muted-charcoal hover:text-deep-charcoal transition-colors"
          >
            Results
          </a>
          <a
            href="#faq"
            className="text-[14px] font-semibold text-muted-charcoal hover:text-deep-charcoal transition-colors"
          >
            FAQ
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-space-sm sm:gap-space-md">
          {/* User Session or Direct Navigation to Sign-in / Member Portal */}
          {user ? (
            <Link
              href="/home"
              className="inline-flex items-center justify-center gap-1.5 h-[44px] px-4 rounded-xl bg-deep-charcoal text-on-primary text-[13px] font-bold tracking-wider uppercase shadow-md hover:bg-black transition-all"
            >
              <span>Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          ) : (
            <Link
              href="/sign-in"
              className="inline-flex items-center justify-center h-[44px] sm:h-[48px] px-5 sm:px-space-lg rounded-xl bg-primary text-on-primary font-bold text-[12px] sm:text-[13px] tracking-wider uppercase shadow-[0_4px_16px_-2px_rgba(154,64,35,0.25)] hover:bg-terracotta-hover active:scale-[0.99] transition-all"
            >
              SIGN UP
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
