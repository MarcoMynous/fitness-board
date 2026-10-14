# Fitness Platform — Technical Implementation Plan

## Stack

- **Workspace:** pnpm workspaces with Turborepo task orchestration and caching.
- **Applications:** Next.js with TypeScript in `apps/web` and `apps/admin`.
- **UI:** Tailwind CSS with Radix primitives and branded components in `packages/ui`.
- **Database:** PostgreSQL with Drizzle ORM and versioned migrations.
- **Authentication:** Custom email magic links with secure sessions.
- **Payments:** Stripe Checkout and signed, idempotent webhooks.
- **Email:** Resend for receipts, magic links, and transactional notices.
- **Media:** S3-compatible object storage for trainer photography, workout media, and recipe assets.
- **Local services:** Docker Compose for PostgreSQL, Redis-compatible rate limiting, and optional supporting services.
- **Production:** Managed web hosting and managed data services by default; deployable Docker images remain available for portability.

## Monorepo conventions

```text
apps/web       # Member-facing Next.js application
apps/admin     # Admin Next.js application
packages/ui    # Shared Tailwind/Radix component system
packages/config # TypeScript, ESLint, Prettier, and shared tooling
packages/domain # Shared types, schemas, and access rules
packages/email  # Resend clients and email templates
services/auth   # Magic-link and session service logic
services/payments # Stripe checkout and webhook logic
database/       # Drizzle schema, migrations, and seed data
```

The root package scripts should expose consistent commands through Turborepo for `dev`, `lint`, `typecheck`, `test`, `build`, `db:generate`, `db:migrate`, and `db:seed`.

## Database and Drizzle workflow

PostgreSQL is the source of truth for users, profiles, products, payments, entitlements, content, sessions, magic-link records, progress, saved recipes, and audit events.

1. Define tables and relations in the database package.
2. Generate reviewed Drizzle migrations.
3. Apply migrations locally through Docker Compose.
4. Seed safe development products, content, and test accounts.
5. Run migrations in the protected production deployment job.
6. Keep migrations backward-compatible with the currently deployed application.

## Authentication implementation

The auth service should:

- accept the purchase email;
- normalize and rate-limit requests;
- create a random opaque token;
- store only a hash, expiry, request metadata, and consumed state;
- send the link through Resend;
- verify expiry, signature/context, and one-time-use state;
- consume the token atomically;
- create a secure session cookie;
- route incomplete accounts to onboarding and complete accounts to the dashboard.

Invalid, expired, reused, or rate-limited requests must return safe generic messaging and must not reveal whether an email exists.

## Payments and access

Stripe Checkout creates the payment. A verified webhook creates or updates the corresponding entitlement. Webhook handlers must be idempotent and safe to replay.

- Training Only grants `training` access.
- Cookbook Only grants `cookbook` access.
- Bundle grants both access types.
- Refunds, revocations, and expirations remove or suspend the affected access.
- Every entitlement change records its source and an audit event.
- Member routes and server actions enforce access independently of UI visibility.

## Docker development environment

Docker Compose should provide local PostgreSQL and a Redis-compatible service for rate limiting. Optional services may include a local object-storage emulator and email capture tool. Application containers should be buildable from production Dockerfiles, but managed hosting remains the default deployment target.

## CI/CD and GitHub

GitHub Actions should run `ci.yml` for pull requests and pushes to the protected production branch. Required checks are dependency installation with the frozen pnpm lockfile, linting, type checking, unit/integration tests, Turborepo builds, and relevant Docker image builds.

After a successful production-branch run, the deployment workflow should load GitHub Environment secrets, run approved Drizzle migrations, deploy the member and admin apps, run health checks, and preserve logs and artifacts on failure. Developers commit and push feature branches; merge to the protected production branch triggers production delivery.

## Acceptance scenarios

- Fresh clone installs with `pnpm install --frozen-lockfile`.
- Turborepo lint, typecheck, test, and build commands pass.
- Docker Compose starts local PostgreSQL and rate limiting services.
- Drizzle migrations and seed data apply successfully.
- Magic links work once, expire, reject reuse, and route correctly.
- Training Only, Cookbook Only, Bundle, revoked, refunded, and expired states enforce correctly.
- Stripe webhook replays do not duplicate payments or entitlements.
- Admin authorization and audit events are verified.
- Member and admin layouts work across mobile, tablet, and web breakpoints.
- Production builds and deployable Docker images complete successfully.
