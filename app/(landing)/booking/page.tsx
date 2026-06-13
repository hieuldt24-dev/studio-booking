import { Navbar } from "@/components/layout/Navbar";
import { BookingSection } from "@/components/sections/BookingSection";
import { Footer } from "@/components/layout/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Studio & Equipment | LUMINA",
  description: "Reserve your photography studio environment and customize your package with high-end camera bodies, lenses, and lighting equipment.",
};

export default function BookingPage() {
  return (
    <>
      <Navbar />
      <main className="flex-grow pt-24 md:pt-32">
        <BookingSection />
      </main>
      <Footer />
    </>
  );
}
