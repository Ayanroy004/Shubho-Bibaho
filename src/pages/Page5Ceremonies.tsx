import React from 'react';
import { Calendar, Clock, MapPin, Shirt, CalendarPlus, ArrowRight } from 'lucide-react';
import { Language, CeremonyItem } from '../types';
import { ceremoniesData } from '../weddingData';
import { KolkaOrnament, MandapDivider, RoyalFrame } from '../components/Ornaments';

interface Page5Props {
  language: Language;
  onNextPage: () => void;
  onGoToIndex: () => void;
}

export const Page5Ceremonies: React.FC<Page5Props> = ({
  language,
  onNextPage,
  onGoToIndex,
}) => {
  const isBn = language === 'bn';

  const makeGoogleCalendarUrl = (item: CeremonyItem) => {
    const title = encodeURIComponent(`Ayan & Shreya Wedding: ${item.titleEn}`);
    const details = encodeURIComponent(
      `Join us for ${item.titleEn} (${item.titleBn})\nTime: ${item.timeEn}\nVenue: ${item.hallEn}\nDress Code: ${item.dressEn}`
    );
    const location = encodeURIComponent(`${item.hallEn}, Uttarpara, Hooghly, West Bengal`);
    let startIso = '20261211T143000Z';
    let endIso = '20261211T183000Z';

    if (item.id === 'aiburobhat') {
      startIso = '20261209T070000Z';
      endIso = '20261209T103000Z';
    } else if (item.id === 'gaye_holud') {
      startIso = '20261211T033000Z';
      endIso = '20261211T070000Z';
    } else if (item.id === 'bibaho') {
      startIso = '20261211T130000Z';
      endIso = '20261211T190000Z';
    } else if (item.id === 'boubhat') {
      startIso = '20261213T133000Z';
      endIso = '20261213T183000Z';
    }

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startIso}/${endIso}&details=${details}&location=${location}`;
  };

  return (
    <div className="w-full max-w-xl mx-auto px-2.5 sm:px-4 py-4 pb-28 text-red-950">
      <RoyalFrame className="bg-white border-2 border-yellow-400">
        {/* Header */}
        <div className="text-center mb-4 sm:mb-6">
          <div className="flex justify-center items-center gap-2 mb-1 sm:mb-2">
            <KolkaOrnament className="w-5 sm:w-6 h-5 sm:h-6 text-yellow-500" />
            <span className="text-[10px] sm:text-xs font-serif font-bold text-red-800 tracking-widest uppercase">
              {isBn ? '॥ অধ্যায় ২: মাঙ্গলিক অনুষ্ঠান ॥' : '॥ Chapter 2: Auspicious Ceremonies ॥'}
            </span>
            <KolkaOrnament className="w-5 sm:w-6 h-5 sm:h-6 text-yellow-500 -scale-x-100" />
          </div>

          <h2 className="text-2xl sm:text-4xl font-bold font-serif text-red-900">
            {isBn ? 'স্মারক লিপি (অনুষ্ঠান সূচী)' : 'Wedding Itinerary & Timeline'}
          </h2>
          <p className="text-xs sm:text-sm font-serif text-stone-600 mt-1 max-w-md mx-auto px-1">
            {isBn
              ? 'আইবুড়ো ভাত, গায়ে হলুদ, শুভ পরিণয় ও প্রীতিভোজের নির্ঘণ্ট'
              : 'Detailed schedule of sacred rituals, timings, venues & festive feasts'}
          </p>
        </div>

        {/* Ceremonies Cards List */}
        <div className="space-y-3.5 my-3 sm:my-4">
          {ceremoniesData.map((item, index) => (
            <div
              key={item.id}
              className="rounded-2xl p-3.5 sm:p-5 bg-red-50 border-2 border-yellow-400 shadow-sm relative overflow-hidden"
            >
              {/* Top Accent & Step Number */}
              <div className="flex items-center justify-between pb-2 border-b border-yellow-400/40 mb-2.5">
                <span className="px-2.5 py-0.5 rounded-full bg-red-800 text-yellow-300 text-[10px] sm:text-xs font-serif font-bold shadow-sm">
                  {isBn ? `পর্ব ${index + 1}` : `Ritual ${index + 1}`}
                </span>
                <span className="text-[11px] sm:text-xs font-serif font-bold text-red-800">
                  {isBn ? item.dateBn : item.dateEn}
                </span>
              </div>

              {/* Title & Subtitle */}
              <h3 className="text-base sm:text-lg font-bold font-serif text-red-950">
                {isBn ? item.titleBn : item.titleEn}
              </h3>
              <p className="text-[11px] sm:text-xs font-serif text-stone-600 italic mt-0.5">
                {isBn ? item.subtitleBn : item.subtitleEn}
              </p>

              {/* Timing, Hall & Dress Code Details */}
              <div className="mt-3 pt-2.5 border-t border-yellow-300/60 space-y-1.5 text-[11px] sm:text-xs font-serif text-stone-800 bg-white p-2.5 sm:p-3 rounded-xl border border-yellow-300">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-red-700 shrink-0" />
                  <div>
                    <span className="font-bold text-red-900">{isBn ? 'শুভ সময়:' : 'Time:'}</span>{' '}
                    <span>{isBn ? item.timeBn : item.timeEn}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-red-700 shrink-0" />
                  <div>
                    <span className="font-bold text-red-900">{isBn ? 'স্থান:' : 'Hall/Venue:'}</span>{' '}
                    <span>{isBn ? item.hallBn : item.hallEn}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Shirt className="w-3.5 h-3.5 text-red-700 shrink-0" />
                  <div>
                    <span className="font-bold text-red-900">{isBn ? 'পোশাকের ভাবনা:' : 'Dress Code:'}</span>{' '}
                    <span>{isBn ? item.dressBn : item.dressEn}</span>
                  </div>
                </div>
              </div>

              {/* Add to Google Calendar Action Button */}
              <div className="mt-3 flex justify-end">
                <a
                  href={makeGoogleCalendarUrl(item)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-yellow-400 hover:bg-yellow-300 text-red-950 border border-yellow-200 text-xs font-serif font-bold shadow-sm transition-all active:scale-95"
                >
                  <CalendarPlus className="w-3.5 h-3.5 text-red-950" />
                  <span>{isBn ? 'গুগল ক্যালেন্ডারে যোগ করুন' : 'Add to Google Calendar'}</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        <MandapDivider className="my-4" />

        {/* Navigation Footers */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 mt-4">
          <button
            onClick={onGoToIndex}
            className="w-full sm:w-auto px-4 py-2.5 rounded-full bg-red-50 hover:bg-red-100 text-red-900 text-xs sm:text-sm font-serif font-bold border border-yellow-400"
          >
            {isBn ? '‹ সূচিপত্রে ফিরুন' : '‹ Back to Chapters'}
          </button>

          <button
            onClick={onNextPage}
            className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-red-800 hover:bg-red-700 text-yellow-300 text-xs sm:text-sm font-serif font-bold border-2 border-yellow-400 shadow flex items-center justify-center gap-1.5 group"
          >
            <span>{isBn ? 'পরবর্তী: অ্যালবাম ও স্মৃতিমালা' : 'Next: Photo Gallery'}</span>
            <ArrowRight className="w-3.5 h-3.5 text-yellow-400 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </RoyalFrame>
    </div>
  );
};
