import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
  HashRouter,
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
  // "/chapters",
  // "/story",
  "/ceremonies",
  // "/gallery",
  "/venue",
  // "/rsvp",
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

  const [language, setLanguage] = useState<Language>("en");
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
      {/* Expanded responsive Bengali wedding background */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      >
        {/* Warm red glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(153,27,27,0.4),transparent_75%)]" />

        {/* Reusable floral ornament */}
        {[
          "left-0 top-0",
          "right-0 top-0 -scale-x-100",
          "bottom-0 left-0 rotate-180",
          "bottom-0 right-0 rotate-180 -scale-x-100",
        ].map((position, index) => (
          <svg
            key={index}
            viewBox="0 0 120 120"
            className={`absolute h-24 w-24 text-amber-200/40 sm:h-32 sm:w-32 lg:h-40 lg:w-40 ${position}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M0 115 Q12 55 70 38 Q82 16 120 0" />
            <path d="M0 85 Q24 85 30 56 Q52 66 70 38" />
            <circle cx="42" cy="42" r="20" />
            <circle cx="42" cy="42" r="10" />

            {Array.from({ length: 12 }, (_, i) => (
              <g key={i} transform={`rotate(${i * 30} 42 42)`}>
                <path d="M42 32 Q30 20 42 10 Q54 20 42 32Z" />
              </g>
            ))}

            <circle cx="42" cy="42" r="3" fill="currentColor" />

            {/* Leaves */}
            <path d="M18 74 Q0 55 4 42 Q24 49 18 74Z" />
            <path d="M34 57 Q24 35 35 24 Q49 41 34 57Z" />
            <path d="M63 40 Q60 18 80 14 Q82 33 63 40Z" />

            {/* Small flower */}
            <g transform="translate(18 94)">
              {Array.from({ length: 6 }, (_, i) => (
                <ellipse
                  key={i}
                  cx="0"
                  cy="-5"
                  rx="3"
                  ry="6"
                  transform={`rotate(${i * 60})`}
                />
              ))}
              <circle r="2" fill="currentColor" />
            </g>
          </svg>
        ))}

        {/* Left and right decorative vines */}
        {[0, 1].map((side) => (
          <svg
            key={side}
            viewBox="0 0 70 600"
            preserveAspectRatio="none"
            className={`absolute top-[12%] h-[76%] w-10 text-amber-200/30 sm:w-14 lg:w-20 ${
              side === 0 ? "left-0" : "right-0 -scale-x-100"
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.1"
            strokeLinecap="round"
          >
            <path d="M8 0 Q58 50 15 100 T15 200 T15 300 T15 400 T15 500 T8 600" />

            {Array.from({ length: 12 }, (_, i) => {
              const y = 20 + i * 48;
              return (
                <g
                  key={i}
                  transform={`translate(${i % 2 === 0 ? 18 : 30} ${y})`}
                >
                  <path d="M0 0 Q-20 -12 -15 -28 Q2 -22 0 0Z" />
                  <path d="M0 0 Q20 -12 15 -28 Q-2 -22 0 0Z" />
                  <circle cy="3" r="2" fill="currentColor" />
                </g>
              );
            })}
          </svg>
        ))}

        {/* Extra floral motifs along the edges */}
        {Array.from({ length: 10 }, (_, i) => (
          <svg
            key={i}
            viewBox="0 0 40 40"
            className={`absolute h-7 w-7 text-amber-200/35 sm:h-9 sm:w-9 lg:h-11 lg:w-11 ${
              i % 2 === 0 ? "left-[7%]" : "right-[7%]"
            }`}
            style={{ top: `${12 + i * 8}%` }}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            {Array.from({ length: 8 }, (_, j) => (
              <ellipse
                key={j}
                cx="20"
                cy="10"
                rx="3"
                ry="8"
                transform={`rotate(${j * 45} 20 20)`}
              />
            ))}
            <circle cx="20" cy="20" r="3" fill="currentColor" />
          </svg>
        ))}

        {/* Gold dotted border */}
        <div className="absolute bottom-5 left-3 top-5 border-l border-dashed border-amber-200/25 sm:left-5 lg:left-8" />
        <div className="absolute bottom-5 right-3 top-5 border-r border-dashed border-amber-200/25 sm:right-5 lg:right-8" />

        {/* Decorative top and bottom lines */}
        <div className="absolute left-[18%] right-[18%] top-3 border-t border-amber-200/20" />
        <div className="absolute bottom-3 left-[18%] right-[18%] border-t border-amber-200/20" />

        {/* Tiny golden stars */}
        {Array.from({ length: 32 }, (_, i) => (
          <span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-amber-200/40"
            style={{
              left: `${5 + ((i * 29) % 90)}%`,
              top: `${5 + ((i * 37) % 90)}%`,
            }}
          />
        ))}
      </div>

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
                onGoToRSVP={() => handlePageChange(6)}
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
          {/* <Route
            path="/chapters"
            element={
              <Page3ChapterIndex
                language={language}
                onNavigatePage={handlePageChange}
              />
            }
          /> */}

          {/* Page 4: Our story */}
          {/* <Route
            path="/story"
            element={
              <Page4Story
                settings={settings}
                language={language}
                onNextPage={() => handlePageChange(5)}
                onGoToIndex={() => handlePageChange(3)}
              />
            }
          /> */}

          {/* Page 5: Wedding ceremonies */}
          <Route
            path="/ceremonies"
            element={
              <Page5Ceremonies
                language={language}
                onNextPage={() => handlePageChange(4)}
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
                onNextPage={() => handlePageChange(5)}
                onGoToIndex={() => handlePageChange(4)}
              />
            }
          />

          {/* Page 8: RSVP and guestbook */}
          {/* <Route
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
          /> */}

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
    <HashRouter>
      <WeddingApp />
    </HashRouter>
  );
}
