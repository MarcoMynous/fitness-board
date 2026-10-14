'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PRODUCTS, ProductSlug } from '@repo/domain';
import { Button, Badge, Card } from '@repo/ui';
import { Check, ArrowRight, ShieldCheck, Flame, Utensils, Dumbbell, Sparkles } from 'lucide-react';

export default function LandingPage() {
  const [loadingSlug, setLoadingSlug] = useState<ProductSlug | null>(null);

  const handleCheckout = async (slug: ProductSlug) => {
    try {
      setLoadingSlug(slug);
      const res = await fetch('/api/checkout/create-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productSlug: slug }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else if (data.simulatedUrl) {
        window.location.href = data.simulatedUrl;
      }
    } catch (err) {
      console.error('Checkout error:', err);
      alert('Could not start checkout. Please try again.');
    } finally {
      setLoadingSlug(null);
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 bg-surface-base/90 backdrop-blur-md border-b border-stone-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="w-8 h-8 rounded-lg bg-brand-burgundy text-white flex items-center justify-center font-bold text-sm tracking-wider font-serif">
              M
            </span>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-base tracking-tight text-stone-primary">
                THE METHOD
              </span>
              <span className="text-[10px] tracking-widest uppercase text-stone-secondary font-medium">
                Creator Fitness & Nutrition
              </span>
            </div>
          </Link>

          <nav className="flex items-center gap-4">
            <Link
              href="#pricing"
              className="text-sm font-medium text-stone-secondary hover:text-stone-primary transition-colors hidden sm:inline-block"
            >
              Programs & Access
            </Link>
            <Link href="/sign-in">
              <Button variant="outline" size="sm">
                Member Sign In
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden border-b border-stone-border">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-6">
                <Badge variant="burgundy" className="inline-flex items-center gap-1.5 py-1 px-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  Creator-Led Training & Culinary Protocol
                </Badge>

                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.1] text-stone-primary">
                  Train with Intention. <br />
                  <span className="italic font-serif text-brand-burgundy font-medium">
                    Fuel with Precision.
                  </span>
                </h1>

                <p className="text-lg sm:text-xl text-stone-secondary max-w-xl font-normal leading-relaxed">
                  A high-touch, mobile-first training architecture paired with chef-crafted, high-protein
                  nutrition. Built for individuals who demand physical performance without obsessive noise.
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
                  <a href="#pricing">
                    <Button size="lg" className="w-full sm:w-auto shadow-tactile-lg">
                      Explore Access Options
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </a>
                  <Link href="/sign-in">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto">
                      Already a Member? Sign In
                    </Button>
                  </Link>
                </div>

                <div className="pt-6 flex items-center gap-6 text-xs text-stone-secondary border-t border-stone-border/80">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-brand-burgundy" />
                    <span>Instant Magic-Link Access</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-brand-terracotta" />
                    <span>One-Time Payment</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-brand-burgundy" />
                    <span>Mobile Optimized</span>
                  </div>
                </div>
              </div>

              {/* Hero Visual Card */}
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
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <span className="text-xs uppercase tracking-widest font-semibold text-brand-terracotta bg-white/90 px-2 py-0.5 rounded">
                          Phase 1 Protocol
                        </span>
                        <h2 className="font-serif text-xl font-bold mt-1">
                          Foundations of Kinetic Power
                        </h2>
                      </div>
                    </div>

                    <div className="p-5 space-y-4">
                      <div className="flex justify-between items-center text-xs text-stone-secondary">
                        <span>12-Week Progressive Protocol</span>
                        <span className="font-semibold text-brand-burgundy">60+ Nutritional Blueprints</span>
                      </div>
                      <p className="text-sm text-stone-secondary leading-normal">
                        Every exercise is accompanied by intentional cueing, tempo instructions, and equipment
                        adaptations.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Two Pillars Breakdown */}
        <section className="py-20 bg-surface-raised border-b border-stone-border">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-terracotta">
                Two Integrated Disciplines
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-stone-primary">
                A Unified Physical Standard
              </h2>
              <p className="text-stone-secondary text-base">
                Physical capability is forged in the gym and solidified in the kitchen. We treat both with equal rigor.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Training Pillar */}
              <Card className="flex flex-col justify-between hover:shadow-tactile-lg transition-shadow">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-burgundy/10 text-brand-burgundy flex items-center justify-center">
                    <Dumbbell className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-2xl text-stone-primary">The Training Protocol</h3>
                  <p className="text-stone-secondary text-sm leading-relaxed">
                    Designed around athletic hypertrophy, joint health, and structural power. 
                    Interactive session cards let you track your progress, log completions, and adhere to intentional movement cadences.
                  </p>
                  <ul className="space-y-2.5 pt-2 text-sm text-stone-primary">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-brand-burgundy shrink-0" />
                      <span>12-week phased progressive overload plan</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-brand-burgundy shrink-0" />
                      <span>Clear video demonstrations & cueing breakdowns</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-brand-burgundy shrink-0" />
                      <span>Session completion tracking & streak logging</span>
                    </li>
                  </ul>
                </div>
              </Card>

              {/* Nutrition Pillar */}
              <Card className="flex flex-col justify-between hover:shadow-tactile-lg transition-shadow">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-terracotta/10 text-brand-terracotta flex items-center justify-center">
                    <Utensils className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-2xl text-stone-primary">High-Performance Kitchen</h3>
                  <p className="text-stone-secondary text-sm leading-relaxed">
                    Over 60+ chef-crafted, high-protein recipes built with whole foods and zero compromises on taste. 
                    Exact macro breakdowns and category filters for effortless dietary adherence.
                  </p>
                  <ul className="space-y-2.5 pt-2 text-sm text-stone-primary">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-brand-terracotta shrink-0" />
                      <span>Calibrated macros: Protein, Carbs, Fats, and Calories</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-brand-terracotta shrink-0" />
                      <span>Gluten-free, dairy-free, and quick prep filters</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-brand-terracotta shrink-0" />
                      <span>Save and bookmark favorites to your personal book</span>
                    </li>
                  </ul>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Pricing / Offerings Section */}
        <section id="pricing" className="py-24 bg-surface-base">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
              <Badge variant="terracotta">Transparent Access</Badge>
              <h2 className="font-serif text-3xl sm:text-4xl text-stone-primary">
                Select Your Access Level
              </h2>
              <p className="text-stone-secondary text-base">
                Single upfront purchase. No hidden recurring traps. Lifetime access to your selected tier.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
              {/* 1. Training Only */}
              <Card className="flex flex-col justify-between border-stone-border bg-white">
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
                      ${(PRODUCTS.training.priceInCents / 100).toFixed(0)}
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

                <div className="pt-8">
                  <Button
                    variant="outline"
                    className="w-full"
                    isLoading={loadingSlug === 'training'}
                    onClick={() => handleCheckout('training')}
                  >
                    Purchase Training Only
                  </Button>
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
                      ${(PRODUCTS.bundle.priceInCents / 100).toFixed(0)}
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

                <div className="pt-8">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full shadow-md"
                    isLoading={loadingSlug === 'bundle'}
                    onClick={() => handleCheckout('bundle')}
                  >
                    Get The Complete Bundle
                  </Button>
                </div>
              </Card>

              {/* 3. Cookbook Only */}
              <Card className="flex flex-col justify-between border-stone-border bg-white">
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
                      ${(PRODUCTS.cookbook.priceInCents / 100).toFixed(0)}
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

                <div className="pt-8">
                  <Button
                    variant="outline"
                    className="w-full"
                    isLoading={loadingSlug === 'cookbook'}
                    onClick={() => handleCheckout('cookbook')}
                  >
                    Purchase Cookbook Only
                  </Button>
                </div>
              </Card>
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

          <div className="flex items-center gap-6">
            <Link href="/sign-in" className="hover:text-stone-primary">
              Member Sign In
            </Link>
            <a href="#pricing" className="hover:text-stone-primary">
              Access Options
            </a>
            <span>Protected by Magic-Link Security</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
