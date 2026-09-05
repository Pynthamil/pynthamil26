"use client";

import React from "react";

interface NavigationProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  onSelectTab,
}) => {
  const tabs = [
    { id: "home", label: "home" },
    { id: "writing", label: "writing" },
    { id: "about", label: "about" },
  ];

  return (
    <header className="sticky top-6 z-50 flex justify-center w-full px-4 mb-10 sm:mb-14">
      <nav
        aria-label="Main Navigation"
        className="inline-flex items-center gap-1 p-1 bg-white/95 backdrop-blur-md rounded-full border border-neutral-200/90 shadow-[0_1px_4px_rgba(0,0,0,0.04)]"
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`px-3.5 py-1 text-[13px] font-semibold rounded-full transition-all duration-150 outline-none ${
                isActive
                  ? "bg-[#eef2ff] text-[#4e5df8]"
                  : "text-neutral-900 hover:text-black hover:bg-neutral-50"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </nav>
    </header>
  );
};
