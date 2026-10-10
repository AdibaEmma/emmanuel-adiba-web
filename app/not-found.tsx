import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="relative pt-12 md:pt-16">
        <section className="container-edit pt-24 pb-32">
          <p className="section-tag mb-12">(404 ／ not found)</p>
          <h1 className="display-xl font-display leading-[0.9]">
            Nothing
            <br />
            <span className="italic accent-text">here.</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg text-[var(--ink-secondary)]">
            The page you were looking for has moved or never existed.
          </p>
          <div className="mt-12 flex flex-wrap gap-3">
            <Link href="/" className="btn-magnetic btn-magnetic--primary">
              <span>Back to the index</span>
              <span aria-hidden>→</span>
            </Link>
            <Link href="/projects" className="btn-magnetic btn-magnetic--ghost">
              <span>Projects</span>
              <span aria-hidden>↗</span>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
