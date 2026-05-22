import { HeroSection } from "./components/HeroSection";
import { ServicesSection } from "./components/ServicesSection";
import { IntroSection } from "./components/IntroSection";
import { GallerySection } from "./components/GallerySection";
import { ContactSection } from "./components/ContactSection";

export function Home() {
  return (
    <>
      <HeroSection />
      <div className="relative z-20">
        <ServicesSection />
      </div>
      <IntroSection />
      <GallerySection />
      <ContactSection />
    </>
  );
}
