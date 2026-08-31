import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, GraduationCap } from 'lucide-react';
import { siteConfig } from '../data/site';

interface IntroExperienceProps {
  onComplete: () => void;
}

export const IntroExperience: React.FC<IntroExperienceProps> = ({ onComplete }) => {
  const [step, setStep] = useState<number>(0);
  const [yearDisplay, setYearDisplay] = useState<string>('2021');

  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    // Step 0: "Four years."
    timeouts.push(setTimeout(() => setStep(1), 1000));
    // Step 1: "Countless memories."
    timeouts.push(setTimeout(() => setStep(2), 2200));
    // Step 2: "One unforgettable chapter."
    timeouts.push(setTimeout(() => setStep(3), 3400));
    // Step 3: Morph to KRCE CSE A & Year count (starts at 4600ms)
    timeouts.push(
      setTimeout(() => {
        setStep(4);
        // Morph year 2021 -> 2022 -> 2023 -> 2024 -> 2025 with 650ms per step
        const years = ['2021', '2022', '2023', '2024', '2025'];
        years.forEach((yr, idx) => {
          timeouts.push(
            setTimeout(() => {
              setYearDisplay(yr);
            }, idx * 650)
          );
        });
      }, 4600)
    );
    // Step 5: "Welcome to our memories" + Enter Button revealed later (at 8800ms)
    timeouts.push(setTimeout(() => setStep(5), 8800));

    return () => {
      timeouts.forEach((t) => clearTimeout(t));
    };
  }, []);

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

        {/* Step 4 & 5: College Identity & Centered Batch Display */}
        {step >= 4 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="flex flex-col items-center text-center w-full"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#D4AF37]" />
              <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#D4AF37]">
                GRADUATION MEMORY PORTAL
              </span>
              <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#D4AF37]" />
            </div>

            {/* Centered Batch Structure */}
            <div className="flex flex-col items-center justify-center my-3 text-center">
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-wider text-[#FDFCF0]">
                KRCE CSE A
              </h1>

              <div className="my-2">
                <span className="inline-block px-4 py-1 rounded-full bg-[#0A1630] border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold tracking-[0.3em] uppercase shadow-md">
                  BATCH
                </span>
              </div>

              {/* Year Morph Display */}
              <div className="font-serif-title text-3xl sm:text-4xl text-[#D4AF37] flex items-center justify-center gap-3 font-semibold mt-1 min-h-[48px]">
                <span className="tracking-widest text-[#FDFCF0]">2021</span>
                <span className="text-[#94A3B8] text-xl">—</span>
                <div className="relative inline-flex items-center justify-start min-w-[72px]">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={yearDisplay}
                      initial={{ opacity: 0, y: -10, scale: 0.92 }}
                      animate={{ opacity: 1, y: 0, scale: yearDisplay === '2025' ? 1.08 : 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.92 }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      className={`inline-block underline decoration-[#D4AF37] decoration-2 underline-offset-4 ${
                        yearDisplay === '2025'
                          ? 'text-[#D4AF37] font-bold drop-shadow-[0_0_15px_rgba(212,175,55,0.7)]'
                          : 'text-[#FDFCF0]'
                      }`}
                    >
                      {yearDisplay}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Step 5: Welcome & Interaction CTA */}
            {step >= 5 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mt-6 flex flex-col items-center gap-4 w-full"
              >
                <p className="font-editorial italic text-lg sm:text-xl text-[#CBD5E1] max-w-md mx-auto leading-relaxed">
                  “Step into four years of unforgettable moments, lifelong friendships, and our shared journey at KRCE.”
                </p>

                <div className="flex items-center justify-center mt-2 w-full max-w-xs">
                  <button
                    id="intro-enter-btn"
                    onClick={onComplete}
                    className="w-full py-4 px-8 rounded-lg bg-[#D4AF37] hover:bg-[#FDFCF0] text-[#050B18] font-bold text-xs uppercase tracking-[0.25em] flex items-center justify-center gap-2.5 shadow-xl shadow-[#D4AF37]/25 transition-all duration-200 cursor-pointer active:scale-95"
                  >
                    <span>ENTER MEMORY PORTAL</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-1.5 text-[11px] text-[#94A3B8] mt-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Class of Computer Science & Engineering Section A</span>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>

      {/* Bottom Subtle Badge with College, Location & Anna University Details */}
      <div className="absolute bottom-6 flex flex-col items-center gap-1 text-center px-4">
        <div className="text-[11px] tracking-[0.25em] uppercase font-semibold text-[#CBD5E1]">
          {siteConfig.collegeName}
        </div>
        <div className="text-[10px] tracking-[0.2em] uppercase text-[#94A3B8] flex items-center gap-2 flex-wrap justify-center">
          <span>Samayapuram, Tiruchirappalli</span>
          <span>•</span>
          <span className="text-[#D4AF37]">Affiliated to Anna University, Chennai</span>
        </div>
      </div>
    </div>
  );
};

