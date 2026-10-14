import React from 'react';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { validateSession } from '@repo/auth';
import { hasTrainingAccess, hasCookbookAccess } from '@repo/domain';
import { db, workouts, recipes, workoutCompletions } from '@repo/database';
import { Button, Card, Badge } from '@repo/ui';
import { Dumbbell, Utensils, ArrowRight, CheckCircle2, Lock, Flame, Calendar } from 'lucide-react';
import { desc, eq } from 'drizzle-orm';

export const dynamic = 'force-dynamic';


export default async function MemberHomePage() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('fitness_session_token')?.value;
  const user = await validateSession(sessionToken);

  if (!user) return null;

  const trainingEntitled = hasTrainingAccess(user.entitlements as any);
  const cookbookEntitled = hasCookbookAccess(user.entitlements as any);

  // Fetch next workout (first workout of week 1 for now)
  const nextWorkout = await db.query.workouts.findFirst({
    orderBy: [workouts.weekNumber, workouts.dayNumber],
  });

  // Fetch featured recipe
  const featuredRecipe = await db.query.recipes.findFirst({
    orderBy: [desc(recipes.createdAt)],
  });

  // Fetch recent completions for user
  const completions = await db.query.workoutCompletions.findMany({
    where: eq(workoutCompletions.userId, user.id),
    orderBy: [desc(workoutCompletions.completedAt)],
    limit: 5,
  });

  const displayName = user.profile?.displayName || 'Athlete';

  return (
    <div className="space-y-8">
      {/* Header Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-stone-border pb-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-burgundy">
            Member Overview
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-stone-primary mt-1">
            Welcome back, {displayName}
          </h1>
          <p className="text-sm text-stone-secondary mt-1">
            Focus: {user.profile?.fitnessGoal?.replace('_', ' ') || 'General Performance'} • Target:{' '}
            {user.profile?.weeklyWorkoutTarget || 4} sessions/week
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-surface-raised border border-stone-border rounded-xl px-4 py-2.5 flex items-center gap-3 shadow-tactile">
            <div className="w-8 h-8 rounded-lg bg-brand-terracotta/10 text-brand-terracotta flex items-center justify-center">
              <Flame className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-semibold text-stone-secondary block">
                Completions
              </span>
              <span className="font-serif font-bold text-lg text-stone-primary">
                {completions.length} Logged
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Training & Cookbook */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Continue Training (Col 7) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl text-stone-primary">Next Workout</h2>
            {trainingEntitled && (
              <Link href="/training" className="text-xs text-brand-burgundy font-semibold hover:underline">
                View all sessions →
              </Link>
            )}
          </div>

          {trainingEntitled ? (
            nextWorkout ? (
              <Card className="bg-white border-stone-border shadow-tactile-lg space-y-5">
                <div className="flex items-center justify-between">
                  <Badge variant="burgundy">
                    Week {nextWorkout.weekNumber} • Day {nextWorkout.dayNumber}
                  </Badge>
                  <span className="text-xs text-stone-secondary flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {nextWorkout.durationMinutes} mins
                  </span>
                </div>

                <div>
                  <h3 className="font-serif text-2xl text-stone-primary">
                    {nextWorkout.title}
                  </h3>
                  <p className="text-xs text-stone-secondary mt-1">{nextWorkout.focus}</p>
                </div>

                <div className="p-3.5 rounded-lg bg-surface-base border border-stone-border text-xs text-stone-primary space-y-1.5">
                  <span className="font-semibold uppercase text-[10px] tracking-wider text-stone-secondary block">
                    Exercises in this session:
                  </span>
                  <div className="space-y-1">
                    {(nextWorkout.exercises as any[]).slice(0, 3).map((ex, idx) => (
                      <div key={idx} className="flex justify-between">
                        <span>• {ex.name}</span>
                        <span className="text-stone-secondary">{ex.sets} sets × {ex.reps}</span>
                      </div>
                    ))}
                    {(nextWorkout.exercises as any[]).length > 3 && (
                      <p className="text-[11px] text-stone-secondary pt-1">
                        + {(nextWorkout.exercises as any[]).length - 3} more exercises
                      </p>
                    )}
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <Link href="/training" className="flex-1">
                    <Button variant="primary" className="w-full">
                      Start Session
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </Card>
            ) : null
          ) : (
            <Card className="bg-stone-sunken border-stone-border p-6 text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-brand-burgundy/10 text-brand-burgundy flex items-center justify-center mx-auto">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg text-stone-primary">Training Protocol Locked</h3>
              <p className="text-xs text-stone-secondary max-w-sm mx-auto">
                Your account does not currently hold a Training entitlement. Upgrade to unlock 12 weeks of phased programming.
              </p>
              <Link href="/#pricing" className="inline-block pt-2">
                <Button variant="outline" size="sm">
                  Unlock Training Protocol ($49)
                </Button>
              </Link>
            </Card>
          )}
        </div>

        {/* Right Column: Nutrition / Kitchen (Col 5) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl text-stone-primary">Kitchen Spotlight</h2>
            {cookbookEntitled && (
              <Link href="/cookbook" className="text-xs text-brand-terracotta font-semibold hover:underline">
                Explore recipes →
              </Link>
            )}
          </div>

          {cookbookEntitled ? (
            featuredRecipe ? (
              <Card className="bg-white border-stone-border shadow-tactile-lg overflow-hidden p-0 space-y-0">
                {featuredRecipe.imageUrl && (
                  <div className="h-44 w-full overflow-hidden bg-stone-sunken relative">
                    <img
                      src={featuredRecipe.imageUrl}
                      alt={featuredRecipe.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge variant="terracotta" className="bg-white/95">
                        Featured Recipe
                      </Badge>
                    </div>
                  </div>
                )}
                <div className="p-5 space-y-3">
                  <h3 className="font-serif text-lg text-stone-primary">
                    {featuredRecipe.title}
                  </h3>
                  <div className="grid grid-cols-3 gap-2 p-2.5 rounded-lg bg-surface-base text-center border border-stone-border text-xs">
                    <div>
                      <span className="block text-[10px] text-stone-secondary uppercase">Protein</span>
                      <strong className="text-brand-burgundy font-serif font-bold text-sm">
                        {featuredRecipe.proteinGrams}g
                      </strong>
                    </div>
                    <div>
                      <span className="block text-[10px] text-stone-secondary uppercase">Carbs</span>
                      <strong className="text-stone-primary font-serif font-bold text-sm">
                        {featuredRecipe.carbsGrams}g
                      </strong>
                    </div>
                    <div>
                      <span className="block text-[10px] text-stone-secondary uppercase">Calories</span>
                      <strong className="text-stone-primary font-serif font-bold text-sm">
                        {featuredRecipe.calories}
                      </strong>
                    </div>
                  </div>
                  <Link href="/cookbook" className="block pt-2">
                    <Button variant="outline" size="sm" className="w-full">
                      View Recipe Details
                    </Button>
                  </Link>
                </div>
              </Card>
            ) : null
          ) : (
            <Card className="bg-stone-sunken border-stone-border p-6 text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-brand-terracotta/10 text-brand-terracotta flex items-center justify-center mx-auto">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg text-stone-primary">The Kitchen Locked</h3>
              <p className="text-xs text-stone-secondary max-w-sm mx-auto">
                Your account does not hold a Cookbook entitlement. Unlock 60+ chef-crafted, high-protein recipes.
              </p>
              <Link href="/#pricing" className="inline-block pt-2">
                <Button variant="outline" size="sm">
                  Unlock The Kitchen ($39)
                </Button>
              </Link>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
