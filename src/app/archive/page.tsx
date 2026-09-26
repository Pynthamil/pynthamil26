"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Folder, User, BookOpen, Home, Menu, X } from "lucide-react";

interface ArchiveItem {
  id: string;
  title: string;
  subtitle?: string;
  category?: string;
  date?: string;
  image?: string;
  video?: string;
  link?: string;
  aspect?: string;
  accentColor?: string;
  cardStyle?: "framed" | "direct" | "cover";
}

export default function ArchivePage() {
  const [soundOn] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const archiveItems: ArchiveItem[] = [
    {
      id: "headspace-illustrations",
      title: "Headspace Inspired Illustrations",
      subtitle: "Headspace inspired illustrations for personal blog.",
      category: "Illustration",
      date: "2026",
      image: "/blog-covers/post_intro.svg",
      link: "/blog",
      aspect: "aspect-[3/4] sm:aspect-[1/1.25]",
      accentColor: "#6366F1",
      cardStyle: "framed"
    },
    {
      id: "git-commit-go",
      title: "Browser Terminal",
      subtitle: "Terminal browser exploration and automated developer workflows.",
      category: "Developer Tool",
      date: "2026",
      image: "/google.svg",
      link: "/blog/git-commit-go",
      aspect: "aspect-[16/10] sm:aspect-[1.3/1]",
      accentColor: "#3B82F6",
      cardStyle: "direct"
    },
    {
      id: "codedex-mobile",
      title: "Codedex Mobile App Exploration",
      subtitle: "Gamified learning experience and mobile interface concepts.",
      category: "Mobile App",
      date: "2025",
      image: "/Screens1.webp",
      aspect: "aspect-[4/5] sm:aspect-[1/1.2]",
      accentColor: "#10B981",
      cardStyle: "framed"
    },
    {
      id: "inspiher-acm",
      title: "InspiHer Campaign",
      subtitle: "Digital campaign design series celebrating women engineers and leaders.",
      category: "Brand Design",
      date: "2025",
      image: "/topic a.svg",
      aspect: "aspect-[2/3] sm:aspect-[1/1.45]",
      accentColor: "#F43F5E",
      cardStyle: "direct"
    }
  ];

  const renderCardMedia = (item: ArchiveItem) => {
    const isVideo = item.video || item.image?.match(/\.(mp4|webm|mov)$/i);
    const hoverScaleClass = item.id === "semantic-email" ? "" : "group-hover:scale-[1.03]";

    if (item.cardStyle === "framed") {
      return (
        <div className={`z-10 w-[92%] sm:w-[88%] mt-12 sm:mt-0 overflow-hidden rounded-[4px] sm:rounded-[6px] bg-white/60 group-hover:bg-white/20 dark:bg-white/10 p-2.5 sm:p-3 backdrop-blur-md border border-white/80 group-hover:border-white/10 shadow-sm group-hover:shadow-none transition-all duration-700 ease-out ${hoverScaleClass}`}>
          <div className="w-full overflow-hidden rounded-[6px] sm:rounded-[8px] bg-white dark:bg-[#141415] flex items-center justify-center">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      );
    }

    if (isVideo) {
      return (
        <video
          src={item.video || item.image}
          loop
          muted
          playsInline
          className={`transition-transform duration-700 ease-out ${hoverScaleClass} bg-transparent w-full h-full object-cover`}
        />
      );
    }

    if (item.cardStyle === "cover") {
      return (
        <img
          src={item.image}
          alt={item.title}
          className={`w-full h-full object-cover transition-transform duration-700 ease-out ${hoverScaleClass}`}
        />
      );
    }

    const isSemantic = item.id === "semantic-email";
    const isInspiher = item.id === "inspiher-acm";
    return (
      <img
        src={item.image}
        alt={item.title}
        className={`z-10 w-auto object-contain drop-shadow-lg transition-transform duration-700 ease-out translate-y-[4%] sm:translate-y-[5%] ${
          isInspiher ? "h-[62%] sm:h-[65%]" : isSemantic ? "h-[78%] sm:h-[80%]" : "h-[65%] sm:h-[65%]"
        } ${hoverScaleClass}`}
      />
    );
  };

  const renderCard = (item: ArchiveItem) => {
    const isInternal = item.link && item.link.startsWith("/");
    const aspectClass = item.aspect || "aspect-[4/3] sm:aspect-[1.15/1]";

    return (
      <div
        key={item.id}
        className="group flex flex-col py-1.5 cursor-pointer transition-opacity w-full"
        onClick={() => {
          playTone(880);
          if (isInternal && item.link) {
            window.location.href = item.link;
          } else if (!isInternal && item.link) {
            window.open(item.link, "_blank", "noopener,noreferrer");
          }
        }}
      >
        <div
          className={`w-full mb-3 overflow-hidden rounded-[4px] sm:rounded-[6px] flex items-center justify-center relative ${aspectClass} transition-all duration-500 bg-[#D5F1FF] dark:bg-[#1A1A1A]`}
        >
          {item.accentColor && (
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ backgroundColor: item.accentColor }}
            />
          )}

          {renderCardMedia(item)}

          {item.category && (
            <div className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 flex items-center gap-1.5 px-3.5 py-1.5 rounded-[8px] text-[13px] sm:text-[14px] font-sans font-medium tracking-wide whitespace-nowrap bg-white/50 dark:bg-black/50 backdrop-blur-md border border-black/10 dark:border-white/10 text-slate-700 dark:text-white group-hover:bg-white/20 group-hover:border-white/50 group-hover:text-white transition-all shadow-sm z-10">
              {item.category.toLowerCase()}
            </div>
          )}
        </div>

        <div className="flex flex-col mt-1.5 px-1">
          <p className="text-[20px] sm:text-[22px] font-sans text-[#475569] dark:text-[#CBD5E1] leading-[1.35] transition-colors group-hover:text-[#0F172A] dark:group-hover:text-[#F2F2F2]">
            {item.title}
          </p>
          {item.subtitle && (
            <p className="text-[13.5px] sm:text-[14.5px] font-sans text-slate-500 dark:text-slate-400 mt-1 font-normal leading-relaxed">
              {item.subtitle}
            </p>
          )}
        </div>
      </div>
    );
  };

  const leftColumnItems = archiveItems.filter((_, i) => i % 2 === 0);
  const rightColumnItems = archiveItems.filter((_, i) => i % 2 !== 0);

  return (
    <div className="min-h-screen w-full flex flex-col items-center px-5 sm:px-8 md:px-12 pt-4 sm:pt-5 pb-24 selection:bg-neutral-200">
      <div className="ambient-glow" />

      {/* Normal Sticky Header Navbar */}
      <header className="sticky top-4 sm:top-5 z-50 w-[92%] sm:w-[85%] max-w-[640px] mx-auto mb-12 sm:mb-16 bg-slate-100/90 dark:bg-[#1A1A1A]/90 backdrop-blur-lg rounded-full px-5 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between transition-colors">
        {/* Left: Logo & Name */}
        <Link
          href="/"
          onClick={() => playTone(880)}
          className="flex items-center gap-2 sm:gap-2.5 focus:outline-none cursor-pointer hover:opacity-80 transition-opacity"
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
        </Link>

        {/* Right: Nav Links & Tools */}
        <div className="flex items-center justify-end gap-3 sm:gap-5 -mr-1 sm:-mr-2">
          <nav className="hidden sm:flex items-center space-x-1 sm:space-x-1.5 text-[14.5px] sm:text-[15.5px] font-medium">
            <Link
              href="/projects"
              onClick={() => playTone(880)}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full transition-all cursor-pointer select-none text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-200/50 dark:hover:bg-slate-800/50"
            >
              <Folder className="w-4 h-4 shrink-0 opacity-80" />
              <span>Work</span>
            </Link>
            <Link
              href="/about"
              onClick={() => playTone(880)}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full transition-all cursor-pointer select-none text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-200/50 dark:hover:bg-slate-800/50"
            >
              <User className="w-4 h-4 shrink-0 opacity-80" />
              <span>About</span>
            </Link>
            <Link
              href="/blog"
              onClick={() => playTone(880)}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full transition-all cursor-pointer select-none text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-200/50 dark:hover:bg-slate-800/50"
            >
              <BookOpen className="w-4 h-4 shrink-0 opacity-80" />
              <span>Blog</span>
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="sm:hidden p-1.5 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-[18px] h-[18px]" /> : <Menu className="w-[18px] h-[18px]" />}
          </button>
        </div>
      </header>

      {/* Mobile Dropdown */}
      {isMobileMenuOpen && (
        <div className="sm:hidden fixed top-[70px] right-0 left-0 mx-auto w-[92%] max-w-[400px] bg-slate-100/95 dark:bg-[#1A1A1A]/95 backdrop-blur-lg rounded-2xl shadow-lg border border-slate-200/50 dark:border-slate-800/50 p-4 flex flex-col gap-2 z-50 animate-in slide-in-from-top-4 fade-in duration-200">
          <Link
            href="/"
            onClick={() => { playTone(880); setIsMobileMenuOpen(false); }}
            className="flex items-center gap-3 text-left px-4 py-2.5 rounded-xl font-medium text-[16px] transition-colors text-[#2C2C2C] dark:text-[#F2F2F2]"
          >
            <Home className="w-4.5 h-4.5 text-slate-500" />
            Home
          </Link>
          <Link
            href="/projects"
            onClick={() => { playTone(880); setIsMobileMenuOpen(false); }}
            className="flex items-center gap-3 text-left px-4 py-2.5 rounded-xl font-medium text-[16px] transition-colors text-[#2C2C2C] dark:text-[#F2F2F2]"
          >
            <Folder className="w-4.5 h-4.5 text-slate-500" />
            Work
          </Link>
          <Link
            href="/#about"
            onClick={() => { playTone(880); setIsMobileMenuOpen(false); }}
            className="flex items-center gap-3 text-left px-4 py-2.5 rounded-xl font-medium text-[16px] transition-colors text-[#2C2C2C] dark:text-[#F2F2F2]"
          >
            <User className="w-4.5 h-4.5 text-slate-500" />
            About
          </Link>
          <Link
            href="/blog"
            onClick={() => { playTone(880); setIsMobileMenuOpen(false); }}
            className="flex items-center gap-3 text-left px-4 py-2.5 rounded-xl font-medium text-[16px] transition-colors text-[#2C2C2C] dark:text-[#F2F2F2]"
          >
            <BookOpen className="w-4.5 h-4.5 text-slate-500" />
            Blog
          </Link>
        </div>
      )}

      {/* Main Content */}
      <main className="w-full relative z-10 max-w-[1240px] mx-auto animate-in fade-in duration-200">
        {/* Page Title & Subtitle */}
        <div className="mb-12 space-y-3">
          <h1 className="instrument-serif text-[42px] sm:text-[54px] font-normal leading-tight text-[#2C2C2C] dark:text-[#F2F2F2]">
            archive
          </h1>
          <p className="font-sans text-[17px] sm:text-[19px] text-[#64748B] dark:text-[#94A3B8] max-w-[640px] leading-relaxed">
            A curated collection of past experiments, hackathons, design concepts, and side projects built along the way.
          </p>
        </div>

        {/* 2-Column Projects Grid matching Home Page Cards */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full items-start">
          <div className="flex flex-col gap-4 sm:gap-6 w-full sm:w-1/2">
            {leftColumnItems.map(renderCard)}
          </div>
          <div className="flex flex-col gap-4 sm:gap-6 w-full sm:w-1/2">
            {rightColumnItems.map(renderCard)}
          </div>
        </div>
      </main>
    </div>
  );
}
