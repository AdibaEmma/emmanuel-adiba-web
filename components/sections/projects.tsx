"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import { projects } from "@/lib/constants";
import {
  PILLARS,
  PILLAR_LABEL,
  PILLAR_TAGLINE,
  Pillar,
} from "@/lib/brand";
import { Reveal } from "@/components/ui/reveal";
import { ProjectCard } from "@/components/sections/project-card";
import { cn } from "@/lib/utils";

type Filter = "all" | Pillar;
const FILTERS: Filter[] = ["all", ...PILLARS];

export function ProjectsSection() {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo(
    () =>
      filter === "all"
        ? projects
        : projects.filter((p) => p.pillars.includes(filter)),
    [filter],
  );

  // Counts per filter for the chip badges
  const counts = useMemo(() => {
    const c: Record<Filter, number> = {
      all: projects.length,
      engineer: 0,
      builder: 0,
      thinker: 0,
      founder: 0,
    };
    projects.forEach((p) => p.pillars.forEach((pl) => (c[pl] += 1)));
    return c;
  }, []);

  return (
    <section className="relative pt-24 pb-32">
      <div className="container-edit">
        <div className="flex items-baseline justify-between mb-12">
          <p className="section-tag">(Index ／ 03)</p>
          <p className="eyebrow hidden md:block">
            — {projects.length} entries · across four pillars
          </p>
        </div>

        <Reveal>
          <h1 className="display-xl font-display leading-[0.9]">
            Selected
            <br />
            <span className="italic accent-text">work.</span>
          </h1>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mt-8 max-w-xl text-[var(--foreground)]/70 text-base md:text-lg">
            Sorted by pillar, not by date. Engineer is client work at GTN.
            Builder is side builds that have not launched. Thinker is the lab.
            Founder is venture work with users and revenue intent. Each card
            says where it stands, and links out only when there is something
            public to see.
          </p>
        </Reveal>

        {/* Filter chips — driven entirely by PILLARS */}
        <Reveal
          delay={0.25}
          className="mt-16 flex flex-wrap gap-2 border-b border-hairline pb-6"
        >
          {FILTERS.map((c) => {
            const active = filter === c;
            const label = c === "all" ? "All" : PILLAR_LABEL[c];
            return (
              <button
                key={c}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(c)}
                className={cn(
                  "label-mono uppercase rounded-full px-4 min-h-11 border transition-all flex items-center gap-2",
                  active
                    ? "bg-[var(--accent)] text-[var(--accent-foreground)] border-[var(--accent)]"
                    : "border-hairline text-[var(--ink-muted)] hover:text-[var(--foreground)]",
                )}
              >
                <span>{label}</span>
                <span
                  className={cn(
                    "tabular-nums text-[0.65rem]",
                    active
                      ? "text-[var(--accent-foreground)]/60"
                      : "text-[var(--ink-muted)]",
                  )}
                >
                  {counts[c]}
                </span>
              </button>
            );
          })}
          <span
            className="label-mono w-full sm:w-auto sm:ml-auto self-center text-[var(--ink-muted)]"
            aria-live="polite"
          >
            ／ {filtered.length} shown
            {filter !== "all" && (
              <span className="ml-2 italic accent-text">
                — {PILLAR_TAGLINE[filter as Pillar]}
              </span>
            )}
          </span>
        </Reveal>

        {/* Editorial bento — every 3rd card spans full width for visual rhythm */}
        <div className="mt-16 grid gap-6 md:grid-cols-12">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <ProjectCard key={p.id} project={p} wide={i % 3 === 0} index={i} />
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && filter !== "all" && (
          <EmptyFilter pillar={filter} />
        )}


      </div>
    </section>
  );
}

/**
 * Shown when a pillar has no project cards. Today that is Thinker, whose
 * work is notebooks and notes rather than products, and lives on /ml-ai.
 */
function EmptyFilter({ pillar }: { pillar: Pillar }) {
  return (
    <div className="rounded-md border border-dashed border-hairline p-8 md:p-12 max-w-2xl">
      <p className="eyebrow mb-3">({PILLAR_LABEL[pillar]} ／ no product cards)</p>
      <p className="font-display text-2xl md:text-3xl leading-snug">
        {pillar === "thinker"
          ? "The thinking work is notebooks and notes, not products — so it lives on its own page."
          : "Nothing in this pillar yet."}
      </p>
      {pillar === "thinker" && (
        <Link href="/ml-ai" className="mt-6 btn-magnetic btn-magnetic--primary">
          <span>Open the ML/AI lab</span>
          <span aria-hidden>→</span>
        </Link>
      )}
    </div>
  );
}
