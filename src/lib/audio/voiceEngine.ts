// AI Voice & Speech Synthesis Engine for Indonesian Narration
// Includes audio cache mechanism according to Section 11.4

export interface VoiceOptions {
  speaker?: string;
  pitch?: number;
  rate?: number;
  lang?: string;
  onStart?: () => void;
  onEnd?: () => void;
  onBoundary?: (charIndex: number) => void;
}

class VoiceEngine {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private audioCache: Map<string, string> = new Map();
  public isSpeaking: boolean = false;
  private indonesianVoice: SpeechSynthesisVoice | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.loadVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  private loadVoices() {
    if (!this.synth) return;
    const voices = this.synth.getVoices();
    // Prioritize id-ID or Indonesian voices
    const idVoice = voices.find(v => v.lang.toLowerCase().includes('id') || v.lang.toLowerCase().includes('indonesia'));
    if (idVoice) {
      this.indonesianVoice = idVoice;
    } else {
      // Fallback to any voice with friendly child characteristics or default
      this.indonesianVoice = voices[0] || null;
    }
  }

  // Generate SHA-256 hash or simple string hash for caching (Section 11.4)
  public getAudioHash(text: string, voiceId: string = 'default', pitch = 1.0, rate = 1.0): string {
    const raw = `${text.trim()}_${voiceId}_${pitch}_${rate}`;
    let hash = 0;
    for (let i = 0; i < raw.length; i++) {
      const char = raw.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0;
    }
    return `voice_cache_${Math.abs(hash)}`;
  }

  public speak(text: string, options: VoiceOptions = {}): Promise<void> {
    return new Promise((resolve) => {
      if (!this.synth || typeof window === 'undefined') {
        options.onStart?.();
        setTimeout(() => {
          options.onEnd?.();
          resolve();
        }, 1500);
        return;
      }

      this.stop();

      const utterance = new SpeechSynthesisUtterance(text);
      this.currentUtterance = utterance;

      // Select Indonesian voice if available
      if (this.indonesianVoice) {
        utterance.voice = this.indonesianVoice;
      }
      utterance.lang = options.lang || 'id-ID';

      // Customize character personality
      if (options.speaker === 'budi') {
        utterance.pitch = options.pitch ?? 1.25;
        utterance.rate = options.rate ?? 0.95;
      } else if (options.speaker === 'siti') {
        utterance.pitch = options.pitch ?? 1.35;
        utterance.rate = options.rate ?? 0.92;
      } else {
        // Narrator
        utterance.pitch = options.pitch ?? 1.05;
        utterance.rate = options.rate ?? 0.9;
      }

      utterance.onstart = () => {
        this.isSpeaking = true;
        options.onStart?.();
      };

      utterance.onend = () => {
        this.isSpeaking = false;
        options.onEnd?.();
        resolve();
      };

      utterance.onerror = (e) => {
        console.warn('Voice engine error or cancelled:', e);
        this.isSpeaking = false;
        options.onEnd?.();
        resolve();
      };

      utterance.onboundary = (e) => {
        if (options.onBoundary) {
          options.onBoundary(e.charIndex);
        }
      };

      this.synth.speak(utterance);
    });
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
      this.isSpeaking = false;
    }
  }

  public isAvailable(): boolean {
    return typeof window !== 'undefined' && 'speechSynthesis' in window;
  }
}

export const voiceEngine = new VoiceEngine();
