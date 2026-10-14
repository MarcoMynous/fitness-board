'use client';

import React from 'react';
import Link from 'next/link';

export function LandingFooter() {
  return (
    <footer className="w-full bg-surface-cream border-t border-border-subtle py-space-xl lg:py-space-2xl">
      <div className="max-w-[1280px] mx-auto px-margin md:px-margin-desktop">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-space-xl pb-space-xl border-b border-border-subtle">
          <div className="space-y-space-xs">
            <div className="flex items-center gap-space-sm">
              <div className="w-8 h-8 rounded-lg bg-primary text-on-primary flex items-center justify-center font-serif font-bold text-sm">
                K
              </div>
              <span className="font-serif font-bold text-[20px] text-deep-charcoal">
                Kinfolk &amp; Core
              </span>
            </div>
            <p className="text-[13px] text-muted-charcoal max-w-sm leading-relaxed">
              The Detty December Body Program. Intentional strength, nourishment, and holistic luxury crafted for the modern Nigerian woman.
            </p>
          </div>

          <nav className="flex flex-wrap items-center gap-x-space-lg gap-y-space-sm text-[13px] font-semibold text-muted-charcoal">
            <a href="#program" className="hover:text-primary transition-colors">
              Program
            </a>
            <a href="#dashboard-preview" className="hover:text-primary transition-colors">
              Dashboard
            </a>
            <a href="#results" className="hover:text-primary transition-colors">
              Results
            </a>
            <a href="#faq" className="hover:text-primary transition-colors">
              FAQ
            </a>
            <Link href="/sign-in" className="hover:text-primary transition-colors">
              Login
            </Link>
          </nav>

          <div className="flex items-center gap-space-md text-[11px] font-bold tracking-widest text-muted-charcoal">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              INSTAGRAM
            </a>
            <span className="text-border-subtle">•</span>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              TIKTOK
            </a>
          </div>
        </div>

        <div className="pt-space-lg flex flex-col sm:flex-row items-center justify-between gap-space-sm text-[12px] text-muted-charcoal">
          <span>© 2026 Kinfolk &amp; Core. All rights reserved. Lagos • Abuja • Diaspora.</span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
            DETTY DECEMBER BODY ™
          </span>
        </div>
      </div>
    </footer>
  );
}
