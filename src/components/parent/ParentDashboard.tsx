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
} from 'lucide-react';

interface ParentDashboardProps {
  onBackToApp: () => void;
}

export const ParentDashboard: React.FC<ParentDashboardProps> = ({ onBackToApp }) => {
  const [activeChild, setActiveChild] = useState<ChildProfile>(progressStore.getActiveChild());
  const [masteryScores, setMasteryScores] = useState<MasteryScore[]>([]);
  const [attempts, setAttempts] = useState<LessonAttempt[]>([]);
  const [screenTimeLimit, setScreenTimeLimit] = useState<number>(30);

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

  const strongTopics = masteryScores.filter(m => m.status === 'mastered' || m.status === 'good');
  const weakTopics = masteryScores.filter(m => m.status === 'needs_practice' || m.status === 'developing');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-fun pb-16">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b-2 border-slate-200 px-4 py-3.5 shadow-sm">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <button
            onClick={onBackToApp}
            className="candy-btn candy-btn-yellow flex items-center gap-2 px-4 py-2 rounded-2xl font-black text-sm"
          >
            <ArrowLeft className="w-4 h-4 stroke-[3]" />
            <span>Kembali ke Belajar</span>
          </button>

          <div className="flex items-center gap-2 text-indigo-700 font-black text-sm uppercase tracking-wide">
            <ShieldCheck className="w-5 h-5 text-indigo-600" />
            <span>Dashboard Orang Tua</span>
          </div>

          <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-2xl">
            <span className="text-2xl">{activeChild.avatar}</span>
            <span className="font-extrabold text-sm text-indigo-950">{activeChild.name}</span>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 pt-6 space-y-6">
        {/* Child Summary Hero */}
        <div className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 text-white rounded-[2rem] p-6 sm:p-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
                Laporan Mingguan
              </span>
              <span className="text-xs text-indigo-200 font-bold">
                Aktivitas Terakhir: {new Date(activeChild.lastActive).toLocaleDateString('id-ID', { dateStyle: 'medium' })}
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
              Perkembangan Belajar {activeChild.name}
            </h2>
            <p className="text-indigo-100 text-sm sm:text-base font-medium mt-1 max-w-xl">
              Pantau pemahaman materi, durasi belajar, dan materi yang membutuhkan pendampingan lebih lanjut.
            </p>
          </div>

          <div className="flex items-center gap-5 bg-white/10 backdrop-blur-md p-4 rounded-3xl border border-white/20 shadow-inner">
            <div className="text-center">
              <span className="block text-3xl font-black text-amber-300">{activeChild.level}</span>
              <span className="text-xs text-indigo-200 font-bold uppercase">Level</span>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div className="text-center">
              <span className="block text-3xl font-black text-yellow-300">{activeChild.xp}</span>
              <span className="text-xs text-indigo-200 font-bold uppercase">Total XP</span>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div className="text-center">
              <span className="block text-3xl font-black text-emerald-300">{activeChild.stars}</span>
              <span className="text-xs text-indigo-200 font-bold uppercase">Bintang</span>
            </div>
          </div>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border-2 border-slate-200/80 p-5 rounded-3xl shadow-sm">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-extrabold uppercase">Waktu Belajar</span>
              <Clock className="w-5 h-5 text-blue-500" />
            </div>
            <div className="text-3xl font-black text-slate-800">{totalMinutes} mnt</div>
            <p className="text-xs text-slate-500 font-bold mt-1">Total durasi sesi belajar</p>
          </div>

          <div className="bg-white border-2 border-slate-200/80 p-5 rounded-3xl shadow-sm">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-extrabold uppercase">Cerita Selesai</span>
              <CheckCircle className="w-5 h-5 text-emerald-500" />
            </div>
            <div className="text-3xl font-black text-slate-800">{activeChild.completedLessons.length}</div>
            <p className="text-xs text-slate-500 font-bold mt-1">Dari 7 cerita kurikulum</p>
          </div>

          <div className="bg-white border-2 border-slate-200/80 p-5 rounded-3xl shadow-sm">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-extrabold uppercase">Soal Dijawab</span>
              <Target className="w-5 h-5 text-purple-500" />
            </div>
            <div className="text-3xl font-black text-slate-800">{totalQuestions}</div>
            <p className="text-xs text-slate-500 font-bold mt-1">{correctCount} jawaban benar</p>
          </div>

          <div className="bg-white border-2 border-slate-200/80 p-5 rounded-3xl shadow-sm">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-extrabold uppercase">Akurasi</span>
              <TrendingUp className="w-5 h-5 text-amber-500" />
            </div>
            <div className="text-3xl font-black text-slate-800">{accuracy}%</div>
            <p className="text-xs text-slate-500 font-bold mt-1">
              {accuracy >= 80 ? 'Sangat Baik 🌟' : 'Perlu Didampingi 📖'}
            </p>
          </div>
        </div>

        {/* Topic Mastery Progress Bars */}
        <div className="bg-white border-2 border-slate-200/80 rounded-[2rem] p-6 sm:p-8 shadow-sm">
          <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-2">
            <Award className="w-6 h-6 text-amber-500" />
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
                <div key={m.topic} className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                    <div>
                      <h4 className="font-black text-slate-900 text-base">{m.title}</h4>
                      <span className="text-xs text-slate-500 font-bold">
                        {m.correctCount} benar dari {m.totalQuestions} percobaan
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-extrabold text-slate-600">{statusText}</span>
                      <span className="text-base font-black text-slate-900">{m.score}%</span>
                    </div>
                  </div>

                  <div className="w-full bg-slate-200 h-3.5 rounded-full overflow-hidden shadow-inner">
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

        {/* Strength & Weakness with Parenting Tips */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-emerald-50/60 border-2 border-emerald-200 p-6 rounded-[2rem]">
            <div className="flex items-center gap-2 text-emerald-800 font-black text-lg mb-3">
              <CheckCircle className="w-6 h-6 text-emerald-600" />
              <span>Materi Yang Dikuasai</span>
            </div>
            {strongTopics.length > 0 ? (
              <ul className="space-y-2.5">
                {strongTopics.map(t => (
                  <li key={t.topic} className="flex items-center justify-between text-sm font-bold bg-white p-3.5 rounded-2xl border border-emerald-200 shadow-sm">
                    <span className="text-slate-800">{t.title}</span>
                    <span className="font-black text-emerald-600">{t.score}%</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-slate-500 font-bold">Belum ada materi dengan skor tinggi. Terus beri semangat!</p>
            )}
          </div>

          <div className="bg-amber-50/60 border-2 border-amber-200 p-6 rounded-[2rem]">
            <div className="flex items-center gap-2 text-amber-800 font-black text-lg mb-3">
              <AlertTriangle className="w-6 h-6 text-amber-600" />
              <span>Materi Perlu Latihan & Tips Pendampingan</span>
            </div>
            {weakTopics.length > 0 ? (
              <div className="space-y-3">
                {weakTopics.slice(0, 2).map(t => (
                  <div key={t.topic} className="bg-white p-4 rounded-2xl border border-amber-200 shadow-sm text-sm">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-black text-slate-900">{t.title}</span>
                      <span className="font-black text-amber-600">{t.score}%</span>
                    </div>
                    <p className="text-xs text-slate-600 font-bold leading-relaxed">
                      💡 <strong>Tips Pendampingan:</strong> Saat di rumah, gunakan benda konkret (seperti buah atau mainan) untuk memperagakan konsep {t.title.toLowerCase()}.
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-emerald-600 font-bold">Luar biasa! Semua materi yang dikerjakan menunjukkan pemahaman baik.</p>
            )}
          </div>
        </div>

        {/* Screen Time & Controls */}
        <div className="bg-white border-2 border-slate-200/80 rounded-[2rem] p-6 shadow-sm">
          <h3 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
            <Settings className="w-5 h-5 text-indigo-600" />
            <span>Pengaturan Waktu Layar Anak</span>
          </h3>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div>
              <h4 className="font-black text-slate-900 text-base">Batas Waktu Belajar Harian</h4>
              <p className="text-xs text-slate-500 font-bold">
                Aplikasi akan memunculkan pesan pengingat istirahat saat batas waktu harian tercapai.
              </p>
            </div>
            <div className="flex gap-2">
              {[15, 30, 45, 60].map(mins => (
                <button
                  key={mins}
                  onClick={() => setScreenTimeLimit(mins)}
                  className={`px-4 py-2 rounded-xl font-black text-xs transition-all ${
                    screenTimeLimit === mins
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-white border border-slate-300 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {mins} menit
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity Log */}
        <div className="bg-white border-2 border-slate-200/80 rounded-[2rem] p-6 shadow-sm">
          <h3 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            <span>Riwayat Aktivitas Belajar Terbaru</span>
          </h3>

          <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
            {attempts.length > 0 ? (
              attempts.map(att => (
                <div
                  key={att.attemptId}
                  className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200 text-sm"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{att.correct ? '✅' : '❌'}</span>
                    <div>
                      <h5 className="font-black text-slate-900">{att.lessonId}</h5>
                      <span className="text-xs text-slate-500 font-bold">
                        {new Date(att.timestamp).toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'short' })} • Percobaan: {att.attemptsCount} {att.hintUsed ? '(Menggunakan Petunjuk)' : ''}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-black text-amber-600 text-sm block">{att.score} Poin</span>
                    <span className="text-xs text-slate-500 font-bold">{att.timeSpentSeconds} detik</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-400 font-bold">Belum ada riwayat aktivitas terbaru.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
