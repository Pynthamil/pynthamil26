"use client";

import React, { useState, useEffect, useRef } from "react";
import { Plus } from "lucide-react";
import { NoteItem } from "@/app/api/notes/route";

interface NotesSectionProps {
  playTone?: (freq?: number) => void;
  soundOn?: boolean;
}

export interface GhibliTheme {
  id: string;
  name: string;
  swatchHex: string;
  bg: string;
  hover: string;
  border: string;
  text: string;
  author: string;
  timestamp: string;
  placeholder: string;
  caret: string;
  buttonBg: string;
}

export const GHIBLI_THEMES: GhibliTheme[] = [
  {
    id: "butter",
    name: "Vanilla Butter",
    swatchHex: "#FEEAB5",
    bg: "bg-[#FEF9EC] dark:bg-[#1C1813]",
    border: "border-[#E6CCA2]/60 dark:border-[#8E6D38]/40",
    hover: "hover:bg-[#FCF3DB] dark:hover:bg-[#241E17] hover:border-[#D4A95B]/80",
    text: "text-[#382B1C] dark:text-[#FDF6E8]",
    author: "text-[#855B22] dark:text-[#E8C785]",
    timestamp: "text-[#A67E44] dark:text-[#CBB07E]",
    placeholder: "placeholder-[#A67E44]/55 dark:placeholder-[#CBB07E]/55",
    caret: "caret-[#855B22] dark:caret-[#E8C785]",
    buttonBg: "bg-[#382B1C] hover:bg-[#4E3D29] dark:bg-[#FDF6E8] dark:hover:bg-[#FFFFFF] text-white dark:text-[#1C1813]",
  },
  {
    id: "sage",
    name: "Pale Celery Sage",
    swatchHex: "#B0B980",
    bg: "bg-[#F2F6EE] dark:bg-[#141B14]",
    border: "border-[#B6C99E]/60 dark:border-[#4B6846]/45",
    hover: "hover:bg-[#E8F0E2] dark:hover:bg-[#1B251B] hover:border-[#8FA870]/80",
    text: "text-[#1D2B1C] dark:text-[#EDF5EB]",
    author: "text-[#4B6B40] dark:text-[#A7CCA0]",
    timestamp: "text-[#6D8A63] dark:text-[#8EAE87]",
    placeholder: "placeholder-[#6D8A63]/55 dark:placeholder-[#8EAE87]/55",
    caret: "caret-[#4B6B40] dark:caret-[#A7CCA0]",
    buttonBg: "bg-[#1D2B1C] hover:bg-[#2D402C] dark:bg-[#EDF5EB] dark:hover:bg-[#FFFFFF] text-white dark:text-[#141B14]",
  },
  {
    id: "peach",
    name: "Peach Terracotta",
    swatchHex: "#E59D85",
    bg: "bg-[#FAF1EC] dark:bg-[#201512]",
    border: "border-[#DEB3A2]/60 dark:border-[#7A4535]/45",
    hover: "hover:bg-[#F6E6DF] dark:hover:bg-[#2A1C18] hover:border-[#C8846E]/80",
    text: "text-[#331C15] dark:text-[#FDF0EA]",
    author: "text-[#874A37] dark:text-[#EAA18B]",
    timestamp: "text-[#A56754] dark:text-[#CFA091]",
    placeholder: "placeholder-[#A56754]/55 dark:placeholder-[#CFA091]/55",
    caret: "caret-[#874A37] dark:caret-[#EAA18B]",
    buttonBg: "bg-[#331C15] hover:bg-[#4C2B21] dark:bg-[#FDF0EA] dark:hover:bg-[#FFFFFF] text-white dark:text-[#201512]",
  },
  {
    id: "teal",
    name: "Sea Glass Aqua",
    swatchHex: "#12A59F",
    bg: "bg-[#EEF7F6] dark:bg-[#111C1C]",
    border: "border-[#98D1CE]/60 dark:border-[#2E5E5F]/45",
    hover: "hover:bg-[#DFEEED] dark:hover:bg-[#172525] hover:border-[#52AFA8]/80",
    text: "text-[#0D292A] dark:text-[#E7F6F5]",
    author: "text-[#1D696B] dark:text-[#76CECA]",
    timestamp: "text-[#3F8788] dark:text-[#6CB1B0]",
    placeholder: "placeholder-[#3F8788]/55 dark:placeholder-[#6CB1B0]/55",
    caret: "caret-[#1D696B] dark:caret-[#76CECA]",
    buttonBg: "bg-[#0D292A] hover:bg-[#183F41] dark:bg-[#E7F6F5] dark:hover:bg-[#FFFFFF] text-white dark:text-[#111C1C]",
  },
  {
    id: "rose",
    name: "Candy Rose",
    swatchHex: "#EA8DAC",
    bg: "bg-[#FAF0F3] dark:bg-[#201317]",
    border: "border-[#DCB1C2]/60 dark:border-[#73364C]/45",
    hover: "hover:bg-[#F5E2E8] dark:hover:bg-[#29181E] hover:border-[#C47D97]/80",
    text: "text-[#2E141F] dark:text-[#FDF0F5]",
    author: "text-[#853F5C] dark:text-[#E295B0]",
    timestamp: "text-[#A35D7A] dark:text-[#C7879F]",
    placeholder: "placeholder-[#A35D7A]/55 dark:placeholder-[#C7879F]/55",
    caret: "caret-[#853F5C] dark:caret-[#E295B0]",
    buttonBg: "bg-[#2E141F] hover:bg-[#472232] dark:bg-[#FDF0F5] dark:hover:bg-[#FFFFFF] text-white dark:text-[#201317]",
  },
  {
    id: "sand",
    name: "Warm Ochre Sand",
    swatchHex: "#D9B368",
    bg: "bg-[#F8F3EA] dark:bg-[#1E1711]",
    border: "border-[#DBC498]/60 dark:border-[#72572D]/45",
    hover: "hover:bg-[#F1E9DA] dark:hover:bg-[#271F17] hover:border-[#BD9853]/80",
    text: "text-[#302313] dark:text-[#FAF3E9]",
    author: "text-[#7B5722] dark:text-[#D9B674]",
    timestamp: "text-[#9C7438] dark:text-[#C2A369]",
    placeholder: "placeholder-[#9C7438]/55 dark:placeholder-[#C2A369]/55",
    caret: "caret-[#7B5722] dark:caret-[#D9B674]",
    buttonBg: "bg-[#302313] hover:bg-[#46341D] dark:bg-[#FAF3E9] dark:hover:bg-[#FFFFFF] text-white dark:text-[#1E1711]",
  },
  {
    id: "lavender",
    name: "Evening Lavender",
    swatchHex: "#8A6994",
    bg: "bg-[#F5F1F7] dark:bg-[#19121F]",
    border: "border-[#CBB7D3]/60 dark:border-[#583768]/45",
    hover: "hover:bg-[#EDE5F0] dark:hover:bg-[#22182B] hover:border-[#9C7AA8]/80",
    text: "text-[#25152B] dark:text-[#F6F0F8]",
    author: "text-[#6D447C] dark:text-[#C49FD2]",
    timestamp: "text-[#8B6299] dark:text-[#AB89B9]",
    placeholder: "placeholder-[#8B6299]/55 dark:placeholder-[#AB89B9]/55",
    caret: "caret-[#6D447C] dark:caret-[#C49FD2]",
    buttonBg: "bg-[#25152B] hover:bg-[#3D2346] dark:bg-[#F6F0F8] dark:hover:bg-[#FFFFFF] text-white dark:text-[#19121F]",
  },
  {
    id: "moss",
    name: "Forest Moss Pine",
    swatchHex: "#629654",
    bg: "bg-[#EFF5EE] dark:bg-[#111A12]",
    border: "border-[#A9CAA9]/60 dark:border-[#3D613F]/45",
    hover: "hover:bg-[#E3EFE2] dark:hover:bg-[#172418] hover:border-[#73A573]/80",
    text: "text-[#132816] dark:text-[#EDF6EE]",
    author: "text-[#38663C] dark:text-[#95C799]",
    timestamp: "text-[#538457] dark:text-[#7BAA7F]",
    placeholder: "placeholder-[#538457]/55 dark:placeholder-[#7BAA7F]/55",
    caret: "caret-[#38663C] dark:caret-[#95C799]",
    buttonBg: "bg-[#132816] hover:bg-[#223F26] dark:bg-[#EDF6EE] dark:hover:bg-[#FFFFFF] text-white dark:text-[#111A12]",
  },
];

export function getGhibliTheme(colorId?: string, fallbackIndex = 0): GhibliTheme {
  if (colorId) {
    const found = GHIBLI_THEMES.find((t) => t.id === colorId);
    if (found) return found;
  }
  return GHIBLI_THEMES[fallbackIndex % GHIBLI_THEMES.length];
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
  const [selectedColorId, setSelectedColorId] = useState<string>("butter");
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
    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      if (!isComposing) return;
      if (composerRef.current && !composerRef.current.contains(e.target as Node)) {
        if (!content.trim() && !author.trim()) {
          setIsComposing(false);
          setErrorMsg("");
        }
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, [isComposing, content, author]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return;

    const trimmedAuthor = author.trim();
    const trimmedContent = content.trim();

    if (!trimmedAuthor || !trimmedContent) {
      setErrorMsg("Please fill in both your name and note.");
      return;
    }

    if (trimmedContent.length > 300) {
      setErrorMsg("Note must be 300 characters or less.");
      return;
    }

    if (trimmedAuthor.length > 40) {
      setErrorMsg("Name must be 40 characters or less.");
      return;
    }

    setSubmitting(true);
    setErrorMsg("");
    playClick(1174);

    try {
      const res = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          author: trimmedAuthor,
          content: trimmedContent,
          color: selectedColorId,
          honeypot,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to post note");
      }

      const data = await res.json();
      const newNote: NoteItem = data.note || data;
      setNotes((prev) => [newNote, ...prev]);

      try {
        localStorage.setItem("pyndu_note_author", trimmedAuthor);
      } catch (e) {}

      setContent("");
      setIsComposing(false);
      playClick(1318);
    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong. Please try again.");
      playClick(440);
    } finally {
      setSubmitting(false);
    }
  };

  const formatNoteDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return "";
    }
  };

  const renderNoteCard = (note: NoteItem, index: number) => {
    const theme = getGhibliTheme(note.color, index);

    return (
      <div
        key={note.id}
        className={`group relative w-full aspect-square ${theme.bg} border ${theme.border} rounded-none p-5 sm:p-6 flex flex-col justify-between transition-all duration-200 ${theme.hover} shadow-sm ${
          isComposing ? "opacity-50" : "opacity-100"
        }`}
      >
        {/* Note Content */}
        <p className={`text-[14px] sm:text-[14.5px] leading-[1.55] ${theme.text} font-sans break-words whitespace-pre-wrap select-text overflow-y-auto`}>
          {note.content}
        </p>

        {/* Note Author & Timestamp */}
        <div className="mt-auto pt-4 flex items-center justify-between gap-2">
          <span className={`text-[12.5px] sm:text-[13px] ${theme.author} font-sans select-text font-medium`}>
            {note.author}
          </span>
          <span className={`text-[12px] sm:text-[12.5px] ${theme.timestamp} font-sans opacity-0 group-hover:opacity-100 transition-opacity duration-150 select-none shrink-0`}>
            {formatNoteDate(note.createdAt)}
          </span>
        </div>
      </div>
    );
  };

  const renderNewNoteCard = () => {
    if (!isComposing) {
      return (
        <button
          onClick={() => {
            playClick(880);
            setIsComposing(true);
          }}
          className="w-full h-[52px] border border-dashed border-[#8E7963]/35 dark:border-[#96836E]/35 hover:border-[#382B1C] dark:hover:border-[#FDF6E8] rounded-none px-4 flex items-center gap-2 text-[13.5px] sm:text-[14px] text-[#5C4C38] dark:text-[#C5BAAA] hover:text-[#251A0E] dark:hover:text-[#FFF] hover:bg-[#FAF4E8]/60 dark:hover:bg-[#1E1912]/50 transition-all cursor-pointer select-none group"
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.2] text-[#8C7A65] dark:text-[#A89885] group-hover:text-[#251A0E] dark:group-hover:text-white transition-colors" />
          <span>New note</span>
        </button>
      );
    }

    const activeTheme = getGhibliTheme(selectedColorId, 0);

    return (
      <div
        ref={composerRef}
        onClick={(e) => {
          if ((e.target as HTMLElement).tagName !== "INPUT" && (e.target as HTMLElement).tagName !== "BUTTON") {
            textareaRef.current?.focus();
          }
        }}
        className={`w-full aspect-square ${activeTheme.bg} border ${activeTheme.border} rounded-none p-5 sm:p-6 flex flex-col justify-between transition-colors duration-200 shadow-sm cursor-text relative z-10`}
      >
        <form onSubmit={handleSubmit} className="flex flex-col justify-between h-full flex-1">
          {/* Invisible honeypot */}
          <input
            type="text"
            name="website"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
          />

          <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="leave a note or say hi..."
            maxLength={300}
            rows={3}
            required
            className={`w-full bg-transparent border-none outline-none resize-none p-0 text-[14px] sm:text-[14.5px] leading-[1.55] ${activeTheme.text} ${activeTheme.placeholder} ${activeTheme.caret} font-sans focus:outline-none focus:ring-0 select-text`}
          />

          {/* Color Palette Swatches Selector */}
          <div className="flex items-center gap-1.5 py-2">
            {GHIBLI_THEMES.map((t) => {
              const isSelected = selectedColorId === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  title={t.name}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedColorId(t.id);
                    playClick(1046);
                  }}
                  style={{ backgroundColor: t.swatchHex }}
                  className={`w-4 h-4 rounded-full transition-all cursor-pointer ${
                    isSelected
                      ? "ring-2 ring-offset-1 ring-neutral-800 dark:ring-neutral-200 scale-110"
                      : "hover:scale-105 opacity-80 hover:opacity-100"
                  }`}
                />
              );
            })}
          </div>

          {/* Bottom row: Your name + Post button */}
          <div className={`flex items-center justify-between gap-3 pt-3 border-t ${activeTheme.border}`}>
            <input
              type="text"
              value={author}
              placeholder="your name"
              onChange={(e) => setAuthor(e.target.value)}
              maxLength={40}
              required
              className={`bg-transparent border-none outline-none p-0 text-[12.5px] sm:text-[13px] ${activeTheme.author} ${activeTheme.placeholder} ${activeTheme.caret} font-sans w-28 sm:w-36 focus:outline-none focus:ring-0 select-text`}
            />

            <button
              type="submit"
              disabled={submitting || !author.trim() || !content.trim()}
              className={`px-4 py-1.5 rounded-none text-[13px] font-sans font-medium transition-all select-none cursor-pointer ${
                submitting || !author.trim() || !content.trim()
                  ? "bg-neutral-400/30 dark:bg-white/20 text-neutral-500/60 dark:text-white/40 cursor-not-allowed"
                  : `${activeTheme.buttonBg} active:scale-[0.98] shadow-sm`
              }`}
            >
              {submitting ? "Posting..." : "Post"}
            </button>
          </div>

          {errorMsg && (
            <p className="text-[11.5px] text-red-500 dark:text-red-400 mt-1.5 font-sans select-none">
              {errorMsg}
            </p>
          )}
        </form>
      </div>
    );
  };

  return (
    <div className="w-[100vw] max-w-[100vw] relative left-1/2 -translate-x-1/2 px-4 sm:px-6 md:px-8 mt-2 sm:mt-4 mb-16 sm:mb-20 animate-in fade-in duration-200">
      <div className="max-w-[1640px] mx-auto w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5 items-start w-full">
          {/* Item 1: Composer Card */}
          {renderNewNoteCard()}

          {/* Notes Cards */}
          {notes.map((note, index) => renderNoteCard(note, index))}
        </div>
      </div>
    </div>
  );
}
