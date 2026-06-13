import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { StudiosSection } from "@/components/sections/StudiosSection";
import { EquipmentSection } from "@/components/sections/EquipmentSection";
import { QuoteSection } from "@/components/sections/QuoteSection";
import { Footer } from "@/components/layout/Footer";
import { landingPagesDb } from "@/lib/content";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all defined landing page slugs (for static export/optimization)
export async function generateStaticParams() {
  return Object.keys(landingPagesDb)
    .filter((key) => key !== "root")
    .map((slug) => ({ slug }));
}

// Generate dynamic metadata based on the database
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const content = landingPagesDb[slug];

  if (!content) {
    return {};
  }

  const cookieStore = await cookies();
  const locale = (cookieStore.get("NEXT_LOCALE")?.value === "en" ? "en" : "vi") as "vi" | "en";
  const page = content[locale];

  return {
    title: page.seo.title,
    description: page.seo.description,
    keywords: page.seo.keywords,
    openGraph: {
      title: page.seo.title,
      description: page.seo.description,
      type: "website",
    },
  };
}

export default async function DynamicLandingPage({ params }: PageProps) {
  const { slug } = await params;
  const pageContent = landingPagesDb[slug];

  if (!pageContent) {
    notFound();
  }

  const cookieStore = await cookies();
  const locale = (cookieStore.get("NEXT_LOCALE")?.value === "en" ? "en" : "vi") as "vi" | "en";
  const content = pageContent[locale];

  // Fallback to root equipment if none is specified for this landing page
  const pageEquipment = content.equipment || landingPagesDb.root[locale].equipment;

  return (
    <>
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <HeroSection {...content.hero} />

        {/* Studios Section */}
        <StudiosSection {...content.studios} />

        {/* Equipment Section */}
        <EquipmentSection equipment={pageEquipment} />

        {/* Atmospheric Quote Section */}
        {content.features && (
          <QuoteSection 
            quote={content.features.title}
            author={content.features.description || "LUMINA"}
            tagline={content.features.tagline}
          />
        )}
      </main>

      <Footer />
    </>
  );
}
