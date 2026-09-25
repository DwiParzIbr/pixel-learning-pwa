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
      alert(`Level ini masih terkunci! Butuh ${level.requiredXp} XP (XP kamu saat ini: ${activeChild.xp} XP). Selesaikan petualangan sebelumnya yuk!`);
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

  const xpProgressToNext = (activeChild.xp % 100);

  // Find current active level index
  const currentLevelIndex = mockLevels.findIndex(lvl => activeChild.xp >= lvl.requiredXp && !activeChild.completedLessons.some(id => lvl.lessons.some(l => l.lessonId === id)));
  const activePinIdx = currentLevelIndex !== -1 ? currentLevelIndex : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 via-yellow-50/50 to-emerald-50 text-slate-800 font-fun pb-20 select-none">
      {/* Top Friendly Child Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b-3 border-amber-200 px-4 py-3 shadow-[0_4px_16px_rgba(0,0,0,0.05)]">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
          {/* Child Profile Pill */}
          <div
            onClick={() => {
              soundEngine.playSfx('click');
              setShowProfileModal(true);
            }}
            className="flex items-center gap-3 bg-amber-50 hover:bg-amber-100/80 border-3 border-amber-300 rounded-3xl px-3.5 py-1.5 cursor-pointer transition-all active:scale-95 shadow-sm"
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
              {/* XP Progress Bar */}
              <div className="flex items-center gap-2 mt-1">
                <div className="w-24 sm:w-32 bg-amber-200/80 h-3 rounded-full overflow-hidden border border-amber-300 shadow-inner">
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
            {/* Stars Pill */}
            <div className="flex items-center gap-1.5 bg-yellow-100 border-2 border-yellow-300 px-3 py-1.5 rounded-2xl text-yellow-900 font-black text-sm shadow-sm">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-400" />
              <span>{activeChild.stars}</span>
            </div>

            {/* Streak Pill */}
            <div className="flex items-center gap-1.5 bg-rose-100 border-2 border-rose-300 px-3 py-1.5 rounded-2xl text-rose-900 font-black text-sm shadow-sm">
              <Flame className="w-5 h-5 text-rose-500 fill-rose-400" />
              <span>{activeChild.streakDays} Hari</span>
            </div>

            {/* Badges Trophy Button */}
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

            {/* Parent Mode Gate Button */}
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

            {/* Admin Studio Button */}
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
      <section className="max-w-5xl mx-auto px-4 pt-6 pb-2">
        <div className="bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 border-4 border-white rounded-[2.5rem] p-6 sm:p-8 shadow-[0_16px_32px_rgba(59,130,246,0.25)] relative overflow-hidden text-white">
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-white font-extrabold text-xs uppercase tracking-wider mb-2">
                <Compass className="w-4 h-4" />
                <span>World 1: Petualangan Matematika</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-wide drop-shadow">
                Pulau Angka Ajaib! 🏝️
              </h1>
              <p className="text-white/95 text-base sm:text-lg font-bold mt-2 max-w-xl leading-relaxed">
                Pilih pulau petualanganmu, nikmati cerita seru bersama Budi & Siti, dan kumpulkan bintang pahlawan!
              </p>
            </div>

            <div className="shrink-0 flex items-center justify-center">
              <div className="w-24 h-24 sm:w-28 sm:h-28 bg-white/25 rounded-[2rem] border-3 border-white/60 flex items-center justify-center text-5xl sm:text-6xl shadow-xl animate-float-kid">
                🗺️
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Winding Island Adventure Trail */}
      <section className="max-w-3xl mx-auto px-4 py-8">
        <div className="relative flex flex-col items-center gap-7">
          {/* Playful Dotted Adventure Path */}
          <div className="absolute top-12 bottom-12 w-4 border-l-4 border-dashed border-amber-300 -z-0 opacity-80" />

          {mockLevels.map((lvl, index) => {
            const isUnlocked = activeChild.xp >= lvl.requiredXp;
            const isCompleted = activeChild.completedLessons.some(id =>
              lvl.lessons.some(l => l.lessonId === id)
            );
            const isCurrentPin = activePinIdx === index;
            const isEven = index % 2 === 0;

            const themeCardColors = [
              'border-rose-400 bg-white hover:bg-rose-50/50 shadow-rose-200',
              'border-amber-400 bg-white hover:bg-amber-50/50 shadow-amber-200',
              'border-sky-400 bg-white hover:bg-sky-50/50 shadow-sky-200',
              'border-emerald-400 bg-white hover:bg-emerald-50/50 shadow-emerald-200',
              'border-orange-400 bg-white hover:bg-orange-50/50 shadow-orange-200',
              'border-pink-400 bg-white hover:bg-pink-50/50 shadow-pink-200',
              'border-purple-400 bg-white hover:bg-purple-50/50 shadow-purple-200',
            ];

            return (
              <div
                key={lvl.id}
                className={`relative z-10 w-full flex ${
                  isEven ? 'justify-start sm:pl-10' : 'justify-end sm:pr-10'
                }`}
              >
                {/* Active Child Standing Pin */}
                {isCurrentPin && (
                  <div className={`absolute -top-7 ${isEven ? 'left-6 sm:left-16' : 'right-6 sm:right-16'} z-20 flex flex-col items-center animate-bounceSubtle`}>
                    <span className="bg-amber-400 text-amber-950 font-black text-xs px-3 py-1 rounded-full shadow-lg border-2 border-white flex items-center gap-1">
                      <span>{activeChild.avatar}</span>
                      <span>PETUALANGAN KITA!</span>
                    </span>
                    <div className="w-0 h-0 border-l-6 border-l-transparent border-r-6 border-r-transparent border-t-6 border-t-amber-400" />
                  </div>
                )}

                {/* Level Island Card */}
                <div
                  onClick={() => handleSelectLevel(lvl)}
                  className={`w-full max-w-md p-5 rounded-[2rem] border-4 transition-all cursor-pointer shadow-[0_10px_24px_rgba(0,0,0,0.06)] relative group active:scale-[0.98]
                    ${isUnlocked
                      ? isCompleted
                        ? 'border-emerald-400 bg-white hover:bg-emerald-50/40 shadow-emerald-100 scale-[1.01]'
                        : `${themeCardColors[index % themeCardColors.length]} ${isCurrentPin ? 'ring-4 ring-amber-300 ring-offset-2' : ''}`
                      : 'border-slate-300 bg-slate-100/80 opacity-70 cursor-not-allowed shadow-none'
                    }`}
                >
                  <div className="flex items-center gap-4">
                    {/* Level Icon Badge */}
                    <div
                      className={`w-18 h-18 rounded-[1.6rem] flex items-center justify-center text-4xl shrink-0 border-3 shadow-md
                        ${isUnlocked
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
                            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl sm:text-2xl font-black text-slate-800 truncate">
                        {lvl.title.split('—')[1] || lvl.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 font-bold line-clamp-1 mt-0.5">
                        {lvl.subtitle}
                      </p>

                      <div className="flex items-center justify-between mt-3 pt-2.5 border-t-2 border-slate-100">
                        <span className="text-xs font-extrabold text-slate-500">
                          {isUnlocked ? '🌟 Siap Dimainkan!' : `🔒 Butuh ${lvl.requiredXp} XP`}
                        </span>

                        {isUnlocked && (
                          <span className="candy-btn candy-btn-yellow px-4 py-1.5 rounded-xl text-xs font-black flex items-center gap-1 shadow-sm">
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

      {/* Profile Switcher Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-pop-in">
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
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-pop-in">
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
