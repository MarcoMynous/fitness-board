'use client';

import React from 'react';
import { Star } from 'lucide-react';

export function SocialProofStrip() {
  return (
    <section className="w-full bg-surface-cream border-y border-border-subtle py-space-lg">
      <div className="max-w-[1280px] mx-auto px-margin md:px-margin-desktop flex flex-col md:flex-row items-center justify-between gap-space-md text-center md:text-left">
        {/* Rating */}
        <div className="flex items-center gap-space-sm justify-center">
          <div className="flex text-primary">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
          </div>
          <span className="font-serif font-bold text-[18px] text-deep-charcoal">4.9 / 5</span>
          <span className="text-[13px] text-muted-charcoal">Verified Member Rating</span>
        </div>

        {/* Member Volume */}
        <div>
          <span className="text-[11px] font-bold text-deep-charcoal tracking-widest uppercase">
            JOIN 1,400+ WOMEN WORKING TOWARD THEIR STRONGEST SELF
          </span>
        </div>

        {/* Geography Hubs */}
        <div className="flex items-center gap-space-md text-muted-charcoal text-[11px] font-bold tracking-widest uppercase">
          <span>LAGOS</span>
          <span className="text-border-subtle">•</span>
          <span>ABUJA</span>
          <span className="text-border-subtle">•</span>
          <span>LONDON</span>
          <span className="text-border-subtle">•</span>
          <span>DIASPORA</span>
        </div>
      </div>
    </section>
  );
}
