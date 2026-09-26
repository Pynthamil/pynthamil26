"use client";

import React, { useState, useEffect } from "react";
import { Copy, Check } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

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
          
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-4 sm:mt-0">
              {portfolioData.socialLinks.filter(l => l.label !== 'email').map((link, idx) => (
                  <a key={idx} href={link.href} target="_blank" rel="noopener noreferrer" className="font-mono text-[14px] sm:text-[15px] text-[#64748B] dark:text-[#8E95B8] hover:text-[#00B5B2] dark:hover:text-[#00B5B2] transition-colors lowercase">
                      {link.label}
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
  );
};
