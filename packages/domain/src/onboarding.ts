import { z } from 'zod';

export const OnboardingInputSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  displayName: z.string().min(2, 'Display name must be at least 2 characters'),
  fitnessGoal: z.enum(['strength_hypertrophy', 'fat_loss_conditioning', 'athletic_performance', 'general_longevity']),
  experienceLevel: z.enum(['beginner', 'intermediate', 'advanced']),
  trainingEnvironment: z.enum(['commercial_gym', 'home_dumbbells_bands', 'minimal_bodyweight']),
  dietaryPreferences: z.array(z.string()).default([]),
  weeklyWorkoutTarget: z.number().min(2).max(7).default(4),
  receiveWeeklyDigest: z.boolean().default(true)
});

export type OnboardingInput = z.infer<typeof OnboardingInputSchema>;
