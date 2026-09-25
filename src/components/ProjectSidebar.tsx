"use client";

import React, { useState, useEffect } from "react";
import { HookSidebar } from "./ui/hook-sidebar";

export interface SectionItem {
  id: string;
  label: string;
}

interface ProjectSidebarProps {
  sections: SectionItem[];
  playTone?: (freq?: number) => void;
  alwaysVisible?: boolean;
}

export function ProjectSidebar({ sections, playTone, alwaysVisible = false }: ProjectSidebarProps) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id || "");
  const [isVisible, setIsVisible] = useState(alwaysVisible);

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

      // Check visibility (hide at top of page)
      if (alwaysVisible || scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
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

  const activeIndex = sections.findIndex((s) => s.id === activeId);
  const items = sections.map((s) => ({ label: s.label }));

  return (
    <div className={`w-full transition-opacity duration-300 ${isVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
      <HookSidebar
        items={items}
        value={activeIndex !== -1 ? activeIndex : 0}
        onChange={(index) => handleItemClick(sections[index].id)}
        color="#FC4C01" // Feel free to adjust accent color if needed
        dashed={true}
      />
    </div>
  );
}
