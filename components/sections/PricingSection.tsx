"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, ChevronDown, Sparkles } from "lucide-react";
import { landingPagesDb } from "@/lib/content";
import { formatPrice } from "@/lib/formatPrice";

const membershipPlans = [
  {
    name: "Creator Pass",
    price: 0,
    period: "month",
    description: "Ideal for independent artists and hobbyist photographers starting out.",
    features: [
      "Pay-as-you-go booking rates",
      "Reserve up to 14 days in advance",
      "Standard studio support during hours",
      "Access to community slack",
      "Free raw file delivery option"
    ],
    cta: "Get Started",
    popular: false,
    href: "/booking"
  },
  {
    name: "Pro Member",
    price: 1500000,
    period: "month",
    description: "Designed for active freelancers and boutique studios requiring consistent access.",
    features: [
      "15% off all studio hourly rates",
      "Reserve up to 30 days in advance",
      "1 free lighting kit rental per session",
      "Priority customer support",
      "24/7 keycard access requests available"
    ],
    cta: "Join Pro Membership",
    popular: true,
    href: "/booking?plan=pro"
  },
  {
    name: "Agency Unlimited",
    price: 5000000,
    period: "month",
    description: "For high-production commercial agencies and creative design teams.",
    features: [
      "25% off all studio hourly rates",
      "Reserve up to 60 days in advance",
      "Free base equipment rental selection",
      "Dedicated account manager",
      "On-site studio assistant included (2h)",
      "Priority rescheduling (no penalty up to 12h)"
    ],
    cta: "Contact for Agency",
    popular: false,
    href: "/booking?plan=agency"
  }
];


const faqs = [
  {
    question: "What is the minimum booking time?",
    answer: "Our minimum booking duration is 1.5 hours per session. This ensures each creator has enough time to set up, execute their shoot, and pack up without feeling rushed. A 15-minute buffer is automatically added between bookings for studio reset and cleaning."
  },
  {
    question: "What is your cancellation and rescheduling policy?",
    answer: "We offer full refunds for cancellations or rescheduling requested 24 hours or more before your session. Cancellations between 12 to 24 hours incur a 50% charge. Unfortunately, cancellations made under 12 hours notice will result in the loss of the full booking deposit."
  },
  {
    question: "Can we bring our own equipment?",
    answer: "Absolutely! You are welcome to bring any cameras, lenses, lights, or props needed for your creative vision at no additional fee. All studio bookings include basic stands, V-flats, and sandbags."
  },
  {
    question: "Are your studios soundproofed?",
    answer: "Studio A (The Loft) and Studio B (Industrial Edge) are professionally sound-dampened, making them excellent choices for podcasting, interviews, and video projects with dialogue. Studio C is specifically optimized for natural daylight photography and has normal ambient sound properties."
  },
  {
    question: "Are there discounts for full-day bookings?",
    answer: "Yes, we offer discounted custom rates for bookings of 8 hours or longer, as well as multi-day production schedules. Please contact our support team directly to request a custom quote."
  }
];

export function PricingSection() {
  const content = landingPagesDb.root;
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <section className="py-12 md:py-20 px-5 md:px-margin-desktop max-w-container-max mx-auto bg-background text-foreground">
      {/* Intro Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
        <span className="font-sans text-xs uppercase tracking-[0.3em] font-extrabold text-indigo-600 mb-4 block">
          Transparent Pricing
        </span>
        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-[-0.04em] uppercase text-primary leading-[0.95] mb-6">
          Rates & Packages
        </h1>
        <p className="font-sans text-sm md:text-base text-secondary leading-relaxed max-w-2xl mx-auto">
          Tailored spaces and top-tier gear. No hidden fees, no complexity. Choose the perfect environment and resources for your artistic execution.
        </p>
      </div>

      {/* 1. Studios Hourly Rates Section */}
      <div className="mb-20 md:mb-32">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-10 border-b border-neutral-200 pb-6">
          <h2 className="font-heading text-2xl md:text-4xl font-extrabold uppercase tracking-tight text-primary">
            Studio Spaces
          </h2>
          <p className="font-sans text-xs md:text-sm text-secondary uppercase tracking-[0.1em] mt-2 md:mt-0">
            *Rates are charged hourly with a 1.5-hour minimum
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
                  Specs & Features
                </span>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2.5 font-sans text-xs text-neutral-700">
                    <Check className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                    <span>Capacity: up to {room.capacity} people</span>
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
                  Book {room.name.split(":")[1]?.trim() || "Space"}
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
            Creative Memberships
          </h2>
          <p className="font-sans text-sm md:text-base text-secondary leading-relaxed">
            Unlock exclusive discounts, priority booking windows, and access to premium hardware with a monthly subscription plan.
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
                  Most Popular
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
                    {plan.price === 0 ? "FREE" : formatPrice(plan.price)}
                  </span>
                  {plan.price > 0 && (
                    <span className="font-sans text-xs text-secondary">/{plan.period}</span>
                  )}
                </div>
              </div>

              <div className="p-8 flex-grow bg-neutral-50/50">
                <span className="font-sans text-xs font-extrabold tracking-widest uppercase text-primary block mb-4">
                  What&apos;s Included
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
            Pricing FAQ
          </h2>
          <p className="font-sans text-sm md:text-base text-secondary">
            Got questions about payments, cancellations, or equipment policies? We&apos;ve got answers.
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
