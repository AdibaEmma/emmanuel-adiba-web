import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Reveal } from "@/components/ui/reveal";
import { Magnetic } from "@/components/ui/magnetic";
import { formatMonth } from "@/lib/pillar-log";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Now",
  description:
    "What Emmanuel Adiba is working on — a dated /now page in the spirit of nownownow.com.",
  alternates: { canonical: "/now" },
};

// Dated rather than promised: the page says when it was last true, not how
// often it will be. Every item traces to a commit, release or published repo.
const LAST_UPDATED = "2026-10-10";

const RECENT: Array<{ date: string; text: string }> = [
  {
    date: "2026-10-06",
    text: "Vacation Branson at GTN — lead engineering on a multi-product Laravel codebase",
  },
  {
    date: "2026-10-03",
    text: "Opened ImportBrain’s paid plans — Paystack billing, founder plan capped at 20 accounts",
  },
  {
    date: "2026-09-26",
    text: "Wayve in early beta — NestJS API, Next.js web app and an Expo mobile app",
  },
  {
    date: "2026-08-11",
    text: "The Compliance Scorecard MCP server at GTN",
  },
  {
    date: "2026-05-23",
    text: "Kaggle, end to end — Titanic classification, then house-price regression",
  },
];

export default function NowPage() {
  return (
    <>
      <Navbar />
      <main className="relative pt-12 md:pt-16">
        <section className="container-edit pt-16 pb-32 relative">
          <div className="hero-glow" aria-hidden />

          <div className="flex flex-wrap items-baseline justify-between gap-3 mb-12">
            <p className="section-tag">(Now)</p>
            <p className="eyebrow">
              — Last updated{" "}
              <time dateTime={LAST_UPDATED}>{formatMonth(LAST_UPDATED)}</time>
            </p>
          </div>

          <Reveal>
            <h1 className="display-xl font-display leading-[0.9]">
              What I&rsquo;m
              <br />
              <span className="italic accent-text">doing now.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.15} className="mt-12 max-w-2xl">
            <p className="font-display text-2xl md:text-3xl leading-snug text-[var(--foreground)]/90">
              Most of the week is client work at{" "}
              <span className="italic-display">Global Tech Network</span> — the
              Vacation Branson platform and Compliance Scorecard&rsquo;s MCP
              server. Around it,{" "}
              <span className="italic-display accent-text">ImportBrain</span>{" "}
              has opened paid plans, GearDockGH keeps delivering in Bolgatanga
              under Portforge Technologies, and{" "}
              <span className="italic-display">Wayve</span> is in early beta.
            </p>
          </Reveal>

          <Reveal delay={0.3} className="mt-16">
            <h2 className="eyebrow mb-4">(Recently — {RECENT.length} things)</h2>
            <ol className="border-t border-hairline">
              {RECENT.map((item) => (
                <li
                  key={item.text}
                  className="grid grid-cols-12 gap-4 py-5 border-b border-hairline items-baseline"
                >
                  <time
                    dateTime={item.date}
                    className="col-span-12 sm:col-span-2 label-mono text-[var(--ink-muted)] tabular-nums"
                  >
                    {formatMonth(item.date)}
                  </time>
                  <span className="col-span-12 sm:col-span-10 font-display text-lg md:text-xl">
                    {item.text}
                  </span>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={0.45} className="mt-20 flex flex-wrap items-center gap-4">
            <Magnetic strength={0.2}>
              <Link href="/contact" className="btn-magnetic btn-magnetic--primary">
                <span>Want to collaborate?</span>
                <span aria-hidden>→</span>
              </Link>
            </Magnetic>
            <p className="label-mono text-[var(--ink-muted)]">
              ※ A /now page in the spirit of{" "}
              <a
                href="https://nownownow.com/about"
                target="_blank"
                rel="noopener noreferrer"
                className="link-edit"
              >
                nownownow.com
              </a>
              {" — dated, so you can judge how fresh it is."}
            </p>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
