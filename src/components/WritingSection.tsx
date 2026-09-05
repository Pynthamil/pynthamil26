"use client";

import React from "react";
import { portfolioData, Post } from "@/data/portfolio";
import { BookOpen } from "lucide-react";

interface WritingSectionProps {
  onSelectPost?: (post: Post) => void;
}

export const WritingSection: React.FC<WritingSectionProps> = ({ onSelectPost }) => {
  return (
    <section className="max-w-2xl mx-auto px-4 mb-20 animate-in fade-in duration-300">
      <div className="flex items-center gap-2 mb-6">
        <BookOpen className="w-5 h-5 text-neutral-600" />
        <h2 className="text-sm font-semibold tracking-tight text-neutral-900">
          Writings & Thoughts
        </h2>
      </div>

      <div className="space-y-6">
        {portfolioData.writings.map((post: Post) => (
          <article
            key={post.slug}
            onClick={() => onSelectPost?.(post)}
            className="group p-4 -mx-4 rounded-xl border border-transparent hover:border-neutral-200/80 hover:bg-neutral-50/70 transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between text-xs text-neutral-500 mb-1.5 font-mono">
              <span>{post.date}</span>
              <span>{post.readingTime}</span>
            </div>
            <h3 className="font-semibold text-base text-neutral-900 group-hover:text-[#4e52ec] transition-colors mb-1.5">
              {post.title}
            </h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              {post.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};
