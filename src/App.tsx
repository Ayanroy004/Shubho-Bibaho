/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { initialWeddingSettings, initialGuestbookEntries } from './weddingData';
import { WeddingSettings, RSVPSubmission, Language } from './types';
import { weddingAudio } from './utils/audioPlayer';
import { EnvelopeOpening } from './components/EnvelopeOpening';
import { TopNavBar } from './components/TopNavBar';
import { BottomNavBar } from './components/BottomNavBar';
import { PageSelectModal } from './components/PageSelectModal';

// Pages
import { Page1DateWedding } from './pages/Page1DateWedding';
import { Page2BoyGirlDetails } from './pages/Page2BoyGirlDetails';
import { Page3ChapterIndex } from './pages/Page3ChapterIndex';
import { Page4Story } from './pages/Page4Story';
import { Page5Ceremonies } from './pages/Page5Ceremonies';
import { Page6Gallery } from './pages/Page6Gallery';
import { Page7VenueMap } from './pages/Page7VenueMap';
import { Page8RSVP } from './pages/Page8RSVP';
import { Page9TraditionalLetter } from './pages/Page9TraditionalLetter';

export default function App() {
  const [showingEnvelope, setShowingEnvelope] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [language, setLanguage] = useState<Language>('bn');
  const [isMusicPlaying, setIsMusicPlaying] = useState<boolean>(false);
  const [isPageModalOpen, setIsPageModalOpen] = useState<boolean>(false);

  // Invitation settings
  const [settings] = useState<WeddingSettings>(() => {
    try {
      const stored = localStorage.getItem('wedding_invitation_settings');
      return stored ? JSON.parse(stored) : initialWeddingSettings;
    } catch {
      return initialWeddingSettings;
    }
  });

  // Persistent RSVPs & Guestbook
  const [rsvps, setRsvps] = useState<RSVPSubmission[]>(() => {
    try {
      const stored = localStorage.getItem('wedding_invitation_rsvps');
      return stored ? JSON.parse(stored) : initialGuestbookEntries;
    } catch {
      return initialGuestbookEntries;
    }
  });

  const handleAddRSVP = (newRsvp: RSVPSubmission) => {
    const updated = [newRsvp, ...rsvps];
    setRsvps(updated);
    try {
      localStorage.setItem('wedding_invitation_rsvps', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleStartMusic = () => {
    weddingAudio.play();
    setIsMusicPlaying(true);
  };

  const handleToggleMusic = () => {
    const nextStatus = weddingAudio.toggle();
    setIsMusicPlaying(nextStatus);
  };

  const handlePageChange = (pageNum: number) => {
    if (pageNum >= 1 && pageNum <= 9) {
      setCurrentPage(pageNum);
      setShowingEnvelope(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenEnvelopeComplete = () => {
    setShowingEnvelope(false);
    setCurrentPage(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (!weddingAudio.getStatus()) {
      weddingAudio.play();
      setIsMusicPlaying(true);
    }
  };

  if (showingEnvelope) {
    return (
      <main className="w-full min-h-screen bg-red-950">
        <EnvelopeOpening
          onOpen={handleOpenEnvelopeComplete}
          language={language}
          settings={settings}
          onStartMusic={handleStartMusic}
          isMusicPlaying={isMusicPlaying}
        />
      </main>
    );
  }

  return (
    <div className="min-h-screen w-full bg-red-950 text-white font-bengali relative flex flex-col justify-between selection:bg-yellow-400 selection:text-red-950">
      {/* Ambient background decoration in red & yellow */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(#b91c1c_1px,transparent_1px)] [background-size:20px_20px] opacity-25 z-0" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-80 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="fixed bottom-0 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none z-0" />

      {/* Top Navbar */}
      <TopNavBar
        language={language}
        onLanguageChange={setLanguage}
        isMusicPlaying={isMusicPlaying}
        onToggleMusic={handleToggleMusic}
        onReturnToEnvelope={() => setShowingEnvelope(true)}
        onOpenPageMenu={() => setIsPageModalOpen(true)}
        currentPage={currentPage}
        totalPages={9}
      />

      {/* Main Page Content */}
      <main className="relative z-10 flex-1 flex flex-col justify-start items-center py-3 sm:py-5 px-1 sm:px-2 w-full">
        {currentPage === 1 && (
          <Page1DateWedding
            settings={settings}
            language={language}
            onNextPage={() => handlePageChange(2)}
            onGoToRSVP={() => handlePageChange(8)}
          />
        )}

        {currentPage === 2 && (
          <Page2BoyGirlDetails
            settings={settings}
            language={language}
            onNextPage={() => handlePageChange(3)}
          />
        )}

        {currentPage === 3 && (
          <Page3ChapterIndex
            language={language}
            onNavigatePage={handlePageChange}
          />
        )}

        {currentPage === 4 && (
          <Page4Story
            settings={settings}
            language={language}
            onNextPage={() => handlePageChange(5)}
            onGoToIndex={() => handlePageChange(3)}
          />
        )}

        {currentPage === 5 && (
          <Page5Ceremonies
            language={language}
            onNextPage={() => handlePageChange(6)}
            onGoToIndex={() => handlePageChange(3)}
          />
        )}

        {currentPage === 6 && (
          <Page6Gallery
            language={language}
            onNextPage={() => handlePageChange(7)}
            onGoToIndex={() => handlePageChange(3)}
          />
        )}

        {currentPage === 7 && (
          <Page7VenueMap
            settings={settings}
            language={language}
            onNextPage={() => handlePageChange(8)}
            onGoToIndex={() => handlePageChange(3)}
          />
        )}

        {currentPage === 8 && (
          <Page8RSVP
            settings={settings}
            language={language}
            rsvps={rsvps}
            onAddRSVP={handleAddRSVP}
            onNextPage={() => handlePageChange(9)}
            onGoToIndex={() => handlePageChange(3)}
          />
        )}

        {currentPage === 9 && (
          <Page9TraditionalLetter
            settings={settings}
            language={language}
            onRestartToEnvelope={() => setShowingEnvelope(true)}
            onGoToIndex={() => handlePageChange(3)}
          />
        )}
      </main>

      {/* Sticky Bottom Navigation Bar */}
      <BottomNavBar
        currentPage={currentPage}
        totalPages={9}
        onPageChange={handlePageChange}
        language={language}
      />

      {/* Quick Jump Page Menu Modal */}
      <PageSelectModal
        isOpen={isPageModalOpen}
        onClose={() => setIsPageModalOpen(false)}
        currentPage={currentPage}
        onSelectPage={handlePageChange}
        onSelectEnvelope={() => setShowingEnvelope(true)}
        language={language}
      />
    </div>
  );
}
