"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Lock, Sun, Moon, ExternalLink } from "lucide-react";

export default function IrisDewValleyProjectPage() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-start items-center px-5 sm:px-8 md:px-12 pt-12 sm:pt-16 pb-24 selection:bg-neutral-200 dark:selection:bg-neutral-800">
      <div className="ambient-glow" />

      <main className="w-full relative z-10 flex flex-col max-w-[640px] animate-in fade-in duration-200">
        <header className="flex items-center justify-between w-full mb-8">
          <Link
            href="/"
            className="font-mono text-[15px] sm:text-[15.5px] tracking-tight text-[#2C2C2C] dark:text-[#F2F2F2] hover:text-[#4e5df8] transition-colors flex items-center space-x-1.5 focus:outline-none font-medium cursor-pointer"
          >
            <span>&larr;</span>
            <span>home</span>
          </Link>

          <div className="flex items-center space-x-3.5">
            <button
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              className="p-1 text-[#2C2C2C] dark:text-[#F2F2F2] hover:text-[#4e5df8] transition-colors focus:outline-none cursor-pointer flex items-center justify-center"
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4 transition-transform duration-200 hover:rotate-45" strokeWidth={2} />
              ) : (
                <Moon className="w-4 h-4 transition-transform duration-200 hover:-rotate-12" strokeWidth={2} />
              )}
            </button>
          </div>
        </header>

        <article className="space-y-6">
          <div className="pb-2 space-y-4">
            <h1 className="instrument-serif text-[48px] sm:text-[56px] font-normal leading-tight text-[#2C2C2C] dark:text-[#F2F2F2]">
              iris dew valley
            </h1>
            <h3 className="text-[19px] sm:text-[21px] font-normal text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
              How might we make online networking feel more like accidentally meeting someone interesting at a café?
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-4 pb-8">
              <div>
                <span className="font-mono text-[13px] sm:text-[14px] font-semibold text-[#4e5df8] block mb-1">
                  ROLE
                </span>
                <span className="text-[16px] sm:text-[17px] text-[#2C2C2C] dark:text-[#F2F2F2]">
                  Designer & Dev
                </span>
              </div>
              <div>
                <span className="font-mono text-[13px] sm:text-[14px] font-semibold text-[#4e5df8] block mb-1">
                  TIMELINE
                </span>
                <span className="text-[16px] sm:text-[17px] text-[#2C2C2C] dark:text-[#F2F2F2]">
                  2026
                </span>
              </div>
              <div>
                <span className="font-mono text-[13px] sm:text-[14px] font-semibold text-[#4e5df8] block mb-1">
                  SKILLS
                </span>
                <span className="text-[16px] sm:text-[17px] text-[#2C2C2C] dark:text-[#F2F2F2]">
                  UX, Concept
                </span>
              </div>
              <div>
                <span className="font-mono text-[13px] sm:text-[14px] font-semibold text-[#4e5df8] block mb-1">
                  STATUS
                </span>
                <span className="text-[16px] sm:text-[17px] text-[#2C2C2C] dark:text-[#F2F2F2]">
                  Exploration
                </span>
              </div>
            </div>
          </div>

          {/* LIVE PROTOTYPE HEADER */}
          <div className="w-[100vw] sm:w-[1024px] max-w-[100vw] relative left-1/2 -translate-x-1/2 my-10 flex flex-col items-center justify-center px-4 sm:px-0 gap-3">
            <div className="w-full aspect-square sm:aspect-video rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-sm bg-neutral-100 dark:bg-neutral-900">
              <iframe 
                src="https://iris-dew-valley.vercel.app" 
                className="w-full h-full border-none"
                title="Iris Dew Valley Prototype"
              />
            </div>
            <a 
              href="https://iris-dew-valley.vercel.app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-mono text-[13px] text-[#4e5df8] hover:underline underline-offset-4 flex items-center gap-1.5"
            >
              Open in new tab <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="space-y-8 text-[16px] sm:text-[17.5px] text-[#2C2C2C] dark:text-[#F2F2F2] leading-[1.8] font-sans pt-1">
            
            {/* OVERVIEW */}
            <div id="overview" className="space-y-4 pt-6">
              <span className="font-mono text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#4e5df8] block">
                OVERVIEW
              </span>
              <p className="text-[16px] sm:text-[17.5px] text-[#475569] dark:text-[#CBD5E1] leading-relaxed my-4">
                Online networking often feels transactional, forced, and disconnected from the serendipity of real-world interactions. You join a call or send a DM with a clear agenda, leaving little room for those "accidental" conversations that turn out to be the most valuable. 
              </p>
              <p className="text-[16px] sm:text-[17.5px] text-[#475569] dark:text-[#CBD5E1] leading-relaxed my-4">
                This project explores a new paradigm for digital connection—one that mirrors the ambient awareness and low-pressure environment of being at a café, working on your own thing, but open to a serendipitous interaction.
              </p>
            </div>

            {/* WIP BANNER */}
            <div className="w-full mt-12 mb-8 p-5 sm:p-6 border border-dashed border-[#4e5df8]/40 bg-[#4e5df8]/[0.02] rounded-none flex flex-col gap-2.5">
              <Lock className="w-4 h-4 text-[#4e5df8]" strokeWidth={2.5} />
              <p className="text-[14.5px] sm:text-[15.5px] text-[#475569] dark:text-[#CBD5E1] leading-relaxed">
                The rest of this case study is coming soon. I'm currently working on the interactive prototypes and writing up the design decisions. <a href="mailto:pavendanpynthamil@gmail.com" className="text-[#2C2C2C] dark:text-[#F2F2F2] hover:text-[#4e5df8] underline decoration-wavy underline-offset-[5px] decoration-[#4e5df8] decoration-2 transition-colors">Check back later!</a>
              </p>
            </div>
            
          </div>
        </article>

        <div className="pt-16 pb-6 flex items-center justify-between w-full border-t border-neutral-100 dark:border-neutral-800/60 mt-8">
          <Link
            href="/"
            className="font-mono text-[13.5px] sm:text-[14px] text-[#4e5df8] hover:underline underline-offset-4 font-medium flex items-center space-x-1 cursor-pointer"
          >
            <span>&larr; back to home</span>
          </Link>
        </div>

        <footer className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 font-mono text-xs sm:text-[13px] text-[#64748B] dark:text-[#8E95B8]">
          <div>coding is an art and im an artist</div>
          <div>made w love &bull; &copy; 2026</div>
        </footer>
      </main>
    </div>
  );
}
