import { Hero } from "./_components/hero";
import { Marquee } from "./_components/marquee";
import { SpecifySection } from "./_components/specify-section";
import { MissionBar } from "./_components/mission-bar";
import { Approach } from "./_components/approach";
import { ContactSection } from "./_components/contact-section";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <SpecifySection />
      <Approach />
      <MissionBar />
      <ContactSection />
    </>
  );
}
