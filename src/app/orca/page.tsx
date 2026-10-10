"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { OrcaCardCover } from "@/components/OrcaCardCover";
import { OrcaCoralVisuals } from "@/components/OrcaCoralVisuals";
import { OrcaCitationInspector } from "@/components/OrcaCitationInspector";
import { StippleWaveBg } from "@/components/StippleWaveBg";
import {
  Search,
  BookOpen,
  Database,
  Compass,
  Sparkles,
  Layers,
  HelpCircle,
  Lock,
  Moon,
  Sun,
  ChevronLeft,
  ChevronRight,
  Github,
  ArrowDown,
  ExternalLink,
  Cpu,
} from "lucide-react";
import { ProjectSidebar } from "@/components/ProjectSidebar";

export default function OrcaProjectPage() {
  const [soundOn, setSoundOn] = useState<boolean>(true);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

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
      icon: <BookOpen className="w-5 h-5 text-[#007FFF] dark:text-[#FFF0F5]" strokeWidth={1.5} />,
      title: "PAPER OVERLOAD",
      desc: "Too many papers to read and synthesize quickly",
    },
    {
      icon: <Search className="w-5 h-5 text-[#007FFF] dark:text-[#FFF0F5]" strokeWidth={1.5} />,
      title: "SCATTERED CITATIONS",
      desc: "Following reference chains is manual and tedious",
    },
    {
      icon: <Database className="w-5 h-5 text-[#007FFF] dark:text-[#FFF0F5]" strokeWidth={1.5} />,
      title: "RAW DATA SILOS",
      desc: "Datasets disconnected from the papers that use them",
    },
    {
      icon: <Compass className="w-5 h-5 text-[#007FFF] dark:text-[#FFF0F5]" strokeWidth={1.5} />,
      title: "DOMAIN BARRIERS",
      desc: "Specialized jargon makes cross-disciplinary work hard",
    },
  ];

  const sidebarSections = [
    { id: "overview", label: "Overview" },
    { id: "problem", label: "Problem" },
    { id: "research", label: "Research" },
    { id: "solution", label: "Solution" },
    { id: "takeaways", label: "Takeaways" },
  ];

  return (
    <div className="min-h-screen w-full flex flex-col justify-start items-center px-5 sm:px-8 md:px-12 pt-12 sm:pt-16 pb-6 sm:pb-8 selection:bg-cyan-100 dark:selection:bg-cyan-950">
      <div className="ambient-glow" />

      <div className="fixed left-4 sm:left-6 md:left-8 top-1/2 -translate-y-1/2 z-40 select-none hidden lg:block">
        <ProjectSidebar sections={sidebarSections} playTone={playTone} />
      </div>


      <main className="w-full relative z-10 flex flex-col max-w-[640px] animate-in fade-in duration-200">
        {/* Top Navigation Header */}
        <header className="flex items-center justify-between w-full mb-8">
          <Link
            href="/"
            onClick={() => playTone(880)}
            className="font-mono text-[17px] sm:text-[19px] tracking-tight text-[#2C2C2C] dark:text-[#F2F2F2] hover:text-[#737373] dark:hover:text-[#a3a3a3] transition-colors flex items-center space-x-1.5 focus:outline-none font-medium cursor-pointer"
          >
            <span>&larr;</span>
            <span>home</span>
          </Link>

          <div className="flex items-center space-x-3.5">
            <a
              href="https://orca-ai-iota.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playTone(880)}
              className="px-3.5 py-1.5 rounded-md border border-[#095F76]/30 dark:border-[#FFF0F5]/30 bg-[#095F76]/[0.06] dark:bg-[#FFF0F5]/[0.06] text-[#095F76] dark:text-[#FFF0F5] hover:bg-[#095F76]/[0.12] dark:hover:bg-[#FFF0F5]/[0.12] transition-all flex items-center space-x-1.5 font-mono text-[13px] sm:text-[13.5px] font-medium cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5 stroke-[2]" />
              <span>live demo</span>
            </a>
          </div>
        </header>

        <article className="space-y-6">
        {/* Project Header (Blog Style) */}
        <div className="space-y-6 mb-12">
          <div className="pb-5 text-left">
            <h1 className="font-sans font-medium text-[34px] sm:text-[40px] leading-tight text-[#2C2C2C] dark:text-[#F2F2F2] max-w-[800px]">
              Turning complex marine-science questions into clear, source-backed answers.
            </h1>
            
          </div>
        </div>

          <div className="pb-2 space-y-3">
            <div className="w-full my-8 flex items-center justify-center px-0">
              <img
                src="/dashboard.svg"
                alt="orca.ai Solution Interface"
                className="w-full h-auto object-contain block select-none rounded-md sm:rounded-lg shadow-sm"
              />
            </div>

            {/* Clean Boxed Metadata Card */}
            <div className="w-full border-[3px] border-black/10 dark:border-white/15 rounded-md sm:rounded-lg p-5 sm:p-6 bg-white/60 dark:bg-[#141415]/60 my-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
                <div>
                  <span className="font-sans text-[11.5px] sm:text-[12.5px] tracking-wider font-semibold text-neutral-400 dark:text-neutral-500 block mb-1.5 uppercase">
                    ROLE
                  </span>
                  <span className="text-[15px] sm:text-[16.5px] font-sans font-medium text-[#2C2C2C] dark:text-[#F2F2F2] leading-normal block">
                    Product Designer &amp; Developer
                  </span>
                </div>
                <div>
                  <span className="font-sans text-[11.5px] sm:text-[12.5px] tracking-wider font-semibold text-neutral-400 dark:text-neutral-500 block mb-1.5 uppercase">
                    TIMELINE
                  </span>
                  <span className="text-[15px] sm:text-[16.5px] font-sans font-medium text-[#2C2C2C] dark:text-[#F2F2F2] leading-normal block">
                    Aug – Sep 2026
                  </span>
                </div>
                <div>
                  <span className="font-sans text-[11.5px] sm:text-[12.5px] tracking-wider font-semibold text-neutral-400 dark:text-neutral-500 block mb-1.5 uppercase">
                    SKILLS &amp; TOOLS
                  </span>
                  <span className="text-[15px] sm:text-[16.5px] font-sans font-medium text-[#2C2C2C] dark:text-[#F2F2F2] leading-normal block">
                    AI/ML, Next.js, Gemini, Figma
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8 text-[16px] sm:text-[17.5px] text-[#2C2C2C] dark:text-[#F2F2F2] leading-[1.8] font-sans pt-1">
            
            {/* CONTEXT */}
            <div id="overview" className="space-y-4 scroll-mt-20 pt-6">
              <span className="font-sans text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#0284C7] dark:text-[#FFF0F5] block">
                OVERVIEW
              </span>
              <h3 className="text-[28px] sm:text-[32px] font-sans font-medium text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                Marine science is producing more research than researchers can realistically navigate manually.
              </h3>
              <p className="text-[16px] sm:text-[17.5px] text-[#475569] dark:text-[#CBD5E1] leading-relaxed my-4">
                Marine science generates vast amounts of research across papers, datasets, and observations. As this body of knowledge grows, researchers spend increasingly more time navigating fragmented sources and connecting evidence across them.
              </p>
            </div>

            <div className="pt-4 pb-2 flex flex-wrap gap-4 items-center">
              <button
                onClick={() => {
                  playTone(880);
                  document.getElementById('solution')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3 sm:px-8 sm:py-3.5 rounded-md bg-[#141415] dark:bg-white text-white dark:text-[#141415] hover:bg-[#2C2C2C] dark:hover:bg-neutral-200 transition-colors font-medium text-[15px] sm:text-[16px] shadow-sm flex items-center space-x-2.5 cursor-pointer"
              >
                <span>Jump to Solution</span>
                <ArrowDown className="w-5 h-5" />
              </button>
              <a
                href="https://orca-ai-iota.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playTone(880)}
                className="px-6 py-3 sm:px-8 sm:py-3.5 rounded-md border border-neutral-300 dark:border-neutral-700 hover:border-[#0284C7] dark:hover:border-[#FFF0F5] text-[#475569] dark:text-[#CBD5E1] hover:text-[#0284C7] dark:hover:text-[#FFF0F5] transition-colors font-medium text-[15px] sm:text-[16px] flex items-center space-x-2.5 cursor-pointer"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>

            {/* WIP BANNER */}
            <div className="w-full mt-4 mb-8 p-5 sm:p-6 border border-dashed border-[#0284C7]/40 dark:border-[#FFF0F5]/40 bg-[#0284C7]/[0.02] dark:bg-[#FFF0F5]/[0.04] rounded-md flex flex-col gap-2.5">
              <Lock className="w-4 h-4 text-[#0284C7] dark:text-[#FFF0F5]" strokeWidth={2.5} />
              <p className="text-[14.5px] sm:text-[15.5px] text-[#475569] dark:text-[#CBD5E1] leading-relaxed">
                The full case study is still a work in progress. For a more detailed walkthrough beyond this preview, <a href="mailto:pavendanpynthamil@gmail.com" className="text-[#2C2C2C] dark:text-[#F2F2F2] hover:text-[#0284C7] dark:hover:text-[#FFF0F5] underline decoration-wavy underline-offset-[5px] decoration-[#0284C7] dark:decoration-[#FFF0F5] decoration-2 transition-colors">reach out</a> directly!
              </p>
            </div>

            {/* THE PROBLEM */}
            <div id="problem" className="space-y-5 scroll-mt-20 pt-8">
              <span className="font-sans text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#0284C7] dark:text-[#FFF0F5] block">
                THE PROBLEM
              </span>
              <h3 className="text-[28px] sm:text-[34px] font-sans font-medium text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug tracking-tight">
                Decades of research, fragmented across thousands of papers
              </h3>

              {/* Stat Card matching reference mockup */}
              <div className="pt-2">
                <div className="w-full border-[3px] border-black/10 dark:border-white/15 rounded-md sm:rounded-lg p-6 sm:p-8 md:p-10 bg-white dark:bg-[#141415] shadow-sm my-3">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                    <div className="flex items-center gap-5 sm:gap-7">
                      <span className="text-[64px] sm:text-[84px] md:text-[92px] font-sans font-semibold tracking-tighter leading-none text-[#2C2C2C] dark:text-[#F2F2F2]">
                        74%
                      </span>
                      <span className="text-[18px] sm:text-[22px] font-sans font-normal leading-snug text-[#2C2C2C] dark:text-[#CBD5E1] max-w-[220px] sm:max-w-[240px]">
                        of researchers struggle to synthesize multi-disciplinary ocean data
                      </span>
                    </div>

                    <div className="flex flex-col items-center justify-center shrink-0 self-center sm:self-auto">
                      <div className="flex items-center gap-2">
                        <svg width="26" height="32" viewBox="0 0 28 34" fill="currentColor" className="text-[#0284C7]"><circle cx="14" cy="5" r="4.5"/><path d="M14 11C8.5 11 4 14.5 4 19V22C4 22.8 4.7 23.5 5.5 23.5H8.5V32C8.5 32.8 9.2 33.5 10 33.5H11.5C12.3 33.5 13 32.8 13 32V24H15V32C15 32.8 15.7 33.5 16.5 33.5H18C18.8 33.5 19.5 32.8 19.5 32V23.5H22.5C23.3 23.5 24 22.8 24 22V19C24 14.5 19.5 11 14 11Z"/></svg>
                        <svg width="26" height="32" viewBox="0 0 28 34" fill="currentColor" className="text-[#0284C7]"><circle cx="14" cy="5" r="4.5"/><path d="M14 11C8.5 11 4 14.5 4 19V22C4 22.8 4.7 23.5 5.5 23.5H8.5V32C8.5 32.8 9.2 33.5 10 33.5H11.5C12.3 33.5 13 32.8 13 32V24H15V32C15 32.8 15.7 33.5 16.5 33.5H18C18.8 33.5 19.5 32.8 19.5 32V23.5H22.5C23.3 23.5 24 22.8 24 22V19C24 14.5 19.5 11 14 11Z"/></svg>
                        <svg width="26" height="32" viewBox="0 0 28 34" fill="currentColor" className="text-[#0284C7]"><circle cx="14" cy="5" r="4.5"/><path d="M14 11C8.5 11 4 14.5 4 19V22C4 22.8 4.7 23.5 5.5 23.5H8.5V32C8.5 32.8 9.2 33.5 10 33.5H11.5C12.3 33.5 13 32.8 13 32V24H15V32C15 32.8 15.7 33.5 16.5 33.5H18C18.8 33.5 19.5 32.8 19.5 32V23.5H22.5C23.3 23.5 24 22.8 24 22V19C24 14.5 19.5 11 14 11Z"/></svg>
                      </div>
                      <div className="flex items-center gap-2 -mt-1">
                        <svg width="26" height="32" viewBox="0 0 28 34" fill="currentColor" className="text-[#2C2C2C] dark:text-[#F2F2F2]"><circle cx="14" cy="5" r="4.5"/><path d="M14 11C8.5 11 4 14.5 4 19V22C4 22.8 4.7 23.5 5.5 23.5H8.5V32C8.5 32.8 9.2 33.5 10 33.5H11.5C12.3 33.5 13 32.8 13 32V24H15V32C15 32.8 15.7 33.5 16.5 33.5H18C18.8 33.5 19.5 32.8 19.5 32V23.5H22.5C23.3 23.5 24 22.8 24 22V19C24 14.5 19.5 11 14 11Z"/></svg>
                        <svg width="26" height="32" viewBox="0 0 28 34" fill="currentColor" className="text-[#2C2C2C] dark:text-[#F2F2F2]"><circle cx="14" cy="5" r="4.5"/><path d="M14 11C8.5 11 4 14.5 4 19V22C4 22.8 4.7 23.5 5.5 23.5H8.5V32C8.5 32.8 9.2 33.5 10 33.5H11.5C12.3 33.5 13 32.8 13 32V24H15V32C15 32.8 15.7 33.5 16.5 33.5H18C18.8 33.5 19.5 32.8 19.5 32V23.5H22.5C23.3 23.5 24 22.8 24 22V19C24 14.5 19.5 11 14 11Z"/></svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <a 
                    href="https://doi.org/10.1038/s41597-024-03120-x" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="font-mono text-[11.5px] sm:text-[12.5px] text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 italic transition-colors"
                  >
                    https://doi.org/10.1038/s41597-024-03120-x
                  </a>
                </div>
              </div>


              <div className="pt-2">
                <span className="font-sans text-[11px] sm:text-[12px] uppercase tracking-wider font-semibold text-[#475569] dark:text-[#CBD5E1] block mb-3">
                  Core Pain Points
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                  {painPoints.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-white dark:bg-[#141415] border-[3px] border-black/10 dark:border-white/15 rounded-md sm:rounded-lg aspect-square p-4 sm:p-5 flex flex-col items-center justify-center text-center space-y-3 transition-all hover:border-[#0284C7] dark:hover:border-[#FFF0F5] shadow-sm cursor-default"
                    >
                      <div className="p-2 sm:p-3 rounded-md sm:rounded-lg bg-[#F5F5F7] dark:bg-[#18181B] flex items-center justify-center">
                        {item.icon}
                      </div>
                      <span className="font-mono text-[12px] sm:text-[13px] font-semibold tracking-tight text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                        {item.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Problem Statement Callout (Unboxed) */}
              <div className="pt-8 space-y-3">
                <span className="font-sans text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#0284C7] dark:text-[#FFF0F5] block">
                  PROBLEM STATEMENT
                </span>
                <p className="text-[20px] sm:text-[26px] md:text-[29px] font-sans font-medium text-[#2C2C2C] dark:text-[#F2F2F2] leading-[1.4] tracking-tight">
                  How might we make decades of marine research queryable in seconds without sacrificing the{" "}
                  <span className="text-[#0284C7] dark:text-[#2dd4bf] font-bold">
                    evidence researchers need to trust an answer?
                  </span>
                </p>
              </div>
            </div>

            {/* RESEARCH: 3 CORE BARRIERS */}
            <div id="research" className="space-y-4 scroll-mt-20 pt-8">
              <div className="space-y-1">
                <span className="font-sans text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#0284C7] dark:text-[#FFF0F5] block">
                  RESEARCH
                </span>
                <h3 className="text-[28px] sm:text-[34px] font-sans font-medium text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug tracking-tight">
                  The 3 core barriers
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 pt-2">
                {/* Card 1 */}
                <div className="p-6 sm:p-7 rounded-md sm:rounded-lg border-[3px] border-black/10 dark:border-white/15 bg-white dark:bg-[#141415] shadow-sm flex flex-col justify-start">
                  <span className="text-[44px] sm:text-[52px] font-sans font-medium tracking-tight text-[#2C2C2C] dark:text-[#F2F2F2] leading-none mb-3">
                    46%
                  </span>
                  <p className="text-[14.5px] sm:text-[15.5px] text-[#475569] dark:text-[#CBD5E1] font-sans leading-relaxed">
                    struggle with <span className="text-[#2C2C2C] dark:text-[#F2F2F2] font-medium">what to query</span> when starting literature reviews
                  </p>
                </div>

                {/* Card 2 */}
                <div className="p-6 sm:p-7 rounded-md sm:rounded-lg border-[3px] border-black/10 dark:border-white/15 bg-white dark:bg-[#141415] shadow-sm flex flex-col justify-start">
                  <span className="text-[44px] sm:text-[52px] font-sans font-medium tracking-tight text-[#2C2C2C] dark:text-[#F2F2F2] leading-none mb-3">
                    68%
                  </span>
                  <p className="text-[14.5px] sm:text-[15.5px] text-[#475569] dark:text-[#CBD5E1] font-sans leading-relaxed">
                    find <span className="text-[#2C2C2C] dark:text-[#F2F2F2] font-medium">manual citation tracing</span> too tedious across databases
                  </p>
                </div>

                {/* Card 3 */}
                <div className="p-6 sm:p-7 rounded-md sm:rounded-lg border-[3px] border-black/10 dark:border-white/15 bg-white dark:bg-[#141415] shadow-sm flex flex-col justify-start">
                  <span className="text-[44px] sm:text-[52px] font-sans font-medium tracking-tight text-[#2C2C2C] dark:text-[#F2F2F2] leading-none mb-3">
                    82%
                  </span>
                  <p className="text-[14.5px] sm:text-[15.5px] text-[#475569] dark:text-[#CBD5E1] font-sans leading-relaxed">
                    abandon <span className="text-[#2C2C2C] dark:text-[#F2F2F2] font-medium">deep references</span> due to unindexed paper silos
                  </p>
                </div>
              </div>
            </div>


            {/* THE SOLUTION */}
            <div id="solution" className="space-y-6 scroll-mt-20 pt-8">
              <div className="space-y-4">
                <span className="font-sans text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#0284C7] dark:text-[#FFF0F5] block">
                  THE SOLUTION
                </span>
                <h3 className="text-[28px] sm:text-[32px] font-sans font-medium text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                  A focused research assistant that lets scientists move from <span className="bg-[#E0F2FE] dark:bg-[#0284C7] dark:text-white px-1 box-decoration-clone">question to evidence-backed answer</span> without leaving the research workflow.
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 pt-4">
                <div className="p-6 sm:p-8 rounded-md sm:rounded-lg border-[3px] border-black/10 dark:border-white/15 bg-white dark:bg-[#141415] space-y-4 shadow-sm">
                  <h4 className="font-sans text-[13px] font-semibold text-[#ef4444] tracking-wider uppercase mb-4">BEFORE</h4>
                  <ul className="list-disc pl-4 space-y-3.5 sm:space-y-4 text-[15px] sm:text-[16px] text-[#475569] dark:text-[#CBD5E1] marker:text-[#ef4444]">
                    <li className="pl-1 hover:underline hover:decoration-wavy hover:underline-offset-[3px] decoration-[#ef4444]/40 dark:decoration-[#ef4444]/40 transition-all cursor-default">Search across fragmented sources</li>
                    <li className="pl-1 hover:underline hover:decoration-wavy hover:underline-offset-[3px] decoration-[#ef4444]/40 dark:decoration-[#ef4444]/40 transition-all cursor-default">Manually compare findings</li>
                    <li className="pl-1 hover:underline hover:decoration-wavy hover:underline-offset-[3px] decoration-[#ef4444]/40 dark:decoration-[#ef4444]/40 transition-all cursor-default">Validate citations independently</li>
                    <li className="pl-1 hover:underline hover:decoration-wavy hover:underline-offset-[3px] decoration-[#ef4444]/40 dark:decoration-[#ef4444]/40 transition-all cursor-default">Repeat searches to build context</li>
                  </ul>
                </div>
                <div className="p-6 sm:p-8 rounded-md sm:rounded-lg border-[3px] border-[#10b981]/40 dark:border-[#10b981]/40 bg-[#f0fdf4]/50 dark:bg-[#10b981]/[0.05] space-y-4 shadow-sm">
                  <h4 className="font-sans text-[13px] font-semibold text-[#10b981] tracking-wider uppercase mb-4">AFTER</h4>
                  <ul className="list-disc pl-4 space-y-3.5 sm:space-y-4 text-[15px] sm:text-[16px] text-[#475569] dark:text-[#CBD5E1] marker:text-[#10b981]">
                    <li className="pl-1 hover:underline hover:decoration-wavy hover:underline-offset-[3px] decoration-[#10b981]/40 dark:decoration-[#10b981]/40 transition-all cursor-default">Ask one natural-language question</li>
                    <li className="pl-1 hover:underline hover:decoration-wavy hover:underline-offset-[3px] decoration-[#10b981]/40 dark:decoration-[#10b981]/40 transition-all cursor-default">Retrieve relevant research</li>
                    <li className="pl-1 hover:underline hover:decoration-wavy hover:underline-offset-[3px] decoration-[#10b981]/40 dark:decoration-[#10b981]/40 transition-all cursor-default">Receive a synthesized response</li>
                    <li className="pl-1 hover:underline hover:decoration-wavy hover:underline-offset-[3px] decoration-[#10b981]/40 dark:decoration-[#10b981]/40 transition-all cursor-default">Inspect supporting citations</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* KEY FEATURE 1 */}
            <div className="space-y-6 scroll-mt-20 pt-4">
              <div className="space-y-3">
                <span className="font-sans text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#0284C7] dark:text-[#FFF0F5] block">
                  KEY FEATURE 1
                </span>
                <div className="space-y-1.5">
                  <h3 className="font-sans font-medium text-[28px] sm:text-[32px] md:text-[34px] text-[#2C2C2C] dark:text-[#F2F2F2] tracking-tight leading-snug">
                    Evidence-Backed Research Synthesis
                  </h3>
                  <p className="font-sans font-normal text-[15px] sm:text-[16.5px] text-[#64748B] dark:text-[#94A3B8] leading-relaxed">
                    ORCA transforms complex natural-language queries into clear, synthesized answers grounded directly in peer-reviewed literature with inspectable citations.
                  </p>
                </div>
              </div>

              <div className="w-full h-[340px] sm:h-[440px] md:h-[520px] overflow-hidden rounded-md sm:rounded-lg flex items-center justify-center relative bg-[#F5F5F7] dark:bg-[#18181B] group">
                {/* Cover Component */}
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                  <OrcaCardCover />
                </div>
              </div>
            </div>

            {/* KEY FEATURE 2 */}
            <div className="space-y-6 scroll-mt-20 pt-8">
              <div className="space-y-3">
                <span className="font-sans text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#0284C7] dark:text-[#FFF0F5] block">
                  KEY FEATURE 2
                </span>
                <div className="space-y-1.5">
                  <h3 className="font-sans font-medium text-[28px] sm:text-[32px] md:text-[34px] text-[#2C2C2C] dark:text-[#F2F2F2] tracking-tight leading-snug">
                    From Complex Questions to Clear Insights
                  </h3>
                  <p className="font-sans font-normal text-[15px] sm:text-[16.5px] text-[#64748B] dark:text-[#94A3B8] leading-relaxed">
                    Ask ORCA a question like <span className="text-[#0284C7] dark:text-[#FFF0F5] font-semibold">“How does ocean acidification affect coral reefs?”</span> and it breaks the research into key findings, relationships, and visual insights.
                  </p>
                </div>
              </div>

              {/* Key Feature 2 SVG Showcase */}
              <div className="w-full pt-2">
                <img
                  src="/codedex/keyfeature_orca2.svg"
                  alt="From Complex Questions to Clear Insights"
                  className="w-full h-auto object-contain select-none block"
                />
              </div>
            </div>

            {/* KEY FEATURE 3 */}
            <div className="space-y-6 scroll-mt-20 pt-8">
              <div className="space-y-3">
                <span className="font-sans text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#0284C7] dark:text-[#FFF0F5] block">
                  KEY FEATURE 3
                </span>
                <div className="space-y-1.5">
                  <h3 className="font-sans font-medium text-[28px] sm:text-[32px] md:text-[34px] text-[#2C2C2C] dark:text-[#F2F2F2] tracking-tight leading-snug">
                    Interactive Citation Inspector &amp; Source Verification
                  </h3>
                  <p className="font-sans font-normal text-[15px] sm:text-[16.5px] text-[#64748B] dark:text-[#94A3B8] leading-relaxed">
                    Clicking any inline citation badge in an answer reveals the exact extracted paper snippet, DOI link, sample size, and grounding confidence score.
                  </p>
                </div>
              </div>

              {/* Key Feature 3 SVG Showcase */}
              <div className="w-full pt-2">
                <img
                  src="/codedex/keyfeature_orca3.svg"
                  alt="Interactive Citation Inspector & Source Verification"
                  className="w-full h-auto object-contain select-none block"
                />
              </div>
            </div>



            {/* DESIGN PHILOSOPHY */}
            <div id="philosophy" className="space-y-4 scroll-mt-20 pt-8">
              <span className="font-sans text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#0284C7] dark:text-[#FFF0F5] block">
                DESIGN PHILOSOPHY
              </span>
              <h3 className="text-[28px] sm:text-[32px] font-sans font-medium text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                I designed ORCA around a simple principle: <span className="bg-[#E0F2FE] dark:bg-[#0284C7] dark:text-white px-1 box-decoration-clone">AI should accelerate scientific research without hiding the evidence behind its answers.</span>
              </h3>
              <p className="text-[16px] sm:text-[17.5px] text-[#475569] dark:text-[#CBD5E1] leading-relaxed my-4">
                ORCA turns natural-language questions into concise, source-backed answers by finding relevant research, synthesizing the findings, and showing where each answer comes from.
              </p>
              <div className="pt-4 flex justify-center">
                <img
                  src="/dp1.svg"
                  alt="Design Philosophy Process"
                  className="w-1/4 h-auto block select-none"
                />
              </div>
            </div>

            {/* BUILDING THE SYSTEM */}
            <div className="space-y-4 -mt-4">
              <h3 className="text-[28px] sm:text-[32px] font-sans font-medium text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                Connecting <span className="bg-[#E0F2FE] dark:bg-[#0284C7] dark:text-white px-1 box-decoration-clone">retrieval, LLM reasoning, and citation grounding</span> into a single research workflow.
              </h3>
              
              <div className="p-6 bg-[#F7F7F7] dark:bg-[#141415] border border-neutral-200 dark:border-neutral-800 rounded-xl font-mono text-[13px] sm:text-sm text-center space-y-3 mt-4">
                <div className="font-medium text-[#2C2C2C] dark:text-[#F2F2F2]">Research Question</div>
                <div className="text-[#0284C7] dark:text-[#FFF0F5]">&darr;</div>
                <div className="font-medium text-[#2C2C2C] dark:text-[#F2F2F2]">Query Processing</div>
                <div className="text-[#0284C7] dark:text-[#FFF0F5]">&darr;</div>
                <div className="font-medium text-[#2C2C2C] dark:text-[#F2F2F2]">Semantic Retrieval</div>
                <div className="text-[#0284C7] dark:text-[#FFF0F5]">&darr;</div>
                <div className="font-medium text-[#2C2C2C] dark:text-[#F2F2F2]">Relevant Research</div>
                <div className="text-[#0284C7] dark:text-[#FFF0F5]">&darr;</div>
                <div className="font-medium text-[#2C2C2C] dark:text-[#F2F2F2]">Google Gemini</div>
                <div className="text-[#0284C7] dark:text-[#FFF0F5]">&darr;</div>
                <div className="font-medium text-[#2C2C2C] dark:text-[#F2F2F2]">Citation Grounding</div>
                <div className="text-[#0284C7] dark:text-[#FFF0F5]">&darr;</div>
                <div className="font-bold text-[#0284C7] dark:text-[#FFF0F5]">Source-backed Answer</div>
              </div>
            </div>

            {/* THE INTERESTING PART */}
            <div className="space-y-4 -mt-4">
              <h3 className="text-[28px] sm:text-[32px] font-sans font-medium text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                The hardest problem wasn't getting Gemini to answer questions - it was <span className="bg-[#E0F2FE] dark:bg-[#0284C7] dark:text-white px-1 box-decoration-clone">making those answers stay grounded in the research behind them.</span>
              </h3>
              <ul className="list-disc pl-5 space-y-3 text-[16px] sm:text-[17.5px] text-[#475569] dark:text-[#CBD5E1] pt-3 marker:text-[#0284C7] dark:marker:text-[#FFF0F5]">
                <li className="pl-1 hover:underline hover:decoration-wavy hover:underline-offset-[3px] decoration-[#0284C7]/40 dark:decoration-[#FFF0F5]/40 transition-all cursor-default"><strong className="font-medium text-[#2C2C2C] dark:text-[#F2F2F2]">Insufficient evidence:</strong> When the model lacks context, it must gracefully admit gaps rather than hallucinating facts.</li>
                <li className="pl-1 hover:underline hover:decoration-wavy hover:underline-offset-[3px] decoration-[#0284C7]/40 dark:decoration-[#FFF0F5]/40 transition-all cursor-default"><strong className="font-medium text-[#2C2C2C] dark:text-[#F2F2F2]">Irrelevant retrieval:</strong> If retrieved sources aren't relevant, the system needs to filter them out before synthesis.</li>
                <li className="pl-1 hover:underline hover:decoration-wavy hover:underline-offset-[3px] decoration-[#0284C7]/40 dark:decoration-[#FFF0F5]/40 transition-all cursor-default"><strong className="font-medium text-[#2C2C2C] dark:text-[#F2F2F2]">Claim matching:</strong> Every generated claim must explicitly match its source material.</li>
                <li className="pl-1 hover:underline hover:decoration-wavy hover:underline-offset-[3px] decoration-[#0284C7]/40 dark:decoration-[#FFF0F5]/40 transition-all cursor-default"><strong className="font-medium text-[#2C2C2C] dark:text-[#F2F2F2]">Inspectable citations:</strong> Citations in the UI need to correspond to actual, retrievable evidence snippets the user can verify.</li>
              </ul>
            </div>

            {/* ITERATING ON ORCA */}
            <div className="space-y-5 -mt-4">
              <div className="space-y-4">
                <h3 className="text-[24px] sm:text-[28px] font-sans font-medium text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                  Testing real marine-science questions revealed where retrieval, synthesis, and citation grounding could break down.
                </h3>
              </div>
              
              <div className="bg-[#F7F7F7] dark:bg-[#141415] border border-neutral-200 dark:border-neutral-800 p-5 rounded-xl space-y-4 mt-2 text-center">
                <div className="space-y-1">
                  <div className="font-mono text-xs font-semibold text-[#0284C7] dark:text-[#FFF0F5]">QUESTION</div>
                  <div className="text-[24px] sm:text-[26px] font-sans font-medium text-[#2C2C2C] dark:text-[#F2F2F2]">"How do temperature shifts affect phytoplankton blooms in the North Atlantic?"</div>
                </div>
                <div className="flex justify-center text-[#0284C7] dark:text-[#FFF0F5]">&darr;</div>
                <div className="space-y-1">
                  <div className="font-mono text-xs font-semibold text-[#0284C7] dark:text-[#FFF0F5]">RETRIEVED EVIDENCE</div>
                  <div className="text-[15.5px] sm:text-[17px] text-[#475569] dark:text-[#CBD5E1]">3 relevant papers found discussing thermal stratification and nutrient availability.</div>
                </div>
                <div className="flex justify-center text-[#0284C7] dark:text-[#FFF0F5]">&darr;</div>
                <div className="space-y-1">
                  <div className="font-mono text-xs font-semibold text-[#0284C7] dark:text-[#FFF0F5]">GENERATED ANSWER</div>
                  <div className="text-[15.5px] sm:text-[17px] text-[#475569] dark:text-[#CBD5E1]">Synthesized summary of the delay in spring blooms due to increased stratification...</div>
                </div>
                <div className="flex justify-center text-[#0284C7] dark:text-[#FFF0F5]">&darr;</div>
                <div className="space-y-1">
                  <div className="font-mono text-xs font-semibold text-[#0284C7] dark:text-[#FFF0F5]">CITATION</div>
                  <div className="text-[15.5px] sm:text-[17px] text-[#475569] dark:text-[#CBD5E1]">[Smith et al., 2024; Oceanic Thermal Dynamics]</div>
                </div>
              </div>
              
              <p className="text-[16px] sm:text-[17.5px] text-[#475569] dark:text-[#CBD5E1] leading-relaxed pt-2">
                <strong className="text-[#2C2C2C] dark:text-[#F2F2F2]">The fix:</strong> Early on, the model would sometimes cite a paper for a claim it didn't actually support. I had to implement a strict secondary verification prompt, forcing Gemini to extract the exact quote from the context chunk before allowing the citation to render.
              </p>
            </div>

            {/* WHAT'S NEXT */}
            <div className="space-y-4 -mt-4">
              <h3 className="text-[28px] sm:text-[32px] font-sans font-medium text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                Moving ORCA from an MVP research assistant toward a more rigorous scientific research tool.
              </h3>
              <ul className="list-disc pl-5 space-y-3 text-[16px] sm:text-[17.5px] text-[#475569] dark:text-[#CBD5E1] marker:text-[#0284C7] dark:marker:text-[#FFF0F5] pt-2">
                <li className="pl-1 hover:underline hover:decoration-wavy hover:underline-offset-[3px] decoration-[#0284C7]/40 dark:decoration-[#FFF0F5]/40 transition-all cursor-default">Spatial visualization of species migration and ecological patterns</li>
                <li className="pl-1 hover:underline hover:decoration-wavy hover:underline-offset-[3px] decoration-[#0284C7]/40 dark:decoration-[#FFF0F5]/40 transition-all cursor-default">Direct analysis of acoustic, telemetry, and other scientific datasets</li>
                <li className="pl-1 hover:underline hover:decoration-wavy hover:underline-offset-[3px] decoration-[#0284C7]/40 dark:decoration-[#FFF0F5]/40 transition-all cursor-default">Collaborative research environments for university teams</li>
              </ul>
            </div>



            {/* TAKEAWAYS */}
            <div id="takeaways" className="pt-8 space-y-5 scroll-mt-20">
              <div className="space-y-1">
                <span className="font-sans text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#0284C7] dark:text-[#FFF0F5] block">
                  TAKEAWAYS
                </span>
                <h3 className="text-[28px] sm:text-[32px] font-sans font-medium text-[#2C2C2C] dark:text-[#F2F2F2] tracking-tight leading-snug">
                  Building ORCA taught me that <span className="bg-[#E0F2FE] dark:bg-[#0284C7] dark:text-white px-1 box-decoration-clone">trustworthy AI is less about the model alone and more about the systems built around it.</span>
                </h3>
              </div>

              {/* 2-Column Takeaways Cards */}
              <div className="w-full pt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {/* Card 1 */}
                  <div className="relative w-full h-full p-6 sm:p-8 rounded-md sm:rounded-lg bg-[#F0F8FF] dark:bg-[#0284C7]/[0.1] flex flex-col items-start justify-center text-left space-y-4 sm:space-y-6">
                    <img src="/laptop.svg" alt="Laptop" className="w-24 h-24 sm:w-28 sm:h-28 object-contain -mb-4 sm:-mb-6" />
                    <div className="space-y-3">
                      <h4 className="font-sans font-medium text-[20px] sm:text-[24px] text-[#2C2C2C] dark:text-[#F2F2F2] leading-tight pr-4">
                        Grounded citations
                      </h4>
                      <p className="text-[15px] sm:text-[16px] text-[#2C2C2C] dark:text-[#CBD5E1] leading-relaxed font-sans pr-2">
                        Trust in AI research tools depends on making evidence directly inspectable and preventing unsupported claims from being presented as fact.
                      </p>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className="relative w-full h-full p-6 sm:p-8 rounded-md sm:rounded-lg bg-[#F0F8FF] dark:bg-[#0284C7]/[0.1] flex flex-col items-start justify-center text-left space-y-4 sm:space-y-6">
                    <img src="/idea.svg" alt="Idea" className="w-24 h-24 sm:w-28 sm:h-28 object-contain scale-125 sm:scale-150 origin-left" />
                    <div className="space-y-3">
                      <h4 className="font-sans font-medium text-[20px] sm:text-[24px] text-[#2C2C2C] dark:text-[#F2F2F2] leading-tight pr-4">
                        Domain empathy
                      </h4>
                      <p className="text-[15px] sm:text-[16px] text-[#2C2C2C] dark:text-[#CBD5E1] leading-relaxed font-sans pr-2">
                        Designing for scientific specialists requires understanding how they search, interpret evidence, and validate findings - not simply adapting a generic chatbot interface.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        


        </article>

        {/* Footer Next / Previous Project Bar */}
        <div className="pt-10 pb-6 border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
          <Link
            href="/quippy"
            onClick={() => playTone(650)}
            className="flex items-center gap-3 p-4 rounded-md border border-neutral-300 dark:border-neutral-700 hover:border-[#0284C7] bg-white/50 dark:bg-[#141415]/50 w-full sm:w-auto transition-colors group cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 text-[#0284C7] group-hover:-translate-x-1 transition-transform" />
            <div className="flex flex-col text-left">
              <span className="text-xs font-mono text-neutral-500">PREVIOUS PROJECT</span>
              <span className="font-semibold text-[#2C2C2C] dark:text-[#F2F2F2] text-sm">Quippy</span>
            </div>
          </Link>

          <Link
            href="/semantic"
            onClick={() => playTone(650)}
            className="flex items-center justify-end gap-3 p-4 rounded-md border border-neutral-300 dark:border-neutral-700 hover:border-[#0284C7] bg-white/50 dark:bg-[#141415]/50 w-full sm:w-auto transition-colors group text-right cursor-pointer"
          >
            <div className="flex flex-col text-right">
              <span className="text-xs font-mono text-neutral-500">NEXT PROJECT</span>
              <span className="font-semibold text-[#2C2C2C] dark:text-[#F2F2F2] text-sm">Semantic Email Copilot</span>
            </div>
            <ChevronRight className="w-5 h-5 text-[#0284C7] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <Footer />
      </main>
    </div>
  );
}
