'use client';

import React, { useState } from 'react';
import { ShieldAlert, X } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border-4 border-indigo-500 rounded-3xl p-6 max-w-sm w-full shadow-2xl text-white font-fun">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-indigo-400">
            <ShieldAlert className="w-6 h-6" />
            <h3 className="font-bold text-lg text-white">Khusus Orang Tua</h3>
          </div>
          <button
            onClick={onCancel}
            className="text-slate-400 hover:text-white p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-slate-300 mb-4">
          Untuk memastikan kamu adalah orang tua, silakan jawab pertanyaan perkalian di bawah:
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-center">
            <span className="font-pixel text-xl text-amber-400">
              {numA} × {numB} = ?
            </span>
          </div>

          <input
            type="number"
            placeholder="Ketik jawaban..."
            autoFocus
            value={answerInput}
            onChange={e => {
              setAnswerInput(e.target.value);
              setHasError(false);
            }}
            className="w-full bg-slate-800 border-2 border-slate-700 rounded-xl px-4 py-2.5 text-center text-xl font-bold text-white focus:outline-none focus:border-indigo-400"
          />

          {hasError && (
            <p className="text-xs text-rose-400 text-center font-bold">
              Jawaban belum tepat. Silakan hitung kembali.
            </p>
          )}

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-sm"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-md"
            >
              Masuk
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
