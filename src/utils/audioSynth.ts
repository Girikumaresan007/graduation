/**
 * Ambient Graduation Audio Synthesizer using Web Audio API
 * Provides a warm, nostalgic ambient chord progression and celebration chime
 * Zero external audio dependencies - 100% reliable on mobile and desktop
 */

class AmbientSoundtrack {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private timerId: number | null = null;
  private masterGain: GainNode | null = null;
  private isMuted = false;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public play() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;
    if (this.isPlaying) return;

    this.isPlaying = true;
    let step = 0;

    // Cinematic chord progression (warm nostalgic graduation progression: Cmaj9 - Gsus4 - Am9 - Fadd9)
    const chordProgressions = [
      [261.63, 329.63, 392.00, 493.88], // Cmaj7 (C4, E4, G4, B4)
      [196.00, 293.66, 392.00, 440.00], // Gsus2/4 (G3, D4, G4, A4)
      [220.00, 261.63, 329.63, 392.00], // Am7 (A3, C4, E4, G4)
      [174.61, 261.63, 329.63, 440.00], // Fmaj7 (F3, C4, E4, A4)
    ];

    const playChord = () => {
      if (!this.isPlaying || !this.ctx || !this.masterGain) return;

      const currentChord = chordProgressions[step % chordProgressions.length];
      const now = this.ctx.currentTime;

      currentChord.forEach((freq, idx) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        // Warm sine + subtle triangle overtone
        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        // Soft attack and lingering release for cinematic atmosphere
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(0.045 / (idx + 1), now + 1.2);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 5.5);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(now);
        osc.stop(now + 6.0);
      });

      // Subtle high bell note for nostalgia
      const bellFreqs = [523.25, 659.25, 783.99, 880.00, 987.77];
      const bellFreq = bellFreqs[step % bellFreqs.length];
      const bellOsc = this.ctx.createOscillator();
      const bellGain = this.ctx.createGain();
      bellOsc.type = 'sine';
      bellOsc.frequency.setValueAtTime(bellFreq, now + 0.8);
      bellGain.gain.setValueAtTime(0.0001, now + 0.8);
      bellGain.gain.exponentialRampToValueAtTime(0.02, now + 1.0);
      bellGain.gain.exponentialRampToValueAtTime(0.00001, now + 3.8);
      bellOsc.connect(bellGain);
      bellGain.connect(this.masterGain);
      bellOsc.start(now + 0.8);
      bellOsc.stop(now + 4.0);

      step++;
      this.timerId = window.setTimeout(playChord, 5200);
    };

    playChord();
  }

  public pause() {
    this.isPlaying = false;
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  public toggleMute(): boolean {
    if (!this.masterGain || !this.ctx) {
      this.initContext();
    }
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.3, this.ctx.currentTime);
    }
    return this.isMuted;
  }

  public getPlaying(): boolean {
    return this.isPlaying;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  // Celebratory graduation fanfare chime
  public playCelebrationChime() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const notes = [
      { freq: 261.63, time: 0 },    // C4
      { freq: 329.63, time: 0.15 }, // E4
      { freq: 392.00, time: 0.3 },  // G4
      { freq: 523.25, time: 0.45 }, // C5
      { freq: 659.25, time: 0.65 }, // E5
      { freq: 783.99, time: 0.85 }, // G5
      { freq: 1046.50, time: 1.1 }  // C6 (Triumph)
    ];

    const now = this.ctx.currentTime;
    notes.forEach((note) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(note.freq, now + note.time);

      gain.gain.setValueAtTime(0.0001, now + note.time);
      gain.gain.exponentialRampToValueAtTime(0.08, now + note.time + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.00001, now + note.time + 1.8);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now + note.time);
      osc.stop(now + note.time + 2.0);
    });
  }
}

export const soundtrack = new AmbientSoundtrack();
