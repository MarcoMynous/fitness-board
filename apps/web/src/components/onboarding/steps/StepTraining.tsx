import React from 'react';
import { Building2, Home, Repeat, CheckCircle } from 'lucide-react';
import { OnboardingState } from '../types';

interface StepTrainingProps {
  state: OnboardingState;
  onChange: (fields: Partial<OnboardingState>) => void;
}

const LOCATIONS: {
  id: OnboardingState['location'];
  title: string;
  subtitle: string;
  icon: typeof Building2;
}[] = [
  {
    id: 'Gym',
    title: 'GYM',
    subtitle: 'Full rack & barbell access',
    icon: Building2,
  },
  {
    id: 'Home',
    title: 'HOME',
    subtitle: 'Dumbbells & mat setups',
    icon: Home,
  },
  {
    id: 'Both',
    title: 'BOTH',
    subtitle: 'Adaptive hybrid schedule',
    icon: Repeat,
  },
];

const FREQUENCIES: OnboardingState['frequency'][] = ['2 days', '3 days', '4 days', '5+ days'];

export const StepTraining: React.FC<StepTrainingProps> = ({ state, onChange }) => {
  return (
    <div className="w-full flex flex-col space-y-6">
      {/* Header */}
      <div className="space-y-1.5 text-left">
        <span className="text-[11px] font-bold tracking-widest uppercase text-[#9a4023] block">
          Step 04 / 05 — Training
        </span>
        <h2 className="font-serif text-[28px] sm:text-[32px] font-bold tracking-tight text-[#1d1b19] uppercase leading-tight">
          Where will you mostly train?
        </h2>
        <p className="text-[14px] sm:text-[15px] text-[#56423d] leading-relaxed">
          Select your primary venue so exercises align with available weights and benches.
        </p>
      </div>

      {/* Training Location Cards */}
      <div
        className="grid grid-cols-1 sm:grid-cols-3 gap-3"
        role="radiogroup"
        aria-label="Training Location Selection"
      >
        {LOCATIONS.map((loc) => {
          const isSelected = state.location === loc.id;
          const Icon = loc.icon;

          return (
            <div
              key={loc.id}
              onClick={() => onChange({ location: loc.id })}
              className={`group cursor-pointer p-5 rounded-2xl transition-all flex flex-col items-center text-center shadow-xs hover:shadow-md border ${
                isSelected
                  ? 'bg-[#EAE3D6] border-[#9a4023] ring-2 ring-[#9a4023]/80'
                  : 'bg-[#F2EDE4] border-[#E4DDD3]/80 hover:bg-[#EAE3D6]/70'
              }`}
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center mb-2.5 transition-colors ${
                  isSelected
                    ? 'bg-[#9a4023] text-white shadow-xs'
                    : 'bg-white text-[#786b66]'
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span className="font-serif text-[15px] font-bold text-[#1d1b19] tracking-tight">
                {loc.title}
              </span>
              <span className="text-[12px] text-[#56423d] mt-0.5">
                {loc.subtitle}
              </span>
            </div>
          );
        })}
      </div>

      {/* Frequency Selector Box */}
      <div className="bg-[#F2EDE4] p-5 sm:p-6 rounded-2xl shadow-xs space-y-4 border border-[#E4DDD3]/80">
        <div>
          <h3 className="text-[13px] font-bold text-[#1d1b19] uppercase tracking-wider">
            How many days per week do you realistically want to train?
          </h3>
          <p className="text-[13px] text-[#786b66] mt-0.5">
            Consistency beats extreme burnout every single time.
          </p>
        </div>

        <div
          className="grid grid-cols-4 gap-2"
          role="radiogroup"
          aria-label="Weekly Training Frequency"
        >
          {FREQUENCIES.map((freq) => {
            const isSelected = state.frequency === freq;

            return (
              <button
                key={freq}
                type="button"
                onClick={() => onChange({ frequency: freq })}
                className={`h-12 rounded-xl text-[13px] font-bold transition-all flex items-center justify-center cursor-pointer ${
                  isSelected
                    ? 'bg-[#4d6358] text-white shadow-sm ring-1 ring-[#4d6358]'
                    : 'bg-white text-[#1d1b19] hover:bg-[#ede7e3] border border-[#E4DDD3]'
                }`}
              >
                {freq}
              </button>
            );
          })}
        </div>

        {/* Coach Recommendation Note */}
        <div className="flex items-center gap-2.5 text-[#4d6358] text-[12px] bg-[#E3E9E4]/80 px-3.5 py-2.5 rounded-xl border border-[#cde5d7]">
          <CheckCircle className="w-4 h-4 shrink-0 text-[#4d6358]" />
          <span>
            <strong>4-day upper/lower split</strong> recommended by Coach Tolu for steady body sculpting.
          </span>
        </div>
      </div>
    </div>
  );
};
