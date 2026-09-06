"use client";

import React, { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";

interface PersonaShowcaseProps {
  playTone?: (freq?: number) => void;
}

const PERSONAS = [
  { id: 1, title: "Persona 01", src: "/semantic/up1.svg" },
  { id: 2, title: "Persona 02", src: "/semantic/up2.svg" },
  { id: 3, title: "Persona 03", src: "/semantic/up3.svg" },
];

export function PersonaShowcase({ playTone }: PersonaShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const handleSelect = (index: number) => {
    if (index === activeIndex) return;
    if (playTone) playTone(980);
    setActiveIndex(index);
  };

  const handlePrev = () => {
    if (playTone) playTone(880);
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : PERSONAS.length - 1));
  };

  const handleNext = () => {
    if (playTone) playTone(1046);
    setActiveIndex((prev) => (prev < PERSONAS.length - 1 ? prev + 1 : 0));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
  };

  const currentPersona = PERSONAS[activeIndex];

  return (
    <div className="w-full my-4 space-y-3">
      {/* Header bar with tabs & navigation */}
      <div className="flex items-center justify-between gap-2 border-b border-neutral-200/70 dark:border-[#9999FF]/20 pb-3">
        {/* Numbered Tabs */}
        <div className="flex items-center space-x-1.5 sm:space-x-2">
          {PERSONAS.map((persona, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={persona.id}
                onClick={() => handleSelect(idx)}
                className={`font-mono text-xs sm:text-[13px] px-2.5 py-1 transition-all cursor-pointer border ${
                  isActive
                    ? "bg-[#232564]/[0.06] dark:bg-[#F5F5FF]/[0.06] font-bold text-[#11408F] dark:text-[#AEF0FF] border-[#232564]/25 dark:border-[#9999FF]/40"
                    : "bg-transparent text-[#232564]/60 dark:text-[#F5F5FF]/60 border-transparent hover:text-[#232564] dark:hover:text-[#F5F5FF] hover:border-[#232564]/10 dark:hover:border-[#9999FF]/20"
                }`}
                aria-label={`View persona ${idx + 1}`}
              >
                0{idx + 1}
              </button>
            );
          })}
        </div>

        {/* Navigation buttons & Zoom trigger */}
        <div className="flex items-center space-x-1">
          <button
            onClick={() => {
              if (playTone) playTone(1200);
              setIsZoomOpen(true);
            }}
            className="p-1.5 text-[#232564]/70 dark:text-[#F5F5FF]/70 hover:text-[#232564] dark:hover:text-[#F5F5FF] transition-colors hover:bg-[#232564]/[0.05] dark:hover:bg-[#9999FF]/10 cursor-pointer"
            title="Expand persona full screen"
            aria-label="Expand image"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handlePrev}
            className="p-1.5 text-[#232564]/70 dark:text-[#F5F5FF]/70 hover:text-[#232564] dark:hover:text-[#F5F5FF] transition-colors hover:bg-[#232564]/[0.05] dark:hover:bg-[#9999FF]/10 cursor-pointer"
            aria-label="Previous persona"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="font-mono text-xs text-[#11408F] dark:text-[#AEF0FF] px-1 select-none">
            {activeIndex + 1}/{PERSONAS.length}
          </span>
          <button
            onClick={handleNext}
            className="p-1.5 text-[#232564]/70 dark:text-[#F5F5FF]/70 hover:text-[#232564] dark:hover:text-[#F5F5FF] transition-colors hover:bg-[#232564]/[0.05] dark:hover:bg-[#9999FF]/10 cursor-pointer"
            aria-label="Next persona"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Persona Card Container */}
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative w-full border border-[#232564]/10 dark:border-[#9999FF]/20 bg-[#232564]/[0.02] dark:bg-[#F5F5FF]/[0.02] overflow-hidden transition-all select-none"
      >
        <div className="w-full relative overflow-hidden">
          <img
            src={currentPersona.src}
            alt={currentPersona.title}
            className="w-full h-auto block object-contain transition-opacity duration-200"
            loading="lazy"
          />
        </div>

        {/* Mobile Swipe Hint Bar */}
        <div className="flex sm:hidden items-center justify-between px-3 py-1.5 bg-[#232564]/[0.04] dark:bg-[#F5F5FF]/[0.04] border-t border-[#232564]/10 dark:border-[#9999FF]/20 font-mono text-[11px] text-[#64748B] dark:text-[#8E95B8]">
          <span>&larr; swipe to switch &rarr;</span>
          <button
            onClick={() => setIsZoomOpen(true)}
            className="text-[#6666FF] dark:text-[#9999FF] underline cursor-pointer"
          >
            tap to zoom
          </button>
        </div>
      </div>

      <p className="font-mono text-xs text-[#11408F] dark:text-[#AEF0FF] text-center">
        // user persona research &mdash; {currentPersona.title.toLowerCase()}
      </p>

      {/* Zoom / Fullscreen Lightbox Modal */}
      {isZoomOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6">
          <div
            className="fixed inset-0 bg-neutral-900/70 backdrop-blur-sm transition-opacity"
            onClick={() => setIsZoomOpen(false)}
          />
          <div className="relative z-10 max-w-2xl w-full max-h-[90vh] bg-[#F5F5FF] dark:bg-[#0B0C0F] border border-[#232564]/20 dark:border-[#9999FF]/30 shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#232564]/10 dark:border-[#9999FF]/20">
              <span className="font-mono text-xs font-semibold text-[#11408F] dark:text-[#AEF0FF]">
                {currentPersona.title} &bull; Full View
              </span>
              <button
                onClick={() => setIsZoomOpen(false)}
                className="p-1 text-neutral-500 hover:text-neutral-800 dark:text-[#9999FF] dark:hover:text-[#F5F5FF] cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="overflow-y-auto p-2 sm:p-4 max-h-[calc(90vh-60px)] flex justify-center bg-[#232564]/[0.02] dark:bg-[#F5F5FF]/[0.02]">
              <img
                src={currentPersona.src}
                alt={currentPersona.title}
                className="w-full h-auto max-w-xl object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
