import type { Metadata } from "next";
import { Syne, Hanken_Grotesk } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LUMINA | Premium Photography Studios",
  description:
    "Space to Create. Engineered for precision. Crafted for artists. Three distinct environments designed to accommodate any creative vision.",
  keywords: [
    "photography studio",
    "loft studio",
    "daylight studio",
    "lumina studio",
    "concept room",
  ],
  openGraph: {
    title: "LUMINA | Premium Photography Studios",
    description:
      "Space to Create. Engineered for precision. Crafted for artists.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${hanken.variable} h-full scroll-smooth`}
    >
      <body className="font-sans antialiased text-foreground bg-background min-h-screen flex flex-col selection:bg-black selection:text-white">
        {children}
      </body>
    </html>
  );
}
