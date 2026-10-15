'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  OnboardingSidebar,
  OnboardingMobileHeader,
  OnboardingFooter,
  StepWelcome,
  StepGoal,
  StepBody,
  StepExperience,
  StepTraining,
  StepPhoto,
  StepSummary,
  INITIAL_ONBOARDING_STATE,
  type OnboardingState,
} from '@/components/onboarding';

export default function OnboardingPage() {
  const router = useRouter();
  // Steps: 0: Welcome, 1: Goal, 2: Body, 3: Experience, 4: Training, 5: Progress Photo, 6: Summary
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [state, setState] = useState<OnboardingState>(INITIAL_ONBOARDING_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // If user is already authenticated and verified, redirect directly to dashboard
  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated && data.user?.onboardingCompleted) {
          router.replace('/home');
        }
      })
      .catch(() => {});
  }, [router]);

  // Transition state for smooth fade animations
  const [isAnimating, setIsAnimating] = useState(false);

  const goToStep = (targetStep: number) => {
    if (targetStep < 0 || targetStep > 6 || targetStep === currentStep) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentStep(targetStep);
      setIsAnimating(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 180);
  };

  const handleNext = () => {
    if (currentStep < 6) {
      goToStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      goToStep(currentStep - 1);
    }
  };

  const updateState = (fields: Partial<OnboardingState>) => {
    setState((prev) => ({ ...prev, ...fields }));
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    setErrorMessage(null);

    // Map user-friendly selections to schema requirements
    const goalMap: Record<string, string> = {
      'Lose Body Fat': 'fat_loss_conditioning',
      'Build & Shape Body': 'strength_hypertrophy',
      'Get Stronger': 'athletic_performance',
      'Improve My Fitness': 'general_longevity',
      'Stay Consistent': 'general_longevity',
    };

    const expMap: Record<string, string> = {
      Beginner: 'beginner',
      Intermediate: 'intermediate',
      Experienced: 'advanced',
    };

    const locMap: Record<string, string> = {
      Gym: 'commercial_gym',
      Home: 'home_dumbbells_bands',
      Both: 'commercial_gym',
    };

    const freqNumber = parseInt(state.frequency.replace(/\D/g, ''), 10) || 4;

    const payload = {
      fullName: state.fullName || 'Amaka Vance',
      displayName: state.displayName || 'Amaka',
      fitnessGoal: goalMap[state.goal] || 'strength_hypertrophy',
      experienceLevel: expMap[state.experience] || 'intermediate',
      trainingEnvironment: locMap[state.location] || 'commercial_gym',
      dietaryPreferences: ['High Protein (Default)'],
      weeklyWorkoutTarget: Math.min(Math.max(freqNumber, 2), 6),
      receiveWeeklyDigest: true,
    };

    try {
      const res = await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        console.warn('Onboarding sync response warning:', data.error);
        // If unauthenticated in dev simulator, still allow seamless transition to member dashboard
        router.push(data.redirect || '/home');
      } else {
        router.push(data.redirect || '/home');
      }
    } catch (err) {
      console.error('Error completing onboarding:', err);
      // Fallback navigation
      router.push('/home');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fff8f4] text-[#1d1b19] flex flex-col font-sans selection:bg-[#9a4023] selection:text-white">
      {/* 1. PERSISTENT DESKTOP SIDEBAR */}
      <OnboardingSidebar
        currentStep={currentStep}
        onStepClick={(step) => goToStep(step)}
      />

      {/* 2. MAIN CONTENT AREA (Offset by 34% on desktop) */}
      <div className="lg:pl-[34%] min-h-screen flex flex-col justify-between">
        {/* Mobile Header with Step Indicators & Progress Line */}
        <OnboardingMobileHeader currentStep={currentStep} />

        {/* Content Container with Smooth Fade / Rise Transitions */}
        <main className="w-full flex-1 max-w-3xl mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-12 flex flex-col justify-center">
          {errorMessage && (
            <div className="mb-6 p-4 rounded-xl bg-[#c86241]/10 border border-[#c86241]/30 text-[13px] text-[#9a4023] font-medium text-center">
              {errorMessage}
            </div>
          )}

          {/* Animated Viewport */}
          <div
            className={`w-full transition-all duration-300 ease-out transform ${
              isAnimating
                ? 'opacity-0 translate-y-2'
                : 'opacity-100 translate-y-0'
            }`}
          >
            {currentStep === 0 && (
              <StepWelcome state={state} onContinue={handleNext} />
            )}

            {currentStep === 1 && (
              <StepGoal
                state={state}
                onChange={(goal) => updateState({ goal })}
              />
            )}

            {currentStep === 2 && (
              <StepBody state={state} onChange={updateState} />
            )}

            {currentStep === 3 && (
              <StepExperience
                state={state}
                onChange={(experience) => updateState({ experience })}
              />
            )}

            {currentStep === 4 && (
              <StepTraining state={state} onChange={updateState} />
            )}

            {currentStep === 5 && (
              <StepPhoto
                state={state}
                onChange={updateState}
                onSkip={() => goToStep(6)}
              />
            )}

            {currentStep === 6 && (
              <StepSummary
                state={state}
                isSubmitting={isSubmitting}
                onGoToDashboard={handleFinalSubmit}
              />
            )}
          </div>
        </main>

        {/* 3. STICKY ACTION FOOTER (Synchronized with Step Progression) */}
        <OnboardingFooter
          currentStep={currentStep}
          isSubmitting={isSubmitting}
          onBack={handleBack}
          onContinue={currentStep === 5 ? () => goToStep(6) : handleNext}
        />
      </div>
    </div>
  );
}
