import React from 'react';
import { motion } from 'motion/react';
import { ArrowUp, Sparkles, Heart } from 'lucide-react';
import { siteConfig } from '../data/site';

interface FarewellSectionProps {
  onScrollToTop: () => void;
}

export const FarewellSection: React.FC<FarewellSectionProps> = ({ onScrollToTop }) => {
  return (
    <footer
      id="farewell"
      className="relative bg-gradient-to-b from-[#050B18] via-[#030710] to-[#01040A] pt-24 pb-16 px-4 sm:px-6 md:px-8 text-center overflow-hidden border-t border-[#D4AF37]/25"
    >
      {/* Background Starry Depth */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-[#D4AF37] rounded-full animate-ping" />
        <div className="absolute bottom-1/3 right-1/4 w-1.5 h-1.5 bg-amber-100 rounded-full animate-pulse" />
        <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-blue-300 rounded-full animate-ping" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* Crest Line */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <span className="h-px w-12 sm:w-24 bg-gradient-to-r from-transparent to-[#D4AF37]" />
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          <span className="h-px w-12 sm:w-24 bg-gradient-to-l from-transparent to-[#D4AF37]" />
        </div>

        {/* The Chapter Ends. The Memories Don't. */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-4 mb-10"
        >
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#FDFCF0] leading-tight">
            THE CHAPTER ENDS. <br />
            <span className="gold-gradient-text">THE MEMORIES DON’T.</span>
          </h2>

          <div className="flex items-center justify-center gap-3 text-lg sm:text-2xl font-serif-title font-semibold tracking-widest text-[#FDFCF0] pt-2">
            <span>2021 — 2025</span>
            <span className="text-[#D4AF37]">•</span>
            <span className="text-[#D4AF37]">CSE-A</span>
            <span className="text-[#D4AF37]">•</span>
            <span>KRCE</span>
          </div>

          <p className="font-editorial text-xl sm:text-2xl text-[#CBD5E1] italic max-w-xl mx-auto pt-3">
            “Wherever life takes us, a part of us will always remain here at KRCE.”
          </p>
        </motion.div>

        {/* Blessing & Script Farewell */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-4 my-8"
        >
          <div className="text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase text-[#D4AF37]">
            NEW JOURNEYS AWAIT.
          </div>
          <div className="text-sm sm:text-base font-medium tracking-[0.2em] uppercase text-[#FDFCF0]/90">
            GO FORTH AND MAKE US PROUD.
          </div>

          {/* Elegant Handwritten Script Typography */}
          <div className="pt-4 pb-2">
            <span className="font-script text-5xl sm:text-7xl text-[#D4AF37] block drop-shadow-lg">
              Happy Farewell
            </span>
            <span className="font-editorial text-sm italic text-[#94A3B8] tracking-wider block mt-1">
              Class of 2021–2025 • Department of Computer Science & Engineering
            </span>
          </div>
        </motion.div>

        {/* ONE LAST LOOK - Scroll back interaction */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 pt-8 border-t border-white/10 flex flex-col items-center gap-3 w-full"
        >
          <button
            id="one-last-look-btn"
            onClick={onScrollToTop}
            className="group flex flex-col items-center gap-2 px-6 py-3.5 rounded-xl bg-[#0A1630] hover:bg-[#122244] border border-[#D4AF37]/40 text-[#D4AF37] hover:text-[#FDFCF0] shadow-2xl transition-all duration-300 active:scale-95 cursor-pointer"
          >
            <div className="flex items-center gap-2 text-xs font-bold tracking-[0.25em] uppercase">
              <span>ONE LAST LOOK</span>
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
            </div>
          </button>

          <p className="font-editorial text-sm sm:text-base text-[#94A3B8] italic">
            “Until we meet again.”
          </p>

          <div className="text-[10px] tracking-widest text-[#94A3B8] uppercase mt-4 space-y-1">
            <div>{siteConfig.collegeName} • {siteConfig.department}</div>
            <div>Samayapuram, Tiruchirappalli, Tamil Nadu • Affiliated to Anna University, Chennai</div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
