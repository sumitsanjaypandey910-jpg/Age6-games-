// Background Music Engine using Web Audio API

export interface MusicTrack {
  id: string;
  name: string;
  tag: string;
  icon: string;
  bpm: number;
  description: string;
  instrument: string;
  color: string;
  // Patterns: notes array with frequencies and duration in 16th notes or quarter notes
  notes: { note: number; dur: number; bass?: number }[];
}

// Standard musical notes frequencies (Hz)
export const NOTES: Record<string, number> = {
  C3: 130.81, D3: 146.83, E3: 164.81, F3: 174.61, G3: 196.00, A3: 220.00, B3: 246.94,
  C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.00, A4: 440.00, B4: 493.88,
  C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99, A5: 880.00, B5: 987.77,
  C6: 1046.50, REST: 0,
};

export const MUSIC_TRACKS: MusicTrack[] = [
  {
    id: 'sunny_playground',
    name: 'Sunny Playground',
    tag: 'Recommended ⭐',
    icon: '☀️',
    bpm: 124,
    instrument: 'Warm Marimba & Bass',
    description: 'Bouncy, joyful, and upbeat rhythm perfect for active learning and smiles.',
    color: '#F59E0B',
    notes: [
      { note: NOTES.C5, dur: 0.25, bass: NOTES.C3 },
      { note: NOTES.E5, dur: 0.25 },
      { note: NOTES.G5, dur: 0.25, bass: NOTES.G3 },
      { note: NOTES.C6, dur: 0.5 },
      { note: NOTES.A5, dur: 0.25, bass: NOTES.A3 },
      { note: NOTES.G5, dur: 0.25 },
      { note: NOTES.E5, dur: 0.5, bass: NOTES.C3 },

      { note: NOTES.F5, dur: 0.25, bass: NOTES.F3 },
      { note: NOTES.A5, dur: 0.25 },
      { note: NOTES.C6, dur: 0.25, bass: NOTES.F3 },
      { note: NOTES.A5, dur: 0.25 },
      { note: NOTES.G5, dur: 0.5, bass: NOTES.G3 },
      { note: NOTES.E5, dur: 0.25 },
      { note: NOTES.D5, dur: 0.5, bass: NOTES.G3 },

      { note: NOTES.C5, dur: 0.25, bass: NOTES.C3 },
      { note: NOTES.E5, dur: 0.25 },
      { note: NOTES.G5, dur: 0.25, bass: NOTES.E3 },
      { note: NOTES.E5, dur: 0.25 },
      { note: NOTES.A5, dur: 0.35, bass: NOTES.A3 },
      { note: NOTES.B5, dur: 0.25 },
      { note: NOTES.C6, dur: 0.6, bass: NOTES.C3 },

      { note: NOTES.G5, dur: 0.25, bass: NOTES.G3 },
      { note: NOTES.F5, dur: 0.25 },
      { note: NOTES.E5, dur: 0.25, bass: NOTES.C3 },
      { note: NOTES.D5, dur: 0.25, bass: NOTES.G3 },
      { note: NOTES.C5, dur: 0.6, bass: NOTES.C3 },
    ],
  },
  {
    id: 'magical_toybox',
    name: 'Magical Toybox',
    tag: 'Sweet & Playful',
    icon: '🧸',
    bpm: 110,
    instrument: 'Celesta & Glockenspiel',
    description: 'Delicate bell-like music box vibes that feel like discovering new toys.',
    color: '#EC4899',
    notes: [
      { note: NOTES.E5, dur: 0.3, bass: NOTES.C3 },
      { note: NOTES.G5, dur: 0.3 },
      { note: NOTES.C6, dur: 0.4, bass: NOTES.G3 },
      { note: NOTES.B5, dur: 0.3 },
      { note: NOTES.A5, dur: 0.3, bass: NOTES.F3 },
      { note: NOTES.G5, dur: 0.4, bass: NOTES.C3 },

      { note: NOTES.F5, dur: 0.3, bass: NOTES.D3 },
      { note: NOTES.A5, dur: 0.3 },
      { note: NOTES.G5, dur: 0.4, bass: NOTES.G3 },
      { note: NOTES.E5, dur: 0.3 },
      { note: NOTES.D5, dur: 0.3, bass: NOTES.G3 },
      { note: NOTES.C5, dur: 0.6, bass: NOTES.C3 },

      { note: NOTES.G5, dur: 0.3, bass: NOTES.E3 },
      { note: NOTES.C6, dur: 0.3 },
      { note: NOTES.E6, dur: 0.5, bass: NOTES.C3 },
      { note: NOTES.D6, dur: 0.3 },
      { note: NOTES.C6, dur: 0.4, bass: NOTES.A3 },
      { note: NOTES.B5, dur: 0.3, bass: NOTES.G3 },
      { note: NOTES.C6, dur: 0.6, bass: NOTES.C3 },
    ],
  },
  {
    id: 'bouncing_ukulele',
    name: 'Bouncing Ukulele',
    tag: 'Island Cheer',
    icon: '🏖️',
    bpm: 130,
    instrument: 'Plucked Acoustic & Flute',
    description: 'Bright syncopated tropical bounce, encouraging clapping and dancing along.',
    color: '#06B6D4',
    notes: [
      { note: NOTES.G4, dur: 0.2, bass: NOTES.G3 },
      { note: NOTES.B4, dur: 0.2 },
      { note: NOTES.D5, dur: 0.2, bass: NOTES.D3 },
      { note: NOTES.G5, dur: 0.35 },
      { note: NOTES.E5, dur: 0.25, bass: NOTES.C3 },
      { note: NOTES.D5, dur: 0.25 },
      { note: NOTES.B4, dur: 0.35, bass: NOTES.G3 },

      { note: NOTES.C5, dur: 0.2, bass: NOTES.C3 },
      { note: NOTES.E5, dur: 0.2 },
      { note: NOTES.G5, dur: 0.25, bass: NOTES.G3 },
      { note: NOTES.A5, dur: 0.35 },
      { note: NOTES.G5, dur: 0.25, bass: NOTES.C3 },
      { note: NOTES.D5, dur: 0.5, bass: NOTES.D3 },

      { note: NOTES.E5, dur: 0.2, bass: NOTES.C3 },
      { note: NOTES.G5, dur: 0.2 },
      { note: NOTES.C6, dur: 0.3, bass: NOTES.A3 },
      { note: NOTES.B5, dur: 0.2 },
      { note: NOTES.A5, dur: 0.2, bass: NOTES.F3 },
      { note: NOTES.G5, dur: 0.4, bass: NOTES.G3 },
      { note: NOTES.G4, dur: 0.5, bass: NOTES.G3 },
    ],
  },
  {
    id: 'cozy_lullaby',
    name: 'Cozy Garden',
    tag: 'Calm & Gentle',
    icon: '🌸',
    bpm: 92,
    instrument: 'Soft Kalimba & Pad',
    description: 'Peaceful, relaxing melodies ideal for calm concentration and younger kids.',
    color: '#10B981',
    notes: [
      { note: NOTES.C5, dur: 0.45, bass: NOTES.C3 },
      { note: NOTES.E5, dur: 0.45 },
      { note: NOTES.G5, dur: 0.5, bass: NOTES.G3 },
      { note: NOTES.E5, dur: 0.4 },
      { note: NOTES.F5, dur: 0.45, bass: NOTES.F3 },
      { note: NOTES.A5, dur: 0.45 },
      { note: NOTES.G5, dur: 0.7, bass: NOTES.C3 },

      { note: NOTES.E5, dur: 0.4, bass: NOTES.A3 },
      { note: NOTES.C5, dur: 0.4 },
      { note: NOTES.D5, dur: 0.45, bass: NOTES.G3 },
      { note: NOTES.E5, dur: 0.45 },
      { note: NOTES.D5, dur: 0.7, bass: NOTES.G3 },
      { note: NOTES.C5, dur: 0.9, bass: NOTES.C3 },
    ],
  },
  {
    id: 'arcade_carnival',
    name: 'Arcade Carnival',
    tag: 'Fun Retro Game',
    icon: '🎪',
    bpm: 138,
    instrument: '8-Bit Chiptune Square Wave',
    description: 'Nostalgic, bubbly arcade melodies reminiscent of classic family video games.',
    color: '#8B5CF6',
    notes: [
      { note: NOTES.C5, dur: 0.18, bass: NOTES.C3 },
      { note: NOTES.E5, dur: 0.18 },
      { note: NOTES.G5, dur: 0.18, bass: NOTES.E3 },
      { note: NOTES.C6, dur: 0.28 },
      { note: NOTES.B5, dur: 0.18, bass: NOTES.G3 },
      { note: NOTES.G5, dur: 0.18 },
      { note: NOTES.E5, dur: 0.35, bass: NOTES.C3 },

      { note: NOTES.A5, dur: 0.18, bass: NOTES.A3 },
      { note: NOTES.C6, dur: 0.18 },
      { note: NOTES.E6, dur: 0.28, bass: NOTES.F3 },
      { note: NOTES.D6, dur: 0.18 },
      { note: NOTES.B5, dur: 0.18, bass: NOTES.G3 },
      { note: NOTES.G5, dur: 0.35, bass: NOTES.G3 },

      { note: NOTES.C6, dur: 0.2, bass: NOTES.C3 },
      { note: NOTES.G5, dur: 0.2 },
      { note: NOTES.E5, dur: 0.2, bass: NOTES.A3 },
      { note: NOTES.C5, dur: 0.2 },
      { note: NOTES.D5, dur: 0.2, bass: NOTES.G3 },
      { note: NOTES.E5, dur: 0.2 },
      { note: NOTES.C5, dur: 0.5, bass: NOTES.C3 },
    ],
  },
];

class BackgroundMusicEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private currentTrackId: string = 'sunny_playground';
  private currentStep: number = 0;
  private timerId: number | null = null;
  private masterGain: GainNode | null = null;
  public volume: number = 0.22; // Gentle default volume
  private listeners: Set<() => void> = new Set();

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        this.ctx = new AudioCtxClass();
      }
    }
    if (this.ctx && !this.masterGain) {
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public subscribe(cb: () => void) {
    this.listeners.add(cb);
    return () => this.listeners.delete(cb);
  }

  private notify() {
    this.listeners.forEach((cb) => cb());
  }

  public getStatus() {
    return {
      isPlaying: this.isPlaying,
      currentTrackId: this.currentTrackId,
      volume: this.volume,
    };
  }

  public getCurrentTrack(): MusicTrack {
    return (
      MUSIC_TRACKS.find((t) => t.id === this.currentTrackId) ||
      MUSIC_TRACKS[0]
    );
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.ctx && this.masterGain) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
    this.notify();
  }

  public setTrack(trackId: string, autoPlay = true) {
    const track = MUSIC_TRACKS.find((t) => t.id === trackId);
    if (!track) return;
    this.currentTrackId = trackId;
    this.currentStep = 0;

    if (this.isPlaying) {
      this.stop();
      if (autoPlay) {
        this.start();
      }
    } else if (autoPlay) {
      this.start();
    } else {
      this.notify();
    }
  }

  public togglePlay() {
    if (this.isPlaying) {
      this.stop();
    } else {
      this.start();
    }
  }

  public start() {
    this.initCtx();
    if (!this.ctx || !this.masterGain) return;

    if (this.isPlaying) {
      this.stop();
    }

    this.isPlaying = true;
    this.currentStep = 0;
    this.playNextNote();
    this.notify();
  }

  public stop() {
    this.isPlaying = false;
    if (this.timerId !== null) {
      window.clearTimeout(this.timerId);
      this.timerId = null;
    }
    this.notify();
  }

  private playNextNote() {
    if (!this.isPlaying || !this.ctx || !this.masterGain) return;

    const track = this.getCurrentTrack();
    if (!track.notes || track.notes.length === 0) return;

    const noteInfo = track.notes[this.currentStep % track.notes.length];
    const now = this.ctx.currentTime;
    const duration = noteInfo.dur;

    // Determine synth wave type based on track
    const waveType: OscillatorType =
      track.id === 'arcade_carnival'
        ? 'square'
        : track.id === 'magical_toybox'
        ? 'sine'
        : track.id === 'cozy_lullaby'
        ? 'sine'
        : track.id === 'bouncing_ukulele'
        ? 'triangle'
        : 'triangle';

    // 1. Melody Note
    if (noteInfo.note > 0) {
      try {
        const osc = this.ctx.createOscillator();
        const noteGain = this.ctx.createGain();

        osc.type = waveType;
        osc.frequency.setValueAtTime(noteInfo.note, now);

        // Gentle envelope
        const peakGain = track.id === 'arcade_carnival' ? 0.2 : 0.35;
        noteGain.gain.setValueAtTime(0.001, now);
        noteGain.gain.exponentialRampToValueAtTime(peakGain, now + 0.03);
        noteGain.gain.exponentialRampToValueAtTime(0.001, now + duration * 0.95);

        osc.connect(noteGain);
        noteGain.connect(this.masterGain);

        osc.start(now);
        osc.stop(now + duration);
      } catch {
        // Fallback
      }
    }

    // 2. Gentle Bass Note / Harmony
    if (noteInfo.bass && noteInfo.bass > 0) {
      try {
        const bassOsc = this.ctx.createOscillator();
        const bassGain = this.ctx.createGain();

        bassOsc.type = 'sine';
        bassOsc.frequency.setValueAtTime(noteInfo.bass, now);

        bassGain.gain.setValueAtTime(0.001, now);
        bassGain.gain.exponentialRampToValueAtTime(0.25, now + 0.04);
        bassGain.gain.exponentialRampToValueAtTime(0.001, now + duration * 0.9);

        bassOsc.connect(bassGain);
        bassGain.connect(this.masterGain);

        bassOsc.start(now);
        bassOsc.stop(now + duration);
      } catch {
        // Fallback
      }
    }

    // Advance to next step
    this.currentStep = (this.currentStep + 1) % track.notes.length;

    // Schedule next beat
    const beatMs = duration * 1000;
    this.timerId = window.setTimeout(() => {
      this.playNextNote();
    }, beatMs);
  }
}

export const bgmEngine = new BackgroundMusicEngine();
