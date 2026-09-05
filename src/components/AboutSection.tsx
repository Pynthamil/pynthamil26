"use client";

import React from "react";
import { portfolioData } from "@/data/portfolio";
import { User, Sparkles } from "lucide-react";

export const AboutSection: React.FC = () => {
  return (
    <section className="max-w-2xl mx-auto px-4 mb-20 animate-in fade-in duration-300">
      <div className="flex items-center gap-2 mb-6">
        <User className="w-5 h-5 text-neutral-600" />
        <h2 className="text-sm font-semibold tracking-tight text-neutral-900">
          About
        </h2>
      </div>

      <div className="space-y-6 text-sm sm:text-base text-neutral-700 leading-relaxed">
        <p>{portfolioData.about.bio}</p>
        
        <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-100 mt-6">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-3">
            <Sparkles className="w-4 h-4 text-indigo-500" />
            Core Focus & Competencies
          </div>
          <div className="flex flex-wrap gap-2">
            {portfolioData.about.skills.map((skill) => (
              <span
                key={skill}
                className="px-2.5 py-1 text-xs font-medium bg-white text-neutral-800 rounded-md border border-neutral-200/80 shadow-xs"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
