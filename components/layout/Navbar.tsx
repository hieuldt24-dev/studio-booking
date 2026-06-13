"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Studios", href: "/#studios" },
  { label: "Pricing", href: "/pricing" },
  { label: "Equipment", href: "/#equipment" },
  { label: "About", href: "/#about" },
] as const;

export function Navbar() {
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

  // Determine text color: white when over hero (not scrolled), dark when scrolled
  const scrolledOrNotOnHome = scrolled || pathname !== "/";
  const textColor = scrolledOrNotOnHome ? "text-primary" : "text-white";
  const borderColor = scrolledOrNotOnHome ? "border-primary" : "border-white/20";

  const isActive = (href: string) => {
    if (href === "/pricing") return pathname === "/pricing";
    if (href === "/#studios") return pathname === "/";
    return false;
  };

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
          {NAV_LINKS.map((link) => {
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
        <div className="flex items-center gap-4 md:gap-gutter">
          <Link
            href="/booking"
            className={`hidden sm:inline-flex font-sans text-sm uppercase tracking-[0.12em] font-bold px-6 py-3 transition-all duration-300 active:scale-95 ${
              scrolledOrNotOnHome
                ? "bg-primary text-white hover:bg-neutral-800"
                : "bg-white text-black hover:bg-white/90"
            }`}
          >
            BOOK NOW
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
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              className="font-sans text-sm uppercase tracking-[0.12em] text-primary hover:bg-neutral-50 py-3 px-4 transition-colors"
              href={link.href}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 px-4">
            <Link
              href="/booking"
              className="block text-center font-sans text-sm uppercase tracking-[0.15em] font-bold bg-primary text-white py-3 hover:bg-neutral-800 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              BOOK NOW
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
