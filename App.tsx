import React, { useState, useEffect, useRef } from "react";
import { Participant, Prize, Winner } from "./types";
import { DEFAULT_PARTICIPANTS, DEFAULT_PRIZES, STORAGE_KEY } from "./constants";
import { getEligibleParticipants, getRandomParticipant } from "./utils";
import { SettingsModal } from "./components/SettingsModal";
import { CelebrationModal } from "./components/CelebrationModal";
import { ResultsListModal } from "./components/ResultsListModal";
import { ParticipantsListModal } from "./components/ParticipantsListModal";
import {
  Settings,
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  Trophy,
  Users,
  List,
  Github,
  Hourglass,
} from "lucide-react";

// AUDIO CONFIGURATION
const AUDIO_PATHS = {
  COMING: "/sounds/nhac.mp3", // game-sm-jackpot-coming (Nhạc nền quay)
  ROLLER: "/sounds/sm-roller-loop.mp3", // sm-roller-loop (Số cuối)
  WIN: "/sounds/game-sm-jackpot-win.mp3", // game-sm-jackpot-win (Chốt giải)
  CHEER: "/sounds/crowd-cheer-in-school.mp3", // cheer (Bắn pháo hoa)
  CLICK: "/sounds/sm-bet.mp3", // Tiếng tạch tạch khi từng số dừng
};

const App: React.FC = () => {
  // --- State ---
  const [participants, setParticipants] =
    useState<Participant[]>(DEFAULT_PARTICIPANTS);
  const [prizes, setPrizes] = useState<Prize[]>(DEFAULT_PRIZES);
  const [winners, setWinners] = useState<Winner[]>([]);
  const [currentPrizeId, setCurrentPrizeId] = useState<string>(
    DEFAULT_PRIZES[0].id,
  );

  const [isSpinning, setIsSpinning] = useState(false);
  const [displayParticipant, setDisplayParticipant] =
    useState<Participant | null>(null);

  // Animation State
  const [targetWinner, setTargetWinner] = useState<Winner | null>(null);
  const [revealedCount, setRevealedCount] = useState(0); // 0 to 5

  // Modal States
  const [activeModal, setActiveModal] = useState<
    "settings" | "results" | "participants" | null
  >(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [lastWinner, setLastWinner] = useState<Winner | null>(null);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [isSuspenseMode, setIsSuspenseMode] = useState(false);
  const [isSpinPaused, setIsSpinPaused] = useState(false);

  // --- Refs for Audio & Timers ---
  const spinIntervalRef = useRef<number | null>(null);

  // Audio Refs
  const audioComingRef = useRef<HTMLAudioElement | null>(null);
  const audioRollerRef = useRef<HTMLAudioElement | null>(null);
  const audioWinRef = useRef<HTMLAudioElement | null>(null);
  const audioCheerRef = useRef<HTMLAudioElement | null>(null);
  const audioClickRef = useRef<HTMLAudioElement | null>(null);

  // --- Derived State ---
  const currentPrizeIndex = prizes.findIndex((p) => p.id === currentPrizeId);
  const currentPrize = prizes[currentPrizeIndex] || prizes[0];
  const currentWinners = winners.filter((w) => w.prizeId === currentPrizeId);
  const isPrizeFinished = currentWinners.length >= currentPrize.quantity;
  const remainingSlots = currentPrize.quantity - currentWinners.length;

  const eligibleParticipants = getEligibleParticipants(
    participants,
    winners,
    currentPrize,
  );

  // console.log(`[DEBUG] Danh sách đủ điều kiện quay "${currentPrize.name}":`, eligibleParticipants);

  // --- Effects ---

  // Load/Save Data
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setParticipants(data.participants || DEFAULT_PARTICIPANTS);
        setPrizes(data.prizes || DEFAULT_PRIZES);
        setWinners(data.winners || []);
      } catch (e) {
        console.error("Failed to load data", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ participants, prizes, winners }),
    );
  }, [participants, prizes, winners]);

  // Audio Initialization
  useEffect(() => {
    audioComingRef.current = new Audio(AUDIO_PATHS.COMING);
    audioComingRef.current.loop = true;
    audioComingRef.current.preload = "auto";

    audioRollerRef.current = new Audio(AUDIO_PATHS.ROLLER);
    audioRollerRef.current.loop = true;
    audioRollerRef.current.preload = "auto";

    audioWinRef.current = new Audio(AUDIO_PATHS.WIN);
    audioWinRef.current.preload = "auto";
    
    audioCheerRef.current = new Audio(AUDIO_PATHS.CHEER);
    audioCheerRef.current.preload = "auto";
    
    audioClickRef.current = new Audio(AUDIO_PATHS.CLICK);
    audioClickRef.current.preload = "auto";

    // Preload all audio files
    [audioComingRef, audioRollerRef, audioWinRef, audioCheerRef, audioClickRef].forEach(ref => {
      if (ref.current) {
        ref.current.load();
      }
    });
  }, []);

  // Helper to stop specific or all sounds
  const stopAudio = (ref: React.MutableRefObject<HTMLAudioElement | null>) => {
    if (ref.current) {
      ref.current.pause();
      ref.current.currentTime = 0;
    }
  };

  const stopAllLoopingSounds = () => {
    stopAudio(audioComingRef);
    stopAudio(audioRollerRef);
  };

  // --- Handlers ---

  const handleContinueSpin = () => {
    if (!targetWinner) return;

    setIsSpinPaused(false);

    // Restart audio for tension
    if (audioEnabled && audioRollerRef.current) {
      stopAllLoopingSounds();
      audioRollerRef.current.play().catch(() => {});
    }

    const totalDigits = 5;
    const stepDelay = 800;

    // Reveal digits 3, 4
    setTimeout(() => {
      setRevealedCount(3);
      if (audioEnabled && audioClickRef.current) {
        audioClickRef.current.currentTime = 0;
        audioClickRef.current.play().catch(() => {});
      }
    }, stepDelay * 1);
    
    setTimeout(() => {
      setRevealedCount(4);
      if (audioEnabled && audioClickRef.current) {
        audioClickRef.current.currentTime = 0;
        audioClickRef.current.play().catch(() => {});
      }
    }, stepDelay * 2);

    // Reveal digit 5 and finalize
    setTimeout(() => {
      setRevealedCount(5);
      setTimeout(() => finalizeSpin(targetWinner), 500);
    }, stepDelay * 3);
  };

  const handleSpin = () => {
    if (isSpinning || isPrizeFinished) return;
    if (eligibleParticipants.length === 0) {
      alert("Hết nhân viên đủ điều kiện cho giải này!");
      return;
    }

    // 1. Determine Winner Immediately
    const finalParticipant = getRandomParticipant(eligibleParticipants);
    if (!finalParticipant) return;

    // console.log("[DEBUG] Người may mắn được chọn ngẫu nhiên:", finalParticipant);

    const newWinner: Winner = {
      id: Date.now().toString(),
      participantId: finalParticipant.id,
      participant: finalParticipant,
      prizeId: currentPrizeId,
      timestamp: Date.now(),
    };

    // 2. Setup State
    setTargetWinner(newWinner);
    setIsSpinning(true);
    setIsSpinPaused(false);
    setRevealedCount(0);
    setShowCelebration(false);

    // 3. Start Intro Audio
    if (audioEnabled && audioComingRef.current) {
      stopAllLoopingSounds();
      audioComingRef.current.play().catch(() => {});
    }

    // 4. Start Visual Chaos
    spinIntervalRef.current = window.setInterval(() => {
      const random = getRandomParticipant(eligibleParticipants);
      if (random) setDisplayParticipant(random);
    }, 50);

    // 5. Sequence Logic
    const totalDigits = 5;
    const initialDelay = 2000; // Spin fully for 2s
    const stepDelay = 800; // Time between digits

    // Check if we use the suspenseful, pausable logic
    if (isSuspenseMode) {
      // --- PAUSABLE LOGIC ---
      // Reveal first 2 digits then pause
      for (let i = 1; i <= 2; i++) {
        setTimeout(
          () => {
            setRevealedCount(i);
            if (audioEnabled && audioClickRef.current) {
              audioClickRef.current.currentTime = 0;
              audioClickRef.current.play().catch(() => {});
            }
          },
          initialDelay + i * stepDelay,
        );
      }

      // Set up the pause
      setTimeout(
        () => {
          setIsSpinPaused(true);
          // Stop the background chaos sound
          stopAudio(audioComingRef);
        },
        initialDelay + 2 * stepDelay + 100,
      );
    } else {
      // --- ORIGINAL LOGIC ---
      // Schedule all digit reveals
      for (let i = 1; i <= totalDigits; i++) {
        setTimeout(
          () => {
            setRevealedCount(i);

            if (audioEnabled) {
              if (i === totalDigits - 1) {
                stopAudio(audioComingRef);
                if (audioRollerRef.current)
                  audioRollerRef.current.play().catch(() => {});
              } else if (i < totalDigits) {
                if (audioClickRef.current) {
                  audioClickRef.current.currentTime = 0;
                  audioClickRef.current.play().catch(() => {});
                }
              }
            }
          },
          initialDelay + i * stepDelay,
        );
      }

      // 6. Finalize (After last digit)
      setTimeout(
        () => {
          finalizeSpin(newWinner);
        },
        initialDelay + totalDigits * stepDelay + 500,
      );
    }
  };

  const finalizeSpin = (winner: Winner) => {
    if (spinIntervalRef.current) {
      clearInterval(spinIntervalRef.current);
      spinIntervalRef.current = null;
    }

    setDisplayParticipant(winner.participant);

    // Stop tension loop, Play Win Sound (game-sm-jackpot-win)
    if (audioEnabled) {
      stopAllLoopingSounds();
      if (audioWinRef.current) audioWinRef.current.play().catch(() => {});
    }

    // Add to list
    const updatedWinners = [...winners, winner];
    setWinners(updatedWinners);
    setLastWinner(winner);

    setIsSpinning(false);

    // Show celebration popup (Cheer Sound)
    setTimeout(() => {
      setShowCelebration(true);
      if (audioEnabled && audioCheerRef.current) {
        audioCheerRef.current.currentTime = 0;
        audioCheerRef.current.play().catch((err) => {
          console.error("Failed to play cheer sound:", err);
        });
      }
    }, 800);
  };

  const handleRejectWinner = () => {
    if (lastWinner) {
      // Remove the last added winner
      setWinners(winners.filter((w) => w.id !== lastWinner.id));
      setShowCelebration(false);
      setLastWinner(null);
      setDisplayParticipant(null);
      setTargetWinner(null);
      setRevealedCount(0);
      stopAllLoopingSounds(); // Safety stop
    }
  };

  const nextPrize = () => {
    if (isSpinning) return;
    if (currentPrizeIndex < prizes.length - 1) {
      setCurrentPrizeId(prizes[currentPrizeIndex + 1].id);
      setDisplayParticipant(null);
      setRevealedCount(0);
    }
  };

  const prevPrize = () => {
    if (isSpinning) return;
    if (currentPrizeIndex > 0) {
      setCurrentPrizeId(prizes[currentPrizeIndex - 1].id);
      setDisplayParticipant(null);
      setRevealedCount(0);
    }
  };

  // --- Slot Box Helper with Sequential Logic ---
  const renderCodeSlots = () => {
    const currentCode = displayParticipant?.code || "00000";
    const targetCode = targetWinner?.participant.code || currentCode;

    const pad = (s: string) => {
      const chars = s.split("");
      return chars.length < 5
        ? [...Array(5 - chars.length).fill("0"), ...chars]
        : chars;
    };

    const displayChars = pad(currentCode);
    const targetChars = pad(targetCode);

    return (
      <div className="flex gap-2 md:gap-4 justify-center perspective-1000">
        {displayChars.map((char, index) => {
          const isLocked = isSpinning && targetWinner && index < revealedCount;
          const showChar = isLocked ? targetChars[index] : char;

          return (
            <div
              key={index}
              className={`
                    slot-box w-12 h-16 md:w-20 md:h-28 flex items-center justify-center transform transition-all duration-300
                    ${isLocked ? "scale-110 border-2 border-white/50 shadow-[0_0_15px_rgba(255,255,255,0.8)] z-10" : "scale-100"}
                `}
            >
              <span
                className={`
                    text-3xl md:text-6xl font-black drop-shadow-md font-mono
                    ${isLocked ? "text-white" : "text-white/80 blur-[0.5px]"}
                `}
              >
                {showChar}
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen font-sans text-white relative overflow-hidden flex flex-col">
      {/* --- Logo --- */}
      <img 
        src="/images/logo.png" 
        alt="Logo" 
        className="absolute top-6 left-6 z-50 h-32 w-32"
      />

      {/* --- Background Image --- */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{ backgroundImage: 'url(/images/banner.png)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60"></div>
      </div>
      
      {/* --- Background Decorations --- */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-yep-gold rounded-full blur-[120px] opacity-10 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-600 rounded-full blur-[150px] opacity-10 pointer-events-none"></div>

      {/* Cloud SVG Decorations */}
      <svg
        className="cloud top-10 left-10 w-32 text-yep-gold/10"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M17.5,19c-3.03,0-5.5-2.47-5.5-5.5c0-0.44,0.05-0.86,0.15-1.27C11.58,12.55,11.07,12.7,10.5,12.7c-2.48,0-4.5-2.02-4.5-4.5c0-0.5,0.08-0.98,0.23-1.43C5.16,7.56,4,8.94,4,10.5c0,2.48,2.02,4.5,4.5,4.5c0.23,0,0.45-0.02,0.67-0.06C9.53,16.64,11.35,18,13.5,18c0.75,0,1.46-0.17,2.1-0.47C16.14,18.33,16.79,19,17.5,19z" />
      </svg>
      <svg
        className="cloud top-20 right-20 w-48 text-yep-gold/10"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
      </svg>

      {/* --- Main Stage --- */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 relative z-10 w-full max-w-6xl mx-auto -mt-6">
        {/* Title Group */}
        <div className="text-center mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="inline-flex items-center gap-2 mb-6 bg-black/20 backdrop-blur px-6 py-2 rounded-full border border-white/10">
            <Trophy size={20} className="text-yep-gold" />
            <span className="text-sm md:text-base font-bold tracking-widest text-yep-gold uppercase">
              BỆNH VIỆN ĐA KHOA QUỐC TẾ BẮC HÀ - YEP 2026
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-display font-black uppercase text-yep-gold drop-shadow-lg tracking-tighter mb-2">
            Quay Số Trúng Thưởng
          </h1>
          <h2 className="text-4xl md:text-6xl font-display font-black uppercase text-white drop-shadow-xl tracking-wide">
            {currentPrize.name}
          </h2>
        </div>

        {/* Navigation & Badge */}
        <div className="flex items-center gap-6 md:gap-12 mb-10">
          <button
            onClick={prevPrize}
            disabled={isSpinning || currentPrizeIndex === 0}
            className="p-3 rounded-full border-2 border-yep-gold/50 text-yep-gold hover:bg-yep-gold hover:text-red-900 transition disabled:opacity-20 disabled:cursor-not-allowed group"
          >
            <ChevronLeft
              size={32}
              className="group-hover:scale-110 transition"
            />
          </button>

          {/* Central Badge */}
          <div className="relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center">
            <svg
              className="absolute inset-0 text-gradient-to-br from-yep-gold to-orange-500 drop-shadow-[0_0_20px_rgba(255,215,0,0.6)] animate-pulse"
              viewBox="0 0 100 100"
              fill="url(#grad1)"
            >
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFD700" />
                  <stop offset="100%" stopColor="#FF8C00" />
                </linearGradient>
              </defs>
              <polygon points="50 0, 95 25, 95 75, 50 100, 5 75, 5 25" />
            </svg>
            <div className="relative z-10 text-center">
              <div className="text-4xl md:text-5xl font-black text-red-900 leading-none">
                {currentPrize.quantity}
              </div>
              <div className="text-[10px] md:text-xs font-bold text-red-800 uppercase mt-1">
                Giải
              </div>
            </div>
          </div>

          <button
            onClick={nextPrize}
            disabled={isSpinning || currentPrizeIndex === prizes.length - 1}
            className="p-3 rounded-full border-2 border-yep-gold/50 text-yep-gold hover:bg-yep-gold hover:text-red-900 transition disabled:opacity-20 disabled:cursor-not-allowed group"
          >
            <ChevronRight
              size={32}
              className="group-hover:scale-110 transition"
            />
          </button>
        </div>

        {/* Code Slots Display */}
        <div className="mb-10 min-h-[120px] flex items-center justify-center">
          {/* We always render slots now, even if idle */}
          <div className="flex flex-col items-center animate-in zoom-in duration-300">
            {renderCodeSlots()}

            {/* Name is hidden while spinning until the very end or maybe last step? 
                   Let's only show name when NOT spinning or when revealedCount === 5 */}
            <div
              className={`mt-6 text-center transition-opacity duration-500 ${!isSpinning || revealedCount === 5 ? "opacity-100" : "opacity-0"}`}
            >
              {displayParticipant ? (
                <>
                  <div className="text-2xl md:text-4xl font-bold text-yep-gold uppercase tracking-wider text-shadow-gold">
                    {displayParticipant.name}
                  </div>
                  <div className="text-white/80 font-medium text-lg mt-1">
                    {displayParticipant.department}
                  </div>
                </>
              ) : (
                isPrizeFinished ? null : (
                  <div className="text-xl text-white/50 uppercase font-bold tracking-widest mt-4">
                    Sẵn sàng
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* Action Button & Counter */}
        <div className="text-center z-20">
          {remainingSlots > 0 ? (
            isSpinPaused ? (
              <button
                onClick={handleContinueSpin}
                className="group relative px-10 py-4 md:px-16 md:py-5 rounded-full font-black text-xl md:text-3xl uppercase tracking-widest transition-all transform shadow-[0_10px_20px_rgba(0,0,0,0.5)] bg-gradient-to-b from-blue-500 to-blue-700 text-white hover:scale-105 hover:shadow-[0_0_40px_rgba(59,130,246,0.6)] active:scale-95"
              >
                TIẾP TỤC
              </button>
            ) : (
              <button
                onClick={handleSpin}
                disabled={isSpinning}
                className={`
                    group relative px-10 py-4 md:px-16 md:py-5 rounded-full font-black text-xl md:text-3xl uppercase tracking-widest transition-all transform shadow-[0_10px_20px_rgba(0,0,0,0.5)]
                    ${
                      isSpinning
                        ? "bg-gray-600 text-gray-400 cursor-not-allowed scale-95 opacity-80"
                        : "bg-gradient-to-b from-yep-gold to-orange-500 text-red-900 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,215,0,0.6)] active:scale-95"
                    }
                  `}
              >
                {isSpinning ? "Đang quay..." : "BẮT ĐẦU"}
              </button>
            )
          ) : null}

          <div className="mt-6 text-white/70 font-medium text-lg md:text-xl bg-black/20 inline-block px-4 py-1 rounded-full backdrop-blur-sm">
            Đã quay{" "}
            <span className="text-yep-gold font-bold">
              {currentWinners.length}
            </span>{" "}
            / {currentPrize.quantity} người trúng giải này
          </div>
        </div>
      </main>

      {/* --- Footer List (Filtered by Current Prize) --- */}
      <div className="bg-black/20 backdrop-blur-sm border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs uppercase font-bold text-yep-gold/90 tracking-widest">
              Danh sách trúng {currentPrize.name}
            </span>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide opacity-90 hover:opacity-100 transition min-h-[60px]">
            {currentWinners.length === 0 && (
              <div className="text-gray-500 text-xs italic flex items-center">
                Chưa có ai trúng giải này.
              </div>
            )}
            {currentWinners
              .slice()
              .reverse()
              .map((w) => (
                <div
                  key={w.id}
                  className="flex-shrink-0 bg-white/90 rounded px-3 py-1 min-w-[140px] border border-gray-200 flex flex-col justify-center animate-in fade-in slide-in-from-right-4 duration-300 shadow-sm"
                >
                  <div className="font-bold text-xs text-gray-900 truncate">
                    {w.participant.name}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-red-600 font-bold">
                      {currentPrize.name}
                    </span>
                    <span className="text-[10px] text-gray-600 font-mono">
                      {w.participant.code}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* --- Bottom Toolbar --- */}
      <footer className="bg-black/60 backdrop-blur-md border-t border-white/10 p-3 z-30">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-2 md:gap-6">
          <button
            onClick={() => setActiveModal("participants")}
            className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/10 text-gray-300 hover:text-white transition"
          >
            <Users size={18} />{" "}
            <span className="font-bold text-sm">Người tham dự</span>
          </button>

          <button
            onClick={() => setActiveModal("results")}
            className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/10 text-gray-300 hover:text-white transition"
          >
            <List size={18} />{" "}
            <span className="font-bold text-sm">Kết quả</span>
          </button>

          <div className="w-px h-6 bg-white/20 mx-2 hidden md:block"></div>

          <button
            onClick={() => setActiveModal("settings")}
            className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/10 text-gray-300 hover:text-white transition"
          >
            <Settings size={18} />{" "}
            <span className="font-bold text-sm">Cấu hình</span>
          </button>

          <button
            onClick={() => setAudioEnabled(!audioEnabled)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${audioEnabled ? "bg-yep-gold/20 text-yep-gold" : "hover:bg-white/10 text-gray-400"}`}
          >
            {audioEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
            <span className="font-bold text-sm hidden md:inline">Âm thanh</span>
          </button>

          <button
            onClick={() => setIsSuspenseMode(!isSuspenseMode)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${isSuspenseMode ? "bg-blue-600/30 text-blue-400 border border-blue-500" : "hover:bg-white/10 text-gray-300"}`}
            title="Chế độ hồi hộp"
          >
            <Hourglass size={18} />
            <span className="font-bold text-sm hidden md:inline">Hồi hộp</span>
          </button>

          <div className="w-px h-6 bg-white/20 mx-2 hidden md:block"></div>


        </div>
      </footer>

      {/* --- Modals --- */}
      <SettingsModal
        isOpen={activeModal === "settings"}
        onClose={() => setActiveModal(null)}
        participants={participants}
        setParticipants={setParticipants}
        prizes={prizes}
        setPrizes={setPrizes}
        winners={winners}
        setWinners={setWinners}
      />

      <ResultsListModal
        isOpen={activeModal === "results"}
        onClose={() => setActiveModal(null)}
        winners={winners}
        prizes={prizes}
        setWinners={setWinners}
        initialSelectedPrizeId={currentPrizeId}
      />

      <ParticipantsListModal
        isOpen={activeModal === "participants"}
        onClose={() => setActiveModal(null)}
        participants={participants}
      />

      <CelebrationModal
        isOpen={showCelebration}
        onClose={() => setShowCelebration(false)}
        onReject={handleRejectWinner}
        winner={lastWinner}
        prize={currentPrize}
        winnersCount={currentWinners.length}
      />
    </div>
  );
};

export default App;
