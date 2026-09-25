'use client';

import React, { useState, useMemo } from 'react';
import { StoryLesson, SubjectType, MathTopicType } from '@/types/story';
import { canonicalSubtractionLesson, mockSubjects } from '@/data/mockLessons';
import { validateLesson, ValidationResult } from '@/lib/validation/mathValidator';
import { PixelCanvas } from '@/components/story-engine/PixelCanvas';
import { soundEngine } from '@/lib/audio/soundEngine';
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
  Layers,
  Globe,
  Volume2,
  GraduationCap,
  Brain,
  Heart,
  FlaskConical,
  Languages,
  Puzzle,
} from 'lucide-react';

interface AdminContentStudioProps {
  onBackToApp: () => void;
  onPublishLesson?: (lesson: StoryLesson) => void;
}

// Topic labels mapping
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
    { value: 'science_animals', label: '🐾 Dunia Hewan' },
    { value: 'science_plants', label: '🌱 Dunia Tumbuhan' },
    { value: 'science_weather', label: '🌈 Cuaca & Fenomena Alam' },
    { value: 'science_space', label: '🚀 Luar Angkasa & Bumi' },
    { value: 'science_nature', label: '🔬 Panca Indera & Materi' },
  ],
  language: [
    { value: 'language_letters', label: '🔤 Mengenal Huruf Alfabet' },
    { value: 'language_spelling', label: '📝 Mengeja & Membaca Kata' },
    { value: 'language_antonyms', label: '🔄 Lawan Kata (Antonim)' },
    { value: 'language_comprehension', label: '📖 Sinonim, Kalimat & Sastra' },
  ],
  character: [
    { value: 'character_politeness', label: '🤝 Sopan Santun & Tiga Kata Ajaib' },
    { value: 'character_sharing', label: '🎁 Berbagi & Empati' },
    { value: 'character_cleanliness', label: '🗑️ Peduli Lingkungan & Kebersihan' },
    { value: 'character_healthy', label: '🧼 Kebiasaan Hidup Sehat' },
    { value: 'character_honesty', label: '⭐ Kejujuran & Tanggung Jawab' },
    { value: 'character_tolerance', label: '🌈 Toleransi & Menghargai' },
    { value: 'character_leadership', label: '👑 Ksatria Kebaikan & Teladan' },
  ],
  logic: [
    { value: 'logic_patterns', label: '🔴 Pola & Urutan Berulang' },
    { value: 'logic_shapes', label: '⭕ Geometri & Klasifikasi' },
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

const SUBJECT_COLORS: Record<SubjectType, { bg: string; text: string; border: string; ring: string }> = {
  mathematics: { bg: 'bg-amber-50', text: 'text-amber-900', border: 'border-amber-300', ring: 'ring-amber-200' },
  science: { bg: 'bg-emerald-50', text: 'text-emerald-900', border: 'border-emerald-300', ring: 'ring-emerald-200' },
  language: { bg: 'bg-sky-50', text: 'text-sky-900', border: 'border-sky-300', ring: 'ring-sky-200' },
  character: { bg: 'bg-rose-50', text: 'text-rose-900', border: 'border-rose-300', ring: 'ring-rose-200' },
  logic: { bg: 'bg-violet-50', text: 'text-violet-900', border: 'border-violet-300', ring: 'ring-violet-200' },
};

export const AdminContentStudio: React.FC<AdminContentStudioProps> = ({
  onBackToApp,
  onPublishLesson,
}) => {
  const [subject, setSubject] = useState<SubjectType>('mathematics');
  const [topic, setTopic] = useState<MathTopicType>('subtraction');
  const [ageGroup, setAgeGroup] = useState<string>('6-8');
  const [grade, setGrade] = useState<string>('SD Kelas 1');
  const [difficulty, setDifficulty] = useState<number>(1);
  const [theme, setTheme] = useState<string>('Taman Kelereng');
  const [learningObjective, setLearningObjective] = useState<string>(
    'Anak memahami konsep pengurangan sederhana melalui berbagi objek.'
  );
  const [mathOpA, setMathOpA] = useState<number>(10);
  const [mathOperator, setMathOperator] = useState<'+' | '-' | '*' | '/'>('-');
  const [mathOpB, setMathOpB] = useState<number>(4);

  const [currentLesson, setCurrentLesson] = useState<StoryLesson>(canonicalSubtractionLesson);
  const [jsonText, setJsonText] = useState<string>(JSON.stringify(canonicalSubtractionLesson, null, 2));
  const [jsonParseError, setJsonParseError] = useState<string | null>(null);

  const [validationReport, setValidationReport] = useState<ValidationResult>(
    validateLesson(canonicalSubtractionLesson)
  );

  const [activeTab, setActiveTab] = useState<'dashboard' | 'generator' | 'editor' | 'preview'>('dashboard');
  const [previewSceneIdx, setPreviewSceneIdx] = useState<number>(0);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [publishSuccess, setPublishSuccess] = useState<boolean>(false);

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

  const handleGenerateLesson = () => {
    setIsGenerating(true);
    soundEngine.playSfx('click');

    setTimeout(() => {
      let calculatedResult = 0;
      switch (mathOperator) {
        case '+': calculatedResult = mathOpA + mathOpB; break;
        case '-': calculatedResult = Math.max(0, mathOpA - mathOpB); break;
        case '*': calculatedResult = mathOpA * mathOpB; break;
        case '/': calculatedResult = mathOpB !== 0 ? Math.floor(mathOpA / mathOpB) : 1; break;
      }

      const generatedLessonId = `lesson-${topic}-${Date.now().toString().slice(-4)}`;
      const newLesson: StoryLesson = {
        lessonId: generatedLessonId,
        levelId: topic === 'counting' ? 1 : topic === 'addition' ? 2 : topic === 'subtraction' ? 3 : 4,
        title: `Petualangan ${topic === 'subtraction' ? 'Pengurangan' : topic === 'addition' ? 'Penjumlahan' : 'Matematika'}: ${theme}`,
        subject,
        topic,
        difficulty: difficulty as any,
        metadata: {
          ageGroup,
          grade,
          theme,
          mathFormula: {
            operandA: mathOpA,
            operator: mathOperator,
            operandB: mathOpB,
            result: calculatedResult,
          },
        },
        learningObjective: [learningObjective],
        characters: [
          {
            id: 'budi',
            name: 'Budi',
            asset: 'character_budi',
            color: '#3b82f6',
            personality: 'Ceria dan suka berbagi',
            voiceProfile: { pitch: 1.25, rate: 0.95 },
          },
          {
            id: 'siti',
            name: 'Siti',
            asset: 'character_siti',
            color: '#ec4899',
            personality: 'Ramah dan senang belajar bersama',
            voiceProfile: { pitch: 1.35, rate: 0.92 },
          },
        ],
        scenes: [
          {
            id: 'scene_01',
            title: 'Awal Cerita',
            background: 'park',
            narration: `Di ${theme.toLowerCase()}, Budi memiliki ${mathOpA} butir kelereng kesayangannya.`,
            actions: [
              { type: 'spawn_character', characterId: 'budi', position: { x: 200, y: 320 }, animation: 'idle' },
              { type: 'spawn_object', object: 'marble', owner: 'budi', quantity: mathOpA, position: { x: 260, y: 340 } },
            ],
            dialogue: {
              speaker: 'budi',
              text: `Lihat kelerengku ada ${mathOpA} butir!`,
            },
          },
          {
            id: 'scene_02',
            title: 'Kedatangan Sahabat',
            background: 'park',
            narration: 'Siti datang dan Budi dengan gembira membagikan kelerengnya.',
            actions: [
              { type: 'spawn_character', characterId: 'siti', position: { x: 550, y: 320 }, animation: 'walk' },
              { type: 'animate_character', characterId: 'budi', animation: 'happy' },
            ],
            dialogue: {
              speaker: 'siti',
              text: 'Halo Budi, bolehkah kita bermain kelereng bersama?',
            },
          },
          {
            id: 'scene_03',
            title: 'Aksi Berbagi',
            background: 'park',
            narration: `Budi memberikan ${mathOpB} butir kelereng kepada Siti dengan tulus.`,
            actions: [
              { type: 'transfer_object', object: 'marble', from: 'budi', to: 'siti', quantity: mathOpB },
              { type: 'animate_character', characterId: 'siti', animation: 'celebrate' },
            ],
            dialogue: {
              speaker: 'budi',
              text: `Tentu saja, ini ${mathOpB} kelereng untukmu Siti!`,
            },
          },
          {
            id: 'scene_04',
            title: 'Menghitung Hasil',
            background: 'park',
            narration: `Kelereng Budi awalnya ${mathOpA}, lalu diberikan ${mathOpB} kepada Siti. Berapa butir sisa kelereng Budi sekarang?`,
            actions: [
              { type: 'animate_character', characterId: 'budi', animation: 'think' },
              { type: 'highlight_object', object: 'marble', owner: 'budi' },
            ],
          },
        ],
        question: {
          type: 'multiple_choice',
          question: `Berapakah sisa kelereng yang dipegang Budi sekarang?`,
          options: [
            { id: 'A', value: Math.max(1, calculatedResult - 2), label: `${Math.max(1, calculatedResult - 2)} Butir` },
            { id: 'B', value: Math.max(1, calculatedResult - 1), label: `${Math.max(1, calculatedResult - 1)} Butir` },
            { id: 'C', value: calculatedResult, label: `${calculatedResult} Butir` },
            { id: 'D', value: calculatedResult + 2, label: `${calculatedResult + 2} Butir` },
          ],
          correctAnswer: 'C',
          explanation: `${mathOpA} dikurangi ${mathOpB} sama dengan ${calculatedResult}!`,
          hint: `Hitung mundur ${mathOpB} langkah dari ${mathOpA}!`,
          visualHint: {
            formula: `${mathOpA} ${mathOperator} ${mathOpB} = ${calculatedResult}`,
            initialCount: mathOpA,
            transferCount: mathOpB,
            remainingCount: calculatedResult,
            itemType: 'marble',
          },
        },
        remedialStory: {
          title: 'Remedial: Berbagi Apel Manis',
          narration: `Bayangkan memiliki ${mathOpA} apel manis dan memberikan ${mathOpB} buah kepada sahabatmu.`,
          scenes: [
            {
              id: 'rem_1',
              background: 'forest',
              narration: `Budi memiliki ${mathOpA} apel di keranjang hutan.`,
              actions: [
                { type: 'spawn_character', characterId: 'budi', position: { x: 250, y: 320 }, animation: 'idle' },
                { type: 'spawn_object', object: 'apple', owner: 'budi', quantity: mathOpA },
              ],
            },
          ],
          question: {
            type: 'multiple_choice',
            question: `Berapakah sisa apel milik Budi?`,
            options: [
              { id: 'A', value: calculatedResult, label: `${calculatedResult} Apel` },
              { id: 'B', value: calculatedResult + 1, label: `${calculatedResult + 1} Apel` },
            ],
            correctAnswer: 'A',
            explanation: `${mathOpA} - ${mathOpB} = ${calculatedResult}`,
            hint: 'Gunakan petunjuk visual untuk menghitung sisa.',
          },
        },
        rewardXp: 50,
      };

      setCurrentLesson(newLesson);
      setJsonText(JSON.stringify(newLesson, null, 2));
      const report = validateLesson(newLesson);
      setValidationReport(report);
      setIsGenerating(false);
      soundEngine.playSfx('celebrate');
    }, 800);
  };

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

  const tabItems = [
    { key: 'dashboard' as const, icon: <BarChart3 className="w-4 h-4" />, label: 'Dashboard Kurikulum' },
    { key: 'generator' as const, icon: <Sparkles className="w-4 h-4" />, label: 'AI Content Generator' },
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
            <Sparkles className="w-5 h-5 text-amber-500" />
            <span>Admin Studio</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePublish}
              className="candy-btn candy-btn-green font-black px-4 py-2 rounded-2xl text-sm flex items-center gap-2 shadow"
            >
              <CheckCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Publish</span>
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

        {publishSuccess && (
          <div className="p-4 rounded-2xl bg-emerald-100 border-2 border-emerald-400 text-emerald-900 font-bold flex items-center gap-2 animate-pop-in">
            <CheckCircle className="w-6 h-6 text-emerald-600 shrink-0" />
            <span>Lesson berhasil dipublish dan langsung tersedia di peta petualangan anak!</span>
          </div>
        )}

        {/* ==================== TAB 0: CURRICULUM DASHBOARD ==================== */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Hero Stats Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-gradient-to-br from-indigo-500 to-violet-600 rounded-2xl p-4 text-white shadow-lg">
                <p className="text-[10px] uppercase font-black opacity-80 tracking-wide">Total Mata Pelajaran</p>
                <p className="text-3xl font-black mt-1">{mockSubjects.length}</p>
                <p className="text-xs opacity-70 font-bold mt-0.5">Subjek Aktif</p>
              </div>
              <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-4 text-white shadow-lg">
                <p className="text-[10px] uppercase font-black opacity-80 tracking-wide">Total Level</p>
                <p className="text-3xl font-black mt-1">{totalLevelsAllSubjects}</p>
                <p className="text-xs opacity-70 font-bold mt-0.5">Level Petualangan</p>
              </div>
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-4 text-white shadow-lg">
                <p className="text-[10px] uppercase font-black opacity-80 tracking-wide">Total Soal Cerita</p>
                <p className="text-3xl font-black mt-1">{totalLessonsAllSubjects}</p>
                <p className="text-xs opacity-70 font-bold mt-0.5">Lessons Interaktif</p>
              </div>
              <div className="bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl p-4 text-white shadow-lg">
                <p className="text-[10px] uppercase font-black opacity-80 tracking-wide">Dukungan Bahasa</p>
                <p className="text-3xl font-black mt-1">2</p>
                <p className="text-xs opacity-70 font-bold mt-0.5">🇮🇩 Indonesia & 🇬🇧 English</p>
              </div>
            </div>

            {/* Feature Highlights */}
            <div className="bg-white border-2 border-slate-200/80 rounded-[2rem] p-6 shadow-sm">
              <h3 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                Fitur Terbaru Platform
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  { icon: '🗣️', title: 'Suara Dwibahasa', desc: 'Narasi & dialog dalam Bahasa Indonesia dan English dengan 8 persona narrator.' },
                  { icon: '🎭', title: 'Karakter Multi-Suara', desc: 'Suara narator berbeda dari suara Budi, Siti, dan Robot Bibo di animasi.' },
                  { icon: '🧠', title: '175 Soal Cerita Interaktif', desc: '5 mata pelajaran × 7 level × 5 soal unik per level dengan cerita berbeda.' },
                  { icon: '🎮', title: 'Pixel Art Canvas & BGM', desc: 'Animasi 8-bit pixel art dengan musik chiptune dan efek suara interaktif.' },
                  { icon: '⭐', title: 'Sistem XP & Bintang', desc: 'Progres belajar anak dilacak dengan Experience Points dan bintang reward.' },
                  { icon: '📱', title: 'PWA Offline-Ready', desc: 'Install di perangkat apapun dan bermain tanpa koneksi internet aktif.' },
                ].map((feat, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200">
                    <span className="text-2xl">{feat.icon}</span>
                    <div>
                      <p className="font-black text-sm text-slate-900">{feat.title}</p>
                      <p className="text-xs text-slate-500 font-bold mt-0.5">{feat.desc}</p>
                    </div>
                  </div>
                ))}
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
                      <div className="flex gap-3 text-center">
                        <div className={`px-3 py-1.5 rounded-xl ${colors.bg} ${colors.text}`}>
                          <p className="text-lg font-black">{stat.levelsCount}</p>
                          <p className="text-[10px] font-bold uppercase">Level</p>
                        </div>
                        <div className={`px-3 py-1.5 rounded-xl ${colors.bg} ${colors.text}`}>
                          <p className="text-lg font-black">{stat.lessonsCount}</p>
                          <p className="text-[10px] font-bold uppercase">Soal</p>
                        </div>
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

            {/* Voice System Info */}
            <div className="bg-white border-2 border-slate-200/80 rounded-[2rem] p-6 shadow-sm">
              <h3 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
                <Volume2 className="w-5 h-5 text-indigo-600" />
                Sistem Suara & Narasi
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Globe className="w-4 h-4 text-amber-700" />
                    <span className="font-black text-sm text-amber-900">🇮🇩 Bahasa Indonesia</span>
                  </div>
                  <div className="space-y-1.5 text-xs text-amber-800 font-bold">
                    <p>🌟 Kakak Ceria — Pengajar Ramah</p>
                    <p>👩‍🏫 Ibu Guru Bijak — Pendamping Tenang</p>
                    <p>🧙‍♂️ Paman Dongeng — Karakter Hangat</p>
                    <p>🧭 Kakak Penjelajah — Petualang Cerdas</p>
                    <hr className="border-amber-200 my-1" />
                    <p>👦 Budi — Suara Anak Laki-Laki Ceria</p>
                    <p>👧 Siti — Suara Anak Perempuan Manis</p>
                    <p>🤖 Bibo — Suara Robot Futuristik</p>
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Globe className="w-4 h-4 text-sky-700" />
                    <span className="font-black text-sm text-sky-900">🇬🇧 English</span>
                  </div>
                  <div className="space-y-1.5 text-xs text-sky-800 font-bold">
                    <p>🌟 Teacher Emma — Friendly Educator</p>
                    <p>👩‍🏫 Miss Clara — Gentle Teacher</p>
                    <p>🧙‍♂️ Storyteller Oliver — Warm Storyteller</p>
                    <p>🧭 Explorer Jack — Brave Explorer</p>
                    <hr className="border-sky-200 my-1" />
                    <p>👦 Budi — Energetic Boy Voice</p>
                    <p>👧 Siti — Sweet Girl Voice</p>
                    <p>🤖 Bibo — Playful Robot Voice</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 1: AI GENERATOR ==================== */}
        {activeTab === 'generator' && (
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
                  <label className="block text-xs font-black text-slate-600 uppercase mb-1.5">Bahasa Suara</label>
                  <select
                    className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl px-4 py-2.5 text-slate-900 font-bold focus:border-amber-400"
                    defaultValue="id"
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
                      {mathOperator === '+' ? mathOpA + mathOpB : mathOperator === '-' ? mathOpA - mathOpB : mathOperator === '*' ? mathOpA * mathOpB : Math.floor(mathOpA / mathOpB)}
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
                <span>{isGenerating ? 'AI Sedang Merancang Cerita...' : 'Generate Cerita Interaktif dengan AI'}</span>
              </button>
            </div>

            {/* Summary Card */}
            <div className="bg-white border-2 border-slate-200/80 rounded-[2rem] p-6 sm:p-8 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-xs font-black text-amber-700 bg-amber-100 px-3 py-1 rounded-full uppercase">
                  Ringkasan Pelajaran
                </span>
                <h4 className="text-xl font-black text-slate-900 mt-3">{currentLesson.title}</h4>
                <p className="text-xs text-slate-500 font-bold mt-1">ID: {currentLesson.lessonId}</p>

                <div className="mt-5 space-y-2.5 text-sm">
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
                    <span className="font-black text-indigo-600">{currentLesson.remedialStory ? 'Tersedia' : 'Tidak ada'}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-2">
                    <span className="text-slate-500 font-bold">Mata Pelajaran:</span>
                    <span className="font-black text-slate-900 capitalize">{currentLesson.subject}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-2">
                    <span className="text-slate-500 font-bold">Reward XP:</span>
                    <span className="font-black text-amber-600">{currentLesson.rewardXp} XP</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t-2 border-slate-100">
                <button
                  onClick={() => setActiveTab('preview')}
                  className="candy-btn candy-btn-blue w-full py-3 rounded-2xl font-black flex items-center justify-center gap-2"
                >
                  <Eye className="w-5 h-5" />
                  <span>Preview Animasi Scene</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 2: STORY JSON & VALIDATOR ==================== */}
        {activeTab === 'editor' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white border-2 border-slate-200/80 rounded-[2rem] p-6 shadow-sm flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <span className="font-black text-base text-slate-800 flex items-center gap-2">
                  <Code className="w-5 h-5 text-amber-500" />
                  <span>Story JSON Schema Editor</span>
                </span>
                {jsonParseError && (
                  <span className="text-xs text-rose-600 bg-rose-100 font-bold px-3 py-1 rounded-xl">
                    Syntax Error
                  </span>
                )}
              </div>

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

        {/* ==================== TAB 3: LIVE SCENE PREVIEW ==================== */}
        {activeTab === 'preview' && (
          <div className="bg-white border-2 border-slate-200/80 rounded-[2rem] p-6 sm:p-8 shadow-sm flex flex-col items-center">
            <div className="w-full flex items-center justify-between mb-4">
              <div>
                <h4 className="font-black text-xl text-slate-900">Live Pixel Scene Preview</h4>
                <p className="text-xs text-slate-500 font-bold">
                  Adegan {previewSceneIdx + 1}: {currentLesson.scenes[previewSceneIdx]?.title || 'Adegan'}
                </p>
              </div>

              <div className="flex gap-2 flex-wrap justify-end">
                {currentLesson.scenes.map((s, idx) => (
                  <button
                    key={s.id}
                    onClick={() => setPreviewSceneIdx(idx)}
                    className={`px-3.5 py-1.5 rounded-xl font-black text-xs transition-all ${
                      previewSceneIdx === idx
                        ? 'candy-btn candy-btn-yellow'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Adegan {idx + 1}
                  </button>
                ))}
              </div>
            </div>

            <div className="w-full max-w-4xl">
              <PixelCanvas
                allScenes={currentLesson.scenes}
                activeSceneIndex={previewSceneIdx}
                characters={currentLesson.characters}
                isPaused={false}
              />

              <div className="mt-4 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-sm">
                <span className="block text-xs font-black text-amber-800 uppercase mb-1">Narasi Audio:</span>
                <p className="text-slate-800 font-bold">{currentLesson.scenes[previewSceneIdx]?.narration}</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
