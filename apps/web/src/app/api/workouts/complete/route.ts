import { NextRequest, NextResponse } from 'next/server';
import { validateSession } from '@repo/auth';
import { db, workoutCompletions, auditEvents } from '@repo/database';
import { eq } from 'drizzle-orm';

export async function POST(req: NextRequest) {
  try {
    const sessionToken = req.cookies.get('fitness_session_token')?.value;
    const user = await validateSession(sessionToken);

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { workoutId, durationMinutes, notes } = await req.json();

    if (!workoutId) {
      return NextResponse.json({ error: 'Workout ID is required' }, { status: 400 });
    }

    const [completion] = await db
      .insert(workoutCompletions)
      .values({
        userId: user.id,
        workoutId,
        durationMinutes: durationMinutes || null,
        notes: notes || null,
      })
      .returning();

    await db.insert(auditEvents).values({
      actorId: user.id,
      actorType: 'user',
      action: 'workout.completed',
      targetType: 'workout',
      targetId: workoutId,
      metadata: { durationMinutes },
    });

    return NextResponse.json({ success: true, completion });
  } catch (err: any) {
    console.error('Error recording completion:', err);
    return NextResponse.json({ error: 'Failed to record completion' }, { status: 500 });
  }
}
