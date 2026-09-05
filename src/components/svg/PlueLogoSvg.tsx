import React from "react";

export const PlueLogoSvg: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      viewBox="0 0 160 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="plue brand mascot and logo"
      className={className || "w-36 h-14"}
    >
      {/* Navy Blue Pot Mascot */}
      <g transform="translate(10, 10)">
        {/* Pot Body */}
        <path
          d="M6 14 C6 32 36 32 36 14 C36 12 34 10 32 10 L10 10 C8 10 6 12 6 14 Z"
          fill="#1e3a8a"
        />
        {/* Pot Rim / Collar */}
        <rect x="8" y="8" width="26" height="4" rx="2" fill="#fbbf24" />
        {/* White Button / Pearl */}
        <circle cx="21" cy="18" r="2.5" fill="#ffffff" />
      </g>

      {/* plue Typography */}
      <text
        x="60"
        y="37"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="30"
        fontWeight="500"
        letterSpacing="-0.03em"
        fill="#111827"
      >
        plue
      </text>
    </svg>
  );
};
