"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  badge?: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  badge,
  children,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-neutral-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Dialog Box */}
      <div className="relative w-full max-w-lg bg-white dark:bg-[#13151E] rounded-2xl p-6 sm:p-7 shadow-2xl border border-[#802962]/20 dark:border-[#EBB8D5]/30 z-10 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#802962]/15 dark:border-[#EBB8D5]/20">
          <div className="flex items-center gap-2">
            {badge && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-[#EAEAF7] dark:bg-[#EBB8D5]/20 text-[#4C173A] dark:text-[#F2F2F2]">
                {badge}
              </span>
            )}
            <h3 className="font-semibold text-[#2C2C2C] dark:text-[#F2F2F2] text-base">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700 dark:text-[#EBB8D5] dark:hover:text-[#F2F2F2] hover:bg-neutral-100 dark:hover:bg-[#EBB8D5]/15 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="text-sm text-neutral-700 dark:text-[#F2F2F2] space-y-4">{children}</div>
      </div>
    </div>
  );
};
