import React from "react";
import { Mail, Layers, Music, VolumeX, Globe } from "lucide-react";
import { Language } from "../types";

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
  const isBn = language === "bn";

  const buttonBase =
    "flex min-w-0 items-center justify-center gap-1.5 rounded-full " +
    "px-2 py-2 sm:px-3 sm:py-2 text-[11px] sm:text-xs font-serif font-bold " +
    "transition-all duration-200 active:scale-95 " +
    "focus-visible:outline-none focus-visible:ring-2 " +
    "focus-visible:ring-yellow-300 focus-visible:ring-offset-2 " +
    "focus-visible:ring-offset-red-950";

  return (
    <header className="top-nav-bar sticky top-0 z-40 w-full border-b-2 border-yellow-400 bg-red-950/95 px-2 py-2 shadow-md backdrop-blur-md sm:px-4 sm:py-3">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        {/* Company Logo */}
        <div className="flex min-w-0 items-center justify-between gap-3 sm:justify-start">
          <a
            href="/"
            aria-label="Home"
            className="flex min-w-0 shrink items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300"
          >
            <img
              src="../../Public/image/logo.png"
              alt="Company Logo"
              className="h-8 w-auto max-w-[110px] object-contain sm:h-10 sm:max-w-[150px] md:h-11"
            />
          </a>
          {/* Music Button */}

          <button
            type="button"
            onClick={onToggleMusic}
            aria-label={isMusicPlaying ? "Turn music off" : "Turn music on"}
            aria-pressed={isMusicPlaying}
            title={
              isMusicPlaying
                ? isBn
                  ? "সঙ্গীত বন্ধ করুন"
                  : "Turn music off"
                : isBn
                  ? "সঙ্গীত চালু করুন"
                  : "Turn music on"
            }
            className={`${buttonBase} shrink-0 sm:order-2 ${
              isMusicPlaying
                ? "animate-pulse border border-yellow-200 bg-yellow-400 text-red-950"
                : "border border-yellow-400/60 bg-red-900 text-yellow-300 hover:border-yellow-300 hover:bg-red-800"
            }`}
          >
            {isMusicPlaying ? (
              <Music className="h-4 w-4 shrink-0 animate-bounce" />
            ) : (
              <VolumeX className="h-4 w-4 shrink-0" />
            )}

            <span className="inline">
              {isMusicPlaying
                ? isBn
                  ? "গান বাজছে"
                  : "Music On"
                : isBn
                  ? "গান বন্ধ"
                  : "Muted"}
            </span>
          </button>
        </div>

        {/* Navigation Actions */}
        <nav
          aria-label={isBn ? "প্রধান নেভিগেশন" : "Main navigation"}
          className="grid w-full grid-cols-3 gap-1.5 sm:flex sm:w-auto sm:shrink-0 sm:items-center sm:gap-2"
        >
          {/* Cover / Envelope */}
          <button
            type="button"
            onClick={onReturnToEnvelope}
            title={isBn ? "খাম দেখুন" : "View Envelope"}
            className={`${buttonBase} border border-yellow-400 bg-red-800 text-yellow-300 hover:bg-red-700 sm:flex-none`}
          >
            <Mail className="h-3.5 w-3.5 shrink-0 text-yellow-400 sm:h-4 sm:w-4" />
            <span className="truncate">{isBn ? "খাম" : "Cover"}</span>
          </button>

          {/* Pages Menu */}
          <button
            type="button"
            onClick={onOpenPageMenu}
            title={isBn ? "সূচিপত্র ও পাতা নির্বাচন" : "Pages Menu"}
            className={`${buttonBase} border border-yellow-200 bg-yellow-400 text-red-950 hover:bg-yellow-300 sm:flex-none`}
          >
            <Layers className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
            <span className="truncate">{isBn ? "পাতা" : "Pages"}</span>
          </button>

          {/* Language Toggle */}
          <button
            type="button"
            onClick={() => onLanguageChange(isBn ? "en" : "bn")}
            aria-label={isBn ? "Switch to English" : "বাংলায় পরিবর্তন করুন"}
            title={isBn ? "Switch to English" : "Switch to Bengali"}
            className={`${buttonBase} border border-yellow-400 bg-red-900 text-yellow-300 hover:bg-red-800 sm:flex-none`}
          >
            <Globe className="h-3.5 w-3.5 shrink-0 text-yellow-400 sm:h-4 sm:w-4" />
            <span className="truncate font-bold">{isBn ? "EN" : "বাং"}</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
