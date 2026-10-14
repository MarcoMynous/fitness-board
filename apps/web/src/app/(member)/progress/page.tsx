import React from 'react';
import { cookies } from 'next/headers';
import { validateSession } from '@repo/auth';
import { db, workoutCompletions, workouts } from '@repo/database';
import { Card, Badge } from '@repo/ui';
import { TrendingUp, CheckCircle2, Calendar, Award, Flame, Dumbbell } from 'lucide-react';
import { eq, desc } from 'drizzle-orm';

export const dynamic = 'force-dynamic';


export default async function ProgressPage() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('fitness_session_token')?.value;
  const user = await validateSession(sessionToken);

  if (!user) return null;

  const completions = await db.query.workoutCompletions.findMany({
    where: eq(workoutCompletions.userId, user.id),
    orderBy: [desc(workoutCompletions.completedAt)],
    with: {
      workout: true,
    },
  });

  const totalCompletions = completions.length;
  const totalMinutes = completions.reduce(
    (acc, curr) => acc + (curr.durationMinutes || curr.workout?.durationMinutes || 45),
    0
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-stone-border pb-6 space-y-2">
        <Badge variant="burgundy">Kinetic Trajectory</Badge>
        <h1 className="font-serif text-3xl sm:text-4xl text-stone-primary">
          Training Progress & Milestones
        </h1>
        <p className="text-sm text-stone-secondary">
          Verified completion history and progressive volume metrics.
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card className="bg-white border-stone-border shadow-tactile flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-brand-burgundy/10 text-brand-burgundy flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs uppercase font-semibold text-stone-secondary block">
              Completed Sessions
            </span>
            <span className="font-serif font-bold text-3xl text-stone-primary">
              {totalCompletions}
            </span>
          </div>
        </Card>

        <Card className="bg-white border-stone-border shadow-tactile flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-brand-terracotta/10 text-brand-terracotta flex items-center justify-center shrink-0">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs uppercase font-semibold text-stone-secondary block">
              Time Under Tension
            </span>
            <span className="font-serif font-bold text-3xl text-stone-primary">
              {totalMinutes} <span className="text-sm font-sans font-normal text-stone-secondary">mins</span>
            </span>
          </div>
        </Card>

        <Card className="bg-white border-stone-border shadow-tactile flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-state-success/10 text-state-success flex items-center justify-center shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs uppercase font-semibold text-stone-secondary block">
              Consistency Status
            </span>
            <span className="font-serif font-bold text-xl text-stone-primary">
              {totalCompletions > 0 ? 'Protocol Active' : 'First Step Ready'}
            </span>
          </div>
        </Card>
      </div>

      {/* Activity Timeline */}
      <div className="space-y-4">
        <h2 className="font-serif text-2xl text-stone-primary">Completed Sessions</h2>

        {completions.length === 0 ? (
          <Card className="text-center py-12 text-stone-secondary text-sm space-y-2">
            <p>You have not logged any workouts yet.</p>
            <p className="text-xs text-stone-secondary">
              Head to the <strong>Training</strong> tab to start your first session and log your completion!
            </p>
          </Card>
        ) : (
          <div className="space-y-3">
            {completions.map((comp) => (
              <Card
                key={comp.id}
                className="bg-white border-stone-border shadow-tactile flex items-center justify-between p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-surface-base border border-stone-border text-brand-burgundy flex items-center justify-center">
                    <Dumbbell className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-stone-primary">
                      {comp.workout?.title || 'Workout Session'}
                    </h3>
                    <p className="text-xs text-stone-secondary">
                      Week {comp.workout?.weekNumber} • Day {comp.workout?.dayNumber} •{' '}
                      {comp.durationMinutes || comp.workout?.durationMinutes || 45} mins
                    </p>
                  </div>
                </div>

                <div className="text-right text-xs text-stone-secondary flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{new Date(comp.completedAt).toLocaleDateString()}</span>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
