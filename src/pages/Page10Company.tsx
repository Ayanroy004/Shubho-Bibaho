import React from "react";
import {
  Instagram,
  Phone,
  Globe,
  TrendingUp,
  MonitorSmartphone,
  MessageCircle,
  ArrowRight,
  Sparkles,
  ExternalLink,
  Tent,
  Lightbulb,
  Camera,
} from "lucide-react";

import { Language } from "../types";

import {
  KolkaOrnament,
  MandapDivider,
  RoyalFrame,
} from "../components/Ornaments";

interface Page10Props {
  language: Language;
  onNextPage: () => void;
  onGoToIndex: () => void;
}

const COMPANY_NAME = "SAATPAK FILMS";
const INSTAGRAM_URL = "https://www.instagram.com/saatpak_films/";

// Replace these placeholders with your real business phone numbers.
const COMPANY_PHONE_NUMBERS = ["+91 XXXXX XXXXX"];

const services = [
  {
    icon: Sparkles,
    titleEn: "Digital Invitations",
    titleBn: "ডিজিটাল নিমন্ত্রণপত্র",
    descEn:
      "Interactive bilingual web invitations with live maps, RSVPs, and ceremony details.",
    descBn:
      "লাইভ ম্যাপ, RSVP এবং অনুষ্ঠান বিবরণী সহ আধুনিক দ্বিমুখী ডিজিটাল ইনভিটেশন।",
  },
  {
    icon: Tent,
    titleEn: "Pandal & Decor",
    titleBn: "প্যান্ডেল ও ডেকোরেশন",
    descEn:
      "Aesthetic and traditional pandal setup crafted for weddings and auspicious occasions.",
    descBn:
      "বিবাহ এবং অন্যান্য শুভ অনুষ্ঠানের জন্য আকর্ষণীয় ও নান্দনিক প্যান্ডেল সজ্জা।",
  },
  {
    icon: Lightbulb,
    titleEn: "Lighting & Ambience",
    titleBn: "মনমুগ্ধকর লাইটিং",
    descEn:
      "Illuminating your special venue with modern decorative lighting concepts.",
    descBn:
      "আধুনিক ও নান্দনিক আলোকসজ্জার মাধ্যমে উৎসবের আঙিনাকে উজ্জ্বল করে তোলা।",
  },
  {
    icon: Camera,
    titleEn: "Photography & Video",
    titleBn: "ডিজিটাল ভিডিওগ্রাফি ও ফটোগ্রাফি",
    descEn:
      "Capturing your cherished wedding moments in high quality video and photo frames.",
    descBn:
      "আপনার শুভ পরিণয়ের প্রতিটি আনন্দঘন মুহূর্তকে ফ্রেমবন্দি করার বিশ্বস্ত আয়োজন।",
  },
];

export const Page10Company: React.FC<Page10Props> = ({
  language,
  onNextPage,
  onGoToIndex,
}) => {
  const isBn = language === "bn";

  return (
    <div className="mx-auto w-full min-w-0 max-w-2xl overflow-x-clip px-2 py-4 pb-28 text-red-950 sm:px-4">
      <RoyalFrame className="min-w-0 border-2 border-yellow-400 bg-white">
        {/* Header */}
        <header className="mb-5 min-w-0 text-center sm:mb-7">
          <div className="mb-2 flex items-center justify-center gap-1.5 sm:gap-2">
            <KolkaOrnament className="h-5 w-5 shrink-0 text-yellow-500 sm:h-6 sm:w-6" />

            <span className="text-[9px] font-serif font-bold uppercase tracking-wide text-red-800 sm:text-xs sm:tracking-widest">
              {isBn ? "॥ আমাদের সংস্থা ॥" : "॥ Meet Our Company ॥"}
            </span>

            <KolkaOrnament className="h-5 w-5 shrink-0 -scale-x-100 text-yellow-500 sm:h-6 sm:w-6" />
          </div>

          <div className="mx-auto mb-3 flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center overflow-hidden rounded-full border-2 border-yellow-400 bg-red-800 shadow-md">
            <img
              src="../../Public/Image/logo.png"
              alt="Wedding Logo"
              className="h-full w-full object-contain p-1"
            />
          </div>

          <h2 className="break-words font-serif text-3xl font-bold leading-tight text-red-900 sm:text-4xl">
            {COMPANY_NAME}
          </h2>

          <p className="mt-2 font-serif text-sm font-bold text-yellow-700 sm:text-base">
            {isBn
              ? "আপনার স্বপ্নের শুভ পরিণয় আয়োজনের বিশ্বস্ত সঙ্গী"
              : "Your Trusted Partner for the Perfect Wedding Experience"}
          </p>

          <p className="mx-auto mt-2 max-w-lg px-1 text-xs leading-relaxed text-stone-600 sm:text-sm">
            {isBn
              ? "আপনার স্বপ্নের শুভ পরিণয়কে সুন্দর ও আধুনিক করে তুলতে প্যান্ডেল, লাইটিং, ভিডিওগ্রাফি এবং ডিজিটাল কার্ডের অনন্য সেবা নিয়ে আমরা আপনার পাশে।"
              : "We are by your side with complete wedding solutions—including pandal decor, stunning lighting, videography, and modern digital invites."}
          </p>
        </header>

        {/* Company Introduction */}
        <section className="mb-4 rounded-2xl border-2 border-yellow-400 bg-red-50 p-4 shadow-sm sm:p-5">
          <div className="mb-2 flex items-center gap-2">
            <Globe className="h-5 w-5 shrink-0 text-red-800" />

            <h3 className="font-serif text-base font-bold text-red-900 sm:text-lg">
              {isBn ? "আমাদের লক্ষ্য" : "What We Believe In"}
            </h3>
          </div>

          <p className="text-xs leading-relaxed text-stone-700 sm:text-sm">
            {isBn
              ? "আপনার জীবনের বিশেষ দিনটিকে স্মরণীয় করে তুলতে আমরা পাশে আছি। প্যান্ডেল সজ্জা, মনমুগ্ধকর লাইটিং, ডিজিটাল ভিডিওগ্রাফি-ফটোগ্রাফি এবং আধুনিক ডিজিটাল নিমন্ত্রণপত্র সহ আপনার সম্পূর্ণ বিবাহ উৎসবের অনন্য সমাধানে আজই যোগাযোগ করুন।"
              : "We are here to make your special day truly memorable. Contact us today for complete wedding solutions—including pandal decoration, stunning lighting, digital photography & videography, and modern digital invitations."}
          </p>

          <div className="mt-4 rounded-xl border border-yellow-300 bg-white p-3 text-center">
            <p className="font-serif text-sm font-bold leading-relaxed text-red-900 sm:text-base">
              {isBn
                ? "আপনার স্বপ্ন, আমাদের নিখুঁত বিবাহ আয়োজন।"
                : "Your Dream, Our Crafting of the Perfect Wedding."}
            </p>
          </div>
        </section>

        {/* Services */}
        <section className="mb-4 min-w-0">
          <div className="mb-3 text-center">
            <h3 className="font-serif text-xl font-bold text-red-900 sm:text-2xl">
              {isBn ? "আমাদের পরিষেবা" : "What We Do"}
            </h3>

            <p className="mt-1 text-xs text-stone-600 sm:text-sm">
              {isBn
                ? "আপনার বিবাহের নিখুঁত আয়োজন ও ডিজিটাল সমাধান"
                : "Complete Wedding Management & Digital Solutions"}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <article
                  key={service.titleEn}
                  className="min-w-0 rounded-xl border border-yellow-300 bg-white p-3 shadow-sm transition-colors hover:bg-red-50 sm:p-4"
                >
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-red-800 text-yellow-300">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h4 className="break-words font-serif text-sm font-bold leading-snug text-red-900 sm:text-base">
                    {isBn ? service.titleBn : service.titleEn}
                  </h4>

                  <p className="mt-1 break-words text-xs leading-relaxed text-stone-600 sm:text-sm">
                    {isBn ? service.descBn : service.descEn}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        {/* Instagram Call to Action */}
        <section className="mb-4 rounded-2xl border-2 border-yellow-400 bg-red-800 p-4 text-center shadow-md sm:p-6">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-yellow-400 bg-white/10">
            <Instagram className="h-6 w-6 text-yellow-300" />
          </div>

          <h3 className="break-words font-serif text-xl font-bold text-yellow-300 sm:text-2xl">
            {isBn
              ? "ইনস্টাগ্রামে আমাদের সঙ্গে যুক্ত হন"
              : "Connect With Us on Instagram"}
          </h3>

          <p className="mt-2 text-xs leading-relaxed text-white/90 sm:text-sm">
            {isBn
              ? "আমাদের কাজ, নতুন আপডেট ও ডিজিটাল আইডিয়া দেখতে ইনস্টাগ্রামে ফলো করুন।"
              : "Follow us for our work, updates and fresh ideas for growing your online presence."}
          </p>

          <p className="mt-3 break-all text-sm font-bold text-yellow-300">
            @saatpak_films
          </p>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-yellow-400 bg-yellow-400 px-4 py-3 text-sm font-bold text-red-950 transition-colors hover:bg-yellow-300 sm:w-auto sm:min-w-56"
          >
            <Instagram className="h-4 w-4 shrink-0" />

            <span>
              {isBn ? "আমাদের Instagram দেখুন" : "Visit Our Instagram"}
            </span>

            <ExternalLink className="h-4 w-4 shrink-0" />
          </a>
        </section>

        {/* Contact Numbers */}
        <section className="mb-4 rounded-2xl border border-yellow-400 bg-red-50 p-4 sm:p-5">
          <div className="mb-3 flex items-center gap-2">
            <Phone className="h-5 w-5 shrink-0 text-red-800" />

            <h3 className="font-serif text-base font-bold text-red-900 sm:text-lg">
              {isBn ? "যোগাযোগ করুন" : "Get in Touch"}
            </h3>
          </div>

          <p className="mb-3 text-xs leading-relaxed text-stone-600 sm:text-sm">
            {isBn
              ? "প্যান্ডেল, লাইটিং, ভিডিওগ্রাফি বা ডিজিটাল ইনভিটেশন সহ যেকোনো পরিষেবা সম্পর্কে জানতে আমাদের সাথে সরাসরি যোগাযোগ করুন।"
              : "Get in touch with us to learn more about our event management, decor, photography, and digital invitation services."}
          </p>

          <div className="space-y-2">
            {COMPANY_PHONE_NUMBERS.map((number, index) => {
              const digits = number.replace(/\D/g, "");
              const isPlaceholder = /X/i.test(number);

              return (
                <div
                  key={`${number}-${index}`}
                  className="flex min-w-0 flex-wrap items-center justify-between gap-2 rounded-xl border border-yellow-300 bg-white p-3"
                >
                  <div className="flex min-w-0 items-center gap-2">
                    <Phone className="h-4 w-4 shrink-0 text-red-700" />

                    <span className="break-words text-sm font-bold text-red-900">
                      {number}
                    </span>
                  </div>

                  {!isPlaceholder && digits.length >= 10 && (
                    <a
                      href={`tel:${digits}`}
                      className="inline-flex shrink-0 items-center gap-1 rounded-full bg-red-800 px-3 py-2 text-xs font-bold text-yellow-300 hover:bg-red-700"
                    >
                      <Phone className="h-3.5 w-3.5" />

                      {isBn ? "কল করুন" : "Call"}
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Closing Message */}
        <div className="px-2 py-2 text-center">
          <KolkaOrnament className="mx-auto mb-2 h-7 w-7 text-yellow-500" />

          <p className="font-serif text-sm font-bold leading-relaxed text-red-900 sm:text-base">
            {isBn
              ? "আপনার স্বপ্নের বিবাহ উৎসবের প্রস্তুতি শুরু হোক আজ থেকেই।"
              : "Start planning your dream wedding celebration today."}
          </p>
        </div>

        <MandapDivider className="my-4" />

        {/* Page Navigation */}
        <div className="mt-4 flex min-w-0 flex-col items-stretch gap-2.5 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={onGoToIndex}
            className="w-full rounded-full border border-yellow-400 bg-red-50 px-4 py-3 text-xs font-serif font-bold text-red-900 transition-colors hover:bg-red-100 sm:w-auto sm:py-2.5 sm:text-sm"
          >
            {isBn ? "‹ সূচিপত্রে ফিরুন" : "‹ Back to Chapters"}
          </button>

          <button
            type="button"
            onClick={onNextPage}
            className="group flex w-full min-w-0 items-center justify-center gap-2 rounded-full border-2 border-yellow-400 bg-red-800 px-4 py-3 text-xs font-serif font-bold leading-relaxed text-yellow-300 shadow transition-colors hover:bg-red-700 sm:w-auto sm:px-5 sm:py-2.5 sm:text-sm"
          >
            <span>{isBn ? "পরবর্তী অধ্যায়" : "Next Chapter"}</span>

            <ArrowRight className="h-4 w-4 shrink-0 text-yellow-400 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </RoyalFrame>
    </div>
  );
};
