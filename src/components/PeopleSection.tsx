import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Users, Search, Sparkles, MapPin, Award, Quote } from 'lucide-react';
import { batchmates } from '../data/people';

export const PeopleSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPeople = batchmates.filter((p) => {
    const q = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.nickname.toLowerCase().includes(q) ||
      p.roleTitle.toLowerCase().includes(q) ||
      p.specialSkill.toLowerCase().includes(q)
    );
  });

  return (
    <section
      id="people"
      className="relative py-20 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0A1630] border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold tracking-[0.3em] uppercase mb-3 shadow-lg"
        >
          <Users className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>CSE-A Roster</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#FDFCF0] mb-3"
        >
          THE PEOPLE WHO MADE IT SPECIAL
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm sm:text-base text-[#CBD5E1] font-light max-w-xl mx-auto mb-6"
        >
          The coders, dreamers, backbench philosophers, and lifelong friends of KRCE CSE-A Batch 2021–2025.
        </motion.p>

        {/* Search Input for Mobile & Desktop */}
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4AF37]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search classmates by name, nickname or superpower..."
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#0A1630] border border-[#D4AF37]/30 text-[#FDFCF0] placeholder-[#94A3B8] text-xs sm:text-sm focus:outline-none focus:border-[#D4AF37] shadow-lg backdrop-blur-md"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[#94A3B8] hover:text-[#FDFCF0] cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Classmates Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredPeople.map((person, idx) => (
          <motion.div
            key={person.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.05 }}
            className="group relative rounded-xl overflow-hidden bg-gradient-to-b from-[#0A1630] to-[#071026] border border-[#D4AF37]/25 hover:border-[#D4AF37]/70 shadow-xl p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5"
          >
            <div>
              {/* Profile Header with Avatar & Badge */}
              <div className="flex items-center gap-3.5 mb-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#D4AF37]/50 p-0.5 shrink-0 bg-[#050B18]">
                  <img
                    src={person.avatar}
                    alt={person.name}
                    loading="lazy"
                    className="w-full h-full rounded-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <div>
                  <h3 className="font-serif-title text-base font-bold text-[#FDFCF0] group-hover:text-[#D4AF37] transition-colors leading-tight">
                    {person.name}
                  </h3>
                  <div className="text-xs text-[#D4AF37] font-medium tracking-wide">
                    “{person.nickname}”
                  </div>
                </div>
              </div>

              {/* Role / Funny Title */}
              <div className="inline-block text-[11px] uppercase tracking-[0.2em] font-semibold px-2.5 py-1 rounded-lg bg-[#D4AF37]/10 text-[#FDFCF0] border border-[#D4AF37]/30 mb-3 w-full text-center">
                {person.roleTitle}
              </div>

              {/* Quote */}
              <div className="relative text-xs text-[#CBD5E1] font-light leading-relaxed mb-4 italic pl-3 border-l-2 border-[#D4AF37]/40 font-editorial">
                “{person.quote}”
              </div>
            </div>

            {/* Superpower & Campus Spot */}
            <div className="pt-3 border-t border-white/10 space-y-1.5 text-[11px] text-[#94A3B8]">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-[#D4AF37] shrink-0" />
                <span className="truncate">{person.specialSkill}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-[#D4AF37] shrink-0" />
                <span className="truncate">{person.favoriteSpot}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
