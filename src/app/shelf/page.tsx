"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Inbox,
  HelpCircle,
  Clock,
  Compass,
  Moon,
  Sun,
} from "lucide-react";
import { ProjectSidebar } from "@/components/ProjectSidebar";

export default function ShelfProjectPage() {
  const [soundOn, setSoundOn] = useState<boolean>(true);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Sync theme with localStorage or system preference
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
    playTone(1046);
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

  // Web Audio synthesizer for tactile clicks
  const playTone = (freq: number = 880) => {
    if (!soundOn) return;
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq / 2, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch (e) {}
  };

  const painPoints = [
    {
      icon: <Inbox className="w-5 h-5 text-[#FFA134]" strokeWidth={1.5} />,
      title: "ACCUMULATING BACKLOG",
      desc: "Endless unsorted links and screenshots",
    },
    {
      icon: <HelpCircle className="w-5 h-5 text-[#FFA134]" strokeWidth={1.5} />,
      title: "FORGOTTEN CONTEXT",
      desc: "Losing why something was saved",
    },
    {
      icon: <Clock className="w-5 h-5 text-[#FFA134]" strokeWidth={1.5} />,
      title: "TIME UNCERTAINTY",
      desc: "Unclear time investment required",
    },
    {
      icon: <Compass className="w-5 h-5 text-[#FFA134]" strokeWidth={1.5} />,
      title: "MOOD MISALIGNMENT",
      desc: "Mismatch between content and energy",
    },
  ];

  const sidebarSections = [
    { id: "context", label: "Context" },
    { id: "problem", label: "The Problem" },
    { id: "pain-points", label: "Pain Points" },
    { id: "process", label: "Process" },
    { id: "takeaways", label: "Takeaways" },
  ];

  return (
    <div className="min-h-screen w-full flex flex-col justify-start items-center px-5 sm:px-8 md:px-12 pt-12 sm:pt-16 pb-24 selection:bg-orange-100 dark:selection:bg-orange-950">
      {/* Table of Contents Floating Sidebar */}
      <ProjectSidebar sections={sidebarSections} playTone={playTone} />

      {/* Soft atmospheric ambient glow with warm orange tint */}
      <div className="ambient-glow" />

      {/* Main Container */}
      <main className="w-full relative z-10 flex flex-col max-w-[540px] animate-in fade-in duration-200">
        {/* Top Navigation */}
        <header className="flex items-center justify-between w-full mb-8">
          <Link
            href="/"
            onClick={() => playTone(880)}
            className="font-mono text-[15px] sm:text-[15.5px] tracking-tight text-[#232564] dark:text-[#F5F5FF] hover:text-[#FF6B00] dark:hover:text-[#FFA048] transition-colors flex items-center space-x-1.5 focus:outline-none font-medium cursor-pointer"
          >
            <span>&larr;</span>
            <span>home</span>
          </Link>

          <div className="flex items-center space-x-3.5">
            <span className="font-mono text-xs sm:text-[13px] text-[#FF6B00] dark:text-[#FFA048] font-medium">
              case study
            </span>
            <button
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              className="p-1 text-[#232564] dark:text-[#F5F5FF] hover:text-[#FF6B00] dark:hover:text-[#FFA048] transition-colors focus:outline-none cursor-pointer flex items-center justify-center"
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4 transition-transform duration-200 hover:rotate-45" strokeWidth={2} />
              ) : (
                <Moon className="w-4 h-4 transition-transform duration-200 hover:-rotate-12" strokeWidth={2} />
              )}
            </button>
          </div>
        </header>

        {/* Article / Case Study Header */}
        <article className="space-y-6">
          <div className="pb-2 space-y-3">
            <h1 className="text-3xl sm:text-[34px] font-bold text-[#232564] dark:text-[#F5F5FF] tracking-tight">
              Shelf
            </h1>
            <p className="text-[16px] sm:text-[17px] text-[#475569] dark:text-[#CBD5E1] leading-relaxed">
              Reimagining personal discovery and consumption for saved content.
            </p>

            {/* 4-Column Metadata Grid (Matching Reference) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-4">
              <div>
                <span className="font-mono text-xs sm:text-[12.5px] font-semibold text-[#FFA134] block mb-1">
                  ROLE
                </span>
                <span className="text-[14px] sm:text-[15px] text-[#232564] dark:text-[#F5F5FF]">
                  UI/UX Designer
                </span>
              </div>
              <div>
                <span className="font-mono text-xs sm:text-[12.5px] font-semibold text-[#FFA134] block mb-1">
                  TIMELINE
                </span>
                <span className="text-[14px] sm:text-[15px] text-[#232564] dark:text-[#F5F5FF]">
                  2026 (Ongoing)
                </span>
              </div>
              <div>
                <span className="font-mono text-xs sm:text-[12.5px] font-semibold text-[#FFA134] block mb-1">
                  SKILLS
                </span>
                <span className="text-[14px] sm:text-[15px] text-[#232564] dark:text-[#F5F5FF]">
                  UI/UX, Product
                </span>
              </div>
              <div>
                <span className="font-mono text-xs sm:text-[12.5px] font-semibold text-[#FFA134] block mb-1">
                  TOOLS
                </span>
                <span className="text-[14px] sm:text-[15px] text-[#232564] dark:text-[#F5F5FF]">
                  Figma, Next.js
                </span>
              </div>
            </div>
          </div>

          {/* Case Study Content */}
          <div className="space-y-8 text-[16px] sm:text-[16.5px] text-[#232564] dark:text-[#F5F5FF] leading-[1.8] font-sans pt-1">
            {/* Overview */}
            <div id="context" className="space-y-4 scroll-mt-20">
              {/* Empty Box with Exact #FFA134 Color */}
              <div className="w-full h-48 sm:h-64 my-2.5 rounded-sm bg-[#FFA134] border border-[#FFA134] shadow-[0_2px_8px_rgba(255,161,52,0.12)]" />

              <div className="space-y-1.5 pt-2">
                <span className="font-mono text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#FFA134] block">
                  CONTEXT
                </span>
                <p className="text-[18px] sm:text-[19.5px] font-medium text-[#232564] dark:text-[#F5F5FF] leading-snug">
                  People are excellent at saving things and terrible at deciding what to consume next.
                </p>
              </div>
              <p>
                Shelf is a personal discovery and consumption app for people who constantly save things they want to read, watch, or listen to.
              </p>
              <p>
                Between Instagram saves, browser bookmarks, YouTube watch-later, Goodreads, Spotify, and screenshots, interesting content is everywhere, but actually getting around to it is another story. I wanted to explore what would happen if a product didn&apos;t just help people save more, but helped them make sense of what they&apos;ve already saved and actually consume it.
              </p>
            </div>

            {/* The Problem Section (Matching Reference) */}
            <div id="problem" className="pt-8 space-y-5 scroll-mt-20">
              <div className="space-y-1.5">
                <span className="font-mono text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#FFA134] block">
                  THE PROBLEM
                </span>
                <p className="text-[17px] sm:text-[18px] text-[#232564] dark:text-[#F5F5FF] leading-relaxed font-normal">
                  People save content with the intention of consuming it later, but their growing backlog makes it increasingly difficult to decide what to consume next.
                </p>
                <p className="text-[15px] sm:text-[15.5px] text-[#475569] dark:text-[#CBD5E1] leading-relaxed pt-1">
                  As saved content accumulates, users have to remember why they saved something, how much time it requires, whether they&apos;re still interested, and what they actually feel like consuming right now.
                </p>
              </div>

              {/* Pain Points Boxed Row */}
              <div id="pain-points" className="pt-2 space-y-3 scroll-mt-20">
                <span className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.08em] text-[#64748B] dark:text-[#8E95B8] font-semibold block">
                  PAIN POINTS
                </span>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
                  {painPoints.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-white/70 dark:bg-[#13151E]/90 border border-neutral-200 dark:border-[#9999FF]/20 rounded-sm p-3.5 sm:p-4 flex flex-col items-center justify-center text-center space-y-2.5 transition-all hover:border-[#FFA134] dark:hover:border-[#FFA134] shadow-[0_1px_2px_rgba(0,0,0,0.02)] cursor-default"
                    >
                      <div className="p-1 rounded-sm bg-neutral-50 dark:bg-[#FFA134]/10 flex items-center justify-center">
                        {item.icon}
                      </div>
                      <span className="font-mono text-[10.5px] sm:text-[11px] font-semibold tracking-tight text-[#232564] dark:text-[#F5F5FF] leading-snug">
                        {item.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* How Might We Callout Box (Matching Reference) */}
              <div className="p-4 sm:p-4.5 rounded-sm border border-[#FFA134] bg-[#FFA134]/[0.05] dark:bg-[#FFA134]/[0.08] flex items-start gap-3">
                <HelpCircle className="w-4 h-4 text-[#FFA134] shrink-0 mt-0.5" strokeWidth={2} />
                <p className="text-[13.5px] sm:text-[14px] text-[#232564] dark:text-[#F5F5FF] leading-relaxed font-sans">
                  How might we transform saved content from an overwhelming, forgotten backlog into a frictionless system where people actually consume what they save?
                </p>
              </div>
            </div>

            {/* Process Section */}
            <div id="process" className="pt-8 space-y-4 scroll-mt-20">
              <div className="space-y-1.5">
                <span className="font-mono text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#FFA134] block">
                  PROCESS
                </span>
                <h2 className="text-[20px] sm:text-[22px] font-semibold text-[#232564] dark:text-[#F5F5FF] tracking-tight">
                  From backlog overwhelm to intentional consumption
                </h2>
                <p className="text-[15px] sm:text-[15.5px] text-[#475569] dark:text-[#CBD5E1] leading-relaxed pt-0.5">
                  Mapping the friction points between saving content and actually consuming it, then designing lightweight interaction loops around user mood and time budget.
                </p>
              </div>

              {/* Gray Empty Box (Placeholder for Process Image) */}
              <div className="w-full h-56 sm:h-72 my-3 rounded-sm border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50/70 dark:bg-[#13151E]/50 shadow-[0_1px_2px_rgba(0,0,0,0.01)]" />
            </div>

            {/* Takeaways Section (Matching Reference) */}
            <div id="takeaways" className="pt-8 space-y-5 scroll-mt-20">
              <div className="space-y-1">
                <span className="font-mono text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#FFA134] block">
                  TAKEAWAYS
                </span>
                <h2 className="text-[20px] sm:text-[22px] font-semibold text-[#232564] dark:text-[#F5F5FF] tracking-tight">
                  What I learned after Shelf
                </h2>
              </div>

              {/* 2-Column Takeaways Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 pt-1">
                {/* Card 1 */}
                <div className="p-5 sm:p-5.5 rounded-sm border border-[#FFA134] bg-[#FFA134]/[0.04] dark:bg-[#FFA134]/[0.07] flex flex-col items-center text-center space-y-2.5 transition-colors hover:bg-[#FFA134]/[0.08] dark:hover:bg-[#FFA134]/[0.12]">
                  <div className="p-1.5 rounded-sm bg-[#FFA134]/15 dark:bg-[#FFA134]/20 flex items-center justify-center">
                    <Compass className="w-5 h-5 text-[#FFA134]" strokeWidth={1.5} />
                  </div>
                  <span className="font-mono text-xs sm:text-[12.5px] font-semibold tracking-wider text-[#FFA134] block uppercase">
                    CURATION OVER ACCUMULATION
                  </span>
                  <p className="text-[13.5px] sm:text-[14px] text-[#232564] dark:text-[#CBD5E1] leading-relaxed font-sans">
                    People don&apos;t need another link dump - they need help making sense of what they&apos;ve already saved.
                  </p>
                </div>

                {/* Card 2 */}
                <div className="p-5 sm:p-5.5 rounded-sm border border-[#FFA134] bg-[#FFA134]/[0.04] dark:bg-[#FFA134]/[0.07] flex flex-col items-center text-center space-y-2.5 transition-colors hover:bg-[#FFA134]/[0.08] dark:hover:bg-[#FFA134]/[0.12]">
                  <div className="p-1.5 rounded-sm bg-[#FFA134]/15 dark:bg-[#FFA134]/20 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-[#FFA134]" strokeWidth={1.5} />
                  </div>
                  <span className="font-mono text-xs sm:text-[12.5px] font-semibold tracking-wider text-[#FFA134] block uppercase">
                    DESIGN FOR MOOD &amp; TIME
                  </span>
                  <p className="text-[13.5px] sm:text-[14px] text-[#232564] dark:text-[#CBD5E1] leading-relaxed font-sans">
                    Matching content to current energy and available time turns an overwhelming backlog into effortless consumption.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Return link */}
        <div className="pt-10 pb-6">
          <Link
            href="/"
            onClick={() => playTone(880)}
            className="font-mono text-[13.5px] sm:text-[14px] text-[#FFA134] hover:underline underline-offset-4 font-medium flex items-center space-x-1 cursor-pointer"
          >
            <span>&larr; back to home</span>
          </Link>
        </div>

        {/* Standard Footer */}
        <footer className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 font-mono text-xs sm:text-[13px] text-[#64748B] dark:text-[#8E95B8]">
          <div>coding is an art and im an artist</div>
          <div>made w love &bull; &copy; 2026</div>
        </footer>
      </main>
    </div>
  );
}
