import React from 'react';
import { motion } from 'motion/react';
import { Landmark, MapPin, Award, Compass } from 'lucide-react';
import { siteConfig } from '../data/site';

export const CollegeStory: React.FC = () => {
  return (
    <section
      id="story"
      className="relative py-20 px-4 sm:px-6 md:px-8 max-w-6xl mx-auto overflow-hidden"
    >
      {/* Decorative Gold Header Accents */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0A1630] border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold tracking-[0.3em] uppercase mb-3 shadow-lg"
        >
          <Landmark className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Genesis of CSE-A</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#FDFCF0] mb-3"
        >
          WHERE IT ALL BEGAN
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-serif-title text-xl sm:text-2xl text-[#D4AF37] italic tracking-wide"
        >
          {siteConfig.collegeName}
        </motion.p>
        <p className="text-xs sm:text-sm font-medium text-[#FDFCF0]/90 mt-1">
          {siteConfig.department}
        </p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-2 text-xs text-[#CBD5E1] mt-2 tracking-wider"
        >
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Samayapuram, Tiruchirappalli, Tamil Nadu</span>
          </span>
          <span className="text-[#D4AF37]">•</span>
          <span className="text-[#D4AF37] font-semibold">Affiliated to Anna University, Chennai</span>
        </motion.div>
      </div>

      {/* Campus Tribute Story & Architectural Feature Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Side: Campus Photography & Tribute Banner */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-6 relative rounded-xl overflow-hidden border border-[#D4AF37]/30 shadow-2xl bg-[#0A1630] group"
        >
          <div className="aspect-[4/3] w-full overflow-hidden relative">
            <img
              src="https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1200&auto=format&fit=crop"
              alt="K. Ramakrishnan College of Engineering Campus Boulevard"
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-90 contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050B18] via-[#050B18]/40 to-transparent" />

            <div className="absolute bottom-4 left-4 right-4 z-10">
              <div className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold mb-1">
                The Sacred Campus
              </div>
              <h3 className="text-lg sm:text-xl font-editorial font-medium text-[#FDFCF0]">
                “More than a campus. It became a part of our story.”
              </h3>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Narrative & Batch Milestones */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-6 space-y-6"
        >
          <div className="bg-[#0A1630]/90 border border-[#D4AF37]/25 rounded-xl p-6 sm:p-8 backdrop-blur-md shadow-2xl">
            <h4 className="font-serif-title text-2xl text-[#FDFCF0] font-semibold mb-3">
              The Four Pillars of CSE-A
            </h4>
            <p className="text-sm text-[#CBD5E1] font-light leading-relaxed mb-6">
              When we first stepped through the grand KRCE archway in 2021, we carried timid expectations. Over 8 semesters, the labs turned into brainstorm arenas, corridors echoed our laughter, and professors became mentors. Today, we leave not just with an engineering degree, but with a family forged in code, camaraderie, and character.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
              {siteConfig.stats.map((stat, index) => (
                <div key={index} className="space-y-1">
                  <div className="font-display text-xl sm:text-2xl font-bold text-[#D4AF37]">
                    {stat.value}
                  </div>
                  <div className="text-xs text-[#94A3B8] leading-tight tracking-wide">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 px-5 py-4 rounded-xl bg-[#0A1630] border border-[#D4AF37]/30 shadow-lg">
            <Award className="w-8 h-8 text-[#D4AF37] shrink-0" />
            <div>
              <div className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
                Class Legacy
              </div>
              <div className="text-xs text-[#CBD5E1] mt-0.5">
                Class of Computer Science & Engineering Section A (2021–2025)
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
