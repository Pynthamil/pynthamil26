"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Inbox,
  Search,
  CheckSquare,
  Split,
  HelpCircle,
  Sparkles,
  Layers,
  Moon,
  Sun,
  ArrowDown, ChevronDown,
  Figma,
  ExternalLink,
  Asterisk,
  Network,
  Link2,
  LayoutDashboard
} from "lucide-react";
import { ChromaVideo } from "@/components/ChromaVideo";
import { PersonaShowcase } from "@/components/PersonaShowcase";
import { ProjectSidebar } from "@/components/ProjectSidebar";

export default function SemanticProjectPage() {
  const [soundOn, setSoundOn] = useState<boolean>(true);
  const [activeProcess, setActiveProcess] = useState<number>(0);

  const processSteps = [
    {
      title: "I started with the wrong question",
      content: (
        <>
          I initially approached the problem as: <span className="bg-[#EBEBFF] dark:bg-[#6666FF]/20 px-1 py-0.5 rounded text-[#2C2C2C] dark:text-[#F2F2F2]">How can AI make email faster?</span> But the more I explored the workflow, the more I realized speed wasn't the real issue. Users were spending mental energy figuring out what an email meant, what needed action, and what to remember.
        </>
      ),
    },
    {
      title: "Exploring the possibilities",
      content: (
        <>
          I explored different ways Semantic could exist within an email workflow. The challenge was making the intelligence accessible without turning it into another interface users had to manage.
        </>
      ),
    },
    {
      title: "Learning through iteration",
      content: (
        <div className="flex flex-col gap-4">
          <span>My first explorations tried to expose everything Semantic understood. That made the interface feel intelligent—but also overwhelming. I gradually reduced the amount of information shown by default and prioritized what users could actually act on.</span>
        </div>
      ),
    }
  ];
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
      icon: <Inbox className="w-5 h-5 text-[#6666FF] dark:text-[#8888FF]" strokeWidth={1.5} />,
      title: "INBOX OVERLOAD",
      desc: "High-volume noise obscures critical signals",
    },
    {
      icon: <Search className="w-5 h-5 text-[#6666FF] dark:text-[#8888FF]" strokeWidth={1.5} />,
      title: "LOST CONTEXT",
      desc: "Decisions scattered across long threads",
    },
    {
      icon: <CheckSquare className="w-5 h-5 text-[#6666FF] dark:text-[#8888FF]" strokeWidth={1.5} />,
      title: "BURIED ACTIONS",
      desc: "Tasks forgotten once marked read",
    },
    {
      icon: <Split className="w-5 h-5 text-[#6666FF] dark:text-[#8888FF]" strokeWidth={1.5} />,
      title: "FRAGMENTED TOOLS",
      desc: "Manual tracking across external apps",
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
    <div className="min-h-screen w-full flex flex-col justify-start items-center px-5 sm:px-8 md:px-12 pt-12 sm:pt-16 pb-24 selection:bg-indigo-100 dark:selection:bg-indigo-950">
      {/* Table of Contents Floating Sidebar */}
      <ProjectSidebar sections={sidebarSections} playTone={playTone} />

      {/* Soft atmospheric ambient glow */}
      <div className="ambient-glow" />

      {/* Main Container */}
      <main className="w-full relative z-10 flex flex-col max-w-[640px] animate-in fade-in duration-200">
        {/* Top Navigation */}
        <header className="flex items-center justify-between w-full mb-8">
          <Link
            href="/"
            onClick={() => playTone(880)}
            className="font-mono text-[15px] sm:text-[15.5px] tracking-tight text-[#2C2C2C] dark:text-[#F2F2F2] hover:text-[#6666FF] dark:hover:text-[#8888FF] transition-colors flex items-center space-x-1.5 focus:outline-none font-medium cursor-pointer"
          >
            <span>&larr;</span>
            <span>home</span>
          </Link>

          <div className="flex items-center space-x-3.5">
            <a
              href="https://www.figma.com/design/jFmjS9SneDaQNfBDHSOepV/mote?node-id=1-3&t=u4M4Lf67dlZ5hgzu-1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-xl border border-[#6666FF] dark:border-[#8888FF] bg-[#6666FF]/[0.05] dark:bg-[#8888FF]/[0.08] hover:bg-[#6666FF]/[0.1] dark:hover:bg-[#8888FF]/[0.15] cursor-pointer group select-none transition-colors"
              title="View Design in Figma"
            >
              <span className="font-mono text-xs sm:text-[13px] text-[#6666FF] dark:text-[#8888FF] font-medium tracking-tight">
                figma
              </span>
              <div className="text-[#6666FF] dark:text-[#8888FF] flex items-center opacity-75 group-hover:opacity-100 transition-opacity">
                <Figma className="w-3.5 h-3.5" strokeWidth={2.5} />
              </div>
            </a>
            <button
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              className="p-1 text-[#2C2C2C] dark:text-[#F2F2F2] hover:text-[#6666FF] dark:hover:text-[#8888FF] transition-colors focus:outline-none cursor-pointer flex items-center justify-center"
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
            <h1 className="instrument-serif text-[48px] sm:text-[56px] font-normal leading-tight text-[#2C2C2C] dark:text-[#F2F2F2]">
              Semantic Email Copilot
            </h1>
            <p className="text-[16px] sm:text-[17.5px] text-[#475569] dark:text-[#CBD5E1] leading-relaxed">
              Turning inbox chaos into structured tasks, deadlines, and context.
            </p>

            {/* 4-Column Metadata Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-4 pb-12">
              <div>
                <span className="font-mono text-[13px] sm:text-[14px] font-semibold text-[#6666FF] dark:text-[#8888FF] block mb-1">
                  ROLE
                </span>
                <span className="text-[16px] sm:text-[17px] text-[#2C2C2C] dark:text-[#F2F2F2]">
                  Product Designer
                </span>
              </div>
              <div>
                <span className="font-mono text-[13px] sm:text-[14px] font-semibold text-[#6666FF] dark:text-[#8888FF] block mb-1">
                  TIMELINE
                </span>
                <span className="text-[16px] sm:text-[17px] text-[#2C2C2C] dark:text-[#F2F2F2]">
                  Aug 2026
                </span>
              </div>
              <div>
                <span className="font-mono text-[13px] sm:text-[14px] font-semibold text-[#6666FF] dark:text-[#8888FF] block mb-1">
                  SKILLS
                </span>
                <span className="text-[16px] sm:text-[17px] text-[#2C2C2C] dark:text-[#F2F2F2]">
                  AI UX, Systems
                </span>
              </div>
              <div>
                <span className="font-mono text-[13px] sm:text-[14px] font-semibold text-[#6666FF] dark:text-[#8888FF] block mb-1">
                  TOOLS
                </span>
                <span className="text-[16px] sm:text-[17px] text-[#2C2C2C] dark:text-[#F2F2F2]">
                  Figma
                </span>
              </div>
            </div>
            
            <div  className="w-[100vw] sm:w-[1024px] max-w-[100vw] relative left-1/2 -translate-x-1/2 my-10 flex items-center justify-center px-4 sm:px-0">
              <div  className="w-full p-8 sm:p-12 md:p-16 rounded-2xl overflow-hidden flex items-center justify-center"
                style={{ backgroundImage: 'url(/asset2.1.svg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="w-full overflow-hidden flex items-center justify-center">
                  <img
                    src="/semantic1.svg"
                    alt="Semantic Email Copilot Banner"
                    className="w-auto h-[60vh] sm:h-[75vh] max-h-[850px] object-contain block select-none bg-transparent my-4 mx-auto"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Case Study Content */}
          <div className="space-y-8 text-[16px] sm:text-[17.5px] text-[#2C2C2C] dark:text-[#F2F2F2] leading-[1.8] font-sans pt-1">
            {/* Overview / Context */}
            <div id="overview" className="space-y-4 scroll-mt-20">
              <div className="space-y-1.5 pt-2">
                <span className="font-mono text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#6666FF] dark:text-[#8888FF] block">
                  OVERVIEW
                </span>
                <p className="text-[28px] sm:text-[32px] instrument-serif italic text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                  Our inboxes store information, but fail to turn it into meaningful action.
                </p>
              </div>
              <p>
                Semantic Email Copilot is a lightweight intelligence layer that transforms chaotic inbox threads into structured tasks, deadlines, and context.
              </p>

              {/* Context Actions */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button
                  onClick={() => {
                    playTone(880);
                    document.getElementById('solution')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-3 sm:px-8 sm:py-3.5 rounded-full bg-[#141415] dark:bg-white text-white dark:text-[#141415] hover:bg-[#2C2C2C] dark:hover:bg-neutral-200 transition-colors font-medium text-[15px] sm:text-[16px] shadow-sm flex items-center space-x-2.5"
                >
                  <span>Jump to Solution</span>
                  <ArrowDown className="w-5 h-5" />
                </button>
                <a
                  href="https://www.figma.com/design/jFmjS9SneDaQNfBDHSOepV/mote?node-id=1-3&t=u4M4Lf67dlZ5hgzu-1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 sm:px-8 sm:py-3.5 rounded-full border border-neutral-300 dark:border-neutral-700 hover:border-[#6666FF] dark:hover:border-[#8888FF] text-[#475569] dark:text-[#CBD5E1] hover:text-[#6666FF] dark:hover:text-[#8888FF] transition-colors font-medium text-[15px] sm:text-[16px] flex items-center space-x-2.5"
                >
                  <span>View in Figma</span>
                  <Figma className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* The Problem Section */}
            <div id="problem" className="pt-8 space-y-5 scroll-mt-20">
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <span className="font-mono text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#6666FF] dark:text-[#8888FF] block">
                    THE PROBLEM
                  </span>
                  <p className="text-[28px] sm:text-[32px] instrument-serif italic text-[#2C2C2C] dark:text-[#F2F2F2] tracking-tight leading-snug">
                    Email is full of tasks, deadlines, and commitments, but inboxes bury them in clutter, making it <span className="bg-[#6666FF]/15 dark:bg-[#8888FF]/20 px-1">easy to lose track of what matters.</span>
                  </p>
                </div>
                <p className="text-[16px] sm:text-[17.5px] text-[#475569] dark:text-[#CBD5E1] leading-relaxed">
                  When managing high-volume communication, critical action items frequently get lost in long threads or buried under low-signal newsletters. Without a reliable way to extract and track these commitments, users are forced to rely on memory or manual note-taking, leading to dropped balls and constant cognitive overload.
                </p>
              </div>

              {/* Pain Points Boxed Row */}
              <div className="pt-2 space-y-3 scroll-mt-20">


                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
                  {painPoints.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-white/70 dark:bg-[#141415]/90 border border-neutral-200 dark:border-[#8888FF]/20 rounded-xl p-3.5 sm:p-4 flex flex-col items-center justify-center text-center space-y-2.5 transition-all hover:border-[#6666FF] dark:hover:border-[#8888FF] shadow-[0_1px_2px_rgba(0,0,0,0.02)] cursor-default"
                    >
                      <div className="p-1 rounded-xl bg-neutral-50 dark:bg-[#6666FF]/10 flex items-center justify-center">
                        {item.icon}
                      </div>
                      <span className="font-mono text-[10.5px] sm:text-[11px] font-semibold tracking-tight text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                        {item.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* How Might We Callout Box */}
              <div className="w-[100vw] sm:w-[800px] max-w-[100vw] relative left-1/2 -translate-x-1/2 px-6 py-10 sm:px-10 sm:py-16 rounded-[16px] sm:rounded-[24px] bg-[#E6E6FF] dark:bg-[#8888FF]/[0.1] flex flex-row items-center text-left gap-4 sm:gap-5 overflow-hidden">
                <img src="/laptop.svg" alt="Laptop" className="w-28 h-28 sm:w-40 sm:h-40 object-contain shrink-0" />
                <p className="text-[20px] sm:text-[26px] font-sans font-medium text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug z-10">
                  How might we transform email from an overwhelming backlog into an intelligent copilot that turns incoming communication into actionable clarity?
                </p>
              </div>
            </div>

            {/* Research & Discovery Section */}
            <div id="research" className="pt-8 space-y-4 scroll-mt-20">
              <div className="space-y-1.5">
                <span className="font-mono text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#6666FF] dark:text-[#8888FF] block">
                  RESEARCH &amp; DISCOVERY
                </span>
                <h2 className="text-[28px] sm:text-[32px] instrument-serif italic text-[#2C2C2C] dark:text-[#F2F2F2] tracking-tight">
                  Understanding high-volume inbox workflows
                </h2>
                <p className="text-[16px] sm:text-[17.5px] text-[#475569] dark:text-[#CBD5E1] leading-relaxed pt-0.5">
                  My discovery process involved analyzing real student and faculty workflows across dozens of active inboxes. Over 75% of cognitive overload stemmed from low-signal emails masking high-priority action items, urgent deadlines, and essential follow-ups.
                </p>
              </div>

              {/* User Persona Showcase */}
              <div className="pt-2">
                <PersonaShowcase playTone={playTone} />
              </div>
            </div>

            {/* The Solution Section */}
            <div id="solution" className="pt-8 space-y-6 scroll-mt-20">
              <div className="space-y-3.5">
                <div className="space-y-1.5">
                  <span className="font-mono text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#6666FF] dark:text-[#8888FF] block">
                    THE SOLUTION
                  </span>
                  <h2 className="text-[28px] sm:text-[32px] instrument-serif italic text-[#2C2C2C] dark:text-[#F2F2F2] tracking-tight">
                    Designing an intelligence layer that turns unstructured email into clear, actionable context
                  </h2>

                </div>

                {/* BEFORE / AFTER BLOCK */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 my-16">
                  {/* BEFORE */}
                  <div className="space-y-3 p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#13151E]">
                    <h4 className="font-mono text-xs sm:text-[13px] font-semibold text-[#ef4444] tracking-wider uppercase">BEFORE</h4>
                    <ul className="list-disc pl-4 space-y-2.5 text-[14.5px] sm:text-[15.5px] text-[#475569] dark:text-[#CBD5E1] marker:text-[#ef4444]">
                      <li className="pl-1 hover:underline hover:decoration-wavy hover:underline-offset-[3px] decoration-[#ef4444]/40 dark:decoration-[#ef4444]/40 transition-all cursor-default">Reading through every long email thread</li>
                      <li className="pl-1 hover:underline hover:decoration-wavy hover:underline-offset-[3px] decoration-[#ef4444]/40 dark:decoration-[#ef4444]/40 transition-all cursor-default">Losing track of scattered deadlines</li>
                      <li className="pl-1 hover:underline hover:decoration-wavy hover:underline-offset-[3px] decoration-[#ef4444]/40 dark:decoration-[#ef4444]/40 transition-all cursor-default">Missing buried action items</li>
                      <li className="pl-1 hover:underline hover:decoration-wavy hover:underline-offset-[3px] decoration-[#ef4444]/40 dark:decoration-[#ef4444]/40 transition-all cursor-default">Manually drafting contextual responses</li>
                    </ul>
                  </div>

                  {/* AFTER */}
                  <div className="space-y-3 p-5 rounded-xl border border-[#10b981]/20 dark:border-[#10b981]/20 bg-[#10b981]/[0.02] dark:bg-[#10b981]/[0.02]">
                    <h4 className="font-mono text-xs sm:text-[13px] font-semibold text-[#10b981] tracking-wider uppercase">AFTER</h4>
                    <ul className="list-disc pl-4 space-y-2.5 text-[14.5px] sm:text-[15.5px] text-[#475569] dark:text-[#CBD5E1] marker:text-[#10b981]">
                      <li className="pl-1 hover:underline hover:decoration-wavy hover:underline-offset-[3px] decoration-[#10b981]/40 dark:decoration-[#10b981]/40 transition-all cursor-default">Instant thread summarization</li>
                      <li className="pl-1 hover:underline hover:decoration-wavy hover:underline-offset-[3px] decoration-[#10b981]/40 dark:decoration-[#10b981]/40 transition-all cursor-default">Extracted and tracked deadlines</li>
                      <li className="pl-1 hover:underline hover:decoration-wavy hover:underline-offset-[3px] decoration-[#10b981]/40 dark:decoration-[#10b981]/40 transition-all cursor-default">Highlighted key action items</li>
                      <li className="pl-1 hover:underline hover:decoration-wavy hover:underline-offset-[3px] decoration-[#10b981]/40 dark:decoration-[#10b981]/40 transition-all cursor-default">Context-aware draft generation</li>
                    </ul>
                  </div>
                </div>

                <div className="pt-8 sm:pt-12 pb-0 sm:pb-4 relative z-10">
                  <h3 className="text-[28px] sm:text-[32px] leading-tight sm:leading-[1.15] instrument-serif italic text-[#2C2C2C] dark:text-[#F2F2F2]">
                    Turning everyday emails into clear actions, from <span className="bg-[#EBEBFF] dark:bg-[#6666FF] dark:text-white px-1 box-decoration-clone">quick requests to time-sensitive commitments</span>
                  </h3>
                </div>

                {/* Demo Video 1 */}
                <div className="pt-6 pb-2 relative left-1/2 -translate-x-1/2 w-[100vw] sm:w-[700px] max-w-[100vw] px-4 sm:px-0">
                  <div className="w-full flex justify-center">
                    <ChromaVideo src="/semantic/demo1.mov" className="w-full" />
                  </div>
                  <p className="font-mono text-xs text-[#6666FF] dark:text-[#8888FF] mt-4 text-center">
                    // full copilot interface &amp; extraction workflow
                  </p>
                </div>
              </div>

              {/* Sub-solution 2: Everyday Situations */}
              <div className="pt-0">
                {/* Demo Video 2 */}
                <div className="pt-2 pb-6 relative left-1/2 -translate-x-1/2 w-[100vw] sm:w-[700px] max-w-[100vw] px-4 sm:px-0">
                  <div className="w-full flex justify-center">
                    <ChromaVideo src="/semantic/demo2.mov" className="w-full" />
                  </div>
                  <p className="font-mono text-xs text-[#6666FF] dark:text-[#8888FF] mt-4 text-center">
                    // automated deadline detection &amp; priority scheduling
                  </p>
                </div>
              </div>

              {/* Sub-solution 3: Context Mapping */}
              <div className="pt-4 space-y-4">
                <div className="space-y-1">
                  <h3 className="text-[28px] sm:text-[32px] leading-tight sm:leading-[1.15] instrument-serif italic text-[#2C2C2C] dark:text-[#F2F2F2]">
                    When your brain goes blank, <span className="bg-[#EBEBFF] dark:bg-[#6666FF] dark:text-white px-1 box-decoration-clone">the context is already understood—and your response is one click away.</span>
                  </h3>
                </div>

                {/* Demo Video 3 */}
                <div className="py-6 my-4 relative left-1/2 -translate-x-1/2 w-[100vw] sm:w-[700px] max-w-[100vw] px-4 sm:px-0">
                  <div className="w-full flex justify-center">
                    <ChromaVideo src="/semantic/demo3.mov" className="w-full" />
                  </div>
                  <p className="font-mono text-xs text-[#6666FF] dark:text-[#8888FF] mt-4 text-center">
                    // contextual response drafting &amp; thread synthesis
                  </p>
                </div>
              </div>


            </div>

            {/* Process Section */}
            <div id="process" className="pt-8 space-y-6 scroll-mt-20">
              <div className="space-y-1">
                <span className="font-mono text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#6666FF] dark:text-[#8888FF] block">
                  BEHIND THE SCENES
                </span>
                <h2 className="text-[28px] sm:text-[32px] instrument-serif italic text-[#2C2C2C] dark:text-[#F2F2F2] tracking-tight leading-snug">
                  From chaos to clarity
                </h2>
              </div>

              {/* Interactive Accordion Layout */}
              <div className="w-[100vw] sm:w-[1200px] max-w-[100vw] relative left-1/2 -translate-x-1/2 px-4 sm:px-0 pt-8">
                <div className="w-full bg-[#F5F5F7] dark:bg-[#13151A] rounded-[24px] sm:rounded-[40px] px-8 py-12 sm:px-16 sm:py-24 flex flex-col md:flex-row gap-10 sm:gap-16 items-center">
                  {/* Left: Accordion */}
                  <div className="w-full md:w-[35%] flex flex-col justify-center shrink-0">
                    <div className="space-y-0">
                      {processSteps.map((step, idx) => (
                        <div key={idx} className={`border-t border-neutral-200 dark:border-neutral-800 ${idx === 0 ? 'border-t-0' : ''}`}>
                          <button 
                            onClick={() => {
                              playTone(440 + (idx * 110));
                              setActiveProcess(idx);
                            }}
                            className="flex justify-between items-center w-full text-left py-5 sm:py-6 group outline-none gap-4"
                          >
                            <h3 className="text-[22px] sm:text-[26px] font-sans font-medium text-[#1D1D1F] dark:text-[#F2F2F2] leading-snug">
                              {step.title}
                            </h3>
                            <span className={`transform transition-transform duration-300 shrink-0 ${activeProcess === idx ? 'rotate-180' : ''}`}>
                              <ChevronDown className="w-6 h-6 text-[#A0A0A0] group-hover:text-[#1D1D1F] dark:group-hover:text-white transition-colors" strokeWidth={1.5} />
                            </span>
                          </button>
                          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${activeProcess === idx ? 'max-h-[400px] opacity-100 pb-6' : 'max-h-0 opacity-0 pb-0'}`}>
                            <div className="text-[15px] sm:text-[16px] text-[#424245] dark:text-[#A1A1A6] leading-[1.6]">
                              {step.content}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Right: Visual Area */}
                  <div className="w-full md:w-[65%] flex items-center justify-center min-h-[400px] sm:min-h-[550px] relative">
                      <div className="absolute inset-0 flex items-center justify-center animate-in fade-in zoom-in-95 duration-500" key={activeProcess}>
                          {activeProcess === 0 ? (
                            <div className="w-full h-full p-2 sm:p-4 flex items-center justify-center">
                              <img src="/q1.svg" alt="Questions" className="w-full max-h-full object-contain scale-[1.15] sm:scale-125" />
                            </div>
                          ) : activeProcess === 2 ? (
                            <div className="w-full h-full p-2 flex flex-col items-center justify-center gap-6">
                              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full">
                                <img src="/v1.svg" alt="Iteration 1" className="w-full sm:w-1/2 max-h-[250px] sm:max-h-[350px] object-contain drop-shadow-md" />
                                <img src="/v2.svg" alt="Iteration 2" className="w-full sm:w-1/2 max-h-[250px] sm:max-h-[350px] object-contain drop-shadow-md" />
                              </div>
                              <a href="https://www.figma.com/design/jFmjS9SneDaQNfBDHSOepV/mote?node-id=0-1&p=f&t=onrjxXaUuGsvZy9x-0" target="_blank" rel="noopener noreferrer" className="text-[#6666FF] dark:text-[#8888FF] hover:underline font-medium text-[15px] inline-flex items-center justify-center gap-2 border border-[#E0E0E0] dark:border-[#333] bg-white/80 dark:bg-black/20 px-6 py-2.5 rounded-full shadow-sm hover:border-[#6666FF] dark:hover:border-[#8888FF] transition-all">
                                <ExternalLink className="w-4 h-4" />
                                View in Figma
                              </a>
                            </div>
                          ) : activeProcess === 1 ? (
                            <div className="w-full h-full p-2 flex items-center justify-center">
                              <img src="/v2.1.svg" alt="Mapping the problem" className="w-full max-h-full object-contain drop-shadow-md" />
                            </div>
                          ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center text-center text-[#A0A0A0]">
                                <span className="font-mono text-sm mb-4">[{processSteps[activeProcess].title} Visual]</span>
                                <div className="w-48 h-48 sm:w-64 sm:h-64 border-2 border-dashed border-[#D0D0D0] dark:border-[#333] rounded-2xl flex items-center justify-center bg-white/50 dark:bg-black/20">
                                    <LayoutDashboard className="w-10 h-10 opacity-50" />
                                </div>
                            </div>
                          )}
                      </div>
                  </div>
                </div>
              </div>
            </div>


            {/* Takeaways Section */}
            <div id="takeaways" className="pt-8 space-y-5 scroll-mt-20">
              <div className="space-y-1">
                <span className="font-mono text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#6666FF] dark:text-[#8888FF] block">
                  TAKEAWAYS
                </span>
                <h2 className="text-[28px] sm:text-[32px] instrument-serif italic text-[#2C2C2C] dark:text-[#F2F2F2] tracking-tight leading-snug">
                  AI should turn complexity into something you can confidently act on.
                </h2>
              </div>

              {/* 2-Column Takeaways Cards */}
              <div className="relative left-1/2 -translate-x-1/2 w-[100vw] sm:w-[800px] max-w-[100vw] px-4 sm:px-0 pt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {/* Card 1 */}
                  <div className="relative w-full h-full p-6 sm:p-8 rounded-[24px] sm:rounded-[32px] bg-[#E6E6FF] dark:bg-[#8888FF]/[0.1] flex flex-col items-start justify-center text-left space-y-4 sm:space-y-6">
                    <img src="/laptop.svg" alt="Laptop" className="w-24 h-24 sm:w-28 sm:h-28 object-contain -mb-4 sm:-mb-6" />
                    <div className="space-y-3">
                      <h4 className="font-sans font-medium text-[20px] sm:text-[24px] text-[#2C2C2C] dark:text-[#F2F2F2] leading-tight pr-4">
                        Designing AI means designing trust
                      </h4>
                      <p className="text-[15px] sm:text-[16px] text-[#2C2C2C] dark:text-[#CBD5E1] leading-relaxed font-sans pr-2">
                        Users need to understand why something was extracted or suggested before they can confidently act on it. Making the system's intelligence visible without making it overwhelming became an important design challenge.
                      </p>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className="relative w-full h-full p-6 sm:p-8 rounded-[24px] sm:rounded-[32px] bg-[#E6E6FF] dark:bg-[#8888FF]/[0.1] flex flex-col items-start justify-center text-left space-y-4 sm:space-y-6">
                    <img src="/idea.svg" alt="Idea" className="w-24 h-24 sm:w-28 sm:h-28 object-contain scale-125 sm:scale-150 origin-left" />
                    <div className="space-y-3">
                      <h4 className="font-sans font-medium text-[20px] sm:text-[24px] text-[#2C2C2C] dark:text-[#F2F2F2] leading-tight pr-4">
                        Designing Without a Playbook
                      </h4>
                      <p className="text-[15px] sm:text-[16px] text-[#2C2C2C] dark:text-[#CBD5E1] leading-relaxed font-sans pr-2">
                        With no established patterns to follow, I had to define both the problem and the path forward. This project taught me how to turn an ambiguous idea into a structured product experience through exploration, iteration, and constant reframing.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        
        {/* Thanks for reading block */}
        <div className="flex flex-col items-center justify-center w-full pt-20 pb-4 mt-16 border-t border-neutral-100 dark:border-neutral-800/60">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 text-[#6666FF] dark:text-[#8888FF] hover:opacity-80 transition-opacity mb-8 font-medium font-sans text-[15.5px]"
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

        {/* Navigation Links */}
        <div className="pt-10 pb-6 flex items-center justify-between w-full">
          <Link
            href="/"
            onClick={() => playTone(880)}
            className="font-mono text-[13.5px] sm:text-[14px] text-[#6666FF] dark:text-[#8888FF] hover:underline underline-offset-4 font-medium flex items-center space-x-1 cursor-pointer"
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
