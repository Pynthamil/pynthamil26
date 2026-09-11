"use client";

import React, { useState, useEffect } from "react";

export interface SectionItem {
  id: string;
  label: string;
}

interface ProjectSidebarProps {
  sections: SectionItem[];
  playTone?: (freq?: number) => void;
}

export function ProjectSidebar({ sections, playTone }: ProjectSidebarProps) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id || "");
  const [isHovered, setIsHovered] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const scrollBottom = scrollY + windowHeight;
      const docHeight = document.documentElement.scrollHeight;

      // If reached bottom of page, highlight the last section
      if (docHeight - scrollBottom < 50) {
        if (sections.length > 0) {
          setActiveId(sections[sections.length - 1].id);
        }
        return;
      }

      // Check sections from top to bottom with comfortable trigger line
      const triggerPoint = scrollY + windowHeight * 0.35;
      let currentActive = sections[0]?.id || "";

      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const elTop = el.offsetTop;
          if (elTop <= triggerPoint) {
            currentActive = section.id;
          }
        }
      }

      setActiveId(currentActive);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const handleItemClick = (id: string) => {
    if (playTone) playTone(920);
    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 80;
      const elPosition = el.getBoundingClientRect().top;
      const offsetPosition = elPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveId(id);
    }
  };

  if (!sections || sections.length === 0) return null;

  return (
    <nav
      aria-label="Table of contents"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed right-4 sm:right-6 md:right-8 top-1/2 -translate-y-1/2 z-40 select-none group"
    >
      {/* 
        Container with padding to ensure smooth hover without cursor jitter
      */}
      <div className="relative flex items-center justify-end py-3 px-2">
        {/* COLLAPSED STATE (Image 1): Vertical stack of horizontal bars */}
        <div
          className={`flex flex-col items-center justify-center gap-[8px] transition-all duration-200 ease-out cursor-pointer ${
            isHovered
              ? "opacity-0 scale-90 pointer-events-none absolute right-2"
              : "opacity-100 scale-100"
          }`}
          title="Table of Contents"
        >
          {sections.map((section) => {
            const isActive = activeId === section.id;
            return (
              <div
                key={section.id}
                onClick={() => handleItemClick(section.id)}
                className={`rounded-full transition-all duration-150 cursor-pointer ${
                  isActive
                    ? "w-[18px] h-[1.5px] bg-[#0d0d0d] dark:bg-white"
                    : "w-[18px] h-[1.5px] bg-neutral-300 dark:bg-neutral-600 hover:bg-neutral-400 dark:hover:bg-neutral-500"
                }`}
              />
            );
          })}
        </div>

        {/* EXPANDED STATE (Image 2): Floating Popover Card Menu */}
        <div
          className={`transition-all duration-200 ease-out origin-top-right ${
            isHovered
              ? "opacity-100 scale-100 pointer-events-auto translate-x-0"
              : "opacity-0 scale-95 pointer-events-none translate-x-2 absolute right-0"
          }`}
        >
          <div className="bg-white/95 dark:bg-[#13151E]/95 backdrop-blur-md border border-neutral-200/90 dark:border-neutral-800 rounded-2xl p-2 shadow-[0_12px_36px_rgba(0,0,0,0.12)] dark:shadow-[0_12px_36px_rgba(0,0,0,0.6)] min-w-[190px] max-w-[240px] flex flex-col gap-1">
            {sections.map((section) => {
              const isActive = activeId === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => handleItemClick(section.id)}
                  className={`text-left px-3.5 py-2 rounded-xl text-[13.5px] font-sans transition-all duration-150 flex items-center justify-between cursor-pointer ${
                    isActive
                      ? "bg-neutral-100 dark:bg-white/10 text-neutral-900 dark:text-white font-medium shadow-[inset_0_1px_1px_rgba(0,0,0,0.02)]"
                      : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-white/5 hover:text-neutral-900 dark:hover:text-white font-normal"
                  }`}
                >
                  <span className="truncate">{section.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
