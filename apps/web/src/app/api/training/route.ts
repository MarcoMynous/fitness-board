import { NextRequest, NextResponse } from 'next/server';
import { validateSession } from '@repo/auth';
import { hasTrainingAccess } from '@repo/domain';
import { db, programs, workouts, workoutCompletions } from '@repo/database';
import { eq } from 'drizzle-orm';

export async function GET(req: NextRequest) {
  const sessionToken = req.cookies.get('fitness_session_token')?.value;
  const user = await validateSession(sessionToken);

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const hasAccess = hasTrainingAccess(user.entitlements as any);
  if (!hasAccess) {
    return NextResponse.json({ hasAccess: false });
  }

  const program = await db.query.programs.findFirst({
    where: eq(programs.status, 'published'),
  });

  const allWorkouts = program
    ? await db.query.workouts.findMany({
        where: eq(workouts.programId, program.id),
      })
    : [];

  const completions = await db.query.workoutCompletions.findMany({
    where: eq(workoutCompletions.userId, user.id),
  });

  return NextResponse.json({
    hasAccess: true,
    program,
    workouts: allWorkouts,
    completions: completions.map((c) => c.workoutId),
  });
}
