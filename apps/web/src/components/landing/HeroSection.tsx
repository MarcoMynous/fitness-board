'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Dumbbell, Utensils, TrendingUp, Sparkles, Timer } from 'lucide-react';

interface HeroSectionProps {
  onCheckout: () => void;
  isLoading: boolean;
}

export function HeroSection({ onCheckout, isLoading }: HeroSectionProps) {
  return (
    <section className="relative w-full max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-space-xl lg:py-space-2xl overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-center">
        {/* Left Column: Copy & Actions (6 cols) */}
        <div className="lg:col-span-6 flex flex-col justify-center space-y-space-lg z-10">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full bg-surface-cream border border-border-subtle shadow-xs">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-[11px] font-bold tracking-widest uppercase text-primary font-sans">
              THE DETTY DECEMBER BODY PROGRAM
            </span>
          </div>

          {/* Main Display Headline */}
          <h1 className="font-serif text-[42px] sm:text-[52px] lg:text-[64px] text-deep-charcoal leading-[1.06] tracking-tight font-bold">
            BUILD THE BODY.<br />
            <span className="italic font-normal text-primary">KEEP THE LIFESTYLE.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-[16px] sm:text-[19px] text-muted-charcoal max-w-xl font-normal leading-relaxed">
            A complete workout, meal, and progress system designed to help you stay consistent without turning your life upside down.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-space-md pt-space-xs">
            <Link
              href="/sign-in"
              className="inline-flex items-center justify-center gap-space-sm h-[56px] px-space-xl rounded-xl bg-primary text-on-primary font-bold text-[14px] sm:text-[15px] tracking-wider uppercase shadow-[0_4px_16px_-2px_rgba(154,64,35,0.25)] hover:bg-terracotta-hover transition-all active:scale-[0.99] group cursor-pointer"
            >
              <span>START MY TRANSFORMATION</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Micro Trust */}
          <div className="flex items-center gap-2 text-muted-charcoal text-[13px]">
            <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
            <span>Instant access after payment • Available on all mobile devices</span>
          </div>

          {/* 3 Trust Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md pt-space-md bg-surface-cream p-space-md sm:p-space-lg rounded-2xl border border-border-subtle shadow-xs">
            <div className="flex flex-col space-y-1">
              <Dumbbell className="w-5 h-5 text-primary" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-deep-charcoal">
                STRUCTURED WORKOUTS
              </span>
              <span className="text-[12px] text-muted-charcoal">Home &amp; Gym tracks</span>
            </div>

            <div className="flex flex-col space-y-1">
              <Utensils className="w-5 h-5 text-primary" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-deep-charcoal">
                REAL MEALS
              </span>
              <span className="text-[12px] text-muted-charcoal">Authentic West African</span>
            </div>

            <div className="flex flex-col space-y-1">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-deep-charcoal">
                PROGRESS TRACKING
              </span>
              <span className="text-[12px] text-muted-charcoal">Metric check-in engine</span>
            </div>
          </div>
        </div>

        {/* Right Column: Editorial Hero Imagery (6 cols) */}
        <div className="lg:col-span-6 relative flex justify-center lg:justify-end items-center mt-8 lg:mt-0">
          <div className="relative w-full aspect-[4/5] sm:aspect-[5/6] max-w-[560px] rounded-3xl overflow-hidden shadow-2xl bg-surface-cream border border-border-subtle">
            <img
              alt="Nigerian female trainer smiling warmly in terracotta athletic wear in bright studio"
              className="w-full h-full object-cover object-top hover:scale-102 transition-transform duration-700"
              src="https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=1200&q=85"
            />

            {/* Floating Pill Badge */}
            <div className="absolute bottom-5 left-5 right-5 p-3.5 sm:p-4 rounded-xl bg-deep-charcoal/90 backdrop-blur-md text-on-primary flex items-center justify-between shadow-lg border border-white/10">
              <div className="flex items-center gap-2">
                <Timer className="w-4 h-4 text-primary-fixed-dim" />
                <span className="text-[11px] font-bold tracking-widest uppercase">
                  8-WEEK CURRICULUM
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[11px] text-surface-container-highest uppercase font-medium">
                  Workouts • Recipes • Tracker
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
