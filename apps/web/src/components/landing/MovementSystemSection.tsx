'use client';

import React, { useState } from 'react';
import { Tv, CheckCircle2, Dumbbell, Sparkles } from 'lucide-react';

export function MovementSystemSection() {
  const [track, setTrack] = useState<'gym' | 'home'>('gym');

  const gymExercises = [
    {
      num: 1,
      name: 'Barbell Hip Thrust',
      desc: 'Primary compound movement for glute activation and hip stability.',
      sets: '4 SETS',
      reps: '10 - 12 REPS',
      rest: 'Rest: 90s',
    },
    {
      num: 2,
      name: 'DB Bulgarian Split Squat',
      desc: 'Unilateral quad and glute strength, improving muscular balance.',
      sets: '3 SETS',
      reps: '10 REPS / LEG',
      rest: 'Rest: 60s',
    },
    {
      num: 3,
      name: 'Romanian Deadlift (RDL)',
      desc: 'Posterior chain targeting hamstrings and erector spinae alignment.',
      sets: '3 SETS',
      reps: '12 REPS',
      rest: 'Rest: 75s',
    },
  ];

  const homeExercises = [
    {
      num: 1,
      name: 'Dumbbell Hip Thrust (Couch / Bench)',
      desc: 'Heavy dumbbell placed at pelvis crease with paused 2s contraction at top.',
      sets: '4 SETS',
      reps: '12 - 15 REPS',
      rest: 'Rest: 60s',
    },
    {
      num: 2,
      name: 'Rear-Foot Elevated Split Squat',
      desc: 'Controlled eccentric tempo with dual dumbbells for quad and glute depth.',
      sets: '3 SETS',
      reps: '12 REPS / LEG',
      rest: 'Rest: 60s',
    },
    {
      num: 3,
      name: 'Dumbbell Romanian Deadlift (Tempo)',
      desc: '3-second descent, loading hamstrings with hinge mechanics.',
      sets: '4 SETS',
      reps: '12 REPS',
      rest: 'Rest: 60s',
    },
  ];

  const currentExercises = track === 'gym' ? gymExercises : homeExercises;

  return (
    <section id="program" className="w-full bg-surface-cream py-space-xl lg:py-space-2xl border-y border-border-subtle">
      <div className="max-w-[1280px] mx-auto px-margin md:px-margin-desktop">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-xl gap-space-md">
          <div>
            <span className="font-serif text-[32px] sm:text-[40px] text-primary/40 font-bold block leading-none">
              01
            </span>
            <span className="text-[11px] font-bold text-primary tracking-widest uppercase font-sans mt-1 block">
              MOVEMENT SYSTEM
            </span>
            <h2 className="font-serif text-[32px] sm:text-[40px] text-deep-charcoal font-bold mt-1">
              TRAIN WITH A PLAN.
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <p className="text-[15px] text-muted-charcoal max-w-md">
              No more deciding what to do when you reach the gym or stare at your living room floor.
            </p>
            {/* Interactive Track Switcher */}
            <div className="inline-flex p-1 rounded-xl bg-canvas-cream border border-border-subtle text-xs font-bold self-start sm:self-auto shadow-xs">
              <button
                type="button"
                onClick={() => setTrack('gym')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  track === 'gym'
                    ? 'bg-primary text-on-primary shadow-xs'
                    : 'text-muted-charcoal hover:text-deep-charcoal'
                }`}
              >
                Gym Track
              </button>
              <button
                type="button"
                onClick={() => setTrack('home')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  track === 'home'
                    ? 'bg-primary text-on-primary shadow-xs'
                    : 'text-muted-charcoal hover:text-deep-charcoal'
                }`}
              >
                Home Track
              </button>
            </div>
          </div>
        </div>

        {/* Routine Preview Component */}
        <div className="bg-canvas-cream rounded-3xl p-space-md sm:p-space-xl shadow-sm border border-border-subtle space-y-space-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-space-sm bg-surface-cream p-space-md rounded-2xl border border-border-subtle gap-space-sm">
            <div>
              <span className="text-[10px] font-bold text-primary uppercase tracking-wider block">
                PHASE 1 BLUEPRINT ({track === 'gym' ? 'COMMERCIAL GYM' : 'HOME DUMBBELL'})
              </span>
              <h3 className="font-serif font-bold text-[20px] sm:text-[22px] text-deep-charcoal">
                Strength &amp; Glute Development
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-lg bg-secondary-fixed text-on-secondary-fixed text-[11px] font-bold tracking-wider uppercase">
                4 DAYS / WEEK
              </span>
              <span className="px-3 py-1 rounded-lg bg-primary-fixed text-on-primary-fixed text-[11px] font-bold tracking-wider uppercase">
                45 MIN SESSIONS
              </span>
            </div>
          </div>

          {/* Exercises List */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
            {currentExercises.map((ex) => (
              <div
                key={ex.num}
                className="bg-surface-cream p-space-md rounded-2xl space-y-space-sm shadow-xs border border-border-subtle flex flex-col justify-between hover:border-primary/30 transition-all"
              >
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="w-7 h-7 rounded-full bg-primary text-on-primary text-[12px] font-bold flex items-center justify-center">
                      {ex.num}
                    </span>
                    <span className="text-[12px] text-muted-charcoal font-medium">
                      {ex.rest}
                    </span>
                  </div>
                  <h4 className="font-serif font-bold text-[18px] text-deep-charcoal">
                    {ex.name}
                  </h4>
                  <p className="text-[13px] text-muted-charcoal mt-1 leading-relaxed">
                    {ex.desc}
                  </p>
                </div>

                <div className="pt-space-sm bg-canvas-cream p-2.5 rounded-xl flex justify-between text-deep-charcoal text-[11px] font-bold border border-border-subtle/80">
                  <span>{ex.sets}</span>
                  <span>{ex.reps}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Flexible Strip */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-space-sm p-space-md rounded-2xl bg-surface-cream border border-border-subtle">
            <div className="flex items-center gap-space-sm">
              <Tv className="w-5 h-5 text-primary shrink-0" />
              <span className="text-[13px] text-deep-charcoal font-medium">
                Includes Home Dumbbell alternatives &amp; HD Video Demos for each movement.
              </span>
            </div>
            <span className="text-[11px] font-bold text-primary tracking-widest uppercase">
              EQUIPMENT FLEXIBLE
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
