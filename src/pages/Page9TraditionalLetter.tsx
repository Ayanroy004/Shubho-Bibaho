
import React, { useState, useRef } from "react";
import {
  Share2,
  RotateCcw,
  Check,
  Download,
  Loader2,
} from "lucide-react";
import html2canvas from "html2canvas-pro";
import { jsPDF } from "jspdf";
import { Language, WeddingSettings } from "../types";
import {
  GaneshaCrest,
  KolkaOrnament,
  MandapDivider,
} from "../components/Ornaments";

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
  const isBn = language === "bn";
  const letterRef = useRef<HTMLDivElement>(null);

  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [pdfSuccess, setPdfSuccess] = useState(false);

  const handleDownloadPdf = async () => {
    const element = letterRef.current;

    if (!element || isGeneratingPdf) return;

    setIsGeneratingPdf(true);
    setPdfSuccess(false);

    try {
      // Fixed PDF capture dimensions, independent of device screen.
      const CAPTURE_WIDTH = 672;
      const CAPTURE_VIEWPORT_WIDTH = 1200;

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: false,
        backgroundColor: "#ffffff",
        logging: false,

        // Never use the current mobile/tablet viewport width.
        windowWidth: CAPTURE_VIEWPORT_WIDTH,
        windowHeight: 1600,

        // Capture the invitation at a consistent width.
        width: CAPTURE_WIDTH,

        scrollX: 0,
        scrollY: 0,

        onclone: (clonedDocument) => {
          // Hide navigation elements in the cloned document.
          clonedDocument
            .querySelectorAll(".top-nav-bar")
            .forEach((nav) => {
              (nav as HTMLElement).style.setProperty(
                "display",
                "none",
                "important"
              );
            });

          const card = clonedDocument.getElementById(
            "traditional-letter-card"
          ) as HTMLElement | null;

          if (card) {
            // Force the same desktop-sized card on every device.
            card.style.setProperty(
              "width",
              `${CAPTURE_WIDTH}px`,
              "important"
            );
            card.style.setProperty(
              "min-width",
              `${CAPTURE_WIDTH}px`,
              "important"
            );
            card.style.setProperty(
              "max-width",
              `${CAPTURE_WIDTH}px`,
              "important"
            );
            card.style.setProperty(
              "box-sizing",
              "border-box",
              "important"
            );

            // Remove positioning that could shift the capture.
            card.style.setProperty(
              "position",
              "relative",
              "important"
            );
            card.style.setProperty("top", "auto", "important");
            card.style.setProperty("left", "auto", "important");
            card.style.setProperty("transform", "none", "important");
            card.style.setProperty("margin", "0", "important");
            card.style.setProperty("overflow", "visible", "important");

            // Ensure the PDF uses the full invitation content.
            card.style.setProperty("height", "auto", "important");
            card.style.setProperty("max-height", "none", "important");
          }
        },
      });

      // Convert the complete invitation to a high-quality image.
      const imgData = canvas.toDataURL("image/jpeg", 0.98);

      // Always generate an A4 portrait PDF.
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
        compress: true,
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const margin = 10;
      const availableWidth = pdfWidth - margin * 2;
      const availableHeight = pdfHeight - margin * 2;

      // Fit the complete card inside A4 without stretching or cropping.
      const scale = Math.min(
        availableWidth / canvas.width,
        availableHeight / canvas.height
      );

      const imageWidth = canvas.width * scale;
      const imageHeight = canvas.height * scale;

      // Center the invitation horizontally and vertically.
      const posX = (pdfWidth - imageWidth) / 2;
      const posY = (pdfHeight - imageHeight) / 2;

      pdf.addImage(
        imgData,
        "JPEG",
        posX,
        posY,
        imageWidth,
        imageHeight,
        undefined,
        "FAST"
      );

      const safeGroomName = (
        isBn ? settings.groom.nameBn : settings.groom.nameEn
      ).replace(/[<>:"/\\|?*\u0000-\u001F]/g, "-");

      const safeBrideName = (
        isBn ? settings.bride.nameBn : settings.bride.nameEn
      ).replace(/[<>:"/\\|?*\u0000-\u001F]/g, "-");

      const fileName = isBn
        ? `শুভ-পরিণয়-নিমন্ত্রণ-লিপি-${safeGroomName}-${safeBrideName}.pdf`
        : `Wedding-Invitation-${safeGroomName}-${safeBrideName}.pdf`;

      pdf.save(fileName);

      setPdfSuccess(true);

      window.setTimeout(() => {
        setPdfSuccess(false);
      }, 3500);
    } catch (err) {
      console.error("Failed to generate PDF:", err);

      // Do not silently switch to the browser's device-dependent
      // print layout. Show the error for easier debugging.
      window.alert(
        isBn
          ? "পিডিএফ তৈরি করা যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।"
          : "Could not generate the PDF. Please try again."
      );
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handleShareWhatsApp = () => {
    const text = isBn
      ? `💐 শুভ পরিণয় নিমন্ত্রণ পত্র 💐

সবিনয় নিবেদন,
আমাদের পুত্র ${settings.groom.nameBn}-এর সঙ্গে শ্রীযুক্ত সোমনাথ বসু মহাশয়ের কন্যা ${settings.bride.nameBn}-এর শুভ বিবাহ আগামী ${settings.weddingDateBn} তারিখে অনুষ্ঠিত হবে।

আপনার সপরিবারে উপস্থিতি ও আশীর্বাদ একান্ত কাম্য। পত্রদ্বারা নিমন্ত্রণের ত্রুটি মার্জনা করবেন।

বিনীত,
শ্রী রঘুনাথ দে ও শ্রীমতী মৌসুমী দে

📍 নিজ বাসভবন (তারাকনাথ দে স্মৃতি ভবন), ${settings.groom.addressBn}

💌 সম্পূর্ণ নিমন্ত্রণ পত্র:
${window.location.href}`
      : `💐 Wedding Invitation 💐

We cordially invite you to the wedding of our beloved son, ${settings.groom.nameEn}, with ${settings.bride.nameEn}, daughter of Shri Somnath Basu, on ${settings.weddingDateEn}.

Your presence with family and blessings are warmly requested.

With regards,
Shri Raghunath De & Smt. Mousumi De

📍 Own Residence (Tarakanath De Smriti Bhavan), ${settings.groom.addressEn}

💌 View the invitation:
${window.location.href}`;

    window.open(
      `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-2.5 sm:px-4 py-4 pb-28 text-red-950">
      {/* Invitation card captured for PDF */}
      <div
        ref={letterRef}
        id="traditional-letter-card"
        className="relative rounded-2xl sm:rounded-3xl p-4 sm:p-7 md:p-9 bg-white border-4 border-double border-yellow-400 shadow-[0_15px_40px_rgba(127,29,29,0.2)] print:border-none print:shadow-none print:p-2"
        style={{
          backgroundColor: "#ffffff",
          color: "#450a0a",
        }}
      >
        {/* Ornate corner accents */}
        <div className="ornate-corner-tl" />
        <div className="ornate-corner-tr" />
        <div className="ornate-corner-bl" />
        <div className="ornate-corner-br" />

        {/* Header */}
        <div className="text-center mb-4 sm:mb-6">
          <div className="flex justify-center items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
            <KolkaOrnament className="w-6 sm:w-8 h-6 sm:h-8 text-yellow-500" />
            <GaneshaCrest className="w-10 sm:w-12 h-10 sm:h-12 text-red-800" />
            <KolkaOrnament className="w-6 sm:w-8 h-6 sm:h-8 text-yellow-500 -scale-x-100" />
          </div>

          <div className="text-[10px] sm:text-xs font-serif font-bold text-red-800 tracking-widest uppercase">
            {isBn
              ? "॥ ওঁ শ্রী শ্রী প্রজাপতয়ে নমঃ ॥"
              : "॥ Om Sri Prajapataye Namah ॥"}
          </div>

          <h2 className="text-2xl sm:text-4xl font-bold font-serif text-red-900 mt-1 md:mt-3">
            {isBn
              ? "ঐতিহ্যবাহী নিমন্ত্রণ লিপি"
              : "Traditional Formal Letter"}
          </h2>

          <div className="text-xs text-red-800 font-serif mt-0.5">
            {isBn
              ? "সবিনয় নিবেদন ও আশীর্বাদের সনাতনী চিঠি"
              : "Sanatan Vedic Wedding Epistle & Family Regards"}
          </div>
        </div>

        <MandapDivider className="my-3 sm:my-4" />

        {/* Formal letter body */}
        <div className="font-serif text-stone-800 text-xs sm:text-sm leading-relaxed space-y-3 px-1 sm:px-4 text-justify">
          <p className="font-bold text-red-900">
            {isBn
              ? "সবিনয় নিবেদন,"
              : "Respected Elders & Dear Friends,"}
          </p>

          <p>
            {isBn
              ? `দিন, মাস, বছর, যুগ পেরিয়ে সেই শুভক্ষণ উপস্থিত। যখন প্রকৃতির নিয়মে দুজন অচ্ছেদ্য আপনজন সহআনন্দের সঙ্গে মিলিত হয়ে আগামী ${settings.weddingDateBn} রবিবার শুভ লগ্নে। আমাদের পুত্র কল্যাণীয় `
              : "After days, months, years, and countless cherished moments, the auspicious day we have been waiting for has finally arrived. By the grace of the Almighty and in accordance with the beautiful course of nature, two hearts are about to unite in a bond of love and togetherness. With immense joy, we cordially invite you to the wedding ceremony of our beloved son, "}

            <span className="font-bold text-red-900 underline decoration-yellow-400">
              {isBn
                ? settings.groom.nameBn
                : settings.groom.nameEn}
            </span>

            {isBn ? " এর সাথে " : ", with "}

            {isBn
              ? ""
              : `the beloved daughter of Shri Somnath Basu, `}
          </p>

          <p>
            {isBn
              ? "শ্রীযুক্ত সোমনাথ বসু মহাশয়ের কন্যা কল্যাণীয়া "
              : `(Daughter of ${settings.bride.fatherEn} & ${settings.bride.motherEn}), `}

            <span className="font-bold text-red-900 underline decoration-yellow-400">
              {isBn
                ? settings.bride.nameBn
                : settings.bride.nameEn}
            </span>

            {isBn
              ? "-র শুভ পরিণয় সুসম্পন্ন হবে। আপনার সবান্ধব উপস্থিতি ও আশীর্বাদ প্রার্থনীয়।"
              : `, on Sunday, ${settings.weddingDateBn}, at the auspicious hour. Your gracious presence, along with your family and loved ones, and your heartfelt blessings will make this sacred occasion truly memorable.`}
          </p>

          <p>
            {isBn
              ? "পত্রদ্বারা নিমন্ত্রণের ত্রুটি মার্জনা করবেন।"
              : "Kindly forgive any shortcomings in this invitation sent by letter."}
          </p>

          <p className="font-bold text-red-900 text-end pt-2">
            {isBn ? "বিনীত / বিনীতা" : "Yours sincerely,"}
          </p>

          <p className="text-end font-semibold">
            {isBn ? "শ্রী রঘুনাথ দে" : "Shri Raghunath De"}
            <br />
            {isBn ? "শ্রীমতী মৌসুমী দে" : "Smt. Mousumi De"}
          </p>
        </div>

        {/* Venue and date */}
        <div className="my-4 sm:my-5 p-3.5 rounded-2xl bg-red-50 border-2 border-yellow-400 text-center font-serif">
          <div className="text-[10px] sm:text-xs uppercase font-bold text-red-800 tracking-wider mb-0.5">
            {isBn
              ? "॥ বিবাহ বাসর ও শুভ লগ্ন ॥"
              : "॥ Venue & Sacred Muhurat ॥"}
          </div>

          <div className="text-sm sm:text-base font-bold text-red-950">
            {isBn
              ? settings.venueNameBn
              : settings.venueNameEn}
          </div>

          <div className="text-[11px] sm:text-xs text-stone-700 mt-0.5">
            {isBn
              ? settings.venueAddressBn
              : settings.venueAddressEn}
          </div>

          <div className="text-xs font-semibold text-red-900 mt-1">
            {isBn
              ? settings.weddingDateBn
              : settings.weddingDateEn}
          </div>
        </div>

        {/* Family signatures */}
        <div className="mt-6 pt-3 border-t border-yellow-300 grid grid-cols-1 sm:grid-cols-2 gap-4 text-center font-serif text-xs">
          <div>
            <span className="font-bold text-red-900 block text-xs sm:text-sm">
              {isBn
                ? "বিনীত বরের পরিবার:"
                : "Groom's Family:"}
            </span>

            <span className="block mt-1 text-stone-800">
              {isBn
                ? `${settings.groom.fatherBn} ও ${settings.groom.motherBn}`
                : `${settings.groom.fatherEn} & ${settings.groom.motherEn}`}
            </span>

            <span className="block text-stone-500 italic text-[10px] mt-0.5">
              {isBn
                ? "এবং রায় পরিবারের সর্বজন"
                : "And all members of Roy family"}
            </span>
          </div>

          <div>
            <span className="font-bold text-red-900 block text-xs sm:text-sm">
              {isBn
                ? "বিনীত কনের পরিবার:"
                : "Bride's Family:"}
            </span>

            <span className="block mt-1 text-stone-800">
              {isBn
                ? `${settings.bride.fatherBn} ও ${settings.bride.motherBn}`
                : `${settings.bride.fatherEn} & ${settings.bride.motherEn}`}
            </span>

            <span className="block text-stone-500 italic text-[10px] mt-0.5">
              {isBn
                ? "এবং মুখার্জী পরিবারের সর্বজন"
                : "And all members of Mukherjee family"}
            </span>
          </div>
        </div>
      </div>

      {/* Action buttons — excluded from PDF */}
      <div className="mt-6 p-4 rounded-2xl bg-red-50 border border-yellow-400 shadow-sm print:hidden">
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          <button
            onClick={handleDownloadPdf}
            disabled={isGeneratingPdf}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-serif font-bold shadow flex items-center gap-2 active:scale-95 transition-all ${
              pdfSuccess
                ? "bg-yellow-400 text-red-950 border-2 border-yellow-500"
                : "bg-red-800 hover:bg-red-700 text-yellow-300 border-2 border-yellow-400"
            }`}
          >
            {isGeneratingPdf ? (
              <>
                <Loader2 className="w-4 h-4 text-yellow-400 animate-spin" />
                <span>
                  {isBn
                    ? "পিডিএফ তৈরি হচ্ছে..."
                    : "Generating PDF..."}
                </span>
              </>
            ) : pdfSuccess ? (
              <>
                <Check className="w-4 h-4 text-red-950" />
                <span>
                  {isBn
                    ? "পিডিএফ ডাউনলোড সম্পন্ন! ✓"
                    : "PDF Downloaded! ✓"}
                </span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4 text-yellow-400" />
                <span>
                  {isBn
                    ? "পিডিএফ ডাউনলোড করুন"
                    : "Download PDF Invitation"}
                </span>
              </>
            )}
          </button>

          <button
            onClick={handleShareWhatsApp}
            className="px-4 py-2.5 rounded-full bg-white hover:bg-red-100 text-red-900 border border-yellow-400 text-xs sm:text-sm font-serif font-bold shadow flex items-center gap-1.5 active:scale-95 transition-all"
          >
            <Share2 className="w-3.5 h-3.5 text-red-800" />
            <span>
              {isBn
                ? "হোয়াটসঅ্যাপে পাঠান"
                : "Share on WhatsApp"}
            </span>
          </button>
        </div>
      </div>

      <MandapDivider className="my-4 print:hidden" />

      {/* Navigation */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 mt-3 print:hidden">
        <button
          onClick={onGoToIndex}
          className="w-full sm:w-auto px-4 py-2.5 rounded-full bg-red-50 hover:bg-red-100 text-red-900 text-xs sm:text-sm font-serif font-bold border border-yellow-400"
        >
          {isBn
            ? "‹ সূচিপত্রে ফিরুন"
            : "‹ Back to Chapters"}
        </button>

        <button
          onClick={onRestartToEnvelope}
          className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-red-800 hover:bg-red-700 text-yellow-300 text-xs sm:text-sm font-serif font-bold border-2 border-yellow-400 shadow flex items-center justify-center gap-1.5 group"
        >
          <RotateCcw className="w-3.5 h-3.5 text-yellow-400 group-hover:-rotate-90 transition-transform" />
          <span>
            {isBn
              ? "খামে ফিরে যান"
              : "Back to Animated Envelope"}
          </span>
        </button>
      </div>
    </div>
  );
};
