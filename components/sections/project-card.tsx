"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import type { Project } from "@/lib/constants";
import { pillarUppercase } from "@/lib/brand";
import { ProjectCover } from "@/components/ui/project-cover";
import { cn } from "@/lib/utils";

/**
 * One entry on /projects. The card is a link only when there is somewhere
 * public to go; private client work and unreleased builds render as a plain
 * card that states its status, so nothing promises a destination it lacks.
 */
export function ProjectCard({
  project: p,
  wide,
  index,
}: {
  project: Project;
  wide: boolean;
  index: number;
}) {
  const primaryPillar = p.pillars[0];

  const body = (
    <>
      {/* Visual area — real screenshot OR typographic draft cover */}
      <div
        className={cn(
          "relative overflow-hidden",
          wide ? "aspect-[16/10] md:aspect-auto md:min-h-[360px]" : "aspect-[16/10]",
        )}
      >
        {p.image ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.image}
              alt={`${p.title} — screenshot`}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover object-top brightness-[0.85] saturate-90 group-hover:brightness-100 group-hover:saturate-100 group-hover:scale-[1.03] transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)]/60 via-transparent to-transparent" />
          </>
        ) : (
          <ProjectCover title={p.title} tagline={p.tagline} pillar={primaryPillar} />
        )}

        {/* Pillar tag — top-left */}
        <div className="absolute top-3 left-3 label-mono uppercase tracking-[0.18em] flex items-center gap-2 rounded-full bg-[var(--background)]/85 px-2.5 py-1 accent-text">
          <span aria-hidden>●</span>
          <span>{pillarUppercase(primaryPillar)}</span>
        </div>

        {/* Role — top-right */}
        <div className="absolute top-3 right-3 label-mono rounded-full bg-[var(--background)]/85 px-2.5 py-1 text-[var(--foreground)]">
          {p.role}
        </div>
      </div>

      {/* Copy column */}
      <div className="flex flex-col p-6 md:p-8 gap-4">
        <div className="flex items-baseline justify-between gap-4">
          <p className="label-mono text-[var(--ink-muted)]">
            {p.year} · <span className="text-[var(--foreground)]">{p.status}</span>
          </p>
          {p.link && (
            <span className="label-mono accent-text" aria-hidden>
              ↗
            </span>
          )}
        </div>
        <h3 className="font-display text-3xl md:text-4xl lg:text-5xl leading-[0.95]">
          {p.title}
        </h3>
        <p className="font-display italic text-lg md:text-xl text-[var(--foreground)]/80">
          {p.tagline}
        </p>
        <p className="text-sm md:text-base text-[var(--ink-secondary)] max-w-prose">
          {p.description}
        </p>
        <ul className="flex flex-wrap gap-1 pt-2" aria-label="Stack">
          {p.technologies.map((t) => (
            <li
              key={t}
              className="label-mono px-2 py-0.5 rounded-full border border-hairline text-[var(--ink-muted)]"
            >
              {t}
            </li>
          ))}
        </ul>
        <div className="border-t border-hairline pt-3 mt-2 flex flex-wrap items-baseline justify-between gap-2 label-mono">
          <span className="accent-text">✶ {p.impact}</span>
          <span className="text-[var(--ink-muted)]">
            {p.link
              ? `${p.link.kind === "repo" ? "Source" : "Visit"} · ${p.link.label}`
              : "No public link"}
            {p.venture ? ` · ${p.venture}` : ""}
          </span>
        </div>
      </div>
    </>
  );

  return (
    <motion.article
      id={p.id}
      data-reveal
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={p.link ? { y: -4 } : undefined}
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group relative col-span-12 overflow-hidden rounded-md border border-hairline bg-[var(--bg-elevated)] scroll-mt-32 transition-[border-color,box-shadow] duration-500",
        p.link && "hover:border-[var(--accent)] hover:shadow-2xl hover:shadow-[var(--accent-glow)]",
        wide ? "md:col-span-12" : "md:col-span-6",
      )}
    >
      <CardFrame project={p} wide={wide}>
        {body}
      </CardFrame>
    </motion.article>
  );
}

function CardFrame({
  project,
  wide,
  children,
}: {
  project: Project;
  wide: boolean;
  children: ReactNode;
}) {
  const layout = cn("block", wide && "md:grid md:grid-cols-2 md:items-stretch");
  if (!project.link) return <div className={layout}>{children}</div>;
  return (
    <a
      href={project.link.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${project.title} — ${project.link.kind === "repo" ? "source on" : "visit"} ${project.link.label} (opens in a new tab)`}
      className={cn(layout, "focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--accent)]")}
    >
      {children}
    </a>
  );
}
