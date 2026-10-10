"use client";

import Link from "next/link";
import { siteConfig } from "@/lib/constants";
import { Marquee } from "@/components/ui/marquee";
import { Reveal } from "@/components/ui/reveal";

export function Footer() {
  const year = new Date().getFullYear();

  const social = [
    { label: "GitHub", href: siteConfig.social.github },
    { label: "LinkedIn", href: siteConfig.social.linkedin },
    { label: "Twitter / X", href: siteConfig.social.twitter },
    { label: "Email", href: `mailto:${siteConfig.email}` },
    { label: "Portforge", href: siteConfig.portforge.url },
  ];

  return (
    <footer className="relative pt-24 pb-8 overflow-hidden border-t border-hairline">
      <div className="hero-glow" aria-hidden />

      {/* Massive editorial mark */}
      <div className="container-edit relative">
        <Reveal>
          <h2 className="display-mega font-display italic text-[var(--foreground)]/90 leading-none">
            Let&rsquo;s build
            <br />
            <span className="not-italic accent-text">something</span>
            <br />
            that lasts.
          </h2>
        </Reveal>
      </div>

      {/* Marquee */}
      <div className="my-16 border-y border-hairline py-6">
        <Marquee
          items={[
            <span key="a" className="font-display italic text-3xl md:text-5xl">
              open to new roles
            </span>,
            <span key="b" className="font-display text-3xl md:text-5xl">
              {siteConfig.email}
            </span>,
            <span key="c" className="font-display italic text-3xl md:text-5xl accent-text">
              ✶ open to collaborate
            </span>,
            <span key="d" className="font-display text-3xl md:text-5xl">
              made in bolgatanga · ghana
            </span>,
          ]}
        />
      </div>

      <div className="container-edit grid gap-12 md:grid-cols-4">
        <div>
          <p className="eyebrow mb-3">(Index)</p>
          <p className="font-display text-xl">
            Emmanuel Adiba
            <br />
            <span className="text-[var(--ink-secondary)] text-base">
              Software Engineer · Founder,{" "}
              <a
                href={siteConfig.portforge.url}
                target="_blank"
                rel="noopener noreferrer"
                className="link-edit"
              >
                {siteConfig.portforge.name}
              </a>
            </span>
          </p>
        </div>

        <div>
          <p className="eyebrow mb-3">(Contact)</p>
          <a href={`mailto:${siteConfig.email}`} className="link-edit text-base">
            {siteConfig.email}
          </a>
          <p className="text-[var(--ink-muted)] text-sm mt-2">
            {siteConfig.location}
          </p>
        </div>

        <div>
          <p className="eyebrow mb-3">(Sitemap)</p>
          <ul className="space-y-1 label-mono uppercase">
            <li><Link href="/" className="link-edit">Index</Link></li>
            <li><Link href="/about" className="link-edit">About</Link></li>
            <li><Link href="/projects" className="link-edit">Work</Link></li>
            <li><Link href="/ml-ai" className="link-edit">ML / AI</Link></li>
            <li><Link href="/now" className="link-edit">Now</Link></li>
            <li><Link href="/contact" className="link-edit">Contact</Link></li>
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-3">(Elsewhere)</p>
          <ul className="space-y-1 label-mono uppercase">
            {social.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-edit"
                >
                  ↗ {s.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={siteConfig.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="link-edit"
              >
                ↗ View source
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-edit mt-16 pt-6 border-t border-hairline flex flex-col md:flex-row gap-3 justify-between label-mono text-[var(--ink-muted)]">
        <span>
          © {year} — Emmanuel Adiba.{" "}
          <span className="text-[var(--ink-secondary)]">
            Made in <span className="text-[var(--foreground)]">Bolgatanga</span>.
          </span>
        </span>
        <span>
          Built with Next.js · Three.js ·{" "}
          <span className="accent-text">v2.0</span>
        </span>
      </div>
    </footer>
  );
}
