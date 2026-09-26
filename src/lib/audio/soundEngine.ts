// Web Audio API procedural 8-bit sound generator
// Zero external asset dependency - 100% offline ready

class SoundEngine {
  private ctx: AudioContext | null = null;
  private bgmGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private isBgmPlaying: boolean = false;
  private bgmInterval: any = null;
  public isMuted: boolean = false;

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.bgmGain = this.ctx.createGain();
        this.sfxGain = this.ctx.createGain();
        this.bgmGain.gain.setValueAtTime(0.12, this.ctx.currentTime);
        this.sfxGain.gain.setValueAtTime(0.25, this.ctx.currentTime);
        this.bgmGain.connect(this.ctx.destination);
        this.sfxGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.bgmGain && this.sfxGain && this.ctx) {
      this.bgmGain.gain.setValueAtTime(muted ? 0 : 0.12, this.ctx.currentTime);
      this.sfxGain.gain.setValueAtTime(muted ? 0 : 0.25, this.ctx.currentTime);
    }
  }

  public playSfx(
    type:
      | 'click'
      | 'jump'
      | 'pickup'
      | 'transfer'
      | 'ding'
      | 'correct'
      | 'wrong_gentle'
      | 'celebrate'
      | 'count'
      | 'star'
      | 'pop'
  ) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    gain.connect(this.sfxGain);

    switch (type) {
      case 'pop': {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(340, t);
        osc.frequency.exponentialRampToValueAtTime(780, t + 0.08);
        gain.gain.setValueAtTime(0.25, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.08);
        osc.connect(gain);
        osc.start(t);
        osc.stop(t + 0.08);
        break;
      }
      case 'click': {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(800, t);
        osc.frequency.exponentialRampToValueAtTime(300, t + 0.05);
        gain.gain.setValueAtTime(0.4, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.05);
        osc.connect(gain);
        osc.start(t);
        osc.stop(t + 0.05);
        break;
      }

      case 'jump': {
        osc.type = 'square';
        osc.frequency.setValueAtTime(150, t);
        osc.frequency.exponentialRampToValueAtTime(450, t + 0.15);
        gain.gain.setValueAtTime(0.3, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.15);
        osc.connect(gain);
        osc.start(t);
        osc.stop(t + 0.15);
        break;
      }

      case 'pickup':
      case 'count': {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, t); // C5
        osc.frequency.setValueAtTime(659.25, t + 0.06); // E5
        gain.gain.setValueAtTime(0.35, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.14);
        osc.connect(gain);
        osc.start(t);
        osc.stop(t + 0.14);
        break;
      }

      case 'transfer': {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, t);
        osc.frequency.exponentialRampToValueAtTime(880, t + 0.12);
        osc.frequency.exponentialRampToValueAtTime(660, t + 0.22);
        gain.gain.setValueAtTime(0.25, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.22);
        osc.connect(gain);
        osc.start(t);
        osc.stop(t + 0.22);
        break;
      }

      case 'ding':
      case 'star': {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(987.77, t); // B5
        osc.frequency.exponentialRampToValueAtTime(1318.51, t + 0.15); // E6
        gain.gain.setValueAtTime(0.4, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.35);
        osc.connect(gain);
        osc.start(t);
        osc.stop(t + 0.35);
        break;
      }

      case 'correct': {
        // Melodic Arpeggio: C5 -> E5 -> G5 -> C6
        const notes = [523.25, 659.25, 783.99, 1046.5];
        notes.forEach((freq, idx) => {
          const o = this.ctx!.createOscillator();
          const g = this.ctx!.createGain();
          g.connect(this.sfxGain!);
          o.type = 'triangle';
          const start = t + idx * 0.09;
          o.frequency.setValueAtTime(freq, start);
          g.gain.setValueAtTime(0.35, start);
          g.gain.exponentialRampToValueAtTime(0.01, start + 0.25);
          o.connect(g);
          o.start(start);
          o.stop(start + 0.25);
        });
        break;
      }

      case 'wrong_gentle': {
        // Soft kid-friendly chime (not harsh buzz): F4 -> D4
        const notes = [349.23, 293.66];
        notes.forEach((freq, idx) => {
          const o = this.ctx!.createOscillator();
          const g = this.ctx!.createGain();
          g.connect(this.sfxGain!);
          o.type = 'sine';
          const start = t + idx * 0.12;
          o.frequency.setValueAtTime(freq, start);
          g.gain.setValueAtTime(0.2, start);
          g.gain.exponentialRampToValueAtTime(0.01, start + 0.2);
          o.connect(g);
          o.start(start);
          o.stop(start + 0.2);
        });
        break;
      }

      case 'celebrate': {
        // Fanfare: C5, G4, C5, E5, G5, C6
        const notes = [523.25, 392.0, 523.25, 659.25, 783.99, 1046.5];
        const times = [0, 0.1, 0.2, 0.3, 0.42, 0.58];
        notes.forEach((freq, idx) => {
          const o = this.ctx!.createOscillator();
          const g = this.ctx!.createGain();
          g.connect(this.sfxGain!);
          o.type = 'square';
          const start = t + times[idx];
          o.frequency.setValueAtTime(freq, start);
          g.gain.setValueAtTime(0.25, start);
          g.gain.exponentialRampToValueAtTime(0.01, start + (idx === notes.length - 1 ? 0.6 : 0.15));
          o.connect(g);
          o.start(start);
          o.stop(start + (idx === notes.length - 1 ? 0.6 : 0.15));
        });
        break;
      }
    }
  }

  public startBgm() {
    if (this.isBgmPlaying || typeof window === 'undefined') return;
    this.initContext();
    if (!this.ctx || !this.bgmGain) return;
    this.isBgmPlaying = true;

    // Chiptune adventure loop: Pentatonic C - D - E - G - A
    const melody = [
      261.63, 329.63, 392.0, 523.25,
      440.0, 392.0, 329.63, 261.63,
      293.66, 329.63, 392.0, 440.0,
      523.25, 392.0, 329.63, 293.66,
    ];
    let noteIdx = 0;

    this.bgmInterval = setInterval(() => {
      if (!this.isBgmPlaying || !this.ctx || !this.bgmGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      gain.connect(this.bgmGain);
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(melody[noteIdx], t);

      gain.gain.setValueAtTime(0.08, t);
      gain.gain.exponentialRampToValueAtTime(0.005, t + 0.22);

      osc.connect(gain);
      osc.start(t);
      osc.stop(t + 0.23);

      noteIdx = (noteIdx + 1) % melody.length;
    }, 250);
  }

  public stopBgm() {
    this.isBgmPlaying = false;
    if (this.bgmInterval) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
  }

  public toggleBgm(): boolean {
    if (this.isBgmPlaying) {
      this.stopBgm();
      return false;
    } else {
      this.startBgm();
      return true;
    }
  }
}

export const soundEngine = new SoundEngine();
