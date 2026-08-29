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

      {/* Vertical Timeline Track with Animated Glow */}
      <div className="relative border-l-2 border-[#D4AF37]/30 ml-4 sm:ml-32 space-y-12 sm:space-y-16">
        {timelineYears.map((item, index) => (
          <motion.div
            key={item.year}
            id={`year-card-${item.year}`}
            initial={{ opacity: 0, y: 35, x: 10 }}
            whileInView={{ opacity: 1, y: 0, x: 0 }}
            viewport={{ once: false, margin: '-50px' }}
            transition={{ duration: 0.7, delay: index * 0.12, ease: 'easeOut' }}
            className="relative pl-6 sm:pl-10 group"
          >
            {/* Pulsing Year Node Badge on Timeline Line */}
            <div
              onClick={() => onYearSelect && onYearSelect(item.year)}
              className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-[#050B18] border-2 border-[#D4AF37] flex items-center justify-center shadow-lg shadow-[#D4AF37]/40 z-10 group-hover:scale-115 group-hover:border-[#FFF7D6] transition-all duration-300 cursor-pointer"
              title={`Click to reveal ${item.year} memories`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] group-hover:bg-[#FFF7D6] animate-pulse" />
              <span className="absolute inset-0 rounded-full bg-[#D4AF37]/20 animate-ping opacity-75" />
            </div>

            {/* Desktop Left-side Year Heading */}
            <div className="sm:absolute sm:-left-32 sm:top-1 sm:w-24 sm:text-right hidden sm:block">
              <button
                onClick={() => onYearSelect && onYearSelect(item.year)}
                className="font-display text-2xl font-bold text-[#D4AF37] group-hover:text-[#FFF7D6] hover:scale-110 transition-all block drop-shadow-md text-right w-full cursor-pointer focus:outline-none"
                title={`Click to view ${item.year} memory secret`}
              >
                {item.year}
              </button>
              <span className="text-[10px] tracking-[0.25em] text-[#94A3B8] uppercase block font-semibold">
                {item.badge}
              </span>
            </div>

            {/* Main Milestone Card with Animated Glow & Hover Effect */}
            <motion.div
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ duration: 0.25 }}
              className="bg-gradient-to-br from-[#0A1630] via-[#071026] to-[#0A1630] border border-[#D4AF37]/25 hover:border-[#D4AF37]/70 rounded-xl p-6 sm:p-8 backdrop-blur-md shadow-2xl transition-all duration-300 hover:shadow-[#D4AF37]/15"
            >
              {/* Mobile Year Badge */}
              <div className="flex sm:hidden items-center justify-between gap-2 mb-3">
                <button
                  onClick={() => onYearSelect && onYearSelect(item.year)}
                  className="font-display text-xl font-bold text-[#D4AF37] hover:text-[#FFF7D6] cursor-pointer"
                >
                  {item.year}
                </button>
                <span className="text-[10px] tracking-[0.25em] uppercase px-2.5 py-0.5 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30 font-bold">
                  {item.badge}
                </span>
              </div>

              {/* Title & Tagline */}
              <h3 className="font-serif-title text-2xl sm:text-3xl font-semibold text-[#FDFCF0] group-hover:text-[#D4AF37] transition-colors mb-1">
                “{item.title}”
              </h3>
              <p className="text-xs sm:text-sm text-[#D4AF37] font-medium tracking-wide mb-4 italic">
                {item.tagline}
              </p>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#CBD5E1] font-light leading-relaxed mb-6">
                {item.description}
              </p>

              {/* Core Moments Checklist with Animated Entry */}
              <div className="space-y-2 mb-6">
                <div className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#94A3B8] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Key Memories & Milestones</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {item.moments.map((moment, mIdx) => (
                    <motion.div
                      key={mIdx}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: mIdx * 0.08 }}
                      whileHover={{ scale: 1.02, backgroundColor: 'rgba(10, 22, 48, 0.95)' }}
                      className="flex items-start gap-2 text-xs text-[#CBD5E1] bg-[#050B18]/90 p-3 rounded-lg border border-[#D4AF37]/20 shadow-sm transition-all"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                      <span className="leading-snug font-medium">{moment}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Emotional Batch Quote */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="flex items-start gap-3 p-4 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#FDFCF0] text-xs sm:text-sm italic font-editorial shadow-md"
              >
                <Quote className="w-4 h-4 text-[#D4AF37] shrink-0 opacity-90 mt-0.5" />
                <span>{item.quote}</span>
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
