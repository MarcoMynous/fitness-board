import { NextRequest, NextResponse } from 'next/server';
import { validateSession } from '@repo/auth';
import { hasCookbookAccess } from '@repo/domain';
import { db, recipes, savedRecipes } from '@repo/database';
import { eq, desc } from 'drizzle-orm';

export async function GET(req: NextRequest) {
  const sessionToken = req.cookies.get('fitness_session_token')?.value;
  const user = await validateSession(sessionToken);

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const hasAccess = user.role === 'admin' || hasCookbookAccess(user.entitlements as any);
  if (!hasAccess) {
    return NextResponse.json({ hasAccess: false, recipes: [] });
  }

  const allRecipes = await db.query.recipes.findMany({
    where: eq(recipes.status, 'published'),
    orderBy: [desc(recipes.createdAt)],
  });

  const userSaved = await db.query.savedRecipes.findMany({
    where: eq(savedRecipes.userId, user.id),
  });

  return NextResponse.json({
    hasAccess: true,
    recipes: allRecipes,
    savedRecipeIds: userSaved.map((s) => s.recipeId),
  });
}
