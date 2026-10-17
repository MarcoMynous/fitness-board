import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, User } from 'lucide-react';
import { OnboardingState } from '../types';

interface StepWelcomeProps {
  state: OnboardingState;
  onChange: (fields: Partial<OnboardingState>) => void;
  onContinue: () => void;
}

export const StepWelcome: React.FC<StepWelcomeProps> = ({ state, onChange, onContinue }) => {
  const [touched, setTouched] = useState(false);

  const handleFullNameChange = (val: string) => {
    const trimmed = val;
    const autoFirst = trimmed.split(' ')[0] || '';
    onChange({
      fullName: trimmed,
      displayName: state.displayName && state.displayName !== autoFirst ? state.displayName : autoFirst,
    });
  };

  const handleNext = () => {
    setTouched(true);
    if (!state.fullName.trim() && !state.displayName.trim()) {
      return;
    }
    onContinue();
  };

  return (
    <div className="max-w-xl mx-auto text-center space-y-6 py-4">
      {/* Category Pill */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#cde5d7] text-[#0a1f17] text-[11px] font-bold uppercase tracking-wider mx-auto">
        <span className="w-1.5 h-1.5 rounded-full bg-[#4d6358]" />
        <span>Getting Started</span>
      </div>

      {/* Main Title & Subtitle */}
      <div className="space-y-2">
        <h2 className="font-serif text-[32px] sm:text-[40px] tracking-tight text-[#1d1b19] font-bold uppercase leading-tight">
          Welcome to Your Sanctuary
        </h2>
        <p className="text-[15px] text-[#56423d] max-w-md mx-auto leading-relaxed">
          Let&apos;s personalize your training roadmap and nutrition protocol with Coach Tolu.
        </p>
      </div>

      {/* Name Input Card */}
      <div className="bg-[#F2EDE4] p-5 sm:p-6 rounded-2xl shadow-xs border border-[#E4DDD3]/90 text-left space-y-4 max-w-md mx-auto">
        <div className="space-y-1">
          <label
            htmlFor="input-fullname"
            className="text-[12px] font-bold text-[#1d1b19] uppercase tracking-wider flex items-center gap-1.5"
          >
            <User className="w-3.5 h-3.5 text-[#9a4023]" />
            <span>What is your full name?</span>
          </label>
          <input
            id="input-fullname"
            type="text"
            value={state.fullName}
            onChange={(e) => handleFullNameChange(e.target.value)}
            placeholder="e.g. Chioma Okafor"
            className={`w-full h-12 bg-white text-[#1d1b19] font-medium text-[15px] px-4 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#9a4023] shadow-inner border ${
              touched && !state.fullName.trim() ? 'border-red-400' : 'border-[#E4DDD3]'
            }`}
          />
          {touched && !state.fullName.trim() && (
            <p className="text-[11px] text-red-600">Please enter your name so we can address you correctly.</p>
          )}
        </div>

        <div className="space-y-1">
          <label
            htmlFor="input-displayname"
            className="text-[12px] font-bold text-[#1d1b19] uppercase tracking-wider"
          >
            What should Coach Tolu call you?
          </label>
          <input
            id="input-displayname"
            type="text"
            value={state.displayName}
            onChange={(e) => onChange({ displayName: e.target.value })}
            placeholder="e.g. Chioma"
            className="w-full h-12 bg-white text-[#1d1b19] font-medium text-[15px] px-4 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#9a4023] shadow-inner border border-[#E4DDD3]"
          />
          <p className="text-[11px] text-[#786b66]">
            This name will be displayed across your private dashboard, workouts, and coach feedback.
          </p>
        </div>
      </div>

      {/* Ambient Creator Editorial Graphic */}
      <div className="relative w-full max-w-md mx-auto h-44 rounded-2xl overflow-hidden bg-[#ede7e3] shadow-md flex items-center justify-center">
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
            <p className="font-serif text-[16px] font-semibold leading-tight text-[#FAF7F2]">
              {state.displayName ? `Welcome, ${state.displayName}` : 'Tailored to your body & rhythm'}
            </p>
          </div>
          <span className="px-2.5 py-1 rounded-md bg-white/20 backdrop-blur-md text-[10px] font-bold tracking-wider uppercase text-white border border-white/20">
            Private Plan
          </span>
        </div>
      </div>

      {/* Primary Action Button & Reassurance */}
      <div className="space-y-4 pt-1 max-w-md mx-auto">
        <button
          type="button"
          onClick={handleNext}
          className="w-full h-14 py-3.5 px-8 rounded-xl inline-flex items-center justify-center gap-2 bg-[#9a4023] hover:bg-[#A84C2F] text-white font-bold text-[14px] tracking-wide transition-all active:scale-[0.99] shadow-sm cursor-pointer"
        >
          <span>CONTINUE</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <p className="text-[12px] text-[#786b66] flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-[#4d6358] shrink-0" />
          <span>Takes about 1 minute. Responses strictly confidential.</span>
        </p>
      </div>
    </div>
  );
};
