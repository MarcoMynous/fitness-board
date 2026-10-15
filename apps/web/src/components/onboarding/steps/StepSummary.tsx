import React from 'react';
import { Sparkles, Dumbbell, ArrowRight, Loader2 } from 'lucide-react';
import { OnboardingState } from '../types';

interface StepSummaryProps {
  state: OnboardingState;
  isSubmitting: boolean;
  onGoToDashboard: () => void;
}

export const StepSummary: React.FC<StepSummaryProps> = ({
  state,
  isSubmitting,
  onGoToDashboard,
}) => {
  return (
    <div className="max-w-xl mx-auto text-center space-y-7 py-3">
      {/* Top Celebration Badge */}
      <div className="w-16 h-16 rounded-full bg-[#cde5d7] text-[#0a1f17] flex items-center justify-center mx-auto shadow-xs">
        <Sparkles className="w-8 h-8 text-[#4d6358]" />
      </div>

      <div className="space-y-2">
        <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#9a4023] block">
          Program Configured
        </span>
        <h2 className="font-serif text-[32px] sm:text-[40px] font-bold tracking-tight text-[#1d1b19] uppercase leading-tight">
          You&apos;re all set ✨
        </h2>
        <p className="text-[15px] text-[#56423d] max-w-md mx-auto leading-relaxed">
          Your personal transformation roadmap has been generated and synchronized with Coach Tolu.
        </p>
      </div>

      {/* Personalized Summary Bento Pills (2x2 Grid) */}
      <div className="grid grid-cols-2 gap-3 text-left">
        <div className="bg-[#F2EDE4] p-4 rounded-2xl shadow-xs border border-[#E4DDD3]/80">
          <span className="text-[11px] text-[#786b66] uppercase tracking-wider font-bold block">
            Target Goal
          </span>
          <span className="font-serif text-[15px] font-bold text-[#1d1b19] block mt-1 truncate">
            {state.goal}
          </span>
        </div>

        <div className="bg-[#F2EDE4] p-4 rounded-2xl shadow-xs border border-[#E4DDD3]/80">
          <span className="text-[11px] text-[#786b66] uppercase tracking-wider font-bold block">
            Baseline Weight
          </span>
          <span className="font-serif text-[15px] font-bold text-[#1d1b19] block mt-1">
            {state.weight || '72.0'} kg
          </span>
        </div>

        <div className="bg-[#F2EDE4] p-4 rounded-2xl shadow-xs border border-[#E4DDD3]/80">
          <span className="text-[11px] text-[#786b66] uppercase tracking-wider font-bold block">
            Experience Level
          </span>
          <span className="font-serif text-[15px] font-bold text-[#1d1b19] block mt-1 truncate">
            {state.experience}
          </span>
        </div>

        <div className="bg-[#F2EDE4] p-4 rounded-2xl shadow-xs border border-[#E4DDD3]/80">
          <span className="text-[11px] text-[#786b66] uppercase tracking-wider font-bold block">
            Weekly Frequency
          </span>
          <span className="font-serif text-[15px] font-bold text-[#1d1b19] block mt-1 truncate">
            {state.frequency} / {state.location}
          </span>
        </div>
      </div>

      {/* Coach Note Tray */}
      <div className="p-4 bg-[#cde5d7]/50 rounded-2xl flex items-center gap-4 text-left border border-[#cde5d7]">
        <div className="w-10 h-10 rounded-full bg-[#4d6358] text-white flex items-center justify-center shrink-0 shadow-xs">
          <Dumbbell className="w-5 h-5" />
        </div>
        <p className="text-[13px] text-[#0a1f17] leading-relaxed">
          <strong className="font-semibold block text-[#0a1f17]">
            Week 1 Plan Unlocked:
          </strong>{' '}
          Foundation conditioning and core alignment routines ready to begin tomorrow.
        </p>
      </div>

      {/* Submit / Enter Dashboard CTA */}
      <div className="pt-2">
        <button
          type="button"
          onClick={onGoToDashboard}
          disabled={isSubmitting}
          className="w-full h-14 px-8 rounded-xl inline-flex items-center justify-center gap-2 bg-[#9a4023] hover:bg-[#A84C2F] text-white font-bold text-[14px] tracking-wide transition-all active:scale-[0.99] shadow-sm cursor-pointer disabled:opacity-75"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>SYNCHRONIZING YOUR SANCTUARY...</span>
            </>
          ) : (
            <>
              <span>GO TO MY DASHBOARD</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
