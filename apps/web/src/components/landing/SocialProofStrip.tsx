'use client';

import React from 'react';
import { Star } from 'lucide-react';

export function SocialProofStrip() {
  return (
    <section className="w-full bg-surface-cream border-y border-border-subtle py-4 sm:py-5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 text-center md:text-left">
        {/* Rating & Avatar Stack */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
          <div className="flex -space-x-2 overflow-hidden">
            <img
              className="inline-block h-7 w-7 rounded-full ring-2 ring-surface-cream object-cover"
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
              alt="Member Amaka"
            />
            <img
              className="inline-block h-7 w-7 rounded-full ring-2 ring-surface-cream object-cover"
              src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80"
              alt="Member Folake"
            />
            <img
              className="inline-block h-7 w-7 rounded-full ring-2 ring-surface-cream object-cover"
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
              alt="Member Chidinma"
            />
            <div className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-on-primary ring-2 ring-surface-cream">
              +1k
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex text-primary">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <span className="font-serif font-bold text-[16px] text-deep-charcoal">4.9 / 5</span>
            <span className="text-[12px] text-muted-charcoal hidden sm:inline">• Verified Member Rating</span>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden lg:block w-px h-5 bg-border-subtle" />

        {/* Member Callout */}
        <div className="text-[11px] font-bold text-deep-charcoal tracking-widest uppercase">
          JOIN 1,400+ WOMEN ACROSS AFRICA &amp; DIASPORA
        </div>

        {/* Divider */}
        <div className="hidden lg:block w-px h-5 bg-border-subtle" />

        {/* Geography Hubs */}
        <div className="flex items-center gap-2 sm:gap-3 text-muted-charcoal text-[11px] font-bold tracking-widest uppercase">
          <span className="hover:text-primary transition-colors">LAGOS</span>
          <span className="text-border-subtle">•</span>
          <span className="hover:text-primary transition-colors">ABUJA</span>
          <span className="text-border-subtle">•</span>
          <span className="hover:text-primary transition-colors">LONDON</span>
          <span className="text-border-subtle">•</span>
          <span className="hover:text-primary transition-colors">USA / CAN</span>
        </div>
      </div>
    </section>
  );
}
