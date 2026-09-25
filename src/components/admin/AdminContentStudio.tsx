'use client';

import React, { useState } from 'react';
import { StoryLesson, SubjectType, MathTopicType, EnvironmentType } from '@/types/story';
import { canonicalSubtractionLesson } from '@/data/mockLessons';
import { validateLesson, ValidationResult } from '@/lib/validation/mathValidator';
import { PixelCanvas } from '@/components/story-engine/PixelCanvas';
import { soundEngine } from '@/lib/audio/soundEngine';
import {
  Sparkles,
  Play,
  CheckCircle,
  AlertTriangle,
  Code,
  Eye,
  ArrowLeft,
  Download,
  Upload,
  Send,
  FileCheck,
} from 'lucide-react';

interface AdminContentStudioProps {
  onBackToApp: () => void;
  onPublishLesson?: (lesson: StoryLesson) => void;
}

export const AdminContentStudio: React.FC<AdminContentStudioProps> = ({
  onBackToApp,
  onPublishLesson,
}) => {
  // AI Generator Form States
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

  // Active Lesson JSON State
  const [currentLesson, setCurrentLesson] = useState<StoryLesson>(canonicalSubtractionLesson);
  const [jsonText, setJsonText] = useState<string>(JSON.stringify(canonicalSubtractionLesson, null, 2));
  const [jsonParseError, setJsonParseError] = useState<string | null>(null);

  // Validation Report
  const [validationReport, setValidationReport] = useState<ValidationResult>(
    validateLesson(canonicalSubtractionLesson)
  );

  // Studio Tab
  const [activeTab, setActiveTab] = useState<'generator' | 'editor' | 'preview'>('generator');
  const [previewSceneIdx, setPreviewSceneIdx] = useState<number>(0);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [publishSuccess, setPublishSuccess] = useState<boolean>(false);

  // Handle AI Lesson Generation
  const handleGenerateLesson = () => {
    setIsGenerating(true);
    soundEngine.playSfx('click');

    setTimeout(() => {
      // Calculate deterministic math result
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
          narration: `Jika kamu bingung, bayangkan memiliki ${mathOpA} apel manis dan memberikan ${mathOpB} buah kepada temanmu.`,
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

  return (
    <div className="min-h-screen bg-slate-950 text-white font-fun pb-12">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b-2 border-slate-800 px-4 py-3 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button
            onClick={onBackToApp}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3.5 py-1.5 rounded-xl font-bold text-sm transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Permainan</span>
          </button>

          <div className="flex items-center gap-2 text-amber-400 font-pixel text-xs">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span>ADMIN CONTENT STUDIO & AI GENERATOR</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePublish}
              className="bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-slate-950 font-bold px-4 py-1.5 rounded-xl text-sm flex items-center gap-1.5 shadow"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Publish Lesson</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 pt-6 space-y-6">
        {/* Studio Navigation Tabs */}
        <div className="flex gap-2 border-b border-slate-800 pb-3">
          <button
            onClick={() => setActiveTab('generator')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
              activeTab === 'generator'
                ? 'bg-amber-400 text-slate-950 shadow-md'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>1. AI Content Generator</span>
          </button>

          <button
            onClick={() => setActiveTab('editor')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
              activeTab === 'editor'
                ? 'bg-amber-400 text-slate-950 shadow-md'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <Code className="w-4 h-4" />
            <span>2. Story JSON & Validator</span>
          </button>

          <button
            onClick={() => setActiveTab('preview')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
              activeTab === 'preview'
                ? 'bg-amber-400 text-slate-950 shadow-md'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>3. Live Scene Preview</span>
          </button>
        </div>

        {publishSuccess && (
          <div className="p-4 rounded-2xl bg-emerald-950 border-2 border-emerald-400 text-emerald-200 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>Lesson berhasil dipublish dan ditambahkan ke kurikulum!</span>
          </div>
        )}

        {/* TAB 1: AI GENERATOR */}
        {activeTab === 'generator' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Input Form */}
            <div className="lg:col-span-2 bg-slate-900 border-2 border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
              <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span>Parameter Pembuatan Pelajaran Berbasis AI</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Mata Pelajaran</label>
                  <select
                    value={subject}
                    onChange={e => setSubject(e.target.value as SubjectType)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-fun"
                  >
                    <option value="mathematics">Matematika</option>
                    <option value="science">Sains Dasar</option>
                    <option value="language">Bahasa & Cerita</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Topik Pembelajaran</label>
                  <select
                    value={topic}
                    onChange={e => setTopic(e.target.value as MathTopicType)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-fun"
                  >
                    <option value="subtraction">Pengurangan (Subtraction)</option>
                    <option value="addition">Penjumlahan (Addition)</option>
                    <option value="counting">Mengenal & Menghitung Angka</option>
                    <option value="comparison">Perbandingan (Lebih Besar/Kecil)</option>
                    <option value="multiplication">Perkalian Dasar</option>
                    <option value="division">Pembagian Dasar</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Rentang Usia</label>
                  <select
                    value={ageGroup}
                    onChange={e => setAgeGroup(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-fun"
                  >
                    <option value="5-7">5 - 7 Tahun (TK-B / Kelas 1)</option>
                    <option value="6-8">6 - 8 Tahun (Kelas 1 - 2)</option>
                    <option value="7-9">7 - 9 Tahun (Kelas 2 - 3)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Tema Cerita</label>
                  <input
                    type="text"
                    value={theme}
                    onChange={e => setTheme(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-fun"
                  />
                </div>
              </div>

              {/* Math Formula Settings (Deterministic verification) */}
              <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                <span className="block text-xs font-bold text-amber-400 uppercase mb-2">
                  Target Soal Matematika Deterministik
                </span>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={mathOpA}
                    onChange={e => setMathOpA(Number(e.target.value))}
                    className="w-20 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-center text-white font-bold"
                  />
                  <select
                    value={mathOperator}
                    onChange={e => setMathOperator(e.target.value as any)}
                    className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-center text-amber-400 font-bold font-pixel"
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
                    className="w-20 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-center text-white font-bold"
                  />
                  <span className="font-bold text-slate-400">=</span>
                  <span className="font-pixel text-emerald-400 text-lg px-3 py-1 bg-slate-900 rounded-xl border border-emerald-500/40">
                    {mathOperator === '+' ? mathOpA + mathOpB : mathOperator === '-' ? mathOpA - mathOpB : mathOperator === '*' ? mathOpA * mathOpB : Math.floor(mathOpA / mathOpB)}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Tujuan Pembelajaran (Learning Objective)</label>
                <textarea
                  value={learningObjective}
                  onChange={e => setLearningObjective(e.target.value)}
                  rows={2}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-fun"
                />
              </div>

              <button
                onClick={handleGenerateLesson}
                disabled={isGenerating}
                className="w-full bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-bold py-3.5 rounded-2xl shadow-xl flex items-center justify-center gap-2 active:scale-95 transition-all text-base"
              >
                <Sparkles className="w-5 h-5 text-slate-950" />
                <span>{isGenerating ? 'AI Sedang Merancang Cerita...' : 'Generate Interactive Story dengan AI'}</span>
              </button>
            </div>

            {/* AI Generator Summary Card */}
            <div className="bg-slate-900 border-2 border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
              <div>
                <span className="text-xs font-pixel text-amber-400 uppercase">Ringkasan Pelajaran Terpilih</span>
                <h4 className="text-lg font-bold text-white mt-1">{currentLesson.title}</h4>
                <p className="text-xs text-slate-400 mt-0.5">ID: {currentLesson.lessonId}</p>

                <div className="mt-4 space-y-2 text-xs">
                  <div className="flex justify-between border-b border-slate-800 pb-1.5">
                    <span className="text-slate-400">Total Adegan:</span>
                    <span className="font-bold text-white">{currentLesson.scenes.length} Scene</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-1.5">
                    <span className="text-slate-400">Karakter Terlibat:</span>
                    <span className="font-bold text-white">{currentLesson.characters.map(c => c.name).join(', ')}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-1.5">
                    <span className="text-slate-400">Kunci Jawaban:</span>
                    <span className="font-bold text-emerald-400">{currentLesson.question.correctAnswer}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-1.5">
                    <span className="text-slate-400">Remedial Story:</span>
                    <span className="font-bold text-indigo-400">{currentLesson.remedialStory ? 'Tersedia' : 'Tidak ada'}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800">
                <button
                  onClick={() => setActiveTab('preview')}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-2.5 rounded-xl flex items-center justify-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  <span>Preview Animasi Scene</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: STORY JSON & VALIDATOR */}
        {activeTab === 'editor' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* JSON Code Editor */}
            <div className="lg:col-span-2 bg-slate-900 border-2 border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-sm text-slate-300 flex items-center gap-2">
                  <Code className="w-4 h-4 text-amber-400" />
                  <span>Story JSON Schema Editor</span>
                </span>
                {jsonParseError && (
                  <span className="text-xs text-rose-400 bg-rose-950 px-2.5 py-1 rounded-lg">
                    Syntax Error
                  </span>
                )}
              </div>

              <textarea
                value={jsonText}
                onChange={e => handleJsonChange(e.target.value)}
                rows={22}
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 font-mono text-xs text-emerald-300 focus:outline-none focus:border-amber-400 leading-relaxed resize-none shadow-inner"
              />
            </div>

            {/* Validation Inspector Report */}
            <div className="bg-slate-900 border-2 border-slate-800 rounded-3xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-base text-white flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-indigo-400" />
                  <span>Validation Engine</span>
                </h4>
                <span
                  className={`font-pixel text-xs px-2.5 py-1 rounded-full font-bold ${
                    validationReport.isValid
                      ? 'bg-emerald-500 text-slate-950'
                      : 'bg-rose-500 text-white'
                  }`}
                >
                  Skor: {validationReport.score}/100
                </span>
              </div>

              <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                {validationReport.errors.map((err, i) => (
                  <div key={i} className="p-3 rounded-xl bg-rose-950/70 border border-rose-600/70 text-rose-200 text-xs flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-rose-300 uppercase font-pixel text-[10px]">{err.category}</strong>
                      <span>{err.message}</span>
                    </div>
                  </div>
                ))}

                {validationReport.warnings.map((warn, i) => (
                  <div key={i} className="p-3 rounded-xl bg-amber-950/60 border border-amber-600/60 text-amber-200 text-xs flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-amber-300 uppercase font-pixel text-[10px]">{warn.category}</strong>
                      <span>{warn.message}</span>
                    </div>
                  </div>
                ))}

                {validationReport.isValid && validationReport.errors.length === 0 && (
                  <div className="p-4 rounded-xl bg-emerald-950/50 border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span>Semua validasi berhasil! Lesson siap dipublish untuk dimainkan anak.</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: LIVE SCENE PREVIEW */}
        {activeTab === 'preview' && (
          <div className="bg-slate-900 border-2 border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col items-center">
            <div className="w-full flex items-center justify-between mb-4">
              <div>
                <h4 className="font-bold text-lg text-white">Live Pixel Scene Preview</h4>
                <p className="text-xs text-slate-400">
                  Adegan {previewSceneIdx + 1}: {currentLesson.scenes[previewSceneIdx]?.title || 'Adegan'}
                </p>
              </div>

              {/* Scene Switcher */}
              <div className="flex gap-1.5">
                {currentLesson.scenes.map((s, idx) => (
                  <button
                    key={s.id}
                    onClick={() => setPreviewSceneIdx(idx)}
                    className={`px-3 py-1.5 rounded-xl font-pixel text-xs transition-all ${
                      previewSceneIdx === idx
                        ? 'bg-amber-400 text-slate-950 font-bold'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    Scene {idx + 1}
                  </button>
                ))}
              </div>
            </div>

            <div className="w-full max-w-4xl">
              <PixelCanvas
                currentScene={currentLesson.scenes[previewSceneIdx] || currentLesson.scenes[0]}
                characters={currentLesson.characters}
                isPaused={false}
              />

              <div className="mt-4 p-4 rounded-2xl bg-slate-950 border border-slate-800 text-sm">
                <span className="block text-xs font-pixel text-amber-400 uppercase mb-1">Narasi Audio Preview:</span>
                <p className="text-slate-200 font-fun">{currentLesson.scenes[previewSceneIdx]?.narration}</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
