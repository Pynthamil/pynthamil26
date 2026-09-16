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
    },
    {
      icon: <Search className="w-5 h-5 text-[#007FFF] dark:text-[#FFF0F5]" strokeWidth={1.5} />,
      title: "SCATTERED CITATIONS",
    },
    {
      icon: <Database className="w-5 h-5 text-[#007FFF] dark:text-[#FFF0F5]" strokeWidth={1.5} />,
      title: "RAW DATA SILOS",
    },
    {
      icon: <Compass className="w-5 h-5 text-[#007FFF] dark:text-[#FFF0F5]" strokeWidth={1.5} />,
      title: "DOMAIN BARRIERS",
    },
  ];

  const sidebarSections = [
    { id: "overview", label: "Overview" },
    { id: "problem", label: "Problem" },
    { id: "solution", label: "Solution" },
    { id: "takeaways", label: "Takeaways" },
  ];

  return (
    <div className="min-h-screen w-full flex flex-col justify-start items-center px-5 sm:px-8 md:px-12 pt-12 sm:pt-16 pb-24 selection:bg-cyan-100 dark:selection:bg-cyan-950">
      <ProjectSidebar sections={sidebarSections} playTone={playTone} />

      <div className="ambient-glow" />

      <main className="w-full relative z-10 flex flex-col max-w-[640px] animate-in fade-in duration-200">
        <header className="flex items-center justify-between w-full mb-8">
          <Link
            href="/"
            onClick={() => playTone(880)}
            className="font-mono text-[15px] sm:text-[15.5px] tracking-tight text-[#2C2C2C] dark:text-[#F2F2F2] hover:text-[#007FFF] dark:hover:text-[#FFF0F5] transition-colors flex items-center space-x-1.5 focus:outline-none font-medium cursor-pointer"
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
              className="inline-flex items-center space-x-2 px-2.5 py-1.5 sm:py-1 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-[#141415]/50 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors group cursor-pointer"
              title="View Source on GitHub"
            >
              <Github className="w-3.5 h-3.5 text-[#2C2C2C] dark:text-[#F2F2F2] group-hover:text-[#007FFF] dark:group-hover:text-[#FFF0F5] transition-colors" strokeWidth={2} />
              <span className="font-mono text-xs sm:text-[13px] text-[#2C2C2C] dark:text-[#F2F2F2] group-hover:text-[#007FFF] dark:group-hover:text-[#FFF0F5] font-medium tracking-tight transition-colors">
                repo
              </span>
            </a>

            <a
              href="https://orca-ai-iota.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playTone(1046)}
              className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-xl border border-[#007FFF] dark:border-[#FFF0F5] bg-[#007FFF]/[0.05] dark:bg-[#FFF0F5]/[0.08] hover:bg-[#007FFF]/[0.1] dark:hover:bg-[#FFF0F5]/[0.15] cursor-pointer group select-none transition-colors"
              title="Visit orca.ai"
            >
              <span className="font-mono text-xs sm:text-[13px] text-[#007FFF] dark:text-[#FFF0F5] font-medium tracking-tight">
                orca.ai
              </span>
              <div className="text-[#007FFF] dark:text-[#FFF0F5] flex items-center focus:outline-none transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12.5"
                  height="12.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="opacity-75 group-hover:opacity-100 transition-opacity"
                >
                  <path d="M7 17l9.2-9.2M17 17V7H7" />
                </svg>
              </div>
            </a>
            <button
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              className="p-1 text-[#2C2C2C] dark:text-[#F2F2F2] hover:text-[#007FFF] dark:hover:text-[#FFF0F5] transition-colors focus:outline-none cursor-pointer flex items-center justify-center"
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
              orca.ai
            </h1>
            <h3 className="text-[19px] sm:text-[21px] font-normal text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
              Building an AI research assistant that turns complex marine-science questions into clear, source-backed answers.
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-4 pb-12">
              <div>
                <span className="font-mono text-[13px] sm:text-[14px] font-semibold text-[#007FFF] dark:text-[#FFF0F5] block mb-1">
                  ROLE
                </span>
                <span className="text-[16px] sm:text-[17px] text-[#2C2C2C] dark:text-[#F2F2F2]">
                  Product Designer & Developer
                </span>
              </div>
              <div>
                <span className="font-mono text-[13px] sm:text-[14px] font-semibold text-[#007FFF] dark:text-[#FFF0F5] block mb-1">
                  TIMELINE
                </span>
                <span className="text-[16px] sm:text-[17px] text-[#2C2C2C] dark:text-[#F2F2F2]">
                  Aug 2026 - Present
                </span>
              </div>
              <div>
                <span className="font-mono text-[13px] sm:text-[14px] font-semibold text-[#007FFF] dark:text-[#FFF0F5] block mb-1">
                  SKILLS
                </span>
                <span className="text-[16px] sm:text-[17px] text-[#2C2C2C] dark:text-[#F2F2F2]">
                  AI/ML, Data Viz
                </span>
              </div>
              <div>
                <span className="font-mono text-[13px] sm:text-[14px] font-semibold text-[#007FFF] dark:text-[#FFF0F5] block mb-1">
                  TOOLS
                </span>
                <span className="text-[16px] sm:text-[17px] text-[#2C2C2C] dark:text-[#F2F2F2]">
                  Figma, Next.js, Gemini
                </span>
              </div>
            </div>
            
            <div className="w-[100vw] sm:w-[1024px] max-w-[100vw] relative left-1/2 -translate-x-1/2 my-10 flex items-center justify-center px-4 sm:px-0">
              <div className="w-full p-8 sm:p-12 md:p-16 rounded-2xl overflow-hidden flex items-center justify-center"
                style={{ backgroundImage: 'url(/cover1-bg.svg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="w-full max-w-[95%] overflow-hidden rounded-[24px] bg-white/20 dark:bg-white/10 p-3 sm:p-4 backdrop-blur-sm">
                  <div className="w-full overflow-hidden rounded-[16px] bg-white dark:bg-[#141415]">
                    <img
                      src="/orca1.svg"
                      alt="orca.ai Solution Interface"
                      className="w-full h-auto object-contain block select-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8 text-[16px] sm:text-[17.5px] text-[#2C2C2C] dark:text-[#F2F2F2] leading-[1.8] font-sans pt-1">
            
            {/* CONTEXT */}
            <div id="overview" className="space-y-4 scroll-mt-20 pt-6">
              <span className="font-mono text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#007FFF] dark:text-[#FFF0F5] block">
                OVERVIEW
              </span>
              <h3 className="text-[28px] sm:text-[32px] instrument-serif italic text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                Marine science is producing more research than researchers can realistically navigate manually.
              </h3>
              <p className="text-[16px] sm:text-[17.5px] text-[#475569] dark:text-[#CBD5E1] leading-relaxed my-4">
                Marine science generates vast amounts of research across papers, datasets, and observations. As this body of knowledge grows, researchers spend increasingly more time navigating fragmented sources and connecting evidence across them.
              </p>
            </div>

            <div className="pt-2 pb-2 flex">
              <a href="#solution" className="inline-flex items-center gap-2 font-mono text-[13px] sm:text-[14px] px-4 py-2 bg-[#141415] dark:bg-[#F2F2F2] text-white dark:text-[#141415] hover:bg-[#2C2C2C] dark:hover:bg-neutral-300 transition-all rounded-xl shadow-sm group">
                Jump to Solution
                <span className="group-hover:translate-y-0.5 transition-transform">&darr;</span>
              </a>
            </div>

            {/* WIP BANNER */}
            <div className="w-full mt-4 mb-8 p-5 sm:p-6 border border-dashed border-[#007FFF]/40 dark:border-[#FFF0F5]/40 bg-[#007FFF]/[0.02] dark:bg-[#FFF0F5]/[0.04] rounded-none flex flex-col gap-2.5">
              <Lock className="w-4 h-4 text-[#007FFF] dark:text-[#FFF0F5]" strokeWidth={2.5} />
              <p className="text-[14.5px] sm:text-[15.5px] text-[#475569] dark:text-[#CBD5E1] leading-relaxed">
                The full case study is still a work in progress. For a more detailed walkthrough beyond this preview, <a href="mailto:pavendanpynthamil@gmail.com" className="text-[#2C2C2C] dark:text-[#F2F2F2] hover:text-[#007FFF] dark:hover:text-[#FFF0F5] underline decoration-wavy underline-offset-[5px] decoration-[#007FFF] dark:decoration-[#FFF0F5] decoration-2 transition-colors">reach out</a> directly!
              </p>
            </div>

            {/* THE PROBLEM */}
            <div id="problem" className="space-y-5 scroll-mt-20 pt-8">
              <span className="font-mono text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#007FFF] dark:text-[#FFF0F5] block">
                THE PROBLEM
              </span>
              <h3 className="text-[28px] sm:text-[32px] instrument-serif italic text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                Research is scattered across papers, datasets, and citations, making even simple questions difficult to verify.
              </h3>
              <p className="text-[16px] sm:text-[17.5px] text-[#475569] dark:text-[#CBD5E1] leading-relaxed my-4">
                Researchers spend hours jumping between fragmented scientific sources, tracing citations, and manually checking whether findings actually support a conclusion. The information exists, but the lack of connected, verifiable evidence makes research slow and difficult to trust.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 pt-2">
                {painPoints.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white/70 dark:bg-[#141415]/90 border border-neutral-200 dark:border-[#FFF0F5]/20 rounded-xl p-3.5 sm:p-4 flex flex-col items-center justify-center text-center space-y-2.5 transition-all hover:border-[#007FFF] dark:hover:border-[#FFF0F5] shadow-[0_1px_2px_rgba(0,0,0,0.02)] cursor-default"
                  >
                    <div className="p-1 rounded-xl bg-neutral-50 dark:bg-[#007FFF]/10 flex items-center justify-center">
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
            <div className="scroll-mt-20 -mt-2">
              <div className="p-6 sm:p-8 rounded-xl border border-[#007FFF] dark:border-[#FFF0F5] bg-[#007FFF]/[0.05] dark:bg-[#FFF0F5]/[0.08] flex flex-col items-center justify-center text-center gap-3">
                <HelpCircle className="w-5 h-5 text-[#007FFF] dark:text-[#FFF0F5] shrink-0" strokeWidth={2} />
                <h3 className="text-[24px] sm:text-[28px] instrument-serif font-normal text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                  How might we make decades of marine research queryable in seconds without sacrificing the evidence researchers need to trust an answer?
                </h3>
              </div>
            </div>


            {/* THE SOLUTION */}
            <div id="solution" className="space-y-6 scroll-mt-20 pt-8">
              <div className="space-y-4">
                <span className="font-mono text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#007FFF] dark:text-[#FFF0F5] block">
                  THE SOLUTION
                </span>
                <h3 className="text-[28px] sm:text-[32px] instrument-serif italic text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                  A focused research assistant that lets scientists move from <span className="bg-[#FFF0F5] dark:bg-[#007FFF] dark:text-white px-1 box-decoration-clone">question to evidence-backed answer</span> without leaving the research workflow.
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div className="space-y-3 p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-[#F7F7F7] dark:bg-[#141415]">
                  <h4 className="font-mono text-[13px] font-semibold text-[#ef4444] tracking-wider">BEFORE</h4>
                  <ul className="list-disc pl-4 space-y-2.5 text-[14.5px] text-[#475569] dark:text-[#CBD5E1] marker:text-[#ef4444]">
                    <li className="pl-1 hover:underline hover:decoration-wavy hover:underline-offset-[3px] decoration-[#007FFF]/40 dark:decoration-[#FFF0F5]/40 transition-all cursor-default">Search across fragmented sources</li>
                    <li className="pl-1 hover:underline hover:decoration-wavy hover:underline-offset-[3px] decoration-[#007FFF]/40 dark:decoration-[#FFF0F5]/40 transition-all cursor-default">Manually compare findings</li>
                    <li className="pl-1 hover:underline hover:decoration-wavy hover:underline-offset-[3px] decoration-[#007FFF]/40 dark:decoration-[#FFF0F5]/40 transition-all cursor-default">Validate citations independently</li>
                    <li className="pl-1 hover:underline hover:decoration-wavy hover:underline-offset-[3px] decoration-[#007FFF]/40 dark:decoration-[#FFF0F5]/40 transition-all cursor-default">Repeat searches to build context</li>
                  </ul>
                </div>
                <div className="space-y-3 p-5 rounded-xl border border-[#007FFF]/30 dark:border-[#FFF0F5]/30 bg-[#007FFF]/[0.03] dark:bg-[#FFF0F5]/[0.05]">
                  <h4 className="font-mono text-[13px] font-semibold text-[#10b981] tracking-wider">AFTER</h4>
                  <ul className="list-disc pl-4 space-y-2.5 text-[14.5px] text-[#475569] dark:text-[#CBD5E1] marker:text-[#10b981]">
                    <li className="pl-1 hover:underline hover:decoration-wavy hover:underline-offset-[3px] decoration-[#007FFF]/40 dark:decoration-[#FFF0F5]/40 transition-all cursor-default">Ask one natural-language question</li>
                    <li className="pl-1 hover:underline hover:decoration-wavy hover:underline-offset-[3px] decoration-[#007FFF]/40 dark:decoration-[#FFF0F5]/40 transition-all cursor-default">Retrieve relevant research</li>
                    <li className="pl-1 hover:underline hover:decoration-wavy hover:underline-offset-[3px] decoration-[#007FFF]/40 dark:decoration-[#FFF0F5]/40 transition-all cursor-default">Receive a synthesized response</li>
                    <li className="pl-1 hover:underline hover:decoration-wavy hover:underline-offset-[3px] decoration-[#007FFF]/40 dark:decoration-[#FFF0F5]/40 transition-all cursor-default">Inspect supporting citations</li>
                  </ul>
                </div>
              </div>
              
              <div className="space-y-4 pt-10">
                <h3 className="text-[28px] sm:text-[32px] instrument-serif italic text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                  Designing a <span className="bg-[#FFF0F5] dark:bg-[#007FFF] dark:text-white px-1 box-decoration-clone">calm, focused interface</span> for complex scientific data.
                </h3>
                <p className="text-[16px] sm:text-[17.5px] text-[#475569] dark:text-[#CBD5E1] leading-relaxed my-4">
                  The visual language emphasizes clarity and minimal distraction, ensuring that dense research material remains accessible and easy to digest.
                </p>
              </div>

              <div className="w-[100vw] sm:w-[1024px] max-w-[100vw] relative left-1/2 -translate-x-1/2 flex flex-col gap-4 sm:gap-6 pt-6 pb-2 px-4 sm:px-0">
                <img src="/asset1.svg" alt="Orca Design Interface 1" className="w-full h-auto object-contain rounded-2xl" />
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <img src="/asset2.svg" alt="Orca Design Interface 2" className="w-full h-auto object-contain rounded-2xl" />
                  <img src="/asset3.svg" alt="Orca Design Components" className="w-full h-auto object-contain rounded-2xl" />
                </div>
              </div>
            </div>



            {/* THE APPROACH */}
            <div className="space-y-4 -mt-4">
              <h3 className="text-[28px] sm:text-[32px] instrument-serif italic text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                I designed ORCA around a simple principle: <span className="bg-[#FFF0F5] dark:bg-[#007FFF] dark:text-white px-1 box-decoration-clone">AI should accelerate scientific research without hiding the evidence behind its answers.</span>
              </h3>
              <p className="text-[16px] sm:text-[17.5px] text-[#475569] dark:text-[#CBD5E1] leading-relaxed my-4">
                ORCA transforms natural-language questions into concise, source-backed responses by combining semantic retrieval with Gemini-powered synthesis and citation grounding.
              </p>
              <div className="py-6 flex justify-center items-center w-full bg-[#F7F7F7] dark:bg-[#141415] border border-neutral-200 dark:border-neutral-800 rounded-xl">
                <span className="font-mono text-[12px] sm:text-sm font-semibold tracking-wider text-[#007FFF] dark:text-[#FFF0F5] text-center px-4">
                  QUESTION &rarr; RETRIEVE &rarr; SYNTHESIZE &rarr; CITE
                </span>
              </div>
            </div>

            {/* BUILDING THE SYSTEM */}
            <div className="space-y-4 -mt-4">
              <h3 className="text-[28px] sm:text-[32px] instrument-serif italic text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                Connecting <span className="bg-[#FFF0F5] dark:bg-[#007FFF] dark:text-white px-1 box-decoration-clone">retrieval, LLM reasoning, and citation grounding</span> into a single research workflow.
              </h3>
              
              <div className="p-6 bg-[#F7F7F7] dark:bg-[#141415] border border-neutral-200 dark:border-neutral-800 rounded-xl font-mono text-[13px] sm:text-sm text-center space-y-3 mt-4">
                <div className="font-medium text-[#2C2C2C] dark:text-[#F2F2F2]">Research Question</div>
                <div className="text-[#007FFF] dark:text-[#FFF0F5]">&darr;</div>
                <div className="font-medium text-[#2C2C2C] dark:text-[#F2F2F2]">Query Processing</div>
                <div className="text-[#007FFF] dark:text-[#FFF0F5]">&darr;</div>
                <div className="font-medium text-[#2C2C2C] dark:text-[#F2F2F2]">Semantic Retrieval</div>
                <div className="text-[#007FFF] dark:text-[#FFF0F5]">&darr;</div>
                <div className="font-medium text-[#2C2C2C] dark:text-[#F2F2F2]">Relevant Research</div>
                <div className="text-[#007FFF] dark:text-[#FFF0F5]">&darr;</div>
                <div className="font-medium text-[#2C2C2C] dark:text-[#F2F2F2]">Google Gemini</div>
                <div className="text-[#007FFF] dark:text-[#FFF0F5]">&darr;</div>
                <div className="font-medium text-[#2C2C2C] dark:text-[#F2F2F2]">Citation Grounding</div>
                <div className="text-[#007FFF] dark:text-[#FFF0F5]">&darr;</div>
                <div className="font-bold text-[#007FFF] dark:text-[#FFF0F5]">Source-backed Answer</div>
              </div>
            </div>

            {/* THE INTERESTING PART */}
            <div className="space-y-4 -mt-4">
              <h3 className="text-[28px] sm:text-[32px] instrument-serif italic text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                The hardest problem wasn't getting Gemini to answer questions - it was <span className="bg-[#FFF0F5] dark:bg-[#007FFF] dark:text-white px-1 box-decoration-clone">making those answers stay grounded in the research behind them.</span>
              </h3>
              <ul className="list-disc pl-5 space-y-3 text-[16px] sm:text-[17.5px] text-[#475569] dark:text-[#CBD5E1] pt-3 marker:text-[#007FFF] dark:marker:text-[#FFF0F5]">
                <li className="pl-1 hover:underline hover:decoration-wavy hover:underline-offset-[3px] decoration-[#007FFF]/40 dark:decoration-[#FFF0F5]/40 transition-all cursor-default"><strong className="font-medium text-[#2C2C2C] dark:text-[#F2F2F2]">Insufficient evidence:</strong> When the model lacks context, it must gracefully admit gaps rather than hallucinating facts.</li>
                <li className="pl-1 hover:underline hover:decoration-wavy hover:underline-offset-[3px] decoration-[#007FFF]/40 dark:decoration-[#FFF0F5]/40 transition-all cursor-default"><strong className="font-medium text-[#2C2C2C] dark:text-[#F2F2F2]">Irrelevant retrieval:</strong> If retrieved sources aren't relevant, the system needs to filter them out before synthesis.</li>
                <li className="pl-1 hover:underline hover:decoration-wavy hover:underline-offset-[3px] decoration-[#007FFF]/40 dark:decoration-[#FFF0F5]/40 transition-all cursor-default"><strong className="font-medium text-[#2C2C2C] dark:text-[#F2F2F2]">Claim matching:</strong> Every generated claim must explicitly match its source material.</li>
                <li className="pl-1 hover:underline hover:decoration-wavy hover:underline-offset-[3px] decoration-[#007FFF]/40 dark:decoration-[#FFF0F5]/40 transition-all cursor-default"><strong className="font-medium text-[#2C2C2C] dark:text-[#F2F2F2]">Inspectable citations:</strong> Citations in the UI need to correspond to actual, retrievable evidence snippets the user can verify.</li>
              </ul>
            </div>

            {/* ITERATING ON ORCA */}
            <div className="space-y-5 -mt-4">
              <div className="space-y-4">
                <h3 className="text-[28px] sm:text-[32px] instrument-serif italic text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                  Testing real marine-science questions revealed where retrieval, synthesis, and citation grounding could break down.
                </h3>
              </div>
              
              <div className="bg-[#F7F7F7] dark:bg-[#141415] border border-neutral-200 dark:border-neutral-800 p-5 rounded-xl space-y-4 mt-2 text-center">
                <div className="space-y-1">
                  <div className="font-mono text-xs font-semibold text-[#007FFF] dark:text-[#FFF0F5]">QUESTION</div>
                  <div className="text-[24px] sm:text-[26px] instrument-serif font-normal text-[#2C2C2C] dark:text-[#F2F2F2]">"How do temperature shifts affect phytoplankton blooms in the North Atlantic?"</div>
                </div>
                <div className="flex justify-center text-[#007FFF] dark:text-[#FFF0F5]">&darr;</div>
                <div className="space-y-1">
                  <div className="font-mono text-xs font-semibold text-[#007FFF] dark:text-[#FFF0F5]">RETRIEVED EVIDENCE</div>
                  <div className="text-[15.5px] sm:text-[17px] text-[#475569] dark:text-[#CBD5E1]">3 relevant papers found discussing thermal stratification and nutrient availability.</div>
                </div>
                <div className="flex justify-center text-[#007FFF] dark:text-[#FFF0F5]">&darr;</div>
                <div className="space-y-1">
                  <div className="font-mono text-xs font-semibold text-[#007FFF] dark:text-[#FFF0F5]">GENERATED ANSWER</div>
                  <div className="text-[15.5px] sm:text-[17px] text-[#475569] dark:text-[#CBD5E1]">Synthesized summary of the delay in spring blooms due to increased stratification...</div>
                </div>
                <div className="flex justify-center text-[#007FFF] dark:text-[#FFF0F5]">&darr;</div>
                <div className="space-y-1">
                  <div className="font-mono text-xs font-semibold text-[#007FFF] dark:text-[#FFF0F5]">CITATION</div>
                  <div className="text-[15.5px] sm:text-[17px] text-[#475569] dark:text-[#CBD5E1]">[Smith et al., 2024; Oceanic Thermal Dynamics]</div>
                </div>
              </div>
              
              <p className="text-[16px] sm:text-[17.5px] text-[#475569] dark:text-[#CBD5E1] leading-relaxed pt-2">
                <strong className="text-[#2C2C2C] dark:text-[#F2F2F2]">The fix:</strong> Early on, the model would sometimes cite a paper for a claim it didn't actually support. I had to implement a strict secondary verification prompt, forcing Gemini to extract the exact quote from the context chunk before allowing the citation to render.
              </p>
            </div>

            {/* WHAT'S NEXT */}
            <div className="space-y-4 -mt-4">
              <h3 className="text-[28px] sm:text-[32px] instrument-serif italic text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                Moving ORCA from an MVP research assistant toward a more rigorous scientific research tool.
              </h3>
              <ul className="list-disc pl-5 space-y-3 text-[16px] sm:text-[17.5px] text-[#475569] dark:text-[#CBD5E1] marker:text-[#007FFF] dark:marker:text-[#FFF0F5] pt-2">
                <li className="pl-1 hover:underline hover:decoration-wavy hover:underline-offset-[3px] decoration-[#007FFF]/40 dark:decoration-[#FFF0F5]/40 transition-all cursor-default">Spatial visualization of species migration and ecological patterns</li>
                <li className="pl-1 hover:underline hover:decoration-wavy hover:underline-offset-[3px] decoration-[#007FFF]/40 dark:decoration-[#FFF0F5]/40 transition-all cursor-default">Direct analysis of acoustic, telemetry, and other scientific datasets</li>
                <li className="pl-1 hover:underline hover:decoration-wavy hover:underline-offset-[3px] decoration-[#007FFF]/40 dark:decoration-[#FFF0F5]/40 transition-all cursor-default">Collaborative research environments for university teams</li>
              </ul>
            </div>



            {/* TAKEAWAYS */}
            <div id="takeaways" className="pt-8 space-y-5 scroll-mt-20">
              <div className="space-y-1">
                <span className="font-mono text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#007FFF] dark:text-[#FFF0F5] block">
                  TAKEAWAYS
                </span>
                <h3 className="text-[28px] sm:text-[32px] instrument-serif italic text-[#2C2C2C] dark:text-[#F2F2F2] tracking-tight leading-snug">
                  Building ORCA taught me that <span className="bg-[#FFF0F5] dark:bg-[#007FFF] dark:text-white px-1 box-decoration-clone">trustworthy AI is less about the model alone and more about the systems built around it.</span>
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="p-5 sm:p-6 rounded-xl border border-[#007FFF] dark:border-[#FFF0F5] bg-[#007FFF]/[0.04] dark:bg-[#FFF0F5]/[0.07] flex flex-col items-center text-center space-y-3 transition-colors hover:bg-[#007FFF]/[0.08] dark:hover:bg-[#FFF0F5]/[0.12]">
                  <div className="p-2 rounded-xl bg-[#007FFF]/15 dark:bg-[#FFF0F5]/20 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-[#007FFF] dark:text-[#FFF0F5]" strokeWidth={1.5} />
                  </div>
                  <h4 className="instrument-serif text-[22px] sm:text-[24px] text-[#007FFF] dark:text-[#FFF0F5] uppercase pt-1">Grounded citations</h4>
                  <p className="text-[14.5px] text-[#2C2C2C] dark:text-[#CBD5E1] leading-relaxed font-sans">
                    Trust in AI research tools depends on making evidence directly inspectable and preventing unsupported claims from being presented as fact.
                  </p>
                </div>

                <div className="p-5 sm:p-6 rounded-xl border border-[#007FFF] dark:border-[#FFF0F5] bg-[#007FFF]/[0.04] dark:bg-[#FFF0F5]/[0.07] flex flex-col items-center text-center space-y-3 transition-colors hover:bg-[#007FFF]/[0.08] dark:hover:bg-[#FFF0F5]/[0.12]">
                  <div className="p-2 rounded-xl bg-[#007FFF]/15 dark:bg-[#FFF0F5]/20 flex items-center justify-center">
                    <Layers className="w-5 h-5 text-[#007FFF] dark:text-[#FFF0F5]" strokeWidth={1.5} />
                  </div>
                  <h4 className="instrument-serif text-[22px] sm:text-[24px] text-[#007FFF] dark:text-[#FFF0F5] uppercase pt-1">Domain empathy</h4>
                  <p className="text-[14.5px] text-[#2C2C2C] dark:text-[#CBD5E1] leading-relaxed font-sans">
                    Designing for scientific specialists requires understanding how they search, interpret evidence, and validate findings - not simply adapting a generic chatbot interface.
                  </p>
                </div>

              </div>
            </div>
          </div>
        
        {/* Thanks for reading block */}
        <div className="flex flex-col items-center justify-center w-full pt-20 pb-4 mt-16 border-t border-neutral-100 dark:border-neutral-800/60">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 text-[#007FFF] dark:text-[#FFF0F5] hover:opacity-80 transition-opacity mb-8 font-medium font-sans text-[15.5px]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
            <span className="underline underline-offset-4 decoration-2">Scroll Back to Top</span>
          </button>
          
          <h2 className="text-[48px] sm:text-[56px] instrument-serif font-normal text-[#2C2C2C] dark:text-[#F2F2F2] mb-12 tracking-tight">
            Thanks for reading!
          </h2>

          <div className="flex items-center justify-center">
            <img src="/back.svg" alt="Thanks" className="w-[180px] sm:w-[200px] h-auto object-contain opacity-90 drop-shadow-sm" />
          </div>
          
          
        </div>

        </article>

        {/* WIP BANNER */}
        <div className="w-full mt-16 mb-4 p-5 sm:p-6 border border-dashed border-[#007FFF]/40 dark:border-[#FFF0F5]/40 bg-[#007FFF]/[0.02] dark:bg-[#FFF0F5]/[0.04] rounded-none flex flex-col gap-2.5">
          <Lock className="w-4 h-4 text-[#007FFF] dark:text-[#FFF0F5]" strokeWidth={2.5} />
          <p className="text-[14.5px] sm:text-[15.5px] text-[#475569] dark:text-[#CBD5E1] leading-relaxed">
            The full case study is still a work in progress. For a more detailed walkthrough beyond this preview, <a href="mailto:pavendanpynthamil@gmail.com" className="text-[#2C2C2C] dark:text-[#F2F2F2] hover:text-[#007FFF] dark:hover:text-[#FFF0F5] underline decoration-wavy underline-offset-[5px] decoration-[#007FFF] dark:decoration-[#FFF0F5] decoration-2 transition-colors">reach out</a> directly!
          </p>
        </div>

        <div className="pt-16 pb-6 flex items-center justify-between w-full">
          <Link
            href="/"
            onClick={() => playTone(880)}
            className="font-mono text-[13.5px] sm:text-[14px] text-[#007FFF] dark:text-[#FFF0F5] hover:underline underline-offset-4 font-medium flex items-center space-x-1 cursor-pointer"
          >
            <span>&larr; back to home</span>
          </Link>
          <Link
            href="/semantic"
            onClick={() => playTone(880)}
            className="font-mono text-[13.5px] sm:text-[14px] text-[#007FFF] dark:text-[#FFF0F5] hover:underline underline-offset-4 font-medium flex items-center space-x-1 cursor-pointer"
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
