'use client';

import React, { useState, useEffect } from 'react';
import {
  voiceEngine,
  VoicePersona,
  VoiceLanguage,
} from '@/lib/audio/voiceEngine';
import { soundEngine } from '@/lib/audio/soundEngine';
import { Volume2, Check, Sparkles, X, Play, Globe } from 'lucide-react';

interface VoiceSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VoiceSettingsModal: React.FC<VoiceSettingsModalProps> = ({ isOpen, onClose }) => {
  const [selectedLang, setSelectedLang] = useState<VoiceLanguage>(voiceEngine.getLanguage());
  const [selectedPersonaId, setSelectedPersonaId] = useState<string>(voiceEngine.getActivePersonaId());
  const [isPlayingPreview, setIsPlayingPreview] = useState<string | null>(null);
  const [systemVoices, setSystemVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceURI, setSelectedVoiceURI] = useState<string>(voiceEngine.getSelectedVoiceURI() || '');

  useEffect(() => {
    if (isOpen) {
      const currentLang = voiceEngine.getLanguage();
      setSelectedLang(currentLang);
      setSelectedPersonaId(voiceEngine.getActivePersonaId());
      setSelectedVoiceURI(voiceEngine.getSelectedVoiceURI() || '');
      loadSystemVoices(currentLang);
    }
  }, [isOpen]);

  const loadSystemVoices = (lang: VoiceLanguage) => {
    const voices = voiceEngine.getAvailableSystemVoices(lang);
    setSystemVoices(voices.slice(0, 10));
  };

  if (!isOpen) return null;

  const handleLanguageChange = (lang: VoiceLanguage) => {
    soundEngine.playSfx('click');
    setSelectedLang(lang);
    loadSystemVoices(lang);
    const personas = voiceEngine.getNarratorPersonas(lang);
    if (!personas.some(p => p.id === selectedPersonaId)) {
      setSelectedPersonaId(personas[0].id);
    }
  };

  const handlePreviewNarrator = (persona: VoicePersona, e: React.MouseEvent) => {
    e.stopPropagation();
    soundEngine.playSfx('click');
    setIsPlayingPreview(`narrator_${persona.id}`);
    voiceEngine.speak(persona.sampleText, {
      pitch: persona.pitch,
      rate: persona.rate,
      speaker: 'narrator',
      lang: persona.lang,
      onEnd: () => setIsPlayingPreview(null),
    });
  };

  const handlePreviewCharacter = (role: 'budi' | 'siti' | 'bibo', e: React.MouseEvent) => {
    e.stopPropagation();
    soundEngine.playSfx('click');
    setIsPlayingPreview(`char_${role}`);
    voiceEngine.previewSpeaker(role, selectedLang).finally(() => {
      setIsPlayingPreview(null);
    });
  };

  const handleSelectNarrator = (personaId: string) => {
    soundEngine.playSfx('click');
    setSelectedPersonaId(personaId);
  };

  const handleSave = () => {
    soundEngine.playSfx('celebrate');
    voiceEngine.setLanguage(selectedLang);
    voiceEngine.setPersona(selectedPersonaId);
    voiceEngine.setSelectedVoiceURI(selectedVoiceURI || null);
    onClose();
  };

  const currentCharacterVoices = voiceEngine.getCharacterVoices(selectedLang);
  const currentNarratorPersonas = voiceEngine.getNarratorPersonas(selectedLang);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-pop-in font-fun">
      <div className="bg-white border-4 border-amber-300 rounded-3xl sm:rounded-[2.5rem] p-4 sm:p-6 max-w-lg w-full shadow-2xl text-slate-800 relative max-h-[92vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 font-black text-xl p-2 leading-none active:scale-90"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-2.5 shrink-0">
          <span className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center text-2xl shadow-md shrink-0">
            🎙️
          </span>
          <div className="min-w-0 pr-6">
            <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-tight">
              Pilihan Suara Cerita & Karakter
            </h3>
            <p className="text-xs text-slate-500 font-bold mt-0.5">
              Tersedia Bahasa Indonesia & Bahasa Inggris (English)
            </p>
          </div>
        </div>

        {/* Language Mode Toggle Tabs */}
        <div className="flex items-center gap-1.5 sm:gap-2 p-1 bg-slate-100 rounded-2xl mb-3 shrink-0 border border-slate-200">
          <button
            type="button"
            onClick={() => handleLanguageChange('id')}
            className={`flex-1 py-2 px-2.5 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all ${
              selectedLang === 'id'
                ? 'bg-white text-slate-900 shadow-sm border border-slate-200 ring-2 ring-amber-300'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <span className="text-base sm:text-lg">🇮🇩</span>
            <span>Bahasa Indonesia</span>
          </button>
          <button
            type="button"
            onClick={() => handleLanguageChange('en')}
            className={`flex-1 py-2 px-2.5 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all ${
              selectedLang === 'en'
                ? 'bg-white text-indigo-900 shadow-sm border border-indigo-200 ring-2 ring-indigo-300'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <span className="text-base sm:text-lg">🇬🇧</span>
            <span>English (Inggris)</span>
          </button>
        </div>

        {/* Info Banner */}
        <div className={`border px-3 py-2 rounded-xl text-xs font-bold mb-3 flex items-start gap-2 shrink-0 ${
          selectedLang === 'en'
            ? 'bg-indigo-50 border-indigo-200 text-indigo-950'
            : 'bg-amber-50 border-amber-200 text-amber-950'
        }`}>
          {selectedLang === 'en' ? (
            <Globe className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
          ) : (
            <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
          )}
          <span>
            {selectedLang === 'en' ? (
              <>
                <strong>English Voice Mode:</strong> Narration and dialogues will be spoken in clear native English for bilingual immersion!
              </>
            ) : (
              <>
                <strong>Sistem Suara Terpisah:</strong> 1 suara Narator membacakan alur cerita & soal, serta suara khusus untuk karakter anak (Budi & Siti).
              </>
            )}
          </span>
        </div>

        {/* Scrollable Content Container */}
        <div className="overflow-y-auto flex-1 pr-1 space-y-4">
          {/* SECTION 1: ANIMATION CHARACTERS VOICES */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs sm:text-sm font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <span>🎭</span>
                <span>{selectedLang === 'en' ? 'Animation Character Voices' : 'Suara Karakter Animasi'}</span>
              </h4>
              <span className="text-[10px] font-black bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                {selectedLang === 'en' ? 'Active' : 'Otomatis Aktif'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {currentCharacterVoices.slice(0, 2).map((char) => {
                const isPlaying = isPlayingPreview === `char_${char.id}`;
                const isBudi = char.id === 'budi';

                return (
                  <div
                    key={char.id}
                    className={`p-3 rounded-2xl border-2 flex flex-col justify-between transition-all ${
                      isBudi
                        ? 'bg-amber-50/60 border-amber-200'
                        : 'bg-pink-50/60 border-pink-200'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-2xl shadow-xs shrink-0">
                        {char.icon}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h5 className="font-black text-xs sm:text-sm text-slate-900 truncate">
                          {char.name}
                        </h5>
                        <p className="text-[10px] text-slate-500 font-bold leading-tight line-clamp-1">
                          {char.description}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={(e) => handlePreviewCharacter(char.id as 'budi' | 'siti', e)}
                      className={`w-full py-1.5 px-2.5 rounded-xl font-black text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-xs ${
                        isPlaying
                          ? 'bg-emerald-500 text-white animate-pulse'
                          : isBudi
                          ? 'candy-btn candy-btn-yellow text-slate-800'
                          : 'candy-btn candy-btn-pink text-white'
                      }`}
                    >
                      {isPlaying ? <Volume2 className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                      <span>
                        {isPlaying
                          ? 'Playing...'
                          : selectedLang === 'en'
                          ? `Test ${isBudi ? 'Budi' : 'Siti'} Voice`
                          : `Tes Suara ${isBudi ? 'Budi' : 'Siti'}`}
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SECTION 2: NARRATOR PERSONAS SELECTION */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs sm:text-sm font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <span>📖</span>
                <span>{selectedLang === 'en' ? 'Select Story Narrator Voice' : 'Pilih Karakter Suara Narator'}</span>
              </h4>
              <span className="text-[10px] font-black text-slate-500">
                ({selectedLang === 'en' ? 'Story & Questions' : 'Pembaca Cerita & Soal'})
              </span>
            </div>

            <div className="space-y-2">
              {currentNarratorPersonas.map((p) => {
                const isSelected = selectedPersonaId === p.id;
                const isPlaying = isPlayingPreview === `narrator_${p.id}`;

                return (
                  <div
                    key={p.id}
                    onClick={() => handleSelectNarrator(p.id)}
                    className={`p-3 rounded-2xl border-2 sm:border-3 transition-all cursor-pointer relative active:scale-[0.99] flex items-center justify-between gap-2.5 ${
                      isSelected
                        ? 'bg-purple-50/90 border-purple-400 shadow-md ring-2 ring-purple-200'
                        : 'bg-slate-50 hover:bg-white border-slate-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 shadow-inner ${
                        isSelected ? 'bg-purple-500 text-white' : 'bg-white border border-slate-200'
                      }`}>
                        {p.icon}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <h5 className="font-black text-xs sm:text-sm text-slate-900 truncate">
                            {p.name}
                          </h5>
                          <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-purple-100 text-purple-800 shrink-0">
                            {p.role}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 font-bold line-clamp-1">
                          {p.description}
                        </p>
                      </div>
                    </div>

                    {/* Right Actions: Test Play & Radio Check */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={(e) => handlePreviewNarrator(p, e)}
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
                          ? 'bg-purple-600 border-purple-700 text-white'
                          : 'border-slate-300 bg-white'
                      }`}>
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SECTION 3: SYSTEM VOICE OVERRIDE IF AVAILABLE */}
          {systemVoices.length > 1 && (
            <div className="pt-2 border-t border-slate-200">
              <label className="block text-[11px] font-black text-slate-600 mb-1">
                ⚙️ {selectedLang === 'en' ? 'Device System Voice (Optional):' : 'Suara Sistem Perangkat (Opsional):'}
              </label>
              <select
                value={selectedVoiceURI}
                onChange={(e) => setSelectedVoiceURI(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-2.5 py-1.5 text-xs font-bold text-slate-700 outline-none focus:ring-2 focus:ring-purple-300"
              >
                <option value="">{selectedLang === 'en' ? 'Automatic (Best Quality)' : 'Otomatis (Rekomendasi Terbaik)'}</option>
                {systemVoices.map((v) => (
                  <option key={v.voiceURI} value={v.voiceURI}>
                    {v.name} ({v.lang})
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Save Button */}
        <div className="mt-3.5 pt-2.5 border-t-2 border-slate-100 shrink-0">
          <button
            onClick={handleSave}
            className="w-full candy-btn candy-btn-green py-3 rounded-2xl font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all"
          >
            <span>{selectedLang === 'en' ? 'Save & Apply English Voice ✅' : 'Simpan & Terapkan Suara ✅'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
