import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Reveal } from "@/components/ui/reveal";
import { Magnetic } from "@/components/ui/magnetic";
import { PILLAR_LABEL, pillarUppercase } from "@/lib/brand";
import { formatMonth } from "@/lib/pillar-log";
import { siteConfig } from "@/lib/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ML / AI",
  description:
    "Machine-learning work by Emmanuel Adiba — published Kaggle notebooks, and the topics planned next.",
  alternates: { canonical: "/ml-ai" },
};

// Published = a public repo with results in its README. Planned = not
// written yet, and labelled that way. Nothing moves from one list to the
// other until there is something to link to.
const PUBLISHED = [
  {
    title: "House prices — advanced regression",
    detail:
      "A leak-free scikit-learn pipeline compared across three models with 5-fold cross-validation. Gradient boosting won: CV RMSE 0.1271 (log-dollars), Kaggle public score 0.13211.",
    date: "2026-05-23",
    href: "https://github.com/AdibaEmma/advance_regression",
  },
  {
    title: "Titanic — survival classification",
    detail:
      "A first end-to-end binary classifier, with the notes on what I did and did not yet understand. Kaggle public score ≈ 0.76 accuracy.",
    date: "2026-05-20",
    href: "https://github.com/AdibaEmma/ml-kaggle",
  },
];

const PLANNED = [
  "Vector search for semantic resume parsing",
  "Fine-tuning Llama on Stoic philosophy",
  "Behavioral economics in payment UX",
  "Bayesian models for personal forecasting",
];

export default function MLAIPage() {
  return (
    <>
      <Navbar />
      <main className="relative pt-12 md:pt-16">
        <section className="container-edit pt-24 pb-32 relative">
          <div className="hero-glow" aria-hidden />

          <div className="flex items-baseline justify-between mb-6">
            <p className="section-tag">({pillarUppercase("thinker")} · 04)</p>
            <p className="eyebrow hidden md:block">— Early, and learning in public</p>
          </div>
          <Reveal delay={0.05}>
            <p className="eyebrow accent-text mb-8">
              The {PILLAR_LABEL.thinker} pillar — the lab.
            </p>
          </Reveal>

          <Reveal>
            <h1 className="display-xl font-display leading-[0.9]">
              Where code
              <br />
              meets <span className="italic accent-text">cognition.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.1} className="mt-16 max-w-3xl space-y-6">
            <p className="font-display text-2xl md:text-3xl leading-tight">
              A small lab at the seam between engineering and psychology —
              between deterministic systems and the messy logic of human
              decision-making.
            </p>
            <p className="text-[var(--foreground)]/75 text-base md:text-lg leading-relaxed max-w-xl">
              It starts with the fundamentals: working machine-learning problems
              end to end and writing down, plainly, what I understand and what I
              do not yet. Each notebook below is public, with its results in the
              README.
            </p>
          </Reveal>

          <div className="mt-20 grid lg:grid-cols-12 gap-10">
            <Reveal delay={0.15} className="lg:col-span-7">
              <h2 className="eyebrow mb-4">(Published — {PUBLISHED.length} notebooks)</h2>
              <ul className="border-t border-hairline">
                {PUBLISHED.map((item) => (
                  <li key={item.href} className="border-b border-hairline">
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block py-6"
                    >
                      <span className="flex items-baseline justify-between gap-4">
                        <span className="font-display text-2xl md:text-3xl leading-tight group-hover:text-[var(--accent)] transition-colors">
                          {item.title}
                        </span>
                        <time
                          dateTime={item.date}
                          className="label-mono text-[var(--ink-muted)] shrink-0"
                        >
                          {formatMonth(item.date)}
                        </time>
                      </span>
                      <span className="mt-2 block text-[var(--ink-secondary)] max-w-xl">
                        {item.detail}
                      </span>
                      <span className="mt-3 block label-mono accent-text">
                        ↗ Notebook on GitHub
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.25} className="lg:col-span-5">
              <div className="rounded-md border border-dashed border-hairline p-8 space-y-4">
                <h2 className="eyebrow">(Planned — not written yet)</h2>
                <ul className="space-y-3">
                  {PLANNED.map((d, i) => (
                    <li
                      key={d}
                      className="flex gap-3 items-baseline border-b border-hairline pb-3 last:border-b-0 last:pb-0"
                    >
                      <span className="label-mono text-[var(--muted-foreground)] tabular-nums">
                        ／0{i + 1}
                      </span>
                      <span className="font-display text-lg text-[var(--ink-secondary)]">{d}</span>
                    </li>
                  ))}
                </ul>
                <p className="label-mono text-[var(--ink-muted)]">
                  Topics, not drafts. They appear on the left when there is
                  something to read.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.35} className="mt-16 flex flex-wrap items-center gap-4">
            <Magnetic strength={0.2}>
              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-magnetic btn-magnetic--primary"
              >
                <span>Follow new work on GitHub</span>
                <span aria-hidden>↗</span>
              </a>
            </Magnetic>
            <p className="label-mono text-[var(--ink-muted)]">
              ※ There is no mailing list. New notebooks land on GitHub first.
            </p>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
