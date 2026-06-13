"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Camera, Rotate3d } from "lucide-react";
import { StudioListSectionProps } from "@/types/landing";
import { Studio3DModal } from "../ui/Studio3DModal";

export function StudiosSection({
  title,
  description,
  rooms,
}: StudioListSectionProps) {
  const studioA = rooms[0];
  const studioB = rooms[1];
  const studioC = rooms[2];

  const [active3DStudio, setActive3DStudio] = useState<{
    name: string;
    panoramaUrl: string;
    id: string;
  } | null>(null);

  return (
    <section
      className="py-20 md:py-32 px-5 md:px-margin-desktop max-w-container-max mx-auto"
      id="studios"
    >
      {/* Title Header */}
      <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 gap-8 md:gap-gutter">
        <h2 className="font-heading text-4xl sm:text-5xl md:text-[76px] lg:text-[88px] font-extrabold tracking-[-0.05em] uppercase text-primary leading-[0.95]">
          {title}
        </h2>
        {description && (
          <p className="font-sans italic text-sm md:text-base leading-relaxed text-secondary max-w-md">
            {description}
          </p>
        )}
      </div>

      {/* Bento-style Grid */}
      <div className="grid grid-cols-12 gap-4 md:gap-gutter">
        {/* Studio A: Large Feature Card */}
        {studioA && (
          <div className="col-span-12 md:col-span-8 group overflow-hidden border border-neutral-200 hover:border-neutral-400 flex flex-col transition-all duration-300 hover:shadow-md">
            <div 
              className="relative aspect-[16/9] overflow-hidden bg-neutral-100 cursor-pointer"
              onClick={() => studioA.panoramaUrl && setActive3DStudio({
                name: studioA.name,
                panoramaUrl: studioA.panoramaUrl,
                id: studioA.id
              })}
              title="Click để xem 3D không gian phòng"
            >
              <Image
                src={studioA.image}
                alt={`${studioA.name} — ${studioA.description.slice(0, 80)}`}
                fill
                sizes="(max-width: 768px) 100vw, 66vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                quality={80}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500 flex items-center justify-center">
                {studioA.panoramaUrl && (
                  <div className="opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300 bg-white/90 backdrop-blur-md text-primary font-sans text-xs font-bold tracking-[0.15em] uppercase px-5 py-3 rounded-full flex items-center gap-2 shadow-lg">
                    <Rotate3d className="w-4 h-4 animate-pulse text-indigo-600" />
                    Xem 3D Phòng
                  </div>
                )}
              </div>
            </div>
            <div className="p-6 md:p-8 flex justify-between items-center bg-white border-t border-neutral-200">
              <div>
                <span className="font-sans text-xs font-extrabold tracking-[0.2em] text-indigo-600 uppercase mb-1.5 block">
                  Available Now
                </span>
                <h3 className="font-sans text-xl md:text-2xl lg:text-3xl font-extrabold tracking-wide text-primary uppercase leading-tight">
                  {studioA.name}
                </h3>
              </div>
              <Link
                href="/booking?studio=studio-a"
                className="flex items-center justify-center w-12 h-12 group-hover:translate-x-1 transition-transform"
                aria-label={`Book ${studioA.name}`}
              >
                <ArrowRight className="w-7 h-7 text-primary" />
              </Link>
            </div>
          </div>
        )}

        {/* Features Sidebar */}
        <div className="col-span-12 md:col-span-4 flex flex-col gap-4 md:gap-gutter">
          <div className="flex-1 border border-neutral-200 p-8 md:p-10 flex flex-col justify-center bg-white">
            <Camera className="w-10 h-10 mb-6 text-primary" />
            <h4 className="font-sans text-xs font-extrabold mb-4 uppercase text-primary tracking-[0.2em]">
              Equipment Included
            </h4>
            <ul className="space-y-3">
              {studioA?.equipment.slice(0, 3).map((item, index) => (
                <li
                  key={index}
                  className="font-sans text-sm text-neutral-700 border-b border-neutral-100 pb-2"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-black text-white p-8 md:p-10 flex flex-col justify-center">
            <h4 className="font-sans text-xs font-extrabold mb-2 uppercase tracking-[0.2em]">
              Member Access
            </h4>
            <p className="font-sans text-sm opacity-80 mb-6 leading-relaxed">
              Join our creative collective for 24/7 access and priority booking.
            </p>
            <Link
              className="font-sans text-xs underline tracking-[0.12em] uppercase font-bold text-white hover:opacity-70 self-start transition-opacity"
              href="/pricing"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Studio B */}
        {studioB && (
          <div className="col-span-12 md:col-span-6 group border border-neutral-200 hover:border-neutral-400 flex flex-col transition-all duration-300 hover:shadow-md">
            <div 
              className="relative aspect-square overflow-hidden bg-neutral-100 cursor-pointer"
              onClick={() => studioB.panoramaUrl && setActive3DStudio({
                name: studioB.name,
                panoramaUrl: studioB.panoramaUrl,
                id: studioB.id
              })}
              title="Click để xem 3D không gian phòng"
            >
              <Image
                src={studioB.image}
                alt={`${studioB.name} — ${studioB.description.slice(0, 80)}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                quality={80}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500 flex items-center justify-center">
                {studioB.panoramaUrl && (
                  <div className="opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300 bg-white/90 backdrop-blur-md text-primary font-sans text-xs font-bold tracking-[0.15em] uppercase px-5 py-3 rounded-full flex items-center gap-2 shadow-lg">
                    <Rotate3d className="w-4 h-4 animate-pulse text-indigo-600" />
                    Xem 3D Phòng
                  </div>
                )}
              </div>
            </div>
            <div className="p-6 md:p-8 bg-white border-t border-neutral-200 flex-grow">
              <div className="flex justify-between items-start">
                <h3 className="font-sans text-xl md:text-2xl font-extrabold tracking-wide text-primary uppercase leading-tight">
                  {studioB.name}
                </h3>
                <Link
                  href="/booking?studio=studio-b"
                  className="group-hover:translate-x-1 transition-transform flex-shrink-0 ml-4"
                  aria-label={`Book ${studioB.name}`}
                >
                  <ArrowRight className="w-6 h-6 text-primary" />
                </Link>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {studioB.equipment.slice(0, 2).map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 border border-secondary/30 font-sans text-xs font-bold text-secondary uppercase tracking-[0.1em]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Studio C */}
        {studioC && (
          <div className="col-span-12 md:col-span-6 group border border-neutral-200 hover:border-neutral-400 flex flex-col transition-all duration-300 hover:shadow-md">
            <div 
              className="relative aspect-square overflow-hidden bg-neutral-100 cursor-pointer"
              onClick={() => studioC.panoramaUrl && setActive3DStudio({
                name: studioC.name,
                panoramaUrl: studioC.panoramaUrl,
                id: studioC.id
              })}
              title="Click để xem 3D không gian phòng"
            >
              <Image
                src={studioC.image}
                alt={`${studioC.name} — ${studioC.description.slice(0, 80)}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                quality={80}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500 flex items-center justify-center">
                {studioC.panoramaUrl && (
                  <div className="opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300 bg-white/90 backdrop-blur-md text-primary font-sans text-xs font-bold tracking-[0.15em] uppercase px-5 py-3 rounded-full flex items-center gap-2 shadow-lg">
                    <Rotate3d className="w-4 h-4 animate-pulse text-indigo-600" />
                    Xem 3D Phòng
                  </div>
                )}
              </div>
            </div>
            <div className="p-6 md:p-8 bg-white border-t border-neutral-200 flex-grow">
              <div className="flex justify-between items-start">
                <h3 className="font-sans text-xl md:text-2xl font-extrabold tracking-wide text-primary uppercase leading-tight">
                  {studioC.name}
                </h3>
                <Link
                  href="/booking?studio=studio-c"
                  className="group-hover:translate-x-1 transition-transform flex-shrink-0 ml-4"
                  aria-label={`Book ${studioC.name}`}
                >
                  <ArrowRight className="w-6 h-6 text-primary" />
                </Link>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {studioC.equipment.slice(0, 2).map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 border border-secondary/30 font-sans text-xs font-bold text-secondary uppercase tracking-[0.1em]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3D Panorama Modal */}
      {active3DStudio && (
        <Studio3DModal
          studioName={active3DStudio.name}
          panoramaUrl={active3DStudio.panoramaUrl}
          studioId={active3DStudio.id}
          isOpen={true}
          onClose={() => setActive3DStudio(null)}
        />
      )}
    </section>
  );
}
