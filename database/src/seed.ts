import { db, products, programs, workouts, recipes, users } from './index';
import { PRODUCTS } from '@repo/domain';

export async function seed() {
  console.log('🌱 Seeding database...');

  // 1. Seed Products
  for (const productKey of Object.keys(PRODUCTS)) {
    const p = PRODUCTS[productKey];
    await db
      .insert(products)
      .values({
        id: p.id,
        slug: p.slug,
        name: p.name,
        headline: p.headline,
        description: p.description,
        priceInCents: p.priceInCents,
        currency: p.currency,
        active: true,
      })
      .onConflictDoNothing();
  }
  console.log('✅ Products seeded');

  // 2. Seed Default Admin
  await db
    .insert(users)
    .values({
      email: 'admin@fitness.example.com',
      role: 'admin',
      status: 'active',
      onboardingCompleted: true,
    })
    .onConflictDoNothing();
  console.log('✅ Default admin seeded (admin@fitness.example.com)');

  // 3. Seed Starter Program
  const [prog] = await db
    .insert(programs)
    .values({
      title: 'Phase 1: Foundations of Strength & Power',
      slug: 'phase-1-foundations',
      description: 'A 12-week progressive overload protocol engineered to build functional muscle, joint resiliency, and metabolic capacity.',
      totalWeeks: 12,
      level: 'All levels',
      status: 'published',
    })
    .onConflictDoNothing()
    .returning();

  if (prog) {
    // Seed Workouts for Week 1
    await db.insert(workouts).values([
      {
        programId: prog.id,
        weekNumber: 1,
        dayNumber: 1,
        title: 'Lower Body Kinetic Foundation',
        durationMinutes: 48,
        focus: 'Posterior chain strength, knee flexion & core stabilization',
        instructions: 'Warm up thoroughly with hip openers and ankle mobility. Rest 90-120 seconds between working sets.',
        exercises: [
          { name: 'Barbell Romanian Deadlift', sets: 4, reps: '8-10', restSeconds: 90, notes: 'Hinge at hips, keep lats engaged' },
          { name: 'Rear Foot Elevated Split Squat', sets: 3, reps: '10 / leg', restSeconds: 60, notes: 'Slight forward torso lean' },
          { name: 'Goblet Squat with 3s Pause', sets: 3, reps: '12', restSeconds: 60, notes: 'Pause at bottom, chest proud' },
          { name: 'Hanging Knee Raises', sets: 3, reps: '15', restSeconds: 45, notes: 'Controlled tempo, no swinging' }
        ],
      },
      {
        programId: prog.id,
        weekNumber: 1,
        dayNumber: 2,
        title: 'Upper Body Push & Pull Mechanics',
        durationMinutes: 45,
        focus: 'Chest, lats, scapular control and shoulder longevity',
        instructions: 'Focus on full range of motion. Emphasize a 3-second eccentric lower on pressing movements.',
        exercises: [
          { name: 'Dumbbell Neutral-Grip Floor Press', sets: 4, reps: '8-10', restSeconds: 90, notes: 'Elbows at 45 degrees' },
          { name: 'Single-Arm Chest-Supported Row', sets: 4, reps: '10 / arm', restSeconds: 60, notes: 'Squeeze shoulder blade at peak' },
          { name: 'Half-Kneeling Overhead Dumbbell Press', sets: 3, reps: '10', restSeconds: 60, notes: 'Lock core and glutes' },
          { name: 'Incline Face Pulls', sets: 3, reps: '15', restSeconds: 45, notes: 'External rotation focus' }
        ],
      },
      {
        programId: prog.id,
        weekNumber: 1,
        dayNumber: 3,
        title: 'Conditioning, Core & Aerobic Base',
        durationMinutes: 40,
        focus: 'Zone 2 threshold, rotational power, and work capacity',
        instructions: 'Keep heart rate in conversational zone for interval rounds. Maintain smooth breathing rhythm.',
        exercises: [
          { name: 'Kettlebell Clean to Front Squat', sets: 5, reps: '8 reps', restSeconds: 60, notes: 'Explosive hip snap' },
          { name: 'Plank Pull-Throughs', sets: 4, reps: '12 / side', restSeconds: 45, notes: 'Hips completely level' },
          { name: 'Farmer’s Carries', sets: 4, reps: '40 meters', restSeconds: 60, notes: 'Tall spine, heavy load' }
        ],
      }
    ]);
    console.log('✅ Workouts seeded');
  }

  // 4. Seed Recipes
  await db.insert(recipes).values([
    {
      title: 'Crispy Skillet Salmon with Herbed Chimichurri',
      slug: 'crispy-skillet-salmon-chimichurri',
      category: 'main',
      prepTimeMinutes: 12,
      cookTimeMinutes: 10,
      calories: 520,
      proteinGrams: 44,
      carbsGrams: 8,
      fatGrams: 34,
      imageUrl: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80',
      tags: ['High Protein', 'Keto Friendly', 'Gluten Free'],
      ingredients: [
        '2 wild-caught salmon fillets (6oz each)',
        '1 cup fresh flat-leaf parsley, finely chopped',
        '2 cloves garlic, minced',
        '3 tbsp extra virgin olive oil',
        '1 tbsp red wine vinegar',
        'Sea salt & cracked black pepper to taste'
      ],
      instructions: [
        'Pat salmon skin dry with paper towels. Season both sides with flaky sea salt.',
        'Whisk chopped parsley, garlic, olive oil, vinegar, salt and chili flakes in a small bowl.',
        'Heat a cast-iron skillet over medium-high heat with 1 tsp olive oil until hot.',
        'Place salmon skin-side down and press gently with a spatula for 10 seconds. Sear 5-6 mins.',
        'Flip once and cook for 2 more minutes until flesh is opaque and tender.',
        'Top immediately with spoonfuls of chimichurri and fresh lemon juice.'
      ],
      status: 'published',
    },
    {
      title: 'Charred Grass-Fed Flank Steak with Roasted Sweet Potatoes',
      slug: 'grass-fed-flank-steak-sweet-potatoes',
      category: 'main',
      prepTimeMinutes: 15,
      cookTimeMinutes: 20,
      calories: 610,
      proteinGrams: 52,
      carbsGrams: 42,
      fatGrams: 22,
      imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
      tags: ['High Protein', 'Performance Carbs', 'Gluten Free'],
      ingredients: [
        '1.2 lbs grass-fed flank steak',
        '2 medium sweet potatoes, cubed',
        '1 tbsp avocado oil',
        '1 tsp smoked paprika',
        '1 tsp garlic powder',
        'Flaky sea salt to finish'
      ],
      instructions: [
        'Preheat oven to 400°F (200°C). Toss cubed sweet potatoes with avocado oil, paprika, and salt.',
        'Roast potatoes on a baking sheet for 22 minutes until edges caramelize.',
        'Heat a seasoned grill pan or skillet over high heat.',
        'Sear flank steak for 4 minutes per side for medium-rare.',
        'Rest steak on a cutting board for 8 minutes before slicing thinly against the grain.',
        'Serve with roasted sweet potatoes and steamed greens.'
      ],
      status: 'published',
    },
    {
      title: 'Post-Workout Vanilla Berry Protein Whip',
      slug: 'vanilla-berry-protein-whip',
      category: 'shake',
      prepTimeMinutes: 5,
      cookTimeMinutes: 0,
      calories: 340,
      proteinGrams: 38,
      carbsGrams: 32,
      fatGrams: 4,
      imageUrl: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=800&q=80',
      tags: ['Post-Workout', 'Rapid Digestion', 'Vegetarian'],
      ingredients: [
        '1 scoop vanilla whey or plant isolate (30g protein)',
        '1 cup organic unsweetened almond milk',
        '1 cup frozen organic blueberries & blackberries',
        '1/2 cup non-fat plain Greek yogurt',
        '1 tsp pure vanilla extract',
        'Pinch of pink Himalayan salt'
      ],
      instructions: [
        'Add almond milk and Greek yogurt first to the blender pitcher.',
        'Add frozen berries, protein powder, and vanilla extract.',
        'Blend on high for 45-60 seconds until thick, velvety, and smooth.',
        'Pour into a chilled glass and enjoy within 45 minutes post-training.'
      ],
      status: 'published',
    }
  ]).onConflictDoNothing();
  console.log('✅ Recipes seeded');

  console.log('🎉 Seeding completed successfully!');
}

if (require.main === module) {
  seed()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error('Error seeding:', err);
      process.exit(1);
    });
}
