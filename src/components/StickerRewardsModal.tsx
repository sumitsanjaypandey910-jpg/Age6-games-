import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Trophy, Lock } from 'lucide-react';
import { STICKERS } from '../data/gameData';
import { soundManager } from '../utils/audio';

interface StickerRewardsModalProps {
  isOpen: boolean;
  onClose: () => void;
  stars: number;
}

export const StickerRewardsModal: React.FC<StickerRewardsModalProps> = ({
  isOpen,
  onClose,
  stars,
}) => {
  const [placedStickers, setPlacedStickers] = useState<{ id: string; emoji: string; x: number; y: number }[]>([]);

  if (!isOpen) return null;

  const handleStickerClick = (sticker: typeof STICKERS[0]) => {
    const isUnlocked = stars >= sticker.unlockedAt;
    if (isUnlocked) {
      soundManager.playPop();
      soundManager.speak(sticker.name);

      // Add to sticker board in a random position
      const newSticker = {
        id: `${sticker.id}-${Date.now()}`,
        emoji: sticker.emoji,
        x: Math.floor(Math.random() * 80) + 10,
        y: Math.floor(Math.random() * 70) + 15,
      };
      setPlacedStickers((prev) => [...prev, newSticker]);
    } else {
      soundManager.playBoing();
      soundManager.speak(`Need ${sticker.unlockedAt} stars to unlock ${sticker.name}! Keep playing!`);
    }
  };

  return (
    <AnimatePresence>
      <div
        id="modal-stickers-overlay"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs select-none"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="relative w-full max-w-xl bg-amber-50 border-4 border-amber-400 rounded-3xl p-5 sm:p-6 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b-2 border-amber-200 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <Trophy className="w-6 h-6 text-amber-500" />
              <h3 className="text-xl sm:text-2xl font-black text-amber-900">
                Sticker Rewards Album
              </h3>
            </div>
            <button
              onClick={() => {
                soundManager.playPop();
                onClose();
              }}
              className="p-1.5 rounded-full hover:bg-amber-200 text-amber-900 transition active:scale-90"
              title="Close"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Stars tally */}
          <div className="flex items-center justify-between bg-amber-200/70 rounded-2xl px-4 py-2 mb-4">
            <span className="text-sm font-black text-amber-900">Your Earned Stars:</span>
            <div className="flex items-center gap-1.5 text-amber-950 font-black text-lg">
              <Sparkles className="w-5 h-5 text-yellow-500 fill-yellow-400" />
              <span>{stars} Stars</span>
            </div>
          </div>

          {/* Stickers Grid */}
          <div className="mb-4">
            <p className="text-xs font-bold text-amber-800 mb-2">
              Tap any unlocked sticker to paste it on your playroom board below!
            </p>
            <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
              {STICKERS.map((sticker) => {
                const isUnlocked = stars >= sticker.unlockedAt;

                return (
                  <button
                    key={sticker.id}
                    onClick={() => handleStickerClick(sticker)}
                    className={`relative p-2 rounded-2xl flex flex-col items-center justify-center border-2 transition-all active:scale-95 cursor-pointer ${
                      isUnlocked
                        ? 'bg-white border-amber-300 shadow-sm hover:border-amber-500'
                        : 'bg-slate-200 border-slate-300 opacity-60'
                    }`}
                  >
                    {isUnlocked ? (
                      <>
                        <span className="text-3xl sm:text-4xl filter drop-shadow">
                          {sticker.emoji}
                        </span>
                        <span className="text-[10px] font-bold text-slate-700 mt-1 truncate w-full text-center">
                          {sticker.name}
                        </span>
                      </>
                    ) : (
                      <>
                        <div className="text-2xl text-slate-400 my-1">
                          <Lock className="w-6 h-6 inline" />
                        </div>
                        <span className="text-[9px] font-bold text-slate-500">
                          {sticker.unlockedAt} ⭐️
                        </span>
                      </>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Playroom Sticker Board */}
          <div className="relative flex-1 min-h-[160px] bg-sky-200 border-2 border-dashed border-sky-400 rounded-2xl p-2 overflow-hidden shadow-inner flex flex-col justify-between">
            <div className="text-[11px] font-bold text-sky-900 bg-white/70 px-2 py-0.5 rounded-full inline-block self-start">
              🎨 My Playroom Sticker Board ({placedStickers.length} stickers)
            </div>

            {placedStickers.length === 0 && (
              <div className="flex items-center justify-center h-full text-xs font-bold text-sky-800 opacity-60">
                Tap unlocked stickers above to stick them here!
              </div>
            )}

            {/* Render placed stickers */}
            {placedStickers.map((st) => (
              <motion.div
                key={st.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                style={{
                  position: 'absolute',
                  left: `${st.x}%`,
                  top: `${st.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                className="text-4xl filter drop-shadow cursor-grab active:cursor-grabbing hover:scale-110 transition"
              >
                {st.emoji}
              </motion.div>
            ))}

            {placedStickers.length > 0 && (
              <button
                onClick={() => {
                  setPlacedStickers([]);
                  soundManager.playPop();
                }}
                className="self-end text-[10px] font-black text-rose-700 bg-white/80 px-2 py-0.5 rounded-md hover:bg-white"
              >
                Clear Board
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
