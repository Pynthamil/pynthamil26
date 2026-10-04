"use client";

import React, { useState, useEffect } from "react";
import { LottiePlayer } from "./LottiePlayer";

interface OrcaCardCoverProps {
  className?: string;
}

export const OrcaCardCover: React.FC<OrcaCardCoverProps> = ({ className = "" }) => {
  const [stage, setStage] = useState<"typing" | "loading" | "result">("typing");
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    let timer1: NodeJS.Timeout;
    let timer2: NodeJS.Timeout;

    if (stage === "typing") {
      setIsFadingOut(false);
      // Stage 1: Prompt typing & slide to middle (~5.2s)
      timer1 = setTimeout(() => {
        setStage("loading");
      }, 5200);
    } else if (stage === "loading") {
      // Stage 2: Loading animation (~2.2s)
      timer1 = setTimeout(() => {
        setStage("result");
      }, 2200);
    } else if (stage === "result") {
      // Stage 3: Display Artboard 1 GIF result (2x speed, ~10.9s playback), fade out smoothly, then loop back
      timer1 = setTimeout(() => {
        setIsFadingOut(true);
      }, 10400);

      timer2 = setTimeout(() => {
        setIsFadingOut(false);
        setResetKey((prev) => prev + 1);
        setStage("typing");
      }, 11000);
    }

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [stage]);

  return (
    <div className={`w-full h-full flex items-center justify-center relative overflow-hidden ${className}`}>
      {stage === "typing" && (
        <div className="z-10 w-[110%] sm:w-[115%] my-auto flex items-center justify-center animate-prompt-slide animate-in fade-in duration-600">
          <LottiePlayer key={`prompt-${resetKey}`} src="/Prompt-typing.json" className="w-full h-auto drop-shadow-md" speed={0.7} loop={false} />
        </div>
      )}

      {stage === "loading" && (
        <div className="z-10 w-[24%] sm:w-[20%] max-w-[80px] flex items-center justify-center animate-in fade-in slide-in-from-bottom-4 duration-500">
          <LottiePlayer src="/loading.json" className="w-full h-auto drop-shadow-sm" speed={1} />
        </div>
      )}

      {stage === "result" && (
        <div className={`z-10 w-[68%] sm:w-[62%] mt-7 sm:mt-9 h-auto flex items-center justify-center transition-opacity duration-600 ease-out ${isFadingOut ? "opacity-0" : "animate-in fade-in slide-in-from-bottom-4 duration-500"}`}>
          <img
            src={`/artboard1.gif?k=${resetKey}`}
            alt="ORCA Research Result"
            className="w-full h-auto object-contain rounded-[6px] drop-shadow-lg"
          />
        </div>
      )}
    </div>
  );
};
