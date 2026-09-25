"use client";

import React, { useRef, useEffect, useState } from "react";

interface ChromaVideoProps {
  src: string;
  className?: string;
  cropRatio?: number;
  zoom?: number;
}

export function ChromaVideo({ src, className = "", cropRatio = 1.0, zoom }: ChromaVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    let animId: number;
    let isCancelled = false;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (entry.isIntersecting) {
          video.play().catch(() => {});
          scheduleNextFrame();
        } else {
          video.pause();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    const scheduleNextFrame = () => {
      if (isCancelled || !isVisible) return;
      if ("requestVideoFrameCallback" in video) {
        (video as any).requestVideoFrameCallback(processFrame);
      } else {
        animId = requestAnimationFrame(processFrame);
      }
    };

    const processFrame = () => {
      if (isCancelled || !isVisible) return;

      if (video.readyState >= 2 && video.videoWidth > 0 && video.videoHeight > 0) {
        if (!isLoaded) setIsLoaded(true);

        const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1;
        const effectiveZoom = zoom ?? 1.0;
        
        // Square 1:1 presentation with optional zoom: sample from center
        const sHeight = Math.round(video.videoHeight / effectiveZoom);
        const sWidth = Math.min(video.videoWidth, Math.round(sHeight * cropRatio));
        const sx = Math.max(0, Math.round((video.videoWidth - sWidth) / 2));
        const sy = Math.max(0, Math.round((video.videoHeight - sHeight) / 2));

        const displayWidth = Math.round((canvas.clientWidth || 530) * dpr);
        const displayHeight = Math.round(displayWidth * (sHeight / sWidth));

        if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
          canvas.width = displayWidth;
          canvas.height = displayHeight;
        }

        ctx.drawImage(video, sx, sy, sWidth, sHeight, 0, 0, displayWidth, displayHeight);
        const imgData = ctx.getImageData(0, 0, displayWidth, displayHeight);
        const data = imgData.data;
        const len = data.length;

        // Pink canvas thresholding:
        // In the exported video, the pink background has:
        // r: ~240-255, g: ~210-235, b: ~215-240
        // (r - g) >= 10 and (r - b) >= 6 and r > 215
        for (let i = 0; i < len; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          if (r > 215 && g > 180 && b > 185 && r - g > 10 && r - b > 6) {
            data[i + 3] = 0; // Alpha transparent
          }
        }

        ctx.putImageData(imgData, 0, 0);
      }

      scheduleNextFrame();
    };

    // Removed unconditional video.play() to enforce true lazy loading
    scheduleNextFrame();

    return () => {
      isCancelled = true;
      observer.disconnect();
      if (animId) cancelAnimationFrame(animId);
    };
  }, [src, zoom, cropRatio, isLoaded]);

  return (
    <div className={`relative w-full ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-[#6666FF]/30 border-t-[#6666FF] rounded-full animate-spin"></div>
        </div>
      )}
      <video
        ref={videoRef}
        src={src}
        loop
        muted
        playsInline
        preload="none"
        className="hidden"
        onCanPlay={() => setIsLoaded(true)}
      />
      <canvas
        ref={canvasRef}
        className={`w-full min-h-[300px] h-auto block transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ imageRendering: "auto" }}
      />
    </div>
  );
}
