"use client";

import React, { useEffect, useRef } from "react";

interface AsciiMatrixBgProps {
  className?: string;
}

export const AsciiMatrixBg: React.FC<AsciiMatrixBgProps> = ({ className = "" }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const width = (canvas.width = rect.width * dpr);
      const height = (canvas.height = rect.height * dpr);

      // Deep ocean teal background
      ctx.fillStyle = "#073543";
      ctx.fillRect(0, 0, width, height);

      const fontSize = 12 * dpr;
      const cellWidth = 15 * dpr;
      const cellHeight = 16 * dpr;

      ctx.font = `${fontSize}px "SF Mono", Monaco, "Courier New", monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const cols = Math.floor(width / cellWidth);
      const rows = Math.floor(height / cellHeight);

      const cx = cols / 2;
      const cy = rows / 2;

      const chars = ["+", "·", ":", "×", "°", "░", "▒", "*", "•", "/", "\\"];

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const dx = c - cx;
          const dy = r - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const angle = Math.atan2(dy, dx);

          // 4-fold radial matrix wave equation
          const wave = Math.cos(dist * 0.22) * Math.cos(angle * 4);
          const val = (Math.sin(dist * 0.14 + wave * 2.2) + 1) / 2;

          const charIdx = Math.min(chars.length - 1, Math.floor(val * chars.length));
          const char = chars[charIdx];

          const alpha = 0.08 + val * 0.52;

          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.fillText(char, c * cellWidth + cellWidth / 2, r * cellHeight + cellHeight / 2);
        }
      }
    };

    render();

    const handleResize = () => {
      render();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full pointer-events-none ${className}`}
    />
  );
};
