'use client';

import React, { useState, useEffect } from 'react';
import { Download, Smartphone, X, Share2, PlusSquare } from 'lucide-react';
import { soundEngine } from '@/lib/audio/soundEngine';

export const PwaInstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState<boolean>(false);
  const [isIos, setIsIos] = useState<boolean>(false);
  const [isStandalone, setIsStandalone] = useState<boolean>(false);
  const [showIosGuide, setShowIosGuide] = useState<boolean>(false);
  const [dismissed, setDismissed] = useState<boolean>(false);

  useEffect(() => {
    // Check if already in standalone mode (installed)
    if (
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true
    ) {
      setIsStandalone(true);
      return;
    }

    // Check if iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIos(isIosDevice);

    if (isIosDevice) {
      setIsInstallable(true);
    }

    // Android / Desktop beforeinstallprompt
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    soundEngine.playSfx('click');

    if (deferredPrompt) {
      // Android / Chrome
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        setIsInstallable(false);
      }
      setDeferredPrompt(null);
    } else if (isIos) {
      // Show iOS instruction modal
      setShowIosGuide(true);
    } else {
      alert('Untuk memasang di HP: Buka menu browser (titik tiga) lalu pilih "Tambahkan ke Layar Utama" / "Instal Aplikasi".');
    }
  };

  if (isStandalone || dismissed || !isInstallable) {
    return null;
  }

  return (
    <>
      {/* Floating Bottom Install Banner */}
      <div className="fixed bottom-4 left-4 right-4 z-50 max-w-md mx-auto animate-pop-in">
        <div className="bg-white/95 backdrop-blur-md border-4 border-amber-300 rounded-3xl p-3.5 shadow-[0_12px_28px_rgba(0,0,0,0.15)] flex items-center justify-between gap-3 text-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-400 border-2 border-white flex items-center justify-center text-2xl shadow shrink-0">
              📲
            </div>
            <div>
              <h4 className="font-black text-sm text-slate-900 leading-tight">
                Pasang di Layar Utama HP
              </h4>
              <p className="text-xs text-slate-500 font-bold">
                Mainkan lebih cepat & hemat kuota (PWA)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={handleInstallClick}
              className="candy-btn candy-btn-yellow px-3.5 py-1.5 rounded-2xl text-xs font-black flex items-center gap-1.5 shadow"
            >
              <Download className="w-4 h-4 stroke-[2.5]" />
              <span>Pasang</span>
            </button>
            <button
              onClick={() => setDismissed(true)}
              className="text-slate-400 hover:text-slate-700 p-1 rounded-xl"
              title="Tutup"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* iOS Safari Guide Modal */}
      {showIosGuide && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-pop-in">
          <div className="bg-white border-4 border-sky-300 rounded-[2.5rem] p-6 max-w-sm w-full shadow-2xl text-slate-800 font-fun">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-sky-600">
                <Smartphone className="w-6 h-6" />
                <h3 className="font-black text-lg text-slate-900">Cara Pasang di iPhone/iPad</h3>
              </div>
              <button
                onClick={() => setShowIosGuide(false)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-sm font-bold text-slate-600 mb-6">
              <div className="flex items-start gap-3 bg-sky-50 p-3 rounded-2xl border border-sky-200">
                <div className="w-7 h-7 rounded-xl bg-sky-500 text-white flex items-center justify-center font-black shrink-0">
                  1
                </div>
                <div>
                  Ketuk tombol <strong className="text-slate-900">Bagikan (Share)</strong> <Share2 className="w-4 h-4 inline text-sky-600" /> di bagian bawah layar Safari.
                </div>
              </div>

              <div className="flex items-start gap-3 bg-sky-50 p-3 rounded-2xl border border-sky-200">
                <div className="w-7 h-7 rounded-xl bg-sky-500 text-white flex items-center justify-center font-black shrink-0">
                  2
                </div>
                <div>
                  Gulir ke bawah dan pilih <strong className="text-slate-900">&ldquo;Tambah ke Layar Utama&rdquo; (Add to Home Screen)</strong> <PlusSquare className="w-4 h-4 inline text-sky-600" />.
                </div>
              </div>

              <div className="flex items-start gap-3 bg-emerald-50 p-3 rounded-2xl border border-emerald-200">
                <div className="w-7 h-7 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-black shrink-0">
                  3
                </div>
                <div>
                  Ketuk <strong className="text-emerald-800">&ldquo;Tambah&rdquo;</strong> di pojok kanan atas. Selesai! Aplikasi akan muncul di layar HP Anda.
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowIosGuide(false)}
              className="candy-btn candy-btn-blue w-full py-3 rounded-2xl font-black text-sm"
            >
              Saya Mengerti
            </button>
          </div>
        </div>
      )}
    </>
  );
};
