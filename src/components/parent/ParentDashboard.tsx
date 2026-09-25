'use client';

import React, { useState, useEffect } from 'react';
import { progressStore } from '@/lib/progress/progressStore';
import { ChildProfile, LessonAttempt, MasteryScore } from '@/types/story';
import {
  ArrowLeft,
  Clock,
  CheckCircle,
  TrendingUp,
  Target,
  AlertTriangle,
  Award,
  Calendar,
  Settings,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react';

interface ParentDashboardProps {
  onBackToApp: () => void;
}

export const ParentDashboard: React.FC<ParentDashboardProps> = ({ onBackToApp }) => {
  const [activeChild, setActiveChild] = useState<ChildProfile>(progressStore.getActiveChild());
  const [masteryScores, setMasteryScores] = useState<MasteryScore[]>([]);
  const [attempts, setAttempts] = useState<LessonAttempt[]>([]);
  const [screenTimeLimit, setScreenTimeLimit] = useState<number>(30); // minutes

  useEffect(() => {
    const child = progressStore.getActiveChild();
    setActiveChild(child);
    setMasteryScores(progressStore.getMasteryScores(child.id));
    setAttempts(progressStore.getAttempts(child.id));
  }, []);

  const totalQuestions = attempts.length;
  const correctCount = attempts.filter(a => a.correct).length;
  const accuracy = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
  const totalSeconds = attempts.reduce((acc, a) => acc + (a.timeSpentSeconds || 60), 0);
  const totalMinutes = Math.round(totalSeconds / 60);

  // Weak and strong topics
  const strongTopics = masteryScores.filter(m => m.status === 'mastered' || m.status === 'good');
  const weakTopics = masteryScores.filter(m => m.status === 'needs_practice' || m.status === 'developing');

  return (
    <div className="min-h-screen bg-slate-950 text-white font-fun pb-12">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b-2 border-slate-800 px-4 py-3.5 shadow-lg">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <button
            onClick={onBackToApp}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3.5 py-1.5 rounded-xl font-bold text-sm transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Belajar</span>
          </button>

          <div className="flex items-center gap-2 text-indigo-400 font-pixel text-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>PARENT DASHBOARD</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xl">{activeChild.avatar}</span>
            <span className="font-bold text-sm text-slate-200">{activeChild.name}</span>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 pt-6 space-y-6">
        {/* Child Summary Hero */}
        <div className="bg-gradient-to-r from-indigo-900 to-slate-900 border-2 border-indigo-700/60 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-indigo-500 text-white text-xs font-pixel px-2.5 py-0.5 rounded-full">
                Laporan Mingguan
              </span>
              <span className="text-xs text-indigo-200">
                Aktivitas Terakhir: {new Date(activeChild.lastActive).toLocaleDateString('id-ID', { dateStyle: 'medium' })}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Perkembangan Belajar {activeChild.name}
            </h2>
            <p className="text-slate-300 text-sm mt-1 max-w-xl">
              Pantau pemahaman materi konsep, durasi belajar, dan materi yang membutuhkan pendampingan lebih lanjut.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-slate-950/60 p-4 rounded-2xl border border-indigo-500/30">
            <div className="text-center">
              <span className="block text-2xl font-pixel text-amber-400 font-bold">{activeChild.level}</span>
              <span className="text-xs text-slate-400 uppercase">Level</span>
            </div>
            <div className="w-px h-8 bg-slate-800" />
            <div className="text-center">
              <span className="block text-2xl font-pixel text-yellow-400 font-bold">{activeChild.xp}</span>
              <span className="text-xs text-slate-400 uppercase">Total XP</span>
            </div>
            <div className="w-px h-8 bg-slate-800" />
            <div className="text-center">
              <span className="block text-2xl font-pixel text-emerald-400 font-bold">{activeChild.stars}</span>
              <span className="text-xs text-slate-400 uppercase">Bintang</span>
            </div>
          </div>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900 border-2 border-slate-800 p-5 rounded-2xl shadow">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-bold uppercase">Waktu Belajar</span>
              <Clock className="w-5 h-5 text-blue-400" />
            </div>
            <div className="text-2xl font-bold text-white font-pixel">{totalMinutes} mnt</div>
            <p className="text-xs text-slate-400 mt-1">Total durasi sesi belajar</p>
          </div>

          <div className="bg-slate-900 border-2 border-slate-800 p-5 rounded-2xl shadow">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-bold uppercase">Cerita Selesai</span>
              <CheckCircle className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="text-2xl font-bold text-white font-pixel">{activeChild.completedLessons.length}</div>
            <p className="text-xs text-slate-400 mt-1">Dari 7 cerita kurikulum</p>
          </div>

          <div className="bg-slate-900 border-2 border-slate-800 p-5 rounded-2xl shadow">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-bold uppercase">Soal Dijawab</span>
              <Target className="w-5 h-5 text-purple-400" />
            </div>
            <div className="text-2xl font-bold text-white font-pixel">{totalQuestions}</div>
            <p className="text-xs text-slate-400 mt-1">{correctCount} jawaban benar</p>
          </div>

          <div className="bg-slate-900 border-2 border-slate-800 p-5 rounded-2xl shadow">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-bold uppercase">Rata-rata Akurasi</span>
              <TrendingUp className="w-5 h-5 text-amber-400" />
            </div>
            <div className="text-2xl font-bold text-white font-pixel">{accuracy}%</div>
            <p className="text-xs text-slate-400 mt-1">
              {accuracy >= 80 ? 'Sangat Baik 🌟' : 'Perlu Didampingi 📖'}
            </p>
          </div>
        </div>

        {/* Topic Mastery Progress Bars */}
        <div className="bg-slate-900 border-2 border-slate-800 rounded-3xl p-6 shadow-xl">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <span>Tingkat Penguasaan Materi (Topic Mastery)</span>
          </h3>

          <div className="space-y-4">
            {masteryScores.map(m => {
              const statusColor =
                m.status === 'mastered'
                  ? 'bg-emerald-500'
                  : m.status === 'good'
                  ? 'bg-blue-500'
                  : m.status === 'developing'
                  ? 'bg-amber-500'
                  : 'bg-rose-500';

              const statusText =
                m.status === 'mastered'
                  ? 'Telah Dikuasai (Mastered)'
                  : m.status === 'good'
                  ? 'Bagus (Good)'
                  : m.status === 'developing'
                  ? 'Sedang Berkembang'
                  : 'Perlu Latihan (Needs Practice)';

              return (
                <div key={m.topic} className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                    <div>
                      <h4 className="font-bold text-white text-base">{m.title}</h4>
                      <span className="text-xs text-slate-400">
                        {m.correctCount} benar dari {m.totalQuestions} percobaan
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-300">{statusText}</span>
                      <span className="font-pixel text-xs text-amber-400">{m.score}%</span>
                    </div>
                  </div>

                  <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${statusColor}`}
                      style={{ width: `${m.score}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Strength & Weakness Analysis with Parenting Tips */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Strong topics */}
          <div className="bg-slate-900 border-2 border-emerald-900/50 p-6 rounded-3xl shadow">
            <div className="flex items-center gap-2 text-emerald-400 font-bold mb-3">
              <CheckCircle className="w-5 h-5" />
              <span>Materi Yang Dikuasai</span>
            </div>
            {strongTopics.length > 0 ? (
              <ul className="space-y-2">
                {strongTopics.map(t => (
                  <li key={t.topic} className="flex items-center justify-between text-sm bg-slate-950/60 p-3 rounded-xl border border-emerald-500/20">
                    <span className="text-slate-200">{t.title}</span>
                    <span className="text-xs font-pixel text-emerald-400">{t.score}%</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-slate-400">Belum ada materi dengan skor tinggi. Terus beri semangat!</p>
            )}
          </div>

          {/* Weak topics & tips */}
          <div className="bg-slate-900 border-2 border-amber-900/50 p-6 rounded-3xl shadow">
            <div className="flex items-center gap-2 text-amber-400 font-bold mb-3">
              <AlertTriangle className="w-5 h-5" />
              <span>Materi Perlu Latihan & Tips Pendampingan</span>
            </div>
            {weakTopics.length > 0 ? (
              <div className="space-y-3">
                {weakTopics.slice(0, 2).map(t => (
                  <div key={t.topic} className="bg-slate-950/60 p-3.5 rounded-xl border border-amber-500/20 text-sm">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-white">{t.title}</span>
                      <span className="text-xs font-pixel text-amber-400">{t.score}%</span>
                    </div>
                    <p className="text-xs text-slate-300">
                      💡 <strong>Tips untuk Orang Tua:</strong> Saat di rumah, gunakan benda konkret (seperti buah atau mainan) untuk memperagakan konsep {t.title.toLowerCase()}.
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-emerald-400">Luar biasa! Semua materi yang dikerjakan menunjukkan pemahaman baik.</p>
            )}
          </div>
        </div>

        {/* Screen Time & Parent Controls */}
        <div className="bg-slate-900 border-2 border-slate-800 rounded-3xl p-6 shadow-xl">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Settings className="w-5 h-5 text-indigo-400" />
            <span>Pengaturan Waktu & Keamanan</span>
          </h3>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
            <div>
              <h4 className="font-bold text-white text-base">Batas Waktu Belajar Harian</h4>
              <p className="text-xs text-slate-400">
                Aplikasi akan memunculkan pesan pengingat istirahat saat waktu habis.
              </p>
            </div>
            <div className="flex gap-2">
              {[15, 30, 45, 60].map(mins => (
                <button
                  key={mins}
                  onClick={() => setScreenTimeLimit(mins)}
                  className={`px-3 py-1.5 rounded-xl font-pixel text-xs transition-all ${
                    screenTimeLimit === mins
                      ? 'bg-indigo-600 text-white font-bold'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {mins} mnt
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity Log */}
        <div className="bg-slate-900 border-2 border-slate-800 rounded-3xl p-6 shadow-xl">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-400" />
            <span>Riwayat Aktivitas Belajar Terbaru</span>
          </h3>

          <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
            {attempts.length > 0 ? (
              attempts.map(att => (
                <div
                  key={att.attemptId}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-sm"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{att.correct ? '✅' : '❌'}</span>
                    <div>
                      <h5 className="font-bold text-white">{att.lessonId}</h5>
                      <span className="text-xs text-slate-400">
                        {new Date(att.timestamp).toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'short' })} • Percobaan: {att.attemptsCount} {att.hintUsed ? '(Pakai Hint)' : ''}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-pixel text-xs text-amber-400 block">{att.score} Poin</span>
                    <span className="text-[11px] text-slate-400">{att.timeSpentSeconds} detik</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-400">Belum ada riwayat aktivitas terbaru.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
