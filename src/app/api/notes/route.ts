import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export interface NoteItem {
  id: string;
  author: string;
  content: string;
  handle?: string;
  createdAt: string;
  likes?: number;
}

const NOTES_FILE = path.join(process.cwd(), 'src', 'data', 'notes.json');

// In-memory fallback
let memoryNotes: NoteItem[] = [
  {
    "id": "note-pynthamil-welcome",
    "author": "Pynthamil",
    "content": "welcome to my digital corner! feel free to leave a note, thought, feedback, or just say hi :)",
    "createdAt": "2026-10-18T10:00:00.000Z",
    "likes": 1
  }
];

// Helper: Check Upstash Redis configuration
function getUpstashConfig() {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  if (url && token) {
    return { url, token };
  }
  return null;
}

async function getNotesFromUpstash(config: { url: string; token: string }): Promise<NoteItem[] | null> {
  try {
    const res = await fetch(`${config.url}/get/portfolio_notes`, {
      headers: {
        Authorization: `Bearer ${config.token}`,
      },
      cache: 'no-store',
    });
    if (res.ok) {
      const data = await res.json();
      if (data && data.result) {
        const parsed = typeof data.result === 'string' ? JSON.parse(data.result) : data.result;
        if (Array.isArray(parsed)) return parsed;
      }
    }
  } catch (err) {
    console.error("Failed to fetch notes from Upstash:", err);
  }
  return null;
}

async function saveNotesToUpstash(config: { url: string; token: string }, notes: NoteItem[]): Promise<boolean> {
  try {
    const res = await fetch(`${config.url}/set/portfolio_notes`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${config.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(JSON.stringify(notes)),
    });
    return res.ok;
  } catch (err) {
    console.error("Failed to save notes to Upstash:", err);
    return false;
  }
}

function readLocalNotes(): NoteItem[] {
  try {
    if (fs.existsSync(NOTES_FILE)) {
      const content = fs.readFileSync(NOTES_FILE, 'utf-8');
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed)) {
        memoryNotes = parsed;
        return parsed;
      }
    }
  } catch (err) {
    console.error("Error reading local notes:", err);
  }
  return memoryNotes;
}

function writeLocalNotes(notes: NoteItem[]) {
  memoryNotes = notes;
  try {
    fs.writeFileSync(NOTES_FILE, JSON.stringify(notes, null, 2), 'utf-8');
  } catch (err) {
    // If running in a read-only serverless environment, memoryNotes still holds state
  }
}

async function getAllNotes(): Promise<NoteItem[]> {
  const upstash = getUpstashConfig();
  if (upstash) {
    const redisNotes = await getNotesFromUpstash(upstash);
    if (redisNotes) return redisNotes;
  }
  return readLocalNotes();
}

async function persistNotes(notes: NoteItem[]) {
  const upstash = getUpstashConfig();
  if (upstash) {
    await saveNotesToUpstash(upstash, notes);
  }
  writeLocalNotes(notes);
}

export async function GET() {
  const notes = await getAllNotes();
  // Sort descending by creation date (newest first)
  const sortedNotes = [...notes].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
  return NextResponse.json({ notes: sortedNotes });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { author, content, handle, honeypot } = body;

    // Spam honeypot detection
    if (honeypot) {
      return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
    }

    const cleanAuthor = typeof author === 'string' ? author.trim() : "";
    const cleanContent = typeof content === 'string' ? content.trim() : "";
    const cleanHandle = typeof handle === 'string' ? handle.trim() : "";

    if (!cleanAuthor) {
      return NextResponse.json({ error: "Please provide your name or handle" }, { status: 400 });
    }
    if (cleanAuthor.length > 40) {
      return NextResponse.json({ error: "Name must be 40 characters or fewer" }, { status: 400 });
    }

    if (!cleanContent) {
      return NextResponse.json({ error: "Please enter a note" }, { status: 400 });
    }
    if (cleanContent.length > 300) {
      return NextResponse.json({ error: "Note must be 300 characters or fewer" }, { status: 400 });
    }

    if (cleanHandle.length > 100) {
      return NextResponse.json({ error: "Link/handle must be 100 characters or fewer" }, { status: 400 });
    }

    const newNote: NoteItem = {
      id: `note_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      author: cleanAuthor,
      content: cleanContent,
      handle: cleanHandle || undefined,
      createdAt: new Date().toISOString(),
      likes: 0,
    };

    const notes = await getAllNotes();
    notes.unshift(newNote);
    await persistNotes(notes);

    return NextResponse.json({ note: newNote, success: true }, { status: 201 });
  } catch (err) {
    console.error("Error creating note:", err);
    return NextResponse.json({ error: "Failed to create note" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, action } = body;

    if (!id || action !== "like") {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    const notes = await getAllNotes();
    const note = notes.find((n) => n.id === id);
    if (!note) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }

    note.likes = (note.likes || 0) + 1;
    await persistNotes(notes);

    return NextResponse.json({ success: true, likes: note.likes });
  } catch (err) {
    console.error("Error liking note:", err);
    return NextResponse.json({ error: "Failed to like note" }, { status: 500 });
  }
}
