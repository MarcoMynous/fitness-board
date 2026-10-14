import { z } from 'zod';

export type EntitlementType = 'training' | 'cookbook';

export interface ProductConfig {
  id: string;
  slug: string;
  name: string;
  headline: string;
  description: string;
  priceInCents: number;
  currency: string;
  badge?: string;
  isPopular?: boolean;
  entitlements: EntitlementType[];
  features: string[];
}

export const PRODUCTS: Record<string, ProductConfig> = {
  training: {
    id: 'prod_training_v1',
    slug: 'training',
    name: 'Training Protocol',
    headline: 'Structured, progressive strength & conditioning',
    description: 'Full access to progressive workout programs, exercise video library, weekly session guidance, and habit tracking.',
    priceInCents: 4900,
    currency: 'usd',
    entitlements: ['training'],
    features: [
      'Complete 12-week structured strength protocol',
      'High-definition movement demos & cue breakdowns',
      'Gym & minimal equipment workout options',
      'Interactive session completion & streak tracking',
      'Progressive overload logger & milestone log'
    ]
  },
  cookbook: {
    id: 'prod_cookbook_v1',
    slug: 'cookbook',
    name: 'The High-Performance Kitchen',
    headline: 'High-protein, chef-crafted editorial recipes',
    description: 'Lifetime access to over 60+ nutritionist-calibrated meals, macro profiles, curated grocery frameworks, and meal prep guides.',
    priceInCents: 3900,
    currency: 'usd',
    entitlements: ['cookbook'],
    features: [
      '60+ chef-crafted high-protein whole food recipes',
      'Exact macro breakdowns (Protein, Carbs, Fats, Calories)',
      'Vegetarian, gluten-free, and dairy-free filtering',
      'Step-by-step cooking timelines & prep notes',
      'Personal favorites & cookbook bookmarking'
    ]
  },
  bundle: {
    id: 'prod_bundle_v1',
    slug: 'bundle',
    name: 'Complete Method Bundle',
    headline: 'The definitive physical training & culinary blueprint',
    description: 'Full unfiltered access to both the Training Protocol and the complete High-Performance Kitchen collection with unified dashboard.',
    priceInCents: 6900,
    currency: 'usd',
    badge: 'Best Value — Save $19',
    isPopular: true,
    entitlements: ['training', 'cookbook'],
    features: [
      'Everything in Training Protocol (12-week program)',
      'Everything in The High-Performance Kitchen (60+ recipes)',
      'Unified member home & combined weekly planning',
      'Immediate access to all future program updates',
      'Direct priority support & onboarding orientation'
    ]
  }
};

export const ProductSlugSchema = z.enum(['training', 'cookbook', 'bundle']);
export type ProductSlug = z.infer<typeof ProductSlugSchema>;
