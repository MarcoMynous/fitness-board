import { NextRequest, NextResponse } from 'next/server';
import { db, recipes, sql } from '@repo/database';
import { eq, desc } from 'drizzle-orm';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const all = await db.query.recipes.findMany({
      orderBy: [desc(recipes.createdAt)],
    });

    return NextResponse.json({ success: true, recipes: all });
  } catch (error: any) {
    console.error('Error fetching recipes in admin API:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch recipes' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      title,
      slug,
      subtitle,
      category,
      prepTimeMinutes,
      cookTimeMinutes,
      servings,
      calories,
      proteinGrams,
      carbsGrams,
      fatGrams,
      fiberGrams,
      sodiumMg,
      coachComment,
      imageUrl,
      ingredients,
      instructions,
      tags,
      status,
    } = body;

    if (!title || !category) {
      return NextResponse.json(
        { success: false, error: 'Title and category are required' },
        { status: 400 }
      );
    }

    const recipeSlug =
      slug?.trim() ||
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

    const [inserted] = await db
      .insert(recipes)
      .values({
        title,
        slug: recipeSlug,
        subtitle: subtitle || null,
        category: category || 'main',
        prepTimeMinutes: Number(prepTimeMinutes) || 15,
        cookTimeMinutes: Number(cookTimeMinutes) || 15,
        servings: servings || '2 servings',
        calories: Number(calories) || 450,
        proteinGrams: Number(proteinGrams) || 35,
        carbsGrams: Number(carbsGrams) || 40,
        fatGrams: Number(fatGrams) || 15,
        fiberGrams: Number(fiberGrams) || 6,
        sodiumMg: Number(sodiumMg) || 300,
        coachComment: coachComment || null,
        imageUrl: imageUrl || null,
        ingredients: Array.isArray(ingredients) ? ingredients : [],
        instructions: Array.isArray(instructions) ? instructions : [],
        tags: Array.isArray(tags) ? tags : [],
        status: status || 'published',
      })
      .returning();

    return NextResponse.json({ success: true, recipe: inserted });
  } catch (error: any) {
    console.error('Error creating recipe:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create recipe' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...data } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: 'Recipe ID is required' }, { status: 400 });
    }

    const updatePayload: Record<string, any> = {};

    if (data.title !== undefined) updatePayload.title = data.title;
    if (data.slug !== undefined) updatePayload.slug = data.slug;
    if (data.subtitle !== undefined) updatePayload.subtitle = data.subtitle;
    if (data.category !== undefined) updatePayload.category = data.category;
    if (data.prepTimeMinutes !== undefined) updatePayload.prepTimeMinutes = Number(data.prepTimeMinutes);
    if (data.cookTimeMinutes !== undefined) updatePayload.cookTimeMinutes = Number(data.cookTimeMinutes);
    if (data.servings !== undefined) updatePayload.servings = data.servings;
    if (data.calories !== undefined) updatePayload.calories = Number(data.calories);
    if (data.proteinGrams !== undefined) updatePayload.proteinGrams = Number(data.proteinGrams);
    if (data.carbsGrams !== undefined) updatePayload.carbsGrams = Number(data.carbsGrams);
    if (data.fatGrams !== undefined) updatePayload.fatGrams = Number(data.fatGrams);
    if (data.fiberGrams !== undefined) updatePayload.fiberGrams = Number(data.fiberGrams);
    if (data.sodiumMg !== undefined) updatePayload.sodiumMg = Number(data.sodiumMg);
    if (data.coachComment !== undefined) updatePayload.coachComment = data.coachComment;
    if (data.imageUrl !== undefined) updatePayload.imageUrl = data.imageUrl;
    if (data.ingredients !== undefined) updatePayload.ingredients = data.ingredients;
    if (data.instructions !== undefined) updatePayload.instructions = data.instructions;
    if (data.tags !== undefined) updatePayload.tags = data.tags;
    if (data.status !== undefined) updatePayload.status = data.status;

    const [updated] = await db
      .update(recipes)
      .set(updatePayload)
      .where(eq(recipes.id, id))
      .returning();

    return NextResponse.json({ success: true, recipe: updated });
  } catch (error: any) {
    console.error('Error updating recipe:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update recipe' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'Recipe ID is required' }, { status: 400 });
    }

    await db.delete(recipes).where(eq(recipes.id, id));

    return NextResponse.json({ success: true, deletedId: id });
  } catch (error: any) {
    console.error('Error deleting recipe:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete recipe' },
      { status: 500 }
    );
  }
}
