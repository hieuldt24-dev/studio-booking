"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SlidersHorizontal, Camera, Lightbulb, Mic, Plus } from "lucide-react";
import { EquipmentItem } from "@/types/landing";
import { formatPrice } from "@/lib/formatPrice";

interface EquipmentSectionProps {
  equipment?: EquipmentItem[];
}

type CategoryFilter = "all" | "camera" | "lighting" | "audio_other";

export function EquipmentSection({ equipment = [] }: EquipmentSectionProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");

  const categories = [
    { id: "all", label: "All Gear", icon: SlidersHorizontal },
    { id: "camera", label: "Cameras & Lenses", icon: Camera },
    { id: "lighting", label: "Lighting & Modifiers", icon: Lightbulb },
    { id: "audio_other", label: "Audio & Support", icon: Mic },
  ];

  const filteredEquipment = equipment.filter((item) => {
    if (activeCategory === "all") return true;
    if (activeCategory === "camera") return item.category === "camera";
    if (activeCategory === "lighting") return item.category === "lighting";
    if (activeCategory === "audio_other") return item.category === "audio" || item.category === "other";
    return true;
  });

  return (
    <section
      className="py-20 md:py-32 px-5 md:px-margin-desktop max-w-container-max mx-auto border-t border-neutral-200"
      id="equipment"
    >
      {/* Section Title */}
      <div className="flex flex-col md:flex-row justify-between items-baseline mb-12 gap-6">
        <div>
          <span className="font-sans text-xs font-extrabold tracking-[0.2em] text-indigo-600 uppercase mb-2 block">
            Gear Catalogue
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-[76px] lg:text-[88px] font-extrabold tracking-[-0.05em] uppercase text-primary leading-[0.95]">
            EQUIPMENT RENTAL
          </h2>
        </div>
        <p className="font-sans text-sm md:text-base leading-relaxed text-secondary max-w-md">
          High-end professional equipment available for rent. Add them to your studio session or book them separately.
        </p>
      </div>

      {/* Tabs Filter */}
      <div className="flex flex-wrap gap-2 mb-10 border-b border-neutral-100 pb-6">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as CategoryFilter)}
              className={`flex items-center gap-2 px-6 py-3 font-sans text-xs uppercase tracking-wider font-bold transition-all duration-300 border focus-visible:outline-2 focus-visible:outline-indigo-600 cursor-pointer ${
                isActive
                  ? "bg-black text-white border-black"
                  : "bg-transparent text-secondary border-neutral-200 hover:border-neutral-800"
              }`}
            >
              <Icon className="w-4 h-4" />
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Equipment Bento Grid */}
      <div className="grid grid-cols-12 gap-6">
        {filteredEquipment.length === 0 ? (
          <div className="col-span-12 py-20 text-center border border-dashed border-neutral-200">
            <p className="font-sans text-secondary text-sm">No equipment found in this category.</p>
          </div>
        ) : (
          filteredEquipment.map((item, idx) => {
            // Create asymmetric card spans for Bento grid look
            const isLargeCard = idx % 5 === 0;
            const gridSpan = isLargeCard
              ? "col-span-12 lg:col-span-8"
              : "col-span-12 md:col-span-6 lg:col-span-4";
            const aspectClass = isLargeCard ? "aspect-[16/9] lg:aspect-[21/9]" : "aspect-[16/10]";

            return (
              <div
                key={item.id}
                className={`${gridSpan} group border border-neutral-200 hover:border-neutral-400 transition-all duration-300 bg-white flex flex-col justify-between hover:shadow-md`}
              >
                <div>
                  {/* Visual container */}
                  <div className={`relative ${aspectClass} overflow-hidden bg-neutral-50`}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes={isLargeCard ? "(max-width: 1024px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                      quality={80}
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 border border-neutral-200">
                      <span className="font-sans text-xs font-extrabold uppercase tracking-[0.1em] text-primary">
                        {item.category === "camera" ? "Camera & Lens" : item.category === "lighting" ? "Lighting" : "Gear"}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 md:p-8">
                    <h3 className="font-heading text-lg md:text-xl font-bold tracking-tight text-primary normal-case mb-2">
                      {item.name}
                    </h3>
                    <p className="font-sans text-sm text-secondary leading-relaxed mb-6">
                      {item.description}
                    </p>

                    {/* Specifications List */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.specs.map((spec, specIdx) => (
                        <span
                          key={specIdx}
                          className="px-2.5 py-1 bg-neutral-50 border border-neutral-200 text-xs font-sans font-bold uppercase text-secondary tracking-[0.1em]"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Pricing & CTA footer */}
                <div className="px-6 md:px-8 pb-6 md:pb-8 pt-4 border-t border-neutral-100 flex items-center justify-between mt-auto">
                  <div>
                    <span className="font-sans text-xs text-secondary uppercase block tracking-[0.1em]">
                      Rate / Session
                    </span>
                    <span className="font-sans text-base font-extrabold text-primary">
                      {formatPrice(item.pricePerSession)}
                    </span>
                  </div>
                  <Link
                    href={`/booking?equipment=${item.id}`}
                    className="flex items-center gap-1.5 px-4 py-2 border border-black hover:bg-black hover:text-white transition-all font-sans text-xs font-bold uppercase tracking-wider cursor-pointer"
                    aria-label={`Rent ${item.name}`}
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Rent
                  </Link>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
