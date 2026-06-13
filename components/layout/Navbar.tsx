"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Globe } from "lucide-react";
import { useLanguage } from "./LanguageContext";

export function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 50);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scrolledOrNotOnHome = scrolled || pathname !== "/";
  const textColor = scrolledOrNotOnHome ? "text-primary" : "text-white";
  const borderColor = scrolledOrNotOnHome ? "border-primary" : "border-white/20";

  const isActive = (href: string) => {
    if (href === "/pricing") return pathname === "/pricing";
    if (href === "/#studios") return pathname === "/";
    return false;
  };

  const navLinks = [
    { label: t("nav_studios"), href: "/#studios" },
    { label: t("nav_pricing"), href: "/pricing" },
    { label: t("nav_equipment"), href: "/#equipment" },
    { label: t("nav_about"), href: "/#about" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolledOrNotOnHome
          ? "bg-white/95 backdrop-blur-md shadow-[0_1px_0_0_rgba(0,0,0,0.08)]"
          : "bg-transparent"
      }`}
    >
      <nav
        className={`flex justify-between items-center w-full px-5 md:px-margin-desktop py-4 md:py-unit max-w-container-max mx-auto border-b transition-colors duration-500 ${borderColor}`}
      >
        {/* Brand Logo */}
        <Link
          href="/"
          className={`font-heading text-3xl md:text-4xl font-bold tracking-tight transition-colors duration-500 ${textColor}`}
          aria-label="LUMINA - Return to homepage"
        >
          LUMINA
        </Link>

        {/* Navigation Links - Hidden on Mobile */}
        <div className="hidden md:flex items-center space-x-gutter">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                className={`font-sans text-sm uppercase tracking-[0.12em] py-2 transition-all duration-300 ${
                  active
                    ? `${textColor} font-bold border-b-2 ${scrolledOrNotOnHome ? "border-primary" : "border-white"}`
                    : `${scrolledOrNotOnHome ? "text-secondary hover:text-primary" : "text-white/70 hover:text-white"}`
                }`}
                href={link.href}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Trailing Action */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Language Switcher Pill */}
          <div className={`flex items-center gap-0.5 border rounded-full p-0.5 transition-colors duration-500 ${
            scrolledOrNotOnHome ? "border-neutral-200 bg-neutral-50" : "border-white/10 bg-white/5"
          }`}>
            <button
              onClick={() => setLanguage("vi")}
              className={`font-sans text-[10px] font-extrabold px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                language === "vi"
                  ? scrolledOrNotOnHome
                    ? "bg-primary text-white"
                    : "bg-white text-black"
                  : scrolledOrNotOnHome
                    ? "text-secondary hover:text-primary"
                    : "text-white/60 hover:text-white"
              }`}
            >
              VN
            </button>
            <button
              onClick={() => setLanguage("en")}
              className={`font-sans text-[10px] font-extrabold px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                language === "en"
                  ? scrolledOrNotOnHome
                    ? "bg-primary text-white"
                    : "bg-white text-black"
                  : scrolledOrNotOnHome
                    ? "text-secondary hover:text-primary"
                    : "text-white/60 hover:text-white"
              }`}
            >
              EN
            </button>
          </div>

          <Link
            href="/booking"
            className={`hidden sm:inline-flex font-sans text-sm uppercase tracking-[0.12em] font-bold px-6 py-3 transition-all duration-300 active:scale-95 ${
              scrolledOrNotOnHome
                ? "bg-primary text-white hover:bg-neutral-800"
                : "bg-white text-black hover:bg-white/90"
            }`}
          >
            {t("nav_book_now")}
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            className={`md:hidden flex items-center justify-center p-2 transition-colors ${textColor}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div
          className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-primary py-6 px-margin-mobile flex flex-col space-y-1 mobile-menu-enter shadow-lg"
          role="navigation"
          aria-label="Mobile navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              className="font-sans text-sm uppercase tracking-[0.12em] text-primary hover:bg-neutral-50 py-3 px-4 transition-colors"
              href={link.href}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          
          <div className="pt-4 px-4 flex flex-col gap-4">
            <Link
              href="/booking"
              className="block text-center font-sans text-sm uppercase tracking-[0.15em] font-bold bg-primary text-white py-3 hover:bg-neutral-800 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {t("nav_book_now")}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
