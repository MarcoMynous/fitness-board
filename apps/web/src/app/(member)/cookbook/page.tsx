'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button, Card, Badge, Input } from '@repo/ui';
import { Utensils, Lock, Bookmark, BookmarkCheck, Search, Clock, Flame, ChevronRight } from 'lucide-react';

export default function CookbookPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<{
    hasAccess: boolean;
    recipes?: any[];
    savedRecipeIds?: string[];
  }>({ hasAccess: false });

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedRecipe, setSelectedRecipe] = useState<any | null>(null);

  useEffect(() => {
    fetch('/api/cookbook')
      .then((res) => res.json())
      .then((json) => {
        setData(json);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleToggleBookmark = async (e: React.MouseEvent, recipeId: string) => {
    e.stopPropagation();
    try {
      const res = await fetch('/api/recipes/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recipeId }),
      });
      const result = await res.json();
      setData((prev) => {
        const currentSaved = prev.savedRecipeIds || [];
        return {
          ...prev,
          savedRecipeIds: result.saved
            ? [...currentSaved, recipeId]
            : currentSaved.filter((id) => id !== recipeId),
        };
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div className="py-20 text-center text-stone-secondary text-sm">Loading high-performance recipes...</div>;
  }

  if (!data.hasAccess) {
    return (
      <div className="max-w-xl mx-auto py-16 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-brand-terracotta/10 text-brand-terracotta flex items-center justify-center mx-auto">
          <Lock className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <Badge variant="terracotta">Entitlement Required</Badge>
          <h1 className="font-serif text-3xl text-stone-primary">The Kitchen is Locked</h1>
          <p className="text-sm text-stone-secondary leading-relaxed">
            Your current membership does not hold an active Cookbook entitlement. Upgrade to unlock 60+ chef-crafted, high-protein recipes.
          </p>
        </div>
        <Link href="/#pricing">
          <Button variant="secondary" size="lg">
            Unlock The High-Performance Kitchen ($39)
          </Button>
        </Link>
      </div>
    );
  }

  const recipesList = (data.recipes || []).filter((r) => {
    const matchesCategory = selectedCategory === 'all' || r.category === selectedCategory;
    const matchesSearch =
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.tags?.some((t: string) => t.toLowerCase().includes(search.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Title & Filter bar */}
      <div className="border-b border-stone-border pb-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <Badge variant="terracotta">Culinary Blueprint</Badge>
            <h1 className="font-serif text-3xl sm:text-4xl text-stone-primary mt-1">
              High-Performance Kitchen
            </h1>
            <p className="text-sm text-stone-secondary">
              Chef-crafted meals with verified macro profiles engineered for muscular recovery and metabolic health.
            </p>
          </div>

          <div className="w-full sm:w-64">
            <Input
              placeholder="Search recipes or tags..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 pt-2">
          {['all', 'main', 'shake'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                selectedCategory === cat
                  ? 'bg-brand-terracotta text-white shadow-sm'
                  : 'bg-white border border-stone-border text-stone-secondary hover:text-stone-primary'
              }`}
            >
              {cat === 'all' ? 'All Recipes' : cat === 'main' ? 'Main Meals' : 'Shakes & Fuel'}
            </button>
          ))}
        </div>
      </div>

      {/* Recipe Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipesList.map((recipe) => {
          const isSaved = (data.savedRecipeIds || []).includes(recipe.id);

          return (
            <Card
              key={recipe.id}
              className="bg-white border-stone-border shadow-tactile hover:shadow-tactile-lg transition-all p-0 overflow-hidden flex flex-col justify-between cursor-pointer group"
              onClick={() => setSelectedRecipe(recipe)}
            >
              <div>
                {recipe.imageUrl && (
                  <div className="h-48 w-full overflow-hidden bg-stone-sunken relative">
                    <img
                      src={recipe.imageUrl}
                      alt={recipe.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <button
                      type="button"
                      onClick={(e) => handleToggleBookmark(e, recipe.id)}
                      className="absolute top-3 right-3 p-2 rounded-full bg-white/90 text-stone-primary hover:text-brand-terracotta backdrop-blur-sm transition-colors shadow-sm"
                    >
                      {isSaved ? (
                        <BookmarkCheck className="w-4 h-4 text-brand-terracotta" />
                      ) : (
                        <Bookmark className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                )}

                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between text-xs text-stone-secondary">
                    <span className="capitalize">{recipe.category}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {recipe.prepTimeMinutes + recipe.cookTimeMinutes}m
                    </span>
                  </div>

                  <h3 className="font-serif text-lg text-stone-primary leading-snug group-hover:text-brand-burgundy transition-colors">
                    {recipe.title}
                  </h3>

                  {/* Macros pill */}
                  <div className="grid grid-cols-3 gap-1 p-2 bg-surface-base rounded-lg border border-stone-border text-center text-xs">
                    <div>
                      <span className="text-[10px] text-stone-secondary uppercase block">Protein</span>
                      <strong className="text-brand-burgundy font-serif font-bold">
                        {recipe.proteinGrams}g
                      </strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-stone-secondary uppercase block">Carbs</span>
                      <strong className="text-stone-primary font-serif font-bold">
                        {recipe.carbsGrams}g
                      </strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-stone-secondary uppercase block">Calories</span>
                      <strong className="text-stone-primary font-serif font-bold">
                        {recipe.calories}
                      </strong>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <Button variant="ghost" size="sm" className="w-full text-brand-terracotta justify-between">
                  <span>View Recipe & Steps</span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Recipe Modal Drawer */}
      {selectedRecipe && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-6 shadow-tactile-lg border border-stone-border">
            <div className="flex justify-between items-start border-b border-stone-border pb-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-brand-terracotta">
                  {selectedRecipe.category}
                </span>
                <h2 className="font-serif text-2xl text-stone-primary mt-1">
                  {selectedRecipe.title}
                </h2>
              </div>
              <button
                onClick={() => setSelectedRecipe(null)}
                className="text-stone-secondary hover:text-stone-primary text-xl font-bold p-1"
              >
                ✕
              </button>
            </div>

            {/* Macros Summary */}
            <div className="grid grid-cols-4 gap-2 p-3 bg-surface-base rounded-xl border border-stone-border text-center">
              <div>
                <span className="text-[10px] uppercase text-stone-secondary block">Calories</span>
                <strong className="font-serif text-lg text-stone-primary">{selectedRecipe.calories}</strong>
              </div>
              <div>
                <span className="text-[10px] uppercase text-stone-secondary block">Protein</span>
                <strong className="font-serif text-lg text-brand-burgundy">{selectedRecipe.proteinGrams}g</strong>
              </div>
              <div>
                <span className="text-[10px] uppercase text-stone-secondary block">Carbs</span>
                <strong className="font-serif text-lg text-stone-primary">{selectedRecipe.carbsGrams}g</strong>
              </div>
              <div>
                <span className="text-[10px] uppercase text-stone-secondary block">Fats</span>
                <strong className="font-serif text-lg text-stone-primary">{selectedRecipe.fatGrams}g</strong>
              </div>
            </div>

            {/* Ingredients */}
            <div className="space-y-3">
              <h3 className="font-serif text-lg text-stone-primary">Ingredients</h3>
              <ul className="space-y-2 text-sm text-stone-primary list-disc list-inside">
                {(selectedRecipe.ingredients || []).map((ing: string, i: number) => (
                  <li key={i}>{ing}</li>
                ))}
              </ul>
            </div>

            {/* Instructions */}
            <div className="space-y-3 border-t border-stone-border pt-4">
              <h3 className="font-serif text-lg text-stone-primary">Preparation Steps</h3>
              <ol className="space-y-3 text-sm text-stone-primary">
                {(selectedRecipe.instructions || []).map((step: string, i: number) => (
                  <li key={i} className="flex gap-3">
                    <span className="w-6 h-6 rounded-full bg-brand-terracotta/10 text-brand-terracotta flex items-center justify-center font-bold text-xs shrink-0">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="pt-4 border-t border-stone-border flex justify-end">
              <Button variant="outline" size="md" onClick={() => setSelectedRecipe(null)}>
                Close Recipe
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
