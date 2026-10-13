import React from "react";
import {
  MapPin,
  Navigation,
  Phone,
  Train,
  Clock,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { Language, WeddingSettings } from "../types";
import {
  KolkaOrnament,
  MandapDivider,
  RoyalFrame,
} from "../components/Ornaments";

interface Page7Props {
  settings: WeddingSettings;
  language: Language;
  onNextPage: () => void;
  onGoToIndex: () => void;
}

export const Page7VenueMap: React.FC<Page7Props> = ({
  settings,
  language,
  onNextPage,
  onGoToIndex,
}) => {
  const isBn = language === "bn";

  return (
    <div className="mx-auto w-full min-w-0 max-w-xl overflow-x-clip px-2 py-4 pb-28 text-red-950 sm:px-4">
      <RoyalFrame className="min-w-0 border-2 border-yellow-400 bg-white">
        {/* Header */}
        <div className="mb-4 min-w-0 text-center sm:mb-6">
          <div className="mb-2 flex min-w-0 items-center justify-center gap-1.5 sm:gap-2">
            <KolkaOrnament className="h-5 w-5 shrink-0 text-yellow-500 sm:h-6 sm:w-6" />

            <span className="min-w-0 text-[9px] font-serif font-bold uppercase tracking-wide text-red-800 sm:text-xs sm:tracking-widest">
              {isBn
                ? "॥ অধ্যায় ৩: শুভ বিবাহের আসর ॥"
                : "॥ Chapter 3: Venue & Directions ॥"}
            </span>

            <KolkaOrnament className="h-5 w-5 shrink-0 -scale-x-100 text-yellow-500 sm:h-6 sm:w-6" />
          </div>

          <h2 className="break-words font-serif text-2xl font-bold leading-tight text-red-900 sm:text-4xl">
            {isBn ? "শুভ বিবাহের আসর" : "Wedding Venue & Live Map"}
          </h2>

          <p className="mx-auto mt-1 max-w-md px-1 text-xs font-serif leading-relaxed text-stone-600 sm:text-sm">
            {isBn
              ? "‘রায় বাড়ি’ ও সরাসরি লাইভ রুট ম্যাপ ও যাতায়াত নির্দেশিকা"
              : 'Heritage venue "Roy Bari", interactive route navigation, and guest travel guide'}
          </p>
        </div>

        {/* Venue Information Card */}
        <div className="mb-4 min-w-0 rounded-2xl border-2 border-yellow-400 bg-red-50 p-3 shadow-sm sm:p-5">
          <div className="flex min-w-0 items-start gap-2.5 sm:gap-3">
            <div className="shrink-0 rounded-2xl bg-red-800 p-2 text-yellow-300 shadow sm:p-2.5">
              <MapPin className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>

            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-red-800 sm:text-[11px]">
                {isBn ? "মূল বিবাহ বাসর" : "Main Wedding Venue"}
              </span>

              <h3 className="mt-0.5 break-words font-serif text-base font-bold leading-snug text-red-950 sm:text-lg">
                {isBn ? settings.venueNameBn : settings.venueNameEn}
              </h3>

              <p className="mt-1 break-words text-xs font-serif leading-relaxed text-stone-700">
                {isBn
                  ? settings.venueAddressBn
                  : settings.venueAddressEn}
              </p>
            </div>
          </div>

          {/* Responsive Google Map */}
          <div className="relative mt-3.5 aspect-[16/9] min-h-[170px] w-full min-w-0 overflow-hidden rounded-xl border-2 border-yellow-400 bg-stone-100 shadow-inner sm:min-h-[240px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30625.16352354691!2d88.08379168797802!3d23.408974307997568!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f9ab9f69fc4bc9%3A0x4242649b3001d7d4!2sManteswar%2C%20West%20Bengal%20713145!5e1!3m2!1sen!2sin!4v1791653541876!5m2!1sen!2sin"
              title="Wedding venue Google Map"
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>

          {/* Google Maps Directions and Arrival Time */}
          <div className="mt-3.5 flex min-w-0 flex-col items-stretch justify-between gap-3 sm:flex-row sm:items-center sm:gap-2">
            <a
              href="https://maps.app.goo.gl/pNfPZdbKAZdeDfx66"
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full min-w-0 items-center justify-center gap-1.5 rounded-full border border-yellow-400 bg-red-800 px-3 py-2.5 text-center text-xs font-serif font-bold leading-snug text-yellow-300 shadow transition-all hover:bg-red-700 active:scale-95 sm:w-auto sm:px-4 sm:py-2 sm:text-sm"
            >
              <Navigation className="h-4 w-4 shrink-0 text-yellow-400" />

              <span>
                {isBn
                  ? "সরাসরি গুগল ম্যাপে রুট দেখুন"
                  : "Open Google Map Directions"}
              </span>

              <ExternalLink className="h-3.5 w-3.5 shrink-0 opacity-80" />
            </a>

            <div className="flex min-w-0 items-center justify-center gap-1 text-center font-serif text-[11px] font-semibold leading-relaxed text-red-800 sm:justify-end">
              <Clock className="h-3.5 w-3.5 shrink-0 text-red-700" />

              <span>
                {isBn
                  ? "অতিথি সমাগম: সন্ধ্যা ৬:০০"
                  : "Guest arrival: From 6:00 PM"}
              </span>
            </div>
          </div>
        </div>

        {/* Travel Guide Instructions */}
        <div className="my-3 min-w-0">
          {/* Train Guide */}
          <div className="min-w-0 rounded-xl border border-yellow-300 bg-white p-3 font-serif text-xs text-stone-800 shadow-sm">
            <div className="mb-1 flex min-w-0 items-center gap-1.5 font-bold text-red-900">
              <Train className="h-4 w-4 shrink-0 text-red-700" />

              <span>
                {isBn
                  ? "ট্রেন বা লোকাল রেলপথে:"
                  : "By Train (Local Rail):"}
              </span>
            </div>

            <p className="break-words text-[11px] leading-relaxed sm:text-xs">
              {isBn
                ? "মেমারী স্টেশন অথবা মেমারী বাসস্ট্যান্ড থেকে বাস, ট্রেকার, অটো, অথবা টোটো যোগে আমাদপুর খাঁইপুকুর পাড় / হরিসভা পাড়া।"
                : "From Memari Railway Station or Memari Bus Stand: Take a Bus, Trecker, Auto, or Toto to Amadpur Khaipukur Par / Harisabha Para."}
            </p>
          </div>

          {/* Car / Cab Guide - Preserved as commented in original */}
          {/*
          <div className="p-3 rounded-xl bg-white border border-yellow-300 shadow-sm text-xs font-serif text-stone-800">
            <div className="flex items-center gap-1.5 font-bold text-red-900 mb-1">
              <Car className="w-4 h-4 text-red-700" />
              <span>{isBn ? "গাড়ি বা ক্যাব মারফত:" : "By Car or Cab:"}</span>
            </div>
            <p className="leading-relaxed text-[11px] sm:text-xs">
              {isBn
                ? "বালি ব্রিজ / বিবেকানন্দ সেতু পার হয়ে জি.টি. রোড ধরে উত্তরপাড়া শহরের দিকে। সুপরিসর পার্কিং উপলব্ধ।"
                : "Cross Vivekananda Setu onto G.T. Road towards Uttarpara. Ample parking available."}
            </p>
          </div>
          */}
        </div>

        {/* Guest Assistance Phone Contacts */}
        <div className="my-3 min-w-0 rounded-xl border border-yellow-400 bg-red-100/70 p-3 sm:p-3.5">
          <div className="mb-2 flex min-w-0 items-start gap-1.5 font-serif text-xs font-bold leading-relaxed text-red-900">
            <Phone className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-700" />

            <span>
              {isBn
                ? "রুট সহায়তা ও অতিথি অভ্যর্থনা যোগাযোগ:"
                : "Guest Hospitality & Route Assistance:"}
            </span>
          </div>

          <div className="space-y-1.5 font-serif text-xs">
            {settings.contactPhones.map((c, i) => (
              <div
                key={i}
                className="flex min-w-0 flex-wrap items-center justify-between gap-x-3 gap-y-1 border-b border-red-200 py-2 last:border-0 sm:py-1.5"
              >
                <span className="min-w-0 flex-1 break-words text-[11px] text-stone-800 sm:text-xs">
                  {c.number}
                </span>

                <a
                  href={`tel:${c.number.replace(/\s+/g, "")}`}
                  className="inline-flex shrink-0 items-center justify-center gap-1 rounded-md font-bold text-red-900 transition-colors hover:text-red-700"
                >
                  <Phone className="h-3.5 w-3.5 text-red-700" />

                  <span className="text-[11px] sm:text-xs">
                    {isBn ? "কল করুন" : "Call Now"}
                  </span>
                </a>
              </div>
            ))}
          </div>
        </div>

        <MandapDivider className="my-4" />

        {/* Navigation Footers */}
        <div className="mt-4 flex min-w-0 flex-col items-stretch gap-2.5 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={onGoToIndex}
            className="w-full rounded-full border border-yellow-400 bg-red-50 px-4 py-2.5 text-xs font-serif font-bold text-red-900 transition-colors hover:bg-red-100 sm:w-auto sm:text-sm"
          >
            {isBn ? "‹ সূচিপত্রে ফিরুন" : "‹ Back to Chapters"}
          </button>

          <button
            type="button"
            onClick={onNextPage}
            className="group flex w-full min-w-0 items-center justify-center gap-1.5 rounded-full border-2 border-yellow-400 bg-red-800 px-4 py-2.5 text-xs font-serif font-bold leading-snug text-yellow-300 shadow transition-colors hover:bg-red-700 sm:w-auto sm:px-5 sm:text-sm"
          >
            <span className="min-w-0 break-words text-center">
              {isBn
                ? "পরবর্তী: উপস্থিতি নিশ্চিত (RSVP)"
                : "Next: Confirm RSVP & Guestbook"}
            </span>

            <ArrowRight className="h-3.5 w-3.5 shrink-0 text-yellow-400 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </RoyalFrame>
    </div>
  );
};
