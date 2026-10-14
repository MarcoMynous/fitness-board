'use client';

import React from 'react';
import { CheckCircle2, Smartphone } from 'lucide-react';

export function CurriculumIncludedSection() {
  const inclusions = [
    'Full 8-Week Training Program (Gym & Home variations)',
    'Exercise Video Demonstrations with Form Coaching',
    'The 40+ High-Protein Nigerian Digital Cookbook',
    'Interactive Weekly Progress & Measurement Trackers',
    'Weekly Habit & Mindset Check-in Prompts',
    'Private Transformation Photo Journal Tool',
  ];

  return (
    <section className="w-full max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-space-xl lg:py-space-2xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-center">
        {/* Left Headline (5 cols) */}
        <div className="lg:col-span-5 space-y-space-md">
          <span className="text-[11px] font-bold text-primary tracking-widest uppercase font-sans">
            THE COMPLETE CURRICULUM
          </span>
          <h2 className="font-serif text-[32px] sm:text-[40px] text-deep-charcoal font-bold leading-tight">
            WHAT&apos;S INCLUDED IN YOUR PROGRAM.
          </h2>
          <p className="text-[15px] sm:text-[16px] text-muted-charcoal leading-relaxed">
            Every tool, guide, recipe, and tracker engineered to remove second-guessing. You get immediate, lifetime access upon signup.
          </p>
        </div>

        {/* Right Deliverables Box (7 cols) */}
        <div className="lg:col-span-7 bg-surface-cream p-space-lg sm:p-space-xl rounded-3xl shadow-sm border border-border-subtle space-y-space-md mt-6 lg:mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
            {inclusions.map((item, idx) => (
              <div key={idx} className="flex items-start gap-space-sm">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-[14px] text-deep-charcoal font-medium leading-snug">
                  {item}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-space-md bg-canvas-cream p-space-md rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-sm border border-border-subtle">
            <div className="flex items-center gap-space-sm">
              <Smartphone className="w-6 h-6 text-primary shrink-0" />
              <div>
                <span className="font-serif font-bold text-[15px] text-deep-charcoal block">
                  Mobile-Optimized Companion Web App
                </span>
                <span className="text-[12px] text-muted-charcoal">
                  No apps to download • Works seamlessly on Safari, Chrome &amp; tablets
                </span>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[11px] font-bold tracking-wider uppercase shrink-0">
              LIFETIME ACCESS
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
