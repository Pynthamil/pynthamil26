"use client";

import React, { useState, useEffect } from "react";
import { portfolioData, Project, Post } from "@/data/portfolio";
import { Modal } from "@/components/Modal";
import { ProjectSidebar } from "./ProjectSidebar";
import { Moon, Sun, Mail } from "lucide-react";

export function PortfolioView({
  initialViewMode = "home",
}: {
  initialViewMode?: "home" | "about" | "blog";
}) {
  const [viewMode, setViewMode] = useState<"home" | "about" | "blog">(initialViewMode);

  // Typing animation state
  const phrases = [
    "making plue THE student haven",
    "making minimalism feel alive and not so boring",
    "learning to battle real-time systems"
  ];
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(phrases[0].length); // start with first phrase fully typed
  const [isDeleting, setIsDeleting] = useState(false);
  const [hasStartedTyping, setHasStartedTyping] = useState(false);

  

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    if (!hasStartedTyping) {
      timeout = setTimeout(() => {
        setHasStartedTyping(true);
        setIsDeleting(true);
      }, 3000);
      return () => clearTimeout(timeout);
    }

    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      if (charIndex > 0) {
        timeout = setTimeout(() => setCharIndex((c) => c - 1), 35);
      } else {
        setIsDeleting(false);
        setPhraseIndex((p) => (p + 1) % phrases.length);
      }
    } else {
      if (charIndex < currentPhrase.length) {
        timeout = setTimeout(() => setCharIndex((c) => c + 1), 60);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2500);
      }
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, phraseIndex, hasStartedTyping]);

  const currentTypingText = phrases[phraseIndex].substring(0, charIndex);

  const renderTypingTextWithLinks = (text: string) => {
    const parts = text.split(/(plue)/g);
    return parts.map((part, i) => {
      if (part === "plue") {
        return (
          <a
            key={i}
            href="https://getplue.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#2C2C2C] dark:text-[#F2F2F2] underline underline-offset-4 decoration-wavy decoration-[#2C2C2C]/40 dark:decoration-[#F2F2F2]/40 hover:decoration-[#2C2C2C] dark:hover:decoration-[#F2F2F2] font-medium transition-colors"
          >
            {part}
          </a>
        );
      }
      return part;
    });
  };

  const [blogFilter, setBlogFilter] = useState<string>("all");
  const [expandedExperience, setExpandedExperience] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isMeetHumanOpen, setIsMeetHumanOpen] = useState<boolean>(false);
  const [isFunFactsOpen, setIsFunFactsOpen] = useState<boolean>(false);
  const [isLearningOpen, setIsLearningOpen] = useState<boolean>(false);
  const [isTouchGrassOpen, setIsTouchGrassOpen] = useState<boolean>(false);
  const [isComeSayHiOpen, setIsComeSayHiOpen] = useState<boolean>(false);
  const [isAboutBlogOpen, setIsAboutBlogOpen] = useState<boolean>(false);
  const [expandedBlogSlug, setExpandedBlogSlug] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const [soundOn, setSoundOn] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<string>("");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isNameHovered, setIsNameHovered] = useState(false);
    const [blogSearchQuery, setBlogSearchQuery] = useState("");

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

  // Sync with browser URL navigation and history (Back / Forward)
  useEffect(() => {
    const syncWithPath = () => {
      const path = window.location.pathname;
      if (path === "/about") {
        setViewMode("about");
      } else if (path === "/blog") {
        setViewMode("blog");
      } else {
        setViewMode("home");
      }
    };

    syncWithPath();
    window.addEventListener("popstate", syncWithPath);
    return () => window.removeEventListener("popstate", syncWithPath);
  }, []);

  // Live ticking clock with IST
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString("en-GB", {
        timeZone: "Asia/Kolkata",
        hour12: false,
      });
      setCurrentTime(`${timeString} IST`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Web Audio synthesizer
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

  const playClickSound = () => playTone(880);

  const handleNavClick = (mode: "home" | "about" | "blog") => {
    playClickSound();
    setViewMode(mode);
    const targetUrl = mode === "home" ? "/" : `/${mode}`;
    if (typeof window !== "undefined" && window.location.pathname !== targetUrl) {
      window.history.pushState({ mode }, "", targetUrl);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleSound = () => {
    setSoundOn((prev) => !prev);
    if (!soundOn) {
      setTimeout(() => playClickSound(), 50);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-start items-center px-5 sm:px-8 md:px-12 pt-16 sm:pt-24 pb-24 selection:bg-neutral-200">
      {/* Soft atmospheric ambient glow */}
      <div className="ambient-glow" />

      {/* Main Container */}
      <main className="w-full relative z-10 flex flex-col max-w-[560px]">
        {/* Top Header Row */}
        <header className={`flex flex-col w-full ${viewMode === "home" ? "mb-6 sm:mb-6" : "mb-8 sm:mb-10"}`}>

          <div className="flex flex-col items-start w-full gap-y-2.5 sm:gap-y-3">
            {/* Left Title: Always the pink name, acts as Home link if not on Home */}
            <div className="flex items-center shrink-0 w-fit group">
              <button
                onClick={() => viewMode !== "home" && handleNavClick("home")}
                className={`but-head-regular text-[32px] sm:text-[36px] font-normal tracking-tight text-[#2C2C2C] dark:text-[#F2F2F2] select-none text-left focus:outline-none flex items-center ${viewMode !== "home" ? "cursor-pointer hover:opacity-80 transition-opacity" : "cursor-default"}`}
              >
                <span>{portfolioData.name.toLowerCase()}</span>
                
                <span className="flex items-center space-x-1.5 ml-2 pointer-events-none  transition-opacity duration-200">
                  <img 
                    src="/nova-looking.svg" 
                    alt=""
                    className="w-[28px] h-[28px] sm:w-[32px] sm:h-[32px] object-contain"
                  />
                  <img 
                    src="/nova-working.svg" 
                    alt=""
                    className="w-[28px] h-[28px] sm:w-[32px] sm:h-[32px] object-contain"
                  />
                  <img 
                    src="/nova-thinking1.svg" 
                    alt=""
                    className="w-[28px] h-[28px] sm:w-[32px] sm:h-[32px] object-contain"
                  />
                </span>
              </button>
            </div>

            {/* Right / Under on Mobile: Navigation Links & Dark Mode Toggle */}
            <div className="flex items-center justify-between w-full">
              <nav className="flex items-center space-x-4 sm:space-x-5 text-[15.5px] sm:text-[16.5px] font-medium sm:pt-1">
                
                <button
                  onClick={() => handleNavClick("about")}
                  className={`transition-colors cursor-pointer select-none ${
                    viewMode === "about"
                      ? "text-[#00B5B2] font-semibold underline underline-offset-4 decoration-wavy decoration-[#00B5B2]"
                      : "text-[#2C2C2C] dark:text-[#F2F2F2] hover:text-[#00B5B2] dark:hover:text-[#00B5B2]"
                  }`}
                >
                  About
                </button>
                <button
                  onClick={() => handleNavClick("blog")}
                  className={`transition-colors cursor-pointer select-none ${
                    viewMode === "blog"
                      ? "text-[#00B5B2] font-semibold underline underline-offset-4 decoration-wavy decoration-[#00B5B2]"
                      : "text-[#2C2C2C] dark:text-[#F2F2F2] hover:text-[#00B5B2] dark:hover:text-[#00B5B2]"
                  }`}
                >
                  Blog
                </button>
              </nav>

              {/* Dark Mode Toggle Button */}
              <button
                onClick={toggleTheme}
                aria-label="Toggle dark mode"
                className="p-1 text-[#2C2C2C] dark:text-[#F2F2F2] hover:text-[#00B5B2] dark:hover:text-[#00B5B2] transition-colors focus:outline-none cursor-pointer flex items-center justify-center"
              >
                {isDarkMode ? (
                  <Sun className="w-4 h-4 transition-transform duration-200 hover:rotate-45" strokeWidth={2} />
                ) : (
                  <Moon className="w-4 h-4 transition-transform duration-200 hover:-rotate-12" strokeWidth={2} />
                )}
              </button>
            </div>
          </div>
        </header>

        {/* ========================================================
            VIEW 1: HOME VIEW
            ======================================================== */}
        {viewMode === "home" && (
          <div className="flex flex-col animate-in fade-in duration-200">
            {/* Bio Copy & Status Section */}
            <section className="flex flex-col space-y-4 mb-12 sm:mb-14">
              <p className="text-[17px] sm:text-[18px] text-[#475569] dark:text-[#CBD5E1] font-normal leading-relaxed">
                I am a software engineer focused on building fast, scalable products with intuitive design. I love taking ambitious ideas from zero to one.
              </p>
              
              <p className="text-[16px] sm:text-[17px] text-[#475569] dark:text-[#CBD5E1] font-normal leading-[1.85]">
                currently an <span className="bg-[#E8F4F8] dark:bg-[#1E3A4A] text-[#2C6E8A] dark:text-[#7EC8E3] px-1.5 py-0.5 rounded-[5px] font-medium">engineering intern</span> at{" "}
                <span className="inline-flex items-center px-1.5 py-0.5 mx-0.5 rounded-[5px] bg-[#E8F4F8] dark:bg-[#1E3A4A] align-text-bottom" style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "0.9em", fontStyle: "normal", color: "#2C6E8A" }}>plue</span>
                {", "}democratizing learning by making a world where humans can learn on their own terms.
              </p>

              <p className="text-[16px] sm:text-[17px] text-[#2C2C2C] dark:text-[#F2F2F2] leading-relaxed">
                Find me on{" "}
                <a
                  href="https://x.com/pyndu15"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#2C2C2C] dark:text-[#F2F2F2] underline underline-offset-4 decoration-[#2C2C2C]/30 dark:decoration-[#F2F2F2]/40 hover:decoration-[#2C2C2C] dark:hover:decoration-[#F2F2F2] transition-colors"
                >
                  X
                </a>
                ,{" "}
                <a
                  href="https://github.com/Pynthamil"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#2C2C2C] dark:text-[#F2F2F2] underline underline-offset-4 decoration-[#2C2C2C]/30 dark:decoration-[#F2F2F2]/40 hover:decoration-[#2C2C2C] dark:hover:decoration-[#F2F2F2] transition-colors"
                >
                  GitHub
                </a>
                ,{" "}
                <a
                  href="https://linkedin.com/in/pynthamil-pavendan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#2C2C2C] dark:text-[#F2F2F2] underline underline-offset-4 decoration-[#2C2C2C]/30 dark:decoration-[#F2F2F2]/40 hover:decoration-[#2C2C2C] dark:hover:decoration-[#F2F2F2] transition-colors"
                >
                  LinkedIn
                </a>
                , or{" "}
                <a
                  href={portfolioData.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playTone(880)}
                  className="but-head-regular text-[22px] sm:text-[24px] text-black dark:text-white underline underline-offset-4 decoration-wavy decoration-[#00B5B2] font-normal transition-colors"
                >
                  download my CV &darr;
                </a>
              </p>

              {/* Dashed Email Box */}
              <div className="pt-2 flex">
                <div
                  onClick={() => {
                    navigator.clipboard.writeText(portfolioData.email);
                    setCopiedEmail(true);
                    playTone(1046);
                    setTimeout(() => setCopiedEmail(false), 2000);
                  }}
                  className="inline-flex items-center space-x-2.5 px-3.5 py-2 border border-dashed border-neutral-400 dark:border-neutral-600 rounded-none bg-transparent cursor-pointer group select-none hover:border-neutral-500 dark:hover:border-neutral-500 transition-colors"
                  title="Click to copy email"
                >
                  <span className="font-sans text-[14.5px] sm:text-[15.5px] text-neutral-500 dark:text-neutral-400 group-hover:text-[#2C2C2C] dark:group-hover:text-[#F2F2F2] tracking-wide transition-colors">
                    {portfolioData.email}
                  </span>
                  <div className="text-neutral-500 dark:text-neutral-400 group-hover:text-[#2C2C2C] dark:group-hover:text-[#F2F2F2] flex items-center focus:outline-none transition-colors">
                    {copiedEmail ? (
                      <span className="text-emerald-400 font-mono text-xs font-medium animate-in fade-in">
                        copied!
                      </span>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="opacity-75 group-hover:opacity-100 transition-opacity"
                      >
                        <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* Work Section */}
            {portfolioData.projects.length > 0 && (
              <section className="w-full mb-12 sm:mb-14">
                <h2 className="font-sans text-[14px] sm:text-[15px] uppercase tracking-[0.08em] text-[#475569] dark:text-[#94A3B8] mb-3.5 font-semibold">
                  selected works
                </h2>
                <ul className="flex flex-col space-y-5 sm:space-y-6 font-mono text-[15.5px] sm:text-[16.5px] tracking-[0.02em]">
                  {portfolioData.projects.map((project: Project, idx: number) => {
                    const isInternal = project.link && project.link.startsWith("/");
                    return (
                      <li
                        key={idx}
                        className="group flex flex-col py-1.5 cursor-dot transition-opacity hover:opacity-90"
                        onClick={() => {
                          if (isInternal && project.link) {
                            playTone(880);
                            window.location.href = project.link;
                          } else {
                            setSelectedProject(project);
                          }
                        }}
                      >
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center flex-1 pr-4">
                            <span 
                              className="but-head-regular text-[22px] tracking-[0.02em] transition-all hover:underline decoration-wavy underline-offset-4 decoration-2 text-[#0F172A] dark:text-[#F2F2F2] italic"
                            >
                              {project.title}
                            </span>
                          </div>

                          </div>

                        {project.description && (
                          <p className="text-[17px] sm:text-[18px] font-sans text-[#475569] dark:text-[#CBD5E1] mt-1.5 leading-relaxed">
                            {project.description}
                          </p>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </section>
            )}
          </div>
        )}

        {/* ========================================================
            VIEW 2: ABOUT VIEW
           ======================================================== */}
        {viewMode === "about" && (
          <div className="flex flex-col space-y-6 sm:space-y-7 animate-in fade-in duration-200">
            {/* Experience Section - first in About */}
            <section id="experience" className="w-full scroll-mt-24">
              <h2 className="but-head-regular text-[22px] sm:text-[24px] text-[#2C2C2C] dark:text-[#F2F2F2] mb-1">
                Experience
              </h2>
              <p className="font-mono text-[13.5px] sm:text-[14.5px] text-[#475569] dark:text-[#94A3B8] mt-0.5 mb-5 flex items-center space-x-1.5">
                <span className="select-none">└</span>
                <span>where i've worked</span>
              </p>
              <ul className="flex flex-col font-sans text-[15.5px] sm:text-[16.5px] tracking-[0.02em]">
                {portfolioData.experiences.map((item) => (
                  <li
                    key={item.id}
                    className="group flex flex-col py-4 sm:py-5 border-b border-neutral-100 dark:border-neutral-800 last:border-0"
                  >
                    <div className="flex items-start justify-between w-full">
                      <div className="flex items-start flex-1 pr-4">
                        <div className="flex flex-col justify-center h-full">
                          <span className="font-bold text-[#0F172A] dark:text-[#F2F2F2] tracking-[0.02em]">
                            {item.role.toLowerCase().replace(/\b\w/g, s => s.toUpperCase())} @ {item.company.toLowerCase().replace(/\b\w/g, s => s.toUpperCase())}
                          </span>
                        </div>
                      </div>
                      <div className="text-right text-[13.5px] sm:text-[14.5px] text-[#64748B] dark:text-[#8E95B8] uppercase font-normal tracking-[0.02em] whitespace-nowrap pt-0.5">
                        {item.period}
                      </div>
                    </div>
                    
                    {item.bullets && item.bullets.length > 0 && (
                      <ul className="mt-4 flex flex-col space-y-2.5 text-[16px] sm:text-[17px] text-[#475569] dark:text-[#CBD5E1] font-sans font-normal leading-relaxed">
                        {item.bullets.map((bullet, idx) => (
                          <li key={idx} className="flex items-start gap-2.5">
                            <span className="text-[#00B5B2] font-bold mt-0.5 shrink-0">+</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </section>


            {/* Meet The Human Dropdown Accordion */}
            <div id="meet-the-human" className="border-b border-neutral-200/70 dark:border-neutral-400/20 pb-5 scroll-mt-24">
              <div
                
                className="flex items-center justify-between py-1.5"
              >
                <div>
                  <h2 className="but-head-regular text-[24px] sm:text-[28px] font-normal tracking-tight text-[#2C2C2C] dark:text-[#F2F2F2] leading-none mb-1">
                    meet the human
                  </h2>
                  <p className="font-mono text-[13.5px] sm:text-[14.5px] text-[#475569] dark:text-[#94A3B8] mt-0.5 flex items-center space-x-1.5">
                    <span className="select-none">└</span>
                    <span>because a portfolio needs a personality</span>
                  </p>
                </div>
                
              </div>

              <div className="mt-4 space-y-3.5 text-[16px] sm:text-[17px] text-[#2C2C2C] dark:text-[#F2F2F2] leading-relaxed font-sans animate-in fade-in duration-150">
                  <div className="flex items-start space-x-2.5">
                    <span className="text-[#00B5B2] font-bold mt-0.5 shrink-0">+</span>
                    <span>My name is <span className="text-[#2C2C2C] dark:text-[#F2F2F2] but-head-regular text-[20px] sm:text-[21px] underline decoration-wavy decoration-[#00B5B2] underline-offset-4 cursor-default">Pynthamil Pavendan</span>!</span>
                  </div>
                  <div className="flex items-start space-x-2.5">
                    <span className="text-[#00B5B2] font-bold mt-0.5 shrink-0">+</span>
                    <span>
                      I&apos;m a student developer who enjoys turning ideas into things people can actually use
                    </span>
                  </div>
                  <div className="flex items-start space-x-2.5">
                    <span className="text-[#00B5B2] font-bold mt-0.5 shrink-0">+</span>
                    <span>I like building interfaces that feel simple, fast, and intentional</span>
                  </div>
                  <div className="flex items-start space-x-2.5">
                    <span className="text-[#00B5B2] font-bold mt-0.5 shrink-0">+</span>
                    <span>
                      I spend most of my time working with modern web technologies, experimenting with interaction design, and refining the small details that make products feel polished
                    </span>
                  </div>
                  <div className="flex items-start space-x-2.5">
                    <span className="text-[#00B5B2] font-bold mt-0.5 shrink-0">+</span>
                    <span>
                      I&apos;m especially interested in how design and engineering come together to create experiences that feel effortless
                    </span>
                  </div>
                  <div className="flex items-start space-x-2.5">
                    <span className="text-[#00B5B2] font-bold mt-0.5 shrink-0">+</span>
                    <span>
                      Currently focused on building projects that are useful, visually clean, and quietly memorable
                    </span>
                  </div>
                </div>
            </div>

            {/* Come Say Hi Dropdown Accordion */}
            <div id="stack" className="border-b border-neutral-200/70 dark:border-neutral-400/20 pb-5 scroll-mt-24">
              <div className="flex items-center justify-between py-1.5">
                <div>
                  <h2 className="but-head-regular text-[24px] sm:text-[28px] font-normal tracking-tight text-[#2C2C2C] dark:text-[#F2F2F2] leading-none mb-1">
                    stack
                  </h2>
                  <p className="font-mono text-[13.5px] sm:text-[14.5px] text-[#475569] dark:text-[#94A3B8] mt-0.5 flex items-center space-x-1.5">
                    <span className="select-none">└</span>
                    <span>tools of the trade</span>
                  </p>
                </div>
              </div>

              <div className="mt-4 text-[16px] sm:text-[17px] text-[#2C2C2C] dark:text-[#F2F2F2] leading-relaxed font-sans">
                <div className="flex items-start space-x-2.5">
                  <span className="text-[#00B5B2] font-bold mt-0.5 shrink-0">+</span>
                  <span>Next.js  Supabase  Python  Figma  Antigravity</span>
                </div>
              </div>
            </div>

            {/* Fun Facts About Me Dropdown Accordion */}
            <div className="border-b border-neutral-200/70 dark:border-neutral-400/20 pb-5">
              <div
                
                className="flex items-center justify-between py-1.5"
              >
                <div>
                  <h2 id="currently-learning" className="but-head-regular text-[24px] sm:text-[28px] font-normal tracking-tight text-[#2C2C2C] dark:text-[#F2F2F2] leading-none mb-1 scroll-mt-24">
                    what i am currently learning
                  </h2>
                  <p className="font-mono text-[13.5px] sm:text-[14.5px] text-[#475569] dark:text-[#94A3B8] mt-0.5 flex items-center space-x-1.5">
                    <span className="select-none">└</span>
                    <span>learning, unlearning, relearning</span>
                  </p>
                </div>
                
              </div>

              <div className="mt-4 space-y-3.5 text-[16px] sm:text-[17px] text-[#2C2C2C] dark:text-[#F2F2F2] leading-relaxed font-sans animate-in fade-in duration-150">
                  <div className="flex items-start space-x-2.5">
                    <span className="text-[#00B5B2] font-bold mt-0.5 shrink-0">+</span>
                    <span>
                      currently learning how to make things feel simple without making them boring
                    </span>
                  </div>
                  <div className="flex items-start space-x-2.5">
                    <span className="text-[#00B5B2] font-bold mt-0.5 shrink-0">+</span>
                    <span>
                      exploring better ways to structure code, design cleaner interfaces, and build products that feel intentional from the first click
                    </span>
                  </div>
                  <div className="flex items-start space-x-2.5">
                    <span className="text-[#00B5B2] font-bold mt-0.5 shrink-0">+</span>
                    <span>
                      trying to understand why some digital experiences feel effortless while others feel confusing, even when they do the same thing
                    </span>
                  </div>
                  <div className="flex items-start space-x-2.5">
                    <span className="text-[#00B5B2] font-bold mt-0.5 shrink-0">+</span>
                    <span>
                      also learning to be okay with not knowing everything yet and building anyway
                    </span>
                  </div>
                </div>
            </div>

            {/* What I Am Currently Learning Dropdown Accordion */}
            <div className="border-b border-neutral-200/70 dark:border-neutral-400/20 pb-5">
              <div
                
                className="flex items-center justify-between py-1.5"
              >
                <div>
                  <h2 id="fun-facts" className="but-head-regular text-[24px] sm:text-[28px] font-normal tracking-tight text-[#2C2C2C] dark:text-[#F2F2F2] leading-none mb-1 scroll-mt-24">
                    fun facts about me
                  </h2>
                  <p className="font-mono text-[13.5px] sm:text-[14.5px] text-[#475569] dark:text-[#94A3B8] mt-0.5 flex items-center space-x-1.5">
                    <span className="select-none">└</span>
                    <span>the lore drops</span>
                  </p>
                </div>
                
              </div>

              <div className="mt-4 space-y-3.5 text-[16px] sm:text-[17px] text-[#2C2C2C] dark:text-[#F2F2F2] leading-relaxed font-sans animate-in fade-in duration-150">
                  <div className="flex items-start space-x-2.5">
                    <span className="text-[#00B5B2] font-bold mt-0.5 shrink-0">+</span>
                    <span>
                      music taste: a bit of everything &rarr; if it sounds good, I&apos;m listening
                    </span>
                  </div>
                  <div className="flex items-start space-x-2.5">
                    <span className="text-[#00B5B2] font-bold mt-0.5 shrink-0">+</span>
                    <span>
                      I love singing and dancing like nobody&apos;s watching (because usually nobody is)
                    </span>
                  </div>
                  <div className="flex items-start space-x-2.5">
                    <span className="text-[#00B5B2] font-bold mt-0.5 shrink-0">+</span>
                    <span>
                      introvert... who also loves to yap when the topic is interesting
                    </span>
                  </div>
                  <div className="flex items-start space-x-2.5">
                    <span className="text-[#00B5B2] font-bold mt-0.5 shrink-0">+</span>
                    <span>personality type: INTJ</span>
                  </div>
                  <div className="flex items-start space-x-2.5">
                    <span className="text-[#00B5B2] font-bold mt-0.5 shrink-0">+</span>
                    <span>I enjoy challenging myself just for the plot</span>
                  </div>
                  <div className="flex items-start space-x-2.5">
                    <span className="text-[#00B5B2] font-bold mt-0.5 shrink-0">+</span>
                    <span>I love chess</span>
                  </div>
                  <div className="flex items-start space-x-2.5">
                    <span className="text-[#00B5B2] font-bold mt-0.5 shrink-0">+</span>
                    <span>most of my illustrations are inspired by Headspace</span>
                  </div>
                  <div className="flex items-start space-x-2.5">
                    <span className="text-[#00B5B2] font-bold mt-0.5 shrink-0">+</span>
                    <span>
                      currently in my final year of college &mdash; slightly terrifying &amp; slightly exciting
                    </span>
                  </div>
                </div>
            </div>

            {/* When I Touch Grass Dropdown Accordion */}
            <div className="border-b border-neutral-200/70 dark:border-neutral-400/20 pb-5">
              <div
                
                className="flex items-center justify-between py-1.5"
              >
                <div>
                  <h2 id="touching-grass" className="but-head-regular text-[24px] sm:text-[28px] font-normal tracking-tight text-[#2C2C2C] dark:text-[#F2F2F2] leading-none mb-1 scroll-mt-24">
                    when i touch grass
                  </h2>
                  <p className="font-mono text-[13.5px] sm:text-[14.5px] text-[#475569] dark:text-[#94A3B8] mt-0.5 flex items-center space-x-1.5">
                    <span className="select-none">└</span>
                    <span>rare but documented</span>
                  </p>
                </div>
                
              </div>

              <div className="mt-4 space-y-3.5 text-[16px] sm:text-[17px] text-[#2C2C2C] dark:text-[#F2F2F2] leading-relaxed font-sans animate-in fade-in duration-150">
                  <div className="flex items-start space-x-2.5">
                    <span className="text-[#00B5B2] font-bold mt-0.5 shrink-0">+</span>
                    <span>
                      I love reading books, watching movies, writing, and drawing
                    </span>
                  </div>
                  <div className="flex items-start space-x-2.5">
                    <span className="text-[#00B5B2] font-bold mt-0.5 shrink-0">+</span>
                    <span>
                      I&apos;m very curious so I love to constantly explore new things
                    </span>
                  </div>
                  <div className="flex items-start space-x-2.5">
                    <span className="text-[#00B5B2] font-bold mt-0.5 shrink-0">+</span>
                    <span>
                      I don&apos;t believe the saying <span className="hover:underline hover:decoration-wavy underline-offset-4 cursor-default">&quot;curiosity kills the cat&quot;</span> &mdash; haha
                    </span>
                  </div>
                </div>
            </div>

            {/* About My Blog Dropdown Accordion */}
            <div id="about-my-blog" className="border-b border-neutral-200/70 dark:border-neutral-400/20 pb-5 scroll-mt-24">
              <div
                
                className="flex items-center justify-between py-1.5"
              >
                <div>
                  <h2 className="but-head-regular text-[24px] sm:text-[28px] font-normal tracking-tight text-[#2C2C2C] dark:text-[#F2F2F2] leading-none mb-1">
                    about my blog
                  </h2>
                  <p className="font-mono text-[13.5px] sm:text-[14.5px] text-[#475569] dark:text-[#94A3B8] mt-0.5 flex items-center space-x-1.5">
                    <span className="select-none">└</span>
                    <span>my brain leaving sticky notes for itself</span>
                  </p>
                </div>
                
              </div>

              <div className="mt-4 space-y-3.5 text-[16px] sm:text-[17px] text-[#2C2C2C] dark:text-[#F2F2F2] leading-relaxed font-sans animate-in fade-in duration-150">
                  <div className="flex items-start space-x-2.5">
                    <span className="text-[#00B5B2] font-bold mt-0.5 shrink-0">+</span>
                    <span>
                      I write about things I&apos;m learning, things I&apos;m building, and things I randomly become obsessed with at 2:17 am
                    </span>
                  </div>
                  <div className="flex items-start space-x-2.5">
                    <span className="text-[#00B5B2] font-bold mt-0.5 shrink-0">+</span>
                    <span>
                      sometimes it&apos;s about tech, sometimes design, sometimes a thought that refuses to leave me alone until I write it down
                    </span>
                  </div>
                  <div className="flex items-start space-x-2.5">
                    <span className="text-[#00B5B2] font-bold mt-0.5 shrink-0">+</span>
                    <span>
                      it&apos;s less &quot;expert advice&quot; and more &quot;let me see if this idea makes sense outside my head&quot;
                    </span>
                  </div>
                  <div className="flex items-start space-x-2.5">
                    <span className="text-[#00B5B2] font-bold mt-0.5 shrink-0">+</span>
                    <span>
                      mostly curiosity. occasionally clarity. always slightly unhinged but in a productive way
                    </span>
                  </div>
                </div>
            </div>



            {/* Stack Row */}
            <div id="come-say-hi" className="border-b border-neutral-200/70 dark:border-neutral-400/20 pb-5 scroll-mt-24">
              <div
                
                className="flex items-center justify-between py-1.5"
              >
                <div>
                  <h2 className="but-head-regular text-[24px] sm:text-[28px] font-normal tracking-tight text-[#2C2C2C] dark:text-[#F2F2F2] leading-none mb-1">
                    come say hi
                  </h2>
                  <p className="font-mono text-[13.5px] sm:text-[14.5px] text-[#475569] dark:text-[#94A3B8] mt-0.5 flex items-center space-x-1.5">
                    <span className="select-none">└</span>
                    <span>the internet&apos;s version of knocking on my door</span>
                  </p>
                </div>
                
              </div>

              <div className="mt-4 space-y-3.5 text-[16px] sm:text-[17px] text-[#2C2C2C] dark:text-[#F2F2F2] leading-relaxed font-sans animate-in fade-in duration-150">
                  <div className="flex items-start space-x-2.5">
                    <span className="text-[#00B5B2] font-bold mt-0.5 shrink-0">+</span>
                    <span>
                      Always down to chat about code, design systems, crazy ideas, or good music
                    </span>
                  </div>
                  <div className="flex items-start space-x-2.5">
                    <span className="text-[#00B5B2] font-bold mt-0.5 shrink-0">+</span>
                    <span>
                      Drop a line at{" "}
                      <a
                        href={`mailto:${portfolioData.email}`}
                        className="text-[#00B5B2] underline underline-offset-4 decoration-wavy decoration-[#00B5B2] font-medium"
                      >
                        {portfolioData.email}
                      </a>
                    </span>
                  </div>
                  <div className="flex items-start space-x-2.5">
                    <span className="text-[#00B5B2] font-bold mt-0.5 shrink-0">+</span>
                    <span>
                      Find me on{" "}
                      <a
                        href="https://x.com/pyndu15"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#2C2C2C] dark:text-[#F2F2F2] underline underline-offset-4 decoration-[#2C2C2C]/30 dark:decoration-[#F2F2F2]/40 hover:decoration-[#2C2C2C] dark:hover:decoration-[#F2F2F2] font-medium"
                      >
                        X
                      </a>
                      ,{" "}
                      <a
                        href="https://github.com/Pynthamil"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#2C2C2C] dark:text-[#F2F2F2] underline underline-offset-4 decoration-[#2C2C2C]/30 dark:decoration-[#F2F2F2]/40 hover:decoration-[#2C2C2C] dark:hover:decoration-[#F2F2F2] font-medium"
                      >
                        GitHub
                      </a>
                      ,{" "}
                      <a
                        href="https://leetcode.com/u/HashKnight/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#2C2C2C] dark:text-[#F2F2F2] underline underline-offset-4 decoration-[#2C2C2C]/30 dark:decoration-[#F2F2F2]/40 hover:decoration-[#2C2C2C] dark:hover:decoration-[#F2F2F2] font-medium"
                      >
                        LeetCode
                      </a>
                      , and{" "}
                      <a
                        href="https://linkedin.com/in/pynthamil-pavendan"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#2C2C2C] dark:text-[#F2F2F2] underline underline-offset-4 decoration-[#2C2C2C]/30 dark:decoration-[#F2F2F2]/40 hover:decoration-[#2C2C2C] dark:hover:decoration-[#F2F2F2] font-medium"
                      >
                        LinkedIn
                      </a>
                    </span>
                  </div>
                </div>
            </div>


            <ProjectSidebar 
              sections={[
                { id: "experience", label: "Experience" },
                { id: "meet-the-human", label: "Meet The Human" },
                { id: "stack", label: "Stack" },
                { id: "currently-learning", label: "What I Am Currently Learning" },
                { id: "fun-facts", label: "Fun Facts" },
                { id: "touching-grass", label: "When I Touch Grass" },
                { id: "about-my-blog", label: "About My Blog" }
              ]} 
              playTone={soundOn ? playClickSound : undefined}
            />
          </div>
        )}

        {/* ========================================================
            VIEW 3: BLOG VIEW
           ======================================================== */}
        {viewMode === "blog" && (
          <div className="flex flex-col space-y-7 animate-in fade-in duration-200">
            {/* Blog Search */}
            <div className="flex justify-end w-full">
              <div className="relative w-full sm:w-64">
                <svg 
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B] dark:text-[#94A3B8]" 
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  value={blogSearchQuery}
                  onChange={(e) => setBlogSearchQuery(e.target.value)}
                  placeholder="Search"
                  className="w-full bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 text-[#2C2C2C] dark:text-[#F2F2F2] font-sans text-[14px] rounded-none py-2 pl-10 pr-4 focus:outline-none focus:border-[#00B5B2] dark:focus:border-[#00B5B2] transition-colors placeholder:text-[#94A3B8] dark:placeholder:text-[#64748B]"
                />
              </div>
            </div>

            {/* Blog Posts Clean Architecture */}
            <section>
              <div>
                {portfolioData.writings.filter(post => post.title.toLowerCase().includes(blogSearchQuery.toLowerCase())).map((post, idx) => (
                  <div key={idx} className="pb-6 sm:pb-6.5 pt-6 sm:pt-6.5 first:pt-0">
                    <a
                      href={`/blog/${post.slug}`}
                      onClick={() => playTone(880)}
                      className="flex items-center justify-between group select-none cursor-pointer"
                    >
                      <div className="space-y-1.5">
                        <h2 className="text-[19px] sm:text-[20.5px] font-medium text-[#2C2C2C] dark:text-[#F2F2F2] transition-colors leading-snug">
                          {post.title.toLowerCase()}
                        </h2>
                        <p className="font-sans text-[13.5px] sm:text-[14.5px] text-[#475569] dark:text-[#94A3B8] mt-0.5">
                          {post.date.toLowerCase()}  {post.readingTime.toLowerCase()} read
                        </p>
                      </div>

                    </a>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* Unified Footer for all views */}
        <footer className="w-full pt-10 sm:pt-12 mt-auto border-t border-transparent flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0 font-sans text-[14px] sm:text-[14.5px] text-[#64748B] dark:text-[#8E95B8]">
          <div className="flex-1 text-left hidden sm:block">coding is an art and im an artist</div>
          <div className="flex-shrink-0 flex justify-center w-full sm:w-auto">
             <a 
               href="mailto:pavendanpynthamil@gmail.com" 
               className="flex items-center justify-center space-x-2 px-3 py-1.5 bg-[#EEF2FF] dark:bg-[#312E81]/20 border border-[#818CF8] dark:border-[#4F46E5] text-[#4F46E5] dark:text-[#818CF8] text-[14px] font-medium rounded-md hover:bg-[#E0E7FF] dark:hover:bg-[#312E81]/40 transition-colors"
             >
                <span>email</span>
                <Mail className="w-3.5 h-3.5" />
             </a>
          </div>
          <div className="flex-1 text-right hidden sm:block">made w love &copy; 2026</div>
          <div className="flex sm:hidden flex-col items-center gap-1 mt-4">
             <div>coding is an art and im an artist</div>
             <div>made w love &copy; 2026</div>
          </div>
        </footer>
      </main>

      {/* Detail Modals */}
      {selectedProject && (
        <Modal
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          title={selectedProject.title}
          badge="PROJECT"
        >
          <div className="space-y-3 text-[#2C2C2C] dark:text-[#F2F2F2]">
            <div className="text-xs font-mono text-[#475569] dark:text-[#94A3B8]">
              {selectedProject.year}  {selectedProject.status || "Completed"}
            </div>
            <p className="text-sm font-medium leading-relaxed text-[#2C2C2C] dark:text-[#F2F2F2]">
              {selectedProject.description}
            </p>
            {selectedProject.longDescription && (
              <p className="text-[13.5px] leading-relaxed text-[#475569] dark:text-[#CBD5E1] pt-1">
                {selectedProject.longDescription}
              </p>
            )}
            {selectedProject.tags && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {selectedProject.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="font-mono text-[10.5px] px-2 py-0.5 bg-[#2C2C2C]/5 dark:bg-neutral-400/20 rounded text-[#2C2C2C] dark:text-[#F2F2F2]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </Modal>
      )}

      {selectedPost && (
        <Modal
          isOpen={!!selectedPost}
          onClose={() => setSelectedPost(null)}
          title={selectedPost.title}
          badge="BLOG"
        >
          <div className="space-y-3 text-[#2C2C2C] dark:text-[#F2F2F2]">
            <div className="text-xs font-mono text-[#475569] dark:text-[#94A3B8]">
              {selectedPost.date}  {selectedPost.readingTime}
            </div>
            <p className="text-sm leading-relaxed text-[#2C2C2C] dark:text-[#F2F2F2] pt-1">
              {selectedPost.description}
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
}

