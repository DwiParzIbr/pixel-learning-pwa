'use client';

import React, { useState, useEffect } from 'react';
import { LevelDef, ChildProfile, StoryLesson } from '@/types/story';
import { mockLevels, canonicalSubtractionLesson } from '@/data/mockLessons';
import { progressStore, availableBadges } from '@/lib/progress/progressStore';
import { soundEngine } from '@/lib/audio/soundEngine';
import {
  Sparkles,
  Trophy,
  Flame,
  Star,
  Lock,
  Play,
  Users,
  Shield,
  Plus,
  Compass,
  CheckCircle2,
} from 'lucide-react';

interface WorldMapProps {
  onSelectLesson: (lesson: StoryLesson) => void;
  onOpenParentDashboard: () => void;
  onOpenAdminStudio: () => void;
}

export const WorldMap: React.FC<WorldMapProps> = ({
  onSelectLesson,
  onOpenParentDashboard,
  onOpenAdminStudio,
}) => {
  const [activeChild, setActiveChild] = useState<ChildProfile>(progressStore.getActiveChild());
  const [profiles, setProfiles] = useState<ChildProfile[]>(progressStore.getProfiles());
  const [showProfileModal, setShowProfileModal] = useState<boolean>(false);
  const [showBadgesModal, setShowBadgesModal] = useState<boolean>(false);
  const [newChildName, setNewChildName] = useState<string>('');
  const [selectedAvatar, setSelectedAvatar] = useState<string>('👦');

  useEffect(() => {
    const unsub = progressStore.subscribe(() => {
      setActiveChild(progressStore.getActiveChild());
      setProfiles(progressStore.getProfiles());
    });
    return unsub;
  }, []);

  const handleSelectLevel = (level: LevelDef) => {
    const isUnlocked = activeChild.xp >= level.requiredXp;
    if (!isUnlocked) {
      soundEngine.playSfx('wrong_gentle');
      alert(`Level ini masih terkunci! Butuh ${level.requiredXp} XP (XP kamu saat ini: ${activeChild.xp} XP). Selesaikan level sebelumnya dulu ya!`);
      return;
    }
    soundEngine.playSfx('click');
    const lessonToPlay = level.lessons[0] || canonicalSubtractionLesson;
    onSelectLesson(lessonToPlay);
  };

  const handleCreateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChildName.trim()) return;
    const newP = progressStore.createChildProfile(newChildName.trim(), 7, selectedAvatar);
    setActiveChild(newP);
    setNewChildName('');
    setShowProfileModal(false);
    soundEngine.playSfx('celebrate');
  };

  const xpProgressToNext = activeChild.xp % 100;

  const currentLevelIndex = mockLevels.findIndex(
    lvl => activeChild.xp >= lvl.requiredXp && !activeChild.completedLessons.some(id => lvl.lessons.some(l => l.lessonId === id))
  );
  const activePinIdx = currentLevelIndex !== -1 ? currentLevelIndex : 0;

  const levelColorThemes = [
    { border: 'border-rose-400', badgeBg: 'bg-rose-100 text-rose-800', btn: 'candy-btn-yellow', path: '#f43f5e' },
    { border: 'border-amber-400', badgeBg: 'bg-amber-100 text-amber-900', btn: 'candy-btn-yellow', path: '#f59e0b' },
    { border: 'border-sky-400', badgeBg: 'bg-sky-100 text-sky-800', btn: 'candy-btn-blue', path: '#0ea5e9' },
    { border: 'border-emerald-400', badgeBg: 'bg-emerald-100 text-emerald-800', btn: 'candy-btn-green', path: '#10b981' },
    { border: 'border-orange-400', badgeBg: 'bg-orange-100 text-orange-800', btn: 'candy-btn-orange', path: '#f97316' },
    { border: 'border-pink-400', badgeBg: 'bg-pink-100 text-pink-800', btn: 'candy-btn-pink', path: '#ec4899' },
    { border: 'border-purple-400', badgeBg: 'bg-purple-100 text-purple-800', btn: 'candy-btn-purple', path: '#8b5cf6' },
  ];

  return (
    <div className="min-h-screen text-slate-800 font-fun pb-24 select-none relative overflow-hidden bg-gradient-to-b from-sky-300 via-sky-100 to-emerald-100">
      {/* Decorative Cartoon Floating Clouds */}
      <div className="absolute top-16 left-8 w-44 h-16 bg-white/70 rounded-full blur-[1px] -z-0 pointer-events-none animate-float-kid" />
      <div className="absolute top-44 right-12 w-56 h-20 bg-white/80 rounded-full blur-[1px] -z-0 pointer-events-none animate-float-kid" style={{ animationDelay: '1.5s' }} />
      <div className="absolute top-96 left-16 w-48 h-16 bg-white/60 rounded-full blur-[1px] -z-0 pointer-events-none animate-float-kid" style={{ animationDelay: '2.5s' }} />
      <div className="absolute top-[600px] right-20 w-64 h-22 bg-white/70 rounded-full blur-[1px] -z-0 pointer-events-none animate-float-kid" />

      {/* Smiling Cartoon Sun on Top Right */}
      <div className="absolute top-6 right-6 w-20 h-20 bg-yellow-300 rounded-full border-4 border-yellow-400 shadow-[0_0_40px_rgba(253,224,71,0.8)] -z-0 pointer-events-none flex items-center justify-center text-3xl">
        ☀️
      </div>

      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-4 border-amber-300 px-4 py-3 shadow-[0_4px_16px_rgba(0,0,0,0.06)]">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
          {/* Child Profile Pill */}
          <div
            onClick={() => {
              soundEngine.playSfx('click');
              setShowProfileModal(true);
            }}
            className="flex items-center gap-3 bg-amber-50 hover:bg-amber-100/90 border-3 border-amber-300 rounded-3xl px-3.5 py-1.5 cursor-pointer transition-all active:scale-95 shadow-sm"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-300 to-amber-500 border-2 border-white flex items-center justify-center text-2xl shadow">
              {activeChild.avatar}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-slate-800 text-base">{activeChild.name}</span>
                <span className="bg-amber-400 text-amber-950 font-black text-xs px-2 py-0.5 rounded-full shadow-inner">
                  Level {activeChild.level}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-24 sm:w-32 bg-amber-200/90 h-3 rounded-full overflow-hidden border border-amber-300 shadow-inner">
                  <div
                    className="bg-gradient-to-r from-amber-400 to-yellow-400 h-full rounded-full transition-all duration-500"
                    style={{ width: `${xpProgressToNext}%` }}
                  />
                </div>
                <span className="text-xs font-black text-amber-800">{activeChild.xp} XP</span>
              </div>
            </div>
          </div>

          {/* Child Stats & Badges */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-1.5 bg-yellow-100 border-2 border-yellow-300 px-3 py-1.5 rounded-2xl text-yellow-900 font-black text-sm shadow-sm">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-400" />
              <span>{activeChild.stars}</span>
            </div>

            <div className="flex items-center gap-1.5 bg-rose-100 border-2 border-rose-300 px-3 py-1.5 rounded-2xl text-rose-900 font-black text-sm shadow-sm">
              <Flame className="w-5 h-5 text-rose-500 fill-rose-400" />
              <span>{activeChild.streakDays}h</span>
            </div>

            <button
              onClick={() => {
                soundEngine.playSfx('click');
                setShowBadgesModal(true);
              }}
              className="candy-btn candy-btn-yellow p-2.5 rounded-2xl"
              title="Lencana Koleksi"
            >
              <Trophy className="w-5 h-5" />
            </button>

            <button
              onClick={() => {
                soundEngine.playSfx('click');
                onOpenParentDashboard();
              }}
              className="candy-btn candy-btn-purple flex items-center gap-1.5 px-3.5 py-2 rounded-2xl font-extrabold text-xs sm:text-sm"
              title="Khusus Orang Tua"
            >
              <Shield className="w-4 h-4" />
              <span className="hidden sm:inline">Orang Tua</span>
            </button>

            <button
              onClick={() => {
                soundEngine.playSfx('click');
                onOpenAdminStudio();
              }}
              className="hidden md:flex candy-btn bg-slate-100 border-b-4 border-slate-300 text-slate-700 px-3 py-2 rounded-2xl text-xs font-extrabold"
            >
              <span>Admin</span>
            </button>
          </div>
        </div>
      </header>

      {/* World Hero Island Banner */}
      <section className="max-w-5xl mx-auto px-4 pt-6 pb-2 relative z-10">
        <div className="bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 border-4 border-white rounded-[2.5rem] p-6 sm:p-8 shadow-[0_12px_24px_rgba(59,130,246,0.3)] relative overflow-hidden text-white">
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/25 backdrop-blur-md px-4 py-1.5 rounded-full text-white font-black text-xs uppercase tracking-wider mb-2.5 shadow-sm">
                <Compass className="w-4 h-4" />
                <span>World 1: Petualangan Matematika</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-wide drop-shadow-md">
                Jelajahi Pulau Angka! 🏝️
              </h1>
              <p className="text-white text-base sm:text-lg font-bold mt-2 max-w-xl leading-relaxed drop-shadow-sm">
                Pilih pulau petualanganmu, nikmati cerita seru bersama Budi & Siti, dan kumpulkan bintang pahlawan!
              </p>
            </div>

            <div className="shrink-0 flex items-center justify-center">
              <div className="w-24 h-24 sm:w-28 sm:h-28 bg-white/30 rounded-[2rem] border-3 border-white/70 flex items-center justify-center text-5xl sm:text-6xl shadow-xl animate-float-kid">
                🗺️
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Adventure Trail Path with Cartoon Stepping Stones */}
      <section className="max-w-3xl mx-auto px-4 py-8 relative z-10">
        <div className="relative flex flex-col items-center gap-8">
          {/* Stepping Stone Connector Line */}
          <div className="absolute top-12 bottom-12 w-6 bg-gradient-to-b from-amber-300 via-emerald-300 to-yellow-400 rounded-full border-3 border-amber-400/80 shadow-md -z-0" />

          {mockLevels.map((lvl, index) => {
            const isUnlocked = activeChild.xp >= lvl.requiredXp;
            const isCompleted = activeChild.completedLessons.some(id =>
              lvl.lessons.some(l => l.lessonId === id)
            );
            const isCurrentPin = activePinIdx === index;
            const isEven = index % 2 === 0;
            const theme = levelColorThemes[index % levelColorThemes.length];

            return (
              <div
                key={lvl.id}
                className={`relative z-10 w-full flex ${
                  isEven ? 'justify-start sm:pl-10' : 'justify-end sm:pr-10'
                }`}
              >
                {/* Active Child Pin Mascot */}
                {isCurrentPin && (
                  <div className={`absolute -top-9 ${isEven ? 'left-8 sm:left-18' : 'right-8 sm:right-18'} z-20 flex flex-col items-center animate-bounceSubtle`}>
                    <span className="bg-gradient-to-r from-amber-400 to-yellow-400 text-amber-950 font-black text-xs px-3.5 py-1.5 rounded-full shadow-[0_4px_12px_rgba(245,158,11,0.5)] border-2 border-white flex items-center gap-1.5">
                      <span className="text-base">{activeChild.avatar}</span>
                      <span>PETUALANGAN KITA!</span>
                    </span>
                    <div className="w-0 h-0 border-l-6 border-l-transparent border-r-6 border-r-transparent border-t-8 border-t-amber-400" />
                  </div>
                )}

                {/* Level Island Card */}
                <div
                  onClick={() => handleSelectLevel(lvl)}
                  className={`w-full max-w-md p-5 rounded-[2.2rem] border-4 transition-all cursor-pointer relative group active:scale-[0.98] ${
                    isUnlocked
                      ? isCompleted
                        ? 'border-emerald-400 bg-white shadow-[0_10px_0_#10b981]'
                        : isCurrentPin
                        ? `${theme.border} bg-white shadow-[0_10px_0_#f59e0b] ring-4 ring-amber-300 ring-offset-2`
                        : `${theme.border} bg-white shadow-[0_8px_0_rgba(0,0,0,0.08)] hover:-translate-y-1`
                      : 'border-slate-300 bg-slate-100/90 opacity-60 cursor-not-allowed shadow-none'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {/* Level Icon Badge */}
                    <div
                      className={`w-18 h-18 rounded-[1.6rem] flex items-center justify-center text-4xl shrink-0 border-3 shadow-sm ${
                        isUnlocked
                          ? isCompleted
                            ? 'bg-emerald-100 border-emerald-400 text-emerald-800'
                            : 'bg-amber-100 border-amber-400 text-amber-900 animate-wiggle'
                          : 'bg-slate-200 border-slate-300 text-slate-400'
                      }`}
                    >
                      {isUnlocked ? lvl.icon : <Lock className="w-8 h-8 text-slate-400" />}
                    </div>

                    {/* Level Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="bg-slate-100 border border-slate-300 text-slate-700 font-extrabold text-[11px] px-2.5 py-0.5 rounded-full uppercase">
                          {lvl.title.split('—')[0]}
                        </span>
                        {isCompleted && (
                          <span className="bg-emerald-500 text-white font-black text-xs px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                            <span>Selesai</span>
                            <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl sm:text-2xl font-black text-slate-900 truncate">
                        {lvl.title.split('—')[1] || lvl.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 font-bold line-clamp-1 mt-0.5">
                        {lvl.subtitle}
                      </p>

                      <div className="flex items-center justify-between mt-3 pt-2.5 border-t-2 border-slate-100">
                        <div className="flex items-center gap-1 text-yellow-400">
                          {isCompleted ? (
                            <>
                              <Star className="w-4 h-4 fill-yellow-400" />
                              <Star className="w-4 h-4 fill-yellow-400" />
                              <Star className="w-4 h-4 fill-yellow-400" />
                            </>
                          ) : (
                            <span className="text-xs font-black text-slate-500">
                              {isUnlocked ? '🌟 Siap Dimainkan!' : `🔒 Butuh ${lvl.requiredXp} XP`}
                            </span>
                          )}
                        </div>

                        {isUnlocked && (
                          <span className={`candy-btn ${theme.btn} px-4 py-1.5 rounded-xl text-xs font-black flex items-center gap-1 shadow-sm`}>
                            <Play className="w-3.5 h-3.5 fill-current" />
                            <span>Mulai</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Rolling Cartoon Meadow Hills Ground Layer at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-emerald-400 via-emerald-300 to-transparent -z-0 pointer-events-none opacity-80" />

      {/* Profile Switcher Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 animate-pop-in">
          <div className="bg-white border-4 border-amber-300 rounded-[2.5rem] p-6 max-w-md w-full shadow-2xl text-slate-800">
            <h3 className="text-2xl font-black text-slate-800 mb-4 flex items-center gap-2">
              <Users className="w-7 h-7 text-amber-500" />
              <span>Pilih Teman Belajar</span>
            </h3>

            <div className="space-y-3 mb-6 max-h-60 overflow-y-auto pr-1">
              {profiles.map(p => (
                <div
                  key={p.id}
                  onClick={() => {
                    progressStore.setActiveChild(p.id);
                    setShowProfileModal(false);
                    soundEngine.playSfx('click');
                  }}
                  className={`flex items-center justify-between p-3.5 rounded-2xl border-3 cursor-pointer transition-all active:scale-95 ${
                    p.id === activeChild.id
                      ? 'bg-amber-100 border-amber-400 shadow-md'
                      : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{p.avatar}</span>
                    <div>
                      <h4 className="font-extrabold text-base text-slate-900">{p.name}</h4>
                      <p className="text-xs text-amber-800 font-bold">
                        Level {p.level} • {p.xp} XP • {p.completedLessons.length} Cerita
                      </p>
                    </div>
                  </div>
                  {p.id === activeChild.id && (
                    <span className="text-xs bg-amber-400 text-amber-950 font-black px-3 py-1 rounded-full shadow-sm">
                      Aktif
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Create New Profile Form */}
            <form onSubmit={handleCreateProfile} className="border-t-2 border-slate-100 pt-4">
              <span className="block text-xs font-black text-slate-500 mb-2 uppercase">
                Tambah Teman Baru
              </span>
              <div className="flex gap-2 mb-3">
                {['👦', '👧', '🦊', '🦁', '🚀', '🐼'].map(emoji => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => setSelectedAvatar(emoji)}
                    className={`w-11 h-11 rounded-2xl text-2xl border-2 flex items-center justify-center transition-all ${
                      selectedAvatar === emoji
                        ? 'bg-amber-300 border-amber-500 scale-110 shadow-md'
                        : 'bg-slate-100 border-slate-200'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Nama panggilan..."
                  value={newChildName}
                  onChange={e => setNewChildName(e.target.value)}
                  className="flex-1 bg-slate-100 border-2 border-slate-200 rounded-2xl px-4 py-2.5 font-bold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-400"
                />
                <button
                  type="submit"
                  className="candy-btn candy-btn-yellow font-black px-5 py-2.5 rounded-2xl flex items-center gap-1"
                >
                  <Plus className="w-5 h-5" />
                  <span>Tambah</span>
                </button>
              </div>
            </form>

            <button
              onClick={() => setShowProfileModal(false)}
              className="w-full mt-4 py-2 text-sm font-bold text-slate-500 hover:text-slate-800"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      {/* Badges Collection Modal */}
      {showBadgesModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 animate-pop-in">
          <div className="bg-white border-4 border-amber-300 rounded-[2.5rem] p-6 sm:p-8 max-w-lg w-full shadow-2xl text-slate-800">
            <h3 className="text-2xl font-black text-slate-800 mb-4 flex items-center gap-2">
              <Trophy className="w-8 h-8 text-yellow-500" />
              <span>Koleksi Lencana Pahlawan</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 max-h-80 overflow-y-auto pr-1">
              {availableBadges.map(badge => {
                const isEarned = activeChild.badges.includes(badge.id);
                return (
                  <div
                    key={badge.id}
                    className={`p-3.5 rounded-2xl border-2 text-center flex flex-col items-center justify-center transition-all ${
                      isEarned
                        ? 'bg-amber-50 border-amber-300 shadow-md'
                        : 'bg-slate-50 border-slate-200 opacity-40 grayscale'
                    }`}
                  >
                    <span className="text-4xl mb-1">{badge.icon}</span>
                    <h5 className="font-extrabold text-sm text-slate-900">{badge.title}</h5>
                    <p className="text-xs text-slate-500 font-bold mt-1 line-clamp-2">
                      {badge.description}
                    </p>
                    {isEarned && (
                      <span className="mt-2 text-[10px] bg-amber-400 text-amber-950 font-black px-2.5 py-0.5 rounded-full shadow-sm">
                        Diraih! ⭐
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => setShowBadgesModal(false)}
              className="w-full mt-6 candy-btn candy-btn-yellow py-3 rounded-2xl font-black text-base"
            >
              Kembali ke Petualangan
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
