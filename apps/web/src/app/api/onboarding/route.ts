import { NextRequest, NextResponse } from 'next/server';
import { validateSession } from '@repo/auth';
import { db, profiles, users, auditEvents } from '@repo/database';
import { OnboardingInputSchema } from '@repo/domain';
import { eq } from 'drizzle-orm';

export async function POST(req: NextRequest) {
  try {
    const sessionToken = req.cookies.get('fitness_session_token')?.value;
    const user = await validateSession(sessionToken);

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized. Please sign in.' }, { status: 401 });
    }

    const body = await req.json();
    const parsed = OnboardingInputSchema.parse(body);

    // Upsert profile
    const existingProfile = await db.query.profiles.findFirst({
      where: eq(profiles.userId, user.id),
    });

    if (existingProfile) {
      await db
        .update(profiles)
        .set({
          fullName: parsed.fullName,
          displayName: parsed.displayName,
          fitnessGoal: parsed.fitnessGoal,
          experienceLevel: parsed.experienceLevel,
          trainingEnvironment: parsed.trainingEnvironment,
          dietaryPreferences: parsed.dietaryPreferences,
          weeklyWorkoutTarget: parsed.weeklyWorkoutTarget,
          receiveWeeklyDigest: parsed.receiveWeeklyDigest,
          updatedAt: new Date(),
        })
        .where(eq(profiles.id, existingProfile.id));
    } else {
      await db.insert(profiles).values({
        userId: user.id,
        fullName: parsed.fullName,
        displayName: parsed.displayName,
        fitnessGoal: parsed.fitnessGoal,
        experienceLevel: parsed.experienceLevel,
        trainingEnvironment: parsed.trainingEnvironment,
        dietaryPreferences: parsed.dietaryPreferences,
        weeklyWorkoutTarget: parsed.weeklyWorkoutTarget,
        receiveWeeklyDigest: parsed.receiveWeeklyDigest,
      });
    }

    // Mark user onboarding completed
    await db
      .update(users)
      .set({ onboardingCompleted: true, updatedAt: new Date() })
      .where(eq(users.id, user.id));

    // Audit log
    await db.insert(auditEvents).values({
      actorId: user.id,
      actorType: 'user',
      action: 'onboarding.completed',
      targetType: 'user',
      targetId: user.id,
      metadata: { goal: parsed.fitnessGoal, experience: parsed.experienceLevel },
    });

    return NextResponse.json({ success: true, redirect: '/home' });
  } catch (error: any) {
    console.error('Error saving onboarding:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to save onboarding responses' },
      { status: 400 }
    );
  }
}
