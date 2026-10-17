'use client';

import React, { useState, useEffect } from 'react';
import {
  UtensilsCrossed,
  Plus,
  Search,
  Filter,
  Edit3,
  Trash2,
  Eye,
  Clock,
  Flame,
  CheckCircle2,
  AlertCircle,
  X,
  Dumbbell,
  RefreshCw,
  MessageSquare,
  Sparkles,
  Save,
  Image as ImageIcon,
  Check,
  ChefHat,
  Tag,
  ArrowRight,
  ExternalLink,
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

interface RecipeItem {
  id: string;
  title: string;
  slug: string;
  subtitle?: string | null;
  category: string;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings?: string | null;
  calories: number;
  proteinGrams: number;
  carbsGrams: number;
  fatGrams: number;
  fiberGrams?: number | null;
  sodiumMg?: number | null;
  imageUrl?: string | null;
  coachComment?: string | null;
  tags: string[];
  ingredients: any;
  instructions: any;
  status: 'published' | 'draft' | 'archived';
  createdAt?: string;
}

const PRESET_IMAGES = [
  {
    name: 'Grilled Chicken Jollof',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBL2og1WbUbmHiUMkN1TLOPpvgTxfDKxAJqmOOEL-yXryBBsJiuKfqMi9tJLi9Qkmn-a6tys6QQDs-y1LIXyv9-a8mJC_aWcykEBp6gqBtFw62HZfcKzu8-mHASDYzIzZXUR3xEEmJInDQt3gzHm8p8YEPtAemJV2FF-LIAvBfGuv2SNaNqBvip05H6NloKRTn7PY1AYCDz4AtltajzgOcB3eRE0lVrtkOtWo7JWKAs54xWRTvrCotvg',
  },
  {
    name: 'Suya Spiced Salmon',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLOUUv16tdJKMYMTzyTzFiHbFL5TLYXW0ws7-qUZMPmT51T_m8aaRRdP4eRVgInPCUm2Fu0yl4kXhLuxfy_c1Xji9OwCq8RRjjhR2hjyoejJt3vxIc0JhGBQf0wDkt1kMTwYTGLQ8As5OLsV3mbo_Uw_YRaCahgtYpK8ivPaC_AmK6WBUlzqDVokgsL2gRCppRgAeCTbOZOvULEN4FO4qXGDoFFw3iJPHYZ-kXpiPl2slRYOwZqkAuJA',
  },
  {
    name: 'Garden Egg & Mackerel',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAxdimTR_-Ed_N_geS8lRuYW3PEZC_Hh1hNnFsd3_-jB5-NtxihFagaYsleO20jdGu5uKWQCld5BLjNj-JFfNtOog0ViGOsI61l_65Al1uRsD-AFscPrHB7cZk-7IdvrUeSHTGtQfZBj6uiIxT_oznBderBoK1LUPS_Z2kNRT1rPOS9TvgK4FmIPGv4n6GN1fCbNblDYjEiU3HUkT43wA6kN5BSsQV9J_cY35MdiYjPRXVoLWjkcsWK9A',
  },
  {
    name: 'Protein Ogi & Walnuts',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNhyCgG3PDy5KeEavezpXl6a6GpEDK9BGYL83ofj3Ud_6LHDJwOkzT8cx2ElpvbTD3Rosy1kTiLJwSKs-3zChkCHjbmqY3jn3VpCnXzXcz5TRlR7lBgee6Y1C0eH114Hi89Yve844iacUhbl3-EosjIQjiftOz85_9t4gGAsK3jj8yq8qcviM2ANQ9fnNs_W4UsDvV_aPEpbtax0rXDLEZI5qMC48P11gEaru276XjMLNXFRURsBx7HA',
  },
  {
    name: 'Efo Riro Beef & Prawns',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0GPD_04nWsh--BmlMb1KK9rjE4HwtejIis51BuhgoPvD7nEocVBFS8NhOtT_kCiO5m3HCBdgfio4pNlDxxNkzs_nMBLrvu3roQeguMTZjDRbwP2GO9asB1iS_CicxsNWF6w6MvDmdc5Ws7v55A-M1bydY3tS8IbsbINQ_WxHS2NvDpOYpAkgWXhjo7dnmhzvrtQwH_VEZvWGu2T3hHj1BgYvl3fVemW-TurGEs1vHwUFPQNYBa_v2Yw',
  },
  {
    name: 'Berry Protein Whip',
    url: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=800&q=80',
  },
];

export default function ContentManagementPage() {
  const [activeTab, setActiveTab] = useState<'cookbook' | 'workouts'>('cookbook');
  const [recipesList, setRecipesList] = useState<RecipeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Modal / Drawer state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<RecipeItem | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Form Fields
  const [formTitle, setFormTitle] = useState('');
  const [formSlug, setFormSlug] = useState('');
  const [formSubtitle, setFormSubtitle] = useState('');
  const [formCategory, setFormCategory] = useState('main');
  const [formStatus, setFormStatus] = useState<'published' | 'draft' | 'archived'>('published');
  const [formPrepTime, setFormPrepTime] = useState(20);
  const [formCookTime, setFormCookTime] = useState(15);
  const [formServings, setFormServings] = useState('2 servings');
  const [formCalories, setFormCalories] = useState(480);
  const [formProtein, setFormProtein] = useState(40);
  const [formCarbs, setFormCarbs] = useState(45);
  const [formFat, setFormFat] = useState(14);
  const [formFiber, setFormFiber] = useState(8);
  const [formSodium, setFormSodium] = useState(320);
  const [formImageUrl, setFormImageUrl] = useState('');
  const [formCoachComment, setFormCoachComment] = useState('');
  const [formTags, setFormTags] = useState<string[]>(['High Protein', 'Gluten-Free']);
  const [newTagInput, setNewTagInput] = useState('');

  // Structured Ingredients & Steps
  const [ingredients, setIngredients] = useState<RecipeIngredient[]>([
    { name: '', amount: '' },
  ]);
  const [steps, setSteps] = useState<RecipeStep[]>([
    { number: '01', title: '', instruction: '' },
  ]);

  // Fetch recipes
  const loadRecipes = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/recipes');
      const data = await res.json();
      if (data.success && Array.isArray(data.recipes)) {
        setRecipesList(data.recipes);
      }
    } catch (err) {
      console.error('Failed to load recipes:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRecipes();
  }, []);

  // Sync / Seed Curated Recipes
  const handleSyncSignatureRecipes = async () => {
    try {
      setSyncing(true);
      const res = await fetch('/api/recipes/seed', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setFeedback({
          type: 'success',
          message: data.message || 'Signature recipes synced successfully!',
        });
        await loadRecipes();
      } else {
        setFeedback({ type: 'error', message: data.error || 'Failed to sync recipes' });
      }
    } catch (err: any) {
      setFeedback({ type: 'error', message: err.message || 'Failed to sync' });
    } finally {
      setSyncing(false);
      setTimeout(() => setFeedback(null), 4000);
    }
  };

  // Open modal for Create
  const handleOpenCreateModal = () => {
    setEditingRecipe(null);
    setFormTitle('');
    setFormSlug('');
    setFormSubtitle('');
    setFormCategory('main');
    setFormStatus('published');
    setFormPrepTime(20);
    setFormCookTime(15);
    setFormServings('2 bowls');
    setFormCalories(480);
    setFormProtein(42);
    setFormCarbs(45);
    setFormFat(12);
    setFormFiber(8);
    setFormSodium(340);
    setFormImageUrl(PRESET_IMAGES[0]?.url || '');
    setFormCoachComment(
      'Always season generously with authentic aromatics. High heat locks in flavor while keeping the protein succulent.'
    );
    setFormTags(['High Protein', 'Gluten-Free', 'Studio Favorite']);
    setIngredients([
      { name: 'Lean chicken breast or wild salmon', amount: '250g' },
      { name: 'Cold-pressed extra virgin olive oil', amount: '1 tbsp' },
      { name: 'Suya Yaji aromatic rub', amount: '1.5 tbsp' },
    ]);
    setSteps([
      {
        number: '01',
        title: 'Protein Prep & Sear',
        instruction: 'Season the protein evenly and sear in a smoking hot cast iron skillet.',
      },
      {
        number: '02',
        title: 'Aromatic Reduction',
        instruction: 'Simmer peppers and aromatics on low heat until natural oils rise.',
      },
    ]);
    setIsModalOpen(true);
  };

  // Open modal for Edit
  const handleOpenEditModal = (recipe: RecipeItem) => {
    setEditingRecipe(recipe);
    setFormTitle(recipe.title);
    setFormSlug(recipe.slug);
    setFormSubtitle(recipe.subtitle || '');
    setFormCategory(recipe.category);
    setFormStatus(recipe.status);
    setFormPrepTime(recipe.prepTimeMinutes);
    setFormCookTime(recipe.cookTimeMinutes);
    setFormServings(recipe.servings || '2 servings');
    setFormCalories(recipe.calories);
    setFormProtein(recipe.proteinGrams);
    setFormCarbs(recipe.carbsGrams);
    setFormFat(recipe.fatGrams);
    setFormFiber(recipe.fiberGrams || 0);
    setFormSodium(recipe.sodiumMg || 0);
    setFormImageUrl(recipe.imageUrl || '');
    setFormCoachComment(recipe.coachComment || '');
    setFormTags(Array.isArray(recipe.tags) ? recipe.tags : []);

    // Parse ingredients
    if (Array.isArray(recipe.ingredients) && recipe.ingredients.length > 0) {
      if (typeof recipe.ingredients[0] === 'object' && recipe.ingredients[0] !== null) {
        setIngredients(
          recipe.ingredients.map((ing: any) => ({
            name: ing.name || String(ing),
            amount: ing.amount || '',
          }))
        );
      } else {
        setIngredients(
          recipe.ingredients.map((str: any) => ({
            name: String(str),
            amount: '',
          }))
        );
      }
    } else {
      setIngredients([{ name: '', amount: '' }]);
    }

    // Parse steps
    if (Array.isArray(recipe.instructions) && recipe.instructions.length > 0) {
      if (typeof recipe.instructions[0] === 'object' && recipe.instructions[0] !== null) {
        setSteps(
          recipe.instructions.map((st: any, idx: number) => ({
            number: st.number || String(idx + 1).padStart(2, '0'),
            title: st.title || `Step ${idx + 1}`,
            instruction: st.instruction || String(st),
          }))
        );
      } else {
        setSteps(
          recipe.instructions.map((str: any, idx: number) => ({
            number: String(idx + 1).padStart(2, '0'),
            title: `Step ${idx + 1}`,
            instruction: String(str),
          }))
        );
      }
    } else {
      setSteps([{ number: '01', title: '', instruction: '' }]);
    }

    setIsModalOpen(true);
  };

  // Add/remove ingredients
  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: '', amount: '' }]);
  };
  const handleRemoveIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };
  const handleUpdateIngredient = (index: number, field: 'name' | 'amount', value: string) => {
    const updated = [...ingredients];
    const current = updated[index];
    if (current) {
      current[field] = value;
      setIngredients(updated);
    }
  };

  // Add/remove steps
  const handleAddStep = () => {
    const nextNum = String(steps.length + 1).padStart(2, '0');
    setSteps([...steps, { number: nextNum, title: '', instruction: '' }]);
  };
  const handleRemoveStep = (index: number) => {
    const filtered = steps.filter((_, i) => i !== index);
    // Renumber steps
    const renumbered = filtered.map((s, i) => ({
      ...s,
      number: String(i + 1).padStart(2, '0'),
    }));
    setSteps(renumbered);
  };
  const handleUpdateStep = (index: number, field: 'title' | 'instruction', value: string) => {
    const updated = [...steps];
    const current = updated[index];
    if (current) {
      current[field] = value;
      setSteps(updated);
    }
  };

  // Add/remove tags
  const handleAddTag = (e: React.KeyboardEvent | React.MouseEvent) => {
    if ('key' in e && e.key !== 'Enter') return;
    e.preventDefault();
    if (newTagInput.trim() && !formTags.includes(newTagInput.trim())) {
      setFormTags([...formTags, newTagInput.trim()]);
      setNewTagInput('');
    }
  };
  const handleRemoveTag = (tag: string) => {
    setFormTags(formTags.filter((t) => t !== tag));
  };

  // Submit Save
  const handleSaveRecipe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      alert('Please provide a recipe title');
      return;
    }

    try {
      setIsSaving(true);
      const payload = {
        title: formTitle.trim(),
        slug: formSlug.trim() || undefined,
        subtitle: formSubtitle.trim() || null,
        category: formCategory,
        status: formStatus,
        prepTimeMinutes: formPrepTime,
        cookTimeMinutes: formCookTime,
        servings: formServings.trim(),
        calories: formCalories,
        proteinGrams: formProtein,
        carbsGrams: formCarbs,
        fatGrams: formFat,
        fiberGrams: formFiber,
        sodiumMg: formSodium,
        imageUrl: formImageUrl.trim() || null,
        coachComment: formCoachComment.trim() || null,
        tags: formTags,
        ingredients: ingredients.filter((ing) => ing.name.trim().length > 0),
        instructions: steps.filter((st) => st.instruction.trim().length > 0),
      };

      const url = '/api/recipes';
      const method = editingRecipe ? 'PUT' : 'POST';
      const body = editingRecipe ? { id: editingRecipe.id, ...payload } : payload;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (data.success) {
        setFeedback({
          type: 'success',
          message: editingRecipe ? 'Recipe updated successfully!' : 'New recipe published to database!',
        });
        setIsModalOpen(false);
        await loadRecipes();
      } else {
        alert(data.error || 'Failed to save recipe');
      }
    } catch (err: any) {
      alert(err.message || 'Error saving recipe');
    } finally {
      setIsSaving(false);
      setTimeout(() => setFeedback(null), 4000);
    }
  };

  // Toggle publish status
  const handleToggleStatus = async (recipe: RecipeItem) => {
    const nextStatus = recipe.status === 'published' ? 'draft' : 'published';
    try {
      const res = await fetch('/api/recipes', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: recipe.id, status: nextStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setRecipesList((prev) =>
          prev.map((r) => (r.id === recipe.id ? { ...r, status: nextStatus } : r))
        );
      }
    } catch (err) {
      console.error('Failed to toggle status:', err);
    }
  };

  // Delete Recipe
  const handleDeleteRecipe = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to permanently delete "${title}"?`)) return;
    try {
      const res = await fetch(`/api/recipes?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setRecipesList((prev) => prev.filter((r) => r.id !== id));
        setFeedback({ type: 'success', message: `"${title}" was removed from database.` });
        setTimeout(() => setFeedback(null), 3000);
      }
    } catch (err) {
      console.error('Failed to delete recipe:', err);
    }
  };

  // Filtered recipes
  const filteredRecipes = recipesList.filter((r) => {
    const matchesSearch =
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (r.coachComment && r.coachComment.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (r.tags && r.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));

    const matchesCategory =
      categoryFilter === 'all' || r.category.toLowerCase() === categoryFilter.toLowerCase();

    const matchesStatus = statusFilter === 'all' || r.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-8 pb-20">
      {/* Top Banner / Toast */}
      {feedback && (
        <div
          className={`p-4 rounded-xl flex items-center justify-between text-xs font-medium border shadow-sm transition-all ${
            feedback.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-red-50 border-red-200 text-red-800'
          }`}
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{feedback.message}</span>
          </div>
          <button onClick={() => setFeedback(null)}>
            <X className="w-3.5 h-3.5 opacity-60 hover:opacity-100" />
          </button>
        </div>
      )}

      {/* Header & Quick Action Buttons */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-brand-burgundy/10 text-brand-burgundy">
              ADMIN CMS & EDITORIAL
            </span>
            <span className="text-stone-300">•</span>
            <span className="text-xs text-stone-secondary font-medium">Neon DB Live Synced</span>
          </div>
          <h1 className="text-2xl font-bold text-stone-primary mt-1 font-serif">
            Culinary & Protocol Management
          </h1>
          <p className="text-xs text-stone-secondary mt-1">
            Author, update, and publish cookbook recipes, Coach Tolu nutritional commentary, and workout routines.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleSyncSignatureRecipes}
            disabled={syncing}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold bg-white border border-stone-border text-stone-secondary hover:text-stone-primary hover:bg-surface-sunken transition-all shadow-sm disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${syncing ? 'animate-spin' : ''}`} />
            <span>{syncing ? 'Syncing...' : 'Sync Signature Recipes'}</span>
          </button>

          <button
            onClick={handleOpenCreateModal}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-brand-burgundy text-white hover:bg-brand-burgundy/90 transition-all shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Recipe</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-stone-border">
        <button
          onClick={() => setActiveTab('cookbook')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors ${
            activeTab === 'cookbook'
              ? 'border-brand-burgundy text-brand-burgundy'
              : 'border-transparent text-stone-secondary hover:text-stone-primary'
          }`}
        >
          <UtensilsCrossed className="w-4 h-4" />
          <span>Cookbook Recipes ({recipesList.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('workouts')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors ${
            activeTab === 'workouts'
              ? 'border-brand-burgundy text-brand-burgundy'
              : 'border-transparent text-stone-secondary hover:text-stone-primary'
          }`}
        >
          <Dumbbell className="w-4 h-4" />
          <span>Training Workouts & Programs (Phase 1)</span>
        </button>
      </div>

      {/* Tab 1: Cookbook Recipes */}
      {activeTab === 'cookbook' && (
        <div className="space-y-6">
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-white border border-stone-border shadow-sm">
              <span className="text-[11px] font-semibold text-stone-secondary uppercase">
                Total Recipes
              </span>
              <p className="text-xl font-bold text-stone-primary mt-1 font-serif">
                {recipesList.length}
              </p>
              <span className="text-[10px] text-stone-secondary">in database</span>
            </div>
            <div className="p-4 rounded-xl bg-white border border-stone-border shadow-sm">
              <span className="text-[11px] font-semibold text-stone-secondary uppercase">
                Published & Live
              </span>
              <p className="text-xl font-bold text-emerald-700 mt-1 font-serif">
                {recipesList.filter((r) => r.status === 'published').length}
              </p>
              <span className="text-[10px] text-stone-secondary">visible to members</span>
            </div>
            <div className="p-4 rounded-xl bg-white border border-stone-border shadow-sm">
              <span className="text-[11px] font-semibold text-stone-secondary uppercase">
                Drafts
              </span>
              <p className="text-xl font-bold text-amber-700 mt-1 font-serif">
                {recipesList.filter((r) => r.status === 'draft').length}
              </p>
              <span className="text-[10px] text-stone-secondary">work in progress</span>
            </div>
            <div className="p-4 rounded-xl bg-white border border-stone-border shadow-sm">
              <span className="text-[11px] font-semibold text-stone-secondary uppercase">
                Avg Protein / Dish
              </span>
              <p className="text-xl font-bold text-stone-primary mt-1 font-serif">
                {recipesList.length > 0
                  ? Math.round(
                      recipesList.reduce((acc, curr) => acc + (curr.proteinGrams || 0), 0) /
                        recipesList.length
                    )
                  : 0}
                g
              </p>
              <span className="text-[10px] text-stone-secondary">high-performance targets</span>
            </div>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 bg-white border border-stone-border rounded-xl shadow-sm">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-stone-secondary absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search recipe by title, coach note, ingredient, or tag..."
                className="w-full pl-9 pr-4 py-1.5 text-xs rounded-lg border border-stone-border focus:outline-none focus:border-brand-burgundy transition-colors"
              />
            </div>

            <div className="flex items-center gap-2">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-1.5 text-xs rounded-lg border border-stone-border bg-white text-stone-primary focus:outline-none focus:border-brand-burgundy"
              >
                <option value="all">All Categories</option>
                <option value="main">Main Course</option>
                <option value="breakfast">Breakfast</option>
                <option value="shake">Shakes & Smoothies</option>
                <option value="snack">Snacks</option>
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-1.5 text-xs rounded-lg border border-stone-border bg-white text-stone-primary focus:outline-none focus:border-brand-burgundy"
              >
                <option value="all">All Statuses</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>

          {/* Recipes Table */}
          <div className="bg-white border border-stone-border rounded-xl shadow-sm overflow-hidden">
            {loading ? (
              <div className="p-12 text-center text-xs text-stone-secondary flex flex-col items-center gap-2">
                <RefreshCw className="w-5 h-5 animate-spin text-stone-secondary" />
                <span>Loading cookbook records from Neon database...</span>
              </div>
            ) : filteredRecipes.length === 0 ? (
              <div className="p-12 text-center text-xs text-stone-secondary space-y-2">
                <p className="font-semibold text-stone-primary">No recipes found matching your filter.</p>
                <p>Try clearing your search query or click "Sync Signature Recipes" to restore curated meals.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-surface-sunken border-b border-stone-border text-stone-secondary uppercase text-[10px] tracking-wider font-semibold">
                    <tr>
                      <th className="p-3.5">Recipe</th>
                      <th className="p-3.5">Category</th>
                      <th className="p-3.5">Macros & Energy</th>
                      <th className="p-3.5">Coach Tolu Comment</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-border">
                    {filteredRecipes.map((recipe) => (
                      <tr key={recipe.id} className="hover:bg-surface-sunken/40 transition-colors">
                        {/* Recipe Image & Title */}
                        <td className="p-3.5">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-lg bg-surface-sunken border border-stone-border overflow-hidden shrink-0">
                              {recipe.imageUrl ? (
                                <img
                                  src={recipe.imageUrl}
                                  alt={recipe.title}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-stone-400">
                                  <ImageIcon className="w-5 h-5" />
                                </div>
                              )}
                            </div>
                            <div className="min-w-0 max-w-xs">
                              <p className="font-bold text-stone-primary truncate">{recipe.title}</p>
                              {recipe.subtitle && (
                                <p className="text-[10px] text-stone-secondary truncate">
                                  {recipe.subtitle}
                                </p>
                              )}
                              <div className="flex items-center gap-2 mt-0.5 text-[10px] text-stone-secondary">
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {recipe.prepTimeMinutes + recipe.cookTimeMinutes} min
                                </span>
                                <span>•</span>
                                <span>{recipe.servings || '2 servings'}</span>
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Category & Tags */}
                        <td className="p-3.5">
                          <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-stone-100 text-stone-700">
                            {recipe.category}
                          </span>
                          {recipe.tags && recipe.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-1 max-w-[150px]">
                              {recipe.tags.slice(0, 2).map((t, idx) => (
                                <span
                                  key={idx}
                                  className="text-[9px] px-1.5 py-0.2 rounded bg-surface-sunken text-stone-secondary"
                                >
                                  {t}
                                </span>
                              ))}
                              {recipe.tags.length > 2 && (
                                <span className="text-[9px] text-stone-secondary">
                                  +{recipe.tags.length - 2}
                                </span>
                              )}
                            </div>
                          )}
                        </td>

                        {/* Macros */}
                        <td className="p-3.5">
                          <div className="space-y-0.5 font-mono text-[11px]">
                            <p className="font-semibold text-stone-primary">
                              {recipe.calories} kcal
                            </p>
                            <p className="text-[10px] text-stone-secondary">
                              <span className="text-brand-burgundy font-semibold">
                                {recipe.proteinGrams}g P
                              </span>{' '}
                              • {recipe.carbsGrams}g C • {recipe.fatGrams}g F
                            </p>
                          </div>
                        </td>

                        {/* Coach Comment Preview */}
                        <td className="p-3.5 max-w-xs">
                          {recipe.coachComment ? (
                            <div className="flex items-start gap-1.5 text-stone-secondary text-[11px] italic line-clamp-2">
                              <MessageSquare className="w-3.5 h-3.5 text-brand-burgundy shrink-0 mt-0.5" />
                              <span>"{recipe.coachComment}"</span>
                            </div>
                          ) : (
                            <span className="text-[10px] text-stone-400 italic">No comment added yet</span>
                          )}
                        </td>

                        {/* Status */}
                        <td className="p-3.5">
                          <button
                            onClick={() => handleToggleStatus(recipe)}
                            className="inline-flex items-center gap-1.5 cursor-pointer"
                            title="Click to toggle publish status"
                          >
                            <span
                              className={`w-2 h-2 rounded-full ${
                                recipe.status === 'published'
                                  ? 'bg-emerald-500'
                                  : recipe.status === 'draft'
                                  ? 'bg-amber-500'
                                  : 'bg-stone-400'
                              }`}
                            />
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-medium capitalize ${
                                recipe.status === 'published'
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                  : recipe.status === 'draft'
                                  ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                  : 'bg-stone-100 text-stone-700 border border-stone-200'
                              }`}
                            >
                              {recipe.status}
                            </span>
                          </button>
                        </td>

                        {/* Action buttons */}
                        <td className="p-3.5 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleOpenEditModal(recipe)}
                              className="p-1.5 rounded-lg text-stone-secondary hover:text-stone-primary hover:bg-stone-100 transition-colors"
                              title="Edit recipe & coach comments"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteRecipe(recipe.id, recipe.title)}
                              className="p-1.5 rounded-lg text-stone-secondary hover:text-red-600 hover:bg-red-50 transition-colors"
                              title="Delete recipe"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Workouts CMS */}
      {activeTab === 'workouts' && (
        <div className="space-y-6">
          <div className="p-6 bg-white border border-stone-border rounded-xl shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-stone-100 text-stone-700">
                  PROGRAM BLUEPRINT
                </span>
                <h3 className="text-lg font-bold text-stone-primary mt-1 font-serif">
                  Phase 1: Foundations of Strength & Power
                </h3>
                <p className="text-xs text-stone-secondary">
                  12-week progressive overload protocol engineered for lean hypertrophy and functional mechanics.
                </p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                Active Protocol
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-stone-border">
              <div className="p-4 rounded-lg bg-surface-sunken space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-stone-primary">Day 1: Lower Body Kinetic Foundation</span>
                  <span className="text-stone-secondary">48 min</span>
                </div>
                <p className="text-[11px] text-stone-secondary">
                  Romanian deadlifts, rear foot split squats, pause goblet squats, and hanging core.
                </p>
                <span className="inline-block text-[10px] font-semibold text-brand-burgundy">
                  4 movements • 13 total sets
                </span>
              </div>

              <div className="p-4 rounded-lg bg-surface-sunken space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-stone-primary">Day 2: Upper Body Push & Pull Mechanics</span>
                  <span className="text-stone-secondary">45 min</span>
                </div>
                <p className="text-[11px] text-stone-secondary">
                  Neutral dumbbell floor presses, chest-supported rows, and half-kneeling presses.
                </p>
                <span className="inline-block text-[10px] font-semibold text-brand-burgundy">
                  4 movements • 14 total sets
                </span>
              </div>

              <div className="p-4 rounded-lg bg-surface-sunken space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-stone-primary">Day 3: Conditioning & Aerobic Base</span>
                  <span className="text-stone-secondary">40 min</span>
                </div>
                <p className="text-[11px] text-stone-secondary">
                  Kettlebell clean squats, plank pull-throughs, and heavy farmer's carries.
                </p>
                <span className="inline-block text-[10px] font-semibold text-brand-burgundy">
                  3 movements • 12 total sets
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL / DRAWER FOR CREATE & EDIT RECIPE */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-stone-border my-auto overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-stone-border flex items-center justify-between bg-surface-sunken">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-brand-burgundy text-white">
                  <UtensilsCrossed className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base text-stone-primary">
                    {editingRecipe ? 'Edit Recipe & Coach Commentary' : 'Author New Cookbook Dish'}
                  </h3>
                  <p className="text-[11px] text-stone-secondary">
                    Configure ingredient breakdowns, numbered instructions, and Coach Tolu tips.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-stone-secondary hover:text-stone-primary hover:bg-stone-200 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Form Scrollable Body */}
            <form onSubmit={handleSaveRecipe} className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Row 1: Title, Subtitle, Slug */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-primary">
                    Recipe Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={(e) => {
                      setFormTitle(e.target.value);
                      if (!editingRecipe) {
                        setFormSlug(
                          e.target.value
                            .toLowerCase()
                            .replace(/[^a-z0-9]+/g, '-')
                            .replace(/(^-|-$)+/g, '')
                        );
                      }
                    }}
                    placeholder="e.g. Grilled Chicken Jollof Bowl"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-stone-border focus:outline-none focus:border-brand-burgundy"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-primary">
                    Slug / URL Identifier
                  </label>
                  <input
                    type="text"
                    value={formSlug}
                    onChange={(e) => setFormSlug(e.target.value)}
                    placeholder="e.g. grilled-chicken-jollof-bowl"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-stone-border focus:outline-none focus:border-brand-burgundy font-mono text-[11px]"
                  />
                </div>
              </div>

              {/* Row 2: Subtitle / Header Badge & Category & Status */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-primary">
                    Editorial Subtitle / Badge
                  </label>
                  <input
                    type="text"
                    value={formSubtitle}
                    onChange={(e) => setFormSubtitle(e.target.value)}
                    placeholder="e.g. POST-WORKOUT FUEL — LEAN MACRO TARGET"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-stone-border focus:outline-none focus:border-brand-burgundy"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-primary">Category</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-stone-border bg-white focus:outline-none focus:border-brand-burgundy"
                  >
                    <option value="main">Main Dish</option>
                    <option value="breakfast">Breakfast</option>
                    <option value="shake">Shake & Smoothie</option>
                    <option value="snack">Performance Snack</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-primary">Publication Status</label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-stone-border bg-white focus:outline-none focus:border-brand-burgundy"
                  >
                    <option value="published">Published (Visible in App)</option>
                    <option value="draft">Draft (Admin Only)</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>

              {/* COACH TOLU COMMENT & CHEF'S TIP (Explicitly requested by user) */}
              <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="p-1 rounded bg-amber-600 text-white">
                    <MessageSquare className="w-3.5 h-3.5" />
                  </div>
                  <label className="text-xs font-bold text-amber-900 uppercase tracking-wider">
                    Coach Tolu Comment & Chef's Tip
                  </label>
                  <span className="text-[10px] text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full font-medium">
                    Displayed prominently inside the member recipe modal
                  </span>
                </div>
                <textarea
                  rows={3}
                  value={formCoachComment}
                  onChange={(e) => setFormCoachComment(e.target.value)}
                  placeholder="e.g. Yes, jollof rice is 100% allowed on this program! We balance the glycemic response by incorporating cauliflower grains..."
                  className="w-full px-3 py-2 text-xs rounded-lg border border-amber-300 bg-white focus:outline-none focus:border-brand-burgundy"
                />
              </div>

              {/* Row 3: Nutrition & Timings */}
              <div className="p-4 rounded-xl bg-surface-sunken space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-secondary">
                  Macro Profile & Timing Specifications
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold text-stone-secondary">Calories (kcal)</label>
                    <input
                      type="number"
                      value={formCalories}
                      onChange={(e) => setFormCalories(Number(e.target.value))}
                      className="w-full px-2.5 py-1.5 text-xs rounded border border-stone-border bg-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold text-stone-secondary">Protein (g)</label>
                    <input
                      type="number"
                      value={formProtein}
                      onChange={(e) => setFormProtein(Number(e.target.value))}
                      className="w-full px-2.5 py-1.5 text-xs rounded border border-stone-border bg-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold text-stone-secondary">Carbs (g)</label>
                    <input
                      type="number"
                      value={formCarbs}
                      onChange={(e) => setFormCarbs(Number(e.target.value))}
                      className="w-full px-2.5 py-1.5 text-xs rounded border border-stone-border bg-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold text-stone-secondary">Fat (g)</label>
                    <input
                      type="number"
                      value={formFat}
                      onChange={(e) => setFormFat(Number(e.target.value))}
                      className="w-full px-2.5 py-1.5 text-xs rounded border border-stone-border bg-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold text-stone-secondary">Prep (mins)</label>
                    <input
                      type="number"
                      value={formPrepTime}
                      onChange={(e) => setFormPrepTime(Number(e.target.value))}
                      className="w-full px-2.5 py-1.5 text-xs rounded border border-stone-border bg-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold text-stone-secondary">Cook (mins)</label>
                    <input
                      type="number"
                      value={formCookTime}
                      onChange={(e) => setFormCookTime(Number(e.target.value))}
                      className="w-full px-2.5 py-1.5 text-xs rounded border border-stone-border bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold text-stone-secondary">Servings Output</label>
                    <input
                      type="text"
                      value={formServings}
                      onChange={(e) => setFormServings(e.target.value)}
                      placeholder="e.g. 2 bowls or 1 portion"
                      className="w-full px-2.5 py-1.5 text-xs rounded border border-stone-border bg-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold text-stone-secondary">Fiber (g)</label>
                    <input
                      type="number"
                      value={formFiber}
                      onChange={(e) => setFormFiber(Number(e.target.value))}
                      className="w-full px-2.5 py-1.5 text-xs rounded border border-stone-border bg-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold text-stone-secondary">Sodium (mg)</label>
                    <input
                      type="number"
                      value={formSodium}
                      onChange={(e) => setFormSodium(Number(e.target.value))}
                      className="w-full px-2.5 py-1.5 text-xs rounded border border-stone-border bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Image URL & Preset Selection */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-stone-primary">
                  Recipe Photography (Image URL)
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={formImageUrl}
                    onChange={(e) => setFormImageUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="flex-1 px-3 py-2 text-xs rounded-lg border border-stone-border focus:outline-none focus:border-brand-burgundy font-mono text-[11px]"
                  />
                  {formImageUrl && (
                    <div className="w-10 h-10 rounded-lg overflow-hidden border border-stone-border shrink-0">
                      <img src={formImageUrl} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-[10px] text-stone-secondary">Preset Studio Visuals:</span>
                  {PRESET_IMAGES.map((img, idx) => (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => setFormImageUrl(img.url)}
                      className={`text-[10px] px-2 py-0.5 rounded border transition-colors ${
                        formImageUrl === img.url
                          ? 'bg-brand-burgundy text-white border-brand-burgundy'
                          : 'bg-white text-stone-secondary border-stone-border hover:bg-stone-50'
                      }`}
                    >
                      {img.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Ingredients Builder */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-stone-primary uppercase tracking-wider">
                      Ingredients Breakdown ({ingredients.length})
                    </h4>
                    <p className="text-[10px] text-stone-secondary">
                      Members can check off these items in real-time while grocery shopping or cooking.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddIngredient}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold bg-stone-100 hover:bg-stone-200 text-stone-primary transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Item</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {ingredients.map((ing, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="text-xs text-stone-400 font-mono w-5 text-right">{idx + 1}.</span>
                      <input
                        type="text"
                        placeholder="Ingredient name (e.g. Wild Atlantic Salmon Fillet)"
                        value={ing.name}
                        onChange={(e) => handleUpdateIngredient(idx, 'name', e.target.value)}
                        className="flex-1 px-3 py-1.5 text-xs rounded border border-stone-border focus:outline-none focus:border-brand-burgundy"
                      />
                      <input
                        type="text"
                        placeholder="Amount (e.g. 200g or 1 tbsp)"
                        value={ing.amount}
                        onChange={(e) => handleUpdateIngredient(idx, 'amount', e.target.value)}
                        className="w-32 px-3 py-1.5 text-xs rounded border border-stone-border focus:outline-none focus:border-brand-burgundy"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveIngredient(idx)}
                        disabled={ingredients.length <= 1}
                        className="p-1.5 text-stone-400 hover:text-red-600 disabled:opacity-30"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dynamic Step-by-Step Instructions Builder */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-stone-primary uppercase tracking-wider">
                      Numbered Preparation Protocol ({steps.length} Steps)
                    </h4>
                    <p className="text-[10px] text-stone-secondary">
                      Clean sequential guide displayed with large numbers (01, 02, etc.) in the modal.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddStep}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold bg-stone-100 hover:bg-stone-200 text-stone-primary transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Step</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {steps.map((st, idx) => (
                    <div key={idx} className="p-3 rounded-lg border border-stone-border bg-stone-50/50 space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-serif font-bold text-xs text-brand-burgundy bg-brand-burgundy/10 px-2 py-0.5 rounded">
                            {st.number}
                          </span>
                          <input
                            type="text"
                            placeholder="Step Title (e.g. Spice Crust Application)"
                            value={st.title}
                            onChange={(e) => handleUpdateStep(idx, 'title', e.target.value)}
                            className="px-2.5 py-1 text-xs rounded border border-stone-border bg-white font-medium"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveStep(idx)}
                          disabled={steps.length <= 1}
                          className="p-1 text-stone-400 hover:text-red-600 disabled:opacity-30"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <textarea
                        rows={2}
                        placeholder="Detailed instruction text..."
                        value={st.instruction}
                        onChange={(e) => handleUpdateStep(idx, 'instruction', e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs rounded border border-stone-border bg-white focus:outline-none focus:border-brand-burgundy"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags Input */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-stone-primary">
                  Nutritional & Lifestyle Tags
                </label>
                <div className="flex flex-wrap items-center gap-1.5 p-2 rounded-lg border border-stone-border bg-white min-h-[42px]">
                  {formTags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-surface-sunken text-stone-primary border border-stone-border"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="text-stone-400 hover:text-stone-700"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                  <div className="flex items-center gap-1 flex-1 min-w-[120px]">
                    <input
                      type="text"
                      placeholder="Add tag and press Enter..."
                      value={newTagInput}
                      onChange={(e) => setNewTagInput(e.target.value)}
                      onKeyDown={handleAddTag}
                      className="w-full text-xs outline-none bg-transparent"
                    />
                    <button
                      type="button"
                      onClick={handleAddTag}
                      className="text-xs font-semibold text-brand-burgundy hover:underline px-1"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </form>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-stone-border bg-surface-sunken flex items-center justify-between">
              <span className="text-[11px] text-stone-secondary">
                {editingRecipe ? 'Editing existing recipe record' : 'Creating new recipe in Neon DB'}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-xs font-semibold border border-stone-border bg-white text-stone-secondary hover:text-stone-primary hover:bg-stone-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveRecipe}
                  disabled={isSaving}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-semibold bg-brand-burgundy text-white hover:bg-brand-burgundy/90 transition-all shadow-sm disabled:opacity-50"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{isSaving ? 'Saving to Database...' : editingRecipe ? 'Update Recipe' : 'Publish Recipe'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
