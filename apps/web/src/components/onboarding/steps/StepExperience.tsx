import React from 'react';
import { Check, Sparkles, TrendingUp, Award } from 'lucide-react';
import { OnboardingState } from '../types';

interface StepExperienceProps {
  state: OnboardingState;
  onChange: (experience: OnboardingState['experience']) => void;
}

const EXPERIENCES: {
  id: OnboardingState['experience'];
  number: string;
  title: string;
  description: string;
  tag: string;
  icon: typeof Sparkles;
}[] = [
  {
    id: 'Beginner',
    number: '01',
    title: 'BEGINNER',
    description: "I'm brand new or getting back into training after a long break. Guide me step by step.",
    tag: 'Gentle progression & form cueing',
    icon: Sparkles,
  },
  {
    id: 'Intermediate',
    number: '02',
    title: 'INTERMEDIATE',
    description: "I've been training fairly consistently. I understand barbell, dumbbell, and machine setups.",
    tag: 'Hypertrophy & strength pacing',
    icon: TrendingUp,
  },
  {
    id: 'Experienced',
    number: '03',
    title: 'EXPERIENCED',
    description: "I'm comfortable with complex compound exercises and high-volume splits. Challenge me.",
    tag: 'Advanced overload cycles',
    icon: Award,
  },
];

export const StepExperience: React.FC<StepExperienceProps> = ({ state, onChange }) => {
  return (
    <div className="w-full flex flex-col space-y-6">
      {/* Header */}
      <div className="space-y-1.5 text-left">
        <span className="text-[11px] font-bold tracking-widest uppercase text-[#9a4023] block">
          Step 03 / 05 — Experience
        </span>
        <h2 className="font-serif text-[28px] sm:text-[32px] font-bold tracking-tight text-[#1d1b19] uppercase leading-tight">
          How experienced are you with training?
        </h2>
        <p className="text-[14px] sm:text-[15px] text-[#56423d] leading-relaxed">
          We pace workout intensity so you build resilient habits without feeling overwhelmed.
        </p>
      </div>

      {/* Selectable Cards */}
      <div
        className="grid grid-cols-1 gap-4"
        role="radiogroup"
        aria-label="Experience Level Selection"
      >
        {EXPERIENCES.map((exp) => {
          const isSelected = state.experience === exp.id;
          const TagIcon = exp.icon;

          return (
            <div
              key={exp.id}
              onClick={() => onChange(exp.id)}
              className={`group cursor-pointer p-5 rounded-2xl transition-all flex items-start justify-between shadow-xs hover:shadow-md border ${
                isSelected
                  ? 'bg-[#EAE3D6] border-[#9a4023] ring-2 ring-[#9a4023]/80'
                  : 'bg-[#F2EDE4] border-[#E4DDD3]/80 hover:bg-[#EAE3D6]/70'
              }`}
            >
              <div className="flex gap-4">
                <span
                  className={`w-10 h-10 rounded-xl flex items-center justify-center font-serif font-bold text-base shrink-0 transition-colors ${
                    isSelected
                      ? 'bg-[#9a4023] text-white shadow-xs'
                      : 'bg-white text-[#9a4023]'
                  }`}
                >
                  {exp.number}
                </span>

                <div className="space-y-1.5">
                  <p className="font-serif text-[16px] font-bold text-[#1d1b19] tracking-tight">
                    {exp.title}
                  </p>
                  <p className="text-[13px] text-[#56423d] leading-relaxed max-w-md">
                    {exp.description}
                  </p>
                  <div className="flex items-center gap-1.5 pt-1 text-[#4d6358] text-[11px] font-bold tracking-wider uppercase">
                    <TagIcon className="w-3.5 h-3.5" />
                    <span>{exp.tag}</span>
                  </div>
                </div>
              </div>

              {/* Check indicator */}
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors mt-1 ${
                  isSelected ? 'bg-[#9a4023] text-white' : 'bg-[#ede7e3]'
                }`}
              >
                {isSelected && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
