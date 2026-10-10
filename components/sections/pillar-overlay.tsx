"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  pillarUppercase,
  PILLAR_LABEL,
  PILLAR_DESCRIPTION,
  type Pillar,
} from "@/lib/brand";
import { formatMonth, type PillarEntry } from "@/lib/pillar-log";

/**
 * PillarOverlay — full-screen "deep dive" for a clicked tetrahedron vertex.
 *
 * Lives on the home page above the hero. Opens when the hero scene reports
 * a vertex click via `onVertexClick`. Keeps backdrop blur, ESC handling,
 * moves focus into the dialog on open and hands it back to whatever opened
 * it on close, and a CTA into the Pillar Log for the dated artifact.
 */
export function PillarOverlay({
  pillar,
  entries,
  onClose,
}: {
  pillar: Pillar | null;
  entries: Record<Pillar, PillarEntry>;
  onClose: () => void;
}) {
  const reducedMotion = useReducedMotion();

  // ESC closes; lock body scroll while open; focus in, then back out
  useEffect(() => {
    if (!pillar) return;
    const opener = document.activeElement as HTMLElement | null;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      opener?.focus?.();
    };
  }, [pillar, onClose]);

  return (
    <AnimatePresence>
      {pillar && (
        <motion.div
          key={pillar}
          role="dialog"
          aria-modal="true"
          aria-label={`${PILLAR_LABEL[pillar]} — pillar deep dive`}
          className="fixed inset-0 z-[80] flex items-center justify-center"
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Backdrop */}
          <motion.button
            type="button"
            aria-label="Close pillar"
            onClick={onClose}
            className="absolute inset-0 bg-[var(--background)]/70 backdrop-blur-xl cursor-default"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Card */}
          <motion.div
            className="relative z-10 w-[min(92vw,820px)] max-h-[88vh] overflow-y-auto rounded-2xl border border-hairline bg-[var(--background)]/95 backdrop-blur-2xl p-6 sm:p-10 md:p-14 shadow-[0_60px_120px_-20px_rgba(0,0,0,0.7)]"
            initial={
              reducedMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 24, scale: 0.97 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              reducedMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 16, scale: 0.98 }
            }
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <PillarCard
              pillar={pillar}
              entry={entries[pillar]}
              onClose={onClose}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function PillarCard({
  pillar,
  entry,
  onClose,
}: {
  pillar: Pillar;
  entry: PillarEntry;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => closeRef.current?.focus(), []);
  const isExternal = entry.href?.startsWith("http");

  return (
    <div className="flex flex-col gap-8">
      {/* Header strip */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="relative flex h-2 w-2">
            <span className="absolute inset-0 rounded-full bg-[var(--accent)] animate-ping opacity-60" />
            <span className="relative inline-block h-2 w-2 rounded-full bg-[var(--accent)]" />
          </span>
          <span className="label-mono uppercase tracking-[0.18em] text-[var(--ink-muted)]">
            Pillar ／ {pillarUppercase(pillar)}
          </span>
        </div>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="h-9 w-9 rounded-full border border-hairline flex items-center justify-center hover:bg-[var(--bg-elevated)] transition-colors"
        >
          <svg
            viewBox="0 0 16 16"
            className="w-3.5 h-3.5"
            aria-hidden
          >
            <path
              d="M3 3 L13 13 M13 3 L3 13"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </button>
      </div>

      {/* Pillar word */}
      <h2 className="font-display display-mega leading-[0.85]">
        <span className="italic accent-text">{PILLAR_LABEL[pillar]}</span>
      </h2>

      {/* Definition */}
      <p className="font-display text-xl md:text-2xl leading-snug text-[var(--foreground)]/90">
        {PILLAR_DESCRIPTION[pillar]}
      </p>

      {/* Latest evidence card */}
      <div className="border-t border-hairline pt-8">
        <div className="flex items-baseline justify-between mb-4">
          <p className="eyebrow">— Latest evidence</p>
          <time dateTime={entry.date} className="label-mono text-[var(--ink-muted)]">
            {formatMonth(entry.date)}
          </time>
        </div>
        <h3 className="font-display text-2xl md:text-3xl leading-tight">
          {entry.headline}
        </h3>
        {entry.detail && (
          <p className="mt-3 text-base text-[var(--ink-muted)] leading-relaxed">
            {entry.detail}
          </p>
        )}
      </div>

      {/* CTAs */}
      <div className="flex flex-wrap items-center gap-3 pt-2">
        {entry.href && (
          isExternal ? (
            <a
              href={entry.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-magnetic btn-magnetic--primary"
            >
              <span>↗ {entry.cta ?? "open"}</span>
            </a>
          ) : (
            <Link
              href={entry.href}
              onClick={onClose}
              className="btn-magnetic btn-magnetic--primary"
            >
              <span>→ {entry.cta ?? "open"}</span>
            </Link>
          )
        )}
        <Link
          href="#pillar-log"
          onClick={onClose}
          className="btn-magnetic btn-magnetic--ghost"
        >
          <span>See all four</span>
          <span aria-hidden>↓</span>
        </Link>
      </div>
    </div>
  );
}
