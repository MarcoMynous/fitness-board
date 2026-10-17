import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
  jsonb,
  uuid,
  pgEnum
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Enums
export const roleEnum = pgEnum('user_role', ['member', 'admin']);
export const userStatusEnum = pgEnum('user_status', ['active', 'suspended']);
export const accessTypeEnum = pgEnum('access_type', ['training', 'cookbook']);
export const entitlementStatusEnum = pgEnum('entitlement_status', ['active', 'revoked', 'refunded', 'expired']);
export const entitlementSourceEnum = pgEnum('entitlement_source', ['stripe_checkout', 'admin_grant', 'bundle', 'simulation']);
export const paymentStatusEnum = pgEnum('payment_status', ['succeeded', 'refunded', 'failed', 'simulated']);
export const contentStatusEnum = pgEnum('content_status', ['draft', 'published', 'archived']);

// 1. Users
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: text('email').notNull().unique(),
  role: roleEnum('role').default('member').notNull(),
  status: userStatusEnum('status').default('active').notNull(),
  onboardingCompleted: boolean('onboarding_completed').default(false).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  lastSeenAt: timestamp('last_seen_at', { withTimezone: true }),
});

// 2. Profiles
export const profiles = pgTable('profiles', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull().unique(),
  fullName: text('full_name').notNull(),
  displayName: text('display_name').notNull(),
  fitnessGoal: text('fitness_goal'),
  experienceLevel: text('experience_level'),
  trainingEnvironment: text('training_environment'),
  dietaryPreferences: jsonb('dietary_preferences').$type<string[]>().default([]).notNull(),
  weeklyWorkoutTarget: integer('weekly_workout_target').default(4).notNull(),
  receiveWeeklyDigest: boolean('receive_weekly_digest').default(true).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

// 3. Products
export const products = pgTable('products', {
  id: text('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  headline: text('headline').notNull(),
  description: text('description').notNull(),
  priceInCents: integer('price_in_cents').notNull(),
  currency: text('currency').default('usd').notNull(),
  active: boolean('active').default(true).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

// 4. Entitlements
export const entitlements = pgTable('entitlements', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  accessType: accessTypeEnum('access_type').notNull(),
  status: entitlementStatusEnum('status').default('active').notNull(),
  source: entitlementSourceEnum('source').default('stripe_checkout').notNull(),
  startsAt: timestamp('starts_at', { withTimezone: true }).defaultNow().notNull(),
  endsAt: timestamp('ends_at', { withTimezone: true }),
  revokedAt: timestamp('revoked_at', { withTimezone: true }),
  revokedReason: text('revoked_reason'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

// 5. Payments
export const payments = pgTable('payments', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'set null' }),
  customerEmail: text('customer_email').notNull(),
  stripeCheckoutSessionId: text('stripe_checkout_session_id').unique(),
  stripePaymentIntentId: text('stripe_payment_intent_id'),
  productSlug: text('product_slug').notNull(),
  amountInCents: integer('amount_in_cents').notNull(),
  currency: text('currency').default('usd').notNull(),
  status: paymentStatusEnum('status').default('succeeded').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

// 6. Magic Link Tokens
export const magicLinkTokens = pgTable('magic_link_tokens', {
  id: uuid('id').defaultRandom().primaryKey(),
  tokenHash: text('token_hash').notNull().unique(),
  email: text('email').notNull(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }),
  expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
  consumedAt: timestamp('consumed_at', { withTimezone: true }),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

// 7. Sessions
export const sessions = pgTable('sessions', {
  id: uuid('id').defaultRandom().primaryKey(),
  sessionToken: text('session_token').notNull().unique(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  lastActiveAt: timestamp('last_active_at', { withTimezone: true }).defaultNow().notNull(),
});

// 8. Programs, Workouts & Completions
export const programs = pgTable('programs', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description').notNull(),
  totalWeeks: integer('total_weeks').default(12).notNull(),
  level: text('level').default('All levels').notNull(),
  status: contentStatusEnum('status').default('published').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const workouts = pgTable('workouts', {
  id: uuid('id').defaultRandom().primaryKey(),
  programId: uuid('program_id').references(() => programs.id, { onDelete: 'cascade' }).notNull(),
  weekNumber: integer('week_number').notNull(),
  dayNumber: integer('day_number').notNull(),
  title: text('title').notNull(),
  durationMinutes: integer('duration_minutes').notNull(),
  focus: text('focus').notNull(),
  instructions: text('instructions').notNull(),
  exercises: jsonb('exercises').$type<Array<{
    name: string;
    sets: number;
    reps: string;
    restSeconds: number;
    notes?: string;
  }>>().default([]).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const workoutCompletions = pgTable('workout_completions', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  workoutId: uuid('workout_id').references(() => workouts.id, { onDelete: 'cascade' }).notNull(),
  completedAt: timestamp('completed_at', { withTimezone: true }).defaultNow().notNull(),
  durationMinutes: integer('duration_minutes'),
  rating: integer('rating'),
  notes: text('notes'),
});

// 9. Recipes & Saved Recipes
export const recipes = pgTable('recipes', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  category: text('category').notNull(), // 'breakfast', 'main', 'snack', 'shake'
  prepTimeMinutes: integer('prep_time_minutes').notNull(),
  cookTimeMinutes: integer('cook_time_minutes').notNull(),
  calories: integer('calories').notNull(),
  proteinGrams: integer('protein_grams').notNull(),
  carbsGrams: integer('carbs_grams').notNull(),
  fatGrams: integer('fat_grams').notNull(),
  ingredients: jsonb('ingredients').$type<any>().default([]).notNull(),
  instructions: jsonb('instructions').$type<any>().default([]).notNull(),
  tags: jsonb('tags').$type<string[]>().default([]).notNull(),
  subtitle: text('subtitle'),
  servings: text('servings'),
  fiberGrams: integer('fiber_grams').default(0),
  sodiumMg: integer('sodium_mg').default(0),
  coachComment: text('coach_comment'),
  status: contentStatusEnum('status').default('published').notNull(),
  imageUrl: text('image_url'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const savedRecipes = pgTable('saved_recipes', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  recipeId: uuid('recipe_id').references(() => recipes.id, { onDelete: 'cascade' }).notNull(),
  savedAt: timestamp('saved_at', { withTimezone: true }).defaultNow().notNull(),
});

// 10. Audit Events
export const auditEvents = pgTable('audit_events', {
  id: uuid('id').defaultRandom().primaryKey(),
  actorId: text('actor_id'),
  actorType: text('actor_type').notNull(), // 'user' | 'admin' | 'system'
  action: text('action').notNull(), // e.g., 'entitlement.created', 'admin.login', etc.
  targetType: text('target_type'),
  targetId: text('target_id'),
  metadata: jsonb('metadata').default({}).notNull(),
  ipAddress: text('ip_address'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

// Relations
export const usersRelations = relations(users, ({ one, many }) => ({
  profile: one(profiles, {
    fields: [users.id],
    references: [profiles.userId],
  }),
  entitlements: many(entitlements),
  payments: many(payments),
  completions: many(workoutCompletions),
  savedRecipes: many(savedRecipes),
  sessions: many(sessions),
}));

export const profilesRelations = relations(profiles, ({ one }) => ({
  user: one(users, {
    fields: [profiles.userId],
    references: [users.id],
  }),
}));

export const entitlementsRelations = relations(entitlements, ({ one }) => ({
  user: one(users, {
    fields: [entitlements.userId],
    references: [users.id],
  }),
}));

export const workoutsRelations = relations(workouts, ({ one, many }) => ({
  program: one(programs, {
    fields: [workouts.programId],
    references: [programs.id],
  }),
  completions: many(workoutCompletions),
}));

export const workoutCompletionsRelations = relations(workoutCompletions, ({ one }) => ({
  user: one(users, {
    fields: [workoutCompletions.userId],
    references: [users.id],
  }),
  workout: one(workouts, {
    fields: [workoutCompletions.workoutId],
    references: [workouts.id],
  }),
}));

export const savedRecipesRelations = relations(savedRecipes, ({ one }) => ({
  user: one(users, {
    fields: [savedRecipes.userId],
    references: [users.id],
  }),
  recipe: one(recipes, {
    fields: [savedRecipes.recipeId],
    references: [recipes.id],
  }),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

