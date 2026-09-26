'use client';

import React, { useState, useEffect } from 'react';
import {
  voiceEngine,
  VoicePersona,
  VoiceLanguage,
  ExpressivityMode,
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
  const [expressivityMode, setExpressivityMode] = useState<ExpressivityMode>(voiceEngine.getExpressivityMode());
  const [isPlayingPreview, setIsPlayingPreview] = useState<string | null>(null);
  const [systemVoices, setSystemVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceURI, setSelectedVoiceURI] = useState<string>(voiceEngine.getSelectedVoiceURI() || '');

  useEffect(() => {
    if (isOpen) {
      const currentLang = voiceEngine.getLanguage();
      setSelectedLang(currentLang);
      setSelectedPersonaId(voiceEngine.getActivePersonaId());
      setExpressivityMode(voiceEngine.getExpressivityMode());
      setSelectedVoiceURI(voiceEngine.getSelectedVoiceURI(currentLang) || '');
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
    setSelectedVoiceURI(voiceEngine.getSelectedVoiceURI(lang) || '');
    const personas = voiceEngine.getNarratorPersonas(lang);
    if (!personas.some(p => p.id === selectedPersonaId)) {
      setSelectedPersonaId(personas[0].id);
    }
  };

  const handlePreviewExpressivity = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundEngine.playSfx('click');
    setIsPlayingPreview('expressivity_demo');
    const demoText =
      selectedLang === 'en'
        ? "Hello superstars! Wow, look at those shiny red apples! They look so sweet! Let's pick them together. How many apples did we find?"
        : "Halo teman-teman! Wah, lihat buah apel merah itu! Manis sekali! Ayo kita petik bersama-sama ya. Berapa apel yang sudah kita kumpulkan?";

    voiceEngine.speak(demoText, {
      speaker: 'narrator',
      lang: selectedLang,
      expressivity: expressivityMode,
      onEnd: () => setIsPlayingPreview(null),
    });
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
      expressivity: expressivityMode,
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
    voiceEngine.setExpressivityMode(expressivityMode);
    voiceEngine.setSelectedVoiceURI(selectedVoiceURI || null, selectedLang);
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
                <strong>Sistem Suara Terpisah (Damayanti):</strong> Narator menggunakan suara resmi <strong>Damayanti</strong>, Budi menggunakan karakter <strong>anak cowok kecil</strong>, dan Siti menggunakan karakter <strong>anak cewek kecil</strong>.
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
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <h5 className="font-black text-xs sm:text-sm text-slate-900 truncate">
                            {char.name}
                          </h5>
                          <span
                            className={`text-[9px] font-black px-1.5 py-0.5 rounded-full ${
                              isBudi
                                ? 'bg-amber-200/80 text-amber-900'
                                : 'bg-pink-200/80 text-pink-900'
                            }`}
                          >
                            {isBudi
                              ? (selectedLang === 'en' ? 'Boy Voice' : 'Anak Cowok')
                              : (selectedLang === 'en' ? 'Girl Voice' : 'Anak Cewek')}
                          </span>
                        </div>
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
                          ? `Test ${isBudi ? 'Budi (Boy)' : 'Siti (Girl)'} Voice`
                          : `Tes Suara ${isBudi ? 'Budi (Anak Cowok)' : 'Siti (Anak Cewek)'}`}
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SECTION 2: EXPRESSIVITY & EMOTIONAL INTONATION */}
          <div className="bg-gradient-to-r from-amber-50/80 via-orange-50/60 to-yellow-50/80 p-3 sm:p-3.5 rounded-2xl border-2 border-amber-200">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs sm:text-sm font-black text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                <span>✨</span>
                <span>{selectedLang === 'en' ? 'Voice Expressivity & Prosody' : 'Gaya Nada & Ekspresi Suara'}</span>
              </h4>
              <span className="text-[10px] font-black bg-amber-200/80 text-amber-900 px-2 py-0.5 rounded-full">
                {selectedLang === 'en' ? 'Natural Flow' : 'Lebih Hidup & Alami'}
              </span>
            </div>

            <p className="text-[11px] text-amber-800 font-bold mb-2.5 leading-snug">
              {selectedLang === 'en'
                ? 'Adjusts emotional pitch variations, clause breathing pauses, and enthusiastic inflection!'
                : 'Mengatur variasi tinggi-rendah nada emosional, jeda napas antar-klausa, dan kehangatan suara agar tidak kaku!'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-2.5">
              {[
                {
                  id: 'vibrant' as ExpressivityMode,
                  emoji: '⚡',
                  title: selectedLang === 'en' ? 'Vibrant' : 'Super Ceria',
                  desc: selectedLang === 'en' ? 'Dynamic & joyful' : 'Riang & penuh semangat',
                  color: 'border-amber-400 bg-white ring-2 ring-amber-300',
                },
                {
                  id: 'storyteller' as ExpressivityMode,
                  emoji: '📖',
                  title: selectedLang === 'en' ? 'Storyteller' : 'Mendongeng',
                  desc: selectedLang === 'en' ? 'Warm & paced' : 'Hangat & berirama',
                  color: 'border-purple-400 bg-white ring-2 ring-purple-300',
                },
                {
                  id: 'gentle' as ExpressivityMode,
                  emoji: '🌿',
                  title: selectedLang === 'en' ? 'Gentle' : 'Tenang',
                  desc: selectedLang === 'en' ? 'Soft & focused' : 'Lembut & santai',
                  color: 'border-emerald-400 bg-white ring-2 ring-emerald-300',
                },
              ].map((mode) => {
                const isSelected = expressivityMode === mode.id;
                return (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => {
                      soundEngine.playSfx('click');
                      setExpressivityMode(mode.id);
                    }}
                    className={`p-2 rounded-xl border-2 text-left transition-all flex flex-col justify-between ${
                      isSelected
                        ? mode.color + ' shadow-sm'
                        : 'border-amber-200/70 bg-white/70 hover:bg-white text-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-base">{mode.emoji}</span>
                      {isSelected && <span className="w-2 h-2 rounded-full bg-amber-500"></span>}
                    </div>
                    <div>
                      <div className="text-xs font-black text-slate-900 leading-tight">
                        {mode.title}
                      </div>
                      <div className="text-[10px] text-slate-500 font-bold leading-tight mt-0.5">
                        {mode.desc}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={handlePreviewExpressivity}
              className={`w-full py-2 px-3 rounded-xl font-black text-xs flex items-center justify-center gap-2 transition-all active:scale-95 shadow-xs ${
                isPlayingPreview === 'expressivity_demo'
                  ? 'bg-amber-500 text-white animate-pulse'
                  : 'bg-white border-2 border-amber-300 text-amber-900 hover:bg-amber-100/60'
              }`}
            >
              {isPlayingPreview === 'expressivity_demo' ? (
                <Volume2 className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4 fill-current text-amber-600" />
              )}
              <span>
                {isPlayingPreview === 'expressivity_demo'
                  ? selectedLang === 'en'
                    ? 'Playing Expressive Preview...'
                    : 'Memutar Contoh Cerita Ekspresif...'
                  : selectedLang === 'en'
                  ? 'Test Expressive Story Voice'
                  : 'Tes Contoh Cerita Berirama Ekspresif'}
              </span>
            </button>
          </div>

          {/* SECTION 3: NARRATOR PERSONAS SELECTION */}
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

          {/* SECTION 4: SYSTEM VOICE OVERRIDE IF AVAILABLE */}
          <div className="pt-2 border-t border-slate-200">
            <label className="block text-[11px] font-black text-slate-600 mb-1">
              ⚙️ {selectedLang === 'en' ? 'Device System Voice:' : 'Suara Sistem Perangkat:'}
            </label>
            {systemVoices.length > 0 ? (
              <select
                value={selectedVoiceURI}
                onChange={(e) => setSelectedVoiceURI(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-2.5 py-1.5 text-xs font-bold text-slate-700 outline-none focus:ring-2 focus:ring-purple-300"
              >
                <option value="">
                  {selectedLang === 'en'
                    ? 'Otomatis: Suara Bahasa Inggris Alami'
                    : 'Otomatis: Suara Damayanti (id-ID) - Standar Resmi Apple / Indonesia'}
                </option>
                {systemVoices.map((v) => (
                  <option key={v.voiceURI} value={v.voiceURI}>
                    {v.name} ({v.lang})
                  </option>
                ))}
              </select>
            ) : (
              <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold flex items-center gap-2">
                <span>✅</span>
                <span>
                  {selectedLang === 'en'
                    ? 'Sistem Suara Bahasa Inggris Aktif'
                    : 'Sistem Suara Damayanti Asli Bahasa Indonesia (id-ID) Aktif'}
                </span>
              </div>
            )}
          </div>
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
