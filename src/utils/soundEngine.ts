/**
 * Sound and Speech synthesis engine for ABC Fun Learning
 * 100% offline, zero external audio asset dependencies.
 */

class SoundEngine {
  private audioCtx: AudioContext | null = null;
  private isMuted: boolean = false;
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  constructor() {
    // AudioContext will be initialized on first user interaction
  }

  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.isMuted && typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  /**
   * Playful bubble pop sound for button clicks
   */
  public playPop() {
    if (this.isMuted) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(450, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.4, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch {
      // AudioContext fallback
    }
  }

  /**
   * Sparkle sound for finger tracing checkpoints
   */
  public playSparkle(pitchIndex = 0) {
    if (this.isMuted) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const baseFreqs = [523.25, 659.25, 783.99, 1046.5, 1318.51];
      const freq = baseFreqs[pitchIndex % baseFreqs.length];

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.25, ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.005, ctx.currentTime + 0.14);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.14);
    } catch {
      // AudioContext fallback
    }
  }

  /**
   * Happy victory fanfare when letter tracing is finished
   */
  public playCelebration() {
    if (this.isMuted) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const notes = [
        { f: 523.25, t: 0.0, d: 0.15 }, // C5
        { f: 659.25, t: 0.12, d: 0.15 }, // E5
        { f: 783.99, t: 0.24, d: 0.15 }, // G5
        { f: 1046.5, t: 0.38, d: 0.45 }, // C6
      ];

      notes.forEach((n) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(n.f, ctx.currentTime + n.t);

        gain.gain.setValueAtTime(0.35, ctx.currentTime + n.t);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + n.t + n.d);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + n.t);
        osc.stop(ctx.currentTime + n.t + n.d);
      });
    } catch {
      // AudioContext fallback
    }
  }

  /**
   * Friendly English voice pronunciation of letter name and word
   */
  public speak(text: string, rate = 0.88, pitch = 1.15) {
    if (this.isMuted || typeof window === 'undefined' || !window.speechSynthesis) return;

    try {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = rate; // slightly slower for young kids
      utterance.pitch = pitch; // friendly child/teacher tone

      // Try to find a friendly English voice
      const voices = window.speechSynthesis.getVoices();
      const preferred = voices.find(
        (v) =>
          v.lang.startsWith('en') &&
          (v.name.includes('Natural') ||
            v.name.includes('Samantha') ||
            v.name.includes('Karen') ||
            v.name.includes('Victoria') ||
            v.name.includes('Google US English') ||
            v.name.includes('Daniel'))
      ) || voices.find((v) => v.lang.startsWith('en'));

      if (preferred) {
        utterance.voice = preferred;
      }

      this.currentUtterance = utterance;
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis not available:', e);
    }
  }

  /**
   * Pronounce letter name, phonics, and word
   * e.g. "A! A for Apple! /æ/ Apple!"
   */
  public speakLetter(letter: string, word: string, phonicText?: string) {
    const text = phonicText
      ? `${letter}! ${letter} for ${word}! ${phonicText}!`
      : `${letter}! ${letter} for ${word}!`;
    this.speak(text, 0.85, 1.2);
  }

  /**
   * Short pronunciation of letter only
   */
  public speakLetterOnly(letter: string) {
    this.speak(letter, 0.85, 1.25);
  }

  /**
   * Praise phrases for kids
   */
  public speakPraise(letter: string) {
    const praises = [
      `Awesome job! You traced letter ${letter}!`,
      `Super star! Great letter ${letter}!`,
      `Fantastic! You did letter ${letter}!`,
      `Yay! Beautiful letter ${letter}!`,
      `Well done! Letter ${letter} complete!`,
    ];
    const phrase = praises[Math.floor(Math.random() * praises.length)];
    this.speak(phrase, 0.95, 1.25);
  }
}

export const soundEngine = new SoundEngine();
