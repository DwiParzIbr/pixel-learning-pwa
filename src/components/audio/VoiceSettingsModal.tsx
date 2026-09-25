'use client';

import React, { useState, useEffect } from 'react';
import { voiceEngine, VoicePersona, PRESET_VOICES } from '@/lib/audio/voiceEngine';
import { soundEngine } from '@/lib/audio/soundEngine';
import { Volume2, Check, Sparkles, X, Play } from 'lucide-react';

interface VoiceSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VoiceSettingsModal: React.FC<VoiceSettingsModalProps> = ({ isOpen, onClose }) => {
  const [selectedPersonaId, setSelectedPersonaId] = useState<string>(voiceEngine.getActivePersonaId());
  const [isPlayingPreview, setIsPlayingPreview] = useState<string | null>(null);
  const [systemVoices, setSystemVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceURI, setSelectedVoiceURI] = useState<string>(voiceEngine.getSelectedVoiceURI() || '');

  useEffect(() => {
    if (isOpen) {
      setSelectedPersonaId(voiceEngine.getActivePersonaId());
      setSelectedVoiceURI(voiceEngine.getSelectedVoiceURI() || '');
      const voices = voiceEngine.getAvailableSystemVoices();
      // Filter indonesian or interesting voices
      const idVoices = voices.filter(v => v.lang.toLowerCase().includes('id'));
      setSystemVoices(idVoices.length > 0 ? idVoices : voices.slice(0, 8));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePreview = (persona: VoicePersona, e: React.MouseEvent) => {
    e.stopPropagation();
    soundEngine.playSfx('click');
    setIsPlayingPreview(persona.id);
    voiceEngine.speak(persona.sampleText, {
      pitch: persona.pitch,
      rate: persona.rate,
      speaker: persona.id,
      onEnd: () => setIsPlayingPreview(null),
    });
  };

  const handleSelect = (personaId: string) => {
    soundEngine.playSfx('click');
    setSelectedPersonaId(personaId);
  };

  const handleSave = () => {
    soundEngine.playSfx('celebrate');
    voiceEngine.setPersona(selectedPersonaId);
    voiceEngine.setSelectedVoiceURI(selectedVoiceURI || null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-pop-in font-fun">
      <div className="bg-white border-4 border-amber-300 rounded-3xl sm:rounded-[2.5rem] p-4 sm:p-6 max-w-lg w-full shadow-2xl text-slate-800 relative max-h-[90vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 font-black text-xl p-2 leading-none"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-2 shrink-0">
          <span className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center text-2xl shadow-md shrink-0">
            🎙️
          </span>
          <div className="min-w-0 pr-6">
            <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-tight">
              Pilih Suara Cerita & Karakter
            </h3>
            <p className="text-xs text-slate-500 font-bold mt-0.5">
              Pilih karakter suara favoritmu untuk membacakan cerita & soal
            </p>
          </div>
        </div>

        {/* Notice Info Pill */}
        <div className="bg-amber-50 border border-amber-200 px-3 py-2 rounded-xl text-xs text-amber-900 font-bold mb-3 flex items-center gap-2 shrink-0">
          <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
          <span>Tekan tombol <strong>Tes Suara</strong> untuk mendengarkan contohnya!</span>
        </div>

        {/* Persona Options List */}
        <div className="space-y-2.5 overflow-y-auto flex-1 pr-1 py-1">
          {PRESET_VOICES.map((p) => {
            const isSelected = selectedPersonaId === p.id;
            const isPlaying = isPlayingPreview === p.id;

            return (
              <div
                key={p.id}
                onClick={() => handleSelect(p.id)}
                className={`p-3 sm:p-3.5 rounded-2xl border-2 sm:border-3 transition-all cursor-pointer relative active:scale-[0.99] flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'bg-amber-50/90 border-amber-400 shadow-md ring-2 ring-amber-300'
                    : 'bg-slate-50 hover:bg-white border-slate-200 hover:border-amber-300'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-2xl shrink-0 shadow-inner ${
                    isSelected ? 'bg-amber-400 text-amber-950' : 'bg-white border border-slate-200'
                  }`}>
                    {p.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <h4 className="font-black text-sm sm:text-base text-slate-900 truncate">
                        {p.name}
                      </h4>
                      <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 shrink-0">
                        {p.role}
                      </span>
                    </div>
                    <p className="text-[11px] sm:text-xs text-slate-500 font-bold line-clamp-1">
                      {p.description}
                    </p>
                  </div>
                </div>

                {/* Right Actions: Test Play & Radio Check */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={(e) => handlePreview(p, e)}
                    className={`px-2.5 py-1.5 rounded-xl font-black text-xs flex items-center gap-1 transition-all active:scale-95 shadow-xs ${
                      isPlaying
                        ? 'bg-emerald-500 text-white animate-pulse'
                        : 'candy-btn candy-btn-blue text-white'
                    }`}
                    title="Dengarkan contoh suara ini"
                  >
                    {isPlaying ? <Volume2 className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                    <span className="hidden xs:inline">{isPlaying ? 'Bicara...' : 'Tes'}</span>
                  </button>

                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    isSelected
                      ? 'bg-amber-500 border-amber-600 text-white'
                      : 'border-slate-300 bg-white'
                  }`}>
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Optional System Voice Dropdown if available */}
        {systemVoices.length > 1 && (
          <div className="mt-2.5 pt-2.5 border-t border-slate-200 shrink-0">
            <label className="block text-[11px] font-black text-slate-600 mb-1">
              ⚙️ Suara Sistem Perangkat (Opsional):
            </label>
            <select
              value={selectedVoiceURI}
              onChange={(e) => setSelectedVoiceURI(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-2.5 py-1.5 text-xs font-bold text-slate-700 outline-none focus:ring-2 focus:ring-amber-300"
            >
              <option value="">Otomatis (Rekomendasi Terbaik)</option>
              {systemVoices.map((v) => (
                <option key={v.voiceURI} value={v.voiceURI}>
                  {v.name} ({v.lang})
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Save Button */}
        <div className="mt-3.5 pt-2.5 border-t-2 border-slate-100 shrink-0">
          <button
            onClick={handleSave}
            className="w-full candy-btn candy-btn-green py-3 rounded-2xl font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all"
          >
            <span>Simpan & Gunakan Suara Ini ✅</span>
          </button>
        </div>
      </div>
    </div>
  );
};
