"use client";

import React, { useState, useEffect } from "react";
import { Plus, Globe, Mic, ArrowUp, Sparkle, Sparkles } from "lucide-react";

interface OrcaCardCoverProps {
  className?: string;
}

type Stage =
  | "prompt_box"        // 1. Prompt box typing + Send button click
  | "transitioning"     // 2. User message moves up + searching literature
  | "streaming"         // 3. Word-by-word streaming of answer
  | "highlight"         // 4. Caret selection highlight & citation
  | "conclusion"        // 5. "Research faster with ORCA●" conclusion typewriter
  | "fade_out";         // 6. Smooth reset loop

const PROMPT_FULL = "How does ocean acidification affect coral reefs?";
const ANSWER_BEFORE_HL = "Ocean acidification reduces carbonate ions in seawater, ";
const ANSWER_HIGHLIGHT = "making it harder for corals to build and maintain their calcium-carbonate skeletons.";
const ANSWER_AFTER_HL = " This slows reef growth and increases reef erosion across global ecosystems.";
const ANSWER_FULL = ANSWER_BEFORE_HL + ANSWER_HIGHLIGHT + ANSWER_AFTER_HL;
const HL_WORDS = ANSWER_HIGHLIGHT.trim().split(" ");
const CONCLUSION_FULL = "Research faster with ORCA";

// Official Lucide-style GlobeCheck icon
const GlobeCheck = ({ className = "" }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Globe outer ring with cutout for checkmark */}
    <path d="M21.5 10.5A10 10 0 1 0 10.5 21.5" />
    {/* Longitude meridians */}
    <path d="M12 2a14.5 14.5 0 0 0 0 20" />
    <path d="M12 2a14.5 14.5 0 0 1 4 9.5" />
    {/* Equator */}
    <path d="M2 12h8.5" />
    {/* Verified Checkmark */}
    <path d="m16 16 2.5 2.5 4.5-4.5" strokeWidth="2.5" />
  </svg>
);

export const OrcaCardCover: React.FC<OrcaCardCoverProps> = ({ className = "" }) => {
  const [stage, setStage] = useState<Stage>("prompt_box");
  const [promptText, setPromptText] = useState("");
  const [streamCount, setStreamCount] = useState(0);
  const [highlightProgress, setHighlightProgress] = useState(0); // 0 to 1
  const [isSendPressed, setIsSendPressed] = useState(false);
  const [isAnswerSlidingUp, setIsAnswerSlidingUp] = useState(false);
  const [conclusionText, setConclusionText] = useState("");
  const [showConclusionDot, setShowConclusionDot] = useState(true);
  const [thinkingStep, setThinkingStep] = useState(0);
  const [loopKey, setLoopKey] = useState(0);

  // Reset state for new cycle
  useEffect(() => {
    setPromptText("");
    setStreamCount(0);
    setHighlightProgress(0);
    setIsSendPressed(false);
    setIsAnswerSlidingUp(false);
    setConclusionText("");
    setShowConclusionDot(true);
    setThinkingStep(0);
    setStage("prompt_box");
  }, [loopKey]);

  // Phase 1: Prompt box typewriter
  useEffect(() => {
    if (stage !== "prompt_box") return;
    let isMounted = true;
    let timer: NodeJS.Timeout;

    let pIdx = 0;
    const typePrompt = () => {
      if (!isMounted) return;
      if (pIdx <= PROMPT_FULL.length) {
        setPromptText(PROMPT_FULL.slice(0, pIdx));
        pIdx++;
        timer = setTimeout(typePrompt, 34);
      } else {
        // Prompt finished: trigger send button click animation
        timer = setTimeout(() => {
          if (!isMounted) return;
          setIsSendPressed(true);
          timer = setTimeout(() => {
            if (!isMounted) return;
            setIsSendPressed(false);
            setStage("transitioning");
          }, 300);
        }, 300);
      }
    };

    timer = setTimeout(typePrompt, 350);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [stage]);

  // Phase 3: Marine research thinking animation -> Streaming
  useEffect(() => {
    if (stage !== "transitioning") return;
    let isMounted = true;
    let stepTimer: NodeJS.Timeout;
    let streamTimer: NodeJS.Timeout;

    setThinkingStep(0);

    // Step 1 (~850ms): "Searching marine literature..."
    // Step 2 (~850ms): "Synthesizing 1,840+ ocean studies..."
    stepTimer = setTimeout(() => {
      if (isMounted) setThinkingStep(1);
    }, 850);

    // After 1700ms total thinking, smoothly transition to answer streaming
    streamTimer = setTimeout(() => {
      if (isMounted) setStage("streaming");
    }, 1700);

    return () => {
      isMounted = false;
      clearTimeout(stepTimer);
      clearTimeout(streamTimer);
    };
  }, [stage]);

  // Phase 4: Token / word streaming
  useEffect(() => {
    if (stage !== "streaming") return;
    let isMounted = true;
    let timer: NodeJS.Timeout;

    const words = ANSWER_FULL.split(" ");
    let currentWord = 0;

    const streamNext = () => {
      if (!isMounted) return;
      if (currentWord < words.length) {
        currentWord++;
        setStreamCount(currentWord);
        // Fast, realistic token stream
        const delay = 30 + Math.random() * 35;
        timer = setTimeout(streamNext, delay);
      } else {
        // Finished streaming, start highlight phase
        timer = setTimeout(() => {
          if (isMounted) setStage("highlight");
        }, 400);
      }
    };

    timer = setTimeout(streamNext, 150);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [stage]);

  // Phase 5: Answer highlight drag & citation reveal (Fixed continuous loop)
  useEffect(() => {
    if (stage !== "highlight") return;
    let isMounted = true;
    let animFrame: number;
    let holdTimer: NodeJS.Timeout;
    let slideTimer: NodeJS.Timeout;
    const startTime = Date.now();
    const duration = 800; // 800ms to sweep highlight across

    const animateHighlight = () => {
      if (!isMounted) return;
      const elapsed = Date.now() - startTime;
      const p = Math.min(1, elapsed / duration);
      // Cubic ease-out
      const eased = 1 - Math.pow(1 - p, 3);
      setHighlightProgress(eased);

      if (p < 1) {
        animFrame = requestAnimationFrame(animateHighlight);
      } else {
        // Hold final highlighted state for ~950ms, then glide up smoothly
        holdTimer = setTimeout(() => {
          if (!isMounted) return;
          setIsAnswerSlidingUp(true);

          // Give full 720ms for the exit glide and fade to complete before mounting conclusion
          slideTimer = setTimeout(() => {
            if (isMounted) setStage("conclusion");
          }, 720);
        }, 950);
      }
    };

    animFrame = requestAnimationFrame(animateHighlight);

    return () => {
      isMounted = false;
      cancelAnimationFrame(animFrame);
      clearTimeout(holdTimer);
      clearTimeout(slideTimer);
    };
  }, [stage]);

  // Phase 6: Conclusion headline ("Research faster with ORCA●")
  useEffect(() => {
    if (stage !== "conclusion") return;
    let isMounted = true;
    let timer: NodeJS.Timeout;

    setConclusionText("");
    setShowConclusionDot(true);

    let idx = 0;
    const typeConclusion = () => {
      if (!isMounted) return;
      if (idx <= CONCLUSION_FULL.length) {
        setConclusionText(CONCLUSION_FULL.slice(0, idx));
        idx++;
        timer = setTimeout(typeConclusion, 60);
      } else {
        // Full conclusion text is now shown with the circle still present.
        // Wait a moment (450ms) before the circle disappears:
        timer = setTimeout(() => {
          if (!isMounted) return;
          setShowConclusionDot(false);

          // Hold cleanly without dot for 1400ms, then transition to fade_out:
          timer = setTimeout(() => {
            if (isMounted) setStage("fade_out");
          }, 1400);
        }, 450);
      }
    };

    // Let the conclusion container settle into the center (350ms) before starting to type:
    timer = setTimeout(typeConclusion, 350);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [stage]);

  // Phase 7: Fade out and seamlessly restart loop
  useEffect(() => {
    if (stage !== "fade_out") return;
    const timer = setTimeout(() => {
      setLoopKey((prev) => prev + 1);
    }, 400);

    return () => clearTimeout(timer);
  }, [stage]);

  // Helper to slice words for the streaming answer
  const words = ANSWER_FULL.split(" ");
  const streamedAnswer = words.slice(0, streamCount).join(" ");
  const isAnswerComplete = streamCount >= words.length;
  const highlightedWordCount = Math.floor(highlightProgress * HL_WORDS.length);

  // Split helpers for robust typewriter cursor wrapping across lines
  const conclusionLastSpace = conclusionText.lastIndexOf(" ");
  const conclusionLeading = conclusionLastSpace !== -1 ? conclusionText.slice(0, conclusionLastSpace + 1) : "";
  const conclusionTrailing = conclusionLastSpace !== -1 ? conclusionText.slice(conclusionLastSpace + 1) : conclusionText;

  return (
    <div
      className={`w-full h-full flex items-center justify-center relative overflow-hidden select-none p-4 sm:p-6 md:p-8 transition-opacity duration-400 ${
        stage === "fade_out" ? "opacity-0" : "opacity-100"
      } ${className}`}
    >
      {/* Content Canvas (Directly on card background - NO outer white box) */}
      <div className="w-full max-w-[740px] flex flex-col justify-center my-auto relative">
        
        {/* ============================================================ */}
        {/* STAGE 1: FLOATING PROMPT BOX                                */}
        {/* ============================================================ */}
        {stage === "prompt_box" && (
          <div className="w-full my-auto animate-in fade-in zoom-in-95 duration-300">
            <div className="w-full bg-white rounded-xl sm:rounded-[16px] p-5 sm:p-6 md:p-7 border border-white/80 flex flex-col justify-between min-h-[140px] sm:min-h-[160px]">
              
              {/* Textarea Area */}
              <div className="min-h-[50px] sm:min-h-[62px] flex items-start">
                <p className="text-[18px] sm:text-[21px] md:text-[24px] font-sans text-neutral-900 leading-snug font-normal">
                  <span>{promptText}</span>
                  {/* Blinking cursor at the active typing position */}
                  <span className="inline-block w-[2.5px] sm:w-[3px] h-[1.12em] bg-neutral-900 align-[-0.15em] ml-1 animate-pulse" />
                </p>
              </div>

              {/* Bottom Toolbar Row (No divider line, prominent large icons matching screenshot) */}
              <div className="mt-4 sm:mt-5 flex items-center justify-between">
                {/* Left Action Icons */}
                <div className="flex items-center space-x-4 sm:space-x-5">
                  <button
                    type="button"
                    className="flex items-center justify-center text-neutral-900 hover:opacity-80 transition-opacity"
                    title="Attach"
                  >
                    <Plus className="w-7 h-7 sm:w-8 sm:h-8 stroke-[2.4]" />
                  </button>
                  {/* Globe Icon in Vibrant Blue */}
                  <button
                    type="button"
                    className="flex items-center justify-center text-[#2563EB] hover:opacity-80 transition-opacity"
                    title="Web / Research Search"
                  >
                    <Globe className="w-7 h-7 sm:w-8 sm:h-8 stroke-[2.2]" />
                  </button>
                </div>

                {/* Right Action Icons & Send Button */}
                <div className="flex items-center space-x-3.5 sm:space-x-4">
                  <button
                    type="button"
                    className="flex items-center justify-center text-neutral-900 hover:opacity-80 transition-opacity"
                    title="Voice dictation"
                  >
                    <Mic className="w-7 h-7 sm:w-8 sm:h-8 stroke-[2.2]" />
                  </button>
                  {/* Send Button */}
                  <button
                    type="button"
                    className={`w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-200 ${
                      promptText.length > 5
                        ? "bg-neutral-950 text-white"
                        : "bg-neutral-200 text-neutral-400"
                    } ${isSendPressed ? "scale-90 bg-[#05AAB6]" : ""}`}
                  >
                    <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 stroke-[2.8]" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* STAGE 3, 4, 5: CONVERSATION (Matching Reference Screenshot)  */}
        {/* ============================================================ */}
        {(stage === "transitioning" || stage === "streaming" || stage === "highlight") && (
          <div
            className={`w-full flex flex-col space-y-6 sm:space-y-8 my-auto transition-all duration-700 ease-out will-change-transform ${
              isAnswerSlidingUp
                ? "-translate-y-16 sm:-translate-y-20 opacity-0 pointer-events-none"
                : "translate-y-0 opacity-100 animate-in fade-in slide-in-from-bottom-2 duration-300"
            }`}
          >
            
            {/* User Question Bubble (Right aligned) */}
            <div className="flex justify-end w-full">
              <div className="max-w-[92%] sm:max-w-[85%] px-5 sm:px-6 py-3.5 sm:py-4 rounded-xl sm:rounded-[14px] bg-white text-neutral-900 text-[18px] sm:text-[21px] md:text-[24px] font-sans font-normal leading-snug border border-white/80">
                {PROMPT_FULL}
              </div>
            </div>

            {/* Assistant Response Row (Left aligned, with icon + direct flowing text) */}
            <div className="flex items-start space-x-3.5 sm:space-x-5 w-full">
              {/* Assistant Icon: GlobeCheck (Verified Research) - Pulses while thinking */}
              <div className="shrink-0 mt-0.5 sm:mt-1 text-white">
                <GlobeCheck
                  className={`w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 text-white stroke-[2.2] transition-all duration-300 ${
                    stage === "transitioning" ? "animate-pulse" : ""
                  }`}
                />
              </div>

              {/* Assistant Text directly on background */}
              <div className="flex-1 text-[18px] sm:text-[21px] md:text-[24px] lg:text-[25px] font-sans text-white leading-[1.55] font-normal">
                {stage === "transitioning" ? (
                  <div className="pt-0.5 sm:pt-1 text-[18px] sm:text-[21px] md:text-[24px] lg:text-[25px] font-sans text-teal-100/90 font-medium">
                    {/* Step text with smooth fade transition */}
                    <span key={thinkingStep} className="animate-in fade-in duration-300">
                      {thinkingStep === 0
                        ? "Searching marine literature..."
                        : "Synthesizing 1,840+ ocean studies..."}
                    </span>
                  </div>
                ) : stage === "streaming" ? (
                  <>
                    <span>{streamedAnswer}</span>
                    {!isAnswerComplete && (
                      <span className="inline-block w-2 h-5 sm:h-6 ml-1.5 bg-white align-middle animate-pulse" />
                    )}
                  </>
                ) : (
                  // Stage: Highlight
                  <>
                    <span>{ANSWER_BEFORE_HL}</span>
                    {highlightProgress >= 1 ? (
                      <span className="bg-white text-teal-950 font-semibold px-1.5 py-0.5 rounded-[4px]">
                        {ANSWER_HIGHLIGHT}
                      </span>
                    ) : (
                      <span>
                        {HL_WORDS.map((w, idx) => {
                          const isHighlighted = idx <= highlightedWordCount;
                          const isCaretHere = idx === highlightedWordCount;
                          return (
                            <React.Fragment key={idx}>
                              <span
                                className={
                                  isHighlighted
                                    ? "bg-white text-teal-950 font-semibold px-1 py-0.5 rounded-[3px]"
                                    : ""
                                }
                              >
                                {w}
                              </span>
                              {isCaretHere && (
                                <span className="inline-block w-[2.5px] sm:w-[3px] h-[1.12em] bg-white align-[-0.15em] mx-0.5" />
                              )}
                              {idx < HL_WORDS.length - 1 && " "}
                            </React.Fragment>
                          );
                        })}
                      </span>
                    )}
                    <span>{ANSWER_AFTER_HL}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* STAGE 6: "Research faster with ORCA" CONCLUSION HEADLINE     */}
        {/* ============================================================ */}
        {stage === "conclusion" && (
          <div className="flex flex-col items-center justify-center my-auto py-10 animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-sans font-medium text-white tracking-tight text-center leading-tight">
              <span>{conclusionLeading}</span>
              <span className="inline-block whitespace-nowrap">
                {conclusionTrailing}
                {/* Smooth fading and scaling circle cursor */}
                <span
                  className={`inline-block w-[0.74em] h-[0.74em] rounded-full bg-white ml-[4px] sm:ml-[6px] align-[-0.06em] shrink-0 transition-all duration-500 ease-out ${
                    showConclusionDot ? "opacity-100 scale-100" : "opacity-0 scale-50 pointer-events-none"
                  }`}
                />
              </span>
            </h2>
          </div>
        )}

      </div>
    </div>
  );
};
