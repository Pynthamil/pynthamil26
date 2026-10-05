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
  const [selectedPersona, setSelectedPersona] = useState<typeof PERSONAS[0] | null>(null);

  const handleOpenZoom = (persona: typeof PERSONAS[0]) => {
    if (playTone) playTone(980);
    setSelectedPersona(persona);
  };

  return (
    <div className="w-full sm:w-[115%] sm:-ml-[7.5%] my-6">
      {/* Outer Container Box */}
      <div className="w-full p-4 sm:p-8 md:p-10 rounded-[22px] sm:rounded-[30px] bg-[#F5F5F7] dark:bg-[#18181B] border border-neutral-200/60 dark:border-neutral-800/80 shadow-[inset_0_2px_20px_rgba(0,0,0,0.06)] dark:shadow-[inset_0_2px_20px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col items-center justify-center">
        {/* Overlapping Persona SVG Cards */}
        <div className="relative w-full max-w-[680px] h-[210px] sm:h-[290px] md:h-[330px] flex items-center justify-center my-2 select-none">
          {/* Left Card - Persona 01 (Blue Border, Tilted Left) */}
          <div
            onClick={() => handleOpenZoom(PERSONAS[0])}
            className="absolute left-[0%] sm:left-[3%] md:left-[5%] w-[48%] sm:w-[45%] -rotate-6 z-10 transition-all duration-300 hover:z-30 hover:scale-105 cursor-pointer rounded-[20px] sm:rounded-[26px] overflow-hidden border-[3px] sm:border-[5px] border-[#7A9EFF] dark:border-[#5B84E6] shadow-[0_12px_32px_-8px_rgba(122,158,255,0.35),inset_0_2px_8px_rgba(0,0,0,0.06)]"
            title="Click to view Persona 01"
          >
            <img
              src={PERSONAS[0].src}
              alt={PERSONAS[0].title}
              className="w-full h-auto block object-cover rounded-[16px] sm:rounded-[21px]"
              loading="lazy"
            />
          </div>

          {/* Center Card - Persona 02 (Orange Border, Front & Center) */}
          <div
            onClick={() => handleOpenZoom(PERSONAS[1])}
            className="relative z-20 w-[54%] sm:w-[50%] transition-all duration-300 hover:scale-105 cursor-pointer rounded-[22px] sm:rounded-[30px] overflow-hidden border-[3.5px] sm:border-[6px] border-[#FF795B] dark:border-[#E05C3D] shadow-[0_16px_44px_-10px_rgba(255,121,91,0.45),inset_0_2px_8px_rgba(0,0,0,0.06)]"
            title="Click to view Persona 02"
          >
            <img
              src={PERSONAS[1].src}
              alt={PERSONAS[1].title}
              className="w-full h-auto block object-cover rounded-[18px] sm:rounded-[24px]"
              loading="lazy"
            />
          </div>

          {/* Right Card - Persona 03 (Pink Border, Tilted Right) */}
          <div
            onClick={() => handleOpenZoom(PERSONAS[2])}
            className="absolute right-[0%] sm:right-[3%] md:right-[5%] w-[48%] sm:w-[45%] rotate-6 z-10 transition-all duration-300 hover:z-30 hover:scale-105 cursor-pointer rounded-[20px] sm:rounded-[26px] overflow-hidden border-[3px] sm:border-[5px] border-[#FF85BA] dark:border-[#E064A1] shadow-[0_12px_32px_-8px_rgba(255,133,186,0.35),inset_0_2px_8px_rgba(0,0,0,0.06)]"
            title="Click to view Persona 03"
          >
            <img
              src={PERSONAS[2].src}
              alt={PERSONAS[2].title}
              className="w-full h-auto block object-cover rounded-[16px] sm:rounded-[21px]"
              loading="lazy"
            />
          </div>
        </div>
      </div>



      {/* Lightbox Modal */}
      {selectedPersona && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6">
          <div
            className="fixed inset-0 bg-neutral-900/70 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedPersona(null)}
          />
          <div className="relative z-10 max-w-2xl w-full max-h-[90vh] bg-[#F7F7F7] dark:bg-[#141415] border border-[#2C2C2C]/20 dark:border-[#a3a3a3]/30 shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150 rounded-2xl">
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#2C2C2C]/10 dark:border-[#a3a3a3]/20">
              <span className="font-mono text-xs font-semibold text-[#525252] dark:text-[#a3a3a3]">
                {selectedPersona.title} &bull; Full View
              </span>
              <button
                onClick={() => setSelectedPersona(null)}
                className="p-1 text-neutral-500 hover:text-neutral-800 dark:text-[#a3a3a3] dark:hover:text-[#F2F2F2] cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="overflow-y-auto p-3 sm:p-5 max-h-[calc(90vh-60px)] flex justify-center bg-[#2C2C2C]/[0.02] dark:bg-[#F2F2F2]/[0.02]">
              <img
                src={selectedPersona.src}
                alt={selectedPersona.title}
                className="w-full h-auto max-w-xl object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
