import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { SortingLevel, SortableItem } from '../types';
import { soundManager } from '../utils/audio';
import { Check, Sparkles, ArrowRight, Volume2, CornerRightDown } from 'lucide-react';

interface ColorSortGameProps {
  level: SortingLevel;
  onLevelComplete: (starsEarned: number) => void;
  onNextLevel?: () => void;
  hasMoreLevels: boolean;
  onMascotReact: (mood: 'happy' | 'cheering' | 'talking' | 'thinking', message?: string) => void;
}

export const ColorSortGame: React.FC<ColorSortGameProps> = ({
  level,
  onLevelComplete,
  onNextLevel,
  hasMoreLevels,
  onMascotReact,
}) => {
  // Items remaining to be sorted
  const [remainingItems, setRemainingItems] = useState<SortableItem[]>([]);
  // Sorted items grouped by basket id
  const [sortedItems, setSortedItems] = useState<Record<string, SortableItem[]>>({});
  // Currently active item
  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    setRemainingItems([...level.items]);
    const initialBins: Record<string, SortableItem[]> = {};
    level.baskets.forEach((b) => {
      initialBins[b.id] = [];
    });
    setSortedItems(initialBins);
    setActiveItemId(level.items[0]?.id || null);
    setIsFinished(false);

    onMascotReact('talking', 'Sort into the right baskets!');
    soundManager.speak(`${level.prompt}! Let's sort!`);
  }, [level.id]);

  const currentItem = remainingItems.find((i) => i.id === activeItemId) || remainingItems[0];

  const handleDropIntoBasket = (basketId: string) => {
    if (!currentItem) return;

    if (currentItem.targetBasketId === basketId) {
      // Correct Basket!
      soundManager.playCorrect();
      const targetBasket = level.baskets.find((b) => b.id === basketId);
      soundManager.speak(`Yes! ${currentItem.label} goes in the ${targetBasket?.colorName} basket!`);
      onMascotReact('cheering', `Great sorting! ${currentItem.label}!`);

      // Move item to sorted
      setSortedItems((prev) => ({
        ...prev,
        [basketId]: [...(prev[basketId] || []), currentItem],
      }));

      const nextRemaining = remainingItems.filter((i) => i.id !== currentItem.id);
      setRemainingItems(nextRemaining);

      if (nextRemaining.length > 0) {
        setActiveItemId(nextRemaining[0].id);
      } else {
        // Complete!
        setActiveItemId(null);
        setIsFinished(true);
        soundManager.playFanfare();
        soundManager.speak('All sorted! Fantastic work!');
        onMascotReact('cheering', 'Hooray! Everything is sorted!');

        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });

        onLevelComplete(3);
      }
    } else {
      // Wrong basket
      soundManager.playBoing();
      soundManager.speak('Oops, check the color and try again!');
      onMascotReact('thinking', 'Check the color carefully!');
    }
  };

  return (
    <div
      id="color-sort-screen"
      className="relative w-full max-w-2xl mx-auto flex flex-col items-center select-none"
    >
      {/* Title */}
      <div className="text-center mb-3">
        <h2 className="text-xl sm:text-2xl font-black text-amber-300 drop-shadow flex items-center justify-center gap-2">
          <span>{level.prompt}</span>
          <button
            onClick={() => soundManager.speak(level.prompt)}
            className="p-1 text-amber-300 hover:text-white transition"
            title="Read instructions"
          >
            <Volume2 className="w-5 h-5 inline" />
          </button>
        </h2>
        <p className="text-sm font-bold text-amber-100/80">Tap the active object, then tap its matching basket!</p>
      </div>

      {/* Main Play Board - Inspired by screenshot's bottom-right card (Green background with baskets) */}
      <div className="w-full bg-[#10b981] border-4 border-[#047857] rounded-3xl p-5 sm:p-7 shadow-2xl flex flex-col items-center">
        {/* Active Item Stage to Sort */}
        <div className="w-full flex flex-col items-center justify-center mb-6">
          <span className="text-xs sm:text-sm font-black text-emerald-950 uppercase tracking-wider bg-white/80 px-3 py-1 rounded-full mb-3 shadow-xs">
            {remainingItems.length > 0 ? `Item to Sort (${remainingItems.length} left)` : 'All Items Sorted!'}
          </span>

          {currentItem ? (
            <div className="flex flex-col items-center">
              <motion.div
                key={currentItem.id}
                initial={{ scale: 0.5, y: -20 }}
                animate={{ scale: 1, y: 0 }}
                className="w-24 h-24 sm:w-28 sm:h-28 bg-white border-4 border-amber-400 rounded-3xl shadow-xl flex flex-col items-center justify-center cursor-pointer active:scale-95"
                onClick={() => {
                  soundManager.playPop();
                  soundManager.speak(currentItem.label);
                }}
              >
                <span className="text-5xl sm:text-6xl drop-shadow-md">{currentItem.emoji}</span>
                <span className="text-xs font-black text-slate-700 mt-1">{currentItem.label}</span>
              </motion.div>

              {/* Bouncing Arrow Guide - exactly like in screenshot! */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="flex items-center gap-1 text-white font-black text-sm mt-2 bg-emerald-800/60 px-3 py-1 rounded-full"
              >
                <CornerRightDown className="w-4 h-4 text-yellow-300" />
                <span>Tap the right basket below!</span>
              </motion.div>
            </div>
          ) : (
            <div className="p-4 text-center text-white font-black text-xl">
              🎉 All sorted neatly!
            </div>
          )}
        </div>

        {/* Baskets Row - Colored Bins as in screenshot */}
        <div className="grid grid-cols-2 gap-4 sm:gap-8 w-full max-w-lg">
          {level.baskets.map((basket) => {
            const itemsInBasket = sortedItems[basket.id] || [];

            return (
              <button
                key={basket.id}
                id={`basket-${basket.id}`}
                onClick={() => handleDropIntoBasket(basket.id)}
                disabled={!currentItem}
                className="group relative flex flex-col items-center p-4 rounded-3xl border-4 shadow-xl transition-all active:scale-95 hover:brightness-105 cursor-pointer"
                style={{
                  backgroundColor: basket.bgHex,
                  borderColor: basket.borderHex,
                }}
              >
                {/* Basket Top Rim */}
                <div
                  className="w-full py-1.5 px-3 rounded-xl text-center font-black text-sm sm:text-base text-white shadow-sm mb-2"
                  style={{ backgroundColor: basket.colorHex }}
                >
                  {basket.name}
                </div>

                {/* Basket Bucket Illustration */}
                <div
                  className="w-full min-h-[90px] sm:min-h-[110px] rounded-2xl border-2 border-dashed flex flex-wrap items-center justify-center p-2 gap-1.5 relative overflow-hidden"
                  style={{
                    borderColor: basket.borderHex,
                    backgroundColor: 'rgba(255,255,255,0.4)',
                  }}
                >
                  {itemsInBasket.length === 0 && (
                    <span className="text-xs font-bold opacity-60 text-slate-700">
                      Drop {basket.colorName} here
                    </span>
                  )}

                  {/* Items inside basket */}
                  <AnimatePresence>
                    {itemsInBasket.map((it, idx) => (
                      <motion.span
                        key={it.id + idx}
                        initial={{ scale: 0, y: -20 }}
                        animate={{ scale: 1, y: 0 }}
                        className="text-3xl sm:text-4xl filter drop-shadow"
                        title={it.label}
                      >
                        {it.emoji}
                      </motion.span>
                    ))}
                  </AnimatePresence>
                </div>

                <span
                  className="mt-2 text-xs font-black px-2 py-0.5 rounded-full text-white"
                  style={{ backgroundColor: basket.borderHex }}
                >
                  Count: {itemsInBasket.length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Level Complete Bar */}
        {isFinished && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-6 bg-white rounded-2xl p-4 shadow-xl border-2 border-emerald-400 flex flex-col sm:flex-row items-center justify-between gap-4 w-full max-w-md"
          >
            <div className="flex items-center gap-2">
              <span className="text-3xl">🌟</span>
              <div>
                <p className="text-base font-black text-emerald-900">Level Cleared!</p>
                <p className="text-xs font-bold text-slate-600">You sorted every item correctly.</p>
              </div>
            </div>

            {hasMoreLevels ? (
              <button
                id="btn-sort-next"
                onClick={() => {
                  soundManager.playPop();
                  if (onNextLevel) onNextLevel();
                }}
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-black py-2.5 px-4 rounded-xl shadow-md flex items-center gap-1.5 text-sm active:scale-95 transition"
              >
                <span>Next Sort Level</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                id="btn-sort-replay"
                onClick={() => {
                  setRemainingItems([...level.items]);
                  const initialBins: Record<string, SortableItem[]> = {};
                  level.baskets.forEach((b) => {
                    initialBins[b.id] = [];
                  });
                  setSortedItems(initialBins);
                  setActiveItemId(level.items[0]?.id || null);
                  setIsFinished(false);
                  soundManager.playPop();
                }}
                className="bg-amber-500 hover:bg-amber-600 text-white font-black py-2.5 px-4 rounded-xl shadow-md flex items-center gap-1.5 text-sm active:scale-95 transition"
              >
                <span>Sort Again</span>
                <Sparkles className="w-4 h-4" />
              </button>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};
