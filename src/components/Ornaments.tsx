import React from "react";

export const KolkaOrnament: React.FC<{ className?: string }> = ({
  className = "w-6 h-6 text-yellow-400",
}) => (
  <svg viewBox="0 0 100 100" fill="currentColor" className={className}>
    <path d="M50 0 C60 25 85 30 85 55 C85 75 68 95 45 95 C25 95 15 75 15 55 C15 35 35 25 45 15 C48 10 49 5 50 0 Z M45 30 C35 40 30 50 30 60 C30 72 38 82 50 82 C62 82 70 72 70 60 C70 45 55 40 45 30 Z" />
  </svg>
);

export const GaneshaCrest: React.FC<{ className?: string }> = ({
  className = "w-12 h-12 text-yellow-400",
}) => (
  <svg viewBox="0 0 100 100" fill="currentColor" className={className}>
    <circle
      cx="50"
      cy="50"
      r="46"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeDasharray="3 2"
    />
    <circle
      cx="50"
      cy="50"
      r="40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M50 20 C42 20 38 25 38 32 C38 42 48 44 48 52 C48 58 44 64 36 64 C32 64 28 62 26 58"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <circle cx="48" cy="28" r="3" fill="currentColor" />
    <path
      d="M54 28 C64 28 70 36 70 48 C70 62 60 76 46 80"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M52 38 C58 38 62 42 62 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle cx="52" cy="18" r="2.5" fill="currentColor" />
    <path d="M42 14 L50 6 L58 14 Z" fill="currentColor" />
  </svg>
);

export const MandapDivider: React.FC<{ className?: string }> = ({
  className = "my-4",
}) => (
  <div
    className={`flex items-center justify-center gap-2 sm:gap-3 ${className}`}
  >
    <div className="h-[1.5px] w-10 sm:w-20 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
    <div className="flex items-center gap-1 text-yellow-400">
      <span className="text-[10px] sm:text-xs">✦</span>
      <span className="text-sm sm:text-base font-serif">ॐ</span>
      <span className="text-[10px] sm:text-xs">✦</span>
    </div>
    <div className="h-[1.5px] w-10 sm:w-20 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
  </div>
);



export const RoyalFrame: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => (
  <div
    className={`relative isolate overflow-hidden rounded-2xl border-2 border-yellow-400 bg-[#fffaf0] p-3.5 shadow-[0_10px_35px_rgba(127,29,29,0.25)] sm:rounded-3xl sm:p-6 md:p-8 ${className}`}
  >
    {/* Traditional Bengali Alpana Background */}
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {/* Warm handmade-paper base */}
      <div className="absolute inset-0 bg-[#fffaf0]" />

      {/* Soft ivory glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.85),transparent_75%)]" />

      {/* Top-left circular alpana mandala */}
      <svg
        viewBox="0 0 240 240"
        className="absolute -left-16 top-20 h-52 w-52 text-red-800/25 sm:-left-20 sm:h-64 sm:w-64"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="120" cy="120" r="94" strokeDasharray="2 5" />
        <circle cx="120" cy="120" r="76" />
        <circle cx="120" cy="120" r="58" />

        {Array.from({ length: 16 }, (_, i) => (
          <g key={i} transform={`rotate(${i * 22.5} 120 120)`}>
            <path d="M120 62 Q101 42 120 20 Q139 42 120 62Z" />
            <path d="M120 78 Q107 65 120 51 Q133 65 120 78Z" />
            <circle cx="120" cy="13" r="2" fill="currentColor" />
          </g>
        ))}

        <circle cx="120" cy="120" r="34" />
        <circle cx="120" cy="120" r="23" />

        {Array.from({ length: 8 }, (_, i) => (
          <ellipse
            key={i}
            cx="120"
            cy="103"
            rx="8"
            ry="17"
            transform={`rotate(${i * 45} 120 120)`}
          />
        ))}

        <circle cx="120" cy="120" r="5" fill="currentColor" />
      </svg>

      {/* Bottom-right golden lotus mandala */}
      <svg
        viewBox="0 0 240 240"
        className="absolute -bottom-16 -right-16 h-56 w-56 text-yellow-700/30 sm:-bottom-20 sm:-right-20 sm:h-72 sm:w-72"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="120" cy="120" r="92" strokeDasharray="3 6" />
        <circle cx="120" cy="120" r="70" />

        {Array.from({ length: 12 }, (_, i) => (
          <g key={i} transform={`rotate(${i * 30} 120 120)`}>
            <path d="M120 120 Q91 91 120 51 Q149 91 120 120Z" />
            <path d="M120 112 Q107 91 120 76 Q133 91 120 112Z" />
            <circle cx="120" cy="42" r="2.5" fill="currentColor" />
          </g>
        ))}

        <circle cx="120" cy="120" r="25" />
        <circle cx="120" cy="120" r="9" />
      </svg>

      {/* Small alpana flowers along the sides */}
      {Array.from({ length: 8 }, (_, i) => (
        <svg
          key={i}
          viewBox="0 0 50 50"
          className={`absolute h-8 w-8 text-red-800/30 sm:h-10 sm:w-10 ${
            i % 2 === 0 ? "left-[5%]" : "right-[5%]"
          }`}
          style={{ top: `${12 + i * 10}%` }}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
        >
          {Array.from({ length: 8 }, (_, j) => (
            <ellipse
              key={j}
              cx="25"
              cy="15"
              rx="4"
              ry="10"
              transform={`rotate(${j * 45} 25 25)`}
            />
          ))}
          <circle cx="25" cy="25" r="4" />
          <circle cx="25" cy="25" r="1.5" fill="currentColor" />
        </svg>
      ))}

      {/* Small traditional dotted details */}
      {Array.from({ length: 32 }, (_, i) => (
        <span
          key={i}
          className="absolute h-1 w-1 rounded-full bg-red-800/25"
          style={{
            left: `${8 + ((i * 31) % 84)}%`,
            top: `${6 + ((i * 23) % 88)}%`,
          }}
        />
      ))}

      {/* Fine inner gold outline */}
      <div className="absolute inset-2 rounded-xl border border-yellow-700/25 sm:inset-3 sm:rounded-2xl" />
    </div>

    {/* Existing corner ornaments */}
    <div className="pointer-events-none absolute inset-0 z-20">
      <div className="ornate-corner-tl" />
      <div className="ornate-corner-tr" />
      <div className="ornate-corner-bl" />
      <div className="ornate-corner-br" />
    </div>

    {/* Invitation content stays above the alpana background */}
    <div className="relative z-10">{children}</div>
  </div>
);
