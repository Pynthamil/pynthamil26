"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { portfolioData, Project, Post } from "@/data/portfolio";
import { Modal } from "@/components/Modal";
import { GitHubActivity } from "@/components/ui/github-activity";
import { ProjectSidebar } from "./ProjectSidebar";
import { Footer } from "./Footer";
import { LottiePlayer } from "@/components/LottiePlayer";
import { OrcaCardCover } from "@/components/OrcaCardCover";
import { CustomCursor } from "@/components/CustomCursor";
import { Moon, Sun, Copy, Check, X, Clock, Menu, Mail, SlidersHorizontal, ChevronDown, Folder, User, BookOpen, FileText, Home, Dribbble, Sparkles } from "lucide-react";

function TypewriterName() {
  const words = ["pynthamil", "பைந்தமிழ்"];
  const [wordIndex, setWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("pynthamil");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    const graphemes = typeof Intl !== "undefined" && (Intl as any).Segmenter
      ? Array.from(new (Intl as any).Segmenter("ta", { granularity: "grapheme" }).segment(currentWord)).map((s: any) => s.segment)
      : Array.from(currentWord);

    const currentGraphemes = typeof Intl !== "undefined" && (Intl as any).Segmenter
      ? Array.from(new (Intl as any).Segmenter("ta", { granularity: "grapheme" }).segment(displayText)).map((s: any) => s.segment)
      : Array.from(displayText);

    let timeout: NodeJS.Timeout;

    if (!isDeleting && currentGraphemes.length === graphemes.length) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 2500);
    } else if (isDeleting && currentGraphemes.length === 0) {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
    } else {
      const speed = isDeleting ? 60 : 110;
      timeout = setTimeout(() => {
        const nextLength = isDeleting
          ? currentGraphemes.length - 1
          : currentGraphemes.length + 1;
        setDisplayText(graphemes.slice(0, nextLength).join(""));
      }, speed);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, wordIndex]);

  const isTamil = wordIndex === 1 && displayText.length > 0;

  return (
    <span className="inline-flex items-baseline">
      <span className={isTamil ? "text-slate-400 dark:text-slate-500 font-sans font-medium" : "instrument-serif"}>
        {displayText}
      </span>
      <span className="inline-block w-[2px] h-[0.75em] bg-[#FF00AE] dark:bg-[#FF00AE] ml-1 translate-y-[2px] animate-pulse" />
    </span>
  );
}

export function PortfolioView({
  initialViewMode = "home",
}: {
  initialViewMode?: "home" | "projects" | "about" | "blog";
}) {
  const [viewMode, setViewMode] = useState<"home" | "projects" | "about" | "blog">(initialViewMode);
  const [isEmailCopied, setIsEmailCopied] = useState(false);

  const handleCopyEmail = () => {
    if (soundOn) playClickSound();
    navigator.clipboard.writeText("pavendanpynthamil@gmail.com");
    setIsEmailCopied(true);
    setTimeout(() => setIsEmailCopied(false), 2000);
  };

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
            href="https://joinplue.com/"
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
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState<boolean>(false);
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
      } else if (path === "/projects") {
        setViewMode("projects");
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
      const timeString = now.toLocaleTimeString("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
      setCurrentTime(timeString);
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

  const handleNavClick = (mode: "home" | "projects" | "about" | "blog") => {
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

  const renderProjectCard = (project: Project) => {
    const originalIdx = portfolioData.projects.indexOf(project);
    const isInternal = project.link && project.link.startsWith("/");
    const isSemantic = project.description === "Semantic Email Copilot";
    const isCodedex = project.description === "CodeDex Mobile";
    const isOrca = project.description === "ORCA" || project.title === "ORCA";
    const isPlue = project.description === "Plue" || project.title.toLowerCase().includes("plue");
    const isTallCard = isSemantic || isCodedex;
    const aspectClass = isOrca ? "aspect-[1.15/1] sm:aspect-[1.35/1]" : isTallCard ? "aspect-[3.2/5] sm:aspect-[1/1.3]" : "aspect-[3.6/4] sm:aspect-[1.15/1]";
    const imageSizeClass = "h-[85%] sm:h-[85%]";
    const hoverScaleClass = "";

    return (
      <div
        key={originalIdx}
        data-cursor="case-study"
        className="group flex flex-col py-1.5 transition-opacity w-full"
        onClick={() => {
          if (isInternal && project.link) {
            playTone(880);
            window.location.href = project.link;
          } else if (!isInternal && project.link) {
            playTone(880);
            window.open(project.link, "_blank", "noopener,noreferrer");
          } else {
            setSelectedProject(project);
          }
        }}
      >
        {(project.banner || project.status === "Coming Soon") && (
          <div 
            className={`w-full mb-3 overflow-hidden rounded-[4px] sm:rounded-[6px] flex items-center justify-center relative transition-all duration-500 ease-out ${aspectClass}`}
            style={{ 
              backgroundColor: project.themeColor === "#0284C7" ? "#E0F2FE" : project.themeColor === "#6666FF" ? "#ECECFF" : project.themeColor === "#111111" ? "#F4F4F6" : `${project.themeColor || '#0284C7'}1A`,
              '--theme-color': project.themeColor || '#0284C7' 
            } as React.CSSProperties}
          >
            {isOrca ? (
              <OrcaCardCover />
            ) : project.banner?.match(/\.(json|lottie|gif)$/i) ? (
              project.banner.match(/\.(json|lottie)$/i) ? (
                <div className={`z-10 w-[125%] sm:w-[130%] flex items-center justify-center ${isOrca ? "animate-prompt-slide" : "translate-x-[10%] sm:translate-x-[14%]"} transition-transform duration-700 ease-out ${hoverScaleClass}`}>
                  <LottiePlayer src={project.banner} className="w-full h-auto drop-shadow-md" />
                </div>
              ) : (
                <img 
                  src={project.banner} 
                  alt={project.title} 
                  className={`z-10 w-[125%] sm:w-[130%] h-auto object-contain ${isOrca ? "animate-prompt-slide" : "translate-x-[10%] sm:translate-x-[14%]"} transition-transform duration-700 ease-out ${hoverScaleClass}`} 
                />
              )
            ) : project.description === "ORCA" || project.description === "Plue" ? (
              <div className={`z-10 w-[92%] sm:w-[88%] mt-14 sm:mt-10 overflow-hidden rounded-[4px] sm:rounded-[6px] bg-white/60 group-hover:bg-white/20 dark:bg-white/10 p-2.5 sm:p-3.5 backdrop-blur-md border border-white/80 group-hover:border-white/10 shadow-sm group-hover:shadow-none transition-all duration-700 ease-out ${hoverScaleClass}`}>
                <div className="w-full overflow-hidden rounded-[6px] sm:rounded-[8px] bg-white dark:bg-[#141415] flex items-center justify-center">
                  <img 
                    src={project.banner} 
                    alt={project.title} 
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            ) : project.banner?.match(/\.(mp4|webm|mov)$/i) ? (
              <video 
                src={project.banner} 
                loop 
                muted 
                playsInline 
                className={`transition-transform duration-700 ease-out ${hoverScaleClass} bg-transparent ${project.coverBg ? `w-auto ${imageSizeClass} object-contain drop-shadow-2xl` : 'w-full h-full object-cover'}`}
              />
            ) : project.description === "Quippy" || project.title.toLowerCase().includes("quippy") ? (
              <img 
                src={project.banner} 
                alt={project.title} 
                className="w-full h-full object-cover"
              />
            ) : project.banner ? (
              <img 
                src={project.banner} 
                alt={project.title} 
                className={`z-10 w-auto object-contain drop-shadow-lg transition-transform duration-700 ease-out ${isSemantic || isCodedex || project.description === "Archive" ? "h-[72%] sm:h-[75%] translate-y-[10%] sm:translate-y-[8%]" : "h-[65%] sm:h-[65%] translate-y-[4%] sm:translate-y-[6%]"}`}
              />
            ) : null}
            {project.category && (
              <div className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 z-30">
                <div className="flex items-center gap-1.5 px-3.5 py-1.5 sm:px-5 sm:py-2 rounded-md text-[13.5px] sm:text-[18px] font-sans font-medium tracking-wide whitespace-nowrap bg-white border border-black/10 text-slate-900 shadow-sm">
                  {project.category.toLowerCase()}
                </div>
              </div>
            )}
          </div>
        )}
        <div className="flex flex-col mt-2 px-1">
          <p className="text-[26px] sm:text-[30px] font-sans text-[#475569] dark:text-[#CBD5E1] leading-[1.3] transition-colors group-hover:text-[#0F172A] dark:group-hover:text-[#F2F2F2]">
            {project.title}
          </p>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="min-h-screen w-full flex flex-col justify-start items-center px-5 sm:px-8 md:px-12 pt-4 sm:pt-5 pb-6 sm:pb-8 selection:bg-neutral-200">
        {/* Soft atmospheric ambient glow */}
        <div className="ambient-glow" />

        {/* Main Container */}
        {/* Top Navbar Container */}
        <div className="sticky top-4 sm:top-5 z-50 w-[94%] sm:w-[86%] max-w-[680px] mx-auto mb-2 sm:mb-4 flex flex-col items-center">
          <header className="w-full bg-slate-100/90 dark:bg-[#1A1A1A]/90 backdrop-blur-lg rounded-md border-[3px] border-black/10 dark:border-white/15 px-5 sm:px-7 py-1.5 sm:py-2 flex items-center justify-between transition-colors">
            {/* Left: Logo & Name */}
            <button
              onClick={() => viewMode !== "home" && handleNavClick("home")}
              className={`flex items-center gap-2 sm:gap-2.5 focus:outline-none ${viewMode !== "home" ? "cursor-pointer hover:opacity-80 transition-opacity" : "cursor-default"}`}
              aria-label="Go to Home"
            >
              <img 
                src="/logo.png" 
                alt="logo"
                className="h-[34px] sm:h-[38px] object-contain -ml-1.5"
              />
              <span className="font-sans font-semibold text-[22px] sm:text-[25px] tracking-tight text-[#2C2C2C] dark:text-[#F2F2F2] select-none leading-none -translate-y-[1px]">
                pyndu_logs*
              </span>
            </button>

            {/* Right: Nav Links & Tools */}
            <div className="flex items-center justify-end gap-3 sm:gap-5 -mr-1 sm:-mr-2">
              <nav className="hidden sm:flex items-center space-x-1 sm:space-x-1.5 text-[17.5px] sm:text-[19px] font-medium">
                <button
                  onClick={() => handleNavClick("projects")}
                  className={`inline-flex items-center px-4 py-1.5 rounded-md transition-all cursor-pointer select-none ${
                    viewMode === "projects"
                      ? "bg-slate-200/80 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-medium"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-200/50 dark:hover:bg-slate-800/50"
                  }`}
                >
                  <span>Work</span>
                </button>
                <button
                  onClick={() => handleNavClick("about")}
                  className={`inline-flex items-center px-4 py-1.5 rounded-md transition-all cursor-pointer select-none ${
                    viewMode === "about"
                      ? "bg-slate-200/80 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-medium"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-200/50 dark:hover:bg-slate-800/50"
                  }`}
                >
                  <span>About</span>
                </button>
                <button
                  onClick={() => handleNavClick("blog")}
                  className={`inline-flex items-center px-4 py-1.5 rounded-md transition-all cursor-pointer select-none ${
                    viewMode === "blog"
                      ? "bg-slate-200/80 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-medium"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-200/50 dark:hover:bg-slate-800/50"
                  }`}
                >
                  <span>Blog</span>
                </button>
              </nav>

              {/* Mobile Menu Toggle */}
              <button 
                className="sm:hidden p-2 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </header>

          {/* Mobile Menu Dropdown */}
          {isMobileMenuOpen && (
            <>
              {/* Tap Outside Backdrop */}
              <div 
                className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px] sm:hidden"
                onClick={() => setIsMobileMenuOpen(false)}
              />
              {/* Dropdown Menu Box */}
              <div className="sm:hidden relative mt-2.5 w-full bg-slate-100/95 dark:bg-[#1A1A1A]/95 backdrop-blur-lg rounded-2xl shadow-xl border border-slate-200/50 dark:border-slate-800/50 p-4 flex flex-col gap-2 z-50 animate-in slide-in-from-top-2 fade-in duration-200">
                <button
                  onClick={() => { handleNavClick("home"); setIsMobileMenuOpen(false); }}
                  className={`flex items-center text-left px-4 py-3 rounded-xl font-medium text-[20px] transition-colors cursor-pointer ${viewMode === "home" ? "bg-slate-200 dark:bg-slate-800 text-[#FF00AE]" : "text-[#2C2C2C] dark:text-[#F2F2F2]"}`}
                >
                  Home
                </button>
                <button
                  onClick={() => { handleNavClick("projects"); setIsMobileMenuOpen(false); }}
                  className={`flex items-center text-left px-4 py-3 rounded-xl font-medium text-[20px] transition-colors cursor-pointer ${viewMode === "projects" ? "bg-slate-200 dark:bg-slate-800 text-[#FF00AE]" : "text-[#2C2C2C] dark:text-[#F2F2F2]"}`}
                >
                  Work
                </button>
                <button
                  onClick={() => { handleNavClick("about"); setIsMobileMenuOpen(false); }}
                  className={`flex items-center text-left px-4 py-3 rounded-xl font-medium text-[20px] transition-colors cursor-pointer ${viewMode === "about" ? "bg-slate-200 dark:bg-slate-800 text-[#FF00AE]" : "text-[#2C2C2C] dark:text-[#F2F2F2]"}`}
                >
                  About
                </button>
                <button
                  onClick={() => { handleNavClick("blog"); setIsMobileMenuOpen(false); }}
                  className={`flex items-center text-left px-4 py-3 rounded-xl font-medium text-[20px] transition-colors cursor-pointer ${viewMode === "blog" ? "bg-slate-200 dark:bg-slate-800 text-[#FF00AE]" : "text-[#2C2C2C] dark:text-[#F2F2F2]"}`}
                >
                  Blog
                </button>
              </div>
            </>
          )}
        </div>

        <main className="w-full relative z-10 flex flex-col max-w-[640px]">
          {/* Top Header Row */}


        {/* ========================================================
            VIEW 1: HOME VIEW
            ======================================================== */}
        {viewMode === "home" && (
          <div className="flex flex-col animate-in fade-in duration-200">
            <div className="w-[100vw] max-w-[100vw] relative left-1/2 -translate-x-1/2 px-5 sm:px-8 md:px-12 mt-6 sm:mt-10 md:mt-12">
              <div className="flex flex-col w-full max-w-[1240px] mx-auto">
                {/* Minimal Hero Introduction */}
                <div className="relative pt-2 sm:pt-4">
                  <h1 className="font-sans font-medium text-[26px] sm:text-[32px] md:text-[36px] text-[#2C2C2C] dark:text-[#F2F2F2] leading-[1.35] tracking-tight">
                    hey! i'm pynthamil pavendan{" "}
                    <span className="font-sans font-normal text-slate-400 dark:text-slate-500">
                      [பைந்தமிழ்]
                    </span>
                    ,<br />
                    i’m an engineer who designs and builds things just for the hell of it.
                  </h1>
                  
                  <p className="text-[25px] sm:text-[29px] md:text-[31px] text-slate-400 dark:text-slate-500 font-normal mt-3 sm:mt-4 mb-4 sm:mb-6 flex flex-wrap items-center gap-2 sm:gap-2.5">
                    <span>engineering intern @</span>
                    <a href="https://joinplue.com/" target="_blank" rel="noopener noreferrer" data-cursor="arrow" className="inline-flex items-center hover:opacity-75 transition-opacity">
                      <img 
                        src="/plue-full-logo-black-transparent.png" 
                        alt="plue" 
                        className="h-[30px] sm:h-[38px] md:h-[42px] object-contain dark:invert -translate-y-[1px]" 
                      />
                    </a>
                  </p>
                </div>
              </div>
            </div>


            
          
            {/* Work Section */}
            {portfolioData.projects.length > 0 && (
              <>
                <section className="w-[100vw] max-w-[100vw] relative left-1/2 -translate-x-1/2 px-5 sm:px-8 md:px-12 mt-6 sm:mt-10 mb-12 sm:mb-14">
                  <div className="max-w-[1240px] mx-auto font-mono text-[16.5px] sm:text-[18px] tracking-[0.02em]">
                    {/* Mobile View: Single Column in array order (ORCA -> Semantic -> Plue) */}
                    <div className="flex sm:hidden flex-col gap-6 w-full">
                      {portfolioData.projects.map(renderProjectCard)}
                    </div>

                    {/* Desktop View: Split 2 Columns */}
                    <div className="hidden sm:flex flex-row gap-6 w-full items-start">
                      <div className="flex flex-col gap-6 w-1/2">
                        {portfolioData.projects.filter((_, i) => i % 2 === 0).map(renderProjectCard)}
                      </div>
                      <div className="flex flex-col gap-6 w-1/2">
                        {portfolioData.projects.filter((_, i) => i % 2 !== 0).map(renderProjectCard)}
                      </div>
                    </div>
                  </div>
                </section>
              </>
            )}

          </div>
        )}

                {/* ========================================================
            VIEW: PROJECTS VIEW
            ======================================================== */}
        {viewMode === "projects" && (
          <div className="flex flex-col animate-in fade-in duration-200">
            {/* Work Section */}
            {portfolioData.projects.length > 0 && (
              <section className="w-[100vw] max-w-[100vw] relative left-1/2 -translate-x-1/2 px-5 sm:px-8 md:px-12 mb-12 sm:mb-14">
                <div className="max-w-[1240px] mx-auto font-mono text-[16.5px] sm:text-[18px] tracking-[0.02em]">
                  {/* Mobile View: Single Column in array order (ORCA -> Semantic -> Plue) */}
                  <div className="flex sm:hidden flex-col gap-6 w-full">
                    {portfolioData.projects.map(renderProjectCard)}
                  </div>

                  {/* Desktop View: Split 2 Columns */}
                  <div className="hidden sm:flex flex-row gap-6 w-full items-start">
                    <div className="flex flex-col gap-6 w-1/2">
                      {portfolioData.projects.filter((_, i) => i % 2 === 0).map(renderProjectCard)}
                    </div>
                    <div className="flex flex-col gap-6 w-1/2">
                      {portfolioData.projects.filter((_, i) => i % 2 !== 0).map(renderProjectCard)}
                    </div>
                  </div>
                </div>
              </section>
            )}
          </div>
        )}

{/* ========================================================
            VIEW 2: ABOUT VIEW
           ======================================================== */}
        {viewMode === "about" && (
          <>
          <div className="w-[100vw] max-w-[100vw] relative left-1/2 -translate-x-1/2 px-5 sm:px-8 md:px-12 flex flex-col animate-in fade-in duration-200 mt-10 sm:mt-16">
            <div className="flex flex-col w-full max-w-[640px] mx-auto items-start text-left">
              
              <Image 
                src="/photo-dump/img1.jpeg" 
                alt="Pynthamil" 
                width={640}
                height={427}
                priority
                className="w-full max-w-[500px] sm:max-w-[640px] aspect-[3/2] object-cover rounded-md mb-8 mx-auto self-center"
              />

              <h1 className="font-sans font-medium text-[32px] sm:text-[40px] text-[#2C2C2C] dark:text-[#F2F2F2] leading-[1.15] tracking-tight mb-6 w-full text-left">
                hey! i'm pynthamil{" "}
                <span className="font-sans font-normal text-slate-400 dark:text-slate-500 text-[0.85em]">
                  [பைந்தமிழ்]
                </span>{" "}
                pavendan
              </h1>
              
              <p className="text-[17.5px] sm:text-[19.5px] text-[#475569] dark:text-[#94A3B8] leading-[1.85] font-sans mb-12 w-full text-left">
                I'm a student developer, but mostly I'm just a very curious human who loves figuring out how things work. When I'm not at my keyboard, I'm probably listening to music, reading a good book, or trying not to take life too seriously.
              </p>

              <div className="w-full flex flex-col text-left">
                {/* Experience Section - first in About */}
            <section id="experience" className="w-full scroll-mt-24">
              <h2 className="font-sans font-semibold text-[26px] sm:text-[32px] tracking-tight text-[#2C2C2C] dark:text-[#F2F2F2] mb-2 leading-none">
                experience
              </h2>
              <p className="font-sans text-[13.5px] sm:text-[14.5px] text-[#475569] dark:text-[#94A3B8] mt-1 mb-5 flex items-center space-x-1.5">
                <span className="select-none">└</span>
                <span>where i've worked</span>
              </p>
              <ul className="flex flex-col font-sans text-[16.5px] sm:text-[18px] tracking-[0.02em]">
                {portfolioData.experiences.map((item) => (
                  <li
                    key={item.id}
                    className="group flex flex-col py-4 sm:py-5"
                  >
                    <div className="flex items-start justify-between w-full">
                      <div className="flex items-start flex-1 pr-4">
                        <div className="flex flex-col justify-center h-full">
                          <span className="font-sans font-medium underline decoration-wavy underline-offset-[5px] decoration-1 decoration-[#FF00AE]/30 dark:decoration-[#FF00AE]/30 text-[16px] sm:text-[17.5px] text-[#334155] dark:text-[#E2E8F0] tracking-[0.01em]">
                            {item.role.toLowerCase().replace(/\b\w/g, s => s.toUpperCase())} @ {item.company.toLowerCase().replace(/\b\w/g, s => s.toUpperCase())}
                          </span>
                        </div>
                      </div>
                      <div className="text-right text-[13.5px] sm:text-[14.5px] text-[#64748B] dark:text-[#8E95B8] capitalize font-normal tracking-[0.02em] whitespace-nowrap pt-0.5">
                        {item.period.toLowerCase()}
                      </div>
                    </div>
                    
                    {item.bullets && item.bullets.length > 0 && (
                      <ul className="mt-4 flex flex-col space-y-2.5 text-[15px] sm:text-[16.5px] text-[#475569] dark:text-[#CBD5E1] font-sans font-normal leading-relaxed">
                        {item.bullets.map((bullet, idx) => (
                          <li key={idx} className="flex items-start gap-2.5">
                            <span className="text-[#FF00AE] font-bold mt-0.5 shrink-0">+</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </section>

                <div id="fun-facts" className="border-t border-neutral-200/70 dark:border-neutral-400/20 pt-8 pb-10 mt-6 scroll-mt-24">
                  <div className="flex items-center justify-between py-1.5">
                    <div>
                      <h2 className="font-sans font-semibold text-[26px] sm:text-[32px] tracking-tight text-[#2C2C2C] dark:text-[#F2F2F2] leading-none mb-2">
                        fun facts & when i touch grass
                      </h2>
                      <p className="font-sans text-[14px] sm:text-[15px] text-[#475569] dark:text-[#94A3B8] mt-1 flex items-center space-x-1.5">
                        <span className="select-none">└</span>
                        <span>learning, exploring, and living</span>
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 space-y-3.5 text-[17px] sm:text-[19px] text-[#2C2C2C] dark:text-[#F2F2F2] leading-relaxed font-sans animate-in fade-in duration-150">
                    <div className="flex items-start space-x-2.5">
                      <span className="text-[#FF00AE] font-bold mt-0.5 shrink-0">+</span>
                      <span>music taste: a bit of everything &rarr; if it sounds good, I'm listening</span>
                    </div>
                    <div className="flex items-start space-x-2.5">
                      <span className="text-[#FF00AE] font-bold mt-0.5 shrink-0">+</span>
                      <span>I love reading books, watching movies, writing, and drawing</span>
                    </div>
                    <div className="flex items-start space-x-2.5">
                      <span className="text-[#FF00AE] font-bold mt-0.5 shrink-0">+</span>
                      <span>personality type: INTJ</span>
                    </div>
                    <div className="flex items-start space-x-2.5">
                      <span className="text-[#FF00AE] font-bold mt-0.5 shrink-0">+</span>
                      <span>I love chess and enjoy challenging myself just for the plot</span>
                    </div>
                    <div className="flex items-start space-x-2.5">
                      <span className="text-[#FF00AE] font-bold mt-0.5 shrink-0">+</span>
                      <span>I don't believe the saying "curiosity kills the cat" &mdash; haha</span>
                    </div>
                  </div>
                </div>

                                <div id="github-activity" className="border-t border-neutral-200/70 dark:border-neutral-400/20 pt-8 pb-10 scroll-mt-24">
                  <div className="flex items-center justify-between py-1.5">
                    <div>
                      <h2 className="font-sans font-semibold text-[26px] sm:text-[32px] tracking-tight text-[#2C2C2C] dark:text-[#F2F2F2] leading-none mb-2">
                        code activity
                      </h2>
                      <p className="font-sans text-[13.5px] sm:text-[14.5px] text-[#475569] dark:text-[#94A3B8] mt-1 flex items-center space-x-1.5">
                        <span className="select-none">└</span>
                        <span>what i've been building</span>
                      </p>
                    </div>
                  </div>
                  <div className="mt-8">
                    <GitHubActivity username="Pynthamil" />
                  </div>
                </div>

                <div id="behind-the-logo" className="border-t border-neutral-200/70 dark:border-neutral-400/20 pt-8 pb-10 scroll-mt-24">
                  <div className="flex items-center justify-between py-1.5">
                    <div>
                      <h2 className="font-sans font-semibold text-[26px] sm:text-[32px] tracking-tight text-[#2C2C2C] dark:text-[#F2F2F2] leading-none mb-2">
                        behind the logo
                      </h2>
                      <p className="font-sans text-[13.5px] sm:text-[14.5px] text-[#475569] dark:text-[#94A3B8] mt-1 flex items-center space-x-1.5">
                        <span className="select-none">↳</span>
                        <span>wildcard, generalist &amp; professional dot-connector</span>
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 space-y-3.5 text-[17px] sm:text-[19px] text-[#2C2C2C] dark:text-[#F2F2F2] leading-relaxed font-sans animate-in fade-in duration-150">
                    <div className="flex items-start space-x-2.5">
                      <span className="text-[#FF00AE] font-bold mt-0.5 shrink-0">+</span>
                      <span>
                        I don&apos;t fit into just one box &mdash; and I prefer it that way
                      </span>
                    </div>

                    <div className="flex items-start space-x-2.5">
                      <span className="text-[#FF00AE] font-bold mt-0.5 shrink-0">+</span>
                      <span>
                        Bouncing between design, code, weird ideas, and working products
                      </span>
                    </div>

                    <div className="flex items-start space-x-2.5">
                      <span className="text-[#FF00AE] font-bold mt-0.5 shrink-0">+</span>
                      <span>
                        Developer, designer, and unapologetic generalist
                      </span>
                    </div>

                    <div className="flex items-start space-x-2.5">
                      <span className="text-[#FF00AE] font-bold mt-0.5 shrink-0">+</span>
                      <span>
                        Connecting how something feels, how it works, and why it should exist
                      </span>
                    </div>

                    <div className="flex items-start space-x-2.5">
                      <span className="text-[#FF00AE] font-bold mt-0.5 shrink-0">+</span>
                      <span>
                        The person you call when there&apos;s a weird problem nobody knows how to solve
                      </span>
                    </div>
                  </div>
                </div>

                <div id="come-say-hi" className="border-t border-neutral-200/70 dark:border-neutral-400/20 pt-8 pb-10 scroll-mt-24">
              <div
                
                className="flex items-center justify-between py-1.5"
              >
                <div>
                  <h2 className="font-sans font-semibold text-[26px] sm:text-[32px] tracking-tight text-[#2C2C2C] dark:text-[#F2F2F2] leading-none mb-2">
                    come say hi
                  </h2>
                  <p className="font-sans text-[13.5px] sm:text-[14.5px] text-[#475569] dark:text-[#94A3B8] mt-1 flex items-center space-x-1.5">
                    <span className="select-none">└</span>
                    <span>the internet&apos;s version of knocking on my door</span>
                  </p>
                </div>
                
              </div>

              <div className="mt-4 space-y-3.5 text-[17px] sm:text-[19px] text-[#2C2C2C] dark:text-[#F2F2F2] leading-relaxed font-sans animate-in fade-in duration-150">
                  <div className="flex items-start space-x-2.5">
                    <span className="text-[#FF00AE] font-bold mt-0.5 shrink-0">+</span>
                    <span>
                      Always down to chat about code, design systems, crazy ideas, or good music
                    </span>
                  </div>
                  <div className="flex items-start space-x-2.5">
                    <span className="text-[#FF00AE] font-bold mt-0.5 shrink-0">+</span>
                    <span>
                      Drop a line at{" "}
                      <a
                        href={`mailto:${portfolioData.email}`}
                        className="text-[#FF00AE] underline underline-offset-4 decoration-wavy decoration-[#FF00AE] font-medium"
                      >
                        {portfolioData.email}
                      </a>
                    </span>
                  </div>
                  <div className="flex items-start space-x-2.5">
                    <span className="text-[#FF00AE] font-bold mt-0.5 shrink-0">+</span>
                    <span>
                      Find me on{" "}
                      <a
                        href="https://x.com/pynwrites"
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
                      , or{" "}
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
              </div>
            </div>
            </div>
            <div className="fixed left-4 sm:left-6 md:left-8 top-1/2 -translate-y-1/2 z-40 select-none hidden lg:block"><ProjectSidebar alwaysVisible={true}
              sections={[
                { id: "experience", label: "Experience" },
                { id: "fun-facts", label: "Fun Facts & Grass" },
                { id: "github-activity", label: "Code Activity" },
                { id: "behind-the-logo", label: "Behind The Logo" },
                { id: "come-say-hi", label: "Come Say Hi" }
              ]} 
              playTone={soundOn ? playClickSound : undefined}
            /></div>
          </>
        )}

{/* ========================================================
            VIEW 3: BLOG VIEW
           ======================================================== */}
        {viewMode === "blog" && (() => {
          const blogCategories = [
            "all",
            ...Array.from(
              new Set(
                portfolioData.writings
                  .map((p) => p.category)
                  .filter((cat): cat is string => Boolean(cat))
              )
            ),
          ];

          const filteredBlogPosts = portfolioData.writings.filter((post) => {
            const matchesSearch =
              post.title.toLowerCase().includes(blogSearchQuery.toLowerCase()) ||
              post.description.toLowerCase().includes(blogSearchQuery.toLowerCase()) ||
              (post.category && post.category.toLowerCase().includes(blogSearchQuery.toLowerCase()));

            const matchesFilter =
              blogFilter === "all" ||
              (post.category && post.category.toLowerCase() === blogFilter.toLowerCase());

            return matchesSearch && matchesFilter;
          });

          return (
            <div className="w-[100vw] max-w-[100vw] relative left-1/2 -translate-x-1/2 px-5 sm:px-8 md:px-12 flex flex-col animate-in fade-in duration-200">
              <div className="flex flex-col space-y-6 w-full max-w-[1240px] mx-auto">
                {/* Blog Search & Filter Pill Header */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 w-full mt-4 mb-2">
                  {/* Search Bar */}
                  <div className="relative w-full sm:w-[440px]">
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
                      className="w-full bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 text-[#2C2C2C] dark:text-[#F2F2F2] font-sans text-[14px] rounded-md py-2 pl-10 pr-4 focus:outline-none focus:border-[#00B5B2] dark:focus:border-[#00B5B2] transition-colors placeholder:text-[#94A3B8] dark:placeholder:text-[#64748B]"
                    />
                  </div>

                  {/* Filter Option - Button on Right Side */}
                  <div className="relative self-end sm:self-auto">
                    <button
                      onClick={() => {
                        playTone(880);
                        setIsFilterDropdownOpen(!isFilterDropdownOpen);
                      }}
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-md font-sans text-[13.5px] font-medium transition-all shadow-sm select-none border cursor-pointer ${
                        blogFilter !== "all"
                          ? "bg-[#00B5B2]/10 dark:bg-[#00B5B2]/20 border-[#00B5B2] text-[#00B5B2] dark:text-[#00B5B2]"
                          : "bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 text-[#2C2C2C] dark:text-[#F2F2F2] hover:border-[#00B5B2] dark:hover:border-[#00B5B2]"
                      }`}
                      aria-label="Filter posts by category"
                    >
                      <SlidersHorizontal className="w-3.5 h-3.5" />
                      <span className="capitalize">{blogFilter === "all" ? "Filter" : blogFilter}</span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isFilterDropdownOpen ? "rotate-180" : ""}`} />
                    </button>

                    {/* Filter Dropdown Menu */}
                    {isFilterDropdownOpen && (
                      <>
                        <div 
                          className="fixed inset-0 z-20" 
                          onClick={() => setIsFilterDropdownOpen(false)} 
                        />
                        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#1A1A1A] border border-neutral-200 dark:border-neutral-800 rounded-md shadow-xl p-1.5 z-30 animate-in fade-in zoom-in-95 duration-150">
                          <div className="px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider text-[#64748B] dark:text-[#94A3B8]">
                            Filter by Category
                          </div>
                          {blogCategories.map((cat) => {
                            const isSelected = blogFilter.toLowerCase() === cat.toLowerCase();
                            const count = cat === "all" 
                              ? portfolioData.writings.length 
                              : portfolioData.writings.filter(p => p.category?.toLowerCase() === cat.toLowerCase()).length;

                            return (
                              <button
                                key={cat}
                                onClick={() => {
                                  playTone(880);
                                  setBlogFilter(cat);
                                  setIsFilterDropdownOpen(false);
                                }}
                                className={`w-full flex items-center justify-between px-3 py-1.5 rounded text-[13.5px] font-sans transition-colors cursor-pointer ${
                                  isSelected
                                    ? "bg-[#00B5B2]/10 dark:bg-[#00B5B2]/20 text-[#00B5B2] font-semibold"
                                    : "text-[#2C2C2C] dark:text-[#F2F2F2] hover:bg-neutral-100 dark:hover:bg-neutral-800/60"
                                }`}
                              >
                                <span className="capitalize">{cat === "all" ? "All Posts" : cat}</span>
                                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-[#64748B] dark:text-[#94A3B8]">
                                  {count}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Active Filter Indicator Tag */}
                {blogFilter !== "all" && (
                  <div className="flex items-center gap-2 font-sans text-[13px] text-[#64748B] dark:text-[#94A3B8]">
                    <span>Category:</span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#00B5B2]/10 dark:bg-[#00B5B2]/20 text-[#00B5B2] font-medium capitalize text-[12.5px]">
                      {blogFilter}
                      <button
                        onClick={() => {
                          playTone(880);
                          setBlogFilter("all");
                        }}
                        className="hover:opacity-75 focus:outline-none cursor-pointer"
                        aria-label="Clear category filter"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  </div>
                )}

                {/* Blog Posts Cards */}
                <section className="w-full">
                  {filteredBlogPosts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 pt-2">
                      {filteredBlogPosts.map((post, idx) => (
                        <div key={idx} className="flex flex-col h-full">
                          <a
                            href={`/blog/${post.slug}`}
                            onClick={() => playTone(880)}
                            data-cursor="blog"
                            className="group select-none cursor-pointer flex flex-col h-full gap-3"
                          >
                            {post.image ? (
                              <div className="w-full aspect-[3/2] rounded-md overflow-hidden relative">
                                <img src={post.image} alt={post.title} className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105" />
                              </div>
                            ) : (
                              <div className="w-full aspect-[3/2] rounded-md overflow-hidden relative bg-neutral-100 dark:bg-neutral-800 transition-transform duration-300 group-hover:scale-105" />
                            )}
                            <div className="space-y-2 flex flex-col flex-1 px-1 sm:px-3 pt-1">
                              <h2 className="text-[18px] sm:text-[19.5px] font-semibold tracking-tight text-[#2C2C2C] dark:text-[#F2F2F2] transition-colors leading-snug">
                                {post.title}
                              </h2>
                              <div className="flex items-center gap-2 font-sans text-[12px] sm:text-[12.5px] uppercase tracking-wide text-[#64748B] dark:text-[#94A3B8]">
                                <span>{post.date}</span>
                              </div>
                            </div>
                          </a>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-16 text-center font-sans">
                      <p className="text-[16px] text-[#64748B] dark:text-[#94A3B8]">No posts found matching your criteria.</p>
                      <button
                        onClick={() => {
                          playTone(880);
                          setBlogSearchQuery("");
                          setBlogFilter("all");
                        }}
                        className="mt-3 text-sm text-[#00B5B2] hover:underline font-medium cursor-pointer"
                      >
                        Clear search & filters
                      </button>
                    </div>
                  )}
                </section>
              </div>
            </div>
          );
        })()}

        {/* Unified Footer */}
        <Footer />
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
    </>
  );
}

