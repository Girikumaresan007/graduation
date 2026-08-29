import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { GraduationCap } from 'lucide-react';

interface NavigationProps {
  onEasterEggTrigger?: (year: string) => void;
}

// 1. Home SVG Icon Component
const HomeIconSvg: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 10.5L12 3L21 10.5V20C21 20.5523 20.5523 21 20 21H14V14H10V21H4C3.44772 21 3 20.5523 3 20V10.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 7V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// 2. Story / Heritage Facade SVG Icon Component
const StoryIconSvg: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 21H21M4 18H20M4 10H20M12 3L3 10H21L12 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6 10V18M10 10V18M14 10V18M18 10V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// 3. Chronicle / Timeline Calendar SVG Icon Component
const TimelineIconSvg: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="4" width="18" height="17" rx="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16 2V6M8 2V6M3 9H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="8" cy="13" r="1.25" fill="currentColor" />
    <circle cx="12" cy="13" r="1.25" fill="currentColor" />
    <circle cx="16" cy="13" r="1.25" fill="currentColor" />
    <circle cx="8" cy="17" r="1.25" fill="currentColor" />
    <circle cx="12" cy="17" r="1.25" fill="currentColor" />
    <path d="M15 17.5L16.5 19L19.5 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// 4. Memory Gallery Photo Frame SVG Icon Component
const GalleryIconSvg: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="2" />
    <circle cx="8.5" cy="8.5" r="2" fill="currentColor" />
    <path d="M21 15L16 10L5 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// 5. Video Reel Film SVG Icon Component
const ReelIconSvg: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="2" />
    <path d="M7 3V21M17 3V21M3 8.5H7M17 8.5H21M3 15.5H7M17 15.5H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <polygon points="10,9 15,12 10,15" fill="currentColor" />
  </svg>
);

// 6. Memory Wall Chat SVG Icon Component
const WallIconSvg: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 12C21 16.4183 16.9706 20 12 20C10.4607 20 9.01172 19.6565 7.729 19.0477L3 20.5L4.47547 16.2737C3.5414 15.027 3 13.5694 3 12C3 7.58172 7.02944 4 12 4C16.9706 4 21 7.58172 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 9.5C12 9.5 10.5 8 9 9.5C7.5 11 12 14.5 12 14.5C12 14.5 16.5 11 15 9.5C13.5 8 12 9.5 12 9.5Z" fill="currentColor" />
  </svg>
);

// 7. People Roster SVG Icon Component
const PeopleIconSvg: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17 21V19C17 16.7909 15.2091 15 13 15H5C2.79086 15 1 16.7909 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
    <path d="M23 21V19C22.9986 17.1771 21.765 15.5857 20 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M16 3.13C17.7699 3.58316 19.0078 5.16871 19.0078 7C19.0078 8.83129 17.7699 10.4168 16 10.87" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const Navigation: React.FC<NavigationProps> = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const bottomNavItems = [
    { id: 'hero', label: 'Home', href: '#hero', icon: HomeIconSvg },
    { id: 'story', label: 'Story', href: '#story', icon: StoryIconSvg },
    { id: 'timeline', label: 'Chronicle', href: '#timeline', icon: TimelineIconSvg },
    { id: 'memories', label: 'Gallery', href: '#memories', icon: GalleryIconSvg },
    { id: 'videos', label: 'Reels', href: '#videos', icon: ReelIconSvg },
    { id: 'wall', label: 'Wall', href: '#wall', icon: WallIconSvg },
    { id: 'people', label: 'People', href: '#people', icon: PeopleIconSvg }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = bottomNavItems.map((item) => item.id);
      const scrollPos = window.scrollY + 250;

      for (let i = sections.length - 1; i >= 0; i--) {
        const secEl = document.getElementById(sections[i]);
        if (secEl && secEl.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Our Story', href: '#story' },
    { label: 'Timeline', href: '#timeline' },
    { label: 'Memories', href: '#memories' },
    { label: 'Videos', href: '#videos' },
    { label: 'People', href: '#people' },
    { label: 'Time Capsule', href: '#create-memory' },
    { label: 'Farewell', href: '#farewell' }
  ];

  return (
    <>
      {/* Top Floating Glass Navigation Header */}
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
        </div>
      </header>

      {/* Ultra-Premium Floating Bottom Dock with Custom HD Vector SVG Icons */}
      <div className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 w-[95vw] sm:w-auto max-w-xl pointer-events-auto">
        <motion.nav
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative flex items-center justify-between sm:justify-center gap-1 sm:gap-4 px-3 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#040814]/80 border-2 border-[#D4AF37]/50 shadow-[0_15px_50px_rgba(0,0,0,0.9)] backdrop-blur-3xl ring-1 ring-[#FFF7D6]/20 overflow-visible"
        >
          {bottomNavItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeSection === item.id;

            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveSection(item.id);
                  const targetEl = document.getElementById(item.id);
                  if (targetEl) {
                    targetEl.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className={`relative flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-full transition-colors duration-300 group cursor-pointer ${
                  isActive ? 'text-[#050B18]' : 'text-[#CBD5E1] hover:text-[#FFF7D6]'
                }`}
                aria-label={item.label}
              >
                {/* Fluid Sliding Active Gold Bubble Indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeDockBubble"
                    className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#D4AF37] via-[#FFF7D6] to-[#E6C35C] shadow-[0_0_20px_rgba(212,175,55,0.5)] z-0"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}

                {/* Custom Vector SVG Icon */}
                <IconComponent
                  className={`w-4 h-4 sm:w-5 sm:h-5 z-10 transition-transform duration-200 ${
                    isActive ? 'scale-105 text-[#050B18]' : 'group-hover:scale-115'
                  }`}
                />

                {/* Animated Floating Label Tooltip on Hover / Active */}
                <div
                  className={`absolute -top-10 px-2.5 py-1 rounded-md bg-[#0A1630] border border-[#D4AF37]/60 text-[#FFF7D6] text-[9.5px] sm:text-[10.5px] font-extrabold tracking-widest uppercase shadow-2xl whitespace-nowrap pointer-events-none transition-all duration-200 z-20 ${
                    isActive
                      ? 'opacity-100 scale-100 -translate-y-1'
                      : 'opacity-0 scale-90 translate-y-1 group-hover:opacity-100 group-hover:scale-100 group-hover:-translate-y-1'
                  }`}
                >
                  {item.label}
                  <div className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-1.5 h-1.5 bg-[#0A1630] rotate-45 border-r border-b border-[#D4AF37]/60" />
                </div>
              </a>
            );
          })}
        </motion.nav>
      </div>
    </>
  );
};
