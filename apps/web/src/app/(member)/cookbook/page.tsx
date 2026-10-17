'use client';

import React, { useState, useMemo } from 'react';
import {
  Flame,
  Search,
  Bookmark,
  BookmarkCheck,
  ArrowRight,
  Clock,
  Sparkles,
  Lightbulb,
  X,
  ChevronDown,
  Leaf,
  CheckCircle2,
  UtensilsCrossed,
  ShoppingCart,
  CalendarCheck,
  Check,
  CookingPot,
  PieChart,
  ListChecks,
  Dumbbell,
} from 'lucide-react';

interface RecipeIngredient {
  name: string;
  amount: string;
}

interface RecipeStep {
  number: string;
  title: string;
  instruction: string;
}

interface Recipe {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: string[];
  prepTime: string;
  servings: string;
  protein: string;
  calories: string;
  fiber: string;
  sodium: string;
  macroSplit: string;
  badge: string;
  fusionTag: string;
  rating: string;
  imageUrl: string;
  coachTip: string;
  tags: string[];
  ingredientsList: RecipeIngredient[];
  stepsList: RecipeStep[];
  ingredients: string[];
  steps: string[];
}

const FEATURED_HERO_RECIPE: Recipe = {
  id: 'featured-jollof-cauliflower',
  title: 'Grilled Chicken Jollof Bowl',
  subtitle: 'POST-WORKOUT FUEL — PHASE 2 MACRO TARGET',
  description:
    'A nutrient-dense West African classic adapted for lean muscle recovery with slow-release carbs and rich aromatic spices.',
  category: ['all', 'dinner', 'lunch', 'high protein'],
  prepTime: '25 min',
  servings: '2 bowls',
  protein: '42g',
  calories: '480 kcal',
  fiber: '9G',
  sodium: '340MG',
  macroSplit: '35% Protein • 45% Complex Carbs • 20% Healthy Fats',
  badge: 'LEAN CARBS • HIGH FIBER',
  fusionTag: 'WEST AFRICAN FUSION',
  rating: '★ 4.9 (184 reviews)',
  imageUrl:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDBL2og1WbUbmHiUMkN1TLOPpvgTxfDKxAJqmOOEL-yXryBBsJiuKfqMi9tJLi9Qkmn-a6tys6QQDs-y1LIXyv9-a8mJC_aWcykEBp6gqBtFw62HZfcKzu8-mHASDYzIzZXUR3xEEmJInDQt3gzHm8p8YEPtAemJV2FF-LIAvBfGuv2SNaNqBvip05H6NloKRTn7PY1AYCDz4AtltajzgOcB3eRE0lVrtkOtWo7JWKAs54xWRTvrCotvg',
  coachTip:
    'Yes, jollof rice is 100% allowed on this program! We balance the glycemic response by incorporating cauliflower grains and loading up on seasoned grilled chicken breast. Enjoy every bite guilt-free.',
  tags: ['Gluten-Free', 'Meal Prep Friendly', 'Lagos Studio Favorite'],
  ingredientsList: [
    { name: 'Chicken breast, sliced & seasoned in suya spices', amount: '250g' },
    { name: 'Brown rice or parboiled rice blend', amount: '1 cup' },
    { name: 'Grated cauliflower rice', amount: '1 cup' },
    { name: 'Plum tomatoes & red bell pepper (tatashe)', amount: '3 large / 1 red' },
    { name: 'Red onion & scotch bonnets (atarodo)', amount: '1 med / 2 peppers' },
    { name: 'Cold-pressed olive oil or coconut oil', amount: '1 tbsp' },
    { name: 'Fresh thyme, curry powder, and sea salt', amount: 'To taste' },
    { name: 'Ripe avocado & roasted plantain slices for garnish', amount: '1/2 avocado' },
  ],
  stepsList: [
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
  ingredients: [
    '250g Chicken breast, sliced & seasoned in suya spices',
    '1 cup Brown rice or parboiled rice blend',
    '1 cup Grated cauliflower rice',
    '3 large Plum tomatoes & 1 red bell pepper (tatashe)',
    '1 med Red onion & 2 scotch bonnets (atarodo)',
    '1 tbsp Cold-pressed olive oil or coconut oil',
    'Fresh thyme, curry powder, and sea salt to taste',
    '1/2 Ripe avocado & roasted plantain slices for garnish',
  ],
  steps: [
    'Season and sear chicken breast until golden on a heavy grill pan.',
    'Blend and reduce tomatoes, peppers, and onions into a rich fragrant jollof sauce.',
    'Simmer brown rice in savory stock, folding in cauliflower rice for the last 5 minutes.',
    'Assemble bowl with sliced protein, plantain discs, fresh avocado, and lime.',
  ],
};

const RECIPES_LIBRARY: Recipe[] = [
  {
    id: 'suya-salmon-mash',
    title: 'Suya Spiced Salmon & Plantain Mash',
    subtitle: 'OMEGA-3 RESTORATION — LEAN PROTOCOL',
    description:
      'Heart-healthy omega-3s meet northern Nigerian yaji seasoning. Paired with low-GI green plantain purée and steamed greens.',
    category: ['all', 'high protein', 'dinner', 'lunch'],
    prepTime: '20 min',
    servings: '1 bowl',
    protein: '38g',
    calories: '490 kcal',
    fiber: '7G',
    sodium: '290MG',
    macroSplit: '32% Protein • 38% Complex Carbs • 30% Healthy Fats',
    badge: 'High Protein',
    fusionTag: 'NORTHERN HERITAGE',
    rating: '★ 5.0 (212 reviews)',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBLOUUv16tdJKMYMTzyTzFiHbFL5TLYXW0ws7-qUZMPmT51T_m8aaRRdP4eRVgInPCUm2Fu0yl4kXhLuxfy_c1Xji9OwCq8RRjjhR2hjyoejJt3vxIc0JhGBQf0wDkt1kMTwYTGLQ8As5OLsV3mbo_Uw_YRaCahgtYpK8ivPaC_AmK6WBUlzqDVokgsL2gRCppRgAeCTbOZOvULEN4FO4qXGDoFFw3iJPHYZ-kXpiPl2slRYOwZqkAuJA',
    coachTip:
      'Salmon skin contains collagen and concentrated astaxanthin. Searing skin-down first retains moisture while giving that irresistible crisp texture.',
    tags: ['High Omega-3', 'Anti-Inflammatory', 'Studio Favorite'],
    ingredientsList: [
      { name: 'Wild Atlantic Salmon Fillet', amount: '200g' },
      { name: 'Authentic Northern Suya Yaji Rub (kuli-kuli, ginger, pepper)', amount: '1.5 tbsp' },
      { name: 'Semi-Ripe Green Plantains (peeled & steamed)', amount: '2 medium' },
      { name: 'Steamed Ugu (Pumpkin leaves) or Baby Spinach', amount: '1 cup' },
      { name: 'Extra Virgin Olive Oil', amount: '1 tsp' },
      { name: 'Fresh Lime', amount: '1 whole' },
    ],
    stepsList: [
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
    ingredients: [
      '200g Wild Atlantic Salmon Fillet',
      '1.5 tbsp Authentic Northern Suya Yaji Rub',
      '2 Semi-Ripe Green Plantains',
      '1 cup Steamed Ugu or Baby Spinach',
      '1 tsp Extra Virgin Olive Oil & 1 Lime',
    ],
    steps: [
      'Rub salmon fillet evenly with suya yaji spice and olive oil.',
      'Pan-sear on hot cast iron skillet for 4 minutes skin-down, flip for 3 minutes.',
      'Mash warm boiled green plantains with olive oil and broth.',
      'Plate salmon atop plantain mash alongside steamed greens.',
    ],
  },
  {
    id: 'mackerel-garden-egg-stew',
    title: 'Smoked Mackerel & Garden Egg Stew',
    subtitle: 'METABOLIC FIBER BOOST — GUT SANCTUARY',
    description:
      'Silky simmered African eggplant with aromatic smoked fish, packed with prebiotic fiber to stabilize glucose.',
    category: ['all', 'lunch', 'dinner', 'high protein'],
    prepTime: '30 min',
    servings: '2 bowls',
    protein: '34g',
    calories: '380 kcal',
    fiber: '11G',
    sodium: '310MG',
    macroSplit: '36% Protein • 34% Complex Carbs • 30% Healthy Fats',
    badge: 'High Fiber',
    fusionTag: 'INDIGENOUS BIO-ACTIVE',
    rating: '★ 4.8 (94 reviews)',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAxdimTR_-Ed_N_geS8lRuYW3PEZC_Hh1hNnFsd3_-jB5-NtxihFagaYsleO20jdGu5uKWQCld5BLjNj-JFfNtOog0ViGOsI61l_65Al1uRsD-AFscPrHB7cZk-7IdvrUeSHTGtQfZBj6uiIxT_oznBderBoK1LUPS_Z2kNRT1rPOS9TvgK4FmIPGv4n6GN1fCbNblDYjEiU3HUkT43wA6kN5BSsQV9J_cY35MdiYjPRXVoLWjkcsWK9A',
    coachTip:
      'Garden eggs act like sponges for the rich fish oils and pepper reduction, giving maximum satiety with ultra-low caloric density.',
    tags: ['Prebiotic Rich', 'Blood Sugar Friendly', 'Low Glycemic'],
    ingredientsList: [
      { name: 'Garden Eggs (African aubergines), boiled & crushed', amount: '300g' },
      { name: 'Hardwood-Smoked Mackerel (deboned & flaked)', amount: '1 whole' },
      { name: 'Plum Tomatoes & Habanero base', amount: '3 tomatoes / 2 rodo' },
      { name: 'Ground Uziza Seeds & Crayfish', amount: '1 tsp each' },
      { name: 'Unrefined Red Palm Oil (measured dose)', amount: '1 tbsp' },
      { name: 'Steamed Sweet Potato (for serving)', amount: '1 medium' },
    ],
    stepsList: [
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
    ingredients: [
      '300g Garden Eggs, boiled and roughly crushed',
      '1 Whole Hardwood-Smoked Mackerel',
      '3 Plum Tomatoes, 1 Onion & 2 Habanero Peppers',
      '1 tsp Ground Uziza Seeds & Crayfish',
      '1 tbsp Red Palm Oil',
    ],
    steps: [
      'Boil garden eggs for 12 minutes until soft, peel skins and crush coarsely.',
      'Sauté onions and tomato-habanero puree in palm oil for 10 minutes.',
      'Add flaked smoked mackerel, crayfish, uziza seeds, and salt.',
      'Fold in crushed garden eggs and simmer on low for 6 minutes.',
    ],
  },
  {
    id: 'protein-ogi-walnuts',
    title: 'Protein Ogi with Crushed Walnuts & Berries',
    subtitle: 'MORNING METABOLISM — ENZYME ACTIVE',
    description:
      'Naturally fermented bio-active corn pudding enhanced with clean vanilla whey and omega-dense local Nigerian walnuts.',
    category: ['all', 'breakfast', 'quick meals', 'high protein'],
    prepTime: '10 min',
    servings: '1 bowl',
    protein: '24g',
    calories: '310 kcal',
    fiber: '5G',
    sodium: '110MG',
    macroSplit: '30% Protein • 50% Complex Carbs • 20% Healthy Fats',
    badge: 'Breakfast',
    fusionTag: 'FERMENTED ANCIENT GRAIN',
    rating: '★ 4.9 (136 reviews)',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCNhyCgG3PDy5KeEavezpXl6a6GpEDK9BGYL83ofj3Ud_6LHDJwOkzT8cx2ElpvbTD3Rosy1kTiLJwSKs-3zChkCHjbmqY3jn3VpCnXzXcz5TRlR7lBgee6Y1C0eH114Hi89Yve844iacUhbl3-EosjIQjiftOz85_9t4gGAsK3jj8yq8qcviM2ANQ9fnNs_W4UsDvV_aPEpbtax0rXDLEZI5qMC48P11gEaru276XjMLNXFRURsBx7HA',
    coachTip:
      'Fermented ogi has live lactic acid bacteria that prepare your digestive enzyme cascade before morning training sessions.',
    tags: ['Gut Health', 'Under 15 Mins', 'Pre-Workout Fuel'],
    ingredientsList: [
      { name: 'Fermented Brown Corn Ogi Paste', amount: '60g' },
      { name: 'Clean Vanilla Whey or Pea Protein', amount: '1 scoop (30g)' },
      { name: 'Roasted Nigerian Walnuts (Asala), crushed', amount: '30g' },
      { name: 'Fresh Dark Blackberries & Blueberries', amount: '1 handful' },
      { name: 'Ceylon Cinnamon & Raw Wild Honey', amount: '1 tsp' },
      { name: 'Unsweetened Almond Milk', amount: '2 tbsp' },
    ],
    stepsList: [
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
    ingredients: [
      '60g Fermented Brown Corn Ogi Paste',
      '1 Scoop Vanilla Whey or Pea Protein',
      '30g Roasted Nigerian Walnuts',
      'Handful of Fresh Blackberries or Blueberries',
      '1 tsp Raw Honey or Cinnamon powder',
    ],
    steps: [
      'Dissolve ogi paste in cool water inside a bowl to create a smooth slurry.',
      'Pour rapidly boiling water in a continuous stream while stirring until velvety.',
      'Fold in vanilla protein powder with unsweetened almond milk.',
      'Top with toasted walnuts, fresh dark berries, and cinnamon.',
    ],
  },
  {
    id: 'efo-riro-lean-beef-shrimps',
    title: 'Efo Riro with Lean Beef & Shrimps',
    subtitle: 'IRON & CELLULAR VITALITY — DINNER REPAIR',
    description:
      'Iron-dense indigenous green stew cooked with fermented locust beans (iru), lean sirloin cubes, and tiger prawns with minimal oil.',
    category: ['all', 'dinner', 'high protein'],
    prepTime: '35 min',
    servings: '3 servings',
    protein: '44g',
    calories: '415 kcal',
    fiber: '8G',
    sodium: '380MG',
    macroSplit: '42% Protein • 28% Complex Carbs • 30% Healthy Fats',
    badge: 'High Iron & Protein',
    fusionTag: 'YORUBA TRADITIONAL',
    rating: '★ 5.0 (270 reviews)',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA0GPD_04nWsh--BmlMb1KK9rjE4HwtejIis51BuhgoPvD7nEocVBFS8NhOtT_kCiO5m3HCBdgfio4pNlDxxNkzs_nMBLrvu3roQeguMTZjDRbwP2GO9asB1iS_CicxsNWF6w6MvDmdc5Ws7v55A-M1bydY3tS8IbsbINQ_WxHS2NvDpOYpAkgWXhjo7dnmhzvrtQwH_VEZvWGu2T3hHj1BgYvl3fVemW-TurGEs1vHwUFPQNYBa_v2Yw',
    coachTip:
      'Never over-boil efo greens! Adding them at the very end and turning off heat locks in folate and vibrant green chlorophyll.',
    tags: ['High Iron', 'Lean Sirloin', 'Slow Cooked Broth'],
    ingredientsList: [
      { name: 'Fresh Efo Shoko or Spinach (blanched & squeezed dry)', amount: '400g' },
      { name: 'Lean Sirloin Beef (cubed & slow-simmered)', amount: '200g' },
      { name: 'Pink Tiger Prawns (shelled & deveined)', amount: '150g' },
      { name: 'Fermented Locust Beans (Iru Woro)', amount: '2 tbsp' },
      { name: 'Coarsely crushed Tatashe & Shombo pepper base', amount: '1 cup' },
      { name: 'Ground Dried Crayfish', amount: '1 tbsp' },
    ],
    stepsList: [
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
        title: 'Flash Cook Prawns',
        instruction: 'Toss in deveined tiger prawns for 3 minutes until firm and blush pink.',
      },
      {
        number: '04',
        title: 'Fold Greens & Rest',
        instruction: 'Fold in squeezed greens, remove pan from heat immediately, and cover for 2 minutes to steam gently.',
      },
    ],
    ingredients: [
      '400g Fresh Efo Shoko or Spinach leaves',
      '200g Lean Sirloin Beef, cubed',
      '150g Pink Tiger Prawns',
      '2 tbsp Fermented Locust Beans (Iru)',
      'Crushed Tatashe and Onion base',
      '1 tbsp Ground Crayfish',
    ],
    steps: [
      'Simmer aromatics base with iru and ground crayfish for 7 minutes.',
      'Add cooked beef cubes with 3 tbsp meat broth.',
      'Toss in tiger prawns and cook for 3 minutes until juicy.',
      'Fold in blanched greens on low heat for 3 minutes.',
    ],
  },
  {
    id: 'sweet-potato-chickpea-bowl',
    title: 'Spiced Sweet Potato & Chickpea Bowl',
    subtitle: 'GLYCOGEN RESTORATION — VEGAN POWER',
    description:
      'Complex low-glycemic carbohydrates loaded with potassium to accelerate post-workout muscular restoration.',
    category: ['all', 'lunch', 'dinner'],
    prepTime: '25 min',
    servings: '2 bowls',
    protein: '16g',
    calories: '370 kcal',
    fiber: '12G',
    sodium: '240MG',
    macroSplit: '18% Protein • 58% Complex Carbs • 24% Healthy Fats',
    badge: 'Vegetarian',
    fusionTag: 'PLANT-BASED CRAFT',
    rating: '★ 4.8 (88 reviews)',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAJtmo83fnM9frv1lG05iXt530DDA4TfrkkubcNWHXDvARqRqBG6iz74nKEgoBQC_gnf202gi-cXw1IJbpKM1ux7Df6SnDItVZ91sf4OdZ0ZiAsdr4YTyQ1TlZqtnOMHiSZERugSw5DFK4H_CX2YIJi07nhtPcPUfnDntP1dAF2LJLUIfBAp87cq0IVklwJwO3A00M8ncDOYp2WFZXAtAM0-vtGWMYFzmRULT1EYWCQGowMFlaO3-WVlQ',
    coachTip:
      'Roasting chickpeas with cumin activates fat-soluble phytonutrients that soothe joint inflammation after high-volume leg days.',
    tags: ['Plant-Based', 'High Fiber', 'Post-Leg Day'],
    ingredientsList: [
      { name: 'Roasted Sweet Potato Cubes (smoked paprika)', amount: '250g' },
      { name: 'Organic Chickpeas (roasted with cumin & garlic)', amount: '150g' },
      { name: 'Tuscan Kale (massaged with lemon & olive oil)', amount: '2 cups' },
      { name: 'Cucumber (shaved into ribbons)', amount: '1/2 cucumber' },
      { name: 'Velvety Tahini Ginger Dressing', amount: '2 tbsp' },
      { name: 'Toasted Sesame Seeds', amount: '1 tbsp' },
    ],
    stepsList: [
      {
        number: '01',
        title: 'Oven Roast Roots',
        instruction: 'Toss sweet potato cubes with smoked paprika and sea salt; roast at 200°C for 22 minutes.',
      },
      {
        number: '02',
        title: 'Crisp Chickpeas',
        instruction: 'Roast drained chickpeas on baking sheet until crackling and fragrant with toasted cumin.',
      },
      {
        number: '03',
        title: 'Massage Kale',
        instruction: 'Drizzle kale with lemon juice and olive oil, massaging leaves with fingertips until dark and silky.',
      },
      {
        number: '04',
        title: 'Assembly & Tahini',
        instruction: 'Arrange sweet potato, chickpeas, and cucumber ribbons over kale. Drizzle with sesame tahini dressing.',
      },
    ],
    ingredients: [
      '250g Roasted Sweet Potato cubes',
      '150g Organic Chickpeas, roasted',
      '2 cups Chopped Kale, massaged',
      '1/2 Cucumber ribbons',
      '2 tbsp Tahini Ginger Dressing',
    ],
    steps: [
      'Roast sweet potato cubes and chickpeas at 200°C for 22 minutes.',
      'Massage kale leaves with lemon juice and olive oil.',
      'Layer sweet potato, crispy chickpeas, and cucumber over kale.',
      'Drizzle with velvety tahini ginger dressing.',
    ],
  },
  {
    id: 'zesty-suya-beef-salad',
    title: 'Zesty Suya Beef Salad with Citrus Dressing',
    subtitle: 'THERMOGENIC QUICK HARVEST — 15 MIN',
    description:
      'Quick 15-minute assemblage with high thermogenic kick and refreshing Lagos garden greens.',
    category: ['all', 'lunch', 'quick meals', 'high protein', 'snacks'],
    prepTime: '15 min',
    servings: '1 bowl',
    protein: '32g',
    calories: '340 kcal',
    fiber: '6G',
    sodium: '280MG',
    macroSplit: '38% Protein • 32% Complex Carbs • 30% Healthy Fats',
    badge: 'Quick Meal',
    fusionTag: 'CONTEMPORARY NAIJA',
    rating: '★ 4.9 (155 reviews)',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDcr6iINCS-YZJb5yxMF5yMW2TWCCpl8MdA--cDASGSh9zvSuGRjuVzZtAWysIzAjBL24t9QNNro2z-vK2xnUmS2B3gUtmXiQ5nwmHiRKkp_73IFlt99J2G9c02bnClwN3lWuwUeWx-roOI-2rYV5OMyXP0qZf6bhpE5i1UUvkZg_l2IkhoCYyUDvqiR1WiXxtbLOYedrah2gVpvrmJlpaeYKLt1-K2SbTerItSXPEpuOixp28dqJAHTA',
    coachTip:
      'The natural citric acid in fresh oranges balances the fiery heat of yaji spices while boosting dietary non-heme iron absorption.',
    tags: ['Under 15 Mins', 'High Protein', 'Post-Cardio'],
    ingredientsList: [
      { name: 'Grilled Beef Tenderloin (thinly sliced across grain)', amount: '200g' },
      { name: 'Dry Suya Pepper Rub (Yaji)', amount: '1 tbsp' },
      { name: 'Mixed Watercress & Shredded Purple Cabbage', amount: '2 cups' },
      { name: 'Fresh Navel Orange (peeled & segmented)', amount: '1 whole' },
      { name: 'Shaved Shallots & Thin Cucumber', amount: '1/2 cup' },
      { name: 'Cold-Pressed Lime Vinaigrette', amount: '1 tbsp' },
    ],
    stepsList: [
      {
        number: '01',
        title: 'Dust Tenderloin',
        instruction: 'Dust warm sliced tenderloin strips with authentic suya pepper rub.',
      },
      {
        number: '02',
        title: 'Toss Crisp Greens',
        instruction: 'Lightly toss watercress and purple cabbage ribbons with cold-pressed lime vinaigrette.',
      },
      {
        number: '03',
        title: 'Segment Citrus',
        instruction: 'Carve orange into clean skinless segments over a bowl to capture all fresh juices.',
      },
      {
        number: '04',
        title: 'Plating Balance',
        instruction: 'Arrange beef slices over dressed greens and top with bright citrus segments and sliced shallots.',
      },
    ],
    ingredients: [
      '200g Grilled Beef Tenderloin, thinly sliced',
      '1 tbsp Dry Suya Pepper Rub',
      'Watercress and Shredded Purple Cabbage',
      '1 Fresh Orange, segmented',
      '1 tbsp Lime Vinaigrette',
    ],
    steps: [
      'Dust sliced tenderloin with fresh suya spice.',
      'Toss watercress, shredded purple cabbage, and shallots with lime vinaigrette.',
      'Top with warm spicy beef slices and sweet fresh orange segments.',
    ],
  },
];

const CATEGORIES = [
  { key: 'all', label: 'ALL' },
  { key: 'breakfast', label: 'BREAKFAST' },
  { key: 'lunch', label: 'LUNCH' },
  { key: 'dinner', label: 'DINNER' },
  { key: 'snacks', label: 'SNACKS' },
  { key: 'high protein', label: 'HIGH PROTEIN' },
  { key: 'quick meals', label: 'QUICK MEALS' },
];

export default function CookbookPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [savedRecipeIds, setSavedRecipeIds] = useState<string[]>(['suya-salmon-mash']);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  // Interactive Checklist and Action States
  const [checkedIngredients, setCheckedIngredients] = useState<string[]>([]);
  const [addedShoppingList, setAddedShoppingList] = useState(false);
  const [loggedMeal, setLoggedMeal] = useState(false);

  const openRecipeDetails = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setCheckedIngredients([]);
    setAddedShoppingList(false);
    setLoggedMeal(false);
  };

  const toggleIngredientCheck = (name: string) => {
    setCheckedIngredients((prev) =>
      prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]
    );
  };

  const toggleBookmark = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSavedRecipeIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredRecipes = useMemo(() => {
    const q = search.trim().toLowerCase();
    return RECIPES_LIBRARY.filter((recipe) => {
      const matchesCategory =
        selectedCategory === 'all' ||
        recipe.category.includes(selectedCategory.toLowerCase());
      const matchesSearch =
        q === '' ||
        recipe.title.toLowerCase().includes(q) ||
        recipe.description.toLowerCase().includes(q) ||
        recipe.ingredients.some((ing) => ing.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [search, selectedCategory]);

  const checkedCount = selectedRecipe
    ? checkedIngredients.filter((name) =>
        selectedRecipe.ingredientsList.some((ing) => ing.name === name)
      ).length
    : 0;

  return (
    <div className="space-y-8 pb-12 max-w-7xl mx-auto">
      {/* ========================================================
          1. PAGE HEADER & CONTEXT
         ======================================================== */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-[#E4DDD3]/70">
        <div className="space-y-1 max-w-2xl">
          <div className="flex items-center gap-1.5 text-[#9a4023] font-bold text-[11px] tracking-[0.2em] uppercase">
            <Flame className="w-3.5 h-3.5 text-[#9a4023]" />
            <span>NOURISHMENT &amp; METABOLISM</span>
          </div>
          <h1 className="font-serif text-[32px] sm:text-[40px] font-bold text-[#1d1b19] tracking-tight leading-none uppercase">
            Cookbook
          </h1>
          <p className="text-[14px] sm:text-[15px] text-[#56423d] font-normal leading-relaxed">
            What are we eating today? Nourishing West African meals tailored for lean recovery.
          </p>
        </div>

        {/* Daily Macronutrient Target Quick-Glance */}
        <div className="bg-[#F2EDE4] px-5 py-3 rounded-2xl flex items-center gap-4 border border-[#E4DDD3] shadow-2xs self-start md:self-auto">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold tracking-widest text-[#786b66] uppercase">
              PROTEIN TARGET
            </span>
            <span className="font-serif text-[18px] font-bold text-[#1d1b19] leading-tight">
              114g / 135g
            </span>
          </div>

          <div className="w-12 h-12 relative flex items-center justify-center shrink-0">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <circle
                className="text-[#EAE3D6]"
                cx="18"
                cy="18"
                fill="none"
                r="14"
                stroke="currentColor"
                strokeWidth="3"
              />
              <circle
                className="text-[#9a4023]"
                cx="18"
                cy="18"
                fill="none"
                r="14"
                stroke="currentColor"
                strokeDasharray="88"
                strokeDashoffset="14"
                strokeLinecap="round"
                strokeWidth="3"
              />
            </svg>
            <span className="absolute font-bold text-[10px] text-[#1d1b19]">
              84%
            </span>
          </div>
        </div>
      </header>

      {/* ========================================================
          2. SEARCH & CATEGORY FILTERS
         ======================================================== */}
      <section className="space-y-4">
        {/* Search Bar */}
        <div className="relative w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#786b66] w-5 h-5 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search recipes, ingredients (e.g. plantain, scotch bonnet, fish)..."
            className="w-full h-12 sm:h-14 pl-12 pr-10 bg-[#F2EDE4] text-[#1d1b19] text-[14px] rounded-2xl placeholder:text-[#8c8270] border border-[#E4DDD3] focus:outline-hidden focus:ring-2 focus:ring-[#9a4023] focus:border-transparent transition-all shadow-2xs"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#786b66] hover:text-[#1d1b19] p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.key;
            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-4 py-2 rounded-full font-bold text-[11px] tracking-wider uppercase whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#1C1A18] text-[#FAF7F2] shadow-sm'
                    : 'bg-[#F2EDE4] hover:bg-[#EAE3D6] text-[#56423d] hover:text-[#1d1b19] border border-[#E4DDD3]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* ========================================================
          3. FEATURED RECIPE (CHEF'S PICK OF THE WEEK HERO)
         ======================================================== */}
      {!search && selectedCategory === 'all' && (
        <section className="w-full bg-[#F2EDE4] rounded-3xl overflow-hidden border border-[#E4DDD3] shadow-xs grid grid-cols-1 lg:grid-cols-12 transition-all">
          <div className="lg:col-span-7 relative min-h-[300px] sm:min-h-[360px] lg:min-h-[420px] bg-[#1C1A18]">
            <img
              alt={FEATURED_HERO_RECIPE.title}
              className="absolute inset-0 w-full h-full object-cover filter brightness-95"
              src={FEATURED_HERO_RECIPE.imageUrl}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1C1A18]/70 via-transparent to-transparent lg:hidden" />
            <div className="absolute top-4 left-4 bg-[#E3E9E4]/95 backdrop-blur-md text-[#1d1b19] font-bold text-[10px] tracking-wider uppercase px-3 py-1 rounded-full shadow-xs flex items-center gap-1.5">
              <Leaf className="w-3.5 h-3.5 text-[#4d6358]" />
              <span>{FEATURED_HERO_RECIPE.badge}</span>
            </div>
          </div>

          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-[#F2EDE4]">
            <div className="space-y-3">
              <div className="flex items-center gap-1.5 text-[#9a4023] font-bold text-[10px] tracking-widest uppercase">
                <CheckCircle2 className="w-4 h-4 text-[#9a4023]" />
                <span>CHEF&apos;S PICK OF THE WEEK</span>
              </div>

              <h2 className="font-serif text-[26px] sm:text-[30px] font-bold text-[#1d1b19] leading-tight">
                {FEATURED_HERO_RECIPE.title}
              </h2>

              <p className="text-[13px] sm:text-[14px] text-[#56423d] leading-relaxed">
                {FEATURED_HERO_RECIPE.description}
              </p>

              {/* Macro Grid */}
              <div className="grid grid-cols-3 gap-2.5 pt-2">
                <div className="bg-[#FAF7F2] p-2.5 rounded-xl border border-[#E4DDD3] flex flex-col">
                  <span className="text-[10px] font-bold tracking-wider text-[#786b66] uppercase">
                    TIME
                  </span>
                  <span className="font-serif text-[17px] font-bold text-[#1d1b19]">
                    {FEATURED_HERO_RECIPE.prepTime}
                  </span>
                </div>
                <div className="bg-[#FAF7F2] p-2.5 rounded-xl border border-[#E4DDD3] flex flex-col">
                  <span className="text-[10px] font-bold tracking-wider text-[#786b66] uppercase">
                    PROTEIN
                  </span>
                  <span className="font-serif text-[17px] font-bold text-[#9a4023]">
                    {FEATURED_HERO_RECIPE.protein}
                  </span>
                </div>
                <div className="bg-[#FAF7F2] p-2.5 rounded-xl border border-[#E4DDD3] flex flex-col">
                  <span className="text-[10px] font-bold tracking-wider text-[#786b66] uppercase">
                    CALORIES
                  </span>
                  <span className="font-serif text-[17px] font-bold text-[#1d1b19]">
                    {FEATURED_HERO_RECIPE.calories}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#E4DDD3]/70">
              <button
                type="button"
                onClick={() => openRecipeDetails(FEATURED_HERO_RECIPE)}
                className="h-11 px-6 bg-[#9a4023] hover:bg-[#853218] text-white font-bold text-[12px] tracking-wider uppercase rounded-xl transition-all flex items-center gap-2 shadow-xs cursor-pointer active:scale-98"
              >
                <span>VIEW RECIPE</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={(e) => toggleBookmark(FEATURED_HERO_RECIPE.id, e)}
                className="w-11 h-11 rounded-xl bg-[#FAF7F2] text-[#1d1b19] hover:bg-[#EAE3D6] border border-[#E4DDD3] flex items-center justify-center transition-colors cursor-pointer"
                title="Save Recipe"
              >
                {savedRecipeIds.includes(FEATURED_HERO_RECIPE.id) ? (
                  <BookmarkCheck className="w-5 h-5 text-[#9a4023]" />
                ) : (
                  <Bookmark className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================
          4. RECIPE LIBRARY GRID
         ======================================================== */}
      <section className="space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <h3 className="font-serif text-[22px] sm:text-[24px] font-bold text-[#1d1b19] tracking-tight">
              Recipe Library
            </h3>
            <span className="text-[11px] font-bold tracking-wider text-[#786b66] uppercase">
              ({filteredRecipes.length} RECIPE{filteredRecipes.length === 1 ? '' : 'S'})
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[#786b66] text-[11px] font-bold uppercase tracking-wider">
            <span className="hidden sm:inline">SORT BY:</span>
            <span className="text-[#1d1b19] flex items-center gap-0.5">
              RECOVERY BALANCE
              <ChevronDown className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

        {/* Recipe Cards Grid */}
        {filteredRecipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map((recipe) => {
              const isSaved = savedRecipeIds.includes(recipe.id);
              return (
                <article
                  key={recipe.id}
                  onClick={() => openRecipeDetails(recipe)}
                  className="group bg-[#F2EDE4] rounded-2xl overflow-hidden flex flex-col justify-between border border-[#E4DDD3] shadow-2xs hover:shadow-md transition-all duration-300 cursor-pointer"
                >
                  <div>
                    {/* Image Frame with badges */}
                    <div className="relative w-full h-52 sm:h-56 overflow-hidden bg-[#1C1A18]">
                      <img
                        alt={recipe.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-95"
                        src={recipe.imageUrl}
                      />
                      <span className="absolute top-3 left-3 bg-[#FAF7F2]/95 backdrop-blur-md font-bold text-[10px] tracking-wider uppercase text-[#1d1b19] px-2.5 py-1 rounded-md shadow-xs">
                        {recipe.prepTime}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => toggleBookmark(recipe.id, e)}
                        className="absolute top-3 right-3 w-9 h-9 rounded-full bg-[#FAF7F2]/95 backdrop-blur-md text-[#1d1b19] hover:text-[#9a4023] flex items-center justify-center transition-colors shadow-xs"
                      >
                        {isSaved ? (
                          <BookmarkCheck className="w-4 h-4 text-[#9a4023]" />
                        ) : (
                          <Bookmark className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    {/* Content Details */}
                    <div className="p-5 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="bg-[#E3E9E4] text-[#4d6358] font-bold text-[10px] tracking-wider uppercase px-2 py-0.5 rounded-md">
                          {recipe.badge}
                        </span>
                        <span className="text-[12px] font-semibold text-[#56423d]">
                          {recipe.protein}
                        </span>
                      </div>

                      <h4 className="font-serif text-[18px] sm:text-[19px] font-bold text-[#1d1b19] leading-tight group-hover:text-[#9a4023] transition-colors">
                        {recipe.title}
                      </h4>

                      <p className="text-[12px] text-[#56423d] leading-relaxed line-clamp-2">
                        {recipe.description}
                      </p>
                    </div>
                  </div>

                  {/* Card Bottom Strip */}
                  <div className="px-5 pb-4 pt-1 flex items-center justify-between text-[#1d1b19] text-[12px] font-bold border-t border-[#E4DDD3]/60">
                    <span className="text-[#9a4023] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      <span>View Recipe</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                    <span className="text-[11px] text-[#786b66] font-semibold">
                      {recipe.calories}
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          /* Empty Search State */
          <div className="flex flex-col items-center justify-center text-center p-12 bg-[#F2EDE4] rounded-3xl border border-[#E4DDD3] space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#EAE3D6] flex items-center justify-center text-[#9a4023]">
              <UtensilsCrossed className="w-7 h-7" />
            </div>
            <div className="space-y-1 max-w-md">
              <h4 className="font-serif text-[20px] font-bold text-[#1d1b19]">
                No recipes found
              </h4>
              <p className="text-[13px] text-[#56423d] leading-relaxed">
                No matches found for &ldquo;{search}&rdquo;. Try exploring different ingredients or reset filters to discover all nourishing meals.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setSearch('');
                setSelectedCategory('all');
              }}
              className="h-10 px-5 bg-[#1C1A18] text-[#FAF7F2] font-bold text-[12px] rounded-xl hover:bg-black transition-colors"
            >
              Reset Search &amp; Filters
            </button>
          </div>
        )}
      </section>

      {/* ========================================================
          5. MEAL PREP PRINCIPLE EDITORIAL BANNER
         ======================================================== */}
      <section className="w-full bg-[#F2EDE4] rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-4 border border-[#E4DDD3] shadow-2xs">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#ffdbd0] flex items-center justify-center text-[#9a4023] shrink-0">
            <Lightbulb className="w-6 h-6" />
          </div>
          <div className="space-y-0.5">
            <span className="text-[10px] font-bold tracking-widest uppercase text-[#9a4023] block">
              KINFOLK NUTRITION PRINCIPLE
            </span>
            <h5 className="font-serif text-[17px] font-bold text-[#1d1b19]">
              The Sunday Stew Prep Method
            </h5>
            <p className="text-[12px] text-[#56423d] leading-relaxed max-w-2xl">
              Batch-cooking your slow-roasted pepper base cuts weekly dinner prep time down to 15 minutes while locking in essential bio-flavonoids.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => openRecipeDetails(FEATURED_HERO_RECIPE)}
          className="shrink-0 h-10 px-5 bg-[#FAF7F2] text-[#1d1b19] font-bold text-[11px] tracking-wider uppercase rounded-xl hover:bg-[#EAE3D6] border border-[#E4DDD3] transition-colors cursor-pointer"
        >
          READ GUIDE
        </button>
      </section>

      {/* ========================================================
          6. INTERACTIVE RECIPE MODAL DRAWER (EDITORIAL DETAIL VIEW)
         ======================================================== */}
      {selectedRecipe && (
        <div
          className="fixed inset-0 z-50 bg-[#1C1A18]/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
          onClick={() => setSelectedRecipe(null)}
        >
          <div
            className="bg-[#FAF7F2] rounded-3xl max-w-5xl w-full max-h-[92vh] overflow-y-auto p-5 sm:p-8 md:p-10 shadow-2xl border border-[#E4DDD3] my-auto relative animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Close Button */}
            <button
              type="button"
              onClick={() => setSelectedRecipe(null)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full bg-[#F2EDE4] hover:bg-[#EAE3D6] text-[#56423d] hover:text-[#1d1b19] flex items-center justify-center transition-colors shadow-xs z-20 cursor-pointer"
              aria-label="Close recipe"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Two-Column Editorial Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Image, Quick Chips, Coach Tolu Insight, Tags */}
              <div className="lg:col-span-5 flex flex-col gap-5">
                {/* Food Image Card with Badges & Caption */}
                <div className="relative rounded-2xl overflow-hidden h-64 sm:h-72 w-full bg-[#1C1A18] shadow-md group">
                  <img
                    alt={selectedRecipe.title}
                    src={selectedRecipe.imageUrl}
                    className="w-full h-full object-cover filter brightness-95 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex flex-col justify-between p-4">
                    <p className="text-white/95 text-[11px] leading-snug line-clamp-2 drop-shadow-sm font-sans">
                      {selectedRecipe.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-1 rounded-md bg-[#1C1A18]/90 text-white/95 font-bold text-[10px] tracking-wider uppercase backdrop-blur-xs">
                        {selectedRecipe.fusionTag}
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-[#1C1A18]/90 text-white/95 font-bold text-[10px] tracking-wider backdrop-blur-xs flex items-center gap-1">
                        <span className="text-[#ffdbd0]">★</span>
                        <span>{selectedRecipe.rating}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* 4-Metric Grid */}
                <div className="grid grid-cols-4 gap-2 bg-[#F2EDE4] p-3 rounded-2xl border border-[#E4DDD3] text-center">
                  <div className="flex flex-col items-center">
                    <Clock className="w-3.5 h-3.5 text-[#786b66] mb-1" />
                    <span className="text-[9px] font-bold uppercase tracking-wider text-[#786b66]">
                      PREP TIME
                    </span>
                    <strong className="font-serif text-[14px] text-[#1d1b19] mt-0.5">
                      {selectedRecipe.prepTime}
                    </strong>
                  </div>
                  <div className="flex flex-col items-center">
                    <UtensilsCrossed className="w-3.5 h-3.5 text-[#786b66] mb-1" />
                    <span className="text-[9px] font-bold uppercase tracking-wider text-[#786b66]">
                      SERVINGS
                    </span>
                    <strong className="font-serif text-[14px] text-[#1d1b19] mt-0.5">
                      {selectedRecipe.servings}
                    </strong>
                  </div>
                  <div className="flex flex-col items-center">
                    <Dumbbell className="w-3.5 h-3.5 text-[#9a4023] mb-1" />
                    <span className="text-[9px] font-bold uppercase tracking-wider text-[#786b66]">
                      PROTEIN
                    </span>
                    <strong className="font-serif text-[14px] text-[#9a4023] mt-0.5">
                      {selectedRecipe.protein}
                    </strong>
                  </div>
                  <div className="flex flex-col items-center">
                    <Flame className="w-3.5 h-3.5 text-[#786b66] mb-1" />
                    <span className="text-[9px] font-bold uppercase tracking-wider text-[#786b66]">
                      ENERGY
                    </span>
                    <strong className="font-serif text-[14px] text-[#1d1b19] mt-0.5">
                      {selectedRecipe.calories}
                    </strong>
                  </div>
                </div>

                {/* Coach Tolu Insight Card with decorative quote watermark */}
                <div className="relative overflow-hidden bg-[#E7EFE9] border border-[#d2e0d5] p-5 rounded-2xl space-y-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#4d6358] text-white font-serif font-bold text-[14px] flex items-center justify-center shrink-0">
                      T
                    </div>
                    <div>
                      <h4 className="font-serif text-[14px] font-bold text-[#1d1b19] leading-tight">
                        Coach Tolu
                      </h4>
                      <span className="text-[9px] font-bold tracking-widest uppercase text-[#4d6358]">
                        KINFOLK LEAD NUTRITIONIST
                      </span>
                    </div>
                  </div>
                  <p className="text-[12px] text-[#2c3d33] leading-relaxed italic relative z-10">
                    &ldquo;{selectedRecipe.coachTip}&rdquo;
                  </p>
                  {/* Watermark quotation marks */}
                  <span className="absolute -bottom-5 right-2 text-[#4d6358]/15 font-serif font-black text-[72px] select-none pointer-events-none">
                    ”
                  </span>
                </div>

                {/* Tag Pills */}
                <div className="flex flex-wrap gap-2">
                  {selectedRecipe.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full text-[11px] font-medium bg-[#F2EDE4] text-[#56423d] border border-[#E4DDD3]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Column: Header, Actions, Ingredients Checklist, Preparation Steps, Macro Split */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                
                {/* Header & Description */}
                <div className="space-y-2 pr-10">
                  <div className="flex items-center gap-2 text-[#9a4023] font-bold text-[10px] tracking-widest uppercase">
                    <span>{selectedRecipe.subtitle}</span>
                  </div>
                  <h2 className="font-serif text-[28px] sm:text-[34px] font-bold text-[#1d1b19] tracking-tight leading-tight">
                    {selectedRecipe.title}
                  </h2>
                  <p className="text-[14px] text-[#56423d] leading-relaxed">
                    {selectedRecipe.description}
                  </p>
                </div>

                {/* Action Buttons Bar */}
                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => toggleBookmark(selectedRecipe.id)}
                    className="h-10 px-4 rounded-xl bg-[#9a4023] hover:bg-[#A84C2F] text-white font-bold text-[12px] tracking-wider uppercase transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    {savedRecipeIds.includes(selectedRecipe.id) ? (
                      <>
                        <BookmarkCheck className="w-4 h-4" />
                        <span>Saved Recipe</span>
                      </>
                    ) : (
                      <>
                        <Bookmark className="w-4 h-4" />
                        <span>Save Recipe</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setAddedShoppingList(true);
                      setTimeout(() => setAddedShoppingList(false), 2500);
                    }}
                    className="h-10 px-4 rounded-xl bg-[#F2EDE4] hover:bg-[#EAE3D6] text-[#1d1b19] border border-[#E4DDD3] font-bold text-[12px] tracking-wider uppercase transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <ShoppingCart className="w-4 h-4 text-[#786b66]" />
                    <span>{addedShoppingList ? 'Added to List ✓' : 'Add to Shopping List'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setLoggedMeal(true);
                      setTimeout(() => setLoggedMeal(false), 2500);
                    }}
                    className="h-10 px-4 rounded-xl bg-[#4d6358] hover:bg-[#3d5046] text-white font-bold text-[12px] tracking-wider uppercase transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <CalendarCheck className="w-4 h-4" />
                    <span>{loggedMeal ? 'Logged to Diary ✓' : 'Log as Meal'}</span>
                  </button>
                </div>

                {/* Ingredients Checklist Card */}
                <div className="bg-[#F2EDE4] p-5 rounded-2xl border border-[#E4DDD3] space-y-3">
                  <div className="flex items-center justify-between pb-1">
                    <div className="flex items-center gap-2">
                      <ListChecks className="w-4 h-4 text-[#9a4023]" />
                      <h3 className="font-serif text-[18px] font-bold text-[#1d1b19]">
                        Ingredients Checklist
                      </h3>
                    </div>
                    <span className="text-[10px] font-bold tracking-widest uppercase text-[#786b66]">
                      {checkedCount} OF {selectedRecipe.ingredientsList.length} SELECTED
                    </span>
                  </div>
                  <p className="text-[11px] text-[#786b66]">
                    Tap to mark off items as you prep in your kitchen.
                  </p>

                  <div className="space-y-2 pt-1">
                    {selectedRecipe.ingredientsList.map((ing, i) => {
                      const isChecked = checkedIngredients.includes(ing.name);
                      return (
                        <div
                          key={i}
                          onClick={() => toggleIngredientCheck(ing.name)}
                          className={`flex items-center justify-between p-3 rounded-xl transition-all cursor-pointer border ${
                            isChecked
                              ? 'bg-white/90 border-[#4d6358]/40 shadow-xs'
                              : 'bg-white/50 hover:bg-white/80 border-transparent'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-4 h-4 rounded-sm border flex items-center justify-center transition-colors shrink-0 ${
                                isChecked
                                  ? 'bg-[#4d6358] border-[#4d6358] text-white'
                                  : 'border-[#89726b]/50 bg-white'
                              }`}
                            >
                              {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                            <span
                              className={`text-[13px] transition-colors ${
                                isChecked
                                  ? 'line-through text-[#786b66]'
                                  : 'text-[#1d1b19] font-medium'
                              }`}
                            >
                              {ing.name}
                            </span>
                          </div>
                          <span className="text-[12px] font-semibold text-[#786b66] shrink-0 ml-3">
                            {ing.amount}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Preparation Method */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between border-b border-[#E4DDD3] pb-2">
                    <div className="flex items-center gap-2">
                      <CookingPot className="w-4 h-4 text-[#9a4023]" />
                      <h3 className="font-serif text-[18px] font-bold text-[#1d1b19]">
                        Preparation Method
                      </h3>
                    </div>
                    <span className="text-[10px] font-bold tracking-widest uppercase text-[#786b66]">
                      Step-by-step studio guide
                    </span>
                  </div>

                  <div className="space-y-3 pt-1">
                    {selectedRecipe.stepsList.map((st, i) => (
                      <div
                        key={i}
                        className="bg-[#F2EDE4]/70 hover:bg-[#F2EDE4] p-4 rounded-2xl border border-[#E4DDD3]/80 flex gap-4 items-start transition-colors"
                      >
                        <span className="font-serif text-[28px] sm:text-[32px] font-bold text-[#ba5838]/40 leading-none shrink-0 select-none">
                          {st.number}
                        </span>
                        <div className="space-y-1 pt-0.5">
                          <h4 className="font-serif text-[15px] font-bold text-[#1d1b19]">
                            {st.title}
                          </h4>
                          <p className="text-[13px] text-[#56423d] leading-relaxed">
                            {st.instruction}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Target Macro Split Bottom Card */}
                <div className="bg-[#E7EFE9] p-4 rounded-2xl border border-[#d2e0d5] flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#4d6358] text-white flex items-center justify-center shrink-0">
                      <PieChart className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-serif text-[13px] font-bold text-[#1d1b19]">
                        Target Macro Split
                      </h4>
                      <p className="text-[11px] text-[#4d6358] font-medium">
                        {selectedRecipe.macroSplit}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-center">
                    <div className="bg-white/80 px-3 py-1.5 rounded-lg border border-[#d2e0d5]">
                      <span className="text-[8px] font-bold uppercase tracking-wider text-[#786b66] block">
                        SODIUM
                      </span>
                      <strong className="text-[12px] font-bold text-[#1d1b19]">
                        {selectedRecipe.sodium}
                      </strong>
                    </div>
                    <div className="bg-white/80 px-3 py-1.5 rounded-lg border border-[#d2e0d5]">
                      <span className="text-[8px] font-bold uppercase tracking-wider text-[#786b66] block">
                        DIETARY FIBER
                      </span>
                      <strong className="text-[12px] font-bold text-[#1d1b19]">
                        {selectedRecipe.fiber}
                      </strong>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
