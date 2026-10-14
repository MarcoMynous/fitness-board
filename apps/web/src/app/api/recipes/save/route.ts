import { NextRequest, NextResponse } from 'next/server';
import { validateSession } from '@repo/auth';
import { db, savedRecipes } from '@repo/database';
import { and, eq } from 'drizzle-orm';

export async function POST(req: NextRequest) {
  try {
    const sessionToken = req.cookies.get('fitness_session_token')?.value;
    const user = await validateSession(sessionToken);

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { recipeId } = await req.json();
    if (!recipeId) {
      return NextResponse.json({ error: 'Recipe ID required' }, { status: 400 });
    }

    // Toggle saved state
    const existing = await db.query.savedRecipes.findFirst({
      where: and(eq(savedRecipes.userId, user.id), eq(savedRecipes.recipeId, recipeId)),
    });

    if (existing) {
      await db.delete(savedRecipes).where(eq(savedRecipes.id, existing.id));
      return NextResponse.json({ saved: false });
    } else {
      await db.insert(savedRecipes).values({
        userId: user.id,
        recipeId,
      });
      return NextResponse.json({ saved: true });
    }
  } catch (err: any) {
    console.error('Error toggling recipe bookmark:', err);
    return NextResponse.json({ error: 'Failed to bookmark recipe' }, { status: 500 });
  }
}
