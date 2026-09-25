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
  const [showParentGate, setShowParentGate] = useState<boolean>(false);

  const handleSelectLesson = (lesson: StoryLesson) => {
    setSelectedLesson(lesson);
    setCurrentMode('story');
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
          onExit={handleBackToMap}
          onComplete={handleLessonComplete}
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
