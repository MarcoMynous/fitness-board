# Fitness Platform — Recommended Repository and Documentation Structure

```text
fitness-platform/
├─ .github/
│  └─ workflows/
│     ├─ ci.yml             # PR and production quality gates
│     └─ deploy-production.yml # production deployment workflow
├─ apps/
│  ├─ web/                 # member-facing web app
│  └─ admin/               # admin app or protected admin area
├─ packages/
│  ├─ ui/                  # shared components and design tokens
│  ├─ domain/              # entities, access rules, validation
│  ├─ email/               # templates and email delivery helpers
│  └─ config/              # shared lint, TypeScript, and environment config
├─ services/
│  ├─ payments/            # checkout and webhook handlers
│  ├─ auth/                # magic-link and session logic
│  └─ media/               # image/video storage abstractions
├─ database/
│  ├─ schema/
│  ├─ migrations/
│  └─ seed/
├─ docs/
│  ├─ 00-project-brief.md
│  ├─ 01-flows-and-features.md
│  ├─ 02-data-security.md
│  ├─ 03-design-direction.md
│  ├─ 04-roadmap-and-scope.md
│  ├─ 05-repo-and-docs-structure.md
│  ├─ decisions/           # ADRs
│  ├─ content/             # content model and migration notes
│  └─ runbooks/            # deploy, webhook, support, incident notes
├─ tests/
│  ├─ unit/
│  ├─ integration/
│  └─ e2e/
└─ README.md
```

## CI/CD contract

The repository should include a GitHub Actions `ci.yml` workflow with these jobs:

1. **Validate:** install dependencies with the locked pnpm version and frozen lockfile.
2. **Quality:** run formatting checks, ESLint, and TypeScript type checking.
3. **Test:** run unit and integration tests against disposable service containers where required.
4. **Build:** build both Next.js applications through Turborepo.
5. **Container check:** build Docker images when Dockerfiles are changed or when the production workflow requires them.

Pull requests must complete the validation, quality, test, and build jobs before merge.

Production deployment should run on pushes to the protected `production` branch after the same checks pass. The deployment job should:

- load secrets from the GitHub `production` Environment;
- run the approved Drizzle migration command;
- deploy the member and admin applications;
- run post-deploy health checks;
- fail visibly and preserve logs if any step fails.

Recommended GitHub secrets/configuration:

- `DATABASE_URL`
- `AUTH_SECRET`
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASSWORD`, `EMAIL_FROM`
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`
- `PAYSTACK_SECRET_KEY`, `PAYSTACK_PUBLIC_KEY`
- `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`
- `S3_ENDPOINT`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`, `S3_BUCKET`
- hosting-provider deployment token and project identifiers

Secrets must be environment-scoped, rotated periodically, and excluded from build logs. Production migrations must be backward-compatible with the currently deployed application so a failed app deployment does not leave the database unusable.

## GitHub commit and push workflow

```bash
pnpm install --frozen-lockfile
pnpm turbo lint typecheck test build
git add .
git commit -m "describe the change"
git push origin feature/short-description
```

After review and merge, GitHub Actions deploys the latest production branch automatically. Direct pushes to the production branch should be disabled unless explicitly needed for an emergency procedure.

## Documentation conventions

- Keep product behavior in docs, not only in tickets.
- Record meaningful technical choices as short ADRs.
- Treat access rules and magic-link behavior as contract-level documentation.
- Add acceptance criteria to feature tickets using the flows in this pack.
- Keep content schemas versioned and migration notes close to the schema.

## Immediate kickoff checklist

1. Confirm Phase 0 decisions and write the first ADRs.
2. Turn the V1 scope into epics for commerce/auth, member, admin, and launch quality.
3. Establish the design tokens and shared UI shell.
4. Define the database schema and webhook idempotency strategy.
5. Build the magic-link vertical slice end to end before expanding content features.
