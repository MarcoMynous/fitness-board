import { NextRequest, NextResponse } from 'next/server';
import { validateSession } from '@repo/auth';
import { db, profiles, users } from '@repo/database';
import { eq } from 'drizzle-orm';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const sessionToken = req.cookies.get('fitness_session_token')?.value;
    const user = await validateSession(sessionToken);

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const profile = await db.query.profiles.findFirst({
      where: eq(profiles.userId, user.id),
    });

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        profile,
        entitlements: user.entitlements,
      },
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const sessionToken = req.cookies.get('fitness_session_token')?.value;
    const user = await validateSession(sessionToken);

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { fullName, displayName, fitnessGoal, experienceLevel, trainingEnvironment, weeklyWorkoutTarget } = body;

    const existing = await db.query.profiles.findFirst({
      where: eq(profiles.userId, user.id),
    });

    let updatedProfile;
    if (existing) {
      const updateData: Record<string, any> = { updatedAt: new Date() };
      if (fullName !== undefined) updateData.fullName = fullName;
      if (displayName !== undefined) updateData.displayName = displayName;
      if (fitnessGoal !== undefined) updateData.fitnessGoal = fitnessGoal;
      if (experienceLevel !== undefined) updateData.experienceLevel = experienceLevel;
      if (trainingEnvironment !== undefined) updateData.trainingEnvironment = trainingEnvironment;
      if (weeklyWorkoutTarget !== undefined) updateData.weeklyWorkoutTarget = Number(weeklyWorkoutTarget);

      [updatedProfile] = await db
        .update(profiles)
        .set(updateData)
        .where(eq(profiles.id, existing.id))
        .returning();
    } else {
      [updatedProfile] = await db
        .insert(profiles)
        .values({
          userId: user.id,
          fullName: fullName || user.email.split('@')[0],
          displayName: displayName || fullName || user.email.split('@')[0],
          fitnessGoal: fitnessGoal || 'strength_hypertrophy',
          experienceLevel: experienceLevel || 'intermediate',
          trainingEnvironment: trainingEnvironment || 'commercial_gym',
          weeklyWorkoutTarget: weeklyWorkoutTarget ? Number(weeklyWorkoutTarget) : 4,
        })
        .returning();
    }

    return NextResponse.json({ success: true, profile: updatedProfile });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
