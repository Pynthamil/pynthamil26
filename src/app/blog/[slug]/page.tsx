"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { portfolioData, Post } from "@/data/portfolio";

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  const [soundOn, setSoundOn] = useState<boolean>(true);

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
      <div className="min-h-screen w-full flex flex-col justify-center items-center px-5 font-mono text-sm text-[#232564]">
        <p>Post not found.</p>
        <Link
          href="/blog"
          onClick={() => playTone(880)}
          className="mt-4 text-[#6666FF] hover:underline underline-offset-4 font-medium"
        >
          &larr; return to blog
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col justify-start items-center px-5 sm:px-8 md:px-12 pt-12 sm:pt-16 pb-24 selection:bg-neutral-200">
      {/* Soft atmospheric ambient glow */}
      <div className="ambient-glow" />

      {/* Main Container: exactly 490px across the site */}
      <main className="w-full relative z-10 flex flex-col max-w-[490px] animate-in fade-in duration-200">
        {/* Top Navigation */}
        <header className="flex items-center justify-between w-full mb-8">
          <Link
            href="/blog"
            onClick={() => playTone(880)}
            className="font-mono text-[14.5px] sm:text-[15px] tracking-tight text-[#232564] hover:text-[#6666FF] transition-colors flex items-center space-x-1.5 focus:outline-none font-medium cursor-pointer"
          >
            <span>&larr;</span>
            <span>blog</span>
          </Link>

          <div className="font-mono text-xs text-[#11408F]">
            {post.readingTime.toLowerCase()} read
          </div>
        </header>

        {/* Article Header */}
        <article className="space-y-6">
          <div className="border-b border-neutral-200/70 pb-5">
            <h1 className="text-[20px] sm:text-[22px] font-medium text-[#232564] leading-snug">
              {post.title.toLowerCase()}
            </h1>
            <div className="font-mono text-xs text-[#11408F] mt-2 flex items-center space-x-2">
              <span>{post.date.toLowerCase()}</span>
              <span>&bull;</span>
              <span>pynthamil pavendan</span>
            </div>
          </div>

          {/* Article Paragraphs */}
          <div className="space-y-4 text-[14px] sm:text-[14.5px] text-[#232564] leading-relaxed font-sans pt-1">
            {post.content ? (
              post.content.map((paragraph, idx) => (
                <p key={idx} className="leading-relaxed">
                  {paragraph}
                </p>
              ))
            ) : (
              <p className="leading-relaxed">{post.description}</p>
            )}
          </div>
        </article>

        {/* Return link */}
        <div className="pt-10 pb-6 border-b border-neutral-200/70">
          <Link
            href="/blog"
            onClick={() => playTone(880)}
            className="font-mono text-xs text-[#6666FF] hover:underline underline-offset-4 font-medium flex items-center space-x-1 cursor-pointer"
          >
            <span>&larr; back to all writings</span>
          </Link>
        </div>

        {/* Standard Footer */}
        <footer className="pt-8 flex items-center justify-between font-mono text-[11px] text-[#232564]/60">
          <div>curiosity doesn&apos;t kill the cat.</div>
          <div>made w love &bull; &copy; 2026</div>
        </footer>
      </main>
    </div>
  );
}
