import { Navbar } from "@/components/layout/navbar";
import { ProjectsSection } from "@/components/sections/projects";
import { CTASection } from "@/components/sections/cta";
import { Footer } from "@/components/layout/footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Projects by Emmanuel Adiba — Portforge's GearDockGH and ImportBrain, the Wayve venture, client work at GTN, and side builds — each with its role and current status.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <>
      <Navbar />
      <main className="relative pt-12 md:pt-16">
        <ProjectsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
