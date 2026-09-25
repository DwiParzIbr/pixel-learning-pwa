'use client';

import React, { useState } from 'react';
import { StoryLesson, SubjectType, MathTopicType } from '@/types/story';
import { canonicalSubtractionLesson } from '@/data/mockLessons';
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
} from 'lucide-react';

interface AdminContentStudioProps {
  onBackToApp: () => void;
  onPublishLesson?: (lesson: StoryLesson) => void;
}

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

  const [activeTab, setActiveTab] = useState<'generator' | 'editor' | 'preview'>('generator');
  const [previewSceneIdx, setPreviewSceneIdx] = useState<number>(0);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [publishSuccess, setPublishSuccess] = useState<boolean>(false);

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
            <span>Kembali ke Permainan</span>
          </button>

          <div className="flex items-center gap-2 text-indigo-700 font-black text-sm uppercase tracking-wide">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <span>Studio Konten & AI Story Generator</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePublish}
              className="candy-btn candy-btn-green font-black px-5 py-2 rounded-2xl text-sm flex items-center gap-2 shadow"
            >
              <CheckCircle className="w-5 h-5" />
              <span>Publish Lesson</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 pt-6 space-y-6">
        {/* Studio Navigation Tabs */}
        <div className="flex gap-2.5 border-b-2 border-slate-200 pb-3">
          <button
            onClick={() => setActiveTab('generator')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-black transition-all ${
              activeTab === 'generator'
                ? 'bg-amber-400 text-amber-950 shadow-md border-b-4 border-amber-600'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>1. AI Content Generator</span>
          </button>

          <button
            onClick={() => setActiveTab('editor')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-black transition-all ${
              activeTab === 'editor'
                ? 'bg-amber-400 text-amber-950 shadow-md border-b-4 border-amber-600'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Code className="w-4 h-4" />
            <span>2. Story JSON & Validator</span>
          </button>

          <button
            onClick={() => setActiveTab('preview')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-black transition-all ${
              activeTab === 'preview'
                ? 'bg-amber-400 text-amber-950 shadow-md border-b-4 border-amber-600'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>3. Live Scene Preview</span>
          </button>
        </div>

        {publishSuccess && (
          <div className="p-4 rounded-2xl bg-emerald-100 border-2 border-emerald-400 text-emerald-900 font-bold flex items-center gap-2 animate-pop-in">
            <CheckCircle className="w-6 h-6 text-emerald-600 shrink-0" />
            <span>Lesson berhasil dipublish dan langsung tersedia di peta petualangan anak!</span>
          </div>
        )}

        {/* TAB 1: AI GENERATOR */}
        {activeTab === 'generator' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white border-2 border-slate-200/80 rounded-[2rem] p-6 sm:p-8 shadow-sm space-y-4">
              <h3 className="text-2xl font-black text-slate-900 mb-2 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-amber-500" />
                <span>Parameter Pembuatan Pelajaran Berbasis AI</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black text-slate-600 uppercase mb-1.5">Mata Pelajaran</label>
                  <select
                    value={subject}
                    onChange={e => setSubject(e.target.value as SubjectType)}
                    className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl px-4 py-2.5 text-slate-900 font-bold focus:border-amber-400"
                  >
                    <option value="mathematics">Matematika</option>
                    <option value="science">Sains Dasar</option>
                    <option value="language">Bahasa & Cerita</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-600 uppercase mb-1.5">Topik Pembelajaran</label>
                  <select
                    value={topic}
                    onChange={e => setTopic(e.target.value as MathTopicType)}
                    className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl px-4 py-2.5 text-slate-900 font-bold focus:border-amber-400"
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
                  <label className="block text-xs font-black text-slate-600 uppercase mb-1.5">Rentang Usia</label>
                  <select
                    value={ageGroup}
                    onChange={e => setAgeGroup(e.target.value)}
                    className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl px-4 py-2.5 text-slate-900 font-bold focus:border-amber-400"
                  >
                    <option value="5-7">5 - 7 Tahun (TK-B / Kelas 1)</option>
                    <option value="6-8">6 - 8 Tahun (Kelas 1 - 2)</option>
                    <option value="7-9">7 - 9 Tahun (Kelas 2 - 3)</option>
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
              </div>

              {/* Math Formula Settings */}
              <div className="bg-amber-50/80 p-5 rounded-2xl border-2 border-amber-200">
                <span className="block text-xs font-black text-amber-900 uppercase mb-2">
                  Target Soal Matematika Deterministik
                </span>
                <div className="flex items-center gap-3">
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

            {/* AI Generator Summary Card */}
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

        {/* TAB 2: STORY JSON & VALIDATOR */}
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

        {/* TAB 3: LIVE SCENE PREVIEW */}
        {activeTab === 'preview' && (
          <div className="bg-white border-2 border-slate-200/80 rounded-[2rem] p-6 sm:p-8 shadow-sm flex flex-col items-center">
            <div className="w-full flex items-center justify-between mb-4">
              <div>
                <h4 className="font-black text-xl text-slate-900">Live Pixel Scene Preview</h4>
                <p className="text-xs text-slate-500 font-bold">
                  Adegan {previewSceneIdx + 1}: {currentLesson.scenes[previewSceneIdx]?.title || 'Adegan'}
                </p>
              </div>

              <div className="flex gap-2">
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
