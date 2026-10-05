"use client";

import React, { useEffect, useRef } from "react";

interface StippleWaveBgProps {
  className?: string;
}

export const StippleWaveBg: React.FC<StippleWaveBgProps> = ({ className = "" }) => {
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

      const cx = width / 2;
      const cy = height / 2;
      const maxR = Math.min(width, height) * 0.48;

      const numAttempts = 18000;

      for (let i = 0; i < numAttempts; i++) {
        const angle = Math.random() * Math.PI * 2;
        // Radial distribution
        const r = Math.pow(Math.random(), 0.7) * Math.max(width, height) * 0.65;

        // Chladni 4-fold resonance wave form
        const wavePetal = maxR * (0.42 + 0.28 * Math.cos(4 * angle));
        const distPetal = Math.abs(r - wavePetal);
        const inPetal = distPetal < maxR * 0.11;

        // Central core
        const inCore = r < maxR * 0.16;

        // Inner ring
        const distInner = Math.abs(r - maxR * 0.26);
        const inInner = distInner < maxR * 0.04;

        // Outer corner lobes
        const waveOuter = maxR * (0.82 + 0.18 * Math.cos(4 * angle));
        const distOuter = Math.abs(r - waveOuter);
        const inOuter = distOuter < maxR * 0.09;

        let density = 0.03; // Base ambient stipple

        if (inCore) {
          density = Math.pow(1 - r / (maxR * 0.16), 1.5);
        } else if (inInner) {
          density = (1 - distInner / (maxR * 0.04)) * 0.75;
        } else if (inPetal) {
          density = Math.pow(1 - distPetal / (maxR * 0.11), 1.2) * 0.95;
        } else if (inOuter) {
          density = (1 - distOuter / (maxR * 0.09)) * 0.65;
        }

        if (Math.random() < density) {
          const jitterX = (Math.random() - 0.5) * 3 * dpr;
          const jitterY = (Math.random() - 0.5) * 3 * dpr;
          const x = cx + r * Math.cos(angle) * dpr + jitterX;
          const y = cy + r * Math.sin(angle) * dpr + jitterY;

          const dotSize = (Math.random() < 0.85 ? 0.9 : 1.4) * dpr;
          const alpha = 0.2 + Math.random() * 0.75;

          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.beginPath();
          ctx.arc(x, y, dotSize, 0, Math.PI * 2);
          ctx.fill();
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
