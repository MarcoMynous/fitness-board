import React from 'react';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { validateSession } from '@repo/auth';
import {
  Flame,
  Clock,
  Dumbbell,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Sparkles,
  TrendingDown,
  Volume2,
  Users,
  Eye,
  Check,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function MemberHomePage() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('fitness_session_token')?.value;
  const user = await validateSession(sessionToken);

  if (!user) return null;

  // Real onboarding fields
  const displayName = user.profile?.displayName || user.profile?.fullName?.split(' ')[0] || 'Amaka';
  const rawGoal = user.profile?.fitnessGoal || 'strength_hypertrophy';
  const experienceLevel = user.profile?.experienceLevel || 'Intermediate';
  const weeklyTarget = user.profile?.weeklyWorkoutTarget || 4;
  const environment = user.profile?.trainingEnvironment || 'Commercial Gym';

  // Map raw goal to luxury editorial title
  const goalMap: Record<string, string> = {
    strength_hypertrophy: 'Lean Functional Strength & Core Re-alignment',
    fat_loss_conditioning: 'Metabolic Conditioning & Sculpted Leanness',
    athletic_performance: 'Kinetic Movement & Joint Longevity',
    general_longevity: 'Structural Durability & Mindful Vitality',
  };
  const primaryTarget = goalMap[rawGoal] || 'Lean Functional Strength & Core Re-alignment';

  return (
    <div className="space-y-8">
      {/* ========================================================
          CURRENT CYCLE BANNER
         ======================================================== */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-[#E4DDD3]/70">
        <div className="space-y-1">
          <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#9a4023] block">
            Current Cycle • Phase 1
          </span>
          <h1 className="font-serif text-[32px] sm:text-[42px] font-bold tracking-tight text-[#1d1b19] leading-none uppercase">
            Week 3 of 8
          </h1>
          <p className="text-[14px] text-[#56423d] font-normal pt-0.5">
            Primary Target: <span className="font-semibold text-[#1d1b19]">{primaryTarget}</span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#cde5d7] text-[#0a1f17] text-[12px] font-bold">
            <CheckCircle2 className="w-4 h-4 text-[#4d6358]" />
            <span>Program On Track</span>
          </div>
          <div className="text-[12px] text-[#786b66] font-medium hidden sm:block">
            COMMUNITY CHECK-IN • <strong className="text-[#1d1b19]">Sundays 18:00 WAT</strong>
          </div>
        </div>
      </div>

      {/* ========================================================
          MAIN 2-COLUMN LUXURY EDITORIAL GRID
         ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ========================================================
            LEFT / MAIN COLUMN (7 cols)
           ======================================================== */}
        <div className="lg:col-span-7 space-y-8">
          {/* 1. TODAY'S WORKOUT CARD */}
          <div className="bg-[#F2EDE4] rounded-3xl p-6 sm:p-8 border border-[#E4DDD3] shadow-xs space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-[11px] font-bold tracking-widest uppercase text-[#9a4023]">
                Today&apos;s Workout • Week 3, Day 2
              </span>
              <span className="px-2.5 py-1 rounded-full bg-[#EAE3D6] text-[#56423d] text-[11px] font-bold uppercase tracking-wider">
                Level: {experienceLevel}
              </span>
            </div>

            <div>
              <h2 className="font-serif text-[28px] sm:text-[34px] font-bold text-[#1d1b19] tracking-tight leading-tight">
                Lower Body Sculpt
              </h2>
              {/* Meta Tags */}
              <div className="flex flex-wrap items-center gap-4 mt-2.5 text-[12px] text-[#56423d] font-semibold">
                <span className="flex items-center gap-1.5">
                  <Dumbbell className="w-3.5 h-3.5 text-[#9a4023]" />
                  <span>6 exercises</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#9a4023]" />
                  <span>38 minutes</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-[#9a4023]" />
                  <span>High burn &amp; glutes</span>
                </span>
              </div>
            </div>

            {/* Split Media & Exercises View */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-stretch">
              {/* Left Photo Frame */}
              <div className="relative h-64 sm:h-auto rounded-2xl overflow-hidden bg-[#1C1A18] shadow-sm">
                <img
                  alt="Coach Tolu in Studio"
                  className="w-full h-full object-cover object-top filter brightness-95"
                  src="/images/coach-tolu-workout.jpg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1A18]/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[9px] font-bold tracking-widest uppercase text-[#ffb59e] block">
                    Trainer Instruction
                  </span>
                  <p className="font-serif text-[14px] font-bold text-[#FAF7F2]">
                    Led by Coach Tolu
                  </p>
                </div>
              </div>

              {/* Right Exercise Breakdown */}
              <div className="bg-white/80 backdrop-blur-xs p-5 rounded-2xl border border-[#E4DDD3]/80 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#786b66] block mb-2.5">
                    Session Breakdown
                  </span>
                  <div className="space-y-2.5 text-[13px]">
                    <div className="flex justify-between items-center border-b border-[#E4DDD3]/60 pb-2">
                      <span className="font-semibold text-[#1d1b19]">1. Tempo Goblet Squats</span>
                      <span className="text-[#786b66] font-mono text-[12px]">4 × 12</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-[#E4DDD3]/60 pb-2">
                      <span className="font-semibold text-[#1d1b19]">2. B-Stance RDLs</span>
                      <span className="text-[#786b66] font-mono text-[12px]">3 × 10/side</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-[#E4DDD3]/60 pb-2">
                      <span className="font-semibold text-[#1d1b19]">3. Elevated Glute Bridge</span>
                      <span className="text-[#786b66] font-mono text-[12px]">4 × 15</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-[#1d1b19]">4. Lateral Lunge Pulse</span>
                      <span className="text-[#786b66] font-mono text-[12px]">3 × 12</span>
                    </div>
                  </div>
                </div>

                <div className="text-[11px] text-[#786b66] border-t border-[#E4DDD3]/70 pt-2.5 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9a4023]" />
                  <span>Mat + 2× 8kg-12kg Dumbbells ({environment})</span>
                </div>
              </div>
            </div>

            {/* Workout Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-1">
              <Link
                href="/training"
                className="w-full sm:w-auto px-8 h-12 rounded-xl bg-[#9a4023] hover:bg-[#A84C2F] text-white font-bold text-[13px] tracking-wide inline-flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <span>START WORKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/training"
                className="text-[13px] font-bold text-[#56423d] hover:text-[#1d1b19] inline-flex items-center gap-1.5 transition-colors"
              >
                <Eye className="w-4 h-4 text-[#786b66]" />
                <span>Preview Routine &amp; Warmup Guide</span>
              </Link>
            </div>
          </div>

          {/* 2. WEEKLY RHYTHM & CONSISTENCY CALENDAR */}
          <div className="bg-[#F2EDE4] rounded-3xl p-6 sm:p-7 border border-[#E4DDD3] shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#9a4023] block">
                  Week 3 Schedule
                </span>
                <h3 className="font-serif text-[18px] font-bold text-[#1d1b19]">
                  Weekly Rhythm &amp; Consistency
                </h3>
              </div>
              <span className="text-[12px] font-bold text-[#4d6358] bg-[#cde5d7] px-3 py-1 rounded-full">
                3 of {weeklyTarget} Completed
              </span>
            </div>

            {/* 7 Days Row */}
            <div className="grid grid-cols-7 gap-1.5 sm:gap-2 pt-1 text-center">
              {/* Mon */}
              <div className="bg-white/80 p-2.5 sm:p-3 rounded-xl border border-[#E4DDD3] flex flex-col items-center gap-1">
                <span className="text-[10px] font-bold text-[#786b66] uppercase">Mon</span>
                <div className="w-7 h-7 rounded-full bg-[#cde5d7] text-[#4d6358] flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span className="text-[10px] text-[#786b66] font-medium truncate w-full">Upper</span>
              </div>

              {/* Tue */}
              <div className="bg-white/80 p-2.5 sm:p-3 rounded-xl border border-[#E4DDD3] flex flex-col items-center gap-1">
                <span className="text-[10px] font-bold text-[#786b66] uppercase">Tue</span>
                <div className="w-7 h-7 rounded-full bg-[#cde5d7] text-[#4d6358] flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span className="text-[10px] text-[#786b66] font-medium truncate w-full">Core</span>
              </div>

              {/* Wed (Today) */}
              <div className="bg-[#9a4023] text-white p-2.5 sm:p-3 rounded-xl shadow-sm flex flex-col items-center gap-1 ring-2 ring-[#9a4023]/40">
                <span className="text-[10px] font-bold uppercase text-[#ffdbd0]">Wed</span>
                <div className="w-7 h-7 rounded-full bg-white text-[#9a4023] flex items-center justify-center font-bold text-[11px]">
                  TODAY
                </div>
                <span className="text-[10px] font-semibold truncate w-full text-white">Lower</span>
              </div>

              {/* Thu */}
              <div className="bg-white/80 p-2.5 sm:p-3 rounded-xl border border-[#E4DDD3] flex flex-col items-center gap-1">
                <span className="text-[10px] font-bold text-[#786b66] uppercase">Thu</span>
                <div className="w-7 h-7 rounded-full bg-[#ede7e3] text-[#786b66] flex items-center justify-center font-bold text-[11px]">
                  •
                </div>
                <span className="text-[10px] text-[#786b66] font-medium truncate w-full">HIIT</span>
              </div>

              {/* Fri */}
              <div className="bg-white/80 p-2.5 sm:p-3 rounded-xl border border-[#E4DDD3] flex flex-col items-center gap-1">
                <span className="text-[10px] font-bold text-[#786b66] uppercase">Fri</span>
                <div className="w-7 h-7 rounded-full bg-[#ede7e3] text-[#786b66] flex items-center justify-center font-bold text-[11px]">
                  •
                </div>
                <span className="text-[10px] text-[#786b66] font-medium truncate w-full">Glute</span>
              </div>

              {/* Sat */}
              <div className="bg-white/80 p-2.5 sm:p-3 rounded-xl border border-[#E4DDD3] flex flex-col items-center gap-1">
                <span className="text-[10px] font-bold text-[#786b66] uppercase">Sat</span>
                <div className="w-7 h-7 rounded-full bg-[#ede7e3] text-[#786b66] flex items-center justify-center font-bold text-[11px]">
                  •
                </div>
                <span className="text-[10px] text-[#786b66] font-medium truncate w-full">Walk</span>
              </div>

              {/* Sun */}
              <div className="bg-white/80 p-2.5 sm:p-3 rounded-xl border border-[#E4DDD3] flex flex-col items-center gap-1">
                <span className="text-[10px] font-bold text-[#786b66] uppercase">Sun</span>
                <div className="w-7 h-7 rounded-full bg-[#E3E9E4] text-[#4d6358] flex items-center justify-center font-bold text-[11px]">
                  🧘🏽‍♀️
                </div>
                <span className="text-[10px] text-[#786b66] font-medium truncate w-full">Rest</span>
              </div>
            </div>
          </div>

          {/* 3. FROM THE KINFOLK KITCHEN */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold tracking-widest uppercase text-[#9a4023] block">
                  Nourish • Fuel Your Body
                </span>
                <h3 className="font-serif text-[22px] font-bold text-[#1d1b19]">
                  From The Kinfolk Kitchen
                </h3>
              </div>
              <Link
                href="/cookbook"
                className="text-[12px] font-bold text-[#9a4023] hover:underline inline-flex items-center gap-1"
              >
                <span>Explore All 45+ Recipes</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Recipe 1: Grilled Chicken Jollof Bowl */}
              <div className="bg-[#F2EDE4] rounded-2xl overflow-hidden border border-[#E4DDD3] shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
                <div>
                  <div className="relative h-44 w-full bg-[#1C1A18] overflow-hidden">
                    <img
                      alt="Grilled Chicken Jollof Bowl"
                      className="w-full h-full object-cover filter brightness-95 transition-transform hover:scale-105 duration-500"
                      src="/images/jollof-bowl.jpg"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#1C1A18]/80 backdrop-blur-md text-white text-[10px] font-bold tracking-wider uppercase">
                      Dinner • High Fibre
                    </div>
                    <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-white/95 text-[#1d1b19] text-[11px] font-bold shadow-xs">
                      42g Protein
                    </div>
                  </div>

                  <div className="p-4 space-y-1.5">
                    <h4 className="font-serif text-[17px] font-bold text-[#1d1b19] leading-tight">
                      Grilled Chicken Jollof Bowl
                    </h4>
                    <p className="text-[12px] text-[#56423d] leading-relaxed line-clamp-2">
                      Smoky spiced chicken and brown jollof grain infused with scotch bonnet, roasted plantain dodo, and avocado.
                    </p>
                  </div>
                </div>

                <div className="px-4 pb-4 pt-2 border-t border-[#E4DDD3]/70 flex items-center justify-between text-[11px] font-bold">
                  <span className="text-[#786b66]">PREP: 25 MINS</span>
                  <Link href="/cookbook" className="text-[#9a4023] hover:underline flex items-center gap-1">
                    <span>VIEW RECIPE</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>

              {/* Recipe 2: Suya Spiced Salmon & Plantain Mash */}
              <div className="bg-[#F2EDE4] rounded-2xl overflow-hidden border border-[#E4DDD3] shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
                <div>
                  <div className="relative h-44 w-full bg-[#1C1A18] overflow-hidden">
                    <img
                      alt="Suya Spiced Salmon & Plantain Mash"
                      className="w-full h-full object-cover filter brightness-95 transition-transform hover:scale-105 duration-500"
                      src="/images/suya-salmon.jpg"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#1C1A18]/80 backdrop-blur-md text-white text-[10px] font-bold tracking-wider uppercase">
                      Lunch • Rapid Recovery
                    </div>
                    <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-white/95 text-[#1d1b19] text-[11px] font-bold shadow-xs">
                      38g Protein
                    </div>
                  </div>

                  <div className="p-4 space-y-1.5">
                    <h4 className="font-serif text-[17px] font-bold text-[#1d1b19] leading-tight">
                      Suya Spiced Salmon &amp; Plantain Mash
                    </h4>
                    <p className="text-[12px] text-[#56423d] leading-relaxed line-clamp-2">
                      Heart-healthy omega-rich Atlantic salmon crusted in authentic yaji spice rub over velvety mashed sweet plantain.
                    </p>
                  </div>
                </div>

                <div className="px-4 pb-4 pt-2 border-t border-[#E4DDD3]/70 flex items-center justify-between text-[11px] font-bold">
                  <span className="text-[#786b66]">PREP: 20 MINS</span>
                  <Link href="/cookbook" className="text-[#9a4023] hover:underline flex items-center gap-1">
                    <span>VIEW RECIPE</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            RIGHT / STATS & COACH GUIDANCE COLUMN (5 cols)
           ======================================================== */}
        <div className="lg:col-span-5 space-y-7">
          {/* 1. YOUR TRANSFORMATION CARD */}
          <div className="bg-[#F2EDE4] rounded-3xl p-6 sm:p-7 border border-[#E4DDD3] shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#786b66] block">
                  Metrics • 21 Days Logged
                </span>
                <h3 className="font-serif text-[20px] font-bold text-[#1d1b19]">
                  Your Transformation
                </h3>
              </div>
              <Link
                href="/progress"
                className="text-[11px] font-bold text-[#9a4023] hover:underline flex items-center gap-1"
              >
                <span>View Details</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {/* Weight Big Stat */}
            <div className="space-y-1">
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-[38px] font-bold text-[#1d1b19] leading-none">
                  74.6
                </span>
                <span className="text-[14px] font-bold text-[#786b66]">kg</span>
                <span className="ml-auto flex items-center gap-1 text-[12px] font-bold text-[#4d6358] bg-[#cde5d7] px-2.5 py-1 rounded-full">
                  <TrendingDown className="w-3.5 h-3.5" />
                  <span>3.4 kg total</span>
                </span>
              </div>
              <div className="flex items-center justify-between text-[12px] text-[#786b66] pt-1">
                <span>Started at 78.0 kg on Day 1</span>
                <span className="text-[#4d6358] font-bold">-4.4% Body Fat</span>
              </div>
            </div>

            {/* Visual SVG Progress Curve */}
            <div className="bg-white/80 p-4 rounded-2xl border border-[#E4DDD3] space-y-2">
              <div className="flex justify-between text-[10px] font-bold text-[#786b66] uppercase">
                <span>W1 (78.0)</span>
                <span>W2 (76.1)</span>
                <span className="text-[#9a4023]">TODAY (74.6)</span>
              </div>

              {/* Smooth trend curve SVG */}
              <div className="w-full h-16 relative">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 300 60" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="curveGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#9a4023" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#9a4023" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 10 15 Q 150 42 290 48 L 290 60 L 10 60 Z"
                    fill="url(#curveGradient)"
                  />
                  <path
                    d="M 10 15 Q 150 42 290 48"
                    fill="none"
                    stroke="#9a4023"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <circle cx="10" cy="15" r="4" fill="#9a4023" />
                  <circle cx="150" cy="38" r="4" fill="#9a4023" />
                  <circle cx="290" cy="48" r="5" fill="#9a4023" stroke="#ffffff" strokeWidth="2" />
                </svg>
              </div>

              <div className="flex items-center justify-between text-[11px] text-[#786b66] pt-1 border-t border-[#E4DDD3]/60">
                <span>Next check-in in 4 days</span>
                <Link href="/progress" className="text-[#9a4023] font-bold hover:underline">
                  Log Daily Weight
                </Link>
              </div>
            </div>

            {/* 3 Mini Health Metrics */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-white/70 p-3 rounded-xl border border-[#E4DDD3]">
                <span className="text-[10px] font-bold text-[#786b66] uppercase block">Water</span>
                <span className="font-serif text-[15px] font-bold text-[#1d1b19] block mt-0.5">2.4L</span>
                <span className="text-[10px] text-[#786b66]">Goal: 3.0L</span>
              </div>
              <div className="bg-white/70 p-3 rounded-xl border border-[#E4DDD3]">
                <span className="text-[10px] font-bold text-[#786b66] uppercase block">Protein</span>
                <span className="font-serif text-[15px] font-bold text-[#1d1b19] block mt-0.5">115g</span>
                <span className="text-[10px] text-[#4d6358] font-semibold">88% Hit</span>
              </div>
              <div className="bg-white/70 p-3 rounded-xl border border-[#E4DDD3]">
                <span className="text-[10px] font-bold text-[#786b66] uppercase block">Streak</span>
                <span className="font-serif text-[15px] font-bold text-[#1d1b19] block mt-0.5">14 Days</span>
                <span className="text-[10px] text-[#9a4023] font-semibold">Unbroken</span>
              </div>
            </div>
          </div>

          {/* 2. INTENTIONAL GUIDANCE (COACH NOTE) */}
          <div className="bg-[#F2EDE4] rounded-3xl p-6 sm:p-7 border border-[#E4DDD3] shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#9a4023]">
                Intentional Guidance
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#786b66] bg-[#EAE3D6] px-2.5 py-1 rounded-md">
                Wednesday Energy
              </span>
            </div>

            {/* Coach Bio */}
            <div className="flex items-center gap-3">
              <img
                alt="Coach Tolu"
                className="w-11 h-11 rounded-full object-cover object-top ring-1 ring-[#9a4023]/40"
                src="/images/coach-tolu-editorial.jpg"
              />
              <div>
                <p className="text-[14px] font-bold text-[#1d1b19] leading-tight">
                  Coach Tolu
                </p>
                <p className="text-[11px] text-[#786b66]">
                  Head Coach • Lagos Studio
                </p>
              </div>
            </div>

            {/* Editorial Quote */}
            <blockquote className="border-l-2 border-[#9a4023] pl-4 italic text-[14px] text-[#56423d] leading-relaxed font-serif">
              &ldquo;Don&apos;t chase perfect workouts, {displayName}. Just don&apos;t disappear on yourself. Show up on the mat today and let momentum do the rest.&rdquo;
            </blockquote>

            {/* Audio Note Widget */}
            <div className="bg-white/80 p-3.5 rounded-2xl border border-[#E4DDD3] flex items-center justify-between gap-3 shadow-2xs">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="w-10 h-10 rounded-full bg-[#9a4023] text-white flex items-center justify-center shrink-0 hover:bg-[#A84C2F] transition-colors cursor-pointer shadow-xs"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
                <div>
                  <p className="text-[13px] font-bold text-[#1d1b19] leading-tight">
                    Morning Audio Note
                  </p>
                  <p className="text-[11px] text-[#786b66] leading-tight">
                    0:48 • Mental Prep &amp; Alignment
                  </p>
                </div>
              </div>

              {/* Waveform indicator */}
              <div className="flex items-end gap-1 h-5 pr-2">
                <span className="w-1 h-2 bg-[#9a4023] rounded-full animate-pulse" />
                <span className="w-1 h-4 bg-[#9a4023] rounded-full animate-pulse delay-75" />
                <span className="w-1 h-5 bg-[#9a4023] rounded-full animate-pulse delay-150" />
                <span className="w-1 h-3 bg-[#9a4023] rounded-full animate-pulse delay-100" />
                <span className="w-1 h-1.5 bg-[#9a4023] rounded-full" />
              </div>
            </div>
          </div>

          {/* 3. COMMUNITY CIRCLE BANNER */}
          <div className="bg-[#cde5d7]/50 rounded-2xl p-4 sm:p-5 border border-[#cde5d7] flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#4d6358] text-white flex items-center justify-center shrink-0 shadow-xs">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[13px] font-bold text-[#0a1f17] leading-tight">
                  Lagos Kinfolk Circle (148 active)
                </p>
                <p className="text-[12px] text-[#4d6358] leading-tight mt-0.5">
                  &ldquo;Who is joining the Lekki Phase 1 Saturday run club?&rdquo;
                </p>
              </div>
            </div>

            <Link
              href="/progress#community"
              className="text-[12px] font-bold text-[#0a1f17] hover:underline shrink-0"
            >
              Join →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
