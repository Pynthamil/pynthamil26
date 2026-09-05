"use client";

import React from "react";
import { portfolioData, SocialLink } from "@/data/portfolio";

interface HeroHeaderProps {
  onOpenResume?: () => void;
}

export const HeroHeader: React.FC<HeroHeaderProps> = ({ onOpenResume }) => {
  return (
    <section className="flex flex-col items-center text-center px-4 max-w-2xl mx-auto mb-16 sm:mb-20">
      {/* Name Title */}
      <h1 className="text-[34px] sm:text-[42px] font-semibold tracking-tight text-[#4e5df8] mb-4 font-cal">
        {portfolioData.name}
      </h1>

      {/* Bio / Tagline */}
      <p className="text-neutral-900 font-semibold text-[15px] sm:text-[17px] leading-[1.5] max-w-[520px] mb-8">
        {portfolioData.tagline}
      </p>

      {/* Social and Action Buttons Row (3x bigger) */}
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-3.5">
        {portfolioData.socialLinks.map((link: SocialLink) => {
          if (link.label === "resume") {
            return (
              <button
                key={link.label}
                onClick={onOpenResume}
                className="px-5 py-2.5 sm:px-6 sm:py-3 bg-[#E5E3DE] hover:bg-[#D8D5CE] text-neutral-900 font-bold text-sm sm:text-base rounded-xl transition-all duration-150 active:scale-95 shadow-xs"
              >
                {link.label}
              </button>
            );
          }

          if (link.isPrimary) {
            return (
              <a
                key={link.label}
                href={link.href}
                className="px-5 py-2.5 sm:px-6 sm:py-3 bg-[#4e5df8] hover:bg-[#4351ea] text-white font-bold text-sm sm:text-base rounded-xl transition-all duration-150 active:scale-95 shadow-xs inline-flex items-center justify-center"
              >
                {link.label}
              </a>
            );
          }

          return (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 sm:px-6 sm:py-3 bg-[#E5E3DE] hover:bg-[#D8D5CE] text-neutral-900 font-bold text-sm sm:text-base rounded-xl transition-all duration-150 active:scale-95 shadow-xs inline-flex items-center justify-center"
            >
              {link.label}
            </a>
          );
        })}
      </div>
    </section>
  );
};
