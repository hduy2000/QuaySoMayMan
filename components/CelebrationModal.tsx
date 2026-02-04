import React, { useEffect } from "react";
import { Prize, Winner } from "../types";
import { X, Sparkles, Check, RefreshCcw } from "lucide-react";
import confetti from "canvas-confetti";
import Swal from "sweetalert2";

interface CelebrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReject?: () => void; // Function to handle "Skip/Redraw"
  winner: Winner | null;
  prize: Prize;
  winnersCount: number;
}

export const CelebrationModal: React.FC<CelebrationModalProps> = ({
  isOpen,
  onClose,
  onReject,
  winner,
  prize,
  winnersCount,
}) => {
  const isGrandPrizeLayout = prize.quantity === 1;

  const handleRejectClick = () => {
    if (!onReject) return;

    Swal.fire({
      title: "Bạn có chắc chắn?",
      text: "Người trúng giải này sẽ bị hủy và hệ thống sẽ tiến hành quay lại. Hành động này không thể hoàn tác!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Đồng ý, quay lại!",
      cancelButtonText: "Hủy",
      background: "#1a1a1a",
      color: "#eee",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      customClass: {
        popup: "rounded-xl",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        onReject();
      }
    });
  };

  useEffect(() => {
    if (isOpen) {
      // --- Sound Effect Logic ---
      let soundSrc: string | null = null;
      if (prize.id === "p_dacbiet") {
        soundSrc = "/sounds/game-sm-jackpot-win.mp3";
      } else if (prize.id === "p_nhat" || prize.id === "p_nhi") {
        soundSrc = "/sounds/game-tada.mp3";
      }

      if (soundSrc) {
        const audio = new Audio(soundSrc);
        audio.play();
        // Optional: Play a cheer sound for the grand prize
        if (prize.id === "p_dacbiet") {
          setTimeout(() => {
            const cheer = new Audio("/sounds/crowd-cheer-in-school.mp3");
            cheer.volume = 0.5;
            cheer.play();
          }, 1000);
        }
      }

      // --- Confetti Effect Logic ---
      let confettiConfig = {
        duration: 3000,
        particleCount: 5,
        colors: ["#FFD700", "#FFA500"],
      };

      switch (prize.id) {
        case "p_dacbiet":
          confettiConfig = {
            duration: 7000,
            particleCount: 10,
            colors: ["#FFD700", "#FFFFFF", "#FF4136"],
          };
          break;
        case "p_nhat":
          confettiConfig = {
            duration: 5000,
            particleCount: 8,
            colors: ["#FFD700", "#FFFFFF"],
          };
          break;
        case "p_nhi":
          confettiConfig = {
            duration: 4000,
            particleCount: 6,
            colors: ["#C0C0C0", "#FFFFFF"],
          }; // Silver and white for 2nd
          break;
      }

      const { duration, particleCount, colors } = confettiConfig;
      const end = Date.now() + duration;

      // Fireworks effect - shoots up and explodes
      const fireworks = () => {
        const duration = 200;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        function randomInRange(min: number, max: number) {
          return Math.random() * (max - min) + min;
        }

        const interval: any = setInterval(function () {
          const timeLeft = animationEnd - Date.now();

          if (timeLeft <= 0) {
            return clearInterval(interval);
          }

          const particleCount = 50 * (timeLeft / duration);
          // Firework from left side
          confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            colors,
          });
          // Firework from right side
          confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
            colors,
          });
        }, 250);
      };

      // Side confetti frame
      const frame = () => {
        // Left side
        confetti({
          particleCount,
          angle: 60,
          spread: 65,
          origin: { x: 0 },
          colors,
        });
        // Right side
        confetti({
          particleCount,
          angle: 120,
          spread: 65,
          origin: { x: 1 },
          colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };

      // Start both effects
      frame();
      fireworks();
    }
  }, [isOpen, prize.id]);

  if (!isOpen || !winner) return null;

  // --- GRAND PRIZE LAYOUT (Dark, Epic, Single Winner) ---
  if (isGrandPrizeLayout) {
    return (
      <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-lg animate-in fade-in duration-500">
        {/* Abstract Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-yep-gold/10 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cube-coat.png')] opacity-10"></div>
        </div>
        <div className="relative w-full max-w-5xl text-center px-4 flex flex-col items-center">
          <h3 className="text-white/60 font-display uppercase tracking-[0.3em] text-lg md:text-2xl mb-8 animate-in slide-in-from-top-10 duration-700">
            CHÚC MỪNG
          </h3>

          {/* Huge Code Watermark */}
          <div className="relative mb-6">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12rem] md:text-[18rem] font-black text-white/5 select-none leading-none z-0">
              {winner.participant.code.slice(-1)}
            </div>

            <div className="relative z-10">
              <div className="text-6xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-yep-gold via-yellow-200 to-yep-gold drop-shadow-[0_0_30px_rgba(255,215,0,0.6)] font-mono tracking-wider mb-4 animate-in zoom-in duration-500">
                {winner.participant.code}
              </div>

              <h1 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tight drop-shadow-2xl mb-4 animate-in slide-in-from-bottom-10 duration-700 delay-100 whitespace-nowrap">
                {winner.participant.name}
              </h1>

              <div className="w-32 h-1 bg-gradient-to-r from-transparent via-yep-gold to-transparent mx-auto mb-6"></div>

              <p className="text-2xl md:text-3xl text-gray-300 font-display font-light tracking-wide uppercase">
                {winner.participant.department}
              </p>

              {winner.participant.onDuty && (
                <div className="mt-4 inline-block bg-red-600 px-4 py-2 rounded-lg border-2 border-red-400 shadow-lg animate-pulse">
                  <p className="text-white font-black text-sm md:text-base flex items-center gap-2">
                    <span>ĐANG TRỰC</span>
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="my-auto">
            <span className="text-yep-gold/80 italic font-serif text-lg">
              đã trúng
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-yep-gold uppercase mt-2 tracking-widest drop-shadow-lg">
              {prize.name}
            </h2>
            {(winner?.prizeProduct || prize.product) && (
              <div className="mt-4">
                <p className="text-2xl md:text-3xl text-white font-bold">
                  {winner?.prizeProduct || prize.product}
                </p>
                {prize.value && (
                  <p className="text-xl text-yep-gold/80 mt-2">
                    Trị giá: {prize.value}
                  </p>
                )}
              </div>
            )}
          </div>
          {/* Action Buttons */}
          <div className="flex gap-6 z-20 mt-12">
            {onReject && (
              <button
                onClick={handleRejectClick}
                className="px-8 py-3 rounded border border-white/20 text-white/60 hover:text-white hover:border-white hover:bg-white/5 transition uppercase font-bold text-sm tracking-widest flex items-center gap-2">
                <RefreshCcw size={16} /> Bỏ qua
              </button>
            )}

            <button
              onClick={onClose}
              className="bg-gradient-to-r from-yep-gold to-orange-500 text-red-950 px-12 py-3 rounded font-black uppercase tracking-widest hover:scale-105 transition shadow-[0_0_30px_rgba(255,215,0,0.4)] flex items-center gap-2">
              <Check size={20} strokeWidth={3} /> XÁC NHẬN
            </button>
          </div>
        </div>{" "}
      </div>
    );
  }

  // --- STANDARD LAYOUT (Festive, Multiple Winners) ---
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/75 backdrop-blur-lg animate-in fade-in duration-300">
      <div className="absolute top-4 right-4">
        <button
          onClick={onClose}
          className="text-white/50 hover:text-white transition p-2 bg-white/10 rounded-full">
          <X size={24} />
        </button>
      </div>

      <div className="w-full max-w-6xl text-center px-4">
        {/* Badge */}
        <div className="inline-block bg-gradient-to-r from-yep-gold to-orange-500 px-6 py-2 rounded-full mb-8 shadow-glow animate-bounce-gentle">
          <span className="text-red-900 font-black uppercase tracking-widest text-lg md:text-xl">
            {prize.name}
          </span>
        </div>

        {(winner?.prizeProduct || prize.product) && (
          <div className="mb-6">
            <p className="text-2xl md:text-3xl text-white font-bold">
              {winner?.prizeProduct || prize.product}
            </p>
            {prize.value && (
              <p className="text-lg text-yep-gold/80 mt-2">
                Trị giá: {prize.value}
              </p>
            )}
          </div>
        )}

        <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-300 uppercase drop-shadow-[0_5px_15px_rgba(255,215,0,0.5)] mb-2">
          CHÚC MỪNG NGƯỜI TRÚNG GIẢI
        </h1>

        <p className="text-yep-gold/80 font-mono text-sm md:text-base mb-12 uppercase tracking-widest">
          Người may mắn thứ {winnersCount} / {prize.quantity} của giải này
        </p>

        {/* Winner Card */}
        <div className="bg-gradient-to-br from-yep-gold via-orange-400 to-yep-gold p-[2px] rounded-2xl shadow-[0_0_50px_rgba(255,140,0,0.4)] transform hover:scale-105 transition duration-500 w-full max-w-6xl mx-auto">
          <div className="bg-[#1a0505] rounded-2xl p-8 md:p-16 relative overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-yep-gold/10 rounded-full blur-[80px] -mr-32 -mt-32"></div>

            <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
              <div className="w-24 h-24 md:w-32 md:h-32 bg-yep-gold rounded-full flex items-center justify-center border-4 border-white/20 shadow-inner flex-shrink-0">
                <Sparkles size={48} className="text-red-900" />
              </div>

              <div className="flex-1 text-center md:text-left">
                <div className="bg-white/10 inline-block px-3 py-1 rounded text-4xl text-yep-gold font-mono mb-2 border border-white/5">
                  {winner.participant.code}
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-white uppercase leading-tight mb-3 whitespace-nowrap">
                  {winner.participant.name}
                </h2>
                <p className="text-xl md:text-2xl text-yep-gold font-medium">
                  {winner.participant.department}
                </p>
                {winner.participant.onDuty && (
                  <div className="mt-3 inline-block bg-red-600 px-4 py-2 rounded-lg border-2 border-red-400 shadow-lg animate-pulse">
                    <p className="text-white font-black text-sm md:text-base flex items-center gap-2">
                      <span>ĐANG TRỰC</span>
                    </p>
                  </div>
                )}
                {winner.participant.yearsWorked > 0 &&
                  prize.id !== "p_mayman" && (
                    <p className="text-white/40 text-sm mt-2">
                      Thâm niên: {winner.participant.yearsWorked} năm
                    </p>
                  )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex justify-center gap-6">
          {onReject && (
            <button
              onClick={handleRejectClick}
              className="px-8 py-4 rounded-lg border border-white/20 text-white/70 hover:text-white hover:border-white hover:bg-white/10 transition uppercase font-bold text-sm tracking-widest flex items-center gap-2">
              <RefreshCcw size={16} /> Bỏ qua
            </button>
          )}
          <button
            onClick={onClose}
            className="bg-white text-red-900 font-black px-10 py-4 rounded-lg text-lg uppercase hover:bg-gray-200 transition shadow-lg active:scale-95">
            Đóng & Tiếp tục
          </button>
        </div>
      </div>
    </div>
  );
};
