import React from 'react';
import { X, Calendar, Users, Layers, BookOpen, Clock, Camera, MapPin, MailCheck, Scroll, Mail } from 'lucide-react';
import { Language } from '../types';

interface PageSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: number;
  onSelectPage: (page: number) => void;
  onSelectEnvelope: () => void;
  language: Language;
}

export const PageSelectModal: React.FC<PageSelectModalProps> = ({
  isOpen,
  onClose,
  currentPage,
  onSelectPage,
  onSelectEnvelope,
  language,
}) => {
  const isBn = language === 'bn';
  if (!isOpen) return null;

  const pages = [
    { num: 1, titleBn: '১. শুভ বিবাহ ও দিনক্ষণ', titleEn: '1. Wedding Date & Countdown', icon: Calendar },
    { num: 2, titleBn: '২. বর ও কনে এবং উভয় পরিবার', titleEn: "2. Bride & Groom's Family", icon: Users },
    { num: 3, titleBn: '৩. আমন্ত্রণের অধ্যায়সমূহ (সূচিপত্র)', titleEn: '3. All Chapters (Main Index)', icon: Layers },
    { num: 4, titleBn: '৪. আমাদের গল্প ও পরিবার পর্ব', titleEn: '4. Our Story & Family Journey', icon: BookOpen },
    { num: 5, titleBn: '৫. স্মারক লিপি (অনুষ্ঠান সূচী)', titleEn: '5. Ceremony Timeline', icon: Clock },
    { num: 6, titleBn: '৬. আমাদের কিছু মুহূর্ত (ফটো গ্যালারি)', titleEn: '6. Cherished Moments (Gallery)', icon: Camera },
    { num: 7, titleBn: '৭. বিবাহ বাসর ও অবস্থান', titleEn: '7. Venue & Live Route Map', icon: MapPin },
    { num: 8, titleBn: '৮. উপস্থিতি নিশ্চিত করুন (RSVP)', titleEn: '8. Confirm Attendance (RSVP)', icon: MailCheck },
    { num: 9, titleBn: '৯. ঐতিহ্যবাহী নিমন্ত্রণ লিপি', titleEn: '9. Traditional Formal Letter', icon: Scroll },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-sm sm:max-w-md bg-white border-2 border-yellow-400 rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-2xl relative text-red-950">
        {/* Header */}
        <div className="flex items-center justify-between pb-2.5 border-b border-yellow-400/40 mb-2.5">
          <div>
            <h3 className="text-base sm:text-lg font-bold font-serif text-red-900">
              {isBn ? 'আমন্ত্রণ পত্রের পাতা নির্বাচন' : 'Jump to Any Chapter'}
            </h3>
            <p className="text-[11px] text-stone-600 font-serif">
              {isBn ? 'যে কোনো পাতায় সরাসরি যেতে ট্যাপ করুন' : 'Tap any page to open directly'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-100 text-stone-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Envelope Quick Option */}
        <div className="mb-2.5">
          <button
            onClick={() => {
              onSelectEnvelope();
              onClose();
            }}
            className="w-full p-2.5 rounded-xl bg-red-900 hover:bg-red-800 text-yellow-300 text-xs font-serif font-bold flex items-center justify-between border border-yellow-400 shadow-sm transition-all"
          >
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-yellow-400" />
              <span>{isBn ? '✉️ মূল খাম ও এনিমেশন দেখুন' : '✉️ View Animated Envelope'}</span>
            </div>
            <span className="text-yellow-400">›</span>
          </button>
        </div>

        {/* List of Pages */}
        <div className="space-y-1 max-h-[55vh] overflow-y-auto pr-1">
          {pages.map(p => {
            const Icon = p.icon;
            const isActive = currentPage === p.num;
            return (
              <button
                key={p.num}
                onClick={() => {
                  onSelectPage(p.num);
                  onClose();
                }}
                className={`w-full text-left p-2 rounded-xl text-xs sm:text-sm font-serif transition-all flex items-center justify-between ${
                  isActive
                    ? 'bg-red-800 text-yellow-300 font-bold border border-yellow-400 shadow'
                    : 'hover:bg-red-50 text-stone-900 border border-stone-200'
                }`}
              >
                <div className="flex items-center gap-2 truncate pr-1">
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-yellow-400' : 'text-red-700'}`} />
                  <span className="truncate">{isBn ? p.titleBn : p.titleEn}</span>
                </div>
                {isActive && <span className="text-xs text-yellow-400 font-bold shrink-0">সক্রিয় ✓</span>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
