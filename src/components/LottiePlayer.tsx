"use client";

import React, { useEffect, useState } from "react";
import { Lottie } from "lottie-react";

interface LottiePlayerProps {
  src: string | object;
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
  speed?: number;
}

export const LottiePlayer: React.FC<LottiePlayerProps> = ({
  src,
  className = "",
  loop = true,
  autoplay = true,
  speed = 0.7,
}) => {
  const [animationData, setAnimationData] = useState<any>(
    typeof src === "object" ? src : null
  );

  useEffect(() => {
    if (typeof src !== "string") {
      setAnimationData(src);
      return;
    }

    let isMounted = true;
    const jsonUrl = src.endsWith(".lottie")
      ? src.replace(/\.lottie$/i, ".json")
      : src;

    fetch(jsonUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (isMounted) {
          setAnimationData(data);
        }
      })
      .catch((err) => {
        console.error("Failed to load Lottie animation JSON:", err);
      });

    return () => {
      isMounted = false;
    };
  }, [src]);

  if (!animationData) {
    return (
      <div className={`w-full h-full min-h-[40px] animate-pulse ${className}`} />
    );
  }

  return (
    <Lottie
      src={animationData}
      loop={loop}
      autoplay={autoplay}
      className={className}
      speed={speed}
    />
  );
};
