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
  Volume2,
} from 'lucide-react';
import { voiceEngine, NARRATOR_PERSONAS, CHARACTER_VOICES } from '@/lib/audio/voiceEngine';

interface ParentDashboardProps {
  onBackToApp: () => void;
}

export const ParentDashboard: React.FC<ParentDashboardProps> = ({ onBackToApp }) => {
  const [activeChild, setActiveChild] = useState<ChildProfile>(progressStore.getActiveChild());
  const [masteryScores, setMasteryScores] = useState<MasteryScore[]>([]);
  const [attempts, setAttempts] = useState<LessonAttempt[]>([]);
  const [screenTimeLimit, setScreenTimeLimit] = useState<number>(30);
  const [activeVoiceId, setActiveVoiceId] = useState<string>(voiceEngine.getActivePersonaId());
  const [previewingVoice, setPreviewingVoice] = useState<string | null>(null);

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
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b-2 border-slate-200 px-3 sm:px-4 py-2.5 sm:py-3.5 shadow-sm">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-2">
          <button
            onClick={onBackToApp}
            className="candy-btn candy-btn-yellow flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl font-black text-xs sm:text-sm shrink-0"
          >
            <ArrowLeft className="w-4 h-4 stroke-[3]" />
            <span className="hidden sm:inline">Kembali ke Belajar</span>
            <span className="sm:hidden">Kembali</span>
          </button>

          <div className="flex items-center gap-1.5 text-indigo-700 font-black text-xs sm:text-sm uppercase tracking-wide truncate">
            <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 shrink-0" />
            <span className="hidden xs:inline">Dashboard Orang Tua</span>
            <span className="xs:hidden">Orang Tua</span>
          </div>

          <div className="flex items-center gap-1.5 bg-indigo-50 border border-indigo-200 px-2 sm:px-3 py-1 rounded-xl sm:rounded-2xl shrink-0">
            <span className="text-xl sm:text-2xl">{activeChild.avatar}</span>
            <span className="font-extrabold text-xs sm:text-sm text-indigo-950 truncate max-w-[70px] sm:max-w-none">{activeChild.name}</span>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-3 sm:px-4 pt-4 sm:pt-6 space-y-4 sm:space-y-6">
        {/* Child Summary Hero */}
        <div className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 text-white rounded-2xl sm:rounded-[2rem] p-4 sm:p-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="bg-white/20 backdrop-blur-sm text-white text-[10px] sm:text-xs font-black px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full uppercase tracking-wider">
                Laporan Mingguan
              </span>
              <span className="text-[11px] sm:text-xs text-indigo-200 font-bold">
                Aktivitas Terakhir: {new Date(activeChild.lastActive).toLocaleDateString('id-ID', { dateStyle: 'medium' })}
              </span>
            </div>
            <h2 className="text-xl sm:text-4xl font-black tracking-tight">
              Perkembangan Belajar {activeChild.name}
            </h2>
            <p className="text-indigo-100 text-xs sm:text-base font-medium mt-1 max-w-xl">
              Pantau pemahaman materi, durasi belajar, dan materi yang membutuhkan pendampingan lebih lanjut.
            </p>
          </div>

          <div className="flex items-center justify-around sm:justify-center gap-3 sm:gap-5 bg-white/10 backdrop-blur-md p-3 sm:p-4 rounded-2xl sm:rounded-3xl border border-white/20 shadow-inner">
            <div className="text-center">
              <span className="block text-2xl sm:text-3xl font-black text-amber-300">{activeChild.level}</span>
              <span className="text-[10px] sm:text-xs text-indigo-200 font-bold uppercase">Level</span>
            </div>
            <div className="w-px h-8 sm:h-10 bg-white/20" />
            <div className="text-center">
              <span className="block text-2xl sm:text-3xl font-black text-yellow-300">{activeChild.xp}</span>
              <span className="text-[10px] sm:text-xs text-indigo-200 font-bold uppercase">Total XP</span>
            </div>
            <div className="w-px h-8 sm:h-10 bg-white/20" />
            <div className="text-center">
              <span className="block text-2xl sm:text-3xl font-black text-emerald-300">{activeChild.stars}</span>
              <span className="text-[10px] sm:text-xs text-indigo-200 font-bold uppercase">Bintang</span>
            </div>
          </div>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
          <div className="bg-white border-2 border-slate-200/80 p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl shadow-sm">
            <div className="flex items-center justify-between text-slate-500 mb-1 sm:mb-2">
              <span className="text-[10px] sm:text-xs font-extrabold uppercase">Waktu Belajar</span>
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-800">{totalMinutes} mnt</div>
            <p className="text-[10px] sm:text-xs text-slate-500 font-bold mt-0.5 sm:mt-1">Total durasi sesi</p>
          </div>

          <div className="bg-white border-2 border-slate-200/80 p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl shadow-sm">
            <div className="flex items-center justify-between text-slate-500 mb-1 sm:mb-2">
              <span className="text-[10px] sm:text-xs font-extrabold uppercase">Cerita Selesai</span>
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-800">{activeChild.completedLessons.length}</div>
            <p className="text-[10px] sm:text-xs text-slate-500 font-bold mt-0.5 sm:mt-1">Dari kurikulum aktif</p>
          </div>

          <div className="bg-white border-2 border-slate-200/80 p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl shadow-sm">
            <div className="flex items-center justify-between text-slate-500 mb-1 sm:mb-2">
              <span className="text-[10px] sm:text-xs font-extrabold uppercase">Soal Dijawab</span>
              <Target className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-800">{totalQuestions}</div>
            <p className="text-[10px] sm:text-xs text-slate-500 font-bold mt-0.5 sm:mt-1">{correctCount} jawaban benar</p>
          </div>

          <div className="bg-white border-2 border-slate-200/80 p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl shadow-sm">
            <div className="flex items-center justify-between text-slate-500 mb-1 sm:mb-2">
              <span className="text-[10px] sm:text-xs font-extrabold uppercase">Akurasi</span>
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-800">{accuracy}%</div>
            <p className="text-[10px] sm:text-xs text-slate-500 font-bold mt-0.5 sm:mt-1">
              {accuracy >= 80 ? 'Sangat Baik 🌟' : 'Perlu Pendampingan 📖'}
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
        <div className="bg-white border-2 border-slate-200/80 rounded-2xl sm:rounded-[2rem] p-4 sm:p-6 shadow-sm">
          <h3 className="text-lg sm:text-xl font-black text-slate-900 mb-3 sm:mb-4 flex items-center gap-2">
            <Settings className="w-5 h-5 text-indigo-600" />
            <span>Pengaturan Waktu Layar Anak</span>
          </h3>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="min-w-0">
              <h4 className="font-black text-slate-900 text-sm sm:text-base">Batas Waktu Belajar Harian</h4>
              <p className="text-xs text-slate-500 font-bold leading-relaxed">
                Aplikasi akan memunculkan pesan pengingat istirahat saat batas waktu harian tercapai.
              </p>
            </div>
            <div className="grid grid-cols-4 gap-1.5 sm:gap-2 w-full sm:w-auto shrink-0 mt-1 sm:mt-0">
              {[15, 30, 45, 60].map(mins => (
                <button
                  key={mins}
                  onClick={() => setScreenTimeLimit(mins)}
                  className={`py-2 px-1 sm:px-3.5 rounded-xl font-black text-center transition-all active:scale-95 ${
                    screenTimeLimit === mins
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-white border border-slate-300 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <span className="block leading-none text-xs sm:text-sm">{mins}</span>
                  <span className="block text-[9px] sm:text-[10px] font-bold opacity-80 mt-0.5">menit</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Voice Persona Controls in Parent Dashboard */}
        <div className="bg-white border-2 border-slate-200/80 rounded-2xl sm:rounded-[2rem] p-4 sm:p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3 sm:mb-4">
            <h3 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
              <Volume2 className="w-5 h-5 text-purple-600" />
              <span>Sistem Suara Terpisah (Narator & Karakter)</span>
            </h3>
            <span className="text-xs bg-purple-100 text-purple-800 font-bold px-3 py-1 rounded-full w-fit">
              Suara Karakter & Narator Dibedakan
            </span>
          </div>

          <p className="text-xs text-slate-500 font-bold mb-4 leading-relaxed">
            Aplikasi secara otomatis membedakan suara Narator yang membacakan alur cerita dengan suara karakter anak (Budi & Siti) yang berbicara di dalam animasi.
          </p>

          {/* Sub-section: Animation Characters */}
          <div className="mb-5 bg-amber-50/50 p-4 rounded-2xl border border-amber-200">
            <h4 className="text-xs font-black text-amber-950 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <span>🎭</span>
              <span>Suara Karakter Animasi (Otomatis & Terpisah)</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CHARACTER_VOICES.slice(0, 2).map((c) => {
                const isPlaying = previewingVoice === `char_${c.id}`;
                return (
                  <div
                    key={c.id}
                    className="bg-white p-3 rounded-xl border border-amber-200 shadow-xs flex items-center justify-between gap-2"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-2xl">{c.icon}</span>
                      <div className="min-w-0">
                        <h5 className="font-black text-xs sm:text-sm text-slate-900 truncate">{c.name}</h5>
                        <p className="text-[10px] text-slate-500 font-bold truncate">{c.description}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setPreviewingVoice(`char_${c.id}`);
                        voiceEngine.previewSpeaker(c.id as 'budi' | 'siti').finally(() => {
                          setPreviewingVoice(null);
                        });
                      }}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-black flex items-center gap-1 shrink-0 transition-all ${
                        isPlaying
                          ? 'bg-emerald-500 text-white animate-pulse'
                          : 'bg-amber-100 text-amber-900 hover:bg-amber-200'
                      }`}
                    >
                      <span>{isPlaying ? '🔊' : '▶️'}</span>
                      <span className="text-[10px]">{isPlaying ? 'Bicara...' : 'Tes'}</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sub-section: Narrator Personas */}
          <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
            <span>📖</span>
            <span>Pilihan Suara Narator (Pembaca Alur & Soal)</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {NARRATOR_PERSONAS.map((p) => {
              const isSelected = activeVoiceId === p.id;
              const isPlaying = previewingVoice === `narrator_${p.id}`;
              return (
                <div
                  key={p.id}
                  onClick={() => {
                    setActiveVoiceId(p.id);
                    voiceEngine.setPersona(p.id);
                  }}
                  className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all active:scale-[0.98] ${
                    isSelected
                      ? 'bg-purple-50 border-purple-400 shadow-sm ring-2 ring-purple-300'
                      : 'bg-slate-50 border-slate-200 hover:border-purple-200 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-2xl">{p.icon}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setPreviewingVoice(`narrator_${p.id}`);
                        voiceEngine.speak(p.sampleText, {
                          pitch: p.pitch,
                          rate: p.rate,
                          speaker: 'narrator',
                          onEnd: () => setPreviewingVoice(null),
                        });
                      }}
                      className={`px-2 py-1 rounded-lg text-xs font-black flex items-center gap-1 transition-all ${
                        isPlaying
                          ? 'bg-emerald-500 text-white animate-pulse'
                          : 'bg-white border border-slate-300 text-slate-700 hover:bg-purple-100'
                      }`}
                      title="Tes Suara Narator"
                    >
                      <span>{isPlaying ? '🔊' : '▶️'}</span>
                      <span className="text-[10px]">{isPlaying ? 'Bicara...' : 'Tes'}</span>
                    </button>
                  </div>
                  <h4 className="font-black text-sm text-slate-900">{p.name}</h4>
                  <p className="text-[10px] text-purple-700 font-bold uppercase">{p.role}</p>
                  <p className="text-[11px] text-slate-500 font-medium mt-1 line-clamp-2">{p.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Activity Log */}
        <div className="bg-white border-2 border-slate-200/80 rounded-2xl sm:rounded-[2rem] p-4 sm:p-6 shadow-sm">
          <h3 className="text-lg sm:text-xl font-black text-slate-900 mb-3 sm:mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            <span>Riwayat Aktivitas Belajar Terbaru</span>
          </h3>

          <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
            {attempts.length > 0 ? (
              attempts.map(att => (
                <div
                  key={att.attemptId}
                  className="flex items-center justify-between gap-2 p-3 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200 text-sm"
                >
                  <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                    <span className="text-xl sm:text-2xl shrink-0">{att.correct ? '✅' : '❌'}</span>
                    <div className="min-w-0 flex-1">
                      <h5 className="font-black text-slate-900 text-xs sm:text-sm truncate">{att.lessonId}</h5>
                      <span className="text-[11px] sm:text-xs text-slate-500 font-bold block truncate">
                        {new Date(att.timestamp).toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'short' })} • Percobaan: {att.attemptsCount} {att.hintUsed ? '(Petunjuk)' : ''}
                      </span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-black text-amber-600 text-xs sm:text-sm block">{att.score} Poin</span>
                    <span className="text-[10px] sm:text-xs text-slate-500 font-bold">{att.timeSpentSeconds} detik</span>
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
