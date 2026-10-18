"use client";

import React, { useState, useEffect, useRef } from "react";
import { Plus } from "lucide-react";
import { NoteItem } from "@/app/api/notes/route";

interface NotesSectionProps {
  playTone?: (freq?: number) => void;
  soundOn?: boolean;
}

export function NotesSection({ playTone, soundOn = true }: NotesSectionProps) {
  const [notes, setNotes] = useState<NoteItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isComposing, setIsComposing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Form states
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [honeypot, setHoneypot] = useState("");

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const composerRef = useRef<HTMLDivElement>(null);

  const playClick = (freq = 880) => {
    if (soundOn && playTone) {
      playTone(freq);
    }
  };

  const fetchNotes = async () => {
    try {
      const res = await fetch("/api/notes", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (data && Array.isArray(data.notes)) {
          setNotes(data.notes);
        }
      }
    } catch (err) {
      console.error("Failed to load notes:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
    try {
      const savedAuthor = localStorage.getItem("pyndu_note_author");
      if (savedAuthor) {
        setAuthor(savedAuthor);
      }
    } catch (e) {}
  }, []);

  // Auto-focus textarea when opening composer
  useEffect(() => {
    if (isComposing) {
      const timer = setTimeout(() => {
        textareaRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isComposing]);

  // Click outside to collapse composer if empty
  useEffect(() => {
    if (!isComposing) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        composerRef.current &&
        !composerRef.current.contains(e.target as Node)
      ) {
        // Only collapse if user hasn't typed anything
        if (!content.trim() && !author.trim()) {
          setIsComposing(false);
        }
      }
    };

    const timer = setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside);
    }, 150);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isComposing, content, author]);

  // Handle Escape key to collapse
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isComposing) {
        if (!content.trim()) {
          setIsComposing(false);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isComposing, content]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !content.trim() || submitting) return;

    setErrorMsg("");
    setSubmitting(true);
    playClick(1046);

    try {
      const res = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          author: author.trim(),
          content: content.trim(),
          honeypot,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Failed to submit note");
        playClick(440);
      } else {
        try {
          localStorage.setItem("pyndu_note_author", author.trim());
        } catch (e) {}

        if (data.note) {
          setNotes((prev) => [data.note, ...prev]);
        } else {
          fetchNotes();
        }

        setContent("");
        setIsComposing(false);
      }
    } catch (err) {
      setErrorMsg("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const formatNoteDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return "";
      return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return "";
    }
  };

  const renderNoteCard = (note: NoteItem) => (
    <div
      key={note.id}
      className={`group w-full bg-slate-100/90 dark:bg-[#1A1A1A]/90 border border-black/[0.06] dark:border-white/[0.08] rounded-none p-5 sm:p-6 flex flex-col justify-between min-h-[145px] sm:min-h-[165px] transition-all duration-200 hover:bg-slate-100 dark:hover:bg-[#202022] hover:border-black/[0.1] dark:hover:border-white/[0.12] ${
        isComposing ? "opacity-50" : "opacity-100"
      }`}
    >
      <p className="text-[14px] sm:text-[14.5px] leading-[1.5] text-[#2C2C2C] dark:text-[#F2F2F2] font-sans break-words whitespace-pre-wrap select-text">
        {note.content}
      </p>
      <div className="mt-7 sm:mt-9 flex items-center justify-between gap-2">
        <span className="text-[12.5px] sm:text-[13px] text-slate-500 dark:text-slate-400 font-sans select-text">
          {note.author}
        </span>
        <span className="text-[12px] sm:text-[12.5px] text-slate-400 dark:text-slate-500 font-sans opacity-0 group-hover:opacity-100 transition-opacity duration-150 select-none shrink-0">
          {formatNoteDate(note.createdAt)}
        </span>
      </div>
    </div>
  );

  const renderNewNoteCard = () => {
    if (!isComposing) {
      return (
        <button
          onClick={() => {
            playClick(880);
            setIsComposing(true);
          }}
          className="w-full h-[52px] border border-dashed border-slate-300 dark:border-slate-800 hover:border-[#FF00AE] dark:hover:border-[#FF00AE] rounded-none px-4 flex items-center gap-1.5 text-[13.5px] sm:text-[14px] text-slate-600 dark:text-slate-400 hover:text-[#FF00AE] dark:hover:text-[#FF00AE] hover:bg-slate-100/50 dark:hover:bg-[#1A1A1A]/50 transition-all cursor-pointer select-none group"
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.2] text-slate-400 group-hover:text-[#FF00AE] transition-colors" />
          <span>New note</span>
        </button>
      );
    }

    return (
      <div
        ref={composerRef}
        onClick={(e) => {
          if ((e.target as HTMLElement).tagName !== "INPUT" && (e.target as HTMLElement).tagName !== "BUTTON") {
            textareaRef.current?.focus();
          }
        }}
        className="w-full bg-slate-100/95 dark:bg-[#1A1A1A] border border-black/[0.08] dark:border-white/[0.1] focus-within:border-[#FF00AE]/60 dark:focus-within:border-[#FF00AE]/60 rounded-none p-5 sm:p-6 flex flex-col justify-between min-h-[145px] sm:min-h-[165px] transition-all duration-200 shadow-sm cursor-text relative z-10"
      >
        <form onSubmit={handleSubmit} className="flex flex-col justify-between h-full flex-1">
          {/* Invisible honeypot */}
          <input
            type="text"
            name="note_trap"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
          />

          {/* Say something textarea */}
          <textarea
            ref={textareaRef}
            autoFocus
            placeholder="Say something..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={(e) => {
              if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
                e.preventDefault();
                handleSubmit(e);
              }
              if (e.key === "Escape") {
                if (!content.trim()) setIsComposing(false);
              }
            }}
            maxLength={300}
            rows={3}
            required
            className="w-full bg-transparent border-none outline-none resize-none p-0 text-[14px] sm:text-[14.5px] leading-[1.5] text-[#2C2C2C] dark:text-[#F2F2F2] placeholder:text-slate-400 dark:placeholder:text-slate-500 font-sans focus:outline-none focus:ring-0 caret-[#FF00AE] select-text"
          />

          {/* Bottom row: Your name + Post button */}
          <div className="mt-6 flex items-center justify-between gap-3">
            <input
              type="text"
              placeholder="Your name"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              maxLength={40}
              required
              className="bg-transparent border-none outline-none p-0 text-[12.5px] sm:text-[13px] text-[#2C2C2C] dark:text-[#F2F2F2] placeholder:text-slate-400 dark:placeholder:text-slate-500 font-sans w-32 sm:w-40 focus:outline-none focus:ring-0 caret-[#FF00AE] select-text"
            />

            <button
              type="submit"
              disabled={submitting || !author.trim() || !content.trim()}
              className={`px-4 py-1.5 rounded-none text-[13px] font-sans font-medium text-white transition-all select-none cursor-pointer ${
                submitting || !author.trim() || !content.trim()
                  ? "bg-[#FF00AE]/35 text-white/70 cursor-not-allowed"
                  : "bg-[#FF00AE] hover:bg-[#E6009D] active:scale-[0.98] shadow-sm"
              }`}
            >
              {submitting ? "Posting..." : "Post"}
            </button>
          </div>
        </form>
      </div>
    );
  };

  return (
    <div className="w-[100vw] max-w-[100vw] relative left-1/2 -translate-x-1/2 px-4 sm:px-6 md:px-8 mt-6 sm:mt-10 mb-16 sm:mb-20 animate-in fade-in duration-200">
      <div className="max-w-[1280px] mx-auto">
        {/* Responsive Multi-Column Masonry Grid - Rendered ONCE in DOM */}
        <div className="columns-1 sm:columns-2 lg:columns-4 gap-3.5 sm:gap-4 [column-fill:_balance]">
          {/* Item 1: Composer Card (Always top of Column 1) */}
          <div className="break-inside-avoid mb-3.5 sm:mb-4">
            {renderNewNoteCard()}
          </div>

          {/* Notes Cards */}
          {notes.map((note) => (
            <div key={note.id} className="break-inside-avoid mb-3.5 sm:mb-4">
              {renderNoteCard(note)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
