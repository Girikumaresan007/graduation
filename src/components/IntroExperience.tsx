import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, Volume2 } from 'lucide-react';
import { soundtrack } from '../utils/audioSynth';

interface IntroExperienceProps {
  onComplete: () => void;
}

export const IntroExperience: React.FC<IntroExperienceProps> = ({ onComplete }) => {
  const [step, setStep] = useState<number>(0);
  const [yearDisplay, setYearDisplay] = useState<string>('2021');

  useEffect(() => {
    // Step 0: "Four years."
    const t1 = setTimeout(() => setStep(1), 1000);
    // Step 1: "Countless memories."
    const t2 = setTimeout(() => setStep(2), 2200);
    // Step 2: "One unforgettable chapter."
    const t3 = setTimeout(() => setStep(3), 3400);
    // Step 3: Morph to KRCE CSE-A & Year count
    const t4 = setTimeout(() => {
      setStep(4);
      // Morph year 2021 -> 2022 -> 2023 -> 2024 -> 2025
      const years = ['2021', '2022', '2023', '2024', '2025'];
      years.forEach((yr, idx) => {
        setTimeout(() => {
          setYearDisplay(yr);
        }, idx * 280);
      });
    }, 4600);
    // Step 5: "Welcome to our memories" + Tap to Begin
    const t5 = setTimeout(() => setStep(5), 6200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, []);

  const handleStart = (withAudio = true) => {
    if (withAudio) {
      soundtrack.play();
    }
    onComplete();
  };

  return (
    <div
      id="intro-experience-overlay"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050B18] text-[#FDFCF0] px-6 select-none overflow-hidden"
    >
      {/* Background Star Ambient Dust */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-1/4 left-1/5 w-1 h-1 bg-[#D4AF37] rounded-full animate-ping" />
        <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-[#FDFCF0] rounded-full animate-pulse" />
        <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-[#D4AF37] rounded-full animate-pulse" />
        <div className="absolute top-2/3 right-1/5 w-1 h-1 bg-[#D4AF37] rounded-full animate-ping" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050B18] via-[#08152E] to-[#050B18] opacity-80" />
      </div>

      {/* Skip button for rapid access */}
      <button
        id="intro-skip-btn"
        onClick={() => handleStart(false)}
        className="absolute top-6 right-6 text-xs tracking-[0.25em] uppercase text-[#94A3B8] hover:text-[#D4AF37] transition-colors py-2 px-3 rounded-full border border-white/10 hover:border-[#D4AF37]/40 backdrop-blur-sm z-20"
      >
        Skip Intro
      </button>

      {/* Main Narrative Container */}
      <div className="relative z-10 max-w-lg w-full text-center flex flex-col items-center justify-center min-h-[380px]">
        {/* Lines 1, 2, 3 */}
        {step < 4 && (
          <div className="space-y-6">
            <AnimatePresence>
              {step >= 1 && (
                <motion.p
                  key="line-1"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="font-editorial text-2xl md:text-3xl text-[#FDFCF0] italic tracking-wide"
                >
                  Four years.
                </motion.p>
              )}
              {step >= 2 && (
                <motion.p
                  key="line-2"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="font-editorial text-2xl md:text-3xl text-[#FDFCF0] italic tracking-wide"
                >
                  Countless memories.
                </motion.p>
              )}
              {step >= 3 && (
                <motion.p
                  key="line-3"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, ease: 'easeOut' }}
                  className="font-serif-title text-3xl md:text-4xl text-[#D4AF37] font-medium tracking-normal"
                >
                  One unforgettable chapter.
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Step 4 & 5: College Identity & Year Morph */}
        {step >= 4 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="flex flex-col items-center"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#D4AF37]" />
              <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[#D4AF37]">
                Graduation Memory Portal
              </span>
              <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#D4AF37]" />
            </div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-wider text-[#FDFCF0] mb-2">
              KRCE
            </h1>

            <div className="inline-block px-4 py-1 rounded-full bg-[#0A1630] border border-[#D4AF37]/40 text-[#FDFCF0] text-sm md:text-base font-medium tracking-widest mb-4">
              CSE-A BATCH
            </div>

            {/* Year Morph Display */}
            <div className="font-serif-title text-3xl md:text-4xl text-[#D4AF37] flex items-center justify-center gap-2 font-semibold">
              <span className="tracking-widest">2021</span>
              <span className="text-[#94A3B8] text-xl">—</span>
              <motion.span
                key={yearDisplay}
                initial={{ opacity: 0.4, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="text-[#FDFCF0] underline decoration-[#D4AF37] decoration-2 underline-offset-4"
              >
                {yearDisplay}
              </motion.span>
            </div>

            {/* Step 5: Welcome & Interaction CTA */}
            {step >= 5 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mt-10 flex flex-col items-center gap-4 w-full"
              >
                <p className="font-editorial italic text-xl md:text-2xl text-[#FDFCF0]">
                  Welcome to our memories.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-3 mt-4 w-full max-w-xs justify-center">
                  <button
                    id="intro-begin-btn"
                    onClick={() => handleStart(true)}
                    className="w-full py-3.5 px-6 rounded-lg bg-[#D4AF37] hover:bg-[#FDFCF0] text-[#050B18] font-bold text-xs uppercase tracking-[0.25em] flex items-center justify-center gap-2 shadow-lg shadow-[#D4AF37]/20 transition-all duration-200 cursor-pointer"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Enter With Music</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    id="intro-silent-btn"
                    onClick={() => handleStart(false)}
                    className="w-full py-3 px-4 rounded-lg bg-[#0A1630] hover:bg-[#122244] text-xs text-[#CBD5E1] font-semibold tracking-[0.2em] uppercase border border-[#D4AF37]/30 active:scale-95 transition-all cursor-pointer"
                  >
                    Enter Silently
                  </button>
                </div>

                <div className="flex items-center gap-1 text-[11px] text-[#94A3B8] mt-2">
                  <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                  <span>Turn on sound for the full graduation experience</span>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>

      {/* Bottom Subtle Badge */}
      <div className="absolute bottom-6 text-[10px] tracking-[0.3em] uppercase text-[#94A3B8] text-center">
        K. Ramakrishnan College of Engineering • Samayapuram
      </div>
    </div>
  );
};
