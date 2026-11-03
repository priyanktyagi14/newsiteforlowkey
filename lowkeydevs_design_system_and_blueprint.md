# Implementation-Ready Design System & Section Recreation Blueprint
**Reference Target:** [Griflan Studio](https://griflan.com/)  
**Target Brand:** Lowkeydevs  
**Role:** Senior Product Designer & Frontend Design-System Architect  
**Specification Level:** Exact Empirical Deconstruction (Zero Approximation)

---

# Part 1: Design System Foundations & Token Architecture

```
   ┌────────────────────────────────────────────────────────────────────────┐
   │                       FLUID SCALING ENGINE                             │
   │                                                                        │
   │   Desktop (>=650px): --size: 1800  ──►  1rem = 10px @ 1800w (8px @ 1440w)   │
   │   Mobile  (<650px):  --size: 375   ──►  1rem = 10px @ 375w                 │
   │   Clamp Ceiling:     --clamp: 11px ──►  Prevents ultra-wide bloat       │
   └───────────────────────────────────┬────────────────────────────────────┘
                                       │
         ┌─────────────────────────────┼─────────────────────────────┐
         ▼                             ▼                             ▼
┌───────────────────┐       ┌──────────────────────┐       ┌───────────────────┐
│   COLOR PALETTE   │       │   TYPOGRAPHY STACK   │       │ SPACING & RADII   │
│ Charcoal: #181616 │       │ TAN MEMORIES (Serif) │       │ Base: 0.625rem    │
│ Butter:   #fffddb │       │ Helvetica Neue LT    │       │ Max: 180rem       │
│ Chili:    #ff3831 │       │ Fluid Rem Matrix     │       │ Clip: Inset wipes │
└───────────────────┘       └──────────────────────┘       └───────────────────┘
```

---

## 1. Colors, Backgrounds, and Gradients

The site rejects generic neutral blacks and stark whites in favor of an organic, high-contrast palette anchored by warm cream and high-heat chili red.

### 1.1 Color Tokens Matrix

| Design Token | Hex Code | Live Computed RGB | Alpha / Opacity | Strict Semantic Usage |
| :--- | :--- | :--- | :--- | :--- |
| `--color-bg-base` | `#181616` | `rgb(24, 22, 22)` | 100% | Primary canvas background, inverted text, dark card surfaces. **Never use `#000000`.** |
| `--color-text-primary` | `#fffddb` | `rgb(255, 253, 219)` | 100% | Primary headings, body copy, light button fills, active outlines. **Never use `#FFFFFF`.** |
| `--color-accent-red` | `#ff3831` | `rgb(255, 56, 49)` | 100% | Chili brand mark, button hovers, badges, rotating chevrons, highlight cards, swoosh SVGs. |
| `--color-border-subtle` | `#ffffff1a` | `rgba(255, 255, 255, 0.10)` | 10% | Grid lines, client matrix borders, section dividers, table outlines. |
| `--color-overlay-mask` | `#000000d9`| `rgba(0, 0, 0, 0.85)` | 85% | Backdrop mask for Case Study Drawer and full-screen mobile menu. |
| `--color-text-muted` | `#9ca3af` | `rgb(156, 163, 175)` | 100% | Case study tags, industry metadata, secondary timestamps, copyright text. |
| `--color-text-subtle` | `#ffffff99` | `rgba(255, 255, 255, 0.60)` | 60% | Secondary subheadings, portfolio project categories under titles. |

### 1.2 Surface & Treatment Rules
* **No Linear/Radial Gradients on Main Surfaces:** The background is entirely flat `#181616`. Do not introduce synthetic ambient glow or blurred blob backgrounds.
* **Color Interpolation via `color-mix`:** Dynamic UI states (e.g. dropdown service chevrons) interpolate mathematically between cream and red:
  `color-mix(in srgb, #ff3831 calc(var(--state-open) * 100%), #fffddb)`

---

## 2. Typography Stack, Font Sizes, and Weights

Typographic tension is created by pairing a vintage high-contrast editorial display serif with a cold, mid-century Swiss grotesque.

### 2.1 Font Families
1. **Display Serif (`font-tan`):**
   * Family: `TAN MEMORIES` (Direct WOFF2 embed)
   * Weights: Regular `400`, Italic `400`
   * Characteristics: High stroke contrast, elongated ball terminals, decorative stylistic ligatures (`ch`, `st`, `ct`, `sp`).
2. **Body & Interface Sans (`font-sans`):**
   * Family: `Helvetica Neue LT Pro` (Fallback: `system-ui, -apple-system, BlinkMacSystemFont, sans-serif`)
   * Weights: Roman `400`, Medium `500`, Bold `700`, Black `900`
   * Characteristics: Strict horizontal terminals, high x-height, neutral geometric cadence.

### 2.2 Global Fluid Typography Engine
The typography scales proportionally with viewport width, eliminating jarring breakpoint jumps:

```css
:root {
  --size: 375;
  --clamp: 11px;
  --global-font-size: clamp(1px, calc((100vw / var(--size)) * 10), var(--clamp));
}

@media (min-width: 650px) {
  :root {
    --size: 1800;
  }
}

html {
  font-size: var(--global-font-size);
  font-variant-ligatures: common-ligatures;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

### 2.3 Typographic Hierarchy Matrix

| Class Token | Font | Weight | Rem Size | Computed @ 1440px | Computed @ 1800px | Computed @ 375px | Line Height | Tracking | Text Transform |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `.h1-display`| `tan` | 400 | `12.5rem` | `100px` | `125px` | `50px` | `1.20` | Normal | None |
| `.h1` | `tan` | 400 | `9.5rem` | `76px` | `95px` | `41.5px` | `1.30` | Normal | None |
| `.h1-alt` | `sans` | 900 | `12.5rem` | `100px` | `125px` | `48px` | `1.20` | `+0.05em` | Uppercase |
| `.h2` | `tan` | 400 | `7.35rem` | `58.8px` | `73.5px` | `36px` | `1.25` | Normal | None |
| `.h3` | `tan` | 400 | `4.0rem` | `32px` | `40px` | `24px` | `1.375` | Normal | None |
| `.h4` | `sans` | 700 | `4.0rem` | `32px` | `40px` | `24px` | `1.375` | Normal | None |
| `.h5` | `sans` | 500 / 700| `2.2rem` | `17.6px` | `22px` | `18px` | `1.25` | Normal | None |
| `.h6` | `sans` | 400 | `1.5rem` | `12px` | `15px` | `13px` | `1.50` | Normal | None |
| `.text-18` | `sans` | 500 | `1.8rem` | `14.4px` | `18px` | `15px` | `1.40` | Normal | None |
| `.text-15` | `sans` | 500 | `1.5rem` | `12px` | `15px` | `13px` | `1.40` | Normal | None |
| `.text-12` | `sans` | 400 | `1.2rem` | `9.6px` | `12px` | `11px` | `1.30` | `+0.02em` | Uppercase |

---

## 3. Spacing Scale and Container Dimensions

### 3.1 Container Specifications

```css
.site-max {
  --padding: 2.0rem; /* 20px on Mobile 375w */
  width: 100%;
  max-width: 180rem; /* 1800px standard containment */
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--padding);
  padding-right: var(--padding);
}

@media (min-width: 650px) {
  .site-max {
    --padding: 5.5rem; /* 44px @ 1440w, 55px @ 1800w */
  }
}

.site-max.--s {
  max-width: 157.5rem; /* 1575px narrowed inner layout */
}
```

### 3.2 Standard Spacing Rem Scale

| Token Unit | Rem Value | Desktop (1440w) | Desktop (1800w) | Mobile (375w) | Application |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `space-5` | `0.5rem` | `4px` | `5px` | `5px` | Tight badge gap, sub-item margin |
| `space-10` | `1.0rem` | `8px` | `10px` | `10px` | Horizontal icon spacing, micro padding |
| `space-20` | `2.0rem` | `16px` | `20px` | `20px` | Mobile screen margin, card inner margin |
| `space-35` | `3.5rem` | `28px` | `35px` | `25px` | Portfolio grid horizontal gutter |
| `space-55` | `5.5rem` | `44px` | `55px` | `30px` | Desktop side margins, sticky nav offsets |
| `space-80` | `8.0rem` | `64px` | `80px` | `40px` | Portfolio grid vertical gutter |
| `space-100`| `10.0rem`| `80px` | `100px` | `50px` | Standard section top/bottom padding |
| `space-165`| `16.5rem`| `132px` | `165px` | `80px` | Hero bottom spacing, major section divides |

---

## 4. Border Radii, Shadows, and Visual Treatments

### 4.1 Corner Radii
* **Global Element Radius (`.rounded-global`):** `0.625rem` (`5px` @ 1440w, `6.25px` @ 1800w). Applied to all portfolio cards, ticker ribbons, and major interactive modules.
* **Button & Pill Radius (`.rounded-pill`):** `0.5rem` (`4px` @ 1440w, `5px` @ 1800w). Applied to `.btn-mask` containers.
* **Testimonial Deck Cards:** `8px` - `10px` (`rounded-[1rem]`).
* **Corner Mark / Badge:** `0.5rem` (`rounded-[0.5rem]`).

### 4.2 Edge & Render Treatments
* **The WebKit Radial Mask Fix (`.radius-fix`):**  
  To prevent subpixel antialiasing flicker and border-radius bleed during hardware-accelerated image scaling (`transform: scale(...)`), apply:
  ```css
  .radius-fix {
    -webkit-mask-image: -webkit-radial-gradient(#fff, #000);
    overflow: hidden;
  }
  ```
* **Dividers & Borders:** Strictly `1px solid rgba(255, 255, 255, 0.10)`.
* **Shadows:** **No drop shadows anywhere on the site.** Depth is established solely via layer stacking (`z-index`), opaque black masking (`rgba(0,0,0,0.85)`), and contrasting chromatic planes (red vs. cream).

---

## 5. Navbar & Navigation Specifications

### 5.1 Structure & Layout
* **Positioning:** Fixed shell (`fixed top-0 left-0 right-0 z-[100]`).
* **Unscrolled State:**
  - **Top-Left Mark (`.sh__box`):** Red box `size-45` (`45px` on mobile), `size-60` (`60px` on desktop) in `bg-red`, containing the chili icon mark.
  - **Top-Right CTA (`.sh-right`):** Pinned at `fixed right-55 top-45 z-[101]`. Holds the dual-mask pill button `"Let's Connect"`.
  - **Center/Nav Links:** Inactive / hidden until scroll.

### 5.2 Scrolled Sticky Capsule State (`.is-scrolled`)
Triggered once vertical scroll exceeds `150px`:
* **Clip-Path Vertical Wipe:**
  ```css
  @media (min-width: 650px) {
    .sh__box {
      --clip-b: 100%;
      clip-path: inset(0 0 var(--clip-b) 0 round 0.5rem);
      transition: --clip-b 0.5s cubic-bezier(0.19, 1, 0.22, 1);
    }
    .is-scrolled .sh__box {
      --clip-b: 0%;
      transition: --clip-b 0.75s cubic-bezier(0.19, 1, 0.22, 1);
    }
  }
  ```
* **Dropdown Navigation Drawer (`.sh__nav`):**
  - Slides down from top-left: `bg-black text-white pl-55 pr-20 pb-20 rounded-br-[0.5rem]`.
  - Dynamic padding-top interpolation: `padding-top: calc(4.5rem + 7rem * var(--sh-drop));`
  - Links: `Selected Work`, `Services`, `Agency`, `The Workshop`, `Contact`.
* **Services Accordion Inside Sticky Header:**
  - Chevrons flip vertically: `scale: 1 calc(1 - var(--sh-open) * 2)`
  - Active color shift: `color-mix(in srgb, #ff3831 calc(var(--sh-open) * 100%), #fffddb)`

---

## 6. Component Design Library

### 6.1 The Signature Mask Button (`.btn-mask`)
A dual-layer clipping mask wipe with translating dual SVGs. When hovered, the foreground layer wipes away while the background icon translates into view.

```
       UNHOVERED                              HOVERED (Wipe active)
┌─────────────────────────┐            ┌─────────────────────────┐
│ [★] Let's Connect       │  ───────►  │ [★ ──►] Let's Connect   │
└─────────────────────────┘            └─────────────────────────┘
  Foreground mask: 0%                    Foreground mask: inset(0 100% 0 0)
  Icon 1: translateZ(0)                  Icon 1: translate3d(-50%, 0, 0)
  Icon 2: translate3d(50%, 0, 0)         Icon 2: translateZ(0)
```

```css
.btn-mask {
  --duration: 0.625s;
  --ease: cubic-bezier(0.19, 1, 0.22, 1);
  --to-r: 100%;
  --to-b: 0%;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 0.5rem;
  background-color: var(--color-text-primary);
  color: var(--color-bg-base);
  padding: 1.2rem 2.4rem;
  font-family: var(--font-sans);
  font-weight: 500;
  font-size: 1.5rem;
}

.btn-mask.--y {
  --to-r: 0%;
  --to-b: 100%;
}

.btn-mask__mask {
  --clip-r: 0%;
  --clip-b: 0%;
  clip-path: inset(0 var(--clip-r) var(--clip-b) 0 round 0.5rem);
  transition: --clip-r var(--duration) var(--ease), --clip-b var(--duration) var(--ease);
}

.btn-mask__icon {
  transition: transform var(--duration) var(--ease);
}
.btn-mask__icon.--2 {
  transform: translateZ(0);
}
.btn-mask__icon.--1 {
  transform: translate3d(50%, 0, 0);
}

@media (hover: hover) and (pointer: fine) {
  .btn-mask:hover .btn-mask__mask {
    --clip-r: var(--to-r);
    --clip-b: var(--to-b);
  }
  .btn-mask:hover .btn-mask__icon.--2 {
    transform: translate3d(-50%, 0, 0);
  }
  .btn-mask:hover .btn-mask__icon.--1 {
    transform: translateZ(0);
  }
}
```

### 6.2 The Asymmetric Masonry Card (`.case-item`)
The grid rejects uniform heights and relies on three verified aspect ratios:
* **Aspect Small (Tall Card):** `545 / 610` (`0.893`)
* **Aspect Medium (Standard Card):** `545 / 515` (`1.058`)
* **Aspect Large (Wide Landscape Card):** `545 / 420` (`1.297`)

```css
.case-item {
  --aspect: 545/515;
}
.case-item.aspect-small  { --aspect: 545/610; }
.case-item.aspect-medium { --aspect: 545/515; }
.case-item.aspect-large  { --aspect: 545/420; }

.case-item__thumbnail {
  aspect-ratio: var(--aspect);
  position: relative;
  overflow: hidden;
  border-radius: 0.625rem;
  -webkit-mask-image: -webkit-radial-gradient(#fff, #000);
}

.case-item__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s cubic-bezier(0.19, 1, 0.22, 1);
}

.case-item:hover .case-item__img {
  transform: scale(1.04);
}
```

### 6.3 Testimonial Drag Cards (`.confession-card`)
Strictly alternating two-color theme:
* **Card Type A (Butter Cream):** Background `#fffddb`, text & star SVGs `#ff3831`.
* **Card Type B (Chili Red):** Background `#ff3831`, text & star SVGs `#fffddb`.
* **Geometry:** Width `420px` (`min-w-[42rem]`), padding `48px 44px 44px`, corner radius `8px`.
* **Content:** 5 SVG rating stars (width: 18px), testimonial quote in `.h5` (`17.6px` / `22px` line-height), client name (`.h6` bold), client role & company (`.text-12` uppercase).

---

## 7. Animation Timing & Interaction Behavior

### 7.1 Easing Curves & Timing Tokens
* **The Studio Exponential Out:** `cubic-bezier(0.19, 1, 0.22, 1)` (GSAP equivalent: `expo.out`). Used for all scale reveals, drawer slide-ins, and button wipes.
* **Standard Transition Durations:**
  - Micro-interactions (color, opacity): `0.3s` - `0.35s ease-out`
  - Button mask wipes: `0.625s cubic-bezier(0.19, 1, 0.22, 1)`
  - Card thumbnail zoom: `0.7s cubic-bezier(0.19, 1, 0.22, 1)`
  - Sticky nav clip reveal: `0.5s` enter / `0.75s` active

### 7.2 Momentum & Physics Specifications
1. **Lenis Momentum Scrolling:**
   - Smooth scroll duration: `1.2s`
   - Easing: `(t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))`
   - Gesture orientation: Vertical only; horizontal carousels isolate scroll via `data-lenis-prevent`.
2. **Matter.js 2D Physics Canvas (Footer Engine):**
   - Canvas wrapper: `relative -mx-125 s:mx-0 pt-[27.75%]`
   - Engine configuration: `Engine.create({ gravity: { y: 2, scale: 0.001 } })`
   - Floor constraint: Static box `Bodies.rectangle(0, 0, 1e5, 100, { isStatic: true, friction: 0.6 })`
   - Physics bodies: Chili icons and studio stickers with `restitution: 0.6` (bouncy elasticity).
   - Interaction: Pointer movement over the canvas drops dynamic physical bodies from above.
   - Accessibility gate: Disabled completely when `prefers-reduced-motion: reduce` matches.

---

## 8. Responsive Rules Across Breakpoints

| System Property | Mobile (`< 650px`) | Tablet (`650px - 1024px`) | Desktop (`>= 1024px / 1440w`) | Ultra-Wide (`>= 1800w`) |
| :--- | :--- | :--- | :--- | :--- |
| **Root `--size`** | `375` (`1rem = 10px`) | `1800` (`1rem = 4.2px` - `5.6px`) | `1800` (`1rem = 8px` @ 1440w) | Clamped at `--clamp: 11px` |
| **Site Padding** | `2.0rem` (`20px`) | `3.5rem` (`35px`) | `5.5rem` (`44px` - `55px`) | `5.5rem` (`60.5px`) |
| **Navigation** | Hamburger icon + full modal | Pinned logo + minimal pill | Prolled sticky drop capsule | Prolled sticky drop capsule |
| **Work Masonry** | 1 column (`grid-cols-1`) | 2 columns (`grid-cols-2`) | 3 columns asymmetric (`grid-cols-3`) | 3 columns asymmetric |
| **Client Matrix**| 2 columns stacked | 3 columns | 4 to 5 columns | 5 columns |
| **Testimonials** | Full-width snap cards | Horizontal drag track | Alternating offset drag deck | Alternating offset drag deck |

---

# Part 2: Section-by-Section Recreation Blueprint

```
 ┌────────────────────────────────────────────────────────────────────────┐
 │ 01. NAVIGATION BAR (Fixed pinned mark + Scrolled drop capsule)         │
 ├────────────────────────────────────────────────────────────────────────┤
 │ 02. HERO & INTRODUCTION (Canvas Rive + 76px TAN serif + Red swoosh)    │
 ├────────────────────────────────────────────────────────────────────────┤
 │ 03. METRICS & HIGHLIGHT TICKER (Full-bleed border-white/10 ribbon)     │
 ├────────────────────────────────────────────────────────────────────────┤
 │ 04. SELECTED WORK (3-column asymmetric masonry 545/610, 515, 420)      │
 ├────────────────────────────────────────────────────────────────────────┤
 │ 05. INTERACTIVE CASE STUDY DRAWER (Max 825px flyout + Flipping "X")    │
 ├────────────────────────────────────────────────────────────────────────┤
 │ 06. PRESS & WINS CAROUSEL ("You win. We grin." + SVG Arch + Drag cards)│
 ├────────────────────────────────────────────────────────────────────────┤
 │ 07. RECENT CLIENTS MATRIX (Monochrome logos + 1px white/10 borders)    │
 ├────────────────────────────────────────────────────────────────────────┤
 │ 08. CLIENT CONFESSIONS (Alternating Red/Cream cards + GSAP Draggable)  │
 ├────────────────────────────────────────────────────────────────────────┤
 │ 09. FOOTER & PHYSICS CANVAS (Matter.js floor + Manifesto + Wordmark)   │
 └────────────────────────────────────────────────────────────────────────┘
```

---

## Section 01: Navbar & Global Navigation

```
DESKTOP UNSCROLLED STATE (Top of page):
┌────────────────────────────────────────────────────────────────────────┐
│ [■ Red Mark]                                        [ Let's Connect ]  │
└────────────────────────────────────────────────────────────────────────┘

DESKTOP SCROLLED STATE (Past 150px):
┌────────────────────────────────────────────────────────────────────────┐
│ ┌───────────────────────────┐                       [ Let's Connect ]  │
│ │ [■] Lowkeydevs            │                                          │
│ │ Selected Work             │                                          │
│ │ Services [▼]              │                                          │
│ │ Agency                    │                                          │
│ │ The Workshop              │                                          │
│ │ Contact                   │                                          │
│ └───────────────────────────┘                                          │
└────────────────────────────────────────────────────────────────────────┘
```

### 1. Layout and Proportions
* Pinned fixed viewport layer: `fixed top-0 left-0 right-0 z-[100]`.
* Top-left corner box (`.sh__box`):
  - Mobile: `45px x 45px` (`size-45`).
  - Desktop: `60px x 60px` (`size-60`).
* Top-right CTA (`.sh-right`):
  - Desktop: Positioned at `top: 45px`, `right: 55px` (`fixed right-55 top-45`).
  - Mobile: Hidden on viewports `< 650px`.
* Mobile hamburger trigger: Positioned at `top: 20px`, `right: 20px`.

### 2. Alignment and Spacing
* Padding desktop scrolled nav (`.sh__nav`): `pl-55 pr-20 pb-20`.
* Vertical navigation item gap: `15px` (`1.5rem`).

### 3. Typography
* Scrolled nav links: `Helvetica Neue LT Pro Medium`, `1.5rem` (`12px` @ 1440w), line-height `1.4`. Text color: `#fffddb`. Active route opacity: `0.5`.
* Sub-navigation services links: `Helvetica Neue LT Pro Roman`, `1.2rem` (`9.6px`), line-height `1.3`, uppercase, tracking `+0.02em`.

### 4. Images and Visual Assets
* Red corner box: `#ff3831` background with centered chili mark SVG (viewBox `0 0 24 24`).
* Service accordion chevron: Inline SVG stroke chevron (viewBox `0 0 12 8`, stroke `#fffddb`).

### 5. Components
* `.btn-mask` primary pill button for `"Let's Connect"`.
* Sticky drop navigation capsule with `.radius-fix` on bottom-right corner (`rounded-br-[0.5rem]`).
* Mobile slide-over drawer (`aside.mm`) pinned `fixed inset-0 bg-black/85`.

### 6. Animations and Interactions
* Scroll reveal: At `window.scrollY > 150`, add class `.is-scrolled`.
* Drop capsule clip wipe: CSS property `--clip-b` transitions from `100%` to `0%` over `0.75s cubic-bezier(0.19, 1, 0.22, 1)`.
* Accordion expansion: Height transitions via `--sh-open` from `0` to `1` over `0.5s`. Chevron rotates via CSS `scale: 1 calc(1 - var(--sh-open) * 2)`.

---

## Section 02: Hero & Introduction

```
┌────────────────────────────────────────────────────────────────────────┐
│                                                                        │
│                      [ Rive / Canvas Animation ]                       │
│                                                                        │
│                       Crafting brands                                  │
│                       that hit hard.                                   │
│                            ~~~~                                        │
│                        (Red Swoosh)                                    │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

### 1. Layout and Proportions
* Full viewport height presentation: `min-h-screen flex flex-col justify-center items-center text-center relative`.
* Max content width: `site-max` (`1800px` max, constrained to `702px` text boundary on desktop).
* Background: Flat solid `#181616`.

### 2. Alignment and Spacing
* Container padding: Desktop `0px 80px`, Mobile `0px 20px`.
* Spacing below headline: `25px` margin before the red swoosh SVG.
* Section bottom clearance: `mt-100 s:mt-165` before the ticker section.

### 3. Typography
* Headline (`.h1` / `h2.font-tan`):
  - Font: `TAN MEMORIES Regular`.
  - Size: `9.5rem` (`76px` @ 1440w, `95px` @ 1800w, `41.5px` @ 375w).
  - Line-height: `1.30` (`98.8px` @ 1440w).
  - Color: `#fffddb` (Butter Cream).
  - Tracking: `normal`.
* Accessibility Shell: Embedded screen-reader `<h1 class="sr-only">Helping our partners build original Brands that shine.</h1>`.

### 4. Images and Visual Assets
* Interactive Rive / Canvas Element: `<div class="relative inline-flex rive-inline z-3 min-w-60 s:min-w-85">` floating organically above or inline with the title.
* Signature Accent Swoosh:
  - Custom hand-drawn vector stroke SVG: `viewBox="0 0 58 17"`.
  - Dimensions: `width: 43.65px`, `height: 12.8px`.
  - Color: Fill `#ff3831` (Chili Red).
  - Placement: Horizontally centered directly beneath the second line of text.

### 5. Components
* Inline Rive animated vector asset.
* Accessible screen-reader header container.

### 6. Animations and Interactions
* Page-load entrance: GSAP SplitText line reveal on the `TAN MEMORIES` headline with staggered upward translation (`y: 100% -> 0%`) masked by an overflow-hidden span over `1.0s expo.out`.
* Swoosh SVG path draw: `stroke-dashoffset` animated from `100%` to `0%` on entrance.

---

## Section 03: Metrics & Highlight Ticker

```
┌────────────────────────────────────────────────────────────────────────┐
│ $250m Plaid acquisition │ $140m Everest funding │ 65k Users scaled     │
└────────────────────────────────────────────────────────────────────────┘
(Full-bleed 1px border-white/10 ribbon, continuous drag/touch scroll)
```

### 1. Layout and Proportions
* Outer Container: `<section class="relative mt-100 s:mt-165">` enclosing a continuous horizontal strip.
* Width: Spans 100% width of `.site-max`.
* Height: Exactly `44px` height per item cell.
* Border treatment: Enclosed top and bottom by `1px solid rgba(255, 255, 255, 0.10)`.

### 2. Alignment and Spacing
* Flex row layout: `flex items-center overflow-x-hidden select-none cursor-grab`.
* Inner item spacing: `gap: 0`, separated by vertical `1px solid rgba(255, 255, 255, 0.10)` dividers.
* Item cell padding: `0px 24px`.

### 3. Typography
* Number Metric: `Helvetica Neue LT Pro Bold` (`.h4`), `32px` (`4.0rem`), line-height `1.0`, color `#fffddb`.
* Metric Label / Context: `Helvetica Neue LT Pro Roman` (`.h6`), `12px` (`1.5rem`), uppercase, tracking `+0.05em`, color `#fffddb` (with active badge highlighting in `#ff3831`).

### 4. Images and Visual Assets
* Optional micro icons: Chili badge SVG (`14px x 14px`) separating milestone groups.

### 5. Components
* `.ticker-ribbon`: CSS snap-track (`snap-x snap-mandatory touch-pan-y`) with momentum drag.
* Live ticker metric items:
  1. `$250m` — Plaid acquisition of Cognito
  2. `$140m` — Everest stealth funding
  3. `65k` — Platform users scaled
  4. `2X` — Valuation increase
  5. `$47m` — TinyFish AI agent seed funding
  6. `10k+` — NeoReach creator payouts

### 6. Animations and Interactions
* Infinite seamless marquee scroll via CSS transform `translateX(0) -> translateX(-50%)` running at `35s linear infinite`.
* Pauses on hover: `animation-play-state: paused`.
* Touch drag / drag gesture: Supports cursor grab and manual horizontal dragging without breaking the infinite loop.

---

## Section 04: Selected Work (Asymmetric Masonry Grid)

```
3-COLUMN ASYMMETRIC MASONRY SEQUENCE (Desktop):
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│                  │  │                  │  │                  │
│  TinyFish        │  │  Upshop          │  │  In Revenue Cap  │
│  (545/610)       │  │  (545/515)       │  │  (545/420)       │
│  [Tall]          │  │  [Medium]        │  │  [Wide]          │
│                  │  │                  │  │                  │
│                  │  ├──────────────────┤  ├──────────────────┤
├──────────────────┤  │ Suzy Welch       │  │ New Engen        │
│ Prosupps         │  │ (545/515)        │  │ (545/610)        │
│ (545/420)        │  │ [Medium]         │  │ [Tall]           │
│ [Wide]           │  │                  │  │                  │
└──────────────────┘  └──────────────────┘  └──────────────────┘
```

### 1. Layout and Proportions
* Outer Container: `<section class="site-max mt-100 s:mt-165">`.
* Grid structure:
  - Mobile: `grid grid-cols-1 gap-y-50`.
  - Desktop: `grid grid-cols-3 gap-x-35 gap-y-80 w-full`.
* Column width @ 1440w: Exactly `427px` width per card.

### 2. Alignment and Spacing
* Column horizontal gap (`gap-x-35`): `35px` (`3.5rem` / `28px` @ 1440w).
* Row vertical gap (`gap-y-80`): `80px` (`8.0rem` / `64px` @ 1440w).
* Title block margin: `mt-20` (`16px` @ 1440w) below thumbnail.

### 3. Typography
* Project Title (`.case_title`):
  - Font: `Helvetica Neue LT Pro Bold` (`.h5`).
  - Size: `17.6px` (`2.2rem`), line-height `22px` (`1.25`).
  - Color: `#fffddb` (transitions to `#ff3831` on card hover).
* Project Categories / Tags (`.case_tag`):
  - Font: `Helvetica Neue LT Pro Roman` (`.h6`).
  - Size: `12px` (`1.5rem`), line-height `18px` (`1.5`).
  - Color: `rgba(255, 253, 219, 0.60)` (`text-white/60`).
  - Margin: `mt-5` (`4px`).

### 4. Images and Visual Assets
* Project Media: High-resolution WebP/AVIF stills or inline HTML5 looping video elements (`autoplay muted loop playsinline`).
* Aspect ratio mathematical classes:
  - Card 1 (TinyFish): `aspect-small` -> `545 / 610` (Tall). Tags: `A.I., SaaS`
  - Card 2 (Upshop): `aspect-medium` -> `545 / 515` (Standard). Tags: `SaaS, Food, B2B`
  - Card 3 (In Revenue Capital): `aspect-large` -> `545 / 420` (Landscape). Tags: `Venture Capital`
  - Card 4 (Prosupps): `aspect-large` -> `545 / 420` (Landscape). Tags: `Fitness, CPG, eCommerce`
  - Card 5 (Suzy Welch): `aspect-medium` -> `545 / 515` (Standard). Tags: `Education, B2C, B2B`
  - Card 6 (New Engen): `aspect-small` -> `545 / 610` (Tall). Tags: `Marketing`

### 5. Components
* `.case-item`: Article wrapper with group hover state.
* `.case-item__thumbnail`: Enclosed in `.rounded-global` (`0.625rem`) with `.radius-fix`.
* Underline indicator (`.uline`): 1px border expanding from left to right on hover.

### 6. Animations and Interactions
* Thumbnail zoom: Hovering any card triggers `transform: scale(1.04)` over `0.7s cubic-bezier(0.19, 1, 0.22, 1)`.
* Title color shift: Title color transitions from `#fffddb` to `#ff3831` over `0.3s ease-out`.
* Click trigger: Clicking an item interrupts standard navigation and opens Section 05 (Case Study Drawer) via FLIP animation.

---

## Section 05: Interactive Case Study Drawer

```
┌──────────────────────────────────────────────┬─────────────────────────┐
│ [Drawer: Max 825px]                          │ [Mask: Black 85%]       │
│                                      [X]     │                         │
│ TINYFISH                                     │                         │
│ Redefining Autonomous Software               │                         │
│                                              │                         │
│ ┌──────────────────────────────────────────┐ │                         │
│ │ Full-bleed Case Video                    │ │                         │
│ └──────────────────────────────────────────┘ │                         │
│                                              │                         │
│ Services: Brand Identity, UX/UI, Motion     │                         │
└──────────────────────────────────────────────┴─────────────────────────┘
```

### 1. Layout and Proportions
* Outer Flyout Container: `<aside class="case-content fixed inset-y-0 left-0 w-full max-w-[82.5rem] z-[120] bg-black">`.
* Max width: `82.5rem` (`825px` on desktop, `100vw` on mobile).
* Backdrop overlay: `fixed inset-0 bg-black/85 z-[119]`.
* Scroll containment: Isolated using `data-lenis-prevent` to keep parent page locked.

### 2. Alignment and Spacing
* Internal drawer padding: Desktop `60px 55px`, Mobile `40px 20px`.
* Close button position: `fixed top-30 right-40` (Desktop), `top-20 right-20` (Mobile).

### 3. Typography
* Case Title: `TAN MEMORIES Regular` (`.h1`), `76px` (`9.5rem`), line-height `1.2`.
* Case Subtitle: `Helvetica Neue LT Pro Medium` (`.h5`), `22px` (`2.2rem`), line-height `1.3`.
* Metadata Headers: `Helvetica Neue LT Pro Bold` (`.text-12`), `12px`, uppercase, tracking `+0.05em`.
* Metadata Body: `Helvetica Neue LT Pro Roman` (`.text-15`), `15px`, line-height `1.4`.

### 4. Images and Visual Assets
* Close Icon: Custom stylized `"X"` character in `#ff3831` (`24px`).
* Media showcase: Vertical sequence of responsive 16:9 and 4:3 videos (`playsinline autoplay loop muted`) and high-res imagery.

### 5. Components
* Drawer slide-in panel.
* Backdrop click dismiss layer.
* Fixed bottom navigation dock: Holds "Previous" and "Next" `.btn-mask` buttons.

### 6. Animations and Interactions
* Drawer Entrance: Slides horizontally from `translateX(-100%)` to `translateX(0%)` over `0.65s cubic-bezier(0.19, 1, 0.22, 1)`.
* Backdrop Fade: Opacity animates from `0` to `1` over `0.4s ease-out`.
* Signature Close Button Flip: Hovering over the `"X"` close button triggers a 3D horizontal flip:
  `transform: scaleX(-1)` over `0.7s cubic-bezier(0.19, 1, 0.22, 1)`.

---

## Section 06: Press & Wins Carousel ("You win. We grin.")

```
┌────────────────────────────────────────────────────────────────────────┐
│                      You win. We grin .                                │
│                     \                  /                               │
│                      \─── Arch SVG ───/                                │
│                                                                        │
│   ┌────────────────────┐   ┌────────────────────┐   ┌────────────────┐ │
│   │ [Forbes Badge]     │   │ [TechCrunch Badge] │   │ [Adweek Badge] │ │
│   │ "Top Agency 2026"  │   │ "Next Gen Design"  │   │ "Best Branding"│ │
│   │ [Read Article ->]  │   │ [Read Article ->]  │   │ [Read Article] │ │
│   └────────────────────┘   └────────────────────┘   └────────────────┘ │
└────────────────────────────────────────────────────────────────────────┘
```

### 1. Layout and Proportions
* Outer Container: `<section class="circ relative select-none cursor-grab overflow-hidden pb-100">`.
* Title container: Centered flex column with integrated smile arch graphic.
* Cards Track: Horizontal slider track overflowing the right edge of the viewport.
* Card Dimensions:
  - Desktop: Fixed width `390px` - `487.5px` (`min-w-[48.75rem] max-w-[48.75rem]`), height `252.8px`.
  - Mobile: Fixed width `325px` (`min-w-[32.5rem] max-w-[32.5rem]`).

### 2. Alignment and Spacing
* Spacing between cards: `mr-20 s:mr-40` (`32px` - `40px`).
* Arch SVG negative margin: `-mt-20 s:-mt-40` to tuck directly under headline text.
* Padding inside cards: `32px 30px`.

### 3. Typography
* Section Headline:
  - Font: `TAN MEMORIES Regular` (`.h1`).
  - Size: `76px` (`9.5rem`), line-height `98.8px` (`1.3`).
  - Color: `#fffddb`.
* Press Headline Inside Card:
  - Font: `Helvetica Neue LT Pro Medium` (`.h5`).
  - Size: `22px` (`2.2rem`), line-height `1.35`.
  - Color: `#fffddb`.

### 4. Images and Visual Assets
* Inline Title Chili: Small chili SVG embedded inline directly before the period in `"We grin ."`.
* Custom Smile Arch SVG: Broad stroke crescent SVG (`h-135 s:h-[38rem] w-auto`) rendered in `stroke-white/10` or `#ff3831`.
* Publisher Badges: Grayscale monochrome SVG marks for Forbes, TechCrunch, Adweek, Fortune (opacity: `0.7`).

### 5. Components
* `.circ`: Draggable carousel container with GSAP Observer / Draggable.
* `.win_card`: Card element with `1px solid rgba(255, 255, 255, 0.10)` border and `.rounded-global`.
* Read article CTA: Nested mini `.btn-mask` with trailing arrow.

### 6. Animations and Interactions
* Momentum drag scrolling with velocity inertia and edge bounce.
* Drag cursor changes from `cursor-grab` to `cursor-grabbing`.
* Card hover: Border color brightens to `rgba(255, 255, 255, 0.30)`.

---

## Section 07: Recent Clients Matrix

```
┌────────────────────────────────────────────────────────────────────────┐
│ Recent Clients                                                         │
├──────────────────┬──────────────────┬──────────────────┬───────────────┤
│ [Client Logo 01] │ [Client Logo 02] │ [Client Logo 03] │ [Logo 04]     │
├──────────────────┼──────────────────┼──────────────────┼───────────────┤
│ [Client Logo 05] │ [Client Logo 06] │ [Client Logo 07] │ [Logo 08]     │
└──────────────────┴──────────────────┴──────────────────┴───────────────┘
```

### 1. Layout and Proportions
* Outer Container: `<section class="site-max mb-150">`.
* Grid structure:
  - Mobile: 2 columns (`grid-cols-2`).
  - Tablet: 3 columns (`grid-cols-3`).
  - Desktop: 4 or 5 columns (`grid-cols-4 s:grid-cols-5`).
* Individual cell height: `160px` - `180px`.

### 2. Alignment and Spacing
* Section Title Padding: `padding: 60px 160px 0px 80px` (Desktop), `padding: 40px 0` (Mobile).
* Cell borders: Enclosed by `border-b border-r border-white/10`. Outer boundary capped with `border-t border-l border-white/10`.
* Cell alignment: `flex items-center justify-center p-30`.

### 3. Typography
* Section Title:
  - Font: `TAN MEMORIES Regular` (`.h1`).
  - Size: `76px` (`9.5rem`), line-height `98.8px`.
  - Color: `#fffddb`.
  - Bottom border: `border-b border-white/10 pb-40`.

### 4. Images and Visual Assets
* Client Logos: SVG vector assets scaled to `max-width: 140px`, `max-height: 48px`.
* Color Treatment: Pure monochrome fill `#fffddb` (Butter Cream).

### 5. Components
* Logo cell grid unit with hardware-accelerated opacity transition.

### 6. Animations and Interactions
* Hover state: Inactive logos rest at `opacity: 0.6`. Hovering brings the logo to `opacity: 1.0` and triggers `transform: scale(1.05)` over `0.3s ease-out`.

---

## Section 08: "Client Confessions" Testimonial Drag Deck

```
ALTERNATING COLOR DECK (Desktop):
┌─────────────────────────────┐        ┌─────────────────────────────┐
│ ★ ★ ★ ★ ★                   │        │ ★ ★ ★ ★ ★                   │
│ "They transformed our       │        │ "The most disciplined and   │
│ entire brand architecture." │        │ creative studio we've seen."│
│                             │        │                             │
│ — John Doe, CEO @ TinyFish  │        │ — Jane Smith, Founder @ Up  │
│ [CREAM CARD: #fffddb]       │        │ [RED CARD: #ff3831]         │
│ Text & Stars: #ff3831       │        │ Text & Stars: #fffddb       │
└─────────────────────────────┘        └─────────────────────────────┘
  (Margin top: -240px offset)             (Margin top: +240px offset)
```

### 1. Layout and Proportions
* Outer Container: `<section class="select-none relative cursor-grab overflow-hidden pb-50">`.
* Slider track: Continuous horizontal row with vertical alternating staggered offsets.
* Card Dimensions:
  - Width: Exactly `420px` (`min-w-[42rem]`).
  - Height: `255.5px`.
  - Corner radius: `8px` (`rounded-[8px]`).

### 2. Alignment and Spacing
* Alternating Staggered Offset:
  - Cream Cards (Odd): `margin: -240px 0px 0px -105px` (offset upward).
  - Red Cards (Even): `margin: 240px 0px 0px -105px` (offset downward).
* Internal Card Padding: Exactly `48px 44px 44px`.
* Inner Flex Gap: `gap: 16px` between star rating, quote, and attribution.

### 3. Typography
* Section Headline:
  - Font: `TAN MEMORIES Regular` (`.h1`).
  - Size: `76px` (`9.5rem`), line-height `98.8px`.
  - Text alignment: Center.
* Testimonial Body Text:
  - Font: `Helvetica Neue LT Pro Medium` (`.h5`).
  - Size: `17.6px` (`2.2rem`), line-height `23.5px` (`1.35`).
* Client Attribution:
  - Author Name: `Helvetica Neue LT Pro Bold`, `15px`.
  - Role & Company: `Helvetica Neue LT Pro Roman`, `12px`, uppercase, tracking `+0.05em`.

### 4. Images and Visual Assets
* Star Rating: 5 inline SVG stars (`width: 18px`, `height: 18px`).
  - On Cream Card: Fill `#ff3831`.
  - On Red Card: Fill `#fffddb`.

### 5. Components
* `.client_confession_card_white`: Cream background (`#fffddb`), chili red text (`#ff3831`).
* `.client_confession_card_red`: Chili red background (`#ff3831`), cream text (`#fffddb`).

### 6. Animations and Interactions
* Draggable horizontal momentum slider powered by GSAP Draggable.
* Kinetic card tilt: Cards apply subtle rotational skew (`rotation: '+=velocity * 0.05'`) during active drag.
* Snap release: Decelerates smoothly to the nearest card boundary.

---

## Section 09: The Footer & Interactive Physics Canvas

```
┌────────────────────────────────────────────────────────────────────────┐
│                                                                        │
│                      [ Matter.js Physics Canvas ]                      │
│                (Interactive falling chilis & studio stickers)          │
│                                                                        │
│        Lowkeydevs is a creative studio at the intersection of          │
│        design, strategy, and engineering, shaping brands that          │
│        move culture and leave a lasting mark.                          │
│                                                                        │
│ ┌────────────────────────────────────────────────────────────────────┐ │
│ │                                                                    │ │
│ │                        LOWKEYDEVS                                  │ │
│ │               (Massive Giant Interactive Wordmark)                 │ │
│ │                                                                    │ │
│ └────────────────────────────────────────────────────────────────────┘ │
│                                                                        │
│  hello@lowkeydevs.com                         Instagram  /  LinkedIn   │
└────────────────────────────────────────────────────────────────────────┘
```

### 1. Layout and Proportions
* Outer Container: `<footer class="sf relative overflow-hidden bg-black text-white pt-100 pb-50">`.
* Physics Canvas Wrapper: `relative -mx-125 s:mx-0 pt-[27.75%] w-full`.
* Manifesto Statement Container: `max-w-[95rem]` (`760px` @ 1440w, `950px` @ 1800w), horizontally centered.
* Giant Wordmark Container: Spans 100% container width (`width: 532px` - `1400px`, height `130px`+).

### 2. Alignment and Spacing
* Spacing above Manifesto: `60px` below physics canvas floor.
* Spacing between Manifesto and Wordmark: `80px` (`space-80`).
* Bottom Meta Row: `pt-40 border-t border-white/10 flex justify-between items-center`.

### 3. Typography
* Studio Manifesto (`.footer_manifesto`):
  - Font: `TAN MEMORIES Regular` (`.h3`).
  - Size: `32px` (`4.0rem`), line-height `44px` (`1.375`).
  - Color: `#fffddb`.
  - Alignment: Center.
* Meta Row Links & Tagline:
  - Font: `Helvetica Neue LT Pro Roman` (`.text-15`).
  - Size: `15px` (`1.5rem`), line-height `1.4`.
  - Color: `rgba(255, 253, 219, 0.60)` with hover transition to `#fffddb`.

### 4. Images and Visual Assets
* Matter.js Physics Bodies:
  - Vector chili icons (Red `#ff3831`).
  - Circular badge stickers (`"LOWKEY"`, `"EST. 2026"`).
* Giant Lowkeydevs Wordmark:
  - Custom hand-drawn brand typography SVG (`viewBox="0 0 1400 340"`).
  - Fill color: `#ff3831` (Chili Red).

### 5. Components
* `PhysicsCanvas`: HTML5 canvas rendering Matter.js rigid bodies.
* `GiantWordmarkButton`: Interactive SVG button with haptic trigger.
* Contact / Social pill links.

### 6. Animations and Interactions
* Matter.js Physics Engine:
  - Gravity: `y: 2`.
  - Floor collision: Drops 12-18 dynamic physics bodies upon initial scroll into view.
  - Interactive Pointer Collision: Moving the mouse over the canvas applies impulse forces to scattered chilis, making them bounce and tumble.
* Giant Wordmark Click: Clicking the giant footer wordmark triggers a haptic scale bounce (`scale: 0.98 -> 1.0`) and spawns a shower of 10 falling physics chilis from the top of the canvas.
* Reduced Motion Safe: Physics rendering is completely bypassed if `prefers-reduced-motion: reduce` is enabled.

---

# Part 3: Engineering Implementation Checklist

To guarantee 1:1 visual parity with the reference during coding, adhere strictly to these rules:

1. **Do not use arbitrary Tailwind values:** Avoid `text-gray-500`, `bg-black`, or `rounded-lg`. Use the defined tokens: `bg-[#181616]`, `text-[#fffddb]`, `text-[#ff3831]`, `rounded-[0.625rem]`.
2. **Do not use standard rem roots:** Ensure the fluid `:root` formula with `--size: 1800` (desktop) and `--size: 375` (mobile) is applied to `html`.
3. **Do not normalize card heights:** Maintain the strict `545/610`, `545/515`, and `545/420` aspect ratios for the portfolio masonry grid.
4. **Do not substitute TAN MEMORIES:** The serif headline font is the core visual identifier of the reference. It must not be replaced by generic Times, Playfair, or Cormorant.
5. **Do not omit the WebKit radial mask fix:** All scaled cards must include `-webkit-mask-image: -webkit-radial-gradient(#fff, #000);` to eliminate corner flicker in Safari and Chrome.

