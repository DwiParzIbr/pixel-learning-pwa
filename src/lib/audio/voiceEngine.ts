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

// Helper: Identify if a voice is an authentic Indonesian speech synthesis voice
export function isIndonesianVoice(v: SpeechSynthesisVoice | null | undefined): boolean {
  if (!v) return false;
  const lang = (v.lang || '').toLowerCase().replace(/_/g, '-');
  const name = (v.name || '').toLowerCase();
  const uri = (v.voiceURI || '').toLowerCase();

  // If voice is explicitly marked as another non-Indonesian language, exclude it
  if (
    lang.startsWith('en') ||
    lang.startsWith('ja') ||
    lang.startsWith('zh') ||
    lang.startsWith('ko') ||
    lang.startsWith('fr') ||
    lang.startsWith('de') ||
    lang.startsWith('es') ||
    lang.startsWith('hi') ||
    lang.startsWith('ru')
  ) {
    // Only accept if the name explicitly indicates Indonesian
    return name.includes('indonesia') || name.includes('bahasa indonesia');
  }

  // Indonesian language codes: id, id-id, id-ID, in, in-id, in_ID
  if (
    lang === 'id' ||
    lang.startsWith('id-') ||
    lang === 'in' ||
    lang.startsWith('in-') ||
    lang.startsWith('ind')
  ) {
    return true;
  }

  // Voice names and URIs containing Indonesian keywords
  if (
    name.includes('indonesia') ||
    name.includes('bahasa') ||
    name.includes('damayanti') ||
    name.includes('gadis') ||
    name.includes('ardi') ||
    name.includes('andika') ||
    uri.includes('indonesia') ||
    uri.includes('id-id') ||
    uri.includes('id_id')
  ) {
    return true;
  }

  return false;
}

// Helper: Identify if a voice is an English speech synthesis voice
export function isEnglishVoice(v: SpeechSynthesisVoice | null | undefined): boolean {
  if (!v) return false;
  const lang = (v.lang || '').toLowerCase().replace(/_/g, '-');
  return lang.startsWith('en');
}

// Rank Indonesian voices by quality (Natural/Online > Google > Damayanti/Siri > Others)
function rankIndonesianVoice(v: SpeechSynthesisVoice): number {
  let score = 0;
  const name = v.name.toLowerCase();
  const lang = (v.lang || '').toLowerCase().replace(/_/g, '-');
  if (name.includes('natural') || name.includes('online')) score += 50;
  if (name.includes('google')) score += 40;
  if (name.includes('damayanti') || name.includes('siri')) score += 35;
  if (name.includes('gadis') || name.includes('ardi')) score += 30;
  if (lang === 'id-id' || lang === 'id') score += 20;
  if (v.default) score += 5;
  return score;
}

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

      if (this.synth.addEventListener) {
        this.synth.addEventListener('voiceschanged', () => this.loadVoices());
      }
      this.synth.onvoiceschanged = () => this.loadVoices();

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

        const savedVoiceURI = localStorage.getItem(`pixel_learning_voice_uri_${this.activeLanguage}`);
        if (savedVoiceURI) {
          this.selectedVoiceURI = savedVoiceURI;
        } else {
          this.selectedVoiceURI = null;
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

    // 1. Indonesian Voices - filter and rank authentic Indonesian voices
    const idVoices = voices
      .filter(isIndonesianVoice)
      .sort((a, b) => rankIndonesianVoice(b) - rankIndonesianVoice(a));

    const femaleNameRegex = /(female|wanita|perempuan|gadis|damayanti|siti|putri|ayu)/i;
    const maleNameRegex = /(male|pria|laki|andika|budi|arva|ardi|bagus)/i;

    this.idFemaleVoice = idVoices.find(v => femaleNameRegex.test(v.name)) || idVoices[0] || null;
    this.idMaleVoice = idVoices.find(v => maleNameRegex.test(v.name)) || idVoices.find(v => v !== this.idFemaleVoice) || idVoices[0] || null;
    // CRITICAL: NEVER fall back to voices[0] (which is typically English!)
    this.indonesianVoice = idVoices[0] || null;

    // 2. English Voices
    const enVoices = voices.filter(isEnglishVoice);
    this.enFemaleVoice = enVoices.find(v => /(female|samantha|karen|victoria|zira|tessa|moira|fiona|jenny|aria)/i.test(v.name)) || enVoices[0] || null;
    this.enMaleVoice = enVoices.find(v => /(male|daniel|alex|fred|david|oliver|tom|guy|ryan)/i.test(v.name)) || enVoices.find(v => v !== this.enFemaleVoice) || enVoices[0] || null;
    this.enVoice = enVoices.find(v => (v.lang || '').toLowerCase() === 'en-us' || (v.lang || '').toLowerCase() === 'en-gb') || enVoices[0] || null;
  }

  public getLanguage(): VoiceLanguage {
    return this.activeLanguage;
  }

  public setLanguage(lang: VoiceLanguage) {
    this.activeLanguage = lang;
    try {
      localStorage.setItem('pixel_learning_voice_lang', lang);
      const savedVoiceURI = localStorage.getItem(`pixel_learning_voice_uri_${lang}`);
      this.selectedVoiceURI = savedVoiceURI || null;
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
      return voices.filter(isEnglishVoice);
    }
    return voices.filter(isIndonesianVoice);
  }

  public getSelectedVoiceURI(lang?: VoiceLanguage): string | null {
    const targetLang = lang || this.activeLanguage;
    try {
      const uri = localStorage.getItem(`pixel_learning_voice_uri_${targetLang}`);
      if (uri) return uri;
    } catch {
      // ignore
    }
    return this.selectedVoiceURI;
  }

  public setSelectedVoiceURI(uri: string | null, lang?: VoiceLanguage) {
    const targetLang = lang || this.activeLanguage;
    this.selectedVoiceURI = uri;
    try {
      if (uri) {
        localStorage.setItem(`pixel_learning_voice_uri_${targetLang}`, uri);
        localStorage.setItem('pixel_learning_voice_uri', uri);
      } else {
        localStorage.removeItem(`pixel_learning_voice_uri_${targetLang}`);
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
      if (!this.synth || (typeof window !== 'undefined' && !('speechSynthesis' in window))) {
        options.onStart?.();
        setTimeout(() => {
          options.onEnd?.();
          resolve();
        }, 1500);
        return;
      }

      this.stop();

      // Ensure fresh voice cache
      this.loadVoices();

      const targetLang: VoiceLanguage =
        options.lang === 'en' || options.lang === 'id' ? options.lang : this.activeLanguage;

      // Clean & normalize spoken text according to target language
      let spokenText = text.trim();

      if (targetLang === 'en') {
        spokenText = translateStoryToEnglish(spokenText);
      } else {
        // Natural Indonesian speech preparation:
        // Convert arithmetic symbols into natural Indonesian spoken words
        spokenText = spokenText
          .replace(/(\d+)\s*[-−]\s*(\d+)/g, '$1 dikurang $2')
          .replace(/(\d+)\s*\+\s*(\d+)/g, '$1 ditambah $2')
          .replace(/(\d+)\s*[x*×]\s*(\d+)/g, '$1 dikali $2')
          .replace(/(\d+)\s*[:/÷]\s*(\d+)/g, '$1 dibagi $2')
          .replace(/\s*=\s*/g, ' sama dengan ')
          .replace(/["“”«»]/g, ' ')
          .replace(/\s+/g, ' ')
          .trim();
      }

      const utterance = new SpeechSynthesisUtterance(spokenText);
      this.currentUtterance = utterance;

      const speaker = (options.speaker || 'narrator').toLowerCase();
      const voices = this.synth.getVoices();

      let chosenVoice: SpeechSynthesisVoice | null = null;

      if (targetLang === 'en') {
        if (speaker === 'siti') {
          chosenVoice = this.enFemaleVoice || this.enVoice;
        } else if (speaker === 'budi') {
          chosenVoice = this.enMaleVoice || this.enVoice;
        } else if (this.selectedVoiceURI && speaker === 'narrator') {
          const matched = voices.find(v => v.voiceURI === this.selectedVoiceURI);
          chosenVoice = (matched && isEnglishVoice(matched)) ? matched : this.enVoice;
        } else {
          chosenVoice = this.enVoice;
        }
        utterance.lang = 'en-US';
        if (chosenVoice) {
          utterance.voice = chosenVoice;
        }
      } else {
        // Indonesian mode
        if (speaker === 'siti') {
          chosenVoice = this.idFemaleVoice || this.indonesianVoice;
        } else if (speaker === 'budi') {
          chosenVoice = this.idMaleVoice || this.indonesianVoice;
        } else if (this.selectedVoiceURI && (speaker === 'narrator' || !options.speaker)) {
          const matched = voices.find(v => v.voiceURI === this.selectedVoiceURI);
          chosenVoice = (matched && isIndonesianVoice(matched)) ? matched : this.indonesianVoice;
        } else {
          chosenVoice = this.indonesianVoice;
        }
        utterance.lang = 'id-ID';

        // CRITICAL FIX: Only assign utterance.voice if chosenVoice is an authentic Indonesian voice!
        // NEVER assign an English voice (Alex/Samantha/David) to an Indonesian utterance,
        // because doing so forces the browser to pronounce Indonesian text using English phonetics!
        if (chosenVoice && isIndonesianVoice(chosenVoice)) {
          utterance.voice = chosenVoice;
        }
      }

      // Acoustic differentiation (Pitch & Rate)
      let targetPitch = 1.0;
      let targetRate = 1.0;

      if (speaker === 'budi') {
        targetPitch = targetLang === 'en' ? 1.35 : 1.30;
        targetRate = targetLang === 'en' ? 1.02 : 1.02;
      } else if (speaker === 'siti') {
        targetPitch = targetLang === 'en' ? 1.65 : 1.55;
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
        // If cancelled or interrupted because of stop(), do not trigger onEnd to advance scene!
        if (e.error === 'interrupted' || e.error === 'canceled') {
          resolve();
          return;
        }
        // If audio failed or was blocked by browser autoplay policy,
        // wait for a reasonable reading duration based on sentence length so the scene does NOT skip!
        const fallbackReadingTime = Math.max(3000, spokenText.length * 60);
        setTimeout(() => {
          options.onEnd?.();
          resolve();
        }, fallbackReadingTime);
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
