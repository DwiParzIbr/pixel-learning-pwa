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
  ArrowRight,
  ArrowLeft,
  Sparkles,
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 via-amber-50 to-emerald-50 text-slate-900 flex flex-col items-center justify-between p-3 sm:p-6 select-none font-fun">
      {/* Top Navbar with Kid-Friendly Candy Badges */}
      <header className="w-full max-w-4xl flex items-center justify-between gap-3 bg-white/90 backdrop-blur-md px-4 sm:px-6 py-3 rounded-3xl shadow-[0_8px_20px_rgba(0,0,0,0.06)] border-3 border-amber-200 mb-3">
        <button
          onClick={onExit}
          className="candy-btn candy-btn-yellow flex items-center gap-2 px-4 py-2 rounded-2xl font-extrabold text-sm sm:text-base active:scale-95"
        >
          <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
          <span>Peta Petualangan</span>
        </button>

        {/* Center Title Pill */}
        <div className="flex flex-col items-center">
          <div className="bg-amber-100 border border-amber-300 px-4 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
            <span className="text-base">📖</span>
            <span className="font-extrabold text-xs sm:text-sm text-amber-900 truncate max-w-[180px] sm:max-w-xs">
              {isRemedialMode ? 'Cerita Remedial' : activeLesson.title}
            </span>
          </div>
          <span className="text-xs font-bold text-amber-700/80 mt-1">
            Adegan {currentSceneIndex + 1} dari {scenes.length}
          </span>
        </div>

        {/* Playful Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleBgm}
            title="Musik Ceria"
            className={`candy-btn p-2.5 rounded-2xl font-bold flex items-center justify-center ${
              isBgmActive ? 'candy-btn-green' : 'bg-slate-100 border-b-4 border-slate-300 text-slate-600'
            }`}
          >
            <Music className="w-5 h-5" />
          </button>

          <button
            onClick={toggleSound}
            title={isMuted ? 'Nyalakan Suara' : 'Bisukan Suara'}
            className={`candy-btn p-2.5 rounded-2xl font-bold flex items-center justify-center ${
              isMuted ? 'candy-btn-orange' : 'candy-btn-blue'
            }`}
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>

          <button
            onClick={() => setIsPaused(!isPaused)}
            title={isPaused ? 'Lanjutkan' : 'Jeda'}
            className="candy-btn bg-slate-100 border-b-4 border-slate-300 text-slate-700 p-2.5 rounded-2xl font-bold"
          >
            {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Main Interactive Stage */}
      <main className="w-full max-w-4xl flex-1 flex flex-col items-center justify-center">
        {/* Pixel Canvas Screen with Toy Console Frame */}
        <PixelCanvas
          currentScene={currentScene}
          characters={activeLesson.characters}
          isPaused={isPaused}
          interactiveCountMode={activeLesson.question.type === 'object_counting'}
        />

        {/* Comic Storybook Dialogue Box */}
        {!showQuestion && (
          <div className="w-full max-w-4xl bg-white rounded-3xl p-5 sm:p-6 mt-4 shadow-[0_12px_28px_rgba(0,0,0,0.08)] border-4 border-amber-300 relative animate-pop-in">
            <div className="flex items-start gap-4">
              {/* Cute Character Avatar Sticker */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-3xl bg-gradient-to-br from-amber-300 to-amber-500 border-3 border-white shadow-lg flex items-center justify-center text-3xl sm:text-4xl shrink-0 animate-bounceSubtle">
                {currentScene.dialogue?.speaker === 'siti' ? '👧' : currentScene.dialogue?.speaker === 'budi' ? '👦' : '🦁'}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="bg-amber-100 text-amber-800 font-extrabold text-xs sm:text-sm px-3 py-0.5 rounded-full uppercase tracking-wider">
                    {currentScene.dialogue?.speaker
                      ? `Karakter: ${currentScene.dialogue.speaker === 'siti' ? 'Siti' : 'Budi'}`
                      : 'Cerita Petualangan'}
                  </span>

                  <button
                    onClick={handleReplayScene}
                    className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded-full font-bold text-xs transition-colors shadow-sm"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Ulang Suara</span>
                  </button>
                </div>

                <p className="text-lg sm:text-2xl text-slate-800 font-bold leading-relaxed">
                  {currentScene.narration}
                </p>

                {currentScene.dialogue && (
                  <div className="mt-3 bg-amber-50/80 border-2 border-amber-200/90 rounded-2xl p-3 text-amber-900 font-extrabold text-base sm:text-lg flex items-center gap-2">
                    <span className="text-xl">💬</span>
                    <span>&ldquo;{currentScene.dialogue.text}&rdquo;</span>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Story Navigation Bar */}
            <div className="flex items-center justify-between mt-5 pt-4 border-t-2 border-amber-100">
              <button
                onClick={handlePrevScene}
                disabled={currentSceneIndex === 0}
                className={`candy-btn px-5 py-2.5 rounded-2xl font-extrabold text-sm sm:text-base ${
                  currentSceneIndex > 0
                    ? 'candy-btn-yellow'
                    : 'bg-slate-200 text-slate-400 border-b-4 border-slate-300 cursor-not-allowed shadow-none'
                }`}
              >
                Kembali
              </button>

              {/* Cheerful Progress Bubbles */}
              <div className="flex items-center gap-2 sm:gap-3">
                {scenes.map((_, idx) => (
                  <div
                    key={idx}
                    className={`transition-all rounded-full flex items-center justify-center font-bold text-xs ${
                      idx === currentSceneIndex
                        ? 'w-9 h-9 bg-amber-400 border-2 border-amber-500 text-amber-900 shadow-md scale-110 animate-bounceSubtle'
                        : idx < currentSceneIndex
                        ? 'w-7 h-7 bg-emerald-400 text-white'
                        : 'w-7 h-7 bg-slate-200 text-slate-400'
                    }`}
                  >
                    {idx < currentSceneIndex ? '✓' : idx + 1}
                  </div>
                ))}
              </div>

              <button
                onClick={handleNextScene}
                className={`candy-btn px-7 py-3 rounded-2xl font-extrabold text-base sm:text-lg flex items-center gap-2 ${
                  isLastScene ? 'candy-btn-green animate-wiggle' : 'candy-btn-blue'
                }`}
              >
                <span>{isLastScene ? 'Teka-Teki Soal!' : 'Lanjut'}</span>
                <ArrowRight className="w-5 h-5 stroke-[3]" />
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
            onProceedNext={onComplete}
            onLaunchRemedial={handleLaunchRemedial}
          />
        )}
      </main>
    </div>
  );
};
