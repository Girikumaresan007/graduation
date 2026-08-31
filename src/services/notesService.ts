import { MemoryWallNote } from '../types';
import { initialMemoryWallNotes } from '../data/memoryWall';

const STORAGE_KEY = 'krce_csea_memory_wall_v3';

// Ensure initial seed notes have valid ISO createdAt strings
const seededInitialNotes: (MemoryWallNote & { createdAt: string })[] = initialMemoryWallNotes.map((note, index) => ({
  ...note,
  createdAt: (note as any).createdAt || new Date(Date.now() - (initialMemoryWallNotes.length - index) * 86400000).toISOString()
}));

export const notesService = {
  /**
   * Fetch all notes from /api/notes (Upstash Redis) or localStorage fallback
   */
  async getNotes(): Promise<(MemoryWallNote & { createdAt: string })[]> {
    try {
      const response = await fetch('/api/notes', {
        headers: { 'Accept': 'application/json' }
      });
      if (response.ok) {
        const remoteNotes = await response.json();
        if (Array.isArray(remoteNotes) && remoteNotes.length > 0) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(remoteNotes));
          return remoteNotes;
        }
      }
    } catch {
      // Local dev mode fallback when Vercel API is not available
    }

    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
        }
      }
    } catch {
      // Ignore
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(seededInitialNotes));
    return [...seededInitialNotes].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  /**
   * Submit a new note to /api/notes (Upstash Redis via Vercel Serverless Function)
   */
  async addNote(noteData: {
    author: string;
    rollNo?: string;
    message: string;
    tag: string;
    color: 'gold' | 'navy' | 'ivory';
  }): Promise<MemoryWallNote & { createdAt: string }> {
    const payload = {
      author: noteData.author.trim(),
      rollNo: noteData.rollNo ? noteData.rollNo.trim() : undefined,
      message: noteData.message.trim(),
      tag: noteData.tag || 'Memories',
      color: noteData.color || 'gold'
    };

    try {
      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const createdNote = await response.json();
        const existing = await this.getNotes();
        const updated = [createdNote, ...existing.filter((n) => n.id !== createdNote.id)];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        return createdNote;
      }
    } catch {
      // Local dev mode fallback when API endpoint is unavailable
    }

    // Local fallback creation
    const localNote: MemoryWallNote & { createdAt: string } = {
      id: `note-${Date.now()}`,
      author: payload.author,
      rollNo: payload.rollNo,
      message: payload.message,
      tag: payload.tag,
      year: '2021-2025',
      color: payload.color,
      rotation: (Math.random() * 6) - 3,
      likes: 1,
      createdAt: new Date().toISOString()
    };

    const existing = await this.getNotes();
    const updated = [localNote, ...existing.filter((n) => n.id !== localNote.id)];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    return localNote;
  },

  /**
   * Like a note
   */
  async likeNote(id: string): Promise<number> {
    const existing = await this.getNotes();
    let newLikes = 1;
    const updated = existing.map((n) => {
      if (n.id === id) {
        newLikes = n.likes + 1;
        return { ...n, likes: newLikes };
      }
      return n;
    });

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return newLikes;
  }
};
