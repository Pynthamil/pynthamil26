"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChromaVideo } from "@/components/ChromaVideo";

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

  return (
    <div className="min-h-screen w-full px-4 sm:px-8 md:px-12 pt-10 sm:pt-16 pb-24 selection:bg-neutral-200">
      {/* Soft atmospheric ambient glow */}
      <div className="ambient-glow" />

      {/* Main Container */}
      <main className="w-full max-w-[530px] mx-auto relative z-10 flex flex-col animate-in fade-in duration-200">
        {/* Top Navigation */}
        <header className="flex items-center justify-between w-full mb-8">
          <Link
            href="/"
            onClick={() => playTone(880)}
            className="font-mono text-[16px] sm:text-[17px] tracking-tight text-[#232564] dark:text-[#F5F5FF] hover:text-[#6666FF] dark:hover:text-[#9999FF] transition-colors flex items-center space-x-1.5 focus:outline-none font-medium cursor-pointer"
          >
            <span>&larr;</span>
            <span>home</span>
          </Link>

          <div className="flex items-center space-x-3.5">
            <span className="font-mono text-[13.5px] sm:text-[14px] text-[#11408F] dark:text-[#AEF0FF]">
              case study
            </span>
            <button
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              className="p-1 text-[#232564] dark:text-[#F5F5FF] hover:text-[#6666FF] dark:hover:text-[#9999FF] transition-colors focus:outline-none cursor-pointer flex items-center justify-center"
            >
              {isDarkMode ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-200 hover:rotate-45"
                >
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2" />
                  <path d="M12 20v2" />
                  <path d="m4.93 4.93 1.41 1.41" />
                  <path d="m17.66 17.66 1.41 1.41" />
                  <path d="M2 12h2" />
                  <path d="M20 12h2" />
                  <path d="m6.34 17.66-1.41 1.41" />
                  <path d="m19.07 4.93-1.41 1.41" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-200 hover:-rotate-12"
                >
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                </svg>
              )}
            </button>
          </div>
        </header>

        {/* Article / Case Study Header */}
        <article className="space-y-6">
          <div className="border-b border-neutral-200/70 dark:border-[#9999FF]/20 pb-5">
            <h1 className="text-[26px] sm:text-[30px] font-semibold text-[#232564] dark:text-[#F5F5FF] leading-tight">
              semantic email copilot
            </h1>
            <div className="font-mono text-[13.5px] sm:text-[14.5px] text-[#11408F] dark:text-[#AEF0FF] mt-2.5 flex items-center space-x-2">
              <span>aug 2026</span>
              <span>&bull;</span>
              <span>figma</span>
              <span>&bull;</span>
              <span>solo project</span>
            </div>
          </div>

          {/* Case Study Content */}
          <div className="space-y-8 text-[17px] sm:text-[17.5px] text-[#232564] dark:text-[#F5F5FF] leading-[1.8] font-sans pt-1">
            {/* Overview / Problem Hook */}
            <div className="space-y-4">
              <p className="text-[20px] sm:text-[22px] font-medium text-[#232564] dark:text-[#F5F5FF] leading-snug">
                Our inboxes store information, but fail to turn it into meaningful action.
              </p>
              <p className="text-[17px] sm:text-[17.5px] leading-[1.8]">
                A smart system that turns your chaotic inbox into a lightweight second brain by extracting tasks, deadlines, and context.
              </p>

              {/* Minimalist Metadata Box */}
              <div className="bg-white dark:bg-[#13151E] p-5 sm:p-6 border border-neutral-200/80 dark:border-[#9999FF]/30 font-mono text-[14px] sm:text-[15px] text-[#232564] dark:text-[#F5F5FF] space-y-2.5 leading-relaxed">
                <div><span className="font-semibold text-[#11408F] dark:text-[#AEF0FF]">DURATION</span> &rarr; Aug 2026</div>
                <div><span className="font-semibold text-[#11408F] dark:text-[#AEF0FF]">ROLE</span> &rarr; Product Designer</div>
                <div><span className="font-semibold text-[#11408F] dark:text-[#AEF0FF]">TEAM</span> &rarr; Solo Project</div>
                <div><span className="font-semibold text-[#FF42FF] dark:text-[#FF94FF]">TOOLS</span> &rarr; Figma</div>
              </div>
            </div>

            {/* The Challenge */}
            <div className="pt-6 border-t border-neutral-200/70 dark:border-[#9999FF]/20 space-y-4">
              <h2 className="text-[21px] sm:text-[23px] font-semibold text-[#232564] dark:text-[#F5F5FF]">
                The Challenge
              </h2>
              <p>
                Email is full of tasks, deadlines, and responsibilities, but inboxes bury them in clutter &mdash; making it easy to forget what matters.
              </p>
              <p className="font-mono text-[14.5px] sm:text-[15px] text-[#11408F] dark:text-[#AEF0FF]">
                Core problem areas:
              </p>
              <ul className="space-y-3 pl-1 text-[16px] sm:text-[16.5px]">
                <li className="flex items-start space-x-2.5">
                  <span className="font-mono text-sm text-[#11408F] dark:text-[#AEF0FF] select-none pt-0.5">+</span>
                  <span>high cognitive load from unorganized threads</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <span className="font-mono text-sm text-[#11408F] dark:text-[#AEF0FF] select-none pt-0.5">+</span>
                  <span>action items getting buried under promotional noise</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <span className="font-mono text-sm text-[#11408F] dark:text-[#AEF0FF] select-none pt-0.5">+</span>
                  <span>context switching between email and external task managers</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <span className="font-mono text-sm text-[#11408F] dark:text-[#AEF0FF] select-none pt-0.5">+</span>
                  <span>missed commitments due to lack of time-sensitivity detection</span>
                </li>
              </ul>
            </div>

            {/* Research */}
            <div className="pt-6 border-t border-neutral-200/70 dark:border-[#9999FF]/20 space-y-4">
              <h2 className="text-[21px] sm:text-[23px] font-semibold text-[#232564] dark:text-[#F5F5FF]">
                Research &amp; Discovery
              </h2>
              <p>
                My discovery process involved analyzing real student and faculty workflows across dozens of active inboxes. I identified that over 75% of cognitive overload comes from low-signal emails masking high-priority action items, urgent deadlines, and essential follow-ups.
              </p>
              <p>
                I synthesized these findings into targeted user personas to design a lightweight copilot interface that turns passive incoming text into structured action items, clear priorities, and frictionless task management.
              </p>
            </div>

            {/* Common Frustrations and Challenges */}
            <div className="pt-6 border-t border-neutral-200/70 dark:border-[#9999FF]/20 space-y-4">
              <h2 className="text-[21px] sm:text-[23px] font-semibold text-[#232564] dark:text-[#F5F5FF]">
                Common Frustrations and Challenges
              </h2>
              <p className="font-mono text-[14.5px] sm:text-[15px] text-[#11408F] dark:text-[#AEF0FF]">
                Recurring user pain points:
              </p>
              <ul className="space-y-3 pl-1 text-[16px] sm:text-[16.5px]">
                <li className="flex items-start space-x-2.5">
                  <span className="font-mono text-[13px] sm:text-[13.5px] bg-white dark:bg-[#13151E] px-2 py-0.5 border border-neutral-200/80 dark:border-[#9999FF]/30 font-semibold text-[#11408F] dark:text-[#AEF0FF]">01</span>
                  <span><strong className="font-medium text-[#232564] dark:text-[#F5F5FF]">Inbox Overload</strong> &mdash; high-volume noise obscures critical signals</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <span className="font-mono text-[13px] sm:text-[13.5px] bg-white dark:bg-[#13151E] px-2 py-0.5 border border-neutral-200/80 dark:border-[#9999FF]/30 font-semibold text-[#11408F] dark:text-[#AEF0FF]">02</span>
                  <span><strong className="font-medium text-[#232564] dark:text-[#F5F5FF]">Lost Context</strong> &mdash; decisions scattered across long threads</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <span className="font-mono text-[13px] sm:text-[13.5px] bg-white dark:bg-[#13151E] px-2 py-0.5 border border-neutral-200/80 dark:border-[#9999FF]/30 font-semibold text-[#11408F] dark:text-[#AEF0FF]">03</span>
                  <span><strong className="font-medium text-[#232564] dark:text-[#F5F5FF]">Action Items Get Lost</strong> &mdash; tasks forgotten once marked read</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <span className="font-mono text-[13px] sm:text-[13.5px] bg-white dark:bg-[#13151E] px-2 py-0.5 border border-neutral-200/80 dark:border-[#9999FF]/30 font-semibold text-[#11408F] dark:text-[#AEF0FF]">04</span>
                  <span><strong className="font-medium text-[#232564] dark:text-[#F5F5FF]">Information is Fragmented</strong> &mdash; manual tracking across tools</span>
                </li>
              </ul>
            </div>

            {/* Everyday situations */}
            <div className="pt-6 border-t border-neutral-200/70 dark:border-[#9999FF]/20 space-y-4">
              <h2 className="text-[21px] sm:text-[23px] font-semibold text-[#232564] dark:text-[#F5F5FF]">
                Everyday situations, big and small
              </h2>
              <p className="font-mono text-[14.5px] sm:text-[15px] text-[#11408F] dark:text-[#AEF0FF]">
                Structured action categories:
              </p>
              <ul className="space-y-3 pl-1 text-[16px] sm:text-[16.5px]">
                <li className="flex items-start space-x-2.5">
                  <span className="font-mono text-[13px] sm:text-[13.5px] bg-white dark:bg-[#13151E] px-2 py-0.5 border border-neutral-200/80 dark:border-[#9999FF]/30 font-semibold text-[#11408F] dark:text-[#AEF0FF]">01</span>
                  <span><strong className="font-medium text-[#232564] dark:text-[#F5F5FF]">Meeting Coordination</strong> &mdash; schedule, participants &amp; agenda</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <span className="font-mono text-[13px] sm:text-[13.5px] bg-white dark:bg-[#13151E] px-2 py-0.5 border border-neutral-200/80 dark:border-[#9999FF]/30 font-semibold text-[#11408F] dark:text-[#AEF0FF]">02</span>
                  <span><strong className="font-medium text-[#232564] dark:text-[#F5F5FF]">Action Items &amp; Tasks</strong> &mdash; assigned deliverables &amp; to-dos</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <span className="font-mono text-[13px] sm:text-[13.5px] bg-white dark:bg-[#13151E] px-2 py-0.5 border border-neutral-200/80 dark:border-[#9999FF]/30 font-semibold text-[#11408F] dark:text-[#AEF0FF]">03</span>
                  <span><strong className="font-medium text-[#232564] dark:text-[#F5F5FF]">Urgent Deadlines</strong> &mdash; time-sensitive notices &amp; submissions</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <span className="font-mono text-[13px] sm:text-[13.5px] bg-white dark:bg-[#13151E] px-2 py-0.5 border border-neutral-200/80 dark:border-[#9999FF]/30 font-semibold text-[#11408F] dark:text-[#AEF0FF]">04</span>
                  <span><strong className="font-medium text-[#232564] dark:text-[#F5F5FF]">Receipts &amp; Documentation</strong> &mdash; invoices &amp; reference files</span>
                </li>
              </ul>
              <p className="italic text-[#232564]/90 dark:text-[#F5F5FF]/90 pt-1">
                From meeting coordination and task assignments to urgent deadline notices, the pipeline automatically detects message urgency and maps unstructured context into structured actions.
              </p>

              {/* Demo Video 2: Everyday Scenarios & Detection */}
              <div className="pt-8 sm:pt-6 pb-4 my-8 sm:my-4">
                <div className="overflow-visible -mx-3 sm:mx-0 flex justify-center py-6 sm:py-0">
                  <div className="w-full transform scale-[1.28] sm:scale-100 origin-center transition-transform">
                    <ChromaVideo src="/semantic/demo2.mov" />
                  </div>
                </div>
                <p className="font-mono text-[13px] sm:text-[13.5px] text-[#11408F] dark:text-[#AEF0FF] mt-8 sm:mt-3 text-center">
                  // automated deadline detection &amp; priority scheduling
                </p>
              </div>
            </div>

            {/* The Solution */}
            <div className="pt-6 border-t border-neutral-200/70 dark:border-[#9999FF]/20 space-y-3.5">
              <h2 className="text-[21px] sm:text-[23px] font-semibold text-[#232564] dark:text-[#F5F5FF]">
                The Solution
              </h2>
              <p>
                An AI-powered inbox that understands emails, extracts what matters, and turns them into actionable tasks, deadlines, and context &mdash; so nothing important gets lost.
              </p>
              <p>
                Rather than forcing users to change their email provider, the <span className="font-medium text-[#FF42FF] dark:text-[#FF94FF]">Semantic Email Copilot</span> acts as a non-intrusive intelligence layer that integrates seamlessly with existing workflows. It analyzes incoming threads in real-time, extracts key action points, tags upcoming commitments, and generates contextual response drafts.
              </p>

              {/* Demo Video 1: End-to-End Workflow */}
              <div className="pt-8 sm:pt-6 pb-4 my-8 sm:my-4">
                <div className="overflow-visible -mx-3 sm:mx-0 flex justify-center py-6 sm:py-0">
                  <div className="w-full transform scale-[1.28] sm:scale-100 origin-center transition-transform">
                    <ChromaVideo src="/semantic/demo1.mov" />
                  </div>
                </div>
                <p className="font-mono text-[13px] sm:text-[13.5px] text-[#11408F] dark:text-[#AEF0FF] mt-8 sm:mt-3 text-center">
                  // full copilot interface &amp; extraction workflow
                </p>
              </div>
            </div>

            {/* Context Mapping & Actions */}
            <div className="pt-6 border-t border-neutral-200/70 dark:border-[#9999FF]/20 space-y-3.5">
              <h2 className="text-[21px] sm:text-[23px] font-semibold text-[#232564] dark:text-[#F5F5FF]">
                Context Mapping &amp; Response Synthesis
              </h2>
              <p>
                By connecting isolated threads into a unified knowledge graph, users can review incoming tasks, reply with relevant context, and archive resolved items without ever leaving the flow.
              </p>

              {/* Demo Video 3: Context & Response Synthesis */}
              <div className="pt-8 sm:pt-6 pb-4 my-8 sm:my-4">
                <div className="overflow-visible -mx-3 sm:mx-0 flex justify-center py-6 sm:py-0">
                  <div className="w-full transform scale-[1.28] sm:scale-100 origin-center transition-transform">
                    <ChromaVideo src="/semantic/demo3.mov" />
                  </div>
                </div>
                <p className="font-mono text-[13px] sm:text-[13.5px] text-[#11408F] dark:text-[#AEF0FF] mt-8 sm:mt-3 text-center">
                  // contextual response drafting &amp; thread synthesis
                </p>
              </div>
            </div>
          </div>
        </article>

        {/* Return link */}
        <div className="pt-10 pb-6 border-b border-neutral-200/70 dark:border-[#9999FF]/20">
          <Link
            href="/"
            onClick={() => playTone(880)}
            className="font-mono text-[15px] sm:text-[16px] text-[#6666FF] dark:text-[#9999FF] hover:underline underline-offset-4 font-medium flex items-center space-x-1 cursor-pointer"
          >
            <span>&larr; back to home</span>
          </Link>
        </div>

        {/* Standard Footer */}
        <footer className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 font-mono text-[13.5px] sm:text-[14px] text-[#64748B] dark:text-[#8E95B8]">
          <div>curiosity doesn&apos;t kill the cat.</div>
          <div>made w love &bull; &copy; 2026</div>
        </footer>
      </main>
    </div>
  );
}
