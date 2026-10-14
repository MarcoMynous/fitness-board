'use client';

import React, { useState } from 'react';
import { Dumbbell, Utensils, TrendingDown, Play, ChevronRight, Activity, Flame, Check } from 'lucide-react';

export function CompanionDashboardPreview() {
  const [workoutStarted, setWorkoutStarted] = useState(false);

  return (
    <section id="dashboard-preview" className="w-full bg-surface-cream py-space-xl lg:py-space-2xl border-y border-border-subtle">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Smartphone Frame (5 cols) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-[360px] sm:max-w-[380px] bg-[#1a1714] rounded-[48px] p-3.5 shadow-2xl ring-1 ring-black/10 relative">
              {/* Phone Speaker & Camera Notch (Dynamic Island) */}
              <div className="w-28 h-4.5 bg-[#0e0c0a] rounded-full mx-auto mb-2 flex items-center justify-end pr-2.5">
                <div className="w-2 h-2 rounded-full bg-[#1e293b]/80" />
              </div>

              {/* Inner Phone Screen */}
              <div className="bg-canvas-cream rounded-[38px] overflow-hidden p-3.5 space-y-3 border border-border-subtle/40 shadow-inner">
                {/* Status Bar */}
                <div className="flex items-center justify-between px-2 pt-0.5 text-[11px] font-semibold text-deep-charcoal">
                  <span>9:41</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px]">5G</span>
                    <div className="w-4.5 h-2.5 border border-deep-charcoal rounded-xs flex items-center p-0.5">
                      <div className="w-full h-full bg-deep-charcoal rounded-2xs" />
                    </div>
                  </div>
                </div>

                {/* App Member Header */}
                <div className="flex items-center justify-between bg-surface-cream p-2.5 rounded-xl border border-border-subtle">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-xs shrink-0">
                      A
                    </div>
                    <div>
                      <span className="text-[10px] text-muted-charcoal block leading-none">Welcome back</span>
                      <span className="font-serif font-bold text-[13px] text-deep-charcoal leading-tight">
                        Amaka O. 👋🏽
                      </span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-secondary/15 text-secondary font-bold text-[9px] tracking-wider uppercase">
                    WEEK 4 OF 8
                  </span>
                </div>

                {/* Scheduled Workout Card */}
                <div className="bg-surface-cream p-3 rounded-2xl space-y-2 border border-border-subtle shadow-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] text-primary uppercase font-bold tracking-wider">
                      TODAY&apos;S WORKOUT
                    </span>
                    <span className="text-[10px] text-muted-charcoal font-medium">38 mins</span>
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-[16px] text-deep-charcoal leading-tight">
                      Lower Body Sculpt
                    </h4>
                    <p className="text-[11px] text-muted-charcoal mt-0.5">
                      6 targeted lifts • Glutes &amp; Hamstrings
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setWorkoutStarted(!workoutStarted)}
                    className={`w-full h-9 rounded-xl font-bold text-[11px] tracking-wider uppercase flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      workoutStarted
                        ? 'bg-secondary text-on-primary shadow-xs'
                        : 'bg-primary text-on-primary hover:bg-terracotta-hover shadow-sm'
                    }`}
                  >
                    {workoutStarted ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>IN PROGRESS (SET 2 OF 4)</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3 h-3 fill-current" />
                        <span>START WORKOUT</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Metric Progress Widget */}
                <div className="bg-surface-cream p-3 rounded-2xl space-y-1.5 border border-border-subtle shadow-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-bold text-deep-charcoal uppercase tracking-wider">
                      WEIGHT TRAJECTORY
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-secondary/15 text-secondary font-bold text-[9px]">
                      -3.2 kg
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between pt-0.5">
                    <div>
                      <span className="text-[10px] text-muted-charcoal">Start:</span>
                      <span className="font-serif font-bold text-[14px] text-deep-charcoal ml-1">
                        76.0kg
                      </span>
                    </div>
                    <TrendingDown className="w-3.5 h-3.5 text-primary" />
                    <div>
                      <span className="text-[10px] text-muted-charcoal">Current:</span>
                      <span className="font-serif font-bold text-[14px] text-primary ml-1">
                        72.8kg
                      </span>
                    </div>
                  </div>
                </div>

                {/* Meal Card (FIXED: explicit w-12 h-12 thumbnail dimensions) */}
                <div className="bg-surface-cream p-2.5 rounded-2xl flex items-center gap-2.5 border border-border-subtle shadow-xs">
                  <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-primary/10">
                    <img
                      alt="Chicken Jollof Bowl"
                      className="w-full h-full object-cover"
                      src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[8px] font-bold text-primary uppercase tracking-wider block">
                      POST-WORKOUT MEAL
                    </span>
                    <h5 className="font-bold text-[12px] text-deep-charcoal truncate">
                      Chicken Jollof Bowl
                    </h5>
                    <span className="text-[10px] text-muted-charcoal block">
                      42g Protein • 480 kcal
                    </span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-muted-charcoal shrink-0" />
                </div>

                {/* In-App Mobile Bottom Bar */}
                <div className="pt-1 border-t border-border-subtle/50 flex items-center justify-around text-muted-charcoal">
                  <div className="flex flex-col items-center gap-0.5 text-primary">
                    <Dumbbell className="w-3.5 h-3.5" />
                    <span className="text-[8px] font-bold">Today</span>
                  </div>
                  <div className="flex flex-col items-center gap-0.5">
                    <Utensils className="w-3.5 h-3.5" />
                    <span className="text-[8px] font-medium">Meals</span>
                  </div>
                  <div className="flex flex-col items-center gap-0.5">
                    <Activity className="w-3.5 h-3.5" />
                    <span className="text-[8px] font-medium">Progress</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3 Feature Breakdown Cards (7 cols) */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            {/* Feature 1 */}
            <div className="bg-canvas-cream p-5 sm:p-6 rounded-2xl border border-border-subtle shadow-xs flex items-start gap-4 hover:border-primary/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Dumbbell className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-serif font-bold text-[19px] sm:text-[21px] text-deep-charcoal">
                  Training Plan
                </h4>
                <p className="text-[14px] text-muted-charcoal leading-relaxed">
                  Your weekly workouts organized by gym or home equipment variations. Each exercise includes step-by-step cueing so you lift with certainty.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bg-canvas-cream p-5 sm:p-6 rounded-2xl border border-border-subtle shadow-xs flex items-start gap-4 hover:border-primary/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Utensils className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-serif font-bold text-[19px] sm:text-[21px] text-deep-charcoal">
                  Nigerian Cookbook
                </h4>
                <p className="text-[14px] text-muted-charcoal leading-relaxed">
                  40+ mouthwatering meals packed with authentic spices and optimal protein. Clear portions, accessible local groceries, and zero blandness.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="bg-canvas-cream p-5 sm:p-6 rounded-2xl border border-border-subtle shadow-xs flex items-start gap-4 hover:border-primary/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Activity className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-serif font-bold text-[19px] sm:text-[21px] text-deep-charcoal">
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
