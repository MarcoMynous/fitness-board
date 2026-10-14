'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';

interface MeetCoachSectionProps {
  onJoin: () => void;
}

export function MeetCoachSection({ onJoin }: MeetCoachSectionProps) {
  return (
    <section className="w-full max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-space-xl lg:py-space-2xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-center">
        {/* Left: Coach Image (5 cols) */}
        <div className="lg:col-span-5 relative">
          <div className="w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl bg-surface-cream relative border border-border-subtle">
            <img
              alt="Coach Tolu in studio athletic wear laughing and holding water bottle"
              className="w-full h-full object-cover hover:scale-102 transition-transform duration-700"
              src="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=1200&q=85"
            />

            {/* Floating Tags */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              <span className="px-3 py-1 rounded-full bg-deep-charcoal/80 backdrop-blur-md text-on-primary text-[10px] sm:text-[11px] font-bold uppercase tracking-wider border border-white/10 shadow-sm">
                Fitness Creator
              </span>
              <span className="px-3 py-1 rounded-full bg-deep-charcoal/80 backdrop-blur-md text-on-primary text-[10px] sm:text-[11px] font-bold uppercase tracking-wider border border-white/10 shadow-sm">
                8+ Years Training
              </span>
              <span className="px-3 py-1 rounded-full bg-primary/95 backdrop-blur-md text-on-primary text-[10px] sm:text-[11px] font-bold uppercase tracking-wider shadow-sm">
                Lagos, Nigeria
              </span>
            </div>
          </div>
        </div>

        {/* Right: Coach Story (7 cols) */}
        <div className="lg:col-span-7 flex flex-col space-y-space-md mt-6 lg:mt-0">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-primary tracking-widest uppercase font-sans">
              MEET YOUR COACH
            </span>
            <h2 className="font-serif text-[38px] sm:text-[48px] lg:text-[56px] text-deep-charcoal font-bold leading-tight">
              HEY, I&apos;M TOLU.
            </h2>
          </div>

          <div className="space-y-space-md text-muted-charcoal text-[16px] sm:text-[18px] leading-relaxed">
            <p>
              I used to believe fitness meant starving on boiled vegetables and spending two hours doing burpees in Lagos traffic. When I built my own sustainable routine that allowed for real Nigerian food, everything changed.
            </p>
            <p>
              I built this program so you can feel unstoppable in your body this December without missing out on the joy of living, attending your events, and eating with your family.
            </p>
          </div>

          <div className="pt-space-xs flex items-center gap-space-md">
            <button
              type="button"
              onClick={onJoin}
              className="h-[52px] px-space-xl rounded-xl bg-primary text-on-primary text-[13px] font-bold tracking-wider uppercase inline-flex items-center justify-center gap-2 hover:bg-terracotta-hover transition-colors shadow-md active:scale-98 cursor-pointer"
            >
              <span>JOIN MY PROGRAM</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
