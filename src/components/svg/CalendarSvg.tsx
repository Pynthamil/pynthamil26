import React from "react";

export const CalendarSvg: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      viewBox="0 0 280 230"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Activity and Habit Calendar Grid"
      className={className || "w-full max-w-[280px] h-auto"}
    >
      {/* Background Card */}
      <rect
        x="0"
        y="0"
        width="280"
        height="230"
        rx="20"
        fill="#f7f6f4"
        stroke="#e5e5ea"
        strokeWidth="1"
      />

      {/* Days of Week Header */}
      <g
        fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', sans-serif"
        fontSize="10"
        fontWeight="600"
        fill="#6b7280"
        textAnchor="middle"
      >
        <text x="32" y="32">Sun</text>
        <text x="68" y="32">Mon</text>
        <text x="104" y="32">Tue</text>
        <text x="140" y="32">Wed</text>
        <text x="176" y="32">Thu</text>
        <text x="212" y="32">Fri</text>
        <text x="248" y="32">Sat</text>
      </g>

      {/* Grid Rows */}
      {/* Row 1 (y = 48) */}
      <rect x="18" y="48" width="28" height="28" rx="6" fill="#e5e7eb" />
      <rect x="54" y="48" width="28" height="28" rx="6" fill="#e5e7eb" />
      <rect x="90" y="48" width="28" height="28" rx="6" fill="#0022cc" />
      <rect x="126" y="48" width="28" height="28" rx="6" fill="#c7d2fe" />
      <rect x="162" y="48" width="28" height="28" rx="6" fill="#818cf8" />
      <rect x="198" y="48" width="28" height="28" rx="6" fill="#e5e7eb" />
      <rect x="234" y="48" width="28" height="28" rx="6" fill="#c7d2fe" />

      {/* Row 2 (y = 82) */}
      <rect x="18" y="82" width="28" height="28" rx="6" fill="#818cf8" />
      <rect x="54" y="82" width="28" height="28" rx="6" fill="#e5e7eb" />
      <rect x="90" y="82" width="28" height="28" rx="6" fill="#c7d2fe" />
      <rect x="126" y="82" width="28" height="28" rx="6" fill="#e5e7eb" />
      <rect x="162" y="82" width="28" height="28" rx="6" fill="#0022cc" />
      <rect x="198" y="82" width="28" height="28" rx="6" fill="#818cf8" />
      <rect x="234" y="82" width="28" height="28" rx="6" fill="#818cf8" />

      {/* Row 3 (y = 116) */}
      <rect x="18" y="116" width="28" height="28" rx="6" fill="#c7d2fe" />
      <rect x="54" y="116" width="28" height="28" rx="6" fill="#e5e7eb" />
      <rect x="90" y="116" width="28" height="28" rx="6" fill="#0022cc" />
      <rect x="126" y="116" width="28" height="28" rx="6" fill="#0022cc" />
      <rect x="162" y="116" width="28" height="28" rx="6" fill="#e5e7eb" />
      <rect x="198" y="116" width="28" height="28" rx="6" fill="#c7d2fe" />
      <rect x="234" y="116" width="28" height="28" rx="6" fill="#e5e7eb" />

      {/* Row 4 (y = 150) */}
      <rect x="18" y="150" width="28" height="28" rx="6" fill="#e5e7eb" />
      <rect x="54" y="150" width="28" height="28" rx="6" fill="#0022cc" />
      <rect x="90" y="150" width="28" height="28" rx="6" fill="#c7d2fe" />
      <rect x="126" y="150" width="28" height="28" rx="6" fill="#818cf8" />
      <rect x="162" y="150" width="28" height="28" rx="6" fill="#0022cc" />
      <rect x="198" y="150" width="28" height="28" rx="6" fill="#818cf8" />
      <rect x="234" y="150" width="28" height="28" rx="6" fill="#c7d2fe" />

      {/* Row 5 (y = 184) */}
      <rect x="18" y="184" width="28" height="28" rx="6" fill="#0022cc" />
      <rect x="54" y="184" width="28" height="28" rx="6" fill="#818cf8" />
      <rect x="90" y="184" width="28" height="28" rx="6" fill="#c7d2fe" />
    </svg>
  );
};
