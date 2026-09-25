'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { StoryLesson, SubjectType, MathTopicType, LevelDef, SubjectDef } from '@/types/story';
import { canonicalSubtractionLesson, mockSubjects } from '@/data/mockLessons';
import { validateLesson, ValidationResult } from '@/lib/validation/mathValidator';
import { PixelCanvas } from '@/components/story-engine/PixelCanvas';
import { soundEngine } from '@/lib/audio/soundEngine';
import {
  INDONESIAN_NARRATOR_PERSONAS,
  ENGLISH_NARRATOR_PERSONAS,
  INDONESIAN_CHARACTER_VOICES,
  ENGLISH_CHARACTER_VOICES,
  voiceEngine,
} from '@/lib/audio/voiceEngine';
import {
  generateSubjectLesson,
  PRESET_TEMPLATES,
  PresetTemplate,
} from '@/lib/ai/lessonGenerator';
import {
  Sparkles,
  CheckCircle,
  AlertTriangle,
  Code,
  Eye,
  ArrowLeft,
  FileCheck,
  BarChart3,
  BookOpen,
  Globe,
  Volume2,
  VolumeX,
  GraduationCap,
  Heart,
  FlaskConical,
  Languages,
  Puzzle,
  Play,
  Pause,
  Copy,
  Download,
  RotateCcw,
  Search,
  Filter,
  Music,
} from 'lucide-react';

interface AdminContentStudioProps {
  onBackToApp: () => void;
  onPublishLesson?: (lesson: StoryLesson) => void;
}

// Topic labels mapping for each subject
const TOPIC_OPTIONS: Record<SubjectType, { value: MathTopicType; label: string }[]> = {
  mathematics: [
    { value: 'counting', label: '🔢 Mengenal & Menghitung Angka' },
    { value: 'addition', label: '➕ Penjumlahan (Addition)' },
    { value: 'subtraction', label: '➖ Pengurangan (Subtraction)' },
    { value: 'comparison', label: '⚖️ Perbandingan (Lebih Besar/Kecil)' },
    { value: 'multiplication', label: '✖️ Perkalian Dasar' },
    { value: 'division', label: '➗ Pembagian Dasar' },
    { value: 'general', label: '🏰 Petualangan Pamungkas' },
  ],
  science: [
    { value: 'science_animals', label: '🐾 Dunia Hewan & Habitat' },
    { value: 'science_plants', label: '🌱 Tumbuhan & Fotosintesis' },
    { value: 'science_weather', label: '🌈 Cuaca & Fenomena Alam' },
    { value: 'science_space', label: '🚀 Tata Surya & Luar Angkasa' },
    { value: 'science_nature', label: '🔬 Panca Indera & Eksplorasi' },
  ],
  language: [
    { value: 'language_letters', label: '🔤 Mengenal Huruf Vokal & Alfabet' },
    { value: 'language_spelling', label: '📝 Mengeja & Membaca Suku Kata' },
    { value: 'language_antonyms', label: '🔄 Lawan Kata (Antonim)' },
    { value: 'language_comprehension', label: '📖 Sinonim & Dongeng Indah' },
  ],
  character: [
    { value: 'character_politeness', label: '🤝 Sopan Santun & Tiga Kata Ajaib' },
    { value: 'character_sharing', label: '🎁 Berbagi & Rasa Empati' },
    { value: 'character_cleanliness', label: '🗑️ Peduli Lingkungan & Kebersihan' },
    { value: 'character_healthy', label: '🧼 Kebiasaan Hidup Sehat' },
    { value: 'character_honesty', label: '⭐ Kejujuran & Tanggung Jawab' },
    { value: 'character_tolerance', label: '🌈 Toleransi & Menghargai' },
    { value: 'character_leadership', label: '👑 Ksatria Kebaikan & Teladan' },
  ],
  logic: [
    { value: 'logic_patterns', label: '🔴 Pola & Urutan Berulang' },
    { value: 'logic_shapes', label: '⭕ Bentuk Geometri & Klasifikasi' },
    { value: 'logic_sorting', label: '📏 Urutan Ukuran & Berat' },
    { value: 'logic_cause_effect', label: '💡 Sebab & Akibat' },
    { value: 'logic_spatial', label: '🧭 Navigasi Spasial & Arah' },
    { value: 'logic_riddles', label: '👑 Teka-Teki Cerdik' },
  ],
};

const SUBJECT_ICONS: Record<SubjectType, React.ReactNode> = {
  mathematics: <GraduationCap className="w-4 h-4" />,
  science: <FlaskConical className="w-4 h-4" />,
  language: <Languages className="w-4 h-4" />,
  character: <Heart className="w-4 h-4" />,
  logic: <Puzzle className="w-4 h-4" />,
};

const SUBJECT_COLORS: Record<SubjectType, { bg: string; text: string; border: string; ring: string; badge: string }> = {
  mathematics: { bg: 'bg-amber-50', text: 'text-amber-900', border: 'border-amber-300', ring: 'ring-amber-200', badge: 'bg-amber-100 text-amber-900 border-amber-300' },
  science: { bg: 'bg-emerald-50', text: 'text-emerald-900', border: 'border-emerald-300', ring: 'ring-emerald-200', badge: 'bg-emerald-100 text-emerald-900 border-emerald-300' },
  language: { bg: 'bg-sky-50', text: 'text-sky-900', border: 'border-sky-300', ring: 'ring-sky-200', badge: 'bg-sky-100 text-sky-900 border-sky-300' },
  character: { bg: 'bg-rose-50', text: 'text-rose-900', border: 'border-rose-300', ring: 'ring-rose-200', badge: 'bg-rose-100 text-rose-900 border-rose-300' },
  logic: { bg: 'bg-violet-50', text: 'text-violet-900', border: 'border-violet-300', ring: 'ring-violet-200', badge: 'bg-violet-100 text-violet-900 border-violet-300' },
};

export const AdminContentStudio: React.FC<AdminContentStudioProps> = ({
  onBackToApp,
  onPublishLesson,
}) => {
  // Navigation
  const [activeTab, setActiveTab] = useState<'dashboard' | 'curriculum' | 'generator' | 'editor' | 'preview'>('dashboard');

  // Generator State
  const [subject, setSubject] = useState<SubjectType>('mathematics');
  const [topic, setTopic] = useState<MathTopicType>('subtraction');
  const [ageGroup, setAgeGroup] = useState<string>('6-8');
  const [grade, setGrade] = useState<string>('SD Kelas 1');
  const [difficulty, setDifficulty] = useState<number>(1);
  const [theme, setTheme] = useState<string>('Taman Kelereng Ceria');
  const [learningObjective, setLearningObjective] = useState<string>(
    'Anak memahami konsep pengurangan sederhana melalui berbagi kelereng dengan sahabat.'
  );
  const [mathOpA, setMathOpA] = useState<number>(10);
  const [mathOperator, setMathOperator] = useState<'+' | '-' | '*' | '/'>('-');
  const [mathOpB, setMathOpB] = useState<number>(4);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  // Lesson State & Editor
  const [currentLesson, setCurrentLesson] = useState<StoryLesson>(canonicalSubtractionLesson);
  const [jsonText, setJsonText] = useState<string>(JSON.stringify(canonicalSubtractionLesson, null, 2));
  const [jsonParseError, setJsonParseError] = useState<string | null>(null);
  const [validationReport, setValidationReport] = useState<ValidationResult>(
    validateLesson(canonicalSubtractionLesson)
  );

  // Preview State
  const [previewSceneIdx, setPreviewSceneIdx] = useState<number>(0);
  const [isPreviewingRemedial, setIsPreviewingRemedial] = useState<boolean>(false);
  const [isPreviewPaused, setIsPreviewPaused] = useState<boolean>(false);
  const [previewVoiceLang, setPreviewVoiceLang] = useState<'id' | 'en'>('id');
  const [isPlayingSceneAudio, setIsPlayingSceneAudio] = useState<boolean>(false);

  // Toast / Feedback
  const [publishSuccess, setPublishSuccess] = useState<boolean>(false);
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);

  // Voice Tester in Dashboard
  const [voiceTesterLang, setVoiceTesterLang] = useState<'id' | 'en'>('id');
  const [activeVoicePlayingId, setActiveVoicePlayingId] = useState<string | null>(null);
  const [isBgmActive, setIsBgmActive] = useState<boolean>(false);

  // Curriculum Browser Filter State
  const [curriculumSubjectFilter, setCurriculumSubjectFilter] = useState<SubjectType | 'all'>('all');
  const [curriculumLevelFilter, setCurriculumLevelFilter] = useState<number | 'all'>('all');
  const [curriculumSearchQuery, setCurriculumSearchQuery] = useState<string>('');

  // Pre-compiled list of all 175 lessons
  const allCurriculumLessons = useMemo(() => {
    const list: { subjectDef: SubjectDef; levelDef: LevelDef; lesson: StoryLesson }[] = [];
    mockSubjects.forEach(s => {
      s.levels.forEach(lvl => {
        lvl.lessons.forEach(l => {
          list.push({ subjectDef: s, levelDef: lvl, lesson: l });
        });
      });
    });
    return list;
  }, []);

  // Filtered curriculum lessons
  const filteredCurriculumLessons = useMemo(() => {
    return allCurriculumLessons.filter(item => {
      if (curriculumSubjectFilter !== 'all' && item.subjectDef.id !== curriculumSubjectFilter) {
        return false;
      }
      if (curriculumLevelFilter !== 'all' && item.levelDef.id !== curriculumLevelFilter) {
        return false;
      }
      if (curriculumSearchQuery.trim()) {
        const query = curriculumSearchQuery.toLowerCase();
        const matchesTitle = item.lesson.title.toLowerCase().includes(query);
        const matchesId = item.lesson.lessonId.toLowerCase().includes(query);
        const matchesTopic = item.lesson.topic.toLowerCase().includes(query);
        const matchesNarration = item.lesson.scenes.some(s => s.narration?.toLowerCase().includes(query));
        return matchesTitle || matchesId || matchesTopic || matchesNarration;
      }
      return true;
    });
  }, [allCurriculumLessons, curriculumSubjectFilter, curriculumLevelFilter, curriculumSearchQuery]);

  // Curriculum statistics
  const curriculumStats = useMemo(() => {
    return mockSubjects.map(s => {
      const totalLessons = s.levels.reduce((sum, lvl) => sum + lvl.lessons.length, 0);
      return {
        id: s.id,
        title: s.title,
        icon: s.icon,
        badge: s.badge,
        themeColor: s.themeColor,
        levelsCount: s.levels.length,
        lessonsCount: totalLessons,
        levels: s.levels.map(lvl => ({
          id: lvl.id,
          title: lvl.title,
          lessonsCount: lvl.lessons.length,
          icon: lvl.icon,
        })),
      };
    });
  }, []);

  const totalLessonsAllSubjects = curriculumStats.reduce((sum, s) => sum + s.lessonsCount, 0);
  const totalLevelsAllSubjects = curriculumStats.reduce((sum, s) => sum + s.levelsCount, 0);

  // Sync topic dropdown when subject changes
  const handleSubjectChange = (newSubject: SubjectType) => {
    setSubject(newSubject);
    const opts = TOPIC_OPTIONS[newSubject];
    if (opts && opts.length > 0) {
      setTopic(opts[0].value);
    }
  };

  // Apply a preset template
  const handleApplyPreset = (preset: PresetTemplate) => {
    soundEngine.playSfx('click');
    setSubject(preset.subject);
    setTopic(preset.topic);
    setTheme(preset.theme);
    setLearningObjective(preset.learningObjective);
    if (preset.mathOpA !== undefined) setMathOpA(preset.mathOpA);
    if (preset.mathOperator !== undefined) setMathOperator(preset.mathOperator);
    if (preset.mathOpB !== undefined) setMathOpB(preset.mathOpB);
  };

  // Generate lesson via multi-subject generator engine
  const handleGenerateLesson = () => {
    setIsGenerating(true);
    soundEngine.playSfx('click');

    setTimeout(() => {
      const newLesson = generateSubjectLesson({
        subject,
        topic,
        ageGroup,
        grade,
        difficulty,
        theme,
        learningObjective,
        mathOpA,
        mathOperator,
        mathOpB,
      });

      loadLessonIntoStudio(newLesson);
      setIsGenerating(false);
      soundEngine.playSfx('celebrate');
    }, 700);
  };

  // Load a lesson into Studio
  const loadLessonIntoStudio = (lesson: StoryLesson, targetTab?: 'editor' | 'preview') => {
    setCurrentLesson(lesson);
    setJsonText(JSON.stringify(lesson, null, 2));
    setJsonParseError(null);
    const report = validateLesson(lesson);
    setValidationReport(report);
    setPreviewSceneIdx(0);
    setIsPreviewingRemedial(false);
    if (targetTab) {
      setActiveTab(targetTab);
    }
  };

  // Handle JSON Textarea Changes
  const handleJsonChange = (text: string) => {
    setJsonText(text);
    try {
      const parsed = JSON.parse(text) as StoryLesson;
      setCurrentLesson(parsed);
      setJsonParseError(null);
      const report = validateLesson(parsed);
      setValidationReport(report);
    } catch (e: any) {
      setJsonParseError(e.message);
    }
  };

  // Format JSON
  const handleFormatJson = () => {
    try {
      const parsed = JSON.parse(jsonText);
      const formatted = JSON.stringify(parsed, null, 2);
      setJsonText(formatted);
      soundEngine.playSfx('ding');
    } catch (e: any) {
      alert('Format gagal: JSON belum valid!');
    }
  };

  // Copy JSON
  const handleCopyJson = (textToCopy?: string) => {
    const text = textToCopy || jsonText;
    navigator.clipboard.writeText(text).then(() => {
      soundEngine.playSfx('ding');
      setCopyFeedback('JSON berhasil disalin ke clipboard!');
      setTimeout(() => setCopyFeedback(null), 2500);
    });
  };

  // Download JSON
  const handleDownloadJson = () => {
    try {
      const blob = new Blob([jsonText], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${currentLesson.lessonId || 'story-lesson'}.json`;
      a.click();
      URL.revokeObjectURL(url);
      soundEngine.playSfx('celebrate');
    } catch (e) {
      alert('Gagal mendownload file JSON.');
    }
  };

  // Reset to default canonical lesson
  const handleResetToDefault = () => {
    if (confirm('Kembalikan ke contoh pelajaran pengurangan kelereng default?')) {
      loadLessonIntoStudio(canonicalSubtractionLesson);
      soundEngine.playSfx('click');
    }
  };

  // Handle Publish
  const handlePublish = () => {
    if (!validationReport.isValid) {
      alert('Lesson tidak dapat dipublish karena masih memiliki error validasi!');
      return;
    }
    soundEngine.playSfx('celebrate');
    onPublishLesson?.(currentLesson);
    setPublishSuccess(true);
    setTimeout(() => setPublishSuccess(false), 3000);
  };

  // Dynamic Chalkboard Text for PixelCanvas Live Preview
  const previewBoardText = useMemo(() => {
    if (currentLesson.metadata?.mathFormula) {
      const f = currentLesson.metadata.mathFormula;
      return `${f.operandA} ${f.operator} ${f.operandB} = ?`;
    }
    if (currentLesson.subject === 'mathematics') return '1 2 3 4 5';
    if (currentLesson.subject === 'language') return 'A B C D E';
    if (currentLesson.subject === 'science') return '🔬 Sains Cilik 🌿';
    if (currentLesson.subject === 'character') return '🌟 Budi Pekerti 💖';
    if (currentLesson.subject === 'logic') return '🧩 Teka-Teki 💡';
    return currentLesson.title;
  }, [currentLesson]);

  // Active scenes in preview (Main vs Remedial)
  const previewScenes = useMemo(() => {
    if (isPreviewingRemedial && currentLesson.remedialStory?.scenes) {
      return currentLesson.remedialStory.scenes;
    }
    return currentLesson.scenes;
  }, [isPreviewingRemedial, currentLesson]);

  // Read preview scene narration aloud
  const handlePlaySceneAudio = () => {
    const scene = previewScenes[previewSceneIdx];
    if (!scene?.narration) return;

    if (isPlayingSceneAudio) {
      voiceEngine.stop();
      setIsPlayingSceneAudio(false);
      return;
    }

    setIsPlayingSceneAudio(true);
    voiceEngine.speak(scene.narration, {
      speaker: 'narrator',
      lang: previewVoiceLang,
      onEnd: () => {
        setIsPlayingSceneAudio(false);
        if (scene.dialogue?.text) {
          voiceEngine.speak(scene.dialogue.text, {
            speaker: scene.dialogue.speaker || 'budi',
            lang: previewVoiceLang,
            onEnd: () => setIsPlayingSceneAudio(false),
          });
        }
      },
    });
  };

  // Voice tester play/stop in Dashboard
  const handleTestVoicePersona = (
    persona: { id: string; name: string; sampleText: string; lang: 'id' | 'en'; pitch?: number; rate?: number },
    isCharacter = false
  ) => {
    soundEngine.playSfx('click');
    if (activeVoicePlayingId === persona.id) {
      voiceEngine.stop();
      setActiveVoicePlayingId(null);
      return;
    }

    setActiveVoicePlayingId(persona.id);
    voiceEngine.speak(persona.sampleText, {
      speaker: isCharacter ? persona.id : 'narrator',
      lang: persona.lang,
      pitch: persona.pitch,
      rate: persona.rate,
      onEnd: () => setActiveVoicePlayingId(null),
    });
  };

  // Toggle BGM
  const handleToggleBgm = () => {
    const isPlaying = soundEngine.toggleBgm();
    setIsBgmActive(isPlaying);
  };

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      voiceEngine.stop();
      soundEngine.stopBgm();
    };
  }, []);

  const tabItems = [
    { key: 'dashboard' as const, icon: <BarChart3 className="w-4 h-4" />, label: 'Dashboard & Suara' },
    { key: 'curriculum' as const, icon: <BookOpen className="w-4 h-4" />, label: `Jelajahi Soal (${totalLessonsAllSubjects})` },
    { key: 'generator' as const, icon: <Sparkles className="w-4 h-4" />, label: 'AI Generator' },
    { key: 'editor' as const, icon: <Code className="w-4 h-4" />, label: 'JSON & Validator' },
    { key: 'preview' as const, icon: <Eye className="w-4 h-4" />, label: 'Live Preview' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-fun pb-16">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-2 border-slate-200 px-4 py-3 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button
            onClick={onBackToApp}
            className="candy-btn candy-btn-yellow flex items-center gap-2 px-4 py-2 rounded-2xl font-black text-sm"
          >
            <ArrowLeft className="w-4 h-4 stroke-[3]" />
            <span className="hidden sm:inline">Kembali</span>
          </button>

          <div className="flex items-center gap-2 text-indigo-700 font-black text-xs sm:text-sm uppercase tracking-wide">
            <Sparkles className="w-5 h-5 text-amber-500 animate-spin-slow" />
            <span>Admin Content Studio</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleCopyJson()}
              className="px-3 py-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-xs flex items-center gap-1.5 transition-all"
              title="Salin JSON aktif"
            >
              <Copy className="w-4 h-4" />
              <span className="hidden md:inline">Salin JSON</span>
            </button>

            <button
              onClick={handlePublish}
              className="candy-btn candy-btn-green font-black px-4 py-2 rounded-2xl text-sm flex items-center gap-2 shadow"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Publish</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 pt-6 space-y-6">
        {/* Studio Navigation Tabs */}
        <div className="flex gap-1.5 sm:gap-2.5 border-b-2 border-slate-200 pb-3 overflow-x-auto">
          {tabItems.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-1.5 px-3 sm:px-5 py-2 sm:py-2.5 rounded-2xl text-xs sm:text-sm font-black transition-all whitespace-nowrap ${
                activeTab === tab.key
                  ? 'bg-indigo-600 text-white shadow-md border-b-4 border-indigo-800'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Feedback alerts */}
        {publishSuccess && (
          <div className="p-4 rounded-2xl bg-emerald-100 border-2 border-emerald-400 text-emerald-900 font-bold flex items-center gap-2 animate-pop-in">
            <CheckCircle className="w-6 h-6 text-emerald-600 shrink-0" />
            <span>Lesson berhasil dipublish dan langsung tersedia di peta petualangan anak!</span>
          </div>
        )}

        {copyFeedback && (
          <div className="p-3.5 rounded-2xl bg-sky-100 border-2 border-sky-400 text-sky-900 font-bold flex items-center gap-2 animate-pop-in text-sm">
            <CheckCircle className="w-5 h-5 text-sky-600 shrink-0" />
            <span>{copyFeedback}</span>
          </div>
        )}

        {/* ==================== TAB 0: CURRICULUM DASHBOARD & VOICE STUDIO ==================== */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Hero Stats Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-gradient-to-br from-indigo-500 to-violet-600 rounded-2xl p-4 text-white shadow-lg">
                <p className="text-[10px] uppercase font-black opacity-80 tracking-wide">Mata Pelajaran</p>
                <p className="text-3xl font-black mt-1">{mockSubjects.length}</p>
                <p className="text-xs opacity-70 font-bold mt-0.5">5 Subjek Aktif</p>
              </div>
              <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-4 text-white shadow-lg">
                <p className="text-[10px] uppercase font-black opacity-80 tracking-wide">Total Level</p>
                <p className="text-3xl font-black mt-1">{totalLevelsAllSubjects}</p>
                <p className="text-xs opacity-70 font-bold mt-0.5">35 Level Petualangan</p>
              </div>
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-4 text-white shadow-lg">
                <p className="text-[10px] uppercase font-black opacity-80 tracking-wide">Total Soal Cerita</p>
                <p className="text-3xl font-black mt-1">{totalLessonsAllSubjects}</p>
                <p className="text-xs opacity-70 font-bold mt-0.5">175 Lessons Interaktif</p>
              </div>
              <div className="bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl p-4 text-white shadow-lg">
                <p className="text-[10px] uppercase font-black opacity-80 tracking-wide">Dukungan Bahasa</p>
                <p className="text-3xl font-black mt-1">2</p>
                <p className="text-xs opacity-70 font-bold mt-0.5">🇮🇩 Indonesia & 🇬🇧 English</p>
              </div>
            </div>

            {/* Quick Actions Bar */}
            <div className="flex flex-wrap gap-2.5 items-center justify-between bg-white border-2 border-slate-200/80 rounded-2xl p-4 shadow-sm">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <span className="font-black text-sm text-slate-800">Aksi Cepat Admin:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveTab('curriculum')}
                  className="px-3.5 py-1.5 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-700 font-black text-xs hover:bg-indigo-100 flex items-center gap-1.5 transition-all"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Jelajahi 175 Soal</span>
                </button>
                <button
                  onClick={() => setActiveTab('generator')}
                  className="px-3.5 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 font-black text-xs hover:bg-amber-100 flex items-center gap-1.5 transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Buat Soal Baru</span>
                </button>
                <button
                  onClick={handleToggleBgm}
                  className={`px-3.5 py-1.5 rounded-xl font-black text-xs flex items-center gap-1.5 transition-all ${
                    isBgmActive
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <Music className="w-4 h-4" />
                  <span>{isBgmActive ? 'Matikan BGM' : 'Uji BGM 8-Bit'}</span>
                </button>
              </div>
            </div>

            {/* Feature Highlights */}
            <div className="bg-white border-2 border-slate-200/80 rounded-[2rem] p-6 shadow-sm">
              <h3 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                Fitur Unggulan Platform
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  { icon: '🗣️', title: 'Suara Dwibahasa', desc: 'Narasi & dialog dalam Bahasa Indonesia & English dengan 8 persona narator.' },
                  { icon: '🎭', title: 'Karakter Multi-Suara', desc: 'Suara unik untuk Budi, Siti, dan Robot Bibo pada cerita & animasi.' },
                  { icon: '🧠', title: '175 Soal Cerita Berbeda', desc: '5 mata pelajaran × 7 level × 5 soal unik per level dengan cerita bertahap.' },
                  { icon: '🎮', title: 'Pixel Art Canvas & BGM', desc: 'Visual 8-bit responsif, papan tulis interaktif, musik petualangan chiptune.' },
                  { icon: '⭐', title: 'Sistem XP & Bintang', desc: 'Pelacakan progres anak dengan experience points, bintang, dan level unlock.' },
                  { icon: '📱', title: 'PWA Offline-Ready', desc: 'Dapat diinstall di smartphone, tablet, atau desktop tanpa koneksi internet.' },
                ].map((feat, i) => (
                  <div key={i} className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                    <span className="text-2xl shrink-0">{feat.icon}</span>
                    <div>
                      <p className="font-black text-sm text-slate-900">{feat.title}</p>
                      <p className="text-xs text-slate-500 font-bold mt-0.5 leading-snug">{feat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Voice Studio Tester */}
            <div className="bg-white border-2 border-slate-200/80 rounded-[2rem] p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <Volume2 className="w-5 h-5 text-indigo-600" />
                  <h3 className="text-lg font-black text-slate-900">Studio Uji Suara (Voice Engine)</h3>
                </div>

                {/* Voice lang switch */}
                <div className="flex bg-slate-100 p-1 rounded-xl">
                  <button
                    onClick={() => setVoiceTesterLang('id')}
                    className={`px-3 py-1 rounded-lg text-xs font-black transition-all ${
                      voiceTesterLang === 'id' ? 'bg-white shadow text-slate-900' : 'text-slate-500'
                    }`}
                  >
                    🇮🇩 Bahasa Indonesia
                  </button>
                  <button
                    onClick={() => setVoiceTesterLang('en')}
                    className={`px-3 py-1 rounded-lg text-xs font-black transition-all ${
                      voiceTesterLang === 'en' ? 'bg-white shadow text-slate-900' : 'text-slate-500'
                    }`}
                  >
                    🇬🇧 English
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Narrator voices */}
                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200">
                  <h4 className="font-black text-sm text-amber-900 mb-3 flex items-center gap-2">
                    <Globe className="w-4 h-4 text-amber-700" />
                    <span>Persona Narator ({voiceTesterLang === 'id' ? 'Bahasa Indonesia' : 'English'})</span>
                  </h4>
                  <div className="space-y-2.5">
                    {(voiceTesterLang === 'id' ? INDONESIAN_NARRATOR_PERSONAS : ENGLISH_NARRATOR_PERSONAS).map(p => (
                      <div
                        key={p.id}
                        className="bg-white p-3 rounded-xl border border-amber-200 flex items-center justify-between gap-3 shadow-xs"
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span>{p.icon}</span>
                            <span className="font-black text-xs text-slate-900">{p.name}</span>
                            <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-bold">
                              {p.role}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 italic mt-1 line-clamp-1">"{p.sampleText}"</p>
                        </div>

                        <button
                          onClick={() => handleTestVoicePersona(p, false)}
                          className={`shrink-0 px-3 py-1.5 rounded-xl font-black text-xs flex items-center gap-1 transition-all ${
                            activeVoicePlayingId === p.id
                              ? 'bg-rose-500 text-white animate-pulse'
                              : 'bg-amber-500 hover:bg-amber-600 text-white shadow'
                          }`}
                        >
                          {activeVoicePlayingId === p.id ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                          <span>{activeVoicePlayingId === p.id ? 'Stop' : 'Uji'}</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Character voices */}
                <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-200">
                  <h4 className="font-black text-sm text-sky-900 mb-3 flex items-center gap-2">
                    <span>🎭</span>
                    <span>Suara Karakter Animasi ({voiceTesterLang === 'id' ? 'Bahasa Indonesia' : 'English'})</span>
                  </h4>
                  <div className="space-y-2.5">
                    {(voiceTesterLang === 'id' ? INDONESIAN_CHARACTER_VOICES : ENGLISH_CHARACTER_VOICES).map(c => (
                      <div
                        key={c.id}
                        className="bg-white p-3 rounded-xl border border-sky-200 flex items-center justify-between gap-3 shadow-xs"
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span>{c.icon}</span>
                            <span className="font-black text-xs text-slate-900">{c.name}</span>
                            <span className="text-[10px] bg-sky-100 text-sky-800 px-1.5 py-0.5 rounded font-bold">
                              {c.role}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 italic mt-1 line-clamp-1">"{c.sampleText}"</p>
                        </div>

                        <button
                          onClick={() => handleTestVoicePersona(c, true)}
                          className={`shrink-0 px-3 py-1.5 rounded-xl font-black text-xs flex items-center gap-1 transition-all ${
                            activeVoicePlayingId === c.id
                              ? 'bg-rose-500 text-white animate-pulse'
                              : 'bg-sky-600 hover:bg-sky-700 text-white shadow'
                          }`}
                        >
                          {activeVoicePlayingId === c.id ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                          <span>{activeVoicePlayingId === c.id ? 'Stop' : 'Uji'}</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Per-Subject Breakdown */}
            <div className="space-y-4">
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-600" />
                Rincian Kurikulum Per Mata Pelajaran
              </h3>

              {curriculumStats.map(stat => {
                const colors = SUBJECT_COLORS[stat.id as SubjectType];
                return (
                  <div key={stat.id} className={`bg-white border-2 ${colors.border} rounded-[2rem] p-5 shadow-sm`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{stat.icon}</span>
                        <div>
                          <h4 className="font-black text-base text-slate-900">{stat.title}</h4>
                          <p className="text-xs text-slate-500 font-bold">{stat.badge}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 text-center">
                        <button
                          onClick={() => {
                            setCurriculumSubjectFilter(stat.id as SubjectType);
                            setActiveTab('curriculum');
                          }}
                          className={`px-3 py-1.5 rounded-xl ${colors.bg} ${colors.text} hover:opacity-80 transition-all font-black text-xs flex items-center gap-1`}
                        >
                          <span>Lihat {stat.lessonsCount} Soal</span>
                          <span>→</span>
                        </button>
                      </div>
                    </div>

                    {/* Level pills */}
                    <div className="flex flex-wrap gap-2">
                      {stat.levels.map(lvl => (
                        <div
                          key={lvl.id}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl ${colors.bg} border ${colors.border} text-xs font-bold`}
                        >
                          <span>{lvl.icon}</span>
                          <span className={colors.text}>{lvl.title.replace(/^Level \d+ — /, '')}</span>
                          <span className="bg-white/80 px-1.5 py-0.5 rounded-md text-[10px] font-black">{lvl.lessonsCount} soal</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ==================== TAB 1: CURRICULUM EXPLORER & BROWSER ==================== */}
        {activeTab === 'curriculum' && (
          <div className="space-y-6">
            {/* Filter and Search Bar */}
            <div className="bg-white border-2 border-slate-200/80 rounded-[2rem] p-5 sm:p-6 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-indigo-600" />
                    <span>Jelajahi 175 Soal Kurikulum</span>
                  </h3>
                  <p className="text-xs text-slate-500 font-bold mt-0.5">
                    Pilih pelajaran untuk di-inspect, diedit di schema editor, atau dipreview langsung di Pixel Canvas.
                  </p>
                </div>

                <span className="text-xs font-black bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-xl border border-indigo-200 self-start sm:self-auto">
                  Ditemukan: {filteredCurriculumLessons.length} Soal
                </span>
              </div>

              {/* Subject Filter Pills */}
              <div className="flex gap-2 overflow-x-auto pb-1">
                <button
                  onClick={() => setCurriculumSubjectFilter('all')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all whitespace-nowrap ${
                    curriculumSubjectFilter === 'all'
                      ? 'bg-slate-800 text-white shadow'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Semua Subjek (5)
                </button>
                {mockSubjects.map(s => {
                  const isActive = curriculumSubjectFilter === s.id;
                  const colors = SUBJECT_COLORS[s.id as SubjectType];
                  return (
                    <button
                      key={s.id}
                      onClick={() => setCurriculumSubjectFilter(s.id as SubjectType)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all whitespace-nowrap flex items-center gap-1.5 ${
                        isActive
                          ? `${colors.bg} ${colors.text} border-2 ${colors.border} shadow-sm`
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      <span>{s.icon}</span>
                      <span>{s.title.split(' ')[0]}</span>
                    </button>
                  );
                })}
              </div>

              {/* Level & Search Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2 relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Cari berdasarkan judul, topik, ID, atau teks cerita..."
                    value={curriculumSearchQuery}
                    onChange={e => setCurriculumSearchQuery(e.target.value)}
                    className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs font-bold text-slate-800 focus:border-indigo-400"
                  />
                </div>

                <div>
                  <select
                    value={curriculumLevelFilter}
                    onChange={e => setCurriculumLevelFilter(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                    className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:border-indigo-400"
                  >
                    <option value="all">Semua Level (Level 1 - 7)</option>
                    {[1, 2, 3, 4, 5, 6, 7].map(lvl => (
                      <option key={lvl} value={lvl}>Level {lvl}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Lesson Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCurriculumLessons.map(({ subjectDef, levelDef, lesson }) => {
                const colors = SUBJECT_COLORS[lesson.subject];
                const isCurrentActive = currentLesson.lessonId === lesson.lessonId;

                return (
                  <div
                    key={lesson.lessonId}
                    className={`bg-white border-2 ${
                      isCurrentActive ? 'border-indigo-500 shadow-md ring-2 ring-indigo-200' : 'border-slate-200/80'
                    } rounded-2xl p-4 flex flex-col justify-between transition-all hover:border-indigo-300`}
                  >
                    <div>
                      {/* Top badging */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className={`text-[10px] font-black px-2.5 py-1 rounded-lg border ${colors.badge} uppercase flex items-center gap-1`}>
                          <span>{subjectDef.icon}</span>
                          <span>Level {levelDef.id}</span>
                        </span>

                        <span className="text-[10px] font-black bg-amber-50 text-amber-800 px-2 py-0.5 rounded border border-amber-200">
                          {lesson.rewardXp} XP
                        </span>
                      </div>

                      {/* Title & Topic */}
                      <h4 className="font-black text-sm text-slate-900 line-clamp-1">{lesson.title}</h4>
                      <p className="text-[11px] text-slate-500 font-bold mt-0.5">ID: {lesson.lessonId}</p>

                      {/* First scene narration snippet */}
                      <div className="mt-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                        <span className="block text-[10px] font-black text-slate-500 uppercase mb-0.5">Adegan 1:</span>
                        <p className="text-slate-700 italic line-clamp-2">
                          "{lesson.scenes[0]?.narration || 'Cerita dimulai...'}"
                        </p>
                      </div>

                      {/* Question preview */}
                      <div className="mt-2 text-xs text-slate-600">
                        <span className="font-bold text-slate-800">Soal: </span>
                        <span className="line-clamp-1">{lesson.question?.question}</span>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-1.5">
                      <button
                        onClick={() => loadLessonIntoStudio(lesson, 'preview')}
                        className="px-2.5 py-1.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 font-black text-xs flex items-center gap-1 transition-all"
                        title="Lihat live canvas preview"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Preview</span>
                      </button>

                      <button
                        onClick={() => loadLessonIntoStudio(lesson, 'editor')}
                        className="px-2.5 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-black text-xs flex items-center gap-1 transition-all"
                        title="Buka kode JSON"
                      >
                        <Code className="w-3.5 h-3.5" />
                        <span>Edit JSON</span>
                      </button>

                      <button
                        onClick={() => handleCopyJson(JSON.stringify(lesson, null, 2))}
                        className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-black text-xs transition-all"
                        title="Salin JSON soal ini"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredCurriculumLessons.length === 0 && (
              <div className="bg-white p-8 rounded-2xl border-2 border-slate-200 text-center space-y-2">
                <p className="text-2xl">🔍</p>
                <p className="font-black text-slate-800">Tidak ada soal yang cocok dengan filter atau pencarian Anda.</p>
                <p className="text-xs text-slate-500 font-bold">Coba ubah kata kunci atau pilih "Semua Subjek".</p>
              </div>
            )}
          </div>
        )}

        {/* ==================== TAB 2: AI GENERATOR ==================== */}
        {activeTab === 'generator' && (
          <div className="space-y-6">
            {/* Quick Presets Bar */}
            <div className="bg-white border-2 border-slate-200/80 rounded-[2rem] p-5 shadow-sm space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <h4 className="font-black text-sm text-slate-900">Preset Template Cepat (1-Klik):</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {PRESET_TEMPLATES.map(preset => {
                  const colors = SUBJECT_COLORS[preset.subject];
                  return (
                    <button
                      key={preset.id}
                      onClick={() => handleApplyPreset(preset)}
                      className={`px-3 py-1.5 rounded-xl border text-xs font-black transition-all flex items-center gap-1.5 ${colors.bg} ${colors.border} ${colors.text} hover:scale-105`}
                      title={preset.description}
                    >
                      <span>{SUBJECT_ICONS[preset.subject]}</span>
                      <span>{preset.title}</span>
                      <span className="text-[10px] opacity-75 font-bold">({preset.badge})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white border-2 border-slate-200/80 rounded-[2rem] p-6 sm:p-8 shadow-sm space-y-4">
                <h3 className="text-2xl font-black text-slate-900 mb-2 flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-amber-500" />
                  <span>Parameter Pembuatan Pelajaran AI</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Subject selector */}
                  <div>
                    <label className="block text-xs font-black text-slate-600 uppercase mb-1.5">Mata Pelajaran</label>
                    <select
                      value={subject}
                      onChange={e => handleSubjectChange(e.target.value as SubjectType)}
                      className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl px-4 py-2.5 text-slate-900 font-bold focus:border-amber-400"
                    >
                      <option value="mathematics">🔢 Matematika & Berhitung</option>
                      <option value="science">🔬 Sains & Alam Cilik</option>
                      <option value="language">📖 Bahasa & Membaca</option>
                      <option value="character">💖 Budi Pekerti & Karakter</option>
                      <option value="logic">🧩 Logika & Asah Otak</option>
                    </select>
                  </div>

                  {/* Dynamic topic selector */}
                  <div>
                    <label className="block text-xs font-black text-slate-600 uppercase mb-1.5">Topik Pembelajaran</label>
                    <select
                      value={topic}
                      onChange={e => setTopic(e.target.value as MathTopicType)}
                      className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl px-4 py-2.5 text-slate-900 font-bold focus:border-amber-400"
                    >
                      {(TOPIC_OPTIONS[subject] || []).map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-600 uppercase mb-1.5">Rentang Usia</label>
                    <select
                      value={ageGroup}
                      onChange={e => setAgeGroup(e.target.value)}
                      className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl px-4 py-2.5 text-slate-900 font-bold focus:border-amber-400"
                    >
                      <option value="5-7">5 - 7 Tahun (TK-B / Kelas 1)</option>
                      <option value="6-8">6 - 8 Tahun (Kelas 1 - 2)</option>
                      <option value="7-9">7 - 9 Tahun (Kelas 2 - 3)</option>
                      <option value="7-10">7 - 10 Tahun (Kelas 2 - 4)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-600 uppercase mb-1.5">Tingkat Kesulitan</label>
                    <select
                      value={difficulty}
                      onChange={e => setDifficulty(Number(e.target.value))}
                      className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl px-4 py-2.5 text-slate-900 font-bold focus:border-amber-400"
                    >
                      <option value={1}>⭐ Level 1 — Mudah (Dasar)</option>
                      <option value={2}>⭐⭐ Level 2 — Sedang (Menengah)</option>
                      <option value={3}>⭐⭐⭐ Level 3 — Sulit (Mahir)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-600 uppercase mb-1.5">Tema Cerita</label>
                    <input
                      type="text"
                      value={theme}
                      onChange={e => setTheme(e.target.value)}
                      className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl px-4 py-2.5 text-slate-900 font-bold focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-600 uppercase mb-1.5">Bahasa Suara Default</label>
                    <select
                      className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl px-4 py-2.5 text-slate-900 font-bold focus:border-amber-400"
                      value={previewVoiceLang}
                      onChange={e => setPreviewVoiceLang(e.target.value as any)}
                    >
                      <option value="id">🇮🇩 Bahasa Indonesia</option>
                      <option value="en">🇬🇧 English</option>
                    </select>
                  </div>
                </div>

                {/* Math Formula Settings — only for math subject */}
                {subject === 'mathematics' && (
                  <div className="bg-amber-50/80 p-5 rounded-2xl border-2 border-amber-200">
                    <span className="block text-xs font-black text-amber-900 uppercase mb-2">
                      Target Soal Matematika Deterministik
                    </span>
                    <div className="flex items-center gap-3 flex-wrap">
                      <input
                        type="number"
                        value={mathOpA}
                        onChange={e => setMathOpA(Number(e.target.value))}
                        className="w-20 bg-white border-2 border-amber-300 rounded-xl px-3 py-2 text-center text-slate-900 font-black text-lg"
                      />
                      <select
                        value={mathOperator}
                        onChange={e => setMathOperator(e.target.value as any)}
                        className="bg-white border-2 border-amber-300 rounded-xl px-3 py-2 text-center text-amber-900 font-black text-lg"
                      >
                        <option value="-">-</option>
                        <option value="+">+</option>
                        <option value="*">×</option>
                        <option value="/">÷</option>
                      </select>
                      <input
                        type="number"
                        value={mathOpB}
                        onChange={e => setMathOpB(Number(e.target.value))}
                        className="w-20 bg-white border-2 border-amber-300 rounded-xl px-3 py-2 text-center text-slate-900 font-black text-lg"
                      />
                      <span className="font-black text-slate-500 text-lg">=</span>
                      <span className="text-emerald-700 text-xl font-black px-4 py-1.5 bg-white rounded-xl border-2 border-emerald-400 shadow-sm">
                        {mathOperator === '+' ? mathOpA + mathOpB : mathOperator === '-' ? Math.max(0, mathOpA - mathOpB) : mathOperator === '*' ? mathOpA * mathOpB : Math.floor(mathOpA / (mathOpB || 1))}
                      </span>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-black text-slate-600 uppercase mb-1.5">Tujuan Pembelajaran</label>
                  <textarea
                    value={learningObjective}
                    onChange={e => setLearningObjective(e.target.value)}
                    rows={2}
                    className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl px-4 py-2.5 text-slate-900 font-bold focus:border-amber-400"
                  />
                </div>

                <button
                  onClick={handleGenerateLesson}
                  disabled={isGenerating}
                  className="candy-btn candy-btn-yellow w-full py-4 rounded-2xl font-black flex items-center justify-center gap-2 text-lg"
                >
                  <Sparkles className="w-6 h-6" />
                  <span>{isGenerating ? 'AI Sedang Merancang Cerita & Soal...' : 'Generate Cerita Interaktif dengan AI'}</span>
                </button>
              </div>

              {/* Summary Card */}
              <div className="bg-white border-2 border-slate-200/80 rounded-[2rem] p-6 sm:p-8 shadow-sm flex flex-col justify-between">
                <div>
                  <span className="text-xs font-black text-amber-700 bg-amber-100 px-3 py-1 rounded-full uppercase">
                    Pelajaran Aktif di Studio
                  </span>
                  <h4 className="text-xl font-black text-slate-900 mt-3">{currentLesson.title}</h4>
                  <p className="text-xs text-slate-500 font-bold mt-1">ID: {currentLesson.lessonId}</p>

                  <div className="mt-5 space-y-2.5 text-sm">
                    <div className="flex justify-between border-b border-slate-100 pb-2">
                      <span className="text-slate-500 font-bold">Mata Pelajaran:</span>
                      <span className="font-black text-slate-900 capitalize flex items-center gap-1">
                        {SUBJECT_ICONS[currentLesson.subject]}
                        <span>{currentLesson.subject}</span>
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 pb-2">
                      <span className="text-slate-500 font-bold">Total Adegan:</span>
                      <span className="font-black text-slate-900">{currentLesson.scenes.length} Scene</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 pb-2">
                      <span className="text-slate-500 font-bold">Karakter Terlibat:</span>
                      <span className="font-black text-slate-900">{currentLesson.characters.map(c => c.name).join(', ')}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 pb-2">
                      <span className="text-slate-500 font-bold">Kunci Jawaban:</span>
                      <span className="font-black text-emerald-600">{currentLesson.question.correctAnswer}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 pb-2">
                      <span className="text-slate-500 font-bold">Remedial Story:</span>
                      <span className="font-black text-indigo-600">{currentLesson.remedialStory ? 'Tersedia ✅' : 'Tidak ada'}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 pb-2">
                      <span className="text-slate-500 font-bold">Reward XP:</span>
                      <span className="font-black text-amber-600">{currentLesson.rewardXp} XP</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t-2 border-slate-100 flex flex-col gap-2">
                  <button
                    onClick={() => setActiveTab('preview')}
                    className="candy-btn candy-btn-blue w-full py-3 rounded-2xl font-black flex items-center justify-center gap-2 text-sm"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Preview Animasi Scene</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('editor')}
                    className="w-full py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-xs flex items-center justify-center gap-2 transition-all"
                  >
                    <Code className="w-4 h-4" />
                    <span>Periksa Kode JSON</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 3: STORY JSON & VALIDATOR ==================== */}
        {activeTab === 'editor' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white border-2 border-slate-200/80 rounded-[2rem] p-6 shadow-sm flex flex-col">
              <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                <span className="font-black text-base text-slate-800 flex items-center gap-2">
                  <Code className="w-5 h-5 text-amber-500" />
                  <span>Story JSON Schema Editor</span>
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleFormatJson}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-xs transition-all"
                    title="Rapikan format spasi JSON"
                  >
                    Format JSON
                  </button>

                  <button
                    onClick={() => handleCopyJson()}
                    className="px-3 py-1.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 font-black text-xs flex items-center gap-1 transition-all"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Salin</span>
                  </button>

                  <button
                    onClick={handleDownloadJson}
                    className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-black text-xs flex items-center gap-1 transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Unduh</span>
                  </button>

                  <button
                    onClick={handleResetToDefault}
                    className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-black text-xs transition-all"
                    title="Reset ke contoh awal"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {jsonParseError && (
                <div className="mb-3 text-xs text-rose-700 bg-rose-50 border border-rose-300 font-bold px-3 py-2 rounded-xl flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>Syntax Error: {jsonParseError}</span>
                </div>
              )}

              <textarea
                value={jsonText}
                onChange={e => handleJsonChange(e.target.value)}
                rows={22}
                className="w-full bg-slate-900 text-emerald-300 font-mono text-xs rounded-2xl p-4 focus:outline-none focus:ring-4 focus:ring-amber-200 leading-relaxed resize-none shadow-inner"
              />
            </div>

            <div className="bg-white border-2 border-slate-200/80 rounded-[2rem] p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-black text-base text-slate-900 flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-indigo-600" />
                  <span>Validation Engine</span>
                </h4>
                <span
                  className={`text-xs px-3 py-1 rounded-full font-black ${
                    validationReport.isValid
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-rose-100 text-rose-800'
                  }`}
                >
                  Skor: {validationReport.score}/100
                </span>
              </div>

              <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                {validationReport.errors.map((err, i) => (
                  <div key={i} className="p-3.5 rounded-2xl bg-rose-50 border border-rose-300 text-rose-900 text-xs flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-rose-700 uppercase font-black text-[10px]">{err.category}</strong>
                      <span>{err.message}</span>
                    </div>
                  </div>
                ))}

                {validationReport.warnings.map((warn, i) => (
                  <div key={i} className="p-3.5 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 text-xs flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-amber-700 uppercase font-black text-[10px]">{warn.category}</strong>
                      <span>{warn.message}</span>
                    </div>
                  </div>
                ))}

                {validationReport.isValid && validationReport.errors.length === 0 && (
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>Semua validasi berhasil! Lesson siap dipublish untuk dimainkan anak.</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 4: LIVE SCENE PREVIEW ==================== */}
        {activeTab === 'preview' && (
          <div className="bg-white border-2 border-slate-200/80 rounded-[2rem] p-6 sm:p-8 shadow-sm flex flex-col items-center">
            {/* Header controls */}
            <div className="w-full flex items-center justify-between mb-4 flex-wrap gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-black text-xl text-slate-900">Live Pixel Scene Preview</h4>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-lg border ${SUBJECT_COLORS[currentLesson.subject].badge} uppercase`}>
                    {currentLesson.subject}
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-bold mt-0.5">
                  {isPreviewingRemedial ? 'Remedial' : 'Adegan'} {previewSceneIdx + 1}: {previewScenes[previewSceneIdx]?.title || 'Adegan Cerita'}
                </p>
              </div>

              {/* Controls bar */}
              <div className="flex items-center gap-2 flex-wrap">
                {/* Remedial toggle if available */}
                {currentLesson.remedialStory?.scenes && (
                  <button
                    onClick={() => {
                      setIsPreviewingRemedial(!isPreviewingRemedial);
                      setPreviewSceneIdx(0);
                    }}
                    className={`px-3 py-1.5 rounded-xl font-black text-xs transition-all ${
                      isPreviewingRemedial
                        ? 'bg-rose-500 text-white shadow'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {isPreviewingRemedial ? '← Kembali ke Cerita Utama' : 'Lihat Adegan Remedial'}
                  </button>
                )}

                {/* Language Switch */}
                <div className="flex bg-slate-100 p-0.5 rounded-xl">
                  <button
                    onClick={() => setPreviewVoiceLang('id')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-black transition-all ${
                      previewVoiceLang === 'id' ? 'bg-white shadow text-slate-900' : 'text-slate-500'
                    }`}
                  >
                    🇮🇩 ID
                  </button>
                  <button
                    onClick={() => setPreviewVoiceLang('en')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-black transition-all ${
                      previewVoiceLang === 'en' ? 'bg-white shadow text-slate-900' : 'text-slate-500'
                    }`}
                  >
                    🇬🇧 EN
                  </button>
                </div>

                {/* Narration voice test button */}
                <button
                  onClick={handlePlaySceneAudio}
                  className={`px-3 py-1.5 rounded-xl font-black text-xs flex items-center gap-1.5 transition-all ${
                    isPlayingSceneAudio
                      ? 'bg-rose-500 text-white animate-pulse'
                      : 'bg-amber-500 hover:bg-amber-600 text-white shadow'
                  }`}
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>{isPlayingSceneAudio ? 'Hentikan Suara' : 'Bacakan Narasi'}</span>
                </button>

                {/* Pause/Play canvas animation */}
                <button
                  onClick={() => setIsPreviewPaused(!isPreviewPaused)}
                  className={`px-3 py-1.5 rounded-xl font-black text-xs flex items-center gap-1 transition-all ${
                    isPreviewPaused ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {isPreviewPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
                  <span>{isPreviewPaused ? 'Play' : 'Pause'}</span>
                </button>
              </div>
            </div>

            {/* Scene Selector Pills */}
            <div className="w-full flex gap-2 overflow-x-auto pb-2 mb-3">
              {previewScenes.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => {
                    setPreviewSceneIdx(idx);
                    if (isPlayingSceneAudio) {
                      voiceEngine.stop();
                      setIsPlayingSceneAudio(false);
                    }
                  }}
                  className={`px-3.5 py-1.5 rounded-xl font-black text-xs transition-all whitespace-nowrap ${
                    previewSceneIdx === idx
                      ? 'candy-btn candy-btn-yellow shadow'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {isPreviewingRemedial ? 'Remedial' : 'Adegan'} {idx + 1}
                </button>
              ))}
            </div>

            {/* Canvas */}
            <div className="w-full max-w-4xl space-y-4">
              <PixelCanvas
                allScenes={previewScenes}
                activeSceneIndex={previewSceneIdx}
                characters={currentLesson.characters}
                isPaused={isPreviewPaused}
                voiceLang={previewVoiceLang}
                boardText={previewBoardText}
              />

              {/* Narration and Dialogue Box */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
                  <span className="block text-xs font-black text-amber-800 uppercase mb-1">
                    📖 Narasi Adegan ({previewVoiceLang === 'id' ? 'Bahasa Indonesia' : 'English'}):
                  </span>
                  <p className="text-slate-800 font-bold leading-relaxed">
                    {previewScenes[previewSceneIdx]?.narration || 'Tidak ada narasi.'}
                  </p>
                </div>

                {previewScenes[previewSceneIdx]?.dialogue ? (
                  <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200">
                    <span className="block text-xs font-black text-sky-800 uppercase mb-1">
                      💬 Dialog ({previewScenes[previewSceneIdx].dialogue?.speaker}):
                    </span>
                    <p className="text-slate-800 font-bold leading-relaxed">
                      "{previewScenes[previewSceneIdx].dialogue?.text}"
                    </p>
                  </div>
                ) : (
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-400 italic text-xs flex items-center justify-center">
                    Tidak ada dialog karakter pada adegan ini.
                  </div>
                )}
              </div>

              {/* Question Preview Card */}
              {currentLesson.question && (
                <div className="p-5 rounded-2xl bg-white border-2 border-indigo-200 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg">
                      ❓ Pertanyaan Interaktif
                    </span>
                    <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                      Kunci Jawaban: {currentLesson.question.correctAnswer}
                    </span>
                  </div>

                  <p className="font-black text-base text-slate-900">{currentLesson.question.question}</p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {currentLesson.question.options.map(opt => {
                      const isCorrect = opt.id === currentLesson.question.correctAnswer;
                      return (
                        <div
                          key={opt.id}
                          className={`p-3 rounded-xl border-2 text-center text-xs font-black ${
                            isCorrect
                              ? 'bg-emerald-100 border-emerald-500 text-emerald-950 ring-2 ring-emerald-200'
                              : 'bg-slate-50 border-slate-200 text-slate-700'
                          }`}
                        >
                          <span className="block opacity-60 text-[10px]">{opt.id}</span>
                          <span>{opt.label}</span>
                        </div>
                      );
                    })}
                  </div>

                  {currentLesson.question.explanation && (
                    <div className="text-xs bg-slate-50 p-3 rounded-xl border border-slate-200 text-slate-600">
                      <strong className="text-slate-800">Penjelasan: </strong>
                      <span>{currentLesson.question.explanation}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
