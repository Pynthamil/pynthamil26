"use client";

import React, { useState, useEffect } from "react";
import { Copy, Check } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

const SocialIcon = ({ label }: { label: string }) => {
  switch (label.toLowerCase()) {
    case "github":
      return (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      );
    case "leetcode":
      return (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125 0 5.265 5.265 0 0 0 1.334 3.737l3.854 4.128 5.406 5.787a1.373 1.373 0 0 0 1.961 0 1.374 1.374 0 0 0 0-1.962L9.077 18.56l-3.854-4.127a2.518 2.518 0 0 1-.637-1.785 2.518 2.518 0 0 1 .637-1.786l3.854-4.127 5.406-5.787A1.374 1.374 0 0 0 13.483 0zm2.748 4.792a1.374 1.374 0 0 0-.96.438L9.865 11.018a1.374 1.374 0 0 0 0 1.962l5.406 5.787a1.374 1.374 0 0 0 1.961 0 1.374 1.374 0 0 0 0-1.962l-4.445-4.757 4.445-4.757a1.374 1.374 0 0 0-.961-2.3a1.374 1.374 0 0 0 0 0zm-8.312 6.559a1.374 1.374 0 0 0-1.374 1.374v.001a1.374 1.374 0 0 0 1.374 1.374h12.56a1.374 1.374 0 0 0 1.374-1.374v-.001a1.374 1.374 0 0 0-1.374-1.374H7.919z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.75a1.46 1.46 0 1 0 0 2.92 1.46 1.46 0 0 0 0-2.92z" />
        </svg>
      );
    case "twitter":
    case "x":
      return (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case "resume":
      return (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
        </svg>
      );
    default:
      return null;
  }
};

export const Footer: React.FC = () => {
  const [isEmailCopied, setIsEmailCopied] = useState(false);
  const [istTime, setIstTime] = useState("");

  useEffect(() => {
    const tick = () => {
      setIstTime(
        new Date().toLocaleTimeString("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("pavendanpynthamil@gmail.com");
    setIsEmailCopied(true);
    setTimeout(() => setIsEmailCopied(false), 2000);
  };

  return (
    <div className="w-[100vw] max-w-[100vw] relative left-1/2 -translate-x-1/2 px-5 sm:px-8 md:px-12">
      <footer className="w-full max-w-[1240px] mx-auto pt-16 mt-auto flex flex-col items-center gap-5 font-sans text-[15px] sm:text-[16px] text-[#64748B] dark:text-[#8E95B8] pb-12">
        <div className="w-full flex flex-col items-start gap-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-4 sm:gap-0">
            <button 
               onClick={handleCopyEmail}
               className="flex items-center justify-center space-x-2.5 px-4 sm:px-5 py-2 sm:py-2.5 bg-blue-50/80 dark:bg-blue-900/30 text-blue-700/90 dark:text-blue-300 text-[16px] sm:text-[18px] font-medium rounded-[6px] sm:rounded-[8px] hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors focus:outline-none"
            >
               <span>{isEmailCopied ? "copied!" : "pavendanpynthamil@gmail.com"}</span>
               {isEmailCopied ? <Check className="w-4 h-4 sm:w-[18px] sm:h-[18px]" /> : <Copy className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />}
            </button>
            
            <div className="flex items-center gap-5 sm:gap-6 mt-4 sm:mt-0">
                {portfolioData.socialLinks.filter(l => l.label !== 'email').map((link, idx) => (
                    <a 
                      key={idx} 
                      href={link.href} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      title={link.label}
                      aria-label={link.label}
                      className="text-[#64748B] dark:text-[#8E95B8] hover:text-[#00B5B2] dark:hover:text-[#00B5B2] transition-all transform hover:scale-115 flex items-center justify-center p-1"
                    >
                        <SocialIcon label={link.label} />
                    </a>
                ))}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-2 sm:gap-0 mt-2">
             <div>coding is an art and im an artist</div>
             <div className="flex items-center gap-3">
               <span>made w love &copy; 2026</span>
               {istTime && (
                 <>
                   <span className="w-1 h-1 rounded-full bg-[#CBD5E1] dark:bg-[#475569]" />
                   <span className="font-mono text-[13px] sm:text-[14px]">
                     {istTime} IST
                   </span>
                 </>
               )}
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
