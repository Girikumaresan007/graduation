import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Film, Play, X, Clock } from 'lucide-react';
import { VideoItem } from '../types';
import { videoMemories } from '../data/videos';

export const VideoMemories: React.FC = () => {
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  return (
    <section
      id="videos"
      className="relative py-16 sm:py-20 px-4 sm:px-6 md:px-8 max-w-6xl mx-auto overflow-hidden"
    >
      {/* Video Cards Grid - Clean Video Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videoMemories.map((video, idx) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            onClick={() => setActiveVideo(video)}
            className="group relative rounded-2xl overflow-hidden bg-[#0A1630] border border-[#D4AF37]/25 hover:border-[#D4AF37]/60 shadow-xl cursor-pointer transition-all duration-300 hover:-translate-y-1.5 flex flex-col"
          >
            {/* Poster Thumbnail */}
            <div className="relative aspect-video w-full overflow-hidden bg-black">
              <img
                src={video.poster}
                alt={video.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-90 group-hover:brightness-100"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />

              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-[#D4AF37] text-[#050B18] flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-[#FDFCF0] transition-all duration-300">
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                </div>
              </div>

              {/* Badges on Video Top */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.2em] px-2.5 py-0.5 rounded-full bg-[#050B18]/90 text-[#D4AF37] border border-[#D4AF37]/40 font-semibold backdrop-blur-sm">
                  {video.category}
                </span>

                <span className="text-[10px] tracking-wider px-2 py-0.5 rounded-full bg-black/70 text-[#FDFCF0] font-medium flex items-center gap-1 backdrop-blur-sm">
                  <Clock className="w-3 h-3 text-[#D4AF37]" />
                  {video.duration}
                </span>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-serif-title text-lg font-bold text-[#FDFCF0] group-hover:text-[#D4AF37] transition-colors leading-snug line-clamp-1 mb-2">
                  {video.title}
                </h3>
                <p className="text-xs text-[#CBD5E1] font-light line-clamp-2 leading-relaxed">
                  {video.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-[#94A3B8]">
                <span>KRCE CSE-A Archive</span>
                <span className="text-[#D4AF37] font-medium tracking-wide">Watch Full Reel →</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Video Modal Player */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 sm:p-6"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-[#0A1630] border border-[#D4AF37]/40 rounded-2xl overflow-hidden shadow-2xl"
            >
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/70 text-[#FDFCF0] hover:text-[#D4AF37] transition-colors border border-white/20"
                aria-label="Close video player"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-video w-full bg-black">
                <video
                  src={activeVideo.videoUrl}
                  poster={activeVideo.poster}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
