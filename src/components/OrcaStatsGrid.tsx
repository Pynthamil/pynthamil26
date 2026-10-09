"use client";

import React from "react";

export function OrcaStatsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 w-full max-w-5xl mx-auto">
      {/* Chart 1: Bar Chart */}
      <div className="p-4 sm:p-5 rounded-md sm:rounded-lg border border-black/10 dark:border-white/15 bg-white dark:bg-[#141415] shadow-sm flex flex-col justify-between space-y-3">
        <h4 className="font-sans font-semibold text-[13px] sm:text-[14px] text-[#2C2C2C] dark:text-[#F2F2F2] text-center leading-tight min-h-[32px] flex items-center justify-center">
          Captive population by year (till 2025)
        </h4>

        <div className="w-full flex-1 flex items-center justify-center py-1">
          <svg viewBox="0 0 280 180" className="w-full h-auto max-h-[190px] select-none">
            {/* Grid lines */}
            {[35, 65, 95, 125, 155].map((y, i) => (
              <line key={i} x1="42" y1={y} x2="270" y2={y} stroke="currentColor" className="text-slate-100 dark:text-neutral-800" strokeDasharray="3 3" />
            ))}

            {/* Y-axis values */}
            <text x="34" y="38" className="text-[9px] font-mono fill-slate-400" textAnchor="end">60</text>
            <text x="34" y="68" className="text-[9px] font-mono fill-slate-400" textAnchor="end">40</text>
            <text x="34" y="98" className="text-[9px] font-mono fill-slate-400" textAnchor="end">30</text>
            <text x="34" y="128" className="text-[9px] font-mono fill-slate-400" textAnchor="end">20</text>
            <text x="34" y="158" className="text-[9px] font-mono fill-slate-400" textAnchor="end">0</text>

            {/* Y-axis title */}
            <text x="-95" y="13" transform="rotate(-90)" className="text-[9px] font-sans fill-slate-400 font-medium" textAnchor="middle">
              number of captive orcas
            </text>

            {/* Bars */}
            {/* 1995: 12 -> height = 24 */}
            <rect x="50" y="131" width="22" height="24" rx="2" className="fill-[#005B6E] dark:fill-[#0284C7]" />
            {/* 2000: 33 -> height = 66 */}
            <rect x="81" y="89" width="22" height="66" rx="2" className="fill-[#005B6E] dark:fill-[#0284C7]" />
            {/* 2005: 43 -> height = 86 */}
            <rect x="112" y="69" width="22" height="86" rx="2" className="fill-[#005B6E] dark:fill-[#0284C7]" />
            {/* 2010: 48 -> height = 96 */}
            <rect x="143" y="59" width="22" height="96" rx="2" className="fill-[#005B6E] dark:fill-[#0284C7]" />
            {/* 2015: 57 -> height = 114 */}
            <rect x="174" y="41" width="22" height="114" rx="2" className="fill-[#005B6E] dark:fill-[#0284C7]" />
            {/* 2020: 50 -> height = 100 */}
            <rect x="205" y="55" width="22" height="100" rx="2" className="fill-[#005B6E] dark:fill-[#0284C7]" />
            {/* 2025: 52 -> height = 104 */}
            <rect x="236" y="51" width="22" height="104" rx="2" className="fill-[#005B6E] dark:fill-[#0284C7]" />

            {/* X-axis line */}
            <line x1="42" y1="155" x2="270" y2="155" stroke="#005B6E" strokeWidth="1.5" className="dark:stroke-[#0284C7]" />

            {/* X-axis labels */}
            <text x="61" y="167" className="text-[8.5px] font-mono fill-slate-500" textAnchor="middle">1995</text>
            <text x="92" y="167" className="text-[8.5px] font-mono fill-slate-500" textAnchor="middle">2000</text>
            <text x="123" y="167" className="text-[8.5px] font-mono fill-slate-500" textAnchor="middle">2005</text>
            <text x="154" y="167" className="text-[8.5px] font-mono fill-slate-500" textAnchor="middle">2010</text>
            <text x="185" y="167" className="text-[8.5px] font-mono fill-slate-500" textAnchor="middle">2015</text>
            <text x="216" y="167" className="text-[8.5px] font-mono fill-slate-500" textAnchor="middle">2020</text>
            <text x="247" y="167" className="text-[8.5px] font-mono fill-slate-500" textAnchor="middle">2025</text>

            {/* X-axis title */}
            <text x="156" y="177" className="text-[9px] font-sans fill-slate-400 font-medium" textAnchor="middle">
              year
            </text>
          </svg>
        </div>
      </div>

      {/* Chart 2: Pie / Donut Chart */}
      <div className="p-4 sm:p-5 rounded-md sm:rounded-lg border border-black/10 dark:border-white/15 bg-white dark:bg-[#141415] shadow-sm flex flex-col justify-between space-y-3">
        <h4 className="font-sans font-semibold text-[13px] sm:text-[14px] text-[#2C2C2C] dark:text-[#F2F2F2] text-center leading-tight min-h-[32px] flex items-center justify-center">
          Captive population by origin
        </h4>

        <div className="w-full flex-1 flex items-center justify-center py-1">
          <svg viewBox="0 0 240 180" className="w-full h-auto max-h-[190px] select-none">
            {/* Pie Slices (Center: 120, 85, Radius: 55) */}
            {/* Slice 1: Captured from wild (~65%, dark teal) from -90deg to 144deg */}
            <path
              d="M 120 85 L 120 30 A 55 55 0 1 1 75.5 117.3 Z"
              className="fill-[#005B6E] dark:fill-[#0284C7] stroke-white dark:stroke-[#141415]"
              strokeWidth="2"
            />
            {/* Slice 2: Born in captivity (~35%, light teal) from 144deg to 270deg */}
            <path
              d="M 120 85 L 75.5 117.3 A 55 55 0 0 1 120 30 Z"
              className="fill-[#64B0C6] dark:fill-[#38BDF8] stroke-white dark:stroke-[#141415]"
              strokeWidth="2"
            />

            {/* Connector Lines & Labels */}
            {/* Born in captivity line */}
            <polyline points="80,55 55,55" fill="none" stroke="currentColor" className="text-slate-300 dark:text-neutral-700" strokeWidth="1" />
            <text x="50" y="52" className="text-[9.5px] font-sans font-medium fill-[#2C2C2C] dark:fill-[#F2F2F2]" textAnchor="end">
              Born in captivity
            </text>
            <text x="50" y="63" className="text-[8.5px] font-mono fill-slate-400" textAnchor="end">
              35%
            </text>

            {/* Captured from wild line */}
            <polyline points="160,115 185,115" fill="none" stroke="currentColor" className="text-slate-300 dark:text-neutral-700" strokeWidth="1" />
            <text x="190" y="112" className="text-[9.5px] font-sans font-medium fill-[#2C2C2C] dark:fill-[#F2F2F2]" textAnchor="start">
              Captured from wild
            </text>
            <text x="190" y="123" className="text-[8.5px] font-mono fill-slate-400" textAnchor="start">
              65%
            </text>
          </svg>
        </div>
      </div>

      {/* Chart 3: Bubble / Scatter Plot */}
      <div className="p-4 sm:p-5 rounded-md sm:rounded-lg border border-black/10 dark:border-white/15 bg-white dark:bg-[#141415] shadow-sm flex flex-col justify-between space-y-3">
        <h4 className="font-sans font-semibold text-[13px] sm:text-[14px] text-[#2C2C2C] dark:text-[#F2F2F2] text-center leading-tight min-h-[32px] flex items-center justify-center">
          Population density distribution
        </h4>

        <div className="w-full flex-1 flex items-center justify-center py-1">
          <svg viewBox="0 0 240 180" className="w-full h-auto max-h-[190px] select-none">
            {/* Grid lines */}
            {[35, 65, 95, 125, 155].map((y, i) => (
              <line key={i} x1="25" y1={y} x2="225" y2={y} stroke="currentColor" className="text-slate-100 dark:text-neutral-800" strokeDasharray="2 2" />
            ))}
            {[55, 85, 115, 145, 175, 205].map((x, i) => (
              <line key={i} x1={x} y1="20" x2={x} y2="155" stroke="currentColor" className="text-slate-100 dark:text-neutral-800" strokeDasharray="2 2" />
            ))}

            {/* Axes */}
            <line x1="25" y1="155" x2="225" y2="155" stroke="currentColor" className="text-slate-300 dark:text-neutral-700" strokeWidth="1" />
            <line x1="25" y1="20" x2="25" y2="155" stroke="currentColor" className="text-slate-300 dark:text-neutral-700" strokeWidth="1" />

            {/* Bubble Data Points */}
            <circle cx="35" cy="138" r="5" className="fill-[#64B0C6]/70 dark:fill-[#38BDF8]/70 stroke-[#005B6E] dark:stroke-[#0284C7]" strokeWidth="1" />
            <circle cx="48" cy="134" r="7" className="fill-[#64B0C6]/70 dark:fill-[#38BDF8]/70 stroke-[#005B6E] dark:stroke-[#0284C7]" strokeWidth="1" />
            <circle cx="65" cy="98" r="6" className="fill-[#64B0C6]/70 dark:fill-[#38BDF8]/70 stroke-[#005B6E] dark:stroke-[#0284C7]" strokeWidth="1" />
            <circle cx="75" cy="116" r="13" className="fill-[#64B0C6]/60 dark:fill-[#38BDF8]/60 stroke-[#005B6E] dark:stroke-[#0284C7]" strokeWidth="1" />
            <circle cx="85" cy="126" r="4" className="fill-[#64B0C6]/70 dark:fill-[#38BDF8]/70 stroke-[#005B6E] dark:stroke-[#0284C7]" strokeWidth="1" />
            <circle cx="95" cy="112" r="7" className="fill-[#64B0C6]/70 dark:fill-[#38BDF8]/70 stroke-[#005B6E] dark:stroke-[#0284C7]" strokeWidth="1" />

            <circle cx="108" cy="106" r="10" className="fill-[#64B0C6]/60 dark:fill-[#38BDF8]/60 stroke-[#005B6E] dark:stroke-[#0284C7]" strokeWidth="1" />
            <circle cx="125" cy="100" r="15" className="fill-[#64B0C6]/50 dark:fill-[#38BDF8]/50 stroke-[#005B6E] dark:stroke-[#0284C7]" strokeWidth="1" />
            <circle cx="138" cy="108" r="5" className="fill-[#64B0C6]/70 dark:fill-[#38BDF8]/70 stroke-[#005B6E] dark:stroke-[#0284C7]" strokeWidth="1" />
            <circle cx="148" cy="122" r="4" className="fill-[#64B0C6]/70 dark:fill-[#38BDF8]/70 stroke-[#005B6E] dark:stroke-[#0284C7]" strokeWidth="1" />
            <circle cx="160" cy="82" r="17" className="fill-[#64B0C6]/50 dark:fill-[#38BDF8]/50 stroke-[#005B6E] dark:stroke-[#0284C7]" strokeWidth="1" />
            <circle cx="178" cy="96" r="11" className="fill-[#64B0C6]/60 dark:fill-[#38BDF8]/60 stroke-[#005B6E] dark:stroke-[#0284C7]" strokeWidth="1" />
            <circle cx="188" cy="110" r="8" className="fill-[#64B0C6]/70 dark:fill-[#38BDF8]/70 stroke-[#005B6E] dark:stroke-[#0284C7]" strokeWidth="1" />
            <circle cx="195" cy="76" r="9" className="fill-[#64B0C6]/70 dark:fill-[#38BDF8]/70 stroke-[#005B6E] dark:stroke-[#0284C7]" strokeWidth="1" />
            <circle cx="206" cy="90" r="12" className="fill-[#64B0C6]/60 dark:fill-[#38BDF8]/60 stroke-[#005B6E] dark:stroke-[#0284C7]" strokeWidth="1" />
            <circle cx="215" cy="60" r="10" className="fill-[#64B0C6]/70 dark:fill-[#38BDF8]/70 stroke-[#005B6E] dark:stroke-[#0284C7]" strokeWidth="1" />
            <circle cx="225" cy="46" r="7" className="fill-[#64B0C6]/70 dark:fill-[#38BDF8]/70 stroke-[#005B6E] dark:stroke-[#0284C7]" strokeWidth="1" />
          </svg>
        </div>
      </div>
    </div>
  );
}
