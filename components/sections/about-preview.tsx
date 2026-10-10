"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal, RevealText } from "@/components/ui/reveal";

// Every figure traces to the CV or to a running product. Context goes in the
// label so a number never stands on its own.
const STATS = [
  { value: "5+", label: "Years shipping production software" },
  { value: "15K+", label: "Active users on a news aggregator I built at Turntabl" },
  { value: "2", label: "Products run by Portforge — one live, one in early access" },
  { value: "1", label: "Separate venture in early beta — Wayve" },
];

export function AboutPreview() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const rot = useTransform(scrollYProgress, [0, 1], [-3, 3]);

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-16 md:py-24 overflow-hidden"
    >
      <div className="container-edit">
        <div className="flex items-baseline justify-between mb-16">
          <p className="section-tag">(Profile ／ 02)</p>
          <p className="eyebrow hidden md:block">— Origin story</p>
        </div>

        <div className="grid md:grid-cols-12 gap-8 md:gap-12">
          <div className="md:col-span-5 md:sticky md:top-32 md:self-start">
            <Reveal>
              <h2 className="display-xl font-display">
                Engineer.
                <br />
                <span className="italic">Builder</span>.
                <br />
                Thinker.
                <br />
                <span className="italic accent-text">Founder</span>.
              </h2>
            </Reveal>

            <Reveal delay={0.2} className="mt-8">
              <Link href="/about" className="btn-magnetic btn-magnetic--ghost">
                <span>Full biography</span>
                <span aria-hidden>↗</span>
              </Link>
            </Reveal>
          </div>

          <div className="md:col-span-7">
            <RevealText
              className="font-display text-2xl md:text-3xl lg:text-4xl leading-tight"
              text="I design and ship resilient systems — payment flows that move real money, a microservice trading engine, operational software for importers and retailers. I care about clean architecture, small surface areas, and code that quietly survives."
            />

            <Reveal delay={0.4} className="mt-12 grid grid-cols-2 gap-6 max-w-xl">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <p className="display-lg font-display">{stat.value}</p>
                  <p className="label-mono text-[var(--muted-foreground)] mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </div>

      {/* Floating editorial watermark — bleeds off the bottom-left, behind everything */}
      <motion.div
        style={{ y, rotate: rot }}
        className="absolute -left-12 md:-left-24 -bottom-20 md:-bottom-40 font-display italic text-[10rem] md:text-[18rem] leading-none text-[var(--ink-muted)] opacity-[0.045] pointer-events-none select-none -z-10"
        aria-hidden
      >
        about
      </motion.div>
    </section>
  );
}
