'use client';

import React, { useState } from 'react';
import { TrendingDown, Activity, Sparkles, CheckCircle2 } from 'lucide-react';

export function AccountabilitySection() {
  const [activeWeek, setActiveWeek] = useState<number>(8);

  const weekData: Record<number, { weight: string; note: string }> = {
    1: { weight: '76.0 kg', note: 'Kickoff baseline measurement' },
    3: { weight: '74.8 kg', note: 'Initial water flush & routine locked in' },
    5: { weight: '73.2 kg', note: 'Noticeable waist tightening & glute activation' },
    8: { weight: '71.5 kg', note: 'December Target reached (-4.5 kg body fat)' },
  };

  return (
    <section className="w-full bg-surface-cream py-space-xl lg:py-space-2xl border-y border-border-subtle">
      <div className="max-w-[1280px] mx-auto px-margin md:px-margin-desktop">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-xl gap-space-md">
          <div>
            <span className="font-serif text-[32px] sm:text-[40px] text-primary/40 font-bold block leading-none">
              03
            </span>
            <span className="text-[11px] font-bold text-primary tracking-widest uppercase font-sans mt-1 block">
              ACCOUNTABILITY ENGINE
            </span>
            <h2 className="font-serif text-[32px] sm:text-[40px] text-deep-charcoal font-bold mt-1">
              WATCH YOURSELF CHANGE.
            </h2>
          </div>
          <p className="text-[15px] text-muted-charcoal max-w-md">
            Real accountability with an integrated weekly check-in tool to track centimeters, energy, and strength.
          </p>
        </div>

        {/* Graph & Metrics Desktop Layout */}
        <div className="bg-canvas-cream rounded-3xl p-space-md sm:p-space-xl shadow-sm border border-border-subtle">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-center">
            {/* Chart Visual (7 cols) */}
            <div className="lg:col-span-7 space-y-space-md">
              <div className="flex items-center justify-between pb-space-xs">
                <div>
                  <span className="text-[10px] font-bold text-muted-charcoal uppercase tracking-wider block">
                    8-WEEK JOURNEY
                  </span>
                  <h4 className="font-serif font-bold text-[18px] sm:text-[20px] text-deep-charcoal">
                    Weekly Progress Trajectory
                  </h4>
                </div>
                <span className="px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[11px] font-bold uppercase tracking-wider">
                  ON TARGET
                </span>
              </div>

              {/* Inline Interactive SVG Chart */}
              <div className="w-full bg-surface-cream rounded-2xl p-space-md sm:p-space-lg flex flex-col justify-between relative overflow-hidden border border-border-subtle shadow-xs">
                {/* Week Buttons */}
                <div className="flex justify-between text-muted-charcoal text-[11px] font-mono border-b border-border-subtle/60 pb-2">
                  {[1, 3, 5, 8].map((w) => (
                    <button
                      key={w}
                      type="button"
                      onClick={() => setActiveWeek(w)}
                      className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${
                        activeWeek === w
                          ? 'bg-primary text-on-primary font-bold'
                          : 'hover:text-deep-charcoal'
                      }`}
                    >
                      WEEK {w}
                    </button>
                  ))}
                </div>

                <div className="py-4">
                  <svg className="w-full h-32 text-primary" preserveAspectRatio="none" viewBox="0 0 500 120">
                    <defs>
                      <linearGradient id="chartGrad" x1="0%" x2="0%" y1="0%" y2="100%">
                        <stop offset="0%" stopColor="currentColor" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="currentColor" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0,30 Q80,25 150,55 T300,75 T500,110 L500,120 L0,120 Z"
                      fill="url(#chartGrad)"
                    />
                    <path
                      d="M0,30 Q80,25 150,55 T300,75 T500,110"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeWidth="3.5"
                    />
                    <circle cx="0" cy="30" fill="currentColor" r="4" />
                    <circle cx="150" cy="55" fill="currentColor" r="4" />
                    <circle cx="300" cy="75" fill="currentColor" r="4" />
                    <circle cx="500" cy="110" fill="currentColor" r="5" />
                  </svg>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[12px] text-muted-charcoal pt-1 border-t border-border-subtle/60 gap-1">
                  <span>Selected: <strong>Week {activeWeek}</strong> ({weekData[activeWeek].weight})</span>
                  <span className="font-semibold text-primary">{weekData[activeWeek].note}</span>
                </div>
              </div>
            </div>

            {/* Metric Displays (5 cols, 2x2 grid) */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-space-md mt-6 lg:mt-0">
              <div className="bg-surface-cream p-space-md rounded-2xl space-y-1 border border-border-subtle shadow-xs">
                <span className="text-[10px] font-bold text-muted-charcoal uppercase tracking-wider">
                  WAIST MEASUREMENT
                </span>
                <p className="font-serif text-[28px] sm:text-[32px] text-primary font-bold">
                  -4.5 cm
                </p>
                <span className="text-[12px] text-secondary font-medium">Consistent reduction</span>
              </div>

              <div className="bg-surface-cream p-space-md rounded-2xl space-y-1 border border-border-subtle shadow-xs">
                <span className="text-[10px] font-bold text-muted-charcoal uppercase tracking-wider">
                  GLUTE MEASUREMENT
                </span>
                <p className="font-serif text-[28px] sm:text-[32px] text-primary font-bold">
                  +2.8 cm
                </p>
                <span className="text-[12px] text-secondary font-medium">Lean hypertrophy</span>
              </div>

              <div className="bg-surface-cream p-space-md rounded-2xl space-y-1 border border-border-subtle shadow-xs">
                <span className="text-[10px] font-bold text-muted-charcoal uppercase tracking-wider">
                  ENERGY LEVEL
                </span>
                <p className="font-serif text-[28px] sm:text-[32px] text-deep-charcoal font-bold">
                  10 / 10
                </p>
                <span className="text-[12px] text-muted-charcoal">Zero crash midday</span>
              </div>

              <div className="bg-surface-cream p-space-md rounded-2xl space-y-1 border border-border-subtle shadow-xs">
                <span className="text-[10px] font-bold text-muted-charcoal uppercase tracking-wider">
                  COMPLIANCE
                </span>
                <p className="font-serif text-[28px] sm:text-[32px] text-deep-charcoal font-bold">
                  94%
                </p>
                <span className="text-[12px] text-secondary font-medium">Habit completion</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
