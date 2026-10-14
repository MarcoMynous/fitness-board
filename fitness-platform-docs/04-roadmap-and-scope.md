# Fitness Platform — Roadmap and Scope

## Phase 0 — Alignment and foundations

- Confirm offer names, pricing, currency, refund policy, and launch geography.
- Confirm brand assets, photography rights, fonts, and final color tokens.
- Select payment, email, storage, analytics, and hosting providers.
- Define environment strategy, roles, audit requirements, and acceptance criteria.

## Phase 1 — Commerce and authentication

- Landing page and product selection.
- Checkout integration and payment confirmation.
- Customer record and entitlement creation via verified webhook.
- Magic-link request, email delivery, verification, session creation, and routing.
- Basic account recovery and support states.

## Phase 2 — Member V1

- Onboarding.
- Member shell and responsive navigation.
- Home dashboard.
- Training program browsing, workout detail, and completion.
- Cookbook browsing, recipe detail, and saved recipes.
- Profile and access display.

## Phase 3 — Admin V1

- Admin authentication and role protection.
- Overview metrics.
- User search/detail and entitlement management.
- Payment list/detail.
- Training and cookbook CRUD with draft/published/archive states.
- Activity/audit view.

## Phase 4 — Progress and polish

- Progress history and lightweight metrics.
- Analytics instrumentation and funnel reporting.
- Accessibility, performance, responsive QA, content migration, and launch hardening.

## Phase 5 — CI/CD and production delivery

- Add GitHub Actions workflows under `.github/workflows/`.
- Run install, lint, typecheck, unit tests, and production builds on pull requests.
- Run the same quality gates on pushes to the production branch.
- Deploy the latest passing production branch automatically to the managed hosting provider.
- Run database migrations as an explicit, logged deployment step before or during release.
- Upload build and test artifacts for failed runs.
- Protect the production branch and require passing checks before merge.
- Keep deployment credentials in GitHub Environments and repository secrets, never in the repository.

## V1 scope

V1 is complete when a customer can buy Training, Cookbook, or Bundle; receive and use a magic link; complete onboarding; access the correct member content; complete workouts; browse recipes; and manage their profile. An admin can view business/user/payment activity, manage access, and publish or update training and cookbook content.

## Out of scope for V1

- Native iOS/Android apps.
- Live coaching, chat, community feeds, or direct messaging.
- Automated meal plans or medical/nutritional diagnosis.
- Wearable integrations and advanced biometric dashboards.
- Complex referral/affiliate systems.
- Multi-creator marketplace or multi-tenant organizations.
- Fully automated personalized programming.
- Advanced cohort, subscription, or localization requirements unless confirmed during Phase 0.

## Production release workflow

```text
Developer changes code
  → git add / commit
  → git push feature branch
  → pull request checks run
  → review and merge to production branch
  → production checks run
  → database migration step
  → deploy web and admin apps
  → smoke checks and deployment notification
```

The workflow should deploy from the protected production branch rather than from arbitrary local machines. A manual workflow dispatch may be retained as an emergency redeploy path, protected by environment approval.
