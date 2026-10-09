import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { Language } from '../types';

interface BottomNavBarProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  language: Language;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  language,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isBn = language === 'bn';

  // Bengali numerals converter
  const toBnNum = (n: number) => {
    if (!isBn) return String(n);
    const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return String(n)
      .split('')
      .map(d => bnDigits[parseInt(d, 10)] || d)
      .join('');
  };

  const pageNames = [
    { num: 1, titleBn: '১. শুভ বিবাহ ও শুভ দিনক্ষণ', titleEn: '1. Wedding Date & Countdown' },
    { num: 2, titleBn: '২. বর ও কনে এবং পরিবার', titleEn: "2. Bride & Groom's Family" },
    { num: 3, titleBn: '৩. আমন্ত্রণের অধ্যায়সমূহ', titleEn: '3. Chapters & Index' },
    { num: 4, titleBn: '৪. আমাদের গল্প ও পথচলা', titleEn: '4. Our Story & Journey' },
    { num: 5, titleBn: '৫. স্মারক লিপি (অনুষ্ঠান সূচী)', titleEn: '5. Ceremony Timeline' },
    { num: 6, titleBn: '৬. ফটো গ্যালারি (স্মৃতি)', titleEn: '6. Photo Gallery' },
    { num: 7, titleBn: '৭. বিবাহ বাসর ও অবস্থান', titleEn: '7. Venue & Live Map' },
    { num: 8, titleBn: '৮. উপস্থিতি নিশ্চিত (RSVP)', titleEn: '8. Guest RSVP & Guestbook' },
    { num: 9, titleBn: '৯. ঐতিহ্যবাহী নিমন্ত্রণ লিপি', titleEn: '9. Traditional Letter' },
  ];

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed bottom-3 left-0 right-0 z-40 flex justify-center px-2 pointer-events-none">
      <div className="relative pointer-events-auto shadow-[0_10px_30px_rgba(0,0,0,0.6)] rounded-full max-w-[96vw]">
        {/* Dropdown Popup */}
        {dropdownOpen && (
          <div
            ref={dropdownRef}
            className="absolute bottom-14 left-1/2 -translate-x-1/2 w-64 sm:w-72 max-w-[calc(100vw-1.5rem)] bg-red-950 border-2 border-yellow-400 rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150 max-h-72 overflow-y-auto"
          >
            <div className="px-3 py-1.5 border-b border-yellow-400/40 text-xs font-serif text-yellow-300 font-bold text-center">
              {isBn ? 'যে কোনো পাতায় সরাসরি যান' : 'Jump to Any Page'}
            </div>
            <div className="flex flex-col gap-1 mt-1">
              {pageNames.map(p => {
                const isActive = currentPage === p.num;
                return (
                  <button
                    key={p.num}
                    onClick={() => {
                      onPageChange(p.num);
                      setDropdownOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs sm:text-sm font-serif transition-colors flex items-center justify-between ${
                      isActive
                        ? 'bg-yellow-400 text-red-950 font-bold shadow'
                        : 'text-white hover:bg-red-900'
                    }`}
                  >
                    <span className="truncate pr-1">{isBn ? p.titleBn : p.titleEn}</span>
                    {isActive && <span className="text-xs text-red-950 font-bold">✓</span>}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Main Pill Bar */}
        <div className="flex items-center gap-1 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-red-950 border-2 border-yellow-400 text-yellow-300 text-xs sm:text-sm font-serif shadow-inner">
          {/* Previous Button */}
          <button
            onClick={handlePrev}
            disabled={currentPage <= 1}
            className={`flex items-center gap-0.5 sm:gap-1 px-2 py-1 rounded-full transition-all ${
              currentPage <= 1
                ? 'opacity-30 cursor-not-allowed text-stone-400'
                : 'hover:bg-red-900 active:scale-95 text-yellow-300'
            }`}
          >
            <ChevronLeft className="w-4 h-4 text-yellow-400" />
            <span className="font-bold">{isBn ? 'পূর্ববর্তী' : 'Prev'}</span>
          </button>

          {/* Page Dropdown Trigger */}
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-red-900 border border-yellow-400 hover:border-yellow-200 transition-all text-yellow-300 text-xs font-bold shadow-sm"
          >
            <span>
              {isBn
                ? `পাতা ${toBnNum(currentPage)} / ${toBnNum(totalPages)}`
                : `Page ${currentPage} / ${totalPages}`}
            </span>
            <ChevronDown
              className={`w-3.5 h-3.5 text-yellow-400 transition-transform duration-200 ${
                dropdownOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {/* Next Button */}
          <button
            onClick={handleNext}
            disabled={currentPage >= totalPages}
            className={`flex items-center gap-0.5 sm:gap-1 px-2 py-1 rounded-full transition-all ${
              currentPage >= totalPages
                ? 'opacity-30 cursor-not-allowed text-stone-400'
                : 'hover:bg-red-900 active:scale-95 text-yellow-300'
            }`}
          >
            <span className="font-bold">{isBn ? 'পরবর্তী' : 'Next'}</span>
            <ChevronRight className="w-4 h-4 text-yellow-400" />
          </button>
        </div>
      </div>
    </nav>
  );
};
