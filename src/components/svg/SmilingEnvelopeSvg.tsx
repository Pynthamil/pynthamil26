import React from "react";

export const SmilingEnvelopeSvg: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      viewBox="0 0 140 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Happy Smiling Mail Envelope Mascot"
      className={className || "w-28 h-20 drop-shadow-md"}
    >
      {/* Outer Envelope Body */}
      <rect
        x="2"
        y="2"
        width="136"
        height="92"
        rx="16"
        fill="#ff5722"
        stroke="#f97316"
        strokeWidth="2"
      />

      {/* Seam fold lines */}
      <path
        d="M6 8 L70 54 L134 8"
        stroke="#ffffff"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 88 L54 48"
        stroke="#ffffff"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M134 88 L86 48"
        stroke="#ffffff"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Cheerful Smiley Face */}
      {/* Left eye */}
      <path
        d="M50 42 Q56 34 62 42"
        stroke="#111827"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      {/* Right eye */}
      <path
        d="M78 42 Q84 34 90 42"
        stroke="#111827"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      {/* Smile mouth */}
      <path
        d="M65 52 Q70 58 75 52"
        stroke="#111827"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
};
