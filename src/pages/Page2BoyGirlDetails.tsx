import React from 'react';
import { Heart, Home, GraduationCap, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { Language, WeddingSettings } from '../types';
import { KolkaOrnament, MandapDivider, RoyalFrame } from '../components/Ornaments';

interface Page2Props {
  settings: WeddingSettings;
  language: Language;
  onNextPage: () => void;
}

export const Page2BoyGirlDetails: React.FC<Page2Props> = ({
  settings,
  language,
  onNextPage,
}) => {
  const isBn = language === 'bn';

  return (
    <div className="w-full max-w-2xl mx-auto px-2.5 sm:px-4 py-4 pb-28 text-red-950">
      <RoyalFrame className="bg-white border-2 border-yellow-400">
        {/* Header Title */}
        <div className="text-center mb-4 sm:mb-6">
          <div className="flex justify-center items-center gap-2 mb-1 sm:mb-2">
            <KolkaOrnament className="w-5 sm:w-6 h-5 sm:h-6 text-yellow-500" />
            <span className="text-[10px] sm:text-xs font-serif font-bold text-red-800 tracking-widest uppercase">
              {isBn ? '॥ উভয় পরিবারের শুভ পরিচয় ॥' : '॥ Family Lineage & Introduction ॥'}
            </span>
            <KolkaOrnament className="w-5 sm:w-6 h-5 sm:h-6 text-yellow-500 -scale-x-100" />
          </div>

          <h2 className="text-2xl sm:text-4xl font-bold font-serif text-red-900">
            {isBn ? 'বর ও কনে পক্ষ' : 'The Bride & Groom'}
          </h2>
          <p className="text-xs sm:text-sm font-serif text-stone-600 mt-1 max-w-md mx-auto px-1">
            {isBn
              ? 'দুই পরিবারের ঐতিহ্য, সংস্কার ও স্নেহের চিরন্তন বন্ধন'
              : 'The sacred union of two loving souls and two esteemed families'}
          </p>
        </div>

        {/* Both Sides Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 my-3 sm:my-4">
          {/* 1. Groom's Side */}
          <div className="rounded-2xl p-3.5 sm:p-5 bg-red-50 border-2 border-yellow-400 shadow-sm relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-2.5 border-b border-yellow-400/50 mb-3">
                <span className="px-2.5 py-1 rounded-full bg-red-800 text-yellow-300 text-[11px] sm:text-xs font-serif font-bold shadow-sm">
                  {isBn ? 'বর পক্ষ (Groom)' : "Groom's Side"}
                </span>
                <span className="text-[11px] sm:text-xs text-red-800 font-serif font-semibold">
                  {isBn ? 'শাণ্ডিল্য গোত্র' : 'Gotra: Sandilya'}
                </span>
              </div>

              {/* Groom Photo & Name */}
              <div className="text-center mb-3">
                <div className="relative inline-block mx-auto mb-2">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-yellow-400 shadow p-0.5 bg-white">
                    <img
                      src={settings.groom.photoUrl}
                      alt={isBn ? settings.groom.nameBn : settings.groom.nameEn}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-red-800 text-yellow-300 border border-yellow-400 shadow">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl font-bold font-serif text-red-950">
                  {isBn ? settings.groom.nameBn : settings.groom.nameEn}
                </h3>

                <div className="flex items-center justify-center gap-1 text-[11px] sm:text-xs text-red-800 font-serif mt-0.5">
                  <GraduationCap className="w-3.5 h-3.5 text-red-700 shrink-0" />
                  <span className="line-clamp-1">{isBn ? settings.groom.subTitleBn : settings.groom.subTitleEn}</span>
                </div>
              </div>

              {/* Family Lineage Info */}
              <div className="space-y-2 text-[11px] sm:text-xs font-serif text-stone-800 bg-white p-3 rounded-xl border border-yellow-300">
                <div>
                  <span className="font-bold text-red-900 block">
                    {isBn ? 'পিতা ও মাতা:' : 'Parents:'}
                  </span>
                  <span>
                    {isBn ? settings.groom.fatherBn : settings.groom.fatherEn} ও{' '}
                    {isBn ? settings.groom.motherBn : settings.groom.motherEn}
                  </span>
                </div>

                <div>
                  <span className="font-bold text-red-900 block">
                    {isBn ? 'পিতামহ:' : 'Grandfather:'}
                  </span>
                  <span>{isBn ? settings.groom.grandfatherBn : settings.groom.grandfatherEn}</span>
                </div>

                <div className="flex items-start gap-1.5 pt-1 border-t border-stone-200">
                  <Home className="w-3.5 h-3.5 text-red-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-red-900">{isBn ? 'পৈতৃক নিবাস:' : 'Ancestral Residence:'}</span>{' '}
                    <span>{isBn ? settings.groom.addressBn : settings.groom.addressEn}</span>
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-2.5 text-[10px] sm:text-[11px] font-serif italic text-stone-600 text-center">
              “{isBn ? settings.groom.bioBn : settings.groom.bioEn}”
            </p>
          </div>

          {/* 2. Bride's Side */}
          <div className="rounded-2xl p-3.5 sm:p-5 bg-red-50 border-2 border-yellow-400 shadow-sm relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-2.5 border-b border-yellow-400/50 mb-3">
                <span className="px-2.5 py-1 rounded-full bg-red-800 text-yellow-300 text-[11px] sm:text-xs font-serif font-bold shadow-sm">
                  {isBn ? 'কনে পক্ষ (Bride)' : "Bride's Side"}
                </span>
                <span className="text-[11px] sm:text-xs text-red-800 font-serif font-semibold">
                  {isBn ? 'কাশ্যপ গোত্র' : 'Gotra: Kashyapa'}
                </span>
              </div>

              {/* Bride Photo & Name */}
              <div className="text-center mb-3">
                <div className="relative inline-block mx-auto mb-2">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-yellow-400 shadow p-0.5 bg-white">
                    <img
                      src={settings.bride.photoUrl}
                      alt={isBn ? settings.bride.nameBn : settings.bride.nameEn}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-red-800 text-yellow-300 border border-yellow-400 shadow">
                    <Heart className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl font-bold font-serif text-red-950">
                  {isBn ? settings.bride.nameBn : settings.bride.nameEn}
                </h3>

                <div className="flex items-center justify-center gap-1 text-[11px] sm:text-xs text-red-800 font-serif mt-0.5">
                  <GraduationCap className="w-3.5 h-3.5 text-red-700 shrink-0" />
                  <span className="line-clamp-1">{isBn ? settings.bride.subTitleBn : settings.bride.subTitleEn}</span>
                </div>
              </div>

              {/* Family Lineage Info */}
              <div className="space-y-2 text-[11px] sm:text-xs font-serif text-stone-800 bg-white p-3 rounded-xl border border-yellow-300">
                <div>
                  <span className="font-bold text-red-900 block">
                    {isBn ? 'পিতা ও মাতা:' : 'Parents:'}
                  </span>
                  <span>
                    {isBn ? settings.bride.fatherBn : settings.bride.fatherEn} ও{' '}
                    {isBn ? settings.bride.motherBn : settings.bride.motherEn}
                  </span>
                </div>

                <div>
                  <span className="font-bold text-red-900 block">
                    {isBn ? 'পিতামহ:' : 'Grandfather:'}
                  </span>
                  <span>{isBn ? settings.bride.grandfatherBn : settings.bride.grandfatherEn}</span>
                </div>

                <div className="flex items-start gap-1.5 pt-1 border-t border-stone-200">
                  <Home className="w-3.5 h-3.5 text-red-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-red-900">{isBn ? 'পৈতৃক নিবাস:' : 'Ancestral Residence:'}</span>{' '}
                    <span>{isBn ? settings.bride.addressBn : settings.bride.addressEn}</span>
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-2.5 text-[10px] sm:text-[11px] font-serif italic text-stone-600 text-center">
              “{isBn ? settings.bride.bioBn : settings.bride.bioEn}”
            </p>
          </div>
        </div>

        {/* Joint Family Blessing Note */}
        <div className="p-3 sm:p-4 rounded-xl bg-red-100/70 border border-yellow-400 text-center my-3 sm:my-4">
          <div className="flex items-center justify-center gap-1.5 text-xs font-serif font-bold text-red-800 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-yellow-500" />
            <span>{isBn ? 'উভয় পরিবারের একান্ত আবেদন' : 'Warm Invitation From Both Families'}</span>
            <Sparkles className="w-3.5 h-3.5 text-yellow-500" />
          </div>
          <p className="text-xs sm:text-sm font-serif text-stone-800 italic max-w-lg mx-auto">
            {isBn
              ? '“আমাদের সন্তানদ্বয়ের এই পবিত্র পরিণয়লগ্নে আপনাদের আশীর্বাদ, শুভকামনা ও স্নেহস্পর্শ কামনা করি। আপনারা সপরিবারে উপস্থিত হয়ে আমাদের গৃহ আলোকিত করুন।”'
              : '"We humbly seek your blessings for our children as they begin their sacred journey together. Please grace this auspicious occasion with your family."'}
          </p>
          <div className="text-xs font-serif font-bold text-red-900 mt-1.5">
            {isBn ? '— বিনীত: রায় ও মুখার্জী পরিবার' : '— With regards: Roy & Mukherjee Families'}
          </div>
        </div>

        <MandapDivider className="my-3 sm:my-4" />

        {/* Forward to Chapter Index */}
        <div className="flex justify-center mt-3 sm:mt-4">
          <button
            onClick={onNextPage}
            className="w-full sm:w-auto px-6 py-2.5 sm:py-3 rounded-full bg-red-800 hover:bg-red-700 text-yellow-300 font-serif font-bold text-xs sm:text-sm border-2 border-yellow-400 shadow active:scale-95 transition-all flex items-center justify-center gap-2 group"
          >
            <span>{isBn ? 'আমন্ত্রণের অন্যান্য অধ্যায় দেখুন (সূচিপত্র)' : 'Explore Invitation Chapters (Index)'}</span>
            <ArrowRight className="w-4 h-4 text-yellow-400 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </RoyalFrame>
    </div>
  );
};
