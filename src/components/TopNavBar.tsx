import React from 'react';
import { Mail, Layers, Music, VolumeX, Globe } from 'lucide-react';
import { Language } from '../types';

interface TopNavBarProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  isMusicPlaying: boolean;
  onToggleMusic: () => void;
  onReturnToEnvelope: () => void;
  onOpenPageMenu: () => void;
  currentPage: number;
  totalPages: number;
}

export const TopNavBar: React.FC<TopNavBarProps> = ({
  language,
  onLanguageChange,
  isMusicPlaying,
  onToggleMusic,
  onReturnToEnvelope,
  onOpenPageMenu,
}) => {
  const isBn = language === 'bn';

  return (
    <header className="sticky top-0 z-40 w-full py-2 px-2 sm:px-4 backdrop-blur-md bg-red-950/95 border-b-2 border-yellow-400 shadow-md">
      <div className="max-w-2xl mx-auto flex items-center justify-between gap-1.5 sm:gap-2">
        {/* Left: Music Toggle Button */}
        <button
          onClick={onToggleMusic}
          className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-serif font-bold transition-all shadow active:scale-95 shrink-0 ${
            isMusicPlaying
              ? 'bg-yellow-400 text-red-950 border border-yellow-200 animate-pulse'
              : 'bg-red-900 text-yellow-300 border border-yellow-400/50 hover:border-yellow-400'
          }`}
          title={isMusicPlaying ? 'সঙ্গীত বন্ধ করুন' : 'সঙ্গীত চালু করুন'}
        >
          {isMusicPlaying ? (
            <>
              <Music className="w-3.5 h-3.5 text-red-900 animate-bounce" />
              <span className="text-[11px] sm:text-xs">
                {isBn ? 'গান বাজছে 🎶' : 'Music On 🎶'}
              </span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5" />
              <span className="text-[11px] sm:text-xs">{isBn ? 'গান বন্ধ' : 'Muted'}</span>
            </>
          )}
        </button>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Envelope Button "খাম" */}
          <button
            onClick={onReturnToEnvelope}
            className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-full bg-red-800 hover:bg-red-700 text-yellow-300 border border-yellow-400 text-xs font-serif font-bold active:scale-95 transition-all shadow"
            title={isBn ? 'খাম দেখুন' : 'View Envelope'}
          >
            <Mail className="w-3.5 h-3.5 text-yellow-400" />
            <span className="text-[11px] sm:text-xs">{isBn ? 'খাম' : 'Cover'}</span>
          </button>

          {/* Page Dropdown / Menu "পাতা" */}
          <button
            onClick={onOpenPageMenu}
            className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-full bg-yellow-400 hover:bg-yellow-300 text-red-950 border border-yellow-200 text-xs font-serif font-bold active:scale-95 transition-all shadow"
            title={isBn ? 'সূচিপত্র ও পাতা নির্বাচন' : 'Pages Menu'}
          >
            <Layers className="w-3.5 h-3.5 text-red-950" />
            <span className="text-[11px] sm:text-xs">{isBn ? 'পাতা' : 'Pages'}</span>
          </button>

          {/* Language Toggle BN / EN */}
          <button
            onClick={() => onLanguageChange(isBn ? 'en' : 'bn')}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-red-900 text-yellow-300 border border-yellow-400 text-xs font-serif hover:bg-red-800 active:scale-95 transition-all"
            title="Switch Language"
          >
            <Globe className="w-3 h-3 text-yellow-400" />
            <span className="font-bold text-[11px] sm:text-xs">{isBn ? 'EN' : 'বাং'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
