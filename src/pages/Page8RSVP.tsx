import React, { useState } from "react";
import confetti from "canvas-confetti";
import {
  MailCheck,
  Send,
  Heart,
  CheckCircle2,
  ArrowRight,
  AlertCircle,
} from "lucide-react";

import { Language, WeddingSettings, RSVPSubmission } from "../types";
import { sendRSVPToGoogleSheet } from "../utils/googleSheets";

import {
  KolkaOrnament,
  MandapDivider,
  RoyalFrame,
} from "../components/Ornaments";

interface Page8Props {
  settings: WeddingSettings;
  language: Language;
  rsvps: RSVPSubmission[];
  onAddRSVP: (rsvp: RSVPSubmission) => void;
  onNextPage: () => void;
  onGoToIndex: () => void;
}

type Attendance = "attending" | "not_attending" | "tentative";

type MealPreference = "traditional_nonveg" | "pure_veg" | "jain_veg";

interface FieldErrors {
  guestName?: string;
  contact?: string;
  ceremonies?: string;
  guestCount?: string;
  mealPreference?: string;
}

export const Page8RSVP: React.FC<Page8Props> = ({
  settings,
  language,
  onAddRSVP,
  onNextPage,
  onGoToIndex,
}) => {
  const isBn = language === "bn";

  const [guestName, setGuestName] = useState("");
  const [contact, setContact] = useState("");
  const [attending, setAttending] = useState<Attendance>("attending");
  const [guestCount, setGuestCount] = useState<number>(2);

  const [selectedCeremonies, setSelectedCeremonies] = useState<string[]>([
    "bibaho",
    "boubhat",
  ]);

  const [mealPreference, setMealPreference] =
    useState<MealPreference>("traditional_nonveg");

  const [blessingMessage, setBlessingMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const [pendingSubmission, setPendingSubmission] =
    useState<RSVPSubmission | null>(null);

  const [submissionFeedback, setSubmissionFeedback] = useState<{
    status: "success" | "error";
    message: string;
  } | null>(null);

  const clearFieldError = (field: keyof FieldErrors) => {
    setFieldErrors((prev) => ({
      ...prev,
      [field]: undefined,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting || pendingSubmission) return;

    const errors: FieldErrors = {};

    if (!guestName.trim()) {
      errors.guestName = isBn
        ? "আপনার পুরো নাম লিখুন।"
        : "Please enter your full name.";
    } else if (guestName.trim().length < 2) {
      errors.guestName = isBn
        ? "নাম অন্তত ২ অক্ষরের হতে হবে।"
        : "Name must contain at least 2 characters.";
    }

    if (!/^[6-9]\d{9}$/.test(contact)) {
      errors.contact = isBn
        ? "সঠিক ১০ সংখ্যার ভারতীয় মোবাইল নম্বর লিখুন।"
        : "Enter a valid 10-digit Indian mobile number.";
    }

    if (
      attending === "attending" &&
      (!Number.isInteger(guestCount) || guestCount < 1 || guestCount > 5)
    ) {
      errors.guestCount = isBn
        ? "১ থেকে ৫ জন অতিথি নির্বাচন করুন।"
        : "Please select between 1 and 5 guests.";
    }

    if (attending === "attending" && selectedCeremonies.length === 0) {
      errors.ceremonies = isBn
        ? "অন্তত একটি অনুষ্ঠান নির্বাচন করুন।"
        : "Please select at least one ceremony.";
    }

    if (
      !["traditional_nonveg", "pure_veg", "jain_veg"].includes(mealPreference)
    ) {
      errors.mealPreference = isBn
        ? "খাবারের পছন্দ নির্বাচন করুন।"
        : "Please select a meal preference.";
    }

    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      setSubmissionFeedback(null);
      return;
    }

    const submission: RSVPSubmission = {
      id: `rsvp-${Date.now()}`,
      guestName: guestName.trim(),
      contact: contact.trim(),
      attending,
      guestCount: attending === "attending" ? guestCount : 0,
      ceremonies: attending === "attending" ? [...selectedCeremonies] : [],
      mealPreference,
      blessingMessage:
        blessingMessage.trim() ||
        (isBn
          ? "শুভ পরিণয়ে আন্তরিক শুভেচ্ছা ও আশীর্বাদ।"
          : "Warmest congratulations!"),
      createdAt: new Date().toLocaleDateString(isBn ? "bn-BD" : "en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      syncedToGoogleSheet: false,
    };

    setSubmissionFeedback(null);
    setPendingSubmission(submission);
  };

  const confirmSubmission = async () => {
    if (!pendingSubmission || isSubmitting) return;
    setIsSubmitting(true);
    setSubmissionFeedback(null);

    let savedLocally = false;

    try {
      onAddRSVP(pendingSubmission);
      savedLocally = true;

      const webhookUrl = settings.googleSheetsWebhookUrl?.trim();

      if (webhookUrl) {
        const result = await sendRSVPToGoogleSheet(
          webhookUrl,
          pendingSubmission,
        );

        if (result.success) {
          setSubmissionFeedback({
            status: "success",
            message: isBn
              ? "ধন্যবাদ! আপনার উপস্থিতির তথ্য সফলভাবে রেকর্ড করা হয়েছে।"
              : "Thank you! Your RSVP has been recorded successfully.",
          });
        } else {
          setSubmissionFeedback({
            status: "error",
            message: isBn
              ? "আপনার RSVP অ্যাপে সংরক্ষিত হয়েছে, কিন্তু Google Sheets-এ পাঠানো যায়নি।"
              : "Your RSVP was saved in the app, but Google Sheets synchronization failed.",
          });
        }
      } else {
        setSubmissionFeedback({
          status: "success",
          message: isBn
            ? "ধন্যবাদ! আপনার উপস্থিতির তথ্য অ্যাপে সংরক্ষিত হয়েছে।"
            : "Thank you! Your RSVP has been saved in the app.",
        });
      }

      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.7 },
          colors: ["#facc15", "#dc2626", "#ffffff"],
        });
      } catch {
        // Ignore animation errors.
      }

      setPendingSubmission(null);
      setGuestName("");
      setContact("");
      setBlessingMessage("");
      setFieldErrors({});
    } catch (error) {
      console.error("RSVP submission error:", error);

      setSubmissionFeedback({
        status: "error",
        message: savedLocally
          ? isBn
            ? "আপনার RSVP অ্যাপে সংরক্ষিত হয়েছে, কিন্তু পরবর্তী প্রক্রিয়ায় সমস্যা হয়েছে।"
            : "Your RSVP was saved in the app, but another step failed."
          : isBn
            ? "RSVP সংরক্ষণ করা যায়নি। আবার চেষ্টা করুন।"
            : "Could not save your RSVP. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleCeremony = (id: string) => {
    setSelectedCeremonies((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id],
    );

    clearFieldError("ceremonies");
  };

  const attendanceLabel = (value: Attendance) => {
    if (value === "attending") {
      return isBn ? "উপস্থিত থাকব" : "Joyfully Attending";
    }

    if (value === "not_attending") {
      return isBn ? "উপস্থিত থাকতে পারব না" : "Regretfully Declining";
    }

    return isBn ? "এখনও অনিশ্চিত" : "Tentative";
  };

  const mealLabel = (value: MealPreference) => {
    if (value === "traditional_nonveg") {
      return isBn ? "মাছ-মাংস সহযোগে সনাতন ভোজ" : "Traditional Non-Veg Feast";
    }

    if (value === "pure_veg") {
      return isBn ? "খাঁটি নিরামিষ ভোজ" : "Pure Vegetarian";
    }

    return isBn ? "জৈন নিরামিষ" : "Jain Vegetarian";
  };

  const ceremonyLabel = (id: string) => {
    const ceremony = [
      { id: "holud", bn: "গায়ে হলুদ", en: "Gaye Holud" },
      { id: "bibaho", bn: "শুভ বিবাহ", en: "Wedding Ceremony" },
      { id: "boubhat", bn: "প্রীতিভোজ", en: "Grand Reception" },
    ].find((item) => item.id === id);

    return ceremony ? (isBn ? ceremony.bn : ceremony.en) : id;
  };

  return (
    <div className="mx-auto w-full min-w-0 max-w-2xl overflow-x-clip px-2 py-4 pb-28 text-red-950 sm:px-4">
      <RoyalFrame className="min-w-0 border-2 border-yellow-400 bg-white">
        {/* Header */}
        <div className="mb-4 min-w-0 text-center sm:mb-6">
          <div className="mb-2 flex min-w-0 items-center justify-center gap-1.5 sm:gap-2">
            <KolkaOrnament className="h-5 w-5 shrink-0 text-yellow-500 sm:h-6 sm:w-6" />

            <span className="min-w-0 text-[9px] font-serif font-bold uppercase tracking-wide text-red-800 sm:text-xs sm:tracking-widest">
              {isBn
                ? "॥ অধ্যায় ৩: উপস্থিতি নিশ্চিতকরণ ॥"
                : "॥ Chapter 3: Confirm Attendance ॥"}
            </span>

            <KolkaOrnament className="h-5 w-5 shrink-0 -scale-x-100 text-yellow-500 sm:h-6 sm:w-6" />
          </div>

          <h2 className="break-words font-serif text-2xl font-bold leading-tight text-red-900 sm:text-4xl">
            {isBn
              ? "উপস্থিতি নিশ্চিত করুন (RSVP)"
              : "Confirm Your Attendance (RSVP)"}
          </h2>

          <p className="mx-auto mt-1 max-w-md px-1 text-xs font-serif leading-relaxed text-stone-600 sm:text-sm">
            {isBn
              ? "আপনার উপস্থিতি ও আশীর্বাদ আমাদের এই শুভযাত্রার শ্রেষ্ঠ উপহার"
              : "Your presence & blessings grace our sacred wedding celebration"}
          </p>
        </div>

        {/* RSVP Form */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="min-w-0 space-y-4 rounded-2xl border-2 border-yellow-400 bg-red-50 p-3 shadow-sm sm:p-5 sm:space-y-3.5"
        >
          <div className="flex min-w-0 items-center gap-2 border-b border-yellow-400/40 pb-2 font-serif text-sm font-bold text-red-900 sm:text-base">
            <MailCheck className="h-4 w-4 shrink-0 text-red-700 sm:h-5 sm:w-5" />

            <span className="min-w-0">
              {isBn
                ? "আমন্ত্রণ ও উপস্থিতি পত্র পূরণ করুন"
                : "Please Fill Attendance Details"}
            </span>
          </div>

          {/* Guest Name */}
          <div className="min-w-0">
            <label
              htmlFor="rsvp-guest-name"
              className="mb-1 block text-xs font-serif font-bold text-stone-800"
            >
              {isBn ? "আপনার শুভ নাম *" : "Your Full Name *"}
            </label>

            <input
              id="rsvp-guest-name"
              type="text"
              required
              minLength={2}
              autoComplete="name"
              value={guestName}
              onChange={(e) => {
                setGuestName(e.target.value);
                clearFieldError("guestName");
              }}
              aria-invalid={Boolean(fieldErrors.guestName)}
              className="w-full min-w-0 rounded-xl border border-yellow-400 bg-white p-3 text-sm focus:outline-none focus:ring-1 focus:ring-red-800 sm:p-2.5 sm:text-xs"
              placeholder={isBn ? "যেমন: শ্রী সুব্রত রায়" : "e.g. Subrata Roy"}
            />

            {fieldErrors.guestName && (
              <p className="mt-1 text-xs text-red-700" role="alert">
                {fieldErrors.guestName}
              </p>
            )}
          </div>

          {/* Mobile Number */}
          <div className="min-w-0">
            <label
              htmlFor="rsvp-contact"
              className="mb-1 block text-xs font-serif font-bold text-stone-800"
            >
              {isBn ? "১০ সংখ্যার মোবাইল নম্বর *" : "10-Digit Mobile Number *"}
            </label>

            <input
              id="rsvp-contact"
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              required
              maxLength={10}
              pattern="[6-9][0-9]{9}"
              value={contact}
              onChange={(e) => {
                const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
                setContact(digits);
                clearFieldError("contact");
              }}
              aria-invalid={Boolean(fieldErrors.contact)}
              aria-describedby={
                fieldErrors.contact ? "rsvp-contact-error" : undefined
              }
              className="w-full min-w-0 rounded-xl border border-yellow-400 bg-white p-3 text-sm focus:outline-none focus:ring-1 focus:ring-red-800 sm:p-2.5 sm:text-xs"
              placeholder={isBn ? "১০ সংখ্যার মোবাইল নম্বর" : "9876543210"}
            />

            <p className="mt-1 text-[10px] leading-relaxed text-stone-500">
              {isBn
                ? "শুধুমাত্র ১০টি সংখ্যা লিখুন, +৯১ দেওয়ার প্রয়োজন নেই।"
                : "Enter exactly 10 digits without +91 or spaces."}
            </p>

            {fieldErrors.contact && (
              <p
                id="rsvp-contact-error"
                className="mt-1 text-xs text-red-700"
                role="alert"
              >
                {fieldErrors.contact}
              </p>
            )}
          </div>

          {/* Attendance Status */}
          <div className="min-w-0">
            <label className="mb-1.5 block text-xs font-serif font-bold text-stone-800">
              {isBn
                ? "আপনি কি বিবাহ অনুষ্ঠানে উপস্থিত থাকছেন?"
                : "Will you be attending the wedding?"}
            </label>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
              {[
                {
                  id: "attending",
                  bn: "✓ অবশ্যই উপস্থিত থাকব",
                  en: "✓ Joyfully Attending",
                },
                {
                  id: "not_attending",
                  bn: "✗ দুঃখিত, পারছি না",
                  en: "✗ Regretfully Decline",
                },
                {
                  id: "tentative",
                  bn: "? এখনো অনিশ্চিত",
                  en: "? Tentative",
                },
              ].map((option) => (
                <button
                  type="button"
                  key={option.id}
                  aria-pressed={attending === option.id}
                  onClick={() => {
                    setAttending(option.id as Attendance);
                    clearFieldError("guestCount");
                    clearFieldError("ceremonies");
                  }}
                  className={`min-w-0 rounded-xl border px-3 py-3 text-left text-xs font-serif font-bold leading-relaxed transition-all sm:px-2 sm:py-2 sm:text-center ${
                    attending === option.id
                      ? "border-yellow-400 bg-red-800 text-yellow-300 shadow"
                      : "border-yellow-300 bg-white text-stone-700 hover:bg-red-100/50"
                  }`}
                >
                  {isBn ? option.bn : option.en}
                </button>
              ))}
            </div>
          </div>

          {/* Guest Count */}
          {attending === "attending" && (
            <div className="min-w-0 rounded-xl border border-yellow-300 bg-white p-3">
              <label className="mb-1.5 block text-xs font-serif font-bold text-red-900">
                {isBn
                  ? "আপনার সাথে মোট কয়জন উপস্থিত থাকবেন?"
                  : "How many guests will be attending?"}
              </label>

              <div className="flex flex-wrap items-center gap-2">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    type="button"
                    key={num}
                    aria-pressed={guestCount === num}
                    onClick={() => {
                      setGuestCount(num);
                      clearFieldError("guestCount");
                    }}
                    className={`h-10 w-10 shrink-0 rounded-full font-mono text-xs font-bold transition-all sm:h-9 sm:w-9 ${
                      guestCount === num
                        ? "border-2 border-yellow-400 bg-red-800 text-yellow-300 shadow"
                        : "border border-yellow-300 bg-red-50 text-red-900 hover:bg-red-100"
                    }`}
                  >
                    {num}
                  </button>
                ))}

                <span className="min-w-0 flex-1 text-xs font-serif text-stone-600">
                  {isBn ? `${guestCount} জন অতিথি` : `${guestCount} Guest(s)`}
                </span>
              </div>

              {fieldErrors.guestCount && (
                <p className="mt-1 text-xs text-red-700" role="alert">
                  {fieldErrors.guestCount}
                </p>
              )}
            </div>
          )}

          {/* Meal Preference */}
          <div className="min-w-0">
            <label className="mb-1.5 block text-xs font-serif font-bold text-stone-800">
              {isBn ? "আপনার ভোজের পছন্দ:" : "Dining / Meal Preference:"}
            </label>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {[
                {
                  id: "traditional_nonveg",
                  bn: "মাছ-মাংস সহযোগে সনাতন ভোজ",
                  en: "Traditional Non-Veg Feast",
                },
                {
                  id: "pure_veg",
                  bn: "খাঁটি নিরামিষ ভোজ",
                  en: "Pure Vegetarian",
                },
                {
                  id: "jain_veg",
                  bn: "জৈন নিরামিষ",
                  en: "Jain Vegetarian",
                },
              ].map((meal) => (
                <button
                  type="button"
                  key={meal.id}
                  aria-pressed={mealPreference === meal.id}
                  onClick={() => {
                    setMealPreference(meal.id as MealPreference);
                    clearFieldError("mealPreference");
                  }}
                  className={`min-w-0 rounded-xl border p-3 text-left text-xs font-serif leading-relaxed transition-all sm:p-2 ${
                    mealPreference === meal.id
                      ? "border-yellow-400 bg-red-800 font-bold text-yellow-300 shadow"
                      : "border-yellow-300 bg-white text-stone-700 hover:bg-red-100/50"
                  }`}
                >
                  {isBn ? meal.bn : meal.en}
                </button>
              ))}
            </div>

            {fieldErrors.mealPreference && (
              <p className="mt-1 text-xs text-red-700" role="alert">
                {fieldErrors.mealPreference}
              </p>
            )}
          </div>

          {/* Ceremonies */}
          {attending === "attending" && (
            <div className="min-w-0">
              <label className="mb-1.5 block text-xs font-serif font-bold text-stone-800">
                {isBn
                  ? "কোন কোন অনুষ্ঠানে উপস্থিত থাকবেন?"
                  : "Which events will you grace?"}
              </label>

              <div className="flex min-w-0 flex-wrap gap-2">
                {[
                  { id: "holud", bn: "গায়ে হলুদ", en: "Gaye Holud" },
                  { id: "bibaho", bn: "শুভ বিবাহ", en: "Wedding Ceremony" },
                  { id: "boubhat", bn: "প্রীতিভোজ", en: "Grand Reception" },
                ].map((ceremony) => {
                  const checked = selectedCeremonies.includes(ceremony.id);

                  return (
                    <button
                      type="button"
                      key={ceremony.id}
                      aria-pressed={checked}
                      onClick={() => toggleCeremony(ceremony.id)}
                      className={`max-w-full rounded-full border px-3 py-2 text-left text-xs font-serif leading-relaxed transition-all ${
                        checked
                          ? "border-yellow-500 bg-yellow-400 font-bold text-red-950 shadow-sm"
                          : "border-yellow-300 bg-white text-stone-700"
                      }`}
                    >
                      {checked ? "✓ " : "+ "}
                      {isBn ? ceremony.bn : ceremony.en}
                    </button>
                  );
                })}
              </div>

              {fieldErrors.ceremonies && (
                <p className="mt-1 text-xs text-red-700" role="alert">
                  {fieldErrors.ceremonies}
                </p>
              )}
            </div>
          )}

          {/* Blessing Message */}
          <div className="min-w-0">
            <label
              htmlFor="rsvp-blessing"
              className="mb-1 block text-xs font-serif font-bold text-stone-800"
            >
              {isBn
                ? "নবদম্পতির উদ্দেশ্যে আপনার স্নেহাশিস ও শুভেচ্ছা বার্তা:"
                : "Warm Wishes & Blessings for the Couple:"}
            </label>

            <textarea
              id="rsvp-blessing"
              rows={3}
              maxLength={1000}
              placeholder={
                isBn
                  ? "নবদম্পতির আগামী দিনগুলি অনাবিল আনন্দে ভরে উঠুক..."
                  : "Wishing you both eternal joy, harmony, and togetherness..."
              }
              value={blessingMessage}
              onChange={(e) => setBlessingMessage(e.target.value)}
              className="w-full min-w-0 resize-y rounded-xl border border-yellow-400 bg-white p-3 text-sm focus:outline-none focus:ring-1 focus:ring-red-800 sm:p-2.5 sm:text-xs"
            />
          </div>

          {/* Submission Feedback */}
          {submissionFeedback && (
            <div
              role={submissionFeedback.status === "error" ? "alert" : "status"}
              className={`flex min-w-0 items-start gap-2 rounded-xl border p-3 font-serif text-xs leading-relaxed ${
                submissionFeedback.status === "success"
                  ? "border-yellow-400 bg-yellow-100 text-red-950"
                  : "border-red-400 bg-red-100 text-red-950"
              }`}
            >
              {submissionFeedback.status === "success" ? (
                <CheckCircle2 className="h-4 w-4 shrink-0 text-green-700" />
              ) : (
                <AlertCircle className="h-4 w-4 shrink-0 text-red-700" />
              )}

              <span className="min-w-0 break-words">
                {submissionFeedback.message}
              </span>
            </div>
          )}

          {/* Review & Continue */}
          <div className="pt-1">
            <button
              type="submit"
              disabled={isSubmitting || Boolean(pendingSubmission)}
              className="flex w-full min-w-0 items-center justify-center gap-2 rounded-full border-2 border-yellow-400 bg-red-800 px-3 py-3 text-center text-xs font-serif font-bold leading-relaxed text-yellow-300 shadow transition-all hover:bg-red-700 active:scale-[0.98] disabled:opacity-60 sm:py-3 sm:text-sm"
            >
              <Send className="h-4 w-4 shrink-0 text-yellow-400" />

              <span>
                {isBn ? "তথ্য যাচাই করুন ও এগিয়ে যান" : "Review & Continue"}
              </span>
            </button>
          </div>
        </form>

        <MandapDivider className="my-4" />

        {/* Navigation */}
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
            className="group flex w-full min-w-0 items-center justify-center gap-1.5 rounded-full border-2 border-yellow-400 bg-red-800 px-4 py-3 text-xs font-serif font-bold leading-relaxed text-yellow-300 shadow transition-colors hover:bg-red-700 sm:w-auto sm:px-5 sm:py-2.5 sm:text-sm"
          >
            <span className="min-w-0 break-words text-center">
              {isBn
                ? "পরবর্তী: ঐতিহ্যবাহী নিমন্ত্রণ লিপি"
                : "Next: Traditional Formal Letter"}
            </span>

            <ArrowRight className="h-3.5 w-3.5 shrink-0 text-yellow-400 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Confirmation Modal */}
        {pendingSubmission && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/60 p-3 sm:p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="rsvp-confirm-title"
          >
            <div className="my-auto max-h-[92dvh] w-full max-w-md overflow-y-auto overscroll-contain rounded-2xl border-2 border-yellow-400 bg-white p-4 shadow-2xl sm:p-5">
              <div className="mb-4 text-center">
                <Heart className="mx-auto mb-2 h-8 w-8 text-red-700" />

                <h3
                  id="rsvp-confirm-title"
                  className="break-words font-serif text-xl font-bold text-red-900"
                >
                  {isBn ? "আপনার তথ্য নিশ্চিত করুন" : "Confirm Your RSVP"}
                </h3>

                <p className="mt-1 text-sm leading-relaxed text-stone-600">
                  {isBn
                    ? "জমা দেওয়ার আগে আপনার দেওয়া তথ্যগুলি ভালোভাবে দেখে নিন।"
                    : "Please review your details carefully before submitting."}
                </p>
              </div>

              <div className="space-y-2 rounded-xl border border-yellow-300 bg-red-50 p-3 text-sm leading-relaxed text-red-950">
                <p className="break-words">
                  <strong>{isBn ? "নাম:" : "Name:"}</strong>{" "}
                  {pendingSubmission.guestName}
                </p>

                <p className="break-words">
                  <strong>{isBn ? "মোবাইল:" : "Mobile:"}</strong>{" "}
                  {pendingSubmission.contact}
                </p>

                <p className="break-words">
                  <strong>{isBn ? "উপস্থিতি:" : "Attendance:"}</strong>{" "}
                  {attendanceLabel(pendingSubmission.attending)}
                </p>

                {pendingSubmission.attending === "attending" && (
                  <>
                    <p>
                      <strong>{isBn ? "অতিথি সংখ্যা:" : "Guest count:"}</strong>{" "}
                      {pendingSubmission.guestCount}
                    </p>

                    <p className="break-words">
                      <strong>{isBn ? "অনুষ্ঠান:" : "Ceremonies:"}</strong>{" "}
                      {pendingSubmission.ceremonies
                        .map(ceremonyLabel)
                        .join(", ")}
                    </p>
                  </>
                )}

                <p className="break-words">
                  <strong>{isBn ? "খাবার:" : "Meal:"}</strong>{" "}
                  {mealLabel(pendingSubmission.mealPreference)}
                </p>

                {pendingSubmission.blessingMessage && (
                  <p className="break-words">
                    <strong>{isBn ? "শুভেচ্ছা:" : "Blessing:"}</strong>{" "}
                    {pendingSubmission.blessingMessage}
                  </p>
                )}
              </div>

              <p className="mt-3 text-center text-xs leading-relaxed text-stone-600">
                {isBn
                  ? "আপনি কি নিশ্চিত যে এই তথ্য জমা দিতে চান?"
                  : "Are these details correct and ready to submit?"}
              </p>

              <div className="mt-4 flex min-w-0 flex-col gap-2 sm:flex-row">
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => setPendingSubmission(null)}
                  className="w-full min-w-0 rounded-full border border-yellow-500 bg-white px-3 py-3 text-sm font-bold leading-relaxed text-red-900 disabled:opacity-50 sm:flex-1 sm:py-2.5"
                >
                  {isBn ? "ফিরে যান ও সম্পাদনা করুন" : "Go Back & Edit"}
                </button>

                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={confirmSubmission}
                  className="w-full min-w-0 rounded-full border-2 border-yellow-400 bg-red-800 px-3 py-3 text-sm font-bold leading-relaxed text-yellow-300 disabled:opacity-50 sm:flex-1 sm:py-2.5"
                >
                  {isSubmitting
                    ? isBn
                      ? "জমা হচ্ছে..."
                      : "Submitting..."
                    : isBn
                      ? "হ্যাঁ, নিশ্চিত করুন"
                      : "Yes, Confirm"}
                </button>
              </div>
            </div>
          </div>
        )}
      </RoyalFrame>
    </div>
  );
};
