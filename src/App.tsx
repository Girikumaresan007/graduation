import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { IntroExperience } from './components/IntroExperience';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { ThreeMemoryScene } from './components/ThreeMemoryScene';
import { CollegeStory } from './components/CollegeStory';
import { FourYearTimeline } from './components/FourYearTimeline';
import { MemoryGallery } from './components/MemoryGallery';
import { VideoMemories } from './components/VideoMemories';
import { MemoryWall } from './components/MemoryWall';
import { PeopleSection } from './components/PeopleSection';
import { CreateMemory } from './components/CreateMemory';
import { GraduationCelebration } from './components/GraduationCelebration';
import { QRMemorySection } from './components/QRMemorySection';
import { FarewellSection } from './components/FarewellSection';
import { EasterEggsModal } from './components/EasterEggsModal';

export default function App() {
  const [introFinished, setIntroFinished] = useState(false);
  const [activeEgg, setActiveEgg] = useState<{ title: string; message: string; year: string } | null>(null);
  const [easterEggClicks, setEasterEggClicks] = useState<Record<string, number>>({});

  const handleYearEasterEgg = (year: string) => {
    const nextCount = (easterEggClicks[year] || 0) + 1;
    setEasterEggClicks((prev) => ({ ...prev, [year]: nextCount }));

    if (year === '2021') {
      setActiveEgg({
        year: '2021',
        title: 'Where It All Began',
        message: "That's where everything started. A batch of strangers walking into KRCE with shy smiles and big dreams."
      });
    } else if (year === '2025') {
      setActiveEgg({
        year: '2025',
        title: 'And Here We Are',
        message: "And here we are. Four years passed like lightning, leaving behind an immortal bond and a family for life."
      });
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleExploreClick = () => {
    const el = document.getElementById('story');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#050B18] text-[#FDFCF0] font-sans overflow-x-hidden selection:bg-[#D4AF37] selection:text-[#050B18]">
      {/* 1. Cinematic Opening Screen */}
      <AnimatePresence>
        {!introFinished && (
          <IntroExperience onComplete={() => setIntroFinished(true)} />
        )}
      </AnimatePresence>

      {/* Top Accent Gradient Bar (Signature Elegant Dark Feature) */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-40 z-50 pointer-events-none" />

      {/* 2. Floating 3D WebGL Background Scene (Lightweight & Performance-Optimized) */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-40 overflow-hidden">
        <ThreeMemoryScene />
      </div>

      {/* 3. Subtle Dot Matrix Texture & Atmospheric Radial Glows */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(#FDFCF0 0.5px, transparent 0.5px)',
          backgroundSize: '32px 32px'
        }}
      />
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-[#122244]/15 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="fixed bottom-0 right-1/4 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[160px] pointer-events-none z-0" />

      {/* Side Vertical Year Rail for Large Screens (Elegant Dark Archetype) */}
      <aside className="fixed right-6 lg:right-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-6 items-center z-30 pointer-events-auto">
        <div className="h-24 w-[1px] bg-gradient-to-b from-transparent via-[#D4AF37]/40 to-transparent" />
        <div className="flex flex-col gap-5 text-[10px] font-bold tracking-[0.4em] text-[#FDFCF0]/40 [writing-mode:vertical-lr] rotate-180">
          <button
            onClick={() => handleYearEasterEgg('2021')}
            className="hover:text-[#D4AF37] hover:scale-110 transition-all cursor-pointer"
          >
            2021
          </button>
          <button
            onClick={() => handleYearEasterEgg('2022')}
            className="hover:text-[#D4AF37] hover:scale-110 transition-all cursor-pointer"
          >
            2022
          </button>
          <button
            onClick={() => handleYearEasterEgg('2023')}
            className="hover:text-[#D4AF37] hover:scale-110 transition-all cursor-pointer"
          >
            2023
          </button>
          <button
            onClick={() => handleYearEasterEgg('2024')}
            className="hover:text-[#D4AF37] hover:scale-110 transition-all cursor-pointer"
          >
            2024
          </button>
          <button
            onClick={() => handleYearEasterEgg('2025')}
            className="text-[#D4AF37] opacity-100 scale-125 font-extrabold"
          >
            2025
          </button>
        </div>
        <div className="h-24 w-[1px] bg-gradient-to-b from-transparent via-[#D4AF37]/40 to-transparent" />
      </aside>

      {/* 4. Main Navigation */}
      <Navigation onEasterEggTrigger={handleYearEasterEgg} />

      {/* 5. Main Content Container */}
      <main className="relative z-10">
        {/* Hero Section */}
        <Hero
          onExploreClick={handleExploreClick}
          onYearEasterEgg={handleYearEasterEgg}
        />

        {/* Separator Line */}
        <div className="max-w-5xl mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
        </div>

        {/* Where It All Began: College Homage */}
        <CollegeStory />

        {/* Separator Line */}
        <div className="max-w-5xl mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
        </div>

        {/* Four Years Timeline */}
        <FourYearTimeline onYearSelect={(yr) => handleYearEasterEgg(yr.toString())} />

        {/* Separator Line */}
        <div className="max-w-5xl mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
        </div>

        {/* Photo Memory Gallery */}
        <MemoryGallery />

        {/* Separator Line */}
        <div className="max-w-5xl mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
        </div>

        {/* Video Memories Reel */}
        <VideoMemories />

        {/* Separator Line */}
        <div className="max-w-5xl mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
        </div>

        {/* Memory Wall Sticky Board */}
        <MemoryWall />

        {/* Separator Line */}
        <div className="max-w-5xl mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
        </div>

        {/* CSE-A Batchmates Roster */}
        <PeopleSection />

        {/* Separator Line */}
        <div className="max-w-5xl mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
        </div>

        {/* Interactive AI Memory Generator */}
        <CreateMemory />

        {/* Separator Line */}
        <div className="max-w-5xl mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
        </div>

        {/* Graduation Cap Toss Celebration */}
        <GraduationCelebration />

        {/* Separator Line */}
        <div className="max-w-5xl mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
        </div>

        {/* QR Companion & Offline Time Capsule Section */}
        <QRMemorySection />

        {/* Emotional Farewell Footer */}
        <FarewellSection onScrollToTop={handleScrollToTop} />
      </main>

      {/* 6. Easter Egg Popup Modal */}
      <EasterEggsModal egg={activeEgg} onClose={() => setActiveEgg(null)} />
    </div>
  );
}
