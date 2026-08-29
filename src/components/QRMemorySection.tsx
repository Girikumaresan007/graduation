import React, { useState } from 'react';
import { motion } from 'motion/react';
import { QrCode, Download, ExternalLink, Calendar, MapPin, Share2, Sparkles, Check } from 'lucide-react';
import { siteConfig } from '../data/site';

export const QRMemorySection: React.FC = () => {
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShareLink = () => {
    if (navigator.share) {
      navigator.share({
        title: 'KRCE CSE-A Graduation Memory Portal (2021–2025)',
        text: 'Four years. Countless memories. One unforgettable chapter — KRCE CSE-A Batch 2021–2025 digital time capsule.',
        url: window.location.href
      }).catch(() => {
        // Fallback
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <section
      id="qr-section"
      className="relative py-20 px-4 sm:px-6 md:px-8 max-w-5xl mx-auto overflow-hidden"
    >
      <div className="text-center max-w-3xl mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0A1630] border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold tracking-[0.3em] uppercase mb-3 shadow-lg"
        >
          <QrCode className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Farewell Card Continuation</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#FDFCF0] mb-3"
        >
          SCAN. SAVE. REMEMBER.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-editorial text-lg sm:text-xl text-[#D4AF37] italic"
        >
          “This little scan opens a chapter we’ll never forget.”
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-[#0A1630] border border-[#D4AF37]/30 rounded-2xl p-6 sm:p-10 shadow-2xl">
        {/* Left: Card Representation & Context */}
        <div className="space-y-4">
          <div className="inline-block text-[10px] tracking-[0.25em] uppercase px-3 py-1 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] font-semibold border border-[#D4AF37]/30">
            Physical Farewell Card Companion
          </div>

          <h3 className="font-serif-title text-2xl sm:text-3xl font-bold text-[#FDFCF0] leading-snug">
            Your Forever Gateway to Batch 2021–2025
          </h3>

          <p className="text-xs sm:text-sm text-[#CBD5E1] font-light leading-relaxed">
            Whenever you miss college in the years ahead—whether in 2026, 2030 or 2040—scanning your physical farewell card or revisiting this digital time capsule will always bring back the smiles, voices, and memories of CSE-A.
          </p>

          <div className="space-y-2.5 pt-2 text-xs text-[#94A3B8]">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#D4AF37]" />
              <span>Graduation Ceremony & Farewell: Batch 2021–2025</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#D4AF37]" />
              <span>KRCE Auditorium & Main Quadrangle, Samayapuram</span>
            </div>
          </div>

          <div className="pt-3 flex flex-wrap gap-3">
            <button
              onClick={handleShareLink}
              className="px-5 py-2.5 rounded-lg bg-[#D4AF37] hover:bg-[#FDFCF0] text-[#050B18] font-bold text-xs uppercase tracking-[0.2em] flex items-center gap-2 shadow-lg shadow-[#D4AF37]/20 transition-all cursor-pointer"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-950" /> : <Share2 className="w-4 h-4" />}
              <span>{copiedLink ? 'Link Copied!' : 'Share Time Capsule'}</span>
            </button>
          </div>
        </div>

        {/* Right: Interactive Time Capsule Hub Card */}
        <div className="relative rounded-xl bg-gradient-to-br from-[#08152E] to-[#050B18] border border-[#D4AF37]/40 p-6 sm:p-8 flex flex-col items-center text-center shadow-xl">
          {/* Simulated QR Code Graphic */}
          <div className="w-36 h-36 rounded-xl bg-[#FDFCF0] p-3 shadow-inner flex flex-col items-center justify-center mb-4 relative group">
            {/* Visual SVG QR representation */}
            <svg viewBox="0 0 100 100" className="w-full h-full text-[#050B18] fill-current">
              {/* Corner position squares */}
              <rect x="0" y="0" width="30" height="30" rx="4" fill="#050B18" />
              <rect x="5" y="5" width="20" height="20" rx="2" fill="#FDFCF0" />
              <rect x="10" y="10" width="10" height="10" rx="1" fill="#050B18" />

              <rect x="70" y="0" width="30" height="30" rx="4" fill="#050B18" />
              <rect x="75" y="5" width="20" height="20" rx="2" fill="#FDFCF0" />
              <rect x="80" y="10" width="10" height="10" rx="1" fill="#050B18" />

              <rect x="0" y="70" width="30" height="30" rx="4" fill="#050B18" />
              <rect x="5" y="75" width="20" height="20" rx="2" fill="#FDFCF0" />
              <rect x="10" y="80" width="10" height="10" rx="1" fill="#050B18" />

              {/* Data matrix dots */}
              <rect x="36" y="8" width="8" height="8" fill="#050B18" />
              <rect x="48" y="8" width="8" height="8" fill="#050B18" />
              <rect x="36" y="24" width="8" height="8" fill="#050B18" />
              <rect x="8" y="36" width="8" height="8" fill="#050B18" />
              <rect x="24" y="36" width="8" height="8" fill="#050B18" />
              <rect x="38" y="38" width="12" height="12" fill="#D4AF37" rx="2" />
              <rect x="56" y="36" width="8" height="8" fill="#050B18" />
              <rect x="72" y="36" width="8" height="8" fill="#050B18" />
              <rect x="88" y="36" width="8" height="8" fill="#050B18" />
              <rect x="36" y="56" width="8" height="8" fill="#050B18" />
              <rect x="56" y="56" width="8" height="8" fill="#050B18" />
              <rect x="72" y="56" width="8" height="8" fill="#050B18" />
              <rect x="36" y="72" width="8" height="8" fill="#050B18" />
              <rect x="56" y="72" width="8" height="8" fill="#050B18" />
              <rect x="72" y="72" width="8" height="8" fill="#050B18" />
              <rect x="88" y="72" width="8" height="8" fill="#050B18" />
            </svg>
          </div>

          <div className="font-display text-sm font-bold text-[#FDFCF0] mb-1">
            KRCE CSE-A • 2021–2025
          </div>
          <p className="text-[11px] text-[#94A3B8] max-w-xs mb-4">
            Digital time capsule verified & sealed.
          </p>

          <a
            href="#memories"
            className="w-full py-2.5 px-4 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-[#D4AF37] border border-[#D4AF37]/30 flex items-center justify-center gap-1.5 transition-colors"
          >
            <span>Explore High-Res Gallery</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
