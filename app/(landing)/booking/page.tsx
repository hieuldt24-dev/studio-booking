import { cookies } from "next/headers";
import { Navbar } from "@/components/layout/Navbar";
import { BookingSection } from "@/components/sections/BookingSection";
import { Footer } from "@/components/layout/Footer";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("NEXT_LOCALE")?.value === "en" ? "en" : "vi") as "vi" | "en";
  
  return {
    title: locale === "vi" ? "Đặt Lịch Phòng & Thiết Bị | LUMINA" : "Book Studio & Equipment | LUMINA",
    description: locale === "vi" 
      ? "Đặt chỗ phòng studio chụp ảnh/quay phim và tùy chọn các gói thiết bị máy ảnh, ống kính, và hệ thống đèn chiếu sáng cao cấp." 
      : "Reserve your photography studio environment and customize your package with high-end camera bodies, lenses, and lighting equipment.",
  };
}

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
