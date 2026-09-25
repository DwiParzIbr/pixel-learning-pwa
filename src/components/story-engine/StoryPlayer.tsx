'use client';

import React, { useState, useEffect, useRef } from 'react';
import { StoryLesson, SceneDef, BadgeDef } from '@/types/story';
import { PixelCanvas } from './PixelCanvas';
import { QuestionModal } from './QuestionModal';
import { soundEngine } from '@/lib/audio/soundEngine';
import { voiceEngine } from '@/lib/audio/voiceEngine';
import { progressStore } from '@/lib/progress/progressStore';
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  FastForward,
  ArrowLeft,
  Sparkles,
  Music,
} from 'lucide-react';

interface StoryPlayerProps {
  lesson: StoryLesson;
  levelLessons?: StoryLesson[];
  onExit: () => void;
  onComplete: () => void;
  onNextLesson?: (nextLesson: StoryLesson) => void;
}

export const StoryPlayer: React.FC<StoryPlayerProps> = ({
  lesson,
  levelLessons,
  onExit,
  onComplete,
  onNextLesson,
}) => {
  const [currentSceneIndex, setCurrentSceneIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isBgmActive, setIsBgmActive] = useState<boolean>(false);
  const [showQuestion, setShowQuestion] = useState<boolean>(false);
  const [isRemedialMode, setIsRemedialMode] = useState<boolean>(false);
  const [activeLesson, setActiveLesson] = useState<StoryLesson>(lesson);

  useEffect(() => {
    setActiveLesson(lesson);
    setCurrentSceneIndex(0);
    setShowQuestion(false);
    setIsRemedialMode(false);
  }, [lesson]);

  const currentLessonIdx = levelLessons && levelLessons.length > 1
    ? levelLessons.findIndex(l => l.lessonId === activeLesson.lessonId)
    : -1;
  const hasNextLesson = currentLessonIdx >= 0 && levelLessons && currentLessonIdx < levelLessons.length - 1;
  const totalLessonsInLevel = levelLessons ? levelLessons.length : 1;

  const scenes = isRemedialMode && activeLesson.remedialStory
    ? activeLesson.remedialStory.scenes
    : activeLesson.scenes;

  const currentScene: SceneDef = scenes[currentSceneIndex] || scenes[0];
  const autoAdvanceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Continuous Full-Story Auto-Advancer
  useEffect(() => {
    if (!currentScene || showQuestion || isPaused) return;

    if (autoAdvanceTimerRef.current) {
      clearTimeout(autoAdvanceTimerRef.current);
    }

    const textToSpeak = currentScene.narration;

    const advanceToNext = () => {
      autoAdvanceTimerRef.current = setTimeout(() => {
        if (currentSceneIndex < scenes.length - 1) {
          setCurrentSceneIndex(prev => prev + 1);
        } else {
          // Full story finished! Seamlessly launch question!
          setShowQuestion(true);
          soundEngine.playSfx('star');
        }
      }, 1400); // 1.4s natural breathing pause between story beats
    };

    if (textToSpeak && !isMuted) {
      voiceEngine.speak(textToSpeak, {
        speaker: 'narrator',
        onEnd: () => {
          if (currentScene.dialogue) {
            voiceEngine.speak(currentScene.dialogue.text, {
              speaker: currentScene.dialogue.speaker,
              onEnd: advanceToNext,
            });
          } else {
            advanceToNext();
          }
        },
      });
    } else {
      // Fallback timer if muted or speech not available
      const readingTimeMs = Math.max(4000, textToSpeak.length * 65);
      autoAdvanceTimerRef.current = setTimeout(advanceToNext, readingTimeMs);
    }

    return () => {
      if (autoAdvanceTimerRef.current) {
        clearTimeout(autoAdvanceTimerRef.current);
      }
      voiceEngine.stop();
    };
  }, [currentSceneIndex, isRemedialMode, isMuted, isPaused, showQuestion, scenes.length, currentScene]);

  const handleRestartFullStory = () => {
    soundEngine.playSfx('click');
    voiceEngine.stop();
    if (autoAdvanceTimerRef.current) {
      clearTimeout(autoAdvanceTimerRef.current);
    }
    setShowQuestion(false);
    setCurrentSceneIndex(0);
  };

  const handleSkipToQuestion = () => {
    soundEngine.playSfx('star');
    voiceEngine.stop();
    if (autoAdvanceTimerRef.current) {
      clearTimeout(autoAdvanceTimerRef.current);
    }
    setShowQuestion(true);
  };

  const toggleSound = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    soundEngine.setMuted(nextMuted);
    if (nextMuted) {
      voiceEngine.stop();
    }
  };

  const toggleBgm = () => {
    const active = soundEngine.toggleBgm();
    setIsBgmActive(active);
  };

  const handleAnswerSubmit = (
    isCorrect: boolean,
    hintUsed: boolean,
    attempts: number,
    remedialUsed: boolean
  ): { xpEarned: number; newBadges: BadgeDef[]; isLevelUp: boolean } => {
    const activeChild = progressStore.getActiveChild();
    return progressStore.recordAttempt({
      childId: activeChild.id,
      lessonId: activeLesson.lessonId,
      levelId: activeLesson.levelId,
      topic: activeLesson.topic,
      attemptsCount: attempts,
      correct: isCorrect,
      hintUsed,
      remedialUsed,
      replayCount: currentSceneIndex,
      timeSpentSeconds: 60,
      score: isCorrect ? Math.max(50, 100 - (attempts - 1) * 20 - (hintUsed ? 15 : 0)) : 0,
      selectedAnswer: '',
    });
  };

  const handleLaunchRemedial = () => {
    if (activeLesson.remedialStory) {
      setIsRemedialMode(true);
      setCurrentSceneIndex(0);
      setShowQuestion(false);
      soundEngine.playSfx('pickup');
    }
  };

  const storyProgressPercent = Math.round(((currentSceneIndex + 1) / scenes.length) * 100);

  const handleProceedNext = () => {
    if (hasNextLesson && levelLessons && onNextLesson) {
      soundEngine.playSfx('star');
      const nextL = levelLessons[currentLessonIdx + 1];
      setActiveLesson(nextL);
      setCurrentSceneIndex(0);
      setShowQuestion(false);
      setIsRemedialMode(false);
      onNextLesson(nextL);
    } else {
      onComplete();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-200 via-sky-100 to-emerald-100 text-slate-800 flex flex-col items-center justify-start p-2 sm:p-6 select-none font-fun">
      {/* Top Navbar */}
      <header className="w-full max-w-4xl flex items-center justify-between gap-1.5 sm:gap-3 bg-white/95 backdrop-blur-md px-2.5 sm:px-6 py-1.5 sm:py-3 rounded-2xl sm:rounded-3xl shadow-[0_4px_16px_rgba(0,0,0,0.06)] border-3 border-amber-300 mb-2 sm:mb-3">
        <button
          onClick={onExit}
          className="candy-btn candy-btn-yellow flex items-center gap-1 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl font-black text-xs sm:text-base active:scale-95 shrink-0"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
          <span className="hidden sm:inline">Peta Petualangan</span>
          <span className="sm:hidden">Peta</span>
        </button>

        {/* Center Title & Continuous Episode Badge */}
        <div className="flex flex-col items-center min-w-0">
          <div className="bg-amber-100 border border-amber-300 px-2.5 sm:px-4 py-0.5 sm:py-1 rounded-full flex items-center gap-1 shadow-sm max-w-full">
            <span className="text-xs sm:text-base">🎬</span>
            <span className="font-black text-xs sm:text-sm text-amber-950 truncate max-w-[130px] xs:max-w-[190px] sm:max-w-xs">
              {isRemedialMode
                ? 'Cerita Remedial'
                : currentLessonIdx >= 0
                ? `Soal ${currentLessonIdx + 1}/${totalLessonsInLevel}: ${activeLesson.title.replace(/^Soal \d+:\s*/, '')}`
                : activeLesson.title}
            </span>
          </div>
          <span className="text-[10px] sm:text-xs font-black text-amber-800 mt-0.5 sm:mt-1 flex items-center gap-1">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
            <span>Otomatis Berjalan</span>
          </span>
        </div>

        {/* Playful Top Controls */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          <button
            onClick={toggleBgm}
            title="Musik Ceria"
            className={`candy-btn p-1.5 sm:p-2.5 rounded-xl sm:rounded-2xl font-bold flex items-center justify-center ${
              isBgmActive ? 'candy-btn-green' : 'bg-slate-100 border-b-4 border-slate-300 text-slate-600'
            }`}
          >
            <Music className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          <button
            onClick={toggleSound}
            title={isMuted ? 'Nyalakan Suara' : 'Bisukan Suara'}
            className={`candy-btn p-1.5 sm:p-2.5 rounded-xl sm:rounded-2xl font-bold flex items-center justify-center ${
              isMuted ? 'candy-btn-orange' : 'candy-btn-blue'
            }`}
          >
            {isMuted ? <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" /> : <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />}
          </button>

          <button
            onClick={() => setIsPaused(!isPaused)}
            title={isPaused ? 'Lanjutkan Cerita' : 'Jeda Cerita'}
            className="candy-btn bg-slate-100 border-b-4 border-slate-300 text-slate-700 p-1.5 sm:p-2.5 rounded-xl sm:rounded-2xl font-bold flex items-center justify-center"
          >
            {isPaused ? <Play className="w-4 h-4 sm:w-5 sm:h-5" /> : <Pause className="w-4 h-4 sm:w-5 sm:h-5" />}
          </button>
        </div>
      </header>

      {/* Main Interactive Stage */}
      <main className="w-full max-w-4xl flex-1 flex flex-col items-center justify-start gap-1.5 sm:gap-3">
        {/* Continuous Pixel Canvas Screen */}
        <PixelCanvas
          allScenes={scenes}
          activeSceneIndex={currentSceneIndex}
          characters={activeLesson.characters}
          isPaused={isPaused}
          onSceneComplete={idx => {
            if (idx === -1) {
              handleRestartFullStory();
            }
          }}
          interactiveCountMode={activeLesson.question.type === 'object_counting'}
        />

        {/* Comic Storybook Dialogue Box with Smooth Subtitle Updating */}
        {!showQuestion && (
          <div className="w-full max-w-4xl bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 mt-1 sm:mt-3 shadow-[0_8px_24px_rgba(0,0,0,0.06)] border-3 sm:border-4 border-amber-300 relative animate-pop-in">
            {/* Story Progress Bar */}
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200 mb-4 shadow-inner">
              <div
                className="bg-gradient-to-r from-amber-400 via-emerald-400 to-sky-400 h-full rounded-full transition-all duration-700"
                style={{ width: `${storyProgressPercent}%` }}
              />
            </div>

            <div className="flex items-start gap-4">
              {/* Character Avatar */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-3xl bg-gradient-to-br from-amber-300 to-amber-500 border-3 border-white shadow-lg flex items-center justify-center text-3xl sm:text-4xl shrink-0 animate-bounceSubtle">
                {currentScene.dialogue?.speaker === 'siti' ? '👧' : currentScene.dialogue?.speaker === 'budi' ? '👦' : '🦁'}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="bg-amber-100 text-amber-900 font-black text-xs sm:text-sm px-3.5 py-0.5 rounded-full uppercase tracking-wider">
                    {currentScene.dialogue?.speaker
                      ? `Karakter: ${currentScene.dialogue.speaker === 'siti' ? 'Siti' : 'Budi'}`
                      : 'Narator Cerita'}
                  </span>

                  <span className="text-xs font-black text-slate-500">
                    Adegan {currentSceneIndex + 1} dari {scenes.length}
                  </span>
                </div>

                <p className="text-lg sm:text-2xl text-slate-800 font-black leading-relaxed">
                  {currentScene.narration}
                </p>

                {currentScene.dialogue && (
                  <div className="mt-3 bg-amber-50 border-2 border-amber-300/80 rounded-2xl p-3 text-amber-950 font-black text-base sm:text-lg flex items-center gap-2">
                    <span className="text-xl">💬</span>
                    <span>&ldquo;{currentScene.dialogue.text}&rdquo;</span>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Action Navigation Buttons */}
            <div className="flex items-center justify-between mt-5 pt-4 border-t-2 border-slate-100">
              <button
                onClick={handleRestartFullStory}
                className="candy-btn candy-btn-yellow px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-1.5"
              >
                <RotateCcw className="w-4 h-4 stroke-[3]" />
                <span>Putar Ulang Cerita</span>
              </button>

              <button
                onClick={handleSkipToQuestion}
                className="candy-btn candy-btn-green px-5 py-2.5 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-2"
              >
                <span>Langsung ke Soal</span>
                <FastForward className="w-4 h-4 stroke-[3]" />
              </button>
            </div>
          </div>
        )}

        {/* Embedded Interactive Question Component */}
        {showQuestion && (
          <QuestionModal
            question={isRemedialMode && activeLesson.remedialStory ? activeLesson.remedialStory.question : activeLesson.question}
            remedialStory={activeLesson.remedialStory}
            onAnswerSubmit={handleAnswerSubmit}
            onProceedNext={handleProceedNext}
            onLaunchRemedial={handleLaunchRemedial}
          />
        )}
      </main>
    </div>
  );
};
