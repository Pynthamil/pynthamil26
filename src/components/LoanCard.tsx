import React from 'react';
import { HelpCircle } from 'lucide-react';

export default function LoanCard() {
  return (
    <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-sm border border-neutral-100 font-sans">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-semibold text-neutral-800">Loan</h2>
        <button className="p-1.5 rounded-xl border border-neutral-200 hover:bg-neutral-50 transition-colors">
          <HelpCircle className="w-5 h-5 text-neutral-600" />
        </button>
      </div>

      {/* Illustration Area */}
      <div className="w-full h-48 bg-neutral-50 rounded-xl mb-8 flex flex-col items-center justify-center relative overflow-hidden">
        {/* Abstract representation of the illustration since we don't have the exact image */}
        <div className="absolute transform -rotate-12 -translate-x-12 bg-pink-400 w-24 h-32 rounded-lg opacity-80" />
        <div className="absolute transform translate-x-12 bg-rose-600 w-24 h-32 rounded-lg" />
        <div className="absolute z-10 bg-white w-32 h-40 border-4 border-pink-200 rounded-lg shadow-sm flex flex-col items-center pt-4">
          <div className="font-bold text-lg mb-2">LOAN</div>
          <div className="w-16 h-0.5 bg-neutral-200 mb-2" />
          <div className="w-20 h-0.5 bg-neutral-200 mb-2" />
          <div className="w-16 h-0.5 bg-neutral-200" />
        </div>
        <div className="absolute z-20 bottom-4 -ml-16 flex flex-col">
          <div className="w-12 h-3 bg-yellow-400 border border-yellow-500 rounded-sm mb-0.5" />
          <div className="w-12 h-3 bg-yellow-400 border border-yellow-500 rounded-sm mb-0.5" />
          <div className="w-12 h-3 bg-yellow-400 border border-yellow-500 rounded-sm" />
        </div>
      </div>

      {/* Text Content */}
      <div className="text-center space-y-2">
        <h3 className="text-[22px] font-semibold text-neutral-800 leading-tight">
          Get loans that match your savings.
        </h3>
        <p className="text-neutral-500 text-[17px]">
          Flexible, transparent, and tailored to you.
        </p>
      </div>
    </div>
  );
}
