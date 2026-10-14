# Fitness Platform — Flows and Feature Breakdown

## Primary acquisition and access flow

```text
Social / referral
  → Landing page
  → Product selection
  → Checkout
  → Payment confirmation
  → Email receipt + sign-in link
  → Magic-link verification
  → Onboarding (first-time) OR dashboard (returning)
```

## Magic-link authentication flow

1. User enters the email used for purchase.
2. System normalizes the email and checks for an eligible account or pending purchase.
3. System sends a single-use, short-lived sign-in link.
4. User clicks the link from email.
5. Server validates token signature, expiry, audience, and unused status.
6. Token is consumed and a secure session is created.
7. If onboarding is incomplete, route to onboarding; otherwise route to the dashboard.
8. If no entitlement exists, show a clear purchase/access-help state rather than creating unrestricted access.

Security requirements: opaque token, one-time use, short expiry, rate-limited requests, generic request responses, secure cookie session, no sensitive data in the URL beyond the token, and audit logging for request/use/failure events.

## Onboarding

Keep onboarding short and useful:

- Welcome and method introduction.
- Name and preferred display name.
- Training goal and experience level.
- Equipment or home/gym preference, if relevant to programming.
- Dietary preferences or exclusions for recipe discovery.
- Optional baseline details for progress tracking.
- Notification preferences.
- Completion confirmation and recommended first action.

Members may skip optional questions and edit answers later in Profile.

## Member feature breakdown

### Home

- Personalized greeting and next recommended action.
- Continue training card.
- Featured recipe or cookbook shortcut.
- Current streak or completion summary.
- Access-aware empty states for unavailable products.

### Training

- Program overview.
- Week and session navigation.
- Workout detail: duration, equipment, exercises, instructions, media, modifications.
- Mark session complete.
- Resume last session.

### Cookbook

- Recipe categories and search/filter.
- Recipe detail: ingredients, steps, servings, prep time, nutrition fields if supplied.
- Save/favorite recipe.
- Access-aware locked states.

### Progress

- Completed workouts and activity history.
- Lightweight personal metrics and trend summaries.
- Streaks or milestones.
- Clear distinction between user-entered data and system-derived completion data.

### Profile

- Personal details.
- Fitness and dietary preferences.
- My access and purchase history summary.
- Notification preferences.
- Help/contact.
- Sign out.

## Admin feature breakdown

### Overview

- Revenue and payment summary.
- Active members and entitlement mix.
- Training/cookbook activity.
- Recent sign-ins, purchases, and operational alerts.

### Users

- Searchable/filterable table.
- User detail with profile, entitlements, payment summary, activity, and account status.
- Update profile metadata and access status.
- Grant/revoke access with reason and audit record.

### Payments

- Transactions, refunds, failed payments, and payment status.
- Filter by product, date, status, and customer.
- Link transaction to user and entitlement.

### Training and Cookbook

- Content list with draft/published/archived states.
- Create, edit, preview, publish, unpublish, archive, and delete where permitted.
- Training hierarchy: Program → Week → Workout → Exercise.
- Cookbook hierarchy: Collection/category → Recipe.
- Media upload references and validation.

### Activity

- Sign-ins, purchases, entitlement changes, content changes, and admin actions.
- Filter by user, event, date, and actor.

### Settings

- Admin profile and roles.
- Product pricing/configuration references.
- Email and notification settings.
- Business and support details.
