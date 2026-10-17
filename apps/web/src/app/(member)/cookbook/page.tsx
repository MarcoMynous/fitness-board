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
} from 'lucide-react';

interface Recipe {
  id: string;
  title: string;
  description: string;
  category: string[];
  prepTime: string;
  protein: string;
  calories: string;
  fiber?: string;
  badge: string;
  imageUrl: string;
  ingredients: string[];
  steps: string[];
}

const FEATURED_HERO_RECIPE: Recipe = {
  id: 'featured-jollof-cauliflower',
  title: 'Grilled Chicken Jollof Cauliflower Bowl',
  description:
    'A high-protein, fiber-rich twist on the classic Lagos staple. Fire-roasted bell pepper and scotch bonnet reduction folded through tender cauliflower grains, golden air-fried plantain dices, and succulent spiced chicken breast.',
  category: ['all', 'dinner', 'lunch', 'high protein'],
  prepTime: '25 min',
  protein: '42g',
  calories: '460 kcal',
  badge: 'LEAN CARBS • HIGH FIBER',
  imageUrl:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDBL2og1WbUbmHiUMkN1TLOPpvgTxfDKxAJqmOOEL-yXryBBsJiuKfqMi9tJLi9Qkmn-a6tys6QQDs-y1LIXyv9-a8mJC_aWcykEBp6gqBtFw62HZfcKzu8-mHASDYzIzZXUR3xEEmJInDQt3gzHm8p8YEPtAemJV2FF-LIAvBfGuv2SNaNqBvip05H6NloKRTn7PY1AYCDz4AtltajzgOcB3eRE0lVrtkOtWo7JWKAs54xWRTvrCotvg',
  ingredients: [
    '250g Skinless Chicken Breast (seasoned with thyme, garlic, smoked paprika)',
    '1 Head Fresh Cauliflower (grated into rice grains)',
    '3 Red Bell Peppers (Tatashe) & 2 Scotch Bonnets (Rodo), oven-roasted',
    '1 Medium Ripe Plantain (cubed & air-fried with spray olive oil)',
    '1/2 Medium Avocado (sliced for essential fats)',
    '1 tbsp Cold-Pressed Coconut Oil or Olive Oil',
    'Fresh Cilantro, Lime Wedges & Cherry Tomatoes for garnish',
  ],
  steps: [
    'Blend the fire-roasted bell peppers, scotch bonnets, onion, and fresh ginger into a smooth reduction.',
    'Season and pan-sear the chicken breast for 6–7 minutes per side until golden and internal temperature reaches 75°C. Rest and slice.',
    'In a wide skillet, heat olive oil and simmer the pepper reduction for 8 minutes until aromatic, then fold in the riced cauliflower for 4 minutes until tender-crisp.',
    'Assemble your bowl: Jollof cauliflower base, sliced chicken breast, golden air-fried plantain cubes, and sliced avocado.',
    'Finish with a squeeze of fresh lime and chopped cilantro. Serve warm.',
  ],
};

const RECIPES_LIBRARY: Recipe[] = [
  {
    id: 'suya-salmon-mash',
    title: 'Suya Spiced Salmon & Plantain Mash',
    description:
      'Heart-healthy omega-3s meet northern Nigerian yaji seasoning. Paired with low-GI green plantain purée and steamed greens.',
    category: ['all', 'high protein', 'dinner', 'lunch'],
    prepTime: '20 MIN',
    protein: '38g Protein',
    calories: '490 kcal',
    badge: 'High Protein',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBLOUUv16tdJKMYMTzyTzFiHbFL5TLYXW0ws7-qUZMPmT51T_m8aaRRdP4eRVgInPCUm2Fu0yl4kXhLuxfy_c1Xji9OwCq8RRjjhR2hjyoejJt3vxIc0JhGBQf0wDkt1kMTwYTGLQ8As5OLsV3mbo_Uw_YRaCahgtYpK8ivPaC_AmK6WBUlzqDVokgsL2gRCppRgAeCTbOZOvULEN4FO4qXGDoFFw3iJPHYZ-kXpiPl2slRYOwZqkAuJA',
    ingredients: [
      '200g Wild Atlantic Salmon Fillet',
      '1.5 tbsp Authentic Northern Suya Yaji Rub (kuli-kuli, ginger, pepper)',
      '2 Semi-Ripe Green Plantains (peeled and boiled with sea salt)',
      '1 cup Steamed Ugu (Pumpkin leaves) or Baby Spinach',
      '1 tsp Extra Virgin Olive Oil',
      '1 Fresh Lime',
    ],
    steps: [
      'Rub salmon fillet evenly with suya yaji spice and a drop of olive oil.',
      'Pan-sear on a hot cast iron skillet skin-side down for 4 minutes, flip and cook for 3 minutes.',
      'Mash the warm boiled green plantains with a fork, folding in 1 tsp olive oil and a splash of boiling broth.',
      'Plate the salmon atop the velvety plantain mash alongside steamed greens and fresh lime.',
    ],
  },
  {
    id: 'mackerel-garden-egg-stew',
    title: 'Smoked Mackerel & Garden Egg Stew',
    description:
      'Silky simmered African eggplant with aromatic smoked fish, packed with prebiotic fiber to stabilize glucose.',
    category: ['all', 'lunch', 'dinner', 'high protein'],
    prepTime: '30 MIN',
    protein: '34g Protein',
    fiber: '11g Fiber',
    calories: '380 kcal',
    badge: 'High Fiber',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAxdimTR_-Ed_N_geS8lRuYW3PEZC_Hh1hNnFsd3_-jB5-NtxihFagaYsleO20jdGu5uKWQCld5BLjNj-JFfNtOog0ViGOsI61l_65Al1uRsD-AFscPrHB7cZk-7IdvrUeSHTGtQfZBj6uiIxT_oznBderBoK1LUPS_Z2kNRT1rPOS9TvgK4FmIPGv4n6GN1fCbNblDYjEiU3HUkT43wA6kN5BSsQV9J_cY35MdiYjPRXVoLWjkcsWK9A',
    ingredients: [
      '300g Garden Eggs (African aubergines), boiled and roughly crushed',
      '1 Whole Hardwood-Smoked Mackerel (deboned and flaked)',
      '3 Plum Tomatoes, 1 Onion & 2 Habanero Peppers (coarsely blended)',
      '1 tsp Ground Uziza Seeds & Crayfish',
      '1 tbsp Red Palm Oil (unrefined, heart-healthy portion)',
    ],
    steps: [
      'Boil the garden eggs for 12 minutes until soft, peel skins and crush coarsely with a wooden fork.',
      'Sauté onions and the tomato-habanero puree in 1 tbsp palm oil for 10 minutes until oil clarifies.',
      'Add the flaked smoked mackerel, crayfish, uziza seeds, and salt.',
      'Gently fold in the crushed garden eggs and simmer on low for 6 minutes. Serve with steamed sweet potatoes.',
    ],
  },
  {
    id: 'protein-ogi-walnuts',
    title: 'Protein Ogi with Crushed Walnuts & Berries',
    description:
      'Naturally fermented bio-active corn pudding enhanced with clean vanilla whey and omega-dense local Nigerian walnuts.',
    category: ['all', 'breakfast', 'quick meals', 'high protein'],
    prepTime: '10 MIN',
    protein: '24g Protein',
    calories: '310 kcal',
    badge: 'Breakfast',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCNhyCgG3PDy5KeEavezpXl6a6GpEDK9BGYL83ofj3Ud_6LHDJwOkzT8cx2ElpvbTD3Rosy1kTiLJwSKs-3zChkCHjbmqY3jn3VpCnXzXcz5TRlR7lBgee6Y1C0eH114Hi89Yve844iacUhbl3-EosjIQjiftOz85_9t4gGAsK3jj8yq8qcviM2ANQ9fnNs_W4UsDvV_aPEpbtax0rXDLEZI5qMC48P11gEaru276XjMLNXFRURsBx7HA',
    ingredients: [
      '60g Fermented Brown Corn Ogi Paste (Traditional Bio-fermented)',
      '1 Scoop (30g) Premium Clean Vanilla Whey or Pea Protein',
      '30g Roasted Nigerian Walnuts (Asala), coarsely chopped',
      'Handful of Fresh Blackberries or Blueberries',
      '1 tsp Pure Acacia Honey or Cinnamon powder',
    ],
    steps: [
      'Dissolve ogi paste in 3 tbsp cool water inside a ceramic bowl to create a smooth lump-free slurry.',
      'Pour rapidly boiling water in a continuous stream into the bowl while stirring vigorously until it thickens into velvety custard.',
      'Allow to cool for 1 minute, then fold in vanilla protein powder with a small splash of unsweetened almond milk.',
      'Top with toasted walnuts, fresh dark berries, and a dust of cinnamon.',
    ],
  },
  {
    id: 'efo-riro-lean-beef-shrimps',
    title: 'Efo Riro with Lean Beef & Shrimps',
    description:
      'Iron-dense indigenous green stew cooked with fermented locust beans (iru), lean sirloin cubes, and tiger prawns with minimal oil.',
    category: ['all', 'dinner', 'high protein'],
    prepTime: '35 MIN',
    protein: '44g Protein',
    calories: '415 kcal',
    badge: 'High Iron & Protein',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA0GPD_04nWsh--BmlMb1KK9rjE4HwtejIis51BuhgoPvD7nEocVBFS8NhOtT_kCiO5m3HCBdgfio4pNlDxxNkzs_nMBLrvu3roQeguMTZjDRbwP2GO9asB1iS_CicxsNWF6w6MvDmdc5Ws7v55A-M1bydY3tS8IbsbINQ_WxHS2NvDpOYpAkgWXhjo7dnmhzvrtQwH_VEZvWGu2T3hHj1BgYvl3fVemW-TurGEs1vHwUFPQNYBa_v2Yw',
    ingredients: [
      '400g Fresh Efo Shoko or Spinach leaves (blanched & squeezed dry)',
      '200g Lean Sirloin Beef (cubed & slow-simmered in aromatics)',
      '150g Fresh Pink Tiger Prawns (shelled and deveined)',
      '2 tbsp Fermented Locust Beans (Iru Woro)',
      'Coarsely crushed Tatashe (Bell pepper), Shombo and Onion base',
      '1 tbsp Ground Dried Crayfish',
    ],
    steps: [
      'Heat the aromatics base in a pan, stirring in washed iru and ground crayfish for 7 minutes.',
      'Add the cooked tender beef cubes with 3 tbsp of concentrated meat broth.',
      'Toss in the tiger prawns and cook for 3 minutes until pink and juicy.',
      'Fold in the blanched, drained greens. Cook on low heat for exactly 3 minutes so greens retain vibrancy and crispness.',
    ],
  },
  {
    id: 'sweet-potato-chickpea-bowl',
    title: 'Spiced Sweet Potato & Chickpea Bowl',
    description:
      'Complex low-glycemic carbohydrates loaded with potassium to accelerate post-workout muscular restoration.',
    category: ['all', 'lunch', 'dinner'],
    prepTime: '25 MIN',
    protein: '16g Protein',
    calories: '370 kcal',
    badge: 'Vegetarian',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAJtmo83fnM9frv1lG05iXt530DDA4TfrkkubcNWHXDvARqRqBG6iz74nKEgoBQC_gnf202gi-cXw1IJbpKM1ux7Df6SnDItVZ91sf4OdZ0ZiAsdr4YTyQ1TlZqtnOMHiSZERugSw5DFK4H_CX2YIJi07nhtPcPUfnDntP1dAF2LJLUIfBAp87cq0IVklwJwO3A00M8ncDOYp2WFZXAtAM0-vtGWMYFzmRULT1EYWCQGowMFlaO3-WVlQ',
    ingredients: [
      '250g Roasted Sweet Potato cubes with smoked paprika',
      '150g Organic Chickpeas (roasted with cumin & garlic)',
      '2 cups Chopped Kale (massaged with lemon & olive oil)',
      '1/2 Cucumber (shaved ribbons)',
      '2 tbsp Tahini Ginger Dressing',
    ],
    steps: [
      'Roast sweet potato cubes and drained chickpeas on a baking sheet at 200°C for 22 minutes.',
      'Massage kale leaves in a bowl with lemon juice until deep green and soft.',
      'Layer sweet potato, crispy chickpeas, cucumber ribbons, and massaged kale.',
      'Drizzle with velvety tahini ginger dressing.',
    ],
  },
  {
    id: 'zesty-suya-beef-salad',
    title: 'Zesty Suya Beef Salad with Citrus Dressing',
    description:
      'Quick 15-minute assemblage with high thermogenic kick and refreshing Lagos garden greens.',
    category: ['all', 'lunch', 'quick meals', 'high protein', 'snacks'],
    prepTime: '15 MIN',
    protein: '32g Protein',
    calories: '340 kcal',
    badge: 'Quick Meal',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDcr6iINCS-YZJb5yxMF5yMW2TWCCpl8MdA--cDASGSh9zvSuGRjuVzZtAWysIzAjBL24t9QNNro2z-vK2xnUmS2B3gUtmXiQ5nwmHiRKkp_73IFlt99J2G9c02bnClwN3lWuwUeWx-roOI-2rYV5OMyXP0qZf6bhpE5i1UUvkZg_l2IkhoCYyUDvqiR1WiXxtbLOYedrah2gVpvrmJlpaeYKLt1-K2SbTerItSXPEpuOixp28dqJAHTA',
    ingredients: [
      '200g Grilled Beef Tenderloin (thinly sliced across the grain)',
      '1 tbsp Dry Suya Pepper Rub',
      'Mixed Watercress, Shredded Purple Cabbage, Shaved Shallots',
      '1 Fresh Orange (peeled & segmented)',
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
                onClick={() => setSelectedRecipe(FEATURED_HERO_RECIPE)}
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
                  onClick={() => setSelectedRecipe(recipe)}
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
          onClick={() => setSelectedRecipe(FEATURED_HERO_RECIPE)}
          className="shrink-0 h-10 px-5 bg-[#FAF7F2] text-[#1d1b19] font-bold text-[11px] tracking-wider uppercase rounded-xl hover:bg-[#EAE3D6] border border-[#E4DDD3] transition-colors cursor-pointer"
        >
          READ GUIDE
        </button>
      </section>

      {/* ========================================================
          6. INTERACTIVE RECIPE MODAL DRAWER
         ======================================================== */}
      {selectedRecipe && (
        <div
          className="fixed inset-0 z-50 bg-[#1C1A18]/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedRecipe(null)}
        >
          <div
            className="bg-[#FAF7F2] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl border border-[#E4DDD3] animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Modal Header */}
            <div className="flex justify-between items-start border-b border-[#E4DDD3] pb-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#9a4023]">
                  {selectedRecipe.badge}
                </span>
                <h2 className="font-serif text-[24px] sm:text-[28px] font-bold text-[#1d1b19] leading-tight">
                  {selectedRecipe.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedRecipe(null)}
                className="p-1.5 rounded-full hover:bg-[#EAE3D6] text-[#786b66] hover:text-[#1d1b19] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image */}
            <div className="relative h-56 sm:h-64 w-full rounded-2xl overflow-hidden bg-[#1C1A18]">
              <img
                alt={selectedRecipe.title}
                className="w-full h-full object-cover filter brightness-95"
                src={selectedRecipe.imageUrl}
              />
            </div>

            {/* Macros Quick Bar */}
            <div className="grid grid-cols-3 gap-3 p-3 bg-[#F2EDE4] rounded-xl border border-[#E4DDD3] text-center">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#786b66] block">
                  Time
                </span>
                <strong className="font-serif text-[17px] text-[#1d1b19]">
                  {selectedRecipe.prepTime}
                </strong>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#786b66] block">
                  Protein
                </span>
                <strong className="font-serif text-[17px] text-[#9a4023]">
                  {selectedRecipe.protein}
                </strong>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#786b66] block">
                  Calories
                </span>
                <strong className="font-serif text-[17px] text-[#1d1b19]">
                  {selectedRecipe.calories}
                </strong>
              </div>
            </div>

            {/* Ingredients */}
            <div className="space-y-3">
              <h3 className="font-serif text-[18px] font-bold text-[#1d1b19] flex items-center gap-2">
                <span>Ingredients</span>
                <span className="text-[12px] font-sans font-normal text-[#786b66]">
                  ({selectedRecipe.ingredients.length} items)
                </span>
              </h3>
              <ul className="space-y-2 text-[13px] text-[#56423d]">
                {selectedRecipe.ingredients.map((ing, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9a4023] mt-2 shrink-0" />
                    <span>{ing}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Preparation Steps */}
            <div className="space-y-3 border-t border-[#E4DDD3] pt-4">
              <h3 className="font-serif text-[18px] font-bold text-[#1d1b19]">
                Preparation Steps
              </h3>
              <ol className="space-y-3 text-[13px] text-[#56423d]">
                {selectedRecipe.steps.map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#9a4023]/10 text-[#9a4023] flex items-center justify-center font-bold text-[11px] shrink-0">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Modal Bottom Actions */}
            <div className="pt-4 border-t border-[#E4DDD3] flex items-center justify-between">
              <button
                type="button"
                onClick={() => toggleBookmark(selectedRecipe.id)}
                className="inline-flex items-center gap-1.5 text-[12px] font-bold text-[#56423d] hover:text-[#9a4023] transition-colors"
              >
                {savedRecipeIds.includes(selectedRecipe.id) ? (
                  <>
                    <BookmarkCheck className="w-4 h-4 text-[#9a4023]" />
                    <span>Saved in Favorites</span>
                  </>
                ) : (
                  <>
                    <Bookmark className="w-4 h-4" />
                    <span>Save to Favorites</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setSelectedRecipe(null)}
                className="h-10 px-5 rounded-xl bg-[#1C1A18] hover:bg-black text-[#FAF7F2] font-bold text-[12px] transition-colors"
              >
                Close Recipe
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
