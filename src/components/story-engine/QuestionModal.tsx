'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { StoryQuestion, RemedialStory, BadgeDef } from '@/types/story';
import { soundEngine } from '@/lib/audio/soundEngine';
import { voiceEngine, VoiceLanguage } from '@/lib/audio/voiceEngine';
import { translateStoryToEnglish } from '@/lib/i18n/storyTranslator';
import { Lightbulb, Sparkles, CheckCircle2, HeartHandshake, ArrowRight, BookOpen, Volume2 } from 'lucide-react';

interface QuestionModalProps {
  question: StoryQuestion;
  remedialStory?: RemedialStory;
  voiceLang?: VoiceLanguage;
  onAnswerSubmit: (isCorrect: boolean, hintUsed: boolean, attempts: number, remedialUsed: boolean) => {
    xpEarned: number;
    newBadges: BadgeDef[];
    isLevelUp: boolean;
  };
  onProceedNext: () => void;
  onLaunchRemedial: () => void;
}

export const QuestionModal: React.FC<QuestionModalProps> = ({
  question,
  remedialStory,
  voiceLang = voiceEngine.getLanguage(),
  onAnswerSubmit,
  onProceedNext,
  onLaunchRemedial,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [attempts, setAttempts] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [hintUsed, setHintUsed] = useState<boolean>(false);
  const [feedbackState, setFeedbackState] = useState<'idle' | 'wrong' | 'correct'>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');
  const [rewardData, setRewardData] = useState<{ xpEarned: number; newBadges: BadgeDef[]; isLevelUp: boolean } | null>(null);

  const handleSelect = (optionId: string) => {
    if (feedbackState === 'correct') return;
    setSelectedOption(optionId);
    soundEngine.playSfx('click');
  };

  const handleCheckAnswer = () => {
    if (!selectedOption || feedbackState === 'correct') return;

    const currentAttempts = attempts + 1;
    setAttempts(currentAttempts);

    const isCorrect = selectedOption === question.correctAnswer;

    if (isCorrect) {
      setFeedbackState('correct');
      soundEngine.playSfx('celebrate');
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#fbbf24', '#38bdf8', '#4ade80', '#f472b6', '#a855f7'],
      });

      const currentLang = voiceLang;
      const congratulation = `Hebat sekali! Jawabanmu benar! ${question.explanation}`;
      setFeedbackMessage(congratulation);
      voiceEngine.speak(congratulation, { speaker: 'narrator', lang: currentLang });

      const res = onAnswerSubmit(true, hintUsed, currentAttempts, false);
      setRewardData(res);
    } else {
      setFeedbackState('wrong');
      soundEngine.playSfx('wrong_gentle');

      const currentLang = voiceLang;
      if (currentAttempts === 1) {
        const msg = 'Belum tepat. Tidak apa-apa, yuk coba hitung lagi ya!';
        setFeedbackMessage(msg);
        voiceEngine.speak(msg, { speaker: 'budi', lang: currentLang });
      } else if (currentAttempts === 2) {
        setShowHint(true);
        setHintUsed(true);
        const msg = 'Masih belum tepat. Buka Petunjuk di bawah untuk membantu kamu!';
        setFeedbackMessage(msg);
        voiceEngine.speak(msg, { speaker: 'siti', lang: currentLang });
      } else {
        const msg = 'Yuk coba kita lihat Cerita Remedial singkat bersama Budi!';
        setFeedbackMessage(msg);
        voiceEngine.speak(msg, { speaker: 'narrator', lang: currentLang });
      }

      onAnswerSubmit(false, hintUsed, currentAttempts, false);
    }
  };

  const optionColorStyles = [
    { bg: 'bg-rose-50 border-rose-300 text-rose-900', badge: 'bg-rose-500 text-white', hover: 'hover:bg-rose-100' },
    { bg: 'bg-sky-50 border-sky-300 text-sky-900', badge: 'bg-sky-500 text-white', hover: 'hover:bg-sky-100' },
    { bg: 'bg-emerald-50 border-emerald-300 text-emerald-900', badge: 'bg-emerald-500 text-white', hover: 'hover:bg-emerald-100' },
    { bg: 'bg-amber-50 border-amber-300 text-amber-900', badge: 'bg-amber-500 text-white', hover: 'hover:bg-amber-100' },
  ];

  return (
    <div className="w-full max-w-2xl bg-white border-3 sm:border-4 border-amber-300 rounded-2xl sm:rounded-[2.5rem] p-3 sm:p-6 shadow-[0_8px_24px_rgba(0,0,0,0.06)] text-slate-800 my-1 sm:my-3 animate-pop-in font-fun relative">
      {/* Question Header Badge */}
      <div className="flex items-center justify-between mb-2 sm:mb-3 border-b-2 border-amber-100 pb-1.5 sm:pb-2">
        <div className="flex items-center gap-1 bg-amber-100 px-2.5 sm:px-3.5 py-0.5 sm:py-1 rounded-full border border-amber-300">
          <span className="text-xs sm:text-base">🌟</span>
          <span className="font-extrabold text-[10px] sm:text-xs text-amber-900 uppercase tracking-wide">
            {voiceLang === 'en' ? 'Fun Challenge!' : 'Tantangan Seru!'}
          </span>
        </div>

        <div className="bg-sky-100 text-sky-800 px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-bold border border-sky-300">
          {voiceLang === 'en' ? `Attempt ${attempts + 1}` : `Percobaan ke-${attempts + 1}`}
        </div>
      </div>

      {/* Main Question Text with Audio Read-Aloud Button */}
      <div className="flex items-center justify-center gap-2 mb-2.5 sm:mb-4 px-1">
        <div className="text-center flex-1">
          <h3 className="text-sm sm:text-lg md:text-xl font-black text-slate-800 leading-snug">
            {voiceLang === 'en' ? translateStoryToEnglish(question.question) : question.question}
          </h3>
          {voiceLang === 'en' && (
            <p className="text-xs sm:text-sm font-bold text-slate-400 mt-0.5 italic">
              🇮🇩 &ldquo;{question.question}&rdquo;
            </p>
          )}
        </div>
        <button
          onClick={() => {
            soundEngine.playSfx('click');
            const qText = voiceLang === 'en' ? translateStoryToEnglish(question.question) : question.question;
            voiceEngine.speak(qText, { speaker: 'narrator', lang: voiceLang });
          }}
          title={voiceLang === 'en' ? 'Listen to question' : 'Dengarkan pertanyaan'}
          className="candy-btn bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 p-2 sm:p-2.5 rounded-xl sm:rounded-2xl shrink-0 flex items-center justify-center shadow-xs"
        >
          <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-amber-900" />
        </button>
      </div>

      {/* Options Layout */}
      {(() => {
        const isLongAnswers = question.options.some(opt => {
          const text = (opt.label || String(opt.value)).trim();
          const words = text.split(/\s+/);
          return text.length > 12 || words.length > 2;
        });

        return (
          <div className={isLongAnswers ? 'flex flex-col gap-2 sm:gap-2.5 w-full mb-2.5 sm:mb-4' : 'grid grid-cols-2 gap-2 sm:gap-3 mb-2.5 sm:mb-4 w-full'}>
            {question.options.map((opt, idx) => {
              const isSelected = selectedOption === opt.id;
              const isCorrectAnswer = feedbackState === 'correct' && opt.id === question.correctAnswer;
              const isWrongSelected = feedbackState === 'wrong' && isSelected;
              const colorTheme = optionColorStyles[idx % optionColorStyles.length];

              const rawLabel = opt.label || String(opt.value);
              const displayLabel = voiceLang === 'en' ? translateStoryToEnglish(rawLabel) : rawLabel;

              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelect(opt.id)}
                  disabled={feedbackState === 'correct'}
                  className={`flex items-center gap-2.5 sm:gap-3 ${isLongAnswers ? 'w-full p-2.5 sm:p-3.5' : 'p-2.5 sm:p-3'} rounded-xl sm:rounded-2xl border-2 sm:border-3 font-extrabold text-xs sm:text-base transition-all text-left shadow-xs active:translate-y-0.5
                    ${isCorrectAnswer
                      ? 'bg-emerald-500 border-emerald-600 text-white shadow-md border-b-3 sm:border-b-4 scale-[1.01]'
                      : isWrongSelected
                      ? 'bg-rose-100 border-rose-400 text-rose-800 animate-shake border-b-2 sm:border-b-3'
                      : isSelected
                      ? 'bg-amber-300 border-amber-500 text-amber-950 shadow-sm border-b-3 sm:border-b-4 scale-[1.01]'
                      : `${colorTheme.bg} ${colorTheme.hover} border-b-2 sm:border-b-3`
                    }`}
                >
                  <span className={`${isLongAnswers ? 'w-7 h-7 sm:w-8 sm:h-8' : 'w-6 h-6 sm:w-8 sm:h-8'} rounded-lg sm:rounded-xl flex items-center justify-center font-black text-xs sm:text-sm shrink-0 shadow-inner
                    ${isSelected ? 'bg-amber-900 text-amber-100' : colorTheme.badge}`}>
                    {opt.id}
                  </span>
                  <span className="leading-snug break-words flex-1 font-extrabold text-xs sm:text-sm md:text-base">
                    {displayLabel}
                  </span>
                  {isCorrectAnswer && <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-white shrink-0 ml-1" />}
                </button>
              );
            })}
          </div>
        );
      })()}

      {/* Feedback Alert Banner */}
      {feedbackState !== 'idle' && (
        <div
          className={`p-4 rounded-2xl mb-5 flex items-start gap-3 border-2 animate-pop-in ${
            feedbackState === 'correct'
              ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
              : 'bg-amber-50 border-amber-300 text-amber-900'
          }`}
        >
          {feedbackState === 'correct' ? (
            <Sparkles className="w-7 h-7 text-emerald-500 shrink-0 mt-0.5 animate-spin" />
          ) : (
            <HeartHandshake className="w-7 h-7 text-amber-500 shrink-0 mt-0.5" />
          )}
          <div className="text-base sm:text-lg flex-1">
            <p className="font-extrabold leading-snug">
              {voiceLang === 'en' ? translateStoryToEnglish(feedbackMessage) : feedbackMessage}
            </p>
            {voiceLang === 'en' && (
              <p className="text-xs sm:text-sm font-bold text-slate-500 mt-1 italic">
                🇮🇩 &ldquo;{feedbackMessage}&rdquo;
              </p>
            )}
          </div>
        </div>
      )}

      {/* Visual Hint Box */}
      {showHint && question.hint && (
        <div className="p-5 rounded-3xl bg-amber-50 border-2 border-amber-300 text-amber-950 mb-5 animate-pop-in">
          <div className="flex items-center gap-2 mb-2 font-black text-amber-800 text-base">
            <Lightbulb className="w-6 h-6 text-yellow-500" />
            <span>{voiceLang === 'en' ? 'Helpful Hint:' : 'Petunjuk Ramah:'}</span>
          </div>
          <p className="text-base sm:text-lg font-bold mb-1">
            {voiceLang === 'en' ? translateStoryToEnglish(question.hint) : question.hint}
          </p>
          {voiceLang === 'en' && (
            <p className="text-xs sm:text-sm font-semibold text-amber-700/80 mb-3 italic">
              🇮🇩 &ldquo;{question.hint}&rdquo;
            </p>
          )}
          {question.visualHint?.formula && (
            <div className="bg-white px-4 py-2 rounded-2xl border-2 border-amber-300 text-amber-900 font-black text-lg inline-block shadow-sm">
              {question.visualHint.formula}
            </div>
          )}
        </div>
      )}

      {/* Remedial Story Trigger */}
      {attempts >= 3 && feedbackState === 'wrong' && remedialStory && (
        <div className="p-4 rounded-3xl bg-indigo-50 border-2 border-indigo-300 text-indigo-950 mb-5 flex items-center justify-between gap-3 animate-pop-in">
          <div className="flex items-center gap-3">
            <BookOpen className="w-7 h-7 text-indigo-500 shrink-0" />
            <div>
              <span className="font-black text-indigo-950 block text-base sm:text-lg">
                {voiceLang === 'en' ? 'Want to try another story?' : 'Mau coba cerita lain?'}
              </span>
              <span className="text-xs sm:text-sm text-indigo-700 font-bold">
                {voiceLang === 'en' ? 'Let us explore another fun story together with Budi!' : 'Yuk kita pelajari bersama cerita buah apel yang lezat!'}
              </span>
            </div>
          </div>
          <button
            onClick={onLaunchRemedial}
            className="candy-btn candy-btn-purple font-extrabold px-5 py-2.5 rounded-2xl text-sm shrink-0"
          >
            {voiceLang === 'en' ? 'Open Story' : 'Buka Cerita'}
          </button>
        </div>
      )}

      {/* Rewards / Badges celebration banner */}
      {rewardData && feedbackState === 'correct' && (
        <div className="p-5 rounded-3xl bg-gradient-to-r from-amber-100 via-yellow-100 to-emerald-100 border-2 border-amber-300 mb-5 text-center animate-pop-in">
          <div className="flex items-center justify-center gap-2 font-black text-amber-900 text-xl mb-1">
            <Sparkles className="w-6 h-6 text-yellow-500 animate-spin" />
            <span>
              {voiceLang === 'en'
                ? `+ ${rewardData.xpEarned} XP SUCCESSFULLY EARNED!`
                : `+ ${rewardData.xpEarned} XP BERHASIL DIDAPATKAN!`}
            </span>
          </div>
          {rewardData.newBadges.length > 0 && (
            <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
              <span className="text-xs font-bold text-amber-800">
                {voiceLang === 'en' ? 'New Badges:' : 'Lencana Baru:'}
              </span>
              {rewardData.newBadges.map(b => (
                <span key={b.id} className="bg-amber-400 text-amber-950 text-xs font-extrabold px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                  <span>{b.icon}</span>
                  <span>{b.title}</span>
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center justify-between gap-2 pt-1 sm:pt-2">
        <div>
          {!showHint && attempts >= 1 && (
            <button
              onClick={() => {
                setShowHint(true);
                setHintUsed(true);
                soundEngine.playSfx('click');
              }}
              className="candy-btn candy-btn-yellow flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl sm:rounded-2xl font-black text-xs sm:text-sm"
            >
              <Lightbulb className="w-4 h-4 text-amber-800" />
              <span>{voiceLang === 'en' ? 'Hint' : 'Petunjuk'}</span>
            </button>
          )}
        </div>

        <div className="ml-auto flex-1 sm:flex-initial flex justify-end">
          {feedbackState === 'correct' ? (
            <button
              onClick={onProceedNext}
              className="w-full sm:w-auto candy-btn candy-btn-green flex items-center justify-center gap-2 px-5 sm:px-8 py-2.5 sm:py-3.5 rounded-xl sm:rounded-2xl font-black text-sm sm:text-xl animate-wiggle"
            >
              <span>{voiceLang === 'en' ? 'Continue Adventure!' : 'Lanjut Petualangan!'}</span>
              <ArrowRight className="w-4 h-4 sm:w-6 sm:h-6 stroke-[3]" />
            </button>
          ) : (
            <button
              onClick={handleCheckAnswer}
              disabled={!selectedOption}
              className={`w-full sm:w-auto candy-btn px-5 sm:px-8 py-2 sm:py-3.5 rounded-xl sm:rounded-2xl font-black text-xs sm:text-lg transition-all ${
                selectedOption
                  ? 'candy-btn-blue cursor-pointer'
                  : 'bg-slate-200 text-slate-400 border-b-4 border-slate-300 cursor-not-allowed shadow-none'
              }`}
            >
              {voiceLang === 'en' ? 'Check Answer' : 'Periksa Jawaban'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
