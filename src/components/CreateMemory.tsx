import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Wand2, Sparkles, Download, Copy, Check, Share2, Heart, Award } from 'lucide-react';
import { UserMemoryCard } from '../types';

export const CreateMemory: React.FC = () => {
  const [name, setName] = useState('');
  const [memoryType, setMemoryType] = useState('First Day at KRCE');
  const [userStory, setUserStory] = useState('');
  const [generatedCard, setGeneratedCard] = useState<UserMemoryCard | null>(null);
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const memoryPrompts = [
    'First Day at KRCE',
    'Canteen Hangout & Chai',
    'Symposium & Tech Events',
    'Industrial Visit (IV) Tour',
    'Overnight Lab Coding Sprint',
    'Campus Placement Celebration'
  ];

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsGenerating(true);
    setTimeout(() => {
      // Craft personalized graduation memory prose
      let customizedNarrative = userStory.trim();
      if (!customizedNarrative) {
        customizedNarrative = `Four years of relentless curiosity, unforgettable friendships, and shared triumphs in ${memoryType}.`;
      }

      const newCard: UserMemoryCard = {
        id: `user-card-${Date.now()}`,
        name: name.trim(),
        memory: memoryType,
        message: customizedNarrative,
        theme: 'gold',
        date: 'Graduation 2025'
      };

      setGeneratedCard(newCard);
      setIsGenerating(false);
    }, 600);
  };

  const handleCopyCard = () => {
    if (!generatedCard) return;
    const textToCopy = `🎓 KRCE CSE-A Graduation Memory Capsule 2021–2025\n\nTo ${generatedCard.name}:\n"Your KRCE chapter may be ending, but the memories aren't."\n\n📌 Memory: ${generatedCard.memory}\n💬 "${generatedCard.message}"\n\nForever CSE-A • Batch of 2025`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="create-memory"
      className="relative py-20 px-4 sm:px-6 md:px-8 max-w-5xl mx-auto overflow-hidden"
    >
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0A1630] border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold tracking-[0.3em] uppercase mb-3 shadow-lg"
        >
          <Wand2 className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Interactive Storytelling</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#FDFCF0] mb-3"
        >
          CREATE YOUR MEMORY CAPSULE
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm sm:text-base text-[#CBD5E1] font-light max-w-xl mx-auto"
        >
          Enter your name and favorite moment to generate a keepsake graduation certificate card.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-6 bg-[#0A1630] border border-[#D4AF37]/30 rounded-xl p-6 sm:p-8 shadow-2xl"
        >
          <form onSubmit={handleGenerate} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37] mb-1.5">
                Your Name / Nickname *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Giridharan / Dinesh"
                className="w-full px-4 py-3 rounded-lg bg-[#050B18] border border-white/15 text-[#FDFCF0] text-xs sm:text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37] mb-1.5">
                Favorite College Memory Theme
              </label>
              <select
                value={memoryType}
                onChange={(e) => setMemoryType(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-[#050B18] border border-white/15 text-[#FDFCF0] text-xs sm:text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
              >
                {memoryPrompts.map((p) => (
                  <option key={p} value={p} className="bg-[#050B18] text-[#FDFCF0]">
                    {p}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37] mb-1.5">
                Your Personal Note / Quote (Optional)
              </label>
              <textarea
                rows={3}
                value={userStory}
                onChange={(e) => setUserStory(e.target.value)}
                placeholder="Share a funny incident, a teacher you loved, or a heartfelt message to CSE-A..."
                className="w-full px-4 py-3 rounded-lg bg-[#050B18] border border-white/15 text-[#FDFCF0] text-xs sm:text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={isGenerating}
              className="w-full py-3.5 px-6 rounded-lg bg-[#D4AF37] hover:bg-[#FDFCF0] text-[#050B18] font-bold text-xs sm:text-sm tracking-[0.2em] uppercase flex items-center justify-center gap-2 shadow-lg shadow-[#D4AF37]/20 active:scale-95 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#050B18]" />
              <span>{isGenerating ? 'Crafting Card...' : 'Generate Farewell Card'}</span>
            </button>
          </form>
        </motion.div>

        {/* Live Card Preview */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-6 flex flex-col items-center"
        >
          {generatedCard ? (
            <div className="w-full space-y-4">
              <div
                id="printable-memory-card"
                className="relative w-full rounded-xl bg-gradient-to-br from-[#0A1630] via-[#0D1C3C] to-[#050B18] border-2 border-[#D4AF37] p-6 sm:p-8 shadow-2xl overflow-hidden"
              >
                {/* Gold Crest Border Frame */}
                <div className="absolute top-2 left-2 right-2 bottom-2 border border-[#D4AF37]/30 rounded-lg pointer-events-none" />

                {/* Card Header */}
                <div className="relative z-10 flex items-center justify-between border-b border-[#D4AF37]/25 pb-4 mb-4">
                  <div>
                    <div className="text-[10px] tracking-[0.25em] uppercase text-[#D4AF37] font-bold">
                      KRCE CSE-A • 2021–2025
                    </div>
                    <div className="font-display text-sm font-semibold text-[#FDFCF0]">
                      Digital Farewell Keepsake
                    </div>
                  </div>
                  <Award className="w-8 h-8 text-[#D4AF37]" />
                </div>

                {/* Card Body */}
                <div className="relative z-10 space-y-3 my-4">
                  <div className="font-serif-title text-2xl sm:text-3xl text-[#FDFCF0] font-bold">
                    Hey, {generatedCard.name}.
                  </div>

                  <p className="font-editorial text-lg text-[#D4AF37] italic leading-snug">
                    “Your KRCE chapter may be ending, but the memories aren’t.”
                  </p>

                  <div className="p-3.5 rounded-lg bg-[#050B18]/80 border border-[#D4AF37]/25 text-xs text-[#CBD5E1] leading-relaxed">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] font-semibold block mb-1">
                      {generatedCard.memory}
                    </span>
                    “{generatedCard.message}”
                  </div>
                </div>

                {/* Card Footer */}
                <div className="relative z-10 flex items-center justify-between pt-3 border-t border-white/10 text-[11px] text-[#94A3B8]">
                  <span>Samayapuram Campus</span>
                  <span className="font-script text-xl text-[#D4AF37]">CSE-A Family</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 w-full justify-end">
                <button
                  onClick={handleCopyCard}
                  className="px-4 py-2.5 rounded-lg bg-[#0A1630] hover:bg-[#122244] text-[#FDFCF0] text-xs font-semibold tracking-[0.2em] uppercase border border-[#D4AF37]/30 flex items-center gap-2 transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[#D4AF37]" />}
                  <span>{copied ? 'Copied Text!' : 'Copy Capsule Text'}</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="w-full aspect-[4/3] rounded-xl border-2 border-dashed border-[#D4AF37]/30 flex flex-col items-center justify-center p-8 text-center bg-[#0A1630]/50">
              <Sparkles className="w-10 h-10 text-[#D4AF37]/60 mb-3 animate-pulse" />
              <h4 className="font-serif-title text-xl text-[#FDFCF0] font-semibold mb-1">
                Your Memory Card Preview
              </h4>
              <p className="text-xs text-[#94A3B8] max-w-xs leading-relaxed">
                Fill in your name and pick your favorite moment on the left to generate your custom graduation keepsake card.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};
