import React from "react";

export const MobileAppSvg: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      viewBox="0 0 240 390"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Mobile Deadline Tracker Timeline App"
      className={className || "w-full max-w-[220px] h-auto drop-shadow-xl"}
    >
      <defs>
        {/* Sky gradient in top header */}
        <linearGradient id="phoneSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4151f7" />
          <stop offset="100%" stopColor="#6270fa" />
        </linearGradient>

        {/* Bezel shadow / gradient */}
        <linearGradient id="bezelGrad" x1="0" y1="0" x2="240" y2="390">
          <stop offset="0%" stopColor="#2e3036" />
          <stop offset="100%" stopColor="#1a1b1e" />
        </linearGradient>

        {/* Drop shadow filter for floating elements */}
        <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.12" />
        </filter>

        <clipPath id="screenClip">
          <rect x="10" y="10" width="220" height="370" rx="30" />
        </clipPath>
      </defs>

      {/* Outer Phone Hardware Bezel */}
      <rect
        x="2"
        y="2"
        width="236"
        height="386"
        rx="38"
        fill="url(#bezelGrad)"
        stroke="#45474f"
        strokeWidth="2.5"
      />

      {/* Screen Area (Clipped) */}
      <g clipPath="url(#screenClip)">
        {/* Screen Background */}
        <rect x="10" y="10" width="220" height="370" fill="#ffffff" />

        {/* Top Header with Blue Gradient Curve */}
        <path
          d="M10 10 H230 V62 C190 76 150 78 120 78 C90 78 50 76 10 62 Z"
          fill="url(#phoneSky)"
        />

        {/* Clock Sticker Badge in Header */}
        <g transform="translate(120, 68)" filter="url(#softShadow)">
          {/* Outer Pink Ring */}
          <circle cx="0" cy="0" r="16" fill="#fbcfe8" />
          {/* Inner Yellow Clock Face */}
          <circle cx="0" cy="0" r="13" fill="#fde047" />
          {/* Clock Hands */}
          <circle cx="0" cy="0" r="1.5" fill="#4338ca" />
          <line x1="0" y1="0" x2="0" y2="-6" stroke="#4338ca" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="0" y1="0" x2="4.5" y2="1.5" stroke="#4338ca" strokeWidth="1.5" strokeLinecap="round" />
        </g>

        {/* Vertical Timeline Track Line */}
        <line
          x1="36"
          y1="104"
          x2="36"
          y2="300"
          stroke="#4e5df8"
          strokeWidth="1.75"
          strokeLinecap="round"
        />

        {/* ----------------- Timeline Item 1 ----------------- */}
        <g transform="translate(0, 108)">
          <circle cx="36" cy="0" r="4.5" fill="#ffffff" stroke="#4e5df8" strokeWidth="2" />
          <text x="50" y="2" fontFamily="Inter, sans-serif" fontSize="10.5" fontWeight="700" fill="#111827">
            Today
          </text>
          <text x="50" y="14" fontFamily="Inter, sans-serif" fontSize="7.5" fontWeight="500" fill="#4b5563">
            Reply back the status
          </text>
          <text x="50" y="24" fontFamily="Inter, sans-serif" fontSize="7.5" fontWeight="500" fill="#4b5563">
            update to Company Name
          </text>
          <text x="50" y="34" fontFamily="Inter, sans-serif" fontSize="7.5" fontWeight="500" fill="#4b5563">
            by today 5pm
          </text>
        </g>

        {/* ----------------- Timeline Item 2 ----------------- */}
        <g transform="translate(0, 160)">
          <circle cx="36" cy="0" r="4.5" fill="#ffffff" stroke="#4e5df8" strokeWidth="2" />
          <text x="50" y="2" fontFamily="Inter, sans-serif" fontSize="10.5" fontWeight="700" fill="#111827">
            Today
          </text>
          <text x="50" y="14" fontFamily="Inter, sans-serif" fontSize="7.5" fontWeight="500" fill="#4b5563">
            Reply back the status
          </text>
          <text x="50" y="24" fontFamily="Inter, sans-serif" fontSize="7.5" fontWeight="500" fill="#4b5563">
            update to Company Name
          </text>
          <text x="50" y="34" fontFamily="Inter, sans-serif" fontSize="7.5" fontWeight="500" fill="#4b5563">
            by today 5pm
          </text>
        </g>

        {/* ----------------- Timeline Item 3 ----------------- */}
        <g transform="translate(0, 212)">
          <circle cx="36" cy="0" r="4.5" fill="#ffffff" stroke="#4e5df8" strokeWidth="2" />
          <text x="50" y="2" fontFamily="Inter, sans-serif" fontSize="10.5" fontWeight="700" fill="#111827">
            Today
          </text>
          <text x="50" y="14" fontFamily="Inter, sans-serif" fontSize="7.5" fontWeight="500" fill="#4b5563">
            Reply back the status
          </text>
          <text x="50" y="24" fontFamily="Inter, sans-serif" fontSize="7.5" fontWeight="500" fill="#4b5563">
            update to Company Name
          </text>
          <text x="50" y="34" fontFamily="Inter, sans-serif" fontSize="7.5" fontWeight="500" fill="#4b5563">
            by today 5pm
          </text>
        </g>

        {/* ----------------- Timeline Item 4 ----------------- */}
        <g transform="translate(0, 264)">
          <circle cx="36" cy="0" r="4.5" fill="#ffffff" stroke="#4e5df8" strokeWidth="2" />
          <text x="50" y="2" fontFamily="Inter, sans-serif" fontSize="10.5" fontWeight="700" fill="#111827">
            Today
          </text>
          <text x="50" y="14" fontFamily="Inter, sans-serif" fontSize="7.5" fontWeight="500" fill="#4b5563">
            Reply back the status
          </text>
          <text x="50" y="24" fontFamily="Inter, sans-serif" fontSize="7.5" fontWeight="500" fill="#4b5563">
            update to Company Name
          </text>
          <text x="50" y="34" fontFamily="Inter, sans-serif" fontSize="7.5" fontWeight="500" fill="#4b5563">
            by today 5pm
          </text>
        </g>

        {/* Bottom Search Bar */}
        <g transform="translate(24, 320)">
          {/* Search Pill Background */}
          <rect
            x="0"
            y="0"
            width="192"
            height="26"
            rx="13"
            fill="#ffffff"
            stroke="#e5e7eb"
            strokeWidth="1"
          />
          <text
            x="14"
            y="17"
            fontFamily="Inter, sans-serif"
            fontSize="8.5"
            fontWeight="500"
            fill="#6b7280"
          >
            Find the closest deadlines
          </text>
          {/* Blue (x) Dismiss Button */}
          <circle cx="178" cy="13" r="6.5" fill="#4e5df8" />
          <line x1="175" y1="10" x2="181" y2="16" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="181" y1="10" x2="175" y2="16" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" />
        </g>

        {/* Home Indicator Bar */}
        <rect x="85" y="360" width="70" height="3.5" rx="1.75" fill="#111827" />
      </g>
    </svg>
  );
};
