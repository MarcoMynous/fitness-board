'use client';

import React from 'react';
import { Lock, Check, ShieldCheck } from 'lucide-react';

interface PricingEnrollmentSectionProps {
  currency: 'NGN' | 'USD';
  setCurrency: (c: 'NGN' | 'USD') => void;
  onCheckout: () => void;
  isLoading: boolean;
}

export function PricingEnrollmentSection({
  currency,
  setCurrency,
  onCheckout,
  isLoading,
}: PricingEnrollmentSectionProps) {
  const priceDisplay = currency === 'NGN' ? '₦35,000' : '$39';
  const originalPrice = currency === 'NGN' ? '₦55,000' : '$59';

  return (
    <section id="pricing" className="w-full bg-surface-cream py-space-xl lg:py-space-2xl border-t border-border-subtle">
      <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="bg-canvas-cream rounded-3xl shadow-xl overflow-hidden p-space-lg sm:p-space-xl md:p-space-2xl space-y-space-lg text-center relative border border-border-subtle">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-secondary-container text-on-secondary-container text-[11px] font-bold uppercase tracking-wider">
            <Lock className="w-3.5 h-3.5" />
            <span>LIMITED ENROLLMENT • FULL LIFETIME ACCESS</span>
          </div>

          {/* Heading */}
          <div className="space-y-space-xs">
            <h2 className="font-serif text-[32px] sm:text-[44px] lg:text-[50px] text-deep-charcoal font-bold leading-tight">
              THE DETTY DECEMBER BODY PROGRAM
            </h2>
            <p className="text-[15px] sm:text-[17px] text-muted-charcoal max-w-xl mx-auto leading-relaxed">
              Start today, build your momentum, and step into the holiday season at peak vitality.
            </p>
          </div>

          {/* Currency Switcher */}
          <div className="flex items-center justify-center gap-2">
            <span className="text-[12px] text-muted-charcoal font-medium">Select Currency:</span>
            <div className="inline-flex p-1 rounded-xl bg-surface-cream border border-border-subtle text-xs font-bold">
              <button
                type="button"
                onClick={() => setCurrency('NGN')}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  currency === 'NGN'
                    ? 'bg-primary text-on-primary shadow-xs'
                    : 'text-muted-charcoal hover:text-deep-charcoal'
                }`}
              >
                🇳🇬 NGN (₦)
              </button>
              <button
                type="button"
                onClick={() => setCurrency('USD')}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  currency === 'USD'
                    ? 'bg-primary text-on-primary shadow-xs'
                    : 'text-muted-charcoal hover:text-deep-charcoal'
                }`}
              >
                🌐 USD ($)
              </button>
            </div>
          </div>

          {/* Pricing Tag */}
          <div className="flex items-baseline justify-center gap-space-sm pt-space-xs">
            <span className="font-serif text-[42px] sm:text-[54px] text-primary font-bold">
              {priceDisplay}
            </span>
            <span className="font-serif text-[20px] sm:text-[24px] text-muted-charcoal/50 line-through">
              {originalPrice}
            </span>
            <span className="text-[11px] font-bold text-muted-charcoal uppercase tracking-wider">
              ONE-TIME PAYMENT
            </span>
          </div>

          {/* Detailed Inclusion List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-space-xl gap-y-space-xs text-left max-w-xl mx-auto py-space-md border-y border-border-subtle/80">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-primary shrink-0" />
              <span className="text-[14px] text-deep-charcoal">Complete 8-Week Blueprint</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-primary shrink-0" />
              <span className="text-[14px] text-deep-charcoal">Full Video Exercise Library</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-primary shrink-0" />
              <span className="text-[14px] text-deep-charcoal">40+ Nigerian Recipe Cookbook</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-primary shrink-0" />
              <span className="text-[14px] text-deep-charcoal">Private Interactive Dashboard</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-primary shrink-0" />
              <span className="text-[14px] text-deep-charcoal">Measurement &amp; Metric Trackers</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-primary shrink-0" />
              <span className="text-[14px] text-deep-charcoal">Instant Lifetime Access</span>
            </div>
          </div>

          {/* Big CTA Button */}
          <div className="space-y-space-sm pt-space-xs">
            <button
              type="button"
              onClick={onCheckout}
              disabled={isLoading}
              className="w-full max-w-md mx-auto h-[56px] rounded-xl bg-primary text-on-primary font-bold text-[14px] tracking-wider uppercase flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(154,64,35,0.3)] hover:bg-terracotta-hover transition-all active:scale-[0.99] cursor-pointer"
            >
              <span>{isLoading ? 'INITIALIZING CHECKOUT...' : 'GET INSTANT ACCESS 🔒'}</span>
            </button>
            <p className="text-[12px] text-muted-charcoal font-medium">
              Paystack Verified • Debit / Credit Card • Bank Transfer • USSD
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
