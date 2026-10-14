'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { PRODUCTS, ProductSlug } from '@repo/domain';
import { Button, Badge, Card } from '@repo/ui';
import {
  Check,
  ArrowRight,
  ShieldCheck,
  Flame,
  Utensils,
  Dumbbell,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Clock,
  Award,
  Layers,
  Smartphone,
  Zap,
  Star,
  HelpCircle,
  CreditCard,
  Building2,
} from 'lucide-react';

interface AuthUser {
  id: string;
  email: string;
  role: string;
}

export default function LandingPage() {
  const [currency, setCurrency] = useState<'NGN' | 'USD'>('NGN');
  const [loadingSlug, setLoadingSlug] = useState<ProductSlug | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [activePreviewTab, setActivePreviewTab] = useState<'training' | 'recipes'>('training');
  const [openExerciseIndex, setOpenExerciseIndex] = useState<number | null>(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Check if user is already signed in
  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated && data.user) {
          setUser(data.user);
        }
      })
      .catch(() => {});
  }, []);

  const handleCheckout = async (slug: ProductSlug) => {
    try {
      setLoadingSlug(slug);
      const res = await fetch('/api/checkout/create-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productSlug: slug,
          currency,
        }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else if (data.simulatedUrl) {
        window.location.href = data.simulatedUrl;
      } else {
        alert(data.error || 'Failed to initialize payment gateway.');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      alert('Could not start checkout. Please try again.');
    } finally {
      setLoadingSlug(null);
    }
  };

  const formatPrice = (slug: ProductSlug) => {
    const prod = PRODUCTS[slug];
    if (!prod) return '';
    if (currency === 'NGN') {
      return `₦${prod.priceInNgn.toLocaleString()}`;
    }
    return `$${(prod.priceInCents / 100).toFixed(0)}`;
  };

  const sampleExercises = [
    {
      code: 'A1',
      name: 'Barbell Back Squat',
      prescription: '4 sets × 8 reps',
      tempo: '3-0-1-0 (3s descent, explosive drive)',
      rest: '90s rest',
      cue: 'Screw your feet into the floor. Maintain neutral spine, push knees outward over toes, and lead upward through midfoot.',
      target: 'Quadriceps, Glutes, Core Bracing',
    },
    {
      code: 'B1',
      name: 'Romanian Deadlift (RDL)',
      prescription: '3 sets × 10 reps',
      tempo: '3-1-1-0 (Pause at maximum stretch)',
      rest: '75s rest',
      cue: 'Hinge hips backwards as if closing a car door with your glutes. Keep lats packed and barbell shaved against thighs.',
      target: 'Hamstrings, Gluteus Maximus, Lower Back',
    },
    {
      code: 'C1',
      name: 'Bulgarian Split Squat',
      prescription: '3 sets × 12 reps / leg',
      tempo: '2-0-1-0 (Constant tension)',
      rest: '60s rest',
      cue: 'Front foot planted firmly. Drop rear knee straight down toward floor. Slight torso forward lean to maximize glute bias.',
      target: 'Unilateral Stability, Quads, Adductors',
    },
    {
      code: 'D1',
      name: 'Hanging Knee-to-Chest Raise',
      prescription: '3 sets × 15 reps',
      tempo: 'Control descent (no swinging)',
      rest: '45s rest',
      cue: 'Lock shoulder blades down. Initiate by tucking the pelvis into posterior tilt rather than swinging with hip flexors.',
      target: 'Rectus Abdominis, Deep Core Stabilization',
    },
  ];

  const sampleRecipes = [
    {
      title: 'Charred Chimichurri Flank Steak',
      subtitle: 'High-Protein Argentine Bowl',
      prepTime: '25 min',
      calories: 520,
      protein: 54,
      carbs: 38,
      fat: 18,
      tag: 'High Protein',
      description: 'Marinated grass-fed flank steak seared medium-rare, accompanied by herb-forward chimichurri, jasmine rice, and charred sweet peppers.',
      staples: ['Flank steak', 'Fresh parsley & oregano', 'Garlic & red wine vinegar', 'Jasmine rice', 'Extra virgin olive oil'],
    },
    {
      title: 'Crispy Honey Chipotle Salmon Rice',
      subtitle: 'Omega-3 Lean Muscle Formula',
      prepTime: '20 min',
      calories: 490,
      protein: 48,
      carbs: 42,
      fat: 16,
      tag: 'Quick Prep',
      description: 'Wild salmon fillet pan-crisped with a smoky chipotle glaze, served over lime cilantro basmati and roasted zucchini coins.',
      staples: ['Salmon fillet', 'Chipotle pepper in adobo', 'Raw honey', 'Basmati rice', 'Fresh lime'],
    },
    {
      title: 'Garlic Lemon-Thyme Braised Chicken',
      subtitle: 'Slow-Cooked Batch Meal Prep',
      prepTime: '30 min',
      calories: 460,
      protein: 51,
      carbs: 28,
      fat: 14,
      tag: 'Meal Prep',
      description: 'Golden seared chicken breasts simmered with roasted garlic cloves, fresh thyme sprigs, lemon zest, and herbed roasted sweet potato wedges.',
      staples: ['Boneless chicken breast', 'Whole garlic head', 'Fresh thyme', 'Sweet potatoes', 'Bone broth'],
    },
  ];

  const faqs = [
    {
      q: 'Can I pay with a Nigerian debit card or direct bank transfer?',
      a: 'Yes! We use Paystack as our primary payment infrastructure. You can pay seamlessly using any Nigerian Mastercard, Visa, Verve card, instant bank transfer, or USSD. Your access is provisioned immediately upon transaction confirmation.',
    },
    {
      q: 'Is this a monthly subscription or a one-time purchase?',
      a: 'Every tier is a 100% one-time payment. You receive lifetime access to your purchased protocol, video library, and cookbooks with zero recurring fees, no surprise debits, and no cancellation hoops.',
    },
    {
      q: 'Do I need a commercial gym membership to follow the training?',
      a: 'The protocol is optimized for standard gym equipment (barbells, dumbbells, cable station, and adjustable bench). However, every single exercise includes structured home dumbbell and bodyweight substitution cues.',
    },
    {
      q: 'How does passwordless magic-link sign-in work?',
      a: 'Instead of forcing you to remember complicated passwords, you simply enter your email. We send a secure, single-use, 15-minute access link directly to your inbox that logs you in with one tap on mobile or desktop.',
    },
    {
      q: 'Are the recipes difficult or full of hard-to-find ingredients?',
      a: 'Zero gimmicky powders or bizarre specialty items. All 60+ recipes are engineered using accessible whole-food staples: lean proteins (beef, chicken, fish, eggs), clean carbohydrates (rice, potatoes, oats, plantains), and fresh herbs and citrus.',
    },
    {
      q: 'Can I install this on my iPhone or Android phone?',
      a: 'Yes. The web application is engineered as a mobile-first Progressive Web App. You can add it directly to your phone home screen from Safari or Chrome without downloading a 200MB app store binary.',
    },
  ];

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-surface-base">
      {/* Top Header Navigation */}
      <header className="sticky top-0 z-40 bg-surface-base/90 backdrop-blur-md border-b border-stone-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <span className="w-8 h-8 rounded-lg bg-brand-burgundy text-white flex items-center justify-center font-bold text-sm tracking-wider font-serif shadow-sm">
              M
            </span>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-base tracking-tight text-stone-primary">
                THE METHOD
              </span>
              <span className="text-[9px] tracking-widest uppercase text-stone-secondary font-medium">
                Creator Fitness & Nutrition
              </span>
            </div>
          </Link>

          <nav className="flex items-center gap-3 sm:gap-6">
            <a
              href="#curriculum"
              className="text-xs font-medium text-stone-secondary hover:text-stone-primary transition-colors hidden md:inline-block"
            >
              Curriculum Preview
            </a>
            <a
              href="#philosophy"
              className="text-xs font-medium text-stone-secondary hover:text-stone-primary transition-colors hidden md:inline-block"
            >
              The Philosophy
            </a>
            <a
              href="#pricing"
              className="text-xs font-medium text-stone-secondary hover:text-stone-primary transition-colors hidden sm:inline-block"
            >
              Pricing & Access
            </a>

            {user ? (
              <Link href="/home">
                <Button size="sm" variant="primary" className="shadow-sm">
                  Dashboard
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Button>
              </Link>
            ) : (
              <Link href="/sign-in">
                <Button variant="outline" size="sm">
                  Member Sign In
                </Button>
              </Link>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden border-b border-stone-border">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-6">
                <Badge variant="burgundy" className="inline-flex items-center gap-1.5 py-1 px-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  Creator-Led Strength & High-Protein Culinary Architecture
                </Badge>

                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.1] text-stone-primary">
                  Train with Intention. <br />
                  <span className="italic font-serif text-brand-burgundy font-medium">
                    Fuel with Precision.
                  </span>
                </h1>

                <p className="text-base sm:text-lg text-stone-secondary max-w-xl font-normal leading-relaxed">
                  A high-touch, mobile-first training curriculum paired with chef-crafted, high-protein
                  nutrition. Built for individuals who demand physical performance, lean composition, and
                  genuine culinary joy without obsessive noise.
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                  <a href="#pricing">
                    <Button size="lg" className="w-full sm:w-auto shadow-tactile-lg">
                      Explore Access Options
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </a>
                  <a href="#curriculum">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto">
                      View Sample Protocol
                    </Button>
                  </a>
                </div>

                {/* Trust Strips */}
                <div className="pt-6 flex flex-wrap items-center gap-y-3 gap-x-6 text-xs text-stone-secondary border-t border-stone-border/80">
                  <div className="flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-brand-burgundy" />
                    <span>Instant Paystack Activation</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-brand-terracotta" />
                    <span>One-Time Lifetime Access</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Smartphone className="w-4 h-4 text-brand-burgundy" />
                    <span>Mobile Web Native (No App Store)</span>
                  </div>
                </div>
              </div>

              {/* Hero Visual Teaser */}
              <div className="lg:col-span-5">
                <div className="relative mx-auto max-w-md lg:max-w-none">
                  <div className="absolute -inset-1.5 bg-gradient-to-r from-brand-burgundy/20 to-brand-terracotta/20 rounded-2xl blur-lg" />
                  <div className="relative rounded-2xl overflow-hidden border border-stone-border bg-white shadow-tactile-lg">
                    <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-stone-sunken">
                      <img
                        src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=80"
                        alt="Trainer demonstrating movement"
                        className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <span className="text-[10px] uppercase tracking-widest font-bold text-white bg-brand-burgundy px-2.5 py-0.5 rounded">
                          Phase 1 Protocol
                        </span>
                        <h2 className="font-serif text-xl font-bold mt-1.5">
                          Foundations of Kinetic Power
                        </h2>
                        <p className="text-xs text-white/80 mt-0.5">
                          12-Week Periodized Hypertrophy & Joint Stability
                        </p>
                      </div>
                    </div>

                    <div className="p-5 space-y-3">
                      <div className="grid grid-cols-3 gap-2 py-1 border-b border-stone-border/60 text-center">
                        <div>
                          <span className="font-serif font-bold text-base text-stone-primary">12</span>
                          <span className="block text-[10px] text-stone-secondary uppercase">Weeks</span>
                        </div>
                        <div>
                          <span className="font-serif font-bold text-base text-brand-burgundy">60+</span>
                          <span className="block text-[10px] text-stone-secondary uppercase">Chef Recipes</span>
                        </div>
                        <div>
                          <span className="font-serif font-bold text-base text-brand-terracotta">100%</span>
                          <span className="block text-[10px] text-stone-secondary uppercase">Video Cued</span>
                        </div>
                      </div>
                      <p className="text-xs text-stone-secondary leading-normal">
                        Every exercise is streamed via Cloudflare R2 with explicit tempo instructions, joint angles, and weight logging.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Curriculum & Kitchen Preview */}
        <section id="curriculum" className="py-20 bg-surface-raised border-b border-stone-border">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
              <Badge variant="burgundy">Interactive Preview</Badge>
              <h2 className="font-serif text-3xl sm:text-4xl text-stone-primary">
                Experience The Architecture
              </h2>
              <p className="text-stone-secondary text-sm sm:text-base">
                Inspect sample workouts and chef-engineered high-protein meals before joining.
              </p>

              {/* Tab Switcher */}
              <div className="inline-flex p-1 rounded-xl bg-surface-sunken border border-stone-border mt-4">
                <button
                  type="button"
                  onClick={() => setActivePreviewTab('training')}
                  className={`flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-semibold transition-all ${
                    activePreviewTab === 'training'
                      ? 'bg-brand-burgundy text-white shadow-sm'
                      : 'text-stone-secondary hover:text-stone-primary'
                  }`}
                >
                  <Dumbbell className="w-3.5 h-3.5" />
                  Training Protocol Sample
                </button>
                <button
                  type="button"
                  onClick={() => setActivePreviewTab('recipes')}
                  className={`flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-semibold transition-all ${
                    activePreviewTab === 'recipes'
                      ? 'bg-brand-burgundy text-white shadow-sm'
                      : 'text-stone-secondary hover:text-stone-primary'
                  }`}
                >
                  <Utensils className="w-3.5 h-3.5" />
                  High-Protein Kitchen Sample
                </button>
              </div>
            </div>

            {/* Content Display based on Tab */}
            {activePreviewTab === 'training' ? (
              <div className="max-w-3xl mx-auto space-y-4">
                <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-stone-border shadow-sm">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-burgundy">
                      Week 1 • Session A
                    </span>
                    <h3 className="font-serif text-lg font-bold text-stone-primary">
                      Lower Body Kinetic Hypertrophy
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-stone-secondary">
                    <Clock className="w-3.5 h-3.5" />
                    <span>50 Min Session</span>
                  </div>
                </div>

                <div className="space-y-3">
                  {sampleExercises.map((ex, idx) => {
                    const isOpen = openExerciseIndex === idx;
                    return (
                      <div
                        key={idx}
                        className="bg-white rounded-xl border border-stone-border overflow-hidden transition-all shadow-sm hover:border-stone-border/80"
                      >
                        <button
                          type="button"
                          onClick={() => setOpenExerciseIndex(isOpen ? null : idx)}
                          className="w-full p-4 flex items-center justify-between text-left hover:bg-surface-base/50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-8 h-8 rounded-lg bg-surface-sunken border border-stone-border text-stone-primary font-bold text-xs flex items-center justify-center font-mono">
                              {ex.code}
                            </span>
                            <div>
                              <h4 className="font-serif font-bold text-sm text-stone-primary">
                                {ex.name}
                              </h4>
                              <p className="text-xs text-stone-secondary">{ex.prescription}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="text-[11px] font-mono text-stone-secondary hidden sm:inline-block">
                              {ex.tempo}
                            </span>
                            {isOpen ? (
                              <ChevronUp className="w-4 h-4 text-stone-secondary" />
                            ) : (
                              <ChevronDown className="w-4 h-4 text-stone-secondary" />
                            )}
                          </div>
                        </button>

                        {isOpen && (
                          <div className="p-4 pt-0 border-t border-stone-border/60 bg-surface-base/30 space-y-3">
                            <div className="pt-3 text-xs space-y-1.5">
                              <span className="font-semibold text-[10px] uppercase tracking-wider text-brand-burgundy block">
                                Technical Execution & Coaching Cue:
                              </span>
                              <p className="text-stone-secondary leading-relaxed">{ex.cue}</p>
                            </div>

                            <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px]">
                              <span className="text-stone-secondary font-medium">Target Muscle Groups:</span>
                              <span className="px-2 py-0.5 rounded bg-white border border-stone-border text-stone-primary text-[10px] font-medium">
                                {ex.target}
                              </span>
                              <span className="px-2 py-0.5 rounded bg-white border border-stone-border text-stone-primary text-[10px] font-medium">
                                Rest: {ex.rest}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {sampleRecipes.map((recipe, idx) => (
                  <Card key={idx} className="flex flex-col justify-between bg-white border-stone-border hover:shadow-tactile-lg transition-all">
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <Badge variant="terracotta" className="text-[10px]">
                          {recipe.tag}
                        </Badge>
                        <span className="text-xs text-stone-secondary flex items-center gap-1 font-mono">
                          <Clock className="w-3 h-3" />
                          {recipe.prepTime}
                        </span>
                      </div>

                      <div>
                        <h3 className="font-serif font-bold text-lg text-stone-primary">
                          {recipe.title}
                        </h3>
                        <p className="text-xs text-stone-secondary">{recipe.subtitle}</p>
                      </div>

                      {/* Macros Strip */}
                      <div className="grid grid-cols-4 gap-1 p-2.5 rounded-lg bg-surface-sunken border border-stone-border text-center text-xs">
                        <div>
                          <span className="font-bold text-stone-primary font-mono">{recipe.calories}</span>
                          <span className="block text-[9px] text-stone-secondary uppercase">kcal</span>
                        </div>
                        <div>
                          <span className="font-bold text-brand-burgundy font-mono">{recipe.protein}g</span>
                          <span className="block text-[9px] text-stone-secondary uppercase">Protein</span>
                        </div>
                        <div>
                          <span className="font-bold text-stone-primary font-mono">{recipe.carbs}g</span>
                          <span className="block text-[9px] text-stone-secondary uppercase">Carbs</span>
                        </div>
                        <div>
                          <span className="font-bold text-stone-primary font-mono">{recipe.fat}g</span>
                          <span className="block text-[9px] text-stone-secondary uppercase">Fat</span>
                        </div>
                      </div>

                      <p className="text-xs text-stone-secondary leading-relaxed">
                        {recipe.description}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-stone-border/80">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-secondary block mb-1.5">
                        Core Pantry Staples:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {recipe.staples.map((s, sIdx) => (
                          <span key={sIdx} className="text-[10px] px-2 py-0.5 rounded-full bg-surface-base border border-stone-border text-stone-secondary">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* The Philosophy & Core Pillars */}
        <section id="philosophy" className="py-20 bg-surface-base border-b border-stone-border">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-burgundy">
                The Core Methodology
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-stone-primary">
                Built on Physiological Principles. <br />
                Not Influencer Fads.
              </h2>
              <p className="text-stone-secondary text-base">
                Most programs fail because they demand unsustainable asceticism. The Method couples progressive neuromuscular overload with culinary mastery.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-white border-stone-border space-y-4">
                <div className="w-12 h-12 rounded-xl bg-brand-burgundy/10 text-brand-burgundy flex items-center justify-center">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-stone-primary">
                  1. Periodized Overload
                </h3>
                <p className="text-xs sm:text-sm text-stone-secondary leading-relaxed">
                  No arbitrary daily randomizer. Structured 4-week blocks systematically increase intensity and volume while giving joints and connective tissue deliberate recovery windows.
                </p>
              </Card>

              <Card className="bg-white border-stone-border space-y-4">
                <div className="w-12 h-12 rounded-xl bg-brand-terracotta/10 text-brand-terracotta flex items-center justify-center">
                  <Utensils className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-stone-primary">
                  2. High-Protein Kitchen
                </h3>
                <p className="text-xs sm:text-sm text-stone-secondary leading-relaxed">
                  Real culinary technique applied to fitness macros. Every meal delivers 40g–60g of bioavailable protein with sauces, aromatics, and whole carbs that make compliance effortless.
                </p>
              </Card>

              <Card className="bg-white border-stone-border space-y-4">
                <div className="w-12 h-12 rounded-xl bg-state-success/10 text-state-success flex items-center justify-center">
                  <Smartphone className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-stone-primary">
                  3. Zero Digital Friction
                </h3>
                <p className="text-xs sm:text-sm text-stone-secondary leading-relaxed">
                  No password resets, no bloated app store downloads, and no clunky spreadsheets. A lightning-fast mobile web app with instant magic-link sign-in on any device.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Member Transformations / Social Proof */}
        <section className="py-20 bg-surface-raised border-b border-stone-border">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto space-y-2 mb-14">
              <Badge variant="terracotta">Member Outcomes</Badge>
              <h2 className="font-serif text-3xl sm:text-4xl text-stone-primary">
                Real Strength. Sustainable Composition.
              </h2>
              <p className="text-stone-secondary text-sm">
                Feedback from members who completed The Method protocols.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-white border-stone-border space-y-4">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-stone-secondary leading-relaxed italic">
                  "Dropped 9kg body fat over 12 weeks without feeling starved once. The recipes taste like real restaurant food, and my squat numbers went up 25kg."
                </p>
                <div className="pt-2 border-t border-stone-border/60">
                  <span className="font-bold text-xs text-stone-primary block">Tunde A.</span>
                  <span className="text-[10px] text-stone-secondary">Lagos • Completed 12-Week Protocol</span>
                </div>
              </Card>

              <Card className="bg-white border-stone-border space-y-4">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-stone-secondary leading-relaxed italic">
                  "The video cues completely eliminated my lower back soreness on deadlifts. Having everything on my phone with zero password nonsense is unmatched."
                </p>
                <div className="pt-2 border-t border-stone-border/60">
                  <span className="font-bold text-xs text-stone-primary block">Chioma N.</span>
                  <span className="text-[10px] text-stone-secondary">Abuja • Method Bundle Member</span>
                </div>
              </Card>

              <Card className="bg-white border-stone-border space-y-4">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-stone-secondary leading-relaxed italic">
                  "I travel constantly for work between London and Nigeria. Being able to pull up 45-minute focused sessions and swap ingredients in seconds keeps me on track."
                </p>
                <div className="pt-2 border-t border-stone-border/60">
                  <span className="font-bold text-xs text-stone-primary block">David K.</span>
                  <span className="text-[10px] text-stone-secondary">London / Lagos • Training Protocol Member</span>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Pricing / Offerings Section */}
        <section id="pricing" className="py-24 bg-surface-base">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
              <Badge variant="terracotta">Transparent Access</Badge>
              <h2 className="font-serif text-3xl sm:text-4xl text-stone-primary">
                Select Your Access Level
              </h2>
              <p className="text-stone-secondary text-sm sm:text-base">
                Single upfront purchase. Lifetime access. Zero recurring surprises.
              </p>

              {/* Currency Selector */}
              <div className="pt-2 flex items-center justify-center gap-2">
                <span className="text-xs text-stone-secondary font-medium">Select Currency:</span>
                <div className="inline-flex p-1 rounded-xl bg-surface-sunken border border-stone-border">
                  <button
                    type="button"
                    onClick={() => setCurrency('NGN')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      currency === 'NGN'
                        ? 'bg-brand-burgundy text-white shadow-sm'
                        : 'text-stone-secondary hover:text-stone-primary'
                    }`}
                  >
                    🇳🇬 NGN (₦)
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrency('USD')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      currency === 'USD'
                        ? 'bg-brand-burgundy text-white shadow-sm'
                        : 'text-stone-secondary hover:text-stone-primary'
                    }`}
                  >
                    🌐 USD ($)
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
              {/* 1. Training Only */}
              <Card className="flex flex-col justify-between border-stone-border bg-white shadow-sm">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-serif text-2xl text-stone-primary">
                      {PRODUCTS.training.name}
                    </h3>
                    <p className="text-xs text-stone-secondary mt-1 min-h-[32px]">
                      {PRODUCTS.training.headline}
                    </p>
                  </div>

                  <div className="flex items-baseline gap-1">
                    <span className="font-serif text-4xl font-bold text-stone-primary">
                      {formatPrice('training')}
                    </span>
                    <span className="text-xs text-stone-secondary uppercase">/ one-time access</span>
                  </div>

                  <div className="pt-4 border-t border-stone-border space-y-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-stone-secondary block">
                      Included with Training:
                    </span>
                    {PRODUCTS.training.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-stone-primary">
                        <Check className="w-4 h-4 text-brand-burgundy shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8 space-y-3">
                  <Button
                    variant="outline"
                    className="w-full"
                    isLoading={loadingSlug === 'training'}
                    onClick={() => handleCheckout('training')}
                  >
                    Purchase Training Only
                  </Button>
                  <span className="block text-center text-[10px] text-stone-secondary">
                    Paystack Verified • Cards & Bank Transfer
                  </span>
                </div>
              </Card>

              {/* 2. Complete Bundle (Featured) */}
              <Card className="flex flex-col justify-between border-2 border-brand-burgundy bg-white relative shadow-tactile-lg lg:-translate-y-2">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="bg-brand-burgundy text-white text-[11px] font-bold uppercase tracking-widest py-1 px-3.5 rounded-full shadow-sm">
                    {PRODUCTS.bundle.badge}
                  </span>
                </div>

                <div className="space-y-6 pt-2">
                  <div>
                    <h3 className="font-serif text-2xl text-stone-primary">
                      {PRODUCTS.bundle.name}
                    </h3>
                    <p className="text-xs text-stone-secondary mt-1 min-h-[32px]">
                      {PRODUCTS.bundle.headline}
                    </p>
                  </div>

                  <div className="flex items-baseline gap-1">
                    <span className="font-serif text-4xl font-bold text-brand-burgundy">
                      {formatPrice('bundle')}
                    </span>
                    <span className="text-xs text-stone-secondary uppercase">/ one-time full access</span>
                  </div>

                  <div className="pt-4 border-t border-stone-border space-y-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-brand-burgundy block">
                      Complete Method Entitlements:
                    </span>
                    {PRODUCTS.bundle.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-stone-primary font-medium">
                        <Check className="w-4 h-4 text-brand-burgundy shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8 space-y-3">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full shadow-md"
                    isLoading={loadingSlug === 'bundle'}
                    onClick={() => handleCheckout('bundle')}
                  >
                    Get The Complete Bundle
                  </Button>
                  <span className="block text-center text-[10px] text-stone-secondary">
                    Instant Activation • Save ₦15,000 / $19
                  </span>
                </div>
              </Card>

              {/* 3. Cookbook Only */}
              <Card className="flex flex-col justify-between border-stone-border bg-white shadow-sm">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-serif text-2xl text-stone-primary">
                      {PRODUCTS.cookbook.name}
                    </h3>
                    <p className="text-xs text-stone-secondary mt-1 min-h-[32px]">
                      {PRODUCTS.cookbook.headline}
                    </p>
                  </div>

                  <div className="flex items-baseline gap-1">
                    <span className="font-serif text-4xl font-bold text-stone-primary">
                      {formatPrice('cookbook')}
                    </span>
                    <span className="text-xs text-stone-secondary uppercase">/ one-time access</span>
                  </div>

                  <div className="pt-4 border-t border-stone-border space-y-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-stone-secondary block">
                      Included with Kitchen:
                    </span>
                    {PRODUCTS.cookbook.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-stone-primary">
                        <Check className="w-4 h-4 text-brand-terracotta shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8 space-y-3">
                  <Button
                    variant="outline"
                    className="w-full"
                    isLoading={loadingSlug === 'cookbook'}
                    onClick={() => handleCheckout('cookbook')}
                  >
                    Purchase Cookbook Only
                  </Button>
                  <span className="block text-center text-[10px] text-stone-secondary">
                    Paystack Verified • Cards & Bank Transfer
                  </span>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Accordion Section */}
        <section className="py-20 bg-surface-raised border-t border-stone-border">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="text-center space-y-2 mb-12">
              <Badge variant="burgundy">Got Questions?</Badge>
              <h2 className="font-serif text-3xl text-stone-primary">Frequently Asked Questions</h2>
              <p className="text-xs sm:text-sm text-stone-secondary">
                Everything you need to know about payments, access, and protocols.
              </p>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-xl border border-stone-border overflow-hidden transition-all shadow-sm"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full p-4 flex items-center justify-between text-left hover:bg-surface-base/50 transition-colors"
                    >
                      <span className="font-serif font-bold text-sm text-stone-primary pr-4">
                        {faq.q}
                      </span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-stone-secondary shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-stone-secondary shrink-0" />
                      )}
                    </button>

                    {isOpen && (
                      <div className="p-4 pt-0 text-xs text-stone-secondary leading-relaxed border-t border-stone-border/60 bg-surface-base/20">
                        <p className="pt-3">{faq.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-surface-sunken border-t border-stone-border py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-stone-secondary">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-stone-primary">THE METHOD</span>
            <span>— Creator Fitness & Nutrition Platform</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <Link href="/sign-in" className="hover:text-stone-primary">
              Member Sign In
            </Link>
            <a href="#pricing" className="hover:text-stone-primary">
              Access Options
            </a>
            <span>Protected by Magic-Link & Paystack Security</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
