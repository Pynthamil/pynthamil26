"use client";

import React, { useState } from "react";

interface DataPoint {
  year: number;
  active: number;
  highlighted?: boolean;
}

export function OrcaCoralVisuals() {
  const [hoveredYear, setHoveredYear] = useState<DataPoint | null>(null);

  // Active products over time dataset (matching Observable Plot Graveyard pattern)
  const activeData: DataPoint[] = [
    { year: 1997, active: 1 },
    { year: 1998, active: 2 },
    { year: 1999, active: 3 },
    { year: 2000, active: 5 },
    { year: 2001, active: 6 },
    { year: 2002, active: 14 },
    { year: 2003, active: 17 },
    { year: 2004, active: 20 },
    { year: 2005, active: 39 },
    { year: 2006, active: 52 },
    { year: 2007, active: 63 },
    { year: 2008, active: 80 },
    { year: 2009, active: 96 },
    { year: 2010, active: 109 },
    { year: 2011, active: 123 },
    { year: 2012, active: 114, highlighted: true },
    { year: 2013, active: 115, highlighted: true },
    { year: 2014, active: 114, highlighted: true },
    { year: 2015, active: 117, highlighted: true },
    { year: 2016, active: 119, highlighted: true },
    { year: 2017, active: 113, highlighted: true },
    { year: 2018, active: 118, highlighted: true },
    { year: 2019, active: 117, highlighted: true },
    { year: 2020, active: 81 },
    { year: 2021, active: 57 },
    { year: 2022, active: 25 },
    { year: 2023, active: 10 },
  ];

  // Map values 0 to 130 to Observable Plot Turbo colormap
  const getTurboColor = (val: number) => {
    const ratio = Math.min(1, Math.max(0, val / 125));
    if (ratio < 0.15) return "#46327E"; // Deep indigo/purple
    if (ratio < 0.35) return "#365C8D"; // Blue
    if (ratio < 0.55) return "#27AD81"; // Teal/Green
    if (ratio < 0.75) return "#7AD151"; // Lime/Yellow
    if (ratio < 0.9) return "#FDE725"; // Bright yellow
    if (ratio < 0.96) return "#F89D15"; // Orange
    return "#D9381E"; // Deep Red
  };

  // Dimensions matching Observable Plot defaults
  const width = 900;
  const height = 480;
  const padding = { top: 50, right: 40, bottom: 60, left: 60 };

  const getX = (year: number) =>
    padding.left + ((year - 1997) / (2023 - 1997)) * (width - padding.left - padding.right);
  const getY = (val: number) =>
    height - padding.bottom - (val / 135) * (height - padding.top - padding.bottom);

  return (
    <div className="w-full overflow-hidden bg-[#F5F5F7] dark:bg-[#18181B] text-[#334155] dark:text-[#CBD5E1] rounded-lg p-4 sm:p-6 font-mono text-xs shadow-sm border border-neutral-200 dark:border-neutral-800">
      
      {/* Top Legend Header (Observable Plot Style) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div className="space-y-1">
          <div className="text-[11px] uppercase tracking-widest text-slate-500 dark:text-[#777]">
            Active Count
          </div>
          <div className="w-64 h-3 rounded-sm bg-gradient-to-r from-[#46327E] via-[#365C8D] via-[#27AD81] via-[#7AD151] via-[#FDE725] via-[#F89D15] to-[#D9381E]" />
          <div className="flex justify-between text-[10px] text-slate-500 dark:text-[#777] w-64 pt-0.5">
            <span>0</span>
            <span>50</span>
            <span>100+</span>
          </div>
        </div>

        {/* Warning Icon Marker */}
        <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded text-[11px]">
          <span>⚠️</span>
          <span>Peak Churn Era (2012–2019)</span>
        </div>
      </div>

      {/* Main SVG Plot */}
      <div className="relative w-full overflow-x-auto select-none">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto min-w-[700px] block">
          
          {/* Outer Frame */}
          <rect
            x={padding.left}
            y={padding.top}
            width={width - padding.left - padding.right}
            height={height - padding.top - padding.bottom}
            fill="none"
            className="stroke-slate-300 dark:stroke-[#555]"
            strokeWidth="1"
          />

          {/* Grid lines (Y) */}
          {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130].map((val) => {
            const y = getY(val);
            return (
              <g key={val}>
                <line
                  x1={padding.left}
                  y1={y}
                  x2={width - padding.right}
                  y2={y}
                  className="stroke-slate-200 dark:stroke-[#26282E]"
                  strokeWidth="0.8"
                />
                <text
                  x={padding.left - 10}
                  y={y + 3.5}
                  className="fill-slate-500 dark:fill-[#777]"
                  fontSize="10"
                  textAnchor="end"
                  fontFamily="monospace"
                >
                  {val}
                </text>
              </g>
            );
          })}

          {/* Grid lines & ticks (X) */}
          {[1998, 2000, 2002, 2004, 2006, 2008, 2010, 2012, 2014, 2016, 2018, 2020, 2022].map((yr) => {
            const x = getX(yr);
            return (
              <g key={yr}>
                <line
                  x1={x}
                  y1={padding.top}
                  x2={x}
                  y2={height - padding.bottom}
                  className="stroke-slate-200 dark:stroke-[#26282E]"
                  strokeWidth="0.8"
                />
                <text
                  x={x}
                  y={height - padding.bottom + 18}
                  className="fill-slate-500 dark:fill-[#777]"
                  fontSize="10"
                  textAnchor="middle"
                  fontFamily="monospace"
                >
                  {yr}
                </text>
              </g>
            );
          })}

          {/* Y Axis Title */}
          <text
            x={padding.left}
            y={padding.top - 15}
            className="fill-slate-700 dark:fill-[#B4B4B4]"
            fontSize="11"
            fontFamily="monospace"
          >
            ↑ Active Products
          </text>

          {/* X Axis Title */}
          <text
            x={width - padding.right}
            y={height - 15}
            className="fill-slate-700 dark:fill-[#B4B4B4]"
            fontSize="11"
            textAnchor="end"
            fontFamily="monospace"
          >
            Year →
          </text>

          {/* Red shaded highlight block for 2012-2014 */}
          <rect
            x={getX(2012)}
            y={getY(114)}
            width={getX(2014) - getX(2012)}
            height={getY(0) - getY(114)}
            fill="#D9381E"
            fillOpacity="0.15"
          />

          {/* Red shaded highlight block for 2015-2019 */}
          <rect
            x={getX(2015)}
            y={getY(117)}
            width={getX(2019) - getX(2015)}
            height={getY(0) - getY(117)}
            fill="#D9381E"
            fillOpacity="0.15"
          />

          {/* Red peak line connector for 2012-2014 & 2015-2019 */}
          <line
            x1={getX(2012)}
            y1={getY(114)}
            x2={getX(2014)}
            y2={getY(114)}
            stroke="#D9381E"
            strokeWidth="2.5"
          />
          <line
            x1={getX(2015)}
            y1={getY(117)}
            x2={getX(2019)}
            y2={getY(117)}
            stroke="#D9381E"
            strokeWidth="2.5"
          />

          {/* Data Points (Dots with white stroke ring) */}
          {activeData.map((d) => {
            const x = getX(d.year);
            const y = getY(d.active);
            const color = getTurboColor(d.active);
            const isHovered = hoveredYear?.year === d.year;

            return (
              <g key={d.year} className="cursor-pointer" onMouseEnter={() => setHoveredYear(d)} onMouseLeave={() => setHoveredYear(null)}>
                <circle
                  cx={x}
                  cy={y}
                  r={isHovered ? 6 : 4.5}
                  fill={color}
                  stroke="#FFFFFF"
                  strokeWidth="1.2"
                />
              </g>
            );
          })}
        </svg>

        {/* Hover Tooltip */}
        {hoveredYear && (
          <div
            className="absolute z-20 pointer-events-none bg-white dark:bg-[#0D0D0D] border border-slate-200 dark:border-neutral-700 text-slate-800 dark:text-white rounded p-2.5 shadow-lg text-xs font-mono"
            style={{
              left: `${(getX(hoveredYear.year) / width) * 100}%`,
              top: `${(getY(hoveredYear.active) / height) * 100}%`,
              transform: "translate(-50%, -120%)",
            }}
          >
            <div>Year: {hoveredYear.year}</div>
            <div className="font-bold text-amber-600 dark:text-amber-400">Active Products: {hoveredYear.active}</div>
          </div>
        )}
      </div>
    </div>
  );
}
