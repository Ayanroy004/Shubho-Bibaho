import React, { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  Heart,
  ArrowRight,
} from "lucide-react";
import { Language, WeddingSettings } from "../types";
import {
  GaneshaCrest,
  KolkaOrnament,
  MandapDivider,
  RoyalFrame,
} from "../components/Ornaments";

interface Page1Props {
  settings: WeddingSettings;
  language: Language;
  onNextPage: () => void;
  onGoToRSVP: () => void;
}

export const Page1DateWedding: React.FC<Page1Props> = ({
  settings,
  language,
  onNextPage,
  onGoToRSVP,
}) => {
  const isBn = language === "bn";

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const targetDate = new Date(settings.weddingDate).getTime();
      const now = Date.now();
      const difference = targetDate - now;

      if (!Number.isFinite(targetDate) || difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    };

    calculateTime();
    const interval = window.setInterval(calculateTime, 1000);

    return () => window.clearInterval(interval);
  }, [settings.weddingDate]);

  const toBn = (n: number) => {
    if (!isBn) return String(n).padStart(2, "0");

    const bn = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

    return String(n)
      .padStart(2, "0")
      .split("")
      .map((d) => bn[parseInt(d, 10)] || d)
      .join("");
  };

  const countdownItems = [
    {
      labelBn: "দিন",
      labelEn: "Days",
      val: timeLeft.days,
    },
    {
      labelBn: "ঘন্টা",
      labelEn: "Hours",
      val: timeLeft.hours,
    },
    {
      labelBn: "মিনিট",
      labelEn: "Mins",
      val: timeLeft.minutes,
    },
    {
      labelBn: "সেকেন্ড",
      labelEn: "Secs",
      val: timeLeft.seconds,
    },
  ];

  return (
    <div className="mx-auto w-full min-w-0 max-w-xl overflow-x-clip px-2 py-3 pb-28 text-red-950 animate-in fade-in duration-500 sm:px-4 sm:py-4">
      <RoyalFrame className="min-w-0 border-2 border-yellow-400 bg-white text-center shadow-2xl">
        {/* Top Auspicious Header */}
        <div className="mb-2 flex items-center justify-center gap-1.5 sm:mb-3 sm:gap-2">
          <KolkaOrnament className="h-5 w-5 shrink-0 text-yellow-500 sm:h-7 sm:w-7" />

          <GaneshaCrest className="h-9 w-9 shrink-0 text-red-700 sm:h-12 sm:w-12" />

          <KolkaOrnament className="h-5 w-5 shrink-0 -scale-x-100 text-yellow-500 sm:h-7 sm:w-7" />
        </div>

        <div className="break-words text-[10px] font-serif font-bold uppercase tracking-[0.12em] text-red-800 min-[375px]:text-xs sm:text-sm sm:tracking-widest">
          {isBn
            ? "॥ ওঁ শ্রী শ্রী প্রজাপতয়ে নমঃ ॥"
            : "॥ Om Sri Prajapataye Namah ॥"}
        </div>

        <h1 className="mt-2 mb-1 md:mt-5 break-words font-serif text-3xl font-bold tracking-tight text-red-900 min-[375px]:text-4xl sm:text-5xl">
          {isBn ? "শুভ প্রীতিভোজ " : "Grand Wedding Reception"}
        </h1>

        <p className="mx-auto max-w-md px-1 text-xs font-serif italic leading-relaxed text-red-950/90 sm:text-sm">
          {isBn
            ? "“মঙ্গলম্ ভগবান বিষ্ণুঃ মঙ্গলম্ গরুড়ধ্বজঃ। মঙ্গলম্ পুণ্ডরীকাক্ষো মঙ্গলায় তনো হরিঃ॥”"
            : '"May divine grace illuminate this sacred union of two loving souls."'}
        </p>

        <MandapDivider className="my-3 sm:my-4" />

        {/* Couple Names */}
        <div className="min-w-0 py-1">
          <div className="break-words text-[10px] font-serif font-bold uppercase tracking-wider text-red-700 min-[375px]:text-xs sm:text-sm sm:tracking-widest">
            {isBn
              ? "শুভ প্রীতিভোজের অনুষ্ঠানে আপনাকে সাগ্রহ নিমন্ত্রণ"
              : "Cordially Invite You to the Grand Wedding Reception of"}
          </div>

          <div className="my-2.5 flex min-w-0 flex-col items-center justify-center gap-1 sm:my-3 sm:flex-row sm:gap-2.5">
            <h2 className="max-w-full break-words px-1 font-serif text-2xl font-bold tracking-wide text-red-900 min-[375px]:text-3xl sm:px-0 md:text-4xl">
              {isBn ? settings.groom.nameBn : settings.groom.nameEn}
            </h2>

            <div className="my-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-yellow-400 bg-red-100 text-red-700 shadow-sm sm:my-0">
              <Heart className="h-4 w-4 fill-red-600 text-red-600" />
            </div>

            <h2 className="max-w-full break-words px-1 font-serif text-2xl font-bold tracking-wide text-red-900 min-[375px]:text-3xl sm:px-0 md:text-4xl">
              {isBn ? settings.bride.nameBn : settings.bride.nameEn}
            </h2>
          </div>

          <p className="mx-auto max-w-sm px-2 text-xs font-serif leading-relaxed text-stone-700 sm:px-1 sm:text-sm">
            {isBn
              ? "আমাদের জীবনের এই শ্রেষ্ঠ আনন্দক্ষণে আপনার আন্তরিক উপস্থিতি ও আশীর্বাদ একান্ত প্রার্থনীয়।"
              : "Your gracious presence and heartfelt blessings will make this grand celebration truly memorable."}
          </p>
        </div>

        {/* Auspicious Date & Time Card */}
        <div className="my-4 min-w-0 rounded-2xl border-2 border-yellow-400 bg-red-50 p-3 text-left shadow-sm min-[375px]:p-3.5 sm:p-5">
          <div className="flex min-w-0 items-start gap-2.5 sm:gap-3">
            <div className="shrink-0 rounded-xl bg-red-800 p-2.5 text-yellow-300 shadow sm:p-3">
              <Calendar className="h-6 w-6 sm:h-7 sm:w-7" />
            </div>

            <div className="min-w-0 flex-1">
              <span className="block break-words text-[10px] font-bold uppercase tracking-wider text-red-800 min-[375px]:text-xs">
                {isBn ? "শুভ প্রীতিভোজের দিনক্ষণ" : "Reception Date & Time"}
              </span>

              <h3 className="mt-0.5 break-words font-serif text-base font-bold leading-snug text-red-950 min-[375px]:text-lg">
                {isBn ? settings.receptionDateBn : settings.receptionDateEn}
              </h3>

              <div className="mt-1 flex min-w-0 items-start gap-1.5 font-serif text-xs leading-relaxed text-stone-800 sm:text-sm">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-red-700" />

                <span className="min-w-0 break-words">
                  {isBn
                    ? "সন্ধ্যা ৬:০০ হইতে অতিথি সমাগম"
                    : "Reception starts from 6:00 PM"}
                </span>
              </div>
            </div>
          </div>

          {/* Venue Preview */}
          <div className="mt-3 flex min-w-0 items-start gap-2 border-t border-yellow-400/40 pt-3 text-xs text-stone-800 sm:gap-2.5 sm:text-sm">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-red-700" />

            <div className="min-w-0 break-words leading-relaxed">
              <span className="font-bold text-red-900">
                {isBn
                  ? settings.receptionVenueNameBn
                  : settings.receptionVenueNameEn}
                :
              </span>{" "}
              {isBn
                ? settings.receptionVenueAddressBn
                : settings.receptionVenueAddressEn}
            </div>
          </div>
        </div>

        {/* Live Countdown Timer */}
        <div className="my-4 min-w-0">
          <div className="mb-2 flex items-center justify-center gap-1 text-[10px] font-serif font-bold uppercase tracking-wide text-red-900 min-[375px]:text-xs sm:gap-1.5 sm:tracking-wider">
            <Sparkles className="h-3.5 w-3.5 shrink-0 text-yellow-500 sm:h-4 sm:w-4" />

            <span className="min-w-0 break-words text-center">
              {isBn
                ? "শুভ লগ্নের আর বাকি মাত্র"
                : "Countdown to the Sacred Vows"}
            </span>

            <Sparkles className="h-3.5 w-3.5 shrink-0 text-yellow-500 sm:h-4 sm:w-4" />
          </div>

          <div className="mx-auto grid w-full max-w-xs grid-cols-4 gap-1.5 min-[375px]:gap-2 sm:max-w-sm sm:gap-3">
            {countdownItems.map((item, idx) => (
              <div
                key={idx}
                className="flex min-w-0 flex-col items-center justify-center rounded-xl border-2 border-yellow-400 bg-red-900 px-0.5 py-2 text-center shadow min-[375px]:px-1 sm:p-2.5"
              >
                <div className="w-full break-all font-mono text-lg font-bold leading-tight tracking-tight text-yellow-300 min-[375px]:text-xl sm:text-3xl">
                  {toBn(item.val)}
                </div>

                <div className="mt-1 w-full break-words text-[9px] font-serif font-medium leading-tight text-white min-[375px]:text-[10px] sm:text-xs">
                  {isBn ? item.labelBn : item.labelEn}
                </div>
              </div>
            ))}
          </div>
        </div>

        <MandapDivider className="my-4" />

        {/* Action Buttons */}
        {/* <div className="mt-4 flex min-w-0 flex-col items-stretch justify-center gap-2.5 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={onNextPage}
            className="group flex w-full min-w-0 items-center justify-center gap-1.5 rounded-full border-2 border-yellow-400 bg-red-800 px-4 py-3 text-center font-serif text-xs font-bold text-yellow-300 shadow-md transition-all hover:bg-red-700 active:scale-95 sm:w-auto sm:px-6 sm:text-sm"
          >
            <span className="min-w-0 break-words">
              {isBn
                ? "উভয় পরিবারের পরিচয় দেখুন"
                : "View Bride & Groom's Family"}
            </span>

            <ArrowRight className="h-4 w-4 shrink-0 text-yellow-400 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            type="button"
            onClick={onGoToRSVP}
            className="flex w-full min-w-0 items-center justify-center gap-1 rounded-full border-2 border-yellow-200 bg-yellow-400 px-4 py-3 text-center font-serif text-xs font-bold text-red-950 shadow-md transition-all hover:bg-yellow-300 active:scale-95 sm:w-auto sm:px-5 sm:text-sm"
          >
            <span className="min-w-0 break-words">
              {isBn ? "উপস্থিতি নিশ্চিত করুন (RSVP)" : "Confirm RSVP"}
            </span>
          </button>
        </div> */}
      </RoyalFrame>
    </div>
  );
};
