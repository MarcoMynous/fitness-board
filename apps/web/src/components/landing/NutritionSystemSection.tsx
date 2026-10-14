'use client';

import React from 'react';
import { Utensils, Sparkles, Check, Flame } from 'lucide-react';

export function NutritionSystemSection() {
  return (
    <section className="w-full max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-space-xl lg:py-space-2xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-center">
        {/* Left Image Showcase (6 cols) */}
        <div className="lg:col-span-6 relative">
          <div className="w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl bg-surface-cream relative border border-border-subtle">
            <img
              alt="Vibrant chicken jollof bowl with fried plantains, avocado, and fresh greens"
              className="w-full h-full object-cover hover:scale-102 transition-transform duration-700"
              src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=85"
            />
            <div className="absolute bottom-4 right-4 bg-deep-charcoal/90 backdrop-blur-md px-4 py-2 rounded-xl text-on-primary border border-white/10 shadow-lg">
              <span className="text-[11px] tracking-wider uppercase font-bold text-primary-fixed-dim">
                High-Protein Jollof • 48g Protein
              </span>
            </div>
          </div>
        </div>

        {/* Right Cookbook Content (6 cols) */}
        <div className="lg:col-span-6 flex flex-col space-y-space-md mt-6 lg:mt-0">
          <div>
            <span className="font-serif text-[32px] sm:text-[40px] text-primary/40 font-bold block leading-none">
              02
            </span>
            <span className="text-[11px] font-bold text-primary tracking-widest uppercase font-sans mt-1 block">
              NUTRITION SYSTEM
            </span>
            <h2 className="font-serif text-[32px] sm:text-[40px] text-deep-charcoal font-bold mt-1">
              EAT LIKE A NORMAL HUMAN.
            </h2>
          </div>

          <p className="text-[16px] sm:text-[18px] text-muted-charcoal leading-relaxed">
            Simple meals. Real Nigerian ingredients. Absolutely zero cold, joyless diet food.
          </p>

          {/* Quote Box */}
          <div className="p-space-md bg-surface-cream rounded-2xl border border-border-subtle shadow-xs">
            <p className="font-serif text-[18px] sm:text-[20px] italic text-primary font-medium">
              &ldquo;Yes, you can still eat rice and plantain 😭✨&rdquo;
            </p>
          </div>

          {/* 2 Stat Boxes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md pt-space-xs">
            <div className="bg-surface-cream p-space-md rounded-2xl space-y-space-xs border border-border-subtle shadow-xs">
              <h4 className="font-serif font-bold text-[18px] text-deep-charcoal">
                40+ Recipes
              </h4>
              <p className="text-[13px] text-muted-charcoal leading-relaxed">
                Suya wraps, Jollof bowls, Egusi swap adaptations &amp; high-protein smoothies tailored to Lagos pantries.
              </p>
            </div>

            <div className="bg-surface-cream p-space-md rounded-2xl space-y-space-xs border border-border-subtle shadow-xs">
              <h4 className="font-serif font-bold text-[18px] text-deep-charcoal">
                Step-by-Step Prep
              </h4>
              <p className="text-[13px] text-muted-charcoal leading-relaxed">
                Simple local market and supermarket ingredients with exact macro breakdown and prep guides.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
