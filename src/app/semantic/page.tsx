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
  ArrowDown,
  Figma,
  ExternalLink
} from "lucide-react";
import { ChromaVideo } from "@/components/ChromaVideo";
import { PersonaShowcase } from "@/components/PersonaShowcase";
import { ProjectSidebar } from "@/components/ProjectSidebar";

export default function SemanticProjectPage() {
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
              <p>
                Rather than forcing users to switch email clients, it operates as a non-intrusive copilot analyzing incoming communication in real time to extract key action items, flag urgent commitments, and synthesize contextual responses.
              </p>

              {/* Context Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-4">
                <button
                  onClick={() => {
                    playTone(880);
                    document.getElementById('solution')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-4 py-2 rounded-xl bg-[#141415] dark:bg-white text-white dark:text-[#141415] hover:bg-[#2C2C2C] dark:hover:bg-neutral-200 transition-colors font-medium text-[13px] sm:text-sm shadow-sm flex items-center space-x-2"
                >
                  <span>Jump to Solution</span>
                  <ArrowDown className="w-4 h-4" />
                </button>
                <a
                  href="https://www.figma.com/design/jFmjS9SneDaQNfBDHSOepV/mote?node-id=1-3&t=u4M4Lf67dlZ5hgzu-1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 hover:border-[#6666FF] dark:hover:border-[#8888FF] text-[#475569] dark:text-[#CBD5E1] hover:text-[#6666FF] dark:hover:text-[#8888FF] transition-colors font-medium text-[13px] sm:text-sm flex items-center space-x-2"
                >
                  <span>View in Figma</span>
                  <Figma className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* The Problem Section */}
            <div id="problem" className="pt-8 space-y-5 scroll-mt-20">
              <div className="space-y-1.5">
                <span className="font-mono text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#6666FF] dark:text-[#8888FF] block">
                  THE PROBLEM
                </span>
                <p className="text-[28px] sm:text-[32px] instrument-serif italic text-[#2C2C2C] dark:text-[#F2F2F2] leading-relaxed">
                  Email is full of tasks, deadlines, and commitments, but inboxes bury them in clutter, making it <span className="bg-[#6666FF]/15 dark:bg-[#8888FF]/20 px-1 rounded-xl">easy to lose track of what matters.</span>
                </p>
                <p className="text-[16px] sm:text-[17.5px] text-[#475569] dark:text-[#CBD5E1] leading-relaxed pt-1">
                  As messages accumulate, users spend excessive energy trying to remember why an email was received, what deliverables are due, who needs a reply, and when to follow up.
                </p>
              </div>

              {/* Pain Points Boxed Row */}
              <div className="pt-2 space-y-3 scroll-mt-20">
                <span className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.08em] text-[#64748B] dark:text-[#8E95B8] font-semibold block">
                  PAIN POINTS
                </span>

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
              <div className="p-4 sm:p-4.5 rounded-xl border border-[#6666FF] dark:border-[#8888FF] bg-[#6666FF]/[0.05] dark:bg-[#8888FF]/[0.08] flex items-start gap-3">
                <HelpCircle className="w-4 h-4 text-[#6666FF] dark:text-[#8888FF] shrink-0 mt-0.5" strokeWidth={2} />
                <p className="text-[24px] sm:text-[28px] instrument-serif font-normal text-[#2C2C2C] dark:text-[#F2F2F2] leading-relaxed">
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
                  <p className="text-[16px] sm:text-[17.5px] text-[#475569] dark:text-[#CBD5E1] leading-relaxed pt-0.5">
                    An AI-powered inbox layer that understands incoming emails, extracts what matters, and turns them into actionable tasks, deadlines, and context so nothing important gets lost.
                  </p>
                  <br/>
                </div>

                {/* BEFORE / AFTER BLOCK */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 my-16">
                  {/* BEFORE */}
                  <div className="border border-neutral-200 dark:border-neutral-800 bg-[#F7F7F7] dark:bg-[#141415] p-5 sm:p-6 rounded-xl">
                    <h4 className="font-mono text-xs sm:text-[13px] font-semibold text-[#ef4444] mb-4 tracking-wider uppercase">Before</h4>
                    <ul className="list-disc pl-4 space-y-2.5 text-[14.5px] text-[#475569] dark:text-[#CBD5E1] marker:text-[#ef4444]">
                      <li className="pl-1 hover:underline hover:decoration-wavy hover:underline-offset-[3px] decoration-[#ef4444]/40 dark:decoration-[#ef4444]/40 transition-all cursor-default">Reading through every long email thread</li>
                      <li className="pl-1 hover:underline hover:decoration-wavy hover:underline-offset-[3px] decoration-[#ef4444]/40 dark:decoration-[#ef4444]/40 transition-all cursor-default">Losing track of scattered deadlines</li>
                      <li className="pl-1 hover:underline hover:decoration-wavy hover:underline-offset-[3px] decoration-[#ef4444]/40 dark:decoration-[#ef4444]/40 transition-all cursor-default">Missing buried action items</li>
                      <li className="pl-1 hover:underline hover:decoration-wavy hover:underline-offset-[3px] decoration-[#ef4444]/40 dark:decoration-[#ef4444]/40 transition-all cursor-default">Manually drafting contextual responses</li>
                    </ul>
                  </div>

                  {/* AFTER */}
                  <div className="border border-[#10b981]/20 dark:border-[#10b981]/20 bg-[#10b981]/[0.02] dark:bg-[#10b981]/[0.02] p-5 sm:p-6 rounded-xl">
                    <h4 className="font-mono text-xs sm:text-[13px] font-semibold text-[#10b981] mb-4 tracking-wider uppercase">After</h4>
                    <ul className="list-disc pl-4 space-y-2.5 text-[14.5px] text-[#475569] dark:text-[#CBD5E1] marker:text-[#10b981]">
                      <li className="pl-1 hover:underline hover:decoration-wavy hover:underline-offset-[3px] decoration-[#10b981]/40 dark:decoration-[#10b981]/40 transition-all cursor-default">Instant thread summarization</li>
                      <li className="pl-1 hover:underline hover:decoration-wavy hover:underline-offset-[3px] decoration-[#10b981]/40 dark:decoration-[#10b981]/40 transition-all cursor-default">Extracted and tracked deadlines</li>
                      <li className="pl-1 hover:underline hover:decoration-wavy hover:underline-offset-[3px] decoration-[#10b981]/40 dark:decoration-[#10b981]/40 transition-all cursor-default">Highlighted key action items</li>
                      <li className="pl-1 hover:underline hover:decoration-wavy hover:underline-offset-[3px] decoration-[#10b981]/40 dark:decoration-[#10b981]/40 transition-all cursor-default">Context-aware draft generation</li>
                    </ul>
                  </div>
                </div>

                
                {/* Demo Video 1 */}
                <div className="py-4 my-2">
                  <div className="w-full flex justify-center">
                    <div className="w-full max-w-[600px]">
                      <ChromaVideo src="/semantic/demo1.mov" />
                    </div>
                  </div>
                  <p className="font-mono text-xs text-[#6666FF] dark:text-[#8888FF] mt-3 text-center">
                    // full copilot interface &amp; extraction workflow
                  </p>
                </div>
              </div>

              {/* Sub-solution 2: Everyday Situations */}
              <div className="pt-4 space-y-4">
                <div className="space-y-1">
                  <h3 className="text-[28px] sm:text-[32px] instrument-serif italic text-[#2C2C2C] dark:text-[#F2F2F2]">
                    Turning everyday emails into clear actions, from <span className="bg-[#EBEBFF] dark:bg-[#6666FF] dark:text-white px-1 box-decoration-clone">quick requests to time-sensitive commitments</span>
                  </h3>
                  <p className="text-[16px] sm:text-[17.5px] text-[#475569] dark:text-[#CBD5E1] leading-relaxed">
                    From meeting coordination and task assignments to urgent deadline notices, the pipeline automatically detects message urgency and maps unstructured context into structured actions.
                  </p>
                </div>

                {/* Demo Video 2 */}
                <div className="py-4 my-2">
                  <div className="w-full flex justify-center">
                    <div className="w-full max-w-[600px]">
                      <ChromaVideo src="/semantic/demo2.mov" />
                    </div>
                  </div>
                  <p className="font-mono text-xs text-[#6666FF] dark:text-[#8888FF] mt-3 text-center">
                    // automated deadline detection &amp; priority scheduling
                  </p>
                </div>
              </div>

              {/* Sub-solution 3: Context Mapping */}
              <div className="pt-4 space-y-4">
                <div className="space-y-1">
                  <h3 className="text-[28px] sm:text-[32px] instrument-serif italic text-[#2C2C2C] dark:text-[#F2F2F2]">
                    Not just drafting replies, but <span className="bg-[#EBEBFF] dark:bg-[#6666FF] dark:text-white px-1 box-decoration-clone">helping you understand the conversation behind them.</span>
                  </h3>
                  <p className="text-[16px] sm:text-[17.5px] text-[#475569] dark:text-[#CBD5E1] leading-relaxed">
                    By connecting isolated threads into a unified knowledge graph, users can review incoming tasks, reply with relevant context, and archive resolved items without ever leaving the flow.
                  </p>
                </div>

                {/* Demo Video 3 */}
                <div className="py-4 my-2">
                  <div className="w-full flex justify-center">
                    <div className="w-full max-w-[600px]">
                      <ChromaVideo src="/semantic/demo3.mov" />
                    </div>
                  </div>
                  <p className="font-mono text-xs text-[#6666FF] dark:text-[#8888FF] mt-3 text-center">
                    // contextual response drafting &amp; thread synthesis
                  </p>
                </div>
              </div>

              <div className="pt-4 space-y-4">
                <div className="space-y-1">
                  <h3 className="text-[28px] sm:text-[32px] instrument-serif italic text-[#2C2C2C] dark:text-[#F2F2F2]">
                    Designing for ambiguity taught me that AI becomes more useful <span className="bg-[#EBEBFF] dark:bg-[#6666FF] dark:text-white px-1 box-decoration-clone">when uncertainty is visible, not hidden.</span>
                  </h3>
                  <p className="text-[16px] sm:text-[17.5px] text-[#475569] dark:text-[#CBD5E1] leading-relaxed">
                    Not every email contains enough information to confidently infer an action or deadline.
                  </p>
                  <p className="text-[16px] sm:text-[17.5px] text-[#475569] dark:text-[#CBD5E1] leading-relaxed pt-2">
                    Semantic Email distinguishes between <strong className="font-medium text-[#2C2C2C] dark:text-[#F2F2F2]">explicit information</strong> and <strong className="font-medium text-[#2C2C2C] dark:text-[#F2F2F2]">AI-inferred intent</strong>. When context is ambiguous, the system surfaces the interpretation for the user to review rather than silently treating it as fact.
                  </p>
                </div>
                
                <div className="bg-[#F7F7F7] dark:bg-[#141415] border border-neutral-200 dark:border-neutral-800 p-5 rounded-xl space-y-4 mt-4 text-center">
                  <p className="instrument-serif italic text-[24px] sm:text-[26px] text-[#2C2C2C] dark:text-[#F2F2F2]">
                    "Could you get this to me sometime next week?"
                  </p>
                  
                  <div className="flex flex-col items-center gap-4 pt-2">
                    <div>
                      <div className="font-mono text-[12px] sm:text-[13px] font-semibold text-[#6666FF] dark:text-[#8888FF] mb-1">ACTION</div>
                      <div className="text-[15.5px] sm:text-[17px] text-[#475569] dark:text-[#CBD5E1]">Send the document</div>
                    </div>
                    <div>
                      <div className="font-mono text-[12px] sm:text-[13px] font-semibold text-[#6666FF] dark:text-[#8888FF] mb-1">DEADLINE</div>
                      <div className="text-[15.5px] sm:text-[17px] text-[#475569] dark:text-[#CBD5E1]">
                        Next week &middot; <span className="italic text-[#6666FF]/80 dark:text-[#8888FF]/80">Inferred</span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-[16px] sm:text-[17.5px] text-[#475569] dark:text-[#CBD5E1] leading-relaxed pt-2">
                  This keeps the copilot helpful without taking control, letting users <strong className="font-medium text-[#2C2C2C] dark:text-[#F2F2F2]">confirm, edit, or dismiss</strong> suggestions before they become actionable tasks.
                </p>
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 pt-1">
                {/* Card 1 */}
                <div className="p-5 sm:p-5.5 rounded-xl border border-[#6666FF] dark:border-[#8888FF] bg-[#6666FF]/[0.04] dark:bg-[#8888FF]/[0.07] flex flex-col items-center text-center space-y-2.5 transition-colors hover:bg-[#6666FF]/[0.08] dark:hover:bg-[#8888FF]/[0.12]">
                  <div className="p-1.5 rounded-xl bg-[#6666FF]/15 dark:bg-[#8888FF]/20 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-[#6666FF] dark:text-[#8888FF]" strokeWidth={1.5} />
                  </div>
                  <h4 className="instrument-serif text-[22px] sm:text-[24px] text-[#6666FF] dark:text-[#8888FF] uppercase pt-1">Quiet AI assistance</h4>
                  <p className="text-[16px] sm:text-[17px] text-[#2C2C2C] dark:text-[#CBD5E1] leading-relaxed font-sans">
                    The most effective AI operates quietly in the background, extracting key actions without forcing users to learn complex prompts.
                  </p>
                </div>

                {/* Card 2: Ownership in Ambiguity (Moved from full width to grid) */}
                <div className="p-5 sm:p-5.5 rounded-xl border border-[#6666FF] dark:border-[#8888FF] bg-[#6666FF]/[0.04] dark:bg-[#8888FF]/[0.07] flex flex-col items-center text-center space-y-2.5 transition-colors hover:bg-[#6666FF]/[0.08] dark:hover:bg-[#8888FF]/[0.12]">
                  <div className="p-1.5 rounded-xl bg-[#6666FF]/15 dark:bg-[#8888FF]/20 flex items-center justify-center">
                    <Search className="w-5 h-5 text-[#6666FF] dark:text-[#8888FF]" strokeWidth={1.5} />
                  </div>
                  <h4 className="instrument-serif text-[22px] sm:text-[24px] text-[#6666FF] dark:text-[#8888FF] uppercase pt-1">Ownership in ambiguity</h4>
                  <p className="text-[16px] sm:text-[17px] text-[#2C2C2C] dark:text-[#CBD5E1] leading-relaxed font-sans max-w-3xl">
                    With no playbook for an AI inbox layer, navigating this ambiguous space required identifying pain points, designing the architecture, and iterating constantly. You have to stop waiting for a roadmap and just start building.
                  </p>
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
          <Link
            href="/messaging"
            onClick={() => playTone(880)}
            className="font-mono text-[13.5px] sm:text-[14px] text-[#6666FF] dark:text-[#8888FF] hover:underline underline-offset-4 font-medium flex items-center space-x-1 cursor-pointer"
          >
            <span>next: Kivo &rarr;</span>
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
