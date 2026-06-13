"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { HeroSectionProps } from "@/types/landing";

export function HeroSection({
  title,
  ctaText,
  backgroundImage,
  description,
}: HeroSectionProps) {
  const [loaded, setLoaded] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number>(0);

  // Trigger entrance animation after mount
  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Subtle parallax on mouse move (desktop only) — uses ref to avoid re-renders
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!sectionRef.current || !parallaxRef.current) return;

    // Cancel any pending frame to avoid stacking
    if (rafId.current) cancelAnimationFrame(rafId.current);

    rafId.current = requestAnimationFrame(() => {
      const rect = sectionRef.current!.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      parallaxRef.current!.style.transform = `translate(${x * -8}px, ${y * -8}px) scale(1.08)`;
    });
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (section && window.innerWidth >= 768) {
      section.addEventListener("mousemove", handleMouseMove, { passive: true });
    }
    return () => {
      if (section) section.removeEventListener("mousemove", handleMouseMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [handleMouseMove]);

  // Split title into words for staggered animation
  const words = title.split(" ");

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Background Image — Ken Burns slow zoom + parallax on mouse */}
      {backgroundImage && (
        <div
          ref={parallaxRef}
          className="absolute inset-0 z-0 transition-transform duration-[1200ms] ease-out will-change-transform"
          style={{ transform: "translate(0px, 0px) scale(1.08)" }}
        >
          <Image
            alt="LUMINA Photography Studio — minimalist creative space"
            src={backgroundImage}
            fill
            priority
            unoptimized
            className={`object-cover transition-all duration-[2000ms] ease-out ${loaded ? "scale-100 opacity-100" : "scale-110 opacity-0"
              }`}
            sizes="100vw"
            onLoad={() => setLoaded(true)}
          />
        </div>
      )}

      {/* Gradient overlays */}
      <div className="absolute inset-0 z-[1] custom-gradient-overlay" />
      {/* Extra vignette for text readability */}
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)]" />

      {/* Animated grain texture overlay for cinematic feel */}
      <div className="absolute inset-0 z-[2] grain-overlay pointer-events-none" />

      {/* Hero Content */}
      <div className="relative z-10 text-center px-5 md:px-margin-mobile max-w-5xl mx-auto">
        {/* Tagline — fades in first */}
        <div
          className={`transition-all duration-700 ease-out ${loaded
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
            }`}
          style={{ transitionDelay: "300ms" }}
        >
          <span className="inline-block font-sans text-xs md:text-sm uppercase tracking-[0.4em] text-white/50 font-semibold mb-6 md:mb-8">
            {description || "Premium Photography Studios"}
          </span>
        </div>

        {/* Title — word-by-word staggered reveal */}
        <h1 className="font-heading text-[48px] sm:text-[64px] md:text-[80px] lg:text-[100px] font-medium tracking-[-0.04em] leading-[0.9] text-white mb-10 md:mb-14 overflow-hidden">
          {words.map((word, i) => (
            <span
              key={i}
              className={`inline-block mr-[0.25em] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${loaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-[1.2em]"
                }`}
              style={{ transitionDelay: `${500 + i * 120}ms` }}
            >
              {word}
            </span>
          ))}
        </h1>

        {/* Decorative line — draws in */}
        <div
          className={`mx-auto mb-10 md:mb-14 h-px bg-white/30 transition-all duration-1000 ease-out ${loaded ? "w-24 opacity-100" : "w-0 opacity-0"
            }`}
          style={{ transitionDelay: "900ms" }}
        />

        {/* CTA button — slides up */}
        <div
          className={`transition-all duration-700 ease-out ${loaded
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
            }`}
          style={{ transitionDelay: "1000ms" }}
        >
          <button
            onClick={() => {
              const target = document.getElementById("studios");
              if (target) {
                target.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="cta-sweep group relative inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-black font-sans text-xs md:text-sm uppercase tracking-[0.2em] font-bold transition-colors duration-400 hover:text-white border border-white/0 hover:border-white cursor-pointer"
            aria-label="Scroll down to explore studio spaces"
          >
            <span className="relative z-10">{ctaText}</span>
            <ChevronDown className="relative z-10 w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* Scroll Indicator — pulsing line */}
      <div
        className={`absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        style={{ transitionDelay: "1400ms" }}
        aria-hidden="true"
      >
        <span className="text-white/40 text-xs uppercase tracking-[0.3em] font-sans font-semibold">
          Scroll
        </span>
        <div className="relative w-px h-12 bg-white/10 overflow-hidden rounded-full">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-white/60 animate-scroll-line rounded-full" />
        </div>
      </div>
    </section>
  );
}
