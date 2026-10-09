"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

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
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentTimeStr, setCurrentTimeStr] = useState("0:00");
  const [durationStr, setDurationStr] = useState("0:00");

  const isVisibleRef = useRef(false);

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || !isFinite(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const togglePlay = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

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

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video || !video.duration) return;
    const seekPercent = parseFloat(e.target.value);
    const newTime = (seekPercent / 100) * video.duration;
    video.currentTime = newTime;
    setProgress(seekPercent);
    setCurrentTimeStr(formatTime(newTime));
    requestAnimationFrame(drawChromaFrame);
  };

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
          video.play().then(() => setIsPlaying(true)).catch(() => {});
          scheduleNextFrame();
        } else {
          video.pause();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    const handleTimeUpdate = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
        setCurrentTimeStr(formatTime(video.currentTime));
      }
    };

    const handleLoadedMetadata = () => {
      setIsLoaded(true);
      setDurationStr(formatTime(video.duration));
      if (isVisibleRef.current) {
        video.play().then(() => setIsPlaying(true)).catch(() => {});
      }
      drawChromaFrame();
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);

    // Try auto-play immediately if ready
    video.play().then(() => setIsPlaying(true)).catch(() => {});
    if (video.readyState >= 2) {
      setIsLoaded(true);
      setDurationStr(formatTime(video.duration));
      drawChromaFrame();
    }

    return () => {
      isCancelled = true;
      observer.disconnect();
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      if (animId) cancelAnimationFrame(animId);
    };
  }, [src, drawChromaFrame]);

  return (
    <div className={`group relative w-full rounded-sm overflow-hidden bg-[#F5F5F7] dark:bg-[#18181B] p-2 sm:p-4 shadow-sm ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#F5F5F7] dark:bg-[#18181B] z-20">
          <div className="w-8 h-8 border-4 border-[#6666FF]/30 border-t-[#6666FF] rounded-full animate-spin"></div>
        </div>
      )}
      <video
        ref={videoRef}
        src={src}
        autoPlay
        loop
        muted={isMuted}
        playsInline
        preload="auto"
        className="hidden"
        onCanPlay={() => {
          setIsLoaded(true);
          videoRef.current?.play().then(() => setIsPlaying(true)).catch(() => {});
        }}
        onLoadedData={() => {
          setIsLoaded(true);
          videoRef.current?.play().then(() => setIsPlaying(true)).catch(() => {});
        }}
      />
      <canvas
        ref={canvasRef}
        className={`w-full min-h-[300px] h-auto block rounded-sm transition-opacity duration-500 cursor-pointer bg-[#F5F5F7] dark:bg-[#18181B] ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ imageRendering: "auto" }}
        onClick={togglePlay}
      />

      {/* Media Controls Bar - Minimal Pill */}
      <div 
        className="absolute bottom-3 left-3 right-3 sm:left-4 sm:right-4 z-30 bg-black/65 dark:bg-black/80 backdrop-blur-md border border-white/10 rounded-full px-3 py-1.5 flex items-center gap-2.5 text-white transition-all duration-300 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={togglePlay}
          className="hover:text-[#6666FF] text-white/90 transition-colors p-1 rounded-full focus:outline-none flex-shrink-0"
          title={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
        </button>

        <span className="text-[11px] font-mono text-white/70 min-w-[32px] select-none text-right">
          {currentTimeStr}
        </span>

        <input
          type="range"
          min="0"
          max="100"
          step="0.1"
          value={progress}
          onChange={handleSeek}
          onClick={(e) => e.stopPropagation()}
          className="w-full h-1 bg-white/20 hover:bg-white/30 rounded-lg appearance-none cursor-pointer accent-[#6666FF] transition-colors"
        />

        <span className="text-[11px] font-mono text-white/50 min-w-[32px] select-none">
          {durationStr}
        </span>

        <button
          type="button"
          onClick={toggleMute}
          className="hover:text-[#6666FF] text-white/90 transition-colors p-1 rounded-full focus:outline-none flex-shrink-0"
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  );
}
