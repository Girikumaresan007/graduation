import React, { useState } from 'react';

interface KrceBuildingSketchProps {
  className?: string;
}

export const KrceBuildingSketch: React.FC<KrceBuildingSketchProps> = ({
  className = '',
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      id="krce-sketch-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative w-full aspect-[16/10] max-w-3xl mx-auto rounded-2xl overflow-hidden bg-[#040814] border-2 border-[#D4AF37]/50 shadow-[0_20px_60px_rgba(0,0,0,0.9)] p-2 sm:p-3 transition-all duration-500 ${
        isHovered ? 'border-[#D4AF37] shadow-[0_0_50px_rgba(212,175,55,0.4)]' : ''
      } ${className}`}
    >
      {/* Golden Backlight Ambient Glow */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-96 h-48 bg-[#D4AF37]/20 rounded-full blur-3xl pointer-events-none z-0" />

      {/* Main Clean Image Container */}
      <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#0A142A] border border-[#D4AF37]/30">
        <img
          src="/krce-arch.jpg"
          alt="K. Ramakrishnan College of Engineering Main Entrance Gate Arch & Tower"
          className="w-full h-full object-cover object-center filter contrast-[1.05] brightness-[1.02] group-hover:scale-103 transition-transform duration-700 ease-out"
        />
      </div>
    </div>
  );
};
