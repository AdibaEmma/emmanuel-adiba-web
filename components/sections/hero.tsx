"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Magnetic } from "@/components/ui/magnetic";
import { roles, siteConfig } from "@/lib/constants";
import { PILLARS, PILLAR_LABEL, pillarUppercase, type Pillar } from "@/lib/brand";
import { PILLAR_ENTRIES } from "@/lib/pillar-log";
import { PillarOverlay } from "@/components/sections/pillar-overlay";
import { PillarDiagram } from "@/components/three/pillar-diagram";

// 3D scene only on client (heavy bundle, mouse-driven), and only from the md
// breakpoint up. A faint static diagram is rendered while the chunk loads so
// we don't flash empty space.
const HeroScene = dynamic(
  () => import("@/components/three/hero-scene").then((m) => m.HeroScene),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 flex items-center justify-center text-[var(--foreground)] opacity-40">
        <PillarDiagram className="w-[80%] h-[80%] max-w-[520px]" />
      </div>
    ),
  },
);

export function HeroSection() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [focusedPillar, setFocusedPillar] = useState<Pillar | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const id = setInterval(() => {
      setRoleIdx((i) => (i + 1) % roles.length);
    }, 2800);
    return () => clearInterval(id);
  }, [reducedMotion]);

  // When reduced motion is requested, skip framer's initial offsets entirely.
  const fade = reducedMotion
    ? { initial: false, animate: { opacity: 1 } }
    : {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
      };

  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      {/* Atmospheric glow — dialed back, no longer competes with type */}
      <div className="hero-glow" aria-hidden />

      {/* 3D scene — desktop only, constrained to the right column and faded
          at the left edge so it cannot bleed across the H1 typography.
          Pointer events live on this layer so vertex clicks work; the masked
          region is unhittable. On small screens the copy spans the full
          width, so the diagram moves into the layout instead (see below). */}
      <div
        className="hidden md:block absolute inset-y-0 right-0 left-[42%] z-0 opacity-90"
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 18%, black 100%)",
          maskImage:
            "linear-gradient(to right, transparent 0%, black 18%, black 100%)",
        }}
      >
        <HeroScene
          onVertexClick={setFocusedPillar}
          focusedPillar={focusedPillar}
        />
      </div>

      {/* Hint that the form is interactive — small lime tag aligned to the
          masked region. Only shown when no pillar is focused. */}
      {!focusedPillar && (
        <motion.div
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="hidden md:flex absolute bottom-44 right-8 z-10 items-center gap-2 label-mono text-[var(--ink-muted)] pointer-events-none"
          aria-hidden
        >
          <span className="h-px w-8 bg-[var(--accent)]/60" />
          <span>Click a pillar</span>
        </motion.div>
      )}

      {/* The WebGL vertices cannot take keyboard focus, so the same four
          actions exist as buttons — hidden until a keyboard user tabs in. */}
      <div className="hidden md:block absolute bottom-44 right-8 z-20">
        <div className="sr-only focus-within:not-sr-only flex gap-2">
          {PILLARS.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setFocusedPillar(p)}
              className="label-mono uppercase rounded-full border border-hairline bg-[var(--background)] px-3 py-1.5"
            >
              {PILLAR_LABEL[p]}
            </button>
          ))}
        </div>
      </div>

      {/* Hairline grid overlay */}
      <svg
        aria-hidden
        className="absolute inset-0 w-full h-full opacity-[0.035] pointer-events-none mix-blend-overlay"
      >
        <defs>
          <pattern id="hg" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hg)" />
      </svg>

      {/* The container is pointer-events: none so vertex clicks land on the
          canvas behind it. Each interactive child re-enables events with
          pointer-events-auto. Without this, the col-span-5 reserved gutter
          (and the gap area in the grid) would swallow clicks meant for the
          tetrahedron vertices. */}
      <div className="container-edit relative z-10 min-h-[100svh] flex flex-col justify-between pt-32 pb-12 pointer-events-none">
        {/* Top eyebrow — index left, availability right */}
        <motion.div
          data-reveal
          {...fade}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex items-start justify-between gap-6 pointer-events-auto"
        >
          <div className="section-tag whitespace-nowrap">
            <span>(Index ／ 01)</span>
          </div>
          {/* Where the business lives. This site is the person; client
              builds and the company record are on the Portforge site. */}
          <a
            href={siteConfig.portforge.url}
            target="_blank"
            rel="noopener noreferrer"
            className="link-edit label-mono whitespace-nowrap text-[var(--ink-muted)] hover:text-[var(--foreground)]"
          >
            <span>
              Founder,{" "}
              <span className="text-[var(--foreground)]">
                Portforge
                <span className="hidden sm:inline"> Technologies</span>
              </span>
            </span>
            <span aria-hidden>↗</span>
          </a>
        </motion.div>

        {/* Center: massive editorial type. Only the col-span-7 text column
            re-enables events; the right side passes clicks through to the
            canvas where vertices live. */}
        <div className="relative flex-1 flex items-center">
          <div className="w-full grid md:grid-cols-12 items-center gap-6">
            <div className="md:col-span-7 pointer-events-auto">
              {/* Small screens: the diagram sits in the flow, top-right of
                  the copy, so it never sits behind the paragraph. */}
              <div className="md:hidden flex justify-end mt-4 mb-2 text-[var(--foreground)]">
                <PillarDiagram
                  compact
                  onVertexClick={setFocusedPillar}
                  className="h-32 w-40"
                />
              </div>

              {/* Pillar eyebrow — demoted from accent to muted ink. The
                  tetrahedron carries the accent for this concept now. */}
              <motion.p
                data-reveal
                {...fade}
                transition={{ duration: 1, delay: 0.25 }}
                className="label-mono text-[var(--ink-muted)] mb-5 flex flex-wrap items-center gap-x-2 gap-y-1"
              >
                {PILLARS.map((p, i) => (
                  <span key={p} className="flex items-center gap-2">
                    <span>{pillarUppercase(p)}</span>
                    {i < PILLARS.length - 1 && (
                      <span className="text-[var(--ink-muted)] opacity-50">·</span>
                    )}
                  </span>
                ))}
              </motion.p>

              <motion.h1
                data-reveal
                className="display-mega font-display"
                {...fade}
                transition={{ duration: 1.2, delay: 0.3 }}
              >
                <span className="block overflow-hidden">
                  <motion.span
                    data-reveal
                    className="block"
                    initial={reducedMotion ? false : { y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1.1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    Emmanuel
                  </motion.span>
                </span>
                <span className="block overflow-hidden">
                  <motion.span
                    data-reveal
                    className="block italic accent-text"
                    initial={reducedMotion ? false : { y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1.1, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  >
                    Adiba
                  </motion.span>
                </span>
              </motion.h1>

              <motion.div
                data-reveal
                {...fade}
                transition={{ duration: 1, delay: 1 }}
                className="mt-8 max-w-xl"
              >
                <p className="font-sans text-base md:text-lg text-[var(--foreground)]/80 leading-relaxed">
                  Software developer at Global Tech Network, founder of
                  Portforge Technologies, and learning in public at the seam
                  between <em className="italic-display">code and cognition</em>.
                  Based in Bolgatanga.
                </p>
              </motion.div>
            </div>

            {/* Right column intentionally empty — the canvas vertices live
                here. No DOM child means no click-catching surface. */}
          </div>
        </div>

        {/* Bottom row — re-enable events on each interactive cell */}
        <motion.div
          data-reveal
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="grid md:grid-cols-12 gap-6 items-end pt-6 border-t border-hairline"
        >
          {/* Role rotator — all noun phrases now, so "(Currently) X" reads */}
          <div className="md:col-span-5 pointer-events-auto">
            <p className="eyebrow mb-2">(Currently)</p>
            <div className="font-display text-2xl md:text-3xl h-10 overflow-hidden">
              <motion.div
                key={roleIdx}
                initial={reducedMotion ? false : { y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -30, opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="italic">{roles[roleIdx]}</span>
              </motion.div>
            </div>
          </div>

          {/* CTAs — primary sits on dark ground (canvas is masked left-of-7),
              so contrast is preserved */}
          <div className="md:col-span-4 flex flex-wrap items-center gap-3 pointer-events-auto">
            <Magnetic strength={0.25}>
              <Link href="/contact" className="btn-magnetic btn-magnetic--primary">
                <span>Hire me</span>
                <span aria-hidden>→</span>
              </Link>
            </Magnetic>
            <Magnetic strength={0.2}>
              <Link href="/projects" className="btn-magnetic btn-magnetic--ghost">
                <span>Selected work</span>
                <span aria-hidden>↗</span>
              </Link>
            </Magnetic>
          </div>

          {/* Scroll cue */}
          <div className="md:col-span-3 flex md:justify-end items-end pointer-events-auto">
            <a href="#about" className="group flex items-center gap-3">
              <span className="label-mono text-[var(--muted-foreground)] group-hover:text-[var(--foreground)] transition-colors">
                Scroll
              </span>
              <span className="relative h-12 w-px bg-[var(--hairline)] overflow-hidden block">
                <motion.span
                  className="absolute inset-x-0 top-0 h-1/2 bg-[var(--accent)]"
                  animate={reducedMotion ? { y: 0 } : { y: ["-100%", "200%"] }}
                  transition={
                    reducedMotion
                      ? { duration: 0 }
                      : { duration: 2, repeat: Infinity, ease: "easeInOut" }
                  }
                />
              </span>
            </a>
          </div>
        </motion.div>
      </div>

      <PillarOverlay
        pillar={focusedPillar}
        entries={PILLAR_ENTRIES}
        onClose={() => setFocusedPillar(null)}
      />
    </section>
  );
}
