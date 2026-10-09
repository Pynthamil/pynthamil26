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
  const [isShiftedMiddle, setIsShiftedMiddle] = useState(false);

  useEffect(() => {
    let timer1: NodeJS.Timeout;
    let timer2: NodeJS.Timeout;
    let timerShift: NodeJS.Timeout;

    if (stage === "typing") {
      setIsFadingOut(false);
      setIsShiftedMiddle(false);

      // After 4 seconds, slowly move the prompt Lottie to the middle
      timerShift = setTimeout(() => {
        setIsShiftedMiddle(true);
      }, 4000);

      // Stage 1: Prompt typing (~5.8s total before loading)
      timer1 = setTimeout(() => {
        setStage("loading");
      }, 5800);
    } else if (stage === "loading") {
      // Stage 2: Loading animation (~2.2s)
      timer1 = setTimeout(() => {
        setStage("result");
      }, 2200);
    } else if (stage === "result") {
      // Stage 3: Display Artboard 1 GIF/video result
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
      clearTimeout(timerShift);
    };
  }, [stage]);

  return (
    <div className={`w-full h-full flex items-center justify-center relative overflow-hidden pt-12 sm:pt-14 ${className}`}>
      {stage === "typing" && (
        <div 
          className={`z-10 w-[92%] sm:w-[86%] my-auto flex items-center justify-center transition-transform duration-[1400ms] ease-in-out ${
            isShiftedMiddle 
              ? "translate-x-0 scale-95 sm:scale-100" 
              : "translate-x-[35%] sm:translate-x-[38%] scale-125 sm:scale-135"
          } animate-in fade-in duration-500`}
        >
          <LottiePlayer key={`prompt-${resetKey}`} src="/Prompt-typing.json" className="w-full h-auto drop-shadow-md" speed={0.7} loop={false} />
        </div>
      )}

      {stage === "loading" && (
        <div className="z-10 w-[24%] sm:w-[20%] max-w-[80px] flex items-center justify-center animate-in fade-in slide-in-from-bottom-4 duration-500">
          <LottiePlayer src="/loading.json" className="w-full h-auto drop-shadow-sm" speed={1} />
        </div>
      )}

      {stage === "result" && (
        <div className={`z-10 w-[80%] sm:w-[72%] md:w-[68%] my-auto flex items-center justify-center transition-opacity duration-600 ease-out ${isFadingOut ? "opacity-0" : "animate-in fade-in slide-in-from-bottom-4 duration-500"}`}>
          <video
            src="/artboard1.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-auto object-contain rounded-[4px] sm:rounded-[6px] drop-shadow-xl"
          />
        </div>
      )}
    </div>
  );
};
