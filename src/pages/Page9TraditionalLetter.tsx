import React, { useState, useRef } from 'react';
import { Share2, Printer, RotateCcw, Check, Download, Loader2 } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { Language, WeddingSettings } from '../types';
import { GaneshaCrest, KolkaOrnament, MandapDivider } from '../components/Ornaments';

interface Page9Props {
  settings: WeddingSettings;
  language: Language;
  onRestartToEnvelope: () => void;
  onGoToIndex: () => void;
}

export const Page9TraditionalLetter: React.FC<Page9Props> = ({
  settings,
  language,
  onRestartToEnvelope,
  onGoToIndex,
}) => {
  const isBn = language === 'bn';
  const letterRef = useRef<HTMLDivElement>(null);
  const [copiedShare, setCopiedShare] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [pdfSuccess, setPdfSuccess] = useState(false);

  const handleDownloadPdf = async () => {
    if (!letterRef.current || isGeneratingPdf) return;
    setIsGeneratingPdf(true);
    setPdfSuccess(false);

    try {
      const element = letterRef.current;

      // Render high-res canvas of the formal invitation card
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.98);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const margin = 10;
      const targetWidth = pdfWidth - margin * 2;
      const targetHeight = (canvas.height * targetWidth) / canvas.width;

      if (targetHeight <= pdfHeight - margin * 2) {
        // Center vertically on single A4 page
        const posY = (pdfHeight - targetHeight) / 2;
        pdf.addImage(imgData, 'JPEG', margin, posY, targetWidth, targetHeight, undefined, 'FAST');
      } else {
        // Fit within margins
        const scaleFactor = (pdfHeight - margin * 2) / targetHeight;
        const fittedWidth = targetWidth * scaleFactor;
        const fittedHeight = targetHeight * scaleFactor;
        const posX = (pdfWidth - fittedWidth) / 2;
        pdf.addImage(imgData, 'JPEG', posX, margin, fittedWidth, fittedHeight, undefined, 'FAST');
      }

      const fileName = isBn
        ? `শুভ-পরিণয়-নিমন্ত্রণ-লিপি-${settings.groom.nameBn}-${settings.bride.nameBn}.pdf`
        : `Wedding-Invitation-${settings.groom.nameEn}-${settings.bride.nameEn}.pdf`;

      pdf.save(fileName);
      setPdfSuccess(true);
      setTimeout(() => setPdfSuccess(false), 3500);
    } catch (err) {
      console.error('Failed to generate PDF, falling back to window.print():', err);
      window.print();
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShareWhatsApp = () => {
    const text = isBn
      ? `💐 শুভ পরিণয় নিমন্ত্রণ পত্র 💐\n\nপরম শ্রদ্ধাস্পদেষু,\nআমাদের সন্তান ${settings.groom.nameBn} ও ${settings.bride.nameBn}-এর শুভ বিবাহ আগামী ${settings.weddingDateBn} তারিখে অনুষ্ঠিত হবে।\n\nস্থান: ${settings.venueNameBn}, ${settings.venueAddressBn}\n\nআপনার সপরিবারে উপস্থিতি ও আশীর্বাদ একান্ত কাম্য। আমন্ত্রণ পত্রটি দেখতে নিচের লিঙ্কে ট্যাপ করুন:\n${window.location.href}`
      : `💐 Royal Wedding Invitation 💐\n\nCordially inviting you with family to celebrate the wedding of ${settings.groom.nameEn} and ${settings.bride.nameEn} on ${settings.weddingDateEn}.\n\nVenue: ${settings.venueNameEn}\n\nView the invitation card & RSVP here:\n${window.location.href}`;

    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-2.5 sm:px-4 py-4 pb-28 text-red-950">
      {/* Traditional Scroll Border Card to be captured for PDF */}
      <div
        ref={letterRef}
        id="traditional-letter-card"
        className="relative rounded-2xl sm:rounded-3xl p-4 sm:p-7 md:p-9 bg-white border-4 border-double border-yellow-400 shadow-[0_15px_40px_rgba(127,29,29,0.2)] print:border-none print:shadow-none print:p-2"
        style={{ backgroundColor: '#ffffff', color: '#450a0a' }}
      >
        {/* Ornate Corner Accents */}
        <div className="ornate-corner-tl" />
        <div className="ornate-corner-tr" />
        <div className="ornate-corner-bl" />
        <div className="ornate-corner-br" />

        {/* Vintage Top Header */}
        <div className="text-center mb-4 sm:mb-6">
          <div className="flex justify-center items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
            <KolkaOrnament className="w-6 sm:w-8 h-6 sm:h-8 text-yellow-500" />
            <GaneshaCrest className="w-10 sm:w-12 h-10 sm:h-12 text-red-800" />
            <KolkaOrnament className="w-6 sm:w-8 h-6 sm:h-8 text-yellow-500 -scale-x-100" />
          </div>

          <div className="text-[10px] sm:text-xs font-serif font-bold text-red-800 tracking-widest uppercase">
            {isBn ? '॥ ওঁ শ্রী শ্রী প্রজাপতয়ে নমঃ ॥' : '॥ Om Sri Prajapataye Namah ॥'}
          </div>

          <h2 className="text-2xl sm:text-4xl font-bold font-serif text-red-900 mt-1">
            {isBn ? 'ঐতিহ্যবাহী নিমন্ত্রণ লিপি' : 'Traditional Formal Letter'}
          </h2>
          <div className="text-xs text-red-800 font-serif mt-0.5">
            {isBn ? 'সবিনয় নিবেদন ও আশীর্বাদের সনাতনী চিঠি' : 'Sanatan Vedic Wedding Epistle & Family Regards'}
          </div>
        </div>

        <MandapDivider className="my-3 sm:my-4" />

        {/* Formal Letter Body */}
        <div className="font-serif text-stone-800 text-xs sm:text-sm leading-relaxed space-y-3 px-1 sm:px-4 text-justify">
          <p className="font-bold text-red-900">
            {isBn ? 'মহাশয় / মহাশয়া,' : 'Respected Elders & Dear Friends,'}
          </p>

          <p>
            {isBn
              ? `সবিনয় নিবেদন এই যে, আগামী ${settings.weddingDateBn}, পরম করুণাময় পরমেশ্বরের অসীম কৃপায় ও পূজনীয় গুরুজনদের আশীর্বাদে আমাদের জ্যেষ্ঠ পুত্র শ্রীমান `
              : `With deep reverence and boundless joy, we have the honour of inviting you to the auspicious wedding ceremony of our son `}
            <span className="font-bold text-red-900 underline decoration-yellow-400">
              {isBn ? settings.groom.nameBn : settings.groom.nameEn}
            </span>
            {isBn
              ? ` (${settings.groom.addressBn}-এর ${settings.groom.grandfatherBn}-এর পৌত্র এবং ${settings.groom.fatherBn} ও ${settings.groom.motherBn}-এর পুত্র)-এর সহিত`
              : ` (Son of ${settings.groom.fatherEn} & ${settings.groom.motherEn}) with `}
          </p>

          <p className="text-center py-1">
            <span className="px-3.5 py-1 rounded-full bg-red-100 text-red-900 text-xs font-bold border border-yellow-400">
              {isBn ? 'কল্যাণীয়া পাত্রী' : 'The Beloved Bride'}
            </span>
          </p>

          <p>
            <span className="font-bold text-red-900 underline decoration-yellow-400">
              {isBn ? settings.bride.nameBn : settings.bride.nameEn}
            </span>
            {isBn
              ? ` (${settings.bride.addressBn}-এর ${settings.bride.grandfatherBn}-এর পৌত্রী এবং ${settings.bride.fatherBn} ও ${settings.bride.motherBn}-এর জ্যেষ্ঠা কন্যা)-এর শুভ পরিণয় স্থিরীকৃত হইয়াছে।`
              : ` (Daughter of ${settings.bride.fatherEn} & ${settings.bride.motherEn}).`}
          </p>

          <p>
            {isBn
              ? `উক্ত মাঙ্গলিক শুভলগ্নে এবং তৎপরবর্তী প্রীতিভোজের সান্ধ্য মহোৎসবে আপনি আপনার পরিবারবর্গ ও সুহৃদজন সমভিব্যাহারে উপস্থিত থাকিয়া নবদম্পতিকে শুভাশিষ ও স্নেহস্পর্শে অভিষিক্ত করিলে আমরা চিরকৃতজ্ঞ থাকিব।`
              : `We humbly solicit your esteemed presence and heartfelt blessings to shower the newly wedded couple as they embark upon their sacred journey of life together.`}
          </p>
        </div>

        {/* Venue & Date Summary Box */}
        <div className="my-4 sm:my-5 p-3.5 rounded-2xl bg-red-50 border-2 border-yellow-400 text-center font-serif">
          <div className="text-[10px] sm:text-xs uppercase font-bold text-red-800 tracking-wider mb-0.5">
            {isBn ? '॥ বিবাহ বাসর ও শুভ লগ্ন ॥' : '॥ Venue & Sacred Muhurat ॥'}
          </div>
          <div className="text-sm sm:text-base font-bold text-red-950">
            {isBn ? settings.venueNameBn : settings.venueNameEn}
          </div>
          <div className="text-[11px] sm:text-xs text-stone-700 mt-0.5">
            {isBn ? settings.venueAddressBn : settings.venueAddressEn}
          </div>
          <div className="text-xs font-semibold text-red-900 mt-1">
            {isBn ? settings.weddingDateBn : settings.weddingDateEn}
          </div>
        </div>

        {/* Signatures of Elders */}
        <div className="mt-6 pt-3 border-t border-yellow-300 grid grid-cols-1 sm:grid-cols-2 gap-4 text-center font-serif text-xs">
          <div>
            <span className="font-bold text-red-900 block text-xs sm:text-sm">
              {isBn ? 'বিনীত বরের পরিবার:' : "Groom's Family:"}
            </span>
            <span className="block mt-1 text-stone-800">
              {isBn ? `${settings.groom.fatherBn} ও ${settings.groom.motherBn}` : `${settings.groom.fatherEn} & ${settings.groom.motherEn}`}
            </span>
            <span className="block text-stone-500 italic text-[10px] mt-0.5">
              {isBn ? 'এবং রায় পরিবারের সর্বজন' : 'And all members of Roy family'}
            </span>
          </div>

          <div>
            <span className="font-bold text-red-900 block text-xs sm:text-sm">
              {isBn ? 'বিনীত কনের পরিবার:' : "Bride's Family:"}
            </span>
            <span className="block mt-1 text-stone-800">
              {isBn ? `${settings.bride.fatherBn} ও ${settings.bride.motherBn}` : `${settings.bride.fatherEn} & ${settings.bride.motherEn}`}
            </span>
            <span className="block text-stone-500 italic text-[10px] mt-0.5">
              {isBn ? 'এবং মুখার্জী পরিবারের সর্বজন' : 'And all members of Mukherjee family'}
            </span>
          </div>
        </div>
      </div>

      {/* Actions Container (Excluded from PDF) */}
      <div className="mt-6 p-4 rounded-2xl bg-red-50 border border-yellow-400 shadow-sm print:hidden">
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          {/* Download PDF Button */}
          <button
            onClick={handleDownloadPdf}
            disabled={isGeneratingPdf}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-serif font-bold shadow flex items-center gap-2 active:scale-95 transition-all ${
              pdfSuccess
                ? 'bg-yellow-400 text-red-950 border-2 border-yellow-500'
                : 'bg-red-800 hover:bg-red-700 text-yellow-300 border-2 border-yellow-400'
            }`}
          >
            {isGeneratingPdf ? (
              <>
                <Loader2 className="w-4 h-4 text-yellow-400 animate-spin" />
                <span>{isBn ? 'পিডিএফ তৈরি হচ্ছে...' : 'Generating PDF...'}</span>
              </>
            ) : pdfSuccess ? (
              <>
                <Check className="w-4 h-4 text-red-950" />
                <span>{isBn ? 'পিডিএফ ডাউনলোড সম্পন্ন! ✓' : 'PDF Downloaded! ✓'}</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4 text-yellow-400" />
                <span>{isBn ? 'পিডিএফ ডাউনলোড করুন' : 'Download PDF Invitation'}</span>
              </>
            )}
          </button>

          {/* Share on WhatsApp */}
          <button
            onClick={handleShareWhatsApp}
            className="px-4 py-2.5 rounded-full bg-white hover:bg-red-100 text-red-900 border border-yellow-400 text-xs sm:text-sm font-serif font-bold shadow flex items-center gap-1.5 active:scale-95 transition-all"
          >
            <Share2 className="w-3.5 h-3.5 text-red-800" />
            <span>{isBn ? 'হোয়াটসঅ্যাপে পাঠান' : 'Share on WhatsApp'}</span>
          </button>

          {/* Print Button */}
          <button
            onClick={handlePrint}
            className="px-4 py-2.5 rounded-full bg-yellow-400 hover:bg-yellow-300 text-red-950 text-xs sm:text-sm font-serif font-bold border border-yellow-500 shadow flex items-center gap-1.5 active:scale-95 transition-all"
          >
            <Printer className="w-3.5 h-3.5 text-red-950" />
            <span>{isBn ? 'প্রিন্ট' : 'Print'}</span>
          </button>

          {/* Copy Link */}
          <button
            onClick={handleCopyLink}
            className="px-4 py-2.5 rounded-full bg-white hover:bg-red-100 text-red-950 border border-yellow-400 text-xs sm:text-sm font-serif font-bold shadow flex items-center gap-1.5 active:scale-95 transition-all"
          >
            {copiedShare ? (
              <>
                <Check className="w-3.5 h-3.5 text-red-700" />
                <span className="text-red-900">{isBn ? 'লিঙ্ক কপি হয়েছে!' : 'Link Copied!'}</span>
              </>
            ) : (
              <span>{isBn ? 'লিঙ্ক কপি' : 'Copy Link'}</span>
            )}
          </button>
        </div>
      </div>

      <MandapDivider className="my-4 print:hidden" />

      {/* Navigation Footers */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 mt-3 print:hidden">
        <button
          onClick={onGoToIndex}
          className="w-full sm:w-auto px-4 py-2.5 rounded-full bg-red-50 hover:bg-red-100 text-red-900 text-xs sm:text-sm font-serif font-bold border border-yellow-400"
        >
          {isBn ? '‹ সূচিপত্রে ফিরুন' : '‹ Back to Chapters'}
        </button>

        <button
          onClick={onRestartToEnvelope}
          className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-red-800 hover:bg-red-700 text-yellow-300 text-xs sm:text-sm font-serif font-bold border-2 border-yellow-400 shadow flex items-center justify-center gap-1.5 group"
        >
          <RotateCcw className="w-3.5 h-3.5 text-yellow-400 group-hover:-rotate-90 transition-transform" />
          <span>{isBn ? 'খামে ফিরে যান' : 'Back to Animated Envelope'}</span>
        </button>
      </div>
    </div>
  );
};
