'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
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
  Mic,
} from 'lucide-react';
import { VoiceSettingsModal } from '@/components/audio/VoiceSettingsModal';
import { translateStoryToEnglish } from '@/lib/i18n/storyTranslator';

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
  const [showVoiceModal, setShowVoiceModal] = useState<boolean>(false);
  const [activeLesson, setActiveLesson] = useState<StoryLesson>(lesson);
  const [activeSpeaker, setActiveSpeaker] = useState<string | null>(null);
  const [voiceLang, setVoiceLang] = useState<'id' | 'en'>(voiceEngine.getLanguage());

  const [storyRestartNonce, setStoryRestartNonce] = useState<number>(0);

  useEffect(() => {
    setActiveLesson(lesson);
    setCurrentSceneIndex(0);
    setShowQuestion(false);
    setIsRemedialMode(false);
    setActiveSpeaker(null);
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

  // Dynamically compute chalkboard text that matches the active subject, formula, or topic
  const boardText = useMemo(() => {
    // 0. Explicit custom chalkboard text if defined in lesson metadata
    if (activeLesson.metadata?.chalkboardText) {
      return activeLesson.metadata.chalkboardText;
    }

    // 1. Mathematics with formula: display the exact arithmetic equation
    if (activeLesson.subject === 'mathematics') {
      if (activeLesson.metadata?.mathFormula) {
        const { operandA, operator, operandB } = activeLesson.metadata.mathFormula;
        return `${operandA} ${operator} ${operandB} = ?`;
      }
      if (activeLesson.question?.visualHint?.formula) {
        const hintFormula = activeLesson.question.visualHint.formula;
        return hintFormula.includes('=') ? hintFormula.split('=')[0].trim() + ' = ?' : hintFormula;
      }
      return voiceLang === 'en' ? '🔢 Math & Numbers' : '🔢 Matematika Ceria';
    }

    // 2. Language: Reading & spelling
    if (activeLesson.subject === 'language') {
      if (activeLesson.topic === 'language_letters') return '🔤 A B C D E';
      if (activeLesson.topic === 'language_spelling') return '📖 M - E - J - A';
      if (activeLesson.topic === 'language_antonyms') return voiceLang === 'en' ? '🔄 Tall vs Short' : '🔄 Tinggi vs Pendek';
      return voiceLang === 'en' ? '📖 Reading & Writing' : '📖 Belajar Membaca & Menulis';
    }

    // 3. Science: Nature & discovery
    if (activeLesson.subject === 'science') {
      if (activeLesson.topic === 'science_animals') return voiceLang === 'en' ? '🐾 Animal Friends' : '🐾 Sahabat Hewan';
      if (activeLesson.topic === 'science_plants') return voiceLang === 'en' ? '🌱 Plants & Trees' : '🌱 Tumbuhan & Alam';
      if (activeLesson.topic === 'science_weather') return voiceLang === 'en' ? '🌈 Weather & Sky' : '🌈 Cuaca & Pelangi';
      if (activeLesson.topic === 'science_space') return voiceLang === 'en' ? '🚀 Earth & Moon' : '🚀 Bumi & Antariksa';
      return voiceLang === 'en' ? '🔬 Science Explorer' : '🔬 Peneliti Cilik Sains';
    }

    // 4. Character: Good deeds & manners
    if (activeLesson.subject === 'character') {
      return voiceLang === 'en' ? '💖 Kindness & Manners 🤝' : '💖 Sopan Santun & Berbagi 🤝';
    }

    // 5. Logic: Brain riddles & puzzles
    if (activeLesson.subject === 'logic') {
      // Shape pattern: Lingkaran, Kotak, Segitiga
      const fullLessonText = `${activeLesson.title} ${activeLesson.scenes[0]?.narration || ''} ${activeLesson.question?.question || ''}`.toLowerCase();
      if (
        activeLesson.lessonId === 'log-pattern-003' ||
        (fullLessonText.includes('lingkaran') && fullLessonText.includes('kotak')) ||
        (fullLessonText.includes('segitiga') && fullLessonText.includes('lingkaran'))
      ) {
        return '__PATTERN_CIRCLE_SQUARE_TRIANGLE__';
      }
      if (activeLesson.lessonId === 'log-pattern-002' || fullLessonText.includes('pisang')) {
        return '🍎 🍌 🍎 🍌 ... ?';
      }
      if (activeLesson.lessonId === 'log-pattern-004' || fullLessonText.includes('beruang')) {
        return '🐻 🧸 🐻 🧸 ... ?';
      }
      if (activeLesson.topic === 'logic_patterns') return '🔴 🔵 🔴 🔵 ... ?';
      if (activeLesson.topic === 'logic_shapes') return '⭕ ⬛ 🔺 ⭐';
      if (activeLesson.topic === 'logic_riddles') return voiceLang === 'en' ? '🧩 Brain Riddle 💡' : '🧩 Teka-Teki Cerdik 💡';
      return voiceLang === 'en' ? '🧩 Smart Brain & Puzzle 💡' : '🧩 Logika & Asah Otak 💡';
    }

    return voiceLang === 'en' ? '⭐ Learn & Play Together ⭐' : '⭐ Belajar Ceria Bersama ⭐';
  }, [activeLesson, voiceLang]);

  const autoAdvanceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const dialogueDelayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Continuous Full-Story Auto-Advancer with Separated Narrator & Character Roles
  useEffect(() => {
    if (!currentScene || showQuestion || isPaused) return;

    if (autoAdvanceTimerRef.current) {
      clearTimeout(autoAdvanceTimerRef.current);
    }
    if (dialogueDelayTimerRef.current) {
      clearTimeout(dialogueDelayTimerRef.current);
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
      }, 1200); // 1.2s breathing pause between story beats
    };

    if (textToSpeak && !isMuted) {
      // Step 1: Narrator speaks the scene narration
      setActiveSpeaker('narrator');
      voiceEngine.speak(textToSpeak, {
        speaker: 'narrator',
        lang: voiceLang,
        onEnd: () => {
          setActiveSpeaker(null);

          if (currentScene.dialogue) {
            // Step 2: Brief 450ms pause, then the Character speaks their dialogue
            dialogueDelayTimerRef.current = setTimeout(() => {
              if (isPaused) return;
              const charSpeaker = currentScene.dialogue?.speaker || 'budi';
              setActiveSpeaker(charSpeaker);

              voiceEngine.speak(currentScene.dialogue!.text, {
                speaker: charSpeaker,
                lang: voiceLang,
                onEnd: () => {
                  setActiveSpeaker(null);
                  advanceToNext();
                },
              });
            }, 450);
          } else {
            advanceToNext();
          }
        },
      });
    } else {
      // Fallback timer if muted or speech not available
      setActiveSpeaker('narrator');
      const readingTimeMs = Math.max(3500, textToSpeak.length * 60);
      autoAdvanceTimerRef.current = setTimeout(() => {
        if (currentScene.dialogue) {
          setActiveSpeaker(currentScene.dialogue.speaker);
          const dialogueTimeMs = Math.max(2500, currentScene.dialogue.text.length * 60);
          autoAdvanceTimerRef.current = setTimeout(() => {
            setActiveSpeaker(null);
            advanceToNext();
          }, dialogueTimeMs);
        } else {
          setActiveSpeaker(null);
          advanceToNext();
        }
      }, readingTimeMs);
    }

    return () => {
      if (autoAdvanceTimerRef.current) {
        clearTimeout(autoAdvanceTimerRef.current);
      }
      if (dialogueDelayTimerRef.current) {
        clearTimeout(dialogueDelayTimerRef.current);
      }
      setActiveSpeaker(null);
      voiceEngine.stop();
    };
  }, [currentSceneIndex, isRemedialMode, isMuted, isPaused, showQuestion, scenes.length, currentScene, voiceLang, storyRestartNonce]);

  const handleRestartFullStory = () => {
    soundEngine.playSfx('click');
    voiceEngine.stop();
    if (autoAdvanceTimerRef.current) {
      clearTimeout(autoAdvanceTimerRef.current);
    }
    if (dialogueDelayTimerRef.current) {
      clearTimeout(dialogueDelayTimerRef.current);
    }
    setActiveSpeaker(null);
    setShowQuestion(false);
    setCurrentSceneIndex(0);
    setStoryRestartNonce(prev => prev + 1);
  };

  const handleSkipToQuestion = () => {
    soundEngine.playSfx('star');
    voiceEngine.stop();
    if (autoAdvanceTimerRef.current) {
      clearTimeout(autoAdvanceTimerRef.current);
    }
    if (dialogueDelayTimerRef.current) {
      clearTimeout(dialogueDelayTimerRef.current);
    }
    setActiveSpeaker(null);
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

  const toggleLanguage = () => {
    const nextLang: 'id' | 'en' = voiceLang === 'id' ? 'en' : 'id';
    soundEngine.playSfx('click');
    voiceEngine.stop();
    setVoiceLang(nextLang);
    voiceEngine.setLanguage(nextLang);
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
          <span className="hidden sm:inline">{voiceLang === 'en' ? 'Adventure Map' : 'Peta Petualangan'}</span>
          <span className="sm:hidden">{voiceLang === 'en' ? 'Map' : 'Peta'}</span>
        </button>

        {/* Center Title & Continuous Episode Badge */}
        <div className="flex flex-col items-center min-w-0">
          <div className="bg-amber-100 border border-amber-300 px-2.5 sm:px-4 py-0.5 sm:py-1 rounded-full flex items-center gap-1 shadow-sm max-w-full">
            <span className="text-xs sm:text-base">🎬</span>
            <span className="font-black text-xs sm:text-sm text-amber-950 truncate max-w-[130px] xs:max-w-[190px] sm:max-w-xs">
              {isRemedialMode
                ? (voiceLang === 'en' ? 'Remedial Story' : 'Cerita Remedial')
                : currentLessonIdx >= 0
                ? `${voiceLang === 'en' ? 'Question' : 'Soal'} ${currentLessonIdx + 1}/${totalLessonsInLevel}: ${activeLesson.title.replace(/^Soal \d+:\s*/, '')}`
                : activeLesson.title}
            </span>
          </div>
          <span className="text-[10px] sm:text-xs font-black text-amber-800 mt-0.5 sm:mt-1 flex items-center gap-1">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
            <span>{voiceLang === 'en' ? 'Auto Playing' : 'Otomatis Berjalan'}</span>
          </span>
        </div>

        {/* Playful Top Controls */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {/* Quick Language Toggle Button: 🇮🇩 ID / 🇬🇧 EN */}
          <button
            onClick={toggleLanguage}
            title={voiceLang === 'id' ? 'Ganti ke Bahasa Inggris (English)' : 'Ganti ke Bahasa Indonesia'}
            className="candy-btn candy-btn-yellow px-2 py-1.5 sm:px-2.5 sm:py-2 rounded-xl sm:rounded-2xl font-black flex items-center gap-1 text-xs active:scale-95 shadow-xs"
          >
            <span className="text-sm sm:text-base leading-none">{voiceLang === 'en' ? '🇬🇧' : '🇮🇩'}</span>
            <span className="text-[11px] font-black hidden xs:inline uppercase">
              {voiceLang === 'en' ? 'EN' : 'ID'}
            </span>
          </button>

          <button
            onClick={() => setShowVoiceModal(true)}
            title="Pilih Karakter & Pengaturan Suara"
            className="candy-btn candy-btn-purple p-1.5 sm:p-2.5 rounded-xl sm:rounded-2xl font-bold flex items-center justify-center text-xs active:scale-95"
          >
            <Mic className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

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
          activeSpeaker={activeSpeaker}
          voiceLang={voiceLang}
          boardText={boardText}
          restartNonce={storyRestartNonce}
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

            <div className="flex items-start gap-3 sm:gap-4">
              {/* Dynamic Role / Character Avatar */}
              <div
                className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl sm:rounded-3xl border-3 border-white shadow-lg flex items-center justify-center text-3xl sm:text-4xl shrink-0 transition-all duration-300 ${
                  activeSpeaker === 'budi'
                    ? 'bg-gradient-to-br from-amber-400 to-orange-500 ring-4 ring-amber-300 scale-105 animate-bounceSubtle'
                    : activeSpeaker === 'siti'
                    ? 'bg-gradient-to-br from-pink-400 to-rose-500 ring-4 ring-pink-300 scale-105 animate-bounceSubtle'
                    : 'bg-gradient-to-br from-indigo-500 to-purple-600 ring-4 ring-purple-300 scale-105'
                }`}
              >
                {activeSpeaker === 'siti'
                  ? '👧'
                  : activeSpeaker === 'budi'
                  ? '👦'
                  : '📖'}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1.5 flex-wrap gap-1">
                  <span
                    className={`font-black text-xs sm:text-sm px-3.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                      activeSpeaker === 'budi'
                        ? 'bg-amber-100 text-amber-900 border border-amber-300 shadow-xs'
                        : activeSpeaker === 'siti'
                        ? 'bg-pink-100 text-pink-900 border border-pink-300 shadow-xs'
                        : activeSpeaker === 'narrator'
                        ? 'bg-indigo-100 text-indigo-900 border border-indigo-200 shadow-xs'
                        : 'bg-indigo-50/80 text-indigo-800 border border-indigo-200/80'
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        activeSpeaker ? 'bg-emerald-500 animate-pulse' : 'bg-indigo-400'
                      }`}
                    />
                    {activeSpeaker === 'budi'
                      ? (voiceLang === 'en' ? '👦 Budi is Speaking' : '👦 Karakter Budi Berbicara')
                      : activeSpeaker === 'siti'
                      ? (voiceLang === 'en' ? '👧 Siti is Speaking' : '👧 Karakter Siti Berbicara')
                      : activeSpeaker === 'narrator'
                      ? (voiceLang === 'en' ? '📖 Narrator Reading Story' : '📖 Narator Membaca Cerita')
                      : (voiceLang === 'en' ? '📖 Story Narration' : '📖 Narasi Cerita')}
                  </span>

                  <span className="text-xs font-black text-slate-500">
                    {voiceLang === 'en'
                      ? `Scene ${currentSceneIndex + 1} of ${scenes.length}`
                      : `Adegan ${currentSceneIndex + 1} dari ${scenes.length}`}
                  </span>
                </div>

                {/* Scene Narration */}
                <div
                  className={`text-base sm:text-2xl font-black leading-relaxed transition-all duration-300 ${
                    activeSpeaker === 'narrator' ? 'text-slate-900' : 'text-slate-600'
                  }`}
                >
                  {voiceLang === 'en' ? (
                    <>
                      <p className="text-indigo-950 font-black">
                        {translateStoryToEnglish(currentScene.narration)}
                      </p>
                      <p className="text-xs sm:text-sm font-bold text-slate-500 mt-1 italic">
                        🇮🇩 &ldquo;{currentScene.narration}&rdquo;
                      </p>
                    </>
                  ) : (
                    <p>{currentScene.narration}</p>
                  )}
                </div>

                {/* Character Dialogue Box */}
                {currentScene.dialogue && (
                  <div
                    className={`mt-3 rounded-2xl p-3 sm:p-4 text-base sm:text-lg font-black flex items-start gap-2.5 transition-all duration-300 ${
                      activeSpeaker === currentScene.dialogue.speaker
                        ? currentScene.dialogue.speaker === 'siti'
                          ? 'bg-pink-50 border-3 border-pink-400 text-pink-950 shadow-md ring-2 ring-pink-300'
                          : 'bg-amber-50 border-3 border-amber-400 text-amber-950 shadow-md ring-2 ring-amber-300'
                        : 'bg-slate-50/80 border-2 border-slate-200 text-slate-500 opacity-80'
                    }`}
                  >
                    <span className="text-xl sm:text-2xl shrink-0">
                      {currentScene.dialogue.speaker === 'siti' ? '👧' : '👦'}
                    </span>
                    <div className="flex-1 min-w-0">
                      <span className="text-[11px] sm:text-xs uppercase tracking-wider block font-bold mb-0.5 text-slate-400">
                        {currentScene.dialogue.speaker === 'siti'
                          ? (voiceLang === 'en' ? 'Siti Replies:' : 'Siti Menjawab:')
                          : (voiceLang === 'en' ? 'Budi Says:' : 'Budi Berkata:')}
                      </span>
                      {voiceLang === 'en' ? (
                        <>
                          <span className="leading-snug text-indigo-950 block">
                            &ldquo;{translateStoryToEnglish(currentScene.dialogue.text)}&rdquo;
                          </span>
                          <span className="block text-xs sm:text-sm font-bold text-slate-500 italic mt-0.5">
                            🇮🇩 &ldquo;{currentScene.dialogue.text}&rdquo;
                          </span>
                        </>
                      ) : (
                        <span className="leading-snug">&ldquo;{currentScene.dialogue.text}&rdquo;</span>
                      )}
                    </div>
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
                <span>{voiceLang === 'en' ? 'Replay Story' : 'Putar Ulang Cerita'}</span>
              </button>

              <button
                onClick={handleSkipToQuestion}
                className="candy-btn candy-btn-green px-5 py-2.5 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-2"
              >
                <span>{voiceLang === 'en' ? 'Go to Question' : 'Langsung ke Soal'}</span>
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

      {/* Voice Selection Modal */}
      <VoiceSettingsModal
        isOpen={showVoiceModal}
        onClose={() => {
          setShowVoiceModal(false);
          setVoiceLang(voiceEngine.getLanguage());
        }}
      />
    </div>
  );
};
