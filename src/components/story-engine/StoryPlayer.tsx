'use client';

import React, { useState, useEffect } from 'react';
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
  ChevronRight,
  ChevronLeft,
  ArrowLeft,
  Sparkles,
  HelpCircle,
  Music,
} from 'lucide-react';

interface StoryPlayerProps {
  lesson: StoryLesson;
  onExit: () => void;
  onComplete: () => void;
}

export const StoryPlayer: React.FC<StoryPlayerProps> = ({ lesson, onExit, onComplete }) => {
  const [currentSceneIndex, setCurrentSceneIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isBgmActive, setIsBgmActive] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [showQuestion, setShowQuestion] = useState<boolean>(false);
  const [isRemedialMode, setIsRemedialMode] = useState<boolean>(false);
  const [activeLesson, setActiveLesson] = useState<StoryLesson>(lesson);

  const scenes = isRemedialMode && activeLesson.remedialStory
    ? activeLesson.remedialStory.scenes
    : activeLesson.scenes;

  const currentScene: SceneDef = scenes[currentSceneIndex] || scenes[0];
  const isLastScene = currentSceneIndex === scenes.length - 1;

  // Speak narration when scene changes
  useEffect(() => {
    if (!currentScene) return;

    setShowQuestion(false);
    const textToSpeak = currentScene.narration;

    if (textToSpeak && !isMuted) {
      setIsSpeaking(true);
      voiceEngine.speak(textToSpeak, {
        speaker: 'narrator',
        onStart: () => setIsSpeaking(true),
        onEnd: () => {
          setIsSpeaking(false);
          // If scene has dialogue, speak dialogue as well
          if (currentScene.dialogue) {
            voiceEngine.speak(currentScene.dialogue.text, {
              speaker: currentScene.dialogue.speaker,
            });
          }
        },
      });
    }

    return () => {
      voiceEngine.stop();
    };
  }, [currentSceneIndex, isRemedialMode, isMuted, currentScene]);

  const handleNextScene = () => {
    soundEngine.playSfx('click');
    voiceEngine.stop();

    if (currentSceneIndex < scenes.length - 1) {
      setCurrentSceneIndex(prev => prev + 1);
    } else {
      setShowQuestion(true);
      soundEngine.playSfx('star');
    }
  };

  const handlePrevScene = () => {
    soundEngine.playSfx('click');
    voiceEngine.stop();
    if (currentSceneIndex > 0) {
      setCurrentSceneIndex(prev => prev - 1);
    }
  };

  const handleReplayScene = () => {
    soundEngine.playSfx('click');
    voiceEngine.stop();
    if (currentScene.narration && !isMuted) {
      setIsSpeaking(true);
      voiceEngine.speak(currentScene.narration, {
        speaker: 'narrator',
        onEnd: () => setIsSpeaking(false),
      });
    }
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

  const handleProceedNext = () => {
    onComplete();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-between p-3 sm:p-6 select-none font-fun">
      {/* Top Navbar */}
      <header className="w-full max-w-4xl flex items-center justify-between gap-2 bg-slate-900/90 border-2 border-slate-800 px-4 py-2.5 rounded-2xl mb-3 shadow-lg backdrop-blur">
        <button
          onClick={onExit}
          className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-200 px-3 py-1.5 rounded-xl font-fun font-bold text-sm transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Peta Petualangan</span>
        </button>

        <div className="flex flex-col items-center">
          <span className="font-pixel text-xs text-amber-400 truncate max-w-[200px] sm:max-w-xs">
            {isRemedialMode ? 'Cerita Remedial' : activeLesson.title}
          </span>
          <span className="text-[11px] text-slate-400">
            Adegan {currentSceneIndex + 1} dari {scenes.length}
          </span>
        </div>

        {/* Audio & Control Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleBgm}
            title="Musik Latar 8-bit"
            className={`p-2 rounded-xl border transition-all ${
              isBgmActive
                ? 'bg-amber-400 border-amber-300 text-slate-950'
                : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
            }`}
          >
            <Music className="w-4 h-4" />
          </button>

          <button
            onClick={toggleSound}
            title={isMuted ? 'Nyalakan Suara' : 'Bisukan Suara'}
            className={`p-2 rounded-xl border transition-all ${
              isMuted
                ? 'bg-rose-900 border-rose-700 text-rose-300'
                : 'bg-slate-800 border-slate-700 text-slate-200 hover:text-white'
            }`}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setIsPaused(!isPaused)}
            title={isPaused ? 'Lanjutkan' : 'Jeda'}
            className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 hover:text-white active:scale-95 transition-all"
          >
            {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Main Interactive Stage */}
      <main className="w-full max-w-4xl flex-1 flex flex-col items-center justify-center">
        {/* Pixel Canvas Screen */}
        <PixelCanvas
          currentScene={currentScene}
          characters={activeLesson.characters}
          isPaused={isPaused}
          interactiveCountMode={activeLesson.question.type === 'object_counting'}
        />

        {/* Subtitle / Dialogue Box */}
        {!showQuestion && (
          <div className="w-full max-w-4xl bg-slate-900/90 border-4 border-slate-800 rounded-3xl p-4 sm:p-5 mt-3 shadow-2xl relative">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-2xl shadow-md shrink-0">
                {currentScene.dialogue?.speaker === 'siti' ? '👧' : currentScene.dialogue?.speaker === 'budi' ? '👦' : '📖'}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-pixel text-[11px] text-amber-400 uppercase tracking-wide">
                    {currentScene.dialogue?.speaker
                      ? `Dialog: ${currentScene.dialogue.speaker}`
                      : 'Narasi Cerita'}
                  </span>

                  <button
                    onClick={handleReplayScene}
                    className="flex items-center gap-1 text-xs text-slate-400 hover:text-amber-400 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Ulang Suara</span>
                  </button>
                </div>

                <p className="text-base sm:text-lg text-slate-100 font-fun leading-relaxed">
                  {currentScene.narration}
                </p>

                {currentScene.dialogue && (
                  <p className="text-amber-200 italic mt-2 text-sm sm:text-base border-l-2 border-amber-400 pl-3">
                    &ldquo;{currentScene.dialogue.text}&rdquo;
                  </p>
                )}
              </div>
            </div>

            {/* Scene Navigation Bar */}
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-800">
              <button
                onClick={handlePrevScene}
                disabled={currentSceneIndex === 0}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  currentSceneIndex > 0
                    ? 'bg-slate-800 hover:bg-slate-700 text-white active:scale-95'
                    : 'text-slate-600 cursor-not-allowed'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Sebelumnya</span>
              </button>

              {/* Progress Dots */}
              <div className="flex items-center gap-2">
                {scenes.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-2.5 rounded-full transition-all ${
                      idx === currentSceneIndex
                        ? 'w-7 bg-amber-400 shadow-md shadow-amber-400/50'
                        : 'w-2.5 bg-slate-700'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={handleNextScene}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 shadow-lg shadow-amber-500/20 active:scale-95 transition-all"
              >
                <span>{isLastScene ? 'Teka-Teki Soal' : 'Lanjut'}</span>
                <ChevronRight className="w-4 h-4" />
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
