import React, { useState } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { GraduationCap, Sparkles, PartyPopper, Heart, Award } from 'lucide-react';
import { siteConfig } from '../data/site';

export const GraduationCelebration: React.FC = () => {
  const [celebratedCount, setCelebratedCount] = useState(128);
  const [hasCelebrated, setHasCelebrated] = useState(false);

  const triggerCelebration = () => {
    // Haptic vibration if supported on mobile
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate([80, 40, 80]);
      } catch {
        // Ignore
      }
    }

    setCelebratedCount((prev) => prev + 1);
    setHasCelebrated(true);

    // Luxury Gold, Navy & Ivory Confetti Cannon
    const count = 200;
    const defaults = {
      origin: { y: 0.7 }
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      colors: ['#D4AF37', '#FDFCF0', '#FFFFFF']
    });
    fire(0.2, {
      spread: 60,
      colors: ['#D4AF37', '#3B82F6', '#0A1630']
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
      colors: ['#D4AF37', '#FDFCF0', '#93C5FD']
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
      colors: ['#D4AF37', '#ECD599']
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
      colors: ['#60A5FA', '#FEF08A']
    });
  };

  return (
    <section
      id="celebration"
      className="relative py-24 px-4 sm:px-6 md:px-8 max-w-5xl mx-auto overflow-hidden text-center"
    >
      {/* Background Subtle Shimmer */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#D4AF37]/15 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Animated Graduation Cap */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: 'spring' }}
          className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-[#0A1630] via-[#0D1C3C] to-[#050B18] border-2 border-[#D4AF37] shadow-2xl mb-6 group cursor-pointer"
          onClick={triggerCelebration}
        >
          <GraduationCap className="w-10 h-10 sm:w-12 sm:h-12 text-[#D4AF37] group-hover:rotate-12 transition-transform duration-300" />
        </motion.div>

        {/* Celebratory Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#FDFCF0] leading-tight mb-4"
        >
          WE CAME AS STRANGERS. <br />
          <span className="text-[#D4AF37]">WE LEARNED AS A TEAM.</span> <br />
          <span className="gold-gradient-text">WE LEAVE AS ENGINEERS.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-editorial text-xl sm:text-2xl text-[#CBD5E1] italic mb-8 max-w-xl mx-auto"
        >
          “Ready to chase our dreams with the unstoppable spirit of CSE-A.”
        </motion.p>

        {/* Big Celebration Action Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col items-center gap-3"
        >
          <button
            id="celebrate-btn"
            onClick={triggerCelebration}
            className="px-10 py-4 rounded-lg bg-[#D4AF37] hover:bg-[#FDFCF0] text-[#050B18] font-bold text-sm sm:text-base tracking-[0.2em] uppercase flex items-center justify-center gap-3 shadow-2xl shadow-[#D4AF37]/30 active:scale-95 transition-all cursor-pointer"
          >
            <PartyPopper className="w-5 h-5 text-[#050B18]" />
            <span>CELEBRATE WITH US</span>
            <Sparkles className="w-5 h-5 text-[#050B18]" />
          </button>

          <div className="flex items-center gap-2 text-xs text-[#94A3B8] mt-2">
            <Heart className="w-3.5 h-3.5 text-red-400 fill-current" />
            <span>
              {celebratedCount} Classmates & Friends have cheered for Batch 2021–2025
            </span>
          </div>

          {hasCelebrated && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 px-6 py-2 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#FDFCF0] text-xs font-medium tracking-wide"
            >
              🎉 Congratulations CSE-A Batch! Proud Engineers of KRCE!
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};
