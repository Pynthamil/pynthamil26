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
  Cpu,
} from "lucide-react";
import { ProjectSidebar } from "@/components/ProjectSidebar";

export default function OrcaProjectPage() {
  const [soundOn, setSoundOn] = useState<boolean>(true);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const heroInnerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current || !heroInnerRef.current) return;
      
      const scrollY = window.scrollY;
      
      // Start expanding immediately on scroll, finish after 350px
      const startScroll = 0;
      const endScroll = 150;
      
      let progress = 0;
      if (scrollY >= endScroll) {
        progress = 1;
      } else if (scrollY > startScroll) {
        progress = (scrollY - startScroll) / (endScroll - startScroll);
      }
      
      // Interpolate width from 800px to 100vw
      // Actually, since it's responsive, let's use scale or dynamic width calculations.
      // Initially it's max 800px. We want it to grow to window.innerWidth.
      // But it's easier to use a percentage of viewport width.
      // initial: min(800px, 100vw). Final: 100vw.
      
      const isMobile = window.innerWidth < 640;
      if (isMobile) {
         const currentWidth = window.innerWidth - 32; // 16px margin on mobile
         heroRef.current.style.width = `${currentWidth}px`;
         heroInnerRef.current.style.borderRadius = '8px';
         heroInnerRef.current.style.padding = `${24 - (8 * progress)}px`;
         return;
      }

      // Desktop: interpolate width from 800 to 100vw
      // To do this, we can set width directly in px
      const initialWidth = 800;
      const targetWidth = Math.min(window.innerWidth - 64, 1200); // 32px margin on sides, max 1200px
      const currentWidth = initialWidth + (targetWidth - initialWidth) * progress;
      
      heroRef.current.style.width = `${currentWidth}px`;
      
      // Interpolate padding from 3rem (48px) to 0
      const currentPadding = 48 - (24 * progress); // shrink padding from 48px to 24px, never 0
      heroInnerRef.current.style.padding = `${currentPadding}px`;
      
      // Interpolate border radius from 0.375rem (6px) to 0
      const currentRadius = 8; // keep border radius rounded at 8px
      heroInnerRef.current.style.borderRadius = `${currentRadius}px`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    
    // Initial call
    handleScroll();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);


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
      icon: <BookOpen className="w-5 h-5 text-[#095F76] dark:text-[#74B1C3]" strokeWidth={1.5} />,
      title: "PAPER OVERLOAD",
    },
    {
      icon: <Search className="w-5 h-5 text-[#095F76] dark:text-[#74B1C3]" strokeWidth={1.5} />,
      title: "SCATTERED CITATIONS",
    },
    {
      icon: <Database className="w-5 h-5 text-[#095F76] dark:text-[#74B1C3]" strokeWidth={1.5} />,
      title: "RAW DATA SILOS",
    },
    {
      icon: <Compass className="w-5 h-5 text-[#095F76] dark:text-[#74B1C3]" strokeWidth={1.5} />,
      title: "DOMAIN BARRIERS",
    },
  ];

  const sidebarSections = [
    { id: "overview", label: "Overview" },
    { id: "architecture", label: "Architecture" },
    { id: "features", label: "Features" },
    { id: "notes", label: "Notes" },
  ];

  return (
    <div className="min-h-screen w-full flex flex-col justify-start items-center px-5 sm:px-8 md:px-12 pt-12 sm:pt-16 pb-24 selection:bg-cyan-100 dark:selection:bg-cyan-950">
      <ProjectSidebar sections={sidebarSections} playTone={playTone} />

      <div className="ambient-glow" />

      <main className="w-full relative z-10 flex flex-col max-w-[540px] animate-in fade-in duration-200">
        <header className="flex items-center justify-between w-full mb-8">
          <Link
            href="/"
            onClick={() => playTone(880)}
            className="font-mono text-[15px] sm:text-[15.5px] tracking-tight text-[#2C2C2C] dark:text-[#F2F2F2] hover:text-[#095F76] dark:hover:text-[#74B1C3] transition-colors flex items-center space-x-1.5 focus:outline-none font-medium cursor-pointer"
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
              <Github className="w-3.5 h-3.5 text-[#2C2C2C] dark:text-[#F2F2F2] group-hover:text-[#095F76] dark:group-hover:text-[#74B1C3] transition-colors" strokeWidth={2} />
              <span className="font-mono text-xs sm:text-[13px] text-[#2C2C2C] dark:text-[#F2F2F2] group-hover:text-[#095F76] dark:group-hover:text-[#74B1C3] font-medium tracking-tight transition-colors">
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
              className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-sm border border-[#095F76] dark:border-[#74B1C3] bg-[#095F76]/[0.05] dark:bg-[#74B1C3]/[0.08] hover:bg-[#095F76]/[0.1] dark:hover:bg-[#74B1C3]/[0.15] cursor-pointer group select-none transition-colors"
              title="Click to copy link"
            >
              <span className="font-mono text-xs sm:text-[13px] text-[#095F76] dark:text-[#74B1C3] font-medium tracking-tight">
                orca.ai
              </span>
              <div className="text-[#095F76] dark:text-[#74B1C3] flex items-center focus:outline-none transition-colors">
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
              className="p-1 text-[#2C2C2C] dark:text-[#F2F2F2] hover:text-[#095F76] dark:hover:text-[#74B1C3] transition-colors focus:outline-none cursor-pointer flex items-center justify-center"
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
            <h1 className="text-3xl sm:text-[34px] font-bold text-[#2C2C2C] dark:text-[#F2F2F2] tracking-tight">
              ORCA.AI
            </h1>
            <h3 className="text-[19px] sm:text-[21px] font-semibold text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
              Building an AI research assistant that turns complex marine-science questions into clear, source-backed answers.
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-4">
              <div>
                <span className="font-mono text-xs sm:text-[12.5px] font-semibold text-[#095F76] dark:text-[#74B1C3] block mb-1">
                  ROLE
                </span>
                <span className="text-[14px] sm:text-[15px] text-[#2C2C2C] dark:text-[#F2F2F2]">
                  Product Designer & Developer
                </span>
              </div>
              <div>
                <span className="font-mono text-xs sm:text-[12.5px] font-semibold text-[#095F76] dark:text-[#74B1C3] block mb-1">
                  TIMELINE
                </span>
                <span className="text-[14px] sm:text-[15px] text-[#2C2C2C] dark:text-[#F2F2F2]">
                  Aug 2026 - Present
                </span>
              </div>
              <div>
                <span className="font-mono text-xs sm:text-[12.5px] font-semibold text-[#095F76] dark:text-[#74B1C3] block mb-1">
                  SKILLS
                </span>
                <span className="text-[14px] sm:text-[15px] text-[#2C2C2C] dark:text-[#F2F2F2]">
                  AI/ML, Data Viz
                </span>
              </div>
              <div>
                <span className="font-mono text-xs sm:text-[12.5px] font-semibold text-[#095F76] dark:text-[#74B1C3] block mb-1">
                  TOOLS
                </span>
                <span className="text-[14px] sm:text-[15px] text-[#2C2C2C] dark:text-[#F2F2F2]">
                  Figma, Next.js, Gemini
                </span>
              </div>
            </div>
            
            <div ref={heroRef} className="w-[100vw] sm:w-[800px] max-w-[100vw] relative left-1/2 -translate-x-1/2 my-10 flex items-center justify-center px-4 sm:px-0">
              <div ref={heroInnerRef} className="w-full bg-[#095F76] dark:bg-[#074758] p-4 sm:p-8 md:p-12 rounded-sm overflow-hidden flex items-center justify-center shadow-inner transition-[padding,border-radius] duration-75">
                <div className="w-full overflow-hidden rounded-md shadow-[0_10px_30px_rgba(0,0,0,0.4)] border border-white/10">
                  <img
                    src="/orca1.svg"
                    alt="ORCA.AI Solution Interface"
                    className="w-full h-auto object-contain block select-none bg-white"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8 text-[16px] sm:text-[16.5px] text-[#2C2C2C] dark:text-[#F2F2F2] leading-[1.8] font-sans pt-1">
            
            {/* CONTEXT */}
            <div id="overview" className="space-y-4 scroll-mt-20 pt-6">
              <span className="font-mono text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#095F76] dark:text-[#74B1C3] block">
                CONTEXT
              </span>
              <h3 className="text-[20px] sm:text-[22px] font-semibold text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                Marine science is producing more research than researchers can realistically navigate manually.
              </h3>
              <p className="text-[16px] sm:text-[17px] text-[#475569] dark:text-[#CBD5E1] leading-relaxed border-l-2 border-[#095F76]/30 dark:border-[#74B1C3]/30 pl-4 py-1 my-4">
                Marine science generates vast amounts of research across papers, datasets, and observations. As this body of knowledge grows, researchers spend increasingly more time navigating fragmented sources and connecting evidence across them.
              </p>
            </div>

            {/* THE PROBLEM */}
            <div  className="space-y-5 scroll-mt-20 pt-8">
              <span className="font-mono text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#095F76] dark:text-[#74B1C3] block">
                THE PROBLEM
              </span>
              <h3 className="text-[20px] sm:text-[22px] font-semibold text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                Finding an answer is only half the problem when researchers still have to verify where it came from.
              </h3>
              <p className="text-[16px] sm:text-[17px] text-[#475569] dark:text-[#CBD5E1] leading-relaxed border-l-2 border-[#095F76]/30 dark:border-[#74B1C3]/30 pl-4 py-1 my-4">
                Researchers spend hours searching across fragmented scientific sources and manually validating findings. Without a centralized way to synthesize these documents, it becomes difficult to quickly identify relevant evidence and trace conclusions back to reliable citations.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 pt-2">
                {painPoints.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white/70 dark:bg-[#13151E]/90 border border-neutral-200 dark:border-[#74B1C3]/20 rounded-sm p-3.5 sm:p-4 flex flex-col items-center justify-center text-center space-y-2.5 transition-all hover:border-[#095F76] dark:hover:border-[#74B1C3] shadow-[0_1px_2px_rgba(0,0,0,0.02)] cursor-default"
                  >
                    <div className="p-1 rounded-sm bg-neutral-50 dark:bg-[#095F76]/10 flex items-center justify-center">
                      {item.icon}
                    </div>
                    <span className="font-mono text-[10.5px] sm:text-[11px] font-semibold tracking-tight text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                      {item.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* THE OPPORTUNITY */}
            <div  className="scroll-mt-20 pt-8">
              <span className="font-mono text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#095F76] dark:text-[#74B1C3] block mb-4">
                THE OPPORTUNITY
              </span>
              <div className="p-5 sm:p-6 rounded-sm border border-[#095F76] dark:border-[#74B1C3] bg-[#095F76]/[0.05] dark:bg-[#74B1C3]/[0.08] flex items-start gap-4">
                <HelpCircle className="w-5 h-5 text-[#095F76] dark:text-[#74B1C3] shrink-0 mt-0.5" strokeWidth={2} />
                <h3 className="text-[17px] sm:text-[19px] font-semibold text-[#2C2C2C] dark:text-[#F2F2F2] leading-relaxed">
                  How might we make decades of marine research queryable in seconds without sacrificing the evidence researchers need to trust an answer?
                </h3>
              </div>
            </div>

            {/* THE APPROACH */}
            <div  className="space-y-4 scroll-mt-20 pt-8">
              <span className="font-mono text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#095F76] dark:text-[#74B1C3] block">
                THE APPROACH
              </span>
              <h3 className="text-[20px] sm:text-[22px] font-semibold text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                I designed ORCA around a simple principle: AI should accelerate scientific research without hiding the evidence behind its answers.
              </h3>
              <p className="text-[16px] sm:text-[17px] text-[#475569] dark:text-[#CBD5E1] leading-relaxed border-l-2 border-[#095F76]/30 dark:border-[#74B1C3]/30 pl-4 py-1 my-4">
                ORCA transforms natural-language questions into concise, source-backed responses by combining semantic retrieval with Gemini-powered synthesis and citation grounding.
              </p>
              <div className="py-6 flex justify-center items-center w-full bg-neutral-50 dark:bg-[#13151E] border border-neutral-200 dark:border-neutral-800 rounded-sm">
                <span className="font-mono text-[12px] sm:text-sm font-semibold tracking-wider text-[#095F76] dark:text-[#74B1C3] text-center px-4">
                  QUESTION &rarr; RETRIEVE &rarr; SYNTHESIZE &rarr; CITE
                </span>
              </div>
            </div>

            {/* BUILDING THE SYSTEM */}
            <div id="architecture" className="space-y-4 scroll-mt-20 pt-8">
              <span className="font-mono text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#095F76] dark:text-[#74B1C3] block">
                BUILDING THE SYSTEM
              </span>
              <h3 className="text-[20px] sm:text-[22px] font-semibold text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                Connecting retrieval, LLM reasoning, and citation grounding into a single research workflow.
              </h3>
              
              <div className="p-6 bg-neutral-50 dark:bg-[#13151E] border border-neutral-200 dark:border-neutral-800 rounded-sm font-mono text-[13px] sm:text-sm text-center space-y-3 mt-4">
                <div className="font-medium text-[#2C2C2C] dark:text-[#F2F2F2]">Research Question</div>
                <div className="text-[#095F76] dark:text-[#74B1C3]">&darr;</div>
                <div className="font-medium text-[#2C2C2C] dark:text-[#F2F2F2]">Query Processing</div>
                <div className="text-[#095F76] dark:text-[#74B1C3]">&darr;</div>
                <div className="font-medium text-[#2C2C2C] dark:text-[#F2F2F2]">Semantic Retrieval</div>
                <div className="text-[#095F76] dark:text-[#74B1C3]">&darr;</div>
                <div className="font-medium text-[#2C2C2C] dark:text-[#F2F2F2]">Relevant Research</div>
                <div className="text-[#095F76] dark:text-[#74B1C3]">&darr;</div>
                <div className="font-medium text-[#2C2C2C] dark:text-[#F2F2F2]">Google Gemini</div>
                <div className="text-[#095F76] dark:text-[#74B1C3]">&darr;</div>
                <div className="font-medium text-[#2C2C2C] dark:text-[#F2F2F2]">Citation Grounding</div>
                <div className="text-[#095F76] dark:text-[#74B1C3]">&darr;</div>
                <div className="font-bold text-[#095F76] dark:text-[#74B1C3]">Source-backed Answer</div>
              </div>
            </div>

            {/* THE RESEARCH EXPERIENCE */}
            <div id="features" className="space-y-6 scroll-mt-20 pt-8">
              <div className="space-y-4">
                <span className="font-mono text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#095F76] dark:text-[#74B1C3] block">
                  THE RESEARCH EXPERIENCE
                </span>
                <h3 className="text-[20px] sm:text-[22px] font-semibold text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                  Keeping the interface simple while exposing enough evidence for researchers to investigate the answer themselves.
                </h3>
              </div>
              
              <div className="space-y-6 pt-2">
                <div>
                  <h4 className="text-[17px] font-semibold text-[#2C2C2C] dark:text-[#F2F2F2] mb-1">Natural-language research</h4>
                  <p className="text-[16px] text-[#475569] dark:text-[#CBD5E1]">Letting researchers ask complex ecological questions without learning a new search language.</p>
                </div>
                <div>
                  <h4 className="text-[17px] font-semibold text-[#2C2C2C] dark:text-[#F2F2F2] mb-1">Source-backed answers</h4>
                  <p className="text-[16px] text-[#475569] dark:text-[#CBD5E1]">Surfacing supporting research alongside the generated response so users can move directly from conclusion to evidence.</p>
                </div>
                <div>
                  <h4 className="text-[17px] font-semibold text-[#2C2C2C] dark:text-[#F2F2F2] mb-1">Conversational context</h4>
                  <p className="text-[16px] text-[#475569] dark:text-[#CBD5E1]">Preserving the context of a research investigation so users can progressively narrow and deepen their questions.</p>
                </div>
              </div>
            </div>

            {/* THE INTERESTING PART */}
            <div  className="space-y-4 scroll-mt-20 pt-8">
              <span className="font-mono text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#095F76] dark:text-[#74B1C3] block">
                THE INTERESTING PART
              </span>
              <h3 className="text-[20px] sm:text-[22px] font-semibold text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                The hardest problem wasn't getting Gemini to answer questions - it was making those answers stay grounded in the research behind them.
              </h3>
              <ul className="list-disc pl-5 space-y-3 text-[16px] text-[#475569] dark:text-[#CBD5E1] pt-3 marker:text-[#095F76] dark:marker:text-[#74B1C3]">
                <li className="pl-1"><strong className="font-medium text-[#2C2C2C] dark:text-[#F2F2F2]">Insufficient evidence:</strong> When the model lacks context, it must gracefully admit gaps rather than hallucinating facts.</li>
                <li className="pl-1"><strong className="font-medium text-[#2C2C2C] dark:text-[#F2F2F2]">Irrelevant retrieval:</strong> If retrieved sources aren't relevant, the system needs to filter them out before synthesis.</li>
                <li className="pl-1"><strong className="font-medium text-[#2C2C2C] dark:text-[#F2F2F2]">Claim matching:</strong> Every generated claim must explicitly match its source material.</li>
                <li className="pl-1"><strong className="font-medium text-[#2C2C2C] dark:text-[#F2F2F2]">Inspectable citations:</strong> Citations in the UI need to correspond to actual, retrievable evidence snippets the user can verify.</li>
              </ul>
            </div>

            {/* ITERATING ON ORCA */}
            <div  className="space-y-5 scroll-mt-20 pt-8">
              <div className="space-y-4">
                <span className="font-mono text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#095F76] dark:text-[#74B1C3] block">
                  ITERATING ON ORCA
                </span>
                <h3 className="text-[20px] sm:text-[22px] font-semibold text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                  Testing real marine-science questions revealed where retrieval, synthesis, and citation grounding could break down.
                </h3>
              </div>
              
              <div className="bg-neutral-50 dark:bg-[#13151E] border border-neutral-200 dark:border-neutral-800 p-5 rounded-sm space-y-4 mt-2">
                <div className="space-y-1">
                  <div className="font-mono text-xs font-semibold text-[#095F76] dark:text-[#74B1C3]">QUESTION</div>
                  <div className="text-[15px] font-medium text-[#2C2C2C] dark:text-[#F2F2F2]">"How do temperature shifts affect phytoplankton blooms in the North Atlantic?"</div>
                </div>
                <div className="flex justify-start pl-4 text-[#095F76] dark:text-[#74B1C3]">&darr;</div>
                <div className="space-y-1">
                  <div className="font-mono text-xs font-semibold text-[#095F76] dark:text-[#74B1C3]">RETRIEVED EVIDENCE</div>
                  <div className="text-[14px] text-[#475569] dark:text-[#CBD5E1]">3 relevant papers found discussing thermal stratification and nutrient availability.</div>
                </div>
                <div className="flex justify-start pl-4 text-[#095F76] dark:text-[#74B1C3]">&darr;</div>
                <div className="space-y-1">
                  <div className="font-mono text-xs font-semibold text-[#095F76] dark:text-[#74B1C3]">GENERATED ANSWER</div>
                  <div className="text-[14px] text-[#475569] dark:text-[#CBD5E1]">Synthesized summary of the delay in spring blooms due to increased stratification...</div>
                </div>
                <div className="flex justify-start pl-4 text-[#095F76] dark:text-[#74B1C3]">&darr;</div>
                <div className="space-y-1">
                  <div className="font-mono text-xs font-semibold text-[#095F76] dark:text-[#74B1C3]">CITATION</div>
                  <div className="text-[14px] text-[#475569] dark:text-[#CBD5E1]">[Smith et al., 2024; Oceanic Thermal Dynamics]</div>
                </div>
              </div>
              
              <p className="text-[15px] sm:text-[16px] text-[#475569] dark:text-[#CBD5E1] leading-relaxed pt-2">
                <strong className="text-[#2C2C2C] dark:text-[#F2F2F2]">The fix:</strong> Early on, the model would sometimes cite a paper for a claim it didn't actually support. I had to implement a strict secondary verification prompt, forcing Gemini to extract the exact quote from the context chunk before allowing the citation to render.
              </p>
            </div>

            {/* FINAL SOLUTION */}
            <div  className="space-y-6 scroll-mt-20 pt-8">
              <div className="space-y-4">
                <span className="font-mono text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#095F76] dark:text-[#74B1C3] block">
                  FINAL SOLUTION
                </span>
                <h3 className="text-[20px] sm:text-[22px] font-semibold text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                  A focused research assistant that lets scientists move from question to evidence-backed answer without leaving the research workflow.
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div className="space-y-3 p-5 rounded-sm border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#13151E]">
                  <h4 className="font-mono text-[13px] font-semibold text-[#ef4444] tracking-wider">BEFORE</h4>
                  <ul className="list-disc pl-4 space-y-2.5 text-[14.5px] text-[#475569] dark:text-[#CBD5E1] marker:text-[#ef4444]">
                    <li className="pl-1">Search across fragmented sources</li>
                    <li className="pl-1">Manually compare findings</li>
                    <li className="pl-1">Validate citations independently</li>
                    <li className="pl-1">Repeat searches to build context</li>
                  </ul>
                </div>
                <div className="space-y-3 p-5 rounded-sm border border-[#095F76]/30 dark:border-[#74B1C3]/30 bg-[#095F76]/[0.03] dark:bg-[#74B1C3]/[0.05]">
                  <h4 className="font-mono text-[13px] font-semibold text-[#10b981] tracking-wider">AFTER</h4>
                  <ul className="list-disc pl-4 space-y-2.5 text-[14.5px] text-[#475569] dark:text-[#CBD5E1] marker:text-[#10b981]">
                    <li className="pl-1">Ask one natural-language question</li>
                    <li className="pl-1">Retrieve relevant research</li>
                    <li className="pl-1">Receive a synthesized response</li>
                    <li className="pl-1">Inspect supporting citations</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* WHAT'S NEXT */}
            <div id="notes" className="space-y-4 scroll-mt-20 pt-8">
              <span className="font-mono text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#095F76] dark:text-[#74B1C3] block">
                WHAT'S NEXT
              </span>
              <h3 className="text-[20px] sm:text-[22px] font-semibold text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                Moving ORCA from an MVP research assistant toward a more rigorous scientific research tool.
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-[16px] sm:text-[16.5px] text-[#475569] dark:text-[#CBD5E1] marker:text-[#095F76] dark:marker:text-[#74B1C3] pt-2">
                <li className="pl-1">Spatial visualization of species migration and ecological patterns</li>
                <li className="pl-1">Direct analysis of acoustic, telemetry, and other scientific datasets</li>
                <li className="pl-1">Collaborative research environments for university teams</li>
              </ul>
            </div>

            {/* TAKEAWAYS */}
            <div  className="pt-8 space-y-5 scroll-mt-20">
              <div className="space-y-1">
                <span className="font-mono text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#095F76] dark:text-[#74B1C3] block">
                  TAKEAWAYS
                </span>
                <h3 className="text-[20px] sm:text-[22px] font-semibold text-[#2C2C2C] dark:text-[#F2F2F2] tracking-tight leading-snug">
                  Building ORCA taught me that trustworthy AI is less about the model alone and more about the systems built around it.
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="p-5 sm:p-6 rounded-sm border border-[#095F76] dark:border-[#74B1C3] bg-[#095F76]/[0.04] dark:bg-[#74B1C3]/[0.07] flex flex-col items-center text-center space-y-3 transition-colors hover:bg-[#095F76]/[0.08] dark:hover:bg-[#74B1C3]/[0.12]">
                  <div className="p-2 rounded-sm bg-[#095F76]/15 dark:bg-[#74B1C3]/20 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-[#095F76] dark:text-[#74B1C3]" strokeWidth={1.5} />
                  </div>
                  <h4 className="font-mono text-[13px] font-semibold text-[#095F76] dark:text-[#74B1C3] tracking-wider uppercase pt-1">Grounded citations</h4>
                  <p className="text-[14.5px] text-[#2C2C2C] dark:text-[#CBD5E1] leading-relaxed font-sans">
                    Trust in AI research tools depends on making evidence directly inspectable and preventing unsupported claims from being presented as fact.
                  </p>
                </div>

                <div className="p-5 sm:p-6 rounded-sm border border-[#095F76] dark:border-[#74B1C3] bg-[#095F76]/[0.04] dark:bg-[#74B1C3]/[0.07] flex flex-col items-center text-center space-y-3 transition-colors hover:bg-[#095F76]/[0.08] dark:hover:bg-[#74B1C3]/[0.12]">
                  <div className="p-2 rounded-sm bg-[#095F76]/15 dark:bg-[#74B1C3]/20 flex items-center justify-center">
                    <Layers className="w-5 h-5 text-[#095F76] dark:text-[#74B1C3]" strokeWidth={1.5} />
                  </div>
                  <h4 className="font-mono text-[13px] font-semibold text-[#095F76] dark:text-[#74B1C3] tracking-wider uppercase pt-1">Domain empathy</h4>
                  <p className="text-[14.5px] text-[#2C2C2C] dark:text-[#CBD5E1] leading-relaxed font-sans">
                    Designing for scientific specialists requires understanding how they search, interpret evidence, and validate findings - not simply adapting a generic chatbot interface.
                  </p>
                </div>

              </div>
            </div>
          </div>
        </article>

        <div className="pt-16 pb-6 flex items-center justify-between w-full">
          <Link
            href="/"
            onClick={() => playTone(880)}
            className="font-mono text-[13.5px] sm:text-[14px] text-[#095F76] dark:text-[#74B1C3] hover:underline underline-offset-4 font-medium flex items-center space-x-1 cursor-pointer"
          >
            <span>&larr; back to home</span>
          </Link>
          <Link
            href="/semantic"
            onClick={() => playTone(880)}
            className="font-mono text-[13.5px] sm:text-[14px] text-[#095F76] dark:text-[#74B1C3] hover:underline underline-offset-4 font-medium flex items-center space-x-1 cursor-pointer"
          >
            <span>next: Semantic Copilot &rarr;</span>
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
