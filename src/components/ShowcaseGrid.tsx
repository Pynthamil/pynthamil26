"use client";

import React from "react";
import { portfolioData } from "@/data/portfolio";
import { CalendarSvg } from "@/components/svg/CalendarSvg";

interface ShowcaseGridProps {
  onSelectProject?: (item: (typeof portfolioData.showcase)[0]) => void;
}

export const ShowcaseGrid: React.FC<ShowcaseGridProps> = ({
  onSelectProject,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-10 sm:gap-y-12">
      {portfolioData.showcase.map((item) => {
        return (
          <div
            key={item.id}
            onClick={() => onSelectProject && onSelectProject(item)}
            className="group cursor-dot flex flex-col"
          >
            {/* Card Container */}
            <div
              className={`w-full ${item.aspectRatio} bg-[#ededed] hover:bg-[#e7e7e7] rounded-xl sm:rounded-2xl overflow-hidden flex items-center justify-center p-6 sm:p-8 transition-all duration-300 ease-out relative`}
            >
              {item.imageType === "calendar" ? (
                <div className="w-full flex items-center justify-center group-hover:scale-[1.03] transition-transform duration-300">
                  <CalendarSvg className="w-full max-w-[280px] h-auto" />
                </div>
              ) : item.id === "bndg" ? (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-contain object-right-bottom rounded-md shadow-xs group-hover:scale-[1.02] transition-transform duration-300 ease-out"
                />
              ) : item.id === "cena" ? (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full max-w-[200px] h-auto object-contain group-hover:scale-[1.03] transition-transform duration-300 ease-out drop-shadow-sm"
                />
              ) : item.id === "pixel-boom" ? (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-28 h-28 sm:w-32 sm:h-32 object-contain group-hover:scale-[1.05] transition-transform duration-300 ease-out"
                />
              ) : item.id === "nilo" ? (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-32 h-26 sm:w-40 sm:h-32 object-contain group-hover:scale-[1.05] transition-transform duration-300 ease-out"
                />
              ) : (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-36 h-auto sm:w-44 object-contain group-hover:scale-[1.04] transition-transform duration-300 ease-out"
                />
              )}
            </div>

            {/* Monospace Project Label Underneath */}
            <div className="mt-3.5 flex items-center justify-between">
              <span className="text-xs sm:text-[13px] font-mono tracking-wider font-semibold text-neutral-900 uppercase">
                {item.label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
