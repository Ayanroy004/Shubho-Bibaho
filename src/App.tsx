
import { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from 'react-router-dom';

import {
  initialWeddingSettings,
  initialGuestbookEntries,
} from './weddingData';

import type {
  WeddingSettings,
  RSVPSubmission,
  Language,
} from './types';

import { weddingAudio } from './utils/audioPlayer';
import { EnvelopeOpening } from './components/EnvelopeOpening';
import { TopNavBar } from './components/TopNavBar';
import { BottomNavBar } from './components/BottomNavBar';
import { PageSelectModal } from './components/PageSelectModal';

import { Page1DateWedding } from './pages/Page1DateWedding';
import { Page2BoyGirlDetails } from './pages/Page2BoyGirlDetails';
import { Page3ChapterIndex } from './pages/Page3ChapterIndex';
import { Page4Story } from './pages/Page4Story';
import { Page5Ceremonies } from './pages/Page5Ceremonies';
import { Page6Gallery } from './pages/Page6Gallery';
import { Page7VenueMap } from './pages/Page7VenueMap';
import { Page8RSVP } from './pages/Page8RSVP';
import { Page9TraditionalLetter } from './pages/Page9TraditionalLetter';

const pageRoutes = [
  '/wedding',
  '/couple',
  '/chapters',
  '/story',
  '/ceremonies',
  '/gallery',
  '/venue',
  '/rsvp',
  '/letter',
];

function WeddingApp() {
  const navigate = useNavigate();
  const location = useLocation();

  const [showingEnvelope, setShowingEnvelope] = useState(
    location.pathname === '/'
  );

  const [language, setLanguage] = useState<Language>('bn');
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isPageModalOpen, setIsPageModalOpen] = useState(false);

  const [settings] = useState<WeddingSettings>(() => {
    try {
      const stored = localStorage.getItem(
        'wedding_invitation_settings'
      );
      return stored
        ? JSON.parse(stored)
        : initialWeddingSettings;
    } catch {
      return initialWeddingSettings;
    }
  });

  const [rsvps, setRsvps] = useState<RSVPSubmission[]>(() => {
    try {
      const stored = localStorage.getItem(
        'wedding_invitation_rsvps'
      );
      return stored
        ? JSON.parse(stored)
        : initialGuestbookEntries;
    } catch {
      return initialGuestbookEntries;
    }
  });

  const currentPage = pageRoutes.indexOf(location.pathname) + 1;

  const handlePageChange = (pageNum: number) => {
    if (pageNum >= 1 && pageNum <= 9) {
      setShowingEnvelope(false);
      navigate(pageRoutes[pageNum - 1]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleAddRSVP = (newRsvp: RSVPSubmission) => {
    setRsvps((previous) => {
      const updated = [newRsvp, ...previous];

      try {
        localStorage.setItem(
          'wedding_invitation_rsvps',
          JSON.stringify(updated)
        );
      } catch {
        // Ignore storage errors.
      }

      return updated;
    });
  };

  const handleStartMusic = () => {
    weddingAudio.play();
    setIsMusicPlaying(true);
  };

  const handleToggleMusic = () => {
    setIsMusicPlaying(weddingAudio.toggle());
  };

  const handleOpenEnvelopeComplete = () => {
    setShowingEnvelope(false);
    navigate('/wedding');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (!weddingAudio.getStatus()) {
      weddingAudio.play();
      setIsMusicPlaying(true);
    }
  };

  const handleReturnToEnvelope = () => {
    setShowingEnvelope(true);
    navigate('/');
  };

  const handleSelectEnvelope = () => {
    setShowingEnvelope(true);
    setIsPageModalOpen(false);
    navigate('/');
  };

  if (showingEnvelope && location.pathname === '/') {
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
    <div className="min-h-screen w-full bg-red-950 text-white font-bengali relative flex flex-col justify-between">
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(#b91c1c_1px,transparent_1px)] [background-size:20px_20px] opacity-25 z-0" />

      <TopNavBar
        language={language}
        onLanguageChange={setLanguage}
        isMusicPlaying={isMusicPlaying}
        onToggleMusic={handleToggleMusic}
        onReturnToEnvelope={handleReturnToEnvelope}
        onOpenPageMenu={() => setIsPageModalOpen(true)}
        currentPage={currentPage || 1}
        totalPages={9}
      />

      <main className="relative z-10 flex-1 flex flex-col justify-start items-center py-3 sm:py-5 px-1 sm:px-2 w-full">
        <Routes>
          <Route
            path="/wedding"
            element={
              <Page1DateWedding
                settings={settings}
                language={language}
                onNextPage={() => handlePageChange(2)}
                onGoToRSVP={() => handlePageChange(8)}
              />
            }
          />

          <Route
            path="/couple"
            element={
              <Page2BoyGirlDetails
                settings={settings}
                language={language}
                onNextPage={() => handlePageChange(3)}
              />
            }
          />

          <Route
            path="/chapters"
            element={
              <Page3ChapterIndex
                language={language}
                onNavigatePage={handlePageChange}
              />
            }
          />

          <Route
            path="/story"
            element={
              <Page4Story
                settings={settings}
                language={language}
                onNextPage={() => handlePageChange(5)}
                onGoToIndex={() => handlePageChange(3)}
              />
            }
          />

          <Route
            path="/ceremonies"
            element={
              <Page5Ceremonies
                language={language}
                onNextPage={() => handlePageChange(6)}
                onGoToIndex={() => handlePageChange(3)}
              />
            }
          />

          <Route
            path="/gallery"
            element={
              <Page6Gallery
                language={language}
                onNextPage={() => handlePageChange(7)}
                onGoToIndex={() => handlePageChange(3)}
              />
            }
          />

          <Route
            path="/venue"
            element={
              <Page7VenueMap
                settings={settings}
                language={language}
                onNextPage={() => handlePageChange(8)}
                onGoToIndex={() => handlePageChange(3)}
              />
            }
          />

          <Route
            path="/rsvp"
            element={
              <Page8RSVP
                settings={settings}
                language={language}
                rsvps={rsvps}
                onAddRSVP={handleAddRSVP}
                onNextPage={() => handlePageChange(9)}
                onGoToIndex={() => handlePageChange(3)}
              />
            }
          />

          <Route
            path="/letter"
            element={
              <Page9TraditionalLetter
                settings={settings}
                language={language}
                onRestartToEnvelope={handleSelectEnvelope}
                onGoToIndex={() => handlePageChange(3)}
              />
            }
          />

          <Route
            path="*"
            element={
              <Page1DateWedding
                settings={settings}
                language={language}
                onNextPage={() => handlePageChange(2)}
                onGoToRSVP={() => handlePageChange(8)}
              />
            }
          />
        </Routes>
      </main>

      <BottomNavBar
        currentPage={currentPage || 1}
        totalPages={9}
        onPageChange={handlePageChange}
        language={language}
      />

      <PageSelectModal
        isOpen={isPageModalOpen}
        onClose={() => setIsPageModalOpen(false)}
        currentPage={currentPage || 1}
        onSelectPage={(page) => {
          handlePageChange(page);
          setIsPageModalOpen(false);
        }}
        onSelectEnvelope={handleSelectEnvelope}
        language={language}
      />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <WeddingApp />
    </BrowserRouter>
  );
}
