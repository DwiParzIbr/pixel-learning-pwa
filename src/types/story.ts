export type SubjectType = 'mathematics' | 'science' | 'language' | 'logic';

export type MathTopicType =
  | 'counting'
  | 'addition'
  | 'subtraction'
  | 'comparison'
  | 'multiplication'
  | 'division'
  | 'general';

export type CharacterEmotion =
  | 'idle'
  | 'walk'
  | 'talk'
  | 'happy'
  | 'celebrate'
  | 'sad'
  | 'surprised'
  | 'think';

export type EnvironmentType =
  | 'park'
  | 'forest'
  | 'classroom'
  | 'market'
  | 'castle';

export type ObjectType =
  | 'marble'
  | 'apple'
  | 'book'
  | 'coin'
  | 'star'
  | 'cake';

export interface CharacterDef {
  id: string;
  name: string;
  asset: string; // e.g., 'character_budi', 'character_siti'
  color?: string;
  personality?: string;
  voiceProfile?: {
    voiceId?: string;
    pitch?: number;
    rate?: number;
  };
}

export type SceneActionType =
  | 'spawn_character'
  | 'move_character'
  | 'animate_character'
  | 'spawn_object'
  | 'transfer_object'
  | 'remove_object'
  | 'highlight_object'
  | 'camera_pan'
  | 'dialogue'
  | 'wait';

export interface SceneAction {
  type: SceneActionType;
  characterId?: string;
  object?: ObjectType;
  owner?: string;
  from?: string;
  to?: string;
  quantity?: number;
  position?: { x: number; y: number };
  animation?: CharacterEmotion;
  duration?: number;
  dialogueText?: string;
  speaker?: string;
}

export interface SceneDef {
  id: string;
  title?: string;
  background: EnvironmentType;
  actions: SceneAction[];
  narration: string;
  dialogue?: {
    speaker: string;
    text: string;
  };
  audio?: string;
  duration?: number; // duration in seconds
}

export interface QuestionOption {
  id: string; // 'A' | 'B' | 'C' | 'D'
  value: string | number;
  label?: string;
}

export interface StoryQuestion {
  type: 'multiple_choice' | 'object_counting' | 'comparison';
  question: string;
  options: QuestionOption[];
  correctAnswer: string; // e.g. 'C' or option id
  explanation: string;
  hint: string;
  visualHint?: {
    formula?: string;
    initialCount?: number;
    transferCount?: number;
    remainingCount?: number;
    itemType?: ObjectType;
  };
}

export interface RemedialStory {
  title: string;
  narration: string;
  scenes: SceneDef[];
  question: StoryQuestion;
}

export interface LessonMetadata {
  ageGroup: string; // e.g. '6-8'
  grade: string; // e.g. 'SD Kelas 1'
  theme: string;
  mathFormula?: {
    operandA: number;
    operator: '+' | '-' | '*' | '/' | '>' | '<' | '=';
    operandB: number;
    result: number;
  };
}

export interface StoryLesson {
  lessonId: string;
  levelId: number;
  title: string;
  subject: SubjectType;
  topic: MathTopicType;
  difficulty: 1 | 2 | 3 | 4 | 5;
  metadata?: LessonMetadata;
  learningObjective: string[];
  characters: CharacterDef[];
  scenes: SceneDef[];
  question: StoryQuestion;
  remedialStory?: RemedialStory;
  summary?: string;
  rewardXp?: number;
}

export interface LevelDef {
  id: number;
  title: string;
  subtitle: string;
  topic: MathTopicType;
  environment: EnvironmentType;
  icon: string;
  requiredXp: number;
  description: string;
  lessons: StoryLesson[];
}

export interface ChildProfile {
  id: string;
  name: string;
  avatar: string;
  age: number;
  xp: number;
  level: number;
  stars: number;
  completedLessons: string[];
  badges: string[];
  streakDays: number;
  lastActive: string;
}

export interface BadgeDef {
  id: string;
  title: string;
  description: string;
  icon: string;
  requiredXp?: number;
  requiredLessons?: number;
  topicMastered?: MathTopicType;
}

export interface LessonAttempt {
  attemptId: string;
  childId: string;
  lessonId: string;
  levelId: number;
  topic: MathTopicType;
  timestamp: string;
  attemptsCount: number;
  correct: boolean;
  hintUsed: boolean;
  remedialUsed: boolean;
  replayCount: number;
  timeSpentSeconds: number;
  score: number;
  selectedAnswer: string;
}

export interface MasteryScore {
  topic: MathTopicType;
  title: string;
  score: number; // 0 - 100
  status: 'needs_practice' | 'developing' | 'good' | 'mastered';
  totalQuestions: number;
  correctCount: number;
}
