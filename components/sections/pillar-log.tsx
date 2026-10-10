import Link from 'next/link'
import { PILLARS, pillarUppercase } from '@/lib/brand'
import { PILLAR_ENTRIES, formatMonth } from '@/lib/pillar-log'

/**
 * Pillar Log — the latest evidence for each of the four pillars, authored
 * in `lib/pillar-log.ts`. Together they replace the "trust me" version of the
 * four-pillar identity with a dated artifact per pillar.
 */
export function PillarLog() {

  return (
    <section
      id="pillar-log"
      aria-label="Pillar log — latest evidence per pillar"
      className="relative py-16 md:py-24 border-t border-hairline overflow-hidden"
    >
      <div className="container-edit">
        <div className="flex items-baseline justify-between mb-12 md:mb-16">
          <p className="section-tag">(Pillar Log ／ 04)</p>
          <p className="eyebrow hidden md:flex items-center gap-2">
            <span>— Dated · updated as milestones land</span>
          </p>
        </div>

        <div className="max-w-3xl mb-12 md:mb-16">
          <h2 className="display-xl font-display">
            Four pillars.{' '}
            <span className="italic accent-text">Four artifacts</span>,
            <br />
            each one dated.
          </h2>
          <p className="mt-6 text-base md:text-lg text-[var(--ink-muted)] max-w-xl">
            Most portfolios claim. This one shows the most recent piece of
            client work, side build, experiment and venture milestone — with
            the month it happened, so you can judge how fresh it is.
          </p>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--rule)] border border-hairline">
          {PILLARS.map((p, i) => {
            const entry = PILLAR_ENTRIES[p]
            const isExternal = entry.href?.startsWith('http')
            return (
              <li
                key={p}
                className="group relative bg-[var(--background)] p-6 md:p-8 flex flex-col min-h-[220px]"
              >
                <div className="flex items-baseline justify-between mb-6">
                  <span className="label-mono uppercase tracking-[0.18em] text-[var(--ink-muted)]">
                    ／{(i + 1).toString().padStart(2, '0')} ·{' '}
                    <span className="text-[var(--foreground)]">
                      {pillarUppercase(p)}
                    </span>
                  </span>
                  <time dateTime={entry.date} className="label-mono text-[var(--ink-muted)]">
                    {formatMonth(entry.date)}
                  </time>
                </div>

                <h3 className="font-display text-2xl md:text-3xl leading-tight text-[var(--foreground)]">
                  {entry.headline}
                </h3>

                {entry.detail && (
                  <p className="mt-3 text-sm md:text-base text-[var(--ink-muted)] leading-relaxed">
                    {entry.detail}
                  </p>
                )}

                {entry.href && (
                  <div className="mt-auto pt-6">
                    {isExternal ? (
                      <a
                        href={entry.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-edit label-mono uppercase text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors"
                      >
                        ↗ {entry.cta ?? 'open'}
                      </a>
                    ) : (
                      <Link
                        href={entry.href}
                        className="link-edit label-mono uppercase text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors"
                      >
                        → {entry.cta ?? 'open'}
                      </Link>
                    )}
                  </div>
                )}
              </li>
            )
          })}
        </ul>

      </div>
    </section>
  )
}
