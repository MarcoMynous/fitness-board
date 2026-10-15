import React from 'react';

interface OnboardingMobileHeaderProps {
  currentStep: number;
}

export const OnboardingMobileHeader: React.FC<OnboardingMobileHeaderProps> = ({
  currentStep,
}) => {
  // Step 0 is Intro (5%), Steps 1-5 (20%-100%), Step 6 is Complete (100%)
  const progressPercent =
    currentStep === 0
      ? 5
      : currentStep >= 6
        ? 100
        : (currentStep / 5) * 100;

  const stepLabel =
    currentStep === 0
      ? 'INTRO'
      : currentStep <= 5
        ? `STEP 0${currentStep} / 05`
        : 'COMPLETE';

  return (
    <header className="lg:hidden sticky top-0 w-full z-50 bg-[#fff8f4]/90 backdrop-blur-xl border-b border-[#E4DDD3]/60 shadow-xs">
      <div className="h-16 px-4 sm:px-6 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-[#9a4023] text-white flex items-center justify-center font-serif font-bold text-xs">
            K
          </div>
          <span className="font-serif text-[18px] font-bold text-[#1d1b19]">
            Kinfolk
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          <span className="text-[11px] font-bold tracking-widest text-[#9a4023] uppercase">
            {stepLabel}
          </span>
          <img
            alt="Coach Tolu"
            className="w-7 h-7 rounded-full object-cover object-top ring-1 ring-[#9a4023]/30"
            src="/images/coach-tolu-editorial.jpg"
          />
        </div>
      </div>

      {/* Dynamic Animated Progress Bar */}
      <div className="w-full bg-[#ede7e3] h-1">
        <div
          className="bg-[#9a4023] h-1 transition-all duration-300 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </header>
  );
};
