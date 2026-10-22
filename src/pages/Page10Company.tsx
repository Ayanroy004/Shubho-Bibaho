import React from "react";
import {
  Instagram,
  Phone,
  Globe,
  ArrowRight,
  ExternalLink,
  Camera,
  Heart,
  CalendarDays,
  BriefcaseBusiness,
  Plane,
  Cake,
  Mail,
  MapPin,
  Users,
  MonitorSmartphone,
} from "lucide-react";

import { Language } from "../types";
import logo from "../../public/image/logo.png";
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
const OWNER_NAME = "Amiya Ghosh";

const INSTAGRAM_URL = "https://www.instagram.com/saatpak_films/";

const COMPANY_PHONE = "+91 97490 45287";
const COMPANY_EMAIL = "saatpakfilms2026@gmail.com";
const COMPANY_ADDRESS = "Khanakul, Hooghly, 712406";

const services = [
  {
    icon: Camera,
    titleEn: "Wedding Photography & Cinematography",
    titleBn: "বিবাহের ফটোগ্রাফি ও সিনেমাটোগ্রাফি",
    descEn:
      "Capture the beautiful moments, emotions, and memories of your wedding day.",
    descBn:
      "আপনার বিবাহের সুন্দর মুহূর্ত, আবেগ ও স্মৃতিগুলিকে ক্যামেরায় ধরে রাখুন।",
  },
  {
    icon: Heart,
    titleEn: "Pre-Wedding",
    titleBn: "প্রি-ওয়েডিং",
    descEn:
      "Celebrate your love story through memorable pre-wedding photography and cinematic videos.",
    descBn:
      "প্রি-ওয়েডিং ফটোগ্রাফি ও সিনেমাটিক ভিডিওর মাধ্যমে আপনাদের ভালোবাসার গল্পকে স্মরণীয় করে তুলুন।",
  },
  {
    icon: CalendarDays,
    titleEn: "Rice Ceremony",
    titleBn: "অন্নপ্রাশন অনুষ্ঠান",
    descEn:
      "Preserve the precious memories of your child's special rice ceremony with beautiful photographs and videos.",
    descBn:
      "আপনার সন্তানের বিশেষ অন্নপ্রাশন অনুষ্ঠানের মূল্যবান স্মৃতিগুলিকে সুন্দর ছবি ও ভিডিওতে ধরে রাখুন।",
  },
  {
    icon: Users,
    titleEn: "Engagement",
    titleBn: "বাগদান অনুষ্ঠান",
    descEn:
      "Capture the happiness, emotions, and special moments of your engagement ceremony.",
    descBn:
      "আপনাদের বাগদান অনুষ্ঠানের আনন্দ, আবেগ ও বিশেষ মুহূর্তগুলিকে ক্যামেরাবন্দি করুন।",
  },
  {
    icon: BriefcaseBusiness,
    titleEn: "Corporate Events",
    titleBn: "কর্পোরেট অনুষ্ঠান",
    descEn:
      "Professional event photography and cinematography for corporate functions and business events.",
    descBn:
      "কর্পোরেট অনুষ্ঠান ও ব্যবসায়িক ইভেন্টের জন্য পেশাদার ফটোগ্রাফি ও সিনেমাটোগ্রাফি।",
  },
  {
    icon: Plane,
    titleEn: "Aerial Cinematography",
    titleBn: "এরিয়াল সিনেমাটোগ্রাফি",
    descEn:
      "Add a unique perspective to your celebrations with stunning aerial cinematic shots.",
    descBn:
      "মনোমুগ্ধকর আকাশপথের দৃশ্যের মাধ্যমে আপনার অনুষ্ঠানের ভিডিওতে এক অনন্য মাত্রা যোগ করুন।",
  },
  {
    icon: Cake,
    titleEn: "Birthday Photography",
    titleBn: "জন্মদিনের ফটোগ্রাফি",
    descEn:
      "Make birthdays memorable by capturing joyful celebrations, candid moments, and smiles.",
    descBn:
      "আনন্দ, হাসি ও স্বতঃস্ফূর্ত মুহূর্তগুলিকে ক্যামেরায় ধরে রেখে জন্মদিনকে স্মরণীয় করে তুলুন।",
  },
  {
    icon: MonitorSmartphone,
    titleEn: "Digital Invitation Websites",
    titleBn: "ডিজিটাল নিমন্ত্রণ ওয়েবসাইট",
    descEn:
      "Create interactive bilingual wedding websites with live maps, guestbook, and RSVP features.",
    descBn:
      "লাইভ ম্যাপ, গেস্টবুক ও RSVP ফিচার সহ আকর্ষণীয় দ্বিমুখী ডিজিটাল ওয়েডিং ওয়েবসাইট তৈরি করুন।",
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
              {isBn ? "॥ আমাদের পরিচয় ॥" : "॥ Meet Our Company ॥"}
            </span>

            <KolkaOrnament className="h-5 w-5 shrink-0 -scale-x-100 text-yellow-500 sm:h-6 sm:w-6" />
          </div>

          <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border-2 border-yellow-400 bg-red-800 shadow-md sm:h-20 sm:w-20">
            <img
              src={logo}
              alt="Saatpak Films Logo"
              className="h-full w-full object-contain p-1"
            />
          </div>

          <h2 className="break-words font-serif text-3xl font-bold leading-tight text-red-900 sm:text-4xl">
            {COMPANY_NAME}
          </h2>

          <p className="mt-1 text-xs font-semibold tracking-wide text-red-800 sm:text-sm">
            {isBn ? "মালিক: অমিয় ঘোষ" : `Owner: ${OWNER_NAME}`}
          </p>

          <p className="mt-2 font-serif text-sm font-bold text-yellow-700 sm:text-base">
            {isBn
              ? "“সাত পাকের বন্ধন হোক আজীবন”"
              : "Bound by the seven sacred steps, united for a lifetime."}
          </p>

          <p className="mx-auto mt-2 max-w-lg px-1 text-xs leading-relaxed text-stone-600 sm:text-sm">
            {isBn
              ? "বিবাহ, প্রি-ওয়েডিং, অন্নপ্রাশন, বাগদান, কর্পোরেট অনুষ্ঠান, এরিয়াল সিনেমাটোগ্রাফি ও জন্মদিনের বিশেষ মুহূর্ত ধরে রাখতে আমরা আপনার পাশে।"
              : "We capture life's precious moments through wedding and pre-wedding photography, rice ceremonies, engagements, corporate events, aerial cinematography, and birthdays."}
          </p>
        </header>

        {/* Company Introduction */}
        <section className="mb-4 rounded-2xl border-2 border-yellow-400 bg-red-50 p-4 shadow-sm sm:p-5">
          <div className="mb-2 flex items-center gap-2">
            <Globe className="h-5 w-5 shrink-0 text-red-800" />

            <h3 className="font-serif text-base font-bold text-red-900 sm:text-lg">
              {isBn ? "আমাদের সম্পর্কে" : "About Saatpak Films"}
            </h3>
          </div>

          <p className="text-xs leading-relaxed text-stone-700 sm:text-sm">
            {isBn
              ? "জীবনের বিশেষ মুহূর্তগুলি একদিন স্মৃতি হয়ে থাকে। Saatpak Films সেই মুহূর্তগুলিকে সুন্দর ছবি ও সিনেমাটিক ভিডিওর মাধ্যমে ধরে রাখতে সাহায্য করে। বিবাহ থেকে শুরু করে জন্মদিন ও কর্পোরেট অনুষ্ঠান—আপনার আনন্দের প্রতিটি মুহূর্তকে স্মরণীয় করে রাখাই আমাদের লক্ষ্য।"
              : "Special moments become lifelong memories. Saatpak Films helps preserve those memories through photography and cinematic videos. From weddings and engagements to birthdays and corporate events, our aim is to capture the moments that matter to you."}
          </p>

          <div className="mt-4 rounded-xl border border-yellow-300 bg-white p-3 text-center">
            <p className="font-serif text-sm font-bold leading-relaxed text-red-900 sm:text-base">
              {isBn
                ? "“সাত পাকের বন্ধন হোক আজীবন”"
                : "Bound by the seven sacred steps, united for a lifetime."}
            </p>
          </div>
        </section>

        {/* Services */}
        <section className="mb-4 min-w-0">
          <div className="mb-3 text-center">
            <h3 className="font-serif text-xl font-bold text-red-900 sm:text-2xl">
              {isBn ? "আমাদের পরিষেবা" : "Our Services"}
            </h3>

            <p className="mt-1 text-xs text-stone-600 sm:text-sm">
              {isBn
                ? "আপনার জীবনের বিশেষ মুহূর্তগুলির জন্য"
                : "Capturing Your Special Moments"}
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
              ? "আমাদের ফটোগ্রাফি ও সিনেমাটোগ্রাফির কাজ দেখতে এবং নতুন আপডেট পেতে আমাদের ইনস্টাগ্রাম পেজে ঘুরে আসুন।"
              : "Explore our photography and cinematography work and stay updated with our latest creations."}
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

        {/* Contact Information */}
        <section className="mb-4 rounded-2xl border border-yellow-400 bg-red-50 p-4 sm:p-5">
          <div className="mb-3 flex items-center gap-2">
            <Phone className="h-5 w-5 shrink-0 text-red-800" />

            <h3 className="font-serif text-base font-bold text-red-900 sm:text-lg">
              {isBn ? "যোগাযোগ করুন" : "Get in Touch"}
            </h3>
          </div>

          <p className="mb-3 text-xs leading-relaxed text-stone-600 sm:text-sm">
            {isBn
              ? "বিবাহ, প্রি-ওয়েডিং, অন্নপ্রাশন, বাগদান, কর্পোরেট অনুষ্ঠান, এরিয়াল সিনেমাটোগ্রাফি অথবা জন্মদিনের ফটোগ্রাফি সম্পর্কে জানতে আমাদের সঙ্গে যোগাযোগ করুন।"
              : "Contact us to discuss photography and cinematography for weddings, pre-weddings, rice ceremonies, engagements, corporate events, aerial shoots, and birthdays."}
          </p>

          <div className="space-y-2">
            {/* Phone */}
            <div className="flex min-w-0 flex-wrap items-center justify-between gap-2 rounded-xl border border-yellow-300 bg-white p-3">
              <div className="flex min-w-0 items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-red-700" />

                <span className="break-words text-sm font-bold text-red-900">
                  {COMPANY_PHONE}
                </span>
              </div>

              <a
                href={`tel:${COMPANY_PHONE.replace(/\s/g, "")}`}
                className="inline-flex shrink-0 items-center gap-1 rounded-full bg-red-800 px-3 py-2 text-xs font-bold text-yellow-300 hover:bg-red-700"
              >
                <Phone className="h-3.5 w-3.5" />
                {isBn ? "কল করুন" : "Call"}
              </a>
            </div>

            {/* Email */}
            <div className="flex min-w-0 flex-wrap items-center justify-between gap-2 rounded-xl border border-yellow-300 bg-white p-3">
              <div className="flex min-w-0 items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-red-700" />

                <span className="break-all text-sm font-bold text-red-900">
                  {COMPANY_EMAIL}
                </span>
              </div>

              <a
                href={`mailto:${COMPANY_EMAIL}`}
                className="inline-flex shrink-0 items-center gap-1 rounded-full bg-red-800 px-3 py-2 text-xs font-bold text-yellow-300 hover:bg-red-700"
              >
                <Mail className="h-3.5 w-3.5" />
                {isBn ? "ইমেল করুন" : "Email"}
              </a>
            </div>

            {/* Address */}
            <div className="flex min-w-0 items-start gap-2 rounded-xl border border-yellow-300 bg-white p-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-red-700" />

              <div className="min-w-0">
                <p className="text-xs font-semibold text-stone-500">
                  {isBn ? "ঠিকানা" : "Address"}
                </p>

                <p className="break-words text-sm font-bold text-red-900">
                  {isBn ? "খানাকুল, হুগলি, ৭১২৪০৬" : COMPANY_ADDRESS}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Closing Message */}
        <div className="px-2 py-2 text-center">
          <KolkaOrnament className="mx-auto mb-2 h-7 w-7 text-yellow-500" />

          <p className="font-serif text-sm font-bold leading-relaxed text-red-900 sm:text-base">
            {isBn
              ? "“সাত পাকের বন্ধন হোক আজীবন”"
              : "Bound by the seven sacred steps, united for a lifetime."}
          </p>

          <p className="mt-2 text-xs font-semibold text-yellow-700">
            {isBn ? "সাতপাক ফিল্মস — অমিয় ঘোষ" : "Saatpak Films — Amiya Ghosh"}
          </p>
        </div>

        <MandapDivider className="my-4" />

        {/* Page Navigation */}
        {/* <div className="mt-4 flex min-w-0 flex-col items-stretch gap-2.5 sm:flex-row sm:items-center sm:justify-between">
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
        </div> */}
      </RoyalFrame>
    </div>
  );
};
