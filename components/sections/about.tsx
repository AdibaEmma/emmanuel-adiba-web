"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { education, resumePath, skills, siteConfig } from "@/lib/constants";
import {
  PILLARS,
  PILLAR_LABEL,
  PILLAR_DESCRIPTION,
  PILLAR_BULLETS,
} from "@/lib/brand";
import { Reveal, RevealText } from "@/components/ui/reveal";
import { Magnetic } from "@/components/ui/magnetic";
import { Marquee } from "@/components/ui/marquee";

export function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const portraitY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const allSkills = [
    ...skills.languages,
    ...skills.frontend,
    ...skills.backend,
    ...skills.database,
    ...skills.messaging,
    ...skills.devops,
    ...skills.testing,
    ...skills.api,
  ];

  return (
    <section ref={ref} className="relative pt-24 pb-32 overflow-hidden">
      <div className="hero-glow" aria-hidden />

      {/* Header */}
      <div className="container-edit relative">
        <div className="flex items-baseline justify-between mb-12">
          <p className="section-tag">(Profile ／ 02)</p>
          <p className="eyebrow hidden md:block">— {siteConfig.location}</p>
        </div>

        <Reveal>
          <h1 className="display-xl font-display leading-[0.9]">
            About<span className="accent-text">.</span>
            <br />
            <span className="italic">A long</span>
            <br />
            <span className="italic">curiosity.</span>
          </h1>
        </Reveal>
      </div>

      {/* Portrait + intro */}
      <div className="container-edit mt-24 grid lg:grid-cols-12 gap-10">
        <Reveal className="lg:col-span-5">
          <motion.div
            style={{ y: portraitY }}
            className="relative aspect-[4/5] w-full max-w-md rounded-md overflow-hidden border border-hairline grayscale hover:grayscale-0 transition-all duration-700"
          >
            <Image
              src="/images/profile.jpg"
              alt="Emmanuel Adiba"
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 40vw"
              priority
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-[var(--hairline)] pointer-events-none" />
            <div className="absolute bottom-3 left-3 right-3 flex justify-between label-mono">
              <span className="text-[var(--background)] mix-blend-difference">
                ※ adiba, 2025
              </span>
              <span className="text-[var(--accent)]">●&nbsp;LIVE</span>
            </div>
          </motion.div>
        </Reveal>

        <div className="lg:col-span-7 space-y-10">
          <RevealText
            className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.05]"
            text="Engineer. Builder. Thinker. Founder. Four pillars, in that order — the whole picture, not the headshot."
          />

          <Reveal delay={0.35} className="flex flex-wrap gap-3">
            <Magnetic strength={0.2}>
              {/* A plain anchor, not next/link: a PDF is not a route, and Link
                  would prefetch it as one (an ?_rsc= request that 404s). */}
              <a
                href={resumePath}
                download="Emmanuel_Adiba_CV.pdf"
                className="btn-magnetic btn-magnetic--primary"
              >
                <span>Download CV</span>
                <span className="normal-case tracking-normal">(PDF)</span>
                <span aria-hidden>↓</span>
              </a>
            </Magnetic>
            <Magnetic strength={0.2}>
              <Link href="/contact" className="btn-magnetic btn-magnetic--ghost">
                <span>Say hello</span>
                <span aria-hidden>↗</span>
              </Link>
            </Magnetic>
          </Reveal>
        </div>
      </div>

      {/* The four pillar beats — single canonical loop over PILLARS */}
      <div className="container-edit mt-24 md:mt-32 space-y-16 md:space-y-24">
        <Reveal>
          <p className="section-tag">(The four pillars ／ in order)</p>
        </Reveal>

        {PILLARS.map((p, i) => (
          <article
            key={p}
            id={p}
            className="grid lg:grid-cols-12 gap-8 lg:gap-10 border-t border-hairline pt-10 md:pt-14"
          >
            <div className="lg:col-span-4">
              <Reveal>
                <p className="label-mono text-[var(--ink-muted)] mb-3">
                  ／0{i + 1}
                </p>
                <h3 className="display-lg font-display italic leading-none">
                  {PILLAR_LABEL[p]}
                  <span className="not-italic accent-text">.</span>
                </h3>
              </Reveal>
            </div>
            <div className="lg:col-span-8 space-y-6">
              <Reveal delay={0.1}>
                <p className="font-display text-xl md:text-2xl leading-snug max-w-2xl">
                  {PILLAR_DESCRIPTION[p]}
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <ul className="space-y-2 max-w-2xl">
                  {PILLAR_BULLETS[p].map((b, idx) => (
                    <li
                      key={idx}
                      className="flex gap-3 text-[var(--foreground)]/80"
                    >
                      <span className="accent-text shrink-0">→</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </article>
        ))}
      </div>

      {/* Skills marquee */}
      <div className="mt-32 border-y border-hairline py-8">
        <p className="container-edit eyebrow mb-4">(Stack ／ A)</p>
        <Marquee
          items={allSkills.map((s, i) => (
            <span
              key={s.name + i}
              className="font-display text-2xl md:text-4xl"
            >
              {s.name}
            </span>
          ))}
        />
      </div>

      {/* Education */}
      <div className="container-edit mt-32 grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4">
          <p className="section-tag mb-4">(Education ／ B)</p>
          <Reveal>
            <h3 className="display-lg font-display">
              Foundations <span className="italic accent-text">laid.</span>
            </h3>
          </Reveal>
        </div>
        <div className="lg:col-span-8 border-t border-hairline pt-8">
          <Reveal>
            <p className="label-mono text-[var(--muted-foreground)] mb-2">
              {education.period}
            </p>
            <h4 className="font-display text-3xl md:text-4xl mb-1">
              {education.degree}
            </h4>
            <p className="label-mono text-[var(--muted-foreground)] mb-6">
              {education.institution} · {education.location}
            </p>
            <ul className="space-y-2 max-w-xl">
              {education.achievements.map((a, i) => (
                <li
                  key={i}
                  className="flex gap-3 text-[var(--foreground)]/80"
                >
                  <span className="accent-text">→</span>
                  {a}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
