import React, { useRef, useState } from "react";
import confetti from "canvas-confetti";
import { Sparkles, Heart, ArrowRight } from "lucide-react";
import { GaneshaCrest, KolkaOrnament } from "./Ornaments";
import { Language, WeddingSettings } from "../types";

interface EnvelopeOpeningProps {
  onOpen: () => void;
  language: Language;
  settings: WeddingSettings;
  onStartMusic: () => void;
  isMusicPlaying: boolean;
}

type AnimationStage =
  | "idle"
  | "unsealing"
  | "flap-opening"
  | "card-rising"
  | "transitioning";

const WhiteMehndiFrame: React.FC = () => {
  const mandalaPetals = Array.from({ length: 16 }, (_, i) => i * 22.5);

  const positions = [
    { x: 5, y: 5, scale: 1.15 },
    { x: 395, y: 5, scale: 1.15 },
    { x: 5, y: 400, scale: 0.8 },
    { x: 395, y: 400, scale: 0.8 },
    { x: 5, y: 795, scale: 1.15 },
    { x: 395, y: 795, scale: 1.15 },
  ];

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 400 800"
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 z-0 h-full w-full text-white"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <g opacity="0.32">
        {/* Decorative side borders */}
        <path
          d="M12 0 V800 M20 0 V800 M388 0 V800 M380 0 V800"
          strokeDasharray="2 5"
        />

        {/* Repeated floral mandalas */}
        {positions.map(({ x, y, scale }, index) => (
          <g
            key={index}
            transform={`translate(${x} ${y}) scale(${x > 200 ? -scale : scale} ${scale})`}
          >
            <circle r="35" />
            <circle r="30" strokeDasharray="1 3" />

            {mandalaPetals.map((angle) => (
              <g key={angle} transform={`rotate(${angle})`}>
                <path d="M0 -8 C-8 -19 -7 -31 0 -39 C7 -31 8 -19 0 -8Z" />
                <path d="M0 -14 Q-4 -26 0 -34 Q4 -26 0 -14Z" />
                <circle cx="0" cy="-42" r="1.5" fill="currentColor" />
              </g>
            ))}

            <circle r="13" />
            <circle r="5" fill="currentColor" />
          </g>
        ))}

        {/* Paisley leaves and vines along the sides */}
        {[0, 1].map((side) => (
          <g
            key={side}
            transform={side ? "translate(400 0) scale(-1 1)" : undefined}
          >
            <path d="M12 100 Q65 125 18 165 Q-5 190 20 215" />
            <path d="M12 290 Q65 315 18 355 Q-5 380 20 405" />
            <path d="M12 490 Q65 515 18 555 Q-5 580 20 605" />
            <path d="M12 680 Q65 705 18 745" />

            {[130, 320, 520, 710].map((y) => (
              <g key={y} transform={`translate(20 ${y})`}>
                <path d="M0 0 C-23 -10 -28 -35 -10 -49 C-12 -29 8 -28 10 -13 C12 -5 6 0 0 0Z" />
                <path d="M-4 -8 Q-17 -22 -12 -37" />
                <circle cx="-8" cy="-15" r="2" />
              </g>
            ))}
          </g>
        ))}

        {/* Small floral details */}
        {Array.from({ length: 24 }, (_, i) => {
          const x = i % 2 === 0 ? 30 + (i % 6) * 12 : 370 - (i % 6) * 12;
          const y = 45 + Math.floor(i / 2) * 62;

          return (
            <g key={i} transform={`translate(${x} ${y})`}>
              {Array.from({ length: 6 }, (_, petal) => (
                <ellipse
                  key={petal}
                  cx="0"
                  cy="-4"
                  rx="2.5"
                  ry="4"
                  transform={`rotate(${petal * 60})`}
                />
              ))}
              <circle r="1.5" fill="currentColor" />
            </g>
          );
        })}

        {/* Top and bottom ornamental garlands */}
        <path d="M30 0 Q100 55 170 0 M230 0 Q300 55 370 0" />
        <path d="M30 800 Q100 745 170 800 M230 800 Q300 745 370 800" />

        {[55, 100, 145, 255, 300, 345].map((x) => (
          <g key={x} transform={`translate(${x} 22)`}>
            <path d="M0 0 V20 L-4 25 L0 30 L4 25Z" />
            <circle cy="35" r="2" fill="currentColor" />
          </g>
        ))}

        {[55, 100, 145, 255, 300, 345].map((x) => (
          <g key={x} transform={`translate(${x} 778)`}>
            <path d="M0 0 V-20 L-4 -25 L0 -30 L4 -25Z" />
            <circle cy="-35" r="2" fill="currentColor" />
          </g>
        ))}
      </g>
    </svg>
  );
};

export const EnvelopeOpening: React.FC<EnvelopeOpeningProps> = ({
  onOpen,
  language,
  settings,
  onStartMusic,
  isMusicPlaying,
}) => {
  const [animStage, setAnimStage] = useState<AnimationStage>("idle");
  const timerRefs = useRef<ReturnType<typeof setTimeout>[]>([]);
  const openingRef = useRef(false);

  const isBn = language === "bn";

  const schedule = (callback: () => void, delay: number) => {
    const timer = setTimeout(callback, delay);
    timerRefs.current.push(timer);
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 75,
        spread: 100,
        startVelocity: 38,
        gravity: 0.85,
        origin: { x: 0.5, y: 0.55 },
        colors: ["#facc15", "#fde68a", "#dc2626", "#ffffff", "#ef4444"],
      });

      schedule(() => {
        confetti({
          particleCount: 45,
          angle: 60,
          spread: 75,
          startVelocity: 35,
          origin: { x: 0.08, y: 0.68 },
          colors: ["#facc15", "#ffd700", "#dc2626"],
        });

        confetti({
          particleCount: 45,
          angle: 120,
          spread: 75,
          startVelocity: 35,
          origin: { x: 0.92, y: 0.68 },
          colors: ["#facc15", "#ffd700", "#dc2626"],
        });
      }, 350);
    } catch {
      // Continue opening even if confetti is unavailable.
    }
  };

  const handleStartOpening = () => {
    if (openingRef.current) return;

    openingRef.current = true;

    onStartMusic();
    triggerConfetti();
    setAnimStage("unsealing");

    schedule(() => {
      setAnimStage("flap-opening");
    }, 250);

    schedule(() => {
      setAnimStage("card-rising");
    }, 750);

    schedule(() => {
      setAnimStage("transitioning");

      schedule(() => {
        onOpen();
      }, 550);
    }, 1550);
  };

  const handleDirectOpen = () => {
    if (openingRef.current) return;

    openingRef.current = true;
    onStartMusic();
    triggerConfetti();
    onOpen();
  };

  const isIdle = animStage === "idle";
  const isFlapOpen =
    animStage === "flap-opening" ||
    animStage === "card-rising" ||
    animStage === "transitioning";

  const isCardRising =
    animStage === "card-rising" || animStage === "transitioning";

  return (
    <div
      className={`relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#450a0a] via-[#5c0e0e] to-[#3a0606] px-3 py-6 text-white transition-all duration-700 ease-in-out ${
        animStage === "transitioning"
          ? "scale-[1.03] opacity-0"
          : "scale-100 opacity-100"
      }`}
    >
      {/* Ambient gold lighting */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <WhiteMehndiFrame />
      </div>

      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-yellow-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-20 h-80 w-80 rounded-full bg-red-500/20 blur-3xl" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full border border-yellow-400/10" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-yellow-400/5" />

      {/* Continuously Floating Wedding Flowers */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Left upper flower */}
        <div
          className="absolute left-[8%] top-[15%] text-2xl text-yellow-300/60"
          style={{
            animation: "floatingPetals 4s ease-in-out infinite",
          }}
        >
          🌸
        </div>

        {/* Right upper flower */}
        <div
          className="absolute right-[10%] top-[22%] text-3xl text-red-300/60"
          style={{
            animation: "floatingPetals 5s ease-in-out infinite",
            animationDelay: "1s",
          }}
        >
          🌹
        </div>

        {/* Left middle flower */}
        <div
          className="absolute left-[5%] top-[48%] text-xl text-yellow-200/60"
          style={{
            animation: "floatingPetals 4.5s ease-in-out infinite",
            animationDelay: "0.5s",
          }}
        >
          🌼
        </div>

        {/* Right middle flower */}
        <div
          className="absolute right-[6%] top-[55%] text-2xl text-yellow-300/60"
          style={{
            animation: "floatingPetals 5.5s ease-in-out infinite",
            animationDelay: "1.5s",
          }}
        >
          🌸
        </div>

        {/* Left bottom flower */}
        <div
          className="absolute bottom-[15%] left-[15%] text-xl text-red-300/60"
          style={{
            animation: "floatingPetals 4.8s ease-in-out infinite",
            animationDelay: "2s",
          }}
        >
          🌹
        </div>

        {/* Right bottom flower */}
        <div
          className="absolute bottom-[18%] right-[14%] text-2xl text-yellow-200/60"
          style={{
            animation: "floatingPetals 4.2s ease-in-out infinite",
            animationDelay: "2.5s",
          }}
        >
          🌼
        </div>
      </div>

      {/* Header */}
      <div className="relative z-10 mb-7 max-w-md px-2 text-center sm:mb-10">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-yellow-400/70 bg-red-950/70 px-4 py-2 font-serif text-[10px] tracking-widest text-yellow-300 shadow-[0_0_25px_rgba(250,204,21,0.12)] sm:text-xs">
          <Sparkles className="h-4 w-4 animate-pulse text-yellow-400" />

          <span>
            {isBn
              ? "॥ শ্রী শ্রী প্রজাপতয়ে নমঃ ॥"
              : "॥ Om Sri Prajapataye Namah ॥"}
          </span>

          <Sparkles className="h-4 w-4 animate-pulse text-yellow-400" />
        </div>

        <h1 className="font-serif text-2xl font-bold leading-tight text-yellow-400 drop-shadow-[0_2px_12px_rgba(250,204,21,0.25)] sm:text-4xl">
          {isBn
            ? "শুভ প্রীতিভোজ নিমন্ত্রণ পত্র"
            : "Grand Wedding Reception Invitation"}
        </h1>

        <p className="mt-2 font-serif text-xs tracking-wide text-yellow-100/80 sm:text-sm">
          {isBn
            ? "ভালোবাসা ও সংস্কৃতির চিরন্তন মেলবন্ধন"
            : "A Celebration of Timeless Love & Traditions"}
        </p>

        <div className="mx-auto mt-4 flex w-40 items-center gap-3">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-yellow-400/80" />
          <span className="text-sm text-yellow-400">✦</span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-yellow-400/80" />
        </div>
      </div>
      {/* Envelope stage */}
      <div
        className="relative z-10 my-5 w-full max-w-[340px] sm:max-w-[420px]"
        style={{ perspective: "1400px" }}
      >
        {/* Ground shadow */}
        <div
          className={`absolute -bottom-5 left-[10%] right-[10%] h-10 rounded-full bg-black/40 blur-xl transition-all duration-700 ${
            isCardRising ? "scale-75 opacity-50" : "scale-100 opacity-100"
          }`}
        />

        {/* Main envelope */}
        <div
          onClick={handleStartOpening}
          className="group relative aspect-[4/3] w-full cursor-pointer overflow-visible rounded-2xl border border-yellow-400/80 bg-gradient-to-br from-[#991b1b] via-[#7f1d1d] to-[#450a0a] shadow-[0_25px_60px_rgba(0,0,0,0.65)] transition-transform duration-500 hover:scale-[1.01]"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Decorative border */}
          <div className="pointer-events-none absolute inset-2 z-10 rounded-xl border border-yellow-300/30" />

          {/* Golden inner lining */}
          <div className="absolute inset-2 overflow-hidden rounded-xl border border-yellow-500/50 bg-gradient-to-br from-yellow-200 via-yellow-100 to-yellow-300 shadow-inner">
            <div className="absolute inset-0 bg-[radial-gradient(#ca8a04_1px,transparent_1px)] opacity-20 [background-size:12px_12px]" />

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-25">
              <GaneshaCrest className="h-28 w-28 text-yellow-800 sm:h-36 sm:w-36" />
            </div>

            <div className="absolute inset-x-0 bottom-5 text-center font-serif text-xs tracking-[0.3em] text-red-900/40">
              ✦ GRAND WEDDING RECEPTION ✦
            </div>
          </div>

          {/* Invitation card */}
          <div
            className={`absolute left-[5%] right-[5%] z-20 flex flex-col justify-between rounded-xl border-2 border-yellow-500 bg-gradient-to-b from-white via-[#fffdf5] to-yellow-50 p-3 text-red-950 shadow-[0_10px_35px_rgba(0,0,0,0.3)] sm:p-5 ${
              isCardRising
                ? "top-[-25%] bottom-[22%] scale-[1.02] opacity-100"
                : isFlapOpen
                  ? "top-[5%] bottom-[5%] scale-100 opacity-100"
                  : "top-[8%] bottom-[8%] scale-95 opacity-0"
            }`}
            style={{
              transition:
                "top 900ms cubic-bezier(0.22,1,0.36,1), bottom 900ms cubic-bezier(0.22,1,0.36,1), transform 900ms cubic-bezier(0.22,1,0.36,1), opacity 450ms ease",
            }}
          >
            {/* Card decoration */}
            <div className="pointer-events-none absolute inset-1.5 rounded-lg border border-yellow-500/50" />

            <div className="relative text-center">
              <div className="mb-1 flex items-center justify-center gap-2">
                <KolkaOrnament className="h-5 w-5 text-yellow-600" />
                <GaneshaCrest className="h-9 w-9 text-red-800" />
                <KolkaOrnament className="h-5 w-5 -scale-x-100 text-yellow-600" />
              </div>

              <span className="block font-serif text-[9px] font-bold uppercase tracking-[0.2em] text-red-800 sm:text-xs">
                {isBn
                  ? "॥ শুভ প্রীতিভোজ নিমন্ত্রণ পত্র ॥"
                  : "॥ Grand Wedding Reception Invitation ॥"}
              </span>
            </div>

            {/* Couple details */}
            <div className="relative my-auto py-2 text-center">
              <h2 className="font-serif text-base font-bold leading-relaxed text-red-900 sm:text-xl">
                {isBn
                  ? `${settings.groom.nameBn} ও ${settings.bride.nameBn}`
                  : `${settings.groom.nameEn} & ${settings.bride.nameEn}`}
              </h2>

              <div className="mt-2 flex items-center justify-center gap-2 font-serif text-[10px] font-semibold text-red-700 sm:text-xs">
                <Heart className="h-3.5 w-3.5 fill-red-600 text-red-600" />
                <span>
                  {isBn ? settings.weddingDateBn : settings.weddingDateEn}
                </span>
                <Heart className="h-3.5 w-3.5 fill-red-600 text-red-600" />
              </div>

              <div className="mx-auto mt-3 flex w-24 items-center justify-center gap-2">
                <div className="h-px flex-1 bg-yellow-500/70" />
                <span className="text-xs text-yellow-600">✦</span>
                <div className="h-px flex-1 bg-yellow-500/70" />
              </div>
            </div>

            <div className="relative border-t border-yellow-400/60 pt-2 text-center font-serif text-[9px] font-semibold text-red-800 sm:text-[11px]">
              {isBn
                ? "আমন্ত্রণ পত্র উন্মোচিত হচ্ছে..."
                : "A Beautiful Celebration of Love"}
            </div>
          </div>

          {/* Left envelope fold */}
          <div
            className="pointer-events-none absolute inset-0 z-30 rounded-2xl bg-gradient-to-r from-[#881313] via-[#7f1d1d]/95 to-transparent"
            style={{
              clipPath: "polygon(0 0, 0 100%, 50% 50%)",
              filter: "drop-shadow(2px 0 4px rgba(0,0,0,0.2))",
            }}
          />

          {/* Right envelope fold */}
          <div
            className="pointer-events-none absolute inset-0 z-30 rounded-2xl bg-gradient-to-l from-[#881313] via-[#7f1d1d]/95 to-transparent"
            style={{
              clipPath: "polygon(100% 0, 100% 100%, 50% 50%)",
              filter: "drop-shadow(-2px 0 4px rgba(0,0,0,0.2))",
            }}
          />

          {/* Bottom envelope pocket */}
          <div
            className="pointer-events-none absolute inset-0 z-30 rounded-2xl bg-gradient-to-t from-[#450a0a] via-[#751212] to-[#991b1b]"
            style={{
              clipPath: "polygon(0 100%, 100% 100%, 50% 48%)",
              filter: "drop-shadow(0 -3px 8px rgba(0,0,0,0.25))",
            }}
          />

          {/* 3D opening top flap */}
          <div
            className="absolute left-0 right-0 top-0 z-40 h-1/2"
            style={{
              transformOrigin: "top center",
              transform: isFlapOpen ? "rotateX(-180deg)" : "rotateX(0deg)",
              transformStyle: "preserve-3d",
              transition: "transform 850ms cubic-bezier(0.22,1,0.36,1)",
              pointerEvents: "none",
            }}
          >
            {/* Flap front */}
            <div
              className="absolute inset-0 flex flex-col items-center justify-start rounded-t-xl border-t-2 border-yellow-400 bg-gradient-to-b from-[#a51c1c] via-[#8f1515] to-[#600e0e] pt-3 shadow-[0_8px_18px_rgba(0,0,0,0.3)]"
              style={{
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                backfaceVisibility: "hidden",
              }}
            >
              <div className="flex items-center gap-2 pt-1 text-yellow-300">
                <span className="text-xs">✦</span>
                <span className="font-serif text-[11px] font-bold tracking-[0.2em] sm:text-sm">
                  {isBn
                    ? "পরম স্নেহের শুভ আমন্ত্রণ"
                    : "Grand Wedding Reception"}
                </span>
                <span className="text-xs">✦</span>
              </div>
            </div>

            {/* Flap gold reverse */}
            <div
              className="absolute inset-0 flex items-center justify-center border border-yellow-500 bg-gradient-to-br from-yellow-200 via-yellow-300 to-yellow-500 shadow-inner"
              style={{
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                transform: "rotateX(180deg)",
                backfaceVisibility: "hidden",
              }}
            >
              <span className="mb-3 font-serif text-xl text-red-900/60">ॐ</span>
            </div>
          </div>

          {/* Gold ribbon */}
          <div
            className={`pointer-events-none absolute left-0 right-0 top-1/2 z-40 flex h-9 -translate-y-1/2 items-center justify-between border-y-2 border-yellow-500 bg-gradient-to-r from-yellow-500 via-yellow-200 to-yellow-500 px-3 shadow-md transition-all duration-500 ${
              isIdle ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-red-800" />

            {/* <span className="font-serif text-[10px] font-bold tracking-wider text-red-950 sm:text-xs">
              {isBn ? "পরম স্নেহের শুভ আমন্ত্রণ" : "Royal Wedding Invitation"}
            </span> */}

            <span className="h-2 w-2 rounded-full bg-red-800" />
          </div>

          {/* Wax seal */}
          <div
            className={`absolute left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
              isIdle
                ? "scale-100 opacity-100 group-hover:scale-110"
                : animStage === "unsealing"
                  ? "scale-125 rotate-12 opacity-0"
                  : "pointer-events-none scale-50 opacity-0"
            }`}
          >
            {/* Gold outer ring */}
            <div className="relative flex h-[76px] w-[76px] items-center justify-center rounded-full border-[4px] border-yellow-400 bg-gradient-to-br from-red-500 via-red-800 to-red-950 shadow-[0_0_25px_rgba(250,204,21,0.55),0_12px_25px_rgba(0,0,0,0.5)] sm:h-[88px] sm:w-[88px]">
              <div className="flex h-[58px] w-[58px] flex-col items-center justify-center rounded-full border-2 border-dashed border-yellow-300 bg-red-900/80 text-yellow-300 shadow-inner sm:h-[68px] sm:w-[68px]">
                <Heart className="h-4 w-4 animate-pulse fill-yellow-400 text-yellow-400" />

                <span className="mt-1 font-serif text-[10px] font-bold tracking-wider">
                  {isBn ? "অ & অ" : "A & A"}
                </span>
              </div>

              <div className="absolute -right-1 -top-1 rounded-full bg-yellow-400 p-1.5 text-red-950 shadow-lg">
                <Sparkles className="h-3 w-3" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Instructions and buttons */}
      <div className="relative z-50 mt-5 flex flex-col items-center gap-3 text-center sm:mt-7">
        {isIdle ? (
          <>
            <button
              type="button"
              onClick={handleStartOpening}
              className="group flex items-center gap-3 rounded-full border-2 border-yellow-200 bg-gradient-to-r from-yellow-500 via-yellow-300 to-yellow-500 px-6 py-3 font-serif text-sm font-bold text-red-950 shadow-[0_8px_30px_rgba(250,204,21,0.2)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_35px_rgba(250,204,21,0.35)] active:scale-95 sm:px-8 sm:py-3.5 sm:text-base"
            >
              <span>
                {isBn
                  ? "✉️ খাম খুলতে এখানে ক্লিক করুন"
                  : "✉️ Open Your Invitation"}
              </span>

              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <span className="font-serif text-xs text-yellow-200/80">
                {isBn ? "বা মোমচিহ্নে ট্যাপ করুন" : "Or tap the wax seal"}
              </span>

              <span className="text-yellow-400/50">•</span>

              <button
                type="button"
                onClick={handleDirectOpen}
                className="font-serif text-xs text-yellow-300 underline decoration-yellow-400/50 underline-offset-4 transition-colors hover:text-white"
              >
                {isBn ? "সরাসরি আমন্ত্রণ দেখুন ›" : "Skip to invitation ›"}
              </button>
            </div>
          </>
        ) : (
          <div className="inline-flex items-center gap-2 rounded-full border border-yellow-400/70 bg-red-950/90 px-5 py-3 font-serif text-xs font-bold text-yellow-300 shadow-lg sm:text-sm">
            <Sparkles className="h-4 w-4 animate-spin text-yellow-400" />

            <span>
              {isBn
                ? "আমন্ত্রণ পত্র উন্মোচিত হচ্ছে..."
                : "Opening Your Grand Wedding Reception Invitation..."}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
