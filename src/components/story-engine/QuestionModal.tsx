'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { StoryQuestion, RemedialStory, BadgeDef } from '@/types/story';
import { soundEngine } from '@/lib/audio/soundEngine';
import { voiceEngine } from '@/lib/audio/voiceEngine';
import { Lightbulb, RotateCcw, Sparkles, CheckCircle2, AlertCircle, ArrowRight, BookOpen } from 'lucide-react';

interface QuestionModalProps {
  question: StoryQuestion;
  remedialStory?: RemedialStory;
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
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#fbbf24', '#3b82f6', '#10b981', '#ec4899', '#8b5cf6'],
      });

      const congratulation = `Hebat sekali! Jawabanmu benar! ${question.explanation}`;
      setFeedbackMessage(congratulation);
      voiceEngine.speak(congratulation, { speaker: 'narrator' });

      const res = onAnswerSubmit(true, hintUsed, currentAttempts, false);
      setRewardData(res);
    } else {
      setFeedbackState('wrong');
      soundEngine.playSfx('wrong_gentle');

      // Adaptive remedial logic
      if (currentAttempts === 1) {
        const msg = 'Belum tepat. Tidak apa-apa, yuk coba hitung lagi pelan-pelan!';
        setFeedbackMessage(msg);
        voiceEngine.speak(msg, { speaker: 'budi' });
      } else if (currentAttempts === 2) {
        setShowHint(true);
        setHintUsed(true);
        const msg = 'Masih belum tepat. Kamu bisa membuka Petunjuk di bawah untuk membantu!';
        setFeedbackMessage(msg);
        voiceEngine.speak(msg, { speaker: 'siti' });
      } else {
        // Attempt 3+
        const msg = 'Yuk coba simak Cerita Remedial singkat agar konsepnya semakin jelas!';
        setFeedbackMessage(msg);
        voiceEngine.speak(msg, { speaker: 'narrator' });
      }

      onAnswerSubmit(false, hintUsed, currentAttempts, false);
    }
  };

  return (
    <div className="w-full max-w-2xl bg-slate-900/95 border-4 border-amber-400 rounded-3xl p-6 shadow-2xl backdrop-blur-md text-white my-4 transition-all">
      {/* Question Header */}
      <div className="flex items-center justify-between gap-4 mb-4 border-b border-slate-700/80 pb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">❓</span>
          <span className="font-pixel text-xs md:text-sm text-amber-400 uppercase tracking-wide">
            Teka-Teki Cerita
          </span>
        </div>
        <div className="flex items-center gap-1.5 bg-slate-800 px-3 py-1 rounded-full text-xs font-pixel text-amber-300">
          <span>Percobaan:</span>
          <span className="font-bold">{attempts}</span>
        </div>
      </div>

      {/* Main Question Text */}
      <h3 className="font-fun text-xl md:text-2xl font-bold text-center text-amber-100 mb-6 leading-relaxed">
        {question.question}
      </h3>

      {/* Options Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {question.options.map(opt => {
          const isSelected = selectedOption === opt.id;
          const isCorrectAnswer = feedbackState === 'correct' && opt.id === question.correctAnswer;
          const isWrongSelected = feedbackState === 'wrong' && isSelected;

          return (
            <button
              key={opt.id}
              onClick={() => handleSelect(opt.id)}
              disabled={feedbackState === 'correct'}
              className={`flex items-center gap-4 p-4 rounded-2xl border-4 font-fun text-lg md:text-xl font-bold transition-all text-left shadow-lg
                ${isCorrectAnswer
                  ? 'bg-emerald-600 border-emerald-300 text-white scale-[1.02]'
                  : isWrongSelected
                  ? 'bg-rose-950 border-rose-500 text-rose-200 animate-shake'
                  : isSelected
                  ? 'bg-amber-500 border-amber-300 text-slate-950 shadow-amber-500/30'
                  : 'bg-slate-800/90 border-slate-700 hover:border-amber-400/80 text-white active:scale-95'
                }`}
            >
              <span className={`w-9 h-9 rounded-xl flex items-center justify-center font-pixel text-sm shrink-0
                ${isSelected ? 'bg-slate-950 text-amber-400' : 'bg-slate-700 text-slate-200'}`}>
                {opt.id}
              </span>
              <span className="flex-1">{opt.label || String(opt.value)}</span>
              {isCorrectAnswer && <CheckCircle2 className="w-6 h-6 text-emerald-300 shrink-0" />}
            </button>
          );
        })}
      </div>

      {/* Feedback Alert */}
      {feedbackState !== 'idle' && (
        <div
          className={`p-4 rounded-2xl mb-5 flex items-start gap-3 border-2 ${
            feedbackState === 'correct'
              ? 'bg-emerald-950/80 border-emerald-400 text-emerald-200'
              : 'bg-rose-950/80 border-rose-400 text-rose-200'
          }`}
        >
          {feedbackState === 'correct' ? (
            <Sparkles className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-6 h-6 text-rose-400 shrink-0 mt-0.5" />
          )}
          <div className="font-fun text-base">
            <p className="font-bold">{feedbackMessage}</p>
          </div>
        </div>
      )}

      {/* Visual Hint Box */}
      {showHint && question.hint && (
        <div className="p-4 rounded-2xl bg-amber-950/60 border-2 border-amber-500/80 text-amber-200 mb-5 animate-fadeIn">
          <div className="flex items-center gap-2 mb-1.5 font-bold font-fun text-amber-300">
            <Lightbulb className="w-5 h-5 text-yellow-400" />
            <span>Petunjuk Bantuan:</span>
          </div>
          <p className="text-sm md:text-base font-fun mb-2">{question.hint}</p>
          {question.visualHint?.formula && (
            <div className="bg-slate-950/80 px-3 py-2 rounded-xl font-pixel text-amber-400 text-center text-sm inline-block">
              {question.visualHint.formula}
            </div>
          )}
        </div>
      )}

      {/* Remedial Story Trigger (Attempt >= 3) */}
      {attempts >= 3 && feedbackState === 'wrong' && remedialStory && (
        <div className="p-4 rounded-2xl bg-indigo-950/70 border-2 border-indigo-400 text-indigo-200 mb-5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-indigo-400 shrink-0" />
            <div className="text-sm font-fun">
              <span className="font-bold text-white block">Perlu bantuan cerita lain?</span>
              <span>Buka cerita remedial sederhana untuk memahami konsep ini.</span>
            </div>
          </div>
          <button
            onClick={onLaunchRemedial}
            className="bg-indigo-500 hover:bg-indigo-600 active:scale-95 text-white font-fun font-bold px-4 py-2 rounded-xl text-sm shrink-0 shadow-lg"
          >
            Buka Remedial
          </button>
        </div>
      )}

      {/* Rewards / Badges celebration banner */}
      {rewardData && feedbackState === 'correct' && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-emerald-500/20 border-2 border-amber-400 mb-5 text-center">
          <div className="flex items-center justify-center gap-2 font-pixel text-amber-400 text-sm mb-1">
            <Sparkles className="w-4 h-4 text-yellow-300 animate-spin" />
            <span>+ {rewardData.xpEarned} XP DIPEROLEH!</span>
          </div>
          {rewardData.newBadges.length > 0 && (
            <div className="mt-2 flex items-center justify-center gap-2">
              <span className="text-xs font-fun text-slate-300">Lencana Baru:</span>
              {rewardData.newBadges.map(b => (
                <span key={b.id} className="bg-amber-400 text-slate-950 text-xs font-fun font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span>{b.icon}</span>
                  <span>{b.title}</span>
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {!showHint && attempts >= 1 && (
            <button
              onClick={() => {
                setShowHint(true);
                setHintUsed(true);
                soundEngine.playSfx('click');
              }}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 font-fun font-semibold text-sm transition-all"
            >
              <Lightbulb className="w-4 h-4" />
              <span>Butuh Petunjuk?</span>
            </button>
          )}
        </div>

        <div className="flex items-center gap-3 ml-auto">
          {feedbackState === 'correct' ? (
            <button
              onClick={onProceedNext}
              className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-fun font-bold text-lg px-6 py-3 rounded-2xl shadow-xl active:scale-95 transition-all animate-bounceSubtle"
            >
              <span>Lanjut Petualangan!</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={handleCheckAnswer}
              disabled={!selectedOption}
              className={`flex items-center gap-2 font-fun font-bold text-lg px-6 py-3 rounded-2xl shadow-xl transition-all ${
                selectedOption
                  ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 active:scale-95 cursor-pointer'
                  : 'bg-slate-700 text-slate-400 cursor-not-allowed'
              }`}
            >
              <span>Kirim Jawaban</span>
              <CheckCircle2 className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
