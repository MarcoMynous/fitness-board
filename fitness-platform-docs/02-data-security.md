# Fitness Platform — Data and Security Outline

## High-level data model

```text
User
 ├─ Profile
 ├─ OnboardingResponse[]
 ├─ Entitlement[] ── Product
 ├─ Payment[]
 ├─ Session[] / MagicLinkToken[]
 ├─ WorkoutCompletion[] ── Workout
 ├─ ProgressEntry[]
 └─ SavedRecipe[] ── Recipe

Program ── Week[] ── Workout ── Exercise[]
CookbookCollection ── Recipe
AdminUser ── AuditEvent[]
```

## Core entities

- **User:** id, email, status, role, createdAt, lastSeenAt.
- **Profile:** name, preferences, goals, equipment, dietary information.
- **Product:** training, cookbook, or bundle; price and external provider reference.
- **Entitlement:** user, product/access type, status, source, startsAt, endsAt, revokedAt.
- **Payment:** provider ids, amount, currency, status, product, user, timestamps.
- **MagicLinkToken:** hashed token, user/email reference, expiry, consumedAt, request metadata.
- **Content:** title, slug, description, media, status, version metadata, publishedAt.
- **AuditEvent:** actor, action, target, before/after summary, timestamp.

## Access rules

- Training content requires an active `training` entitlement or an active Bundle entitlement.
- Cookbook content requires an active `cookbook` entitlement or an active Bundle entitlement.
- Admin actions require an admin role and should be checked server-side.
- Revoked, refunded, or expired access must be reflected consistently across member routes and APIs.

## Security baseline

- Use provider-hosted or provider-compliant checkout where possible; never store raw card data.
- Hash magic-link tokens at rest and consume them atomically.
- Rate-limit magic-link requests and admin authentication attempts.
- Use secure, HttpOnly, SameSite session cookies and CSRF protection where applicable.
- Validate authorization on every protected server action, not only in navigation.
- Minimize sensitive profile data; document retention and deletion behavior.
- Keep immutable audit records for entitlement and admin content changes.
- Verify payment webhooks with signatures and make handlers idempotent.
- Provide clear account, access, refund, and support states.
