"use client";

import Link from "next/link";
import { useLanguage } from "./LanguageContext";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-background border-t border-neutral-200">
      <div className="grid grid-cols-12 gap-8 md:gap-gutter px-5 md:px-margin-desktop py-16 md:py-20 max-w-container-max mx-auto">
        <div className="col-span-12 md:col-span-6">
          <Link
            className="font-heading text-3xl md:text-4xl font-bold tracking-tight text-primary block mb-6"
            href="/"
            aria-label="LUMINA - Return to homepage"
          >
            LUMINA
          </Link>
          <p className="font-sans text-xs tracking-[0.1em] uppercase text-secondary">
            &copy; {new Date().getFullYear()} LUMINA. {t("footer_rights")}
          </p>
        </div>

        <div className="col-span-6 md:col-span-3 flex flex-col gap-3">
          <span className="font-sans text-xs tracking-[0.12em] uppercase font-bold text-primary mb-2">
            {t("footer_social")}
          </span>
          <Link
            className="font-sans text-xs tracking-[0.1em] uppercase text-secondary hover:text-primary hover:underline transition-colors"
            href="#"
          >
            INSTAGRAM
          </Link>
          <Link
            className="font-sans text-xs tracking-[0.1em] uppercase text-secondary hover:text-primary hover:underline transition-colors"
            href="#"
          >
            VIMEO
          </Link>
        </div>

        <div className="col-span-6 md:col-span-3 flex flex-col gap-3">
          <span className="font-sans text-xs tracking-[0.12em] uppercase font-bold text-primary mb-2">
            {t("footer_contact")}
          </span>
          <Link
            className="font-sans text-xs tracking-[0.1em] uppercase text-secondary hover:text-primary hover:underline transition-colors"
            href="/booking"
          >
            {t("nav_book_now")}
          </Link>
          <Link
            className="font-sans text-xs tracking-[0.1em] uppercase text-secondary hover:text-primary hover:underline transition-colors"
            href="/pricing"
          >
            {t("nav_pricing")}
          </Link>
          <Link
            className="font-sans text-xs tracking-[0.1em] uppercase text-secondary hover:text-primary hover:underline transition-colors"
            href="/#equipment"
          >
            {t("nav_equipment")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
