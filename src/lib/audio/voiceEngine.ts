// AI Voice & Speech Synthesis Engine for Indonesian Narration
// Includes audio cache mechanism and multi-voice persona customization

export interface VoiceOptions {
  speaker?: string;
  pitch?: number;
  rate?: number;
  lang?: string;
  onStart?: () => void;
  onEnd?: () => void;
  onBoundary?: (charIndex: number) => void;
}

export interface VoicePersona {
  id: string;
  name: string;
  role: string;
  icon: string;
  description: string;
  pitch: number;
  rate: number;
  sampleText: string;
}

export const PRESET_VOICES: VoicePersona[] = [
  {
    id: 'kakak_ceria',
    name: 'Kakak Ceria',
    role: 'Pengajar Ramah',
    icon: '🌟',
    description: 'Suara ramah, bersahabat, dan jelas untuk memandu petualangan.',
    pitch: 1.1,
    rate: 0.95,
    sampleText: 'Halo adik manis! Yuk belajar dan berpetualang seru bersama Kakak!',
  },
  {
    id: 'budi_cilik',
    name: 'Budi Cilik',
    role: 'Teman Bersemangat',
    icon: '👦',
    description: 'Suara anak laki-laki yang lincah, bersemangat, dan ceria.',
    pitch: 1.35,
    rate: 1.0,
    sampleText: 'Hai! Aku Budi! Aku suka sekali berhitung buah apel dan bermain!',
  },
  {
    id: 'siti_manis',
    name: 'Siti Manis',
    role: 'Sahabat Pintar',
    icon: '👧',
    description: 'Suara anak perempuan yang lembut, manis, dan cerdas.',
    pitch: 1.45,
    rate: 0.92,
    sampleText: 'Halo teman-teman! Aku Siti, ayo kita selesaikan tantangan ini bersama!',
  },
  {
    id: 'ibu_guru',
    name: 'Ibu Guru Bijak',
    role: 'Pendamping Tenang',
    icon: '👩‍🏫',
    description: 'Tutur kata lembut, tenang, dan perlahan agar mudah dipahami.',
    pitch: 1.0,
    rate: 0.85,
    sampleText: 'Selamat belajar anak pintar. Jangan takut salah, kita coba pelan-pelan ya.',
  },
  {
    id: 'robot_bibo',
    name: 'Robot Bibo',
    role: 'Sahabat Cerdas',
    icon: '🤖',
    description: 'Suara robot berartikulasi unik yang disukai anak-anak.',
    pitch: 1.7,
    rate: 1.1,
    sampleText: 'Bip bop! Sistem pintar aktif! Siap menghitung bersama kawan!',
  },
  {
    id: 'paman_dongeng',
    name: 'Paman Dongeng',
    role: 'Karakter Hangat',
    icon: '🧙‍♂️',
    description: 'Suara hangat dan berwibawa, cocok untuk kisah petualangan.',
    pitch: 0.8,
    rate: 0.88,
    sampleText: 'Pada suatu hari di Hutan Ajaib yang rindang, petualangan pun dimulai!',
  },
];

class VoiceEngine {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  public isSpeaking: boolean = false;
  private indonesianVoice: SpeechSynthesisVoice | null = null;
  private activePersonaId: string = 'kakak_ceria';
  private selectedVoiceURI: string | null = null;
  private pitchModifier: number = 0;
  private rateModifier: number = 0;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.loadVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.loadVoices();
      }

      try {
        const savedPersona = localStorage.getItem('pixel_learning_voice_persona');
        if (savedPersona && PRESET_VOICES.some(p => p.id === savedPersona)) {
          this.activePersonaId = savedPersona;
        }
        const savedVoiceURI = localStorage.getItem('pixel_learning_voice_uri');
        if (savedVoiceURI) {
          this.selectedVoiceURI = savedVoiceURI;
        }
      } catch {
        // localStorage not available
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
      this.indonesianVoice = voices[0] || null;
    }
  }

  public getPersonas(): VoicePersona[] {
    return PRESET_VOICES;
  }

  public getActivePersonaId(): string {
    return this.activePersonaId;
  }

  public getActivePersona(): VoicePersona {
    return PRESET_VOICES.find(p => p.id === this.activePersonaId) || PRESET_VOICES[0];
  }

  public setPersona(personaId: string) {
    if (PRESET_VOICES.some(p => p.id === personaId)) {
      this.activePersonaId = personaId;
      try {
        localStorage.setItem('pixel_learning_voice_persona', personaId);
      } catch {
        // ignore
      }
    }
  }

  public getAvailableSystemVoices(): SpeechSynthesisVoice[] {
    if (!this.synth) return [];
    return this.synth.getVoices();
  }

  public getSelectedVoiceURI(): string | null {
    return this.selectedVoiceURI;
  }

  public setSelectedVoiceURI(uri: string | null) {
    this.selectedVoiceURI = uri;
    try {
      if (uri) {
        localStorage.setItem('pixel_learning_voice_uri', uri);
      } else {
        localStorage.removeItem('pixel_learning_voice_uri');
      }
    } catch {
      // ignore
    }
  }

  public previewPersona(personaId: string): Promise<void> {
    const persona = PRESET_VOICES.find(p => p.id === personaId) || PRESET_VOICES[0];
    return this.speak(persona.sampleText, {
      pitch: persona.pitch,
      rate: persona.rate,
      speaker: persona.id,
    });
  }

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

      // Select system voice
      const voices = this.synth.getVoices();
      if (this.selectedVoiceURI) {
        const found = voices.find(v => v.voiceURI === this.selectedVoiceURI);
        if (found) {
          utterance.voice = found;
        } else if (this.indonesianVoice) {
          utterance.voice = this.indonesianVoice;
        }
      } else if (this.indonesianVoice) {
        utterance.voice = this.indonesianVoice;
      }
      utterance.lang = options.lang || (utterance.voice ? utterance.voice.lang : 'id-ID');

      // Calculate pitch & rate based on active Persona and optional speaker
      const persona = this.getActivePersona();
      let targetPitch = persona.pitch;
      let targetRate = persona.rate;

      if (options.pitch !== undefined) {
        targetPitch = options.pitch;
      } else if (options.speaker === 'budi') {
        targetPitch = Math.min(2, persona.pitch * 1.15);
        targetRate = persona.rate;
      } else if (options.speaker === 'siti') {
        targetPitch = Math.min(2, persona.pitch * 1.25);
        targetRate = Math.max(0.7, persona.rate * 0.96);
      }

      if (options.rate !== undefined) {
        targetRate = options.rate;
      }

      utterance.pitch = Math.max(0.5, Math.min(2.0, targetPitch + this.pitchModifier));
      utterance.rate = Math.max(0.5, Math.min(2.0, targetRate + this.rateModifier));

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
