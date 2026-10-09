import React from 'react';
import { Heart, Sparkles, BookOpen, Music, Compass, Coffee, Users, ArrowRight, Quote } from 'lucide-react';
import { Language, WeddingSettings } from '../types';
import { initialWeddingSettings } from '../weddingData';
import { KolkaOrnament, MandapDivider, RoyalFrame } from '../components/Ornaments';

interface Page4Props {
  settings?: WeddingSettings;
  language: Language;
  onNextPage: () => void;
  onGoToIndex: () => void;
}

export const Page4Story: React.FC<Page4Props> = ({
  settings = initialWeddingSettings,
  language,
  onNextPage,
  onGoToIndex,
}) => {
  const isBn = language === 'bn';

  const groomName = isBn ? settings.groom.nameBn : settings.groom.nameEn;
  const brideName = isBn ? settings.bride.nameBn : settings.bride.nameEn;

  return (
    <div className="w-full max-w-2xl mx-auto px-2.5 sm:px-4 py-4 pb-28 text-red-950">
      <RoyalFrame className="bg-white border-2 border-yellow-400">
        {/* Header */}
        <div className="text-center mb-5 sm:mb-7">
          <div className="flex justify-center items-center gap-2 mb-1 sm:mb-2">
            <KolkaOrnament className="w-5 sm:w-6 h-5 sm:h-6 text-yellow-500" />
            <span className="text-[10px] sm:text-xs font-serif font-bold text-red-800 tracking-widest uppercase">
              {isBn ? '॥ অধ্যায় ১: আমাদের প্রণয়গাথা ও আত্মীয়তা ॥' : '॥ Chapter 1: Our Story & Family Bond ॥'}
            </span>
            <KolkaOrnament className="w-5 sm:w-6 h-5 sm:h-6 text-yellow-500 -scale-x-100" />
          </div>

          <h2 className="text-2xl sm:text-4xl font-bold font-serif text-red-900">
            {isBn ? 'আমাদের গল্প ও পরিবার পর্ব' : 'Our Story & Family Journey'}
          </h2>
          <p className="text-xs sm:text-sm font-serif text-stone-600 mt-1 max-w-lg mx-auto px-2">
            {isBn
              ? `${groomName} ও ${brideName}-এর ভালোবাসার রূপকথা এবং দুই পরিবারের স্নেহের মেলবন্ধন`
              : `The story of how ${groomName} & ${brideName} found each other, and two loving families came together`}
          </p>
        </div>

        {/* Featured Story Portrait & Opening Quote */}
        <div className="rounded-2xl overflow-hidden border-2 border-yellow-400 shadow-sm mb-6 bg-red-50">
          <div className="relative aspect-[16/9] w-full overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80"
              alt={`${groomName} & ${brideName}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-red-950/90 via-red-950/30 to-transparent flex items-end p-4 sm:p-5">
              <div className="text-white">
                <div className="flex items-center gap-1.5 text-yellow-300 text-xs font-serif mb-1">
                  <Heart className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{isBn ? 'চিরন্তন ভালোবাসার মেলবন্ধন' : 'A Bond For A Lifetime'}</span>
                </div>
                <p className="text-sm sm:text-base font-serif italic font-medium drop-shadow text-yellow-50">
                  {isBn
                    ? '“তোমায় দেখেছি আমি শত সাধনায়, শত বরষের চাওয়া...”'
                    : '“In your smile, I see something more beautiful than the stars.”'}
                </p>
              </div>
            </div>
          </div>

          {/* Story Narrative Section 1: How We Met */}
          <div className="p-4 sm:p-6 text-xs sm:text-sm font-serif text-stone-800 leading-relaxed space-y-3">
            <div className="flex items-center gap-2 text-red-900 font-bold text-sm sm:text-base border-b border-yellow-200 pb-1.5">
              <BookOpen className="w-4 h-4 text-yellow-600" />
              <h3>{isBn ? 'পরিচয় ও বন্ধুত্বের মধুর সূচনা' : 'The First Encounter & Blossoming Friendship'}</h3>
            </div>
            <p>
              {isBn
                ? `কলকাতার কলেজ স্ট্রিট কফি হাউসের কোলাহলপূর্ণ কোণে এবং আন্তর্জাতিক বইমেলার সাহিত্য আড্ডায় আমাদের প্রথম দেখা। বইয়ের গন্ধ, গরম কফির কাপ আর সাহিত্যের গভীরে ডুবে যাওয়া ঘণ্টার পর ঘণ্টা আলোচনার মাঝে গড়ে উঠেছিল এক অনাবিল সখ্যতা।`
                : `Our story began amidst the charming chaos of Kolkata’s legendary College Street coffee house and the quiet literary aisles of the International Book Fair. What started as an unexpected conversation about favorite books, art, and poetry quickly turned into hours of effortless laughter and shared perspectives.`}
            </p>
            <p>
              {isBn
                ? `সময়ের সাথে সাথে সেই সুন্দর বন্ধুত্ব রূপান্তরিত হলো গভীর শ্রদ্ধাবোধ ও ভালোবাসায়। জীবনের প্রতিটি পদক্ষেপে পরস্পরের পাশে থাকার নীরব প্রতিশ্রুতি যেন নিঃশব্দেই হৃদয় ছুঁয়ে গিয়েছিল।`
                : `With each passing season, that genuine friendship blossomed into something deeper—anchored in unwavering trust, mutual respect, and a profound appreciation for each other’s hopes and dreams.`}
            </p>
          </div>
        </div>

        {/* Story Narrative Section 2: The Heartfelt Promise */}
        <div className="rounded-2xl p-4 sm:p-6 bg-amber-50/70 border border-yellow-400 shadow-sm mb-6 font-serif">
          <div className="flex items-center gap-2 text-red-900 font-bold text-sm sm:text-base border-b border-yellow-300 pb-1.5 mb-3">
            <Sparkles className="w-4 h-4 text-yellow-600" />
            <h3>{isBn ? 'হৃদয়ের অঙ্গীকার ও প্রতিশ্রুতি' : 'A Mountain Promise & The Vow of Forever'}</h3>
          </div>
          <p className="text-xs sm:text-sm text-stone-800 leading-relaxed">
            {isBn
              ? `কুয়াশাচ্ছন্ন দার্জিলিংয়ের কাঞ্চনজঙ্ঘার সোনালী সূর্যোদয়ে, পাইন বনের শীতল বাতাসে যখন চারিদিক নিস্তব্ধ, তখন আন্তরিকতার সেই চিরন্তন মুহূর্তটি এলো। চোখের ভাষায় ও হৃদয়ের আবেগে দেওয়া হলো জীবনের শেষ নিঃশ্বাস পর্যন্ত একসঙ্গে চলার পবিত্র অঙ্গীকার।`
              : `Amidst the tranquil misty mornings of Darjeeling, beneath the golden glow of the Kanchenjunga sunrise, came the heartfelt question that changed everything. Hand in hand, surrounded by the crisp mountain breeze, they promised to walk through life’s wonders and challenges as one.`}
          </p>
        </div>

        <MandapDivider className="my-5" />

        {/* Section 3: Two Families Journey & Heritage */}
        <div className="mb-6 font-serif">
          <div className="text-center mb-4">
            <div className="flex items-center justify-center gap-1.5 text-red-900 font-bold text-base sm:text-lg">
              <Users className="w-4 sm:w-5 h-4 sm:h-5 text-yellow-600" />
              <h3>{isBn ? 'দুই পরিবারের আত্মীয়তা ও স্নেহবন্ধন' : 'Two Families United in Love & Tradition'}</h3>
            </div>
            <p className="text-xs text-stone-600 mt-1 max-w-md mx-auto">
              {isBn
                ? 'বিবাহ কেবল দুটি মানুষের মিলন নয়, দুটি পরিবারের ঐতিহ্য ও ভালোবাসার মেলবন্ধন'
                : 'A sacred union celebrating the shared values, warmth, and blessings of both families'}
            </p>
          </div>

          {/* Two Family Cards Side-by-Side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Groom's Family Card */}
            <div className="rounded-2xl p-4 bg-red-50/80 border border-yellow-300 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-yellow-200 pb-2 mb-2.5">
                  <span className="font-bold text-xs sm:text-sm text-red-900">
                    {isBn ? 'বরের পরিবার: রায় পরিবার' : "Groom's Family: The Roy Family"}
                  </span>
                  <span className="text-[10px] text-stone-500 italic">
                    {isBn ? 'উত্তরপাড়া' : 'Uttarpara'}
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-stone-700 leading-relaxed">
                  {isBn
                    ? `${settings.groom.fatherBn} ও ${settings.groom.motherBn}-এর স্নেহপূর্ণ নীড়ে কন্যাসম শ্রেয়াকে ঘরে তুলে নেওয়ার আনন্দে রায় পরিবার আজ উৎসবমুখর। শঙ্খধ্বনি ও সানাইয়ের সুরে নতুন সদস্যকে বরণ করে নিতে সকলে প্রস্তুত।`
                    : `Led by ${settings.groom.fatherEn} & ${settings.groom.motherEn}, the Roy family opens their arms and home to embrace Shreya as their cherished daughter, celebrating this auspicious union with open hearts and festive spirit.`}
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-yellow-200/70 text-[10px] sm:text-[11px] text-red-800 font-semibold italic">
                {isBn ? '“সংস্কৃতি, সরলতা ও আন্তরিক অভ্যর্থনা”' : '“Grounded in hospitality, culture, and love”'}
              </div>
            </div>

            {/* Bride's Family Card */}
            <div className="rounded-2xl p-4 bg-red-50/80 border border-yellow-300 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-yellow-200 pb-2 mb-2.5">
                  <span className="font-bold text-xs sm:text-sm text-red-900">
                    {isBn ? 'কনের পরিবার: মুখার্জী পরিবার' : "Bride's Family: The Mukherjee Family"}
                  </span>
                  <span className="text-[10px] text-stone-500 italic">
                    {isBn ? 'বালি, হাওড়া' : 'Bally, Howrah'}
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-stone-700 leading-relaxed">
                  {isBn
                    ? `${settings.bride.fatherBn} ও ${settings.bride.motherBn}-এর নয়নের মণি শ্রেয়া। সাহিত্য ও সংস্কারের আলোয় লালিত স্নেহের কন্যাকে অয়নের মতো যোগ্য পাত্রের হাতে তুলে দিতে পেরে মুখার্জী পরিবার পরম তৃপ্ত ও আনন্দিত।`
                    : `Nurtured with gentle traditions, education, and boundless affection by ${settings.bride.fatherEn} & ${settings.bride.motherEn}, the Mukherjee family rejoices in entrusting their beloved daughter to Ayan and his loving family.`}
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-yellow-200/70 text-[10px] sm:text-[11px] text-red-800 font-semibold italic">
                {isBn ? '“স্নেহ, ঐতিহ্য ও আজীবন শুভাশিস”' : '“Cherished values, blessings, and lifelong warmth”'}
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Things We Cherish Together (Shared Joys, Normal Narrative) */}
        <div className="rounded-2xl p-4 sm:p-5 bg-gradient-to-br from-amber-50 to-orange-50 border border-yellow-400 mb-6 font-serif">
          <div className="text-center mb-3">
            <h4 className="font-bold text-xs sm:text-sm text-red-900 uppercase tracking-wide">
              {isBn ? 'আমাদের জীবনের প্রিয় অভ্যাস ও আনন্দ' : 'What We Cherish & Love Together'}
            </h4>
            <p className="text-[11px] text-stone-600 mt-0.5">
              {isBn ? 'যে ছোট ছোট মুহূর্তগুলো আমাদের আরও কাছাকাছি নিয়ে এসেছে' : 'The little shared passions that weave our days into joyful harmony'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
            <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/80 border border-yellow-300">
              <Coffee className="w-4 h-4 text-yellow-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-red-950 block text-[11px] sm:text-xs">
                  {isBn ? 'চা ও সাহিত্যের আড্ডা' : 'Tea & Literary Conversations'}
                </strong>
                <span className="text-[10px] sm:text-[11px] text-stone-700 leading-tight block mt-0.5">
                  {isBn ? 'বৃষ্টিভেজা বিকেলে মাটির ভাঁড়ে চা আর প্রিয় বই নিয়ে আলোচনা।' : 'Rainy afternoons over earthen cups of tea, discussing favorite poetry and books.'}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/80 border border-yellow-300">
              <Music className="w-4 h-4 text-yellow-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-red-950 block text-[11px] sm:text-xs">
                  {isBn ? 'সুর ও রবীন্দ্রসংগীত' : 'Music & Melodic Evenings'}
                </strong>
                <span className="text-[10px] sm:text-[11px] text-stone-700 leading-tight block mt-0.5">
                  {isBn ? 'সান্ধ্য অবকাশে রবীন্দ্রসংগীত ও ভারতীয় শাস্ত্রীয় সংগীতের মাধুর্য।' : 'Evenings enlivened by Rabindra Sangeet melodies and soothing classical ragas.'}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/80 border border-yellow-300">
              <Compass className="w-4 h-4 text-yellow-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-red-950 block text-[11px] sm:text-xs">
                  {isBn ? 'ভ্রমণ ও পাহাড়ের পথ' : 'Wanderlust & Quiet Escapes'}
                </strong>
                <span className="text-[10px] sm:text-[11px] text-stone-700 leading-tight block mt-0.5">
                  {isBn ? 'পাহাড়ের নির্জন পথ ধরে হাঁটা এবং নতুন স্মৃতি তৈরি করা।' : 'Walking serene mountain trails, watching sunsets, and creating lifelong memories.'}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/80 border border-yellow-300">
              <Heart className="w-4 h-4 text-yellow-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-red-950 block text-[11px] sm:text-xs">
                  {isBn ? 'উৎসব ও পারিবারিক আড্ডা' : 'Festivals & Family Gatherings'}
                </strong>
                <span className="text-[10px] sm:text-[11px] text-stone-700 leading-tight block mt-0.5">
                  {isBn ? 'দুর্গাপূজা, দীপাবলি ও পরিবারের সকলকে নিয়ে সান্ধ্য উল্লাস।' : 'Celebrating Durga Puja, festive feasts, and warm evenings filled with family laughter.'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 5: Auspicious Blessing Request */}
        <div className="p-4 rounded-2xl bg-red-100/80 border border-yellow-400 text-center font-serif">
          <Quote className="w-5 h-5 text-yellow-600 mx-auto mb-1 opacity-75" />
          <p className="text-xs sm:text-sm text-red-950 font-medium leading-relaxed max-w-lg mx-auto">
            {isBn
              ? `“অগ্নিকে সাক্ষী রেখে ও গুরুজনদের পবিত্র আশীর্বাদ মাথায় নিয়ে আমরা শুরু করতে চলেছি আমাদের জীবনের এক নতুন অধ্যায়। আপনাদের উপস্থিতি ও আশীর্বাদ আমাদের এই শুভ যাত্রাকে সার্থক করবে।”`
              : `“As we step onto this sacred path of matrimony surrounded by the blessings of our elders and loved ones, your gracious presence and heartfelt wishes mean the world to us.”`}
          </p>
          <div className="text-[11px] font-bold text-red-800 mt-2">
            {isBn ? `— ${groomName} ও ${brideName}` : `— ${groomName} & ${brideName}`}
          </div>
        </div>

        <MandapDivider className="my-5" />

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
            <span>{isBn ? 'পরবর্তী: অনুষ্ঠান সূচী' : 'Next: Ceremony Timeline'}</span>
            <ArrowRight className="w-3.5 h-3.5 text-yellow-400 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </RoyalFrame>
    </div>
  );
};
