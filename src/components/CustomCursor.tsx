"use client";

import React, { useEffect, useState } from "react";
import { Eye } from "lucide-react";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      const caseStudyTarget = target?.closest('[data-cursor="case-study"]');
      setIsHovered(!!caseStudyTarget);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-[9999] transition-transform duration-75 ease-out hidden sm:block"
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`,
      }}
    >
      {isHovered ? (
        <div className="px-5 py-2.5 bg-[#FF3366] text-white rounded-full flex items-center gap-2.5 animate-in zoom-in-95 duration-150 whitespace-nowrap font-sans text-[13px] font-bold tracking-wider uppercase">
          <Eye className="w-4 h-4 text-white stroke-[2.5]" />
          <span>VIEW CASE STUDY</span>
        </div>
      ) : (
        <div className="w-[22px] h-[22px] rounded-full bg-[#FF3366] transition-all duration-150" />
      )}
    </div>
  );
}
