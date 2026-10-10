import Link from "next/link";
import { journey } from "@/lib/constants";
import { Reveal } from "@/components/ui/reveal";

/**
 * ExperienceSummary — the home page's one-screen version of the journey.
 *
 * The full chapters (summary, bullets, stack) live on /about. Repeating them
 * here made the two pages read as the same page twice; the home page only
 * needs the shape of the path and a way into it.
 */
export function ExperienceSummary() {
  const chapters = [...journey].reverse();

  return (
    <section
      id="experience"
      className="relative py-16 md:py-24 border-t border-hairline"
    >
      <div className="container-edit">
        <div className="flex items-baseline justify-between mb-12 md:mb-16">
          <p className="section-tag">(Journey ／ 05)</p>
          <p className="eyebrow hidden md:block">
            — {journey.length} chapters · 2016 → now
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10">
          <Reveal className="lg:col-span-5">
            <h2 className="display-xl font-display">
              Not a résumé.
              <br />
              <span className="italic accent-text">A path.</span>
            </h2>
            <Link
              href="/about#experience"
              className="mt-8 btn-magnetic btn-magnetic--ghost"
            >
              <span>The full path</span>
              <span aria-hidden>→</span>
            </Link>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-7">
            <ol className="border-t border-hairline">
              {chapters.map((step) => (
                <li
                  key={step.id}
                  className="grid grid-cols-12 gap-4 py-5 border-b border-hairline items-baseline"
                >
                  <span className="col-span-12 sm:col-span-4 label-mono text-[var(--ink-muted)] tabular-nums">
                    {step.period}
                  </span>
                  <span className="col-span-12 sm:col-span-8">
                    <span className="font-display text-xl md:text-2xl block leading-tight">
                      {step.title}
                    </span>
                    <span className="label-mono text-[var(--ink-muted)]">
                      {step.org}
                      {"type_label" in step && step.type_label
                        ? ` · ${step.type_label}`
                        : ""}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
