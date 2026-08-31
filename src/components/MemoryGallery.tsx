import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Images, ArrowRight } from 'lucide-react';
import { photoMemories } from '../data/memories';

interface MemoryGalleryProps {
  onNavigateToGallery?: (photoId?: string) => void;
}

export const MemoryGallery: React.FC<MemoryGalleryProps> = ({ onNavigateToGallery }) => {
  const [isMobile, setIsMobile] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.innerWidth < 640 : false
  );

  // Automatic slideshow rotation index for the 3 stack images
  const [photoStartIndex, setPhotoStartIndex] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Automatically cycle through 3 images every 3.5 seconds across all devices
  useEffect(() => {
    const timer = setInterval(() => {
      setPhotoStartIndex((prev) => (prev + 3) % photoMemories.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  // Top 3 photo memories dynamically cycled
  const stackPhotos = [
    photoMemories[photoStartIndex % photoMemories.length],
    photoMemories[(photoStartIndex + 1) % photoMemories.length],
    photoMemories[(photoStartIndex + 2) % photoMemories.length]
  ];

  const handleCardClick = (photoId: string) => {
    if (onNavigateToGallery) {
      onNavigateToGallery(photoId);
    } else {
      window.history.pushState({}, '', '/gallery');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  // Reference visual composition: Card 1 (-15°), Card 2 (+4°), Card 3 (-8°)
  const stackPositions = [
    { rotation: -15, xMobile: -65, xDesktop: -130, y: 10, zIndex: 10 },
    { rotation: 4, xMobile: -10, xDesktop: -20, y: -15, zIndex: 20 },
    { rotation: -8, xMobile: 55, xDesktop: 110, y: 5, zIndex: 30 },
  ];

  return (
    <section
      id="memories"
      className="relative py-16 sm:py-24 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto overflow-hidden flex flex-col items-center"
    >
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[550px] h-[320px] sm:h-[550px] bg-[#D4AF37]/10 rounded-full blur-[130px] pointer-events-none z-0" />

      {/* Header Section */}
      <div className="relative z-10 text-center max-w-3xl mx-auto mb-8 sm:mb-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0A1630] border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold tracking-[0.3em] uppercase mb-3 shadow-lg"
        >
          <Images className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>The Visual Capsule</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-display text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#FDFCF0] mb-3"
        >
          MEMORIES WE'LL NEVER OUTGROW
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xs sm:text-base text-[#CBD5E1] font-light max-w-xl mx-auto"
        >
          Unfiltered smiles, sleepless lab nights, and four years of pure camaraderie frozen in time.
        </motion.p>
      </div>

      {/* Overlapping 3-Photo Fan Stack - Automatic Cycling Enabled */}
      <div className="relative z-10 w-full max-w-4xl h-[260px] xs:h-[300px] sm:h-[400px] flex items-center justify-center mb-10 sm:mb-12 touch-pan-y overflow-visible">
        {stackPhotos.map((photo, index) => {
          const pos = stackPositions[index] || stackPositions[0];
          const posX = isMobile ? pos.xMobile : pos.xDesktop;

          return (
            <motion.div
              key={`${photo.id}-${index}`}
              initial={{ opacity: 0, scale: 0.85, x: posX, y: 25 }}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: pos.rotation,
                x: posX,
                y: pos.y,
                zIndex: pos.zIndex,
              }}
              transition={{
                duration: 0.6,
                type: 'spring',
                stiffness: 160,
                damping: 18,
              }}
              whileHover={{
                scale: 1.07,
                x: posX,
                y: pos.y - 18,
                rotate: pos.rotation * 0.4,
                zIndex: 60,
                transition: { type: 'spring', stiffness: 350, damping: 22 },
              }}
              whileTap={{ scale: 0.95, x: posX, zIndex: 60 }}
              onClick={() => handleCardClick(photo.id)}
              className="absolute cursor-pointer overflow-hidden rounded-[2rem] sm:rounded-[2.75rem] border-[6px] sm:border-[8px] border-[#0A1630] ring-1 ring-[#D4AF37]/45 shadow-[0_25px_60px_rgba(0,0,0,0.7)] bg-[#0A1630] group select-none transition-shadow duration-300 hover:shadow-[0_30px_70px_rgba(212,175,55,0.3)] active:border-[#D4AF37]"
              style={{
                width: 'clamp(155px, 44vw, 270px)',
                height: 'clamp(155px, 44vw, 270px)',
              }}
            >
              {/* Clean Photo Image - Text Badge Removed */}
              <div className="w-full h-full relative overflow-hidden bg-black/50">
                <img
                  src={photo.image}
                  alt={photo.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-95 group-hover:brightness-105 pointer-events-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050B18]/40 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Narrative & Navigation Call To Action */}
      <div className="relative z-10 text-center max-w-xl mx-auto space-y-5">
        <p className="text-sm sm:text-lg font-serif-title font-normal tracking-tight text-[#FDFCF0]/90 leading-relaxed">
          People don’t just recall memories. <br className="hidden sm:block" />
          They fall in love with how four years felt.
        </p>

        <div className="flex justify-center pt-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleCardClick('')}
            className="group flex items-center gap-2.5 px-7 sm:px-9 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37] text-[#050B18] font-bold text-xs sm:text-sm tracking-wider uppercase shadow-xl shadow-[#D4AF37]/25 hover:shadow-[#D4AF37]/45 transition-all cursor-pointer border border-[#D4AF37]/40"
          >
            <span>Explore Full Gallery</span>
            <ArrowRight className="w-4 h-4 text-[#050B18] group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>
      </div>
    </section>
  );
};
