import React from 'react';
import { BookOpen, Sparkles, Camera, MapPin, MailCheck, Scroll, ChevronRight } from 'lucide-react';
import { Language } from '../types';

interface Page3Props {
  language: Language;
  onNavigatePage: (pageNumber: number) => void;
}

export const Page3ChapterIndex: React.FC<Page3Props> = ({
  language,
  onNavigatePage,
}) => {
  const isBn = language === 'bn';

  // The chapter cards styled strictly in RED, WHITE, and YELLOW
  const chapterCards = [
    {
      page: 4,
      titleBn: 'আমাদের গল্প ও পরিবার পর্ব',
      titleEn: 'Our Story & Family Journey',
      subtitleBn: 'আমাদের পথচলা ও দুই পরিবারের পরিচয়',
      subtitleEn: 'Our journey of love and lineage of both families',
      bgClass: 'bg-gradient-to-r from-red-900 via-red-800 to-red-950',
      borderClass: 'border-yellow-400 hover:border-yellow-300',
      icon: BookOpen,
      circleBg: 'bg-red-950 text-yellow-400 border border-yellow-400',
    },
    {
      page: 5,
      titleBn: 'স্মারক লিপি (অনুষ্ঠান সূচী)',
      titleEn: 'Ceremony Itinerary & Timeline',
      subtitleBn: 'আইবুড়ো ভাত, গায়ে হলুদ ও শুভ পরিণয়',
      subtitleEn: 'Aiburobhat, Gaye Holud & Sacred Wedding Vows',
      bgClass: 'bg-gradient-to-r from-red-800 via-red-700 to-red-900',
      borderClass: 'border-yellow-400 hover:border-yellow-300',
      icon: Sparkles,
      circleBg: 'bg-red-950 text-yellow-400 border border-yellow-400',
    },
    {
      page: 6,
      titleBn: 'আমাদের কিছু মুহূর্ত (ফটো গ্যালারি)',
      titleEn: 'Cherished Moments & Gallery',
      subtitleBn: 'ভালোবাসা, আনন্দ ও উৎসবের অ্যালবাম',
      subtitleEn: 'Album of love, laughter, and celebrations',
      bgClass: 'bg-gradient-to-r from-red-900 via-red-800 to-red-950',
      borderClass: 'border-yellow-400 hover:border-yellow-300',
      icon: Camera,
      circleBg: 'bg-red-950 text-yellow-400 border border-yellow-400',
    },
    {
      page: 7,
      titleBn: 'বিবাহ বাসর ও অবস্থান',
      titleEn: 'Wedding Venue & Live Map',
      subtitleBn: '‘রায় বাড়ি’ ও সরাসরি লাইভ রুট ম্যাপ',
      subtitleEn: "'Roy Bari' and direct interactive route directions",
      bgClass: 'bg-gradient-to-r from-red-800 via-red-700 to-red-900',
      borderClass: 'border-yellow-400 hover:border-yellow-300',
      icon: MapPin,
      circleBg: 'bg-red-950 text-yellow-400 border border-yellow-400',
    },
    {
      page: 8,
      titleBn: 'উপস্থিতি নিশ্চিত করুন (RSVP)',
      titleEn: 'Confirm Attendance (RSVP)',
      subtitleBn: 'আপনার উপস্থিতি ও আশীর্বাদ আমাদের কাম্য',
      subtitleEn: 'Your gracious presence and blessings mean the world to us',
      bgClass: 'bg-gradient-to-r from-red-900 via-red-800 to-red-950',
      borderClass: 'border-yellow-400 hover:border-yellow-300',
      icon: MailCheck,
      circleBg: 'bg-red-950 text-yellow-400 border border-yellow-400',
    },
    {
      page: 9,
      titleBn: 'ঐতিহ্যবাহী নিমন্ত্রণ লিপি',
      titleEn: 'Traditional Invitation Letter',
      subtitleBn: 'সবিনয় নিবেদন ও আশীর্বাদের সনাতনী চিঠি',
      subtitleEn: 'Humble Vedic invitation letter & ancestral blessings',
      bgClass: 'bg-gradient-to-r from-red-800 via-red-700 to-red-900',
      borderClass: 'border-yellow-400 hover:border-yellow-300',
      icon: Scroll,
      circleBg: 'bg-red-950 text-yellow-400 border border-yellow-400',
    },
  ];

  return (
    <div className="w-full max-w-xl mx-auto px-2.5 sm:px-4 py-4 pb-28 text-red-950">
      {/* Outer Card with Yellow Double Border */}
      <div className="relative rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 md:p-7 bg-white border-2 border-yellow-400 shadow-[0_12px_36px_rgba(127,29,29,0.2)]">
        {/* Double Inner Frame Accent */}
        <div className="absolute inset-1 sm:inset-1.5 rounded-xl sm:rounded-[22px] border border-yellow-400/40 pointer-events-none" />

        {/* Header from reference image */}
        <div className="text-center mb-4 sm:mb-5 relative z-10">
          <h2 className="text-xl sm:text-2xl font-bold font-serif text-red-900 tracking-wide">
            {isBn ? '॥ আমন্ত্রণের অন্যান্য অধ্যায় ॥' : '॥ Other Chapters of Invitation ॥'}
          </h2>
          <p className="text-xs sm:text-sm font-serif text-red-800 mt-1">
            {isBn
              ? 'প্রতিটি পাতা আলাদাভাবে দেখতে নিচের কার্ডে ট্যাপ করুন'
              : 'Tap any card below to navigate directly to that section'}
          </p>
        </div>

        {/* 6 Action Cards */}
        <div className="space-y-2.5 sm:space-y-3 relative z-10">
          {chapterCards.map(card => {
            const Icon = card.icon;
            return (
              <button
                key={card.page}
                onClick={() => {
                  onNavigatePage(card.page);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`w-full text-left rounded-xl sm:rounded-2xl p-2.5 sm:p-4 ${card.bgClass} border-2 ${card.borderClass} shadow hover:shadow-md transition-all transform hover:-translate-y-0.5 active:scale-[0.99] flex items-center justify-between group cursor-pointer`}
              >
                <div className="flex items-center gap-2.5 sm:gap-3.5 flex-1 min-w-0 pr-1">
                  {/* Circular Icon Container */}
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl ${card.circleBg} flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform`}
                  >
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
                  </div>

                  {/* Title & Subtitle */}
                  <div className="min-w-0 flex-1">
                    <h3 className="text-xs sm:text-base font-bold font-serif text-yellow-400 tracking-wide leading-tight group-hover:text-yellow-300 transition-colors truncate">
                      {isBn ? card.titleBn : card.titleEn}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-white/90 font-serif mt-0.5 leading-snug line-clamp-1">
                      {isBn ? card.subtitleBn : card.subtitleEn}
                    </p>
                  </div>
                </div>

                {/* Right Arrow Chevron */}
                <div className="shrink-0 text-yellow-400 group-hover:translate-x-1 transition-transform pl-1">
                  <ChevronRight className="w-4 sm:w-5 h-4 sm:h-5" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Quote at the bottom */}
        <div className="mt-6 sm:mt-8 text-center pt-1 relative z-10">
          <p className="text-xs sm:text-sm font-serif italic text-red-900 tracking-wide max-w-md mx-auto px-1">
            {isBn
              ? '“তোমাদের উপস্থিতিই আমাদের এই আনন্দের আসল সৌন্দর্য...”'
              : '“Your gracious presence is the true beauty of our joyful celebration...”'}
          </p>
        </div>
      </div>
    </div>
  );
};
