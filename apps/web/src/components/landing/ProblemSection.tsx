'use client';

import React from 'react';
import { X, ShieldCheck, ArrowRight } from 'lucide-react';

interface ProblemSectionProps {
  onExplore: () => void;
}

export function ProblemSection({ onExplore }: ProblemSectionProps) {
  return (
    <section className="w-full max-w-[1280px] mx-auto px-margin md:px-margin-desktop py-space-xl lg:py-space-2xl">
      <div className="flex flex-col space-y-space-sm mb-space-xl">
        <span className="text-[11px] font-bold text-primary tracking-widest uppercase font-sans">
          THE ROUTINE DILEMMA
        </span>
        <h2 className="font-serif text-[32px] sm:text-[40px] text-deep-charcoal max-w-3xl font-bold leading-tight">
          YOU DON&apos;T NEED ANOTHER RANDOM WORKOUT FROM INSTAGRAM.
        </h2>
        <p className="text-[16px] sm:text-[18px] text-muted-charcoal max-w-2xl leading-relaxed">
          Most fitness advice ignores modern Nigerian realities: chaotic Lagos work commutes, family dinners, authentic staples, and demanding event calendars.
        </p>
      </div>

      {/* 3 Friction Points Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
        {/* Card 01 */}
        <div className="bg-surface-cream p-space-lg sm:p-space-xl rounded-2xl flex flex-col justify-between space-y-space-md border border-border-subtle shadow-xs hover:border-primary/30 transition-colors">
          <div className="space-y-space-sm">
            <span className="font-serif text-[32px] text-primary/40 font-bold block">01</span>
            <h3 className="font-serif font-bold text-[20px] text-deep-charcoal">
              You don&apos;t know what to train.
            </h3>
            <p className="text-[14px] text-muted-charcoal leading-relaxed">
              Wandering the gym floor or doing disjointed influencer videos leads to physical burnout with zero compounding physical changes.
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-primary text-[11px] font-bold tracking-widest uppercase">
            <X className="w-4 h-4" />
            <span>DISJOINTED EFFORT</span>
          </div>
        </div>

        {/* Card 02 */}
        <div className="bg-surface-cream p-space-lg sm:p-space-xl rounded-2xl flex flex-col justify-between space-y-space-md border border-border-subtle shadow-xs hover:border-primary/30 transition-colors">
          <div className="space-y-space-sm">
            <span className="font-serif text-[32px] text-primary/40 font-bold block">02</span>
            <h3 className="font-serif font-bold text-[20px] text-deep-charcoal">
              You don&apos;t know what to eat.
            </h3>
            <p className="text-[14px] text-muted-charcoal leading-relaxed">
              Generic Western diets tell you to quit rice and swallow unseasoned salads. It lasts four days before you break and revert right back.
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-primary text-[11px] font-bold tracking-widest uppercase">
            <X className="w-4 h-4" />
            <span>UNSUSTAINABLE DIETS</span>
          </div>
        </div>

        {/* Card 03 */}
        <div className="bg-surface-cream p-space-lg sm:p-space-xl rounded-2xl flex flex-col justify-between space-y-space-md border border-border-subtle shadow-xs hover:border-primary/30 transition-colors">
          <div className="space-y-space-sm">
            <span className="font-serif text-[32px] text-primary/40 font-bold block">03</span>
            <h3 className="font-serif font-bold text-[20px] text-deep-charcoal">
              You don&apos;t know if you&apos;re progressing.
            </h3>
            <p className="text-[14px] text-muted-charcoal leading-relaxed">
              Without structured measurement of your waist, glutes, and stamina, you feel completely stuck even when your body composition is shifting.
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-primary text-[11px] font-bold tracking-widest uppercase">
            <X className="w-4 h-4" />
            <span>BLIND EXECUTION</span>
          </div>
        </div>
      </div>

      {/* Resolution Banner */}
      <div className="mt-space-xl p-space-lg md:p-space-xl rounded-2xl bg-deep-charcoal text-on-primary flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md shadow-lg border border-white/5">
        <div className="flex items-center gap-space-md">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6 text-primary-fixed-dim" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-primary-fixed-dim tracking-widest uppercase">
              THE RESOLUTION
            </span>
            <p className="text-[16px] sm:text-[18px] text-surface-container-lowest font-medium mt-0.5">
              That&apos;s why the entire system lives in one place. Structured, cultural, and deeply sustainable.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onExplore}
          className="shrink-0 h-[48px] px-space-lg rounded-xl bg-primary text-on-primary text-[13px] font-bold uppercase tracking-wider flex items-center justify-center hover:bg-terracotta-hover transition-colors cursor-pointer active:scale-98"
        >
          EXPLORE THE BLUEPRINT
        </button>
      </div>
    </section>
  );
}
