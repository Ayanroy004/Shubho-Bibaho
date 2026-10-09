import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, ArrowRight } from 'lucide-react';
import { GaneshaCrest, KolkaOrnament } from './Ornaments';
import { Language, WeddingSettings } from '../types';
import { weddingAudio } from '../utils/audioPlayer';

interface EnvelopeOpeningProps {
  onOpen: () => void;
  language: Language;
  settings: WeddingSettings;
  onStartMusic: () => void;
  isMusicPlaying: boolean;
}

export const EnvelopeOpening: React.FC<EnvelopeOpeningProps> = ({
  onOpen,
  language,
  settings,
  onStartMusic,
  isMusicPlaying,
}) => {
  // Stages: 'idle' | 'unsealing' | 'flap-opening' | 'card-rising' | 'transitioning'
  const [animStage, setAnimStage] = useState<'idle' | 'unsealing' | 'flap-opening' | 'card-rising' | 'transitioning'>('idle');
  const isBn = language === 'bn';

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 65,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#facc15', '#ffd700', '#dc2626', '#ffffff', '#ef4444'],
      });
      setTimeout(() => {
        confetti({
          particleCount: 45,
          angle: 60,
          spread: 70,
          origin: { x: 0.1, y: 0.7 },
          colors: ['#facc15', '#ffd700', '#dc2626'],
        });
        confetti({
          particleCount: 45,
          angle: 120,
          spread: 70,
          origin: { x: 0.9, y: 0.7 },
          colors: ['#facc15', '#ffd700', '#dc2626'],
        });
      }, 300);
    } catch {
      // ignore
    }
  };

  const handleStartOpening = () => {
    if (animStage !== 'idle') return;

    // Start background wedding music automatically upon opening
    onStartMusic();

    // Step 1: Break wax seal & burst festive flower confetti
    setAnimStage('unsealing');
    triggerConfetti();

    // Step 2: Open top flap in 3D (0.35s)
    setTimeout(() => {
      setAnimStage('flap-opening');
    }, 350);

    // Step 3: Slide card gracefully upwards out of envelope pocket (0.75s)
    setTimeout(() => {
      setAnimStage('card-rising');
    }, 750);

    // Step 4: Smoothly unveil the full, glorious Page 1 with all details (1.4s)
    setTimeout(() => {
      setAnimStage('transitioning');
      setTimeout(() => {
        onOpen();
      }, 400);
    }, 1450);
  };

  const handleDirectOpen = () => {
    onStartMusic();
    triggerConfetti();
    onOpen();
  };

  return (
    <div className={`min-h-screen w-full flex flex-col items-center justify-center px-3 py-6 bg-gradient-to-b from-[#450a0a] via-[#5c0e0e] to-[#3a0606] text-white relative overflow-hidden select-none perspective-1200 transition-opacity duration-500 ${
      animStage === 'transitioning' ? 'opacity-0 scale-95' : 'opacity-100'
    }`}>
      {/* Decorative ambient background glows & floating flower petals */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Floating flower petals */}
      <div className="absolute top-12 left-[12%] text-yellow-400/40 text-xl animate-petal pointer-events-none">🌸</div>
      <div className="absolute top-24 right-[15%] text-red-400/40 text-2xl animate-petal [animation-delay:1.5s] pointer-events-none">🌺</div>
      <div className="absolute bottom-16 left-[18%] text-yellow-400/40 text-lg animate-petal [animation-delay:2.5s] pointer-events-none">🌼</div>
      <div className="absolute bottom-28 right-[10%] text-yellow-300/40 text-xl animate-petal [animation-delay:3.5s] pointer-events-none">🌸</div>

      {/* Top Auspicious Header Banner */}
      <div className="text-center mb-4 sm:mb-6 z-10 max-w-sm sm:max-w-md px-2">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-red-950/90 border-2 border-yellow-400 text-yellow-300 text-[11px] sm:text-xs font-serif tracking-wider shadow-lg mb-2 sm:mb-3">
          <Sparkles className="w-3.5 h-3.5 text-yellow-400 animate-spin" />
          <span>{isBn ? '॥ শ্রী শ্রী প্রজাপতয়ে নমঃ ॥' : '॥ Om Sri Prajapataye Namah ॥'}</span>
          <Sparkles className="w-3.5 h-3.5 text-yellow-400 animate-spin" />
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold font-serif text-yellow-400 drop-shadow-md">
          {isBn ? 'শুভ পরিণয় নিমন্ত্রণ পত্র' : 'The Royal Wedding Invitation'}
        </h1>
        <p className="text-xs sm:text-sm text-yellow-100/90 mt-1 font-serif">
          {isBn ? 'ভালোবাসা ও সংস্কৃতির চিরন্তন মেলবন্ধন' : 'A Celebration of Timeless Love & Traditions'}
        </p>
      </div>

      {/* ========================================================================= */}
      {/* 3D LUXURY ENVELOPE STAGE                                                 */}
      {/* ========================================================================= */}
      <div className="relative w-full max-w-[340px] xs:max-w-[370px] sm:max-w-[420px] aspect-[4/3] flex items-center justify-center my-3 sm:my-4">
        {/* ENVELOPE SHELL */}
        <div
          onClick={handleStartOpening}
          className="relative w-full h-full rounded-2xl bg-gradient-to-br from-[#7f1d1d] via-[#991b1b] to-[#550c0c] border-2 border-yellow-400 shadow-[0_25px_50px_rgba(0,0,0,0.7)] transition-all duration-500 preserve-3d cursor-pointer group"
        >
          {/* Inner Back Lining Texture (Golden Silk) */}
          <div className="absolute inset-2 rounded-xl bg-gradient-to-b from-yellow-200 via-yellow-100 to-yellow-300 border border-yellow-500/50 shadow-inner flex flex-col items-center justify-center opacity-90 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(#ca8a04_1px,transparent_1px)] [background-size:12px_12px] opacity-25" />
            <GaneshaCrest className="w-16 h-16 text-yellow-700/30" />
          </div>

          {/* ===================================================================== */}
          {/* THE WEDDING INVITATION CARD (SLIDES OUT PROMINENTLY)                   */}
          {/* ===================================================================== */}
          <div
            className={`absolute left-3 right-3 rounded-xl bg-white border-2 border-yellow-400 shadow-2xl p-3.5 sm:p-4 flex flex-col justify-between text-red-950 transition-all duration-700 ease-out z-25 ${
              animStage === 'idle' || animStage === 'unsealing'
                ? 'top-4 bottom-4 translate-y-0 opacity-0 pointer-events-none'
                : animStage === 'flap-opening'
                ? 'top-4 bottom-4 translate-y-0 opacity-90'
                : /* card-rising or transitioning */
                  'top-[-20%] sm:top-[-25%] bottom-[20%] sm:bottom-[25%] opacity-100 scale-102 shadow-[0_20px_45px_rgba(0,0,0,0.6)] ring-2 ring-yellow-400'
            }`}
          >
            {/* Top of Card */}
            <div className="text-center">
              <div className="flex justify-center items-center gap-1 mb-0.5">
                <KolkaOrnament className="w-4 h-4 text-yellow-500" />
                <GaneshaCrest className="w-7 h-7 text-red-800" />
                <KolkaOrnament className="w-4 h-4 text-yellow-500 -scale-x-100" />
              </div>
              <span className="text-[10px] font-serif font-bold text-red-800 uppercase tracking-wider block">
                {isBn ? '॥ শুভ বিবাহ নিমন্ত্রণ পত্র ॥' : '॥ Royal Wedding Invitation ॥'}
              </span>
            </div>

            {/* Couple Names */}
            <div className="text-center my-auto py-1">
              <h2 className="text-base sm:text-lg font-bold font-serif text-red-900 tracking-wide">
                {isBn
                  ? `${settings.groom.nameBn} ও ${settings.bride.nameBn}`
                  : `${settings.groom.nameEn} & ${settings.bride.nameEn}`}
              </h2>
              <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-red-700 font-serif mt-0.5">
                <Heart className="w-3 h-3 fill-red-600 text-red-600" />
                <span>{isBn ? settings.weddingDateBn : settings.weddingDateEn}</span>
              </div>
            </div>

            {/* Hint */}
            <div className="pt-1 border-t border-yellow-300 text-center text-[10px] text-red-900 font-serif font-semibold">
              {isBn ? 'আমন্ত্রণ পত্র উন্মোচিত হচ্ছে...' : 'Unveiling Invitation Details...'}
            </div>
          </div>

          {/* FRONT POCKET (Lower triangular & side envelope folds) */}
          <div className="absolute inset-0 rounded-2xl pointer-events-none z-30 overflow-hidden">
            {/* Left triangle fold */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-[#881313] to-[#6e1010] shadow-[2px_0_10px_rgba(0,0,0,0.3)] border-l-2 border-yellow-400/80"
              style={{ clipPath: 'polygon(0 0, 0 100%, 50% 50%)' }}
            />
            {/* Right triangle fold */}
            <div
              className="absolute inset-0 bg-gradient-to-l from-[#881313] to-[#6e1010] shadow-[-2px_0_10px_rgba(0,0,0,0.3)] border-r-2 border-yellow-400/80"
              style={{ clipPath: 'polygon(100% 0, 100% 100%, 50% 50%)' }}
            />
            {/* Bottom triangle fold */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-[#600e0e] via-[#751212] to-[#881313] shadow-[0_-3px_12px_rgba(0,0,0,0.35)] border-b-2 border-yellow-400/80"
              style={{ clipPath: 'polygon(0 100%, 100% 100%, 50% 48%)' }}
            />
          </div>

          {/* TOP FOLDING FLAP (Flips UPWARD in 3D from 0deg to -180deg) */}
          <div
            className={`absolute top-0 left-0 right-0 h-1/2 z-35 origin-top transition-transform duration-700 preserve-3d ${
              animStage === 'idle' || animStage === 'unsealing'
                ? 'rotate-x-0'
                : '-rotate-x-180'
            }`}
          >
            {/* Flap Outer (Red with Gold Border facing guest) */}
            <div
              className="absolute inset-0 bg-gradient-to-b from-[#8f1515] to-[#690f0f] border-t-2 border-yellow-400 shadow-[0_6px_15px_rgba(0,0,0,0.4)] flex flex-col items-center justify-start pt-2 backface-hidden"
              style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
            >
              <div className="flex items-center gap-1 text-yellow-400 pt-0.5">
                <span className="text-[10px]">✦</span>
                <span className="text-[11px] sm:text-xs font-serif font-bold tracking-widest">{isBn ? 'শুভ পরিণয়' : 'Shubho Bibaho'}</span>
                <span className="text-[10px]">✦</span>
              </div>
            </div>

            {/* Flap Inner (Golden Silk Lining when flipped open) */}
            <div
              className="absolute inset-0 bg-gradient-to-b from-yellow-300 via-yellow-200 to-yellow-400 border border-yellow-500 shadow-inner flex items-center justify-center [transform:rotateX(180deg)] backface-hidden"
              style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
            >
              <div className="text-red-950 font-serif font-bold text-xs opacity-60">ॐ</div>
            </div>
          </div>

          {/* ===================================================================== */}
          {/* GOLDEN RIBBON BAND (Unlocks when clicked)                             */}
          {/* ===================================================================== */}
          <div
            className={`absolute top-1/2 -translate-y-1/2 left-0 right-0 h-9 z-36 pointer-events-none transition-all duration-400 flex items-center justify-between px-2 bg-gradient-to-r from-yellow-400/90 via-yellow-200 to-yellow-400/90 border-y-2 border-yellow-500 shadow-md ${
              animStage !== 'idle' ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'
            }`}
          >
            <div className="w-2 h-2 rounded-full bg-red-800" />
            <span className="text-[10px] sm:text-xs font-serif font-bold text-red-950 tracking-wider">
              {isBn ? 'পরম স্নেহের শুভ আমন্ত্রণ' : 'Royal Wedding Invitation'}
            </span>
            <div className="w-2 h-2 rounded-full bg-red-800" />
          </div>

          {/* ===================================================================== */}
          {/* 3D EMBOSSED WAX SEAL BUTTON (CENTERPIECE)                              */}
          {/* ===================================================================== */}
          <div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 transition-all duration-400 ${
              animStage === 'idle'
                ? 'scale-100 group-hover:scale-110'
                : animStage === 'unsealing'
                ? 'scale-125 opacity-90 rotate-12'
                : 'scale-0 opacity-0 pointer-events-none'
            }`}
          >
            {/* Pulsing golden aura glow */}
            <div className="relative flex items-center justify-center w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-gradient-to-br from-red-600 via-red-700 to-red-950 border-4 border-yellow-400 shadow-[0_0_25px_rgba(250,204,21,0.8),0_10px_20px_rgba(0,0,0,0.5)] animate-seal">
              {/* Inner seal ring */}
              <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-full border-2 border-dashed border-yellow-300 flex flex-col items-center justify-center text-yellow-300 bg-red-800/80 shadow-inner">
                <Heart className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400 animate-bounce" />
                <span className="text-[9px] font-bold tracking-tight text-yellow-200">
                  {isBn ? 'অ & শ্রে' : 'A & S'}
                </span>
              </div>

              {/* Sparkle badge */}
              <div className="absolute -top-1 -right-1 p-1 rounded-full bg-yellow-400 text-red-950 shadow">
                <Sparkles className="w-3 h-3" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* INTERACTIVE INSTRUCTIONS / CTA BUTTONS                                    */}
      {/* ========================================================================= */}
      <div className="mt-4 sm:mt-6 z-20 flex flex-col items-center gap-2">
        {animStage === 'idle' ? (
          <>
            <button
              onClick={handleStartOpening}
              className="px-6 sm:px-7 py-3 rounded-full bg-yellow-400 hover:bg-yellow-300 text-red-950 font-serif font-bold text-sm sm:text-base border-2 border-yellow-200 shadow-xl active:scale-95 transition-all flex items-center gap-2 group"
            >
              <span>{isBn ? '✉️ খাম খুলতে এখানে ক্লিক করুন' : '✉️ Tap to Open The Envelope'}</span>
              <ArrowRight className="w-4 h-4 text-red-950 group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="flex items-center gap-3">
              <span className="text-xs text-yellow-200 font-serif">
                {isBn ? 'বা মোমচিহ্নে ট্যাপ করুন' : 'Or tap the wax seal'}
              </span>
              <span className="text-yellow-400/50">•</span>
              <button
                onClick={handleDirectOpen}
                className="text-xs text-yellow-300 font-serif underline hover:text-white"
              >
                {isBn ? 'সরাসরি আমন্ত্রণ দেখুন ›' : 'Skip directly to invitation ›'}
              </button>
            </div>
          </>
        ) : (
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-950 border-2 border-yellow-400 text-yellow-300 text-xs sm:text-sm font-serif font-bold shadow-lg animate-pulse">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span>{isBn ? 'আমন্ত্রণ পত্র উন্মোচিত হচ্ছে...' : 'Opening Wedding Invitation...'}</span>
          </div>
        )}
      </div>
    </div>
  );
};
