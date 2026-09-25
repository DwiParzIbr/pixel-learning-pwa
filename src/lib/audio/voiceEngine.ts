// AI Voice & Speech Synthesis Engine for Indonesian & English Narration
// Features distinct acoustic profiles & voices for Narrator vs Character (Budi, Siti, etc.)
// Supports bilingual mode (Bahasa Indonesia & English)

import { translateStoryToEnglish } from '@/lib/i18n/storyTranslator';

export type VoiceLanguage = 'id' | 'en';

export interface VoiceOptions {
  speaker?: 'narrator' | 'budi' | 'siti' | 'bibo' | string;
  pitch?: number;
  rate?: number;
  lang?: VoiceLanguage | string;
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
  lang: VoiceLanguage;
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
  lang: VoiceLanguage;
}

// Indonesian Character Voices
export const INDONESIAN_CHARACTER_VOICES: CharacterVoiceProfile[] = [
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
    lang: 'id',
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
    lang: 'id',
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
    lang: 'id',
  },
];

// English Character Voices
export const ENGLISH_CHARACTER_VOICES: CharacterVoiceProfile[] = [
  {
    id: 'budi',
    name: 'Budi (Energetic Boy)',
    role: 'Animated Character',
    icon: '👦',
    description: 'Lively, joyful, and cheerful young boy English voice.',
    pitch: 1.40,
    rate: 1.02,
    gender: 'male',
    sampleText: "Hi everyone! I am Budi! Let's count apples and have fun learning together!",
    lang: 'en',
  },
  {
    id: 'siti',
    name: 'Siti (Sweet Girl)',
    role: 'Animated Character',
    icon: '👧',
    description: 'Sweet, bright, and melodious young girl English voice.',
    pitch: 1.70,
    rate: 0.96,
    gender: 'female',
    sampleText: "Hello friends! I am Siti! Don't worry, we can solve every puzzle together!",
    lang: 'en',
  },
  {
    id: 'bibo',
    name: 'Robot Bibo',
    role: 'Robot Companion',
    icon: '🤖',
    description: 'High, playful electronic robot voice with distinct articulation.',
    pitch: 1.90,
    rate: 1.15,
    gender: 'robot',
    sampleText: 'Beep boop! Smart robot online! Ready to calculate and explore with you!',
    lang: 'en',
  },
];

export const CHARACTER_VOICES = INDONESIAN_CHARACTER_VOICES;

// Indonesian Narrator Personas
export const INDONESIAN_NARRATOR_PERSONAS: VoicePersona[] = [
  {
    id: 'kakak_ceria',
    name: 'Kakak Ceria',
    role: 'Pengajar Ramah',
    icon: '🌟',
    description: 'Suara ramah, bersahabat, dan jelas untuk memandu petualangan.',
    pitch: 0.98,
    rate: 0.90,
    sampleText: 'Halo adik manis! Yuk belajar dan berpetualang seru bersama Kakak!',
    lang: 'id',
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
    lang: 'id',
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
    lang: 'id',
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
    lang: 'id',
  },
];

// English Narrator Personas
export const ENGLISH_NARRATOR_PERSONAS: VoicePersona[] = [
  {
    id: 'teacher_emma',
    name: 'Teacher Emma',
    role: 'Friendly Educator',
    icon: '🌟',
    description: 'Warm, clear, and encouraging native English voice for kids.',
    pitch: 1.0,
    rate: 0.90,
    sampleText: "Hello little superstar! Let's explore the magical world of numbers and stories together!",
    lang: 'en',
  },
  {
    id: 'miss_clara',
    name: 'Miss Clara',
    role: 'Gentle Teacher',
    icon: '👩‍🏫',
    description: 'Calm, patient, and soft-spoken voice for relaxed storytelling.',
    pitch: 0.95,
    rate: 0.85,
    sampleText: 'Welcome young learners. Take your time, learning is fun step by step.',
    lang: 'en',
  },
  {
    id: 'storyteller_oliver',
    name: 'Storyteller Oliver',
    role: 'Warm Storyteller',
    icon: '🧙‍♂️',
    description: 'Warm and theatrical voice perfect for castle and forest quests.',
    pitch: 0.82,
    rate: 0.88,
    sampleText: 'Once upon a time in the enchanted forest, our counting quest began!',
    lang: 'en',
  },
  {
    id: 'explorer_jack',
    name: 'Explorer Jack',
    role: 'Brave Explorer',
    icon: '🧭',
    description: 'Excited, adventurous, and curious voice for science and quests.',
    pitch: 1.05,
    rate: 0.95,
    sampleText: 'Look ahead friends! A mysterious riddle is waiting for us to unlock!',
    lang: 'en',
  },
];

export const NARRATOR_PERSONAS = INDONESIAN_NARRATOR_PERSONAS;
export const PRESET_VOICES = INDONESIAN_NARRATOR_PERSONAS;

class VoiceEngine {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  public isSpeaking: boolean = false;

  // Language & Personas
  private activeLanguage: VoiceLanguage = 'id';
  private activeNarratorPersonaId: string = 'kakak_ceria';
  private selectedVoiceURI: string | null = null;

  // Detected voices
  private indonesianVoice: SpeechSynthesisVoice | null = null;
  private idFemaleVoice: SpeechSynthesisVoice | null = null;
  private idMaleVoice: SpeechSynthesisVoice | null = null;

  private enVoice: SpeechSynthesisVoice | null = null;
  private enFemaleVoice: SpeechSynthesisVoice | null = null;
  private enMaleVoice: SpeechSynthesisVoice | null = null;

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
        const savedLang = localStorage.getItem('pixel_learning_voice_lang') as VoiceLanguage | null;
        if (savedLang === 'id' || savedLang === 'en') {
          this.activeLanguage = savedLang;
        }

        const savedPersona =
          localStorage.getItem('pixel_learning_voice_narrator_persona') ||
          localStorage.getItem('pixel_learning_voice_persona');
        if (savedPersona) {
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

    // 1. Indonesian Voices
    const idVoices = voices.filter(
      v => v.lang.toLowerCase().includes('id') || v.lang.toLowerCase().includes('indonesia')
    );
    const femaleNameRegex = /(female|wanita|gadis|damayanti|siti|putri|zira|susan|victoria|karen|samantha|kyoko|yuna)/i;
    const maleNameRegex = /(male|pria|laki|andika|budi|arva|david|daniel|alex|george|fred)/i;

    this.idFemaleVoice = idVoices.find(v => femaleNameRegex.test(v.name)) || null;
    this.idMaleVoice = idVoices.find(v => maleNameRegex.test(v.name)) || null;
    this.indonesianVoice = idVoices[0] || voices[0] || null;

    // 2. English Voices
    const enVoices = voices.filter(
      v => v.lang.toLowerCase().startsWith('en')
    );
    this.enFemaleVoice = enVoices.find(v => femaleNameRegex.test(v.name)) || enVoices.find(v => /(samantha|karen|victoria|zira|tessa|moira|fiona)/i.test(v.name)) || null;
    this.enMaleVoice = enVoices.find(v => maleNameRegex.test(v.name)) || enVoices.find(v => /(daniel|alex|fred|david|oliver|tom)/i.test(v.name)) || null;
    this.enVoice = enVoices.find(v => v.lang.toLowerCase() === 'en-us' || v.lang.toLowerCase() === 'en-gb') || enVoices[0] || null;
  }

  public getLanguage(): VoiceLanguage {
    return this.activeLanguage;
  }

  public setLanguage(lang: VoiceLanguage) {
    this.activeLanguage = lang;
    try {
      localStorage.setItem('pixel_learning_voice_lang', lang);
    } catch {
      // ignore
    }
    // Set appropriate default persona for language if needed
    if (lang === 'en' && !ENGLISH_NARRATOR_PERSONAS.some(p => p.id === this.activeNarratorPersonaId)) {
      this.activeNarratorPersonaId = 'teacher_emma';
    } else if (lang === 'id' && !INDONESIAN_NARRATOR_PERSONAS.some(p => p.id === this.activeNarratorPersonaId)) {
      this.activeNarratorPersonaId = 'kakak_ceria';
    }
  }

  public getNarratorPersonas(lang?: VoiceLanguage): VoicePersona[] {
    const targetLang = lang || this.activeLanguage;
    return targetLang === 'en' ? ENGLISH_NARRATOR_PERSONAS : INDONESIAN_NARRATOR_PERSONAS;
  }

  public getPersonas(): VoicePersona[] {
    return this.getNarratorPersonas();
  }

  public getCharacterVoices(lang?: VoiceLanguage): CharacterVoiceProfile[] {
    const targetLang = lang || this.activeLanguage;
    return targetLang === 'en' ? ENGLISH_CHARACTER_VOICES : INDONESIAN_CHARACTER_VOICES;
  }

  public getActivePersonaId(): string {
    return this.activeNarratorPersonaId;
  }

  public getActiveNarratorPersona(): VoicePersona {
    const list = this.getNarratorPersonas();
    return list.find(p => p.id === this.activeNarratorPersonaId) || list[0];
  }

  public getActivePersona(): VoicePersona {
    return this.getActiveNarratorPersona();
  }

  public setPersona(personaId: string) {
    const all = [...INDONESIAN_NARRATOR_PERSONAS, ...ENGLISH_NARRATOR_PERSONAS];
    const match = all.find(p => p.id === personaId);
    if (match) {
      this.activeNarratorPersonaId = personaId;
      this.activeLanguage = match.lang;
      try {
        localStorage.setItem('pixel_learning_voice_narrator_persona', personaId);
        localStorage.setItem('pixel_learning_voice_persona', personaId);
        localStorage.setItem('pixel_learning_voice_lang', match.lang);
      } catch {
        // ignore
      }
    }
  }

  public getAvailableSystemVoices(lang?: VoiceLanguage): SpeechSynthesisVoice[] {
    if (!this.synth) return [];
    const voices = this.synth.getVoices();
    const targetLang = lang || this.activeLanguage;
    if (targetLang === 'en') {
      const en = voices.filter(v => v.lang.toLowerCase().startsWith('en'));
      return en.length > 0 ? en : voices;
    }
    const id = voices.filter(v => v.lang.toLowerCase().includes('id'));
    return id.length > 0 ? id : voices;
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
    const all = [...INDONESIAN_NARRATOR_PERSONAS, ...ENGLISH_NARRATOR_PERSONAS];
    const persona = all.find(p => p.id === personaId) || this.getActiveNarratorPersona();
    return this.speak(persona.sampleText, {
      pitch: persona.pitch,
      rate: persona.rate,
      speaker: 'narrator',
      lang: persona.lang,
    });
  }

  public previewSpeaker(role: 'narrator' | 'budi' | 'siti' | 'bibo', lang?: VoiceLanguage): Promise<void> {
    const targetLang = lang || this.activeLanguage;
    const list = this.getCharacterVoices(targetLang);

    if (role === 'budi') {
      const budi = list.find(c => c.id === 'budi')!;
      return this.speak(budi.sampleText, { speaker: 'budi', lang: targetLang });
    }
    if (role === 'siti') {
      const siti = list.find(c => c.id === 'siti')!;
      return this.speak(siti.sampleText, { speaker: 'siti', lang: targetLang });
    }
    if (role === 'bibo') {
      const bibo = list.find(c => c.id === 'bibo')!;
      return this.speak(bibo.sampleText, { speaker: 'bibo', lang: targetLang });
    }
    // Default narrator preview
    const persona = this.getActiveNarratorPersona();
    return this.speak(persona.sampleText, {
      pitch: persona.pitch,
      rate: persona.rate,
      speaker: 'narrator',
      lang: targetLang,
    });
  }

  public speak(text: string, options: VoiceOptions = {}): Promise<void> {
    return new Promise((resolve) => {
      if (!this.synth || typeof window !== 'undefined' && !('speechSynthesis' in window)) {
        options.onStart?.();
        setTimeout(() => {
          options.onEnd?.();
          resolve();
        }, 1500);
        return;
      }

      this.stop();

      const targetLang: VoiceLanguage = (options.lang === 'en' || options.lang === 'id')
        ? options.lang
        : this.activeLanguage;

      // Translate text to natural English if in English mode
      const spokenText = targetLang === 'en' ? translateStoryToEnglish(text) : text;

      const utterance = new SpeechSynthesisUtterance(spokenText);
      this.currentUtterance = utterance;

      const speaker = (options.speaker || 'narrator').toLowerCase();
      const voices = this.synth.getVoices();

      // Distinct voice selection per character and language
      let chosenVoice: SpeechSynthesisVoice | null = null;

      if (targetLang === 'en') {
        if (speaker === 'siti') {
          chosenVoice = this.enFemaleVoice || this.enVoice || voices[0];
        } else if (speaker === 'budi') {
          chosenVoice = this.enMaleVoice || this.enVoice || voices[0];
        } else if (this.selectedVoiceURI && speaker === 'narrator') {
          chosenVoice = voices.find(v => v.voiceURI === this.selectedVoiceURI) || this.enVoice || voices[0];
        } else {
          chosenVoice = this.enVoice || (voices.length > 0 ? voices[0] : null);
        }
        utterance.lang = 'en-US';
      } else {
        // Indonesian mode
        if (speaker === 'siti') {
          chosenVoice = this.idFemaleVoice || this.indonesianVoice;
        } else if (speaker === 'budi') {
          chosenVoice = this.idMaleVoice || this.indonesianVoice;
        } else if (this.selectedVoiceURI && (speaker === 'narrator' || !options.speaker)) {
          chosenVoice = voices.find(v => v.voiceURI === this.selectedVoiceURI) || this.indonesianVoice;
        } else {
          chosenVoice = this.indonesianVoice || (voices.length > 0 ? voices[0] : null);
        }
        utterance.lang = 'id-ID';
      }

      if (chosenVoice) {
        utterance.voice = chosenVoice;
      }

      // Acoustic differentiation (Pitch & Rate)
      let targetPitch = 1.0;
      let targetRate = 1.0;

      if (speaker === 'budi') {
        targetPitch = targetLang === 'en' ? 1.40 : 1.45;
        targetRate = targetLang === 'en' ? 1.02 : 1.05;
      } else if (speaker === 'siti') {
        targetPitch = targetLang === 'en' ? 1.70 : 1.75;
        targetRate = targetLang === 'en' ? 0.96 : 0.96;
      } else if (speaker === 'bibo' || speaker === 'robot') {
        targetPitch = 1.90;
        targetRate = 1.15;
      } else {
        // Narrator
        const narratorPersona = this.getActiveNarratorPersona();
        targetPitch = narratorPersona.pitch;
        targetRate = narratorPersona.rate;
      }

      if (options.pitch !== undefined) targetPitch = options.pitch;
      if (options.rate !== undefined) targetRate = options.rate;

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
