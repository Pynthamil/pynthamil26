"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { portfolioData } from "@/data/portfolio";
import { Moon, Sun, Play, Link as LinkIcon, PieChart } from "lucide-react";

export default function BlogPostClient({ slug: propSlug }: { slug?: string }) {
  const params = useParams();
  const slug = propSlug || (params?.slug as string);
  const [soundOn, setSoundOn] = useState<boolean>(true);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

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

  const post = portfolioData.writings.find((p) => p.slug === slug);

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

  if (!post) {
    return (
      <div className="min-h-screen w-full flex flex-col justify-center items-center px-5 font-mono text-sm text-[#2C2C2C]">
        <p>Post not found.</p>
        <Link
          href="/blog"
          onClick={() => playTone(880)}
          className="mt-4 text-[#737373] hover:underline underline-offset-4 font-medium"
        >
          &larr; return to blog
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col justify-start items-center px-5 sm:px-8 md:px-12 pt-6 sm:pt-8 pb-24 selection:bg-neutral-200">
      {/* Soft atmospheric ambient glow */}
      <div className="ambient-glow" />

      {/* Main Container */}
      <main className="w-full relative z-10 flex flex-col max-w-[480px] animate-in fade-in duration-200">
        {/* Top Navigation */}
        <header className="flex items-center justify-between w-full mb-8">
          <Link
            href="/blog"
            onClick={() => playTone(880)}
            className="font-mono text-[16px] sm:text-[17px] tracking-tight text-[#2C2C2C] dark:text-[#F2F2F2] hover:text-[#737373] dark:hover:text-[#a3a3a3] transition-colors flex items-center space-x-1.5 focus:outline-none font-medium cursor-pointer"
          >
            <span>&larr;</span>
            <span>blog</span>
          </Link>

          <div className="flex items-center space-x-3.5">
            <span className="flex items-center space-x-1.5 font-mono text-[13.5px] sm:text-[14px] text-[#2C2C2C] dark:text-[#F2F2F2]">
              <PieChart className="w-3.5 h-3.5 fill-current" strokeWidth={2} />
              <span>{post.readingTime.toLowerCase()} read</span>
            </span>
            <button
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              className="p-1 text-[#2C2C2C] dark:text-[#F2F2F2] hover:text-[#737373] dark:hover:text-[#a3a3a3] transition-colors focus:outline-none cursor-pointer flex items-center justify-center"
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4 transition-transform duration-200 hover:rotate-45" strokeWidth={2} />
              ) : (
                <Moon className="w-4 h-4 transition-transform duration-200 hover:-rotate-12" strokeWidth={2} />
              )}
            </button>
          </div>
        </header>

        {/* Article Header */}
        <article className="space-y-6">
          <div className="pb-5 text-center">
            <h1 className="but-head-regular text-[34px] sm:text-[38px] font-normal leading-tight text-[#2C2C2C] dark:text-[#F2F2F2]">
              {post.title.toLowerCase()}
            </h1>
            <div className="font-mono text-[13.5px] sm:text-[14px] text-[#525252] dark:text-[#a3a3a3] mt-2.5 flex items-center justify-center space-x-2">
              <span>{post.date.toLowerCase()}</span>
              <span></span>
              <span >pynthamil pavendan</span>
            </div>
          </div>

                    {slug !== 'git-commit-go' && (
            <div className="relative w-[calc(100%+2rem)] -ml-[1rem] sm:w-[120%] sm:-ml-[10%] h-[350px] sm:h-[450px] bg-[#8A51FC] rounded-xl mt-6 mb-4 overflow-hidden">
              
              {/* Top-Left Corner */}
              <div className="absolute top-0 left-0 flex flex-col pointer-events-none opacity-90">
                <div className="flex">
                  <div className="w-10 h-10 sm:w-16 sm:h-16 bg-[#CEBAFC]"></div>
                  <div className="w-10 h-10 sm:w-16 sm:h-16 bg-[#5123C3]"></div>
                  <div className="w-10 h-10 sm:w-16 sm:h-16 bg-[#8A51FC]"></div>
                </div>
                <div className="flex">
                  <div className="w-10 h-10 sm:w-16 sm:h-16 bg-[#CEBAFC]"></div>
                  <div className="w-10 h-10 sm:w-16 sm:h-16 bg-[#8A51FC]"></div>
                </div>
                <div className="flex">
                  <div className="w-10 h-10 sm:w-16 sm:h-16 bg-[#8A51FC]"></div>
                </div>
              </div>

              {/* Top-Right Corner */}
              <div className="absolute top-0 right-0 flex flex-col items-end pointer-events-none opacity-90">
                <div className="flex">
                  <div className="w-10 h-10 sm:w-16 sm:h-16 bg-[#8A51FC]"></div>
                  <div className="w-10 h-10 sm:w-16 sm:h-16 bg-[#5123C3]"></div>
                  <div className="w-10 h-10 sm:w-16 sm:h-16 bg-[#CEBAFC]"></div>
                </div>
                <div className="flex">
                  <div className="w-10 h-10 sm:w-16 sm:h-16 bg-[#8A51FC]"></div>
                  <div className="w-10 h-10 sm:w-16 sm:h-16 bg-[#5123C3]"></div>
                </div>
                <div className="flex">
                  <div className="w-10 h-10 sm:w-16 sm:h-16 bg-[#8A51FC]"></div>
                </div>
              </div>

              {/* Bottom-Left Corner */}
              <div className="absolute bottom-0 left-0 flex flex-col pointer-events-none opacity-90">
                <div className="flex">
                  <div className="w-10 h-10 sm:w-16 sm:h-16 bg-[#5123C3]"></div>
                </div>
                <div className="flex">
                  <div className="w-10 h-10 sm:w-16 sm:h-16 bg-[#5123C3]"></div>
                  <div className="w-10 h-10 sm:w-16 sm:h-16 bg-[#8A51FC]"></div>
                </div>
                <div className="flex">
                  <div className="w-10 h-10 sm:w-16 sm:h-16 bg-[#5123C3]"></div>
                  <div className="w-10 h-10 sm:w-16 sm:h-16 bg-[#CEBAFC]"></div>
                  <div className="w-10 h-10 sm:w-16 sm:h-16 bg-[#8A51FC]"></div>
                </div>
              </div>

              {/* Bottom-Right Corner */}
              <div className="absolute bottom-0 right-0 flex flex-col items-end pointer-events-none opacity-90">
                <div className="flex">
                  <div className="w-10 h-10 sm:w-16 sm:h-16 bg-[#CEBAFC]"></div>
                </div>
                <div className="flex">
                  <div className="w-10 h-10 sm:w-16 sm:h-16 bg-[#5123C3]"></div>
                  <div className="w-10 h-10 sm:w-16 sm:h-16 bg-[#5123C3]"></div>
                </div>
                <div className="flex">
                  <div className="w-10 h-10 sm:w-16 sm:h-16 bg-[#8A51FC]"></div>
                  <div className="w-10 h-10 sm:w-16 sm:h-16 bg-[#CEBAFC]"></div>
                  <div className="w-10 h-10 sm:w-16 sm:h-16 bg-[#5123C3]"></div>
                </div>
              </div>

              {/* Typography centered inside */}
              <div className="absolute inset-0 flex flex-col items-center justify-between py-10 sm:py-14 pointer-events-none z-10">
                <div className="text-[12px] sm:text-[14px] font-sans font-medium tracking-wide text-white uppercase">
                  {post.date}
                </div>
                
                <h1 className="but-head-regular text-[36px] sm:text-[48px] md:text-[56px] leading-tight text-white opacity-100 text-center px-8 max-w-[85%]">
                  {post.slug.replace(/-/g, ' ')}
                </h1>
                
                <div className="flex items-center space-x-2 text-white">
                  <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="4 17 10 11 4 5"></polyline>
                    <line x1="12" y1="19" x2="20" y2="19"></line>
                  </svg>
                  <span className="text-[13px] sm:text-[15px] font-sans font-medium tracking-wide">Pynthamil</span>
                </div>
              </div>
            </div>
          )}

                    {slug === 'git-commit-go' && (
            <div className="relative w-[calc(100%+2rem)] -ml-[1rem] sm:w-[120%] sm:-ml-[10%] h-[350px] sm:h-[450px] rounded-xl mt-6 mb-4 overflow-hidden">
              {/* Gradient Background */}
              <div className="absolute inset-0 bg-[#1B71D8]" />
              
              {/* CSS noise overlay */}
              <div className="absolute inset-0 opacity-25 mix-blend-overlay" style={{backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')"}}></div>
              {/* Top-Left Corner */}
              <div className="absolute top-0 left-0 flex flex-col pointer-events-none opacity-90 mix-blend-overlay">
                <div className="flex">
                  <div className="w-10 h-10 sm:w-16 sm:h-16 bg-[#85C8FF]"></div>
                  <div className="w-10 h-10 sm:w-16 sm:h-16 bg-[#1B71D8]"></div>
                  <div className="w-10 h-10 sm:w-16 sm:h-16 bg-[#4A9DFF]"></div>
                </div>
                <div className="flex">
                  <div className="w-10 h-10 sm:w-16 sm:h-16 bg-[#85C8FF]"></div>
                  <div className="w-10 h-10 sm:w-16 sm:h-16 bg-[#4A9DFF]"></div>
                </div>
                <div className="flex">
                  <div className="w-10 h-10 sm:w-16 sm:h-16 bg-[#4A9DFF]"></div>
                </div>
              </div>

              {/* Top-Right Corner */}
              <div className="absolute top-0 right-0 flex flex-col items-end pointer-events-none opacity-90 mix-blend-overlay">
                <div className="flex">
                  <div className="w-10 h-10 sm:w-16 sm:h-16 bg-[#4A9DFF]"></div>
                  <div className="w-10 h-10 sm:w-16 sm:h-16 bg-[#1B71D8]"></div>
                  <div className="w-10 h-10 sm:w-16 sm:h-16 bg-[#85C8FF]"></div>
                </div>
                <div className="flex">
                  <div className="w-10 h-10 sm:w-16 sm:h-16 bg-[#4A9DFF]"></div>
                  <div className="w-10 h-10 sm:w-16 sm:h-16 bg-[#1B71D8]"></div>
                </div>
                <div className="flex">
                  <div className="w-10 h-10 sm:w-16 sm:h-16 bg-[#4A9DFF]"></div>
                </div>
              </div>

              {/* Bottom-Left Corner */}
              <div className="absolute bottom-0 left-0 flex flex-col pointer-events-none opacity-90 mix-blend-overlay">
                <div className="flex">
                  <div className="w-10 h-10 sm:w-16 sm:h-16 bg-[#1B71D8]"></div>
                </div>
                <div className="flex">
                  <div className="w-10 h-10 sm:w-16 sm:h-16 bg-[#1B71D8]"></div>
                  <div className="w-10 h-10 sm:w-16 sm:h-16 bg-[#4A9DFF]"></div>
                </div>
                <div className="flex">
                  <div className="w-10 h-10 sm:w-16 sm:h-16 bg-[#1B71D8]"></div>
                  <div className="w-10 h-10 sm:w-16 sm:h-16 bg-[#85C8FF]"></div>
                  <div className="w-10 h-10 sm:w-16 sm:h-16 bg-[#4A9DFF]"></div>
                </div>
              </div>

              {/* Bottom-Right Corner */}
              <div className="absolute bottom-0 right-0 flex flex-col items-end pointer-events-none opacity-90 mix-blend-overlay">
                <div className="flex">
                  <div className="w-10 h-10 sm:w-16 sm:h-16 bg-[#85C8FF]"></div>
                </div>
                <div className="flex">
                  <div className="w-10 h-10 sm:w-16 sm:h-16 bg-[#1B71D8]"></div>
                  <div className="w-10 h-10 sm:w-16 sm:h-16 bg-[#1B71D8]"></div>
                </div>
                <div className="flex">
                  <div className="w-10 h-10 sm:w-16 sm:h-16 bg-[#4A9DFF]"></div>
                  <div className="w-10 h-10 sm:w-16 sm:h-16 bg-[#85C8FF]"></div>
                  <div className="w-10 h-10 sm:w-16 sm:h-16 bg-[#1B71D8]"></div>
                </div>
              </div>

              


              {/* Title overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-between py-10 sm:py-14 pointer-events-none z-10">
                <div className="text-[12px] sm:text-[14px] font-sans font-medium tracking-wide text-white uppercase">
                  {post.date}
                </div>
                
                <h1 className="but-head-regular text-[48px] sm:text-[64px] text-white leading-none tracking-tight text-center px-8 max-w-[90%]">
                  {post.slug.replace(/-/g, ' ')}
                </h1>
                
                <div className="flex items-center space-x-2 text-white">
                  <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="4 17 10 11 4 5"></polyline>
                    <line x1="12" y1="19" x2="20" y2="19"></line>
                  </svg>
                  <span className="text-[13px] sm:text-[15px] font-sans font-medium tracking-wide">Pynthamil</span>
                </div>
              </div>
            </div>
          )}

          {/* Action Bar */}
          <div className="flex items-center justify-between py-4 border-b border-neutral-200/70 dark:border-[#a3a3a3]/20 mb-8 text-[14px] sm:text-[15px] font-sans">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <button className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#F7F7F7] dark:bg-[#141415] flex items-center justify-center hover:opacity-80 transition-opacity">
                <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#2C2C2C] dark:text-[#F2F2F2] ml-0.5" fill="currentColor" />
              </button>
              <span className="font-medium text-[#2C2C2C] dark:text-[#F2F2F2]">Listen to article</span>
              <span className="w-px h-4 bg-neutral-200 dark:bg-neutral-800 hidden sm:block"></span>
              <span className="text-[#525252] dark:text-[#a3a3a3]">{post.voiceTime || post.readingTime}</span>
            </div>
            
            <button 
              onClick={handleShare}
              className="flex items-center space-x-2 font-medium text-[#2C2C2C] dark:text-[#F2F2F2] hover:opacity-70 transition-opacity"
            >
              <LinkIcon className="w-4 h-4" />
              <span>{isCopied ? "Copied!" : "Share"}</span>
            </button>
          </div>

          {/* =========================================================
              ARTICLE 1: GIT COMMIT GO
             ========================================================= */}
          {slug === "git-commit-go" && (
            <div className="space-y-8 text-[17.5px] sm:text-[18.5px] text-[#2C2C2C] dark:text-[#F2F2F2] leading-[1.8] font-sans pt-1">
              {/* Intro */}
              <div className="space-y-4">
                <p>At some point, just committing code isn’t enough.</p>
                <p className="font-mono text-[14.5px] sm:text-[15.5px] text-[#525252] dark:text-[#a3a3a3]">You start wondering:</p>
                <p className="italic text-[#2C2C2C] dark:text-[#F2F2F2] pl-3 border-l-2 border-[#525252]/40 dark:border-[#a3a3a3]/40">
                  can I interact with GitHub programmatically?
                </p>
                <p>
                  That’s where the <span className="font-medium text-[#525252] dark:text-[#a3a3a3]">GitHub REST API</span> comes in.
                </p>
                <p className="text-[13.5px] sm:text-[14px] font-mono text-[#525252] dark:text-[#a3a3a3] pt-1">It lets you:</p>
                <ul className="space-y-2.5 pl-1 text-[15px] sm:text-[15.5px]">
                  <li className="flex items-start space-x-2.5">
                    <span className="font-mono text-sm text-[#525252] dark:text-[#a3a3a3] select-none pt-0.5">+</span>
                    <span>create repositories automatically</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-mono text-sm text-[#525252] dark:text-[#a3a3a3] select-none pt-0.5">+</span>
                    <span>fetch repository data</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-mono text-sm text-[#525252] dark:text-[#a3a3a3] select-none pt-0.5">+</span>
                    <span>automate workflows</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-mono text-sm text-[#525252] dark:text-[#a3a3a3] select-none pt-0.5">+</span>
                    <span>build tools that interact with GitHub</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-mono text-sm text-[#525252] dark:text-[#a3a3a3] select-none pt-0.5">+</span>
                    <span>understand what’s happening behind the UI</span>
                  </li>
                </ul>
                <p className="font-mono text-[13.5px] sm:text-[14px] text-[#525252] dark:text-[#a3a3a3] pt-1">
                  Let’s walk through the basics.
                </p>
              </div>

              {/* THE CONCEPT */}
              <div className="pt-8 border-t border-neutral-200/70 dark:border-[#a3a3a3]/20 space-y-5">
                <span className="font-mono text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#8A51FC] dark:text-[#CEBAFC] block">
                  THE CONCEPT
                </span>
                <h2 className="text-[20px] sm:text-[22px] font-semibold text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                  What is the GitHub REST API?
                </h2>
                <p>
                  The GitHub REST API allows developers to communicate with GitHub using HTTP requests.
                </p>
                <p className="text-[13.5px] sm:text-[14px] font-mono text-[#525252] dark:text-[#a3a3a3]">
                  Instead of clicking buttons on GitHub’s website, you can send requests like:
                </p>
                <ul className="space-y-2.5 pl-1 text-[15px] sm:text-[15.5px]">
                  <li className="flex items-start space-x-2.5">
                    <span className="font-mono text-xs sm:text-[13px] bg-[#F7F7F7] dark:bg-[#141415] px-2 py-0.5 border border-[#737373]/20 dark:border-[#a3a3a3]/30 font-semibold text-[#525252] dark:text-[#a3a3a3]">GET</span>
                    <span>&rarr; retrieve data</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-mono text-xs sm:text-[13px] bg-[#F7F7F7] dark:bg-[#141415] px-2 py-0.5 border border-[#737373]/20 dark:border-[#a3a3a3]/30 font-semibold text-[#525252] dark:text-[#a3a3a3]">POST</span>
                    <span>&rarr; create data</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-mono text-xs sm:text-[13px] bg-[#F7F7F7] dark:bg-[#141415] px-2 py-0.5 border border-[#737373]/20 dark:border-[#a3a3a3]/30 font-semibold text-[#525252] dark:text-[#a3a3a3]">PATCH</span>
                    <span>&rarr; update data</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-mono text-xs sm:text-[13px] bg-[#F7F7F7] dark:bg-[#141415] px-2 py-0.5 border border-[#737373]/20 dark:border-[#a3a3a3]/30 font-semibold text-[#525252] dark:text-[#a3a3a3]">DELETE</span>
                    <span>&rarr; remove data</span>
                  </li>
                </ul>
                <p className="italic text-[#2C2C2C]/90 dark:text-[#F2F2F2]/90 pt-1">
                  Think of it as a bridge between your application and GitHub.
                </p>
              </div>

              {/* THE ENDPOINT */}
              <div className="pt-8 border-t border-neutral-200/70 dark:border-[#a3a3a3]/20 space-y-5">
                <span className="font-mono text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#8A51FC] dark:text-[#CEBAFC] block">
                  STEP 1
                </span>
                <h2 className="text-[20px] sm:text-[22px] font-semibold text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                  Choose an endpoint
                </h2>
                <p>
                  GitHub provides many API endpoints depending on what you want to do.
                </p>
                <p className="text-[13.5px] sm:text-[14px] font-mono text-[#525252] dark:text-[#a3a3a3]">
                  Example endpoint for repositories:
                </p>
                <div className="bg-[#F7F7F7] dark:bg-[#141415] px-4 py-3 border border-[#737373]/20 dark:border-[#a3a3a3]/30 font-mono text-[13.5px] sm:text-[14px] text-[#2C2C2C] dark:text-[#F2F2F2] break-all">
                  https://api.github.com/user/repos
                </div>
                <p>
                  This endpoint allows you to retrieve repositories connected to your account.
                </p>
                <p className="text-[13.5px] sm:text-[14px] font-mono text-[#525252] dark:text-[#a3a3a3] pt-1">Each endpoint defines:</p>
                <ul className="space-y-2 pl-1 text-[15px] sm:text-[15.5px]">
                  <li className="flex items-start space-x-2.5">
                    <span className="font-mono text-sm text-[#525252] dark:text-[#a3a3a3] select-none pt-0.5">+</span>
                    <span>request method</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-mono text-sm text-[#525252] dark:text-[#a3a3a3] select-none pt-0.5">+</span>
                    <span>parameters</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-mono text-sm text-[#525252] dark:text-[#a3a3a3] select-none pt-0.5">+</span>
                    <span>response structure</span>
                  </li>
                </ul>
                <div className="pt-2">
                  <p className="text-[13.5px] sm:text-[14px] font-mono text-[#525252] dark:text-[#a3a3a3] mb-1">Documentation:</p>
                  <a
                    href="https://docs.github.com/en/rest/repos/repos"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#737373] dark:text-[#a3a3a3] hover:underline underline-offset-4 decoration-wavy decoration-[#737373] dark:decoration-[#a3a3a3] font-mono text-[13px] sm:text-[13.5px] break-all font-medium"
                  >
                    https://docs.github.com/en/rest/repos/repos
                  </a>
                </div>
              </div>

              {/* Step 2 */}
              <div className="pt-8 border-t border-neutral-200/70 dark:border-[#a3a3a3]/20 space-y-5">
                <span className="font-mono text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#8A51FC] dark:text-[#CEBAFC] block">
                  STEP 2
                </span>
                <h2 className="text-[20px] sm:text-[22px] font-semibold text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                  Generate a Personal Access Token (PAT)
                </h2>
                <p>GitHub requires authentication for most API requests.</p>
                <p>We generate a Personal Access Token.</p>
                <p className="text-[13.5px] sm:text-[14px] font-mono text-[#525252] dark:text-[#a3a3a3]">Steps:</p>
                <ul className="space-y-2.5 pl-1 text-[15px] sm:text-[15.5px]">
                  <li className="flex items-start space-x-2.5">
                    <span className="font-mono text-sm text-[#525252] dark:text-[#a3a3a3] select-none font-semibold pt-0.5">1.</span>
                    <span>Go to GitHub Settings</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-mono text-sm text-[#525252] dark:text-[#a3a3a3] select-none font-semibold pt-0.5">2.</span>
                    <span>Scroll to Developer Settings</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-mono text-sm text-[#525252] dark:text-[#a3a3a3] select-none font-semibold pt-0.5">3.</span>
                    <span>Select Personal Access Tokens</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-mono text-sm text-[#525252] dark:text-[#a3a3a3] select-none font-semibold pt-0.5">4.</span>
                    <span>Generate new token</span>
                  </li>
                </ul>
                <p className="text-[13.5px] sm:text-[14px] font-mono text-[#525252] dark:text-[#a3a3a3] pt-1">Choose:</p>
                <ul className="space-y-2 pl-1 text-[15px] sm:text-[15.5px]">
                  <li className="flex items-start space-x-2.5">
                    <span className="font-mono text-sm text-[#525252] dark:text-[#a3a3a3] select-none pt-0.5">+</span>
                    <span>token name</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-mono text-sm text-[#525252] dark:text-[#a3a3a3] select-none pt-0.5">+</span>
                    <span>expiration duration</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-mono text-sm text-[#525252] dark:text-[#a3a3a3] select-none pt-0.5">+</span>
                    <span>required permissions</span>
                  </li>
                </ul>
                <div className="bg-[#F7F7F7] dark:bg-[#141415] p-4 border border-[#737373]/20 dark:border-[#a3a3a3]/30 font-mono text-[13.5px] sm:text-[14px] text-[#2C2C2C] dark:text-[#F2F2F2] space-y-1.5 mt-2">
                  <div className="text-[#525252] dark:text-[#a3a3a3] font-semibold">Copy the token immediately.</div>
                  <div>GitHub will not show it again.</div>
                  <div className="text-[#525252] dark:text-[#a3a3a3]">Treat it like a password.</div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="pt-8 border-t border-neutral-200/70 dark:border-[#a3a3a3]/20 space-y-5">
                <span className="font-mono text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#8A51FC] dark:text-[#CEBAFC] block">
                  STEP 3
                </span>
                <h2 className="text-[20px] sm:text-[22px] font-semibold text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                  Send request using Postman
                </h2>
                <p>Postman helps test API requests easily.</p>
                <p className="text-[13.5px] sm:text-[14px] font-mono text-[#525252] dark:text-[#a3a3a3]">Example GET request:</p>
                <div className="bg-[#F7F7F7] dark:bg-[#141415] px-4 py-3 border border-[#737373]/20 dark:border-[#a3a3a3]/30 font-mono text-[13.5px] sm:text-[14px] text-[#2C2C2C] dark:text-[#F2F2F2] break-all">
                  https://api.github.com/user/repos
                </div>
                <p className="text-[13.5px] sm:text-[14px] font-mono text-[#525252] dark:text-[#a3a3a3]">Add Authorization header:</p>
                <div className="bg-[#F7F7F7] dark:bg-[#141415] px-4 py-3 border border-[#737373]/20 dark:border-[#a3a3a3]/30 font-mono text-[13.5px] sm:text-[14px] text-[#2C2C2C] dark:text-[#F2F2F2] break-all leading-relaxed">
                  Authorization: Bearer YOUR_PERSONAL_ACCESS_TOKEN
                </div>
                <p>Send request. GitHub returns data in JSON format.</p>
              </div>

              {/* Example create repo */}
              <div className="pt-8 border-t border-neutral-200/70 dark:border-[#a3a3a3]/20 space-y-5">
                <span className="font-mono text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#8A51FC] dark:text-[#CEBAFC] block">
                  SECTION
                </span>
                <h2 className="text-[20px] sm:text-[22px] font-semibold text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                  Example &mdash; create repository via API
                </h2>
                <p className="text-[13.5px] sm:text-[14px] font-mono text-[#525252] dark:text-[#a3a3a3]">POST request:</p>
                <div className="bg-[#F7F7F7] dark:bg-[#141415] p-4 border border-[#737373]/20 dark:border-[#a3a3a3]/30 font-mono text-[13.5px] sm:text-[14px] text-[#2C2C2C] dark:text-[#F2F2F2] space-y-1.5 overflow-x-auto leading-relaxed">
                  <div>curl -X POST https://api.github.com/user/repos \</div>
                  <div className="pl-4">-H &quot;Authorization: Bearer YOUR_PERSONAL_ACCESS_TOKEN&quot; \</div>
                  <div className="pl-4">-H &quot;Accept: application/vnd.github+json&quot; \</div>
                  <div className="pl-4">-d &apos;{`{"name":"my-new-repo","private":false}`}&apos;</div>
                </div>
                <ul className="space-y-1 pl-1 text-[13.5px] sm:text-[14px] font-mono text-[#525252] dark:text-[#a3a3a3]">
                  <li> Replace YOUR_PERSONAL_ACCESS_TOKEN with your token.</li>
                  <li> Replace my-new-repo with repository name.</li>
                </ul>
              </div>

              {/* Example response */}
              <div className="pt-8 border-t border-neutral-200/70 dark:border-[#a3a3a3]/20 space-y-5">
                <span className="font-mono text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#8A51FC] dark:text-[#CEBAFC] block">
                  SECTION
                </span>
                <h2 className="text-[20px] sm:text-[22px] font-semibold text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                  Example response
                </h2>
                <p>GitHub responds with structured JSON data:</p>
                <div className="bg-[#F7F7F7] dark:bg-[#141415] p-4 border border-[#737373]/20 dark:border-[#a3a3a3]/30 font-mono text-[13.5px] sm:text-[14px] text-[#2C2C2C] dark:text-[#F2F2F2] space-y-1.5 overflow-x-auto leading-relaxed">
                  <div>{`{`}</div>
                  <div className="pl-4">{`"name": "my-new-repo",`}</div>
                  <div className="pl-4">{`"private": false,`}</div>
                  <div className="pl-4">{`"owner": {`}</div>
                  <div className="pl-8">{`"login": "username"`}</div>
                  <div className="pl-4">{`}`}</div>
                  <div>{`}`}</div>
                </div>
                <p className="italic text-[#2C2C2C]/90 dark:text-[#F2F2F2]/90">
                  The API confirms repository creation and returns metadata.
                </p>
              </div>

              {/* Why learn GitHub API */}
              <div className="pt-8 border-t border-neutral-200/70 dark:border-[#a3a3a3]/20 space-y-5">
                <span className="font-mono text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#8A51FC] dark:text-[#CEBAFC] block">
                  SECTION
                </span>
                <h2 className="text-[20px] sm:text-[22px] font-semibold text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                  Why learn GitHub API?
                </h2>
                <p>Understanding the API allows you to:</p>
                <ul className="space-y-2.5 pl-1 text-[15px] sm:text-[15.5px]">
                  <li className="flex items-start space-x-2.5">
                    <span className="font-mono text-sm text-[#525252] dark:text-[#a3a3a3] select-none pt-0.5">+</span>
                    <span>automate workflows</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-mono text-sm text-[#525252] dark:text-[#a3a3a3] select-none pt-0.5">+</span>
                    <span>build developer tools</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-mono text-sm text-[#525252] dark:text-[#a3a3a3] select-none pt-0.5">+</span>
                    <span>create dashboards</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-mono text-sm text-[#525252] dark:text-[#a3a3a3] select-none pt-0.5">+</span>
                    <span>manage repositories programmatically</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-mono text-sm text-[#525252] dark:text-[#a3a3a3] select-none pt-0.5">+</span>
                    <span>integrate GitHub with apps</span>
                  </li>
                </ul>
                <div className="pt-2 font-mono text-[13.5px] sm:text-[14px] text-[#525252] dark:text-[#a3a3a3]">
                  <p>Git becomes more than version control.</p>
                  <p className="text-[#525252] dark:text-[#a3a3a3] font-semibold mt-0.5">It becomes programmable infrastructure.</p>
                </div>
              </div>

              {/* Mental model */}
              <div className="pt-8 border-t border-neutral-200/70 dark:border-[#a3a3a3]/20 space-y-5">
                <span className="font-mono text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#8A51FC] dark:text-[#CEBAFC] block">
                  SECTION
                </span>
                <h2 className="text-[20px] sm:text-[22px] font-semibold text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                  Mental model
                </h2>
                <div className="bg-[#F7F7F7] dark:bg-[#141415] p-4 border border-[#737373]/20 dark:border-[#a3a3a3]/30 font-mono text-[13.5px] sm:text-[14px] text-[#2C2C2C] dark:text-[#F2F2F2] space-y-2 leading-relaxed">
                  <div><span className="font-semibold text-[#525252] dark:text-[#a3a3a3]">Git CLI</span> &rarr; manage code locally</div>
                  <div><span className="font-semibold text-[#525252] dark:text-[#a3a3a3]">GitHub UI</span> &rarr; manage repos visually</div>
                  <div><span className="font-semibold text-[#525252] dark:text-[#a3a3a3]">GitHub API</span> &rarr; manage everything programmatically</div>
                </div>
              </div>

              {/* If you're just starting */}
              <div className="pt-8 border-t border-neutral-200/70 dark:border-[#a3a3a3]/20 space-y-5">
                <span className="font-mono text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#8A51FC] dark:text-[#CEBAFC] block">
                  SECTION
                </span>
                <h2 className="text-[20px] sm:text-[22px] font-semibold text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                  If you&apos;re just starting
                </h2>
                <p className="text-[13.5px] sm:text-[14px] font-mono text-[#525252] dark:text-[#a3a3a3]">Focus on understanding:</p>
                <ul className="space-y-2.5 pl-1 text-[15px] sm:text-[15.5px]">
                  <li className="flex items-start space-x-2.5">
                    <span className="font-mono text-sm text-[#525252] dark:text-[#a3a3a3] select-none pt-0.5">+</span>
                    <span>request</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-mono text-sm text-[#525252] dark:text-[#a3a3a3] select-none pt-0.5">+</span>
                    <span>response</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-mono text-sm text-[#525252] dark:text-[#a3a3a3] select-none pt-0.5">+</span>
                    <span>authentication</span>
                  </li>
                </ul>
                <p className="font-mono text-[13.5px] sm:text-[14px] text-[#525252] dark:text-[#a3a3a3] pt-1">
                  Everything else becomes easier with practice.
                </p>
              </div>
            </div>
          )}

          {/* =========================================================
              ARTICLE 2: THE ART OF COMMITTING
             ========================================================= */}
          {slug === "art-of-committing" && (
            <div className="space-y-8 text-[17.5px] sm:text-[18.5px] text-[#2C2C2C] dark:text-[#F2F2F2] leading-[1.8] font-sans pt-1">
              {/* Intro */}
              <div className="space-y-4">
                <p>At first, Git might seem very scary and daunting.</p>
                <p>
                  You see words like <span className="font-mono text-xs sm:text-[13px] bg-[#F7F7F7] dark:bg-[#141415] px-2 py-0.5 border border-[#737373]/20 dark:border-[#a3a3a3]/30 text-[#525252] dark:text-[#a3a3a3]">commit</span>,{" "}
                  <span className="font-mono text-xs sm:text-[13px] bg-[#F7F7F7] dark:bg-[#141415] px-2 py-0.5 border border-[#737373]/20 dark:border-[#a3a3a3]/30 text-[#525252] dark:text-[#a3a3a3]">branch</span>,{" "}
                  <span className="font-mono text-xs sm:text-[13px] bg-[#F7F7F7] dark:bg-[#141415] px-2 py-0.5 border border-[#737373]/20 dark:border-[#a3a3a3]/30 text-[#525252] dark:text-[#a3a3a3]">merge</span>,{" "}
                  <span className="font-mono text-xs sm:text-[13px] bg-[#F7F7F7] dark:bg-[#141415] px-2 py-0.5 border border-[#737373]/20 dark:border-[#a3a3a3]/30 text-[#525252] dark:text-[#a3a3a3]">rebase</span>… and suddenly you&apos;re scared to even touch the keyboard.
                </p>
                <p>
                  But once it clicks, everything falls into place like the pieces of a puzzle you&apos;ve been spending your time trying to solve.
                </p>
                <p>
                  Version control isn&apos;t just about saving code &mdash; it&apos;s about telling the story of how your ideas evolve.
                </p>
                <p>
                  And honestly? There&apos;s something oddly satisfying about committing your work and watching your progress stack up.
                </p>
                <p className="font-mono text-[14.5px] sm:text-[15.5px] text-[#525252] dark:text-[#a3a3a3] font-medium pt-1">
                  Tiny commits. Big growth.
                </p>
              </div>

              {/* Section 1 */}
              <div className="pt-8 border-t border-neutral-200/70 dark:border-[#a3a3a3]/20 space-y-5">
                <span className="font-mono text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#8A51FC] dark:text-[#CEBAFC] block">
                  SECTION
                </span>
                <h2 className="text-[20px] sm:text-[22px] font-semibold text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                  What even is a commit?
                </h2>
                <p>A commit is basically a saved checkpoint of your project.</p>
                <p className="text-[13.5px] sm:text-[14px] font-mono text-[#525252] dark:text-[#a3a3a3]">Think of it like:</p>
                <ul className="space-y-2.5 pl-1 text-[15px] sm:text-[15.5px]">
                  <li className="flex items-start space-x-2.5">
                    <span className="font-mono text-sm text-[#525252] dark:text-[#a3a3a3] select-none pt-0.5">+</span>
                    <span>a save button for your code</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-mono text-sm text-[#525252] dark:text-[#a3a3a3] select-none pt-0.5">+</span>
                    <span>a time machine for your project</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-mono text-sm text-[#525252] dark:text-[#a3a3a3] select-none pt-0.5">+</span>
                    <span>proof that you did something productive today</span>
                  </li>
                </ul>
                <p className="text-[13.5px] sm:text-[14px] font-mono text-[#525252] dark:text-[#a3a3a3] pt-1">Each commit captures:</p>
                <ul className="space-y-2 pl-1 text-[15px] sm:text-[15.5px]">
                  <li className="flex items-start space-x-2.5">
                    <span className="font-mono text-sm text-[#525252] dark:text-[#a3a3a3] select-none pt-0.5">+</span>
                    <span>what changed</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-mono text-sm text-[#525252] dark:text-[#a3a3a3] select-none pt-0.5">+</span>
                    <span>when it changed</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-mono text-sm text-[#525252] dark:text-[#a3a3a3] select-none pt-0.5">+</span>
                    <span>why it changed (if your commit message is good)</span>
                  </li>
                </ul>
                <p className="italic text-[#2C2C2C]/90 dark:text-[#F2F2F2]/90 pt-1">
                  Instead of one giant messy save, Git encourages small meaningful updates. Because progress looks better in chapters than in chaos.
                </p>
              </div>

              {/* Section 2 */}
              <div className="pt-8 border-t border-neutral-200/70 dark:border-[#a3a3a3]/20 space-y-5">
                <span className="font-mono text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#8A51FC] dark:text-[#CEBAFC] block">
                  SECTION
                </span>
                <h2 className="text-[20px] sm:text-[22px] font-semibold text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                  Basic Commands (tiny cheat sheet)
                </h2>
                <div className="bg-[#F7F7F7] dark:bg-[#141415] p-4 border border-[#737373]/20 dark:border-[#a3a3a3]/30 font-mono text-[13.5px] sm:text-[14px] text-[#2C2C2C] dark:text-[#F2F2F2] space-y-1.5 leading-relaxed">
                  <div>git init</div>
                  <div>git add .</div>
                  <div>git commit -m &quot;message&quot;</div>
                  <div>git push origin main</div>
                </div>
                <p className="font-mono text-[13.5px] sm:text-[14px] text-[#525252] dark:text-[#a3a3a3]">Simple, but powerful.</p>
              </div>

              {/* Step 1 */}
              <div className="pt-8 border-t border-neutral-200/70 dark:border-[#a3a3a3]/20 space-y-5">
                <span className="font-mono text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#8A51FC] dark:text-[#CEBAFC] block">
                  STEP 1
                </span>
                <h2 className="text-[20px] sm:text-[22px] font-semibold text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                  Initialize the repository
                </h2>
                <p>
                  First, I start by initializing the project repository that I’m working on, on my local device.
                </p>
                <p>
                  This converts a normal project folder into a Git repository so changes can be tracked.
                </p>
                <div className="font-mono text-[13.5px] sm:text-[14px] text-[#525252] dark:text-[#a3a3a3] py-1">
                  Project Repository &rarr; Git Repository
                </div>
                <div className="bg-[#F7F7F7] dark:bg-[#141415] px-4 py-3 border border-[#737373]/20 dark:border-[#a3a3a3]/30 font-mono text-[13.5px] sm:text-[14px] text-[#2C2C2C] dark:text-[#F2F2F2]">
                  git init
                </div>
              </div>

              {/* Step 2 */}
              <div className="pt-8 border-t border-neutral-200/70 dark:border-[#a3a3a3]/20 space-y-5">
                <span className="font-mono text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#8A51FC] dark:text-[#CEBAFC] block">
                  STEP 2
                </span>
                <h2 className="text-[20px] sm:text-[22px] font-semibold text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                  Stage the files
                </h2>
                <p>
                  Next, I stage the files whose changes I want Git to track.
                </p>
                <p>
                  Think of staging like selecting which updates you want included in the next checkpoint.
                </p>
                <div className="font-mono text-[13.5px] sm:text-[14px] text-[#525252] dark:text-[#a3a3a3] py-1">
                  Changed/New Files &rarr; staged files for tracking new changes &rarr; changes now tracked
                </div>
                <div className="bg-[#F7F7F7] dark:bg-[#141415] p-4 border border-[#737373]/20 dark:border-[#a3a3a3]/30 font-mono text-[13.5px] sm:text-[14px] text-[#2C2C2C] dark:text-[#F2F2F2] space-y-1.5">
                  <div>git add .</div>
                  <div className="text-[#2C2C2C]/50 dark:text-[#F2F2F2]/50 text-xs pt-1">// or specific files</div>
                  <div>git add index.js</div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="pt-8 border-t border-neutral-200/70 dark:border-[#a3a3a3]/20 space-y-5">
                <span className="font-mono text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#8A51FC] dark:text-[#CEBAFC] block">
                  STEP 3
                </span>
                <h2 className="text-[20px] sm:text-[22px] font-semibold text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                  Write meaningful commit messages
                </h2>
                <p>
                  Now I write a clean, clear, and concise commit message to make a note of what changes I made.
                </p>
                <p>
                  Good commit messages help both present-you and future-you understand what happened.
                </p>
                <p className="text-[13.5px] sm:text-[14px] font-mono text-[#525252] dark:text-[#a3a3a3]">Examples:</p>
                <div className="bg-[#F7F7F7] dark:bg-[#141415] p-4 border border-[#737373]/20 dark:border-[#a3a3a3]/30 font-mono text-[13.5px] sm:text-[14px] space-y-1.5 text-[#2C2C2C] dark:text-[#F2F2F2]">
                  <div>feat: add profile picture upload</div>
                  <div>fix: correct typo in navbar</div>
                  <div>chore: update dependencies</div>
                </div>
                <p className="text-[13.5px] sm:text-[14px] font-mono text-[#525252] dark:text-[#a3a3a3] pt-1">Quick guide:</p>
                <ul className="space-y-2.5 pl-1 text-[15px] sm:text-[15.5px]">
                  <li className="flex items-start space-x-2.5">
                    <span className="font-mono text-sm text-[#525252] dark:text-[#a3a3a3] select-none font-semibold pt-0.5">feat</span>
                    <span>&rarr; adding a new feature or functionality</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-mono text-sm text-[#525252] dark:text-[#a3a3a3] select-none font-semibold pt-0.5">fix</span>
                    <span>&rarr; correcting something that was broken</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-mono text-sm text-[#525252] dark:text-[#a3a3a3] select-none font-semibold pt-0.5">chore</span>
                    <span>&rarr; changes that don&apos;t affect the app behaviour directly (configs, dependencies, build tasks)</span>
                  </li>
                </ul>
                <div className="bg-[#F7F7F7] dark:bg-[#141415] px-4 py-3 border border-[#737373]/20 dark:border-[#a3a3a3]/30 font-mono text-[13.5px] sm:text-[14px] text-[#2C2C2C] dark:text-[#F2F2F2] mt-2">
                  git commit -m &quot;feat: add search bar&quot;
                </div>
              </div>

              {/* Step 4 */}
              <div className="pt-8 border-t border-neutral-200/70 dark:border-[#a3a3a3]/20 space-y-5">
                <span className="font-mono text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#8A51FC] dark:text-[#CEBAFC] block">
                  STEP 4
                </span>
                <h2 className="text-[20px] sm:text-[22px] font-semibold text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                  Push changes to GitHub
                </h2>
                <p>
                  After writing a good commit message, I push the changes to the main branch.
                </p>
                <p>
                  This uploads the local changes to the remote repository (GitHub).
                </p>
                <div className="bg-[#F7F7F7] dark:bg-[#141415] px-4 py-3 border border-[#737373]/20 dark:border-[#a3a3a3]/30 font-mono text-[13.5px] sm:text-[14px] text-[#2C2C2C] dark:text-[#F2F2F2]">
                  git push origin main
                </div>
                <p className="italic text-[#2C2C2C]/90 dark:text-[#F2F2F2]/90">
                  Now the changes are backed up and visible online.
                </p>
              </div>

              {/* GitHub Repo Creation */}
              <div className="pt-8 border-t border-neutral-200/70 dark:border-[#a3a3a3]/20 space-y-5">
                <span className="font-mono text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#8A51FC] dark:text-[#CEBAFC] block">
                  SECTION
                </span>
                <h2 className="text-[20px] sm:text-[22px] font-semibold text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                  Creating a repository on GitHub
                </h2>
                <p>If you don&apos;t already have a repo:</p>
                <div className="font-mono text-[13.5px] sm:text-[14px] text-[#525252] dark:text-[#a3a3a3] py-0.5">
                  GitHub &rarr; click the + icon &rarr; New repository
                </div>
                <p className="text-[13.5px] sm:text-[14px] font-mono text-[#525252] dark:text-[#a3a3a3]">Choose:</p>
                <ul className="space-y-2 pl-1 text-[15px] sm:text-[15.5px]">
                  <li className="flex items-start space-x-2.5">
                    <span className="font-mono text-sm text-[#525252] dark:text-[#a3a3a3] select-none pt-0.5">+</span>
                    <span>repository name</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-mono text-sm text-[#525252] dark:text-[#a3a3a3] select-none pt-0.5">+</span>
                    <span>visibility (public or private)</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="font-mono text-sm text-[#525252] dark:text-[#a3a3a3] select-none pt-0.5">+</span>
                    <span>optional description</span>
                  </li>
                </ul>
                <p>Then connect your local project to this repo.</p>
              </div>

              {/* Pull Requests */}
              <div className="pt-8 border-t border-neutral-200/70 dark:border-[#a3a3a3]/20 space-y-5">
                <span className="font-mono text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#8A51FC] dark:text-[#CEBAFC] block">
                  SECTION
                </span>
                <h2 className="text-[20px] sm:text-[22px] font-semibold text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                  Working in collaborative environments (pull requests)
                </h2>
                <p>
                  If you&apos;re contributing to a repository where you don&apos;t have direct permission to modify the main branch, you create a pull request.
                </p>
                <p>
                  A pull request allows maintainers to review your changes before merging them into the main branch.
                </p>
                <p>This helps keep projects stable and organized.</p>
              </div>

              {/* Always sync */}
              <div className="pt-8 border-t border-neutral-200/70 dark:border-[#a3a3a3]/20 space-y-5">
                <span className="font-mono text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#8A51FC] dark:text-[#CEBAFC] block">
                  SECTION
                </span>
                <h2 className="text-[20px] sm:text-[22px] font-semibold text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                  Always sync before starting work
                </h2>
                <p>
                  Before I start working in my local repository, I always make sure to sync and pull changes first.
                </p>
                <p>
                  Sometimes (almost all the time) when I forget this step, I run into merge conflicts.
                </p>
                <p className="text-[#2C2C2C] dark:text-[#F2F2F2]">
                  And then I wish myself good luck… because I will definitely be needing it and probably 10 years of life span 🤡
                </p>
                <div className="bg-[#F7F7F7] dark:bg-[#141415] px-4 py-3 border border-[#737373]/20 dark:border-[#a3a3a3]/30 font-mono text-[13.5px] sm:text-[14px] text-[#2C2C2C] dark:text-[#F2F2F2]">
                  git pull origin main
                </div>
              </div>

              {/* Quick summary workflow */}
              <div className="pt-8 border-t border-neutral-200/70 dark:border-[#a3a3a3]/20 space-y-5">
                <span className="font-mono text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#8A51FC] dark:text-[#CEBAFC] block">
                  SECTION
                </span>
                <h2 className="text-[20px] sm:text-[22px] font-semibold text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                  Quick summary workflow
                </h2>
                <div className="bg-[#F7F7F7] dark:bg-[#141415] p-4 border border-[#737373]/20 dark:border-[#a3a3a3]/30 font-mono text-[13.5px] sm:text-[14px] text-[#2C2C2C] dark:text-[#F2F2F2] space-y-2 leading-relaxed">
                  <div>git init</div>
                  <div>git add .</div>
                  <div>git commit -m &quot;I&apos;m so done&quot;</div>
                  <div>git push origin main</div>
                </div>
                <p className="font-mono text-[13.5px] sm:text-[14px] text-[#525252] dark:text-[#a3a3a3]">
                  Repeat until the project magically works.
                </p>
              </div>

              {/* Helpful learning resources */}
              <div className="pt-8 border-t border-neutral-200/70 dark:border-[#a3a3a3]/20 space-y-5">
                <span className="font-mono text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#8A51FC] dark:text-[#CEBAFC] block">
                  SECTION
                </span>
                <h2 className="text-[20px] sm:text-[22px] font-semibold text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                  Helpful learning resources
                </h2>

                <div className="space-y-2.5">
                  <h3 className="font-mono text-[13px] sm:text-[13.5px] uppercase tracking-wider text-[#525252] dark:text-[#a3a3a3] font-semibold">
                    Articles / Blogs
                  </h3>
                  <ul className="space-y-2 text-[14.5px] sm:text-[15px]">
                    <li>
                      <a
                        href="https://software-portfolio-ecru.vercel.app/blog/art-of-committing#"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#737373] dark:text-[#a3a3a3] hover:underline underline-offset-4 decoration-wavy decoration-[#737373] dark:decoration-[#a3a3a3] font-medium"
                      >
                        Complete Tutorial of Git and GitHub for Basic to Advanced &mdash; Sachinsoni
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://software-portfolio-ecru.vercel.app/blog/art-of-committing#"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#737373] dark:text-[#a3a3a3] hover:underline underline-offset-4 decoration-wavy decoration-[#737373] dark:decoration-[#a3a3a3] font-medium"
                      >
                        I don’t Git it &mdash; Rick Martinez
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://software-portfolio-ecru.vercel.app/blog/art-of-committing#"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#737373] dark:text-[#a3a3a3] hover:underline underline-offset-4 decoration-wavy decoration-[#737373] dark:decoration-[#a3a3a3] font-medium"
                      >
                        Git Full Tutorial &mdash; How to Use Git in a Real Project &mdash; Saikiran Kalidindi
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="space-y-2.5 pt-2">
                  <h3 className="font-mono text-[13px] sm:text-[13.5px] uppercase tracking-wider text-[#525252] dark:text-[#a3a3a3] font-semibold">
                    YouTube Tutorials
                  </h3>
                  <ul className="space-y-2 text-[14.5px] sm:text-[15px]">
                    <li>
                      <a
                        href="https://software-portfolio-ecru.vercel.app/blog/art-of-committing#"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#737373] dark:text-[#a3a3a3] hover:underline underline-offset-4 decoration-wavy decoration-[#737373] dark:decoration-[#a3a3a3] font-medium"
                      >
                        Git and GitHub Crash Course &mdash; freeCodeCamp
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://software-portfolio-ecru.vercel.app/blog/art-of-committing#"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#737373] dark:text-[#a3a3a3] hover:underline underline-offset-4 decoration-wavy decoration-[#737373] dark:decoration-[#a3a3a3] font-medium"
                      >
                        Git and GitHub for beginners &mdash; Amigoscode
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://software-portfolio-ecru.vercel.app/blog/art-of-committing#"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#737373] dark:text-[#a3a3a3] hover:underline underline-offset-4 decoration-wavy decoration-[#737373] dark:decoration-[#a3a3a3] font-medium"
                      >
                        Git and GitHub course &mdash; Javascript Mastery
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </article>

        {/* Return link */}
        <div className="pt-10 pb-6 border-b border-neutral-200/70 dark:border-[#a3a3a3]/20">
          <Link
            href="/blog"
            onClick={() => playTone(880)}
            className="font-mono text-[13.5px] sm:text-[14px] text-[#737373] dark:text-[#a3a3a3] hover:underline underline-offset-4 font-medium flex items-center space-x-1 cursor-pointer"
          >
            <span>&larr; back to all writings</span>
          </Link>
        </div>

        {/* Standard Footer */}
        <footer className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 font-mono text-xs sm:text-[13px] text-[#64748B] dark:text-[#8E95B8]">
          <div>coding is an art and im an artist</div>
          <div>made w love  &copy; 2026</div>
        </footer>
      </main>
    </div>
  );
}
