'use client';

import React, { useState } from 'react';
import { StoryLesson } from '@/types/story';
import { canonicalSubtractionLesson } from '@/data/mockLessons';
import { WorldMap } from '@/components/world-map/WorldMap';
import { StoryPlayer } from '@/components/story-engine/StoryPlayer';
import { ParentDashboard } from '@/components/parent/ParentDashboard';
import { ParentalGateModal } from '@/components/parent/ParentalGateModal';
import { AdminContentStudio } from '@/components/admin/AdminContentStudio';
import { PwaInstallPrompt } from '@/components/ui/PwaInstallPrompt';

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
