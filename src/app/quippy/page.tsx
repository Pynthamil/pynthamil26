"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Footer } from "@/components/Footer";
import { ProjectSidebar } from "@/components/ProjectSidebar";
import {
  MessageSquare,
  Shield,
  Users,
  Sparkles,
  Heart,
  Lock,
  RefreshCw,
  Sliders,
  HelpCircle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
  ExternalLink,
  EyeOff,
  Timer,
  Smile,
  ArrowDown,
  UserCheck,
  Zap,
  Info,
  BookOpen,
  Search,
  Database,
  Compass,
  Figma,
} from "lucide-react";

export default function QuippyProjectPage() {
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

  const sidebarSections = [
    { id: "overview", label: "Overview" },
    { id: "problem", label: "Problem" },
    { id: "research", label: "Research" },
    { id: "insight", label: "Key Insight" },
    { id: "solution", label: "Solution" },
    { id: "principles", label: "Principles" },
    { id: "takeaways", label: "Takeaways" },
  ];

  const painPoints = [
    {
      icon: <MessageSquare className="w-5 h-5 text-[#2B66F1] dark:text-[#60A5FA]" strokeWidth={1.5} />,
      title: "UNSTRUCTURED REHEARSAL",
      desc: "Practising alone in your head leads to looping thoughts",
    },
    {
      icon: <Shield className="w-5 h-5 text-[#2B66F1] dark:text-[#60A5FA]" strokeWidth={1.5} />,
      title: "PERFORMANCE FEAR",
      desc: "Practising with others feels like a test without structure",
    },
    {
      icon: <EyeOff className="w-5 h-5 text-[#2B66F1] dark:text-[#60A5FA]" strokeWidth={1.5} />,
      title: "JUDGMENT ANXIETY",
      desc: "Fear of being judged when trying out vulnerable phrasing",
    },
    {
      icon: <Timer className="w-5 h-5 text-[#2B66F1] dark:text-[#60A5FA]" strokeWidth={1.5} />,
      title: "UNPREDICTABLE REACTIONS",
      desc: "Can't test how another person will genuinely react",
    },
  ];

  return (
    <div className="min-h-screen w-full flex flex-col justify-start items-center px-5 sm:px-8 md:px-12 pt-12 sm:pt-16 pb-6 sm:pb-8 selection:bg-purple-100 dark:selection:bg-purple-950/50">
      <div className="ambient-glow" />

      {/* Sticky Project Navigation Sidebar */}
      <div className="fixed left-4 sm:left-6 md:left-8 top-1/2 -translate-y-1/2 z-40 select-none hidden lg:block">
        <ProjectSidebar sections={sidebarSections} playTone={playTone} />
      </div>

      {/* Main Content Container matching ORCA max-w-[640px] */}
      <main className="w-full relative z-10 flex flex-col max-w-[640px] animate-in fade-in duration-200">
        {/* Top Header Bar */}
        <header className="flex items-center justify-between w-full mb-8">
          <Link
            href="/"
            onClick={() => playTone(880)}
            className="font-sans text-[17px] sm:text-[19px] tracking-tight text-[#2C2C2C] dark:text-[#F2F2F2] hover:text-[#737373] dark:hover:text-[#a3a3a3] transition-colors flex items-center space-x-1.5 focus:outline-none font-normal cursor-pointer"
          >
            <span>&larr;</span>
            <span>home</span>
          </Link>
        </header>

        <article className="space-y-6">
          {/* Project Header (ORCA / Blog Style) */}
          <div className="space-y-6 mb-8">
            <div className="pb-2 text-left">
              <h1 className="font-sans font-medium text-[34px] sm:text-[40px] leading-tight text-[#2C2C2C] dark:text-[#F2F2F2] max-w-[800px]">
                How might we make practising vulnerable conversations feel safe, natural, and useful?
              </h1>
            </div>
          </div>

          <div className="pb-2 space-y-3">
            {/* Banner Cover Frame */}
            <div className="w-full my-6 flex items-center justify-center px-0">
              <img
                src="/codedex/quippy_rooms_cover.svg"
                alt="Quippy Practice Rooms Concept"
                className="w-full h-auto object-contain block select-none rounded-md sm:rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-800"
              />
            </div>

            {/* Clean Boxed Metadata Card (Identical to ORCA) */}
            <div className="w-full border-[3px] border-black/10 dark:border-white/15 rounded-md sm:rounded-lg p-5 sm:p-6 bg-white/60 dark:bg-[#141415]/60 my-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
                <div>
                  <span className="font-sans text-[11.5px] sm:text-[12.5px] tracking-wider font-semibold text-neutral-400 dark:text-neutral-500 block mb-1.5 uppercase">
                    ROLE
                  </span>
                  <span className="text-[15px] sm:text-[16.5px] font-sans font-medium text-[#2C2C2C] dark:text-[#F2F2F2] leading-normal block">
                    Product Designer
                  </span>
                </div>
                <div>
                  <span className="font-sans text-[11.5px] sm:text-[12.5px] tracking-wider font-semibold text-neutral-400 dark:text-neutral-500 block mb-1.5 uppercase">
                    TIMELINE
                  </span>
                  <span className="text-[15px] sm:text-[16.5px] font-sans font-medium text-[#2C2C2C] dark:text-[#F2F2F2] leading-normal block">
                    2–3 Days
                  </span>
                </div>
                <div>
                  <span className="font-sans text-[11.5px] sm:text-[12.5px] tracking-wider font-semibold text-neutral-400 dark:text-neutral-500 block mb-1.5 uppercase">
                    SKILLS &amp; TOOLS
                  </span>
                  <span className="text-[15px] sm:text-[16.5px] font-sans font-medium text-[#2C2C2C] dark:text-[#F2F2F2] leading-normal block">
                    UX Research, Figma
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8 text-[16px] sm:text-[17.5px] text-[#2C2C2C] dark:text-[#F2F2F2] leading-[1.8] font-sans pt-1">
            {/* OVERVIEW SECTION */}
            <div id="overview" className="space-y-4 scroll-mt-20 pt-6">
              <span className="font-sans text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#2B66F1] dark:text-[#60A5FA] block">
                OVERVIEW
              </span>
              <h3 className="text-[28px] sm:text-[32px] font-sans font-medium text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                Some conversations are easier to have after you've <span className="bg-[#DBEAFE] dark:bg-[#2B66F1] dark:text-white px-1 box-decoration-clone">practised them</span>.
              </h3>
              <p className="text-[16px] sm:text-[17.5px] text-[#475569] dark:text-[#CBD5E1] leading-relaxed my-4">
                You want to set a boundary, bring up something that hurt you, or prepare for a conversation you've been putting off. You know what you want to say, but you're not sure how the other person will react.
              </p>
              <p className="text-[16px] sm:text-[17.5px] text-[#475569] dark:text-[#CBD5E1] leading-relaxed my-4">
                Practising alone can only take you so far. Real conversations involve another person, their reactions, and all the things you can't rehearse on your own.
              </p>
              <p className="text-[16px] sm:text-[17.5px] text-[#475569] dark:text-[#CBD5E1] leading-relaxed my-4">
                <strong>Quippy Rooms</strong> explores a way to practise these moments with someone you trust, in a private space where it's okay to pause, get things wrong, and try again.
              </p>
            </div>

            {/* ACTION BUTTONS (Jump to Solution / Interactive Demo) */}
            <div className="pt-4 pb-2 flex flex-wrap gap-4 items-center">
              <button
                onClick={() => {
                  playTone(880);
                  document.getElementById("solution")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-6 py-3 sm:px-8 sm:py-3.5 rounded-md bg-[#141415] dark:bg-white text-white dark:text-[#141415] hover:bg-[#2C2C2C] dark:hover:bg-neutral-200 transition-colors font-medium text-[15px] sm:text-[16px] shadow-sm flex items-center space-x-2.5 cursor-pointer"
              >
                <span>Jump to Solution</span>
                <ArrowDown className="w-5 h-5" />
              </button>
            </div>



            {/* THE PROBLEM SECTION */}
            <div id="problem" className="space-y-5 scroll-mt-20 pt-8">
              <span className="font-sans text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#2B66F1] dark:text-[#60A5FA] block">
                THE PROBLEM
              </span>
              <h3 className="text-[28px] sm:text-[34px] font-sans font-medium text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug tracking-tight">
                You can't rehearse a real conversation on your own
              </h3>

              <p className="text-[16px] sm:text-[17.5px] text-[#475569] dark:text-[#CBD5E1] leading-relaxed my-4">
                Preparing for a difficult conversation often means running through possible responses in your head, imagining how the other person might react, and hoping you won't freeze when the moment comes.
              </p>

              {/* Stat Card matching ORCA reference */}
              <div className="pt-2">
                <div className="w-full border-[3px] border-black/10 dark:border-white/15 rounded-md sm:rounded-lg p-6 sm:p-8 md:p-10 bg-white dark:bg-[#141415] shadow-sm my-3">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                    <div className="flex items-center gap-5 sm:gap-7">
                      <span className="text-[64px] sm:text-[84px] md:text-[92px] font-sans font-semibold tracking-tighter leading-none text-[#2C2C2C] dark:text-[#F2F2F2]">
                        94%
                      </span>
                      <span className="text-[17px] sm:text-[20px] font-sans font-normal leading-snug text-[#2C2C2C] dark:text-[#CBD5E1] max-w-[280px]">
                        of people experience intrusive, looping thoughts or freezing when facing high-stakes conversations
                      </span>
                    </div>

                    <div className="flex flex-col items-center justify-center shrink-0 self-center sm:self-auto">
                      <div className="flex items-center gap-2">
                        <Users className="w-10 h-10 text-[#2B66F1]" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right mt-1.5">
                  <a 
                    href="https://www.sciencedaily.com/releases/2014/04/140408122137.htm" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="font-sans text-[11.5px] sm:text-[12.5px] text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 italic transition-colors"
                  >
                    https://www.sciencedaily.com/releases/2014/04/140408122137.htm
                  </a>
                </div>
              </div>

              {/* Core Pain Points Grid */}
              <div className="pt-4">
                <span className="font-sans text-[11px] sm:text-[12px] uppercase tracking-wider font-semibold text-[#475569] dark:text-[#CBD5E1] block mb-3">
                  Core Pain Points
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                  {painPoints.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-white dark:bg-[#141415] border-[3px] border-black/10 dark:border-white/15 rounded-md sm:rounded-lg aspect-square p-4 sm:p-5 flex flex-col items-center justify-center text-center space-y-3 transition-all hover:border-[#2B66F1] dark:hover:border-[#60A5FA] shadow-sm cursor-default"
                    >
                      <div className="p-2 sm:p-3 rounded-md sm:rounded-lg bg-[#F5F5F7] dark:bg-[#18181B] flex items-center justify-center">
                        {item.icon}
                      </div>
                      <span className="font-sans text-[11.5px] sm:text-[12.5px] font-semibold tracking-tight text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                        {item.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Problem Statement Callout (Unboxed) */}
              <div className="pt-8 space-y-3">
                <span className="font-sans text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#2B66F1] dark:text-[#60A5FA] block">
                  PROBLEM STATEMENT
                </span>
                <p className="text-[20px] sm:text-[26px] md:text-[29px] font-sans font-medium text-[#2C2C2C] dark:text-[#F2F2F2] leading-[1.4] tracking-tight">
                  How might we make practising vulnerable conversations with another person feel safe, natural, and{" "}
                  <span className="text-[#2B66F1] dark:text-[#60A5FA] font-bold">
                    genuinely useful without feeling like a performance?
                  </span>
                </p>
              </div>
            </div>

            {/* EXPLORATORY RESEARCH */}
            <div id="research" className="space-y-4 scroll-mt-20 pt-8">
              <div className="space-y-1">
                <span className="font-sans text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#2B66F1] dark:text-[#60A5FA] block">
                  RESEARCH
                </span>
                <h3 className="text-[28px] sm:text-[34px] font-sans font-medium text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug tracking-tight mb-1">
                  The 3 core barriers
                </h3>
                <p className="text-[15px] sm:text-[16.5px] text-[#64748B] dark:text-[#94A3B8] leading-relaxed">
                  Research from the <a href="https://www.who.int/news-room/fact-sheets/detail/anxiety-disorders" target="_blank" rel="noopener noreferrer" className="text-[#2B66F1] dark:text-[#60A5FA] underline underline-offset-4 font-medium hover:opacity-80 transition-opacity">World Health Organization (WHO)</a>, <a href="https://happiful.com/study-reveals-over-half-of-children-feel-they-cant-be-themselves-leading-to-sleepless-nights" target="_blank" rel="noopener noreferrer" className="text-[#2B66F1] dark:text-[#60A5FA] underline underline-offset-4 font-medium hover:opacity-80 transition-opacity">Happiful</a>, and <a href="https://news.ku.edu/news/article/2023/02/01/just-one-quality-conversation-friend-boosts-daily-well-being-0" target="_blank" rel="noopener noreferrer" className="text-[#2B66F1] dark:text-[#60A5FA] underline underline-offset-4 font-medium hover:opacity-80 transition-opacity">KU News</a> revealed key psychological barriers:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 pt-2">
                {/* Barrier 1 */}
                <div className="p-6 sm:p-7 rounded-md sm:rounded-lg border-[3px] border-black/10 dark:border-white/15 bg-white dark:bg-[#141415] shadow-sm flex flex-col justify-start">
                  <span className="text-[44px] sm:text-[52px] font-sans font-medium tracking-tight text-[#2C2C2C] dark:text-[#F2F2F2] leading-none mb-3">
                    5.8%
                  </span>
                  <p className="text-[14.5px] sm:text-[15.5px] text-[#475569] dark:text-[#CBD5E1] font-sans leading-relaxed">
                    globally affected by <span className="text-[#2C2C2C] dark:text-[#F2F2F2] font-medium">anxiety disorders</span> tied to <span className="text-[#2C2C2C] dark:text-[#F2F2F2] font-medium">social evaluation</span>
                  </p>
                </div>

                {/* Barrier 2 */}
                <div className="p-6 sm:p-7 rounded-md sm:rounded-lg border-[3px] border-black/10 dark:border-white/15 bg-white dark:bg-[#141415] shadow-sm flex flex-col justify-start">
                  <span className="text-[44px] sm:text-[52px] font-sans font-medium tracking-tight text-[#2C2C2C] dark:text-[#F2F2F2] leading-none mb-3">
                    70%
                  </span>
                  <p className="text-[14.5px] sm:text-[15.5px] text-[#475569] dark:text-[#CBD5E1] font-sans leading-relaxed">
                    regularly <span className="text-[#2C2C2C] dark:text-[#F2F2F2] font-medium">hold back true feelings</span> from peers to avoid judgment
                  </p>
                </div>

                {/* Barrier 3 */}
                <div className="p-6 sm:p-7 rounded-md sm:rounded-lg border-[3px] border-black/10 dark:border-white/15 bg-white dark:bg-[#141415] shadow-sm flex flex-col justify-start">
                  <span className="text-[44px] sm:text-[52px] font-sans font-medium tracking-tight text-[#2C2C2C] dark:text-[#F2F2F2] leading-none mb-3">
                    1x
                  </span>
                  <p className="text-[14.5px] sm:text-[15.5px] text-[#475569] dark:text-[#CBD5E1] font-sans leading-relaxed">
                    daily chat with a friend <span className="text-[#2C2C2C] dark:text-[#F2F2F2] font-medium">boosts well-being</span> and <span className="text-[#2C2C2C] dark:text-[#F2F2F2] font-medium">lowers stress</span>
                  </p>
                </div>
              </div>
            </div>

            {/* THE KEY INSIGHT SECTION */}
            <div id="insight" className="space-y-6 scroll-mt-20 pt-8">
              <div className="space-y-2">
                <span className="font-sans text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#2B66F1] dark:text-[#60A5FA] block">
                  THE KEY INSIGHT
                </span>
                <h3 className="text-[28px] sm:text-[34px] font-sans font-medium text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug tracking-tight">
                  70% hold back true feelings — yet silent rehearsal only loops anxiety.
                </h3>
              </div>

              {/* Stats Row matching uploaded reference */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10 items-start py-2">
                <div className="flex flex-col items-start gap-2 sm:gap-2.5">
                  <span className="text-[58px] sm:text-[72px] font-sans font-medium tracking-tight text-[#2C2C2C] dark:text-[#F2F2F2] leading-none">
                    61%
                  </span>
                  <p className="text-[16px] sm:text-[18.5px] text-[#475569] dark:text-[#CBD5E1] font-sans leading-snug">
                    rehearse conversations silently in their head without feedback
                  </p>
                </div>
                <div className="flex flex-col items-start gap-2 sm:gap-2.5">
                  <span className="text-[58px] sm:text-[72px] font-sans font-medium tracking-tight text-[#2C2C2C] dark:text-[#F2F2F2] leading-none">
                    70%
                  </span>
                  <p className="text-[16px] sm:text-[18.5px] text-[#475569] dark:text-[#CBD5E1] font-sans leading-snug">
                    suppress true feelings from peers to avoid judgment
                  </p>
                </div>
              </div>

              {/* Takeaway Punchline Text */}
              <h4 className="text-[24px] sm:text-[30px] font-sans font-medium text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug pt-2">
                Solo rehearsal keeps thoughts looping — safe 2-person practice breaks the freeze.
              </h4>
            </div>

            {/* THE SOLUTION */}
            <div id="solution" className="space-y-6 scroll-mt-20 pt-8">
              <div className="space-y-4">
                <span className="font-sans text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#2B66F1] dark:text-[#60A5FA] block">
                  THE SOLUTION
                </span>
                <h3 className="text-[28px] sm:text-[32px] font-sans font-medium text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                  A private space to practise, together: <span className="bg-[#DBEAFE] dark:bg-[#2B66F1] dark:text-white px-1 box-decoration-clone">temporary, invite-only practice rooms</span> for two people.
                </h3>
              </div>

              {/* Side-by-Side Showcase 1 (Raw sol1.svg Image Left, Text Right) */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-end pt-8">
                {/* Left: Bigger Raw Image */}
                <div className="md:col-span-7 w-full flex items-end justify-center">
                  <img
                    src="/codedex/sol1.svg"
                    alt="Quippy Practice Rooms Feature"
                    className="w-full h-auto object-contain select-none md:scale-105 transform-gpu"
                  />
                </div>

                {/* Right: Text Description bottom-aligned flush with image */}
                <div className="md:col-span-5 flex flex-col justify-end space-y-2.5 pb-0 sm:pb-0 -mb-1">
                  <h4 className="text-[21px] sm:text-[24px] font-sans font-medium text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug tracking-tight">
                    Quippy Rooms for safe rehearsal
                  </h4>
                  <p className="text-[14px] sm:text-[15px] text-[#64748B] dark:text-[#94A3B8] font-sans leading-relaxed">
                    Temporary, invite-only rooms for two. Practice difficult moments with someone you trust in a safe space where you can pause, retry, and reflect.
                  </p>
                </div>
              </div>

              {/* Side-by-Side Showcase 2 (Raw sol2.svg Image Left, Text Right) */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-end pt-8 sm:pt-10">
                {/* Left: Bigger Raw Image */}
                <div className="md:col-span-7 w-full flex items-end justify-center">
                  <img
                    src="/codedex/sol2.svg"
                    alt="Structured Setup & Role Assignment"
                    className="w-full h-auto object-contain select-none md:scale-105 transform-gpu"
                  />
                </div>

                {/* Right: Text Description bottom-aligned flush with image */}
                <div className="md:col-span-5 flex flex-col justify-end space-y-2.5 pb-0 sm:pb-0 -mb-1">
                  <h4 className="text-[21px] sm:text-[24px] font-sans font-medium text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug tracking-tight">
                    Structure the setup, not the talk.
                  </h4>
                  <p className="text-[14px] sm:text-[15px] text-[#64748B] dark:text-[#94A3B8] font-sans leading-relaxed">
                    Provide a shared scenario and clear roles to begin, so practice flows naturally without rigid scripts.
                  </p>
                </div>
              </div>

              {/* Side-by-Side Showcase 3 (Raw sol4.svg Image Left, Text Right) */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-end pt-8 sm:pt-10">
                {/* Left: Bigger Raw Image */}
                <div className="md:col-span-7 w-full flex items-end justify-center">
                  <img
                    src="/codedex/sol4.svg"
                    alt="Mutual Debrief & Guided Prompts"
                    className="w-full h-auto object-contain select-none md:scale-105 transform-gpu"
                  />
                </div>

                {/* Right: Text Description bottom-aligned flush with image */}
                <div className="md:col-span-5 flex flex-col justify-end space-y-2.5 pb-0 sm:pb-0 -mb-1">
                  <h4 className="text-[21px] sm:text-[24px] font-sans font-medium text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug tracking-tight">
                    Make reflection feel mutual.
                  </h4>
                  <p className="text-[14px] sm:text-[15px] text-[#64748B] dark:text-[#94A3B8] font-sans leading-relaxed">
                    Allow private reflection before sharing so feedback feels collaborative rather than evaluative.
                  </p>
                </div>
              </div>

              {/* Before & After Comparison Cards */}
              <div className="pt-10 space-y-4">
                <h3 className="text-[24px] sm:text-[28px] font-sans font-medium text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug tracking-tight">
                  Comparing Solo Rehearsal vs. Quippy Rooms
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 pt-2">
                  <div className="p-6 sm:p-8 rounded-md sm:rounded-lg border-[3px] border-black/10 dark:border-white/15 bg-white dark:bg-[#141415] space-y-4 shadow-sm">
                    <h4 className="font-sans text-[13px] font-semibold text-[#ef4444] tracking-wider uppercase mb-4">SOLO REHEARSAL</h4>
                    <ul className="list-disc pl-4 space-y-3.5 text-[15px] sm:text-[16px] text-[#475569] dark:text-[#CBD5E1] marker:text-[#ef4444]">
                      <li>Imagining how the other person might react</li>
                      <li>Unpredictable responses causing freeze state</li>
                      <li>Awkward practice without shared structure</li>
                      <li>Permanent chat logs creating pressure</li>
                    </ul>
                  </div>
                  <div className="p-6 sm:p-8 rounded-md sm:rounded-lg border-[3px] border-[#10b981]/40 dark:border-[#10b981]/40 bg-[#f0fdf4]/50 dark:bg-[#10b981]/[0.05] space-y-4 shadow-sm">
                    <h4 className="font-sans text-[13px] font-semibold text-[#10b981] tracking-wider uppercase mb-4">QUIPPY PRACTICE ROOMS</h4>
                    <ul className="list-disc pl-4 space-y-3.5 text-[15px] sm:text-[16px] text-[#475569] dark:text-[#CBD5E1] marker:text-[#10b981]">
                      <li>Shared scenario &amp; distinct role assignment</li>
                      <li>Real partner reactions in safe sandbox</li>
                      <li>Optional gentle prompts when stuck</li>
                      <li>Private-first mutual debrief &amp; ephemeral room</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* DESIGN PRINCIPLES SECTION */}
            <div id="principles" className="space-y-6 scroll-mt-20 pt-8">
              <div className="space-y-3">
                <span className="font-sans text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#2B66F1] dark:text-[#60A5FA] block">
                  DESIGN PRINCIPLES
                </span>
                <h3 className="text-[28px] sm:text-[34px] font-sans font-medium text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug tracking-tight">
                  Design for moments of discomfort, not just the happy path
                </h3>
                <p className="text-[16px] sm:text-[18px] text-[#475569] dark:text-[#CBD5E1] font-sans leading-relaxed">
                  What if one person becomes uncomfortable, wants to stop, or feels the other person is taking the exercise too seriously?
                </p>
              </div>

              {/* 2-Column Visual Showcase Cards (Ref: Image 1 & 2) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 pt-2">
                {/* Left Card: keyd1.1.svg */}
                <div className="flex flex-col space-y-4">
                  <div className="w-full">
                    <img
                      src="/codedex/keyd1.1.svg"
                      alt="Discreet Pause and End Practice Control"
                      className="w-full h-auto object-contain select-none block"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="text-[18px] sm:text-[20px] font-sans font-semibold text-[#2C2C2C] dark:text-[#F2F2F2] tracking-tight">
                      Discreet Pause / End control
                    </h4>
                    <p className="text-[14.5px] sm:text-[15px] text-[#64748B] dark:text-[#94A3B8] font-sans leading-relaxed">
                      A neutral exit requiring no explanation so either person can stop practice immediately.
                    </p>
                  </div>
                </div>

                {/* Right Card: keyd1.2.svg */}
                <div className="flex flex-col space-y-4">
                  <div className="w-full">
                    <img
                      src="/codedex/keyd1.2.svg"
                      alt="Soothing Colors & Low-Anxiety UI"
                      className="w-full h-auto object-contain select-none block"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="text-[18px] sm:text-[20px] font-sans font-semibold text-[#2C2C2C] dark:text-[#F2F2F2] tracking-tight">
                      Soothing colors to reduce anxiety
                    </h4>
                    <p className="text-[14.5px] sm:text-[15px] text-[#64748B] dark:text-[#94A3B8] font-sans leading-relaxed">
                      Calm color palettes and reassuring patterns to ease pressure during vulnerable talks.
                    </p>
                  </div>
                </div>
              </div>
            </div>



            {/* TAKEAWAYS SECTION */}
            <div id="takeaways" className="space-y-4 scroll-mt-20 pt-8">
              <span className="font-sans text-xs sm:text-[12px] uppercase tracking-wider font-semibold text-[#2B66F1] dark:text-[#60A5FA] block">
                TAKEAWAYS
              </span>

              {/* Reflection Callout */}
              <div className="pt-4 flex flex-col gap-4">
                <blockquote className="text-[22px] sm:text-[26px] font-sans font-medium text-[#2C2C2C] dark:text-[#F2F2F2] leading-snug">
                  “The goal isn't to teach people to say the perfect thing. It's to give them somewhere to try saying the difficult thing.”
                </blockquote>
                <p className="text-[18px] sm:text-[20px] text-[#475569] dark:text-[#CBD5E1] leading-relaxed">
                  A practice room can't guarantee that a conversation will go well, or that someone will feel confident afterwards. What it can do is create space to experiment with another person, make mistakes, and discover different ways of communicating.
                </p>
              </div>
            </div>

            {/* Footer Next / Previous Project Bar */}
            <div className="pt-10 border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link
                href="/semantic"
                onClick={() => playTone(650)}
                className="flex items-center gap-3 p-4 rounded-md border border-neutral-300 dark:border-neutral-700 hover:border-[#2B66F1] bg-white/50 dark:bg-[#141415]/50 w-full sm:w-auto transition-colors group cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5 text-[#2B66F1] group-hover:-translate-x-1 transition-transform" />
                <div className="flex flex-col">
                  <span className="text-xs font-sans font-medium text-neutral-500 uppercase tracking-wider">PREVIOUS PROJECT</span>
                  <span className="font-semibold text-[#2C2C2C] dark:text-[#F2F2F2] text-sm">Semantic Email Copilot</span>
                </div>
              </Link>

              <Link
                href="/orca"
                onClick={() => playTone(650)}
                className="flex items-center justify-end gap-3 p-4 rounded-md border border-neutral-300 dark:border-neutral-700 hover:border-[#2B66F1] bg-white/50 dark:bg-[#141415]/50 w-full sm:w-auto transition-colors group text-right cursor-pointer"
              >
                <div className="flex flex-col">
                  <span className="text-xs font-sans font-medium text-neutral-500 uppercase tracking-wider">NEXT PROJECT</span>
                  <span className="font-semibold text-[#2C2C2C] dark:text-[#F2F2F2] text-sm">ORCA Science Copilot</span>
                </div>
                <ChevronRight className="w-5 h-5 text-[#2B66F1] group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </article>
      </main>

      {/* Global Footer */}
      <div className="w-full max-w-[640px] mt-16">
        <Footer />
      </div>
    </div>
  );
}
