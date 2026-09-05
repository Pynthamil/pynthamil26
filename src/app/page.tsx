"use client";

import React, { useState, useEffect } from "react";
import { portfolioData, Project, Post } from "@/data/portfolio";
import { Modal } from "@/components/Modal";

export default function Home() {
  const [viewMode, setViewMode] = useState<"home" | "about" | "blog">("home");
  const [blogFilter, setBlogFilter] = useState<string>("all");
  const [expandedExperience, setExpandedExperience] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isMeetHumanOpen, setIsMeetHumanOpen] = useState<boolean>(false);
  const [isFunFactsOpen, setIsFunFactsOpen] = useState<boolean>(false);
  const [isLearningOpen, setIsLearningOpen] = useState<boolean>(false);
  const [isTouchGrassOpen, setIsTouchGrassOpen] = useState<boolean>(false);
  const [soundOn, setSoundOn] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<string>("");


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
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleSound = () => {
    setSoundOn((prev) => !prev);
    if (!soundOn) {
      setTimeout(() => playClickSound(), 50);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-start items-center px-5 sm:px-8 md:px-12 pt-12 sm:pt-16 pb-24 selection:bg-neutral-200">
      {/* Soft atmospheric ambient glow */}
      <div className="ambient-glow" />

      {/* Main Container: exactly 490px across Home, About, and Blog */}
      <main className="w-full relative z-10 flex flex-col max-w-[490px]">
        {/* Top Header Row */}
        <header className="flex flex-col w-full mb-10">
          {/* Clawd GIF on Home Page */}
          {viewMode === "home" && (
            <div className="mb-3">
              <img
                src="/clawd.gif"
                alt="Clawd"
                className="w-28 h-28 sm:w-32 sm:h-32 object-contain select-none"
              />
            </div>
          )}

          <div className="flex items-center justify-between w-full">
            {/* Left Title: Figma box on Home, Back button on About/Blog */}
            <div className="flex items-center">
              {viewMode === "home" ? (
                <h1 className="text-[17px] sm:text-[18px] font-medium tracking-tight text-[#FF42FF] select-none">
                  {portfolioData.name.toLowerCase()}
                </h1>
              ) : (
                <button
                  onClick={() => handleNavClick("home")}
                  className="font-mono text-sm tracking-tight text-[#FF42FF] hover:opacity-80 transition-opacity flex items-center space-x-1.5 focus:outline-none font-medium"
                >
                  <span>&larr;</span>
                  <span>{portfolioData.name.toLowerCase()}</span>
                </button>
              )}
            </div>

            {/* Right: Navigation Links */}
            <nav className="flex items-center space-x-5 text-[14.5px] font-medium">
              <button
                onClick={() => handleNavClick("about")}
                className={`transition-colors cursor-pointer select-none ${
                  viewMode === "about"
                    ? "text-[#FF42FF] font-semibold underline underline-offset-4 decoration-[#FF42FF]"
                    : "text-neutral-800 hover:text-[#FF42FF]"
                }`}
              >
                About
              </button>
              <button
                onClick={() => handleNavClick("blog")}
                className={`transition-colors cursor-pointer select-none ${
                  viewMode === "blog"
                    ? "text-[#6666FF] font-semibold underline underline-offset-4 decoration-[#6666FF]"
                    : "text-neutral-800 hover:text-[#6666FF]"
                }`}
              >
                Blog
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
            <section className="flex flex-col space-y-3.5 mb-12 sm:mb-14">
              <p className="text-[16px] text-neutral-900 font-normal">
                Product and experience designer.
              </p>

              <div className="flex items-center space-x-2 text-[15px] text-neutral-900">
                <span>Engineering at</span>
                <span className="font-mono font-bold tracking-wider text-[#1e3a8a] text-[14px]">
                  PLUE
                </span>
              </div>

              <div className="font-mono text-xs text-[#11408F]">v3.0 / 2026</div>

              <div className="flex items-center space-x-2 text-[14.5px] text-neutral-800 pt-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse" />
                <span>Currently: making calm software feel alive.</span>
              </div>

              <p className="text-[14.5px] text-neutral-700 pt-1">
                Find me on{" "}
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-900 underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-900 transition-colors"
                >
                  X
                </a>
                ,{" "}
                <a
                  href={`mailto:${portfolioData.email}`}
                  className="text-neutral-900 underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-900 transition-colors"
                >
                  email me
                </a>
                , or{" "}
                <a
                  href="#resume"
                  onClick={() => handleNavClick("about")}
                  className="text-neutral-900 underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-900 transition-colors"
                >
                  download my CV &darr;
                </a>
              </p>
            </section>

            {/* Experience List Section */}
            <section className="w-full mb-12 sm:mb-14">
              <h2 className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-[#11408F] mb-3.5 font-semibold">
                Experience
              </h2>
              <ul className="flex flex-col space-y-3 font-mono text-[11.5px] sm:text-[12px] tracking-[0.04em]">
                {portfolioData.experiences.map((item) => (
                  <li
                    key={item.id}
                    className="group flex items-center justify-between py-0.5 text-[#111111] transition-opacity hover:opacity-75"
                  >
                    <a
                      href={item.url || "#"}
                      target={item.url && item.url !== "#" ? "_blank" : undefined}
                      rel={item.url && item.url !== "#" ? "noopener noreferrer" : undefined}
                      className="flex items-center space-x-3 flex-1 pr-4 focus:outline-none"
                    >
                      {item.glowColor && item.glowColor !== "transparent" ? (
                        <span
                          className="glow-badge"
                          style={{
                            backgroundColor: item.color,
                            boxShadow: `0 0 6px ${item.glowColor}`,
                          }}
                        />
                      ) : (
                        <span
                          className="w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ backgroundColor: item.color || "#111111" }}
                        />
                      )}
                      <span className="font-normal text-[#1a1a1a] tracking-[0.04em]">
                        {item.company}
                      </span>
                    </a>

                    <div className="text-right text-[#11408F]/80 uppercase font-normal tracking-[0.04em] whitespace-nowrap">
                      <span>{item.role}</span>
                      <span className="text-[#11408F]/50">, </span>
                      <span>{item.period}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            {/* Projects Section */}
            {portfolioData.projects.length > 0 && (
              <section className="w-full mb-12 sm:mb-14">
                <h2 className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-[#11408F] mb-3.5 font-semibold">
                  Projects
                </h2>
                <ul className="flex flex-col space-y-3 font-mono text-[11.5px] sm:text-[12px] tracking-[0.04em]">
                  {portfolioData.projects.map((project: Project, idx: number) => (
                    <li
                      key={idx}
                      className="group flex items-center justify-between py-0.5 text-[#111111] cursor-pointer transition-opacity hover:opacity-75"
                      onClick={() => setSelectedProject(project)}
                    >
                      <div className="flex items-center space-x-3 flex-1 pr-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#111111] opacity-40 group-hover:opacity-100 transition-opacity" />
                        <span className="font-normal text-[#1a1a1a] tracking-[0.04em]">
                          {project.title}
                        </span>
                      </div>

                      <div className="text-right text-[#737373] uppercase font-normal tracking-[0.04em] whitespace-nowrap">
                        <span>{project.tags?.[0] || "SYSTEM"}</span>
                        <span className="text-[#a3a3a3]">, </span>
                        <span>{project.year}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        )}

        {/* ========================================================
            VIEW 2: ABOUT VIEW
           ======================================================== */}
        {viewMode === "about" && (
          <div className="flex flex-col space-y-12 animate-in fade-in duration-200">
            {/* Meet The Human Dropdown Accordion */}
            <div className="border-b border-neutral-200/70 pb-5">
              <div
                onClick={() => {
                  playTone(880);
                  setIsMeetHumanOpen(!isMeetHumanOpen);
                }}
                className="flex items-center justify-between cursor-pointer group py-1.5 select-none"
              >
                <div>
                  <h2 className="text-[15px] font-medium text-neutral-900 group-hover:text-[#FF42FF] transition-colors">
                    meet the human
                  </h2>
                  <p className="font-mono text-xs text-[#11408F] mt-0.5">
                    because a portfolio needs a personality
                  </p>
                </div>
                <div>
                  <span className="font-mono text-base font-semibold text-[#11408F] group-hover:text-[#FF42FF] transition-colors select-none leading-none">
                    {isMeetHumanOpen ? "−" : "+"}
                  </span>
                </div>
              </div>

              {isMeetHumanOpen && (
                <div className="mt-4 space-y-3.5 text-[14px] sm:text-[14.5px] text-neutral-800 leading-relaxed font-sans animate-in fade-in duration-150">
                  <div className="flex items-start space-x-2.5">
                    <span className="font-mono text-[#11408F] select-none pt-0.5">+</span>
                    <span>My name is <span className="text-[#FF42FF] font-medium">Pynthamil Pavendan</span>!</span>
                  </div>
                  <div className="flex items-start space-x-2.5">
                    <span className="font-mono text-[#11408F] select-none pt-0.5">+</span>
                    <span>
                      I&apos;m a student developer who enjoys turning ideas into things people can actually use
                    </span>
                  </div>
                  <div className="flex items-start space-x-2.5">
                    <span className="font-mono text-[#11408F] select-none pt-0.5">+</span>
                    <span>I like building interfaces that feel simple, fast, and intentional</span>
                  </div>
                  <div className="flex items-start space-x-2.5">
                    <span className="font-mono text-[#11408F] select-none pt-0.5">+</span>
                    <span>
                      I spend most of my time working with modern web technologies, experimenting with interaction design, and refining the small details that make products feel polished
                    </span>
                  </div>
                  <div className="flex items-start space-x-2.5">
                    <span className="font-mono text-[#11408F] select-none pt-0.5">+</span>
                    <span>
                      I&apos;m especially interested in how design and engineering come together to create experiences that feel effortless
                    </span>
                  </div>
                  <div className="flex items-start space-x-2.5">
                    <span className="font-mono text-[#11408F] select-none pt-0.5">+</span>
                    <span>
                      Currently focused on building projects that are useful, visually clean, and quietly memorable
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Fun Facts About Me Dropdown Accordion */}
            <div className="border-b border-neutral-200/70 pb-5">
              <div
                onClick={() => {
                  playTone(880);
                  setIsFunFactsOpen(!isFunFactsOpen);
                }}
                className="flex items-center justify-between cursor-pointer group py-1.5 select-none"
              >
                <div>
                  <h2 className="text-[15px] font-medium text-neutral-900 group-hover:text-[#FF42FF] transition-colors">
                    fun facts about me
                  </h2>
                  <p className="font-mono text-xs text-[#11408F] mt-0.5">
                    the lore drops
                  </p>
                </div>
                <div>
                  <span className="font-mono text-base font-semibold text-[#11408F] group-hover:text-[#FF42FF] transition-colors select-none leading-none">
                    {isFunFactsOpen ? "−" : "+"}
                  </span>
                </div>
              </div>

              {isFunFactsOpen && (
                <div className="mt-4 space-y-3.5 text-[14px] sm:text-[14.5px] text-neutral-800 leading-relaxed font-sans animate-in fade-in duration-150">
                  <div className="flex items-start space-x-2.5">
                    <span className="font-mono text-[#11408F] select-none pt-0.5">+</span>
                    <span>
                      music taste: a bit of everything &rarr; if it sounds good, I&apos;m listening
                    </span>
                  </div>
                  <div className="flex items-start space-x-2.5">
                    <span className="font-mono text-[#11408F] select-none pt-0.5">+</span>
                    <span>
                      I love singing and dancing like nobody&apos;s watching (because usually nobody is)
                    </span>
                  </div>
                  <div className="flex items-start space-x-2.5">
                    <span className="font-mono text-[#11408F] select-none pt-0.5">+</span>
                    <span>
                      introvert... who also loves to yap when the topic is interesting
                    </span>
                  </div>
                  <div className="flex items-start space-x-2.5">
                    <span className="font-mono text-[#11408F] select-none pt-0.5">+</span>
                    <span>personality type: INTJ</span>
                  </div>
                  <div className="flex items-start space-x-2.5">
                    <span className="font-mono text-[#11408F] select-none pt-0.5">+</span>
                    <span>I enjoy challenging myself just for the plot</span>
                  </div>
                  <div className="flex items-start space-x-2.5">
                    <span className="font-mono text-[#11408F] select-none pt-0.5">+</span>
                    <span>I love chess</span>
                  </div>
                  <div className="flex items-start space-x-2.5">
                    <span className="font-mono text-[#11408F] select-none pt-0.5">+</span>
                    <span>most of my illustrations are inspired by Headspace</span>
                  </div>
                  <div className="flex items-start space-x-2.5">
                    <span className="font-mono text-[#11408F] select-none pt-0.5">+</span>
                    <span>
                      currently in my final year of college &mdash; slightly terrifying &amp; slightly exciting
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* What I Am Currently Learning Dropdown Accordion */}
            <div className="border-b border-neutral-200/70 pb-5">
              <div
                onClick={() => {
                  playTone(880);
                  setIsLearningOpen(!isLearningOpen);
                }}
                className="flex items-center justify-between cursor-pointer group py-1.5 select-none"
              >
                <div>
                  <h2 className="text-[15px] font-medium text-neutral-900 group-hover:text-[#FF42FF] transition-colors">
                    what i am currently learning
                  </h2>
                  <p className="font-mono text-xs text-[#11408F] mt-0.5">
                    learning, unlearning, relearning
                  </p>
                </div>
                <div>
                  <span className="font-mono text-base font-semibold text-[#11408F] group-hover:text-[#FF42FF] transition-colors select-none leading-none">
                    {isLearningOpen ? "−" : "+"}
                  </span>
                </div>
              </div>

              {isLearningOpen && (
                <div className="mt-4 space-y-3.5 text-[14px] sm:text-[14.5px] text-neutral-800 leading-relaxed font-sans animate-in fade-in duration-150">
                  <div className="flex items-start space-x-2.5">
                    <span className="font-mono text-[#11408F] select-none pt-0.5">+</span>
                    <span>
                      currently learning how to make things feel simple without making them boring
                    </span>
                  </div>
                  <div className="flex items-start space-x-2.5">
                    <span className="font-mono text-[#11408F] select-none pt-0.5">+</span>
                    <span>
                      exploring better ways to structure code, design cleaner interfaces, and build products that feel intentional from the first click
                    </span>
                  </div>
                  <div className="flex items-start space-x-2.5">
                    <span className="font-mono text-[#11408F] select-none pt-0.5">+</span>
                    <span>
                      trying to understand why some digital experiences feel effortless while others feel confusing, even when they do the same thing
                    </span>
                  </div>
                  <div className="flex items-start space-x-2.5">
                    <span className="font-mono text-[#11408F] select-none pt-0.5">+</span>
                    <span>
                      also learning to be okay with not knowing everything yet and building anyway
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* When I Touch Grass Dropdown Accordion */}
            <div className="border-b border-neutral-200/70 pb-5">
              <div
                onClick={() => {
                  playTone(880);
                  setIsTouchGrassOpen(!isTouchGrassOpen);
                }}
                className="flex items-center justify-between cursor-pointer group py-1.5 select-none"
              >
                <div>
                  <h2 className="text-[15px] font-medium text-neutral-900 group-hover:text-[#FF42FF] transition-colors">
                    when i touch grass
                  </h2>
                  <p className="font-mono text-xs text-[#11408F] mt-0.5">
                    rare but documented
                  </p>
                </div>
                <div>
                  <span className="font-mono text-base font-semibold text-[#11408F] group-hover:text-[#FF42FF] transition-colors select-none leading-none">
                    {isTouchGrassOpen ? "−" : "+"}
                  </span>
                </div>
              </div>

              {isTouchGrassOpen && (
                <div className="mt-4 space-y-3.5 text-[14px] sm:text-[14.5px] text-neutral-800 leading-relaxed font-sans animate-in fade-in duration-150">
                  <div className="flex items-start space-x-2.5">
                    <span className="font-mono text-[#11408F] select-none pt-0.5">+</span>
                    <span>
                      I love reading books, watching movies, writing, and drawing
                    </span>
                  </div>
                  <div className="flex items-start space-x-2.5">
                    <span className="font-mono text-[#11408F] select-none pt-0.5">+</span>
                    <span>
                      I&apos;m very curious so I love to constantly explore new things
                    </span>
                  </div>
                  <div className="flex items-start space-x-2.5">
                    <span className="font-mono text-[#11408F] select-none pt-0.5">+</span>
                    <span>
                      I don&apos;t believe the saying &quot;curiosity kills the cat&quot; &mdash; haha
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Expandable Experience Section */}
            <section className="pt-2">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-200/70">
                <h3 className="font-mono text-xs uppercase tracking-wider text-[#11408F] font-semibold">
                  experience
                </h3>
                <a
                  href="#download"
                  onClick={(e) => {
                    e.preventDefault();
                    playTone(880);
                  }}
                  className="px-3.5 py-1.5 bg-[#FF42FF] hover:bg-[#e030e0] text-xs font-mono font-medium text-white flex items-center space-x-1 transition-all shadow-xs"
                >
                  <span>Download as PDF ↓</span>
                </a>
              </div>

              <div className="divide-y divide-neutral-200/70">
                {/* Plue Accordion */}
                <div className="py-4">
                  <div
                    onClick={() => {
                      playTone(880);
                      setExpandedExperience(expandedExperience === "plue" ? null : "plue");
                    }}
                    className="flex items-start justify-between cursor-pointer group select-none"
                  >
                    <div className="font-mono text-xs text-[#11408F] w-28 pt-0.5">Sep – Nov 2026</div>
                    <div className="flex-1">
                      <div className="font-medium text-neutral-900 text-sm group-hover:text-[#FF42FF] transition-colors">Plue</div>
                      <div className="font-mono text-xs text-[#11408F]">Engineering Intern</div>
                      {expandedExperience === "plue" && (
                        <p className="text-sm text-neutral-700 mt-2.5 leading-relaxed max-w-[520px]">
                          Engineering intern at Plue owning design systems, micro-interactions, and
                          reactive interface architectures.
                        </p>
                      )}
                    </div>
                    <div>
                      <span className="font-mono text-base font-semibold text-[#11408F] group-hover:text-[#FF42FF] transition-colors select-none leading-none">
                        {expandedExperience === "plue" ? "−" : "+"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Scientiflow Accordion */}
                <div className="py-4">
                  <div
                    onClick={() => {
                      playTone(880);
                      setExpandedExperience(
                        expandedExperience === "scientiflow" ? null : "scientiflow"
                      );
                    }}
                    className="flex items-start justify-between cursor-pointer group select-none"
                  >
                    <div className="font-mono text-xs text-[#11408F] w-28 pt-0.5">
                      May – Jul 2025
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-neutral-900 text-sm group-hover:text-[#FF42FF] transition-colors">Scientiflow</div>
                      <div className="font-mono text-xs text-[#11408F]">Frontend Developer · Internship</div>
                      {expandedExperience === "scientiflow" && (
                        <p className="text-sm text-neutral-700 mt-2.5 leading-relaxed max-w-[520px]">
                          Frontend developer intern responsible for crafting responsive user interfaces,
                          component architecture, and seamless interactive experiences.
                        </p>
                      )}
                    </div>
                    <div>
                      <span className="font-mono text-base font-semibold text-[#11408F] group-hover:text-[#FF42FF] transition-colors select-none leading-none">
                        {expandedExperience === "scientiflow" ? "−" : "+"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Stack & Expertise Rows */}
            <section className="pt-4 border-t border-neutral-200/70 space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between">
                <div className="text-[#11408F] font-semibold w-24">stack</div>
                <div className="flex-1 text-neutral-900">
                  Figma &bull; React &bull; Next.js &bull; TypeScript &bull; Web Audio &bull; Rive
                </div>
                <div className="text-[#11408F] text-[11px]">+24 more &gt;</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-[#11408F] font-semibold w-24">expertise</div>
                <div className="flex-1 text-neutral-900">
                  Vision &amp; strategy &bull; Interaction design &bull; Design systems &bull; Motion
                </div>
                <div className="text-[#11408F] text-[11px]">+6 more &gt;</div>
              </div>
            </section>

            {/* About Footer */}
            <footer className="pt-10 border-t border-neutral-200/70 flex items-center justify-between font-mono text-[11px] text-neutral-400">
              <div>there&apos;s light under this page.</div>
              <div>made by hand &bull; &copy; 2026</div>
            </footer>
          </div>
        )}

        {/* ========================================================
            VIEW 3: BLOG VIEW
           ======================================================== */}
        {viewMode === "blog" && (
          <div className="flex flex-col space-y-8 animate-in fade-in duration-200">
            {/* Header Title */}
            <div>
              <h2 className="text-2xl sm:text-[32px] font-medium leading-tight text-neutral-900 mb-2">
                Blog
              </h2>
              <p className="text-[15px] text-neutral-600">
                Writings on software design, calm interfaces, and systems.
              </p>
            </div>

            {/* Blog Post List */}
            <div className="divide-y divide-neutral-200/70 border-t border-b border-neutral-200/70">
              {portfolioData.writings.map((post, idx) => (
                <article
                  key={idx}
                  onClick={() => {
                    playTone(880);
                    setSelectedPost(post);
                  }}
                  className="py-5 group cursor-pointer transition-colors"
                >
                  <div className="flex items-center justify-between font-mono text-[11px] text-neutral-500 mb-1.5">
                    <span>{post.date}</span>
                    <span>{post.readingTime} READ</span>
                  </div>
                  <h3 className="text-[16px] font-medium text-neutral-900 group-hover:text-blue-600 transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-[13.5px] text-neutral-600 leading-relaxed mt-1.5">
                    {post.description}
                  </p>
                </article>
              ))}
            </div>
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
          <div className="space-y-3 text-neutral-700">
            <div className="text-xs font-mono text-neutral-500">
              {selectedProject.year} &bull; {selectedProject.status || "Completed"}
            </div>
            <p className="text-sm leading-relaxed text-neutral-800">
              {selectedProject.description}
            </p>
            {selectedProject.tags && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {selectedProject.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="font-mono text-[10.5px] px-2 py-0.5 bg-neutral-100 rounded text-neutral-700"
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
          <div className="space-y-3 text-neutral-700">
            <div className="text-xs font-mono text-neutral-500">
              {selectedPost.date} &bull; {selectedPost.readingTime}
            </div>
            <p className="text-sm leading-relaxed text-neutral-800 pt-1">
              {selectedPost.description}
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
}

