import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquareQuote, Heart, Plus, Pin, Send, Sparkles, Check } from 'lucide-react';
import { MemoryWallNote } from '../types';
import { initialMemoryWallNotes } from '../data/memoryWall';

export const MemoryWall: React.FC = () => {
  const [notes, setNotes] = useState<MemoryWallNote[]>(() => {
    try {
      const saved = localStorage.getItem('krce_csea_memory_wall');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Ignore
    }
    return initialMemoryWallNotes;
  });

  const [isAddingNote, setIsAddingNote] = useState(false);
  const [authorName, setAuthorName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [message, setMessage] = useState('');
  const [tag, setTag] = useState('Memories');
  const [selectedColor, setSelectedColor] = useState<'gold' | 'navy' | 'ivory'>('gold');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('krce_csea_memory_wall', JSON.stringify(notes));
    } catch {
      // Ignore
    }
  }, [notes]);

  const handleLike = (id: string) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, likes: n.likes + 1 } : n))
    );
  };

  const handlePostNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !message.trim()) return;

    const newNote: MemoryWallNote = {
      id: `note-${Date.now()}`,
      author: authorName.trim(),
      rollNo: rollNumber.trim() || undefined,
      message: message.trim(),
      tag,
      year: '2021-2025',
      color: selectedColor,
      rotation: (Math.random() * 6) - 3,
      likes: 1
    };

    setNotes((prev) => [newNote, ...prev]);
    setSubmittedSuccess(true);
    setTimeout(() => {
      setSubmittedSuccess(false);
      setIsAddingNote(false);
      setAuthorName('');
      setRollNumber('');
      setMessage('');
    }, 1500);
  };

  return (
    <section
      id="memory-wall"
      className="relative py-20 px-4 sm:px-6 md:px-8 max-w-6xl mx-auto overflow-hidden"
    >
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0A1630] border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold tracking-[0.3em] uppercase mb-3 shadow-lg"
        >
          <MessageSquareQuote className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>The Farewell Board</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#FDFCF0] mb-3"
        >
          CLASS OF 2025 MEMORY WALL
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm sm:text-base text-[#CBD5E1] font-light max-w-xl mx-auto"
        >
          Pin your farewell thoughts, inside jokes, and heartfelt blessings for CSE-A.
        </motion.p>

        {/* Add Note Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-6"
        >
          <button
            onClick={() => setIsAddingNote(true)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#D4AF37] hover:bg-[#FDFCF0] text-[#050B18] font-bold text-xs sm:text-sm tracking-[0.2em] uppercase shadow-lg shadow-[#D4AF37]/20 active:scale-95 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Pin Your Farewell Note</span>
          </button>
        </motion.div>
      </div>

      {/* Interactive Sticky Note Board */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note) => {
          const isGold = note.color === 'gold';
          const isNavy = note.color === 'navy';

          return (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ rotate: `${note.rotation}deg` }}
              className={`relative p-6 rounded-xl shadow-2xl border transition-all duration-300 hover:scale-105 hover:z-10 ${
                isGold
                  ? 'bg-gradient-to-br from-[#0A1630] via-[#0D1C3C] to-[#071026] border-[#D4AF37]/50 text-[#FDFCF0]'
                  : isNavy
                  ? 'bg-gradient-to-br from-[#08152E] to-[#050B18] border-[#3B82F6]/40 text-[#FDFCF0]'
                  : 'bg-gradient-to-br from-[#122244] to-[#0A1630] border-white/20 text-[#FDFCF0]'
              }`}
            >
              {/* Gold Push Pin Icon */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-[#D4AF37] filter drop-shadow-md">
                <Pin className="w-6 h-6 fill-current rotate-45" />
              </div>

              {/* Tag & Year Badge */}
              <div className="flex items-center justify-between gap-2 mb-3 mt-1 text-[10px] tracking-[0.2em] uppercase font-semibold">
                <span className="px-2.5 py-0.5 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30">
                  {note.tag}
                </span>
                <span className="text-[#94A3B8]">{note.year}</span>
              </div>

              {/* Message Quote */}
              <p className="font-handwriting text-xl sm:text-2xl text-[#FDFCF0] leading-relaxed mb-4 min-h-[70px]">
                “{note.message}”
              </p>

              {/* Author & Footer */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                <div>
                  <div className="font-serif-title font-bold text-[#FDFCF0]">
                    {note.author}
                  </div>
                  {note.rollNo && (
                    <div className="text-[10px] text-[#94A3B8] tracking-wider">{note.rollNo}</div>
                  )}
                </div>

                <button
                  onClick={() => handleLike(note.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-[#D4AF37] text-xs font-semibold transition-colors active:scale-90"
                  title="Applaud note"
                >
                  <Heart className="w-3.5 h-3.5 fill-current text-[#D4AF37]" />
                  <span>{note.likes}</span>
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Add Note Modal */}
      <AnimatePresence>
        {isAddingNote && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4"
            onClick={() => setIsAddingNote(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full bg-[#0A1630] border border-[#D4AF37]/40 rounded-2xl p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Pin className="w-5 h-5 text-[#D4AF37]" />
                  <h3 className="font-serif-title text-2xl font-bold text-[#FDFCF0]">
                    Pin a Farewell Memory
                  </h3>
                </div>
                <button
                  onClick={() => setIsAddingNote(false)}
                  className="text-[#94A3B8] hover:text-[#FDFCF0] text-sm cursor-pointer"
                >
                  Cancel
                </button>
              </div>

              {submittedSuccess ? (
                <div className="py-8 text-center flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif-title text-xl text-[#FDFCF0] font-semibold">
                    Note Pinned to CSE-A Memory Wall!
                  </h4>
                  <p className="text-xs text-[#CBD5E1] mt-1">
                    Your memory is now part of our digital time capsule.
                  </p>
                </div>
              ) : (
                <form onSubmit={handlePostNote} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-[#94A3B8] mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={authorName}
                        onChange={(e) => setAuthorName(e.target.value)}
                        placeholder="e.g. Giridharan K"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#050B18] border border-white/15 text-[#FDFCF0] text-xs focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-[#94A3B8] mb-1">
                        Roll No. (Optional)
                      </label>
                      <input
                        type="text"
                        value={rollNumber}
                        onChange={(e) => setRollNumber(e.target.value)}
                        placeholder="e.g. 21CS042"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#050B18] border border-white/15 text-[#FDFCF0] text-xs focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-[#94A3B8] mb-1">
                      Farewell Memory / Message *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Write your emotional note, canteen memory, or blessing for the batch..."
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#050B18] border border-white/15 text-[#FDFCF0] text-xs focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-[#94A3B8] mb-1">
                        Category Tag
                      </label>
                      <select
                        value={tag}
                        onChange={(e) => setTag(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-[#050B18] border border-white/15 text-[#FDFCF0] text-xs focus:outline-none focus:border-[#D4AF37]"
                      >
                        <option value="Memories">Memories</option>
                        <option value="Brotherhood">Brotherhood</option>
                        <option value="Nostalgia">Nostalgia</option>
                        <option value="Gratitude">Gratitude</option>
                        <option value="Farewell">Farewell</option>
                        <option value="Inside Joke">Inside Joke</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-[#94A3B8] mb-1">
                        Card Color
                      </label>
                      <div className="flex items-center gap-2 pt-1">
                        {(['gold', 'navy', 'ivory'] as const).map((c) => (
                          <button
                            type="button"
                            key={c}
                            onClick={() => setSelectedColor(c)}
                            className={`w-7 h-7 rounded-full border-2 transition-all cursor-pointer ${
                              c === 'gold' ? 'bg-[#D4AF37]' : c === 'navy' ? 'bg-[#0A1630]' : 'bg-[#FDFCF0]'
                            } ${selectedColor === c ? 'border-[#D4AF37] scale-110 shadow-md ring-2 ring-[#D4AF37]/50' : 'border-transparent opacity-60'}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 py-3 rounded-lg bg-[#D4AF37] hover:bg-[#FDFCF0] text-[#050B18] font-bold text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 shadow-lg shadow-[#D4AF37]/20 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Post to Memory Wall</span>
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
