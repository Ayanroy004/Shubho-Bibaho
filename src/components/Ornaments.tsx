import React from 'react';

export const KolkaOrnament: React.FC<{ className?: string }> = ({ className = 'w-6 h-6 text-yellow-400' }) => (
  <svg viewBox="0 0 100 100" fill="currentColor" className={className}>
    <path d="M50 0 C60 25 85 30 85 55 C85 75 68 95 45 95 C25 95 15 75 15 55 C15 35 35 25 45 15 C48 10 49 5 50 0 Z M45 30 C35 40 30 50 30 60 C30 72 38 82 50 82 C62 82 70 72 70 60 C70 45 55 40 45 30 Z" />
  </svg>
);

export const GaneshaCrest: React.FC<{ className?: string }> = ({ className = 'w-12 h-12 text-yellow-400' }) => (
  <svg viewBox="0 0 100 100" fill="currentColor" className={className}>
    <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray="3 2" />
    <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <path d="M50 20 C42 20 38 25 38 32 C38 42 48 44 48 52 C48 58 44 64 36 64 C32 64 28 62 26 58" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    <circle cx="48" cy="28" r="3" fill="currentColor" />
    <path d="M54 28 C64 28 70 36 70 48 C70 62 60 76 46 80" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    <path d="M52 38 C58 38 62 42 62 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="52" cy="18" r="2.5" fill="currentColor" />
    <path d="M42 14 L50 6 L58 14 Z" fill="currentColor" />
  </svg>
);

export const MandapDivider: React.FC<{ className?: string }> = ({ className = 'my-4' }) => (
  <div className={`flex items-center justify-center gap-2 sm:gap-3 ${className}`}>
    <div className="h-[1.5px] w-10 sm:w-20 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
    <div className="flex items-center gap-1 text-yellow-400">
      <span className="text-[10px] sm:text-xs">✦</span>
      <span className="text-sm sm:text-base font-serif">ॐ</span>
      <span className="text-[10px] sm:text-xs">✦</span>
    </div>
    <div className="h-[1.5px] w-10 sm:w-20 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
  </div>
);

export const RoyalFrame: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`relative p-3.5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-white border-2 border-yellow-400 shadow-[0_10px_35px_rgba(127,29,29,0.25)] ${className}`}>
    {/* Corner Ornaments */}
    <div className="ornate-corner-tl" />
    <div className="ornate-corner-tr" />
    <div className="ornate-corner-bl" />
    <div className="ornate-corner-br" />
    {children}
  </div>
);
