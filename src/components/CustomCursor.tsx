"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

function getMetaImageUrl(url: string): string {
  const lowercaseUrl = url.toLowerCase();

  if (lowercaseUrl.includes("github.com")) {
    return "https://opengraph.githubassets.com/1/Pynthamil";
  }
  
  // Use microlink.io embed API to get live og:image meta image for any URL
  return `https://api.microlink.io/?url=${encodeURIComponent(url)}&embed=image.url`;
}

function WebsitePreviewCard({ url }: { url: string }) {
  const metaImageUrl = getMetaImageUrl(url);
  const [imgError, setImgError] = useState(false);

  let displayDomain = "website";
  try {
    displayDomain = new URL(url).hostname.replace(/^www\./, "");
  } catch {
    displayDomain = url;
  }

  return (
    <div className="w-[280px] h-[160px] rounded-[4px] border-[3.5px] border-[#FF00AE] overflow-hidden bg-neutral-900 relative flex items-center justify-center shadow-xl">
      {!imgError ? (
        <img 
          src={metaImageUrl} 
          alt={displayDomain} 
          className="w-full h-full object-cover"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="relative z-10 flex flex-col items-center text-center gap-2 p-4">
          <div className="w-9 h-9 rounded-full bg-white/10 text-white font-bold flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-white font-sans text-[15px] font-semibold tracking-tight">{displayDomain}</span>
            <span className="text-slate-400 font-sans text-[11.5px]">View website</span>
          </div>
        </div>
      )}
    </div>
  );
}

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [cursorMode, setCursorMode] = useState<"default" | "case-study" | "coming-soon" | "arrow" | "text" | "website" | "blog">("default");
  const [hoveredUrl, setHoveredUrl] = useState<string>("");
  const [isVisible, setIsVisible] = useState(false);

  const cursorModeRef = useRef<typeof cursorMode>("default");
  const hoveredUrlRef = useRef<string>("");
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

    const updateMode = (newMode: typeof cursorMode, newUrl = "") => {
      if (cursorModeRef.current !== newMode) {
        cursorModeRef.current = newMode;
        setCursorMode(newMode);
      }
      if (hoveredUrlRef.current !== newUrl) {
        hoveredUrlRef.current = newUrl;
        setHoveredUrl(newUrl);
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

      if (targetEl.closest('[data-cursor="case-study"]')) {
        updateMode("case-study");
        return;
      }

      if (targetEl.closest('[data-cursor="blog"]')) {
        updateMode("blog");
        return;
      }

      // Check for website link hovers
      const linkEl = (targetEl.closest('a[href]') || targetEl.closest('[data-cursor="website"]')) as HTMLAnchorElement | null;
      if (linkEl) {
        const href = linkEl.getAttribute("href") || linkEl.getAttribute("data-url") || "";
        const isMailto = href.startsWith("mailto:");

        // Exclude footer, come-say-hi social links, explicit default cursor, github activity, and resume/drive links from the website preview hover effect
        if (
          linkEl.closest('footer') ||
          linkEl.closest('#come-say-hi') ||
          linkEl.closest('[data-slot="github-activity"]') ||
          linkEl.getAttribute('data-cursor') === 'default' ||
          href.toLowerCase().includes("drive.google.com")
        ) {
          updateMode("default");
          return;
        }
        
        if (href.includes("/blog/")) {
          updateMode("blog");
          return;
        }

        if (href && !isMailto && (href.startsWith("http") || href.startsWith("//") || linkEl.getAttribute("target") === "_blank" || linkEl.getAttribute("data-cursor") === "website" || linkEl.getAttribute("data-cursor") === "arrow")) {
          updateMode("website", href);
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
      {cursorMode === "coming-soon" ? (
        <div className="overflow-hidden bg-[#FF00AE] text-white font-sans text-[22px] sm:text-[24px] font-medium tracking-tight px-4 py-1.5 shadow-md animate-in fade-in zoom-in-95 duration-150 whitespace-nowrap">
          <span className="inline-block animate-pill-text">
            Coming soon
          </span>
        </div>
      ) : cursorMode === "case-study" ? (
        <div className="overflow-hidden bg-[#FF00AE] text-white font-sans text-[22px] sm:text-[24px] font-medium tracking-tight px-4 py-1.5 shadow-md animate-in fade-in zoom-in-95 duration-150 whitespace-nowrap">
          <span className="inline-block animate-pill-text">
            View project
          </span>
        </div>
      ) : cursorMode === "blog" ? (
        <div className="overflow-hidden bg-[#FF00AE] text-white font-sans text-[22px] sm:text-[24px] font-medium tracking-tight px-4 py-1.5 shadow-md animate-in fade-in zoom-in-95 duration-150 whitespace-nowrap">
          <span className="inline-block animate-pill-text">
            Read blog
          </span>
        </div>
      ) : cursorMode === "website" ? (
        <div className="flex flex-col gap-2.5 pointer-events-none animate-in fade-in zoom-in-95 duration-150 -translate-x-1/2 -translate-y-4">
          {/* Top Label */}
          <div className="flex items-center self-start">
            <div className="overflow-hidden bg-[#FF00AE] text-white font-sans text-[22px] sm:text-[24px] font-medium tracking-tight px-4 py-1.5 shadow-md">
              <span className="inline-block animate-pill-text">
                View website
              </span>
            </div>
          </div>

          {/* Website Preview Card showing Open Graph Meta Image */}
          <WebsitePreviewCard url={hoveredUrl} />
        </div>
      ) : cursorMode === "arrow" ? (
        <div className="w-10 h-10 bg-[#FF00AE] text-white rounded-none flex items-center justify-center animate-in zoom-in-95 duration-150 shadow-lg">
          <ArrowUpRight className="w-5 h-5 text-white stroke-[2.5]" />
        </div>
      ) : cursorMode === "text" ? (
        <div className="flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-100">
          {/* Top Cap */}
          <div className="w-[7px] h-[2px] bg-[#FF00AE] rounded-none" />
          {/* Vertical Stem */}
          <div className="w-[2px] h-[17px] bg-[#FF00AE]" />
          {/* Bottom Cap */}
          <div className="w-[7px] h-[2px] bg-[#FF00AE] rounded-none" />
        </div>
      ) : (
        <div className="w-[22px] h-[22px] bg-[#FF00AE] rounded-none transition-all duration-150 shadow-sm" />
      )}
    </div>
  );
}
