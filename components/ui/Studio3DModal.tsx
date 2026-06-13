"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X, Compass, HelpCircle } from "lucide-react";
import { PanoramaViewer } from "./PanoramaViewer";
import { useLanguage } from "@/components/layout/LanguageContext";

interface Studio3DModalProps {
  studioName: string;
  panoramaUrl: string;
  studioId: string;
  isOpen: boolean;
  onClose: () => void;
}

export function Studio3DModal({
  studioName,
  panoramaUrl,
  studioId,
  isOpen,
  onClose,
}: Studio3DModalProps) {
  const { t } = useLanguage();
  const [showHelper, setShowHelper] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Fade out help guidelines after 4 seconds
  useEffect(() => {
    if (!isOpen) return;
    setErrorMsg(null);
    setShowHelper(true);
    const timer = setTimeout(() => {
      setShowHelper(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  // Lock scroll on background when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/80 backdrop-blur-sm transition-all duration-300 animate-fade-in">
      {/* Background click to close */}
      <div className="absolute inset-0 cursor-default" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative w-full max-w-6xl h-[80vh] md:h-[85vh] bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col z-10 transition-transform duration-300 scale-100">
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-neutral-900/95 border-b border-neutral-800 flex justify-between items-center z-20">
          <div className="flex items-center gap-3">
            <Compass className="w-5 h-5 text-indigo-500 animate-pulse" />
            <div>
              <span className="text-[10px] font-sans font-bold tracking-[0.2em] text-neutral-400 uppercase">
                {t("modal_3d_title")}
              </span>
              <h3 className="font-heading text-lg md:text-xl font-bold text-white uppercase tracking-wide">
                {studioName}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowHelper((prev) => !prev)}
              className="p-2 hover:bg-neutral-800 text-neutral-400 hover:text-white rounded-lg transition-colors"
              title={t("modal_3d_help")}
            >
              <HelpCircle className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-neutral-800 text-neutral-400 hover:text-white rounded-lg transition-colors"
              title={t("modal_3d_close")}
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* 3D Viewport Content */}
        <div className="flex-1 w-full relative bg-neutral-950">
          {errorMsg ? (
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white px-4 text-center">
              <p className="text-red-400 font-sans mb-3 text-sm">{errorMsg}</p>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-xs tracking-wider uppercase font-semibold rounded-lg transition-colors"
              >
                {t("modal_3d_back")}
              </button>
            </div>
          ) : (
            <PanoramaViewer
              imageSrc={panoramaUrl}
              onError={(err) => setErrorMsg(err)}
            />
          )}

          {/* Gesture Instruction overlay */}
          {showHelper && !errorMsg && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/45 pointer-events-none z-10 transition-opacity duration-500 animate-fade-out">
              <div className="p-6 md:p-8 bg-neutral-900/90 border border-neutral-800 rounded-xl max-w-sm text-center mx-4 flex flex-col items-center">
                <Compass className="w-12 h-12 text-indigo-500 mb-4 animate-bounce" />
                <h4 className="font-sans text-sm font-bold text-white uppercase tracking-wider mb-2">
                  {t("modal_3d_instructions_title")}
                </h4>
                <p className="font-sans text-xs text-neutral-400 leading-relaxed">
                  {t("modal_3d_instructions_desc")}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer / CTA */}
        <div className="px-6 py-4 bg-neutral-900 border-t border-neutral-800 flex flex-col sm:flex-row justify-between items-center gap-4 z-20">
          <p className="font-sans text-xs text-neutral-400 text-center sm:text-left leading-relaxed">
            {t("modal_3d_disclaimer")}
          </p>
          <div className="flex gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-6 py-2.5 border border-neutral-800 hover:bg-neutral-800 text-neutral-300 hover:text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all"
            >
              {t("modal_3d_close_btn")}
            </button>
            <Link
              href={`/booking?studio=${studioId}`}
              className="flex-1 sm:flex-none px-8 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold uppercase tracking-wider rounded-lg text-center transition-all shadow-md shadow-indigo-600/10 hover:shadow-indigo-600/25"
            >
              {t("modal_3d_book_btn")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
