export const siteConfig = {
  name: 'Emmanuel Adiba',
  title: 'Software Engineer · Ghana',
  description:
    'Software engineer in Bolgatanga, Ghana. Client products at Global Tech Network, founder of Portforge Technologies, and a small ML/AI lab on the side.',
  url: 'https://emmanuel-adiba.vercel.app',
  email: 'eabaagah@gmail.com',
  phone: ['+233556137400'],
  location: 'Bolgatanga, Upper East — Ghana',
  // Business enquiries go to the company site; this one is the personal record.
  portforge: {
    name: 'Portforge Technologies',
    url: 'https://portforge-web-production.up.railway.app',
  },
  sourceUrl: 'https://github.com/AdibaEmma/emmanuel-adiba-web',
  social: {
    twitter: 'https://www.twitter.com/emmanuel_adiba',
    linkedin: 'https://www.linkedin.com/in/emmanuel-adiba/',
    facebook: 'https://www.facebook.com/adiba.emmanuel.5',
    github: 'https://www.github.com/AdibaEmma',
  },
}

export const navItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Projects', href: '/projects' },
  { name: 'ML/AI', href: '/ml-ai' },
  { name: 'Now', href: '/now' },
  { name: 'Contact', href: '/contact' },
]

// Aligned to CV
export const skills = {
  languages: [
    { name: 'TypeScript', icon: 'devicon-typescript-plain' },
    { name: 'JavaScript', icon: 'devicon-javascript-plain' },
    { name: 'PHP', icon: 'devicon-php-plain' },
    { name: 'Java', icon: 'devicon-java-plain' },
    { name: 'Kotlin', icon: 'devicon-kotlin-plain' },
    { name: 'Python', icon: 'devicon-python-plain' },
  ],
  frontend: [
    { name: 'React', icon: 'devicon-react-plain' },
    { name: 'Next.js', icon: 'devicon-nextjs-plain' },
    { name: 'Redux', icon: 'devicon-redux-plain' },
    { name: 'Tailwind', icon: 'devicon-tailwindcss-plain' },
  ],
  backend: [
    { name: 'Node.js', icon: 'devicon-nodejs-plain' },
    { name: 'NestJS', icon: 'devicon-nestjs-plain' },
    { name: 'Express', icon: 'devicon-express-original' },
    { name: 'Laravel', icon: 'devicon-laravel-plain' },
    { name: 'Spring Boot', icon: 'devicon-spring-plain' },
    { name: 'Hibernate', icon: 'devicon-hibernate-plain' },
    { name: 'Spring Cloud', icon: 'devicon-spring-plain' },
  ],
  database: [
    { name: 'PostgreSQL', icon: 'devicon-postgresql-plain' },
    { name: 'MySQL', icon: 'devicon-mysql-plain' },
    { name: 'MongoDB', icon: 'devicon-mongodb-plain' },
    { name: 'DynamoDB', icon: 'devicon-amazonwebservices-original' },
    { name: 'Flyway', icon: 'devicon-postgresql-plain' },
  ],
  messaging: [
    { name: 'Apache Kafka', icon: 'devicon-apachekafka-original' },
    { name: 'RabbitMQ', icon: 'devicon-rabbitmq-plain' },
    { name: 'Redis', icon: 'devicon-redis-plain' },
    { name: 'WebSockets', icon: 'devicon-socketio-original' },
  ],
  devops: [
    { name: 'Docker', icon: 'devicon-docker-plain' },
    { name: 'Kubernetes', icon: 'devicon-kubernetes-plain' },
    { name: 'GitHub Actions', icon: 'devicon-github-original' },
    { name: 'AWS', icon: 'devicon-amazonwebservices-original' },
    { name: 'Digital Ocean', icon: 'devicon-digitalocean-plain' },
    { name: 'Heroku', icon: 'devicon-heroku-plain' },
  ],
  testing: [
    { name: 'Jest', icon: 'devicon-jest-plain' },
    { name: 'JUnit', icon: 'devicon-java-plain' },
    { name: 'Mockito', icon: 'devicon-java-plain' },
    { name: 'Mockk', icon: 'devicon-kotlin-plain' },
  ],
  api: [
    { name: 'REST', icon: 'devicon-graphql-plain' },
    { name: 'GraphQL', icon: 'devicon-graphql-plain' },
    { name: 'Swagger', icon: 'devicon-swagger-plain' },
  ],
}

/**
 * Project type — every entry MUST carry `pillars` (one or more), `role`
 * (precise ownership language) and `status` (where it stands today).
 * See lib/brand.ts for the canonical pillar list.
 *
 * Ownership language rules:
 *   GTN client work → "Engineer at GTN" — never "I built", "my product".
 *                     The title on every CV is Software Developer; what was
 *                     led goes in the description, not the role.
 *   Builder work    → "Solo build"
 *   Founder work    → "Founder & Engineer"
 *
 * This site describes the contribution and the technical decisions. The
 * customer problem and business case for Portforge products live on the
 * Portforge site — link there rather than restating it.
 */
import type { Pillar } from './brand'

export type ProjectLink = {
  href: string
  /** Visible destination, e.g. "geardockgh.com" or "GitHub". */
  label: string
  kind: 'live' | 'repo'
}

export type Project = {
  id: string
  title: string
  tagline: string
  description: string
  technologies: string[]
  pillars: Pillar[]
  role: string
  /** The company the work belongs to, when it is not the person. */
  venture?: string
  year: string
  /** Where it stands today, in a few words. */
  status: string
  image: string
  /** Absent when the work is private or unpublished — the card says so instead. */
  link?: ProjectLink
  featured: boolean
  /** Substantiated facts only. */
  impact: string
}

export const projects: Project[] = [
  // ── FOUNDER ─────────────────────────────────────────────────────────────
  {
    id: 'geardockgh',
    title: 'GearDockGH',
    tagline: 'Technology retail for the Upper East.',
    description:
      "Designed and built the storefront and its API. Stock state is a first-class field: in-stock items promise 48-hour delivery in Bolgatanga, pre-orders state their wait before payment. Prices are quoted in cedis with delivery included, and payments go through Paystack — card, mobile money and bank transfer — behind signed webhooks, so every sale leaves a record on both sides. Landed costs come from ImportBrain through an integration API.",
    technologies: ['Next.js', 'NestJS', 'Prisma', 'PostgreSQL', 'BullMQ', 'Paystack'],
    pillars: ['founder'],
    role: 'Founder & Engineer',
    venture: 'Portforge Technologies',
    year: '2026',
    status: 'Live',
    link: { href: 'https://geardockgh.com', label: 'geardockgh.com', kind: 'live' },
    image: '/images/works/geardockgh.png',
    featured: true,
    impact: 'Live · taking and delivering orders in Bolgatanga',
  },
  {
    id: 'importbrain',
    title: 'ImportBrain',
    tagline: 'Landed cost and margin for Ghana’s importers.',
    description:
      'Built the multi-tenant web app and API. The batch, not the product, is the central record: goods, freight, duty and handling attach to a shipment and divide down to a per-unit landed cost in cedis. Exchange rates are stored against the transaction that paid them — the live rate is shown for context and never used in a historical figure. Billing runs on Paystack, with a founder plan capped at 20 accounts.',
    technologies: ['Next.js', 'NestJS', 'Prisma', 'PostgreSQL', 'Recharts', 'Paystack'],
    pillars: ['founder'],
    role: 'Founder & Engineer',
    venture: 'Portforge Technologies',
    year: '2026',
    status: 'Early access',
    link: { href: 'https://importbrain.net', label: 'importbrain.net', kind: 'live' },
    image: '/images/works/importbrain-dashboard.png',
    featured: true,
    impact: 'Built from Mar 2026 · paid plans opened Oct 2026',
  },
  {
    id: 'wayve',
    title: 'Wayve',
    tagline: 'Plan Ghana together.',
    description:
      'Founder and sole engineer of a group-trip platform: a shared workspace for each trip — itinerary, participants, split expenses and photos — on top of a discovery catalogue that spans all 16 regions of Ghana. A NestJS API serves a Next.js web app and an Expo mobile app. The assistant is an LLM chat with a structured intent router rather than open-ended tool calling. A separate venture from Portforge.',
    technologies: ['Next.js', 'NestJS', 'TypeORM', 'PostgreSQL', 'Expo', 'OpenAI'],
    pillars: ['founder'],
    role: 'Founder & Engineer',
    year: '2026',
    status: 'Early beta',
    link: { href: 'https://joinwayve.com', label: 'joinwayve.com', kind: 'live' },
    image: '/images/works/wayve.png',
    featured: true,
    impact: 'Early beta · web and mobile',
  },

  // ── ENGINEER (GTN client work — I am NOT the owner) ─────────────────────
  {
    id: 'itargetgolf',
    title: 'iTargetGolf',
    tagline: 'Golf tournament platform.',
    description:
      'Client work at Global Tech Network on the Cash Cup Golf platform behind iTargetGolf — a Laravel 10 application with Stripe payments and Twilio messaging. The product and its story belong to the client.',
    technologies: ['Laravel', 'PHP', 'Stripe', 'Twilio'],
    pillars: ['engineer'],
    role: 'Engineer at GTN',
    year: '2026',
    status: 'Client product · not publicly linked',
    image: '/images/works/itargetgolf.png',
    featured: true,
    impact: 'Client product · GTN LLC',
  },
  {
    id: 'vacation-branson',
    title: 'Vacation Branson',
    tagline: 'Vacation packages and show tickets in Branson, Missouri.',
    description:
      'Client work at Global Tech Network. Lead engineering on a multi-product Laravel codebase that serves Vacation Branson and Branson Show Tickets.',
    technologies: ['Laravel', 'PHP', 'OpenAI', 'AWS S3'],
    pillars: ['engineer'],
    role: 'Engineer at GTN',
    year: '2026',
    status: 'Client product · not publicly linked',
    image: '/images/works/vacation-branson.png',
    featured: false,
    impact: 'Client product · GTN LLC',
  },
  {
    id: 'compliance-scorecard',
    title: 'Compliance Scorecard',
    tagline: 'Governance software for MSPs.',
    description:
      'Client work at Global Tech Network on a Laravel back end and React front end, and on its MCP server — so an assistant can query live compliance data instead of a static export.',
    technologies: ['Laravel', 'React', 'MCP', 'PHP'],
    pillars: ['engineer'],
    role: 'Engineer at GTN',
    year: '2024 →',
    status: 'Client product · not publicly linked',
    image: '/images/works/compliance-scorecard.png',
    featured: false,
    impact: 'Client product · GTN LLC',
  },

  // ── BUILDER (side builds — unreleased) ──────────────────────────────────
  {
    id: 'bookloop',
    title: 'BookLoop',
    tagline: 'Find and swap books nearby.',
    description:
      'A mobile-first book exchange for Ghana: list a book to swap, donate or lend, browse listings nearby, meet at a safe spot and confirm the hand-over with a QR code. Built the NestJS API, the Expo app and a Next.js admin; each exchange runs on an explicit state machine.',
    technologies: ['NestJS', 'TypeORM', 'PostgreSQL', 'Expo', 'Next.js', 'Paystack'],
    pillars: ['builder'],
    role: 'Solo build',
    year: '2025',
    status: 'MVP · not launched',
    link: {
      href: 'https://github.com/AdibaEmma/bookloop-api',
      label: 'GitHub',
      kind: 'repo',
    },
    image: '',
    featured: false,
    impact: 'Unreleased · source public on GitHub',
  },
  {
    id: 'slampact',
    title: 'SlamPact',
    tagline: 'Reviews that turn into donations.',
    description:
      'A review platform from the Upper East: verified reviews of local institutions and businesses, with each review translating into a charitable contribution. Built the API, the web and admin apps and an Expo mobile app, seeded with Bolgatanga entities.',
    technologies: ['NestJS', 'Prisma', 'Supabase', 'React', 'Expo', 'Paystack'],
    pillars: ['builder'],
    role: 'Solo build',
    year: '2025',
    status: 'Unreleased · private repositories',
    image: '',
    featured: false,
    impact: 'Unreleased · no public demo',
  },
]

// All entries are noun phrases so the label "(Currently) X" reads grammatically.
export const roles = [
  'Software Engineer',
  'Backend Engineer',
  'Product Engineer',
  'ML/AI Learner',
  'Founder',
]

// Combined into a single chronological journey (oldest → newest)
export const journey = [
  {
    id: 'university',
    type: 'education' as const,
    period: '2016 — 2020',
    yearStart: 2016,
    yearEnd: 2020,
    title: 'BSc, Computer Engineering',
    org: 'University of Energy and Natural Resources',
    location: 'Sunyani, Ghana',
    chapter: 'Chapter 01',
    chapterLabel: 'Foundations',
    summary:
      'Studied computer engineering — software, systems, signal processing — and finished with a web application as the final-year project.',
    bullets: [
      'Specialized in software engineering and system design',
      'Shipped small web projects for fellow students',
      'Built a production web application as final-year project',
    ],
    technologies: ['C', 'Python', 'JavaScript', 'Computer Engineering'],
  },
  {
    id: 'turntabl',
    type: 'work' as const,
    period: 'Sep 2021 — Aug 2023',
    yearStart: 2021,
    yearEnd: 2023,
    title: 'Software Engineer',
    org: 'Turntabl Ghana',
    location: 'Accra, Ghana',
    chapter: 'Chapter 02',
    chapterLabel: 'Going deep',
    summary:
      'Two formative years on the JVM — Kotlin, Java, Spring Boot — building real-time systems and a microservice trading engine.',
    bullets: [
      'Built a real-time tech-news aggregator in Kotlin and Spring Boot serving 15,000+ active users',
      'Owned schema design and migrations end to end — DrawIO for diagrams, Flyway for production rollouts',
      'Engineered a microservice trading engine in Java and Redis, deployed in a financial-services product line',
    ],
    technologies: ['Kotlin', 'Spring Boot', 'Java', 'PostgreSQL', 'Redis', 'Flyway'],
    type_label: 'Full-time',
  },
  {
    id: 'softmelon',
    type: 'work' as const,
    period: 'Oct 2021 — Aug 2022',
    yearStart: 2021,
    yearEnd: 2022,
    title: 'Software Developer',
    org: 'Softmelon Engineering',
    location: 'Accra, Ghana',
    chapter: 'Chapter 03',
    chapterLabel: 'Leading delivery',
    summary:
      'Part-time, alongside Turntabl. Coordinated delivery on a CRM platform — a first run at a project end to end: scope, documentation, ship dates.',
    bullets: [
      'Coordinated a cross-functional team on the CRM platform and shipped ahead of schedule',
      'Built engagement features for the CRM’s users',
      'Introduced written, asynchronous updates in place of most status meetings',
    ],
    technologies: ['Java', 'Spring Boot', 'PostgreSQL', 'React', 'Docker'],
    type_label: 'Part-time',
  },
  {
    id: 'sendafrika',
    type: 'work' as const,
    period: 'Sep 2023 — Jan 2024',
    yearStart: 2023,
    yearEnd: 2024,
    title: 'Software Developer',
    org: 'SendAfrika',
    location: 'Accra, Ghana',
    chapter: 'Chapter 04',
    chapterLabel: 'Fintech, in motion',
    summary:
      "A four-month fintech contract — authentication, KYC and onboarding for SendAfrika's product on NestJS and MongoDB.",
    bullets: [
      "Built the authentication and KYC modules for SendAfrika's product on NestJS and MongoDB",
      'Delivered the onboarding flow for the MVP',
      'Wrote the testing and documentation conventions used across its services',
    ],
    technologies: ['NestJS', 'MongoDB', 'TypeScript', 'JWT', 'KYC APIs'],
    type_label: 'Contract',
  },
  {
    id: 'gtn',
    type: 'work' as const,
    period: 'Feb 2024 — Present',
    yearStart: 2024,
    yearEnd: null,
    title: 'Software Developer',
    org: 'Global Tech Network',
    location: 'Orlando, FL · Remote',
    chapter: 'Chapter 05',
    chapterLabel: 'Client products',
    summary:
      'Client products for a US software firm, from Ghana — React and NestJS first, then a run of Laravel platforms with payments at their centre.',
    bullets: [
      "Built OIT's web platform on React, NestJS, MySQL and WebSockets",
      'Lead engineering on the Vacation Branson / Branson Show Tickets Laravel codebase, with one direct report',
      'Refactored Fortiffi’s Stripe Connect payments (card, ACH, check) into a service layer that defers transfers until final payment',
      'Building the MCP server for Compliance Scorecard',
    ],
    technologies: ['Laravel', 'React', 'NestJS', 'MySQL', 'Stripe Connect', 'MCP'],
    type_label: 'Remote',
  },
  {
    id: 'founder',
    type: 'work' as const,
    period: '2026 — Present',
    yearStart: 2026,
    yearEnd: null,
    title: 'Founder · Engineer',
    org: 'Portforge Technologies · Wayve',
    location: 'Bolgatanga, Ghana',
    chapter: 'Chapter 06',
    chapterLabel: 'Building things I want to exist',
    summary:
      'Portforge Technologies, registered in Bolgatanga, runs GearDockGH and ImportBrain. Wayve is a separate venture.',
    bullets: [
      'GearDockGH — technology retail for the Upper East, live',
      "ImportBrain — landed cost and margin for Ghana's importers, early access",
      'Wayve — group-trip planning for Ghana, early beta',
    ],
    technologies: ['Next.js', 'NestJS', 'PostgreSQL', 'Paystack', 'Expo'],
    type_label: 'Founder',
  },
]

export const education = {
  degree: 'Bachelor of Science in Computer Engineering',
  institution: 'University of Energy and Natural Resources',
  location: 'Sunyani, Ghana',
  period: '2016 - 2020',
  achievements: [
    'Specialized in software engineering and system design',
    'Shipped small web projects for fellow students',
    'Built a production web application as final-year project',
  ],
}

export const resumePath = '/files/Emmanuel_Adiba_CV.pdf'
