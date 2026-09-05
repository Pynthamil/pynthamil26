"use client";

import React, { useState } from "react";
import { CalendarSvg } from "@/components/svg/CalendarSvg";

interface BentoCardProps {
  children: React.ReactNode;
  pastelBg: string;
  className?: string;
  containerPadding?: string;
  contentAlign?: string;
}

const BentoCard: React.FC<BentoCardProps> = ({
  children,
  pastelBg,
  className = "",
  containerPadding = "p-6 sm:p-7",
  contentAlign = "items-center justify-center",
}) => {
  const [isPlusHovered, setIsPlusHovered] = useState(false);

  return (
    <div
      style={{
        backgroundColor: isPlusHovered ? pastelBg : "#ffffff",
      }}
      className={`relative rounded-2xl transition-colors duration-300 ease-out flex flex-col justify-between overflow-hidden ${className}`}
    >
      <div className={`flex-1 flex w-full h-full min-h-0 ${contentAlign} ${containerPadding}`}>
        {children}
      </div>

      {/* Corner Plus Button */}
      <div className="absolute bottom-4 left-4 sm:bottom-5 sm:left-5 z-20">
        <button
          onMouseEnter={() => setIsPlusHovered(true)}
          onMouseLeave={() => setIsPlusHovered(false)}
          aria-label="Expand card details"
          className="w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-full bg-[#536df8] hover:bg-[#435ae5] flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#536df8] shadow-sm"
        >
          <svg
            className="w-4.5 h-4.5 sm:w-5 sm:h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export const BentoGrid: React.FC = () => {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-8 pb-24">
      {/* =========================================================================
          ROW 1: Equal Width (50% / 50%) Calendar Card + Orca Research Card
         ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mb-5 sm:mb-6">
        {/* Card 1.1: Calendar Heatmap Grid Card */}
        <BentoCard
          pastelBg="#EEF2FF"
          className="w-full min-h-[320px]"
        >
          <CalendarSvg className="w-full max-w-[290px] h-auto" />
        </BentoCard>

        {/* Card 1.2: AI Research Document Card (Flush right with NO space on right side) */}
        <BentoCard
          pastelBg="#E0F2FE"
          className="w-full min-h-[320px]"
          containerPadding="p-5 sm:p-6 pr-0 sm:pr-0 pl-3 sm:pl-5"
          contentAlign="items-center justify-end"
        >
          <img
            src="/orca.svg"
            alt="Captive Orcas Research Document"
            className="w-full max-w-[370px] sm:max-w-[420px] h-auto object-contain object-right ml-auto transition-transform duration-200 hover:scale-[1.01]"
          />
        </BentoCard>
      </div>

      {/* =========================================================================
          ROW 2: Mobile Deadline App (Left 50%) + 2x2 Grid (Right 50%)
         ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mb-5 sm:mb-6">
        {/* Card 2.1: Semantic SVG Mobile Deadline App */}
        <BentoCard
          pastelBg="#F0F4FF"
          className="w-full min-h-[460px]"
        >
          <img
            src="/semantic.svg"
            alt="Mobile Deadline App"
            className="w-full max-w-[220px] sm:max-w-[230px] h-auto object-contain transition-transform duration-200 hover:scale-[1.02]"
          />
        </BentoCard>

        {/* Right Cluster */}
        <div className="w-full flex flex-col gap-5 sm:gap-6">
          {/* Top Row: Avatar Card (Left) + Green Camera Card (Right) */}
          <div className="grid grid-cols-2 gap-5 sm:gap-6">
            {/* Card 2.2a: Character Avatar (Pastel Peach/Apricot) */}
            <BentoCard
              pastelBg="#FFF1EE"
              className="aspect-square"
              containerPadding="p-4 pb-10 sm:p-5 sm:pb-12"
            >
              <img
                src="/me.svg"
                alt="Avatar Illustration"
                className="w-22 h-22 sm:w-25 sm:h-25 md:w-28 md:h-28 object-contain transition-transform duration-200 hover:scale-105"
              />
            </BentoCard>

            {/* Card 2.2b: 3D Camera Icon (Pastel Mint/Sage) */}
            <BentoCard
              pastelBg="#F0FDF4"
              className="aspect-square"
              containerPadding="p-4 pb-10 sm:p-5 sm:pb-12"
            >
              <img
                src="/photo.svg"
                alt="Camera Illustration"
                className="w-32 h-26 sm:w-38 sm:h-30 md:w-42 md:h-34 object-contain transition-transform duration-200 hover:scale-105"
              />
            </BentoCard>
          </div>

          {/* Card 2.2c: Clean Minimal Slate Card (Pastel Lilac) */}
          <BentoCard
            pastelBg="#F5F3FF"
            className="flex-1 min-h-[170px]"
            containerPadding="p-5"
          >
            <div className="w-full h-full"></div>
          </BentoCard>
        </div>
      </div>

      {/* =========================================================================
          ROW 3: Square Cards (Blog Envelope, plue Brand, Contact Chat Bubble)
         ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
        {/* Card 3.1: Blog Inbox Envelope (Square in size) */}
        <BentoCard
          pastelBg="#FFF1F2"
          className="aspect-square w-full"
          containerPadding="p-5 sm:p-6"
        >
          <img
            src="/blog.svg"
            alt="My Blog Envelope"
            className="w-32 h-22 sm:w-36 sm:h-24 object-contain transition-transform duration-200 hover:scale-105"
          />
        </BentoCard>

        {/* Card 3.2: plue Brand Logo (Square in size) */}
        <BentoCard
          pastelBg="#F0F9FF"
          className="aspect-square w-full"
          containerPadding="p-5 sm:p-6"
        >
          <img
            src="/plue.svg"
            alt="plue brand"
            className="w-36 h-20 sm:w-44 sm:h-24 object-contain transition-transform duration-200 hover:scale-105"
          />
        </BentoCard>

        {/* Card 3.3: Contact Card (Square in size) */}
        <BentoCard
          pastelBg="#EFF6FF"
          className="aspect-square w-full"
          containerPadding="p-5 sm:p-6"
        >
          <img
            src="/contact.svg"
            alt="Contact"
            className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 object-contain transition-transform duration-200 hover:scale-105"
          />
        </BentoCard>
      </div>
    </section>
  );
};
