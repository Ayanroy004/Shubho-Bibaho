import React, { useState } from 'react';
import { Camera, Heart, ArrowRight, X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { Language, WeddingPhoto } from '../types';
import { galleryPhotos } from '../weddingData';
import { KolkaOrnament, MandapDivider, RoyalFrame } from '../components/Ornaments';

interface Page6Props {
  language: Language;
  onNextPage: () => void;
  onGoToIndex: () => void;
}

export const Page6Gallery: React.FC<Page6Props> = ({
  language,
  onNextPage,
  onGoToIndex,
}) => {
  const isBn = language === 'bn';
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  const categories = [
    { id: 'all', labelBn: 'সকল ছবি', labelEn: 'All Photos' },
    { id: 'prewedding', labelBn: 'প্রণয় মুহূর্ত', labelEn: 'Pre-Wedding' },
    { id: 'candid', labelBn: 'অকপট হাসি', labelEn: 'Candid' },
    { id: 'family', labelBn: 'পারিবারিক স্নেহ', labelEn: 'Family' },
    { id: 'ceremony', labelBn: 'মাঙ্গলিক উৎসব', labelEn: 'Ceremonies' },
  ];

  const filteredPhotos = selectedCategory === 'all'
    ? galleryPhotos
    : galleryPhotos.filter(p => p.category === selectedCategory);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((activePhotoIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((activePhotoIndex + 1) % filteredPhotos.length);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-2.5 sm:px-4 py-4 pb-28 text-red-950">
      <RoyalFrame className="bg-white border-2 border-yellow-400">
        {/* Header */}
        <div className="text-center mb-5 sm:mb-6">
          <div className="flex justify-center items-center gap-2 mb-1 sm:mb-2">
            <KolkaOrnament className="w-5 sm:w-6 h-5 sm:h-6 text-yellow-500" />
            <span className="text-[10px] sm:text-xs font-serif font-bold text-red-800 tracking-widest uppercase">
              {isBn ? '॥ অধ্যায় ৩: অ্যালবাম ও স্মৃতিমালা ॥' : '॥ Chapter 3: Gallery of Memories ॥'}
            </span>
            <KolkaOrnament className="w-5 sm:w-6 h-5 sm:h-6 text-yellow-500 -scale-x-100" />
          </div>

          <h2 className="text-2xl sm:text-4xl font-bold font-serif text-red-900">
            {isBn ? 'আমাদের কিছু মধুর মুহূর্ত' : 'Cherished Moments & Memories'}
          </h2>
          <p className="text-xs sm:text-sm font-serif text-stone-600 mt-1 max-w-md mx-auto px-1">
            {isBn
              ? 'ভালোবাসা, হাসি ও দুই পরিবারের মিলনের কিছু রঙিন স্মৃতিকথা'
              : 'Glimpses of heartfelt laughter, pre-wedding warmth, and family bliss'}
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-5">
          {categories.map(cat => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setActivePhotoIndex(null);
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-serif font-bold transition-all ${
                  isActive
                    ? 'bg-red-800 text-yellow-300 border border-yellow-400 shadow-sm'
                    : 'bg-red-50 hover:bg-red-100 text-stone-700 border border-yellow-200'
                }`}
              >
                {isBn ? cat.labelBn : cat.labelEn}
              </button>
            );
          })}
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3.5 mb-6">
          {filteredPhotos.map((photo: WeddingPhoto, index: number) => (
            <div
              key={photo.id}
              onClick={() => setActivePhotoIndex(index)}
              className="group relative aspect-square rounded-xl overflow-hidden border-2 border-yellow-300 shadow-sm cursor-pointer bg-red-950 transition-all hover:scale-[1.02] hover:shadow-md"
            >
              <img
                src={photo.url}
                alt={isBn ? photo.titleBn : photo.titleEn}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-red-950/90 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity flex items-end p-2 sm:p-2.5">
                <div className="w-full">
                  <p className="text-yellow-200 text-[11px] sm:text-xs font-serif font-bold line-clamp-1 drop-shadow">
                    {isBn ? photo.titleBn : photo.titleEn}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <MandapDivider className="my-5" />

        {/* Warm Blessing Footer Box */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-amber-50/70 border border-yellow-300 text-center mb-4">
          <div className="flex items-center justify-center gap-1.5 text-xs font-serif font-bold text-red-900 mb-1">
            <Heart className="w-3.5 h-3.5 fill-red-800 text-red-800" />
            <span>{isBn ? 'ছবিতে ধরে রাখা ভালোবাসার মুহূর্ত' : 'Memories Captured in Love'}</span>
          </div>
          <p className="text-[11px] sm:text-xs font-serif text-stone-700 italic max-w-md mx-auto">
            {isBn
              ? '“প্রতিটি ছবির পেছনে আছে হাসি, আনন্দ এবং অনন্ত পথচলার মিষ্টি অঙ্গীকার।”'
              : '“Behind every photograph lies a story of warmth, unspoken promises, and joy that lasts a lifetime.”'}
          </p>
        </div>

        {/* Navigation Footers */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 mt-4">
          <button
            onClick={onGoToIndex}
            className="w-full sm:w-auto px-4 py-2.5 rounded-full bg-red-50 hover:bg-red-100 text-red-900 text-xs sm:text-sm font-serif font-bold border border-yellow-400 transition-colors"
          >
            {isBn ? '‹ সূচিপত্রে ফিরুন' : '‹ Back to Chapters'}
          </button>

          <button
            onClick={onNextPage}
            className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-red-800 hover:bg-red-700 text-yellow-300 text-xs sm:text-sm font-serif font-bold border-2 border-yellow-400 shadow flex items-center justify-center gap-1.5 group transition-all"
          >
            <span>{isBn ? 'পরবর্তী: বিবাহ বাসর ও অবস্থান' : 'Next: Venue & Location'}</span>
            <ArrowRight className="w-3.5 h-3.5 text-yellow-400 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </RoyalFrame>

      {/* Lightbox Modal */}
      {activePhotoIndex !== null && filteredPhotos[activePhotoIndex] && (
        <div
          onClick={() => setActivePhotoIndex(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-sm animate-in fade-in"
        >
          <div
            onClick={e => e.stopPropagation()}
            className="relative max-w-3xl w-full bg-red-950 border-2 border-yellow-400 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between p-3 border-b border-yellow-400/30 bg-red-950">
              <span className="text-yellow-300 text-xs sm:text-sm font-serif font-bold">
                {isBn ? filteredPhotos[activePhotoIndex].titleBn : filteredPhotos[activePhotoIndex].titleEn}
              </span>
              <button
                onClick={() => setActivePhotoIndex(null)}
                className="p-1 rounded-full text-yellow-300 hover:bg-red-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Photo Container with navigation arrows */}
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] bg-black flex items-center justify-center overflow-hidden">
              <img
                src={filteredPhotos[activePhotoIndex].url}
                alt={isBn ? filteredPhotos[activePhotoIndex].titleBn : filteredPhotos[activePhotoIndex].titleEn}
                className="max-h-full max-w-full object-contain"
              />

              {filteredPhotos.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-red-950/80 border border-yellow-400 text-yellow-300 hover:bg-red-900 transition-colors shadow"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-red-950/80 border border-yellow-400 text-yellow-300 hover:bg-red-900 transition-colors shadow"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Bottom Caption */}
            <div className="p-2.5 text-center bg-red-950 text-[11px] sm:text-xs text-yellow-100 font-serif">
              <span>{activePhotoIndex + 1} / {filteredPhotos.length}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
