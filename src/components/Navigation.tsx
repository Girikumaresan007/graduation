import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, Menu, X, GraduationCap, Sparkles, Compass } from 'lucide-react';
import { soundtrack } from '../utils/audioSynth';

interface NavigationProps {
  onEasterEggTrigger?: (year: string) => void;
}

export const Navigation: React.FC<NavigationProps> = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSoundtrack = () => {
    if (!isAudioPlaying) {
      soundtrack.play();
      setIsAudioPlaying(true);
      setIsMuted(false);
    } else {
      const muted = soundtrack.toggleMute();
      setIsMuted(muted);
    }
  };

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Our Story', href: '#story' },
    { label: 'Timeline', href: '#timeline' },
    { label: 'Memories', href: '#memories' },
    { label: 'Videos', href: '#videos' },
    { label: 'Farewell', href: '#farewell' }
  ];

  return (
    <>
      {/* Top Floating Glass Navigation */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#050B18]/90 backdrop-blur-xl border-b border-[#D4AF37]/20 py-3 shadow-2xl shadow-black/40'
            : 'bg-gradient-to-b from-[#050B18]/90 to-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo / Brand */}
          <a
            href="#hero"
            className="flex items-center gap-2.5 group focus:outline-none"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-[#0E1E40] to-[#071024] border border-[#D4AF37]/40 flex items-center justify-center shadow-md group-hover:border-[#D4AF37] transition-colors">
              <GraduationCap className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-sm font-bold tracking-wider text-[#FDFCF0] flex items-center gap-1.5">
                <span>KRCE</span>
                <span className="text-[#D4AF37]">•</span>
                <span className="gold-gradient-text">CSE-A</span>
              </span>
              <span className="text-[10px] tracking-[0.25em] text-[#94A3B8] uppercase">
                Batch 2021–2025
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#CBD5E1]">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-[#D4AF37] transition-colors py-1 relative group"
              >
                <span>{link.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D4AF37] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* Right Action Controls: Audio Toggle & Mobile Menu */}
          <div className="flex items-center gap-2.5">
            {/* Audio Toggle Button */}
            <button
              onClick={toggleSoundtrack}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase border transition-all cursor-pointer ${
                isAudioPlaying && !isMuted
                  ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                  : 'bg-[#0A1630] hover:bg-[#122244] border-[#D4AF37]/30 text-[#CBD5E1]'
              }`}
              title={isAudioPlaying && !isMuted ? 'Mute ambient soundtrack' : 'Play graduation soundtrack'}
            >
              {isAudioPlaying && !isMuted ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 animate-pulse text-[#D4AF37]" />
                  <span className="hidden sm:inline text-[10px] tracking-widest text-[#D4AF37]">Sound On</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline text-[10px] tracking-widest">Play Music</span>
                </>
              )}
            </button>

            {/* Mobile Hamburger Trigger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-lg bg-[#0A1630] border border-[#D4AF37]/30 text-[#D4AF37] focus:outline-none active:scale-95"
              aria-label="Open mobile navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-50 bg-[#050B18]/98 backdrop-blur-2xl p-6 flex flex-col justify-between overflow-y-auto"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-6 h-6 text-[#D4AF37]" />
                <span className="font-display text-lg font-bold text-[#FDFCF0]">
                  KRCE CSE-A (2021–2025)
                </span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-full bg-white/10 text-white hover:text-[#D4AF37]"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Links List */}
            <div className="space-y-4 my-8">
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-center justify-between text-xl font-serif-title font-bold text-[#FDFCF0] hover:text-[#D4AF37] py-2 border-b border-white/5 transition-colors"
                >
                  <span>{link.label}</span>
                  <span className="text-xs text-[#D4AF37] font-sans font-light tracking-widest">
                    0{idx + 1}
                  </span>
                </motion.a>
              ))}
            </div>

            {/* Drawer Bottom Audio & Details */}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <button
                onClick={() => {
                  toggleSoundtrack();
                }}
                className="w-full py-3.5 rounded-lg bg-[#D4AF37] hover:bg-[#FDFCF0] text-[#050B18] font-bold text-xs uppercase tracking-[0.25em] flex items-center justify-center gap-2 shadow-lg shadow-[#D4AF37]/20 transition-colors"
              >
                <Volume2 className="w-4 h-4" />
                <span>{isAudioPlaying && !isMuted ? 'Mute Music' : 'Play Ambient Soundtrack'}</span>
              </button>

              <div className="text-center text-[10px] text-[#94A3B8] uppercase tracking-[0.3em] pt-2">
                K. Ramakrishnan College of Engineering • Samayapuram
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
