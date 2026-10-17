import { NextResponse } from 'next/server';
import { db, recipes } from '@repo/database';
import { eq } from 'drizzle-orm';

export const dynamic = 'force-dynamic';

const SIGNATURE_RECIPES = [
  {
    title: 'Grilled Chicken Jollof Bowl',
    slug: 'grilled-chicken-jollof-bowl',
    subtitle: 'POST-WORKOUT FUEL — PHASE 2 MACRO TARGET',
    category: 'main',
    prepTimeMinutes: 25,
    cookTimeMinutes: 20,
    servings: '2 bowls',
    calories: 480,
    proteinGrams: 42,
    carbsGrams: 45,
    fatGrams: 12,
    fiberGrams: 9,
    sodiumMg: 340,
    badge: 'LEAN CARBS • HIGH FIBER',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDBL2og1WbUbmHiUMkN1TLOPpvgTxfDKxAJqmOOEL-yXryBBsJiuKfqMi9tJLi9Qkmn-a6tys6QQDs-y1LIXyv9-a8mJC_aWcykEBp6gqBtFw62HZfcKzu8-mHASDYzIzZXUR3xEEmJInDQt3gzHm8p8YEPtAemJV2FF-LIAvBfGuv2SNaNqBvip05H6NloKRTn7PY1AYCDz4AtltajzgOcB3eRE0lVrtkOtWo7JWKAs54xWRTvrCotvg',
    coachComment:
      'Yes, jollof rice is 100% allowed on this program! We balance the glycemic response by incorporating cauliflower grains and loading up on seasoned grilled chicken breast. Enjoy every bite guilt-free.',
    tags: ['Gluten-Free', 'Meal Prep Friendly', 'Lagos Studio Favorite', 'West African Fusion'],
    ingredients: [
      { name: 'Chicken breast, sliced & seasoned in suya spices', amount: '250g' },
      { name: 'Brown rice or parboiled rice blend', amount: '1 cup' },
      { name: 'Grated cauliflower rice', amount: '1 cup' },
      { name: 'Plum tomatoes & red bell pepper (tatashe)', amount: '3 large / 1 red' },
      { name: 'Red onion & scotch bonnets (atarodo)', amount: '1 med / 2 peppers' },
      { name: 'Cold-pressed olive oil or coconut oil', amount: '1 tbsp' },
      { name: 'Fresh thyme, curry powder, and sea salt', amount: 'To taste' },
      { name: 'Ripe avocado & roasted plantain slices for garnish', amount: '1/2 avocado' },
    ],
    instructions: [
      {
        number: '01',
        title: 'Sear the Protein',
        instruction:
          'Season and sear the chicken breast until deeply golden. Use a heavy cast iron or grill pan over medium-high heat with half of the cold-pressed oil to lock in juices and give that authentic flame-kissed aroma.',
      },
      {
        number: '02',
        title: 'Aromatic Base',
        instruction:
          'Blend tomatoes, peppers, and onions into a smooth aromatic paste. Reduce this pepper reduction in a saucepan with thyme and curry powder until the natural oils rise to the surface, creating that quintessential jollof profile.',
      },
      {
        number: '03',
        title: 'Simmer & Steam Grains',
        instruction:
          'Simmer sauce, fold in grains, and steam until fluffy. Add the brown rice first with low-sodium chicken stock, then introduce the cauliflower grains in the final 5 minutes to preserve crunch and maximize fiber volume.',
      },
      {
        number: '04',
        title: 'Bowl Assembly',
        instruction:
          'Assemble bowl with avocado slices and grilled protein. Top with air-fried golden plantain discs, fresh lime wedges, toasted pumpkin seeds, and chopped spring onions for a restorative post-session feast.',
      },
    ],
    status: 'published' as const,
  },
  {
    title: 'Suya Spiced Salmon & Plantain Mash',
    slug: 'suya-spiced-salmon-plantain-mash',
    subtitle: 'OMEGA-3 RESTORATION — LEAN PROTOCOL',
    category: 'main',
    prepTimeMinutes: 20,
    cookTimeMinutes: 15,
    servings: '1 bowl',
    calories: 490,
    proteinGrams: 38,
    carbsGrams: 35,
    fatGrams: 18,
    fiberGrams: 7,
    sodiumMg: 290,
    badge: 'High Protein',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBLOUUv16tdJKMYMTzyTzFiHbFL5TLYXW0ws7-qUZMPmT51T_m8aaRRdP4eRVgInPCUm2Fu0yl4kXhLuxfy_c1Xji9OwCq8RRjjhR2hjyoejJt3vxIc0JhGBQf0wDkt1kMTwYTGLQ8As5OLsV3mbo_Uw_YRaCahgtYpK8ivPaC_AmK6WBUlzqDVokgsL2gRCppRgAeCTbOZOvULEN4FO4qXGDoFFw3iJPHYZ-kXpiPl2slRYOwZqkAuJA',
    coachComment:
      'Salmon skin contains collagen and concentrated astaxanthin. Searing skin-down first retains moisture while giving that irresistible crisp texture.',
    tags: ['High Omega-3', 'Anti-Inflammatory', 'Studio Favorite', 'Northern Heritage'],
    ingredients: [
      { name: 'Wild Atlantic Salmon Fillet', amount: '200g' },
      { name: 'Authentic Northern Suya Yaji Rub (kuli-kuli, ginger, pepper)', amount: '1.5 tbsp' },
      { name: 'Semi-Ripe Green Plantains (peeled & steamed)', amount: '2 medium' },
      { name: 'Steamed Ugu (Pumpkin leaves) or Baby Spinach', amount: '1 cup' },
      { name: 'Extra Virgin Olive Oil', amount: '1 tsp' },
      { name: 'Fresh Lime', amount: '1 whole' },
    ],
    instructions: [
      {
        number: '01',
        title: 'Spice Crust Application',
        instruction: 'Coat salmon fillet evenly with roasted suya yaji spice rub and gentle pinch of flaked sea salt.',
      },
      {
        number: '02',
        title: 'Cast Iron Sear',
        instruction: 'Pan-sear skin-side down in pre-heated cast iron for 4 minutes until crisp, flip for 2-3 minutes.',
      },
      {
        number: '03',
        title: 'Plantain Velouté Mash',
        instruction: 'Boil green plantains in salted broth until tender, then crush coarsely with cold-pressed olive oil.',
      },
      {
        number: '04',
        title: 'Plating & Greens',
        instruction: 'Bed the salmon on velvety plantain mash, garnish with quick-wilted ugu greens and lime squeeze.',
      },
    ],
    status: 'published' as const,
  },
  {
    title: 'Smoked Mackerel & Garden Egg Stew',
    slug: 'smoked-mackerel-garden-egg-stew',
    subtitle: 'METABOLIC FIBER BOOST — GUT SANCTUARY',
    category: 'main',
    prepTimeMinutes: 30,
    cookTimeMinutes: 20,
    servings: '2 bowls',
    calories: 380,
    proteinGrams: 34,
    carbsGrams: 28,
    fatGrams: 14,
    fiberGrams: 11,
    sodiumMg: 310,
    badge: 'High Fiber',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAxdimTR_-Ed_N_geS8lRuYW3PEZC_Hh1hNnFsd3_-jB5-NtxihFagaYsleO20jdGu5uKWQCld5BLjNj-JFfNtOog0ViGOsI61l_65Al1uRsD-AFscPrHB7cZk-7IdvrUeSHTGtQfZBj6uiIxT_oznBderBoK1LUPS_Z2kNRT1rPOS9TvgK4FmIPGv4n6GN1fCbNblDYjEiU3HUkT43wA6kN5BSsQV9J_cY35MdiYjPRXVoLWjkcsWK9A',
    coachComment:
      'Garden eggs act like sponges for the rich fish oils and pepper reduction, giving maximum satiety with ultra-low caloric density.',
    tags: ['Prebiotic Rich', 'Blood Sugar Friendly', 'Low Glycemic'],
    ingredients: [
      { name: 'Garden Eggs (African aubergines), boiled & crushed', amount: '300g' },
      { name: 'Hardwood-Smoked Mackerel (deboned & flaked)', amount: '1 whole' },
      { name: 'Plum Tomatoes & Habanero base', amount: '3 tomatoes / 2 rodo' },
      { name: 'Ground Uziza Seeds & Crayfish', amount: '1 tsp each' },
      { name: 'Unrefined Red Palm Oil (measured dose)', amount: '1 tbsp' },
      { name: 'Steamed Sweet Potato (for serving)', amount: '1 medium' },
    ],
    instructions: [
      {
        number: '01',
        title: 'Boil Garden Eggs',
        instruction: 'Steam garden eggs for 12 minutes until skins slip off easily; mash pulp coarsely with a fork.',
      },
      {
        number: '02',
        title: 'Clarify Palm Oil Base',
        instruction: 'Gently warm unrefined palm oil with sliced shallots and simmer crushed tomatoes until translucent.',
      },
      {
        number: '03',
        title: 'Fold Smoked Fish',
        instruction: 'Incorporate flaked smoked mackerel, crayfish, and peppery uziza seeds into the aromatic base.',
      },
      {
        number: '04',
        title: 'Simmer with Roots',
        instruction: 'Stir in crushed aubergine, cook on low heat for 6 minutes, and serve warm with steamed sweet potato slices.',
      },
    ],
    status: 'published' as const,
  },
  {
    title: 'Protein Ogi with Crushed Walnuts & Berries',
    slug: 'protein-ogi-crushed-walnuts-berries',
    subtitle: 'MORNING METABOLISM — ENZYME ACTIVE',
    category: 'breakfast',
    prepTimeMinutes: 10,
    cookTimeMinutes: 5,
    servings: '1 bowl',
    calories: 310,
    proteinGrams: 24,
    carbsGrams: 42,
    fatGrams: 7,
    fiberGrams: 5,
    sodiumMg: 110,
    badge: 'Breakfast',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCNhyCgG3PDy5KeEavezpXl6a6GpEDK9BGYL83ofj3Ud_6LHDJwOkzT8cx2ElpvbTD3Rosy1kTiLJwSKs-3zChkCHjbmqY3jn3VpCnXzXcz5TRlR7lBgee6Y1C0eH114Hi89Yve844iacUhbl3-EosjIQjiftOz85_9t4gGAsK3jj8yq8qcviM2ANQ9fnNs_W4UsDvV_aPEpbtax0rXDLEZI5qMC48P11gEaru276XjMLNXFRURsBx7HA',
    coachComment:
      'Fermented ogi has live lactic acid bacteria that prepare your digestive enzyme cascade before morning training sessions.',
    tags: ['Gut Health', 'Under 15 Mins', 'Pre-Workout Fuel'],
    ingredients: [
      { name: 'Fermented Brown Corn Ogi Paste', amount: '60g' },
      { name: 'Clean Vanilla Whey or Pea Protein', amount: '1 scoop (30g)' },
      { name: 'Roasted Nigerian Walnuts (Asala), crushed', amount: '30g' },
      { name: 'Fresh Dark Blackberries & Blueberries', amount: '1 handful' },
      { name: 'Ceylon Cinnamon & Raw Wild Honey', amount: '1 tsp' },
      { name: 'Unsweetened Almond Milk', amount: '2 tbsp' },
    ],
    instructions: [
      {
        number: '01',
        title: 'Slurry Preparation',
        instruction: 'Whisk ogi paste in 3 tbsp cool water in a stoneware bowl until completely smooth.',
      },
      {
        number: '02',
        title: 'Boiling Water Stream',
        instruction: 'Pour rapidly boiling water in a continuous high stream while stirring clockwise until pudding thickens.',
      },
      {
        number: '03',
        title: 'Protein Fold',
        instruction: 'Let steam settle for 60 seconds, then whisk in protein powder with a splash of almond milk.',
      },
      {
        number: '04',
        title: 'Crunch Garnish',
        instruction: 'Crown with crushed Nigerian walnuts, fresh wild berries, and a dust of aromatic cinnamon.',
      },
    ],
    status: 'published' as const,
  },
  {
    title: 'Efo Riro with Lean Beef & Shrimps',
    slug: 'efo-riro-lean-beef-shrimps',
    subtitle: 'IRON & CELLULAR VITALITY — DINNER REPAIR',
    category: 'main',
    prepTimeMinutes: 35,
    cookTimeMinutes: 25,
    servings: '3 servings',
    calories: 415,
    proteinGrams: 44,
    carbsGrams: 16,
    fatGrams: 14,
    fiberGrams: 8,
    sodiumMg: 380,
    badge: 'High Iron & Protein',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA0GPD_04nWsh--BmlMb1KK9rjE4HwtejIis51BuhgoPvD7nEocVBFS8NhOtT_kCiO5m3HCBdgfio4pNlDxxNkzs_nMBLrvu3roQeguMTZjDRbwP2GO9asB1iS_CicxsNWF6w6MvDmdc5Ws7v55A-M1bydY3tS8IbsbINQ_WxHS2NvDpOYpAkgWXhjo7dnmhzvrtQwH_VEZvWGu2T3hHj1BgYvl3fVemW-TurGEs1vHwUFPQNYBa_v2Yw',
    coachComment:
      'Never over-boil efo greens! Adding them at the very end and turning off heat locks in folate and vibrant green chlorophyll.',
    tags: ['High Iron', 'Lean Sirloin', 'Slow Cooked Broth', 'Yoruba Traditional'],
    ingredients: [
      { name: 'Fresh Efo Shoko or Spinach (blanched & squeezed dry)', amount: '400g' },
      { name: 'Lean Sirloin Beef (cubed & slow-simmered)', amount: '200g' },
      { name: 'Pink Tiger Prawns (shelled & deveined)', amount: '150g' },
      { name: 'Fermented Locust Beans (Iru Woro)', amount: '2 tbsp' },
      { name: 'Coarsely crushed Tatashe & Shombo pepper base', amount: '1 cup' },
      { name: 'Ground Dried Crayfish', amount: '1 tbsp' },
    ],
    instructions: [
      {
        number: '01',
        title: 'Aromatics Reduction',
        instruction: 'Simmer crushed tatashe with washed iru and ground crayfish until moisture reduces by half.',
      },
      {
        number: '02',
        title: 'Incorporate Sirloin',
        instruction: 'Add slow-cooked tender lean beef cubes and 3 tbsp concentrated broth.',
      },
      {
        number: '03',
        title: 'Prawn Poach',
        instruction: 'Add pink tiger prawns and simmer gently for 3 minutes until curled and tender.',
      },
      {
        number: '04',
        title: 'Fold Green Leafy Canopy',
        instruction: 'Fold blanched efo shoko into hot aromatic sauce, immediately remove from heat, and let residual warmth wilt leaves perfectly.',
      },
    ],
    status: 'published' as const,
  },
  {
    title: 'Post-Workout Vanilla Berry Protein Whip',
    slug: 'vanilla-berry-protein-whip',
    subtitle: 'RAPID GLYCOGEN REPLENISHMENT',
    category: 'shake',
    prepTimeMinutes: 5,
    cookTimeMinutes: 0,
    servings: '1 serving',
    calories: 340,
    proteinGrams: 38,
    carbsGrams: 32,
    fatGrams: 4,
    fiberGrams: 6,
    sodiumMg: 120,
    badge: 'Post-Workout',
    imageUrl:
      'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=800&q=80',
    coachComment:
      'Take this within 45 minutes of completing your training protocol to maximize muscle protein synthesis and reduce delayed onset muscle soreness.',
    tags: ['Post-Workout', 'Rapid Digestion', 'Vegetarian'],
    ingredients: [
      { name: 'Vanilla whey or plant isolate (30g protein)', amount: '1 scoop' },
      { name: 'Organic unsweetened almond milk', amount: '1 cup' },
      { name: 'Frozen organic blueberries & blackberries', amount: '1 cup' },
      { name: 'Non-fat plain Greek yogurt', amount: '1/2 cup' },
      { name: 'Pure vanilla extract', amount: '1 tsp' },
      { name: 'Pink Himalayan salt', amount: 'Pinch' },
    ],
    instructions: [
      {
        number: '01',
        title: 'Base Liquids',
        instruction: 'Add almond milk and Greek yogurt first to blender pitcher to prevent protein clumping.',
      },
      {
        number: '02',
        title: 'Blend Berries & Protein',
        instruction: 'Add frozen berries, protein powder, and vanilla extract.',
      },
      {
        number: '03',
        title: 'Emulsify & Serve',
        instruction: 'Blend on high for 45-60 seconds until thick, velvety, and smooth. Enjoy cold.',
      },
    ],
    status: 'published' as const,
  },
];

export async function POST() {
  try {
    let insertedCount = 0;
    let updatedCount = 0;

    for (const r of SIGNATURE_RECIPES) {
      const existing = await db.query.recipes.findFirst({
        where: eq(recipes.slug, r.slug),
      });

      if (existing) {
        await db
          .update(recipes)
          .set({
            title: r.title,
            subtitle: r.subtitle,
            category: r.category,
            prepTimeMinutes: r.prepTimeMinutes,
            cookTimeMinutes: r.cookTimeMinutes,
            servings: r.servings,
            calories: r.calories,
            proteinGrams: r.proteinGrams,
            carbsGrams: r.carbsGrams,
            fatGrams: r.fatGrams,
            fiberGrams: r.fiberGrams,
            sodiumMg: r.sodiumMg,
            imageUrl: r.imageUrl,
            coachComment: r.coachComment,
            tags: r.tags,
            ingredients: r.ingredients,
            instructions: r.instructions,
            status: r.status,
          })
          .where(eq(recipes.id, existing.id));
        updatedCount++;
      } else {
        await db.insert(recipes).values({
          title: r.title,
          slug: r.slug,
          subtitle: r.subtitle,
          category: r.category,
          prepTimeMinutes: r.prepTimeMinutes,
          cookTimeMinutes: r.cookTimeMinutes,
          servings: r.servings,
          calories: r.calories,
          proteinGrams: r.proteinGrams,
          carbsGrams: r.carbsGrams,
          fatGrams: r.fatGrams,
          fiberGrams: r.fiberGrams,
          sodiumMg: r.sodiumMg,
          imageUrl: r.imageUrl,
          coachComment: r.coachComment,
          tags: r.tags,
          ingredients: r.ingredients,
          instructions: r.instructions,
          status: r.status,
        });
        insertedCount++;
      }
    }

    return NextResponse.json({
      success: true,
      message: `Sync completed: ${insertedCount} inserted, ${updatedCount} updated.`,
      insertedCount,
      updatedCount,
    });
  } catch (error: any) {
    console.error('Error syncing signature recipes:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to sync recipes' },
      { status: 500 }
    );
  }
}
