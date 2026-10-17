import React from 'react';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { validateSession } from '@repo/auth';
import {
  Flame,
  Clock,
  Dumbbell,
  ArrowRight,
  Check,
} from 'lucide-react';

import { db, workoutCompletions, recipes } from '@repo/database';
import { eq, desc } from 'drizzle-orm';

export const dynamic = 'force-dynamic';

export default async function MemberHomePage() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('fitness_session_token')?.value;
  const user = await validateSession(sessionToken);

  if (!user) return null;

  // Real user fields from database session
  const displayName =
    user.profile?.displayName ||
    user.profile?.fullName?.split(' ')[0] ||
    user.email.split('@')[0];
  const rawGoal = user.profile?.fitnessGoal || 'strength_hypertrophy';
  const experienceLevel = user.profile?.experienceLevel || 'Intermediate';
  const weeklyTarget = user.profile?.weeklyWorkoutTarget || 4;
  const environment = user.profile?.trainingEnvironment || 'Commercial Gym';

  // Parse user biometrics if stored during onboarding
  let userWeight = '72.0 kg';
  if (Array.isArray(user.profile?.dietaryPreferences)) {
    const w = user.profile.dietaryPreferences.find((p: string) => p.startsWith('weight:'));
    if (w) userWeight = `${w.split(':')[1]} kg`;
  }

  // Live database queries for user completions & latest recipe
  const [completions, latestRecipe] = await Promise.all([
    db.query.workoutCompletions.findMany({
      where: eq(workoutCompletions.userId, user.id),
      orderBy: [desc(workoutCompletions.completedAt)],
    }),
    db.query.recipes.findFirst({
      where: eq(recipes.status, 'published'),
      orderBy: [desc(recipes.createdAt)],
    }),
  ]);

  const now = new Date();
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(now.getDate() - 7);
  const doneThisWeek = completions.filter(
    (c) => new Date(c.completedAt) >= oneWeekAgo
  ).length;

  // Map raw goal to luxury editorial title
  const goalMap: Record<string, string> = {
    strength_hypertrophy: 'Lean Functional Strength & Core',
    fat_loss_conditioning: 'Metabolic Conditioning & Leanness',
    athletic_performance: 'Kinetic Movement & Joint Longevity',
    general_longevity: 'Structural Durability & Vitality',
  };
  const primaryTarget = goalMap[rawGoal] || 'Lean Functional Strength & Core';

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* ========================================================
          1. MINIMAL CYCLE EYEBROW & STATUS
         ======================================================== */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E4DDD3]/60">
        <div>
          <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#9a4023] block">
            Phase 1 • Week 3 of 8
          </span>
          <h1 className="font-serif text-[26px] sm:text-[32px] font-bold tracking-tight text-[#1d1b19] leading-tight mt-0.5">
            {primaryTarget}
          </h1>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#cde5d7] text-[#0a1f17] text-[11px] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4d6358]" />
            <span>{doneThisWeek} of {weeklyTarget} Done This Week</span>
          </span>
        </div>
      </div>

      {/* ========================================================
          2. TODAY'S HERO WORKOUT CARD (Clean, Commanding, Minimal)
         ======================================================== */}
      <div className="bg-[#F2EDE4] rounded-3xl p-6 sm:p-8 border border-[#E4DDD3] shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Workout Photography Frame */}
          <div className="lg:col-span-5 relative h-56 sm:h-64 lg:h-72 rounded-2xl overflow-hidden bg-[#1C1A18] shadow-sm">
            <img
              alt="Coach Tolu Lower Body Session"
              className="w-full h-full object-cover object-top filter brightness-95"
              src="/images/coach-tolu-workout.jpg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1C1A18]/70 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-4 right-4 text-white">
              <span className="text-[9px] font-bold tracking-widest uppercase text-[#ffb59e] block">
                Session Focus
              </span>
              <p className="font-serif text-[15px] font-bold text-[#FAF7F2]">
                Glutes, Hamstrings &amp; Kinetic Core
              </p>
            </div>
          </div>

          {/* Workout Details & Action */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-5">
            <div>
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#9a4023]">
                <span>Today&apos;s Workout</span>
                <span>•</span>
                <span>Day 2</span>
              </div>

              <h2 className="font-serif text-[30px] sm:text-[38px] font-bold text-[#1d1b19] tracking-tight leading-none mt-1">
                Lower Body Sculpt
              </h2>

              <p className="text-[13px] sm:text-[14px] text-[#56423d] font-normal leading-relaxed mt-2">
                Compound tempo squatting paired with unilateral hinge work to build posterior chain tone, glute stability, and core strength.
              </p>

              {/* Minimal Key Meta Pills */}
              <div className="flex flex-wrap items-center gap-3 pt-3 text-[12px] text-[#56423d] font-semibold">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/70 border border-[#E4DDD3]/60">
                  <Clock className="w-3.5 h-3.5 text-[#9a4023]" />
                  <span>38 Mins</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/70 border border-[#E4DDD3]/60">
                  <Dumbbell className="w-3.5 h-3.5 text-[#9a4023]" />
                  <span>4 Main Circuits</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/70 border border-[#E4DDD3]/60">
                  <Flame className="w-3.5 h-3.5 text-[#9a4023]" />
                  <span>{experienceLevel}</span>
                </span>
              </div>
            </div>

            {/* Action Row */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <Link
                href="/training"
                className="h-12 px-8 rounded-xl bg-[#9a4023] hover:bg-[#853218] text-white font-bold text-[13px] tracking-wide inline-flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <span>START WORKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/training"
                className="text-[13px] font-semibold text-[#56423d] hover:text-[#1d1b19] transition-colors"
              >
                Preview Movements &amp; Warmup →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          3. 7-DAY CONSISTENCY RHYTHM BAR (Ultra Clean)
         ======================================================== */}
      <div className="bg-[#F2EDE4] rounded-2xl p-5 border border-[#E4DDD3] shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#786b66]">
            Weekly Consistency
          </span>
          <span className="text-[11px] font-bold text-[#4d6358]">
            3 / {weeklyTarget} Sessions Logged
          </span>
        </div>

        <div className="grid grid-cols-7 gap-2 text-center">
          {/* Mon */}
          <div className="bg-white/80 p-2 sm:p-2.5 rounded-xl border border-[#E4DDD3]/70 flex flex-col items-center gap-1">
            <span className="text-[10px] font-bold text-[#786b66] uppercase">Mon</span>
            <div className="w-6 h-6 rounded-full bg-[#cde5d7] text-[#4d6358] flex items-center justify-center">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </div>
          </div>

          {/* Tue */}
          <div className="bg-white/80 p-2 sm:p-2.5 rounded-xl border border-[#E4DDD3]/70 flex flex-col items-center gap-1">
            <span className="text-[10px] font-bold text-[#786b66] uppercase">Tue</span>
            <div className="w-6 h-6 rounded-full bg-[#cde5d7] text-[#4d6358] flex items-center justify-center">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </div>
          </div>

          {/* Wed (Today) */}
          <div className="bg-[#9a4023] text-white p-2 sm:p-2.5 rounded-xl shadow-xs flex flex-col items-center gap-1 ring-2 ring-[#9a4023]/30">
            <span className="text-[10px] font-bold uppercase text-[#ffdbd0]">Wed</span>
            <div className="w-6 h-6 rounded-full bg-white text-[#9a4023] flex items-center justify-center font-bold text-[10px]">
              TODAY
            </div>
          </div>

          {/* Thu */}
          <div className="bg-white/60 p-2 sm:p-2.5 rounded-xl border border-[#E4DDD3]/50 flex flex-col items-center gap-1">
            <span className="text-[10px] font-bold text-[#786b66] uppercase">Thu</span>
            <div className="w-6 h-6 rounded-full bg-[#ede7e3] text-[#786b66] flex items-center justify-center text-[10px]">
              •
            </div>
          </div>

          {/* Fri */}
          <div className="bg-white/60 p-2 sm:p-2.5 rounded-xl border border-[#E4DDD3]/50 flex flex-col items-center gap-1">
            <span className="text-[10px] font-bold text-[#786b66] uppercase">Fri</span>
            <div className="w-6 h-6 rounded-full bg-[#ede7e3] text-[#786b66] flex items-center justify-center text-[10px]">
              •
            </div>
          </div>

          {/* Sat */}
          <div className="bg-white/60 p-2 sm:p-2.5 rounded-xl border border-[#E4DDD3]/50 flex flex-col items-center gap-1">
            <span className="text-[10px] font-bold text-[#786b66] uppercase">Sat</span>
            <div className="w-6 h-6 rounded-full bg-[#ede7e3] text-[#786b66] flex items-center justify-center text-[10px]">
              •
            </div>
          </div>

          {/* Sun */}
          <div className="bg-white/60 p-2 sm:p-2.5 rounded-xl border border-[#E4DDD3]/50 flex flex-col items-center gap-1">
            <span className="text-[10px] font-bold text-[#786b66] uppercase">Sun</span>
            <div className="w-6 h-6 rounded-full bg-[#E3E9E4] text-[#4d6358] flex items-center justify-center text-[11px]">
              🧘🏽‍♀️
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          4. TWO BALANCED CAPSULES: Kitchen Highlight & Coach Note
         ======================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        {/* Capsule 1: Fuel of the Day (Kinfolk Kitchen) */}
        <div className="bg-[#F2EDE4] rounded-3xl p-6 border border-[#E4DDD3] shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#9a4023]">
                Daily Nourish
              </span>
              <span className="text-[11px] font-bold text-[#4d6358] bg-[#cde5d7] px-2.5 py-0.5 rounded-md">
                {latestRecipe ? `${latestRecipe.proteinGrams}g Protein` : '42g Protein'}
              </span>
            </div>

            <div className="relative h-44 w-full rounded-2xl overflow-hidden bg-[#1C1A18] shadow-xs">
              <img
                alt={latestRecipe?.title || 'Daily Nourish'}
                className="w-full h-full object-cover filter brightness-95"
                src={latestRecipe?.imageUrl || '/images/jollof-bowl.jpg'}
              />
              <div className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-[#1C1A18]/80 text-white text-[10px] font-bold tracking-wider uppercase">
                {latestRecipe?.category || 'Dinner Fuel'}
              </div>
            </div>

            <div>
              <h3 className="font-serif text-[19px] font-bold text-[#1d1b19] leading-tight">
                {latestRecipe?.title || 'Grilled Chicken Brown Jollof Bowl'}
              </h3>
              <p className="text-[12px] text-[#56423d] leading-relaxed mt-1 line-clamp-2">
                {latestRecipe?.coachComment ||
                  'Smoky spiced chicken breast over brown jollof grain with roasted plantain dodo and avocado slices.'}
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-[#E4DDD3]/70 flex items-center justify-between">
            <span className="text-[11px] text-[#786b66] font-medium">
              Prep: {latestRecipe ? `${latestRecipe.prepTimeMinutes + latestRecipe.cookTimeMinutes} mins` : '25 mins'}
            </span>
            <Link
              href="/cookbook"
              className="text-[12px] font-bold text-[#9a4023] hover:underline flex items-center gap-1"
            >
              <span>Explore Cookbook →</span>
            </Link>
          </div>
        </div>

        {/* Capsule 2: Coach Tolu Mindset & Progress Capsule */}
        <div className="bg-[#F2EDE4] rounded-3xl p-6 border border-[#E4DDD3] shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#9a4023]">
                Daily Guidance
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#786b66] bg-[#EAE3D6] px-2.5 py-0.5 rounded-md">
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
                  Master Movement Architect • Lagos Studio
                </p>
              </div>
            </div>

            {/* Minimalist Editorial Quote */}
            <blockquote className="border-l-2 border-[#9a4023] pl-3.5 italic text-[14px] text-[#56423d] leading-relaxed font-serif">
              &ldquo;Don&apos;t chase a perfect workout today, {displayName}. Just don&apos;t disappear on yourself. Step on the mat and let rhythm do the work.&rdquo;
            </blockquote>

            {/* Minimal Progress Summary Pill */}
            <div className="bg-white/80 p-3 rounded-xl border border-[#E4DDD3]/70 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#786b66] block">
                  Current Transformation
                </span>
                <span className="font-serif text-[17px] font-bold text-[#1d1b19]">
                  {userWeight} <span className="text-[11px] font-sans font-bold text-[#4d6358]">(Active Phase)</span>
                </span>
              </div>
              <Link
                href="/progress"
                className="px-3 py-1.5 rounded-lg bg-[#9a4023]/10 text-[#9a4023] font-bold text-[11px] hover:bg-[#9a4023] hover:text-white transition-colors"
              >
                Log Check-in
              </Link>
            </div>
          </div>

          <div className="pt-2 border-t border-[#E4DDD3]/70 flex items-center justify-between text-[11px]">
            <span className="text-[#786b66]">Community Check-in: Sunday 18:00 WAT</span>
            <Link href="/progress" className="text-[#9a4023] font-bold hover:underline">
              View History →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
