import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Images, Heart, X, ChevronLeft, ChevronRight, MapPin, Calendar, User, Sparkles, Filter } from 'lucide-react';
import { MemoryItem } from '../types';
import { photoMemories, galleryCategories } from '../data/memories';

export const MemoryGallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activePhoto, setActivePhoto] = useState<MemoryItem | null>(null);
  const [likesMap, setLikesMap] = useState<Record<string, number>>(() => {
    const map: Record<string, number> = {};
    photoMemories.forEach((p) => {
      map[p.id] = p.likes;
    });
    return map;
  });
  const [likedByUser, setLikedByUser] = useState<Record<string, boolean>>({});

  const filteredPhotos = selectedCategory === 'All'
    ? photoMemories
    : photoMemories.filter((p) => p.category === selectedCategory);

  const handleLike = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setLikedByUser((prev) => {
      const isCurrentlyLiked = !!prev[id];
      const newStatus = !isCurrentlyLiked;
      setLikesMap((prevLikes) => ({
        ...prevLikes,
        [id]: (prevLikes[id] || 0) + (newStatus ? 1 : -1)
      }));
      return { ...prev, [id]: newStatus };
    });
  };

  const handleNext = () => {
    if (!activePhoto) return;
    const currentIndex = filteredPhotos.findIndex((p) => p.id === activePhoto.id);
    const nextIndex = (currentIndex + 1) % filteredPhotos.length;
    setActivePhoto(filteredPhotos[nextIndex]);
  };

  const handlePrev = () => {
    if (!activePhoto) return;
    const currentIndex = filteredPhotos.findIndex((p) => p.id === activePhoto.id);
    const prevIndex = (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
    setActivePhoto(filteredPhotos[prevIndex]);
  };

  return (
    <section
      id="memories"
      className="relative py-20 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto overflow-hidden"
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
          <Images className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>The Visual Capsule</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#FDFCF0] mb-3"
        >
          MEMORIES WE'LL NEVER OUTGROW
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm sm:text-base text-[#CBD5E1] font-light max-w-xl mx-auto"
        >
          Unfiltered smiles, sleepless lab nights, and four years of pure camaraderie frozen in time.
        </motion.p>
      </div>

      {/* Category Filter Chips (Mobile-friendly horizontal scroll) */}
      <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
        {galleryCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-200 shrink-0 cursor-pointer ${selectedCategory === cat ? 'bg-[#D4AF37] text-[#050B18] font-bold shadow-lg shadow-[#D4AF37]/20' : 'bg-[#0A1630] text-[#CBD5E1] border border-[#D4AF37]/20 hover:border-[#D4AF37]/40'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Masonry Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {filteredPhotos.map((photo, idx) => (
          <motion.div
            key={photo.id}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            onClick={() => setActivePhoto(photo)}
            className="group relative rounded-xl overflow-hidden bg-[#0A1630] border border-[#D4AF37]/25 hover:border-[#D4AF37]/60 shadow-xl cursor-pointer transition-all duration-300 hover:-translate-y-1"
          >
            {/* Image Container with Aspect Ratio */}
            <div className={`w-full overflow-hidden ${idx % 3 === 0 ? 'aspect-[3/4]' : idx % 2 === 0 ? 'aspect-[4/3]' : 'aspect-square'}`}>
              <img
                src={photo.image}
                alt={photo.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-95 group-hover:brightness-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050B18] via-[#050B18]/25 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
            </div>

            {/* Badges on Top */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
              <span className="text-[10px] tracking-[0.2em] uppercase px-2.5 py-0.5 rounded-full bg-[#050B18]/90 text-[#D4AF37] border border-[#D4AF37]/40 font-semibold backdrop-blur-sm">
                {photo.year} • {photo.category}
              </span>

              <button
                onClick={(e) => handleLike(photo.id, e)}
                className={`pointer-events-auto p-1.5 rounded-full backdrop-blur-md transition-colors ${likedByUser[photo.id] ? 'bg-red-500/20 text-red-400 border border-red-500/40' : 'bg-black/50 text-white/80 hover:text-red-400 border border-white/10'}`}
                title="Like memory"
              >
                <Heart className={`w-3.5 h-3.5 ${likedByUser[photo.id] ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Bottom Details */}
            <div className="absolute bottom-3 left-3 right-3 pointer-events-none">
              <h3 className="text-sm font-serif-title font-semibold text-[#FDFCF0] group-hover:text-[#D4AF37] transition-colors leading-snug line-clamp-1">
                {photo.title}
              </h3>
              <p className="text-[11px] text-[#CBD5E1]/80 font-light line-clamp-2 mt-0.5">
                {photo.caption}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {activePhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 sm:p-6"
            onClick={() => setActivePhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full max-h-[90vh] bg-[#0A1630] border border-[#D4AF37]/40 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
            >
              {/* Close Button */}
              <button
                onClick={() => setActivePhoto(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-[#FDFCF0] hover:text-[#D4AF37] transition-colors border border-white/20"
                aria-label="Close memory viewer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Photo View */}
              <div className="relative md:w-3/5 bg-black flex items-center justify-center overflow-hidden min-h-[300px]">
                <img
                  src={activePhoto.image}
                  alt={activePhoto.title}
                  className="w-full h-full object-contain max-h-[60vh] md:max-h-[85vh]"
                />

                {/* Left/Right Carousel Nav */}
                <button
                  onClick={handlePrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/20 transition-all"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/20 transition-all"
                  aria-label="Next photo"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Memory Story Description */}
              <div className="md:w-2/5 p-6 flex flex-col justify-between overflow-y-auto max-h-[40vh] md:max-h-full">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs uppercase tracking-[0.25em] px-2.5 py-0.5 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30 font-semibold">
                      {activePhoto.category}
                    </span>
                    <span className="text-xs text-[#94A3B8]">
                      Year {activePhoto.year}
                    </span>
                  </div>

                  <h3 className="font-serif-title text-2xl font-bold text-[#FDFCF0] mb-2">
                    {activePhoto.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#CBD5E1] font-light leading-relaxed mb-4">
                    {activePhoto.caption}
                  </p>

                  <div className="space-y-2 pt-3 border-t border-white/10 text-xs text-[#94A3B8]">
                    {activePhoto.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>{activePhoto.location}</span>
                      </div>
                    )}
                    {activePhoto.author && (
                      <div className="flex items-center gap-2">
                        <User className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Contributed by: {activePhoto.author}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                  <button
                    onClick={() => handleLike(activePhoto.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold tracking-wider uppercase transition-colors ${likedByUser[activePhoto.id] ? 'bg-red-500/20 text-red-400 border border-red-500/40' : 'bg-white/5 hover:bg-white/10 text-[#FDFCF0] border border-white/10'}`}
                  >
                    <Heart className={`w-4 h-4 ${likedByUser[activePhoto.id] ? 'fill-current text-red-400' : ''}`} />
                    <span>{likesMap[activePhoto.id] || 0} Hearts</span>
                  </button>

                  <div className="text-[11px] text-[#94A3B8] italic tracking-wide">
                    KRCE CSE-A Time Capsule
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
