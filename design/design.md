# The Method — Design System & Visual Identity
**Version:** 1.0.0  
**Context:** Premium Mobile-First Creator Fitness & Nutrition Platform (Nigeria)  
**Reference Specification:** Stitch UI Project `17430550125314011408` / Screen `10138282035650308138`

---

## 1. Executive Summary & Brand Purpose

**The Method** is an influencer-led, high-touch fitness transformation and nutritional mastery platform targeted primarily at modern, ambitious women in Nigeria and the diaspora.

The brand bridges the gap between high-fashion editorial aesthetics, athletic capability, and culinary indulgence. It rejects the cliché tropes of the fitness industry — no neon gym lighting, no aggressive bodybuilding jargon, no cartoonish pastel pink palettes, and no generic enterprise SaaS grids.

### The Visual Blend
```text
┌────────────────────────────────────────────────────────┐
│               THE METHOD BRAND ESSENCE                 │
│                                                        │
│  [High-End Editorial]   +   [Creator Authenticity]     │
│  Vogue / Kinfolk warmth      Unfiltered Nigerian coach │
│                                                        │
│  [Clean Digital Utility] +  [High-Protein Gastronomy]  │
│  Frictionless PWA UX         Gourmet West African/Intl │
└────────────────────────────────────────────────────────┘
```

### What The Brand Is:
* **Personal & Confident:** Anchored directly in the female trainer's presence, authority, and lived experience.
* **Energetic & Empowering:** Focused on strength, joint longevity, metabolic vitality, and posture rather than guilt or rapid starvation.
* **Grounded & Warm:** Earthy terracotta, deep forest green, and creamy off-white that feel luxurious and organic.
* **Culturally Attuned:** Designed for Nigerian everyday reality (home/gym flexibility, local staples like plantain, eggs, fish, beef, Paystack-first payments, mobile data efficiency).

### What The Brand Is NOT:
* ❌ **Not a generic SaaS dashboard** (no blue tables, tiny dense metric tiles, or corporate iconography).
* ❌ **Not a bodybuilding/powerlifting site** (no black-and-red skull motifs, chalk dust, or aggressive military phrasing).
* ❌ **Not an overly feminized pink brand** (no bubblegum pink, glitter, or patronizing "bikini body" reductionism).
* ❌ **Not a cheap course marketplace** (no countdown timer pressure tactics or low-res video embeds).
* ❌ **Not a medical/clinical portal** (no sterile hospital whites or cold pharmaceutical charts).

---

## 2. Color Architecture & Tokens

The palette is derived directly from the **Stitch Visual Specification**, balancing warm earth tones, deep organic greens, and high-contrast charcoal typography over a luminous cream canvas.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        CORE COLOR PALETTE                              │
├─────────────────┬──────────────────┬─────────────────┬─────────────────┤
│ Primary Accent  │ Secondary Accent │ Tertiary Accent │ Base Dark       │
│ #C25E3E         │ #2B4036          │ #6E7F73         │ #1C1A18         │
│ Terracotta Rust │ Deep Pine Forest │ Muted Sage      │ Obsidian Neutral│
└─────────────────┴──────────────────┴─────────────────┴─────────────────┘
```

### Detailed Token Palette

| Token Name | Hex Code | HSL Value | Role & Usage |
| :--- | :--- | :--- | :--- |
| **`color-primary`** | `#C25E3E` | `hsl(14, 53%, 50%)` | Primary CTA buttons, brand badges, active tab underlines, key metric highlights. |
| **`color-primary-hover`** | `#A84E32` | `hsl(14, 54%, 43%)` | Hover/active states on primary actions. |
| **`color-primary-subtle`** | `#F9EDE8` | `hsl(16, 62%, 95%)` | Soft tinted backgrounds, highlight tags, notification pills. |
| **`color-secondary`** | `#2B4036` | `hsl(150, 20%, 21%)` | Contrast dark sections, workout completion states, secondary badges, hero accents. |
| **`color-secondary-subtle`**| `#E8ECE9` | `hsl(135, 10%, 92%)` | Soft green tint for completed workout pills and check-in success states. |
| **`color-tertiary`** | `#6E7F73` | `hsl(136, 8%, 47%)` | Subdued borders, secondary icons, metadata badges, subtle illustrations. |
| **`color-neutral-dark`** | `#1C1A18` | `hsl(30, 8%, 10%)` | Primary body typography, major headlines, inverted dark cards. |
| **`color-neutral-muted`**| `#635F5B` | `hsl(30, 4%, 37%)` | Secondary body text, captions, timestamps, prescription cues. |
| **`color-neutral-border`**| `#E7E2DA` | `hsl(38, 20%, 88%)` | Elegant hairline dividers, input borders, card outlines. |
| **`color-surface-base`** | `#FAF8F5` | `hsl(36, 33%, 97%)` | Primary page canvas (warm luminous cream/off-white). |
| **`color-surface-card`** | `#FFFFFF` | `hsl(0, 0%, 100%)` | Elevated content surfaces, form cards, dialog surfaces. |
| **`color-surface-sunken`**| `#F3EFEA` | `hsl(36, 23%, 94%)` | Input wells, tab switcher containers, recipe macro strips. |
| **`color-state-success`** | `#2B4036` | `hsl(150, 20%, 21%)` | Muted deep green for positive streaks, completed check-ins. |
| **`color-state-alert`** | `#9E2A2B` | `hsl(359, 58%, 39%)` | Deep wine red for validation alerts, expired links (never neon red). |

---

## 3. Typography Hierarchy

The typographic system creates an immediate editorial distinction between **high-fashion authority** and **frictionless digital readability**.

```
Headline Display Font:   Bodoni Moda        (Serif, High-Contrast, Expressive)
Body & Interface Font:   Plus Jakarta Sans  (Geometric Sans, High Legibility, Warm)
Technical Cues / Code:   JetBrains Mono     (Sets, Reps, Tempos, Macro Numbers)
```

### Font Pairings & Scales

| Level | Typeface | Weight | Size (Desktop) | Size (Mobile) | Line Height | Tracking |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Display 1 (Hero)** | Bodoni Moda | SemiBold (600) | `56px – 64px` | `38px – 44px` | `1.08` | `-0.025em` |
| **Display 2 (Section)**| Bodoni Moda | Medium (500) | `36px – 42px` | `28px – 32px` | `1.15` | `-0.02em` |
| **Headline 3 (Card)** | Bodoni Moda | Bold (700) | `24px – 28px` | `20px – 22px` | `1.25` | `-0.015em` |
| **Eyebrow / Badge** | Plus Jakarta Sans | Bold (700) | `11px – 12px` | `10px – 11px` | `1.0` | `+0.08em (Caps)` |
| **Body Large** | Plus Jakarta Sans | Regular (400) | `18px – 20px` | `16px – 17px` | `1.6` | `-0.01em` |
| **Body Default** | Plus Jakarta Sans | Regular (400) | `15px – 16px` | `14px – 15px` | `1.55` | `0` |
| **Body Bold / UI** | Plus Jakarta Sans | SemiBold (600) | `14px – 15px` | `13px – 14px` | `1.4` | `0` |
| **Caption / Meta** | Plus Jakarta Sans | Medium (500) | `12px – 13px` | `11px – 12px` | `1.45` | `+0.01em` |
| **Prescription / Cues**| Plus Jakarta Sans / Mono | Medium (500) | `12px – 13px` | `11px – 12px` | `1.3` | `+0.02em` |

### Typographic Rules:
1. **Never use italicized sans-serif for slogans.** Italic emphasis is reserved exclusively for select evocative words in Bodoni Moda (e.g., *"Fuel with Precision"*).
2. **High contrast:** Never place low-contrast grey text over cream. Ensure all body copy achieves at least `5.2:1` contrast against `#FAF8F5`.
3. **Restraint in hierarchy:** A single screen should never have more than 3 typographic scales visible at once.

---

## 4. Spacing & Layout Architecture

### Responsive Container Constraints
* **Max Desktop Content Width:** `1200px` (standard) / `1360px` (editorial hero photography).
* **Tablet Width:** `768px – 1024px` with `32px` gutter padding.
* **Mobile Viewport:** `375px – 430px` with `16px – 20px` gutter padding.
* **Touch Target Minimum:** `48px × 48px` on all interactive buttons and inputs.

### 8-Point Spatial Scale
```css
--space-1:   4px;   /* Micro spacing, badge icon gap */
--space-2:   8px;   /* Gap between related text items */
--space-3:  12px;   /* Internal card element gap */
--space-4:  16px;   /* Standard card padding (mobile) */
--space-6:  24px;   /* Standard card padding (desktop) */
--space-8:  32px;   /* Distance between related content blocks */
--space-12: 48px;   /* Section padding (mobile) */
--space-16: 64px;   /* Section padding (desktop) */
--space-24: 96px;   /* Hero and landmark section breathing room */
```

### Layout Characteristics
* **Generous Negative Space:** Sections must breathe. Avoid stacking dense rows of cards. One compelling idea per scroll.
* **Asymmetry:** Pair large vertical photography (4:5 or 3:4 aspect ratio) with offset editorial typographic blocks.
* **No Endless Grids:** Break content into narrative chapters (e.g., *Phase 1: Kinetic Power* $\rightarrow$ *The Culinary Formula* $\rightarrow$ *Member Outcomes*).

---

## 5. Photography & Creative Art Direction

Photography is the primary emotional driver of conversion. The female coach/creator must feel real, present, authoritative, and aspirational.

```
┌─────────────────────────────────────────────────────────┐
│              PHOTOGRAPHY PILLARS                        │
├──────────────────────────┬──────────────────────────────┤
│ 1. Trainer Presence      │ Confident, athletic, joyful  │
│ 2. Natural Skin Tones    │ Warm, authentic, non-plastic │
│ 3. Form & Movement       │ Biomechanical intentionality │
│ 4. Gastronomy / Food     │ Fresh, vibrant, high-protein │
└──────────────────────────┴──────────────────────────────┘
```

### 1. Trainer & Lifestyle Imagery
* **Authenticity over Studio Plasticity:** Shoot in natural, directional lighting. Sweat should look authentic, not sprayed with baby oil.
* **Confident Posture:** Capture compound lifts (deadlift lockout, hip thrusts, dumbbell rows) and athletic agility rather than passive posing.
* **Skin & Diversity:** Natural skin textures with warm golden undertones celebrating African beauty standards. Never airbrush skin into blurred plastic.
* **Attire:** High-quality, minimalist athletic wear in monochrome earth tones (terracotta, deep pine, slate, off-white). No loud corporate brand logos.

### 2. Culinary & Nutrition Imagery
* **Plated Abundance:** High-protein meals must look appetizing, rich, and deeply satisfying — never like dry, depressing bodybuilder chicken and boiled broccoli.
* **Natural Props:** Cast iron skillets, rustic ceramic bowls, fresh lime halves, chopped cilantro, olive oil drizzles, charred grill marks.
* **Macro Honesty:** Show real portions calibrated to 40g–55g of protein per dish.

---

## 6. Component Style Guide

### 1. Buttons & Touch Targets
* **Primary Button:**
  - Background: `#C25E3E` (Terracotta Rust).
  - Text: `#FFFFFF` (White, Bold `15px`).
  - Radius: `12px` (Soft rounded corner).
  - Height: `52px` on mobile for thumb reach.
  - Hover: Darker rust `#A84E32` with gentle tactile shadow (`0 4px 14px rgba(194, 94, 62, 0.25)`).
* **Secondary / Outlined Button:**
  - Border: `1px solid #E7E2DA`.
  - Background: `#FFFFFF` or `transparent`.
  - Text: `#1C1A18`.
  - Hover: Subtle `#F3EFEA` tint.
* **Inverted / Dark Button:**
  - Background: `#1C1A18` (Obsidian Charcoal).
  - Text: `#FFFFFF`.
  - Usage: Special high-emphasis actions (e.g., *Check In Now*, *Complete Workout*).

### 2. Cards & Containers
* **Border:** `1px solid #E7E2DA` (hairline neutral).
* **Background:** Pure `#FFFFFF` resting on `#FAF8F5` surface.
* **Border Radius:** `16px – 20px` (`rounded-2xl`). Never harsh sharp corners; never pill-shaped blobs.
* **Shadows:** Minimalist tactile elevation:
  ```css
  box-shadow: 0 1px 3px rgba(28, 26, 24, 0.04), 0 6px 16px rgba(28, 26, 24, 0.03);
  ```
* **Card Anatomy:** Large hero visual top (or video player preview), followed by generous interior padding (`20px – 24px`), bold Bodoni header, prescription metadata, and single primary action.

### 3. Inputs & Forms
* **Input Wells:** Soft neutral background (`#FFFFFF` with `#E7E2DA` border).
* **Focus State:** Solid `1.5px` border in `#C25E3E` with `0 0 0 3px rgba(194, 94, 62, 0.12)`.
* **Touch Dimensions:** `50px` input height, minimum `16px` font size to prevent iOS Safari auto-zoom.

### 4. Progress Bars & Metric Rings
* **Track:** Soft sunken neutral `#E8ECE9`.
* **Indicator:** Deep pine `#2B4036` (steady discipline) or Terracotta `#C25E3E` (intense volume).
* **Stroke:** Clean geometric solid lines (no skeuomorphic bevels or rainbow gradients).

### 5. Badges & Micro-Labels
* **Terracotta Badge:** `#F9EDE8` background with `#C25E3E` bold uppercase text.
* **Pine Badge:** `#E8ECE9` background with `#2B4036` bold uppercase text.
* **Border:** Micro `0.5px` border in matching tone.

---

## 7. Product Previews & Dashboard Architecture

When presenting the digital platform on landing pages and onboarding flows:
1. **Show Real Content:** Never use lorem ipsum or stock fitness quotes. Display real Nigerian-tailored meals (e.g., *Peppered Beef & Sweet Potato Medley*, *Chimichurri Flank Steak*) and actual workouts (e.g., *Day 1: Glute & Posterior Chain Hypertrophy*).
2. **Device Frames:** Showcase the product inside clean, modern mobile frames (slim bezel iPhone mockups) with natural drop shadows.
3. **Sticky Mobile Action:** On mobile landing pages, once the hero scrolls out of view, a compact bottom floating bar emerges:
   ```text
   [ ₦65,000 / Lifetime Access  |  Join The Method → ]
   ```

---

## 8. Motion & Micro-Interactions

Motion must feel organic, deliberate, and calm — never erratic or game-like.

| Trigger | Animation Type | Duration | Easing |
| :--- | :--- | :--- | :--- |
| **Page / Section Reveal** | Fade in + `12px` Y-axis rise | `500ms` | `cubic-bezier(0.16, 1, 0.3, 1)` |
| **Card Hover (Desktop)** | Subtle `Y: -3px` + elevation shadow | `240ms` | `ease-out` |
| **Tab / Pill Switch** | Sliding background capsule | `200ms` | `cubic-bezier(0.2, 0, 0, 1)` |
| **Workout Complete** | Checkmark stroke draw + green pulse | `400ms` | `ease-in-out` |
| **Accordion Expand** | Height auto reveal with opacity fade | `220ms` | `ease-out` |

---

## 9. Responsive Breakpoints

```text
Mobile First (Default)  ───►  Tablet (768px+)  ───►  Desktop (1024px+)  ───►  Wide (1280px+)
[375px - 430px core]          [2-col cards]           [Full editorial grid]    [1360px max bound]
```

### Mobile Rules (`< 768px`):
* Single-column flow with full-bleed imagery where appropriate.
* Sticky navigation header: Logo, small currency selector, direct "Sign In" or "Join" CTA.
* Bottom navigation bar for logged-in members (Home, Training, Kitchen, Progress, Profile) with active terracotta indicator pill.
* Zero horizontal scroll under any condition.

### Desktop Rules (`≥ 1024px`):
* Generous two-column hero: Left editorial manifesto + pricing, Right prominent vertical trainer portrait.
* Alternating storytelling sections (Image Left / Text Right, then Text Left / Image Right).
* Maximum content width restricted to `1200px` for optimal typographic line-length readability (60–75 characters per line).

---

## 10. Accessibility (a11y) & Performance Rules

1. **Color Contrast:** All body text (`#1C1A18`) against background (`#FAF8F5`) must exceed WCAG AAA (`14.2:1`). Terracotta buttons (`#C25E3E` with `#FFFFFF` text) achieve `4.6:1` (WCAG AA).
2. **Accessible Tap Targets:** Every interactive button, tab, and card link must be at least `48px` tall and `48px` wide on mobile viewports.
3. **Form Semantics:** All inputs include programmatic `<label>` associations, `aria-describedby` error announcements, and clear error states.
4. **Fast Mobile Payloads:**
   - WebP / AVIF image formats served via Cloudflare R2 with explicit `srcset` and responsive widths.
   - Preload critical Bodoni Moda and Plus Jakarta Sans woff2 fonts.
   - Total first-load mobile bundle `< 130 kB`.

---

## 11. Design System Do's & Don'ts

### DO:
* ✅ **DO** make the trainer the central visual authority and human touchpoint throughout the journey.
* ✅ **DO** use Bodoni Moda for headlines to evoke luxury editorial prestige.
* ✅ **DO** use warm terracotta (`#C25E3E`) as the single commanding call-to-action color.
* ✅ **DO** showcase high-protein meals with rich, natural photography that women genuinely look forward to eating.
* ✅ **DO** provide both NGN (₦) and USD ($) pricing clarity with transparent Paystack payment badges.

### DON'T:
* ❌ **DON'T** use hot pink, baby pink, or pastel purple; it devalues the seriousness of strength training.
* ❌ **DON'T** use dark neon gym themes (black background with lime green / electric blue).
* ❌ **DON'T** crowd the screen with ten competing badges, timers, or pop-up discount banners.
* ❌ **DON'T** use generic stock photos of disconnected fitness models.
* ❌ **DON'T** build dense SaaS data tables; replace them with mobile-first card feeds and clean metric rings.

---

## 12. Implementation Token Reference (Tailwind CSS)

```javascript
// tailwind.config.js snippet
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          terracotta: '#C25E3E', // Primary accent
          'terracotta-hover': '#A84E32',
          'terracotta-subtle': '#F9EDE8',
          pine: '#2B4036',       // Secondary deep green
          'pine-subtle': '#E8ECE9',
          sage: '#6E7F73',       // Tertiary muted accent
          burgundy: '#6B1728',   // Legacy warm burgundy
        },
        stone: {
          primary: '#1C1A18',    // Deep obsidian body/headings
          secondary: '#635F5B',  // Subdued captions & cues
          border: '#E7E2DA',     // Elegant hairline borders
          sunken: '#F3EFEA',     // Input & well backgrounds
        },
        surface: {
          base: '#FAF8F5',       // Primary warm cream canvas
          card: '#FFFFFF',       // Elevated clean white card
          sunken: '#F3EFEA',     // Soft well
        },
      },
      fontFamily: {
        serif: ['var(--font-bodoni)', 'Bodoni Moda', 'Didot', 'serif'],
        sans: ['var(--font-jakarta)', 'Plus Jakarta Sans', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '24px',
      },
      boxShadow: {
        'tactile-sm': '0 1px 3px rgba(28, 26, 24, 0.04)',
        'tactile': '0 4px 12px rgba(28, 26, 24, 0.05)',
        'tactile-lg': '0 8px 24px rgba(28, 26, 24, 0.07)',
      },
    },
  },
};
```
