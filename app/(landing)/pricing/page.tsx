import { cookies } from "next/headers";
import { Navbar } from "@/components/layout/Navbar";
import { PricingSection } from "@/components/sections/PricingSection";
import { Footer } from "@/components/layout/Footer";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("NEXT_LOCALE")?.value === "en" ? "en" : "vi") as "vi" | "en";
  
  return {
    title: locale === "vi" ? "Bảng Giá & Gói Dịch Vụ | LUMINA" : "Pricing & Membership Packages | LUMINA",
    description: locale === "vi" 
      ? "Khám phá bảng giá thuê studio theo giờ minh bạch và các gói thành viên tháng thiết kế riêng cho nhu cầu của bạn." 
      : "Explore our transparent hourly studio rates and custom monthly membership packages.",
  };
}

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
