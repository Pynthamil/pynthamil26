"use client";

import React, { useState, useEffect } from "react";
import { portfolioData, Project, Post } from "@/data/portfolio";
import { Modal } from "@/components/Modal";
import { ProjectSidebar } from "./ProjectSidebar";
import { Moon, Sun, Copy, Check, X, Clock } from "lucide-react";

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

  return (
    <>


      <div className="min-h-screen w-full flex flex-col justify-start items-center px-5 sm:px-8 md:px-12 pt-4 sm:pt-5 pb-24 selection:bg-neutral-200">
        {/* Soft atmospheric ambient glow */}
        <div className="ambient-glow" />

        {/* Main Container */}
        {/* Top Navbar */}
        <header className="sticky top-4 sm:top-5 z-50 w-[92%] sm:w-[85%] max-w-[640px] mx-auto mb-12 sm:mb-16 bg-slate-100/90 dark:bg-[#1A1A1A]/90 backdrop-blur-lg rounded-full px-5 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between transition-colors">
          
          {/* Left: Logo & Name */}
          <button
            onClick={() => viewMode !== "home" && handleNavClick("home")}
            className={`flex items-center gap-2 sm:gap-2.5 focus:outline-none ${viewMode !== "home" ? "cursor-pointer hover:opacity-80 transition-opacity" : "cursor-default"}`}
            aria-label="Go to Home"
          >
            <img 
              src="/logo1.1.svg" 
              alt="logo"
              className="h-[28px] sm:h-[30px] object-contain -ml-3"
            />
            <span className="font-sans font-bold text-[20px] sm:text-[22px] tracking-tight text-[#2C2C2C] dark:text-[#F2F2F2] select-none leading-none -translate-y-[1px]">
              pynthamil
            </span>
          </button>

          {/* Right: Nav Links & Tools */}
          <div className="flex items-center gap-4 sm:gap-6 -mr-1 sm:-mr-2">
            <nav className="flex items-center space-x-4 sm:space-x-6 text-[16px] sm:text-[18px] font-medium pt-0.5">
              <button
                onClick={() => handleNavClick("projects")}
                className={`transition-colors cursor-pointer select-none ${
                  viewMode === "projects"
                    ? "text-[#00B5B2] font-semibold underline underline-offset-4 decoration-wavy decoration-[#00B5B2]"
                    : "text-[#2C2C2C] dark:text-[#F2F2F2] hover:text-[#00B5B2] dark:hover:text-[#00B5B2]"
                }`}
              >
                Projects
              </button>
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

            <div className="flex items-center gap-3">



            </div>
          </div>
        </header>

        <main className="w-full relative z-10 flex flex-col max-w-[640px]">
          {/* Top Header Row */}


        {/* ========================================================
            VIEW 1: HOME VIEW
            ======================================================== */}
        {viewMode === "home" && (
          <div className="flex flex-col animate-in fade-in duration-200">
            <div className="w-[100vw] max-w-[100vw] relative left-1/2 -translate-x-1/2 px-5 sm:px-8 md:px-12">
              <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-10 md:gap-16 w-full max-w-[1100px] mx-auto">
              {/* Bio Copy & Status Section */}
              <section className="flex flex-col h-full justify-between mb-12 sm:mb-0 space-y-8 sm:space-y-0">
              <div>
              <h1 className="text-[24px] sm:text-[28px] text-[#2C2C2C] dark:text-[#F2F2F2] font-medium leading-[1.35] tracking-tight">
                hey! i'm {portfolioData.name.toLowerCase()} [pyndu], and i build things and figure out why people should care.
              </h1>
              
              <p className="text-[21px] sm:text-[24px] text-slate-400 dark:text-slate-500 font-normal mt-1 mb-4">
                upcoming engineering intern @{" "}
                <a href="https://joinplue.com/" target="_blank" rel="noopener noreferrer" className="font-medium text-black dark:text-white hover:opacity-75 transition-opacity">
                  plue
                </a>
              </p>

              </div>
              <p className="text-[20px] sm:text-[22px] text-[#2C2C2C] dark:text-[#F2F2F2] leading-relaxed pb-2 sm:pb-0">
                Find me on{" "}
                <a
                  href="https://x.com/pynwrites"
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
                  className="instrument-serif text-[24px] sm:text-[26px] text-black dark:text-white underline underline-offset-4 decoration-wavy decoration-[#00B5B2]/40 hover:decoration-[#00B5B2] font-normal transition-colors"
                >
                  download my CV &darr;
                </a>
              </p>

            </section>

            {/* Right Column: Experience */}
            <div className="w-full h-full flex flex-col justify-between space-y-8 sm:space-y-0">
            {/* Experience Section */}
            <section id="home-experience" className="w-full scroll-mt-24 pt-1">
              <ul className="flex flex-col font-sans text-[15px] sm:text-[16px]">
                {portfolioData.experiences.map((item) => {
                  const year = item.period.match(/\d{4}$/)?.[0] || item.period;
                  return (
                    <li
                      key={item.id}
                      className="grid grid-cols-[50px_1fr] sm:grid-cols-[60px_1fr_1.2fr] gap-x-4 py-2 sm:py-2.5 group"
                    >
                      <div className="text-slate-400 dark:text-slate-500 font-normal transition-colors">
                        {year}
                      </div>
                      <div className="text-slate-700 dark:text-slate-200 font-medium transition-colors">
                        {item.company.toLowerCase().replace(/\b\w/g, (s) => s.toUpperCase())}
                      </div>
                      <div className="text-slate-400 dark:text-slate-500 col-span-2 sm:col-span-1 mt-0.5 sm:mt-0 transition-colors">
                        {item.role.toLowerCase().replace(/\b\w/g, (s) => s.toUpperCase())}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
              {/* Dashed Email Box */}
              <div className="flex">
                <div
                  onClick={() => {
                    navigator.clipboard.writeText(portfolioData.email);
                    setCopiedEmail(true);
                    playTone(1046);
                    setTimeout(() => setCopiedEmail(false), 2000);
                  }}
                  className="inline-flex items-center space-x-3 px-4 sm:px-5 py-2 sm:py-2.5 rounded-[5px] sm:rounded-[8px] bg-slate-100 dark:bg-slate-800/80 cursor-pointer group select-none hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  title="Click to copy email"
                >
                  <span className="font-sans font-medium text-[16px] sm:text-[18px] text-slate-600 dark:text-slate-300 tracking-wide transition-colors">
                    {portfolioData.email}
                  </span>
                  <div className="text-slate-600 dark:text-slate-300 opacity-75 group-hover:opacity-100 flex items-center focus:outline-none transition-colors">
                    {copiedEmail ? (
                      <span className="text-emerald-500 dark:text-emerald-400 font-mono text-xs font-medium animate-in fade-in">
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

            </div>
            </div>
            </div>


            
          
            {/* Work Section */}
            {portfolioData.projects.length > 0 && (
              <>

                <section className="w-[100vw] max-w-[100vw] relative left-1/2 -translate-x-1/2 px-5 sm:px-8 md:px-12 mt-16 sm:mt-24 mb-12 sm:mb-14">
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-[1360px] mx-auto items-start font-mono text-[16.5px] sm:text-[18px] tracking-[0.02em]">
                  {portfolioData.projects.map((project: Project, idx: number) => {
                    const isInternal = project.link && project.link.startsWith("/");
                    const isSemantic = project.title === "Semantic Email Copilot";
                    const isOrca = project.title === "ORCA";
                    const aspectClass = isSemantic ? "aspect-[3/4] sm:aspect-[1/1.4]" : "aspect-[4/3] sm:aspect-[1.15/1]";
                    const imageSizeClass = "h-[85%] sm:h-[85%]";
                    const hoverScaleClass = isSemantic ? "" : "group-hover:scale-[1.03]";

                    return (
                      <li
                        key={idx}
                        className="group flex flex-col py-1.5 cursor-dot transition-opacity"
                        onClick={() => {
                          if (isInternal && project.link) {
                            playTone(880);
                            window.location.href = project.link;
                          } else {
                            setSelectedProject(project);
                          }
                        }}
                      >
                        {project.banner && (
                          <div 
                            className={`w-full mb-3 overflow-hidden rounded-[8px] sm:rounded-[12px] flex items-center justify-center relative ${aspectClass} transition-all duration-500 bg-[#D5F1FF] dark:bg-[#1A1A1A]`}
                          >
                            <div 
                              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                              style={{ backgroundColor: project.themeColor }}
                            />

                            
                            {project.title === "ORCA" ? (
                              <div className={`z-10 w-[92%] sm:w-[88%] overflow-hidden rounded-[8px] sm:rounded-[12px] bg-white/60 group-hover:bg-white/20 dark:bg-white/10 p-2.5 sm:p-3.5 backdrop-blur-md border border-white/80 group-hover:border-white/10 shadow-sm group-hover:shadow-none transition-all duration-700 ease-out ${hoverScaleClass}`}>
                                <div className="w-full overflow-hidden rounded-[6px] sm:rounded-[8px] bg-white dark:bg-[#141415] flex items-center justify-center">
                                  <img 
                                    src={project.banner} 
                                    alt={project.title} 
                                    className="w-full h-auto object-cover"
                                  />
                                </div>
                              </div>
                            ) : project.banner.match(/\.(mp4|webm|mov)$/i) ? (
                              <video 
                                src={project.banner} 
                                loop 
                                muted 
                                playsInline 
                                className={`transition-transform duration-700 ease-out ${hoverScaleClass} bg-transparent ${project.coverBg ? `w-auto ${imageSizeClass} object-contain drop-shadow-2xl` : 'w-full h-full object-cover'}`}
                              />
                            ) : (
                              <img 
                                src={project.banner} 
                                alt={project.title} 
                                className="z-10 w-auto h-[80%] sm:h-[80%] object-contain drop-shadow-lg transition-transform duration-700 ease-out translate-y-[4%] sm:translate-y-[6%]"
                              />
                            )}
                            {project.category && (
                              <div className="absolute top-5 right-5 flex items-center gap-1.5 px-5 py-2 rounded-[8px] text-[16px] sm:text-[18px] font-sans font-medium tracking-wide whitespace-nowrap bg-white/50 dark:bg-black/50 backdrop-blur-md border border-black/10 dark:border-white/10 text-slate-700 dark:text-white group-hover:bg-white/20 group-hover:border-white/50 group-hover:text-white transition-all shadow-sm z-10">
                                {project.category.toLowerCase()}
                              </div>
                            )}
                          </div>
                        )}
                        <div className="flex flex-col mt-2 px-1">
                          <p className="text-[22px] sm:text-[25px] font-sans text-[#475569] dark:text-[#CBD5E1] leading-[1.35] transition-colors group-hover:text-[#0F172A] dark:group-hover:text-[#F2F2F2]">
                            <span className="font-serif font-normal text-[26px] sm:text-[30px] text-black dark:text-white mr-1.5">{project.title},</span>
                            {project.description}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
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
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-[1360px] mx-auto items-start font-mono text-[16.5px] sm:text-[18px] tracking-[0.02em]">
                  {portfolioData.projects.map((project: Project, idx: number) => {
                    const isInternal = project.link && project.link.startsWith("/");
                    const isSemantic = project.title === "Semantic Email Copilot";
                    const isOrca = project.title === "ORCA";
                    const aspectClass = isSemantic ? "aspect-[3/4] sm:aspect-[1/1.4]" : "aspect-[4/3] sm:aspect-[1.15/1]";
                    const imageSizeClass = "h-[85%] sm:h-[85%]";
                    const hoverScaleClass = isSemantic ? "" : "group-hover:scale-[1.03]";

                    return (
                      <li
                        key={idx}
                        className="group flex flex-col py-1.5 cursor-dot transition-opacity"
                        onClick={() => {
                          if (isInternal && project.link) {
                            playTone(880);
                            window.location.href = project.link;
                          } else {
                            setSelectedProject(project);
                          }
                        }}
                      >
                        {project.banner && (
                          <div 
                            className={`w-full mb-3 overflow-hidden rounded-[8px] sm:rounded-[12px] flex items-center justify-center relative ${aspectClass} transition-all duration-500 bg-[#D5F1FF] dark:bg-[#1A1A1A]`}
                          >
                            <div 
                              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                              style={{ backgroundColor: project.themeColor }}
                            />

                            
                            {project.title === "ORCA" ? (
                              <div className={`z-10 w-[92%] sm:w-[88%] overflow-hidden rounded-[8px] sm:rounded-[12px] bg-white/60 group-hover:bg-white/20 dark:bg-white/10 p-2.5 sm:p-3.5 backdrop-blur-md border border-white/80 group-hover:border-white/10 shadow-sm group-hover:shadow-none transition-all duration-700 ease-out ${hoverScaleClass}`}>
                                <div className="w-full overflow-hidden rounded-[6px] sm:rounded-[8px] bg-white dark:bg-[#141415] flex items-center justify-center">
                                  <img 
                                    src={project.banner} 
                                    alt={project.title} 
                                    className="w-full h-auto object-cover"
                                  />
                                </div>
                              </div>
                            ) : project.banner.match(/\.(mp4|webm|mov)$/i) ? (
                              <video 
                                src={project.banner} 
                                loop 
                                muted 
                                playsInline 
                                className={`transition-transform duration-700 ease-out ${hoverScaleClass} bg-transparent ${project.coverBg ? `w-auto ${imageSizeClass} object-contain drop-shadow-2xl` : 'w-full h-full object-cover'}`}
                              />
                            ) : (
                              <img 
                                src={project.banner} 
                                alt={project.title} 
                                className="z-10 w-auto h-[80%] sm:h-[80%] object-contain drop-shadow-lg transition-transform duration-700 ease-out translate-y-[4%] sm:translate-y-[6%]"
                              />
                            )}
                            {project.category && (
                              <div className="absolute top-5 right-5 flex items-center gap-1.5 px-5 py-2 rounded-[8px] text-[16px] sm:text-[18px] font-sans font-medium tracking-wide whitespace-nowrap bg-white/50 dark:bg-black/50 backdrop-blur-md border border-black/10 dark:border-white/10 text-slate-700 dark:text-white group-hover:bg-white/20 group-hover:border-white/50 group-hover:text-white transition-all shadow-sm z-10">
                                {project.category.toLowerCase()}
                              </div>
                            )}
                          </div>
                        )}
                        <div className="flex flex-col mt-2 px-1">
                          <p className="text-[22px] sm:text-[25px] font-sans text-[#475569] dark:text-[#CBD5E1] leading-[1.35] transition-colors group-hover:text-[#0F172A] dark:group-hover:text-[#F2F2F2]">
                            <span className="font-serif font-normal text-[26px] sm:text-[30px] text-black dark:text-white mr-1.5">{project.title},</span>
                            {project.description}
                          </p>
                        </div>
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
          <div className="w-[100vw] max-w-[100vw] relative left-1/2 -translate-x-1/2 px-5 sm:px-8 md:px-12 flex flex-col animate-in fade-in duration-200">
            <div className="flex flex-col space-y-6 sm:space-y-7 w-full max-w-[1100px] mx-auto items-center">
              <div className="w-full max-w-[640px] flex flex-col space-y-6 sm:space-y-7">
            {/* Experience Section - first in About */}
            <section id="experience" className="w-full scroll-mt-24">
              <h2 className="instrument-serif text-[24px] sm:text-[26px] text-[#2C2C2C] dark:text-[#F2F2F2] mb-1">
                experience
              </h2>
              <p className="font-mono text-[13.5px] sm:text-[14.5px] text-[#475569] dark:text-[#94A3B8] mt-0.5 mb-5 flex items-center space-x-1.5">
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
                          <span className="instrument-serif italic underline decoration-wavy underline-offset-[5px] decoration-1 decoration-[#00B5B2]/30 dark:decoration-[#00B5B2]/30 font-normal text-[18px] sm:text-[19px] text-[#334155] dark:text-[#E2E8F0] tracking-[0.02em]">
                            {item.role.toLowerCase().replace(/\b\w/g, s => s.toUpperCase())} @ {item.company.toLowerCase().replace(/\b\w/g, s => s.toUpperCase())}
                          </span>
                        </div>
                      </div>
                      <div className="text-right text-[13.5px] sm:text-[14.5px] text-[#64748B] dark:text-[#8E95B8] capitalize font-normal tracking-[0.02em] whitespace-nowrap pt-0.5">
                        {item.period.toLowerCase()}
                      </div>
                    </div>
                    
                    {item.bullets && item.bullets.length > 0 && (
                      <ul className="mt-4 flex flex-col space-y-2.5 text-[16px] sm:text-[17.5px] text-[#475569] dark:text-[#CBD5E1] font-sans font-normal leading-relaxed">
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
                  <h2 className="instrument-serif text-[24px] sm:text-[28px] font-normal tracking-tight text-[#2C2C2C] dark:text-[#F2F2F2] leading-none mb-1">
                    meet the human
                  </h2>
                  <p className="font-mono text-[13.5px] sm:text-[14.5px] text-[#475569] dark:text-[#94A3B8] mt-0.5 flex items-center space-x-1.5">
                    <span className="select-none">└</span>
                    <span>because a portfolio needs a personality</span>
                  </p>
                </div>
                
              </div>

              <div className="mt-4 space-y-3.5 text-[17px] sm:text-[19px] text-[#2C2C2C] dark:text-[#F2F2F2] leading-relaxed font-sans animate-in fade-in duration-150">
                  <div className="flex items-start space-x-2.5">
                    <span className="text-[#00B5B2] font-bold mt-0.5 shrink-0">+</span>
                    <span>My name is <span className="text-[#2C2C2C] dark:text-[#F2F2F2] instrument-serif text-[20px] sm:text-[21px] underline decoration-wavy decoration-[#00B5B2] underline-offset-4 cursor-default">Pynthamil Pavendan</span>!</span>
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

                {/* Photo Dump Carousel */}
                <div className="w-full mt-6 pb-2 overflow-x-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                  <div className="flex gap-4 min-w-max px-1">
                    {[
                      "20250622_124021.jpg",
                      "IMG-20250615-WA0139.jpg",
                      "IMG-20250629-WA0260.jpg",
                      "IMG_2939.jpeg",
                      "IMG_4564.JPG"
                    ].map((photo, i) => (
                      <div key={i} className="flex-none bg-white dark:bg-white p-3.5 shadow-md border border-neutral-200 dark:border-neutral-300 rounded-sm w-[300px] h-[380px]">
                        <div className="w-full h-full bg-neutral-200 overflow-hidden">
                          <img
                            src={`/photo-dump/${photo}`}
                            alt={`Photodump ${i + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
            </div>

            {/* Come Say Hi Dropdown Accordion */}
            <div id="stack" className="border-b border-neutral-200/70 dark:border-neutral-400/20 pb-5 scroll-mt-24">
              <div className="flex items-center justify-between py-1.5">
                <div>
                  <h2 className="instrument-serif text-[24px] sm:text-[28px] font-normal tracking-tight text-[#2C2C2C] dark:text-[#F2F2F2] leading-none mb-1">
                    stack
                  </h2>
                  <p className="font-mono text-[13.5px] sm:text-[14.5px] text-[#475569] dark:text-[#94A3B8] mt-0.5 flex items-center space-x-1.5">
                    <span className="select-none">└</span>
                    <span>tools of the trade</span>
                  </p>
                </div>
              </div>

              <div className="mt-4 text-[17px] sm:text-[19px] text-[#2C2C2C] dark:text-[#F2F2F2] leading-relaxed font-sans">
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
                  <h2 id="currently-learning" className="instrument-serif text-[24px] sm:text-[28px] font-normal tracking-tight text-[#2C2C2C] dark:text-[#F2F2F2] leading-none mb-1 scroll-mt-24">
                    what i am currently learning
                  </h2>
                  <p className="font-mono text-[13.5px] sm:text-[14.5px] text-[#475569] dark:text-[#94A3B8] mt-0.5 flex items-center space-x-1.5">
                    <span className="select-none">└</span>
                    <span>learning, unlearning, relearning</span>
                  </p>
                </div>
                
              </div>

              <div className="mt-4 space-y-3.5 text-[17px] sm:text-[19px] text-[#2C2C2C] dark:text-[#F2F2F2] leading-relaxed font-sans animate-in fade-in duration-150">
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
                  <h2 id="fun-facts" className="instrument-serif text-[24px] sm:text-[28px] font-normal tracking-tight text-[#2C2C2C] dark:text-[#F2F2F2] leading-none mb-1 scroll-mt-24">
                    fun facts about me
                  </h2>
                  <p className="font-mono text-[13.5px] sm:text-[14.5px] text-[#475569] dark:text-[#94A3B8] mt-0.5 flex items-center space-x-1.5">
                    <span className="select-none">└</span>
                    <span>the lore drops</span>
                  </p>
                </div>
                
              </div>

              <div className="mt-4 space-y-3.5 text-[17px] sm:text-[19px] text-[#2C2C2C] dark:text-[#F2F2F2] leading-relaxed font-sans animate-in fade-in duration-150">
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
                  <h2 id="touching-grass" className="instrument-serif text-[24px] sm:text-[28px] font-normal tracking-tight text-[#2C2C2C] dark:text-[#F2F2F2] leading-none mb-1 scroll-mt-24">
                    when i touch grass
                  </h2>
                  <p className="font-mono text-[13.5px] sm:text-[14.5px] text-[#475569] dark:text-[#94A3B8] mt-0.5 flex items-center space-x-1.5">
                    <span className="select-none">└</span>
                    <span>rare but documented</span>
                  </p>
                </div>
                
              </div>

              <div className="mt-4 space-y-3.5 text-[17px] sm:text-[19px] text-[#2C2C2C] dark:text-[#F2F2F2] leading-relaxed font-sans animate-in fade-in duration-150">
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
                  <h2 className="instrument-serif text-[24px] sm:text-[28px] font-normal tracking-tight text-[#2C2C2C] dark:text-[#F2F2F2] leading-none mb-1">
                    about my blog
                  </h2>
                  <p className="font-mono text-[13.5px] sm:text-[14.5px] text-[#475569] dark:text-[#94A3B8] mt-0.5 flex items-center space-x-1.5">
                    <span className="select-none">└</span>
                    <span>my brain leaving sticky notes for itself</span>
                  </p>
                </div>
                
              </div>

              <div className="mt-4 space-y-3.5 text-[17px] sm:text-[19px] text-[#2C2C2C] dark:text-[#F2F2F2] leading-relaxed font-sans animate-in fade-in duration-150">
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
                  <h2 className="instrument-serif text-[24px] sm:text-[28px] font-normal tracking-tight text-[#2C2C2C] dark:text-[#F2F2F2] leading-none mb-1">
                    come say hi
                  </h2>
                  <p className="font-mono text-[13.5px] sm:text-[14.5px] text-[#475569] dark:text-[#94A3B8] mt-0.5 flex items-center space-x-1.5">
                    <span className="select-none">└</span>
                    <span>the internet&apos;s version of knocking on my door</span>
                  </p>
                </div>
                
              </div>

              <div className="mt-4 space-y-3.5 text-[17px] sm:text-[19px] text-[#2C2C2C] dark:text-[#F2F2F2] leading-relaxed font-sans animate-in fade-in duration-150">
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
          <div className="w-[100vw] max-w-[100vw] relative left-1/2 -translate-x-1/2 px-5 sm:px-8 md:px-12 flex flex-col animate-in fade-in duration-200">
            <div className="flex flex-col space-y-7 w-full max-w-[1100px] mx-auto">
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
                  className="w-full bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 text-[#2C2C2C] dark:text-[#F2F2F2] font-sans text-[14px] rounded-md py-2 pl-10 pr-4 focus:outline-none focus:border-[#00B5B2] dark:focus:border-[#00B5B2] transition-colors placeholder:text-[#94A3B8] dark:placeholder:text-[#64748B]"
                />
              </div>
            </div>

            {/* Blog Posts Clean Architecture */}
            <section className="w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12 pt-6">
                {portfolioData.writings.filter(post => post.title.toLowerCase().includes(blogSearchQuery.toLowerCase())).map((post, idx) => (
                  <div key={idx} className="flex flex-col h-full">
                    <a
                      href={`/blog/${post.slug}`}
                      onClick={() => playTone(880)}
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
                        <div className="flex items-center gap-2.5 font-mono text-[12px] sm:text-[12.5px] uppercase tracking-wide text-[#64748B] dark:text-[#94A3B8]">
                          <span>{post.date}</span>
                          <span className="w-1 h-1 rounded-full bg-[#CBD5E1] dark:bg-[#475569]"></span>
                          <span>{post.readingTime} read</span>
                        </div>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </section>
            </div>
          </div>
        )}


        {/* Unified Footer for all views */}
        <footer className="w-[100vw] relative left-1/2 -translate-x-1/2 pt-16 mt-auto flex flex-col items-center gap-5 font-sans text-[15px] sm:text-[16px] text-[#64748B] dark:text-[#8E95B8] px-5 sm:px-8 md:px-12">
          <div className="w-full max-w-[1100px] flex flex-col items-start gap-5">
            <button 
               onClick={handleCopyEmail}
               className="flex items-center justify-center space-x-2.5 px-4 sm:px-5 py-2 sm:py-2.5 bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 text-[16px] sm:text-[18px] font-medium rounded-[6px] sm:rounded-[8px] hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors focus:outline-none"
            >
               <span>{isEmailCopied ? "copied!" : "pavendanpynthamil@gmail.com"}</span>
               {isEmailCopied ? <Check className="w-4 h-4 sm:w-[18px] sm:h-[18px]" /> : <Copy className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />}
            </button>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-2 sm:gap-0">
               <div>coding is an art and im an artist</div>
               <div>made w love &copy; 2026</div>
            </div>
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
    </>
  );
}

