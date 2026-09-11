"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  BookOpen,
  Database,
  Compass,
  Sparkles,
  Layers,
  HelpCircle,
  Moon,
  Sun,
} from "lucide-react";
import { ProjectSidebar } from "@/components/ProjectSidebar";

export default function OrcaProjectPage() {
  const [soundOn, setSoundOn] = useState<boolean>(true);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

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
      icon: <BookOpen className="w-5 h-5 text-[#0284C7] dark:text-[#38BDF8]" strokeWidth={1.5} />,
      title: "PAPER OVERLOAD",
      desc: "Thousands of dense oceanographic studies published annually",
    },
    {
      icon: <Search className="w-5 h-5 text-[#0284C7] dark:text-[#38BDF8]" strokeWidth={1.5} />,
      title: "SCATTERED CITATIONS",
      desc: "Cross-referencing biological datasets across paywalls",
    },
    {
      icon: <Database className="w-5 h-5 text-[#0284C7] dark:text-[#38BDF8]" strokeWidth={1.5} />,
      title: "RAW DATA SILOS",
      desc: "Complex telemetry and acoustics locked in tabular formats",
    },
    {
      icon: <Compass className="w-5 h-5 text-[#0284C7] dark:text-[#38BDF8]" strokeWidth={1.5} />,
      title: "DOMAIN BARRIERS",
      desc: "High cognitive barrier for interdisciplinary researchers",
    },
  ];

  const sidebarSections = [
    { id: "context", label: "Context" },
    { id: "problem", label: "The Problem" },
    { id: "pain-points", label: "Pain Points" },
    { id: "research", label: "Research & Discovery" },
    { id: "solution", label: "The Solution" },
    { id: "takeaways", label: "Takeaways" },
  ];

  return (
    <div className="min-h-screen w-full flex flex-col justify-start items-center px-5 sm:px-8 md:px-12 pt-12 sm:pt-16 pb-24 selection:bg-sky-100 dark:selection:bg-sky-950">
      {/* Table of Contents Floating Sidebar */}
      <ProjectSidebar sections={sidebarSections} playTone={playTone} />

      {/* Soft atmospheric ambient glow */}
      <div className="ambient-glow" />

      {/* Main Container */}
      <main className="w-full relative z-10 flex flex-col max-w-[540px] animate-in fade-in duration-200">
        {/* Top Navigation */}
        <header className="flex items-center justify-between w-full mb-8">
          <Link
            href="/"
            onClick={() => playTone(880)}
            className="font-mono text-[15px] sm:text-[15.5px] tracking-tight text-[#232564] dark:text-[#F5F5FF] hover:text-[#0284C7] dark:hover:text-[#38BDF8] transition-colors flex items-center space-x-1.5 focus:outline-none font-medium cursor-pointer"
          >
            <span>&larr;</span>
            <span>home</span>
          </Link>

          <div className="flex items-center space-x-3.5">
            <div
              onClick={() => {
                navigator.clipboard.writeText("https://orca-ai-iota.vercel.app/");
                setCopiedLink(true);
                playTone(1046);
                setTimeout(() => setCopiedLink(false), 2000);
              }}
              className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-sm border border-[#0284C7] dark:border-[#38BDF8] bg-[#0284C7]/[0.05] dark:bg-[#38BDF8]/[0.08] hover:bg-[#0284C7]/[0.1] dark:hover:bg-[#38BDF8]/[0.15] cursor-pointer group select-none transition-colors"
              title="Click to copy link"
            >
              <span className="font-mono text-xs sm:text-[13px] text-[#0284C7] dark:text-[#38BDF8] font-medium tracking-tight">
                orca.ai
              </span>
              <div className="text-[#0284C7] dark:text-[#38BDF8] flex items-center focus:outline-none transition-colors">
                {copiedLink ? (
                  <span className="text-emerald-500 dark:text-emerald-400 font-mono text-[10.5px] font-medium animate-in fade-in">
                    copied!
                  </span>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12.5"
                    height="12.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="opacity-75 group-hover:opacity-100 transition-opacity"
                  >
                    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                  </svg>
                )}
              </div>
            </div>
            <button
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              className="p-1 text-[#232564] dark:text-[#F5F5FF] hover:text-[#0284C7] dark:hover:text-[#38BDF8] transition-colors focus:outline-none cursor-pointer flex items-center justify-center"
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
              ORCA.AI
            </h1>
            <p className="text-[16px] sm:text-[17px] text-[#475569] dark:text-[#CBD5E1] leading-relaxed">
              AI research assistant for marine science that turns complex research into clear, cited answers in seconds.
            </p>

            {/* 4-Column Metadata Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-4">
              <div>
                <span className="font-mono text-xs sm:text-[12.5px] font-semibold text-[#0284C7] dark:text-[#38BDF8] block mb-1">
                  ROLE
                </span>
                <span className="text-[14px] sm:text-[15px] text-[#232564] dark:text-[#F5F5FF]">
                  Product Designer & Developer
                </span>
              </div>
              <div>
                <span className="font-mono text-xs sm:text-[12.5px] font-semibold text-[#0284C7] dark:text-[#38BDF8] block mb-1">
                  TIMELINE
                </span>
                <span className="text-[14px] sm:text-[15px] text-[#232564] dark:text-[#F5F5FF]">
                  Aug 2026 – Present
                </span>
              </div>
              <div>
                <span className="font-mono text-xs sm:text-[12.5px] font-semibold text-[#0284C7] dark:text-[#38BDF8] block mb-1">
                  SKILLS
                </span>
                <span className="text-[14px] sm:text-[15px] text-[#232564] dark:text-[#F5F5FF]">
                  AI/ML, Data Viz
                </span>
              </div>
              <div>
                <span className="font-mono text-xs sm:text-[12.5px] font-semibold text-[#0284C7] dark:text-[#38BDF8] block mb-1">
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
            {/* Overview / Context */}
            <div id="context" className="space-y-4 scroll-mt-20">
              {/* Box with ORCA Logo */}
              <div className="w-full h-48 sm:h-64 my-2.5 rounded-sm bg-[#0284C7] border border-[#0284C7] shadow-[0_2px_8px_rgba(2,132,199,0.12)] flex items-center justify-center">
                <img
                  src="/orca_logo.svg"
                  alt="ORCA.AI Logo"
                  className="w-40 h-40 sm:w-52 sm:h-52 object-contain select-none"
                />
              </div>

              <div className="space-y-1.5 pt-2">
                <span className="font-mono text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#0284C7] dark:text-[#38BDF8] block">
                  CONTEXT
                </span>
                <p className="text-[18px] sm:text-[19.5px] font-medium text-[#232564] dark:text-[#F5F5FF] leading-snug">
                  Marine biologists spend hundreds of hours parsing dense scientific papers instead of doing field research.
                </p>
              </div>
              <p>
                ORCA.AI is an intelligent research copilot specifically tailored for marine scientists, ecologists, and oceanographers. It synthesizes decades of peer-reviewed oceanographic studies, acoustics data, and migration telemetry into rapid, verified citations.
              </p>
              <p>
                Instead of searching through fragmented journal paywalls, researchers can query complex ecological hypotheses in plain language and receive cited answers with linked datasets in seconds.
              </p>
            </div>

            {/* The Problem Section */}
            <div id="problem" className="pt-8 space-y-5 scroll-mt-20">
              <div className="space-y-1.5">
                <span className="font-mono text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#0284C7] dark:text-[#38BDF8] block">
                  THE PROBLEM
                </span>
                <p className="text-[17px] sm:text-[18px] text-[#232564] dark:text-[#F5F5FF] leading-relaxed font-normal">
                  Scientific literature in marine biology is massive, highly specialized, and scattered across disparate databases.
                </p>
                <p className="text-[15px] sm:text-[15.5px] text-[#475569] dark:text-[#CBD5E1] leading-relaxed pt-1">
                  Researchers lose momentum attempting to correlate telemetry records with historical habitat shifts, acoustic surveys, and climate metrics buried in appendices and PDFs.
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
                      className="bg-white/70 dark:bg-[#13151E]/90 border border-neutral-200 dark:border-[#38BDF8]/20 rounded-sm p-3.5 sm:p-4 flex flex-col items-center justify-center text-center space-y-2.5 transition-all hover:border-[#0284C7] dark:hover:border-[#38BDF8] shadow-[0_1px_2px_rgba(0,0,0,0.02)] cursor-default"
                    >
                      <div className="p-1 rounded-sm bg-neutral-50 dark:bg-[#0284C7]/10 flex items-center justify-center">
                        {item.icon}
                      </div>
                      <span className="font-mono text-[10.5px] sm:text-[11px] font-semibold tracking-tight text-[#232564] dark:text-[#F5F5FF] leading-snug">
                        {item.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* How Might We Callout Box */}
              <div className="p-4 sm:p-4.5 rounded-sm border border-[#0284C7] dark:border-[#38BDF8] bg-[#0284C7]/[0.05] dark:bg-[#38BDF8]/[0.08] flex items-start gap-3">
                <HelpCircle className="w-4 h-4 text-[#0284C7] dark:text-[#38BDF8] shrink-0 mt-0.5" strokeWidth={2} />
                <p className="text-[13.5px] sm:text-[14px] text-[#232564] dark:text-[#F5F5FF] leading-relaxed font-sans">
                  How might we empower marine scientists to query decades of oceanographic research with instant grounded citations and cross-dataset synthesis?
                </p>
              </div>
            </div>

            {/* Research & Discovery Section */}
            <div id="research" className="pt-8 space-y-4 scroll-mt-20">
              <div className="space-y-1.5">
                <span className="font-mono text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#0284C7] dark:text-[#38BDF8] block">
                  RESEARCH &amp; DISCOVERY
                </span>
                <h2 className="text-[20px] sm:text-[22px] font-semibold text-[#232564] dark:text-[#F5F5FF] tracking-tight">
                  Analyzing oceanic research workflows
                </h2>
                <p className="text-[15px] sm:text-[15.5px] text-[#475569] dark:text-[#CBD5E1] leading-relaxed pt-0.5">
                  Interviewing academic researchers revealed that over 60% of time spent on literature reviews was dedicated to verifying whether a study&apos;s methodology applied to specific oceanographic coordinates and seasonal variations.
                </p>
              </div>

              {/* Discovery Visual Placeholder */}
              <div className="w-full h-48 sm:h-56 my-2.5 rounded-sm border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50/70 dark:bg-[#13151E]/50 flex items-center justify-center p-6">
                <img
                  src="/orca.svg"
                  alt="Orca Research Document"
                  className="max-h-full w-auto object-contain"
                />
              </div>
            </div>

            {/* The Solution Section */}
            <div id="solution" className="pt-8 space-y-6 scroll-mt-20">
              <div className="space-y-3.5">
                <div className="space-y-1.5">
                  <span className="font-mono text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#0284C7] dark:text-[#38BDF8] block">
                    THE SOLUTION
                  </span>
                  <h2 className="text-[20px] sm:text-[22px] font-semibold text-[#232564] dark:text-[#F5F5FF] tracking-tight">
                    Literature synthesis grounded in real science
                  </h2>
                  <p className="text-[15px] sm:text-[15.5px] text-[#475569] dark:text-[#CBD5E1] leading-relaxed pt-0.5">
                    An AI research pipeline trained on marine biology corpora with strict hallucination guards, direct PDF citation deep-linking, and interactive spatial data mapping.
                  </p>
                </div>
              </div>
            </div>

            {/* Takeaways Section */}
            <div id="takeaways" className="pt-8 space-y-5 scroll-mt-20">
              <div className="space-y-1">
                <span className="font-mono text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#0284C7] dark:text-[#38BDF8] block">
                  TAKEAWAYS
                </span>
                <h2 className="text-[20px] sm:text-[22px] font-semibold text-[#232564] dark:text-[#F5F5FF] tracking-tight">
                  What I learned building ORCA.AI
                </h2>
              </div>

              {/* 2-Column Takeaways Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 pt-1">
                {/* Card 1 */}
                <div className="p-5 sm:p-5.5 rounded-sm border border-[#0284C7] dark:border-[#38BDF8] bg-[#0284C7]/[0.04] dark:bg-[#38BDF8]/[0.07] flex flex-col items-center text-center space-y-2.5 transition-colors hover:bg-[#0284C7]/[0.08] dark:hover:bg-[#38BDF8]/[0.12]">
                  <div className="p-1.5 rounded-sm bg-[#0284C7]/15 dark:bg-[#38BDF8]/20 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-[#0284C7] dark:text-[#38BDF8]" strokeWidth={1.5} />
                  </div>
                  <span className="font-mono text-xs sm:text-[12.5px] font-semibold tracking-wider text-[#0284C7] dark:text-[#38BDF8] block uppercase">
                    GROUNDED CITATIONS
                  </span>
                  <p className="text-[13.5px] sm:text-[14px] text-[#232564] dark:text-[#CBD5E1] leading-relaxed font-sans">
                    Trust in AI research tools depends entirely on direct, inspectable citations and zero tolerance for hallucinated sources.
                  </p>
                </div>

                {/* Card 2 */}
                <div className="p-5 sm:p-5.5 rounded-sm border border-[#0284C7] dark:border-[#38BDF8] bg-[#0284C7]/[0.04] dark:bg-[#38BDF8]/[0.07] flex flex-col items-center text-center space-y-2.5 transition-colors hover:bg-[#0284C7]/[0.08] dark:hover:bg-[#38BDF8]/[0.12]">
                  <div className="p-1.5 rounded-sm bg-[#0284C7]/15 dark:bg-[#38BDF8]/20 flex items-center justify-center">
                    <Layers className="w-5 h-5 text-[#0284C7] dark:text-[#38BDF8]" strokeWidth={1.5} />
                  </div>
                  <span className="font-mono text-xs sm:text-[12.5px] font-semibold tracking-wider text-[#0284C7] dark:text-[#38BDF8] block uppercase">
                    DOMAIN EMPATHY
                  </span>
                  <p className="text-[13.5px] sm:text-[14px] text-[#232564] dark:text-[#CBD5E1] leading-relaxed font-sans">
                    Designing for scientific specialists requires understanding their terminology, data structures, and peer-review workflows.
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
            className="font-mono text-[13.5px] sm:text-[14px] text-[#0284C7] dark:text-[#38BDF8] hover:underline underline-offset-4 font-medium flex items-center space-x-1 cursor-pointer"
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
