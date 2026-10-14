'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';

interface FinalCtaSectionProps {
  onCheckout: () => void;
  isLoading: boolean;
}

export function FinalCtaSection({ onCheckout, isLoading }: FinalCtaSectionProps) {
  return (
    <section className="w-full max-w-[1280px] mx-auto px-margin md:px-margin-desktop py-space-xl lg:py-space-2xl">
      <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl bg-deep-charcoal text-on-primary border border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
          {/* Text Left (7 cols) */}
          <div className="lg:col-span-7 p-space-lg sm:p-space-xl md:p-space-2xl flex flex-col space-y-space-md z-10">
            <span className="text-[11px] font-bold text-primary-fixed-dim tracking-widest uppercase font-sans">
              YOUR MOMENT
            </span>
            <h2 className="font-serif text-[32px] sm:text-[44px] lg:text-[52px] text-surface-container-lowest leading-[1.1] font-bold">
              DECEMBER IS COMING EITHER WAY.<br />
              <span className="text-primary-fixed-dim italic font-normal">
                YOU DECIDE HOW YOU SHOW UP.
              </span>
            </h2>
            <p className="text-[16px] sm:text-[18px] text-surface-dim max-w-lg leading-relaxed">
              Step into every room feeling proud, energetic, and fully in command of your strength.
            </p>
            <div className="pt-space-xs">
              <button
                type="button"
                onClick={onCheckout}
                disabled={isLoading}
                className="inline-flex items-center justify-center gap-space-sm h-[54px] px-space-xl rounded-xl bg-primary text-on-primary text-[14px] font-bold tracking-wider uppercase hover:bg-terracotta-hover transition-colors shadow-lg active:scale-98 cursor-pointer"
              >
                <span>{isLoading ? 'INITIALIZING...' : 'START MY TRANSFORMATION'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Image Right (5 cols) */}
          <div className="lg:col-span-5 h-full min-h-[340px] relative">
            <img
              alt="Confident smiling trainer standing tall in natural light"
              className="w-full h-full object-cover object-top opacity-90"
              src="https://lh3.googleusercontent.com/aida/AEtjO1VVTbNtduNSAJjTrtQIgXo4oELskgJRHbvma9kXDKEighjBj7knZ_IuK9qKFtTxPA78aaqnWkp9TcFonlx0tfL_lW6ZmH3ccbiISjy4JHpf4nmrb9xY8lcL_4ffipdmeJy_4GZrbdbNHcps6kSLriD3fBMg6bHZm4puR7uYxDIg0Bf496oQ24xyDqKETGXbcc-YoSuDcB0Rq3apdL4AeFhOeoUaDOh07TO4j8RdRYI5Y9CW4Qv3Eol4Bgk"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
