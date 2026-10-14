import React from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Shirt,
  CalendarPlus,
  ArrowRight,
} from "lucide-react";
import { Language, CeremonyItem } from "../types";
import { ceremoniesData } from "../weddingData";
import {
  KolkaOrnament,
  MandapDivider,
  RoyalFrame,
} from "../components/Ornaments";

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
  const isBn = language === "bn";

  const makeGoogleCalendarUrl = (item: CeremonyItem) => {
    const title = encodeURIComponent(`Argha & Arpita Wedding: ${item.titleEn}`);

    const details = encodeURIComponent(
      `Join us for ${item.titleEn} (${item.titleBn})\nTime: ${item.timeEn}\nVenue: ${item.hallEn}`,
    );

    const location = encodeURIComponent(
      `${item.hallEn}, Amadpur, Memari, Purba Bardhaman`,
    );

    let startIso = "";
    let endIso = "";

    if (item.id === "aiburobhat") {
      startIso = "20261212T193000Z";
      endIso = "20261212T223000Z";
    } else if (item.id === "gaye_holud") {
      startIso = "20261213T090000Z";
      endIso = "20261213T110000Z";
    } else if (item.id === "bibaho") {
      startIso = "20261213T180000Z";
      endIso = "20261214T013000Z";
    } else if (item.id === "boubhat") {
      startIso = "20261214T140000Z";
      endIso = "20261214T153000Z";
    } else if (item.id === "reception") {
      startIso = "20261215T180000Z";
      endIso = "20261216T010000Z";
    }

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startIso}/${endIso}&details=${details}&location=${location}`;
  };

  return (
    <div className="mx-auto w-full min-w-0 max-w-xl overflow-x-clip px-2 py-4 pb-28 text-red-950 sm:px-4">
      <RoyalFrame className="min-w-0 border-2 border-yellow-400 bg-white">
        {/* Header */}
        <div className="mb-4 min-w-0 text-center sm:mb-6">
          <div className="mb-1 flex min-w-0 items-center justify-center gap-1 sm:mb-2 sm:gap-2">
            <KolkaOrnament className="h-5 w-5 shrink-0 text-yellow-500 sm:h-6 sm:w-6" />

            <span className="min-w-0 break-words text-[9px] font-serif font-bold uppercase leading-relaxed tracking-wide text-red-800 min-[375px]:text-[10px] min-[420px]:tracking-widest sm:text-xs">
              {isBn
                ? "॥ অধ্যায় ১: মাঙ্গলিক অনুষ্ঠান ॥"
                : "॥ Chapter 1: Auspicious Ceremonies ॥"}
            </span>

            <KolkaOrnament className="h-5 w-5 shrink-0 -scale-x-100 text-yellow-500 sm:h-6 sm:w-6" />
          </div>

          <h2 className="break-words font-serif text-2xl font-bold leading-tight text-red-900 min-[375px]:text-3xl sm:text-4xl">
            {isBn
              ? "স্মারক লিপি (অনুষ্ঠান সূচী)"
              : "Wedding Itinerary & Timeline"}
          </h2>

          <p className="mx-auto mt-1 max-w-md break-words px-1 text-xs font-serif leading-relaxed text-stone-600 sm:text-sm">
            {isBn
              ? "আইবুড়ো ভাত, গায়ে হলুদ, শুভ পরিণয় ও প্রীতিভোজের নির্ঘণ্ট"
              : "Detailed schedule of sacred rituals, timings, venues & festive feasts"}
          </p>
        </div>

        {/* Ceremonies Cards List */}
        <div className="my-3 min-w-0 space-y-3.5 sm:my-4">
          {ceremoniesData.map((item, index) => (
            <div
              key={item.id}
              className="relative min-w-0 overflow-hidden rounded-2xl border-2 border-yellow-400 bg-red-50 p-3.5 shadow-sm"
            >
              {/* Top Accent & Step Number */}
              <div className="mb-2.5 flex min-w-0 flex-wrap items-center justify-between gap-x-2 gap-y-1 border-b border-yellow-400/40 pb-2">
                <span className="shrink-0 rounded-full bg-red-800 px-2.5 py-1 text-[10px] font-serif font-bold text-yellow-300 shadow-sm sm:text-xs">
                  {isBn ? `পর্ব ${index + 1}` : `Ritual ${index + 1}`}
                </span>

                <span className="min-w-0 break-words text-right text-[10px] font-serif font-bold leading-relaxed text-red-800 sm:text-xs">
                  {isBn ? item.dateBn : item.dateEn}
                </span>
              </div>

              {/* Title & Subtitle */}
              <h3 className="break-words font-serif text-base font-bold leading-snug text-red-950 sm:text-lg">
                {isBn ? item.titleBn : item.titleEn}
              </h3>

              <p className="mt-0.5 break-words text-[11px] font-serif italic leading-relaxed text-stone-600 sm:text-xs">
                {isBn ? item.subtitleBn : item.subtitleEn}
              </p>

              {/* Timing, Hall & Dress Code Details */}
              <div className="mt-3 min-w-0 space-y-2 rounded-xl border border-yellow-300 bg-white p-2.5 font-serif text-[11px] text-stone-800 sm:p-3 sm:text-xs">
                <div className="flex min-w-0 items-start gap-2">
                  <Clock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-700" />

                  <div className="min-w-0 break-words leading-relaxed">
                    <span className="font-bold text-red-900">
                      {isBn ? "শুভ সময়:" : "Time:"}
                    </span>{" "}
                    <span>{isBn ? item.timeBn : item.timeEn}</span>
                  </div>
                </div>

                <div className="flex min-w-0 items-start gap-2">
                  <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-700" />

                  <div className="min-w-0 break-words leading-relaxed">
                    <span className="font-bold text-red-900">
                      {isBn ? "স্থান:" : "Hall/Venue:"}
                    </span>{" "}
                    <span>{isBn ? item.hallBn : item.hallEn}</span>
                  </div>
                </div>

                {/* Dress code section remains available if needed */}
                {/*
                <div className="flex min-w-0 items-start gap-2">
                  <Shirt className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-700" />
                  <div className="min-w-0 break-words leading-relaxed">
                    <span className="font-bold text-red-900">
                      {isBn ? "পোশাকের ভাবনা:" : "Dress Code:"}
                    </span>{" "}
                    <span>{isBn ? item.dressBn : item.dressEn}</span>
                  </div>
                </div>
                */}
              </div>

              {/* Add to Google Calendar Action Button */}
              <div className="mt-3 flex min-w-0 justify-end">
                <a
                  href={makeGoogleCalendarUrl(item)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-w-0 max-w-full items-center justify-center gap-1.5 rounded-full border border-yellow-200 bg-yellow-400 px-2.5 py-2 text-center text-[10px] font-serif font-bold leading-tight text-red-950 shadow-sm transition-all hover:bg-yellow-300 active:scale-95 min-[375px]:px-3 min-[375px]:text-xs"
                >
                  <CalendarPlus className="h-3.5 w-3.5 shrink-0 text-red-950" />

                  <span className="min-w-0 break-words">
                    {isBn
                      ? "গুগল ক্যালেন্ডারে যোগ করুন"
                      : "Add to Google Calendar"}
                  </span>
                </a>
              </div>
            </div>
          ))}
        </div>

        <MandapDivider className="my-4" />

        {/* Navigation Footers */}
        <div className="mt-4 flex min-w-0 flex-col items-stretch justify-between gap-2.5 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={onGoToIndex}
            className="w-full min-w-0 break-words rounded-full border border-yellow-400 bg-red-50 px-4 py-2.5 text-center text-xs font-serif font-bold leading-relaxed text-red-900 transition-colors hover:bg-red-100 sm:w-auto sm:text-sm"
          >
            {isBn ? "‹ সূচিপত্রে ফিরুন" : "‹ Back to Chapters"}
          </button>

          <button
            type="button"
            onClick={onNextPage}
            className="group flex w-full min-w-0 items-center justify-center gap-1.5 rounded-full border-2 border-yellow-400 bg-red-800 px-4 py-2.5 text-center text-xs font-serif font-bold leading-relaxed text-yellow-300 shadow transition-all hover:bg-red-700 active:scale-95 sm:w-auto sm:px-5 sm:text-sm"
          >
            <span className="min-w-0 break-words">
              {isBn
                ? "পরবর্তী: বিবাহ বাসর ও অবস্থান"
                : "Next: Venue & Location"}
            </span>

            <ArrowRight className="h-3.5 w-3.5 shrink-0 text-yellow-400 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </RoyalFrame>
    </div>
  );
};
