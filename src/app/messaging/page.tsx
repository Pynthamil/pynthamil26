"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Moon,
  Sun,
  Github,
  Lock,
  MessageSquare,
  Shield,
  Zap,
  Server,
  Layers,
  Sparkles,
  HelpCircle
} from "lucide-react";
import { ProjectSidebar } from "@/components/ProjectSidebar";

export default function MessagingProjectPage() {
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
      icon: <MessageSquare className="w-5 h-5 text-[#00BF63] dark:text-[#E4FFC1]" strokeWidth={1.5} />,
      title: "PHONE DEPENDENCY",
    },
    {
      icon: <Shield className="w-5 h-5 text-[#00BF63] dark:text-[#E4FFC1]" strokeWidth={1.5} />,
      title: "PRIVACY TRADE-OFFS",
    },
    {
      icon: <Server className="w-5 h-5 text-[#00BF63] dark:text-[#E4FFC1]" strokeWidth={1.5} />,
      title: "CENTRALIZED RISKS",
    },
    {
      icon: <Zap className="w-5 h-5 text-[#00BF63] dark:text-[#E4FFC1]" strokeWidth={1.5} />,
      title: "UNRELIABLE DELIVERY",
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
            className="font-mono text-[15px] sm:text-[15.5px] tracking-tight text-[#2C2C2C] dark:text-[#F2F2F2] hover:text-[#00BF63] dark:hover:text-[#E4FFC1] transition-colors flex items-center space-x-1.5 focus:outline-none font-medium cursor-pointer"
          >
            <span>&larr;</span>
            <span>home</span>
          </Link>

          <div className="flex items-center space-x-3.5">
            <a
              href="https://github.com/Pynthamil/kivo.git"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playTone(880)}
              className="inline-flex items-center space-x-2 px-2.5 py-1.5 sm:py-1 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-[#13151E]/50 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors group cursor-pointer"
              title="View Source on GitHub"
            >
              <Github className="w-3.5 h-3.5 text-[#2C2C2C] dark:text-[#F2F2F2] group-hover:text-[#00BF63] dark:group-hover:text-[#E4FFC1] transition-colors" strokeWidth={2} />
              <span className="font-mono text-xs sm:text-[13px] text-[#2C2C2C] dark:text-[#F2F2F2] group-hover:text-[#00BF63] dark:group-hover:text-[#E4FFC1] font-medium tracking-tight transition-colors">
                repo
              </span>
            </a>
            
            <button
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              className="p-1 text-[#2C2C2C] dark:text-[#F2F2F2] hover:text-[#00BF63] dark:hover:text-[#E4FFC1] transition-colors focus:outline-none cursor-pointer flex items-center justify-center"
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
              Kivo
            </h1>
            <h3 className="text-[19px] sm:text-[21px] font-normal text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
              A privacy-first messaging platform built for speed, security, and control.
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-4 pb-12">
              <div>
                <span className="font-mono text-[13px] sm:text-[14px] font-semibold text-[#00BF63] dark:text-[#E4FFC1] block mb-1">
                  ROLE
                </span>
                <span className="text-[16px] sm:text-[17px] text-[#2C2C2C] dark:text-[#F2F2F2]">
                  Product Engineer
                </span>
              </div>
              <div>
                <span className="font-mono text-[13px] sm:text-[14px] font-semibold text-[#00BF63] dark:text-[#E4FFC1] block mb-1">
                  TIMELINE
                </span>
                <span className="text-[16px] sm:text-[17px] text-[#2C2C2C] dark:text-[#F2F2F2]">
                  2026
                </span>
              </div>
              <div>
                <span className="font-mono text-[13px] sm:text-[14px] font-semibold text-[#00BF63] dark:text-[#E4FFC1] block mb-1">
                  SKILLS
                </span>
                <span className="text-[16px] sm:text-[17px] text-[#2C2C2C] dark:text-[#F2F2F2]">
                  Distributed Systems
                </span>
              </div>
              <div>
                <span className="font-mono text-[13px] sm:text-[14px] font-semibold text-[#00BF63] dark:text-[#E4FFC1] block mb-1">
                  TECH
                </span>
                <span className="text-[16px] sm:text-[17px] text-[#2C2C2C] dark:text-[#F2F2F2]">
                  React, Node, Kafka, Redis
                </span>
              </div>
            </div>
            
            <div className="w-[100vw] sm:w-[800px] max-w-[100vw] relative left-1/2 -translate-x-1/2 my-10 flex items-center justify-center px-4 sm:px-0">
              <style>{`
                @keyframes floatLeft {
                  0%, 100% { transform: translateY(0) rotate(-12deg); }
                  50% { transform: translateY(-20px) rotate(-5deg); }
                }
                @keyframes floatRight {
                  0%, 100% { transform: translateY(0) rotate(12deg); }
                  50% { transform: translateY(20px) rotate(19deg); }
                }
                @keyframes popIn {
                  0% { transform: scale(0.85); opacity: 0; }
                  100% { transform: scale(1); opacity: 1; }
                }
                .anim-float-left { animation: floatLeft 8s ease-in-out infinite; }
                .anim-float-right { animation: floatRight 10s ease-in-out infinite; }
                .anim-pop-in { animation: popIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
              `}</style>
              <div className="w-full h-[300px] sm:h-[400px] rounded-xl overflow-hidden flex flex-col items-center justify-center bg-[#13151E] dark:bg-[#0B0C10] shadow-[inset_0_0_100px_rgba(0,0,0,0.5)] relative">
                
                {/* Background faint shapes */}
                <svg viewBox="0 0 24 24" className="absolute -left-10 bottom-0 w-64 h-64 fill-[#E4FFC1] opacity-5 anim-float-left">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21H16.5C17.8978 21 18.5967 21 19.1481 20.7716C19.8831 20.4672 20.4672 19.8831 20.7716 19.1481C21 18.5967 21 17.8978 21 16.5V12C21 7.02944 16.9706 3 12 3ZM8 11C8 10.4477 8.44772 10 9 10H15C15.5523 10 16 10.4477 16 11C16 11.5523 15.5523 12 15 12H9C8.44772 12 8 11.5523 8 11ZM11 15C11 14.4477 11.4477 14 12 14H15C15.5523 14 16 14.4477 16 15C16 15.5523 15.5523 16 15 16H12C11.4477 16 11 15.5523 11 15Z" />
                </svg>
                <svg viewBox="0 0 24 24" className="absolute -right-10 top-5 w-80 h-80 fill-[#E4FFC1] opacity-5 anim-float-right">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21H16.5C17.8978 21 18.5967 21 19.1481 20.7716C19.8831 20.4672 20.4672 19.8831 20.7716 19.1481C21 18.5967 21 17.8978 21 16.5V12C21 7.02944 16.9706 3 12 3ZM8 11C8 10.4477 8.44772 10 9 10H15C15.5523 10 16 10.4477 16 11C16 11.5523 15.5523 12 15 12H9C8.44772 12 8 11.5523 8 11ZM11 15C11 14.4477 11.4477 14 12 14H15C15.5523 14 16 14.4477 16 15C16 15.5523 15.5523 16 15 16H12C11.4477 16 11 15.5523 11 15Z" />
                </svg>

                {/* Logo with selection box */}
                <div className="relative inline-flex items-center gap-3 sm:gap-5 p-5 sm:p-7 border border-dashed border-[#E4FFC1]/20 anim-pop-in">
                  {/* Selection Handles */}
                  <div className="absolute -top-1.5 -left-1.5 w-3 h-3 border border-[#E4FFC1]/20 bg-[#13151E] dark:bg-[#0B0C10]"></div>
                  <div className="absolute -top-1.5 -right-1.5 w-3 h-3 border border-[#E4FFC1]/20 bg-[#13151E] dark:bg-[#0B0C10]"></div>
                  <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 border border-[#E4FFC1]/20 bg-[#13151E] dark:bg-[#0B0C10]"></div>
                  <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border border-[#E4FFC1]/20 bg-[#13151E] dark:bg-[#0B0C10]"></div>
                  
                  {/* Center top/bottom/left/right handles */}
                  <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 border border-[#E4FFC1]/20 bg-[#13151E] dark:bg-[#0B0C10]"></div>
                  <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 border border-[#E4FFC1]/20 bg-[#13151E] dark:bg-[#0B0C10]"></div>
                  <div className="absolute top-1/2 -translate-y-1/2 -left-1.5 w-3 h-3 border border-[#E4FFC1]/20 bg-[#13151E] dark:bg-[#0B0C10]"></div>
                  <div className="absolute top-1/2 -translate-y-1/2 -right-1.5 w-3 h-3 border border-[#E4FFC1]/20 bg-[#13151E] dark:bg-[#0B0C10]"></div>

                  {/* Icon */}
                  <svg viewBox="0 0 24 24" className="w-12 h-12 sm:w-16 sm:h-16 fill-[#E4FFC1] hover:scale-110 transition-transform duration-300 ease-out cursor-pointer">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21H16.5C17.8978 21 18.5967 21 19.1481 20.7716C19.8831 20.4672 20.4672 19.8831 20.7716 19.1481C21 18.5967 21 17.8978 21 16.5V12C21 7.02944 16.9706 3 12 3ZM8 11C8 10.4477 8.44772 10 9 10H15C15.5523 10 16 10.4477 16 11C16 11.5523 15.5523 12 15 12H9C8.44772 12 8 11.5523 8 11ZM11 15C11 14.4477 11.4477 14 12 14H15C15.5523 14 16 14.4477 16 15C16 15.5523 15.5523 16 15 16H12C11.4477 16 11 15.5523 11 15Z" />
                  </svg>
                  
                  {/* Text */}
                  <span className="text-[52px] sm:text-[72px] font-sans font-black tracking-tighter text-[#E4FFC1] leading-none lowercase -mt-2">
                    kivo
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8 text-[16px] sm:text-[17.5px] text-[#2C2C2C] dark:text-[#F2F2F2] leading-[1.8] font-sans pt-1">
            
            {/* OVERVIEW */}
            <div id="overview" className="space-y-4 scroll-mt-20 pt-6">
              <span className="font-mono text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#00BF63] dark:text-[#E4FFC1] block">
                OVERVIEW
              </span>
              <h3 className="text-[28px] sm:text-[32px] instrument-serif italic text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                Built a real-time messaging platform that replaces phone-number-based identity with cryptographic user identities.
              </h3>
              <p className="text-[16px] sm:text-[17.5px] text-[#475569] dark:text-[#CBD5E1] leading-relaxed my-4">
                The platform combines end-to-end encrypted communication with a fast, minimal interface. The project explores how a messaging product can provide the convenience of mainstream chat apps without relying on advertising, invasive tracking, or exposing users’ personal identifiers.
              </p>
            </div>


            
            <div className="pt-2 pb-2 flex">
              <a href="#solution" className="inline-flex items-center gap-2 font-mono text-[13px] sm:text-[14px] px-4 py-2 bg-[#13151E] dark:bg-[#F2F2F2] text-white dark:text-[#13151E] hover:bg-[#2C2C2C] dark:hover:bg-neutral-300 transition-all rounded-xl shadow-sm group">
                Jump to Solution
                <span className="group-hover:translate-y-0.5 transition-transform">&darr;</span>
              </a>
            </div>

            {/* PROBLEM */}
            <div id="problem" className="space-y-4 scroll-mt-20 pt-10">
              <span className="font-mono text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#00BF63] dark:text-[#E4FFC1] block">
                PROBLEM
              </span>
              <h3 className="text-[28px] sm:text-[32px] instrument-serif italic text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                Messaging is convenient, but privacy often comes with trade-offs
              </h3>
              <p className="text-[16px] sm:text-[17.5px] text-[#475569] dark:text-[#CBD5E1] leading-relaxed pt-2">
                Modern messaging apps make communication effortless, but users are often identified through phone numbers, surrounded by unnecessary data collection, and dependent on infrastructure where privacy and convenience aren't always designed together.
              </p>
              
              <div className="pt-2">
                <span className="font-mono text-[11px] sm:text-[12px] uppercase tracking-wider font-semibold text-[#475569] dark:text-[#CBD5E1] block mb-3">
                  Core Pain Points
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
                  {painPoints.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-white/70 dark:bg-[#13151E]/90 border border-neutral-200 dark:border-[#E4FFC1]/20 rounded-xl p-3.5 sm:p-4 flex flex-col items-center justify-center text-center space-y-2.5 transition-all hover:border-[#00BF63] dark:hover:border-[#E4FFC1] shadow-[0_1px_2px_rgba(0,0,0,0.02)] cursor-default"
                    >
                      <div className="p-1 rounded-xl bg-neutral-50 dark:bg-[#00BF63]/10 flex items-center justify-center">
                        {item.icon}
                      </div>
                      <span className="font-mono text-[10.5px] sm:text-[11px] font-semibold tracking-tight text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                        {item.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* THE OPPORTUNITY */}
            <div className="scroll-mt-20 -mt-2">
              <div className="p-6 sm:p-8 rounded-xl border border-[#00BF63] dark:border-[#E4FFC1] bg-[#00BF63]/[0.05] dark:bg-[#E4FFC1]/[0.08] flex flex-col items-center justify-center text-center gap-3">
                <HelpCircle className="w-5 h-5 text-[#00BF63] dark:text-[#E4FFC1] shrink-0" strokeWidth={2} />
                <h3 className="text-[24px] sm:text-[28px] instrument-serif font-normal text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                  How might we design a messaging platform that feels as fast and effortless as mainstream messaging apps while fundamentally changing how identity, privacy, and message delivery are handled?
                </h3>
              </div>
            </div>


            {/* THE SOLUTION */}
            <div id="solution" className="space-y-6 scroll-mt-20 pt-8">
              <div className="space-y-4">
                <span className="font-mono text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#00BF63] dark:text-[#E4FFC1] block">
                  THE SOLUTION
                </span>
                <h3 className="text-[28px] sm:text-[32px] instrument-serif italic text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                  A real-time messaging system designed around privacy rather than added as a feature.
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div className="space-y-3 p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#13151E]">
                  <h4 className="font-mono text-[13px] font-semibold text-[#ef4444] tracking-wider uppercase">BEFORE</h4>
                  <ul className="list-disc pl-4 space-y-2.5 text-[14.5px] text-[#475569] dark:text-[#CBD5E1] marker:text-[#ef4444]">
                    <li className="pl-1 hover:underline hover:decoration-wavy hover:underline-offset-[3px] decoration-[#ef4444]/40 dark:decoration-[#ef4444]/40 transition-all cursor-default">Phone-number-centric identity</li>
                    <li className="pl-1 hover:underline hover:decoration-wavy hover:underline-offset-[3px] decoration-[#ef4444]/40 dark:decoration-[#ef4444]/40 transition-all cursor-default">WebSocket handles everything</li>
                    <li className="pl-1 hover:underline hover:decoration-wavy hover:underline-offset-[3px] decoration-[#ef4444]/40 dark:decoration-[#ef4444]/40 transition-all cursor-default">Synchronous processing</li>
                    <li className="pl-1 hover:underline hover:decoration-wavy hover:underline-offset-[3px] decoration-[#ef4444]/40 dark:decoration-[#ef4444]/40 transition-all cursor-default">Ephemeral message state</li>
                    <li className="pl-1 hover:underline hover:decoration-wavy hover:underline-offset-[3px] decoration-[#ef4444]/40 dark:decoration-[#ef4444]/40 transition-all cursor-default">Prototype-oriented architecture</li>
                  </ul>
                </div>
                <div className="space-y-3 p-5 rounded-xl border border-[#10b981]/20 dark:border-[#10b981]/20 bg-[#10b981]/[0.02] dark:bg-[#10b981]/[0.02]">
                  <h4 className="font-mono text-[13px] font-semibold text-[#10b981] tracking-wider uppercase">AFTER</h4>
                  <ul className="list-disc pl-4 space-y-2.5 text-[14.5px] text-[#475569] dark:text-[#CBD5E1] marker:text-[#10b981]">
                    <li className="pl-1 hover:underline hover:decoration-wavy hover:underline-offset-[3px] decoration-[#10b981]/40 dark:decoration-[#10b981]/40 transition-all cursor-default">Generated / cryptographic identity</li>
                    <li className="pl-1 hover:underline hover:decoration-wavy hover:underline-offset-[3px] decoration-[#10b981]/40 dark:decoration-[#10b981]/40 transition-all cursor-default">Event-driven architecture</li>
                    <li className="pl-1 hover:underline hover:decoration-wavy hover:underline-offset-[3px] decoration-[#10b981]/40 dark:decoration-[#10b981]/40 transition-all cursor-default">Kafka-backed asynchronous processing</li>
                    <li className="pl-1 hover:underline hover:decoration-wavy hover:underline-offset-[3px] decoration-[#10b981]/40 dark:decoration-[#10b981]/40 transition-all cursor-default">Durable message persistence</li>
                    <li className="pl-1 hover:underline hover:decoration-wavy hover:underline-offset-[3px] decoration-[#10b981]/40 dark:decoration-[#10b981]/40 transition-all cursor-default">Scalable service boundaries</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* ARCHITECTURE */}
            <div className="space-y-4 -mt-4">
              <h3 className="text-[28px] sm:text-[32px] instrument-serif italic text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                Separating <span className="bg-[#E4FFC1] dark:bg-[#00BF63] dark:text-white px-1 box-decoration-clone">real-time delivery from durable message processing.</span>
              </h3>
              
              <div className="p-6 sm:p-10 bg-neutral-50 dark:bg-[#13151E] border border-neutral-200 dark:border-neutral-800 rounded-xl mt-4 flex flex-col items-center text-sm sm:text-[15px] text-[#2C2C2C] dark:text-[#F2F2F2] font-medium w-full">
                
                <div className="text-[#00BF63] dark:text-[#E4FFC1] font-bold tracking-widest text-xs uppercase mb-3">Client</div>
                
                <div className="w-px h-6 bg-neutral-300 dark:bg-neutral-700"></div>
                <div className="py-2 text-center text-neutral-600 dark:text-neutral-400">Generate identity keys</div>
                
                <div className="w-px h-6 bg-neutral-300 dark:bg-neutral-700"></div>
                <div className="py-2 text-center text-neutral-600 dark:text-neutral-400">Encrypt message</div>
                
                {/* Arrow */}
                <div className="w-px h-6 bg-neutral-300 dark:bg-neutral-700 relative">
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 border-b-2 border-r-2 border-neutral-300 dark:border-neutral-700 rotate-45"></div>
                </div>
                
                <div className="mt-3 px-6 py-3 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-[#1A1C23] text-center w-64 shadow-sm">
                  <div className="font-semibold">WebSocket API</div>
                  <div className="text-neutral-500 dark:text-neutral-400 text-xs mt-0.5">Gateway</div>
                </div>

                {/* Arrow */}
                <div className="w-px h-6 bg-neutral-300 dark:bg-neutral-700 relative mt-1">
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 border-b-2 border-r-2 border-neutral-300 dark:border-neutral-700 rotate-45"></div>
                </div>

                <div className="mt-3 px-6 py-3 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-[#1A1C23] text-center w-64 shadow-sm font-semibold">
                  Kafka
                </div>

                {/* Arrow */}
                <div className="w-px h-6 bg-neutral-300 dark:bg-neutral-700 relative mt-1">
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 border-b-2 border-r-2 border-neutral-300 dark:border-neutral-700 rotate-45"></div>
                </div>

                <div className="mt-3 py-2 text-center font-semibold">Message Workers</div>

                {/* Split */}
                <div className="flex w-64 mt-2">
                  <div className="w-1/2 border-t-2 border-r-2 border-neutral-300 dark:border-neutral-700 h-6 rounded-tr-lg relative">
                    <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-neutral-300 dark:border-neutral-700 -rotate-45"></div>
                  </div>
                  <div className="w-1/2 border-t-2 border-l-2 border-neutral-300 dark:border-neutral-700 h-6 rounded-tl-lg relative">
                    <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-neutral-300 dark:border-neutral-700 rotate-45"></div>
                  </div>
                </div>

                <div className="flex w-64 justify-between mt-2 text-center text-sm font-semibold">
                  <div className="w-1/2 text-[#00BF63] dark:text-[#E4FFC1]">Online</div>
                  <div className="w-1/2 text-neutral-500">Offline</div>
                </div>

                {/* Down arrows */}
                <div className="flex w-64 justify-between mt-2">
                  <div className="w-1/2 flex justify-center">
                    <div className="w-px h-6 bg-neutral-300 dark:bg-neutral-700 relative">
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 border-b-2 border-r-2 border-neutral-300 dark:border-neutral-700 rotate-45"></div>
                    </div>
                  </div>
                  <div className="w-1/2 flex justify-center">
                    <div className="w-px h-6 bg-neutral-300 dark:bg-neutral-700 relative">
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 border-b-2 border-r-2 border-neutral-300 dark:border-neutral-700 rotate-45"></div>
                    </div>
                  </div>
                </div>

                <div className="flex w-[280px] sm:w-[320px] justify-between mt-3 text-center">
                  <div className="w-1/2 px-2 text-neutral-600 dark:text-neutral-400 text-[13px] sm:text-sm">WebSocket<br/>delivery</div>
                  <div className="w-1/2 px-2 text-neutral-600 dark:text-neutral-400 text-[13px] sm:text-sm">Persistent<br/>storage</div>
                </div>

                {/* Merge */}
                <div className="flex w-64 mt-4 h-6">
                  <div className="w-1/2 border-b-2 border-l-2 border-neutral-300 dark:border-neutral-700 rounded-bl-lg"></div>
                  <div className="w-1/2 border-b-2 border-r-2 border-neutral-300 dark:border-neutral-700 rounded-br-lg"></div>
                </div>
                
                {/* Final arrow */}
                <div className="w-px h-6 bg-neutral-300 dark:bg-neutral-700 relative">
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 border-b-2 border-r-2 border-neutral-300 dark:border-neutral-700 rotate-45"></div>
                </div>

                <div className="mt-3 text-[#00BF63] dark:text-[#E4FFC1] font-bold tracking-widest text-xs uppercase">Recipient</div>
                
              </div>
              <p className="text-[16px] sm:text-[17.5px] text-[#475569] dark:text-[#CBD5E1] leading-relaxed my-4">
                Kafka acts as the event backbone, while Redis handles short-lived state such as presence and PostgreSQL provides durable persistence.
              </p>
            </div>

            {/* THE INTERESTING PART */}
            <div className="space-y-4 -mt-4">
              <h3 className="text-[28px] sm:text-[32px] instrument-serif italic text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                Making "instant" messaging reliable: <span className="bg-[#E4FFC1] dark:bg-[#00BF63] dark:text-white px-1 box-decoration-clone">a distributed-systems problem.</span>
              </h3>
              <ul className="list-disc pl-5 space-y-3 text-[16px] sm:text-[17.5px] text-[#475569] dark:text-[#CBD5E1] pt-3 marker:text-[#00BF63] dark:marker:text-[#E4FFC1]">
                <li className="pl-1 hover:underline hover:decoration-wavy hover:underline-offset-[3px] decoration-[#00BF63]/40 dark:decoration-[#E4FFC1]/40 transition-all cursor-default"><strong className="font-medium text-[#2C2C2C] dark:text-[#F2F2F2]">Cryptographic identity:</strong> Users receive a unique messaging identity rather than needing to expose their phone number.</li>
                <li className="pl-1 hover:underline hover:decoration-wavy hover:underline-offset-[3px] decoration-[#00BF63]/40 dark:decoration-[#E4FFC1]/40 transition-all cursor-default"><strong className="font-medium text-[#2C2C2C] dark:text-[#F2F2F2]">End-to-end encryption:</strong> Messages are encrypted on the client before transmission.</li>
                <li className="pl-1 hover:underline hover:decoration-wavy hover:underline-offset-[3px] decoration-[#00BF63]/40 dark:decoration-[#E4FFC1]/40 transition-all cursor-default"><strong className="font-medium text-[#2C2C2C] dark:text-[#F2F2F2]">Offline delivery:</strong> Messages aren't lost when a recipient disconnects. They are persisted and delivered when they reconnect.</li>
                <li className="pl-1 hover:underline hover:decoration-wavy hover:underline-offset-[3px] decoration-[#00BF63]/40 dark:decoration-[#E4FFC1]/40 transition-all cursor-default"><strong className="font-medium text-[#2C2C2C] dark:text-[#F2F2F2]">Reliable events:</strong> Kafka provides an event-driven pipeline for handling message delivery, retries, and asynchronous processing.</li>
              </ul>
            </div>

            {/* ITERATING */}
            <div className="space-y-5 -mt-4">
              <div className="space-y-4">
                <h3 className="text-[28px] sm:text-[32px] instrument-serif italic text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                  What went wrong initially: <span className="bg-[#E4FFC1] dark:bg-[#00BF63] dark:text-white px-1 box-decoration-clone">tightly coupled message delivery.</span>
                </h3>
              </div>
              <p className="text-[16px] sm:text-[17.5px] text-[#475569] dark:text-[#CBD5E1] leading-relaxed pt-2">
                <strong className="text-[#2C2C2C] dark:text-[#F2F2F2]">The problem:</strong> My first architecture treated the WebSocket server as the central point responsible for receiving, processing, storing, and delivering messages. A WebSocket failure could affect delivery, persistence, and message state simultaneously.
              </p>
              <p className="text-[16px] sm:text-[17.5px] text-[#475569] dark:text-[#CBD5E1] leading-relaxed pt-2">
                <strong className="text-[#2C2C2C] dark:text-[#F2F2F2]">The fix:</strong> Separated responsibilities: <code>WebSocket &rarr; Kafka &rarr; workers &rarr; persistence / delivery</code>. This made the system more resilient and gave each component a clearer responsibility.
              </p>
            </div>

            {/* TAKEAWAYS */}
            <div id="takeaways" className="pt-8 space-y-5 scroll-mt-20">
              <div className="space-y-1">
                <span className="font-mono text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#00BF63] dark:text-[#E4FFC1] block">
                  TAKEAWAYS
                </span>
                <h3 className="text-[28px] sm:text-[32px] instrument-serif italic text-[#2C2C2C] dark:text-[#F2F2F2] tracking-tight leading-snug">
                  How does this remain correct when everything goes wrong?
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="p-5 sm:p-6 rounded-xl border border-[#00BF63] dark:border-[#E4FFC1] bg-[#00BF63]/[0.04] dark:bg-[#E4FFC1]/[0.07] flex flex-col items-center text-center space-y-3 transition-colors hover:bg-[#00BF63]/[0.08] dark:hover:bg-[#E4FFC1]/[0.12]">
                  <div className="p-2 rounded-xl bg-[#00BF63]/15 dark:bg-[#E4FFC1]/20 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-[#00BF63] dark:text-[#E4FFC1]" strokeWidth={1.5} />
                  </div>
                  <h4 className="instrument-serif text-[22px] sm:text-[24px] text-[#00BF63] dark:text-[#E4FFC1] uppercase pt-1">Reliability over latency</h4>
                  <p className="text-[16px] sm:text-[17px] text-[#2C2C2C] dark:text-[#CBD5E1] leading-relaxed font-sans">
                    Real-time systems are reliability problems, not just latency problems. Making something feel instant is only one part; the harder problem is maintaining correctness when networks fail and events are duplicated.
                  </p>
                </div>

                <div className="p-5 sm:p-6 rounded-xl border border-[#00BF63] dark:border-[#E4FFC1] bg-[#00BF63]/[0.04] dark:bg-[#E4FFC1]/[0.07] flex flex-col items-center text-center space-y-3 transition-colors hover:bg-[#00BF63]/[0.08] dark:hover:bg-[#E4FFC1]/[0.12]">
                  <div className="p-2 rounded-xl bg-[#00BF63]/15 dark:bg-[#E4FFC1]/20 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-[#00BF63] dark:text-[#E4FFC1]" strokeWidth={1.5} />
                  </div>
                  <h4 className="instrument-serif text-[22px] sm:text-[24px] text-[#00BF63] dark:text-[#E4FFC1] uppercase pt-1">Privacy by design</h4>
                  <p className="text-[16px] sm:text-[17px] text-[#2C2C2C] dark:text-[#CBD5E1] leading-relaxed font-sans">
                    Privacy has to shape the architecture from the beginning. Designing the system around least-privilege data access and client-side encryption made privacy an architectural constraint rather than a marketing feature.
                  </p>
                </div>

              </div>
            </div>
          </div>
        
                {/* WIP BANNER */}
        <div className="w-full mt-12 mb-8 p-5 sm:p-6 border border-dashed border-[#00BF63]/40 dark:border-[#E4FFC1]/40 bg-[#00BF63]/[0.02] dark:bg-[#E4FFC1]/[0.04] rounded-none flex flex-col gap-2.5">
          <Lock className="w-4 h-4 text-[#00BF63] dark:text-[#E4FFC1]" strokeWidth={2.5} />
          <p className="text-[14.5px] sm:text-[15.5px] text-[#475569] dark:text-[#CBD5E1] leading-relaxed">
            The full case study is still a work in progress. For a more detailed walkthrough beyond this preview, <a href="mailto:pavendanpynthamil@gmail.com" className="text-[#2C2C2C] dark:text-[#F2F2F2] hover:text-[#00BF63] dark:hover:text-[#E4FFC1] underline decoration-wavy underline-offset-[5px] decoration-[#00BF63] dark:decoration-[#E4FFC1] decoration-2 transition-colors">reach out</a> directly!
          </p>
        </div>

        {/* Thanks for reading block */}
        <div className="flex flex-col items-center justify-center w-full pt-20 pb-4 mt-16 border-t border-neutral-100 dark:border-neutral-800/60">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 text-[#00BF63] dark:text-[#E4FFC1] hover:opacity-80 transition-opacity mb-8 font-medium font-sans text-[15.5px]"
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
        


        <div className="pt-16 pb-6 flex items-center justify-between w-full">
          <Link
            href="/"
            onClick={() => playTone(880)}
            className="font-mono text-[13.5px] sm:text-[14px] text-[#00BF63] dark:text-[#E4FFC1] hover:underline underline-offset-4 font-medium flex items-center space-x-1 cursor-pointer"
          >
            <span>&larr; back to home</span>
          </Link>
          <Link
            href="/orca"
            onClick={() => playTone(880)}
            className="font-mono text-[13.5px] sm:text-[14px] text-[#00BF63] dark:text-[#E4FFC1] hover:underline underline-offset-4 font-medium flex items-center space-x-1 cursor-pointer"
          >
            <span>next: orca.ai &rarr;</span>
          </Link>
        </div>
      </main>
    </div>
  );
}
