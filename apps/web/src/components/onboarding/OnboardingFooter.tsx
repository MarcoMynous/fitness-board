import React from 'react';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';

interface OnboardingFooterProps {
  currentStep: number;
  isSubmitting?: boolean;
  continueLabel?: string;
  onBack: () => void;
  onContinue: () => void;
}

export const OnboardingFooter: React.FC<OnboardingFooterProps> = ({
  currentStep,
  isSubmitting = false,
  continueLabel,
  onBack,
  onContinue,
}) => {
  // Step 0 (Welcome) and Step 6 (Summary) have their own dedicated action buttons
  if (currentStep === 0 || currentStep === 6) {
    return null;
  }

  const defaultContinueText =
    currentStep === 5 ? 'Save & Finish' : 'Continue';
  const label = continueLabel || defaultContinueText;

  return (
    <footer className="sticky bottom-0 w-full z-40 bg-[#fff8f4]/95 backdrop-blur-xl border-t border-[#E4DDD3]/70 py-4 px-4 sm:px-8 lg:px-12 shadow-[0_12px_32px_-4px_rgba(28,26,24,0.08)]">
      <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="h-12 px-5 sm:px-6 rounded-xl inline-flex items-center justify-center text-[13px] font-bold text-[#1d1b19] hover:bg-[#EAE3D6] transition-colors disabled:opacity-50 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          <span>Back</span>
        </button>

        <div className="flex items-center gap-4">
          <span className="hidden sm:inline text-[13px] text-[#786b66]">
            Takes about 1 minute
          </span>

          <button
            type="button"
            onClick={onContinue}
            disabled={isSubmitting}
            className="h-12 px-6 sm:px-8 rounded-xl inline-flex items-center justify-center bg-[#9a4023] hover:bg-[#A84C2F] text-white font-bold text-[13px] tracking-wide transition-all active:scale-[0.99] shadow-sm disabled:opacity-70 cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                <span>Configuring...</span>
              </>
            ) : (
              <>
                <span>{label}</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </button>
        </div>
      </div>
    </footer>
  );
};
