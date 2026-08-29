import React, { useState } from 'react';
import { Sparkles, Building2, MapPin } from 'lucide-react';
import { siteConfig } from '../data/site';

interface KrceBuildingSketchProps {
  className?: string;
  isDetailed?: boolean;
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
      className={`relative w-full aspect-[16/10] max-w-3xl mx-auto rounded-2xl overflow-hidden bg-gradient-to-b from-[#0B1736] via-[#071128] to-[#040915] border border-[#D4AF37]/35 shadow-2xl p-4 sm:p-6 transition-all duration-500 ${isHovered ? 'border-[#D4AF37]/75 shadow-[0_0_45px_rgba(212,175,55,0.3)]' : ''} ${className}`}
    >
      {/* Background Architectural Blueprint Grid Lines */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[linear-gradient(to_right,#D4AF37_1px,transparent_1px),linear-gradient(to_bottom,#D4AF37_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* Golden Ambient Radial Glow behind Central Tower */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-44 bg-[#D4AF37]/20 rounded-full blur-3xl pointer-events-none" />

      {/* Floating Stardust Sparkle Particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-6 left-12 w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-ping opacity-75" />
        <div className="absolute top-16 right-16 w-2 h-2 bg-[#FDFCF0] rounded-full animate-pulse opacity-80" />
        <div className="absolute bottom-10 left-20 w-1 h-1 bg-[#D4AF37] rounded-full animate-pulse" />
        <div className="absolute bottom-14 right-24 w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-ping opacity-60" />
      </div>

      {/* Architectural Vector Render of KRCE Main Academic Block */}
      <svg
        id="krce-architectural-sketch"
        viewBox="0 0 800 500"
        className="w-full h-full object-contain relative z-10 filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.7)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="K. Ramakrishnan College of Engineering Academic Block Architectural Sketch"
      >
        <defs>
          {/* Gradients for Architectural Render */}
          <linearGradient id="goldStroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF7D6" />
            <stop offset="40%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#997220" />
          </linearGradient>

          <linearGradient id="buildingFill" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0F2044" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#060C1B" stopOpacity="0.95" />
          </linearGradient>

          <linearGradient id="windowGlow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFEA9F" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.3" />
          </linearGradient>

          <linearGradient id="entranceArchGlow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFF4D1" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#D4AF37" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#050B18" stopOpacity="0.9" />
          </linearGradient>
        </defs>

        {/* Base Ground Layers & Campus Pathway */}
        <path d="M 40 445 L 760 445" stroke="url(#goldStroke)" strokeWidth="3.5" />
        <path d="M 60 455 L 740 455" stroke="#D4AF37" strokeWidth="1.5" strokeOpacity="0.7" />
        <path d="M 90 465 L 710 465" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.4" />

        {/* Main Base Pediment & Approach Steps to Central Porch */}
        <path d="M 260 445 L 540 445 L 525 430 L 275 430 Z" fill="#0A1630" stroke="url(#goldStroke)" strokeWidth="2" />
        <path d="M 285 430 L 515 430 L 505 415 L 295 415 Z" fill="#0E1E40" stroke="url(#goldStroke)" strokeWidth="1.5" />

        {/* Outer Left Wing Block */}
        <rect x="80" y="230" width="190" height="195" fill="url(#buildingFill)" stroke="url(#goldStroke)" strokeWidth="1.5" />
        <line x1="80" y1="285" x2="270" y2="285" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.4" />
        <line x1="80" y1="335" x2="270" y2="335" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.4" />
        <line x1="80" y1="385" x2="270" y2="385" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.4" />

        {/* Left Wing Windows Matrix with Warm Lights */}
        {[0, 1, 2].map((row) =>
          [0, 1, 2, 3].map((col) => (
            <g key={`win-l-${row}-${col}`}>
              <rect
                x={95 + col * 42}
                y={248 + row * 50}
                width="26"
                height="28"
                rx="3"
                fill="url(#windowGlow)"
                stroke="#D4AF37"
                strokeWidth="1.2"
              />
              <line x1={95 + col * 42 + 13} y1={248 + row * 50} x2={95 + col * 42 + 13} y2={248 + row * 50 + 28} stroke="#0A1630" strokeWidth="0.8" />
              <line x1={95 + col * 42} y1={248 + row * 50 + 14} x2={95 + col * 42 + 26} y2={248 + row * 50 + 14} stroke="#0A1630" strokeWidth="0.8" />
            </g>
          ))
        )}

        {/* Left Wing Roof Parapet */}
        <path d="M 70 230 L 280 230 L 270 212 L 80 212 Z" fill="#0E1E40" stroke="url(#goldStroke)" strokeWidth="1.5" />

        {/* Outer Right Wing Block */}
        <rect x="530" y="230" width="190" height="195" fill="url(#buildingFill)" stroke="url(#goldStroke)" strokeWidth="1.5" />
        <line x1="530" y1="285" x2="720" y2="285" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.4" />
        <line x1="530" y1="335" x2="720" y2="335" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.4" />
        <line x1="530" y1="385" x2="720" y2="385" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.4" />

        {/* Right Wing Windows Matrix with Warm Lights */}
        {[0, 1, 2].map((row) =>
          [0, 1, 2, 3].map((col) => (
            <g key={`win-r-${row}-${col}`}>
              <rect
                x={545 + col * 42}
                y={248 + row * 50}
                width="26"
                height="28"
                rx="3"
                fill="url(#windowGlow)"
                stroke="#D4AF37"
                strokeWidth="1.2"
              />
              <line x1={545 + col * 42 + 13} y1={248 + row * 50} x2={545 + col * 42 + 13} y2={248 + row * 50 + 28} stroke="#0A1630" strokeWidth="0.8" />
              <line x1={545 + col * 42} y1={248 + row * 50 + 14} x2={545 + col * 42 + 26} y2={248 + row * 50 + 14} stroke="#0A1630" strokeWidth="0.8" />
            </g>
          ))
        )}

        {/* Right Wing Roof Parapet */}
        <path d="M 520 230 L 730 230 L 720 212 L 530 212 Z" fill="#0E1E40" stroke="url(#goldStroke)" strokeWidth="1.5" />

        {/* Central Iconic Administrative & Grand Entry Block */}
        <rect x="265" y="150" width="270" height="265" fill="#09142E" stroke="url(#goldStroke)" strokeWidth="2.5" />

        {/* Grand Pillars of the KRCE Entrance */}
        <line x1="295" y1="415" x2="295" y2="275" stroke="url(#goldStroke)" strokeWidth="3.5" />
        <line x1="335" y1="415" x2="335" y2="275" stroke="url(#goldStroke)" strokeWidth="3.5" />
        <line x1="465" y1="415" x2="465" y2="275" stroke="url(#goldStroke)" strokeWidth="3.5" />
        <line x1="505" y1="415" x2="505" y2="275" stroke="url(#goldStroke)" strokeWidth="3.5" />

        {/* Center Grand Entrance Archway with Light */}
        <path
          d="M 355 415 L 355 325 Q 400 290 445 325 L 445 415 Z"
          fill="url(#entranceArchGlow)"
          stroke="url(#goldStroke)"
          strokeWidth="2.5"
        />

        {/* Glass Entrance Doors & Floor Light Beam */}
        <line x1="400" y1="310" x2="400" y2="415" stroke="#D4AF37" strokeWidth="2" strokeDasharray="4 2" />
        <circle cx="400" cy="365" r="2.5" fill="#D4AF37" />

        {/* First Floor Classical Balcony */}
        <rect x="280" y="268" width="240" height="16" fill="#0E1E40" stroke="url(#goldStroke)" strokeWidth="2" />
        {[0, 1, 2, 3, 4, 5, 6, 7].map((b) => (
          <line key={`bal-${b}`} x1={290 + b * 28} y1={268} x2={290 + b * 28} y2={284} stroke="#D4AF37" strokeWidth="1" />
        ))}

        {/* Upper Floor Windows with Classical Arches */}
        {[0, 1, 2].map((i) => (
          <g key={`arch-win-${i}`}>
            <path
              d={`M ${315 + i * 65} 248 L ${315 + i * 65} 195 Q ${340 + i * 65} 178 ${365 + i * 65} 195 L ${365 + i * 65} 248 Z`}
              fill="url(#windowGlow)"
              stroke="url(#goldStroke)"
              strokeWidth="1.8"
            />
            <line x1={340 + i * 65} y1={183} x2={340 + i * 65} y2={248} stroke="#0A1630" strokeWidth="1.2" />
            <line x1={315 + i * 65} y1={220} x2={365 + i * 65} y2={220} stroke="#0A1630" strokeWidth="1.2" />
          </g>
        ))}

        {/* Tower Facade & Clock Pediment Tower */}
        <path d="M 255 150 L 545 150 L 525 125 L 275 125 Z" fill="#0A1630" stroke="url(#goldStroke)" strokeWidth="2" />
        <polygon points="400,60 335,125 465,125" fill="#0E1E40" stroke="url(#goldStroke)" strokeWidth="2.5" />

        {/* Central Clock Emblem */}
        <circle cx="400" cy="102" r="16" fill="#050B18" stroke="url(#goldStroke)" strokeWidth="2" />
        <circle cx="400" cy="102" r="3" fill="#D4AF37" />
        <line x1="400" y1="102" x2="400" y2="92" stroke="#FFF7D6" strokeWidth="1.8" />
        <line x1="400" y1="102" x2="409" y2="102" stroke="#FFF7D6" strokeWidth="1.8" />

        {/* Flagstaff & Academic Crest atop the Tower */}
        <line x1="400" y1="60" x2="400" y2="22" stroke="url(#goldStroke)" strokeWidth="2.5" />
        <polygon points="400,24 430,33 400,42" fill="#D4AF37" stroke="#FFF7D6" strokeWidth="1" />

        {/* College & Department Inscriptions cleanly fitting inside Facade Boxes */}
        <rect x="280" y="128" width="240" height="20" fill="#030712" rx="4" stroke="#D4AF37" strokeWidth="1.5" />
        <text
          x="400"
          y="143"
          textAnchor="middle"
          fill="#FFFFFF"
          fontSize="14"
          fontWeight="900"
          fontFamily="'Cinzel', 'Inter', sans-serif"
          letterSpacing="4"
          stroke="#D4AF37"
          strokeWidth="0.4"
        >
          KRCE
        </text>

        <rect x="300" y="269" width="200" height="15" fill="#030712" rx="3" stroke="#D4AF37" strokeWidth="1.2" />
        <text
          x="400"
          y="280"
          textAnchor="middle"
          fill="#FFF7D6"
          fontSize="10"
          fontWeight="900"
          fontFamily="'Cinzel', 'Inter', sans-serif"
          letterSpacing="2.5"
        >
          DEPARTMENT OF CSE-A
        </text>

        {/* Campus Landscaping: Palm Trees on Left & Right */}
        <g opacity="0.9">
          <path d="M 60 445 Q 55 375 65 305" stroke="#D4AF37" strokeWidth="3.5" />
          <path d="M 65 305 Q 25 295 15 325" stroke="#84cc16" strokeWidth="2" />
          <path d="M 65 305 Q 45 275 30 290" stroke="#84cc16" strokeWidth="2" />
          <path d="M 65 305 Q 75 265 65 280" stroke="#84cc16" strokeWidth="2" />
          <path d="M 65 305 Q 95 275 100 295" stroke="#84cc16" strokeWidth="2" />
          <path d="M 65 305 Q 105 305 115 330" stroke="#84cc16" strokeWidth="2" />
        </g>

        <g opacity="0.9">
          <path d="M 740 445 Q 745 375 735 305" stroke="#D4AF37" strokeWidth="3.5" />
          <path d="M 735 305 Q 775 295 785 325" stroke="#84cc16" strokeWidth="2" />
          <path d="M 735 305 Q 755 275 770 290" stroke="#84cc16" strokeWidth="2" />
          <path d="M 735 305 Q 725 265 735 280" stroke="#84cc16" strokeWidth="2" />
          <path d="M 735 305 Q 705 275 700 295" stroke="#84cc16" strokeWidth="2" />
          <path d="M 735 305 Q 695 305 685 330" stroke="#84cc16" strokeWidth="2" />
        </g>
      </svg>

      {/* Building Sketch Footer Details */}
      <div className="relative z-20 mt-3 flex items-center justify-between text-[11px] text-[#D4AF37] border-t border-[#D4AF37]/25 pt-2.5 flex-wrap gap-2">
        <div className="flex items-center gap-1.5 font-semibold tracking-wider text-[#FDFCF0]">
          <Building2 className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>{siteConfig.collegeName}</span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] tracking-[0.2em] text-[#94A3B8] uppercase">
          <MapPin className="w-3 h-3 text-[#D4AF37]" />
          <span>Samayapuram, Tiruchirappalli • Affiliated to Anna University</span>
        </div>
      </div>
    </div>
  );
};

