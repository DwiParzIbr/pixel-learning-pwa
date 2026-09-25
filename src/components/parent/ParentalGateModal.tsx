'use client';

import React, { useState } from 'react';
import { ShieldCheck, X } from 'lucide-react';
import { soundEngine } from '@/lib/audio/soundEngine';

interface ParentalGateModalProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export const ParentalGateModal: React.FC<ParentalGateModalProps> = ({ onSuccess, onCancel }) => {
  const [numA] = useState(() => Math.floor(Math.random() * 5) + 6); // 6 to 10
  const [numB] = useState(() => Math.floor(Math.random() * 5) + 4); // 4 to 8
  const [answerInput, setAnswerInput] = useState<string>('');
  const [hasError, setHasError] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const expected = numA * numB;
    if (parseInt(answerInput.trim(), 10) === expected) {
      soundEngine.playSfx('click');
      onSuccess();
    } else {
      setHasError(true);
      soundEngine.playSfx('wrong_gentle');
      setAnswerInput('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 animate-pop-in">
      <div className="bg-white border-4 border-indigo-200 rounded-[2.5rem] p-7 max-w-sm w-full shadow-2xl text-slate-800 font-fun">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-indigo-600">
            <ShieldCheck className="w-7 h-7" />
            <h3 className="font-black text-xl text-slate-900">Area Orang Tua</h3>
          </div>
          <button
            onClick={onCancel}
            className="text-slate-400 hover:text-slate-700 p-1 rounded-xl"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm font-bold text-slate-600 mb-4">
          Untuk memastikan Anda adalah orang tua, silakan jawab perkalian singkat di bawah ini:
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="p-4 bg-indigo-50 border-2 border-indigo-200 rounded-2xl text-center">
            <span className="text-2xl font-black text-indigo-900">
              {numA} × {numB} = ?
            </span>
          </div>

          <input
            type="number"
            placeholder="Jawaban..."
            autoFocus
            value={answerInput}
            onChange={e => {
              setAnswerInput(e.target.value);
              setHasError(false);
            }}
            className="w-full bg-slate-50 border-2 border-slate-300 rounded-2xl px-4 py-3 text-center text-2xl font-black text-slate-900 focus:outline-none focus:border-indigo-500 shadow-inner"
          />

          {hasError && (
            <p className="text-xs text-rose-500 text-center font-bold">
              Jawaban belum tepat. Silakan hitung kembali.
            </p>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-sm"
            >
              Batal
            </button>
            <button
              type="submit"
              className="candy-btn candy-btn-purple flex-1 py-3 rounded-2xl text-white font-black text-sm"
            >
              Buka Dashboard
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
