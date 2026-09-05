"use client";

import React from "react";
import { portfolioData } from "@/data/portfolio";

interface SidebarIntroProps {
  onOpenInfo: () => void;
  onOpenContact: () => void;
}

export const SidebarIntro: React.FC<SidebarIntroProps> = ({
  onOpenInfo,
  onOpenContact,
}) => {
  return (
    <aside className="w-full lg:max-w-[420px] lg:sticky lg:top-12 flex flex-col justify-between self-start pb-8">
      <div>
        {/* Name Title */}
        <h1 className="text-2xl sm:text-[28px] font-cal tracking-tight text-neutral-900 mb-6 sm:mb-8 font-semibold">
          {portfolioData.name}
        </h1>

        {/* Bio Copy */}
        <p className="text-[17px] sm:text-[19px] leading-[1.6] text-neutral-800 font-normal mb-8 max-w-[380px]">
          Designer and developer, blending design and code to turn ideas into digital products and software systems. Currently building independent projects.
        </p>

        {/* Black Action Pill Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={onOpenInfo}
            className="px-5 py-2.5 bg-black hover:bg-neutral-800 text-white font-mono text-[11px] sm:text-xs font-semibold tracking-wider rounded-full transition-all duration-150 active:scale-95 cursor-pointer outline-none"
          >
            INFO
          </button>

          <button
            onClick={onOpenContact}
            className="px-5 py-2.5 bg-black hover:bg-neutral-800 text-white font-mono text-[11px] sm:text-xs font-semibold tracking-wider rounded-full transition-all duration-150 active:scale-95 cursor-pointer outline-none"
          >
            CONTACT
          </button>

          <a
            href="https://linkedin.com/in/pynthamil-pavendan"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-black hover:bg-neutral-800 text-white font-mono text-[11px] sm:text-xs font-semibold tracking-wider rounded-full transition-all duration-150 active:scale-95 inline-flex items-center gap-1 cursor-pointer"
          >
            <span>LINKEDIN</span>
            <span className="text-xs">&nearr;</span>
          </a>

          <a
            href="https://github.com/Pynthamil"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-black hover:bg-neutral-800 text-white font-mono text-[11px] sm:text-xs font-semibold tracking-wider rounded-full transition-all duration-150 active:scale-95 inline-flex items-center gap-1 cursor-pointer"
          >
            <span>GITHUB</span>
            <span className="text-xs">&nearr;</span>
          </a>
        </div>
      </div>
    </aside>
  );
};
