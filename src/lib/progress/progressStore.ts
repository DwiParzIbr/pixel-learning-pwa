import { ChildProfile, LessonAttempt, MasteryScore, MathTopicType, BadgeDef } from '@/types/story';

export const availableBadges: BadgeDef[] = [
  {
    id: 'first_adventure',
    title: 'Petualang Pertama',
    description: 'Menyelesaikan petualangan cerita pembelajaran pertama!',
    icon: '🚀',
    requiredLessons: 1,
  },
  {
    id: 'math_explorer',
    title: 'Penjelajah Angka',
    description: 'Menyelesaikan 3 level pembelajaran matematika.',
    icon: '🧭',
    requiredLessons: 3,
  },
  {
    id: 'subtraction_master',
    title: 'Pakar Pengurangan',
    description: 'Menguasai konsep pengurangan kelereng dengan akurasi tinggi.',
    icon: '🔮',
    topicMastered: 'subtraction',
  },
  {
    id: 'addition_champ',
    title: 'Juara Penjumlahan',
    description: 'Menguasai konsep penggabungan koin dan benda.',
    icon: '🪙',
    topicMastered: 'addition',
  },
  {
    id: 'problem_solver',
    title: 'Pemecah Masalah Cilik',
    description: 'Menjawab soal matematika tanpa menggunakan petunjuk (Hint).',
    icon: '💡',
  },
  {
    id: 'castle_hero',
    title: 'Pahlawan Kastil Ajaib',
    description: 'Membuka gerbang kastil dan menaklukkan Level 7 Final Adventure!',
    icon: '👑',
    requiredLessons: 7,
  },
];

const defaultProfiles: ChildProfile[] = [
  {
    id: 'child_budi',
    name: 'Budi Cilik',
    avatar: '👦',
    age: 7,
    xp: 120,
    level: 2,
    stars: 5,
    completedLessons: ['math-counting-001', 'math-addition-001'],
    badges: ['first_adventure'],
    streakDays: 3,
    lastActive: new Date().toISOString(),
  },
  {
    id: 'child_siti',
    name: 'Siti Manis',
    avatar: '👧',
    age: 8,
    xp: 260,
    level: 4,
    stars: 12,
    completedLessons: ['math-counting-001', 'math-addition-001', 'math-subtraction-001', 'math-comparison-001'],
    badges: ['first_adventure', 'math_explorer', 'subtraction_master'],
    streakDays: 5,
    lastActive: new Date().toISOString(),
  },
];

class ProgressStore {
  private profilesKey = 'pixel_learning_profiles';
  private activeChildKey = 'pixel_learning_active_child';
  private attemptsKey = 'pixel_learning_attempts';
  private listeners: (() => void)[] = [];

  constructor() {
    this.ensureInitialized();
  }

  private ensureInitialized() {
    if (typeof window === 'undefined') return;
    if (!localStorage.getItem(this.profilesKey)) {
      localStorage.setItem(this.profilesKey, JSON.stringify(defaultProfiles));
    }
    if (!localStorage.getItem(this.activeChildKey)) {
      localStorage.setItem(this.activeChildKey, defaultProfiles[0].id);
    }
    if (!localStorage.getItem(this.attemptsKey)) {
      // Seed some initial attempts for realistic parent dashboard
      const initialAttempts: LessonAttempt[] = [
        {
          attemptId: 'att_001',
          childId: 'child_budi',
          lessonId: 'math-counting-001',
          levelId: 1,
          topic: 'counting',
          timestamp: new Date(Date.now() - 86400000 * 2).toISOString(),
          attemptsCount: 1,
          correct: true,
          hintUsed: false,
          remedialUsed: false,
          replayCount: 0,
          timeSpentSeconds: 95,
          score: 100,
          selectedAnswer: 'C',
        },
        {
          attemptId: 'att_002',
          childId: 'child_budi',
          lessonId: 'math-addition-001',
          levelId: 2,
          topic: 'addition',
          timestamp: new Date(Date.now() - 86400000).toISOString(),
          attemptsCount: 2,
          correct: true,
          hintUsed: true,
          remedialUsed: false,
          replayCount: 1,
          timeSpentSeconds: 140,
          score: 85,
          selectedAnswer: 'B',
        },
      ];
      localStorage.setItem(this.attemptsKey, JSON.stringify(initialAttempts));
    }
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach(l => l());
  }

  public getProfiles(): ChildProfile[] {
    if (typeof window === 'undefined') return defaultProfiles;
    try {
      const data = localStorage.getItem(this.profilesKey);
      return data ? JSON.parse(data) : defaultProfiles;
    } catch {
      return defaultProfiles;
    }
  }

  public getActiveChild(): ChildProfile {
    const profiles = this.getProfiles();
    if (typeof window === 'undefined') return profiles[0];
    const activeId = localStorage.getItem(this.activeChildKey);
    return profiles.find(p => p.id === activeId) || profiles[0];
  }

  public setActiveChild(childId: string) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.activeChildKey, childId);
    this.notify();
  }

  public createChildProfile(name: string, age: number, avatar: string): ChildProfile {
    const profiles = this.getProfiles();
    const newProfile: ChildProfile = {
      id: `child_${Date.now()}`,
      name,
      avatar,
      age,
      xp: 0,
      level: 1,
      stars: 0,
      completedLessons: [],
      badges: [],
      streakDays: 1,
      lastActive: new Date().toISOString(),
    };
    profiles.push(newProfile);
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.profilesKey, JSON.stringify(profiles));
      this.setActiveChild(newProfile.id);
    }
    this.notify();
    return newProfile;
  }

  public recordAttempt(attempt: Omit<LessonAttempt, 'attemptId' | 'timestamp'>): {
    xpEarned: number;
    newBadges: BadgeDef[];
    isLevelUp: boolean;
  } {
    if (typeof window === 'undefined') {
      return { xpEarned: 50, newBadges: [], isLevelUp: false };
    }

    const fullAttempt: LessonAttempt = {
      ...attempt,
      attemptId: `att_${Date.now()}`,
      timestamp: new Date().toISOString(),
    };

    // Save attempt
    const attempts = this.getAttempts();
    attempts.unshift(fullAttempt);
    localStorage.setItem(this.attemptsKey, JSON.stringify(attempts));

    // Calculate XP
    let xpEarned = 0;
    if (attempt.correct) {
      xpEarned += 50; // Lesson selesai
      xpEarned += 10; // Jawaban benar
      if (!attempt.hintUsed) xpEarned += 15; // Tanpa hint
      if (attempt.attemptsCount === 1) xpEarned += 25; // Perfect 1st attempt!
    } else {
      xpEarned += 10; // Effort reward
    }

    // Update Profile
    const profiles = this.getProfiles();
    const current = profiles.find(p => p.id === attempt.childId);
    let newBadges: BadgeDef[] = [];
    let isLevelUp = false;

    if (current) {
      const oldLevel = Math.floor(current.xp / 100) + 1;
      current.xp += xpEarned;
      const newLevel = Math.floor(current.xp / 100) + 1;
      if (newLevel > oldLevel) {
        isLevelUp = true;
      }
      current.level = newLevel;

      if (attempt.correct) {
        current.stars += 1;
        if (!current.completedLessons.includes(attempt.lessonId)) {
          current.completedLessons.push(attempt.lessonId);
        }
      }
      current.lastActive = new Date().toISOString();

      // Check badges
      for (const badge of availableBadges) {
        if (!current.badges.includes(badge.id)) {
          let earned = false;
          if (badge.requiredLessons && current.completedLessons.length >= badge.requiredLessons) {
            earned = true;
          }
          if (badge.id === 'problem_solver' && !attempt.hintUsed && attempt.correct) {
            earned = true;
          }
          if (badge.topicMastered && badge.topicMastered === attempt.topic && attempt.correct) {
            earned = true;
          }
          if (earned) {
            current.badges.push(badge.id);
            newBadges.push(badge);
          }
        }
      }

      localStorage.setItem(this.profilesKey, JSON.stringify(profiles));
    }

    this.notify();
    return { xpEarned, newBadges, isLevelUp };
  }

  public getAttempts(childId?: string): LessonAttempt[] {
    if (typeof window === 'undefined') return [];
    try {
      const raw = localStorage.getItem(this.attemptsKey);
      const all: LessonAttempt[] = raw ? JSON.parse(raw) : [];
      if (childId) {
        return all.filter(a => a.childId === childId);
      }
      return all;
    } catch {
      return [];
    }
  }

  public getMasteryScores(childId: string): MasteryScore[] {
    const attempts = this.getAttempts(childId);
    const topics: { topic: MathTopicType; title: string }[] = [
      { topic: 'counting', title: 'Mengenal & Menghitung Angka' },
      { topic: 'addition', title: 'Penjumlahan Bilangan' },
      { topic: 'subtraction', title: 'Pengurangan Kelereng & Benda' },
      { topic: 'comparison', title: 'Perbandingan Jumlah' },
      { topic: 'multiplication', title: 'Perkalian Dasar' },
      { topic: 'division', title: 'Pembagian Adil' },
    ];

    return topics.map(({ topic, title }) => {
      const topicAttempts = attempts.filter(a => a.topic === topic);
      const totalQuestions = topicAttempts.length;
      const correctCount = topicAttempts.filter(a => a.correct).length;

      let score = 0;
      if (totalQuestions > 0) {
        const accuracy = (correctCount / totalQuestions) * 100;
        // Factor in hints used: reduce score slightly if heavily reliant on hints
        const noHintCount = topicAttempts.filter(a => a.correct && !a.hintUsed).length;
        const hintFactor = totalQuestions > 0 ? (noHintCount / totalQuestions) * 20 : 0;
        score = Math.min(100, Math.round(accuracy * 0.8 + hintFactor));
      } else {
        score = 0;
      }

      let status: MasteryScore['status'] = 'needs_practice';
      if (score >= 90) status = 'mastered';
      else if (score >= 70) status = 'good';
      else if (score >= 40) status = 'developing';

      return {
        topic,
        title,
        score,
        status,
        totalQuestions,
        correctCount,
      };
    });
  }
}

export const progressStore = new ProgressStore();
