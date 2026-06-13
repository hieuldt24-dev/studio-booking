import { cookies } from "next/headers";
import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { StudiosSection } from "@/components/sections/StudiosSection";
import { EquipmentSection } from "@/components/sections/EquipmentSection";
import { QuoteSection } from "@/components/sections/QuoteSection";
import { Footer } from "@/components/layout/Footer";
import { landingPagesDb } from "@/lib/content";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("NEXT_LOCALE")?.value === "en" ? "en" : "vi") as "vi" | "en";
  const content = landingPagesDb.root[locale];

  return {
    title: content.seo.title,
    description: content.seo.description,
    keywords: content.seo.keywords,
    openGraph: {
      title: content.seo.title,
      description: content.seo.description,
      type: "website",
    },
  };
}

export default async function RootLandingPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("NEXT_LOCALE")?.value === "en" ? "en" : "vi") as "vi" | "en";
  const content = landingPagesDb.root[locale];

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
          quote={content.features.title}
          author={content.features.description || "BRUNO BARBEY"}
          tagline={content.features.tagline || "The Vision"}
        />
      </main>

      <Footer />
    </>
  );
}
