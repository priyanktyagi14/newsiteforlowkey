# High-Fidelity Reverse-Engineering Report: Griflan.com
**Target Reference:** [https://griflan.com/](https://griflan.com/)  
**Prepared For:** Lowkeydevs (Design & Engineering Recreation)  
**Methodology:** Passive CDP Inspection, Live DOM & Computed Style Extraction via REA (Reverse Engineer Anything) Provider, Nuxt SSR Deconstruction, and Chrome Headless Multi-Viewport Observation.

---

## 1. Executive Summary & Aesthetic Architecture

Griflan is a high-profile digital branding studio whose site demonstrates exceptional typographic confidence, deliberate kinetic micro-interactions, and a tactile, editorial identity. Rather than conforming to standard SaaS or corporate agency tropes, Griflan blends vintage editorial typography (**TAN MEMORIES**) with industrial Swiss modernism (**Helvetica Neue LT Pro**), anchored by a signature warm-cream (`#fffddb`) on deep charcoal-black (`#181616`) palette energized by high-heat chili red (`#ff3831`).

### Core Aesthetic Pillars
1. **Fluid Micro-Rem Typography & Geometry:** The entire site avoids hardcoded pixel values for spacing and type sizes; every dimension is keyed to a custom viewport-proportional root formula (`--size: 1800` on desktop, `--size: 375` on mobile) clamped at `11px`.
2. **Intentional Asymmetry:** The portfolio grid does not use equal-height cards. It leverages three alternating mathematical aspect ratios (`545/610`, `545/515`, `545/420`), producing an editorial masonry feel without broken vertical rhythm.
3. **Clip-Path Physicality & Reveal States:** Buttons and navigation bars rely on hardware-accelerated CSS `clip-path: inset(...)` wipes and CSS custom property transitions (`@property`) rather than standard background fading.
4. **Interactive Play:** Embedded Matter.js 2D physics engines power interactive falling elements in the canvas header/footer, paired with Rive vector animations and Lenis momentum scrolling.

---

## 2. Verified Design Foundations & Specifications

### 2.1 The Root Fluid Scaling Engine
Griflan implements an adaptive fluid root that standardizes rem values across all device resolutions:

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
  overscroll-behavior: none;
}
```

* **Desktop Reference:** At an 1800px viewport, `1rem = 10px`. An element sized `mt-100` translates directly to `10rem = 100px`. At 1440px viewport width, `1rem = 8px` (all elements scale down proportionally by 20% without media query clutter).
* **Mobile Reference:** At 375px viewport, `1rem = 10px`.

---

### 2.2 Color Palette Specifications
Extracted and verified from Tailwind configuration and live computed styles:

| Token Name | Hex Code | Live Computed RGB | Usage / Role |
| :--- | :--- | :--- | :--- |
| **Griflan Black (Base)** | `#181616` | `rgb(24, 22, 22)` | Primary page background, inverted text, dark overlays. Never pure `#000000`. |
| **Griflan Butter Cream** | `#fffddb` | `rgb(255, 253, 219)` | Primary text color, light button fills, high-contrast headline fills. Never pure `#FFFFFF`. |
| **Griflan Chili Red** | `#ff3831` | `rgb(255, 56, 49)` | Signature brand accent, button hovers, badge fills, animated SVG chevrons, logo mark. |
| **Dividers / Outlines** | `#ffffff1a` | `rgba(255, 255, 255, 0.10)` | Grid border lines, section dividers, table outlines (`border-white/10`). |
| **Modal Mask Overlay** | `#000000d9`| `rgba(0, 0, 0, 0.85)` | Backdrop for the case study drawer and mobile navigation menu. |
| **Muted Text / Tags** | `#9ca3af` | `rgb(156, 163, 175)` | Tertiary metadata, category labels, publication publication dates. |

---

### 2.3 Typography Stack & Hierarchy

The site uses two primary font families hosted directly in WOFF2:
1. **Display Serif (`font-tan`):** `TAN MEMORIES` (Regular 400 & Italic 400). A high-contrast, display serif with vintage curved terminals and distinctive ligatures.
2. **Body & UI Sans (`font-sans`):** `Helvetica Neue LT Pro` (Roman 400, Medium 500, Bold 700, Black 900). Neutral, modernist Swiss grotesque.

#### Heading & Type Hierarchy Matrix (Desktop >= 650px)

| Scale Class | Font Family | Weight | Size (rem) | Live Computed (px @ 1440px) | Line Height | Letter Spacing |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `.h1` | `tan` | 400 | `9.5rem` | `76px` | `1.3` (`98.8px`) | Normal |
| `.h1-display` | `tan` | 400 | `12.5rem` | `100px` | `1.2` | Normal |
| `.h1-alt` | `sans` | 900 | `12.5rem` | `100px` | `1.2` | `0.05em` (Caps) |
| `.h2` | `tan` | 400 | `7.35rem` | `58.8px` | `1.25` | Normal |
| `.h3` | `tan` | 400 | `4.0rem` | `32px` | `1.375` (`44px`) | Normal |
| `.h4` | `sans` | 700 | `4.0rem` | `32px` | `1.375` | Normal |
| `.h5` | `sans` | 500 / 700| `2.2rem` | `17.6px` | `1.25` (`22px`) | Normal |
| `.h6` | `sans` | 400 | `1.5rem` | `12px` | `1.5` (`18px`) | Normal |
| `.text-18` | `sans` | 500 | `1.8rem` | `14.4px` | `1.4` | Normal |
| `.text-15` | `sans` | 500 | `1.5rem` | `12px` | `1.4` | Normal |
| `.text-12` | `sans` | 400 | `1.2rem` | `9.6px` | `1.3` | `0.02em` |

---

### 2.4 Container & Grid Dimensions

```css
.site-max {
  --padding: 2rem; /* Mobile */
  margin-left: auto;
  margin-right: auto;
  max-width: 180rem; /* 1800px */
  padding-left: var(--padding);
  padding-right: var(--padding);
  width: 100%;
}

@media (min-width: 650px) {
  .site-max {
    --padding: 5.5rem; /* 55px on Desktop */
  }
}

.site-max.--s {
  max-width: 157.5rem; /* 1575px narrowed container */
}
```

* **Global Corner Radius (`.rounded-global`):** `0.625rem` (6.25px at reference scale).
* **Radius Safari Subpixel Fix (`.radius-fix`):**
  ```css
  .radius-fix {
    -webkit-mask-image: -webkit-radial-gradient(#fff, #000);
    overflow: hidden;
  }
  ```

---

## 3. Navbar & Sticky Navigation Mechanics

The navigation architecture changes significantly based on scroll position and device type.

![Desktop Hero & Header](./screenshots/01_desktop_hero.png)

### 3.1 Initial State (Unscrolled)
* The navbar container (`.sh`) is pinned: `fixed top-0 left-0 right-0 z-[100]`.
* At the top of the viewport, the header is unobtrusive:
  - Top-left chili badge (`.sh__box`): Red box `size-45` (mobile: 45px) / `size-60` (desktop: 60px) in `bg-red` with rounded corners.
  - Top-right action (`.sh-right`): Pinned at `fixed right-55 top-45 hidden s:block z-[101]`. Contains the button mask pill `"Let's Connect"`.
  - The main text navigation links are hidden or nested inside the logo FLIP target.

![Sticky Nav & Selected Work](./screenshots/02_desktop_sticky_nav_and_work.png)

### 3.2 Scrolled State (`.is-scrolled`)
When the user scrolls past the hero threshold (`~150px`):
1. **The Sticky Box Clip Wipe (`.sh__box`):**
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
2. **Navigation Drawer Dropdown (`.sh__nav`):**
   A black capsule menu slides down from top-left:
   `pl-55 pr-20 pb-20 bg-black text-white rounded-br-[.5rem]`.
   Padding top transitions using CSS property:
   `padding-top: calc(4.5rem + 7rem * var(--sh-drop));`
3. **Services Accordion Inside Sticky Header:**
   The `"Services"` link features an interactive chevron that rotates 180 degrees via `scale: 1 calc(1 - var(--sh-open) * 2)` and interpolates color with `color-mix(in srgb, #ff3831 calc(var(--sh-open)*100%), #fffddb)`.

---

## 4. Section-by-Section Engineering Breakdown

### Section 1: Hero & Introduction
* **Accessibility Shell:**
  `<div class="sr-only"><h1>Helping our partners build original Brands that shine.</h1><p>For ambitious brands ready to scale.</p>...</div>`
* **Visual Composition:**
  - Full-screen height dark backdrop (`bg-black`).
  - Interactive Canvas / Rive element: `<div class="relative inline-flex rive-inline z-3 min-w-60 s:min-w-85">`.
  - Massive Hero Tagline:
    `<h2 class="h1 font-tan s:px-100">Crafting brands<br>that hit hard.</h2>`
    Rendered at `76px` / `9.5rem`, color `#fffddb`.
  - Accent Icon: A hand-drawn red calligraphic swoosh SVG (`viewBox="0 0 58 17"`, fill `#ff3831`) placed directly beneath the tagline.

---

### Section 2: Metric & Highlight Ticker
Located at `<section class="relative mt-100 s:mt-165">`:

* **Structure:** A continuous horizontal ribbon spanning the full site width inside `.site-max`.
* **Border Treatment:** Encased in a single pixel outline `border border-white/10`.
* **Behavior:** Seamless horizontal carousel with CSS touch snapping (`snap-x snap-mandatory overflow-x-hidden cursor-grab touch-pan-y`).
* **Items:**
  - `$250m` — Plaid acquisition of Cognito
  - `$140m` — Everest stealth funding
  - `65k` — Platform users scaled
  - `2X` — Valuation increase
  - `$47m` — TinyFish AI agent seed funding
  - `10k+` — NeoReach creator payouts
* **Typography:** Big numbers in bold sans (`.h4` / `32px`), description in `.h6` (`12px`) uppercase.

---

### Section 3: Selected Work (The Asymmetric Masonry Grid)

* **Section Heading:** `<h2 class="sr-only">Selected work</h2>` with leading visual indicator.
* **Layout Geometry:**
  `grid grid-cols-1 s:grid-cols-3 gap-x-35 gap-y-50 s:gap-y-80 w-full`
* **Card Proportions & Aspect Ratio System:**
  Each case card is an `<article class="case-item col-span-1 relative ...">` that relies on custom CSS variables:

```css
.case-item {
  --aspect: 545/515;
}
.case-item__thumbnail {
  aspect-ratio: var(--aspect);
  position: relative;
  overflow: hidden;
  border-radius: 0.625rem;
}
.case-item.aspect-small {
  --aspect: 545/610; /* Tall card */
}
.case-item.aspect-medium {
  --aspect: 545/515; /* Standard card */
}
.case-item.aspect-large {
  --aspect: 545/420; /* Wide landscape card */
}
```

#### Masonry Flow Sequence:
1. **TinyFish:** `col 1, row 1` -> `aspect-small` (`545/610`). Tags: `A.I., SaaS`
2. **Upshop:** `col 2, row 1` -> `aspect-medium` (`545/515`). Tags: `SaaS, Food, B2B`
3. **In Revenue Capital:** `col 3, row 1` -> `aspect-large` (`545/420`). Tags: `Venture Capital`
4. **Prosupps:** `col 1, row 2` -> `aspect-large` (`545/420`). Tags: `Fitness, CPG, eCommerce`
5. **Suzy Welch:** `col 2, row 2` -> `aspect-medium` (`545/515`). Tags: `Education, B2C, B2B`
6. **New Engen:** `col 3, row 2` -> `aspect-small` (`545/610`). Tags: `Marketing`

* **Card Micro-Interaction:**
  - Hovering a thumbnail triggers an inner image/video scale up: `scale(1.04)` over `0.6s cubic-bezier(0.19, 1, 0.22, 1)`.
  - Subtitle link underline: `.uline` draws a 1px border under the title from left to right.
  - Clicking triggers the Case Study Drawer.

---

### Section 4: Interactive Case Study Drawer (`aside.case-content`)

Instead of forcing a full page reload, clicking a portfolio item can expand an interactive side panel:
* **Container:** `<aside class="case-content absolute inset-y-0 left-0 w-full max-w-[82.5rem] pointer-events-auto bg-black js-content" data-lenis-prevent>`
* **Max Width:** `82.5rem` (`825px` on desktop, `100vw` on mobile).
* **Backdrop:** `<div class="absolute inset-0 bg-black/85 pointer-events-auto js-bg"></div>`.
* **Close Button:**
  Positioned at `top-20 right-20 s:top-30 s:right-40`.
  Contains the character `"X"` in `.text-24 text-red`.
  **Signature Hover:** On hover, the close `"X"` flips horizontally:
  `transition-transform duration-700 ease-out-expo has-hover:group-hover:scale-x-[-1]`.

---

### Section 5: Press & Wins Carousel ("You win. We grin.")

![Wins Carousel](./screenshots/03_desktop_wins_carousel.png)

* **Container:** `<div class="circ relative select-none cursor-grab overflow-hidden pb-100">`
* **Heading:** `<h2 class="h1 font-tan text-center">You win. We grin .</h2>`
  - Inline chili sticker embedded inside the title.
  - Underneath the title is a custom arch SVG: `<svg class="h-135 s:h-[38rem] w-auto -mt-...">` creating a broad crescent/smile graphic.
* **Cards Track:**
  - Fixed-width cards: `min-w-[32.5rem] max-w-[32.5rem] s:min-w-[48.75rem] s:max-w-[48.75rem] mr-20 s:mr-40 js-slide`.
  - Publisher badges: Grayscale logos of Reuters, TechCrunch, Adweek, Forbes, Fortune.
  - Headline text: `.h5 text-center` (`22px`).
  - Read article pill: Styled with `.btn-mask`.

---

### Section 6: Recent Clients Grid
* **Container:** `<section class="mb-150">`
* **Section Title:**
  `<h2 class="h1 font-tan s:pl-100 s:pr-200 s:pt-75 pb-40 s:pb-0 border-b border-white/10 s-no-breaks text-center s:text-left">Recent Clients</h2>`
* **Matrix Structure:**
  - 4 or 5 columns on desktop, 2 columns on mobile.
  - Dividing lines: Subtle 1px lines using `border-white/10`.
  - Client Logos: Scaled SVG logos in monochrome cream `#fffddb` with hover opacity change from `0.6` to `1.0`.

---

### Section 7: "Client Confessions" Testimonial Drag Deck

![Testimonials Section](./screenshots/04_desktop_testimonials.png)

* **Section Wrapper:** `<section class="select-none relative cursor-grab overflow-hidden pb-50">`
* **Heading:** `<h2 class="h1 font-tan text-center">Client Confessions</h2>`
* **Draggable Track:** Uses GSAP Draggable / Observer with momentum and tilt.
* **Alternating Visual Rhythm:**
  The cards strictly alternate color schemes:
  1. **Cream Card:** `bg-white text-red` -> Background `#fffddb`, text & icons `#ff3831`.
  2. **Red Card:** `bg-red text-white` -> Background `#ff3831`, text & icons `#fffddb`.
* **Card Geometry:**
  - Width: `420px` (`min-w-[42rem]`).
  - Padding: `48px 44px 44px` (`pt-35 s:pt-60 pb-30 s:pb-55 px-15 s:px-55`).
  - Corner Radius: `rounded-[1rem]` (`8px` - `10px`).
  - Content: Star rating (5 SVG stars), quote body in bold sans (`.h5`), client name, role, and company.

---

### Section 8: The Footer & Physics Canvas

![Footer & Canvas](./screenshots/05_desktop_footer.png)

* **Container:** `<footer class="sf relative overflow-hidden">`
* **Interactive Physics Canvas:**
  ```html
  <div class="relative -mx-125 s:mx-0">
    <div class="pt-[27.75%]"></div>
    <canvas class="absolute top-0 left-0 size-full pointer-events-none has-hover:pointer-events-auto will-change-transform"></canvas>
  </div>
  ```
  - **Matter.js Engine:** Initialized with `Engine.create({ gravity: { y: 2 } })`.
  - Static floor body: `Bodies.rectangle(0, 0, 1e5, 100, { isStatic: true, friction: 0.6 })`.
  - On pointer hover/move, physical chilis and badges drop, bounce (`restitution: 0.6`), and collide with the boundary!
  - Reduced Motion Safe: Disabled when `window.matchMedia("(prefers-reduced-motion: reduce)").matches`.
* **Studio Manifesto:**
  `<h2 class="h3 font-tan text-center w-full s:max-w-[95rem]">Griflan is a creative studio at the intersection of design, strategy, and compelling storytelling, shaping brands that move culture and leave a lasting mark.</h2>`
  - Font: `TAN MEMORIES Regular`.
  - Size: `32px` (`4rem`), line height `44px` (`1.375`).
* **Giant Footer Wordmark:**
  A full-width interactive SVG button representing the custom hand-drawn **GRIFLAN** wordmark in `#ff3831`. Clicking it triggers a haptic bounce and chili spawn animation.
* **Bottom Meta Row:**
  - Tagline: `"Partnering with ambitious brands & inspiring people."`
  - Contact links: Phone numbers (`856.816.6159`, `610.952.1398`), email (`hello@griflan.com`), Instagram, LinkedIn.

---

## 5. Component Inventory & Code Blueprints

### 5.1 The Signature Mask Button (`.btn-mask`)
Griflan's primary interactive button uses a dual-layer clipping mask wipe with translating dual SVGs.

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

---

### 5.2 Case Study Card Component (`.case-item`)

```html
<article class="case-item col-span-1 relative aspect-medium group">
  <div class="case-item__thumbnail relative w-full overflow-hidden rounded-global radius-fix">
    <img 
      src="..." 
      alt="Project thumbnail" 
      class="size-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]"
    />
  </div>
  <div class="relative flex flex-col items-start mt-20 transition-colors duration-300">
    <h3 class="h5 font-bold text-white group-hover:text-red transition-colors">
      TinyFish
    </h3>
    <div class="h6 mt-5 text-white/60">
      A.I., SaaS
    </div>
  </div>
</article>
```

---

### 5.3 Mobile Navigation Drawer (`aside.mm`)

![Mobile Menu Open](./screenshots/08_mobile_menu_open.png)

```css
@property --mm-open {
  syntax: "<number>";
  inherits: true;
  initial-value: 0;
}

.mm-link {
  transition: opacity 0.35s ease-out;
}
.mm-link.router-link-exact-active {
  opacity: 0.5;
  pointer-events: none;
}

.mm-services {
  --mm-open: 0;
  transition: --mm-open 0.75s cubic-bezier(0.19, 1, 0.22, 1);
}
.mm-services.is-open {
  --mm-open: 1;
}

.mm-services__label {
  color: color-mix(in srgb, #ff3831 calc(var(--mm-open) * 100%), #fffddb);
}

.mm-services__chevron {
  scale: 1 calc(1 - var(--mm-open) * 2);
}

.mm-services__sub {
  height: calc(var(--mm-sub-h, 0px) * var(--mm-open));
  overflow: hidden;
}
```

---

## 6. Multi-Page System Architecture

### 6.1 Case Study Detail Page (`/work/[slug]/`)
* **Hero / Header:** Project title in `.h1-display` (`100px`+), subtitle, client metadata grid (Services, Industry, Year, Deliverables).
* **Media Showcase:** Staggered responsive grid of full-bleed videos (1080p MP4/WebM with `autoplay muted loop playsinline`) and high-resolution stills.
* **Project Dock Navigation:** Fixed bottom pill container:
  `fixed bottom-20 s:bottom-25 inset-x-0 pointer-events-none flex justify-center gap-x-8 s:gap-x-10 z-[98]`
  Houses "Previous Project" and "Next Project" dual-mask buttons with custom chevrons.

---

### 6.2 Services Page (`/services/`)
* **Heading:** `"We know what we're good at!"`
* **3 Core Disciplines:**
  1. **Branding:** Brand Strategy, Positioning, Visual Identity, Messaging, Guidelines.
  2. **Digital:** UX/UI Design, Web Development, E-Commerce, WebGL/3D, Design Systems.
  3. **Motion:** 2D/3D Animation, Explainer Videos, Brand Films, Micro-interactions.
* **Interactive Accordion:** Expandable capability tags with smooth height interpolation.
* **FAQ Section:** Accordions styled with `border-t border-white/10`.

---

### 6.3 Agency Page (`/agency/`)
* **Hero Statement:** `"We measure our excellence by your success ."`
* **Principles Matrix:** 4 core studio values presented in large serif numbers (`01`, `02`, `03`, `04`).
* **Team & Culture:** Photographic mosaic celebrating studio energy and craft.

---

### 6.4 The Griflan Workshop (`/workshop/`)
* **Concept:** A rapid 2-week creative sprint productized for startups.
* **Structured Roadmap:**
  - `Week 0`: Meet & Discover
  - `Week 1`: Create & Explore
  - `Week 2`: Refine & Apply

---

## 7. Responsive Behavior & Breakpoint Matrix

Griflan uses a two-tier responsive strategy defined at `650px`:

| Feature / Dimension | Mobile (< 650px) | Desktop (>= 650px) |
| :--- | :--- | :--- |
| **Root `--size`** | `375` (`1rem = 10px` @ 375w) | `1800` (`1rem = 10px` @ 1800w, `8px` @ 1440w) |
| **Max Viewport Clamp** | `--clamp: 11px` | `--clamp: 11px` |
| **Site Padding (`.site-max`)**| `2.0rem` (`20px`) | `5.5rem` (`55px`) |
| **Hero Tagline Size** | `4.15rem` (`41.5px`) | `9.5rem` (`76px` - `95px`) |
| **Navigation Mode** | Full-screen hamburger modal (`.mm`) | Pinned corner mark + `.is-scrolled` drop capsule |
| **Selected Work Grid** | Single column (`grid-cols-1`) | 3-column asymmetric masonry (`grid-cols-3`) |
| **Client Matrix** | 2-column stacked grid | 4–5 column inline matrix |
| **Testimonial Slider** | Full width card peek (`px-15`) | Fixed `420px` card width (`min-w-[42rem]`) |
| **Footer Wordmark** | Scaled SVG with horizontal scroll margin | Full-bleed interactive SVG button |

---

## 8. Separation of Observations vs Assumptions

### Verified Empirical Facts (CDP & Bundle Evidence)
* Exact fonts: `TAN MEMORIES Regular/Italic` and `HelveticaNeueLTPro` Roman, Medium, Bold.
* Exact color tokens: `#181616` (charcoal black), `#fffddb` (butter cream), `#ff3831` (chili red).
* Exact fluid formula: `clamp(1px, calc((100vw / var(--size)) * 10), var(--clamp))`.
* Exact libraries: GSAP (with ScrollTrigger & Flip), Lenis smooth scroll, Matter.js 2D physics engine, and Rive.
* Layout proportions: Case study aspect ratios strictly defined as `545/610`, `545/515`, and `545/420`.
* Button mask logic: Dual-layer sliding icon transformation with `clip-path: inset(...)`.

### Engineering Inferences & Adaptations for Lowkeydevs
* **Framework Agnosticism:** While Griflan was authored in Nuxt 3 with Pinia, this architecture can be recreated with identical fidelity in Next.js (React), Astro, or SvelteKit by implementing the exact CSS properties, layout geometry, and GSAP/Lenis hooks.
* **Physics Payload Weight:** The Matter.js canvas is non-critical for SEO and can be dynamically imported on desktop devices with `requestIdleCallback` or progressive hydration to maintain sub-second First Contentful Paint.

---

## 9. Visual Reference Gallery

All captured evidence has been archived locally in the workspace artifact directory:

| Snapshot Description | Local File Reference |
| :--- | :--- |
| **Desktop Hero (1440w)** | [01_desktop_hero.png](./screenshots/01_desktop_hero.png) |
| **Sticky Nav & Work Grid** | [02_desktop_sticky_nav_and_work.png](./screenshots/02_desktop_sticky_nav_and_work.png) |
| **Wins Carousel ("You win. We grin.")** | [03_desktop_wins_carousel.png](./screenshots/03_desktop_wins_carousel.png) |
| **Client Confessions Testimonials** | [04_desktop_testimonials.png](./screenshots/04_desktop_testimonials.png) |
| **Footer & Manifesto** | [05_desktop_footer.png](./screenshots/05_desktop_footer.png) |
| **Full Page Desktop (6.2MB)** | [06_desktop_fullpage.png](./screenshots/06_desktop_fullpage.png) |
| **Mobile Hero (375w)** | [07_mobile_hero.png](./screenshots/07_mobile_hero.png) |
| **Mobile Menu Drawer** | [08_mobile_menu_open.png](./screenshots/08_mobile_menu_open.png) |
| **Tablet Viewport (768w)** | [09_tablet_hero.png](./screenshots/09_tablet_hero.png) |
| **Case Study (TinyFish)** | [10_case_study_tinyfish.png](./screenshots/10_case_study_tinyfish.png) |
| **Services Page** | [11_services_page.png](./screenshots/11_services_page.png) |
| **Workshop Page** | [12_workshop_page.png](./screenshots/12_workshop_page.png) |
