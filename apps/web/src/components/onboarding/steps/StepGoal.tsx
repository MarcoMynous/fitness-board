import React from 'react';
import { Flame, Dumbbell, Zap, Activity, Calendar, Check } from 'lucide-react';
import { OnboardingState } from '../types';

interface StepGoalProps {
  state: OnboardingState;
  onChange: (goal: string) => void;
}

const GOALS = [
  {
    id: 'Lose Body Fat',
    title: 'LOSE BODY FAT',
    description: 'I want to reduce body fat and feel lighter.',
    icon: Flame,
  },
  {
    id: 'Build & Shape Body',
    title: 'BUILD / SHAPE MY BODY',
    description: 'I want to build shape, curve, and definition.',
    icon: Dumbbell,
  },
  {
    id: 'Get Stronger',
    title: 'GET STRONGER',
    description: 'I want to lift with authority and improve strength.',
    icon: Zap,
  },
  {
    id: 'Improve My Fitness',
    title: 'IMPROVE MY FITNESS',
    description: 'I want elevated stamina and daily energy.',
    icon: Activity,
  },
  {
    id: 'Stay Consistent',
    title: 'STAY CONSISTENT',
    description: 'I want a realistic routine I can genuinely stick to.',
    icon: Calendar,
  },
];

export const StepGoal: React.FC<StepGoalProps> = ({ state, onChange }) => {
  return (
    <div className="w-full flex flex-col space-y-6">
      {/* Header */}
      <div className="space-y-1.5 text-left">
        <span className="text-[11px] font-bold tracking-widest uppercase text-[#9a4023] block">
          Step 01 / 05 — Goal
        </span>
        <h2 className="font-serif text-[28px] sm:text-[32px] font-bold tracking-tight text-[#1d1b19] uppercase leading-tight">
          What&apos;s your main goal?
        </h2>
        <p className="text-[14px] sm:text-[15px] text-[#56423d] leading-relaxed">
          Choose the one that matters most to your journey right now.
        </p>
      </div>

      {/* Selectable Editorial Cards */}
      <div
        className="grid grid-cols-1 gap-3"
        role="radiogroup"
        aria-label="Fitness Goal Selection"
      >
        {GOALS.map((goal) => {
          const isSelected = state.goal === goal.id;
          const Icon = goal.icon;

          return (
            <div
              key={goal.id}
              onClick={() => onChange(goal.id)}
              className={`group cursor-pointer p-4 rounded-2xl transition-all flex items-center justify-between shadow-xs hover:shadow-md border ${
                isSelected
                  ? 'bg-[#EAE3D6] border-[#9a4023] ring-2 ring-[#9a4023]/80'
                  : 'bg-[#F2EDE4] border-[#E4DDD3]/80 hover:bg-[#EAE3D6]/70'
              }`}
            >
              <div className="flex items-center gap-4 min-w-0">
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${
                    isSelected
                      ? 'bg-[#9a4023] text-white shadow-xs'
                      : 'bg-white text-[#9a4023]'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>

                <div className="flex flex-col min-w-0">
                  <span className="font-serif text-[15px] font-bold text-[#1d1b19] tracking-tight">
                    {goal.title}
                  </span>
                  <span className="text-[13px] text-[#56423d] truncate">
                    {goal.description}
                  </span>
                </div>
              </div>

              {/* Right Selection Radio Pill */}
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors ${
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
