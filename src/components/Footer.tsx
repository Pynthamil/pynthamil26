"use client";

import React, { useState, useEffect } from "react";
import { Copy, Check, Mail, ArrowUp } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

const SocialIcon = ({ label }: { label: string }) => {
  switch (label.toLowerCase()) {
    case "github":
      return (
        <svg className="w-7 h-7 sm:w-8 sm:h-8 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg className="w-7 h-7 sm:w-8 sm:h-8 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
        </svg>
      );
    case "twitter":
    case "x":
      return (
        <svg className="w-7 h-7 sm:w-8 sm:h-8 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case "resume":
      return (
        <svg className="w-7 h-7 sm:w-8 sm:h-8 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
        </svg>
      );
    default:
      return null;
  }
};

interface FooterProps {
  fullWidth?: boolean;
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({ fullWidth = true, className = "" }) => {
  const [isEmailCopied, setIsEmailCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("pavendanpynthamil@gmail.com");
    setIsEmailCopied(true);
    setTimeout(() => setIsEmailCopied(false), 2000);
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const content = (
    <footer className={`w-full max-w-[1240px] mx-auto pt-8 sm:pt-12 mt-auto flex flex-col font-sans text-[15px] sm:text-[16px] text-[#64748B] dark:text-[#8E95B8] pb-6 sm:pb-8 ${className}`}>
        {/* Availability Banner */}
        <div className="w-full mb-8 p-3.5 sm:p-4 rounded-md bg-emerald-50/80 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 transition-colors">
          <div className="flex items-center gap-2.5">
            <Mail className="w-4 h-4 sm:w-4.5 sm:h-4.5 shrink-0 text-emerald-700 dark:text-emerald-300" />
            <span className="font-sans font-medium text-[14.5px] sm:text-[15.5px] tracking-tight">
              open for winter / summer 2027 internships &amp; full-time roles
            </span>
          </div>
          <a 
            href="mailto:pavendanpynthamil@gmail.com"
            className="font-sans text-[13.5px] sm:text-[14.5px] text-emerald-700 dark:text-emerald-300 hover:underline underline-offset-4 font-medium flex items-center gap-1.5 shrink-0"
          >
            <span>get in touch</span>
            <span>&rarr;</span>
          </a>
        </div>

        {/* Email Copy Button & Going Up Button */}
        <div className="w-full flex items-center justify-between mb-8">
          <button 
             onClick={handleCopyEmail}
             className="flex items-center justify-center space-x-2.5 px-4 sm:px-5 py-2 sm:py-2.5 bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 text-[15px] sm:text-[16.5px] font-medium rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors focus:outline-none cursor-pointer"
          >
             <span>{isEmailCopied ? "copied!" : "pavendanpynthamil@gmail.com"}</span>
             {isEmailCopied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 opacity-70" />}
          </button>

          <button
            onClick={handleScrollToTop}
            aria-label="Scroll to top"
            title="Going up"
            className="p-2 sm:p-2.5 rounded-full bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 hover:text-black dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-all cursor-pointer flex items-center justify-center"
          >
            <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Bottom Border & Copyright / Links Row (Image 2 style) */}
        <div className="w-full border-t border-neutral-200/70 dark:border-neutral-800/70 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[13.5px] sm:text-[14.5px] text-[#64748B] dark:text-[#8E95B8]">
          <div>
            &copy; pynthamil 2026 &middot; Made with love &lt;3
          </div>
          
          <div className="flex items-center gap-5 sm:gap-6 font-medium">
            {portfolioData.socialLinks.map((link, idx) => (
              <a 
                key={idx} 
                href={link.href} 
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="text-[#64748B] dark:text-[#8E95B8] hover:text-[#2C2C2C] dark:hover:text-[#F2F2F2] transition-colors"
              >
                {link.label.charAt(0).toUpperCase() + link.label.slice(1)}
              </a>
            ))}
          </div>
        </div>
      </footer>
  );

  if (!fullWidth) {
    return content;
  }

  return (
    <div className="w-[100vw] max-w-[100vw] relative left-1/2 -translate-x-1/2 px-5 sm:px-8 md:px-12">
      {content}
    </div>
  );
};
