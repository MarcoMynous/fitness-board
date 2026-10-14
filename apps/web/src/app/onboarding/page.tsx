'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input, Card, Badge } from '@repo/ui';
import { ArrowRight, ArrowLeft, Check, Dumbbell, Utensils, Target, Sparkles } from 'lucide-react';

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    displayName: '',
    fitnessGoal: 'strength_hypertrophy',
    experienceLevel: 'intermediate',
    trainingEnvironment: 'commercial_gym',
    dietaryPreferences: [] as string[],
    weeklyWorkoutTarget: 4,
    receiveWeeklyDigest: true,
  });

  const goals = [
    { id: 'strength_hypertrophy', label: 'Athletic Muscle & Hypertrophy', desc: 'Build lean functional muscle and structural density' },
    { id: 'fat_loss_conditioning', label: 'Metabolic Conditioning & Leanness', desc: 'Shed body fat while preserving hard-earned power' },
    { id: 'athletic_performance', label: 'Kinetic Performance & Speed', desc: 'Improve sprint mechanics, jumping power, and work capacity' },
    { id: 'general_longevity', label: 'Structural Longevity & Resilience', desc: 'Strengthen joints, posture, and lifelong durability' },
  ];

  const experienceLevels = [
    { id: 'beginner', label: 'Beginner', desc: '< 1 year of consistent lifting' },
    { id: 'intermediate', label: 'Intermediate', desc: '1 to 4 years of structured training' },
    { id: 'advanced', label: 'Advanced', desc: '5+ years of dedicated athletic training' },
  ];

  const environments = [
    { id: 'commercial_gym', label: 'Commercial Gym', desc: 'Full access to barbells, racks, dumbbells & cables' },
    { id: 'home_dumbbells_bands', label: 'Home Gym with Dumbbells', desc: 'Adjustable dumbbells, bench, and resistance bands' },
    { id: 'minimal_bodyweight', label: 'Minimal / Bodyweight', desc: 'Pull-up bar, kettlebell, and bodyweight movements' },
  ];

  const diets = [
    'High Protein (Default)',
    'Gluten-Free',
    'Dairy-Free',
    'Vegetarian',
    'Pescatarian',
    'Low Carb / Keto',
  ];

  const toggleDiet = (diet: string) => {
    setFormData((prev) => ({
      ...prev,
      dietaryPreferences: prev.dietaryPreferences.includes(diet)
        ? prev.dietaryPreferences.filter((d) => d !== diet)
        : [...prev.dietaryPreferences, diet],
    }));
  };

  const handleNext = () => {
    if (step === 1 && (!formData.fullName.trim() || !formData.displayName.trim())) {
      setError('Please provide your name and preferred display name.');
      return;
    }
    setError(null);
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setError(null);
    setStep((prev) => prev - 1);
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to complete onboarding');
      } else {
        router.push(data.redirect || '/home');
      }
    } catch (err) {
      console.error(err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-base py-12 px-4 sm:px-6 flex flex-col justify-center items-center">
      <div className="max-w-xl w-full space-y-6">
        {/* Header with progress */}
        <div className="space-y-3 text-center">
          <Badge variant="burgundy">Step {step} of 4</Badge>
          <div className="w-full bg-stone-sunken h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-brand-burgundy h-full transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
          <h1 className="font-serif text-3xl text-stone-primary">
            {step === 1 && 'Welcome to the Platform'}
            {step === 2 && 'Your Physical Objective'}
            {step === 3 && 'Training Environment'}
            {step === 4 && 'Culinary Calibration'}
          </h1>
          <p className="text-sm text-stone-secondary">
            {step === 1 && "Let's personalize your member dashboard and training profile."}
            {step === 2 && 'Choose the focus that best matches your immediate training season.'}
            {step === 3 && 'Select where you will complete most of your sessions.'}
            {step === 4 && 'Calibrate recipe discovery and weekly planning.'}
          </p>
        </div>

        {/* Card Body */}
        <Card className="bg-white border-stone-border shadow-tactile-lg space-y-6">
          {error && (
            <div className="p-3 bg-state-danger/10 text-state-danger rounded-lg text-xs font-medium">
              {error}
            </div>
          )}

          {/* STEP 1: Name and Identity */}
          {step === 1 && (
            <div className="space-y-4">
              <Input
                label="Full Name"
                placeholder="e.g. Marcus Vance"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                required
              />

              <Input
                label="Preferred Display Name"
                placeholder="e.g. Marcus"
                value={formData.displayName}
                onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                required
                helperText="How the trainer and dashboard will address you."
              />
            </div>
          )}

          {/* STEP 2: Goal & Experience */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-secondary block">
                  Primary Focus:
                </span>
                <div className="grid grid-cols-1 gap-2.5">
                  {goals.map((g) => (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, fitnessGoal: g.id })}
                      className={`text-left p-3.5 rounded-lg border transition-all ${
                        formData.fitnessGoal === g.id
                          ? 'border-brand-burgundy bg-brand-burgundy/5 ring-1 ring-brand-burgundy'
                          : 'border-stone-border hover:bg-surface-base'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-sm text-stone-primary">{g.label}</span>
                        {formData.fitnessGoal === g.id && (
                          <Check className="w-4 h-4 text-brand-burgundy" />
                        )}
                      </div>
                      <p className="text-xs text-stone-secondary mt-0.5">{g.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-stone-border">
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-secondary block">
                  Lifting Experience:
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {experienceLevels.map((lvl) => (
                    <button
                      key={lvl.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, experienceLevel: lvl.id })}
                      className={`p-3 rounded-lg border text-center transition-all ${
                        formData.experienceLevel === lvl.id
                          ? 'border-brand-burgundy bg-brand-burgundy/5 ring-1 ring-brand-burgundy font-semibold text-brand-burgundy'
                          : 'border-stone-border hover:bg-surface-base text-stone-primary text-xs'
                      }`}
                    >
                      <span className="block text-xs font-medium">{lvl.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Training Environment & Frequency */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-secondary block">
                  Where will you train?
                </span>
                <div className="space-y-2.5">
                  {environments.map((env) => (
                    <button
                      key={env.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, trainingEnvironment: env.id })}
                      className={`w-full text-left p-3.5 rounded-lg border transition-all ${
                        formData.trainingEnvironment === env.id
                          ? 'border-brand-burgundy bg-brand-burgundy/5 ring-1 ring-brand-burgundy'
                          : 'border-stone-border hover:bg-surface-base'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-sm text-stone-primary">{env.label}</span>
                        {formData.trainingEnvironment === env.id && (
                          <Check className="w-4 h-4 text-brand-burgundy" />
                        )}
                      </div>
                      <p className="text-xs text-stone-secondary mt-0.5">{env.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-stone-border space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold uppercase tracking-wider text-stone-secondary">
                    Target Workouts Per Week:
                  </span>
                  <span className="font-serif font-bold text-brand-burgundy text-base">
                    {formData.weeklyWorkoutTarget} days / week
                  </span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="6"
                  value={formData.weeklyWorkoutTarget}
                  onChange={(e) =>
                    setFormData({ ...formData, weeklyWorkoutTarget: parseInt(e.target.value) })
                  }
                  className="w-full accent-brand-burgundy cursor-pointer"
                />
              </div>
            </div>
          )}

          {/* STEP 4: Dietary Preferences */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-secondary block">
                  Select any dietary preferences (Optional):
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {diets.map((diet) => {
                    const isSelected = formData.dietaryPreferences.includes(diet);
                    return (
                      <button
                        key={diet}
                        type="button"
                        onClick={() => toggleDiet(diet)}
                        className={`p-3 rounded-lg border text-xs text-left transition-all ${
                          isSelected
                            ? 'border-brand-terracotta bg-brand-terracotta/10 text-brand-terracotta font-medium'
                            : 'border-stone-border hover:bg-surface-base text-stone-primary'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span>{diet}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-brand-terracotta" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="p-4 rounded-lg bg-surface-base border border-stone-border flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-stone-primary block">
                    Weekly Method Digest
                  </span>
                  <span className="text-[11px] text-stone-secondary">
                    Receive weekly training tips and featured recipe breakdowns.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={formData.receiveWeeklyDigest}
                  onChange={(e) =>
                    setFormData({ ...formData, receiveWeeklyDigest: e.target.checked })
                  }
                  className="w-4 h-4 accent-brand-burgundy rounded"
                />
              </div>
            </div>
          )}

          {/* Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-stone-border">
            {step > 1 ? (
              <Button type="button" variant="ghost" size="sm" onClick={handleBack}>
                <ArrowLeft className="w-4 h-4 mr-1.5" />
                Back
              </Button>
            ) : (
              <div />
            )}

            {step < 4 ? (
              <Button type="button" variant="primary" size="md" onClick={handleNext}>
                Continue
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            ) : (
              <Button
                type="button"
                variant="primary"
                size="md"
                isLoading={isSubmitting}
                onClick={handleFinalSubmit}
              >
                Complete Onboarding & Enter
                <Sparkles className="w-4 h-4 ml-1.5" />
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
