"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { projects, type Project } from "@/lib/constants";
import { pillarUppercase } from "@/lib/brand";
import { Reveal } from "@/components/ui/reveal";
import { Magnetic } from "@/components/ui/magnetic";
import { ProjectCover } from "@/components/ui/project-cover";

// Thumbnail dimensions — kept in JS so clamping math is precise.
const THUMB_W = 440;
const THUMB_H = 280;
const CURSOR_OFFSET_X = 28; // float to the right of the cursor
const CURSOR_OFFSET_Y = -32; // float above the cursor

function ProjectRow({
  project,
  index,
  onEnter,
}: {
  project: Project;
  index: number;
  onEnter: (p: Project) => void;
}) {
  // Public work opens its own site; private client work goes to its card on
  // /projects, which explains why there is nothing to open.
  const external = project.link;
  const linkProps = external
    ? { href: external.href, target: "_blank", rel: "noopener noreferrer" }
    : { href: `/projects#${project.id}` };

  return (
    <motion.a
      {...linkProps}
      onMouseEnter={() => onEnter(project)}
      onFocus={() => onEnter(project)}
      className="group relative grid grid-cols-12 items-baseline gap-4 py-8 md:py-10 border-t border-hairline last:border-b cursor-pointer"
      whileHover="hover"
      data-cursor="hover"
    >
      <span className="col-span-1 label-mono text-[var(--ink-muted)] tabular-nums">
        ／{(index + 1).toString().padStart(2, "0")}
      </span>

      <div className="col-span-7 md:col-span-6">
        <h3 className="font-display text-3xl md:text-5xl lg:text-6xl block leading-[0.95]">
          <motion.span
            variants={{ hover: { x: 12, color: "var(--accent)" } }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block"
          >
            {project.title}
          </motion.span>
        </h3>
        <p className="font-display italic text-base md:text-lg text-[var(--ink-muted)] mt-2">
          {project.tagline}
        </p>
      </div>

      <div className="hidden md:flex md:col-span-3 flex-col gap-1">
        <span className="label-mono accent-text uppercase tracking-[0.18em]">
          {pillarUppercase(project.pillars[0])}
        </span>
        <span className="label-mono text-[var(--ink-muted)]">
          {project.status}
        </span>
      </div>

      <div className="col-span-4 md:col-span-2 flex justify-end items-center gap-3">
        <span className="label-mono text-[var(--ink-muted)] hidden md:inline whitespace-nowrap">
          {project.role}
        </span>
        <motion.span
          variants={{ hover: { rotate: external ? -45 : 0, color: "var(--accent)" } }}
          transition={{ duration: 0.4 }}
          className="inline-block text-2xl"
          aria-hidden
        >
          →
        </motion.span>
      </div>

      <p className="col-span-12 md:col-start-2 md:col-span-9 mt-3 text-[var(--ink-secondary)] text-sm md:text-base max-w-2xl">
        {project.impact}
      </p>
      <p className="col-span-12 md:col-start-2 md:col-span-9 label-mono text-[var(--ink-muted)]">
        {external ? `↗ ${external.label}` : "Details on the projects page"}
        {project.venture ? ` · ${project.venture}` : ""}
      </p>
    </motion.a>
  );
}

// ─── Floating thumbnail (fixed-position, viewport coords) ────────────────────
function FloatingPreview({
  project,
  active,
}: {
  project: Project | null;
  active: boolean;
}) {
  const mx = useMotionValue(typeof window !== "undefined" ? window.innerWidth / 2 : 0);
  const my = useMotionValue(typeof window !== "undefined" ? window.innerHeight / 2 : 0);

  // Smooth spring follow
  const sx = useSpring(mx, { stiffness: 280, damping: 30, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 280, damping: 30, mass: 0.4 });

  // Subtle 3D tilt — based on cursor's vertical position relative to viewport center
  const rotate = useTransform(my, (v) => {
    if (typeof window === "undefined") return 0;
    return ((v - window.innerHeight / 2) / window.innerHeight) * -8;
  });
  const skew = useTransform(mx, (v) => {
    if (typeof window === "undefined") return 0;
    return ((v - window.innerWidth / 2) / window.innerWidth) * 4;
  });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      // Place thumb above-and-right of cursor, but clamp inside viewport.
      let nextX = e.clientX + CURSOR_OFFSET_X;
      let nextY = e.clientY + CURSOR_OFFSET_Y - THUMB_H;

      // Right edge: flip to left of cursor if we'd overflow
      if (nextX + THUMB_W > window.innerWidth - 20) {
        nextX = e.clientX - CURSOR_OFFSET_X - THUMB_W;
      }
      // Top edge: drop below cursor if we'd overflow
      if (nextY < 16) {
        nextY = e.clientY + 24;
      }
      // Bottom edge: lift above
      if (nextY + THUMB_H > window.innerHeight - 16) {
        nextY = window.innerHeight - THUMB_H - 16;
      }
      // Left edge
      if (nextX < 16) nextX = 16;

      mx.set(nextX);
      my.set(nextY);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <AnimatePresence>
      {active && project && (
        <motion.div
          key={project.id}
          style={{
            x: sx,
            y: sy,
            rotate,
            skewX: skew,
            width: THUMB_W,
            height: THUMB_H,
          }}
          initial={{ opacity: 0, scale: 0.86 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.92 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="hidden md:block pointer-events-none fixed top-0 left-0 z-[60]"
        >
          <div className="relative w-full h-full rounded-md overflow-hidden border border-hairline shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] bg-[var(--bg-elevated)]">
            {project.image ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.image}
                  alt=""
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)]/85 via-transparent" />
              </>
            ) : (
              <ProjectCover
                title={project.title}
                tagline={project.tagline}
                pillar={project.pillars[0]}
              />
            )}

            {/* Top: pillar badge */}
            <div className="absolute top-3 left-3 label-mono accent-text uppercase tracking-[0.18em] flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inset-0 rounded-full bg-[var(--accent)] animate-ping opacity-60" />
                <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
              </span>
              {pillarUppercase(project.pillars[0])}
            </div>

            {/* Top-right: year */}
            <div className="absolute top-3 right-3 label-mono text-[var(--foreground)]/80 mix-blend-difference">
              {project.year}
            </div>

            {/* Bottom: caption strip with role + impact */}
            <div className="absolute inset-x-0 bottom-0 p-3 border-t border-hairline bg-[var(--background)]/85 backdrop-blur-sm">
              <div className="flex items-baseline justify-between gap-3 label-mono">
                <span className="text-[var(--foreground)] truncate">
                  {project.role}
                </span>
                <span className="accent-text shrink-0">
                  {project.link ? `↗ ${project.link.label}` : project.status}
                </span>
              </div>
              <p className="font-display italic text-sm text-[var(--ink-secondary)] mt-1 truncate">
                {project.tagline}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function WorkSection() {
  const featured = projects.filter((p) => p.featured);
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section
      id="work"
      className="relative py-16 md:py-24 overflow-hidden"
    >
      <div className="container-edit">
        <div className="flex items-baseline justify-between mb-12 md:mb-20">
          <p className="section-tag">(Selected ／ 03)</p>
          <p className="eyebrow hidden md:block">
            — {featured.length} entries
          </p>
        </div>

        <Reveal>
          <h2 className="display-xl font-display mb-12 md:mb-20 max-w-4xl">
            Things I&rsquo;ve <span className="italic accent-text">shipped</span>.
          </h2>
        </Reveal>

        {/* Single onMouseLeave on the wrapper means moving between rows
            does NOT flicker the thumbnail; only leaving the whole list does. */}
        <div
          className="relative"
          onMouseLeave={() => setActive(null)}
        >
          {featured.map((p, i) => (
            <ProjectRow
              key={p.id}
              project={p}
              index={i}
              onEnter={setActive}
            />
          ))}
        </div>

        <Reveal className="mt-16 flex justify-center">
          <Magnetic strength={0.2}>
            <Link href="/projects" className="btn-magnetic btn-magnetic--primary">
              <span>Index of all work</span>
              <span aria-hidden>→</span>
            </Link>
          </Magnetic>
        </Reveal>
      </div>

      {/* Thumbnail rendered at section root with position: fixed — viewport coords */}
      <FloatingPreview project={active} active={!!active} />
    </section>
  );
}
