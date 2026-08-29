import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface KrceBuildingSketchProps {
  className?: string;
  isDetailed?: boolean;
}

export const KrceBuildingSketch: React.FC<KrceBuildingSketchProps> = ({
  className = '',
  isDetailed = true
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      id="krce-sketch-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative w-full aspect-[16/10] max-w-2xl mx-auto rounded-xl overflow-hidden bg-gradient-to-b from-[#0A1630] via-[#071026] to-[#050B18] border border-[#D4AF37]/30 shadow-2xl p-4 sm:p-6 transition-all duration-500 ${isHovered ? 'border-[#D4AF37]/60 shadow-[0_0_35px_rgba(212,175,55,0.25)]' : ''} ${className}`}
    >
      {/* Background Architectural Blueprint Grid Lines */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[linear-gradient(to_right,#D4AF37_1px,transparent_1px),linear-gradient(to_bottom,#D4AF37_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* Golden Ambient Glow behind Central Arch */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-64 h-36 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Floating Stardust Particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-4 left-8 w-1 h-1 bg-[#D4AF37] rounded-full animate-pulse" />
        <div className="absolute top-12 right-12 w-1.5 h-1.5 bg-[#FDFCF0] rounded-full animate-ping opacity-60" />
        <div className="absolute bottom-8 left-16 w-1 h-1 bg-[#D4AF37] rounded-full animate-pulse" />
        <div className="absolute bottom-12 right-20 w-1 h-1 bg-[#D4AF37] rounded-full animate-ping opacity-40" />
      </div>

      {/* Architectural SVG Illustration of KRCE Main Academic Block & Grand Entrance */}
      <svg
        id="krce-architectural-sketch"
        viewBox="0 0 800 500"
        className="w-full h-full object-contain relative z-10 filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="K. Ramakrishnan College of Engineering Academic Block Architectural Sketch"
      >
        <defs>
          {/* Gradients for Sketch Strokes */}
          <linearGradient id="goldStroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF6E0" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#AA802A" />
          </linearGradient>

          <linearGradient id="blueprintStroke" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3" />
          </linearGradient>

          <linearGradient id="roofFill" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#0A1630" stopOpacity="0.6" />
          </linearGradient>
        </defs>

        {/* Foundation & Ground Steps */}
        <path d="M 60 440 L 740 440" stroke="url(#goldStroke)" strokeWidth="3" className="animate-draw-stroke" />
        <path d="M 80 450 L 720 450" stroke="#D4AF37" strokeWidth="1.5" strokeOpacity="0.7" />
        <path d="M 110 460 L 690 460" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.4" />

        {/* Main Base Pediment & Steps to Central Porch */}
        <path d="M 280 440 L 520 440 L 510 425 L 290 425 Z" fill="#0A1630" stroke="url(#goldStroke)" strokeWidth="1.5" />
        <path d="M 300 425 L 500 425 L 490 410 L 310 410 Z" fill="#0E1E40" stroke="url(#goldStroke)" strokeWidth="1.5" />

        {/* Outer Left Wing Block */}
        <rect x="90" y="240" width="180" height="190" fill="url(#roofFill)" stroke="url(#blueprintStroke)" strokeWidth="1.5" />
        <line x1="90" y1="290" x2="270" y2="290" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.5" />
        <line x1="90" y1="340" x2="270" y2="340" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.5" />
        <line x1="90" y1="390" x2="270" y2="390" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.5" />

        {/* Left Wing Windows Matrix */}
        {[0, 1, 2].map((row) =>
          [0, 1, 2, 3].map((col) => (
            <rect
              key={`win-l-${row}-${col}`}
              x={105 + col * 40}
              y={255 + row * 50}
              width="24"
              height="26"
              rx="2"
              fill="#050B18"
              stroke="#D4AF37"
              strokeWidth="1"
              strokeOpacity="0.7"
            />
          ))
        )}

        {/* Left Wing Roof Parapet */}
        <path d="M 80 240 L 280 240 L 270 225 L 90 225 Z" fill="#0E1E40" stroke="url(#goldStroke)" strokeWidth="1.5" />

        {/* Outer Right Wing Block */}
        <rect x="530" y="240" width="180" height="190" fill="url(#roofFill)" stroke="url(#blueprintStroke)" strokeWidth="1.5" />
        <line x1="530" y1="290" x2="710" y2="290" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.5" />
        <line x1="530" y1="340" x2="710" y2="340" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.5" />
        <line x1="530" y1="390" x2="710" y2="390" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.5" />

        {/* Right Wing Windows Matrix */}
        {[0, 1, 2].map((row) =>
          [0, 1, 2, 3].map((col) => (
            <rect
              key={`win-r-${row}-${col}`}
              x={545 + col * 40}
              y={255 + row * 50}
              width="24"
              height="26"
              rx="2"
              fill="#050B18"
              stroke="#D4AF37"
              strokeWidth="1"
              strokeOpacity="0.7"
            />
          ))
        )}

        {/* Right Wing Roof Parapet */}
        <path d="M 520 240 L 720 240 L 710 225 L 530 225 Z" fill="#0E1E40" stroke="url(#goldStroke)" strokeWidth="1.5" />

        {/* Central Iconic Administrative & Grand Entry Block */}
        <rect x="270" y="160" width="260" height="250" fill="#071026" stroke="url(#goldStroke)" strokeWidth="2" />

        {/* Grand Pillars of the KRCE Entrance */}
        <line x1="300" y1="410" x2="300" y2="280" stroke="url(#goldStroke)" strokeWidth="3" />
        <line x1="340" y1="410" x2="340" y2="280" stroke="url(#goldStroke)" strokeWidth="3" />
        <line x1="460" y1="410" x2="460" y2="280" stroke="url(#goldStroke)" strokeWidth="3" />
        <line x1="500" y1="410" x2="500" y2="280" stroke="url(#goldStroke)" strokeWidth="3" />

        {/* Center Grand Entrance Arch */}
        <path
          d="M 360 410 L 360 330 Q 400 300 440 330 L 440 410 Z"
          fill="#050B18"
          stroke="url(#goldStroke)"
          strokeWidth="2"
        />

        {/* Inner Glass Doors of Entry */}
        <line x1="400" y1="315" x2="400" y2="410" stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="3 3" />
        <path d="M 375 350 L 425 350" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.5" />

        {/* Center 1st Floor Balcony & Classical Balustrade */}
        <rect x="290" y="270" width="220" height="15" fill="#0E1E40" stroke="url(#goldStroke)" strokeWidth="1.5" />

        {/* Upper Floor Windows with Classical Arches */}
        {[0, 1, 2].map((i) => (
          <g key={`arch-win-${i}`}>
            <path
              d={`M ${320 + i * 60} 250 L ${320 + i * 60} 200 Q ${340 + i * 60} 185 ${360 + i * 60} 200 L ${360 + i * 60} 250 Z`}
              fill="#050B18"
              stroke="url(#goldStroke)"
              strokeWidth="1.5"
            />
            <line x1={340 + i * 60} y1={190} x2={340 + i * 60} y2={250} stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.6" />
          </g>
        ))}

        {/* Iconic Central Dome & Clock Pediment Tower */}
        <path d="M 260 160 L 540 160 L 520 135 L 280 135 Z" fill="#0A1630" stroke="url(#goldStroke)" strokeWidth="2" />
        <polygon points="400,75 340,135 460,135" fill="#0E1E40" stroke="url(#goldStroke)" strokeWidth="2" />

        {/* Central Architectural Clock / Emblem */}
        <circle cx="400" cy="115" r="14" fill="#050B18" stroke="url(#goldStroke)" strokeWidth="2" />
        <circle cx="400" cy="115" r="3" fill="#D4AF37" />
        <line x1="400" y1="115" x2="400" y2="106" stroke="#FDFCF0" strokeWidth="1.5" />
        <line x1="400" y1="115" x2="408" y2="115" stroke="#FDFCF0" strokeWidth="1.5" />

        {/* Flagstaff & Academic Crest atop the Tower */}
        <line x1="400" y1="75" x2="400" y2="40" stroke="url(#goldStroke)" strokeWidth="2" />
        <polygon points="400,42 425,50 400,58" fill="#D4AF37" />

        {/* College Name Typography on Facade */}
        <text
          x="400"
          y="152"
          textAnchor="middle"
          fill="#FDFCF0"
          fontSize="11"
          fontWeight="bold"
          fontFamily="'Cinzel', serif"
          letterSpacing="2.5"
        >
          K. RAMAKRISHNAN COLLEGE OF ENGINEERING
        </text>

        <text
          x="400"
          y="280"
          textAnchor="middle"
          fill="#D4AF37"
          fontSize="9"
          fontWeight="600"
          fontFamily="'Cinzel', serif"
          letterSpacing="3"
        >
          DEPARTMENT OF COMPUTER SCIENCE & ENGINEERING
        </text>

        {/* Campus Landscaping: Elegant Palm Trees on left & right */}
        {/* Left Palm Tree */}
        <g opacity="0.85">
          <path d="M 65 440 Q 60 370 70 300" stroke="#D4AF37" strokeWidth="3" />
          <path d="M 70 300 Q 30 290 20 320" stroke="#a3e635" strokeWidth="1.5" strokeOpacity="0.8" />
          <path d="M 70 300 Q 50 270 35 285" stroke="#a3e635" strokeWidth="1.5" strokeOpacity="0.8" />
          <path d="M 70 300 Q 80 260 70 275" stroke="#a3e635" strokeWidth="1.5" strokeOpacity="0.8" />
          <path d="M 70 300 Q 100 270 105 290" stroke="#a3e635" strokeWidth="1.5" strokeOpacity="0.8" />
          <path d="M 70 300 Q 110 300 120 325" stroke="#a3e635" strokeWidth="1.5" strokeOpacity="0.8" />
        </g>

        {/* Right Palm Tree */}
        <g opacity="0.85">
          <path d="M 735 440 Q 740 370 730 300" stroke="#D4AF37" strokeWidth="3" />
          <path d="M 730 300 Q 770 290 780 320" stroke="#a3e635" strokeWidth="1.5" strokeOpacity="0.8" />
          <path d="M 730 300 Q 750 270 765 285" stroke="#a3e635" strokeWidth="1.5" strokeOpacity="0.8" />
          <path d="M 730 300 Q 720 260 730 275" stroke="#a3e635" strokeWidth="1.5" strokeOpacity="0.8" />
          <path d="M 730 300 Q 700 270 695 290" stroke="#a3e635" strokeWidth="1.5" strokeOpacity="0.8" />
          <path d="M 730 300 Q 690 300 680 325" stroke="#a3e635" strokeWidth="1.5" strokeOpacity="0.8" />
        </g>
      </svg>

      {/* Sketch Details Badge */}
      <div className="relative z-20 mt-3 flex items-center justify-between text-[11px] text-[#D4AF37]/90 border-t border-[#D4AF37]/20 pt-2">
        <div className="flex items-center gap-1.5 font-medium tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>KRCE Architectural Blueprint & Entrance Arch</span>
        </div>
        <span className="text-[10px] tracking-[0.25em] text-[#94A3B8] uppercase">
          Samayapuram Campus • Trichy
        </span>
      </div>
    </div>
  );
};
