import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, X, GraduationCap } from 'lucide-react';

interface EasterEggsModalProps {
  egg: { title: string; message: string; year: string } | null;
  onClose: () => void;
}

export const EasterEggsModal: React.FC<EasterEggsModalProps> = ({ egg, onClose }) => {
  if (!egg) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 10 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-sm w-full bg-gradient-to-br from-[#0A1630] via-[#0D1C3C] to-[#050B18] border-2 border-[#D4AF37] rounded-2xl p-6 shadow-2xl text-center"
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1.5 rounded-full bg-white/10 text-[#FDFCF0] hover:text-[#D4AF37] cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="w-12 h-12 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center mx-auto mb-3 text-[#D4AF37]">
            <Sparkles className="w-6 h-6 animate-spin" style={{ animationDuration: '6s' }} />
          </div>

          <div className="text-[10px] tracking-[0.25em] uppercase text-[#D4AF37] font-bold mb-1">
            KRCE Memory Secret • {egg.year}
          </div>

          <h3 className="font-serif-title text-2xl font-bold text-[#FDFCF0] mb-2">
            {egg.title}
          </h3>

          <p className="font-editorial text-lg text-[#FDFCF0] italic leading-relaxed mb-5">
            “{egg.message}”
          </p>

          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-lg bg-[#D4AF37] hover:bg-[#FDFCF0] text-[#050B18] font-bold text-xs uppercase tracking-[0.2em] shadow-lg hover:brightness-110 active:scale-95 cursor-pointer transition-all"
          >
            Keep Exploring
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
