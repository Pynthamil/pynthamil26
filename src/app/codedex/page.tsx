"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import {
  Smartphone,
  BookOpen,
  Sparkles,
  Layers,
  Lock,
  ExternalLink,
  Figma,
  CheckCircle,
  Zap,
  Globe,
  Award,
} from "lucide-react";
import { ProjectSidebar } from "@/components/ProjectSidebar";

export default function CodeDexProjectPage() {
  const [soundOn] = useState<boolean>(true);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

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
      icon: <Smartphone className="w-6 h-6 text-[#10B981] dark:text-[#34D399]" strokeWidth={1.5} />,
      title: "MOBILE ACCESSIBILITY",
      desc: "Learning coding on small screens requires rethinking code input and navigation",
    },
    {
      icon: <Zap className="w-6 h-6 text-[#10B981] dark:text-[#34D399]" strokeWidth={1.5} />,
      title: "BITE-SIZED LESSONS",
      desc: "Long lectures don't fit into short daily commutes or quick breaks",
    },
    {
      icon: <Award className="w-6 h-6 text-[#10B981] dark:text-[#34D399]" strokeWidth={1.5} />,
      title: "GAMIFIED PROGRESS",
      desc: "Maintaining momentum through visual streaks and interactive quests",
    },
    {
      icon: <Layers className="w-6 h-6 text-[#10B981] dark:text-[#34D399]" strokeWidth={1.5} />,
      title: "TACTILE FEEDBACK",
      desc: "Immediate visual & haptic confirmation for completed exercises",
    },
  ];

  const sidebarSections = [
    { id: "overview", label: "Overview" },
    { id: "problem", label: "Problem" },
    { id: "solution", label: "Solution" },
    { id: "takeaways", label: "Takeaways" },
  ];

  return (
    <div className="min-h-screen w-full flex flex-col justify-start items-center px-5 sm:px-8 md:px-12 pt-12 sm:pt-16 pb-6 sm:pb-8 selection:bg-emerald-100 dark:selection:bg-emerald-950">
      <div className="ambient-glow" />

      <div className="fixed left-4 sm:left-6 md:left-8 top-1/2 -translate-y-1/2 z-40 select-none hidden lg:block">
        <ProjectSidebar sections={sidebarSections} playTone={playTone} />
      </div>

      <main className="w-full relative z-10 flex flex-col max-w-[640px] animate-in fade-in duration-200">
        {/* Top Header Navigation */}
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
              href="https://www.figma.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playTone(880)}
              className="px-3.5 py-1.5 rounded-full border border-[#10B981]/30 dark:border-[#34D399]/30 bg-[#10B981]/[0.06] dark:bg-[#34D399]/[0.06] text-[#10B981] dark:text-[#34D399] hover:bg-[#10B981]/[0.12] dark:hover:bg-[#34D399]/[0.12] transition-all flex items-center space-x-1.5 font-mono text-[13px] sm:text-[13.5px] font-medium cursor-pointer"
            >
              <Figma className="w-3.5 h-3.5 stroke-[2]" />
              <span>figma</span>
            </a>
          </div>
        </header>

        <article className="space-y-6">
          {/* Project Header */}
          <div className="space-y-6 mb-12">
            <div className="pb-5 text-center">
              <h1 className="instrument-serif text-[36px] sm:text-[42px] font-normal leading-tight text-[#2C2C2C] dark:text-[#F2F2F2] max-w-[800px] mx-auto">
                Designing CodeDex for Accessible, On-the-Go Learning.
              </h1>
            </div>
          </div>

          {/* Hero Banner Image */}
          <div className="pb-2 space-y-3">
            <div className="w-full sm:w-[120%] sm:-ml-[10%] my-8 flex items-center justify-center px-0">
              <div className="w-full p-5 sm:p-12 md:p-16 rounded-2xl overflow-hidden flex items-center justify-center bg-[#F5F5F7] dark:bg-[#13151E]">
                <div className="w-full overflow-hidden flex items-center justify-center">
                  <img
                    src="/codedex/codedex-card.svg"
                    alt="CodeDex Mobile Cover Banner"
                    className="w-auto h-[60vh] sm:h-[75vh] max-h-[850px] object-contain block select-none bg-transparent my-4 mx-auto"
                  />
                </div>
              </div>
            </div>

            {/* Project Metadata */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-4 pb-12">
              <div>
                <span className="font-mono text-[13px] sm:text-[14px] font-semibold text-[#10B981] dark:text-[#34D399] block mb-1">
                  ROLE
                </span>
                <span className="text-[16px] sm:text-[17px] text-[#2C2C2C] dark:text-[#F2F2F2]">
                  Product & UI/UX Designer
                </span>
              </div>
              <div>
                <span className="font-mono text-[13px] sm:text-[14px] font-semibold text-[#10B981] dark:text-[#34D399] block mb-1">
                  TIMELINE
                </span>
                <span className="text-[16px] sm:text-[17px] text-[#2C2C2C] dark:text-[#F2F2F2]">
                  May 2026
                </span>
              </div>
              <div>
                <span className="font-mono text-[13px] sm:text-[14px] font-semibold text-[#10B981] dark:text-[#34D399] block mb-1">
                  TYPE
                </span>
                <span className="text-[16px] sm:text-[17px] text-[#2C2C2C] dark:text-[#F2F2F2]">
                  Mobile Concept
                </span>
              </div>
              <div>
                <span className="font-mono text-[13px] sm:text-[14px] font-semibold text-[#10B981] dark:text-[#34D399] block mb-1">
                  TOOLS
                </span>
                <span className="text-[16px] sm:text-[17px] text-[#2C2C2C] dark:text-[#F2F2F2]">
                  Figma
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-8 text-[16px] sm:text-[17.5px] text-[#2C2C2C] dark:text-[#F2F2F2] leading-[1.8] font-sans pt-1">
            {/* OVERVIEW */}
            <div id="overview" className="space-y-4 scroll-mt-20 pt-6">
              <span className="font-mono text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#10B981] dark:text-[#34D399] block">
                OVERVIEW
              </span>
              <h3 className="text-[28px] sm:text-[32px] instrument-serif italic text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                Learning to code usually requires sitting at a desk with a desktop IDE, making consistent daily practice hard for busy students.
              </h3>
              <p className="text-[16px] sm:text-[17.5px] text-[#475569] dark:text-[#CBD5E1] leading-relaxed my-4">
                CodeDex Mobile reimagines programming education as an accessible, gamified mobile experience. By breaking down complex concepts into bite-sized interactive challenges, learners can practice coding anytime, anywhere.
              </p>
            </div>

            {/* PROBLEM */}
            <div id="problem" className="space-y-5 scroll-mt-20 pt-8">
              <span className="font-mono text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#10B981] dark:text-[#34D399] block">
                THE PROBLEM
              </span>
              <h3 className="text-[28px] sm:text-[32px] instrument-serif italic text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                Desktop-first learning tools create high friction for quick, everyday practice.
              </h3>

              <div className="pt-2">
                <span className="font-mono text-[11px] sm:text-[12px] uppercase tracking-wider font-semibold text-[#10B981] dark:text-[#34D399] block mb-3">
                  Core Challenges
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                  {painPoints.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-white/70 dark:bg-[#141415]/90 border border-neutral-200 dark:border-neutral-800 rounded-xl aspect-square p-4 sm:p-5 flex flex-col items-center justify-center text-center space-y-3 transition-all hover:border-[#10B981] dark:hover:border-[#34D399] shadow-[0_1px_2px_rgba(0,0,0,0.02)] cursor-default"
                    >
                      <div className="p-2 sm:p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center">
                        {item.icon}
                      </div>
                      <span className="font-mono text-[12px] sm:text-[13px] font-semibold tracking-tight text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                        {item.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* How Might We Callout Box / Problem Statement */}
              <div className="pt-6 pb-2">
                <div className="w-full sm:w-[115%] sm:-ml-[7.5%] p-8 sm:p-12 sm:py-14 rounded-[20px] sm:rounded-[24px] bg-[#F5F5F7] dark:bg-[#18181B] flex flex-col items-start text-left gap-4 sm:gap-6 overflow-hidden">
                  <h4 className="font-serif italic text-[18px] sm:text-[20px] text-neutral-600 dark:text-neutral-400 font-normal">
                    Problem Statement
                  </h4>
                  <p className="text-[24px] sm:text-[32px] md:text-[35px] font-sans font-medium text-[#475569] dark:text-[#CBD5E1] leading-[1.35] tracking-tight">
                    How might we transform programming education from a desk-bound IDE experience into an{" "}
                    <span className="text-[#0284c7] dark:text-[#38bdf8] font-bold">
                      accessible, bite-sized mobile learning tool
                    </span>
                    ?
                  </p>
                </div>
              </div>
            </div>

            {/* SOLUTION SHOWCASE */}
            <div id="solution" className="space-y-6 scroll-mt-20 pt-8">
              <span className="font-mono text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#10B981] dark:text-[#34D399] block">
                THE SOLUTION
              </span>
              <h3 className="text-[28px] sm:text-[32px] instrument-serif italic text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                Tactile mobile interactions combined with structured learning paths.
              </h3>

              {/* Screens1.webp - Solution Banner */}
              <div className="w-full sm:w-[125%] sm:-ml-[12.5%] lg:w-[135%] lg:-ml-[17.5%] my-6">
                <img
                  src="/codedex/Screens1.webp"
                  alt="CodeDex Mobile Screen 1"
                  className="w-full h-auto object-contain rounded-xl"
                />
              </div>

              {/* Screens2.webp - Full Width */}
              <div className="w-full sm:w-[125%] sm:-ml-[12.5%] lg:w-[135%] lg:-ml-[17.5%] my-6">
                <img
                  src="/codedex/Screens2.webp"
                  alt="CodeDex Mobile Solution Overview"
                  className="w-full h-auto object-contain rounded-xl"
                />
              </div>

              {/* Screens3.webp & Screens4.webp - 2 Column Grid */}
              <div className="w-full sm:w-[125%] sm:-ml-[12.5%] lg:w-[135%] lg:-ml-[17.5%] my-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <img
                  src="/codedex/Screens3.webp"
                  alt="CodeDex Interactive Screen 3"
                  className="w-full h-auto object-contain rounded-xl"
                />
                <img
                  src="/codedex/Screens4.webp"
                  alt="CodeDex Interactive Screen 4"
                  className="w-full h-auto object-contain rounded-xl"
                />
              </div>

              {/* Screens5.webp - 1 Column Full Width */}
              <div className="w-full sm:w-[125%] sm:-ml-[12.5%] lg:w-[135%] lg:-ml-[17.5%] my-6">
                <img
                  src="/codedex/Screens5.webp"
                  alt="CodeDex Interactive Screen 5"
                  className="w-full h-auto object-contain rounded-xl"
                />
              </div>

              {/* Screens6.webp & Screens7.webp - 2 Column Grid */}
              <div className="w-full sm:w-[125%] sm:-ml-[12.5%] lg:w-[135%] lg:-ml-[17.5%] my-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <img
                  src="/codedex/Screens6.webp"
                  alt="CodeDex Interactive Screen 6"
                  className="w-full h-auto object-contain rounded-xl"
                />
                <img
                  src="/codedex/Screens7.webp"
                  alt="CodeDex Interactive Screen 7"
                  className="w-full h-auto object-contain rounded-xl"
                />
              </div>

              {/* Screens8.webp - 1 Column Full Width */}
              <div className="w-full sm:w-[125%] sm:-ml-[12.5%] lg:w-[135%] lg:-ml-[17.5%] my-6">
                <img
                  src="/codedex/Screens8.webp"
                  alt="CodeDex Interactive Screen 8"
                  className="w-full h-auto object-contain rounded-xl"
                />
              </div>

              {/* Screens9.webp - 1 Column Full Width */}
              <div className="w-full sm:w-[125%] sm:-ml-[12.5%] lg:w-[135%] lg:-ml-[17.5%] my-6">
                <img
                  src="/codedex/Screens9.webp"
                  alt="CodeDex Interactive Screen 9"
                  className="w-full h-auto object-contain rounded-xl"
                />
              </div>

              {/* Screens10.webp - 1 Column Full Width */}
              <div className="w-full sm:w-[125%] sm:-ml-[12.5%] lg:w-[135%] lg:-ml-[17.5%] my-6">
                <img
                  src="/codedex/Screens10.webp"
                  alt="CodeDex Interactive Screen 10"
                  className="w-full h-auto object-contain rounded-xl"
                />
              </div>
            </div>

            {/* TAKEAWAYS */}
            <div id="takeaways" className="pt-8 space-y-5 scroll-mt-20">
              <div className="space-y-1">
                <span className="font-mono text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#10B981] dark:text-[#34D399] block">
                  TAKEAWAYS
                </span>
                <h3 className="text-[28px] sm:text-[32px] instrument-serif italic text-[#2C2C2C] dark:text-[#F2F2F2] tracking-tight leading-snug">
                  Mobile learning is less about replacing desktop IDEs and more about <span className="bg-[#DEFFD9] text-[#166534] dark:bg-[#064E3B] dark:text-[#34D399] px-1.5 py-0.5 rounded box-decoration-clone">making practice frictionless and daily.</span>
                </h3>
              </div>

              {/* 2-Column Takeaways Cards */}
              <div className="w-[calc(100%+2rem)] -ml-[1rem] sm:w-[115%] sm:-ml-[7.5%] px-4 sm:px-0 pt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {/* Card 1 */}
                  <div className="relative w-full h-full p-6 sm:p-8 rounded-[24px] sm:rounded-[32px] bg-[#DEFFD9]/80 dark:bg-[#064E3B]/40 flex flex-col items-start justify-center text-left space-y-4 sm:space-y-6 border border-[#BFF6B3] dark:border-[#064E3B]/60">
                    <img src="/laptop.svg" alt="Tactile Interactions" className="w-24 h-24 sm:w-28 sm:h-28 object-contain -mb-4 sm:-mb-6" />
                    <div className="space-y-3">
                      <h4 className="font-sans font-medium text-[20px] sm:text-[24px] text-[#2C2C2C] dark:text-[#F2F2F2] leading-tight pr-4">
                        Tactile Micro-Interactions
                      </h4>
                      <p className="text-[15px] sm:text-[16px] text-[#2C2C2C] dark:text-[#CBD5E1] leading-relaxed font-sans pr-2">
                        Custom touch keypads, drag-and-drop code blocks, and instant visual feedback turn abstract programming concepts into hands-on learning.
                      </p>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className="relative w-full h-full p-6 sm:p-8 rounded-[24px] sm:rounded-[32px] bg-[#DEFFD9]/80 dark:bg-[#064E3B]/40 flex flex-col items-start justify-center text-left space-y-4 sm:space-y-6 border border-[#BFF6B3] dark:border-[#064E3B]/60">
                    <img src="/idea.svg" alt="Short Feedback Loops" className="w-24 h-24 sm:w-28 sm:h-28 object-contain scale-125 sm:scale-150 origin-left" />
                    <div className="space-y-3">
                      <h4 className="font-sans font-medium text-[20px] sm:text-[24px] text-[#2C2C2C] dark:text-[#F2F2F2] leading-tight pr-4">
                        Short Feedback Loops
                      </h4>
                      <p className="text-[15px] sm:text-[16px] text-[#2C2C2C] dark:text-[#CBD5E1] leading-relaxed font-sans pr-2">
                        Instant error diagnosis and bite-sized exercises keep learners engaged, transforming practice into a satisfying daily habit.
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
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-2 text-[#10B981] dark:text-[#34D399] hover:opacity-80 transition-opacity font-medium font-sans text-[15.5px]"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
              <span className="underline underline-offset-4 decoration-2">Scroll Back to Top</span>
            </button>
          </div>
        </article>

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
              href="/orca"
              onClick={() => playTone(880)}
              className="px-6 py-2.5 sm:px-7 sm:py-3 rounded-full border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#141415] hover:bg-neutral-100 dark:hover:bg-neutral-800 text-[#2C2C2C] dark:text-[#F2F2F2] transition-all font-sans font-medium text-[14px] sm:text-[15px] shadow-sm flex items-center space-x-2 cursor-pointer"
            >
              <span>Next project &rarr;</span>
            </Link>
          </div>

          {/* Single Next Project Card */}
          <Link
            href="/orca"
            onClick={() => playTone(880)}
            className="group relative block w-full rounded-[24px] overflow-hidden cursor-pointer hover:opacity-95 transition-opacity"
          >
            <img 
              src="/next-orca.svg" 
              alt="Next Project - ORCA AI Research Assistant" 
              className="w-full h-auto block" 
            />
            <div className="absolute inset-0 p-6 sm:p-8 lg:p-10 flex flex-col justify-start max-w-[55%] sm:max-w-[48%] lg:max-w-[46%] space-y-2 pointer-events-none">
              <span className="font-mono text-[11px] sm:text-[12px] uppercase tracking-wider font-semibold text-white/70">
                NEXT PROJECT
              </span>
              <h3 className="font-sans font-medium text-[18px] sm:text-[24px] lg:text-[28px] text-white group-hover:text-white/85 transition-colors leading-snug">
                AI research assistant that turns complex papers into clear, cited answers.
              </h3>
            </div>
          </Link>

          <Footer fullWidth={false} />
        </div>
      </main>
    </div>
  );
}
