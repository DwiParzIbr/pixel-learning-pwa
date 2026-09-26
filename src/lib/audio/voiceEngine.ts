// AI Voice & Speech Synthesis Engine for Indonesian & English Narration
// Features distinct acoustic profiles & voices for Narrator vs Character (Budi, Siti, etc.)
// Supports bilingual mode (Bahasa Indonesia & English)

import { translateStoryToEnglish } from '@/lib/i18n/storyTranslator';

export type VoiceLanguage = 'id' | 'en';
export type ExpressivityMode = 'vibrant' | 'storyteller' | 'gentle';

export interface VoiceOptions {
  speaker?: 'narrator' | 'budi' | 'siti' | 'bibo' | string;
  pitch?: number;
  rate?: number;
  lang?: VoiceLanguage | string;
  expressivity?: ExpressivityMode;
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

// Indonesian Character Voices - Lively, expressive kid personas
export const INDONESIAN_CHARACTER_VOICES: CharacterVoiceProfile[] = [
  {
    id: 'budi',
    name: 'Budi (Anak Laki-Laki)',
    role: 'Karakter Animasi',
    icon: '👦',
    description: 'Suara anak laki-laki yang lincah, bersemangat, dan sangat ceria.',
    pitch: 1.34,
    rate: 1.02,
    gender: 'male',
    sampleText: 'Hai kawan-kawan! Aku Budi! Wah, asyik sekali! Ayo kita hitung buah apel dan bertualang bersama!',
    lang: 'id',
  },
  {
    id: 'siti',
    name: 'Siti (Anak Perempuan)',
    role: 'Karakter Animasi',
    icon: '👧',
    description: 'Suara anak perempuan yang manis, bersahabat, melodius, dan pintar.',
    pitch: 1.62,
    rate: 0.96,
    gender: 'female',
    sampleText: 'Halo semuanya! Aku Siti! Wah, hebat sekali! Tenang saja ya, kita pasti bisa selesaikan soal ini bersama-sama!',
    lang: 'id',
  },
  {
    id: 'bibo',
    name: 'Robot Bibo',
    role: 'Karakter Robot',
    icon: '🤖',
    description: 'Suara robot berartikulasi unik yang futuristik, jenaka, dan cerdas.',
    pitch: 1.85,
    rate: 1.15,
    gender: 'robot',
    sampleText: 'Bip bop! Sistem robot pintar aktif! Wah, siap berhitung cepat bersama kalian!',
    lang: 'id',
  },
];

// English Character Voices - Lively, cheerful child & companion voices
export const ENGLISH_CHARACTER_VOICES: CharacterVoiceProfile[] = [
  {
    id: 'budi',
    name: 'Budi (Energetic Boy)',
    role: 'Animated Character',
    icon: '👦',
    description: 'Lively, joyful, and enthusiastic young boy voice.',
    pitch: 1.38,
    rate: 1.02,
    gender: 'male',
    sampleText: "Hi everyone! I am Budi! Wow, this is so exciting! Let's count the apples and have fun together!",
    lang: 'en',
  },
  {
    id: 'siti',
    name: 'Siti (Sweet Girl)',
    role: 'Animated Character',
    icon: '👧',
    description: 'Sweet, bright, melodious, and encouraging young girl voice.',
    pitch: 1.68,
    rate: 0.96,
    gender: 'female',
    sampleText: "Hello friends! I am Siti! You are doing amazing! Don't worry, we can solve every puzzle together!",
    lang: 'en',
  },
  {
    id: 'bibo',
    name: 'Robot Bibo',
    role: 'Robot Companion',
    icon: '🤖',
    description: 'Playful electronic robot companion with upbeat cadence.',
    pitch: 1.85,
    rate: 1.15,
    gender: 'robot',
    sampleText: 'Beep boop! Smart robot online! Wow, ready to calculate and explore with you!',
    lang: 'en',
  },
];

export const CHARACTER_VOICES = INDONESIAN_CHARACTER_VOICES;

// Indonesian Narrator Personas - Warm, engaging, cheerful storytellers
export const INDONESIAN_NARRATOR_PERSONAS: VoicePersona[] = [
  {
    id: 'kakak_ceria',
    name: 'Kakak Ceria',
    role: 'Pengajar Ramah',
    icon: '🌟',
    description: 'Suara riang, bersahabat, ekspresif, dan bersemangat membimbing petualangan.',
    pitch: 1.12,
    rate: 0.96,
    sampleText: 'Halo adik manis! Wah, ceria sekali hari ini! Yuk kita belajar dan berpetualang seru bersama Kakak!',
    lang: 'id',
  },
  {
    id: 'ibu_guru',
    name: 'Ibu Guru Bijak',
    role: 'Pendamping Tenang',
    icon: '👩‍🏫',
    description: 'Tutur kata lembut, artikulatif, hangat, dan penuh kasih sayang.',
    pitch: 1.04,
    rate: 0.92,
    sampleText: 'Selamat belajar anak pintar! Jangan takut salah ya, kita coba pelan-pelan bersama dengan gembira.',
    lang: 'id',
  },
  {
    id: 'paman_dongeng',
    name: 'Paman Dongeng',
    role: 'Karakter Hangat',
    icon: '🧙‍♂️',
    description: 'Suara berwibawa, teatrikal, dan hangat khas pembaca dongeng anak.',
    pitch: 0.90,
    rate: 0.88,
    sampleText: 'Pada suatu hari di Hutan Ajaib yang rindang... wah, petualangan berhitung yang ajaib pun dimulai!',
    lang: 'id',
  },
  {
    id: 'kakak_penjelajah',
    name: 'Kakak Penjelajah',
    role: 'Petualang Cerdas',
    icon: '🧭',
    description: 'Suara penuh rasa ingin tahu, energik, dan menantang untuk sains & petualangan.',
    pitch: 1.16,
    rate: 0.98,
    sampleText: 'Wah, lihat ke depan kawan! Ada teka-teki rahasia yang sangat menantang untuk kita pecahkan!',
    lang: 'id',
  },
];

// English Narrator Personas - Animated, clear, and encouraging
export const ENGLISH_NARRATOR_PERSONAS: VoicePersona[] = [
  {
    id: 'teacher_emma',
    name: 'Teacher Emma',
    role: 'Friendly Educator',
    icon: '🌟',
    description: 'Warm, animated, clear, and encouraging native English voice for kids.',
    pitch: 1.12,
    rate: 0.96,
    sampleText: "Hello little superstar! Wow, you look ready for fun! Let's explore the magical world of numbers together!",
    lang: 'en',
  },
  {
    id: 'miss_clara',
    name: 'Miss Clara',
    role: 'Gentle Teacher',
    icon: '👩‍🏫',
    description: 'Calm, soothing, melodious, and patient storytelling voice.',
    pitch: 1.04,
    rate: 0.92,
    sampleText: "Welcome young learners! Take your time, learning is full of wonderful discoveries step by step.",
    lang: 'en',
  },
  {
    id: 'storyteller_oliver',
    name: 'Storyteller Oliver',
    role: 'Warm Storyteller',
    icon: '🧙‍♂️',
    description: 'Theatrical, warm, and charismatic storytelling voice for quests.',
    pitch: 0.90,
    rate: 0.88,
    sampleText: "Once upon a time in the enchanted forest... a magical counting quest began!",
    lang: 'en',
  },
  {
    id: 'explorer_jack',
    name: 'Explorer Jack',
    role: 'Brave Explorer',
    icon: '🧭',
    description: 'Excited, adventurous, and curious voice for science quests.',
    pitch: 1.16,
    rate: 0.98,
    sampleText: "Look ahead, brave adventurers! A mysterious riddle is waiting for us to unlock!",
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

// Rank Indonesian voices by quality (Natural/Online > Neural > Google > Damayanti/Siri > Others)
function rankIndonesianVoice(v: SpeechSynthesisVoice): number {
  let score = 0;
  const name = v.name.toLowerCase();
  const lang = (v.lang || '').toLowerCase().replace(/_/g, '-');
  if (name.includes('natural') || name.includes('online')) score += 60;
  if (name.includes('neural') || name.includes('deep')) score += 50;
  if (name.includes('google')) score += 45;
  if (name.includes('enhanced') || name.includes('premium')) score += 40;
  if (name.includes('damayanti') || name.includes('siri')) score += 35;
  if (name.includes('gadis') || name.includes('ardi')) score += 30;
  if (lang === 'id-id' || lang === 'id') score += 20;
  if (v.default) score += 5;
  return score;
}

// Rank English voices by quality & natural expressiveness
function rankEnglishVoice(v: SpeechSynthesisVoice): number {
  let score = 0;
  const name = v.name.toLowerCase();
  const lang = (v.lang || '').toLowerCase().replace(/_/g, '-');
  if (name.includes('natural') || name.includes('online')) score += 60;
  if (name.includes('neural')) score += 55;
  if (name.includes('premium') || name.includes('enhanced')) score += 50;
  if (name.includes('google')) score += 40;
  if (name.includes('siri')) score += 35;
  if (name.includes('jenny') || name.includes('ana') || name.includes('aria') || name.includes('guy') || name.includes('oliver') || name.includes('emma')) score += 25;
  if (lang === 'en-us' || lang === 'en-gb') score += 15;
  if (v.default) score += 5;
  return score;
}

export interface SpeechSegment {
  text: string;
  pitchOffset: number;
  rateOffset: number;
  pauseAfterMs: number;
  startCharIndex: number;
}

// Intelligently segment story text into expressive, dynamic prosodic units
export function buildExpressiveSegments(
  rawText: string,
  lang: VoiceLanguage,
  mode: ExpressivityMode = 'vibrant'
): SpeechSegment[] {
  let cleaned = rawText.trim();

  if (lang === 'en') {
    // English math normalization
    cleaned = cleaned
      .replace(/(\d+)\s*[-−]\s*(\d+)/g, '$1 minus $2')
      .replace(/(\d+)\s*\+\s*(\d+)/g, '$1 plus $2')
      .replace(/(\d+)\s*[x*×]\s*(\d+)/g, '$1 times $2')
      .replace(/(\d+)\s*[:/÷]\s*(\d+)/g, '$1 divided by $2')
      .replace(/\s*=\s*/g, ', equals ');

    // Add breathing pause commas after expressive exclamation words
    cleaned = cleaned
      .replace(/(^|[.!?\n]\s*)(wow|yay|hooray|look|awesome|great|super|let's|hello|hi)\s+([a-zA-Z])/gi, '$1$2, $3');
  } else {
    // Indonesian math normalization
    cleaned = cleaned
      .replace(/(\d+)\s*[-−]\s*(\d+)/g, '$1 dikurang $2')
      .replace(/(\d+)\s*\+\s*(\d+)/g, '$1 ditambah $2')
      .replace(/(\d+)\s*[x*×]\s*(\d+)/g, '$1 dikali $2')
      .replace(/(\d+)\s*[:/÷]\s*(\d+)/g, '$1 dibagi $2')
      .replace(/\s*=\s*/g, ', sama dengan ');

    // Add breathing pause commas after Indonesian interjections
    cleaned = cleaned
      .replace(/(^|[.!?\n]\s*)(wah|hore|asyik|ayo|yuk|hebat|luar biasa|lihat|halo|hai)\s+([a-zA-Z])/gi, '$1$2, $3');
  }

  // Remove duplicate quotes and collapse spaces
  cleaned = cleaned.replace(/["“”«»]/g, ' ').replace(/\s+/g, ' ').trim();

  // Split into expressive sentences/clauses
  const rawSentences = cleaned.match(/[^.!?…\n]+(?:[.!?…\n]+|$)/g) || [cleaned];

  const segments: SpeechSegment[] = [];
  let cumulativeIndex = 0;

  for (const rawSentence of rawSentences) {
    const sentence = rawSentence.trim();
    if (!sentence) continue;

    let pitchOffset = 0.0;
    let rateOffset = 0.0;
    let pauseAfterMs = 65;

    // Detect Exclamation / High Energy
    const isExclamation =
      sentence.endsWith('!') ||
      /(\b(wah|hore|asyik|hebat|luar biasa|semangat|selamat|ayo|yuk|wow|yay|hooray|awesome|great|hurrah|amazing|bingo|yippee|aha)\b)/i.test(
        sentence
      );

    // Detect Question / Inquisitive Intonation
    const isQuestion =
      sentence.endsWith('?') ||
      /(\b(berapa|apakah|siapa|mengapa|kenapa|bagaimana|dimana|kemana|how|what|where|which|can you|who|why|is there|are there)\b)/i.test(
        sentence
      );

    // Detect Comforting / Encouraging Cadence
    const isEncouraging =
      /(\b(jangan takut|tenang|tidak apa-apa|coba lagi|bersama-sama|pelan-pelan|yuk kita|don't worry|take your time|try again|step by step)\b)/i.test(
        sentence
      );

    if (isExclamation) {
      if (mode === 'vibrant') {
        pitchOffset = 0.14;
        rateOffset = 0.03;
        pauseAfterMs = 85;
      } else if (mode === 'storyteller') {
        pitchOffset = 0.08;
        rateOffset = 0.01;
        pauseAfterMs = 95;
      } else {
        pitchOffset = 0.04;
        rateOffset = 0.0;
        pauseAfterMs = 110;
      }
    } else if (isQuestion) {
      if (mode === 'vibrant') {
        pitchOffset = 0.09;
        rateOffset = -0.02;
        pauseAfterMs = 75;
      } else if (mode === 'storyteller') {
        pitchOffset = 0.06;
        rateOffset = -0.03;
        pauseAfterMs = 85;
      } else {
        pitchOffset = 0.03;
        rateOffset = -0.05;
        pauseAfterMs = 100;
      }
    } else if (isEncouraging) {
      if (mode === 'vibrant') {
        pitchOffset = 0.06;
        rateOffset = -0.03;
        pauseAfterMs = 85;
      } else if (mode === 'storyteller') {
        pitchOffset = 0.04;
        rateOffset = -0.04;
        pauseAfterMs = 95;
      } else {
        pitchOffset = 0.01;
        rateOffset = -0.06;
        pauseAfterMs = 120;
      }
    } else {
      if (mode === 'storyteller') {
        rateOffset = -0.03;
        pauseAfterMs = 75;
      } else if (mode === 'gentle') {
        rateOffset = -0.06;
        pauseAfterMs = 90;
      }
    }

    segments.push({
      text: sentence,
      pitchOffset,
      rateOffset,
      pauseAfterMs,
      startCharIndex: cumulativeIndex,
    });

    cumulativeIndex += rawSentence.length;
  }

  return segments.length > 0
    ? segments
    : [
        {
          text: cleaned,
          pitchOffset: 0,
          rateOffset: 0,
          pauseAfterMs: 60,
          startCharIndex: 0,
        },
      ];
}

class VoiceEngine {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  public isSpeaking: boolean = false;

  // Language & Personas
  private activeLanguage: VoiceLanguage = 'id';
  private activeNarratorPersonaId: string = 'kakak_ceria';
  private expressivityMode: ExpressivityMode = 'vibrant';
  private selectedVoiceURI: string | null = null;

  // Segment queue playback
  private segmentTimer: any = null;
  private isCancelled: boolean = false;

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

        const savedExpressivity = localStorage.getItem('pixel_learning_voice_expressivity') as ExpressivityMode | null;
        if (savedExpressivity === 'vibrant' || savedExpressivity === 'storyteller' || savedExpressivity === 'gentle') {
          this.expressivityMode = savedExpressivity;
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
    this.indonesianVoice = idVoices[0] || null;

    // 2. English Voices - filter and rank expressive English voices
    const enVoices = voices
      .filter(isEnglishVoice)
      .sort((a, b) => rankEnglishVoice(b) - rankEnglishVoice(a));

    this.enFemaleVoice = enVoices.find(v => /(female|jenny|ana|aria|samantha|karen|victoria|zira|tessa|moira|fiona|ava|zoe)/i.test(v.name)) || enVoices[0] || null;
    this.enMaleVoice = enVoices.find(v => /(male|guy|ryan|daniel|alex|fred|david|oliver|tom)/i.test(v.name)) || enVoices.find(v => v !== this.enFemaleVoice) || enVoices[0] || null;
    this.enVoice = enVoices[0] || null;
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

  public getExpressivityMode(): ExpressivityMode {
    return this.expressivityMode;
  }

  public setExpressivityMode(mode: ExpressivityMode) {
    this.expressivityMode = mode;
    try {
      localStorage.setItem('pixel_learning_voice_expressivity', mode);
    } catch {
      // ignore
    }
  }

  public getPitchModifier(): number {
    return this.pitchModifier;
  }

  public setPitchModifier(val: number) {
    this.pitchModifier = Math.max(-0.5, Math.min(0.5, val));
  }

  public getRateModifier(): number {
    return this.rateModifier;
  }

  public setRateModifier(val: number) {
    this.rateModifier = Math.max(-0.5, Math.min(0.5, val));
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
      this.isCancelled = false;

      // Ensure fresh voice cache
      this.loadVoices();

      const targetLang: VoiceLanguage =
        options.lang === 'en' || options.lang === 'id' ? options.lang : this.activeLanguage;

      const mode: ExpressivityMode = options.expressivity || this.expressivityMode;

      // Translate text to natural English if in English mode
      const rawText = targetLang === 'en' ? translateStoryToEnglish(text) : text;

      // Segment text into expressive, dynamic prosodic units
      const segments = buildExpressiveSegments(rawText, targetLang, mode);

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
      }

      // Base Acoustic differentiation (Pitch & Rate) per character
      let basePitch = 1.0;
      let baseRate = 1.0;

      if (speaker === 'budi') {
        basePitch = targetLang === 'en' ? 1.38 : 1.34;
        baseRate = 1.02;
      } else if (speaker === 'siti') {
        basePitch = targetLang === 'en' ? 1.68 : 1.62;
        baseRate = 0.96;
      } else if (speaker === 'bibo' || speaker === 'robot') {
        basePitch = 1.85;
        baseRate = 1.15;
      } else {
        // Narrator persona base
        const narratorPersona = this.getActiveNarratorPersona();
        basePitch = narratorPersona.pitch;
        baseRate = narratorPersona.rate;
      }

      if (options.pitch !== undefined) basePitch = options.pitch;
      if (options.rate !== undefined) baseRate = options.rate;

      let currentSegmentIdx = 0;

      const playSegment = (idx: number) => {
        if (this.isCancelled || idx >= segments.length) {
          this.isSpeaking = false;
          options.onEnd?.();
          resolve();
          return;
        }

        const seg = segments[idx];
        const utterance = new SpeechSynthesisUtterance(seg.text);
        this.currentUtterance = utterance;

        if (targetLang === 'en') {
          utterance.lang = 'en-US';
          if (chosenVoice) utterance.voice = chosenVoice;
        } else {
          utterance.lang = 'id-ID';
          if (chosenVoice && isIndonesianVoice(chosenVoice)) {
            utterance.voice = chosenVoice;
          }
        }

        const finalPitch = Math.max(0.5, Math.min(2.0, basePitch + seg.pitchOffset + this.pitchModifier));
        const finalRate = Math.max(0.5, Math.min(2.0, baseRate + seg.rateOffset + this.rateModifier));

        utterance.pitch = finalPitch;
        utterance.rate = finalRate;

        utterance.onstart = () => {
          if (idx === 0) {
            this.isSpeaking = true;
            options.onStart?.();
          }
        };

        utterance.onboundary = (e) => {
          if (options.onBoundary) {
            options.onBoundary(seg.startCharIndex + e.charIndex);
          }
        };

        utterance.onend = () => {
          if (this.isCancelled) return;
          if (idx === segments.length - 1) {
            this.isSpeaking = false;
            options.onEnd?.();
            resolve();
          } else {
            this.segmentTimer = setTimeout(() => {
              if (!this.isCancelled) {
                playSegment(idx + 1);
              }
            }, seg.pauseAfterMs);
          }
        };

        utterance.onerror = (e) => {
          console.warn('Voice engine utterance error or cancelled:', e);
          if (this.isCancelled) return;
          if (idx === segments.length - 1) {
            this.isSpeaking = false;
            options.onEnd?.();
            resolve();
          } else {
            playSegment(idx + 1);
          }
        };

        if (!this.synth) {
          this.isSpeaking = false;
          options.onEnd?.();
          resolve();
          return;
        }

        this.synth.speak(utterance);
      };

      playSegment(0);
    });
  }

  public stop() {
    this.isCancelled = true;
    if (this.segmentTimer) {
      clearTimeout(this.segmentTimer);
      this.segmentTimer = null;
    }
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
