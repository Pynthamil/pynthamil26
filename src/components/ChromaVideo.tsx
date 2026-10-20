"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";

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
  const isVisibleRef = useRef(false);

  const drawChromaFrame = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    if (video.readyState >= 2 && video.videoWidth > 0 && video.videoHeight > 0) {
      const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 1.5) : 1;
      const effectiveZoom = zoom ?? 1.0;

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

      // Chromakey pinkish/reddish background pixels (including edge anti-aliasing)
      for (let i = 0; i < len; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        if (r > 175 && g > 130 && b > 130 && r - g > 10 && r - b > 8) {
          data[i + 3] = 0;
        }
      }

      ctx.putImageData(imgData, 0, 0);
    }
  }, [cropRatio, zoom]);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    let animId: number;
    let isCancelled = false;

    const scheduleNextFrame = () => {
      if (isCancelled || !isVisibleRef.current) return;
      drawChromaFrame();
      if ("requestVideoFrameCallback" in video) {
        (video as any).requestVideoFrameCallback(scheduleNextFrame);
      } else {
        animId = requestAnimationFrame(scheduleNextFrame);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
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

    const handleLoadedMetadata = () => {
      setIsLoaded(true);
      if (isVisibleRef.current) {
        video.play().catch(() => {});
      }
      drawChromaFrame();
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    // Try auto-play immediately if ready
    video.play().catch(() => {});
    if (video.readyState >= 2) {
      setIsLoaded(true);
      drawChromaFrame();
    }

    return () => {
      isCancelled = true;
      observer.disconnect();
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      if (animId) cancelAnimationFrame(animId);
    };
  }, [src, drawChromaFrame]);

  return (
    <div className={`relative w-full rounded-none overflow-hidden bg-[#F5F5F7] dark:bg-[#18181B] p-2 sm:p-4 shadow-sm ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#F5F5F7] dark:bg-[#18181B] z-20 rounded-none">
          <div className="w-8 h-8 border-4 border-[#6666FF]/30 border-t-[#6666FF] rounded-full animate-spin"></div>
        </div>
      )}
      <video
        ref={videoRef}
        src={src}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="hidden"
        onCanPlay={() => {
          setIsLoaded(true);
          videoRef.current?.play().catch(() => {});
        }}
        onLoadedData={() => {
          setIsLoaded(true);
          videoRef.current?.play().catch(() => {});
        }}
      />
      <canvas
        ref={canvasRef}
        className={`w-full min-h-[300px] h-auto block rounded-none transition-opacity duration-500 bg-[#F5F5F7] dark:bg-[#18181B] ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ imageRendering: "auto" }}
      />
    </div>
  );
}
