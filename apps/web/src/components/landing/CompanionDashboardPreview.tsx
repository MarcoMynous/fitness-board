'use client';

import React, { useState } from 'react';
import { Dumbbell, Utensils, TrendingDown, Play, ChevronRight, Activity, Flame, Check } from 'lucide-react';

export function CompanionDashboardPreview() {
  const [workoutStarted, setWorkoutStarted] = useState(false);

  return (
    <section id="dashboard-preview" className="w-full bg-surface-cream py-space-xl lg:py-space-2xl border-y border-border-subtle">
      <div className="max-w-[1280px] mx-auto px-margin md:px-margin-desktop">
        <div className="text-center max-w-2xl mx-auto space-y-space-xs mb-space-xl sm:mb-space-2xl">
          <span className="text-[11px] font-bold text-primary tracking-widest uppercase font-sans">
            THE COMPANION DASHBOARD
          </span>
          <h2 className="font-serif text-[32px] sm:text-[40px] text-deep-charcoal font-bold leading-tight">
            EVERYTHING YOU NEED TO STAY ON TRACK.
          </h2>
          <p className="text-[15px] sm:text-[16px] text-muted-charcoal">
            No clunky PDF stacks lost in your downloads folder. Your complete daily roadmap on your phone.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-center">
          {/* Dashboard Mockup (5 cols) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-[360px] bg-canvas-cream rounded-3xl shadow-xl overflow-hidden p-space-md space-y-space-md border-4 border-surface-cream">
              {/* App Header */}
              <div className="flex items-center justify-between pb-space-xs bg-surface-cream p-3 rounded-xl border border-border-subtle">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-xs">
                    A
                  </div>
                  <div>
                    <span className="text-[11px] text-muted-charcoal block">Welcome back</span>
                    <span className="font-serif font-bold text-[14px] text-deep-charcoal">
                      Amaka O. 👋🏽
                    </span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-secondary/15 text-secondary font-bold text-[10px] tracking-wider uppercase">
                  WEEK 4 OF 8
                </span>
              </div>

              {/* Scheduled Workout Card */}
              <div className="bg-surface-cream p-space-md rounded-2xl space-y-space-sm border border-border-subtle shadow-xs">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-primary uppercase font-bold tracking-wider">
                    TODAY&apos;S WORKOUT
                  </span>
                  <span className="text-[11px] text-muted-charcoal font-medium">38 mins</span>
                </div>
                <h4 className="font-serif font-bold text-[18px] text-deep-charcoal">
                  Lower Body Sculpt
                </h4>
                <p className="text-[12px] text-muted-charcoal">
                  6 targeted lifts • Focus on Glute Medius &amp; Hamstrings
                </p>

                <button
                  type="button"
                  onClick={() => setWorkoutStarted(!workoutStarted)}
                  className={`w-full h-10 rounded-xl font-bold text-[12px] tracking-wider uppercase flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    workoutStarted
                      ? 'bg-secondary text-on-primary shadow-xs'
                      : 'bg-primary text-on-primary hover:bg-terracotta-hover shadow-sm'
                  }`}
                >
                  {workoutStarted ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>IN PROGRESS (SET 2 OF 4)</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>START WORKOUT</span>
                    </>
                  )}
                </button>
              </div>

              {/* Metric Progress Micro-Widget */}
              <div className="bg-surface-cream p-space-md rounded-2xl space-y-1.5 border border-border-subtle shadow-xs">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-deep-charcoal uppercase tracking-wider">
                    WEIGHT TRAJECTORY
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-bold text-[10px]">
                    -3.2 kg
                  </span>
                </div>

                <div className="flex items-baseline justify-between pt-1">
                  <div>
                    <span className="text-[11px] text-muted-charcoal">Start:</span>
                    <span className="font-serif font-bold text-[15px] text-deep-charcoal ml-1">
                      76.0kg
                    </span>
                  </div>
                  <TrendingDown className="w-4 h-4 text-primary" />
                  <div>
                    <span className="text-[11px] text-muted-charcoal">Current:</span>
                    <span className="font-serif font-bold text-[15px] text-primary ml-1">
                      72.8kg
                    </span>
                  </div>
                </div>
              </div>

              {/* Meal Card */}
              <div className="bg-surface-cream p-3 rounded-2xl flex items-center gap-space-sm border border-border-subtle shadow-xs">
                <div className="w-13 h-13 rounded-xl bg-primary/10 overflow-hidden shrink-0">
                  <img
                    alt="Chicken jollof bowl preview"
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida/AEtjO1Wwv2XCIRqbKJy1ipaSrs2790DQyd3zTcACMWYpUrTKKuca0ZY8z2l16KO-fC3soTdXWcZA0EDL-ipfSWpAZDFYQdZadBf61n3A6p7bmiGGcL0Xfb89KsdZU8huxtWP6zn91Y6tpRxU9ciaQRuX31-6vsR1rDNjDvBdsjdVMunWhMhXEeCn3YoUFOV_DbqQk5PW2MjoBbXm03H4Wp5PU59M7g7RXzRigCmLJvyh1o-4sLgUEp51PpqK7oBB"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[9px] font-bold text-primary uppercase tracking-wider">
                    POST-WORKOUT MEAL
                  </span>
                  <h5 className="font-bold text-[13px] text-deep-charcoal truncate">
                    Chicken Jollof Bowl
                  </h5>
                  <span className="text-[11px] text-muted-charcoal">
                    42g Protein • 480 kcal
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-charcoal" />
              </div>
            </div>
          </div>

          {/* 3 Feature Breakdown Cards (7 cols) */}
          <div className="lg:col-span-7 flex flex-col space-y-space-md mt-6 lg:mt-0">
            {/* Feature 1 */}
            <div className="bg-canvas-cream p-space-lg rounded-2xl border border-border-subtle shadow-xs flex items-start gap-space-md hover:border-primary/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Dumbbell className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-serif font-bold text-[20px] text-deep-charcoal">
                  Training Plan
                </h4>
                <p className="text-[14px] text-muted-charcoal leading-relaxed">
                  Your weekly workouts organized by gym or home equipment variations. Each exercise includes step-by-step cueing so you lift with certainty.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bg-canvas-cream p-space-lg rounded-2xl border border-border-subtle shadow-xs flex items-start gap-space-md hover:border-primary/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Utensils className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-serif font-bold text-[20px] text-deep-charcoal">
                  Nigerian Cookbook
                </h4>
                <p className="text-[14px] text-muted-charcoal leading-relaxed">
                  40+ mouthwatering meals packed with authentic spices and optimal protein. Clear portions, accessible local groceries, and zero blandness.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="bg-canvas-cream p-space-lg rounded-2xl border border-border-subtle shadow-xs flex items-start gap-space-md hover:border-primary/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Activity className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-serif font-bold text-[20px] text-deep-charcoal">
                  Progress Engine
                </h4>
                <p className="text-[14px] text-muted-charcoal leading-relaxed">
                  Private logs for hips, waist, and stamina check-ins so you see real visual proof week-over-week without scale obsession.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
