"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

function EyeOpenSvgRepoIcon({ className = "w-6 h-6 text-white" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 12C4 12 5.6 7 12 7M12 7C18.4 7 20 12 20 12M12 7V4M18 5L16 7.5M6 5L8 7.5M15 13C15 14.6569 13.6569 16 12 16C10.3431 16 9 14.6569 9 13C9 11.3431 10.3431 10 12 10C13.6569 10 15 11.3431 15 13Z"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const PHOTO_QUIRKY_PHRASES = [
  "yes, i actually exist :)",
  "proof of life :)",
  "rare photo of me outside :)",
  "100% human, mostly curiosity :)",
  "the culprit behind the code :)",
];

const GREY_PILL_GRADIENT = "linear-gradient(180deg, #18181B 0%, #18181B 35%, #222226 52%, #2D2E33 68%, #3B3C44 80%, #494B54 90%, #565863 96%, #646775 100%)";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [cursorMode, setCursorMode] = useState<"default" | "case-study" | "coming-soon" | "arrow" | "text" | "blog" | "about-photo">("default");
  const [isVisible, setIsVisible] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);

  const cursorModeRef = useRef<typeof cursorMode>("default");
  const isVisibleRef = useRef<boolean>(false);

  // Smooth position tracking with requestAnimationFrame
  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });
  const rafId = useRef<number | null>(null);
  const lastTime = useRef<number | null>(null);
  const isMoving = useRef(false);

  useEffect(() => {
    // Only run custom cursor on fine pointer devices (desktop)
    if (typeof window === "undefined" || !window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    const animate = (time: number) => {
      if (lastTime.current === null) {
        lastTime.current = time;
      }
      const dt = Math.min((time - lastTime.current) / 1000, 0.1);
      lastTime.current = time;

      // Delta-time based exponential smoothing for consistent buttery fluid motion across 60Hz and 120Hz displays
      const speed = 18;
      const factor = 1 - Math.exp(-speed * dt);

      const dx = target.current.x - pos.current.x;
      const dy = target.current.y - pos.current.y;

      if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) {
        pos.current.x = target.current.x;
        pos.current.y = target.current.y;
        isMoving.current = false;
      } else {
        pos.current.x += dx * factor;
        pos.current.y += dy * factor;
      }

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
      }

      if (isMoving.current) {
        rafId.current = requestAnimationFrame(animate);
      } else {
        rafId.current = null;
      }
    };

    const startAnimation = () => {
      isMoving.current = true;
      if (!rafId.current) {
        lastTime.current = performance.now();
        rafId.current = requestAnimationFrame(animate);
      }
    };

    const updateMode = (newMode: typeof cursorMode) => {
      if (cursorModeRef.current !== newMode) {
        cursorModeRef.current = newMode;
        setCursorMode(newMode);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };

      if (!isVisibleRef.current) {
        pos.current = { x: e.clientX, y: e.clientY };
        if (cursorRef.current) {
          cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
        }
        isVisibleRef.current = true;
        setIsVisible(true);
      }

      startAnimation();

      const targetEl = e.target as HTMLElement | null;
      if (!targetEl) return;

      if (targetEl.closest('[data-cursor="coming-soon"]')) {
        updateMode("coming-soon");
        return;
      }

      if (targetEl.closest('[data-cursor="about-photo"]')) {
        if (cursorModeRef.current !== "about-photo") {
          setPhraseIndex((prev) => (prev + 1) % PHOTO_QUIRKY_PHRASES.length);
        }
        updateMode("about-photo");
        return;
      }

      if (targetEl.closest('[data-cursor="case-study"]')) {
        updateMode("case-study");
        return;
      }

      if (targetEl.closest('[data-cursor="blog"]')) {
        updateMode("blog");
        return;
      }

      const linkEl = targetEl.closest('a[href]') as HTMLAnchorElement | null;
      if (linkEl) {
        const href = linkEl.getAttribute("href") || "";
        if (href.includes("/blog/")) {
          updateMode("blog");
          return;
        }
      }

      if (targetEl.closest('[data-cursor="arrow"]')) {
        updateMode("arrow");
      } else if (targetEl.closest('[data-cursor="text"]')) {
        updateMode("text");
      } else {
        // Check if element is interactive button / control
        const interactiveParent = targetEl.closest(
          'a, button, [role="button"], input[type="button"], input[type="submit"], select, .cursor-pointer'
        );

        if (interactiveParent) {
          updateMode("default");
        } else {
          // Check if hovering over text elements
          const isTextElement = targetEl.closest(
            'p, h1, h2, h3, h4, h5, h6, span, li, label, code, pre, blockquote, article, em, strong, b, i, small, td, th, input, textarea'
          );

          if (isTextElement) {
            updateMode("text");
          } else {
            updateMode("default");
          }
        }
      }
    };

    const handleMouseLeave = () => {
      isVisibleRef.current = false;
      setIsVisible(false);
    };

    const handleMouseEnter = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      pos.current = { x: e.clientX, y: e.clientY };
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
      isVisibleRef.current = true;
      setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 pointer-events-none z-[9999] hidden sm:block will-change-transform transition-opacity duration-200 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      style={{
        transform: "translate3d(-100px, -100px, 0) translate(-50%, -50%)",
      }}
    >
      {cursorMode === "case-study" ? (
        <div
          style={{ background: GREY_PILL_GRADIENT }}
          className="text-white px-5 py-2.5 rounded-full shadow-2xl flex items-center gap-2.5 animate-in fade-in zoom-in-95 duration-150 whitespace-nowrap border border-white/15 dark:border-white/20 select-none"
        >
          <EyeOpenSvgRepoIcon className="w-[26px] h-[26px] text-white shrink-0" />
          <span className="font-sans text-[15.5px] font-medium tracking-normal text-white">
            View case study
          </span>
        </div>
      ) : cursorMode === "about-photo" ? (
        <div
          style={{ background: GREY_PILL_GRADIENT }}
          className="text-white px-5 py-2.5 rounded-full shadow-2xl flex items-center justify-center animate-in fade-in zoom-in-95 duration-150 whitespace-nowrap border border-white/15 dark:border-white/20 select-none"
        >
          <span className="font-sans text-[15px] font-medium tracking-normal text-white">
            {PHOTO_QUIRKY_PHRASES[phraseIndex]}
          </span>
        </div>
      ) : cursorMode === "coming-soon" ? (
        <div
          style={{ background: GREY_PILL_GRADIENT }}
          className="text-white px-5 py-2.5 rounded-full shadow-2xl flex items-center gap-2.5 animate-in fade-in zoom-in-95 duration-150 whitespace-nowrap border border-white/15 dark:border-white/20 select-none"
        >
          <span className="font-sans text-[15.5px] font-medium tracking-normal text-white">
            Coming soon
          </span>
        </div>
      ) : cursorMode === "blog" ? (
        <div
          style={{ background: GREY_PILL_GRADIENT }}
          className="text-white px-5 py-2.5 rounded-full shadow-2xl flex items-center gap-2.5 animate-in fade-in zoom-in-95 duration-150 whitespace-nowrap border border-white/15 dark:border-white/20 select-none"
        >
          <EyeOpenSvgRepoIcon className="w-[26px] h-[26px] text-white shrink-0" />
          <span className="font-sans text-[15.5px] font-medium tracking-normal text-white">
            Read blog
          </span>
        </div>
      ) : cursorMode === "arrow" ? (
        <div
          style={{ background: GREY_PILL_GRADIENT }}
          className="w-10 h-10 text-white rounded-full flex items-center justify-center animate-in zoom-in-95 duration-150 shadow-xl select-none border border-white/15"
        >
          <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
        </div>
      ) : cursorMode === "text" ? (
        <div className="w-[14px] h-[14px] bg-[#18181B]/80 dark:bg-[#FAF8F5]/80 rounded-full transition-all duration-150" />
      ) : (
        <div
          style={{ background: GREY_PILL_GRADIENT }}
          className="w-[24px] h-[24px] sm:w-[26px] sm:h-[26px] border border-white/20 dark:border-white/25 rounded-full transition-all duration-150 shadow-md"
        />
      )}
    </div>
  );
}
