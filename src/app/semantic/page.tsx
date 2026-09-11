"use client";

import React, { useState, useEffect } from "react";
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
      icon: <Inbox className="w-5 h-5 text-[#6666FF] dark:text-[#9999FF]" strokeWidth={1.5} />,
      title: "INBOX OVERLOAD",
      desc: "High-volume noise obscures critical signals",
    },
    {
      icon: <Search className="w-5 h-5 text-[#6666FF] dark:text-[#9999FF]" strokeWidth={1.5} />,
      title: "LOST CONTEXT",
      desc: "Decisions scattered across long threads",
    },
    {
      icon: <CheckSquare className="w-5 h-5 text-[#6666FF] dark:text-[#9999FF]" strokeWidth={1.5} />,
      title: "BURIED ACTIONS",
      desc: "Tasks forgotten once marked read",
    },
    {
      icon: <Split className="w-5 h-5 text-[#6666FF] dark:text-[#9999FF]" strokeWidth={1.5} />,
      title: "FRAGMENTED TOOLS",
      desc: "Manual tracking across external apps",
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
    <div className="min-h-screen w-full flex flex-col justify-start items-center px-5 sm:px-8 md:px-12 pt-12 sm:pt-16 pb-24 selection:bg-indigo-100 dark:selection:bg-indigo-950">
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
            className="font-mono text-[15px] sm:text-[15.5px] tracking-tight text-[#232564] dark:text-[#F5F5FF] hover:text-[#6666FF] dark:hover:text-[#9999FF] transition-colors flex items-center space-x-1.5 focus:outline-none font-medium cursor-pointer"
          >
            <span>&larr;</span>
            <span>home</span>
          </Link>

          <div className="flex items-center space-x-3.5">
            <span className="font-mono text-xs sm:text-[13px] text-[#6666FF] dark:text-[#9999FF] font-medium">
              case study
            </span>
            <button
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              className="p-1 text-[#232564] dark:text-[#F5F5FF] hover:text-[#6666FF] dark:hover:text-[#9999FF] transition-colors focus:outline-none cursor-pointer flex items-center justify-center"
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
              Semantic Email Copilot
            </h1>
            <p className="text-[16px] sm:text-[17px] text-[#475569] dark:text-[#CBD5E1] leading-relaxed">
              Turning inbox chaos into structured tasks, deadlines, and context.
            </p>

            {/* 4-Column Metadata Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-4">
              <div>
                <span className="font-mono text-xs sm:text-[12.5px] font-semibold text-[#6666FF] dark:text-[#9999FF] block mb-1">
                  ROLE
                </span>
                <span className="text-[14px] sm:text-[15px] text-[#232564] dark:text-[#F5F5FF]">
                  Product Designer
                </span>
              </div>
              <div>
                <span className="font-mono text-xs sm:text-[12.5px] font-semibold text-[#6666FF] dark:text-[#9999FF] block mb-1">
                  TIMELINE
                </span>
                <span className="text-[14px] sm:text-[15px] text-[#232564] dark:text-[#F5F5FF]">
                  Aug 2026
                </span>
              </div>
              <div>
                <span className="font-mono text-xs sm:text-[12.5px] font-semibold text-[#6666FF] dark:text-[#9999FF] block mb-1">
                  SKILLS
                </span>
                <span className="text-[14px] sm:text-[15px] text-[#232564] dark:text-[#F5F5FF]">
                  AI UX, Systems
                </span>
              </div>
              <div>
                <span className="font-mono text-xs sm:text-[12.5px] font-semibold text-[#6666FF] dark:text-[#9999FF] block mb-1">
                  TOOLS
                </span>
                <span className="text-[14px] sm:text-[15px] text-[#232564] dark:text-[#F5F5FF]">
                  Figma
                </span>
              </div>
            </div>
          </div>

          {/* Case Study Content */}
          <div className="space-y-8 text-[16px] sm:text-[16.5px] text-[#232564] dark:text-[#F5F5FF] leading-[1.8] font-sans pt-1">
            {/* Overview / Context */}
            <div id="context" className="space-y-4 scroll-mt-20">
              {/* Semantic Banner Image */}
              <div className="w-full my-2.5 rounded-sm overflow-hidden border border-neutral-200/80 dark:border-neutral-800 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
                <img
                  src="/semantic/banner_semantic.svg"
                  alt="Semantic Email Copilot Banner"
                  className="w-full h-auto object-cover block"
                />
              </div>

              <div className="space-y-1.5 pt-2">
                <span className="font-mono text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#6666FF] dark:text-[#9999FF] block">
                  CONTEXT
                </span>
                <p className="text-[18px] sm:text-[19.5px] font-medium text-[#232564] dark:text-[#F5F5FF] leading-snug">
                  Our inboxes store information, but fail to turn it into meaningful action.
                </p>
              </div>
              <p>
                Semantic Email Copilot is a lightweight intelligence layer that transforms chaotic inbox threads into structured tasks, deadlines, and context.
              </p>
              <p>
                Rather than forcing users to switch email clients, it operates as a non-intrusive copilot analyzing incoming communication in real time to extract key action items, flag urgent commitments, and synthesize contextual responses.
              </p>
            </div>

            {/* The Problem Section */}
            <div id="problem" className="pt-8 space-y-5 scroll-mt-20">
              <div className="space-y-1.5">
                <span className="font-mono text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#6666FF] dark:text-[#9999FF] block">
                  THE PROBLEM
                </span>
                <p className="text-[17px] sm:text-[18px] text-[#232564] dark:text-[#F5F5FF] leading-relaxed font-normal">
                  Email is full of tasks, deadlines, and commitments, but inboxes bury them in clutter, making it easy to lose track of what matters.
                </p>
                <p className="text-[15px] sm:text-[15.5px] text-[#475569] dark:text-[#CBD5E1] leading-relaxed pt-1">
                  As messages accumulate, users spend excessive energy trying to remember why an email was received, what deliverables are due, who needs a reply, and when to follow up.
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
                      className="bg-white/70 dark:bg-[#13151E]/90 border border-neutral-200 dark:border-[#9999FF]/20 rounded-sm p-3.5 sm:p-4 flex flex-col items-center justify-center text-center space-y-2.5 transition-all hover:border-[#6666FF] dark:hover:border-[#9999FF] shadow-[0_1px_2px_rgba(0,0,0,0.02)] cursor-default"
                    >
                      <div className="p-1 rounded-sm bg-neutral-50 dark:bg-[#6666FF]/10 flex items-center justify-center">
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
              <div className="p-4 sm:p-4.5 rounded-sm border border-[#6666FF] dark:border-[#9999FF] bg-[#6666FF]/[0.05] dark:bg-[#9999FF]/[0.08] flex items-start gap-3">
                <HelpCircle className="w-4 h-4 text-[#6666FF] dark:text-[#9999FF] shrink-0 mt-0.5" strokeWidth={2} />
                <p className="text-[13.5px] sm:text-[14px] text-[#232564] dark:text-[#F5F5FF] leading-relaxed font-sans">
                  How might we transform email from an overwhelming backlog into an intelligent copilot that turns incoming communication into actionable clarity?
                </p>
              </div>
            </div>

            {/* Research & Discovery Section */}
            <div id="research" className="pt-8 space-y-4 scroll-mt-20">
              <div className="space-y-1.5">
                <span className="font-mono text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#6666FF] dark:text-[#9999FF] block">
                  RESEARCH &amp; DISCOVERY
                </span>
                <h2 className="text-[20px] sm:text-[22px] font-semibold text-[#232564] dark:text-[#F5F5FF] tracking-tight">
                  Understanding high-volume inbox workflows
                </h2>
                <p className="text-[15px] sm:text-[15.5px] text-[#475569] dark:text-[#CBD5E1] leading-relaxed pt-0.5">
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
                  <span className="font-mono text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#6666FF] dark:text-[#9999FF] block">
                    THE SOLUTION
                  </span>
                  <h2 className="text-[20px] sm:text-[22px] font-semibold text-[#232564] dark:text-[#F5F5FF] tracking-tight">
                    A non-intrusive intelligence layer
                  </h2>
                  <p className="text-[15px] sm:text-[15.5px] text-[#475569] dark:text-[#CBD5E1] leading-relaxed pt-0.5">
                    An AI-powered inbox layer that understands incoming emails, extracts what matters, and turns them into actionable tasks, deadlines, and context so nothing important gets lost.
                  </p>
                </div>

                {/* Demo Video 1 */}
                <div className="py-4 my-2">
                  <div className="w-full flex justify-center">
                    <div className="w-full max-w-[490px]">
                      <ChromaVideo src="/semantic/demo1.mov" />
                    </div>
                  </div>
                  <p className="font-mono text-xs text-[#6666FF] dark:text-[#9999FF] mt-3 text-center">
                    // full copilot interface &amp; extraction workflow
                  </p>
                </div>
              </div>

              {/* Sub-solution 2: Everyday Situations */}
              <div className="pt-4 space-y-4">
                <div className="space-y-1">
                  <h3 className="text-[17px] sm:text-[18px] font-semibold text-[#232564] dark:text-[#F5F5FF]">
                    Everyday situations, big and small
                  </h3>
                  <p className="text-[15px] sm:text-[15.5px] text-[#475569] dark:text-[#CBD5E1] leading-relaxed">
                    From meeting coordination and task assignments to urgent deadline notices, the pipeline automatically detects message urgency and maps unstructured context into structured actions.
                  </p>
                </div>

                {/* Demo Video 2 */}
                <div className="py-4 my-2">
                  <div className="w-full flex justify-center">
                    <div className="w-full max-w-[490px]">
                      <ChromaVideo src="/semantic/demo2.mov" />
                    </div>
                  </div>
                  <p className="font-mono text-xs text-[#6666FF] dark:text-[#9999FF] mt-3 text-center">
                    // automated deadline detection &amp; priority scheduling
                  </p>
                </div>
              </div>

              {/* Sub-solution 3: Context Mapping */}
              <div className="pt-4 space-y-4">
                <div className="space-y-1">
                  <h3 className="text-[17px] sm:text-[18px] font-semibold text-[#232564] dark:text-[#F5F5FF]">
                    Context mapping &amp; response synthesis
                  </h3>
                  <p className="text-[15px] sm:text-[15.5px] text-[#475569] dark:text-[#CBD5E1] leading-relaxed">
                    By connecting isolated threads into a unified knowledge graph, users can review incoming tasks, reply with relevant context, and archive resolved items without ever leaving the flow.
                  </p>
                </div>

                {/* Demo Video 3 */}
                <div className="py-4 my-2">
                  <div className="w-full flex justify-center">
                    <div className="w-full max-w-[490px]">
                      <ChromaVideo src="/semantic/demo3.mov" />
                    </div>
                  </div>
                  <p className="font-mono text-xs text-[#6666FF] dark:text-[#9999FF] mt-3 text-center">
                    // contextual response drafting &amp; thread synthesis
                  </p>
                </div>
              </div>
            </div>

            {/* Takeaways Section */}
            <div id="takeaways" className="pt-8 space-y-5 scroll-mt-20">
              <div className="space-y-1">
                <span className="font-mono text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#6666FF] dark:text-[#9999FF] block">
                  TAKEAWAYS
                </span>
                <h2 className="text-[20px] sm:text-[22px] font-semibold text-[#232564] dark:text-[#F5F5FF] tracking-tight">
                  What I learned after Semantic Copilot
                </h2>
              </div>

              {/* 2-Column Takeaways Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 pt-1">
                {/* Card 1 */}
                <div className="p-5 sm:p-5.5 rounded-sm border border-[#6666FF] dark:border-[#9999FF] bg-[#6666FF]/[0.04] dark:bg-[#9999FF]/[0.07] flex flex-col items-center text-center space-y-2.5 transition-colors hover:bg-[#6666FF]/[0.08] dark:hover:bg-[#9999FF]/[0.12]">
                  <div className="p-1.5 rounded-sm bg-[#6666FF]/15 dark:bg-[#9999FF]/20 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-[#6666FF] dark:text-[#9999FF]" strokeWidth={1.5} />
                  </div>
                  <span className="font-mono text-xs sm:text-[12.5px] font-semibold tracking-wider text-[#6666FF] dark:text-[#9999FF] block uppercase">
                    QUIET AI ASSISTANCE
                  </span>
                  <p className="text-[13.5px] sm:text-[14px] text-[#232564] dark:text-[#CBD5E1] leading-relaxed font-sans">
                    The most effective AI operates quietly in the background, extracting key actions without forcing users to learn complex prompts.
                  </p>
                </div>

                {/* Card 2 */}
                <div className="p-5 sm:p-5.5 rounded-sm border border-[#6666FF] dark:border-[#9999FF] bg-[#6666FF]/[0.04] dark:bg-[#9999FF]/[0.07] flex flex-col items-center text-center space-y-2.5 transition-colors hover:bg-[#6666FF]/[0.08] dark:hover:bg-[#9999FF]/[0.12]">
                  <div className="p-1.5 rounded-sm bg-[#6666FF]/15 dark:bg-[#9999FF]/20 flex items-center justify-center">
                    <Layers className="w-5 h-5 text-[#6666FF] dark:text-[#9999FF]" strokeWidth={1.5} />
                  </div>
                  <span className="font-mono text-xs sm:text-[12.5px] font-semibold tracking-wider text-[#6666FF] dark:text-[#9999FF] block uppercase">
                    STRUCTURE OVER NOISE
                  </span>
                  <p className="text-[13.5px] sm:text-[14px] text-[#232564] dark:text-[#CBD5E1] leading-relaxed font-sans">
                    Translating verbose threads into structured task cards and deadline highlights drastically reduces cognitive fatigue.
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
            className="font-mono text-[13.5px] sm:text-[14px] text-[#6666FF] dark:text-[#9999FF] hover:underline underline-offset-4 font-medium flex items-center space-x-1 cursor-pointer"
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
