import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { StudiosSection } from "@/components/sections/StudiosSection";
import { EquipmentSection } from "@/components/sections/EquipmentSection";
import { QuoteSection } from "@/components/sections/QuoteSection";
import { Footer } from "@/components/layout/Footer";
import { landingPagesDb } from "@/lib/content";

export default function RootLandingPage() {
  const content = landingPagesDb.root;

  return (
    <>
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <HeroSection {...content.hero} />

        {/* Studios Bento Grid Section */}
        <StudiosSection {...content.studios} />

        {/* Professional Equipment Section */}
        <EquipmentSection equipment={content.equipment} />

        {/* Atmospheric Quote Section */}
        <QuoteSection 
          quote="Photography is the only language that can be understood anywhere in the world."
          author="BRUNO BARBEY"
          tagline="The Vision"
        />
      </main>

      <Footer />
    </>
  );
}
