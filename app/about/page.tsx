import { Navbar } from "@/components/layout/navbar";
import { AboutSection } from "@/components/sections/about";
import { ExperienceSection } from "@/components/sections/experience";
import { Footer } from "@/components/layout/footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Emmanuel Adiba — software engineer in Bolgatanga, Ghana. Four pillars, the full path from Turntabl to Global Tech Network, and Portforge Technologies.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="relative pt-12 md:pt-16">
        <AboutSection />
        <ExperienceSection />
      </main>
      <Footer />
    </>
  );
}
