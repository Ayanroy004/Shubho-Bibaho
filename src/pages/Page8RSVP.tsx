import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  MailCheck,
  Send,
  Heart,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { Language, WeddingSettings, RSVPSubmission } from '../types';
import { sendRSVPToGoogleSheet } from '../utils/googleSheets';
import { KolkaOrnament, MandapDivider, RoyalFrame } from '../components/Ornaments';

interface Page8Props {
  settings: WeddingSettings;
  language: Language;
  rsvps: RSVPSubmission[];
  onAddRSVP: (rsvp: RSVPSubmission) => void;
  onNextPage: () => void;
  onGoToIndex: () => void;
}

export const Page8RSVP: React.FC<Page8Props> = ({
  settings,
  language,
  onAddRSVP,
  onNextPage,
  onGoToIndex,
}) => {
  const isBn = language === 'bn';

  // Form State
  const [guestName, setGuestName] = useState('');
  const [contact, setContact] = useState('');
  const [attending, setAttending] = useState<'attending' | 'not_attending' | 'tentative'>('attending');
  const [guestCount, setGuestCount] = useState<number>(2);
  const [selectedCeremonies, setSelectedCeremonies] = useState<string[]>(['bibaho', 'boubhat']);
  const [mealPreference, setMealPreference] = useState<'traditional_nonveg' | 'pure_veg' | 'jain_veg'>('traditional_nonveg');
  const [blessingMessage, setBlessingMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionFeedback, setSubmissionFeedback] = useState<{ status: 'success' | 'error'; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) return;

    setIsSubmitting(true);
    setSubmissionFeedback(null);

    const submission: RSVPSubmission = {
      id: `rsvp-${Date.now()}`,
      guestName: guestName.trim(),
      contact: contact.trim() || 'Not provided',
      attending,
      guestCount: attending === 'attending' ? guestCount : 0,
      ceremonies: selectedCeremonies,
      mealPreference,
      blessingMessage: blessingMessage.trim() || (isBn ? 'শুভ পরিণয়ে আন্তরিক শুভেচ্ছা ও আশীর্বাদ।' : 'Warmest congratulations!'),
      createdAt: new Date().toLocaleDateString(isBn ? 'bn-BD' : 'en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      syncedToGoogleSheet: false,
    };

    // Save to local state
    onAddRSVP(submission);

    // Sync to Google Sheet webhook if configured
    if (settings.googleSheetsWebhookUrl) {
      const syncSuccess = await sendRSVPToGoogleSheet(
        settings.googleSheetsWebhookUrl,
        submission
      );
      if (syncSuccess) {
        setSubmissionFeedback({
          status: 'success',
          message: isBn
            ? 'ধন্যবাদ! আপনার উপস্থিতি তথ্য সফলভাবে গ্রহণ করা হয়েছে।'
            : 'Thank you! Your RSVP has been recorded successfully.',
        });
      } else {
        setSubmissionFeedback({
          status: 'success',
          message: isBn
            ? 'ধন্যবাদ! আপনার উপস্থিতি তথ্য সংরক্ষিত হয়েছে।'
            : 'Thank you! Your RSVP has been saved.',
        });
      }
    } else {
      setSubmissionFeedback({
        status: 'success',
        message: isBn
          ? 'ধন্যবাদ! আপনার আন্তরিক উপস্থিতি ও শুভেচ্ছা গৃহীত হলো।'
          : 'Thank you! Your attendance details have been recorded.',
      });
    }

    setIsSubmitting(false);

    // Festive confetti
    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#facc15', '#dc2626', '#ffffff'],
      });
    } catch {
      // ignore
    }

    // Reset form fields
    setGuestName('');
    setContact('');
    setBlessingMessage('');
  };

  const toggleCeremony = (id: string) => {
    if (selectedCeremonies.includes(id)) {
      setSelectedCeremonies(selectedCeremonies.filter(c => c !== id));
    } else {
      setSelectedCeremonies([...selectedCeremonies, id]);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-2.5 sm:px-4 py-4 pb-28 text-red-950">
      <RoyalFrame className="bg-white border-2 border-yellow-400">
        {/* Header */}
        <div className="text-center mb-4 sm:mb-6">
          <div className="flex justify-center items-center gap-2 mb-1 sm:mb-2">
            <KolkaOrnament className="w-5 sm:w-6 h-5 sm:h-6 text-yellow-500" />
            <span className="text-[10px] sm:text-xs font-serif font-bold text-red-800 tracking-widest uppercase">
              {isBn ? '॥ অধ্যায় ৫: উপস্থিতি নিশ্চিতকরণ ॥' : '॥ Chapter 5: Confirm Attendance ॥'}
            </span>
            <KolkaOrnament className="w-5 sm:w-6 h-5 sm:h-6 text-yellow-500 -scale-x-100" />
          </div>

          <h2 className="text-2xl sm:text-4xl font-bold font-serif text-red-900">
            {isBn ? 'উপস্থিতি নিশ্চিত করুন (RSVP)' : 'Confirm Your Attendance (RSVP)'}
          </h2>
          <p className="text-xs sm:text-sm font-serif text-stone-600 mt-1 max-w-md mx-auto px-1">
            {isBn
              ? 'আপনার উপস্থিতি ও আশীর্বাদ আমাদের এই শুভযাত্রার শ্রেষ্ঠ উপহার'
              : 'Your presence & blessings grace our sacred wedding celebration'}
          </p>
        </div>

        {/* RSVP Form */}
        <form onSubmit={handleSubmit} className="rounded-2xl p-3.5 sm:p-5 bg-red-50 border-2 border-yellow-400 shadow-sm space-y-3.5">
          <div className="flex items-center gap-2 pb-2 border-b border-yellow-400/40 text-red-900 font-serif font-bold text-sm sm:text-base">
            <MailCheck className="w-4 sm:w-5 h-4 sm:h-5 text-red-700" />
            <span>{isBn ? 'আমন্ত্রণ ও উপস্থিতি পত্র পূরণ করুন' : 'Please Fill Attendance Details'}</span>
          </div>

          {/* Guest Name & Contact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
            <div>
              <label className="block text-xs font-serif font-bold text-stone-800 mb-1">
                {isBn ? 'আপনার শুভ নাম *' : 'Your Full Name *'}
              </label>
              <input
                type="text"
                required
                placeholder={isBn ? 'যেমন: শ্রী সুব্রত রায়' : 'e.g. Subrata Roy'}
                value={guestName}
                onChange={e => setGuestName(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-yellow-400 bg-white focus:outline-none focus:ring-1 focus:ring-red-800"
              />
            </div>

            <div>
              <label className="block text-xs font-serif font-bold text-stone-800 mb-1">
                {isBn ? 'মোবাইল নম্বর / হোয়াটসঅ্যাপ' : 'Phone / WhatsApp'}
              </label>
              <input
                type="text"
                placeholder={isBn ? '+৯১ ৯৮৭৬৫ ৪৩২১০' : '+91 98765 43210'}
                value={contact}
                onChange={e => setContact(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-yellow-400 bg-white focus:outline-none focus:ring-1 focus:ring-red-800"
              />
            </div>
          </div>

          {/* Attendance Radio Pills */}
          <div>
            <label className="block text-xs font-serif font-bold text-stone-800 mb-1.5">
              {isBn ? 'আপনি কি বিবাহ অনুষ্ঠানে উপস্থিত থাকছেন?' : 'Will you be attending the wedding?'}
            </label>
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
              {[
                {
                  id: 'attending',
                  bn: '✓ অবশ্যই উপস্থিত থাকব',
                  en: '✓ Joyfully Attending',
                },
                {
                  id: 'not_attending',
                  bn: '✗ দুঃখিত, পারছি না',
                  en: '✗ Regretfully Decline',
                },
                {
                  id: 'tentative',
                  bn: '? এখনো অনিশ্চিত',
                  en: '? Tentative',
                },
              ].map(opt => (
                <button
                  type="button"
                  key={opt.id}
                  onClick={() => setAttending(opt.id as typeof attending)}
                  className={`py-2 px-1 text-center rounded-xl text-xs font-serif font-bold transition-all border ${
                    attending === opt.id
                      ? 'bg-red-800 text-yellow-300 border-yellow-400 shadow'
                      : 'bg-white text-stone-700 hover:bg-red-100/50 border-yellow-300'
                  }`}
                >
                  {isBn ? opt.bn : opt.en}
                </button>
              ))}
            </div>
          </div>

          {/* Guest Count (if attending) */}
          {attending === 'attending' && (
            <div className="p-3 rounded-xl bg-white border border-yellow-300">
              <label className="block text-xs font-serif font-bold text-red-900 mb-1.5">
                {isBn ? 'আপনার সাথে মোট কয়জন উপস্থিত থাকবেন?' : 'How many guests will be attending?'}
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map(num => (
                  <button
                    type="button"
                    key={num}
                    onClick={() => setGuestCount(num)}
                    className={`w-9 h-9 rounded-full text-xs font-bold font-mono transition-all ${
                      guestCount === num
                        ? 'bg-red-800 text-yellow-300 border-2 border-yellow-400 shadow'
                        : 'bg-red-50 text-red-900 border border-yellow-300 hover:bg-red-100'
                    }`}
                  >
                    {num}
                  </button>
                ))}
                <span className="text-xs font-serif text-stone-600 ml-1">
                  {isBn ? `${guestCount} জন অতিথি` : `${guestCount} Guest(s)`}
                </span>
              </div>
            </div>
          )}

          {/* Bengali Feast / Meal Preference */}
          <div>
            <label className="block text-xs font-serif font-bold text-stone-800 mb-1.5">
              {isBn ? 'আপনার ভোজের পছন্দ (Bengali Feast Preference):' : 'Dining / Meal Preference:'}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 sm:gap-2">
              {[
                {
                  id: 'traditional_nonveg',
                  bn: 'মাছ-মাংস সহযোগে সনাতন ভোজ',
                  en: 'Traditional Non-Veg Feast',
                },
                {
                  id: 'pure_veg',
                  bn: 'খাঁটি নিরামিষ ভোজ',
                  en: 'Pure Vegetarian',
                },
                {
                  id: 'jain_veg',
                  bn: 'জৈন নিরামিষ ভোজ',
                  en: 'Jain Vegetarian',
                },
              ].map(meal => (
                <button
                  type="button"
                  key={meal.id}
                  onClick={() => setMealPreference(meal.id as typeof mealPreference)}
                  className={`p-2 text-left rounded-xl text-xs font-serif transition-all border ${
                    mealPreference === meal.id
                      ? 'bg-red-800 text-yellow-300 border-yellow-400 font-bold shadow'
                      : 'bg-white text-stone-700 hover:bg-red-100/50 border-yellow-300'
                  }`}
                >
                  {isBn ? meal.bn : meal.en}
                </button>
              ))}
            </div>
          </div>

          {/* Ceremonies Attending */}
          {attending === 'attending' && (
            <div>
              <label className="block text-xs font-serif font-bold text-stone-800 mb-1.5">
                {isBn ? 'কোন কোন অনুষ্ঠানে উপস্থিত থাকবেন?' : 'Which events will you grace?'}
              </label>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {[
                  { id: 'holud', bn: 'গায়ে হলুদ', en: 'Gaye Holud' },
                  { id: 'bibaho', bn: 'শুভ বিবাহ', en: 'Wedding Ceremony' },
                  { id: 'boubhat', bn: 'প্রীতিভোজ', en: 'Grand Reception' },
                ].map(c => {
                  const isChecked = selectedCeremonies.includes(c.id);
                  return (
                    <button
                      type="button"
                      key={c.id}
                      onClick={() => toggleCeremony(c.id)}
                      className={`px-3 py-1.5 rounded-full text-xs font-serif transition-all border ${
                        isChecked
                          ? 'bg-yellow-400 text-red-950 border-yellow-500 font-bold shadow-sm'
                          : 'bg-white text-stone-700 border-yellow-300'
                      }`}
                    >
                      {isChecked ? '✓ ' : '+ '}
                      {isBn ? c.bn : c.en}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Blessing Message */}
          <div>
            <label className="block text-xs font-serif font-bold text-stone-800 mb-1">
              {isBn
                ? 'নবদম্পতির উদ্দেশ্যে আপনার স্নেহাশিস ও শুভেচ্ছা বার্তা:'
                : 'Warm Wishes & Blessings for the Couple:'}
            </label>
            <textarea
              rows={3}
              placeholder={
                isBn
                  ? 'নবদম্পতির আগামী দিনগুলি অনাবিল আনন্দে ভরে উঠুক...'
                  : 'Wishing you both eternal joy, harmony, and togetherness...'
              }
              value={blessingMessage}
              onChange={e => setBlessingMessage(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-yellow-400 bg-white focus:outline-none focus:ring-1 focus:ring-red-800"
            />
          </div>

          {/* Feedback Banner */}
          {submissionFeedback && (
            <div className="p-2.5 rounded-xl bg-yellow-100 border border-yellow-400 text-red-950 text-xs font-serif flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-red-700 shrink-0" />
              <span>{submissionFeedback.message}</span>
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-1">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 sm:py-3 rounded-full bg-red-800 hover:bg-red-700 text-yellow-300 font-serif font-bold text-xs sm:text-sm border-2 border-yellow-400 shadow active:scale-98 transition-all flex items-center justify-center gap-1.5"
            >
              {isSubmitting ? (
                <span>{isBn ? 'পাঠানো হচ্ছে...' : 'Submitting...'}</span>
              ) : (
                <>
                  <Send className="w-4 h-4 text-yellow-400" />
                  <span>
                    {isBn ? 'উপস্থিতি নিশ্চিত করুন' : 'Confirm Attendance'}
                  </span>
                </>
              )}
            </button>
          </div>
        </form>

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
            <span>{isBn ? 'পরবর্তী: ঐতিহ্যবাহী নিমন্ত্রণ লিপি' : 'Next: Traditional Formal Letter'}</span>
            <ArrowRight className="w-3.5 h-3.5 text-yellow-400 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </RoyalFrame>
    </div>
  );
};
