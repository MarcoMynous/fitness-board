# Fitness Platform Documentation Pack

This pack is the implementation kickoff blueprint for the creator-led fitness platform.

- [Project brief](00-project-brief.md)
- [Flows and feature breakdown](01-flows-and-features.md)
- [Data and security outline](02-data-security.md)
- [Design direction](03-design-direction.md)
- [Roadmap and scope](04-roadmap-and-scope.md)
- [Repository and docs structure](05-repo-and-docs-structure.md)
- [Technical implementation plan](06-technical-implementation.md)

The authentication decision is explicit throughout: email magic link, single use and time limited, routing first-time users to onboarding and returning users to the dashboard.

The delivery model is also explicit: pnpm + Turborepo development, GitHub Actions CI, protected production-branch deployment, Drizzle migrations, and automatic production release after all checks pass.
