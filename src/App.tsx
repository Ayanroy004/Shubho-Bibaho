import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { initialWeddingSettings, initialGuestbookEntries } from "./weddingData";

import type { WeddingSettings, RSVPSubmission, Language } from "./types";

import { weddingAudio } from "./utils/audioPlayer";

import { EnvelopeOpening } from "./components/EnvelopeOpening";
import { TopNavBar } from "./components/TopNavBar";
import { BottomNavBar } from "./components/BottomNavBar";
import { PageSelectModal } from "./components/PageSelectModal";

import { Page1DateWedding } from "./pages/Page1DateWedding";
import { Page2BoyGirlDetails } from "./pages/Page2BoyGirlDetails";
import { Page3ChapterIndex } from "./pages/Page3ChapterIndex";
import { Page4Story } from "./pages/Page4Story";
import { Page5Ceremonies } from "./pages/Page5Ceremonies";
import { Page6Gallery } from "./pages/Page6Gallery";
import { Page7VenueMap } from "./pages/Page7VenueMap";
import { Page8RSVP } from "./pages/Page8RSVP";
import { Page9TraditionalLetter } from "./pages/Page9TraditionalLetter";
import { Page10Company } from "./pages/Page10Company";

const PAGE_ROUTES = [
  "/wedding",
  "/couple",
  "/chapters",
  // "/story",
  "/ceremonies",
  // "/gallery",
  "/venue",
  "/rsvp",
  "/letter",
  "/company-details",
] as const;

const TOTAL_PAGES = PAGE_ROUTES.length;

function WeddingApp() {
  const navigate = useNavigate();
  const location = useLocation();

  const [showingEnvelope, setShowingEnvelope] = useState(
    location.pathname === "/",
  );

  const [language, setLanguage] = useState<Language>("bn");
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isPageModalOpen, setIsPageModalOpen] = useState(false);

  const [settings] = useState<WeddingSettings>(() => {
    try {
      const stored = localStorage.getItem("wedding_invitation_settings");

      return stored ? JSON.parse(stored) : initialWeddingSettings;
    } catch {
      return initialWeddingSettings;
    }
  });

  const [rsvps, setRsvps] = useState<RSVPSubmission[]>(() => {
    try {
      const stored = localStorage.getItem("wedding_invitation_rsvps");

      return stored ? JSON.parse(stored) : initialGuestbookEntries;
    } catch {
      return initialGuestbookEntries;
    }
  });

  // Keep the envelope state in sync with browser back/forward navigation.
  useEffect(() => {
    setShowingEnvelope(location.pathname === "/");
  }, [location.pathname]);

  // Save RSVP entries whenever they change.
  useEffect(() => {
    try {
      localStorage.setItem("wedding_invitation_rsvps", JSON.stringify(rsvps));
    } catch {
      // Continue working if browser storage is unavailable.
    }
  }, [rsvps]);

  // Change the music track when the selected language changes.
  // If music is already playing, the new track continues playing.
  // If music is stopped, changing language will not start it.
  useEffect(() => {
    let isActive = true;

    const updateMusicLanguage = async () => {
      const wasPlaying = weddingAudio.getStatus();

      if (wasPlaying) {
        const playing = await weddingAudio.play(language);

        if (isActive) {
          setIsMusicPlaying(playing);
        }
      } else {
        weddingAudio.init(language);

        if (isActive) {
          setIsMusicPlaying(false);
        }
      }
    };

    void updateMusicLanguage();

    return () => {
      isActive = false;
    };
  }, [language]);

  const currentPageIndex = PAGE_ROUTES.indexOf(
    location.pathname as (typeof PAGE_ROUTES)[number],
  );

  const currentPage = currentPageIndex >= 0 ? currentPageIndex + 1 : 1;

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > TOTAL_PAGES) return;

    setShowingEnvelope(false);
    setIsPageModalOpen(false);

    navigate(PAGE_ROUTES[pageNumber - 1]);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleAddRSVP = (newRsvp: RSVPSubmission) => {
    setRsvps((previous) => [newRsvp, ...previous]);
  };

  const handleStartMusic = async () => {
    const playing = await weddingAudio.play(language);
    setIsMusicPlaying(playing);
  };

  const handleToggleMusic = async () => {
    if (weddingAudio.getStatus()) {
      weddingAudio.stop();
      setIsMusicPlaying(false);
    } else {
      const playing = await weddingAudio.play(language);
      setIsMusicPlaying(playing);
    }
  };

  const handleOpenEnvelopeComplete = () => {
    setShowingEnvelope(false);
    navigate("/wedding");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    if (!weddingAudio.getStatus()) {
      void handleStartMusic();
    }
  };

  const handleReturnToEnvelope = () => {
    setShowingEnvelope(true);
    setIsPageModalOpen(false);
    navigate("/");
  };

  const handleSelectEnvelope = () => {
    setShowingEnvelope(true);
    setIsPageModalOpen(false);
    navigate("/");
  };

  if (showingEnvelope && location.pathname === "/") {
    return (
      <main className="min-h-screen w-full bg-red-950">
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
    <div className="relative flex min-h-screen w-full flex-col justify-between bg-red-950 font-bengali text-white">
      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(#b91c1c_1px,transparent_1px)] [background-size:20px_20px] opacity-25"
      />

      <TopNavBar
        language={language}
        onLanguageChange={setLanguage}
        isMusicPlaying={isMusicPlaying}
        onToggleMusic={handleToggleMusic}
        onReturnToEnvelope={handleReturnToEnvelope}
        onOpenPageMenu={() => setIsPageModalOpen(true)}
        currentPage={currentPage}
        totalPages={TOTAL_PAGES}
      />

      <main className="relative z-10 flex w-full flex-1 flex-col items-center justify-start px-1 py-3 sm:px-3 sm:py-5">
        <Routes>
          {/* Page 1: Wedding date */}
          <Route
            path="/wedding"
            element={
              <Page1DateWedding
                settings={settings}
                language={language}
                onNextPage={() => handlePageChange(2)}
                onGoToRSVP={() => handlePageChange(7)}
              />
            }
          />

          {/* Page 2: Couple details */}
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

          {/* Page 3: Chapter index */}
          <Route
            path="/chapters"
            element={
              <Page3ChapterIndex
                language={language}
                onNavigatePage={handlePageChange}
              />
            }
          />

          {/* Page 4: Our story */}
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

          {/* Page 5: Wedding ceremonies */}
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

          {/* Page 6: Gallery */}
          {/* <Route
            path="/gallery"
            element={
              <Page6Gallery
                language={language}
                onNextPage={() => handlePageChange(7)}
                onGoToIndex={() => handlePageChange(3)}
              />
            }
          /> */}

          {/* Page 7: Venue and map */}
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

          {/* Page 8: RSVP and guestbook */}
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

          {/* Page 9: Traditional invitation letter */}
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

          {/* Page 10:  company details */}
          <Route
            path="/company-details"
            element={
              <Page10Company
                language={language}
                onNextPage={() => handlePageChange(1)}
                onGoToIndex={() => handlePageChange(3)}
              />
            }
          />

          {/* Unknown URLs go to the first wedding page */}
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
        currentPage={currentPage}
        totalPages={TOTAL_PAGES}
        onPageChange={handlePageChange}
        language={language}
      />

      <PageSelectModal
        isOpen={isPageModalOpen}
        onClose={() => setIsPageModalOpen(false)}
        currentPage={currentPage}
        onSelectPage={handlePageChange}
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
