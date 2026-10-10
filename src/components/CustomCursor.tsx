"use client";

import React, { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

function getMetaImageUrl(url: string): string {
  const lowercaseUrl = url.toLowerCase();

  if (lowercaseUrl.includes("joinplue.com") || lowercaseUrl.includes("plue")) {
    return "/plue.png";
  }
  if (lowercaseUrl.includes("github.com")) {
    return "https://opengraph.githubassets.com/1/Pynthamil";
  }
  if (lowercaseUrl.includes("drive.google.com")) {
    return "/blog-covers/post4.png";
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
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [cursorMode, setCursorMode] = useState<"default" | "case-study" | "arrow" | "text" | "website" | "blog">("default");
  const [hoveredUrl, setHoveredUrl] = useState<string>("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      if (target.closest('[data-cursor="case-study"]')) {
        setCursorMode("case-study");
        return;
      }

      if (target.closest('[data-cursor="blog"]')) {
        setCursorMode("blog");
        return;
      }

      // Check for website link hovers
      const linkEl = (target.closest('a[href]') || target.closest('[data-cursor="website"]')) as HTMLAnchorElement | null;
      if (linkEl) {
        const href = linkEl.getAttribute("href") || linkEl.getAttribute("data-url") || "";
        const isMailto = href.startsWith("mailto:");
        
        if (href.includes("/blog/")) {
          setCursorMode("blog");
          return;
        }

        if (href && !isMailto && (href.startsWith("http") || href.startsWith("//") || linkEl.getAttribute("target") === "_blank" || linkEl.getAttribute("data-cursor") === "website" || linkEl.getAttribute("data-cursor") === "arrow")) {
          setCursorMode("website");
          setHoveredUrl(href);
          return;
        }
      }

      if (target.closest('[data-cursor="arrow"]')) {
        setCursorMode("arrow");
      } else if (target.closest('[data-cursor="text"]')) {
        setCursorMode("text");
      } else {
        // Check if element is interactive button / control
        const interactiveParent = target.closest(
          'button, [role="button"], input[type="button"], input[type="submit"], select, .cursor-pointer'
        );

        if (interactiveParent) {
          setCursorMode("default");
        } else {
          // Check if hovering over text elements
          const isTextElement = target.closest(
            'p, h1, h2, h3, h4, h5, h6, span, li, label, code, pre, blockquote, article, em, strong, b, i, small, td, th, input, textarea'
          );

          if (isTextElement) {
            setCursorMode("text");
          } else {
            setCursorMode("default");
          }
        }
      }
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
      {cursorMode === "case-study" ? (
        <div className="flex items-center gap-2.5 animate-in zoom-in-95 duration-150 whitespace-nowrap">
          <span className="w-3.5 h-3.5 bg-[#FF00AE] shrink-0" />
          <div className="bg-[#FF00AE] text-white font-sans text-[17px] font-medium tracking-tight px-3 py-1 shadow-md">
            View project
          </div>
        </div>
      ) : cursorMode === "blog" ? (
        <div className="flex items-center gap-2.5 animate-in zoom-in-95 duration-150 whitespace-nowrap">
          <span className="w-3.5 h-3.5 bg-[#FF00AE] shrink-0" />
          <div className="bg-[#FF00AE] text-white font-sans text-[17px] font-medium tracking-tight px-3 py-1 shadow-md">
            Read blog
          </div>
        </div>
      ) : cursorMode === "website" ? (
        <div className="flex flex-col gap-2.5 pointer-events-none animate-in fade-in zoom-in-95 duration-150 -translate-x-1/2 -translate-y-4">
          {/* Top Label */}
          <div className="flex items-center self-start">
            <div className="bg-[#FF00AE] text-white font-sans text-[17px] font-medium tracking-tight px-3 py-1 shadow-md">
              View website
            </div>
          </div>

          {/* Website Preview Card showing Open Graph Meta Image */}
          <WebsitePreviewCard url={hoveredUrl} />
        </div>
      ) : cursorMode === "arrow" ? (
        <div className="w-10 h-10 bg-[#FF00AE] text-white rounded-full flex items-center justify-center animate-in zoom-in-95 duration-150 shadow-lg">
          <ArrowUpRight className="w-5 h-5 text-white stroke-[2.5]" />
        </div>
      ) : cursorMode === "text" ? (
        <div className="flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-100">
          {/* Top Cap */}
          <div className="w-[7px] h-[2px] bg-[#FF00AE] rounded-full" />
          {/* Vertical Stem */}
          <div className="w-[2px] h-[17px] bg-[#FF00AE]" />
          {/* Bottom Cap */}
          <div className="w-[7px] h-[2px] bg-[#FF00AE] rounded-full" />
        </div>
      ) : (
        <div className="w-[13px] h-[13px] bg-[#FF00AE] transition-all duration-150" />
      )}
    </div>
  );
}
