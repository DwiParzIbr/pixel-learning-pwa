// AI Voice & Speech Synthesis Engine for Indonesian Narration
// Features distinct acoustic profiles & voices for Narrator vs Character (Budi, Siti, etc.)

export interface VoiceOptions {
  speaker?: 'narrator' | 'budi' | 'siti' | 'bibo' | string;
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

export interface CharacterVoiceProfile {
  id: string;
  name: string;
  role: string;
  icon: string;
  description: string;
  pitch: number;
  rate: number;
  sampleText: string;
  gender: 'male' | 'female' | 'robot';
}

// Dedicated Character Voices for Animation Characters
export const CHARACTER_VOICES: CharacterVoiceProfile[] = [
  {
    id: 'budi',
    name: 'Budi (Anak Laki-Laki)',
    role: 'Karakter Animasi',
    icon: '👦',
    description: 'Suara anak laki-laki yang lincah, bersemangat, dan ceria.',
    pitch: 1.45,
    rate: 1.05,
    gender: 'male',
    sampleText: 'Hai kawan-kawan! Aku Budi! Ayo kita hitung buah apel dan bermain bersama!',
  },
  {
    id: 'siti',
    name: 'Siti (Anak Perempuan)',
    role: 'Karakter Animasi',
    icon: '👧',
    description: 'Suara anak perempuan yang manis, lembut, dan pintar.',
    pitch: 1.75,
    rate: 0.96,
    gender: 'female',
    sampleText: 'Halo semuanya! Aku Siti! Tenang saja, kita pasti bisa selesaikan soal ini bersama!',
  },
  {
    id: 'bibo',
    name: 'Robot Bibo',
    role: 'Karakter Robot',
    icon: '🤖',
    description: 'Suara robot berartikulasi unik yang futuristik dan cerdas.',
    pitch: 1.90,
    rate: 1.15,
    gender: 'robot',
    sampleText: 'Bip bop! Sistem robot pintar aktif! Siap menghitung bersama kawan!',
  },
];

// Narrator Personas for Storytelling and Question Prompting
export const NARRATOR_PERSONAS: VoicePersona[] = [
  {
    id: 'kakak_ceria',
    name: 'Kakak Ceria',
    role: 'Pengajar Ramah',
    icon: '🌟',
    description: 'Suara ramah, bersahabat, dan jelas untuk memandu petualangan.',
    pitch: 0.98,
    rate: 0.90,
    sampleText: 'Halo adik manis! Yuk belajar dan berpetualang seru bersama Kakak!',
  },
  {
    id: 'ibu_guru',
    name: 'Ibu Guru Bijak',
    role: 'Pendamping Tenang',
    icon: '👩‍🏫',
    description: 'Tutur kata lembut, tenang, dan perlahan agar mudah dipahami.',
    pitch: 0.92,
    rate: 0.85,
    sampleText: 'Selamat belajar anak pintar. Jangan takut salah, kita coba pelan-pelan ya.',
  },
  {
    id: 'paman_dongeng',
    name: 'Paman Dongeng',
    role: 'Karakter Hangat',
    icon: '🧙‍♂️',
    description: 'Suara berwibawa dan hangat, cocok untuk kisah petualangan dongeng.',
    pitch: 0.80,
    rate: 0.86,
    sampleText: 'Pada suatu hari di Hutan Ajaib yang rindang, petualangan berhitung pun dimulai!',
  },
  {
    id: 'kakak_penjelajah',
    name: 'Kakak Penjelajah',
    role: 'Petualang Cerdas',
    icon: '🧭',
    description: 'Suara penuh rasa ingin tahu dan semangat menjelajahi alam & sains.',
    pitch: 1.05,
    rate: 0.94,
    sampleText: 'Wah, lihat ke depan kawan! Ada teka-teki rahasia yang menunggu untuk kita pecahkan!',
  },
];

// Presets compatibility export
export const PRESET_VOICES: VoicePersona[] = NARRATOR_PERSONAS;

class VoiceEngine {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  public isSpeaking: boolean = false;
  private indonesianVoice: SpeechSynthesisVoice | null = null;
  private femaleVoice: SpeechSynthesisVoice | null = null;
  private maleVoice: SpeechSynthesisVoice | null = null;
  private activeNarratorPersonaId: string = 'kakak_ceria';
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
        const savedPersona =
          localStorage.getItem('pixel_learning_voice_narrator_persona') ||
          localStorage.getItem('pixel_learning_voice_persona');
        if (savedPersona && NARRATOR_PERSONAS.some(p => p.id === savedPersona)) {
          this.activeNarratorPersonaId = savedPersona;
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
    if (!voices || voices.length === 0) return;

    // 1. Find Indonesian voices
    const idVoices = voices.filter(
      v => v.lang.toLowerCase().includes('id') || v.lang.toLowerCase().includes('indonesia')
    );

    // 2. Identify dedicated female voice (for Siti / female characters)
    const femaleNameRegex = /(female|wanita|gadis|damayanti|siti|putri|zira|susan|victoria|karen|samantha|kyoko|yuna)/i;
    const idFemale = idVoices.find(v => femaleNameRegex.test(v.name));
    this.femaleVoice = idFemale || voices.find(v => femaleNameRegex.test(v.name)) || null;

    // 3. Identify dedicated male voice (for Budi / male characters)
    const maleNameRegex = /(male|pria|laki|andika|budi|arva|david|daniel|alex|george)/i;
    const idMale = idVoices.find(v => maleNameRegex.test(v.name));
    this.maleVoice = idMale || voices.find(v => maleNameRegex.test(v.name)) || null;

    // 4. Default primary Indonesian voice
    if (idVoices.length > 0) {
      this.indonesianVoice = idVoices[0];
    } else {
      this.indonesianVoice = voices[0] || null;
    }
  }

  public getPersonas(): VoicePersona[] {
    return NARRATOR_PERSONAS;
  }

  public getNarratorPersonas(): VoicePersona[] {
    return NARRATOR_PERSONAS;
  }

  public getCharacterVoices(): CharacterVoiceProfile[] {
    return CHARACTER_VOICES;
  }

  public getActivePersonaId(): string {
    return this.activeNarratorPersonaId;
  }

  public getActiveNarratorPersona(): VoicePersona {
    return NARRATOR_PERSONAS.find(p => p.id === this.activeNarratorPersonaId) || NARRATOR_PERSONAS[0];
  }

  public getActivePersona(): VoicePersona {
    return this.getActiveNarratorPersona();
  }

  public setPersona(personaId: string) {
    if (NARRATOR_PERSONAS.some(p => p.id === personaId)) {
      this.activeNarratorPersonaId = personaId;
      try {
        localStorage.setItem('pixel_learning_voice_narrator_persona', personaId);
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
    const persona = NARRATOR_PERSONAS.find(p => p.id === personaId) || NARRATOR_PERSONAS[0];
    return this.speak(persona.sampleText, {
      pitch: persona.pitch,
      rate: persona.rate,
      speaker: 'narrator',
    });
  }

  public previewSpeaker(role: 'narrator' | 'budi' | 'siti' | 'bibo'): Promise<void> {
    if (role === 'budi') {
      const budi = CHARACTER_VOICES.find(c => c.id === 'budi')!;
      return this.speak(budi.sampleText, { speaker: 'budi' });
    }
    if (role === 'siti') {
      const siti = CHARACTER_VOICES.find(c => c.id === 'siti')!;
      return this.speak(siti.sampleText, { speaker: 'siti' });
    }
    if (role === 'bibo') {
      const bibo = CHARACTER_VOICES.find(c => c.id === 'bibo')!;
      return this.speak(bibo.sampleText, { speaker: 'bibo' });
    }
    // Default narrator preview
    return this.previewPersona(this.activeNarratorPersonaId);
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

      const speaker = (options.speaker || 'narrator').toLowerCase();
      const voices = this.synth.getVoices();

      // Distinct voice selection per character/role
      let chosenVoice: SpeechSynthesisVoice | null = null;
      if (speaker === 'siti' && this.femaleVoice) {
        chosenVoice = this.femaleVoice;
      } else if (speaker === 'budi' && this.maleVoice) {
        chosenVoice = this.maleVoice;
      } else if (this.selectedVoiceURI && (speaker === 'narrator' || !options.speaker)) {
        chosenVoice = voices.find(v => v.voiceURI === this.selectedVoiceURI) || this.indonesianVoice;
      } else {
        chosenVoice = this.indonesianVoice || (voices.length > 0 ? voices[0] : null);
      }

      if (chosenVoice) {
        utterance.voice = chosenVoice;
      }
      utterance.lang = options.lang || (utterance.voice ? utterance.voice.lang : 'id-ID');

      // Acoustic differentiation (Pitch & Rate)
      let targetPitch = 1.0;
      let targetRate = 1.0;

      if (speaker === 'budi') {
        // Distinct energetic young boy timbre
        targetPitch = 1.45;
        targetRate = 1.05;
      } else if (speaker === 'siti') {
        // Distinct sweet, melodious young girl timbre
        targetPitch = 1.75;
        targetRate = 0.96;
      } else if (speaker === 'bibo' || speaker === 'robot' || speaker === 'robot_bibo') {
        // High playful robot timbre
        targetPitch = 1.90;
        targetRate = 1.15;
      } else {
        // Narrator: Calm, warm adult storytelling timbre from chosen persona
        const narratorPersona = this.getActiveNarratorPersona();
        targetPitch = narratorPersona.pitch;
        targetRate = narratorPersona.rate;
      }

      // Explicit overrides if passed
      if (options.pitch !== undefined) {
        targetPitch = options.pitch;
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
