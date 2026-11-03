# Lowkeydevs — Multidisciplinary Digital Agency

A multidisciplinary digital agency operating at the intersection of software engineering, brand identity, and creator-led distribution.

Built with **Astro 5**, edge-rendered on **Cloudflare Workers**, backed by **Supabase**, and styled using an implementation-ready fluid scaling design system inspired by the Griflan architectural model.

---

## 🏛️ Core Disciplines

1. **Web Development & Platforms:** High-speed business websites, web applications, and headless e-commerce architectures built on modern edge stacks (Astro, TypeScript, Shopify, Cloudflare).
2. **Social Media & Creator Management:** Full-cycle influencer discovery, partnership logistics, and omnichannel short-form distribution.
3. **Creative Production & Branding:** Tactile brand identity systems, motion guidelines, commercial video editing, and short-form video production (TikTok, Reels, Shorts).
4. **Digital Growth & Inbound Demand:** Technical SEO, conversion-focused lead generation, and business digitization pipelines.

---

## 🎨 Design System & Foundations

- **Fluid Rem Scaling Engine:** Viewport-proportional root formula (`--size: 1800` desktop, `--size: 375` mobile) clamped at `11px`.
- **Typographic Stack:** `TAN MEMORIES` (High-contrast editorial display serif) paired with `Helvetica Neue LT Pro` (Swiss modernist grotesque).
- **Chromatic Palette:** Charcoal Base (`#181616`), Butter Cream (`#fffddb`), and Chili Red (`#ff3831`).
- **Kinetic Mechanics:** Dual-mask clipping wipes (`.btn-mask`), 3D flipping `"✕"` drawers, and a pure Canvas 2D physics engine for the footer.
- **Asymmetric Portfolio Ratios:** `545/610` (Tall), `545/515` (Medium), and `545/420` (Wide).

Complete reverse-engineering and design system specifications are archived in [`docs/design-system/`](./docs/design-system/).

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start local development server (runs at http://localhost:4321)
npm run dev

# Run test suite
npm run test

# Compile production edge bundle for Cloudflare Workers
npm run build

# Deploy to Cloudflare Workers / Pages
npm run deploy
```

---

## 📁 Repository Structure

```text
├── docs/
│   └── design-system/   # Reverse-engineering report, computed styles & design blueprint
├── public/
│   ├── fonts/           # Authentic TAN MEMORIES & Helvetica Neue LT Pro WOFF2 files
│   ├── images/          # Studio assets (chili mark, brand graphics)
│   └── site.webmanifest # PWA & favicon manifests
├── src/
│   ├── components/
│   │   ├── agency/      # Hero, MetricsTicker, WorkGrid, CaseStudyDrawer, WinsCarousel, PhysicsCanvas
│   │   ├── base/        # Icon.astro registry
│   │   ├── ui/          # ButtonMask.astro (.btn-mask dual wipe)
│   │   ├── Header.astro # Pinned mark + scrolled sticky capsule navigation
│   │   └── Footer.astro # Physics canvas + manifesto + interactive wordmark
│   ├── layouts/
│   │   └── Layout.astro # Dark-locked root, font preloads, SEO & GA4 integration
│   ├── pages/
│   │   ├── api/         # Inbound consultation endpoints (wired to Supabase)
│   │   ├── agency.astro # Studio ethos, 4 operating principles, 3-step process
│   │   ├── contact.astro# Project brief consultation form
│   │   ├── index.astro  # Flagship agency homepage
│   │   ├── privacy.astro# Privacy policy
│   │   └── services.astro# 4 disciplines deep-dive & interactive FAQ
│   └── styles/
│       └── index.css    # Complete design tokens, fluid rem engine, reset & utilities
├── astro.config.mjs     # Astro 5 SSR configuration with Cloudflare adapter
└── wrangler.jsonc       # Cloudflare Workers deployment binding
```
