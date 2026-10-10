"use client";

import { siteConfig } from "@/lib/constants";
import { Reveal } from "@/components/ui/reveal";
import { ContactForm } from "@/components/sections/contact-form";

export function ContactSection() {
  return (
    <section className="relative pt-24 pb-32 overflow-hidden">
      <div className="hero-glow" aria-hidden />

      <div className="container-edit relative">
        <div className="flex items-baseline justify-between mb-12">
          <p className="section-tag">(Inbox ／ 05)</p>
          <p className="eyebrow hidden md:block">— Replies within 48 hours</p>
        </div>

        <Reveal>
          <h1 className="display-xl font-display leading-[0.9]">
            Send a
            <br />
            <span className="italic accent-text">brief.</span>
          </h1>
        </Reveal>

        <Reveal delay={0.05}>
          <p className="mt-6 max-w-xl font-display text-xl md:text-2xl text-[var(--foreground)]/80 leading-snug">
            Open to engineering roles, collaborations and ML conversations.{" "}
            <span className="italic accent-text">One inbox.</span>
          </p>
        </Reveal>

        {/* Personal vs business: the two sites answer different enquiries,
            on different terms, and the visitor should know which is which. */}
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-xl text-base md:text-lg text-[var(--ink-secondary)]">
            Need software built for your business? Client builds run through{" "}
            <a
              href={`${siteConfig.portforge.url}/contact`}
              target="_blank"
              rel="noopener noreferrer"
              className="link-edit text-[var(--foreground)]"
            >
              {siteConfig.portforge.name}
            </a>{" "}
            — it gives an initial assessment within one working day. This page
            is for everything else.
          </p>
        </Reveal>

        {/* Lead-qualifier: what I'm good for / not */}
        <Reveal delay={0.15} className="mt-16 grid md:grid-cols-2 gap-px bg-[var(--rule)] border border-hairline rounded-md overflow-hidden">
          <div className="bg-[var(--background)] p-6 md:p-8">
            <p className="eyebrow mb-4">
              <span className="text-[var(--accent)]">✓</span> What I&rsquo;m good for
            </p>
            <ul className="space-y-2 font-display text-xl md:text-2xl leading-snug">
              <li>· Backend architecture &amp; distributed systems</li>
              <li>· Greenfield products from zero → live</li>
              <li>· Fintech, payments, KYC &amp; trading systems</li>
              <li>· Rescuing scope-creep codebases</li>
              <li>· Remote engineering roles on product teams</li>
            </ul>
          </div>
          <div className="bg-[var(--background)] p-6 md:p-8">
            <p className="eyebrow mb-4">
              <span className="text-[var(--ink-muted)]">×</span> What I&rsquo;m not
            </p>
            <ul className="space-y-2 font-display text-xl md:text-2xl leading-snug text-[var(--ink-secondary)]">
              <li>· A logo / brand designer</li>
              <li>· A part-time contractor for under 4 weeks</li>
              <li>· A Wordpress / Shopify dev</li>
              <li>· Available for crypto-only projects</li>
            </ul>
          </div>
        </Reveal>

        <div className="mt-20 grid lg:grid-cols-12 gap-12">
          {/* Sidebar info */}
          <div className="lg:col-span-4 space-y-10">
            <Reveal>
              <p className="eyebrow mb-3">(Direct line)</p>
              <a
                href={`mailto:${siteConfig.email}`}
                className="link-edit font-display text-2xl md:text-3xl break-all"
              >
                {siteConfig.email}
              </a>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="eyebrow mb-3">(Phone)</p>
              <ul className="space-y-1 label-mono">
                {siteConfig.phone.map((p) => (
                  <li key={p}>
                    <a href={`tel:${p}`} className="link-edit">
                      {p}
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="eyebrow mb-3">(Location)</p>
              <p className="font-display text-xl">{siteConfig.location}</p>
              <p className="label-mono text-[var(--muted-foreground)] mt-1">
                Time zone: GMT+0
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <p className="eyebrow mb-3">(Elsewhere)</p>
              <ul className="space-y-1 label-mono uppercase">
                <li>
                  <a href={siteConfig.social.github} target="_blank" rel="noopener noreferrer" className="link-edit">
                    ↗ GitHub
                  </a>
                </li>
                <li>
                  <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" className="link-edit">
                    ↗ LinkedIn
                  </a>
                </li>
                <li>
                  <a href={siteConfig.social.twitter} target="_blank" rel="noopener noreferrer" className="link-edit">
                    ↗ Twitter
                  </a>
                </li>
              </ul>
            </Reveal>
          </div>

          {/* Form */}
          <Reveal delay={0.2} className="lg:col-span-8 relative">
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
