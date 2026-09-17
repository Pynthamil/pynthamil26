import React from 'react';
import { ArrowRight, Plane, Heart, Flame, PartyPopper } from 'lucide-react';

export const HeroMockup = () => {
  return (
    <div className="w-full flex flex-col items-center pt-8 pb-12">
      {/* Chat UI Container */}
      <div className="w-full max-w-[420px] bg-white dark:bg-[#0B0C10] border border-neutral-100 dark:border-neutral-800 rounded-[32px] shadow-2xl p-6 mb-12 flex flex-col gap-4 relative">
        
        {/* Yuna 1 */}
        <div className="flex items-end gap-3 w-full">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-400 to-purple-600 shrink-0"></div>
          <div className="bg-[#f2f4f7] dark:bg-[#1a1d24] px-4 py-2.5 rounded-[20px] rounded-bl-[4px] text-[15px] sm:text-[16px]">
            <span className="font-semibold text-[#8b5cf6]">Yuna</span> <span className="text-[#1c1e21] dark:text-neutral-200">When do you all get in?</span>
          </div>
        </div>

        {/* Koji */}
        <div className="flex items-end gap-3 w-full pl-11 relative">
          <div className="absolute -top-3 right-4 bg-white dark:bg-[#0B0C10] rounded-full p-1 shadow-sm border border-neutral-100 dark:border-neutral-800 z-10">
            <span className="text-xs">❤️</span>
          </div>
          <div className="bg-[#f2f4f7] dark:bg-[#1a1d24] px-4 py-2.5 rounded-[20px] text-[15px] sm:text-[16px]">
            <span className="font-semibold text-[#14b8a6]">Koji</span> <span className="text-[#1c1e21] dark:text-neutral-200">we still need to pack! but we're planning to arrive on tuesday and leave weds</span>
          </div>
        </div>

        {/* Sakura */}
        <div className="flex items-end gap-3 w-full pl-11">
          <div className="bg-[#f2f4f7] dark:bg-[#1a1d24] px-4 py-2.5 rounded-[20px] text-[15px] sm:text-[16px]">
            <span className="font-semibold text-[#3b82f6]">Sakura</span> <span className="text-[#1c1e21] dark:text-neutral-200">same for us!</span>
          </div>
        </div>

        {/* Flight Card */}
        <div className="flex items-end gap-3 w-full mt-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-orange-300 to-amber-500 shrink-0"></div>
          <div className="bg-[#f2f4f7] dark:bg-[#1a1d24] p-4 rounded-[20px] rounded-bl-[4px] w-full relative">
            <div className="absolute -top-4 left-2 flex gap-1 bg-white dark:bg-[#0B0C10] rounded-full px-2 py-1 shadow-sm border border-neutral-100 dark:border-neutral-800">
              <span className="text-xs">🙌</span>
              <span className="text-xs">🎉</span>
              <span className="text-xs">🔥</span>
            </div>
            
            <div className="flex justify-between items-center text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-3 mt-1">
              <span>Flight JL57</span>
              <span className="bg-[#22c55e] text-white px-2 py-0.5 rounded-full tracking-wide">In Flight</span>
            </div>
            
            <div className="flex justify-between items-center mb-4">
              <span className="text-2xl font-bold text-[#1c1e21] dark:text-white">SFO</span>
              <div className="flex-1 px-3 flex items-center relative">
                <div className="h-0.5 w-1/2 bg-[#22c55e]"></div>
                <div className="border-2 border-neutral-800 dark:border-neutral-300 rounded-full w-6 h-6 flex items-center justify-center absolute left-1/2 -translate-x-1/2 bg-[#f2f4f7] dark:bg-[#1a1d24] z-10">
                  <Plane className="w-3.5 h-3.5 text-neutral-800 dark:text-neutral-300 rotate-45" strokeWidth={2.5} />
                </div>
                <div className="h-0.5 w-1/2 border-t-2 border-dashed border-neutral-300 dark:border-neutral-600"></div>
              </div>
              <span className="text-2xl font-bold text-[#1c1e21] dark:text-white">ITM</span>
            </div>
            
            <div className="bg-white dark:bg-[#252830] rounded-xl p-3 flex justify-between shadow-sm">
              <div>
                <div className="font-bold text-[12px] text-[#1c1e21] dark:text-neutral-200">San Francisco</div>
                <div className="text-[11px] text-neutral-500 font-medium flex items-center gap-1 mt-0.5">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  1:50 PM PST
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-[12px] text-[#1c1e21] dark:text-neutral-200">Osaka</div>
                <div className="text-[11px] text-neutral-500 font-medium flex items-center justify-end gap-1 mt-0.5">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  8:30 AM GMT+9
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Yuna 2 */}
        <div className="flex items-end gap-3 w-full pl-11">
          <div className="bg-[#f2f4f7] dark:bg-[#1a1d24] px-4 py-2.5 rounded-[20px] text-[15px] sm:text-[16px]">
            <span className="font-semibold text-[#8b5cf6]">Yuna</span> <span className="text-[#1c1e21] dark:text-neutral-200">nice! looks like you're making good time. see you soon!</span>
          </div>
        </div>

      </div>

      {/* Copy Text */}
      <div className="max-w-[480px] text-center space-y-5 px-4">
        <h2 className="text-[28px] sm:text-[32px] font-bold text-[#1c1e21] dark:text-white tracking-tight leading-tight">
          Messaging as it should be
        </h2>
        <p className="text-[16px] sm:text-[17px] text-[#475569] dark:text-[#a1a1aa] leading-relaxed">
          Start a new thread with any combination of photos, videos, locations, text, and more. Easily keep several conversations up at once with in-line replies, and navigate up and down to catch new updates.
        </p>
        
        <div className="pt-4 flex flex-col items-center gap-8">
          <button className="w-14 h-14 bg-[#2563eb] hover:bg-[#1d4ed8] rounded-full flex items-center justify-center text-white transition-colors shadow-lg shadow-blue-500/30">
            <ArrowRight className="w-6 h-6" strokeWidth={2.5} />
          </button>
          
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#1c1e21] dark:bg-white"></div>
            <div className="w-2 h-2 rounded-full bg-neutral-300 dark:bg-neutral-700"></div>
            <div className="w-2 h-2 rounded-full bg-neutral-300 dark:bg-neutral-700"></div>
            <div className="w-2 h-2 rounded-full bg-neutral-300 dark:bg-neutral-700"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
