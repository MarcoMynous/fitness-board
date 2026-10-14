# Fitness Platform — Design Direction

## Design source of truth

Premium creator-led fitness editorial. The interface should feel warm, confident, tactile, and human—not like a generic dashboard or aggressive sports tracker.

## Research summary

The referenced Mobbin-inspired direction points to four useful patterns:

- **Member profiles:** keep settings and membership information simple and scannable.
- **Admin overview:** establish hierarchy with revenue/sales first, then activity and operational details.
- **User management:** searchable tables, status filters, and a focused user-detail view.
- **Content management:** list → create/edit → draft/published → archive/delete, with clear status and preview affordances.

These patterns should be adapted into the brand system rather than copied literally.

## Visual principles

- Use large trainer photography and editorial crop choices as primary storytelling assets.
- Favor generous whitespace, strong type hierarchy, and intentional rhythm.
- Keep member navigation calm and predictable.
- Let accent color signal action, selection, and progression—not decorate every surface.
- Make content cards feel like magazine modules, while admin tables remain dense and functional.

## Palette guidance

Use semantic tokens rather than hard-coded colors. Initial direction:

| Token | Guidance |
|---|---|
| `surface-base` | Warm off-white / cream |
| `surface-raised` | Soft white or light cream |
| `text-primary` | Charcoal / near-black |
| `accent-primary` | Deep burgundy |
| `accent-secondary` | Terracotta or burnt orange |
| `state-success` | Muted green |
| `state-warning` | Warm amber |
| `state-danger` | Restrained brick red |
| `border-subtle` | Warm gray with low contrast |

Use accessible contrast for text, controls, alerts, and focus states. Validate final hex values against WCAG targets before launch.

## Typography guidance

- Pair an expressive editorial display face for hero headings with a highly legible sans-serif for UI and body copy.
- Use the display face sparingly: hero statements, program titles, and key section moments.
- Use the sans-serif for navigation, forms, tables, metadata, and long reading.
- Define a responsive type scale with clear levels for display, page title, section title, body, label, and caption.

## Responsive behavior

- **Mobile:** bottom or compact primary navigation; single-column content; sticky contextual actions; large touch targets; editorial cards stack vertically.
- **Tablet:** two-column content where useful; persistent navigation may become a rail; admin tables can use horizontal scrolling or priority columns.
- **Web:** wider editorial compositions, split hero layouts, multi-column dashboards, and full admin table density.
- Preserve hierarchy and task completion across breakpoints; do not simply shrink desktop screens.

## UI architecture

Member shell: Home / Training / Cookbook / Progress / Profile.

Admin shell: Overview / Users / Payments / Training / Cookbook / Activity / Settings.

Shared foundations: buttons, inputs, cards, status badges, empty states, dialogs, toasts, tables, media blocks, and access gates.
