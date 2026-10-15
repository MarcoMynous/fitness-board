import React from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { OnboardingState } from '../types';

interface StepWelcomeProps {
  state: OnboardingState;
  onContinue: () => void;
}

export const StepWelcome: React.FC<StepWelcomeProps> = ({ state, onContinue }) => {
  return (
    <div className="max-w-xl mx-auto text-center space-y-8 py-4">
      {/* Category Pill */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#cde5d7] text-[#0a1f17] text-[11px] font-bold uppercase tracking-wider mx-auto">
        <span className="w-1.5 h-1.5 rounded-full bg-[#4d6358]" />
        <span>Getting Started</span>
      </div>

      {/* Main Title & Subtitle */}
      <div className="space-y-3">
        <h2 className="font-serif text-[36px] sm:text-[44px] tracking-tight text-[#1d1b19] font-bold uppercase leading-tight">
          Welcome, {state.displayName || 'Amaka'} 👋🏽
        </h2>
        <p className="text-[16px] text-[#56423d] max-w-md mx-auto leading-relaxed">
          Let&apos;s personalize your training roadmap with Coach Tolu.
        </p>
      </div>

      {/* Ambient Creator Editorial Graphic */}
      <div className="relative w-full max-w-md mx-auto h-56 rounded-2xl overflow-hidden bg-[#ede7e3] shadow-md flex items-center justify-center">
        <img
          alt="Coach Tolu in Lagos Studio"
          className="absolute inset-0 w-full h-full object-cover object-top filter brightness-95"
          src="/images/coach-tolu-editorial.jpg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1A18]/85 via-[#1C1A18]/30 to-transparent" />

        <div className="absolute bottom-4 left-4 right-4 text-left flex items-end justify-between text-white">
          <div>
            <p className="text-[10px] font-bold uppercase text-[#ffb59e] tracking-widest">
              Lagos Transformation Series
            </p>
            <p className="font-serif text-[18px] font-semibold leading-tight text-[#FAF7F2]">
              Tailored to your body &amp; rhythm
            </p>
          </div>
          <span className="px-2.5 py-1 rounded-md bg-white/20 backdrop-blur-md text-[10px] font-bold tracking-wider uppercase text-white border border-white/20">
            Private Plan
          </span>
        </div>
      </div>

      {/* Primary Action Button & Reassurance */}
      <div className="space-y-4 pt-2 max-w-md mx-auto">
        <button
          type="button"
          onClick={onContinue}
          className="w-full h-14 py-3.5 px-8 rounded-xl inline-flex items-center justify-center gap-2 bg-[#9a4023] hover:bg-[#A84C2F] text-white font-bold text-[14px] tracking-wide transition-all active:scale-[0.99] shadow-sm cursor-pointer"
        >
          <span>LET&apos;S GO</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <p className="text-[12px] text-[#786b66] flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-[#4d6358] shrink-0" />
          <span>This takes about 1 minute. Responses strictly confidential.</span>
        </p>
      </div>
    </div>
  );
};
