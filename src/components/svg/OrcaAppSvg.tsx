import React from "react";

export const OrcaAppSvg: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      viewBox="0 0 420 250"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="AI Orcas Research Document and Chart Interface"
      className={className || "w-full max-w-[420px] h-auto"}
    >
      <defs>
        <clipPath id="orcaAppClip">
          <rect x="0" y="0" width="420" height="250" rx="14" />
        </clipPath>
      </defs>

      {/* Main Container */}
      <g clipPath="url(#orcaAppClip)">
        {/* Outer background */}
        <rect x="0" y="0" width="420" height="250" fill="#ffffff" stroke="#e5e7eb" strokeWidth="1.5" />

        {/* Left Sidebar */}
        <rect x="0" y="0" width="140" height="250" fill="#f8f6f0" />
        <line x1="140" y1="0" x2="140" y2="250" stroke="#eae5d6" strokeWidth="1" />

        {/* Sidebar Nav Items */}
        <g fontFamily="Inter, sans-serif" fontSize="8.5" fill="#374151">
          {/* New Chat */}
          <text x="14" y="24" fontWeight="700" fill="#111827">📁 + New Chat</text>

          {/* Search bar */}
          <rect x="14" y="34" width="112" height="18" rx="4" fill="#ffffff" stroke="#e0dbcb" />
          <text x="22" y="46" fontSize="7.5" fill="#9ca3af">🔍 Search Chat</text>

          {/* Chat History Header */}
          <text x="14" y="70" fontSize="7" fontWeight="700" fill="#9ca3af" letterSpacing="0.05em">
            CHAT HISTORY
          </text>

          {/* Active Item */}
          <rect x="12" y="78" width="116" height="18" rx="4" fill="#ebe4d3" />
          <text x="18" y="90" fontSize="7.5" fontWeight="600" fill="#111827">Captive Orcas History</text>

          {/* Inactive Item */}
          <text x="18" y="112" fontSize="7.5" fill="#6b7280">Coral Varieties</text>
        </g>

        {/* User Profile in Sidebar Bottom */}
        <g transform="translate(14, 218)">
          <line x1="-2" y1="-10" x2="114" y2="-10" stroke="#e5dfcf" />
          <circle cx="8" cy="8" r="8" fill="#d97706" />
          <text x="22" y="7" fontFamily="Inter, sans-serif" fontSize="7.5" fontWeight="600" fill="#111827">
            Pynthamil Pavendan
          </text>
          <text x="22" y="15" fontFamily="Inter, sans-serif" fontSize="6.5" fill="#6b7280">
            Creator UI
          </text>
        </g>

        {/* Right Content View */}
        <g transform="translate(150, 14)">
          {/* Top User Query Bubble */}
          <rect x="70" y="0" width="186" height="18" rx="9" fill="#e0f2fe" />
          <text
            x="163"
            y="12"
            fontFamily="Inter, sans-serif"
            fontSize="7.5"
            fontWeight="500"
            fill="#0369a1"
            textAnchor="middle"
          >
            tell me the statistics on captive orcas
          </text>

          {/* AI Response Header */}
          <text x="0" y="34" fontFamily="Inter, sans-serif" fontSize="8" fontWeight="700" fill="#111827">
            🗂️ Here are the statistics about captive orcas till 2025.
          </text>

          {/* Chart Panel */}
          <rect x="0" y="44" width="256" height="48" rx="6" fill="#f9fafb" stroke="#f3f4f6" />

          {/* Chart 1: Bar Chart */}
          <g transform="translate(16, 52)">
            <rect x="0" y="20" width="5" height="12" rx="1.5" fill="#0891b2" />
            <rect x="8" y="10" width="5" height="22" rx="1.5" fill="#0891b2" />
            <rect x="16" y="15" width="5" height="17" rx="1.5" fill="#0891b2" />
            <rect x="24" y="4" width="5" height="28" rx="1.5" fill="#0891b2" />
            <rect x="32" y="8" width="5" height="24" rx="1.5" fill="#0891b2" />
          </g>

          {/* Chart 2: Donut Chart */}
          <g transform="translate(118, 68)">
            <circle cx="0" cy="0" r="14" fill="none" stroke="#0891b2" strokeWidth="6" />
            <circle
              cx="0"
              cy="0"
              r="14"
              fill="none"
              stroke="#fbbf24"
              strokeWidth="6"
              strokeDasharray="28 60"
              strokeDashoffset="10"
            />
          </g>

          {/* Chart 3: Scatter Plot */}
          <g transform="translate(180, 52)">
            <circle cx="8" cy="8" r="2" fill="#0891b2" />
            <circle cx="16" cy="18" r="2.5" fill="#0891b2" />
            <circle cx="28" cy="6" r="2" fill="#0891b2" />
            <circle cx="38" cy="24" r="2.5" fill="#0891b2" />
            <circle cx="48" cy="14" r="2" fill="#0891b2" />
          </g>

          {/* Text Points */}
          <g fontFamily="Inter, sans-serif" fontSize="7" fill="#4b5563" transform="translate(0, 102)">
            <text x="0" y="0" fontWeight="700" fill="#111827">
              A particularly striking statistic
            </text>
            <text x="0" y="9">
              By 2019, approximately 78 orcas had been born in captivity since 1977, while 37 of them...
            </text>

            <text x="0" y="24" fontWeight="700" fill="#111827">
              Why 2020 is an important reference point
            </text>
            <text x="0" y="33">
              A major scientific review published in the Journal of Veterinary Behavior in 2020 demonstrated...
            </text>
          </g>

          {/* Bottom Prompt Bar */}
          <g transform="translate(0, 196)">
            <line x1="0" y1="0" x2="256" y2="0" stroke="#f3f4f6" />
            <text x="0" y="14" fontFamily="Inter, sans-serif" fontSize="7.5" fill="#9ca3af">
              Ask any question...
            </text>
            <text x="244" y="14" fontFamily="Inter, sans-serif" fontSize="7.5" fill="#9ca3af">
              ⏎
            </text>
          </g>
        </g>
      </g>
    </svg>
  );
};
