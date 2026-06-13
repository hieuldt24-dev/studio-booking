import { Navbar } from "@/components/layout/Navbar";
import { PricingSection } from "@/components/sections/PricingSection";
import { Footer } from "@/components/layout/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing & Membership Packages | LUMINA",
  description: "Explore our transparent hourly studio rates and custom monthly membership packages.",
};

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main className="flex-grow pt-24 md:pt-32">
        <PricingSection />
      </main>
      <Footer />
    </>
  );
}
