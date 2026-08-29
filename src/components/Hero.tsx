import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Compass, GraduationCap, ChevronDown } from 'lucide-react';
import { KrceBuildingSketch } from './KrceBuildingSketch';
import { siteConfig } from '../data/site';

interface HeroProps {
  onExploreClick: () => void;
  onYearEasterEgg: (year: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onYearEasterEgg }) => {
  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex flex-col items-center justify-center pt-20 pb-16 px-4 sm:px-6 md:px-8 overflow-hidden"
    >
      {/* Subtle radial ambient gradient background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#0E1E40]/30 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto w-full flex flex-col items-center text-center">
        {/* Academic & Batch Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0A1630]/90 border border-[#D4AF37]/40 text-[#D4AF37] text-xs sm:text-sm font-medium tracking-[0.3em] uppercase mb-5 shadow-2xl backdrop-blur-md"
        >
          <GraduationCap className="w-4 h-4 text-[#D4AF37]" />
          <span>K. Ramakrishnan College of Engineering</span>
        </motion.div>

        {/* Main Batch Branding */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex flex-col items-center mb-4"
        >
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-[#FDFCF0] flex items-center gap-3">
            <span>KRCE</span>
            <span className="text-[#D4AF37] text-3xl sm:text-5xl font-light">|</span>
            <span className="gold-gradient-text">CSE-A</span>
          </h1>

          {/* Interactive Years with Easter Egg */}
          <div className="flex items-center gap-3 mt-2 text-lg sm:text-xl font-serif-title font-semibold tracking-[0.3em] text-[#FDFCF0]">
            <button
              onClick={() => onYearEasterEgg('2021')}
              className="hover:text-[#D4AF37] transition-colors cursor-pointer active:scale-95 py-0.5 px-1.5 rounded focus:outline-none"
              title="Tap to trigger 2021 memories"
            >
              2021
            </button>
            <span className="text-[#D4AF37]">—</span>
            <button
              onClick={() => onYearEasterEgg('2025')}
              className="hover:text-[#D4AF37] transition-colors cursor-pointer active:scale-95 py-0.5 px-1.5 rounded focus:outline-none underline decoration-[#D4AF37] decoration-1 underline-offset-4"
              title="Tap to trigger 2025 memories"
            >
              2025
            </button>
            <span className="text-xs uppercase tracking-[0.3em] px-2.5 py-0.5 rounded bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30 ml-2 font-sans font-bold">
              BATCH
            </span>
          </div>
        </motion.div>

        {/* Cinematic Headline & Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="max-w-2xl mx-auto my-3"
        >
          <h2 className="font-editorial text-2xl sm:text-3xl md:text-4xl text-[#FDFCF0] font-normal leading-tight">
            “THE END OF A CHAPTER, <br className="hidden sm:inline" />
            <span className="text-[#D4AF37] italic font-serif">THE START OF FOREVER.”</span>
          </h2>

          <p className="mt-3 text-sm sm:text-base text-[#CBD5E1] font-light max-w-lg mx-auto leading-relaxed">
            {siteConfig.subheading}
          </p>
        </motion.div>

        {/* Hero Visual: Pencil Sketch of KRCE Building (Pristine on Mobile & Desktop) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.4 }}
          className="w-full my-6 max-w-2xl"
        >
          <KrceBuildingSketch />
        </motion.div>

        {/* Action Buttons & Smooth Scroll Prompt */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto mt-2"
        >
          <button
            id="hero-explore-btn"
            onClick={onExploreClick}
            className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-[#D4AF37] hover:bg-[#FDFCF0] text-[#050B18] font-bold text-xs sm:text-sm tracking-[0.25em] uppercase flex items-center justify-center gap-2.5 shadow-xl shadow-[#D4AF37]/20 active:scale-95 transition-all cursor-pointer"
          >
            <Compass className="w-4 h-4 text-[#050B18]" />
            <span>Enter Our Digital Capsule</span>
          </button>

          <a
            href="#story"
            className="w-full sm:w-auto px-6 py-3.5 rounded-lg bg-[#0A1630] hover:bg-[#122244] text-xs sm:text-sm text-[#FDFCF0] font-semibold tracking-[0.25em] uppercase border border-[#D4AF37]/30 flex items-center justify-center gap-2 transition-all"
          >
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span>Where It All Began</span>
          </a>
        </motion.div>

        {/* Scroll Indicator */}
        <div className="mt-10 flex flex-col items-center text-[#94A3B8] opacity-75 animate-bounce">
          <span className="text-[10px] tracking-[0.3em] uppercase">Scroll To Relive</span>
          <ChevronDown className="w-4 h-4 text-[#D4AF37] mt-0.5" />
        </div>
      </div>
    </section>
  );
};
