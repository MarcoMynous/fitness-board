export interface OnboardingState {
  fullName: string;
  displayName: string;
  goal: string;
  weight: string;
  height: string;
  waist: string;
  experience: 'Beginner' | 'Intermediate' | 'Experienced';
  location: 'Gym' | 'Home' | 'Both';
  frequency: '2 days' | '3 days' | '4 days' | '5+ days';
  photoUploaded: boolean;
  photoUrl?: string | null;
}

export const INITIAL_ONBOARDING_STATE: OnboardingState = {
  fullName: '',
  displayName: '',
  goal: 'Build & Shape Body',
  weight: '72',
  height: '168',
  waist: '74',
  experience: 'Intermediate',
  location: 'Gym',
  frequency: '4 days',
  photoUploaded: false,
  photoUrl: null,
};
