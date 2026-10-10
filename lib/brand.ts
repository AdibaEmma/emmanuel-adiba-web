/**
 * Brand pillars — the single source of truth.
 *
 * The site is composed around four pillars in a fixed order:
 *   Engineer · Builder · Thinker · Founder
 *
 * Every surface that names a pillar (hero eyebrow, about beats,
 * projects filters, project cards, ml/ai eyebrow) MUST resolve through
 * this constant. No string literals — deleting any pillar word from the
 * source must break or desync the site.
 *
 * Order is canonical. Do not reorder, even alphabetically.
 */

export const PILLARS = ['engineer', 'builder', 'thinker', 'founder'] as const

export type Pillar = (typeof PILLARS)[number]

/** Human-readable, capitalized label for display. */
export const PILLAR_LABEL: Record<Pillar, string> = {
  engineer: 'Engineer',
  builder: 'Builder',
  thinker: 'Thinker',
  founder: 'Founder',
}

/**
 * One-line definitions used as taglines/eyebrow descriptions across the site.
 * Editorial, terse. No buzzwords.
 */
export const PILLAR_TAGLINE: Record<Pillar, string> = {
  engineer: 'Client work at GTN.',
  builder: 'Side builds, unreleased.',
  thinker: 'The ML/AI lab.',
  founder: 'Ventures with users and revenue intent.',
}

/** Longer beat description for the about page. */
export const PILLAR_DESCRIPTION: Record<Pillar, string> = {
  engineer:
    'Software developer at Global Tech Network, a US software firm, working remotely from Bolgatanga. Laravel, React, NestJS and Stripe Connect on client products — Vacation Branson, iTargetGolf, Fortiffi and Compliance Scorecard. The job is to make complex payment and operational systems feel quiet and inevitable.',
  builder:
    'What I build when no one is asking. BookLoop and SlamPact are complete enough to run and have not been launched — each one a question about a market I wanted to answer in code before answering it with money.',
  thinker:
    'The lab, early. Working through machine-learning problems end to end — classification, then regression — and writing down what I understand and what I do not yet. The seam between deterministic systems and the messy logic of human decision-making is where I keep returning.',
  founder:
    'Ventures with users and revenue intent. Portforge Technologies, my registered business in Bolgatanga, runs GearDockGH — technology retail for the Upper East — and ImportBrain, landed-cost software for importers. Wayve, a group-trip platform for Ghana, is a separate venture.',
}

/** Bullet points used on /about under each pillar — concrete proof. */
export const PILLAR_BULLETS: Record<Pillar, string[]> = {
  engineer: [
    'GTN — Vacation Branson · iTargetGolf · Fortiffi · Compliance Scorecard',
    'Stack — Laravel, React, NestJS, MySQL, PostgreSQL',
    'Focus — payments (Stripe Connect, ACH), MCP servers, real-time UX',
  ],
  builder: [
    'BookLoop — book exchange for Ghana, source on GitHub',
    'SlamPact — reviews that turn into donations, unreleased',
  ],
  thinker: [
    'Titanic survival — binary classification, Kaggle',
    'House prices — leak-free regression pipeline, Kaggle',
    'Planned: vector search, LLM tooling, behavioural economics in payment UX',
  ],
  founder: [
    'Portforge Technologies — registered business, Bolgatanga',
    'GearDockGH — live · ImportBrain — early access',
    'Wayve — separate venture, early beta',
  ],
}

/** Pillar word as a CSS class hint (for accent variation if ever needed). */
export const pillarUppercase = (p: Pillar): string => PILLAR_LABEL[p].toUpperCase()
