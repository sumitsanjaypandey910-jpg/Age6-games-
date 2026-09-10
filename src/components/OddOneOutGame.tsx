import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { OddOneOutLevel, OddItemOption } from '../types';
import { soundManager } from '../utils/audio';
import { Check, Sparkles, ArrowRight, HelpCircle, Volume2 } from 'lucide-react';

interface OddOneOutGameProps {
  level: OddOneOutLevel;
  onLevelComplete: (starsEarned: number) => void;
  onNextLevel?: () => void;
  hasMoreLevels: boolean;
  onMascotReact: (mood: 'happy' | 'cheering' | 'talking' | 'thinking', message?: string) => void;
}

export const OddOneOutGame: React.FC<OddOneOutGameProps> = ({
  level,
  onLevelComplete,
  onNextLevel,
  hasMoreLevels,
  onMascotReact,
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    setSelectedId(null);
    setIsCorrect(null);
    setShowExplanation(false);
    onMascotReact('thinking', 'Can you find the odd one out?');
    soundManager.speak(level.prompt);
  }, [level.id]);

  const handleSelectOption = (option: OddItemOption) => {
    setSelectedId(option.id);

    if (option.isOdd) {
      setIsCorrect(true);
      setShowExplanation(true);
      soundManager.playCorrect();
      soundManager.speak(`Great job! That's the odd one out! ${level.reason}`);
      onMascotReact('cheering', 'Spot on! You found it!');

      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#F472B6', '#FBBF24', '#34D399', '#60A5FA'],
      });

      onLevelComplete(2);
    } else {
      setIsCorrect(false);
      soundManager.playBoing();
      soundManager.speak('Oops, that one matches! Look closely and try another one!');
      onMascotReact('thinking', 'Not quite! Look closely at each one!');
      setTimeout(() => {
        setSelectedId(null);
        setIsCorrect(null);
      }, 1000);
    }
  };

  return (
    <div
      id="odd-one-out-screen"
      className="relative w-full max-w-xl mx-auto flex flex-col items-center select-none"
    >
      {/* Title & prompt */}
      <div className="text-center mb-4">
        <h2 className="text-xl sm:text-2xl font-black text-amber-300 drop-shadow flex items-center justify-center gap-2">
          <span>{level.prompt}</span>
          <button
            onClick={() => soundManager.speak(level.prompt)}
            className="p-1 text-amber-300 hover:text-white transition"
            title="Listen to question"
          >
            <Volume2 className="w-5 h-5 inline" />
          </button>
        </h2>
        <p className="text-sm font-bold text-amber-100/80">Tap the picture that is different from the rest!</p>
      </div>

      {/* Main Board - Inspired by screenshot's top-right card (wood/golden warm tone) */}
      <div className="w-full bg-amber-400 border-4 border-amber-600 rounded-3xl p-5 sm:p-7 shadow-2xl">
        <div className="grid grid-cols-2 gap-4 sm:gap-6">
          {level.options.map((opt) => {
            const isSelected = selectedId === opt.id;
            const showSuccess = isSelected && isCorrect;

            return (
              <motion.button
                key={opt.id}
                id={`odd-option-${opt.id}`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => handleSelectOption(opt)}
                disabled={isCorrect === true}
                className={`relative aspect-square bg-white rounded-2xl p-4 flex flex-col items-center justify-center shadow-lg border-4 transition-all cursor-pointer ${
                  showSuccess
                    ? 'border-emerald-500 bg-emerald-50 ring-4 ring-emerald-300'
                    : isSelected && isCorrect === false
                    ? 'border-rose-500 bg-rose-50 animate-shake'
                    : 'border-amber-200 hover:border-amber-300'
                }`}
              >
                {/* Big cute emoji */}
                <span className="text-6xl sm:text-7xl filter drop-shadow-sm">
                  {opt.emoji}
                </span>

                <span className="mt-2 text-sm sm:text-base font-black text-slate-700">
                  {opt.label}
                </span>

                {/* Green checkmark badge - like in screenshot! */}
                {showSuccess && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-3 -right-3 w-10 h-10 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-lg border-2 border-white ring-2 ring-emerald-400"
                  >
                    <Check className="w-6 h-6 stroke-[4]" />
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Explanation Banner */}
        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-5 bg-white/95 border-2 border-emerald-400 rounded-2xl p-4 text-center shadow-md flex flex-col sm:flex-row items-center justify-between gap-3"
          >
            <div className="text-left flex items-start gap-2">
              <span className="text-2xl">💡</span>
              <div>
                <p className="text-sm font-extrabold text-emerald-800">You found it!</p>
                <p className="text-xs sm:text-sm font-semibold text-slate-600">{level.reason}</p>
              </div>
            </div>

            {hasMoreLevels ? (
              <button
                id="btn-odd-next-level"
                onClick={() => {
                  soundManager.playPop();
                  if (onNextLevel) onNextLevel();
                }}
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-black py-2 px-4 rounded-xl shadow-md flex items-center gap-1.5 text-sm whitespace-nowrap active:scale-95 transition"
              >
                <span>Next Puzzle</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                id="btn-odd-restart"
                onClick={() => {
                  setSelectedId(null);
                  setIsCorrect(null);
                  setShowExplanation(false);
                  soundManager.playPop();
                }}
                className="bg-amber-500 hover:bg-amber-600 text-white font-black py-2 px-4 rounded-xl shadow-md flex items-center gap-1.5 text-sm whitespace-nowrap active:scale-95 transition"
              >
                <span>Try Again</span>
                <Sparkles className="w-4 h-4" />
              </button>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};
