import React from 'react';
import { Check, Clock } from 'lucide-react';

interface OnboardingSidebarProps {
  currentStep: number; // 0 to 6
  onStepClick?: (step: number) => void;
}

const STEPS = [
  { id: 1, title: 'Goal', subtitle: 'Define target intentions' },
  { id: 2, title: 'Body', subtitle: 'Biometrics & preferences' },
  { id: 3, title: 'Experience', subtitle: 'Movement familiarity' },
  { id: 4, title: 'Training', subtitle: 'Schedule & rhythm' },
  { id: 5, title: 'Progress', subtitle: 'Plan synthesis' },
];

export const OnboardingSidebar: React.FC<OnboardingSidebarProps> = ({
  currentStep,
  onStepClick,
}) => {
  return (
    <aside className="hidden lg:flex fixed left-0 top-0 h-full w-[34%] max-w-[480px] bg-[#F2EDE4] z-40 flex-col justify-between p-10 overflow-y-auto border-r border-[#E4DDD3]/60">
      <div className="flex flex-col gap-10">
        {/* Brand Header */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#9a4023] text-[#FAF7F2] flex items-center justify-center font-serif font-bold text-lg shadow-sm">
            K
          </div>
          <span className="font-serif text-[22px] font-semibold tracking-tight text-[#1d1b19]">
            Kinfolk &amp; Core
          </span>
        </div>

        {/* Heading & Subtitle */}
        <div className="space-y-2">
          <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#9a4023] block">
            Personalized Roadmap
          </span>
          <h1 className="font-serif text-[26px] leading-[1.18] font-bold text-[#1d1b19] tracking-tight uppercase">
            Let&apos;s set up your program.
          </h1>
          <p className="text-[14px] leading-relaxed text-[#56423d] font-normal">
            A few quick questions so your progress tracker feels personal.
          </p>
        </div>

        {/* Persistent 5-Step Navigation Indicator */}
        <nav className="flex flex-col gap-2">
          {STEPS.map((step) => {
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;

            return (
              <button
                key={step.id}
                type="button"
                onClick={() => onStepClick && onStepClick(step.id)}
                className={`group flex items-center gap-3.5 p-3 rounded-xl transition-all text-left w-full ${
                  isActive
                    ? 'bg-[#EAE3D6] text-[#1d1b19] font-medium shadow-xs'
                    : 'text-[#56423d] hover:bg-[#EAE3D6]/60 hover:text-[#1d1b19]'
                }`}
              >
                {/* Step Icon / Number Pill */}
                <span
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold shrink-0 transition-colors ${
                    isActive
                      ? 'bg-[#cde5d7] text-[#0a1f17]'
                      : isCompleted
                        ? 'bg-[#E3E9E4] text-[#4d6358]'
                        : 'bg-[#ede7e3] text-[#7a6a64]'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4 text-[#4d6358] stroke-[2.5]" />
                  ) : (
                    `0${step.id}`
                  )}
                </span>

                <div className="flex flex-col">
                  <span
                    className={`text-[13px] leading-tight font-semibold ${
                      isActive ? 'text-[#1d1b19]' : 'text-[#32302e]'
                    }`}
                  >
                    {step.title}
                  </span>
                  <span className="text-[12px] text-[#786b66] leading-tight mt-0.5">
                    {step.subtitle}
                  </span>
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Coach Byline Card */}
      <div className="pt-6 flex items-center justify-between bg-white/70 backdrop-blur-md p-3.5 rounded-2xl shadow-xs border border-[#E4DDD3]/70">
        <div className="flex items-center gap-3">
          <img
            alt="Coach Tolu"
            className="w-10 h-10 rounded-full object-cover object-top shrink-0 ring-1 ring-[#9a4023]/30"
            src="/images/coach-tolu-editorial.jpg"
          />
          <div>
            <p className="text-[13px] font-bold text-[#1d1b19] leading-tight">
              Coach Tolu
            </p>
            <p className="text-[11px] text-[#786b66] leading-tight">
              Kinfolk Lead Coach
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 text-[#4d6358] text-[11px] font-bold tracking-wider uppercase">
          <Clock className="w-3.5 h-3.5 text-[#4d6358]" />
          <span>~1 min</span>
        </div>
      </div>
    </aside>
  );
};
