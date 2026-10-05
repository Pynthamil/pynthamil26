"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { OrcaCardCover } from "@/components/OrcaCardCover";
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
              className="px-3.5 py-1.5 rounded-full border border-[#095F76]/30 dark:border-[#FFF0F5]/30 bg-[#095F76]/[0.06] dark:bg-[#FFF0F5]/[0.06] text-[#095F76] dark:text-[#FFF0F5] hover:bg-[#095F76]/[0.12] dark:hover:bg-[#FFF0F5]/[0.12] transition-all flex items-center space-x-1.5 font-mono text-[13px] sm:text-[13.5px] font-medium cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5 stroke-[2]" />
              <span>live demo</span>
            </a>
          </div>
        </header>

        <article className="space-y-6">
        {/* Project Header (Blog Style) */}
        <div className="space-y-6 mb-12">
          <div className="pb-5 text-center">
            <h1 className="instrument-serif text-[36px] sm:text-[42px] font-normal leading-tight text-[#2C2C2C] dark:text-[#F2F2F2] max-w-[800px] mx-auto">
              Turning complex marine-science questions into clear, source-backed answers.
            </h1>
            
          </div>
        </div>

          <div className="pb-2 space-y-3">
            <div className="w-full sm:w-[135%] sm:-ml-[17.5%] lg:w-[145%] lg:-ml-[22.5%] my-8 flex items-center justify-center px-0">
              <img
                src="/dashboard.svg"
                alt="orca.ai Solution Interface"
                className="w-full h-auto object-contain block select-none rounded-md sm:rounded-lg shadow-sm"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-4 pb-12">
              <div>
                <span className="font-mono text-[13px] sm:text-[14px] font-semibold text-[#095F76] dark:text-[#FFF0F5] block mb-1">
                  ROLE
                </span>
                <span className="text-[16px] sm:text-[17px] text-[#2C2C2C] dark:text-[#F2F2F2]">
                  Product Designer & Developer
                </span>
              </div>
              <div>
                <span className="font-mono text-[13px] sm:text-[14px] font-semibold text-[#095F76] dark:text-[#FFF0F5] block mb-1">
                  TIMELINE
                </span>
                <span className="text-[16px] sm:text-[17px] text-[#2C2C2C] dark:text-[#F2F2F2]">
                  Aug – Sep 2026
                </span>
              </div>
              <div>
                <span className="font-mono text-[13px] sm:text-[14px] font-semibold text-[#095F76] dark:text-[#FFF0F5] block mb-1">
                  SKILLS
                </span>
                <span className="text-[16px] sm:text-[17px] text-[#2C2C2C] dark:text-[#F2F2F2]">
                  AI/ML, Data Viz
                </span>
              </div>
              <div>
                <span className="font-mono text-[13px] sm:text-[14px] font-semibold text-[#095F76] dark:text-[#FFF0F5] block mb-1">
                  TOOLS
                </span>
                <span className="text-[16px] sm:text-[17px] text-[#2C2C2C] dark:text-[#F2F2F2]">
                  Figma, Next.js, Gemini
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-8 text-[16px] sm:text-[17.5px] text-[#2C2C2C] dark:text-[#F2F2F2] leading-[1.8] font-sans pt-1">
            
            {/* CONTEXT */}
            <div id="overview" className="space-y-4 scroll-mt-20 pt-6">
              <span className="font-mono text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#095F76] dark:text-[#FFF0F5] block">
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
              <a href="#solution" className="inline-flex items-center gap-2 font-mono text-[13px] sm:text-[14px] px-4 py-2 bg-[#141415] dark:bg-[#F2F2F2] text-white dark:text-[#141415] hover:bg-[#2C2C2C] dark:hover:bg-neutral-300 transition-all rounded-full shadow-sm group">
                Jump to Solution
                <span className="group-hover:translate-y-0.5 transition-transform">&darr;</span>
              </a>
            </div>

            {/* WIP BANNER */}
            <div className="w-full mt-4 mb-8 p-5 sm:p-6 border border-dashed border-[#095F76]/40 dark:border-[#FFF0F5]/40 bg-[#095F76]/[0.02] dark:bg-[#FFF0F5]/[0.04] rounded-none flex flex-col gap-2.5">
              <Lock className="w-4 h-4 text-[#095F76] dark:text-[#FFF0F5]" strokeWidth={2.5} />
              <p className="text-[14.5px] sm:text-[15.5px] text-[#475569] dark:text-[#CBD5E1] leading-relaxed">
                The full case study is still a work in progress. For a more detailed walkthrough beyond this preview, <a href="mailto:pavendanpynthamil@gmail.com" className="text-[#2C2C2C] dark:text-[#F2F2F2] hover:text-[#095F76] dark:hover:text-[#FFF0F5] underline decoration-wavy underline-offset-[5px] decoration-[#095F76] dark:decoration-[#FFF0F5] decoration-2 transition-colors">reach out</a> directly!
              </p>
            </div>

            {/* THE PROBLEM */}
            <div id="problem" className="space-y-5 scroll-mt-20 pt-8">
              <span className="font-mono text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#095F76] dark:text-[#FFF0F5] block">
                THE PROBLEM
              </span>
              <h3 className="text-[28px] sm:text-[32px] instrument-serif italic text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                Research is scattered across papers, datasets, and citations, making even simple questions difficult to verify.
              </h3>


              <div className="pt-2">
                <span className="font-mono text-[11px] sm:text-[12px] uppercase tracking-wider font-semibold text-[#475569] dark:text-[#CBD5E1] block mb-3">
                  Core Pain Points
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                  {painPoints.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white/70 dark:bg-[#141415]/90 border border-neutral-200 dark:border-[#FFF0F5]/20 rounded-xl aspect-square p-4 sm:p-5 flex flex-col items-center justify-center text-center space-y-3 transition-all hover:border-[#095F76] dark:hover:border-[#FFF0F5] shadow-[0_1px_2px_rgba(0,0,0,0.02)] cursor-default"
                  >
                    <div className="p-2 sm:p-3 rounded-xl bg-neutral-50 dark:bg-[#095F76]/10 flex items-center justify-center">
                      {item.icon}
                    </div>
                    <span className="font-mono text-[12px] sm:text-[13px] font-semibold tracking-tight text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                      {item.title}
                    </span>
                    
                  </div>
                ))}
                </div>
              </div>
            </div>

            {/* THE OPPORTUNITY */}
            <div className="scroll-mt-20 -mt-2">
              <div className="w-full sm:w-[115%] sm:-ml-[7.5%] px-6 py-8 sm:px-10 sm:py-16 rounded-[16px] sm:rounded-[24px] bg-[#F0F8FF] dark:bg-[#095F76]/[0.1] flex flex-col sm:flex-row items-start sm:items-center text-left gap-4 sm:gap-5 overflow-hidden">
                <img src="/laptop.svg" alt="Laptop" className="w-24 h-24 sm:w-40 sm:h-40 object-contain shrink-0" />
                <p className="text-[20px] sm:text-[26px] font-sans font-medium text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug z-10">
                  How might we make decades of marine research queryable in seconds without sacrificing the evidence researchers need to trust an answer?
                </p>
              </div>
            </div>


            {/* THE SOLUTION */}
            <div id="solution" className="space-y-6 scroll-mt-20 pt-8">
              <div className="space-y-4">
                <span className="font-mono text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#095F76] dark:text-[#FFF0F5] block">
                  THE SOLUTION
                </span>
                <h3 className="text-[28px] sm:text-[32px] instrument-serif italic text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                  A focused research assistant that lets scientists move from <span className="bg-[#FFF0F5] dark:bg-[#095F76] dark:text-white px-1 box-decoration-clone">question to evidence-backed answer</span> without leaving the research workflow.
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div className="space-y-3 p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#13151E]">
                  <h4 className="font-mono text-[13px] font-semibold text-[#ef4444] tracking-wider uppercase">BEFORE</h4>
                  <ul className="list-disc pl-4 space-y-2.5 text-[14.5px] text-[#475569] dark:text-[#CBD5E1] marker:text-[#ef4444]">
                    <li className="pl-1 hover:underline hover:decoration-wavy hover:underline-offset-[3px] decoration-[#ef4444]/40 dark:decoration-[#ef4444]/40 transition-all cursor-default">Search across fragmented sources</li>
                    <li className="pl-1 hover:underline hover:decoration-wavy hover:underline-offset-[3px] decoration-[#ef4444]/40 dark:decoration-[#ef4444]/40 transition-all cursor-default">Manually compare findings</li>
                    <li className="pl-1 hover:underline hover:decoration-wavy hover:underline-offset-[3px] decoration-[#ef4444]/40 dark:decoration-[#ef4444]/40 transition-all cursor-default">Validate citations independently</li>
                    <li className="pl-1 hover:underline hover:decoration-wavy hover:underline-offset-[3px] decoration-[#ef4444]/40 dark:decoration-[#ef4444]/40 transition-all cursor-default">Repeat searches to build context</li>
                  </ul>
                </div>
                <div className="space-y-3 p-5 rounded-xl border border-[#10b981]/20 dark:border-[#10b981]/20 bg-[#10b981]/[0.02] dark:bg-[#10b981]/[0.02]">
                  <h4 className="font-mono text-[13px] font-semibold text-[#10b981] tracking-wider uppercase">AFTER</h4>
                  <ul className="list-disc pl-4 space-y-2.5 text-[14.5px] text-[#475569] dark:text-[#CBD5E1] marker:text-[#10b981]">
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
                <span className="font-mono text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#095F76] dark:text-[#FFF0F5] block">
                  KEY FEATURE 1
                </span>
                <div className="space-y-1.5">
                  <h3 className="font-sans font-bold text-[28px] sm:text-[34px] md:text-[38px] text-[#2C2C2C] dark:text-[#F2F2F2] tracking-tight leading-tight">
                    Evidence-Backed Research Synthesis
                  </h3>
                  <p className="font-sans font-normal text-[15px] sm:text-[16.5px] text-[#64748B] dark:text-[#94A3B8] leading-relaxed">
                    ORCA transforms complex natural-language queries into clear, synthesized answers grounded directly in peer-reviewed literature with inspectable citations.
                  </p>
                </div>
              </div>

              <div className="w-[calc(100%+2rem)] -ml-[1rem] sm:w-[115%] sm:-ml-[7.5%] lg:w-[125%] lg:-ml-[12.5%] h-[340px] sm:h-[440px] md:h-[520px] overflow-hidden rounded-md sm:rounded-lg flex items-center justify-center relative bg-[#073543] group">
                {/* Temporary Custom Background Pattern */}
                <img 
                  src="/orca-bg-temp.png" 
                  alt="Background pattern" 
                  className="absolute inset-0 w-full h-full object-cover z-0"
                />

                {/* Cover Component */}
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                  <OrcaCardCover />
                </div>
              </div>
            </div>



            {/* THE APPROACH */}
            <div className="space-y-4 -mt-4">
              <h3 className="text-[28px] sm:text-[32px] instrument-serif italic text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                I designed ORCA around a simple principle: <span className="bg-[#FFF0F5] dark:bg-[#095F76] dark:text-white px-1 box-decoration-clone">AI should accelerate scientific research without hiding the evidence behind its answers.</span>
              </h3>
              <p className="text-[16px] sm:text-[17.5px] text-[#475569] dark:text-[#CBD5E1] leading-relaxed my-4">
                ORCA transforms natural-language questions into concise, source-backed responses by combining semantic retrieval with Gemini-powered synthesis and citation grounding.
              </p>
              <div className="py-6 flex justify-center items-center w-full bg-[#F7F7F7] dark:bg-[#141415] border border-neutral-200 dark:border-neutral-800 rounded-md">
                <span className="font-mono text-[12px] sm:text-sm font-semibold tracking-wider text-[#095F76] dark:text-[#FFF0F5] text-center px-4">
                  QUESTION &rarr; RETRIEVE &rarr; SYNTHESIZE &rarr; CITE
                </span>
              </div>
            </div>

            {/* BUILDING THE SYSTEM */}
            <div className="space-y-4 -mt-4">
              <h3 className="text-[28px] sm:text-[32px] instrument-serif italic text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                Connecting <span className="bg-[#FFF0F5] dark:bg-[#095F76] dark:text-white px-1 box-decoration-clone">retrieval, LLM reasoning, and citation grounding</span> into a single research workflow.
              </h3>
              
              <div className="p-6 bg-[#F7F7F7] dark:bg-[#141415] border border-neutral-200 dark:border-neutral-800 rounded-xl font-mono text-[13px] sm:text-sm text-center space-y-3 mt-4">
                <div className="font-medium text-[#2C2C2C] dark:text-[#F2F2F2]">Research Question</div>
                <div className="text-[#095F76] dark:text-[#FFF0F5]">&darr;</div>
                <div className="font-medium text-[#2C2C2C] dark:text-[#F2F2F2]">Query Processing</div>
                <div className="text-[#095F76] dark:text-[#FFF0F5]">&darr;</div>
                <div className="font-medium text-[#2C2C2C] dark:text-[#F2F2F2]">Semantic Retrieval</div>
                <div className="text-[#095F76] dark:text-[#FFF0F5]">&darr;</div>
                <div className="font-medium text-[#2C2C2C] dark:text-[#F2F2F2]">Relevant Research</div>
                <div className="text-[#095F76] dark:text-[#FFF0F5]">&darr;</div>
                <div className="font-medium text-[#2C2C2C] dark:text-[#F2F2F2]">Google Gemini</div>
                <div className="text-[#095F76] dark:text-[#FFF0F5]">&darr;</div>
                <div className="font-medium text-[#2C2C2C] dark:text-[#F2F2F2]">Citation Grounding</div>
                <div className="text-[#095F76] dark:text-[#FFF0F5]">&darr;</div>
                <div className="font-bold text-[#095F76] dark:text-[#FFF0F5]">Source-backed Answer</div>
              </div>
            </div>

            {/* THE INTERESTING PART */}
            <div className="space-y-4 -mt-4">
              <h3 className="text-[28px] sm:text-[32px] instrument-serif italic text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                The hardest problem wasn't getting Gemini to answer questions - it was <span className="bg-[#FFF0F5] dark:bg-[#095F76] dark:text-white px-1 box-decoration-clone">making those answers stay grounded in the research behind them.</span>
              </h3>
              <ul className="list-disc pl-5 space-y-3 text-[16px] sm:text-[17.5px] text-[#475569] dark:text-[#CBD5E1] pt-3 marker:text-[#095F76] dark:marker:text-[#FFF0F5]">
                <li className="pl-1 hover:underline hover:decoration-wavy hover:underline-offset-[3px] decoration-[#095F76]/40 dark:decoration-[#FFF0F5]/40 transition-all cursor-default"><strong className="font-medium text-[#2C2C2C] dark:text-[#F2F2F2]">Insufficient evidence:</strong> When the model lacks context, it must gracefully admit gaps rather than hallucinating facts.</li>
                <li className="pl-1 hover:underline hover:decoration-wavy hover:underline-offset-[3px] decoration-[#095F76]/40 dark:decoration-[#FFF0F5]/40 transition-all cursor-default"><strong className="font-medium text-[#2C2C2C] dark:text-[#F2F2F2]">Irrelevant retrieval:</strong> If retrieved sources aren't relevant, the system needs to filter them out before synthesis.</li>
                <li className="pl-1 hover:underline hover:decoration-wavy hover:underline-offset-[3px] decoration-[#095F76]/40 dark:decoration-[#FFF0F5]/40 transition-all cursor-default"><strong className="font-medium text-[#2C2C2C] dark:text-[#F2F2F2]">Claim matching:</strong> Every generated claim must explicitly match its source material.</li>
                <li className="pl-1 hover:underline hover:decoration-wavy hover:underline-offset-[3px] decoration-[#095F76]/40 dark:decoration-[#FFF0F5]/40 transition-all cursor-default"><strong className="font-medium text-[#2C2C2C] dark:text-[#F2F2F2]">Inspectable citations:</strong> Citations in the UI need to correspond to actual, retrievable evidence snippets the user can verify.</li>
              </ul>
            </div>

            {/* ITERATING ON ORCA */}
            <div className="space-y-5 -mt-4">
              <div className="space-y-4">
                <h3 className="text-[24px] sm:text-[28px] instrument-serif italic text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                  Testing real marine-science questions revealed where retrieval, synthesis, and citation grounding could break down.
                </h3>
              </div>
              
              <div className="bg-[#F7F7F7] dark:bg-[#141415] border border-neutral-200 dark:border-neutral-800 p-5 rounded-xl space-y-4 mt-2 text-center">
                <div className="space-y-1">
                  <div className="font-mono text-xs font-semibold text-[#095F76] dark:text-[#FFF0F5]">QUESTION</div>
                  <div className="text-[24px] sm:text-[26px] instrument-serif font-normal text-[#2C2C2C] dark:text-[#F2F2F2]">"How do temperature shifts affect phytoplankton blooms in the North Atlantic?"</div>
                </div>
                <div className="flex justify-center text-[#095F76] dark:text-[#FFF0F5]">&darr;</div>
                <div className="space-y-1">
                  <div className="font-mono text-xs font-semibold text-[#095F76] dark:text-[#FFF0F5]">RETRIEVED EVIDENCE</div>
                  <div className="text-[15.5px] sm:text-[17px] text-[#475569] dark:text-[#CBD5E1]">3 relevant papers found discussing thermal stratification and nutrient availability.</div>
                </div>
                <div className="flex justify-center text-[#095F76] dark:text-[#FFF0F5]">&darr;</div>
                <div className="space-y-1">
                  <div className="font-mono text-xs font-semibold text-[#095F76] dark:text-[#FFF0F5]">GENERATED ANSWER</div>
                  <div className="text-[15.5px] sm:text-[17px] text-[#475569] dark:text-[#CBD5E1]">Synthesized summary of the delay in spring blooms due to increased stratification...</div>
                </div>
                <div className="flex justify-center text-[#095F76] dark:text-[#FFF0F5]">&darr;</div>
                <div className="space-y-1">
                  <div className="font-mono text-xs font-semibold text-[#095F76] dark:text-[#FFF0F5]">CITATION</div>
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
              <ul className="list-disc pl-5 space-y-3 text-[16px] sm:text-[17.5px] text-[#475569] dark:text-[#CBD5E1] marker:text-[#095F76] dark:marker:text-[#FFF0F5] pt-2">
                <li className="pl-1 hover:underline hover:decoration-wavy hover:underline-offset-[3px] decoration-[#095F76]/40 dark:decoration-[#FFF0F5]/40 transition-all cursor-default">Spatial visualization of species migration and ecological patterns</li>
                <li className="pl-1 hover:underline hover:decoration-wavy hover:underline-offset-[3px] decoration-[#095F76]/40 dark:decoration-[#FFF0F5]/40 transition-all cursor-default">Direct analysis of acoustic, telemetry, and other scientific datasets</li>
                <li className="pl-1 hover:underline hover:decoration-wavy hover:underline-offset-[3px] decoration-[#095F76]/40 dark:decoration-[#FFF0F5]/40 transition-all cursor-default">Collaborative research environments for university teams</li>
              </ul>
            </div>



            {/* TAKEAWAYS */}
            <div id="takeaways" className="pt-8 space-y-5 scroll-mt-20">
              <div className="space-y-1">
                <span className="font-mono text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#095F76] dark:text-[#FFF0F5] block">
                  TAKEAWAYS
                </span>
                <h3 className="text-[28px] sm:text-[32px] instrument-serif italic text-[#2C2C2C] dark:text-[#F2F2F2] tracking-tight leading-snug">
                  Building ORCA taught me that <span className="bg-[#FFF0F5] dark:bg-[#095F76] dark:text-white px-1 box-decoration-clone">trustworthy AI is less about the model alone and more about the systems built around it.</span>
                </h3>
              </div>

              {/* 2-Column Takeaways Cards */}
              <div className="w-[calc(100%+2rem)] -ml-[1rem] sm:w-[115%] sm:-ml-[7.5%] px-4 sm:px-0 pt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {/* Card 1 */}
                  <div className="relative w-full h-full p-6 sm:p-8 rounded-[24px] sm:rounded-[32px] bg-[#F0F8FF] dark:bg-[#095F76]/[0.1] flex flex-col items-start justify-center text-left space-y-4 sm:space-y-6">
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
                  <div className="relative w-full h-full p-6 sm:p-8 rounded-[24px] sm:rounded-[32px] bg-[#F0F8FF] dark:bg-[#095F76]/[0.1] flex flex-col items-start justify-center text-left space-y-4 sm:space-y-6">
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
        
        {/* Thanks for reading block */}
        <div className="flex flex-col items-center justify-center w-full pt-16 pb-4 mt-16 border-t border-neutral-100 dark:border-neutral-800/60">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 text-[#095F76] dark:text-[#FFF0F5] hover:opacity-80 transition-opacity font-medium font-sans text-[15.5px]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
            <span className="underline underline-offset-4 decoration-2">Scroll Back to Top</span>
          </button>
        </div>

        </article>

        {/* WIP BANNER */}
        <div className="w-full mt-16 mb-4 p-5 sm:p-6 border border-dashed border-[#095F76]/40 dark:border-[#FFF0F5]/40 bg-[#095F76]/[0.02] dark:bg-[#FFF0F5]/[0.04] rounded-none flex flex-col gap-2.5">
          <Lock className="w-4 h-4 text-[#095F76] dark:text-[#FFF0F5]" strokeWidth={2.5} />
          <p className="text-[14.5px] sm:text-[15.5px] text-[#475569] dark:text-[#CBD5E1] leading-relaxed">
            The full case study is still a work in progress. For a more detailed walkthrough beyond this preview, <a href="mailto:pavendanpynthamil@gmail.com" className="text-[#2C2C2C] dark:text-[#F2F2F2] hover:text-[#095F76] dark:hover:text-[#FFF0F5] underline decoration-wavy underline-offset-[5px] decoration-[#095F76] dark:decoration-[#FFF0F5] decoration-2 transition-colors">reach out</a> directly!
          </p>
        </div>

        {/* Navigation Section */}
        <div className="pt-12 pb-12 w-full sm:w-[115%] sm:-ml-[7.5%] lg:w-[130%] lg:-ml-[15%] space-y-6">
          <div className="flex items-center justify-between w-full">
            <Link
              href="/semantic"
              onClick={() => playTone(880)}
              className="px-6 py-2.5 sm:px-7 sm:py-3 rounded-full border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#141415] hover:bg-neutral-100 dark:hover:bg-neutral-800 text-[#2C2C2C] dark:text-[#F2F2F2] transition-all font-sans font-medium text-[14px] sm:text-[15px] shadow-sm flex items-center space-x-2 cursor-pointer"
            >
              <span>&larr; Previous project</span>
            </Link>
            <Link
              href="/semantic"
              onClick={() => playTone(880)}
              className="px-6 py-2.5 sm:px-7 sm:py-3 rounded-full border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#141415] hover:bg-neutral-100 dark:hover:bg-neutral-800 text-[#2C2C2C] dark:text-[#F2F2F2] transition-all font-sans font-medium text-[14px] sm:text-[15px] shadow-sm flex items-center space-x-2 cursor-pointer"
            >
              <span>Next project &rarr;</span>
            </Link>
          </div>

          {/* Single Next Project Card */}
          <Link
            href="/semantic"
            onClick={() => playTone(880)}
            className="group relative block w-full rounded-[24px] overflow-hidden cursor-pointer hover:opacity-95 transition-opacity"
          >
            <img 
              src="/next-semantic.svg" 
              alt="Next Project - Semantic Email Copilot" 
              className="w-full h-auto block" 
            />
            <div className="absolute inset-0 p-6 sm:p-8 lg:p-10 flex flex-col justify-start max-w-[55%] sm:max-w-[48%] lg:max-w-[46%] space-y-2 pointer-events-none">
              <span className="font-mono text-[11px] sm:text-[12px] uppercase tracking-wider font-semibold text-[#6666FF]">
                NEXT PROJECT
              </span>
              <h3 className="font-sans font-medium text-[18px] sm:text-[24px] lg:text-[28px] text-[#2C2C2C] group-hover:text-[#6666FF] transition-colors leading-snug">
                Turning inbox chaos into structured tasks, deadlines, and context.
              </h3>
            </div>
          </Link>

          <Footer fullWidth={false} />
        </div>
      </main>
    </div>
  );
}
