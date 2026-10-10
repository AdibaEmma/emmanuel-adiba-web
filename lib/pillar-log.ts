/**
 * Pillar Log — the source of truth for "latest evidence" per pillar.
 *
 * Every claim on the homepage that names a pillar maps back to one entry
 * here. All four are authored by hand as milestones land.
 *
 * The engineer cell used to be fetched from the GitHub public events API
 * with hourly ISR. Most work lives in private repos, so the feed came back
 * empty and the cell showed a fallback stamped "today" — and the hourly
 * regeneration on Vercel rendered the navbar with the wrong active route,
 * which caused a hydration mismatch (React #418). Authored entries are
 * slower to update but never claim a freshness they do not have.
 *
 * Dates are shown as absolute months, never "n days ago": a statically
 * rendered relative date is frozen at build time and quietly goes wrong.
 */

import type { Pillar } from './brand'

export type PillarEntry = {
  pillar: Pillar
  /** Tight headline — verb-led when possible, < 60 chars. */
  headline: string
  /** Optional secondary detail. < 90 chars. */
  detail?: string
  /** ISO date of the underlying event (commit, ship, publish, milestone). */
  date: string
  /** Optional outbound link to the artifact. */
  href?: string
  /** Short label shown next to the link affordance. */
  cta?: string
}

export const PILLAR_ENTRIES: Record<Pillar, PillarEntry> = {
  engineer: {
    pillar: 'engineer',
    headline: 'Vacation Branson — multi-product Laravel platform',
    detail: 'Client work at GTN, alongside the Compliance Scorecard MCP server.',
    date: '2026-10-06',
    href: '/projects#vacation-branson',
    cta: 'see client work',
  },
  builder: {
    pillar: 'builder',
    headline: 'BookLoop — book exchange MVP, source on GitHub',
    detail: 'NestJS API, Expo app and Next.js admin. Not launched.',
    date: '2026-07-13',
    href: 'https://github.com/AdibaEmma/bookloop-api',
    cta: 'read the code',
  },
  thinker: {
    pillar: 'thinker',
    headline: 'House prices — a leak-free regression pipeline',
    detail: '5-fold CV RMSE 0.1271 against a Kaggle public score of 0.13211.',
    date: '2026-05-23',
    href: '/ml-ai',
    cta: 'see the lab',
  },
  founder: {
    pillar: 'founder',
    headline: 'ImportBrain opens paid plans',
    detail: 'Paystack billing, with a founder plan capped at 20 accounts.',
    date: '2026-10-03',
    href: 'https://importbrain.net',
    cta: 'open importbrain.net',
  },
}

/** "Oct 2026" — stable regardless of when the page was rendered. */
export function formatMonth(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  })
}
