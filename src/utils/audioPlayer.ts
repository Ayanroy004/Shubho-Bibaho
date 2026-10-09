/**
 * Web Audio Indian Wedding Ambient Music Synthesizer (Shehnai & Tanpura)
 * Provides soothing, authentic Indian classical wedding ambiance without external asset dependencies.
 */

class WeddingAudioPlayer {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timerId: number | null = null;
  private gainNode: GainNode | null = null;
  private droneOscs: OscillatorNode[] = [];

  // Raga Yaman / Bhairavi auspicious frequencies
  // Sa (C#4 ~ 277.18Hz), Re (D#), Ga (F), Ma (F#), Pa (G#), Dha (A#), Ni (C)
  private readonly scale = [277.18, 311.13, 349.23, 370.0, 415.3, 466.16, 523.25, 554.37];
  private melodyIndex = 0;
  private readonly melodyNotes = [
    0, 2, 3, 4, 3, 2, 0, 4, 6, 7, 6, 4, 3, 2, 0, 2, 4, 7, 6, 4, 3, 0
  ];

  public init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public play() {
    this.init();
    if (!this.ctx) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }

    if (this.isPlaying) return;
    this.isPlaying = true;

    // Master volume - prompt ramp up within 0.8s
    this.gainNode = this.ctx.createGain();
    this.gainNode.gain.setValueAtTime(0.01, this.ctx.currentTime);
    this.gainNode.gain.exponentialRampToValueAtTime(0.20, this.ctx.currentTime + 0.8);
    this.gainNode.connect(this.ctx.destination);

    // 1. Tanpura drone (Sa + Pa + High Sa)
    const droneFreqs = [138.59, 207.65, 277.18]; // C#3, G#3, C#4
    this.droneOscs = droneFreqs.map((freq, i) => {
      const osc = this.ctx!.createOscillator();
      const droneGain = this.ctx!.createGain();
      osc.type = i === 1 ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq + (Math.random() - 0.5) * 1.5, this.ctx!.currentTime);
      droneGain.gain.setValueAtTime(0.06, this.ctx!.currentTime);
      osc.connect(droneGain);
      droneGain.connect(this.gainNode!);
      osc.start();
      return osc;
    });

    // 2. Melodic Shehnai sequence
    this.playMelodyLoop();
  }

  private playMelodyLoop = () => {
    if (!this.isPlaying || !this.ctx) return;

    const noteIdx = this.melodyNotes[this.melodyIndex % this.melodyNotes.length];
    const freq = this.scale[noteIdx];
    this.melodyIndex++;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    // Warm resonant flute / shehnai tone
    osc.type = 'triangle';
    osc2.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, now);
    osc2.frequency.setValueAtTime(freq * 1.002, now); // slight chorus shimmer

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, now);
    filter.frequency.exponentialRampToValueAtTime(1400, now + 0.4);

    const duration = 1.1 + Math.random() * 0.7;

    noteGain.gain.setValueAtTime(0.001, now);
    noteGain.gain.exponentialRampToValueAtTime(0.09, now + 0.25);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(filter);
    osc2.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(this.gainNode!);

    osc.start(now);
    osc2.start(now);
    osc.stop(now + duration);
    osc2.stop(now + duration);

    const nextDelay = duration * 900;
    this.timerId = window.setTimeout(this.playMelodyLoop, nextDelay);
  };

  public stop() {
    if (!this.isPlaying || !this.ctx) return;
    this.isPlaying = false;

    if (this.timerId) {
      window.clearTimeout(this.timerId);
      this.timerId = null;
    }

    if (this.gainNode) {
      try {
        this.gainNode.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.6);
      } catch {
        // ignore
      }
      setTimeout(() => {
        this.droneOscs.forEach(o => {
          try {
            o.stop();
            o.disconnect();
          } catch {
            // ignore
          }
        });
        this.droneOscs = [];
      }, 700);
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }
}

export const weddingAudio = new WeddingAudioPlayer();
