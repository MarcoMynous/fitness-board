# Fitness Platform — Project Brief

## Product summary

A mobile-first, paid fitness platform for a creator-led training and nutrition business. Social traffic drives visitors to a premium landing page, checkout creates paid access, and a magic-link sign-in takes each customer into onboarding or their member dashboard.

The product has two connected surfaces:

- **Member app:** Home, Training, Cookbook, Progress, Profile.
- **Admin app:** Overview, Users, Payments, Training, Cookbook, Activity, Settings.

The member experience should feel personal, editorial, and calm. The admin experience should be operational, searchable, and efficient.

## Target users

- **Prospective customer:** discovers the creator through social media and evaluates the offer.
- **Member:** buys Training, Cookbook, or both and consumes content on mobile.
- **Returning member:** resumes workouts, recipes, and progress with minimal friction.
- **Admin/operator:** manages customers, entitlements, payments, content, and activity without code.

## Business model

The initial offer has three purchasable access states:

| Product | Entitlement | Member experience |
|---|---|---|
| Training Only | `training` | Training content and progress tools |
| Cookbook Only | `cookbook` | Recipes and cookbook content |
| Bundle | `training` + `cookbook` | Full member experience |

Payment creates or updates entitlements. Content publication is separate from payment: an admin can update, publish, archive, or remove content while access rules determine who can view it.

## Product principles

1. **Creator-led, not generic SaaS:** the trainer’s voice, photography, and method are visible throughout.
2. **Simple access:** a member should always understand what they own and what to do next.
3. **Content first:** workouts and recipes are structured for repeat use, not just one-time reading.
4. **Operational clarity:** admins can answer “who has access, what did they buy, and what is happening?” quickly.
5. **Trust by default:** payments, authentication, and personal data are handled with clear states and safe defaults.

## Key assumptions

- A payment provider such as Stripe will be the system of record for checkout and payment events.
- Email is the primary identity; the email used at purchase is the sign-in email.
- The first release is web-based and responsive, with mobile as the primary usage context.
- Admin access is role-protected and separate from member access.
- Progress tracking starts with lightweight completion and personal metrics, not medical or clinical guidance.
