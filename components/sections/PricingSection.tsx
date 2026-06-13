"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Check, ChevronDown, Sparkles } from "lucide-react";
import { landingPagesDb } from "@/lib/content";
import { formatPrice } from "@/lib/formatPrice";
import { useLanguage } from "@/components/layout/LanguageContext";

export function PricingSection() {
  const { language, t } = useLanguage();
  const content = landingPagesDb.root[language];
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const membershipPlans = useMemo(() => [
    {
      name: t("plan_creator_name"),
      price: 0,
      period: language === "vi" ? "tháng" : "month",
      description: t("plan_creator_desc"),
      features: [
        t("plan_creator_f1"),
        t("plan_creator_f2"),
        t("plan_creator_f3"),
        t("plan_creator_f4"),
        t("plan_creator_f5")
      ],
      cta: t("plan_creator_cta"),
      popular: false,
      href: "/booking"
    },
    {
      name: t("plan_pro_name"),
      price: 1500000,
      period: language === "vi" ? "tháng" : "month",
      description: t("plan_pro_desc"),
      features: [
        t("plan_pro_f1"),
        t("plan_pro_f2"),
        t("plan_pro_f3"),
        t("plan_pro_f4"),
        t("plan_pro_f5")
      ],
      cta: t("plan_pro_cta"),
      popular: true,
      href: "/booking?plan=pro"
    },
    {
      name: t("plan_agency_name"),
      price: 5000000,
      period: language === "vi" ? "tháng" : "month",
      description: t("plan_agency_desc"),
      features: [
        t("plan_agency_f1"),
        t("plan_agency_f2"),
        t("plan_agency_f3"),
        t("plan_agency_f4"),
        t("plan_agency_f5"),
        t("plan_agency_f6")
      ],
      cta: t("plan_agency_cta"),
      popular: false,
      href: "/booking?plan=agency"
    }
  ], [language, t]);

  const faqs = useMemo(() => [
    {
      question: t("faq_q1"),
      answer: t("faq_a1")
    },
    {
      question: t("faq_q2"),
      answer: t("faq_a2")
    },
    {
      question: t("faq_q3"),
      answer: t("faq_a3")
    },
    {
      question: t("faq_q4"),
      answer: t("faq_a4")
    },
    {
      question: t("faq_q5"),
      answer: t("faq_a5")
    }
  ], [t]);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <section className="py-12 md:py-20 px-5 md:px-margin-desktop max-w-container-max mx-auto bg-background text-foreground">
      {/* Intro Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
        <span className="font-sans text-xs uppercase tracking-[0.3em] font-extrabold text-indigo-600 mb-4 block">
          {t("pricing_tagline")}
        </span>
        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-[-0.04em] uppercase text-primary leading-[0.95] mb-6">
          {t("pricing_title")}
        </h1>
        <p className="font-sans text-sm md:text-base text-secondary leading-relaxed max-w-2xl mx-auto">
          {t("pricing_subtitle")}
        </p>
      </div>

      {/* 1. Studios Hourly Rates Section */}
      <div className="mb-20 md:mb-32">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-10 border-b border-neutral-200 pb-6">
          <h2 className="font-heading text-2xl md:text-4xl font-extrabold uppercase tracking-tight text-primary">
            {t("pricing_spaces_title")}
          </h2>
          <p className="font-sans text-xs md:text-sm text-secondary uppercase tracking-[0.1em] mt-2 md:mt-0">
            {t("pricing_spaces_subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-gutter">
          {content.studios.rooms.map((room) => (
            <div
              key={room.id}
              className="border border-neutral-200 flex flex-col bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="p-8 border-b border-neutral-100">
                <h3 className="font-sans text-lg md:text-xl font-extrabold uppercase tracking-wide text-primary mb-2">
                  {room.name.split(":")[1]?.trim() || room.name}
                </h3>
                <p className="font-sans text-xs text-secondary tracking-widest uppercase mb-6">
                  {room.name.split(":")[0]?.trim() || "Studio"}
                </p>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="font-sans text-2xl md:text-3xl font-black text-primary">
                    {formatPrice(room.pricePerHour)}
                  </span>
                  <span className="font-sans text-xs text-secondary">/ hr</span>
                </div>
                <p className="font-sans text-xs text-secondary leading-relaxed line-clamp-3">
                  {room.description}
                </p>
              </div>

              <div className="p-8 flex-grow bg-neutral-50/50">
                <span className="font-sans text-xs font-extrabold tracking-widest uppercase text-primary block mb-4">
                  {t("pricing_specs_title")}
                </span>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2.5 font-sans text-xs text-neutral-700">
                    <Check className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                    <span>{t("pricing_capacity", { capacity: room.capacity })}</span>
                  </li>
                  {room.equipment.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2.5 font-sans text-xs text-neutral-700">
                      <Check className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 border-t border-neutral-100 bg-white">
                <Link
                  href={`/booking?studio=${room.id}`}
                  className="block text-center w-full py-4 bg-primary text-white font-sans text-xs uppercase tracking-[0.15em] font-bold hover:bg-neutral-800 transition-colors"
                >
                  {t("pricing_spaces_btn", { room: room.name.split(":")[1]?.trim() || room.name })}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Monthly Memberships Section */}
      <div className="mb-20 md:mb-32">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-primary mb-4">
            {t("pricing_memberships_title")}
          </h2>
          <p className="font-sans text-sm md:text-base text-secondary leading-relaxed">
            {t("pricing_memberships_subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {membershipPlans.map((plan, idx) => (
            <div
              key={idx}
              className={`border flex flex-col relative bg-white transition-all duration-300 ${
                plan.popular
                  ? "border-indigo-600 ring-2 ring-indigo-600 md:-translate-y-2 shadow-lg"
                  : "border-neutral-200 hover:border-neutral-400 hover:shadow-md hover:-translate-y-1"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white font-sans text-xs uppercase tracking-[0.15em] font-extrabold px-4 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                  <Sparkles className="w-3 h-3" />
                  {language === "vi" ? "Phổ biến nhất" : "Most Popular"}
                </div>
              )}

              <div className="p-8 border-b border-neutral-100">
                <h3 className="font-sans text-lg md:text-xl font-extrabold uppercase tracking-wide text-primary mb-2">
                  {plan.name}
                </h3>
                <p className="font-sans text-xs text-secondary leading-relaxed mb-6">
                  {plan.description}
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="font-sans text-2xl md:text-3xl font-black text-primary">
                    {plan.price === 0 ? (language === "vi" ? "MIỄN PHÍ" : "FREE") : formatPrice(plan.price)}
                  </span>
                  {plan.price > 0 && (
                    <span className="font-sans text-xs text-secondary">/{plan.period}</span>
                  )}
                </div>
              </div>

              <div className="p-8 flex-grow bg-neutral-50/50">
                <span className="font-sans text-xs font-extrabold tracking-widest uppercase text-primary block mb-4">
                  {language === "vi" ? "Quyền lợi bao gồm" : "What's Included"}
                </span>
                <ul className="space-y-3.5 mb-6">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2.5 font-sans text-xs text-neutral-700 leading-tight">
                      <Check className="w-4 h-4 text-indigo-600 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 border-t border-neutral-100 bg-white">
                <Link
                  href={plan.href}
                  className={`block text-center w-full py-4 font-sans text-xs uppercase tracking-[0.15em] font-bold transition-all duration-300 ${
                    plan.popular
                      ? "bg-indigo-600 text-white hover:bg-indigo-700"
                      : "bg-transparent border border-neutral-300 text-primary hover:bg-primary hover:text-white hover:border-primary"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Frequently Asked Questions Section */}
      <div className="max-w-4xl mx-auto border-t border-neutral-200 pt-20">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-primary mb-4">
            {t("pricing_faq_title")}
          </h2>
          <p className="font-sans text-sm md:text-base text-secondary">
            {t("pricing_faq_subtitle")}
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className={`border bg-white transition-all duration-200 ${
                  isOpen ? "border-neutral-400 shadow-sm" : "border-neutral-200 hover:border-neutral-300"
                }`}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex justify-between items-center p-5 md:p-6 text-left cursor-pointer focus:outline-none group"
                  aria-expanded={isOpen}
                >
                  <span className="font-sans text-sm md:text-base font-bold text-primary tracking-wide pr-4">
                    {faq.question}
                  </span>
                  <span className={`flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
                    <ChevronDown className="w-5 h-5 text-secondary" />
                  </span>
                </button>
                {isOpen && (
                  <div className="px-5 md:px-6 pb-5 md:pb-6 border-t border-neutral-100 font-sans text-sm text-secondary leading-relaxed animate-accordion-open">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
