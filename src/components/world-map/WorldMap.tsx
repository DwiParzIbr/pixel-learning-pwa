'use client';

import React, { useState, useEffect } from 'react';
import { LevelDef, ChildProfile, BadgeDef, StoryLesson } from '@/types/story';
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
  Award,
  ChevronRight,
  Plus,
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
      alert(`Level ini masih terkunci! Butuh ${level.requiredXp} XP (XP kamu saat ini: ${activeChild.xp} XP). Selesaikan level sebelumnya ya!`);
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

  return (
    <div className="min-h-screen bg-slate-950 text-white font-fun pb-16 select-none">
      {/* Top Child Header */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b-2 border-slate-800 px-4 py-3 shadow-xl">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
          {/* Child Profile Info */}
          <div
            onClick={() => {
              soundEngine.playSfx('click');
              setShowProfileModal(true);
            }}
            className="flex items-center gap-3 bg-slate-800/80 hover:bg-slate-700/80 border-2 border-slate-700 rounded-2xl px-3 py-1.5 cursor-pointer transition-all active:scale-95"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-400 flex items-center justify-center text-2xl shadow">
              {activeChild.avatar}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-white text-sm sm:text-base">{activeChild.name}</span>
                <span className="bg-amber-400 text-slate-950 font-pixel text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                  Lv.{activeChild.level}
                </span>
              </div>
              {/* XP Bar */}
              <div className="flex items-center gap-2 mt-0.5">
                <div className="w-20 sm:w-28 bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-700">
                  <div
                    className="bg-gradient-to-r from-amber-400 to-yellow-300 h-full rounded-full transition-all duration-500"
                    style={{ width: `${xpProgressToNext}%` }}
                  />
                </div>
                <span className="text-[10px] font-pixel text-amber-300">{activeChild.xp} XP</span>
              </div>
            </div>
          </div>

          {/* Stats & Quick Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Stars */}
            <div className="flex items-center gap-1 bg-amber-950/70 border border-amber-600/70 px-2.5 py-1.5 rounded-xl text-amber-300 font-pixel text-xs">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>{activeChild.stars}</span>
            </div>

            {/* Streak */}
            <div className="flex items-center gap-1 bg-rose-950/70 border border-rose-600/70 px-2.5 py-1.5 rounded-xl text-rose-300 font-pixel text-xs">
              <Flame className="w-4 h-4 text-rose-400 fill-rose-400" />
              <span>{activeChild.streakDays}h</span>
            </div>

            {/* Badges Button */}
            <button
              onClick={() => {
                soundEngine.playSfx('click');
                setShowBadgesModal(true);
              }}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-amber-400 active:scale-95 transition-all"
              title="Lencana Penghargaan"
            >
              <Trophy className="w-5 h-5" />
            </button>

            {/* Parent Mode Gate Button */}
            <button
              onClick={() => {
                soundEngine.playSfx('click');
                onOpenParentDashboard();
              }}
              className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-xl text-xs font-bold border border-indigo-400/50 shadow-md active:scale-95 transition-all"
              title="Dashboard Orang Tua"
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
              className="hidden md:flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-xl text-xs font-bold border border-slate-700"
            >
              <span>Admin Studio</span>
            </button>
          </div>
        </div>
      </header>

      {/* World Hero Banner */}
      <section className="max-w-5xl mx-auto px-4 pt-6 pb-2">
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 border-4 border-amber-400/80 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-amber-400 text-slate-950 font-pixel text-xs px-2.5 py-1 rounded-full font-bold">
                  WORLD 1
                </span>
                <span className="text-amber-300 font-pixel text-xs">PETUALANGAN MATEMATIKA</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-wide">
                Jelajahi Negeri Pixel Matematika!
              </h1>
              <p className="text-slate-200 text-sm sm:text-base mt-2 max-w-xl">
                Belajar matematika lewat petualangan seru bersama Budi dan Siti. Selesaikan tiap cerita dan raih lencana pahlawan!
              </p>
            </div>

            <div className="shrink-0 flex items-center justify-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-amber-400/20 rounded-3xl border-2 border-amber-400 flex items-center justify-center text-4xl sm:text-5xl shadow-inner animate-float">
                🗺️
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* World Map Progression Path */}
      <section className="max-w-3xl mx-auto px-4 py-8">
        <div className="relative flex flex-col items-center gap-6">
          {/* Connecting Line */}
          <div className="absolute top-10 bottom-10 w-3 bg-gradient-to-b from-amber-400 via-emerald-400 to-purple-500 rounded-full -z-0 opacity-40" />

          {mockLevels.map((lvl, index) => {
            const isUnlocked = activeChild.xp >= lvl.requiredXp;
            const isCompleted = activeChild.completedLessons.some(id =>
              lvl.lessons.some(l => l.lessonId === id)
            );
            const isEven = index % 2 === 0;

            return (
              <div
                key={lvl.id}
                className={`relative z-10 w-full flex ${
                  isEven ? 'justify-start sm:pl-12' : 'justify-end sm:pr-12'
                }`}
              >
                <div
                  onClick={() => handleSelectLevel(lvl)}
                  className={`w-full max-w-md p-4 sm:p-5 rounded-3xl border-4 transition-all cursor-pointer shadow-xl relative group
                    ${isUnlocked
                      ? isCompleted
                        ? 'bg-slate-900/95 border-emerald-400 hover:scale-[1.02] shadow-emerald-500/20'
                        : 'bg-slate-900/95 border-amber-400 hover:scale-[1.02] shadow-amber-500/30'
                      : 'bg-slate-900/70 border-slate-700 opacity-60 cursor-not-allowed'
                    }`}
                >
                  <div className="flex items-center gap-4">
                    {/* Level Icon Badge */}
                    <div
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl font-pixel shrink-0 border-2 shadow-lg
                        ${isUnlocked
                          ? isCompleted
                            ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                            : 'bg-amber-500/20 border-amber-400 text-amber-300 animate-pulseGlow'
                          : 'bg-slate-800 border-slate-700 text-slate-500'
                        }`}
                    >
                      {isUnlocked ? lvl.icon : <Lock className="w-7 h-7 text-slate-500" />}
                    </div>

                    {/* Level Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-pixel text-[11px] text-amber-400 uppercase tracking-wide">
                          {lvl.title.split('—')[0]}
                        </span>
                        {isCompleted && (
                          <span className="bg-emerald-500 text-slate-950 font-bold text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1">
                            <span>Selesai</span>
                            <Sparkles className="w-3 h-3" />
                          </span>
                        )}
                      </div>

                      <h3 className="font-fun text-lg sm:text-xl font-bold text-white truncate">
                        {lvl.title.split('—')[1] || lvl.title}
                      </h3>

                      <p className="text-xs text-slate-300 font-fun line-clamp-1 mt-0.5">
                        {lvl.subtitle}
                      </p>

                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-800/80">
                        <span className="text-[11px] font-pixel text-slate-400">
                          {isUnlocked ? `${lvl.lessons.length} Cerita` : `Kunci: ${lvl.requiredXp} XP`}
                        </span>

                        {isUnlocked && (
                          <span className="flex items-center gap-1 text-xs font-bold text-amber-400 group-hover:translate-x-1 transition-transform">
                            <span>Mulai</span>
                            <ChevronRight className="w-4 h-4" />
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
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border-4 border-amber-400 rounded-3xl p-6 max-w-md w-full shadow-2xl">
            <h3 className="text-xl font-bold font-fun text-amber-300 mb-4 flex items-center gap-2">
              <Users className="w-6 h-6" />
              <span>Pilih Profil Anak</span>
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
                  className={`flex items-center justify-between p-3 rounded-2xl border-2 cursor-pointer transition-all ${
                    p.id === activeChild.id
                      ? 'bg-amber-500/20 border-amber-400 text-white'
                      : 'bg-slate-800 border-slate-700 hover:border-slate-500 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{p.avatar}</span>
                    <div>
                      <h4 className="font-bold text-white">{p.name}</h4>
                      <p className="text-xs text-amber-400 font-pixel">
                        Lv.{p.level} • {p.xp} XP • {p.completedLessons.length} Pelajaran
                      </p>
                    </div>
                  </div>
                  {p.id === activeChild.id && (
                    <span className="text-xs bg-amber-400 text-slate-950 font-bold px-2 py-1 rounded-lg">
                      Aktif
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Create New Profile Form */}
            <form onSubmit={handleCreateProfile} className="border-t border-slate-800 pt-4">
              <span className="block text-xs font-bold text-slate-400 mb-2 uppercase">
                Tambah Profil Baru
              </span>
              <div className="flex gap-2 mb-3">
                {['👦', '👧', '🦊', '🦁', '🚀'].map(emoji => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => setSelectedAvatar(emoji)}
                    className={`w-10 h-10 rounded-xl text-xl border-2 flex items-center justify-center transition-all ${
                      selectedAvatar === emoji
                        ? 'bg-amber-400 border-white scale-110'
                        : 'bg-slate-800 border-slate-700'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Nama Panggilan Anak..."
                  value={newChildName}
                  onChange={e => setNewChildName(e.target.value)}
                  className="flex-1 bg-slate-800 border-2 border-slate-700 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
                <button
                  type="submit"
                  className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-4 py-2 rounded-xl flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah</span>
                </button>
              </div>
            </form>

            <button
              onClick={() => setShowProfileModal(false)}
              className="w-full mt-4 py-2 text-sm text-slate-400 hover:text-white"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      {/* Badges / Achievements Modal */}
      {showBadgesModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border-4 border-amber-400 rounded-3xl p-6 max-w-lg w-full shadow-2xl">
            <h3 className="text-xl font-bold font-fun text-amber-300 mb-4 flex items-center gap-2">
              <Trophy className="w-6 h-6 text-yellow-400" />
              <span>Koleksi Lencana Penghargaan</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-80 overflow-y-auto pr-1">
              {availableBadges.map(badge => {
                const isEarned = activeChild.badges.includes(badge.id);
                return (
                  <div
                    key={badge.id}
                    className={`p-3 rounded-2xl border-2 text-center flex flex-col items-center justify-center transition-all ${
                      isEarned
                        ? 'bg-amber-500/10 border-amber-400 shadow-md'
                        : 'bg-slate-800/40 border-slate-800 opacity-40 grayscale'
                    }`}
                  >
                    <span className="text-4xl mb-1.5">{badge.icon}</span>
                    <h5 className="font-bold text-xs text-white">{badge.title}</h5>
                    <p className="text-[10px] text-slate-300 font-fun mt-1 line-clamp-2">
                      {badge.description}
                    </p>
                    {isEarned && (
                      <span className="mt-2 text-[9px] bg-amber-400 text-slate-950 font-bold px-2 py-0.5 rounded-full">
                        Diraih!
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => setShowBadgesModal(false)}
              className="w-full mt-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold"
            >
              Kembali
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
