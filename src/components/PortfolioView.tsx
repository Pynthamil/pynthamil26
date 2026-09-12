"use client";

import React, { useState, useEffect } from "react";
import { portfolioData, Project, Post } from "@/data/portfolio";
import { Modal } from "@/components/Modal";
import { Moon, Sun } from "lucide-react";

export function PortfolioView({
  initialViewMode = "home",
}: {
  initialViewMode?: "home" | "about" | "blog";
}) {
  const [viewMode, setViewMode] = useState<"home" | "about" | "blog">(initialViewMode);
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
    <div className="min-h-screen w-full flex flex-col justify-start items-center px-5 sm:px-8 md:px-12 pt-6 sm:pt-8 pb-24 selection:bg-neutral-200">
      {/* Soft atmospheric ambient glow */}
      <div className="ambient-glow" />

      {/* Main Container */}
      <main className="w-full relative z-10 flex flex-col max-w-[540px]">
        {/* Top Header Row */}
        <header className={`flex flex-col w-full ${viewMode === "home" ? "mb-6 sm:mb-6" : "mb-8 sm:mb-10"}`}>
          {/* Clawd GIF (Constant across views) */}
          <div className="-mb-1.5 sm:-mb-2 -ml-2 sm:-ml-3">
            <img
              src="/clawd.gif"
              alt="Clawd"
              className="w-20 h-20 sm:w-24 sm:h-24 object-contain select-none"
            />
          </div>

          <div className="flex flex-col items-start w-full gap-y-2.5 sm:gap-y-3">
            {/* Left Title: Always the pink name, acts as Home link if not on Home */}
            <div className="flex items-center shrink-0">
              <button
                onClick={() => viewMode !== "home" && handleNavClick("home")}
                className={`text-[25px] sm:text-[28px] font-medium tracking-tight text-[#FF42FF] dark:text-[#FF94FF] select-none text-left focus:outline-none ${viewMode !== "home" ? "cursor-pointer hover:opacity-80 transition-opacity" : "cursor-default"}`}
              >
                {portfolioData.name.toLowerCase()}
              </button>
            </div>

            {/* Right / Under on Mobile: Navigation Links & Dark Mode Toggle */}
            <nav className="flex items-center space-x-4 sm:space-x-5 text-[15.5px] sm:text-[16.5px] font-medium sm:pt-1">
              <button
                onClick={() => handleNavClick("about")}
                className={`transition-colors cursor-pointer select-none ${
                  viewMode === "about"
                    ? "text-[#FF42FF] dark:text-[#FF94FF] font-semibold underline underline-offset-4 decoration-wavy decoration-[#FF42FF] dark:decoration-[#FF94FF]"
                    : "text-[#232564] dark:text-[#F5F5FF] hover:text-[#FF42FF] dark:hover:text-[#FF94FF]"
                }`}
              >
                About
              </button>
              <button
                onClick={() => handleNavClick("blog")}
                className={`transition-colors cursor-pointer select-none ${
                  viewMode === "blog"
                    ? "text-[#6666FF] dark:text-[#9999FF] font-semibold underline underline-offset-4 decoration-wavy decoration-[#6666FF] dark:decoration-[#9999FF]"
                    : "text-[#232564] dark:text-[#F5F5FF] hover:text-[#6666FF] dark:hover:text-[#9999FF]"
                }`}
              >
                Blog
              </button>

              {/* Dark Mode Toggle Button */}
              <button
                onClick={toggleTheme}
                aria-label="Toggle dark mode"
                className="p-1 text-[#232564] dark:text-[#F5F5FF] hover:text-[#FF42FF] dark:hover:text-[#FF94FF] transition-colors focus:outline-none cursor-pointer flex items-center justify-center"
              >
                {isDarkMode ? (
                  <Sun className="w-4 h-4 transition-transform duration-200 hover:rotate-45" strokeWidth={2} />
                ) : (
                  <Moon className="w-4 h-4 transition-transform duration-200 hover:-rotate-12" strokeWidth={2} />
                )}
              </button>
            </nav>
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

              <div className="flex items-center space-x-2.5 text-[16px] sm:text-[17px] text-[#232564] dark:text-[#F5F5FF] pt-1 pb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse shrink-0" />
                <span>
                  Currently: making{" "}
                  <a
                    href="https://getplue.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#232564] dark:text-[#F5F5FF] underline underline-offset-4 decoration-wavy decoration-[#232564]/40 dark:decoration-[#F5F5FF]/40 hover:decoration-[#232564] dark:hover:decoration-[#F5F5FF] font-medium transition-colors"
                  >
                    plue
                  </a>{" "}
                  THE student haven
                </span>
              </div>

              <p className="text-[16px] sm:text-[17px] text-[#232564] dark:text-[#F5F5FF] leading-relaxed">
                Find me on{" "}
                <a
                  href="https://x.com/pyndu15"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#232564] dark:text-[#F5F5FF] underline underline-offset-4 decoration-[#232564]/30 dark:decoration-[#F5F5FF]/40 hover:decoration-[#232564] dark:hover:decoration-[#F5F5FF] transition-colors"
                >
                  X
                </a>
                ,{" "}
                <a
                  href="https://github.com/Pynthamil"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#232564] dark:text-[#F5F5FF] underline underline-offset-4 decoration-[#232564]/30 dark:decoration-[#F5F5FF]/40 hover:decoration-[#232564] dark:hover:decoration-[#F5F5FF] transition-colors"
                >
                  GitHub
                </a>
                ,{" "}
                <a
                  href="https://linkedin.com/in/pynthamil-pavendan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#232564] dark:text-[#F5F5FF] underline underline-offset-4 decoration-[#232564]/30 dark:decoration-[#F5F5FF]/40 hover:decoration-[#232564] dark:hover:decoration-[#F5F5FF] transition-colors"
                >
                  LinkedIn
                </a>
                , or{" "}
                <a
                  href={portfolioData.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playTone(880)}
                  className="text-[#6666FF] dark:text-[#9999FF] underline underline-offset-4 decoration-wavy decoration-[#6666FF] dark:decoration-[#9999FF] font-medium transition-colors"
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
                  className="inline-flex items-center space-x-2.5 px-3.5 py-2 border border-dashed border-[#11408F] dark:border-[#AEF0FF] rounded-none bg-transparent cursor-pointer group select-none"
                  title="Click to copy email"
                >
                  <span className="font-mono text-[14.5px] sm:text-[15.5px] text-[#11408F] dark:text-[#AEF0FF] group-hover:text-[#232564] dark:group-hover:text-[#F5F5FF] tracking-wide transition-colors">
                    {portfolioData.email}
                  </span>
                  <div className="text-[#11408F] dark:text-[#AEF0FF] group-hover:text-[#232564] dark:group-hover:text-[#F5F5FF] flex items-center focus:outline-none transition-colors">
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

            {/* Projects Section */}
            {portfolioData.projects.length > 0 && (
              <section className="w-full mb-12 sm:mb-14">
                <h2 className="font-mono text-[14px] sm:text-[15px] uppercase tracking-[0.08em] text-[#11408F] dark:text-[#AEF0FF] mb-3.5 font-semibold">
                  Projects
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
                            <span className="font-semibold text-[#0F172A] dark:text-[#F5F5FF] tracking-[0.02em] group-hover:text-[#6666FF] dark:group-hover:text-[#9999FF] transition-colors">
                              [{project.title}]
                            </span>
                          </div>

                          <div className="text-right text-[13.5px] sm:text-[14.5px] font-normal tracking-[0.02em] whitespace-nowrap">
                            {project.hoverText ? (
                              <>
                                <span className="group-hover:hidden uppercase transition-opacity">
                                  <span className="text-[#FF42FF] dark:text-[#FF94FF] font-medium">{project.tags?.[0] || "SYSTEM"}</span>
                                  <span className="text-neutral-400 dark:text-[#9999FF]/40">, </span>
                                  <span className="text-[#64748B] dark:text-[#8E95B8]">{project.year}</span>
                                </span>
                                <span className="hidden group-hover:inline-block text-[#FF42FF] dark:text-[#FF94FF] font-medium lowercase tracking-normal transition-all animate-in fade-in duration-150">
                                  {project.hoverText}
                                </span>
                              </>
                            ) : (
                              <span className="uppercase">
                                <span className="text-[#FF42FF] dark:text-[#FF94FF] font-medium">{project.tags?.[0] || "SYSTEM"}</span>
                                <span className="text-neutral-400 dark:text-[#9999FF]/40">, </span>
                                <span className="text-[#64748B] dark:text-[#8E95B8]">{project.year}</span>
                              </span>
                            )}
                          </div>
                        </div>

                        {project.description && (
                          <p className="text-[17px] sm:text-[18px] font-sans text-justify text-[#475569] dark:text-[#CBD5E1] mt-1.5 leading-relaxed">
                            {project.description}
                          </p>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </section>
            )}


            {/* Experience List Section */}
            <section className="w-full mb-12 sm:mb-14">
              <h2 className="font-mono text-[14px] sm:text-[15px] uppercase tracking-[0.08em] text-[#11408F] dark:text-[#AEF0FF] mb-3.5 font-semibold">
                Experience
              </h2>
              <ul className="flex flex-col space-y-4.5 sm:space-y-5 font-mono text-[15.5px] sm:text-[16.5px] tracking-[0.02em]">
                {portfolioData.experiences.map((item) => (
                  <li
                    key={item.id}
                    className="group flex flex-col py-1 transition-opacity hover:opacity-90"
                  >
                    <div className="flex items-start justify-between w-full">
                      <a
                        href={item.url || "#"}
                        target={item.url && item.url !== "#" ? "_blank" : undefined}
                        rel={item.url && item.url !== "#" ? "noopener noreferrer" : undefined}
                        className="flex items-start flex-1 pr-4 focus:outline-none"
                      >
                        <div className="flex flex-col">
                          <span className="font-semibold text-[#0F172A] dark:text-[#F5F5FF] tracking-[0.02em] group-hover:text-[#6666FF] dark:group-hover:text-[#9999FF] transition-colors">
                            {item.role}
                          </span>
                          <span className="text-[13.5px] sm:text-[14.5px] text-[#FF42FF] dark:text-[#FF94FF] font-medium tracking-[0.02em] mt-0.5 flex items-center space-x-1.5">
                            <span className="font-mono text-[#64748B] dark:text-[#8E95B8] select-none">└</span>
                            <span>{item.company}</span>
                          </span>
                        </div>
                      </a>

                      <div className="text-right text-[13.5px] sm:text-[14.5px] text-[#64748B] dark:text-[#8E95B8] uppercase font-normal tracking-[0.02em] whitespace-nowrap pt-0.5">
                        {item.period}
                      </div>
                    </div>
                    {item.bullets && item.bullets.length > 0 && (
                      <ul className="mt-2.5 flex flex-col space-y-2 text-[15px] sm:text-[16px] text-[#475569] dark:text-[#CBD5E1] font-sans font-normal leading-relaxed">
                        {item.bullets.map((bullet, idx) => (
                          <li key={idx} className="flex items-start">
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </section>

            {/* Home Footer */}
            <footer className="pt-10 border-t border-neutral-200/70 dark:border-[#9999FF]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 font-mono text-[14px] sm:text-[14.5px] text-[#64748B] dark:text-[#8E95B8]">
              <div>coding is an art and im an artist</div>
              <div>made w love &bull; &copy; 2026</div>
            </footer>
          </div>
        )}

        {/* ========================================================
            VIEW 2: ABOUT VIEW
           ======================================================== */}
        {viewMode === "about" && (
          <div className="flex flex-col space-y-6 sm:space-y-7 animate-in fade-in duration-200">
            {/* Meet The Human Dropdown Accordion */}
            <div className="border-b border-neutral-200/70 dark:border-[#9999FF]/20 pb-5">
              <div
                onClick={() => {
                  playTone(880);
                  setIsMeetHumanOpen(!isMeetHumanOpen);
                }}
                className="flex items-center justify-between cursor-pointer group py-1.5 select-none"
              >
                <div>
                  <h2 className="text-[19px] sm:text-[20.5px] font-medium text-[#232564] dark:text-[#F5F5FF] group-hover:text-[#FF42FF] dark:group-hover:text-[#FF94FF] transition-colors">
                    meet the human
                  </h2>
                  <p className="font-mono text-[13.5px] sm:text-[14.5px] text-[#11408F] dark:text-[#AEF0FF] mt-0.5">
                    because a portfolio needs a personality
                  </p>
                </div>
                <div>
                  <span className="font-mono text-xl font-semibold text-[#11408F] dark:text-[#AEF0FF] group-hover:text-[#FF42FF] dark:group-hover:text-[#FF94FF] transition-colors select-none leading-none">
                    {isMeetHumanOpen ? "−" : "+"}
                  </span>
                </div>
              </div>

              {isMeetHumanOpen && (
                <div className="mt-4 space-y-3.5 text-[16px] sm:text-[17px] text-[#232564] dark:text-[#F5F5FF] leading-relaxed font-sans animate-in fade-in duration-150">
                  <div className="flex items-start space-x-2.5">
                    <span className="font-mono text-[#11408F] dark:text-[#AEF0FF] select-none pt-0.5">+</span>
                    <span>My name is <span className="text-[#FF42FF] dark:text-[#FF94FF] font-medium">Pynthamil Pavendan</span>!</span>
                  </div>
                  <div className="flex items-start space-x-2.5">
                    <span className="font-mono text-[#11408F] dark:text-[#AEF0FF] select-none pt-0.5">+</span>
                    <span>
                      I&apos;m a student developer who enjoys turning ideas into things people can actually use
                    </span>
                  </div>
                  <div className="flex items-start space-x-2.5">
                    <span className="font-mono text-[#11408F] dark:text-[#AEF0FF] select-none pt-0.5">+</span>
                    <span>I like building interfaces that feel simple, fast, and intentional</span>
                  </div>
                  <div className="flex items-start space-x-2.5">
                    <span className="font-mono text-[#11408F] dark:text-[#AEF0FF] select-none pt-0.5">+</span>
                    <span>
                      I spend most of my time working with modern web technologies, experimenting with interaction design, and refining the small details that make products feel polished
                    </span>
                  </div>
                  <div className="flex items-start space-x-2.5">
                    <span className="font-mono text-[#11408F] dark:text-[#AEF0FF] select-none pt-0.5">+</span>
                    <span>
                      I&apos;m especially interested in how design and engineering come together to create experiences that feel effortless
                    </span>
                  </div>
                  <div className="flex items-start space-x-2.5">
                    <span className="font-mono text-[#11408F] dark:text-[#AEF0FF] select-none pt-0.5">+</span>
                    <span>
                      Currently focused on building projects that are useful, visually clean, and quietly memorable
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Come Say Hi Dropdown Accordion */}
            <div className="border-b border-neutral-200/70 dark:border-[#9999FF]/20 pb-5">
              <div
                onClick={() => {
                  playTone(880);
                  setIsComeSayHiOpen(!isComeSayHiOpen);
                }}
                className="flex items-center justify-between cursor-pointer group py-1.5 select-none"
              >
                <div>
                  <h2 className="text-[19px] sm:text-[20.5px] font-medium text-[#232564] dark:text-[#F5F5FF] group-hover:text-[#FF42FF] dark:group-hover:text-[#FF94FF] transition-colors">
                    come say hi
                  </h2>
                  <p className="font-mono text-[13.5px] sm:text-[14.5px] text-[#11408F] dark:text-[#AEF0FF] mt-0.5">
                    the internet&apos;s version of knocking on my door
                  </p>
                </div>
                <div>
                  <span className="font-mono text-xl font-semibold text-[#11408F] dark:text-[#AEF0FF] group-hover:text-[#FF42FF] dark:group-hover:text-[#FF94FF] transition-colors select-none leading-none">
                    {isComeSayHiOpen ? "−" : "+"}
                  </span>
                </div>
              </div>

              {isComeSayHiOpen && (
                <div className="mt-4 space-y-3.5 text-[16px] sm:text-[17px] text-[#232564] dark:text-[#F5F5FF] leading-relaxed font-sans animate-in fade-in duration-150">
                  <div className="flex items-start space-x-2.5">
                    <span className="font-mono text-[#11408F] dark:text-[#AEF0FF] select-none pt-0.5">+</span>
                    <span>
                      Always down to chat about code, design systems, crazy ideas, or good music
                    </span>
                  </div>
                  <div className="flex items-start space-x-2.5">
                    <span className="font-mono text-[#11408F] dark:text-[#AEF0FF] select-none pt-0.5">+</span>
                    <span>
                      Drop a line at{" "}
                      <a
                        href={`mailto:${portfolioData.email}`}
                        className="text-[#6666FF] dark:text-[#9999FF] underline underline-offset-4 decoration-wavy decoration-[#6666FF] dark:decoration-[#9999FF] font-medium"
                      >
                        {portfolioData.email}
                      </a>
                    </span>
                  </div>
                  <div className="flex items-start space-x-2.5">
                    <span className="font-mono text-[#11408F] dark:text-[#AEF0FF] select-none pt-0.5">+</span>
                    <span>
                      Find me on{" "}
                      <a
                        href="https://x.com/pyndu15"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#232564] dark:text-[#F5F5FF] underline underline-offset-4 decoration-[#232564]/30 dark:decoration-[#F5F5FF]/40 hover:decoration-[#232564] dark:hover:decoration-[#F5F5FF] font-medium"
                      >
                        X
                      </a>
                      ,{" "}
                      <a
                        href="https://github.com/Pynthamil"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#232564] dark:text-[#F5F5FF] underline underline-offset-4 decoration-[#232564]/30 dark:decoration-[#F5F5FF]/40 hover:decoration-[#232564] dark:hover:decoration-[#F5F5FF] font-medium"
                      >
                        GitHub
                      </a>
                      ,{" "}
                      <a
                        href="https://leetcode.com/u/HashKnight/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#232564] dark:text-[#F5F5FF] underline underline-offset-4 decoration-[#232564]/30 dark:decoration-[#F5F5FF]/40 hover:decoration-[#232564] dark:hover:decoration-[#F5F5FF] font-medium"
                      >
                        LeetCode
                      </a>
                      , and{" "}
                      <a
                        href="https://linkedin.com/in/pynthamil-pavendan"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#232564] dark:text-[#F5F5FF] underline underline-offset-4 decoration-[#232564]/30 dark:decoration-[#F5F5FF]/40 hover:decoration-[#232564] dark:hover:decoration-[#F5F5FF] font-medium"
                      >
                        LinkedIn
                      </a>
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Fun Facts About Me Dropdown Accordion */}
            <div className="border-b border-neutral-200/70 dark:border-[#9999FF]/20 pb-5">
              <div
                onClick={() => {
                  playTone(880);
                  setIsFunFactsOpen(!isFunFactsOpen);
                }}
                className="flex items-center justify-between cursor-pointer group py-1.5 select-none"
              >
                <div>
                  <h2 className="text-[19px] sm:text-[20.5px] font-medium text-[#232564] dark:text-[#F5F5FF] group-hover:text-[#FF42FF] dark:group-hover:text-[#FF94FF] transition-colors">
                    fun facts about me
                  </h2>
                  <p className="font-mono text-[13.5px] sm:text-[14.5px] text-[#11408F] dark:text-[#AEF0FF] mt-0.5">
                    the lore drops
                  </p>
                </div>
                <div>
                  <span className="font-mono text-xl font-semibold text-[#11408F] dark:text-[#AEF0FF] group-hover:text-[#FF42FF] dark:group-hover:text-[#FF94FF] transition-colors select-none leading-none">
                    {isFunFactsOpen ? "−" : "+"}
                  </span>
                </div>
              </div>

              {isFunFactsOpen && (
                <div className="mt-4 space-y-3.5 text-[16px] sm:text-[17px] text-[#232564] dark:text-[#F5F5FF] leading-relaxed font-sans animate-in fade-in duration-150">
                  <div className="flex items-start space-x-2.5">
                    <span className="font-mono text-[#11408F] dark:text-[#AEF0FF] select-none pt-0.5">+</span>
                    <span>
                      music taste: a bit of everything &rarr; if it sounds good, I&apos;m listening
                    </span>
                  </div>
                  <div className="flex items-start space-x-2.5">
                    <span className="font-mono text-[#11408F] dark:text-[#AEF0FF] select-none pt-0.5">+</span>
                    <span>
                      I love singing and dancing like nobody&apos;s watching (because usually nobody is)
                    </span>
                  </div>
                  <div className="flex items-start space-x-2.5">
                    <span className="font-mono text-[#11408F] dark:text-[#AEF0FF] select-none pt-0.5">+</span>
                    <span>
                      introvert... who also loves to yap when the topic is interesting
                    </span>
                  </div>
                  <div className="flex items-start space-x-2.5">
                    <span className="font-mono text-[#11408F] dark:text-[#AEF0FF] select-none pt-0.5">+</span>
                    <span>personality type: INTJ</span>
                  </div>
                  <div className="flex items-start space-x-2.5">
                    <span className="font-mono text-[#11408F] dark:text-[#AEF0FF] select-none pt-0.5">+</span>
                    <span>I enjoy challenging myself just for the plot</span>
                  </div>
                  <div className="flex items-start space-x-2.5">
                    <span className="font-mono text-[#11408F] dark:text-[#AEF0FF] select-none pt-0.5">+</span>
                    <span>I love chess</span>
                  </div>
                  <div className="flex items-start space-x-2.5">
                    <span className="font-mono text-[#11408F] dark:text-[#AEF0FF] select-none pt-0.5">+</span>
                    <span>most of my illustrations are inspired by Headspace</span>
                  </div>
                  <div className="flex items-start space-x-2.5">
                    <span className="font-mono text-[#11408F] dark:text-[#AEF0FF] select-none pt-0.5">+</span>
                    <span>
                      currently in my final year of college &mdash; slightly terrifying &amp; slightly exciting
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* What I Am Currently Learning Dropdown Accordion */}
            <div className="border-b border-neutral-200/70 dark:border-[#9999FF]/20 pb-5">
              <div
                onClick={() => {
                  playTone(880);
                  setIsLearningOpen(!isLearningOpen);
                }}
                className="flex items-center justify-between cursor-pointer group py-1.5 select-none"
              >
                <div>
                  <h2 className="text-[19px] sm:text-[20.5px] font-medium text-[#232564] dark:text-[#F5F5FF] group-hover:text-[#FF42FF] dark:group-hover:text-[#FF94FF] transition-colors">
                    what i am currently learning
                  </h2>
                  <p className="font-mono text-[13.5px] sm:text-[14.5px] text-[#11408F] dark:text-[#AEF0FF] mt-0.5">
                    learning, unlearning, relearning
                  </p>
                </div>
                <div>
                  <span className="font-mono text-xl font-semibold text-[#11408F] dark:text-[#AEF0FF] group-hover:text-[#FF42FF] dark:group-hover:text-[#FF94FF] transition-colors select-none leading-none">
                    {isLearningOpen ? "−" : "+"}
                  </span>
                </div>
              </div>

              {isLearningOpen && (
                <div className="mt-4 space-y-3.5 text-[16px] sm:text-[17px] text-[#232564] dark:text-[#F5F5FF] leading-relaxed font-sans animate-in fade-in duration-150">
                  <div className="flex items-start space-x-2.5">
                    <span className="font-mono text-[#11408F] dark:text-[#AEF0FF] select-none pt-0.5">+</span>
                    <span>
                      currently learning how to make things feel simple without making them boring
                    </span>
                  </div>
                  <div className="flex items-start space-x-2.5">
                    <span className="font-mono text-[#11408F] dark:text-[#AEF0FF] select-none pt-0.5">+</span>
                    <span>
                      exploring better ways to structure code, design cleaner interfaces, and build products that feel intentional from the first click
                    </span>
                  </div>
                  <div className="flex items-start space-x-2.5">
                    <span className="font-mono text-[#11408F] dark:text-[#AEF0FF] select-none pt-0.5">+</span>
                    <span>
                      trying to understand why some digital experiences feel effortless while others feel confusing, even when they do the same thing
                    </span>
                  </div>
                  <div className="flex items-start space-x-2.5">
                    <span className="font-mono text-[#11408F] dark:text-[#AEF0FF] select-none pt-0.5">+</span>
                    <span>
                      also learning to be okay with not knowing everything yet and building anyway
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* When I Touch Grass Dropdown Accordion */}
            <div className="border-b border-neutral-200/70 dark:border-[#9999FF]/20 pb-5">
              <div
                onClick={() => {
                  playTone(880);
                  setIsTouchGrassOpen(!isTouchGrassOpen);
                }}
                className="flex items-center justify-between cursor-pointer group py-1.5 select-none"
              >
                <div>
                  <h2 className="text-[19px] sm:text-[20.5px] font-medium text-[#232564] dark:text-[#F5F5FF] group-hover:text-[#FF42FF] dark:group-hover:text-[#FF94FF] transition-colors">
                    when i touch grass
                  </h2>
                  <p className="font-mono text-[13.5px] sm:text-[14.5px] text-[#11408F] dark:text-[#AEF0FF] mt-0.5">
                    rare but documented
                  </p>
                </div>
                <div>
                  <span className="font-mono text-xl font-semibold text-[#11408F] dark:text-[#AEF0FF] group-hover:text-[#FF42FF] dark:group-hover:text-[#FF94FF] transition-colors select-none leading-none">
                    {isTouchGrassOpen ? "−" : "+"}
                  </span>
                </div>
              </div>

              {isTouchGrassOpen && (
                <div className="mt-4 space-y-3.5 text-[16px] sm:text-[17px] text-[#232564] dark:text-[#F5F5FF] leading-relaxed font-sans animate-in fade-in duration-150">
                  <div className="flex items-start space-x-2.5">
                    <span className="font-mono text-[#11408F] dark:text-[#AEF0FF] select-none pt-0.5">+</span>
                    <span>
                      I love reading books, watching movies, writing, and drawing
                    </span>
                  </div>
                  <div className="flex items-start space-x-2.5">
                    <span className="font-mono text-[#11408F] dark:text-[#AEF0FF] select-none pt-0.5">+</span>
                    <span>
                      I&apos;m very curious so I love to constantly explore new things
                    </span>
                  </div>
                  <div className="flex items-start space-x-2.5">
                    <span className="font-mono text-[#11408F] dark:text-[#AEF0FF] select-none pt-0.5">+</span>
                    <span>
                      I don&apos;t believe the saying &quot;curiosity kills the cat&quot; &mdash; haha
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* About My Blog Dropdown Accordion */}
            <div className="border-b border-neutral-200/70 dark:border-[#9999FF]/20 pb-5">
              <div
                onClick={() => {
                  playTone(880);
                  setIsAboutBlogOpen(!isAboutBlogOpen);
                }}
                className="flex items-center justify-between cursor-pointer group py-1.5 select-none"
              >
                <div>
                  <h2 className="text-[19px] sm:text-[20.5px] font-medium text-[#232564] dark:text-[#F5F5FF] group-hover:text-[#FF42FF] dark:group-hover:text-[#FF94FF] transition-colors">
                    about my blog
                  </h2>
                  <p className="font-mono text-[13.5px] sm:text-[14.5px] text-[#11408F] dark:text-[#AEF0FF] mt-0.5">
                    my brain leaving sticky notes for itself
                  </p>
                </div>
                <div>
                  <span className="font-mono text-xl font-semibold text-[#11408F] dark:text-[#AEF0FF] group-hover:text-[#FF42FF] dark:group-hover:text-[#FF94FF] transition-colors select-none leading-none">
                    {isAboutBlogOpen ? "−" : "+"}
                  </span>
                </div>
              </div>

              {isAboutBlogOpen && (
                <div className="mt-4 space-y-3.5 text-[16px] sm:text-[17px] text-[#232564] dark:text-[#F5F5FF] leading-relaxed font-sans animate-in fade-in duration-150">
                  <div className="flex items-start space-x-2.5">
                    <span className="font-mono text-[#11408F] dark:text-[#AEF0FF] select-none pt-0.5">+</span>
                    <span>
                      I write about things I&apos;m learning, things I&apos;m building, and things I randomly become obsessed with at 2:17 am
                    </span>
                  </div>
                  <div className="flex items-start space-x-2.5">
                    <span className="font-mono text-[#11408F] dark:text-[#AEF0FF] select-none pt-0.5">+</span>
                    <span>
                      sometimes it&apos;s about tech, sometimes design, sometimes a thought that refuses to leave me alone until I write it down
                    </span>
                  </div>
                  <div className="flex items-start space-x-2.5">
                    <span className="font-mono text-[#11408F] dark:text-[#AEF0FF] select-none pt-0.5">+</span>
                    <span>
                      it&apos;s less &quot;expert advice&quot; and more &quot;let me see if this idea makes sense outside my head&quot;
                    </span>
                  </div>
                  <div className="flex items-start space-x-2.5">
                    <span className="font-mono text-[#11408F] dark:text-[#AEF0FF] select-none pt-0.5">+</span>
                    <span>
                      mostly curiosity. occasionally clarity. always slightly unhinged but in a productive way
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Expandable Experience Section */}
            <section className="pt-6 sm:pt-8">
              <div className="flex items-center justify-between pb-4.5 border-b border-neutral-200/70 dark:border-[#9999FF]/20 mb-1">
                <h3 className="font-mono text-[14px] sm:text-[15px] uppercase tracking-wider text-[#11408F] dark:text-[#AEF0FF] font-semibold">
                  experience
                </h3>
                <a
                  href={portfolioData.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playTone(880)}
                  className="px-3.5 py-1.5 bg-[#FF42FF] dark:bg-[#FF94FF] hover:bg-[#e030e0] dark:hover:bg-[#ff7aff] text-[13px] sm:text-[13.5px] font-mono font-medium text-white dark:text-[#0B0C0F] flex items-center space-x-1 transition-all shadow-xs cursor-pointer"
                >
                  <span>Download as PDF ↓</span>
                </a>
              </div>

              <div className="divide-y divide-neutral-200/70 dark:divide-[#9999FF]/20">
                {/* Plue Accordion */}
                <div className="py-5">
                  <div
                    onClick={() => {
                      playTone(880);
                      setExpandedExperience(expandedExperience === "plue" ? null : "plue");
                    }}
                    className="flex items-start justify-between cursor-pointer group select-none"
                  >
                    <div className="flex-1 pr-4">
                      <div className="font-semibold text-[#0F172A] dark:text-[#F5F5FF] text-[16.5px] sm:text-[17.5px] group-hover:text-[#6666FF] dark:group-hover:text-[#FF94FF] transition-colors">
                        Engineering Intern
                      </div>
                      <div className="font-mono text-[13.5px] sm:text-[14.5px] text-[#FF42FF] dark:text-[#FF94FF] font-medium mt-0.5 flex items-center space-x-1.5">
                        <span className="text-[#64748B] dark:text-[#8E95B8] select-none">└</span>
                        <span>Plue</span>
                      </div>
                      {expandedExperience === "plue" && (
                        <p className="text-[15.5px] sm:text-[16.5px] text-[#334155] dark:text-[#CBD5E1] mt-3 leading-relaxed max-w-[520px]">
                          Engineering intern at Plue owning design systems, micro-interactions, and
                          reactive interface architectures.
                        </p>
                      )}
                    </div>
                    <div className="flex items-center space-x-3 pt-0.5">
                      <span className="font-mono text-[13.5px] sm:text-[14.5px] text-[#64748B] dark:text-[#8E95B8] whitespace-nowrap">
                        Oct – Dec 2026
                      </span>
                      <span className="font-mono text-xl font-semibold text-[#11408F] dark:text-[#AEF0FF] group-hover:text-[#6666FF] dark:group-hover:text-[#FF94FF] transition-colors select-none leading-none">
                        {expandedExperience === "plue" ? "−" : "+"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Scientiflow Accordion */}
                <div className="py-5">
                  <div
                    onClick={() => {
                      playTone(880);
                      setExpandedExperience(
                        expandedExperience === "scientiflow" ? null : "scientiflow"
                      );
                    }}
                    className="flex items-start justify-between cursor-pointer group select-none"
                  >
                    <div className="flex-1 pr-4">
                      <div className="font-semibold text-[#0F172A] dark:text-[#F5F5FF] text-[16.5px] sm:text-[17.5px] group-hover:text-[#6666FF] dark:group-hover:text-[#FF94FF] transition-colors">
                        Frontend Developer Intern
                      </div>
                      <div className="font-mono text-[13.5px] sm:text-[14.5px] text-[#FF42FF] dark:text-[#FF94FF] font-medium mt-0.5 flex items-center space-x-1.5">
                        <span className="text-[#64748B] dark:text-[#8E95B8] select-none">└</span>
                        <span>Scientiflow</span>
                      </div>
                      {expandedExperience === "scientiflow" && (
                        <p className="text-[15.5px] sm:text-[16.5px] text-[#334155] dark:text-[#CBD5E1] mt-3 leading-relaxed max-w-[520px]">
                          Frontend developer intern responsible for crafting responsive user interfaces,
                          component architecture, and seamless interactive experiences.
                        </p>
                      )}
                    </div>
                    <div className="flex items-center space-x-3 pt-0.5">
                      <span className="font-mono text-[13.5px] sm:text-[14.5px] text-[#64748B] dark:text-[#8E95B8] whitespace-nowrap">
                        May – Jul 2025
                      </span>
                      <span className="font-mono text-xl font-semibold text-[#11408F] dark:text-[#AEF0FF] group-hover:text-[#6666FF] dark:group-hover:text-[#FF94FF] transition-colors select-none leading-none">
                        {expandedExperience === "scientiflow" ? "−" : "+"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Stack Row */}
            <section className="pt-4 border-t border-neutral-200/70 dark:border-[#9999FF]/20 font-mono text-[14px] sm:text-[14.5px]">
              <div className="flex items-center justify-between">
                <div className="text-[#11408F] dark:text-[#AEF0FF] font-semibold">stack</div>
                <div className="text-right text-[#0F172A] dark:text-[#F5F5FF]">
                  Next.js &bull; Supabase &bull; Python &bull; Figma &bull; Antigravity
                </div>
              </div>
            </section>

            {/* About Footer */}
            <div className="pt-10">
              <button
                onClick={() => handleNavClick("home")}
                className="font-mono text-[13.5px] sm:text-[14px] text-[#FF42FF] dark:text-[#FF94FF] hover:underline underline-offset-4 font-medium flex items-center space-x-1 cursor-pointer focus:outline-none"
              >
                <span>&larr; back to home</span>
              </button>
            </div>
            <footer className="pt-8 border-t border-neutral-200/70 dark:border-[#9999FF]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 font-mono text-[14px] sm:text-[14.5px] text-[#64748B] dark:text-[#8E95B8]">
              <div>coding is an art and im an artist</div>
              <div>made w love &bull; &copy; 2026</div>
            </footer>
          </div>
        )}

        {/* ========================================================
            VIEW 3: BLOG VIEW
           ======================================================== */}
        {viewMode === "blog" && (
          <div className="flex flex-col space-y-9 animate-in fade-in duration-200">
            {/* Blog Posts Clean Architecture */}
            <section className="pt-2 sm:pt-4">

              <div className="divide-y divide-neutral-200/70 dark:divide-[#9999FF]/20">
                {portfolioData.writings.map((post, idx) => (
                  <div key={idx} className="pb-6 sm:pb-6.5 pt-6 sm:pt-6.5 first:pt-2">
                    <a
                      href={`/blog/${post.slug}`}
                      onClick={() => playTone(880)}
                      className="flex items-center justify-between group select-none cursor-pointer"
                    >
                      <div className="space-y-1.5">
                        <h2 className="text-[19px] sm:text-[20.5px] font-medium text-[#232564] dark:text-[#F5F5FF] group-hover:text-[#FF42FF] dark:group-hover:text-[#FF94FF] transition-colors leading-snug">
                          {post.title.toLowerCase()}
                        </h2>
                        <p className="font-mono text-[13.5px] sm:text-[14.5px] text-[#11408F] dark:text-[#AEF0FF] mt-0.5">
                          {post.date.toLowerCase()} &bull; {post.readingTime.toLowerCase()} read
                        </p>
                      </div>
                      <div>
                        <span className="font-mono text-[21px] sm:text-[23px] font-medium text-[#11408F] dark:text-[#AEF0FF] group-hover:text-[#FF42FF] dark:group-hover:text-[#FF94FF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-150 select-none leading-none inline-block">
                          ↗
                        </span>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </section>

            {/* Blog Footer */}
            <div className="pt-10">
              <button
                onClick={() => handleNavClick("home")}
                className="font-mono text-[13.5px] sm:text-[14px] text-[#6666FF] dark:text-[#9999FF] hover:underline underline-offset-4 font-medium flex items-center space-x-1 cursor-pointer focus:outline-none"
              >
                <span>&larr; back to home</span>
              </button>
            </div>
            <footer className="pt-8 border-t border-neutral-200/70 dark:border-[#9999FF]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 font-mono text-[14px] sm:text-[14.5px] text-[#64748B] dark:text-[#8E95B8]">
              <div>coding is an art and im an artist</div>
              <div>made w love &bull; &copy; 2026</div>
            </footer>
          </div>
        )}
      </main>

      {/* Detail Modals */}
      {selectedProject && (
        <Modal
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          title={selectedProject.title}
          badge="PROJECT"
        >
          <div className="space-y-3 text-[#232564] dark:text-[#F5F5FF]">
            <div className="text-xs font-mono text-[#11408F] dark:text-[#AEF0FF]">
              {selectedProject.year} &bull; {selectedProject.status || "Completed"}
            </div>
            <p className="text-sm font-medium leading-relaxed text-[#232564] dark:text-[#F5F5FF]">
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
                    className="font-mono text-[10.5px] px-2 py-0.5 bg-[#232564]/5 dark:bg-[#9999FF]/20 rounded text-[#232564] dark:text-[#F5F5FF]"
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
          <div className="space-y-3 text-[#232564] dark:text-[#F5F5FF]">
            <div className="text-xs font-mono text-[#11408F] dark:text-[#AEF0FF]">
              {selectedPost.date} &bull; {selectedPost.readingTime}
            </div>
            <p className="text-sm leading-relaxed text-[#232564] dark:text-[#F5F5FF] pt-1">
              {selectedPost.description}
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
}

