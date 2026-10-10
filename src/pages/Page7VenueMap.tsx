import React from "react";
import {
  MapPin,
  Navigation,
  Phone,
  Car,
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
    <div className="w-full max-w-xl mx-auto px-2.5 sm:px-4 py-4 pb-28 text-red-950">
      <RoyalFrame className="bg-white border-2 border-yellow-400">
        {/* Header */}
        <div className="text-center mb-4 sm:mb-6">
          <div className="flex justify-center items-center gap-2 mb-1 sm:mb-2">
            <KolkaOrnament className="w-5 sm:w-6 h-5 sm:h-6 text-yellow-500" />
            <span className="text-[10px] sm:text-xs font-serif font-bold text-red-800 tracking-widest uppercase">
              {isBn
                ? "॥ অধ্যায় ৪: বিবাহ বাসর ও অবস্থান ॥"
                : "॥ Chapter 4: Venue & Directions ॥"}
            </span>
            <KolkaOrnament className="w-5 sm:w-6 h-5 sm:h-6 text-yellow-500 -scale-x-100" />
          </div>

          <h2 className="text-2xl sm:text-4xl font-bold font-serif text-red-900">
            {isBn ? "বিবাহ বাসর ও অবস্থান" : "Wedding Venue & Live Map"}
          </h2>
          <p className="text-xs sm:text-sm font-serif text-stone-600 mt-1 max-w-md mx-auto px-1">
            {isBn
              ? "‘রায় বাড়ি’ ও সরাসরি লাইভ রুট ম্যাপ ও যাতায়াত নির্দেশিকা"
              : 'Heritage venue "Roy Bari", interactive route navigation, and guest travel guide'}
          </p>
        </div>

        {/* Venue Information Card */}
        <div className="rounded-2xl p-3.5 sm:p-5 bg-red-50 border-2 border-yellow-400 shadow-sm mb-4">
          <div className="flex items-start gap-2.5 sm:gap-3">
            <div className="p-2 sm:p-2.5 rounded-2xl bg-red-800 text-yellow-300 shadow shrink-0">
              <MapPin className="w-5 sm:w-6 h-5 sm:h-6" />
            </div>
            <div>
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-red-800">
                {isBn ? "মূল বিবাহ বাসর" : "Main Wedding Venue"}
              </span>
              <h3 className="text-base sm:text-lg font-bold font-serif text-red-950 mt-0.5">
                {isBn ? settings.venueNameBn : settings.venueNameEn}
              </h3>
              <p className="text-xs text-stone-700 font-serif mt-0.5 leading-relaxed">
                {isBn ? settings.venueAddressBn : settings.venueAddressEn}
              </p>
            </div>
          </div>

          {/* Interactive Google Map Preview */}
          <div className="mt-3.5 rounded-xl overflow-hidden border-2 border-yellow-400 shadow-inner aspect-[16/9] w-full min-h-[170px] bg-stone-100">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30625.16352354691!2d88.08379168797802!3d23.408974307997568!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f9ab9f69fc4bc9%3A0x4242649b3001d7d4!2sManteswar%2C%20West%20Bengal%20713145!5e1!3m2!1sen!2sin!4v1791653541876!5m2!1sen!2sin"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            ></iframe>
          </div>

          {/* Direct Google Maps Route Button */}
          <div className="mt-3.5 flex flex-col sm:flex-row items-center justify-between gap-2">
            <a
              href="https://maps.app.goo.gl/pNfPZdbKAZdeDfx66"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-4 py-2 rounded-full bg-red-800 hover:bg-red-700 text-yellow-300 text-xs sm:text-sm font-serif font-bold border border-yellow-400 shadow flex items-center justify-center gap-1.5 active:scale-95 transition-all"
            >
              <Navigation className="w-4 h-4 text-yellow-400" />
              <span>
                {isBn
                  ? "সরাসরি গুগল ম্যাপে রুট দেখুন"
                  : "Open Google Map Directions"}
              </span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>

            <div className="text-[11px] text-red-800 font-serif font-semibold flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-red-700" />
              <span>
                {isBn
                  ? "অতিথি সমাগম: সন্ধ্যা ৬:৩০"
                  : "Guest arrival: From 6:30 PM"}
              </span>
            </div>
          </div>
        </div>

        {/* Travel Guide Instructions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3.5 my-3">
          {/* Train Guide */}
          <div className="p-3 rounded-xl bg-white border border-yellow-300 shadow-sm text-xs font-serif text-stone-800">
            <div className="flex items-center gap-1.5 font-bold text-red-900 mb-1">
              <Train className="w-4 h-4 text-red-700" />
              <span>
                {isBn ? "ট্রেন বা লোকাল রেলপথে:" : "By Train (Local Rail):"}
              </span>
            </div>
            <p className="leading-relaxed text-[11px] sm:text-xs">
              {isBn
                ? "হাওড়া থেকে মেইন লাইনের যেকোনো লোকাল ট্রেনে উত্তরপাড়া স্টেশনে নেমে রিকশা বা টোটো যোগে ৫ মিনিট।"
                : "Take any Main Line local train from Howrah to Uttarpara Station; venue is a 5-minute ride."}
            </p>
          </div>

          {/* Car / Cab Guide */}
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
        </div>

        {/* Guest Assistance Phone Contacts */}
        <div className="p-3 sm:p-3.5 rounded-xl bg-red-100/70 border border-yellow-400 my-3">
          <div className="flex items-center gap-1.5 text-xs font-serif font-bold text-red-900 mb-2">
            <Phone className="w-3.5 h-3.5 text-red-700" />
            <span>
              {isBn
                ? "রুট সহায়তা ও অতিথি অভ্যর্থনা যোগাযোগ:"
                : "Guest Hospitality & Route Assistance:"}
            </span>
          </div>
          <div className="space-y-1.5 text-xs font-serif">
            {settings.contactPhones.map((c, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-1 border-b border-red-200 last:border-0"
              >
                <span className="text-stone-800 text-[11px] sm:text-xs">
                  {isBn ? c.labelBn : c.labelEn}:
                </span>
                <a
                  href={`tel:${c.number.replace(/\s+/g, "")}`}
                  className="font-bold text-red-900 hover:text-red-700 flex items-center gap-1 text-[11px] sm:text-xs"
                >
                  <span>{c.number}</span>
                </a>
              </div>
            ))}
          </div>
        </div>

        <MandapDivider className="my-4" />

        {/* Navigation Footers */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 mt-4">
          <button
            onClick={onGoToIndex}
            className="w-full sm:w-auto px-4 py-2.5 rounded-full bg-red-50 hover:bg-red-100 text-red-900 text-xs sm:text-sm font-serif font-bold border border-yellow-400"
          >
            {isBn ? "‹ সূচিপত্রে ফিরুন" : "‹ Back to Chapters"}
          </button>

          <button
            onClick={onNextPage}
            className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-red-800 hover:bg-red-700 text-yellow-300 text-xs sm:text-sm font-serif font-bold border-2 border-yellow-400 shadow flex items-center justify-center gap-1.5 group"
          >
            <span>
              {isBn
                ? "পরবর্তী: উপস্থিতি নিশ্চিত (RSVP)"
                : "Next: Confirm RSVP & Guestbook"}
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-yellow-400 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </RoyalFrame>
    </div>
  );
};
