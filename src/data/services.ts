export interface ServiceCapability {
  name: string;
  desc: string;
  deliverables?: string[];
}

export interface ServiceMetric {
  value: string;
  label: string;
}

export interface ServiceProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface ServiceFAQ {
  q: string;
  a: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  number: string;
  discipline: string;
  category: string;
  title: string;
  shortTitle: string;
  tagline: string;
  lead: string;
  narrativeHeading: string;
  narrative: string[];
  metrics: ServiceMetric[];
  capabilities: ServiceCapability[];
  process: ServiceProcessStep[];
  deliverables: string[];
  faqs: ServiceFAQ[];
}

export const servicesData: ServiceItem[] = [
  {
    id: 'web-development',
    slug: 'web-development',
    number: '01',
    discipline: '01 // Software & Infrastructure',
    category: 'Software & Infrastructure',
    title: 'Web Development & Platforms',
    shortTitle: 'Web Development',
    tagline: 'High-speed, edge-rendered web applications and headless architectures built to scale.',
    lead: 'We build high-speed, edge-rendered web applications, business websites, and headless e-commerce architectures. We write zero-bloat, accessible code that converts visitors, scales reliably, and never buckles under peak loads.',
    narrativeHeading: 'More than code. An unfair digital advantage.',
    narrative: [
      'The modern web has become bloated with heavy dependencies, slow hydration cycles, and sluggish client-side frameworks. We take the opposite approach: zero-bloat, edge-rendered architectures that load instantly and respond without delay.',
      'From custom full-stack web applications to headless Shopify implementations and micro-conversion funnels, our engineering is crafted to convert casual traffic into loyal users. Every millisecond shaved off loading time directly compounds your conversion rate and domain authority.'
    ],
    metrics: [
      { value: '50ms', label: 'Avg TTFB on Edge' },
      { value: '99.9%', label: 'Uptime SLA' },
      { value: '100/100', label: 'Lighthouse Performance' },
      { value: '2.4x', label: 'Avg Conversion Lift' }
    ],
    capabilities: [
      {
        name: 'Custom Web Applications',
        desc: 'Full-stack reactive web applications built on TypeScript, Astro, React, and Next.js with secure auth and edge databases.',
        deliverables: ['Custom Web App', 'Edge APIs', 'Database Architecture']
      },
      {
        name: 'High-Converting Landing Pages',
        desc: 'Precision conversion funnels engineered with micro-interactions, kinetic feedback, and sub-50ms TTFB.',
        deliverables: ['Responsive Landing Pages', 'A/B Testing Harness', 'Analytics Instrumentation']
      },
      {
        name: 'Headless E-Commerce',
        desc: 'Decoupled Shopify and Stripe architectures designed for frictionless multi-currency checkout and lightning speed.',
        deliverables: ['Shopify Storefront API', 'Stripe Checkout', 'Inventory Sync']
      },
      {
        name: 'Workflow Automations & APIs',
        desc: 'Custom backend integrations connecting your CRM, payment gateways, webhook pipelines, and internal tools.',
        deliverables: ['REST & GraphQL APIs', 'Webhook Handlers', 'Third-Party Connectors']
      },
      {
        name: 'Technical Architecture & Systems',
        desc: 'Edge database schema design, serverless micro-services, caching policies, and resilient failover setups.',
        deliverables: ['Edge Infrastructure', 'Caching Rules', 'Security Hardening']
      },
      {
        name: 'Core Web Vitals Optimization',
        desc: 'Sub-second initial paint times, zero cumulative layout shifts (CLS), and accessible semantic markup.',
        deliverables: ['CWV Audit & Remediation', 'Asset Inlining & Bundling', 'Accessibility Compliance']
      }
    ],
    process: [
      {
        step: 'Phase 01',
        title: 'Architecture & System Blueprint',
        description: 'We audit your technical requirements, model relational data schemas, select the optimal tech stack, and establish strict performance budgets before writing code.'
      },
      {
        step: 'Phase 02',
        title: 'Component Engineering & Micro-Interactions',
        description: 'Rapid sprint execution. We craft accessible components, implement tactile kinetic interactions, and link reactive state directly with backend endpoints.'
      },
      {
        step: 'Phase 03',
        title: 'Edge Deployment & Global Routing',
        description: 'We deploy to globally distributed edge networks (Cloudflare / Vercel), configure automated CI/CD pipelines, and stress-test under simulated peak load.'
      }
    ],
    deliverables: [
      '100% clean, documented TypeScript / Astro codebase',
      'Production deployment on global edge infrastructure',
      'Automated CI/CD build & preview pipelines',
      'Full API documentation and database schemas',
      'Google Analytics 4 & conversion tracking integration',
      '30-day post-launch warranty and bug-fix coverage'
    ],
    faqs: [
      {
        q: 'Which technologies and frameworks do you build with?',
        a: 'We specialize in modern, edge-native stacks: TypeScript, Astro, Next.js, Cloudflare Workers, Node.js, Tailwind CSS, Supabase, and PostgreSQL. We choose the cleanest tool that guarantees sub-50ms TTFB.'
      },
      {
        q: 'How do you guarantee sub-second load times?',
        a: 'We enforce static HTML pre-rendering, island architecture hydration, modern WebP/AVIF asset compression, and edge CDN routing. We test every build against Google PageSpeed and Lighthouse benchmarks.'
      },
      {
        q: 'Who owns the intellectual property and code repositories?',
        a: 'You do. Upon project completion and final milestone settlement, 100% of the Git repositories, build scripts, design tokens, and digital assets belong entirely to your company.'
      },
      {
        q: 'Can you migrate our legacy WordPress or Webflow site?',
        a: 'Yes. We frequently migrate legacy, plugin-bloated sites into custom Astro or headless platforms, preserving all existing SEO equity, URLs, and redirect maps while dramatically boosting speed.'
      }
    ]
  },
  {
    id: 'social-creator',
    slug: 'social-creator',
    number: '02',
    discipline: '02 // Distribution & Talent',
    category: 'Distribution & Talent',
    title: 'Social Media & Creator Management',
    shortTitle: 'Social & Creators',
    tagline: 'Bridging ambitious brands with genuine creator relationships and high-velocity distribution.',
    lead: 'Audience attention is fragmented across platforms. We bridge business objectives with genuine creator relationships, running talent discovery, partnership logistics, and end-to-end content distribution that earns real market share.',
    narrativeHeading: 'Attention is earned, not bought with lazy ads.',
    narrative: [
      'Modern consumers have developed banner blindness to generic corporate advertising. True market share belongs to brands that weave themselves seamlessly into native creator culture and high-velocity short-form feeds.',
      'We act as your dedicated distribution partner. From scouting high-affinity niche creators to negotiating transparent contracts, scripting viral-ready hooks, and whitelisting top performers for paid amplification, we handle the entire creator lifecycle.'
    ],
    metrics: [
      { value: '200K+', label: 'Creator Audience Reach' },
      { value: '3.8x', label: 'Engagement Rate vs Avg' },
      { value: '100+', label: 'Partnerships Managed' },
      { value: '15M+', label: 'Organic Impressions' }
    ],
    capabilities: [
      {
        name: 'Social Media Channel Management',
        desc: 'End-to-end stewardship of brand channels: monthly editorial calendars, native community management, and trend-jacking.',
        deliverables: ['Channel Management', 'Editorial Calendar', 'Community Engagement']
      },
      {
        name: 'Creator & Influencer Discovery',
        desc: 'Data-driven talent scouting to identify high-affinity creators with authentic audience demographics and proven engagement.',
        deliverables: ['Curated Talent Roster', 'Audience Demographics Audit', 'Vetting Reports']
      },
      {
        name: 'Contract & Campaign Logistics',
        desc: 'Brief formulation, deliverables tracking, licensing terms, FTC compliance, and prompt payout administration.',
        deliverables: ['Standard Legal Agreements', 'Deliverable Milestones', 'Automated Payouts']
      },
      {
        name: 'Trend Surfing & Rapid Creative',
        desc: 'Rapid-response creative concepts that capitalize on emerging cultural momentum before trends saturate.',
        deliverables: ['Weekly Trend Briefings', 'Hook Scripts', 'Fast-Turnaround Concepts']
      },
      {
        name: 'Paid Creator Whitelisting (Spark Ads)',
        desc: 'Running paid ad spend directly through creator handles on TikTok and Instagram to maximize authenticity and ROAS.',
        deliverables: ['Ad Account Access Setup', 'Whitelisted Campaigns', 'Cost-per-Acquisition Telemetry']
      },
      {
        name: 'Attribution & Performance Reporting',
        desc: 'Granular tracking of creator campaigns via custom UTM parameters, affiliate links, and multi-touch attribution models.',
        deliverables: ['Monthly Attribution Dashboard', 'CAC Analysis', 'ROI Breakdown']
      }
    ],
    process: [
      {
        step: 'Phase 01',
        title: 'Audience Mapping & Creator Sourcing',
        description: 'We analyze your target customer profile, audit creator engagement metrics, remove fake followers, and assemble a high-affinity creator roster.'
      },
      {
        step: 'Phase 02',
        title: 'Briefing, Seeding & Content Creation',
        description: 'We send creative briefs that leave room for authentic creator voice while guaranteeing product key messages, and coordinate sample seeding.'
      },
      {
        step: 'Phase 03',
        title: 'Distribution, Whitelisting & Scaling',
        description: 'Content goes live synchronized across channels. We monitor real-time comment sentiment, whitelist top-performing organic videos, and scale spend.'
      }
    ],
    deliverables: [
      'Comprehensive monthly social content calendar',
      'Fully vetted network of 20-50 verified creators',
      'Standardized contracts and usage rights licenses',
      'Raw video asset repository for paid marketing reuse',
      'Real-time analytics dashboard with conversion tracking'
    ],
    faqs: [
      {
        q: 'How do you vet creators for brand safety and authenticity?',
        a: 'We evaluate historical engagement rates, audience geography, comment sentiment quality, and bot detection tools. We never partner with creators who buy followers or engagement.'
      },
      {
        q: 'Who handles creator negotiations and legal contracts?',
        a: 'We do. We formulate comprehensive creator agreements covering deliverables, revision cycles, exclusivity clauses, usage rights, and FTC compliance.'
      },
      {
        q: 'Which platforms do you manage campaigns on?',
        a: 'Our primary focus is TikTok, Instagram (Reels & Stories), YouTube Shorts, and X (Twitter). We tailor formats natively for each ecosystem.'
      },
      {
        q: 'Can we reuse creator content in our paid ads?',
        a: 'Yes. Every contract we negotiate includes digital advertising usage rights, allowing your growth team to run creator clips as Facebook, Instagram, and TikTok ads.'
      }
    ]
  },
  {
    id: 'creative-production',
    slug: 'creative-production',
    number: '03',
    discipline: '03 // Brand & Visuals',
    category: 'Brand & Visuals',
    title: 'Creative Production & Branding',
    shortTitle: 'Creative & Brand',
    tagline: 'Distinctive brand identities and scroll-stopping video production built with tactile craftsmanship.',
    lead: 'We construct magnetic visual identities and high-retention video assets that stop the scroll. From comprehensive brand systems to daily short-form reels, we craft aesthetics that make lasting impressions.',
    narrativeHeading: 'Distinctive visual systems that refuse to be ignored.',
    narrative: [
      'In a sea of interchangeable AI-generated templates and cookie-cutter corporate palettes, personality is your ultimate competitive moat. We build brands that look, feel, and sound like real people crafted with obsession.',
      'Our studio combines vintage typographic heritage with modern digital kinetic design. We deliver cohesive visual systems—complete with logomarks, typography scales, chromatic tokens, and cinema-grade short-form video production that command immediate respect.'
    ],
    metrics: [
      { value: '85%', label: 'Avg Video Retention' },
      { value: '40M+', label: 'Organic Video Views' },
      { value: '100%', label: 'Custom Brand Assets' },
      { value: '14 Days', label: 'Rapid Sprint Turnaround' }
    ],
    capabilities: [
      {
        name: 'Brand Identity & Design Systems',
        desc: 'Comprehensive visual foundations: responsive logo marks, typography scales, chromatic palettes, and usage rules.',
        deliverables: ['Master Vector Logo Suite', 'Color & Font Tokens', 'Comprehensive Brand Bible']
      },
      {
        name: 'Short-Form Video Production',
        desc: 'Algorithm-optimized vertical videos engineered for TikTok, Instagram Reels, and YouTube Shorts with hooked retention.',
        deliverables: ['Weekly Video Batches', 'Paced Motion Cuts', 'Subtitled Vertical Formats']
      },
      {
        name: 'Commercial Post-Production',
        desc: 'High-fidelity video editing, cinema-grade color grading, sound design, and kinetic title sequences.',
        deliverables: ['Color Grading (DaVinci)', 'Foley & Sound Design', 'Custom Title Animation']
      },
      {
        name: 'Graphic Design & Digital Collateral',
        desc: 'Multi-platform advertising assets, investor pitch decks, digital marketing collateral, and apparel design.',
        deliverables: ['Investor Decks', 'Display Ad Sets', 'Social Media Templates']
      },
      {
        name: 'Motion Identity & 2D Animation',
        desc: 'Kinetic vector animations, animated logo reveals, micro-interactions, and responsive SVG brand iconography.',
        deliverables: ['Lottie / Rive Animations', 'Animated Logos', 'SVG Icon Sets']
      },
      {
        name: 'Packaging & Tangible Brand Goods',
        desc: 'Physical packaging design, unboxing experiences, merchandise, and print production management.',
        deliverables: ['Dielines & Print Proofs', 'Custom Apparel Assets', 'Unboxing Collateral']
      }
    ],
    process: [
      {
        step: 'Phase 01',
        title: 'Visual Positioning & Moodboards',
        description: 'We explore visual references, typographic history, and competitive contrast to establish a clear creative direction and mood matrix.'
      },
      {
        step: 'Phase 02',
        title: 'Concept Development & Kinetic Tests',
        description: 'We craft multiple distinct design concepts, animating key elements and testing how the identity behaves in real-world digital contexts.'
      },
      {
        step: 'Phase 03',
        title: 'Asset Packaging & Style Guide',
        description: 'We generate production-ready vector suites, compile Figma design token libraries, and author the definitive brand guidelines manual.'
      }
    ],
    deliverables: [
      'Master logo vector package (SVG, EPS, PNG, PDF)',
      'Complete typography system with licensed web fonts',
      'Figma design token system for engineering handoff',
      'Batch-edited vertical short-form video reels (4K master)',
      'Interactive digital brand guidelines document'
    ],
    faqs: [
      {
        q: 'What is included in a complete Brand Identity sprint?',
        a: 'A full sprint includes primary and secondary logomarks, typography rules, color palette tokens, iconography, social media kit, business collateral, and a comprehensive brand bible in Figma.'
      },
      {
        q: 'How do you optimize short-form videos for high retention?',
        a: 'We engineer the first 3 seconds with visual pattern interrupts and compelling audio hooks. We use kinetic captions, fast-paced jump cuts, and dynamic SFX to keep watch time above 80%.'
      },
      {
        q: 'Can you refresh an existing brand without starting from scratch?',
        a: 'Absolutely. Many clients come to us with a recognized logo that simply feels dated or lacks digital adaptability. We modernize the system while honoring existing brand equity.'
      },
      {
        q: 'Do you deliver source files?',
        a: 'Yes. You receive all editable Figma projects, Adobe After Effects / Premiere project files, DaVinci project files, and raw vectors.'
      }
    ]
  },
  {
    id: 'digital-growth',
    slug: 'digital-growth',
    number: '04',
    discipline: '04 // Scale & Authority',
    category: 'Scale & Authority',
    title: 'Digital Growth & Inbound Demand',
    shortTitle: 'Digital Growth',
    tagline: 'Sustainable customer acquisition through technical SEO, conversion funnels, and data telemetry.',
    lead: 'Engineering without audience is invisible. We install sustainable customer acquisition pipelines through technical SEO, performance marketing, and digital transformation initiatives that compound over time.',
    narrativeHeading: 'Predictable demand that compounds without rising ad costs.',
    narrative: [
      'Paid ads stop working the second you turn off the budget. True enterprise value comes from compounding assets: organic search dominance, automated inbound lead funnels, and high-converting user journeys.',
      'We combine programmatic SEO, technical web architecture, and ruthless CRO (Conversion Rate Optimization). By identifying high-intent search queries and deploying edge-rendered directory pages, we build growth engines that work 24/7.'
    ],
    metrics: [
      { value: '+140%', label: 'Organic Search Lift' },
      { value: '3.2x', label: 'Average ROAS' },
      { value: '-45%', label: 'Customer Acq Cost' },
      { value: 'Top 3', label: 'Google Rankings' }
    ],
    capabilities: [
      {
        name: 'Technical & Programmatic SEO',
        desc: 'Advanced structured schema, automated indexation architectures, topical authority clustering, and Core Web Vitals optimization.',
        deliverables: ['SEO Technical Audit', 'Dynamic Sitemap System', 'Topical Content Scaffolds']
      },
      {
        name: 'Conversion Lead Generation',
        desc: 'Frictionless inbound lead funnels, high-intent landing page testing, and multi-step conversion forms.',
        deliverables: ['Custom Lead Capture Forms', 'CRM Pipeline Integration', 'Automated Email Handlers']
      },
      {
        name: 'Search Presence & Knowledge Graphs',
        desc: 'Google Business optimization, corporate knowledge panel claiming, brand entity reconciliation, and reputation monitoring.',
        deliverables: ['Entity Reconciliation', 'Knowledge Graph Setup', 'Brand SERP Optimization']
      },
      {
        name: 'Business Digitization & Tooling',
        desc: 'Transitioning manual, paper-based operations into streamlined custom internal web dashboards and automated databases.',
        deliverables: ['Internal Portals', 'Automated Workflows', 'Database Migration']
      },
      {
        name: 'A/B Testing & Funnel Telemetry',
        desc: 'Statistical multivariate split-testing on value propositions, CTA copy, checkout funnels, and button placements.',
        deliverables: ['A/B Experiment Matrix', 'Hotjar / Clarity Heatmaps', 'Statistical Significance Reports']
      },
      {
        name: 'Retention & Email Automation',
        desc: 'Behavior-triggered email flows, customer onboarding sequences, churn prevention, and lifecycle re-engagement.',
        deliverables: ['Klaviyo / Loops Setup', 'Automated Drip Sequences', 'Segmented Retention Triggers']
      }
    ],
    process: [
      {
        step: 'Phase 01',
        title: 'Telemetry Audit & Opportunity Modeling',
        description: 'We audit your conversion telemetry, identify search demand gaps, dissect competitors, and map high-intent user keywords.'
      },
      {
        step: 'Phase 02',
        title: 'Funnel Architecture & SEO Engineering',
        description: 'We engineer programmatic landing page templates, implement structured data schemas, and deploy automated lead tracking.'
      },
      {
        step: 'Phase 03',
        title: 'Experimentation & Continuous Scale',
        description: 'We run weekly A/B testing sprints, analyze heatmaps and session recordings, and continuously refine user journeys for maximum revenue.'
      }
    ],
    deliverables: [
      'Comprehensive Technical SEO roadmap and audit document',
      'Programmatic landing page architecture on Astro / Edge',
      'Automated CRM integration (Hubspot, Supabase, or Airtable)',
      'Custom conversion telemetry dashboard in Looker / GA4',
      'Bi-weekly performance sprint reviews and growth updates'
    ],
    faqs: [
      {
        q: 'How fast do technical SEO improvements show up in Google rankings?',
        a: 'Technical fixes (schema, crawlability, speed) often yield indexation and rank improvements within 2 to 4 weeks. Broader keyword authority typically compounds significantly within 3 to 6 months.'
      },
      {
        q: 'How is Lowkeydevs different from typical SEO agencies?',
        a: 'Traditional agencies sell monthly blog posts that nobody reads. We engineer programmatic platforms, sub-50ms edge rendering, structured schema data, and high-conversion funnels that build real search dominance.'
      },
      {
        q: 'Can growth engineering be bundled with our web build?',
        a: 'Yes! In fact, that is the most effective approach. By baking SEO architecture, schema tags, and conversion telemetry into the web build from day one, you launch already optimized for scale.'
      },
      {
        q: 'How do you measure campaign ROI?',
        a: 'We track closed revenue, qualified pipeline leads, and customer acquisition cost (CAC)—not vanity impressions or generic page views.'
      }
    ]
  }
];

