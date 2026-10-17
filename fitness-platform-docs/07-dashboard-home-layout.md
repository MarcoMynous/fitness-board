# Kinfolk & Core — Member Sanctuary Dashboard (Home Page) Specification

> **Document Version**: 1.0  
> **Status**: Approved Architectural Blueprint  
> **Target Path**: `/home` (`apps/web/src/app/(member)/home/page.tsx`)  
> **Theme Palette**: Canvas Cream (`#FAF7F2`), Warm Oat (`#F2EDE4`), Terracotta Accent (`#9a4023`), Sage Green (`#4d6358`), Deep Charcoal (`#1d1b19`)

---

## 1. Design Philosophy: The 3-Second Rule

The member home screen is **not** an analytical SaaS dashboard or data warehouse. It is a **Daily Morning Sanctuary & Action Center** for the contemporary African and diaspora woman.

When a member opens the app, they must instantly receive answers to three intuitive questions without cognitive load:
1. **"What is my movement today?"** → A prominent, 1-tap card to start today's workout.
2. **"What am I eating today?"** → Curated, high-protein Nigerian whole-food fuel.
3. **"Am I on track?"** → A visual 7-day consistency rhythm bar (rewarding adherence, not punishing gaps).

---

## 2. High-Level ASCII Wireframe & Spatial Architecture

```
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│  SLIDING LUXURY SIDEBAR (288px)   │  TOP BAR: Mobile Menu Button • Greeting • Notifications • Profile   │
│                                   ├────────────────────────────────────────────────────────────────────┤
│  [K] Kinfolk & Core               │  CURRENT CYCLE STATUS STRIP                                        │
│      Sanctuary                    │  Week 3 of 8 • Primary Target: Lean Functional Strength  [On Track]│
│                                   ├───────────────────────────────────┬────────────────────────────────┤
│  • Home         (Active)          │  LEFT COLUMN (7 cols / 58%)       │  RIGHT COLUMN (5 cols / 42%)   │
│  • Training                       │                                   │                                │
│  • Cookbook                       │  ┌─────────────────────────────┐  │  ┌──────────────────────────┐  │
│  • Progress                       │  │ ① TODAY'S HERO WORKOUT CARD  │  │  │ ④ YOUR TRANSFORMATION    │  │
│  • Profile                        │  │                             │  │  │    METRICS CAPSULE       │  │
│                                   │  │ [Coach Tolu]  Lower Body    │  │  │    74.6 kg (-3.4 kg)     │  │
│  ───────────────────────────────  │  │ Photo Frame   Sculpt        │  │  │    [SVG Trend Curve]     │  │
│  [Coach Tolu Audio Note Widget]   │  │ 38 mins       4 Exercises   │  │  │    Water • Protein • Day │  │
│  Active Cycle 04 • Lagos Studio   │  │                             │  │  └──────────────────────────┘  │
│                                   │  │ [ START WORKOUT NOW → ]     │  │                                │
│  ───────────────────────────────  │  └─────────────────────────────┘  │  ┌──────────────────────────┐  │
│  [Amaka Vance] (Member Avatar)    │                                   │  │ ⑤ COACH TOLU AUDIO NOTE  │  │
│  Sign Out                         │  ┌─────────────────────────────┐  │  │    & MORNING INTENTION   │  │
│                                   │  │ ② 7-DAY CONSISTENCY RHYTHM  │  │  │    "Don't disappear on   │  │
│                                   │  │ [M] [T] [W] [T] [F] [S] [S] │  │  │     yourself today..."   │  │
│                                   │  │  ✓   ✓  TODAY •   •   •  🧘 │  │  │    [▶ Play Note 0:48]    │  │
│                                   │  └─────────────────────────────┘  │  └──────────────────────────┘  │
│                                   │                                   │                                │
│                                   │  ┌─────────────────────────────┐  │  ┌──────────────────────────┐  │
│                                   │  │ ③ FROM THE KINFOLK KITCHEN  │  │  │ ⑥ LAGOS KINFOLK CIRCLE  │  │
│                                   │  │                             │  │  │    COMMUNITY SNIPPET     │  │
│                                   │  │ [Suya Salmon] [Jollof Bowl] │  │  │    "Lekki run club sat?" │  │
│                                   │  │  38g Protein   42g Protein  │  │  │    [Join Community →]    │  │
│                                   │  └─────────────────────────────┘  │  └──────────────────────────┘  │
└───────────────────────────────────┴───────────────────────────────────┴────────────────────────────────┘
```

---

## 3. Detailed Component Breakdown

### Section 1: Cycle & Target Status Strip
* **Context**: Sits at the top of the main viewport.
* **Content**:
  * Phase Tracker: `Current Cycle • Phase 1`
  * Heading: `Week 3 of 8` (Cormorant Garamond, bold uppercase)
  * Biometric Goal: Pulled dynamically from user onboarding (e.g. `Lean Functional Strength & Core Re-alignment`)
  * Adherence Pill: Soft sage green badge `✓ Program On Track`
  * Community Notice: `Community Check-in • Sundays 18:00 WAT`

---

### Section 2: Today's Hero Workout Card (Primary Action)
* **Goal**: The most prominent focal point on the page. Eliminates hesitation.
* **Layout**: 2-column split card inside a warm oat container (`#F2EDE4`):
  * **Media Frame (Left)**: High-fashion editorial photography of Coach Tolu in the studio (`/images/coach-tolu-workout.jpg`) with gradient shadow and *“Led by Coach Tolu”* tag.
  * **Session Breakdown (Right)**:
    * Title: `Lower Body Sculpt`
    * Tags: `6 exercises` • `38 minutes` • `High burn & glutes`
    * Exercise List:
      * 1. Tempo Goblet Squats (4 × 12)
      * 2. B-Stance RDLs (3 × 10/side)
      * 3. Elevated Glute Bridge (4 × 15)
      * 4. Lateral Lunge Pulse (3 × 12)
    * Equipment Indicator: `Mat + 2× 8kg–12kg Dumbbells` (calibrated to their onboarding equipment).
  * **Action Footer**:
    * Primary CTA: `START WORKOUT →` (Terracotta `#9a4023`, direct launch into training player).
    * Secondary Link: `Preview Routine & Warm-up Guide`.

---

### Section 3: 7-Day Consistency Rhythm Bar
* **Goal**: Replaces overwhelming monthly calendar grids with an actionable, immediate weekly view.
* **Display**:
  * Status header: `3 of 4 Sessions Completed This Week`
  * 7 Day Pills (Monday to Sunday):
    * **Completed Days**: Clean checkmark in soft sage (`#cde5d7` bg, `#4d6358` icon).
    * **Today (Active)**: Deep Terracotta fill (`#9a4023`) with bold white `TODAY` indicator.
    * **Upcoming Days**: Neutral warm white pill with subtle dot.
    * **Rest Day (Sunday)**: Calming sage tint with `🧘🏽‍♀️ Rest` icon.

---

### Section 4: "From The Kinfolk Kitchen" (Daily Nutrition)
* **Goal**: Showcases authentic, high-protein Nigerian recipes so members fuel properly without boring boiled chicken and broccoli.
* **Display**: 2 featured recipe cards:
  1. **Grilled Chicken Brown Jollof Bowl**:
     * Photo: Smoky grilled chicken, brown jollof rice, plantain dodo (`/images/jollof-bowl.jpg`).
     * Macro Badge: `42g Protein` • `Dinner • High Fibre`
     * Prep Time: `25 Mins`
  2. **Suya Spiced Salmon & Plantain Mash**:
     * Photo: Atlantic salmon with yaji spice crust and sweet plantain mash (`/images/suya-salmon.jpg`).
     * Macro Badge: `38g Protein` • `Lunch • Rapid Recovery`
     * Prep Time: `20 Mins`
  * **Direct Link**: `Explore All 45+ Recipes →` (Routes to `/cookbook`).

---

### Section 5: Your Transformation Metrics Capsule
* **Goal**: Celebrate non-scale victories and physical transformation without obsession.
* **Components**:
  * **Weight Stat**: Current Weight `74.6 kg` with badge `-3.4 kg total`.
  * **SVG Trend Curve**: A smooth terracotta bezier curve showing progression from Day 1 to Today.
  * **3 Daily Micro-Habits**:
    * Water: `2.4L / 3.0L Goal`
    * Protein: `115g / 130g (88% Hit)`
    * Streak: `14 Days Unbroken`
  * **Quick Action**: `Log Daily Weight` (direct link to `/progress`).

---

### Section 6: Coach Tolu’s Intentional Guidance & Voice Note
* **Goal**: Creates the feeling of private 1-on-1 celebrity coaching.
* **Components**:
  * Coach avatar & byline: `Coach Tolu • Head Coach, Lagos Studio`.
  * Personalized daily quote: *“Don’t chase perfect workouts, Amaka. Just don’t disappear on yourself. Show up on the mat today and let momentum do the rest.”*
  * **Interactive Morning Audio Note**:
    * Play button + `0:48 • Mental Prep & Alignment`
    * Animated sound waveform.

---

### Section 7: Lagos Kinfolk Community Circle
* **Goal**: Instant connection to other women training in the same cohort.
* **Components**:
  * `Lagos Kinfolk Circle (148 active)`
  * Live discussion preview: *“Who is joining the Lekki Phase 1 Saturday run club?”*
  * 1-click `Join →` button routing to `/progress#community`.

---

## 4. Navigation Architecture: Sliding Luxury Sidebar

All top-level navigation is housed in the collapsible sliding drawer (`apps/web/src/components/dashboard/DashboardLayoutClient.tsx`):

| Tab | Route | Icon | Purpose |
| :--- | :--- | :--- | :--- |
| **Home** | `/home` | `Home` | Daily Morning Command Center & Routine Launch |
| **Training** | `/training` | `Dumbbell` | Full 8-Week Curriculum, Video Player, Exercise Library |
| **Cookbook** | `/cookbook` | `Utensils` | 45+ High-Protein Nigerian Recipes & Grocery Guides |
| **Progress** | `/progress` | `TrendingUp` | Check-in Photos, Weight Curves, Measurements, Community |
| **Profile** | `/profile` | `User` | Biometrics, Equipment Settings, Subscription & Account |

---

## 5. Technical Stack & Styling Tokens

* **Engine**: Next.js 15 App Router (`(member)` route group)
* **Design Engine**: Custom Tailwind CSS design tokens:
  * `canvas-cream`: `#FAF7F2`
  * `surface-cream`: `#F2EDE4`
  * `border-subtle`: `#E4DDD3`
  * `terracotta`: `#9a4023`
  * `sage`: `#4d6358`
  * `sage-subtle`: `#cde5d7`
  * `deep-charcoal`: `#1d1b19`
* **Typography**:
  * Headings & Editorial Accents: `Cormorant Garamond` / Serif
  * Body & Action Buttons: `Plus Jakarta Sans` / Sans-serif
