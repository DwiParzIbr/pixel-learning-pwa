'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { StoryLesson } from '@/types/story';
import { canonicalSubtractionLesson } from '@/data/mockLessons';
import { ParentalGateModal } from '@/components/parent/ParentalGateModal';
import { PwaInstallPrompt } from '@/components/ui/PwaInstallPrompt';

const WorldMap = dynamic(
  () => import('@/components/world-map/WorldMap').then((mod) => mod.WorldMap),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen bg-gradient-to-b from-sky-300 via-sky-100 to-emerald-100 flex flex-col items-center justify-center font-fun text-slate-700">
        <div className="w-16 h-16 rounded-2xl bg-amber-300 animate-bounce flex items-center justify-center text-3xl shadow-lg border-2 border-white mb-3">
          🎮
        </div>
        <p className="font-black text-lg text-slate-800 animate-pulse">Memuat Petualangan Ceria...</p>
      </div>
    ),
  }
);

const StoryPlayer = dynamic(
  () => import('@/components/story-engine/StoryPlayer').then((mod) => mod.StoryPlayer),
  { ssr: false }
);

const ParentDashboard = dynamic(
  () => import('@/components/parent/ParentDashboard').then((mod) => mod.ParentDashboard),
  { ssr: false }
);

const AdminContentStudio = dynamic(
  () => import('@/components/admin/AdminContentStudio').then((mod) => mod.AdminContentStudio),
  { ssr: false }
);

export default function HomePage() {
  const [currentMode, setCurrentMode] = useState<'map' | 'story' | 'parent' | 'admin'>('map');
  const [selectedLesson, setSelectedLesson] = useState<StoryLesson>(canonicalSubtractionLesson);
  const [levelLessons, setLevelLessons] = useState<StoryLesson[]>([]);
  const [showParentGate, setShowParentGate] = useState<boolean>(false);

  const handleSelectLesson = (lesson: StoryLesson, inLevelLessons?: StoryLesson[]) => {
    setSelectedLesson(lesson);
    if (inLevelLessons && inLevelLessons.length > 0) {
      setLevelLessons(inLevelLessons);
    } else {
      setLevelLessons([lesson]);
    }
    setCurrentMode('story');
  };

  const handleNextLesson = (nextLesson: StoryLesson) => {
    setSelectedLesson(nextLesson);
  };

  const handleOpenParentDashboard = () => {
    setShowParentGate(true);
  };

  const handleParentGateSuccess = () => {
    setShowParentGate(false);
    setCurrentMode('parent');
  };

  const handleOpenAdminStudio = () => {
    setCurrentMode('admin');
  };

  const handleBackToMap = () => {
    setCurrentMode('map');
  };

  const handleLessonComplete = () => {
    setCurrentMode('map');
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-200 via-sky-100 to-emerald-100 text-slate-800 font-fun">
      {currentMode === 'map' && (
        <WorldMap
          onSelectLesson={handleSelectLesson}
          onOpenParentDashboard={handleOpenParentDashboard}
          onOpenAdminStudio={handleOpenAdminStudio}
        />
      )}

      {currentMode === 'story' && (
        <StoryPlayer
          lesson={selectedLesson}
          levelLessons={levelLessons}
          onExit={handleBackToMap}
          onComplete={handleLessonComplete}
          onNextLesson={handleNextLesson}
        />
      )}

      {currentMode === 'parent' && (
        <ParentDashboard onBackToApp={handleBackToMap} />
      )}

      {currentMode === 'admin' && (
        <AdminContentStudio
          onBackToApp={handleBackToMap}
          onPublishLesson={(newLesson) => {
            setSelectedLesson(newLesson);
          }}
        />
      )}

      {showParentGate && (
        <ParentalGateModal
          onSuccess={handleParentGateSuccess}
          onCancel={() => setShowParentGate(false)}
        />
      )}

      {/* PWA Install Banner */}
      <PwaInstallPrompt />
    </main>
  );
}
