"use client";

import React, { useState, useEffect, useRef } from "react";
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
  ChevronLeft,
  ChevronRight,
  Github,
  ArrowDown,
  ExternalLink,
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
    { id: "solution", label: "The Solution" },
    { id: "mvp", label: "MVP Features" },
    { id: "future", label: "Future Scope" },
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
            <a
              href="https://github.com/Pynthamil/orca-ai"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playTone(880)}
              className="inline-flex items-center space-x-2 px-2.5 py-1.5 sm:py-1 rounded-sm border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-[#13151E]/50 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors group cursor-pointer"
              title="View Source on GitHub"
            >
              <Github className="w-3.5 h-3.5 text-[#232564] dark:text-[#F5F5FF] group-hover:text-[#0284C7] dark:group-hover:text-[#38BDF8] transition-colors" strokeWidth={2} />
              <span className="font-mono text-xs sm:text-[13px] text-[#232564] dark:text-[#F5F5FF] group-hover:text-[#0284C7] dark:group-hover:text-[#38BDF8] font-medium tracking-tight transition-colors">
                repo
              </span>
            </a>

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
                <p className="text-[18px] sm:text-[19.5px] font-normal text-[#232564] dark:text-[#F5F5FF] leading-snug">
                  Marine science generates vast amounts of research across papers, datasets, and observations, making it increasingly difficult for researchers to efficiently navigate and connect relevant evidence.
                </p>
              </div>

              {/* Context Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-4">
                <button
                  onClick={() => {
                    playTone(880);
                    document.getElementById('solution')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-4 py-2 rounded-sm bg-[#13151E] dark:bg-white text-white dark:text-[#13151E] hover:bg-[#232564] dark:hover:bg-neutral-200 transition-colors font-medium text-[13px] sm:text-sm shadow-sm flex items-center space-x-2"
                >
                  <span>Jump to Solution</span>
                  <ArrowDown className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* The Problem Section */}
            <div id="problem" className="pt-8 space-y-5 scroll-mt-20">
              <div className="space-y-1.5">
                <span className="font-mono text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#0284C7] dark:text-[#38BDF8] block">
                  THE PROBLEM
                </span>
                <p className="text-[17px] sm:text-[18px] text-[#232564] dark:text-[#F5F5FF] leading-relaxed font-normal">
                  Researchers spend hours searching across fragmented scientific sources and manually validating findings, making it difficult to quickly identify relevant evidence and trace conclusions back to reliable citations.
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

            {/* The Solution Section */}
            <div id="solution" className="pt-8 space-y-6 scroll-mt-20">
              <div className="space-y-3.5">
                <div className="space-y-1.5">
                  <span className="font-mono text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#0284C7] dark:text-[#38BDF8] block">
                    THE SOLUTION
                  </span>
                  <p className="text-[17px] sm:text-[18px] text-[#232564] dark:text-[#F5F5FF] leading-relaxed font-normal">
                    Built ORCA to simplify marine-science research by turning complex natural-language questions into concise, source-backed answers. Engineered the application around Google Gemini to interpret queries, synthesize scientific information, and surface relevant sources with citations, resulting in a functional AI research assistant for marine-science exploration.
                  </p>
                </div>

                {/* Solution Actions */}
                <div className="flex flex-wrap items-center gap-3 pt-1 pb-2">
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

                  <a
                    href="https://github.com/Pynthamil/orca-ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playTone(880)}
                    className="inline-flex items-center space-x-2 px-2.5 py-1.5 sm:py-1 rounded-sm border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-[#13151E]/50 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors group cursor-pointer"
                    title="View Source on GitHub"
                  >
                    <Github className="w-3.5 h-3.5 text-[#232564] dark:text-[#F5F5FF] group-hover:text-[#0284C7] dark:group-hover:text-[#38BDF8] transition-colors" strokeWidth={2} />
                    <span className="font-mono text-xs sm:text-[13px] text-[#232564] dark:text-[#F5F5FF] group-hover:text-[#0284C7] dark:group-hover:text-[#38BDF8] font-medium tracking-tight transition-colors">
                      repo
                    </span>
                  </a>
                </div>

                {/* Solution Visual Showcase */}
                <div className="w-full my-3 flex items-center justify-center">
                  <div className="w-full overflow-hidden border border-neutral-200/50 dark:border-neutral-800/50 rounded-sm">
                    <img
                      src="/orca1.svg"
                      alt="ORCA.AI Solution Interface"
                      className="w-full h-auto object-contain block select-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* MVP Features Section */}
            <div id="mvp" className="pt-8 space-y-4 scroll-mt-20">
              <div className="space-y-1.5">
                <span className="font-mono text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#0284C7] dark:text-[#38BDF8] block">
                  MVP FEATURES
                </span>
                <h2 className="text-[20px] sm:text-[22px] font-semibold text-[#232564] dark:text-[#F5F5FF] tracking-tight">
                  Core capabilities
                </h2>
                <ul className="list-disc pl-5 space-y-2 text-[16px] sm:text-[16.5px] text-[#475569] dark:text-[#CBD5E1] pt-1 marker:text-[#0284C7] dark:marker:text-[#38BDF8]">
                  <li className="pl-1">Natural language querying over complex marine science literature.</li>
                  <li className="pl-1">Automatic extraction and surfacing of strictly verified citations.</li>
                  <li className="pl-1">Conversational memory context for deep-dive ecological inquiries.</li>
                  <li className="pl-1">Leveraging Google Gemini's reasoning engine to synthesize multi-source data.</li>
                </ul>
              </div>
            </div>

            {/* Future Scope Section */}
            <div id="future" className="pt-8 space-y-4 scroll-mt-20">
              <div className="space-y-1.5">
                <span className="font-mono text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#0284C7] dark:text-[#38BDF8] block">
                  FUTURE SCOPE
                </span>
                <h2 className="text-[20px] sm:text-[22px] font-semibold text-[#232564] dark:text-[#F5F5FF] tracking-tight">
                  What's next for ORCA
                </h2>
                <ul className="list-disc pl-5 space-y-2 text-[16px] sm:text-[16.5px] text-[#475569] dark:text-[#CBD5E1] pt-1 marker:text-[#0284C7] dark:marker:text-[#38BDF8]">
                  <li className="pl-1">Interactive spatial mapping to visualize species migration paths dynamically.</li>
                  <li className="pl-1">Direct ingestion of raw acoustic and telemetry datasets for on-the-fly analysis.</li>
                  <li className="pl-1">Collaborative workspaces for university research teams to share curated findings.</li>
                  <li className="pl-1">Integration with live climate API endpoints to track environmental shifts.</li>
                </ul>
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
