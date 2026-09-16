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
              className="inline-flex items-center space-x-2 px-2.5 py-1.5 sm:py-1 rounded-sm border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-[#13151E]/50 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors group cursor-pointer"
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
              <div className="w-full h-[300px] sm:h-[400px] rounded-sm overflow-hidden flex flex-col items-center justify-center bg-[#E4FFC1] dark:bg-[#00BF63] shadow-[inset_0_0_100px_rgba(0,0,0,0.05)] gap-4">
                  <span className="text-[#13151E] dark:text-white opacity-90 font-mono text-sm sm:text-base tracking-widest uppercase font-semibold">Kivo Platform</span>
              </div>
            </div>
          </div>

          <div className="space-y-8 text-[17px] sm:text-[19px] text-[#2C2C2C] dark:text-[#F2F2F2] leading-[1.8] font-sans pt-1">
            
            {/* OVERVIEW */}
            <div id="overview" className="space-y-4 scroll-mt-20 pt-6">
              <span className="font-mono text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#00BF63] dark:text-[#E4FFC1] block">
                OVERVIEW
              </span>
              <h3 className="text-[32px] sm:text-[36px] instrument-serif italic text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                Built a real-time messaging platform that replaces phone-number-based identity with cryptographic user identities.
              </h3>
              <p className="text-[17px] sm:text-[19px] text-[#475569] dark:text-[#CBD5E1] leading-relaxed my-4">
                The platform combines end-to-end encrypted communication with a fast, minimal interface. The project explores how a messaging product can provide the convenience of mainstream chat apps without relying on advertising, invasive tracking, or exposing users’ personal identifiers.
              </p>
            </div>


            
            <div className="pt-2 pb-2 flex">
              <a href="#solution" className="inline-flex items-center gap-2 font-mono text-[13px] sm:text-[14px] px-4 py-2 bg-[#13151E] dark:bg-[#F2F2F2] text-white dark:text-[#13151E] hover:bg-[#2C2C2C] dark:hover:bg-neutral-300 transition-all rounded-sm shadow-sm group">
                Jump to Solution
                <span className="group-hover:translate-y-0.5 transition-transform">&darr;</span>
              </a>
            </div>

            {/* PROBLEM */}
            <div id="problem" className="space-y-4 scroll-mt-20 pt-10">
              <span className="font-mono text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#00BF63] dark:text-[#E4FFC1] block">
                PROBLEM
              </span>
              <h3 className="text-[32px] sm:text-[36px] instrument-serif italic text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                Messaging is convenient, but privacy often comes with trade-offs
              </h3>
              <p className="text-[17px] sm:text-[19px] text-[#475569] dark:text-[#CBD5E1] leading-relaxed pt-2">
                Modern messaging apps make communication effortless, but users are often identified through phone numbers, surrounded by unnecessary data collection, and dependent on infrastructure where privacy and convenience aren't always designed together.
              </p>
              
              
            </div>



            {/* THE PROBLEM */}
            <div id="problem" className="scroll-mt-20 pt-8 mb-4">
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 pt-2">
                {painPoints.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white/70 dark:bg-[#13151E]/90 border border-neutral-200 dark:border-[#E4FFC1]/20 rounded-sm p-3.5 sm:p-4 flex flex-col items-center justify-center text-center space-y-2.5 transition-all hover:border-[#00BF63] dark:hover:border-[#E4FFC1] shadow-[0_1px_2px_rgba(0,0,0,0.02)] cursor-default"
                  >
                    <div className="p-1 rounded-sm bg-neutral-50 dark:bg-[#00BF63]/10 flex items-center justify-center">
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
              <div className="p-5 sm:p-6 rounded-sm border border-[#00BF63] dark:border-[#E4FFC1] bg-[#00BF63]/[0.05] dark:bg-[#E4FFC1]/[0.08] flex items-start gap-4">
                <HelpCircle className="w-5 h-5 text-[#00BF63] dark:text-[#E4FFC1] shrink-0 mt-0.5" strokeWidth={2} />
                <h3 className="text-[24px] sm:text-[28px] instrument-serif font-normal text-[#2C2C2C] dark:text-[#F2F2F2] leading-relaxed">
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
                <h3 className="text-[32px] sm:text-[36px] instrument-serif italic text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                  A real-time messaging system designed around privacy rather than added as a feature.
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div className="space-y-3 p-5 rounded-sm border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#13151E]">
                  <h4 className="font-mono text-[13px] font-semibold text-[#ef4444] tracking-wider">BEFORE</h4>
                  <ul className="list-disc pl-4 space-y-2.5 text-[14.5px] text-[#475569] dark:text-[#CBD5E1] marker:text-[#ef4444]">
                    <li className="pl-1 hover:underline hover:decoration-wavy hover:underline-offset-[3px] decoration-[#00BF63]/40 dark:decoration-[#E4FFC1]/40 transition-all cursor-default">Phone-number-centric identity</li>
                    <li className="pl-1 hover:underline hover:decoration-wavy hover:underline-offset-[3px] decoration-[#00BF63]/40 dark:decoration-[#E4FFC1]/40 transition-all cursor-default">WebSocket handles everything</li>
                    <li className="pl-1 hover:underline hover:decoration-wavy hover:underline-offset-[3px] decoration-[#00BF63]/40 dark:decoration-[#E4FFC1]/40 transition-all cursor-default">Synchronous processing</li>
                    <li className="pl-1 hover:underline hover:decoration-wavy hover:underline-offset-[3px] decoration-[#00BF63]/40 dark:decoration-[#E4FFC1]/40 transition-all cursor-default">Ephemeral message state</li>
                    <li className="pl-1 hover:underline hover:decoration-wavy hover:underline-offset-[3px] decoration-[#00BF63]/40 dark:decoration-[#E4FFC1]/40 transition-all cursor-default">Prototype-oriented architecture</li>
                  </ul>
                </div>
                <div className="space-y-3 p-5 rounded-sm border border-[#00BF63]/30 dark:border-[#E4FFC1]/30 bg-[#00BF63]/[0.03] dark:bg-[#E4FFC1]/[0.05]">
                  <h4 className="font-mono text-[13px] font-semibold text-[#00BF63] tracking-wider">AFTER</h4>
                  <ul className="list-disc pl-4 space-y-2.5 text-[14.5px] text-[#475569] dark:text-[#CBD5E1] marker:text-[#00BF63]">
                    <li className="pl-1 hover:underline hover:decoration-wavy hover:underline-offset-[3px] decoration-[#00BF63]/40 dark:decoration-[#E4FFC1]/40 transition-all cursor-default">Generated / cryptographic identity</li>
                    <li className="pl-1 hover:underline hover:decoration-wavy hover:underline-offset-[3px] decoration-[#00BF63]/40 dark:decoration-[#E4FFC1]/40 transition-all cursor-default">Event-driven architecture</li>
                    <li className="pl-1 hover:underline hover:decoration-wavy hover:underline-offset-[3px] decoration-[#00BF63]/40 dark:decoration-[#E4FFC1]/40 transition-all cursor-default">Kafka-backed asynchronous processing</li>
                    <li className="pl-1 hover:underline hover:decoration-wavy hover:underline-offset-[3px] decoration-[#00BF63]/40 dark:decoration-[#E4FFC1]/40 transition-all cursor-default">Durable message persistence</li>
                    <li className="pl-1 hover:underline hover:decoration-wavy hover:underline-offset-[3px] decoration-[#00BF63]/40 dark:decoration-[#E4FFC1]/40 transition-all cursor-default">Scalable service boundaries</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* ARCHITECTURE */}
            <div className="space-y-4 -mt-4">
              <h3 className="text-[32px] sm:text-[36px] instrument-serif italic text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                Separating <span className="bg-[#E4FFC1] dark:bg-[#00BF63] dark:text-white px-1 box-decoration-clone">real-time delivery from durable message processing.</span>
              </h3>
              
              <div className="p-6 bg-neutral-50 dark:bg-[#13151E] border border-neutral-200 dark:border-neutral-800 rounded-sm font-mono text-[13px] sm:text-sm text-center space-y-3 mt-4 overflow-x-auto">
                <pre className="text-left text-[#2C2C2C] dark:text-[#F2F2F2] font-mono text-xs leading-relaxed">
{`                         CLIENT
                           │
                 Generate identity keys
                           │
                    Encrypt message
                           │
                           ▼
                  ┌─────────────────┐
                  │  WebSocket API  │
                  │    Gateway      │
                  └────────┬────────┘
                           │
                           ▼
                     ┌───────────┐
                     │   Kafka   │
                     └─────┬─────┘
                           │
                    Message Workers
                       ↙       ↘
                  Online       Offline
                    │             │
                    ▼             ▼
               WebSocket      Persistent
                delivery       storage
                    │             │
                    └──────┬──────┘
                           ▼
                       Recipient`}
                </pre>
              </div>
              <p className="text-[17px] sm:text-[19px] text-[#475569] dark:text-[#CBD5E1] leading-relaxed my-4">
                Kafka acts as the event backbone, while Redis handles short-lived state such as presence and PostgreSQL provides durable persistence.
              </p>
            </div>

            {/* THE INTERESTING PART */}
            <div className="space-y-4 -mt-4">
              <h3 className="text-[32px] sm:text-[36px] instrument-serif italic text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                Making "instant" messaging reliable: <span className="bg-[#E4FFC1] dark:bg-[#00BF63] dark:text-white px-1 box-decoration-clone">a distributed-systems problem.</span>
              </h3>
              <ul className="list-disc pl-5 space-y-3 text-[17px] sm:text-[19px] text-[#475569] dark:text-[#CBD5E1] pt-3 marker:text-[#00BF63] dark:marker:text-[#E4FFC1]">
                <li className="pl-1 hover:underline hover:decoration-wavy hover:underline-offset-[3px] decoration-[#00BF63]/40 dark:decoration-[#E4FFC1]/40 transition-all cursor-default"><strong className="font-medium text-[#2C2C2C] dark:text-[#F2F2F2]">Cryptographic identity:</strong> Users receive a unique messaging identity rather than needing to expose their phone number.</li>
                <li className="pl-1 hover:underline hover:decoration-wavy hover:underline-offset-[3px] decoration-[#00BF63]/40 dark:decoration-[#E4FFC1]/40 transition-all cursor-default"><strong className="font-medium text-[#2C2C2C] dark:text-[#F2F2F2]">End-to-end encryption:</strong> Messages are encrypted on the client before transmission.</li>
                <li className="pl-1 hover:underline hover:decoration-wavy hover:underline-offset-[3px] decoration-[#00BF63]/40 dark:decoration-[#E4FFC1]/40 transition-all cursor-default"><strong className="font-medium text-[#2C2C2C] dark:text-[#F2F2F2]">Offline delivery:</strong> Messages aren't lost when a recipient disconnects. They are persisted and delivered when they reconnect.</li>
                <li className="pl-1 hover:underline hover:decoration-wavy hover:underline-offset-[3px] decoration-[#00BF63]/40 dark:decoration-[#E4FFC1]/40 transition-all cursor-default"><strong className="font-medium text-[#2C2C2C] dark:text-[#F2F2F2]">Reliable events:</strong> Kafka provides an event-driven pipeline for handling message delivery, retries, and asynchronous processing.</li>
              </ul>
            </div>

            {/* ITERATING */}
            <div className="space-y-5 -mt-4">
              <div className="space-y-4">
                <h3 className="text-[32px] sm:text-[36px] instrument-serif italic text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                  What went wrong initially: <span className="bg-[#E4FFC1] dark:bg-[#00BF63] dark:text-white px-1 box-decoration-clone">tightly coupled message delivery.</span>
                </h3>
              </div>
              <p className="text-[17px] sm:text-[19px] text-[#475569] dark:text-[#CBD5E1] leading-relaxed pt-2">
                <strong className="text-[#2C2C2C] dark:text-[#F2F2F2]">The problem:</strong> My first architecture treated the WebSocket server as the central point responsible for receiving, processing, storing, and delivering messages. A WebSocket failure could affect delivery, persistence, and message state simultaneously.
              </p>
              <p className="text-[17px] sm:text-[19px] text-[#475569] dark:text-[#CBD5E1] leading-relaxed pt-2">
                <strong className="text-[#2C2C2C] dark:text-[#F2F2F2]">The fix:</strong> Separated responsibilities: <code>WebSocket &rarr; Kafka &rarr; workers &rarr; persistence / delivery</code>. This made the system more resilient and gave each component a clearer responsibility.
              </p>
            </div>

            {/* TAKEAWAYS */}
            <div id="takeaways" className="pt-8 space-y-5 scroll-mt-20">
              <div className="space-y-1">
                <span className="font-mono text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#00BF63] dark:text-[#E4FFC1] block">
                  TAKEAWAYS
                </span>
                <h3 className="text-[32px] sm:text-[36px] instrument-serif italic text-[#2C2C2C] dark:text-[#F2F2F2] tracking-tight leading-snug">
                  How does this remain correct when everything goes wrong?
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="p-5 sm:p-6 rounded-sm border border-[#00BF63] dark:border-[#E4FFC1] bg-[#00BF63]/[0.04] dark:bg-[#E4FFC1]/[0.07] flex flex-col items-center text-center space-y-3 transition-colors hover:bg-[#00BF63]/[0.08] dark:hover:bg-[#E4FFC1]/[0.12]">
                  <div className="p-2 rounded-sm bg-[#00BF63]/15 dark:bg-[#E4FFC1]/20 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-[#00BF63] dark:text-[#E4FFC1]" strokeWidth={1.5} />
                  </div>
                  <h4 className="font-mono text-[13px] font-semibold text-[#00BF63] dark:text-[#E4FFC1] tracking-wider uppercase pt-1">Reliability over latency</h4>
                  <p className="text-[14.5px] text-[#2C2C2C] dark:text-[#CBD5E1] leading-relaxed font-sans">
                    Real-time systems are reliability problems, not just latency problems. Making something feel instant is only one part; the harder problem is maintaining correctness when networks fail and events are duplicated.
                  </p>
                </div>

                <div className="p-5 sm:p-6 rounded-sm border border-[#00BF63] dark:border-[#E4FFC1] bg-[#00BF63]/[0.04] dark:bg-[#E4FFC1]/[0.07] flex flex-col items-center text-center space-y-3 transition-colors hover:bg-[#00BF63]/[0.08] dark:hover:bg-[#E4FFC1]/[0.12]">
                  <div className="p-2 rounded-sm bg-[#00BF63]/15 dark:bg-[#E4FFC1]/20 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-[#00BF63] dark:text-[#E4FFC1]" strokeWidth={1.5} />
                  </div>
                  <h4 className="font-mono text-[13px] font-semibold text-[#00BF63] dark:text-[#E4FFC1] tracking-wider uppercase pt-1">Privacy by design</h4>
                  <p className="text-[14.5px] text-[#2C2C2C] dark:text-[#CBD5E1] leading-relaxed font-sans">
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
