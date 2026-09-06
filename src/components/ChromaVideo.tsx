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
  const [isPlaying, setIsPlaying] = useState(false);

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
        setIsPlaying(true);
      }

      scheduleNextFrame();
    };

    video.play().catch(() => {});
    scheduleNextFrame();

    return () => {
      isCancelled = true;
      observer.disconnect();
      if (animId) cancelAnimationFrame(animId);
    };
  }, [src]);

  return (
    <div className={`relative w-full ${className}`}>
      <video
        ref={videoRef}
        src={src}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="hidden"
      />
      <canvas
        ref={canvasRef}
        className="w-full h-auto block"
        style={{ imageRendering: "auto" }}
      />
    </div>
  );
}
