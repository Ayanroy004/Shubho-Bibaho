import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Sparkles, Heart, ArrowRight } from 'lucide-react';
import { Language, WeddingSettings } from '../types';
import { GaneshaCrest, KolkaOrnament, MandapDivider, RoyalFrame } from '../components/Ornaments';

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
  const isBn = language === 'bn';

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const targetDate = new Date(settings.weddingDate).getTime();
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [settings.weddingDate]);

  const toBn = (n: number) => {
    if (!isBn) return String(n).padStart(2, '0');
    const bn = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return String(n)
      .padStart(2, '0')
      .split('')
      .map(d => bn[parseInt(d, 10)] || d)
      .join('');
  };

  return (
    <div className="w-full max-w-xl mx-auto px-2.5 sm:px-4 py-4 pb-28 text-red-950 animate-in fade-in duration-500">
      <RoyalFrame className="text-center bg-white border-2 border-yellow-400 shadow-2xl">
        {/* Top Auspicious Header */}
        <div className="flex justify-center items-center gap-2 mb-2 sm:mb-3">
          <KolkaOrnament className="w-6 sm:w-7 h-6 sm:h-7 text-yellow-500" />
          <GaneshaCrest className="w-10 sm:w-12 h-10 sm:h-12 text-red-700" />
          <KolkaOrnament className="w-6 sm:w-7 h-6 sm:h-7 text-yellow-500 -scale-x-100" />
        </div>

        <div className="text-xs sm:text-sm font-serif font-bold text-red-800 tracking-widest uppercase">
          {isBn ? '॥ ওঁ শ্রী শ্রী প্রজাপতয়ে নমঃ ॥' : '॥ Om Sri Prajapataye Namah ॥'}
        </div>

        <h1 className="text-3xl sm:text-5xl font-bold font-serif text-red-900 mt-1 mb-1 tracking-tight">
          {isBn ? 'শুভ পরিণয়' : 'Shubho Bibaho'}
        </h1>

        <p className="text-xs sm:text-sm font-serif italic text-red-950/90 max-w-md mx-auto px-1">
          {isBn
            ? '“মঙ্গলম্ ভগবান বিষ্ণুঃ মঙ্গলম্ গরুড়ধ্বজঃ। মঙ্গলম্ পুণ্ডরীকাক্ষো মঙ্গলায় তনো হরিঃ॥”'
            : '"May divine grace illuminate this sacred union of two loving souls."'}
        </p>

        <MandapDivider className="my-3 sm:my-4" />

        {/* Couple Names */}
        <div className="py-1">
          <div className="text-xs uppercase font-serif tracking-widest text-red-700 font-bold">
            {isBn ? 'শুভ বিবাহ বন্ধনে আবদ্ধ হচ্ছেন' : 'Cordially Invite You to the Wedding of'}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2.5 my-2.5 sm:my-3">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif text-red-900 tracking-wide">
              {isBn ? settings.groom.nameBn : settings.groom.nameEn}
            </h2>
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100 text-red-700 border border-yellow-400 my-0.5 sm:my-0 shadow-sm">
              <Heart className="w-4 h-4 fill-red-600 text-red-600" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif text-red-900 tracking-wide">
              {isBn ? settings.bride.nameBn : settings.bride.nameEn}
            </h2>
          </div>

          <p className="text-xs sm:text-sm font-serif text-stone-700 max-w-sm mx-auto px-1 leading-relaxed">
            {isBn
              ? 'আমাদের জীবনের এই শ্রেষ্ঠ আনন্দক্ষণে আপনার আন্তরিক উপস্থিতি ও আশীর্বাদ একান্ত প্রার্থনীয়।'
              : 'Your gracious presence and heartfelt blessings will make this day memorable.'}
          </p>
        </div>

        {/* Auspicious Date & Time Card */}
        <div className="my-4 p-3.5 sm:p-5 rounded-2xl bg-red-50 border-2 border-yellow-400 text-left shadow-sm">
          <div className="flex items-start gap-3">
            <div className="p-2.5 sm:p-3 rounded-xl bg-red-800 text-yellow-300 shadow shrink-0">
              <Calendar className="w-6 sm:w-7 h-6 sm:h-7" />
            </div>
            <div className="flex-1">
              <span className="text-xs font-bold uppercase tracking-wider text-red-800">
                {isBn ? 'শুভ বিবাহের দিনক্ষণ' : 'Auspicious Date & Muhurat'}
              </span>
              <h3 className="text-base sm:text-lg font-bold font-serif text-red-950 mt-0.5">
                {isBn ? settings.weddingDateBn : settings.weddingDateEn}
              </h3>
              <div className="flex items-center gap-1.5 mt-1 text-xs sm:text-sm text-stone-800 font-serif">
                <Clock className="w-4 h-4 text-red-700 shrink-0" />
                <span>
                  {isBn
                    ? 'শুভ বিবাহ লগ্ন: রাত ৮:২৫ মিনিট (সন্ধ্যা ৬:৩০ হইতে অতিথি সমাগম)'
                    : 'Auspicious Lagna: 8:25 PM (Reception starts from 6:30 PM)'}
                </span>
              </div>
            </div>
          </div>

          {/* Venue preview */}
          <div className="mt-3 pt-3 border-t border-yellow-400/40 flex items-start gap-2.5 text-xs sm:text-sm text-stone-800">
            <MapPin className="w-4 h-4 text-red-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-red-900">
                {isBn ? settings.venueNameBn : settings.venueNameEn}:
              </span>{' '}
              {isBn ? settings.venueAddressBn : settings.venueAddressEn}
            </div>
          </div>
        </div>

        {/* Live Countdown Timer */}
        <div className="my-4">
          <div className="flex items-center justify-center gap-1 text-xs font-serif font-bold text-red-900 uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4 text-yellow-500" />
            <span>{isBn ? 'শুভ লগ্নের আর বাকি মাত্র' : 'Countdown to the Sacred Vows'}</span>
            <Sparkles className="w-4 h-4 text-yellow-500" />
          </div>

          <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-xs sm:max-w-sm mx-auto">
            {[
              { labelBn: 'দিন', labelEn: 'Days', val: timeLeft.days },
              { labelBn: 'ঘন্টা', labelEn: 'Hours', val: timeLeft.hours },
              { labelBn: 'মিনিট', labelEn: 'Mins', val: timeLeft.minutes },
              { labelBn: 'সেকেন্ড', labelEn: 'Secs', val: timeLeft.seconds },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-2 sm:p-2.5 rounded-xl bg-red-900 text-yellow-300 border-2 border-yellow-400 shadow text-center"
              >
                <div className="text-xl sm:text-3xl font-bold font-mono tracking-tight text-yellow-300">
                  {toBn(item.val)}
                </div>
                <div className="text-[10px] sm:text-xs font-serif text-white font-medium mt-0.5">
                  {isBn ? item.labelBn : item.labelEn}
                </div>
              </div>
            ))}
          </div>
        </div>

        <MandapDivider className="my-4" />

        {/* Action Buttons */}
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-2.5">
          <button
            onClick={onNextPage}
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-red-800 hover:bg-red-700 text-yellow-300 font-serif font-bold text-xs sm:text-sm border-2 border-yellow-400 shadow-md active:scale-95 transition-all flex items-center justify-center gap-1.5 group"
          >
            <span>{isBn ? 'উভয় পরিবারের পরিচয় দেখুন' : "View Bride & Groom's Family"}</span>
            <ArrowRight className="w-4 h-4 text-yellow-400 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onGoToRSVP}
            className="w-full sm:w-auto px-5 py-3 rounded-full bg-yellow-400 hover:bg-yellow-300 text-red-950 font-serif font-bold text-xs sm:text-sm border-2 border-yellow-200 shadow-md active:scale-95 transition-all flex items-center justify-center gap-1"
          >
            <span>{isBn ? 'উপস্থিতি নিশ্চিত করুন (RSVP)' : 'Confirm RSVP'}</span>
          </button>
        </div>
      </RoyalFrame>
    </div>
  );
};
