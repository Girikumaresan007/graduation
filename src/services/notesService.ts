import { MemoryWallNote } from '../types';
import { initialMemoryWallNotes } from '../data/memoryWall';

const STORAGE_KEY = 'krce_csea_memory_wall_v2';

// Ensure all initial notes have valid createdAt timestamps
const seededInitialNotes: (MemoryWallNote & { createdAt: string })[] = initialMemoryWallNotes.map((note, index) => ({
  ...note,
  createdAt: (note as any).createdAt || new Date(Date.now() - (initialMemoryWallNotes.length - index) * 86400000).toISOString()
}));

export const notesService = {
  /**
   * Fetch all notes sorted newest first (createdAt DESC)
   */
  async getNotes(): Promise<(MemoryWallNote & { createdAt: string })[]> {
    try {
      // 1. Try to fetch from serverless backend endpoint
      const response = await fetch('/api/notes', {
        headers: { 'Accept': 'application/json' }
      });
      if (response.ok) {
        const remoteNotes = await response.json();
        if (Array.isArray(remoteNotes) && remoteNotes.length > 0) {
          // Cache in local storage for fallback
          localStorage.setItem(STORAGE_KEY, JSON.stringify(remoteNotes));
          return remoteNotes;
        }
      }
    } catch {
      // Endpoint unavailable or running in static dev mode - fallback to localStorage
    }

    // 2. Local storage cache fallback
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

    // 3. Initial default seed notes fallback
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seededInitialNotes));
    return [...seededInitialNotes].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  /**
   * Post a new farewell note
   */
  async addNote(noteData: {
    author: string;
    rollNo?: string;
    message: string;
    tag: string;
    color: 'gold' | 'navy' | 'ivory';
  }): Promise<MemoryWallNote & { createdAt: string }> {
    const newNote: MemoryWallNote & { createdAt: string } = {
      id: `note-${Date.now()}`,
      author: noteData.author.trim(),
      rollNo: noteData.rollNo ? noteData.rollNo.trim() : undefined,
      message: noteData.message.trim(),
      tag: noteData.tag || 'Memories',
      year: '2021-2025',
      color: noteData.color || 'gold',
      rotation: (Math.random() * 6) - 3,
      likes: 1,
      createdAt: new Date().toISOString()
    };

    // 1. Send to serverless API
    try {
      await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newNote)
      });
    } catch {
      // Sync locally if offline
    }

    // 2. Save locally immediately so UI updates
    const existing = await this.getNotes();
    const updated = [newNote, ...existing.filter((n) => n.id !== newNote.id)];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    return newNote;
  },

  /**
   * Increment like count for a note
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
