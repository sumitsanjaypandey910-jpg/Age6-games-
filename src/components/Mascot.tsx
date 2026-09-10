import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface MascotProps {
  mood: 'happy' | 'cheering' | 'talking' | 'thinking';
  speechMessage?: string;
  onTap?: () => void;
}

export const Mascot: React.FC<MascotProps> = ({
  mood,
  speechMessage,
  onTap,
}) => {
  const [blink, setBlink] = useState(false);

  // Periodic blinking
  useEffect(() => {
    const interval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 200);
    }, 3800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      id="mascot-container"
      onClick={onTap}
      className="relative flex flex-col items-center select-none cursor-pointer group"
      title="Tap me to say hello!"
    >
      {/* Speech bubble */}
      <AnimatePresence>
        {speechMessage && (
          <motion.div
            id="mascot-speech-bubble"
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute -top-16 left-1/2 -translate-x-1/2 bg-white text-slate-800 font-bold px-4 py-2 rounded-2xl shadow-xl border-2 border-amber-300 text-sm whitespace-nowrap z-20 flex items-center gap-1.5 pointer-events-none"
          >
            <span>💬</span>
            <span>{speechMessage}</span>
            {/* Bubble arrow */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-white" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mascot Animated Character */}
      <motion.div
        animate={
          mood === 'cheering'
            ? { y: [0, -18, 0, -12, 0], rotate: [0, -5, 5, -3, 0] }
            : mood === 'talking'
            ? { scale: [1, 1.05, 1, 1.03, 1] }
            : { y: [0, -4, 0] }
        }
        transition={{
          repeat: mood === 'cheering' ? 2 : Infinity,
          duration: mood === 'cheering' ? 0.6 : 3,
          ease: 'easeInOut',
        }}
        className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 drop-shadow-xl"
      >
        <svg
          viewBox="0 0 120 120"
          className="w-full h-full overflow-visible"
        >
          <defs>
            <linearGradient id="maneGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FBBF24" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
            <linearGradient id="furGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FDE68A" />
              <stop offset="100%" stopColor="#FCD34D" />
            </linearGradient>
            <linearGradient id="shirtGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#1D4ED8" />
            </linearGradient>
          </defs>

          {/* Lion Mane Fluffs */}
          <g>
            <circle cx="28" cy="38" r="16" fill="url(#maneGrad)" />
            <circle cx="92" cy="38" r="16" fill="url(#maneGrad)" />
            <circle cx="20" cy="58" r="15" fill="url(#maneGrad)" />
            <circle cx="100" cy="58" r="15" fill="url(#maneGrad)" />
            <circle cx="34" cy="20" r="14" fill="url(#maneGrad)" />
            <circle cx="86" cy="20" r="14" fill="url(#maneGrad)" />
            <circle cx="60" cy="14" r="16" fill="url(#maneGrad)" />
          </g>

          {/* Ears */}
          <circle cx="32" cy="28" r="12" fill="#F59E0B" />
          <circle cx="32" cy="28" r="7" fill="#F472B6" />
          <circle cx="88" cy="28" r="12" fill="#F59E0B" />
          <circle cx="88" cy="28" r="7" fill="#F472B6" />

          {/* Body / Blue Shirt */}
          <path
            d="M36 84 Q60 76 84 84 L90 114 Q60 120 30 114 Z"
            fill="url(#shirtGrad)"
          />
          {/* Shirt collar pattern */}
          <path
            d="M50 82 Q60 92 70 82"
            stroke="#FDE047"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="60" cy="98" r="2.5" fill="#FDE047" />

          {/* Lion Face Head */}
          <ellipse cx="60" cy="54" rx="34" ry="32" fill="url(#furGrad)" />

          {/* Rosy Cheeks */}
          <circle cx="38" cy="62" r="6" fill="#F472B6" opacity="0.6" />
          <circle cx="82" cy="62" r="6" fill="#F472B6" opacity="0.6" />

          {/* Eyes */}
          {blink ? (
            <>
              <path
                d="M42 50 Q48 54 54 50"
                stroke="#1E293B"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M66 50 Q72 54 78 50"
                stroke="#1E293B"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
              />
            </>
          ) : (
            <>
              {/* Left Eye */}
              <circle cx="48" cy="48" r="6.5" fill="#0284C7" />
              <circle cx="48" cy="48" r="4.5" fill="#0F172A" />
              <circle cx="46" cy="46" r="2" fill="#FFFFFF" />
              {/* Right Eye */}
              <circle cx="72" cy="48" r="6.5" fill="#0284C7" />
              <circle cx="72" cy="48" r="4.5" fill="#0F172A" />
              <circle cx="70" cy="46" r="2" fill="#FFFFFF" />
            </>
          )}

          {/* Cute Muzzle */}
          <ellipse cx="60" cy="64" rx="14" ry="10" fill="#FEF3C7" />

          {/* Little Nose */}
          <polygon points="56,60 64,60 60,65" fill="#BE185D" />

          {/* Mouth */}
          {mood === 'cheering' || mood === 'talking' ? (
            <path
              d="M54 66 Q60 76 66 66"
              fill="#EF4444"
              stroke="#1E293B"
              strokeWidth="2"
            />
          ) : (
            <path
              d="M54 66 Q60 71 66 66"
              fill="none"
              stroke="#1E293B"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          )}

          {/* Whiskers */}
          <line x1="28" y1="62" x2="36" y2="63" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="28" y1="66" x2="36" y2="65" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="84" y1="63" x2="92" y2="62" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="84" y1="65" x2="92" y2="66" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" />

          {/* Cheering Paws */}
          {mood === 'cheering' ? (
            <>
              <circle cx="22" cy="50" r="8" fill="#FCD34D" stroke="#F59E0B" strokeWidth="2" />
              <circle cx="98" cy="50" r="8" fill="#FCD34D" stroke="#F59E0B" strokeWidth="2" />
            </>
          ) : (
            <>
              <circle cx="34" cy="90" r="7" fill="#FCD34D" stroke="#F59E0B" strokeWidth="1.5" />
              <circle cx="86" cy="90" r="7" fill="#FCD34D" stroke="#F59E0B" strokeWidth="1.5" />
            </>
          )}
        </svg>
      </motion.div>

      {/* Mascot Name Badge */}
      <span className="mt-1 text-xs font-bold text-amber-200 bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-600/50">
        Leo the Cub
      </span>
    </div>
  );
};
