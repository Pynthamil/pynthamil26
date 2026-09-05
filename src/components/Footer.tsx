"use client";

import React, { useState, useEffect } from "react";

export const Footer: React.FC = () => {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      setTime(timeString);
    };

    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <footer className="w-full pt-16 sm:pt-24 pb-10 flex items-center justify-between font-mono text-[11px] sm:text-xs text-neutral-800 tracking-wider">
      {/* Location and Live Clock */}
      <div className="flex items-center gap-2 font-medium">
        <span className="uppercase">CHENNAI</span>
        <span>&middot;</span>
        <span>{time || "00:00:00"}</span>
      </div>

      {/* Language / Mode Switch */}
      <div className="flex items-center gap-2 font-medium text-neutral-500">
        <span className="text-neutral-900 font-semibold cursor-pointer">EN</span>
        <span>&middot;</span>
        <span className="hover:text-neutral-900 cursor-pointer transition-colors">TA</span>
      </div>
    </footer>
  );
};
