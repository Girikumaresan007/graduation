import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  MessageSquareQuote,
  Heart,
  Pin,
  GraduationCap,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { MemoryWallNote } from '../types';
import { notesService } from '../services/notesService';

interface MemoriesPageProps {
  onBackToHome: () => void;
}

const ITEMS_PER_PAGE = 6;

export const MemoriesPage: React.FC<MemoriesPageProps> = ({ onBackToHome }) => {
  const [notes, setNotes] = useState<(MemoryWallNote & { createdAt?: string })[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const notesContainerRef = useRef<HTMLDivElement>(null);

  const loadNotes = async () => {
    const fetched = await notesService.getNotes();
    setNotes(fetched);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    loadNotes();
  }, []);

  const handleLike = async (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const updatedLikes = await notesService.likeNote(id);
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, likes: updatedLikes } : n))
    );
  };

  // Pagination calculations
  const totalPages = Math.max(1, Math.ceil(notes.length / ITEMS_PER_PAGE));
  const validPage = Math.min(currentPage, totalPages);
  const paginatedNotes = notes.slice((validPage - 1) * ITEMS_PER_PAGE, validPage * ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      if (notesContainerRef.current) {
        notesContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#050B18] text-[#FDFCF0] font-sans selection:bg-[#D4AF37] selection:text-[#050B18] overflow-x-hidden">
      {/* Top Accent Gradient Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-40 z-50 pointer-events-none" />

      {/* Header Bar */}
      <header className="sticky top-0 z-40 bg-[#050B18]/90 backdrop-blur-xl border-b border-[#D4AF37]/20 py-2.5 px-3 sm:px-6 shadow-2xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <button
            onClick={onBackToHome}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0A1630] border border-[#D4AF37]/30 hover:border-[#D4AF37] text-[11px] sm:text-xs font-semibold tracking-wider text-[#FDFCF0] hover:text-[#D4AF37] transition-all cursor-pointer shrink-0 active:scale-95 shadow-md"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
            <span>Back to Main Site</span>
          </button>

          <div className="flex items-center gap-1.5 shrink-0">
            <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4AF37] shrink-0" />
            <span className="font-display text-xs sm:text-sm font-bold text-[#FDFCF0] whitespace-nowrap">
              KRCE CSE-A
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-3 sm:px-6 md:px-8 pt-6 sm:pt-10 pb-16">
        
        {/* Page Title Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0A1630] border border-[#D4AF37]/40 text-[#D4AF37] text-[10px] sm:text-xs font-semibold tracking-[0.3em] uppercase mb-2 shadow-md"
          >
            <MessageSquareQuote className="w-3.5 h-3.5" />
            <span>Digital Farewell Archive</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#FDFCF0] mb-2"
          >
            OUR MEMORIES, FOREVER
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xs sm:text-sm text-[#CBD5E1] font-light"
          >
            Every word stays with us.
          </motion.p>
        </div>

        {/* Notes Container Reference for Scroll Anchor */}
        <div ref={notesContainerRef} className="scroll-mt-24">
          {/* Paginated Farewell Notes Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {paginatedNotes.map((note, idx) => {
              const isGold = note.color === 'gold';
              const isNavy = note.color === 'navy';

              return (
                <motion.div
                  key={note.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  style={{ rotate: `${note.rotation}deg` }}
                  className={`relative p-5 sm:p-6 rounded-2xl shadow-xl border transition-all duration-300 hover:scale-105 hover:z-20 ${
                    isGold
                      ? 'bg-gradient-to-br from-[#0A1630] via-[#0D1C3C] to-[#071026] border-[#D4AF37]/50 text-[#FDFCF0]'
                      : isNavy
                      ? 'bg-gradient-to-br from-[#08152E] to-[#050B18] border-[#3B82F6]/40 text-[#FDFCF0]'
                      : 'bg-gradient-to-br from-[#122244] to-[#0A1630] border-white/20 text-[#FDFCF0]'
                  }`}
                >
                  {/* Gold Push Pin */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-[#D4AF37] filter drop-shadow-md">
                    <Pin className="w-5 h-5 sm:w-6 sm:h-6 fill-current rotate-45" />
                  </div>

                  {/* Tag & Year Badge */}
                  <div className="flex items-center justify-between gap-2 mb-3 mt-1 text-[10px] tracking-[0.2em] uppercase font-semibold">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30">
                      {note.tag}
                    </span>
                    <span className="text-[#94A3B8]">{note.year}</span>
                  </div>

                  {/* Message Quote */}
                  <p className="font-handwriting text-lg sm:text-xl text-[#FDFCF0] leading-relaxed mb-4 min-h-[65px]">
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
                      onClick={(e) => handleLike(note.id, e)}
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
        </div>

        {/* Pagination Bar */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-10 sm:mt-14 pt-6 border-t border-white/10">
            {/* Prev Button */}
            <button
              onClick={() => handlePageChange(validPage - 1)}
              disabled={validPage === 1}
              className={`flex items-center gap-1 px-3.5 py-2 rounded-full text-xs font-semibold tracking-wider transition-all ${
                validPage === 1
                  ? 'opacity-40 cursor-not-allowed bg-[#0A1630] text-[#94A3B8] border border-white/10'
                  : 'bg-[#0A1630] hover:bg-[#122244] text-[#FDFCF0] hover:text-[#D4AF37] border border-[#D4AF37]/30 hover:border-[#D4AF37] cursor-pointer active:scale-95'
              }`}
            >
              <ChevronLeft className="w-4 h-4 text-[#D4AF37]" />
              <span>Prev</span>
            </button>

            {/* Page Number Pills */}
            <div className="flex items-center gap-1.5 px-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`w-8 h-8 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    validPage === pageNum
                      ? 'bg-[#D4AF37] text-[#050B18] shadow-md scale-105 border border-[#D4AF37]'
                      : 'bg-[#0A1630] text-[#CBD5E1] border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 hover:text-[#FDFCF0]'
                  }`}
                >
                  {pageNum}
                </button>
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(validPage + 1)}
              disabled={validPage === totalPages}
              className={`flex items-center gap-1 px-3.5 py-2 rounded-full text-xs font-semibold tracking-wider transition-all ${
                validPage === totalPages
                  ? 'opacity-40 cursor-not-allowed bg-[#0A1630] text-[#94A3B8] border border-white/10'
                  : 'bg-[#0A1630] hover:bg-[#122244] text-[#FDFCF0] hover:text-[#D4AF37] border border-[#D4AF37]/30 hover:border-[#D4AF37] cursor-pointer active:scale-95'
              }`}
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4 text-[#D4AF37]" />
            </button>
          </div>
        )}
      </main>
    </div>
  );
};
