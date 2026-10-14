'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRight, Lock } from 'lucide-react';

interface MobileStickyCtaProps {
  currency: 'NGN' | 'USD';
  onCheckout: () => void;
  isLoading: boolean;
}

export function MobileStickyCta({ currency, onCheckout, isLoading }: MobileStickyCtaProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 380) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  const priceFormatted = currency === 'NGN' ? '₦35,000' : '$39';

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-3 bg-canvas-cream/95 backdrop-blur-md border-t border-border-subtle shadow-[0_-4px_20px_rgba(28,26,24,0.08)] md:hidden">
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-primary uppercase tracking-wider">
            LIFETIME ACCESS
          </span>
          <div className="flex items-baseline gap-1">
            <span className="font-serif font-bold text-[18px] text-deep-charcoal">
              {priceFormatted}
            </span>
            <span className="text-[10px] text-muted-charcoal line-through">
              {currency === 'NGN' ? '₦55,000' : '$59'}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={onCheckout}
          disabled={isLoading}
          className="flex-1 h-[46px] rounded-xl bg-primary text-on-primary font-bold text-[12px] tracking-wider uppercase flex items-center justify-center gap-1.5 shadow-md active:scale-98 cursor-pointer"
        >
          <span>{isLoading ? '...' : 'JOIN NOW'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
