import { Navbar } from "@/components/layout/navbar";
import { HeroSection } from "@/components/sections/hero";
import { MarqueeStrip } from "@/components/sections/marquee-strip";
import { AboutPreview } from "@/components/sections/about-preview";
import { WorkSection } from "@/components/sections/work";
import { PillarLog } from "@/components/sections/pillar-log";
import { ExperienceSummary } from "@/components/sections/experience-summary";
import { CTASection } from "@/components/sections/cta";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative">
        <HeroSection />
        <MarqueeStrip />
        <AboutPreview />
        <WorkSection />
        <PillarLog />
        <ExperienceSummary />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
