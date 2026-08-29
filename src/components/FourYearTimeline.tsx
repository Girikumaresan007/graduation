import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Sparkles, CheckCircle2, Quote, ArrowUpRight } from 'lucide-react';
import { timelineYears } from '../data/timeline';

interface FourYearTimelineProps {
  onYearSelect?: (year: number) => void;
}

export const FourYearTimeline: React.FC<FourYearTimelineProps> = ({ onYearSelect }) => {
  const [activeYear, setActiveYear] = useState<number>(2021);

  return (
    <section
      id="timeline"
      className="relative py-20 px-4 sm:px-6 md:px-8 max-w-5xl mx-auto overflow-hidden"
    >
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0A1630] border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold tracking-[0.3em] uppercase mb-3 shadow-lg"
        >
          <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>The Chronicle</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#FDFCF0] mb-3"
        >
          FOUR YEARS IN MOTION
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm sm:text-base text-[#CBD5E1] font-light"
        >
          From hesitant first-day introductions to confident graduation farewells.
        </motion.p>
      </div>

      {/* Timeline Quick Selector Pill Bar for Mobile & Desktop */}
      <div className="flex items-center justify-center gap-2 mb-12 overflow-x-auto pb-2 px-2 no-scrollbar">
        {timelineYears.map((item) => (
          <button
            key={`pill-${item.year}`}
            onClick={() => {
              setActiveYear(item.year);
              if (onYearSelect) onYearSelect(item.year);
              const el = document.getElementById(`year-card-${item.year}`);
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }}
            className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300 shrink-0 cursor-pointer ${activeYear === item.year ? 'bg-[#D4AF37] text-[#050B18] shadow-lg shadow-[#D4AF37]/25 scale-105 font-bold' : 'bg-[#0A1630] text-[#CBD5E1] border border-[#D4AF37]/20 hover:border-[#D4AF37]/50'}`}
          >
            {item.year} • {item.title}
          </button>
        ))}
      </div>

      {/* Vertical Timeline Track */}
      <div className="relative border-l-2 border-[#D4AF37]/30 ml-4 sm:ml-32 space-y-12 sm:space-y-16">
        {timelineYears.map((item, index) => (
          <motion.div
            key={item.year}
            id={`year-card-${item.year}`}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: index * 0.1 }}
            onViewportEnter={() => setActiveYear(item.year)}
            className="relative pl-6 sm:pl-10"
          >
            {/* Year Node Badge on Timeline Line */}
            <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-[#050B18] border-2 border-[#D4AF37] flex items-center justify-center shadow-lg shadow-[#D4AF37]/30 z-10">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37]" />
            </div>

            {/* Desktop Left-side Year Heading */}
            <div className="sm:absolute sm:-left-32 sm:top-1 sm:w-24 sm:text-right hidden sm:block">
              <span className="font-display text-2xl font-bold text-[#D4AF37] block">
                {item.year}
              </span>
              <span className="text-[10px] tracking-[0.25em] text-[#94A3B8] uppercase block">
                {item.badge}
              </span>
            </div>

            {/* Main Milestone Card */}
            <div className="bg-gradient-to-br from-[#0A1630] to-[#071026] border border-[#D4AF37]/25 hover:border-[#D4AF37]/50 rounded-xl p-6 sm:p-8 backdrop-blur-md shadow-2xl transition-all duration-300">
              {/* Mobile Year Badge */}
              <div className="flex sm:hidden items-center justify-between gap-2 mb-3">
                <span className="font-display text-xl font-bold text-[#D4AF37]">
                  {item.year}
                </span>
                <span className="text-[10px] tracking-[0.25em] uppercase px-2.5 py-0.5 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30 font-medium">
                  {item.badge}
                </span>
              </div>

              {/* Title & Tagline */}
              <h3 className="font-serif-title text-2xl sm:text-3xl font-semibold text-[#FDFCF0] mb-1">
                “{item.title}”
              </h3>
              <p className="text-xs sm:text-sm text-[#D4AF37] font-medium tracking-wide mb-4 italic">
                {item.tagline}
              </p>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#CBD5E1] font-light leading-relaxed mb-6">
                {item.description}
              </p>

              {/* Core Moments Checklist */}
              <div className="space-y-2 mb-6">
                <div className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#94A3B8]">
                  Key Memories & Milestones
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {item.moments.map((moment, mIdx) => (
                    <div
                      key={mIdx}
                      className="flex items-start gap-2 text-xs text-[#CBD5E1] bg-[#050B18]/80 p-2.5 rounded-lg border border-[#D4AF37]/15"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                      <span className="leading-snug">{moment}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Emotional Batch Quote */}
              <div className="flex items-start gap-3 p-3.5 rounded-lg bg-[#D4AF37]/5 border border-[#D4AF37]/20 text-[#FDFCF0] text-xs italic font-editorial">
                <Quote className="w-4 h-4 text-[#D4AF37] shrink-0 opacity-80" />
                <span>{item.quote}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
