import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { MatchingLevel, MatchingItem } from '../types';
import { soundManager } from '../utils/audio';
import { Check, Star, ArrowRight, Sparkles, Volume2 } from 'lucide-react';

interface ConnectLineGameProps {
  level: MatchingLevel;
  onLevelComplete: (starsEarned: number) => void;
  onNextLevel?: () => void;
  hasMoreLevels: boolean;
  onMascotReact: (mood: 'happy' | 'cheering' | 'talking' | 'thinking', message?: string) => void;
}

interface Point {
  x: number;
  y: number;
}

interface MatchConnection {
  leftId: string;
  rightId: string;
  color: string;
  leftPoint: Point;
  rightPoint: Point;
}

export const ConnectLineGame: React.FC<ConnectLineGameProps> = ({
  level,
  onLevelComplete,
  onNextLevel,
  hasMoreLevels,
  onMascotReact,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Shuffled right items for the game
  const [shuffledRightItems, setShuffledRightItems] = useState<MatchingItem[]>([]);
  // Completed connections
  const [connections, setConnections] = useState<MatchConnection[]>([]);
  // Active dragging / selecting
  const [activeLeftId, setActiveLeftId] = useState<string | null>(null);
  const [dragCurrentPoint, setDragCurrentPoint] = useState<Point | null>(null);
  // Level completion state
  const [isLevelFinished, setIsLevelFinished] = useState(false);

  // Store refs to connector peg elements
  const leftPegRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const rightPegRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  // Shuffle right side items when level changes
  useEffect(() => {
    // Deterministic or intentional shuffle so it doesn't match directly in order
    // In screenshot: A, B, C, D maps to Cat, Apple, Duck, Ball (C, A, D, B)
    const items = [...level.items];
    if (items.length === 4) {
      // Shuffled order: 2 (Cat), 0 (Apple), 3 (Duck), 1 (Ball)
      const specificShuffle = [items[2], items[0], items[3], items[1]].filter(Boolean);
      if (specificShuffle.length === 4) {
        setShuffledRightItems(specificShuffle);
      } else {
        setShuffledRightItems([...items].sort(() => Math.random() - 0.5));
      }
    } else {
      setShuffledRightItems([...items].sort(() => Math.random() - 0.5));
    }

    setConnections([]);
    setActiveLeftId(null);
    setDragCurrentPoint(null);
    setIsLevelFinished(false);

    onMascotReact('talking', `Match ${level.title}!`);
    soundManager.speak(`Match ${level.title}! Draw a line from each letter to its picture!`);
  }, [level.id]);

  // Helper to calculate peg center relative to container
  const getPegCenter = useCallback((pegEl: HTMLElement | null): Point | null => {
    if (!pegEl || !containerRef.current) return null;
    const containerRect = containerRef.current.getBoundingClientRect();
    const pegRect = pegEl.getBoundingClientRect();
    return {
      x: pegRect.left + pegRect.width / 2 - containerRect.left,
      y: pegRect.top + pegRect.height / 2 - containerRect.top,
    };
  }, []);

  // Update existing connections coordinates on resize
  const updateConnectionPoints = useCallback(() => {
    setConnections((prev) =>
      prev.map((conn) => {
        const leftPeg = leftPegRefs.current[conn.leftId];
        const rightPeg = rightPegRefs.current[conn.rightId];
        const leftPoint = getPegCenter(leftPeg);
        const rightPoint = getPegCenter(rightPeg);
        if (leftPoint && rightPoint) {
          return { ...conn, leftPoint, rightPoint };
        }
        return conn;
      })
    );
  }, [getPegCenter]);

  useEffect(() => {
    window.addEventListener('resize', updateConnectionPoints);
    return () => window.removeEventListener('resize', updateConnectionPoints);
  }, [updateConnectionPoints]);

  // Recalculate connection points whenever items mount/update
  useEffect(() => {
    const timer = setTimeout(updateConnectionPoints, 100);
    return () => clearTimeout(timer);
  }, [shuffledRightItems, updateConnectionPoints]);

  // Start connecting from left item (touch or mouse down)
  const handleStartConnect = (item: MatchingItem, e: React.PointerEvent) => {
    // Check if already matched
    if (connections.some((c) => c.leftId === item.id)) {
      return;
    }

    soundManager.playPop();
    soundManager.speak(item.leftValue);
    setActiveLeftId(item.id);

    if (containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      setDragCurrentPoint({
        x: e.clientX - containerRect.left,
        y: e.clientY - containerRect.top,
      });
    }

    onMascotReact('thinking', `Where does ${item.leftValue} go?`);
  };

  // Pointer move to drag line
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!activeLeftId || !containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    setDragCurrentPoint({
      x: e.clientX - containerRect.left,
      y: e.clientY - containerRect.top,
    });
  };

  // Check if item connects
  const handleConnectTarget = (targetItem: MatchingItem) => {
    if (!activeLeftId) return;

    // Check if right item is already matched
    if (connections.some((c) => c.rightId === targetItem.id)) {
      soundManager.playBoing();
      setActiveLeftId(null);
      setDragCurrentPoint(null);
      return;
    }

    // Is it a valid match?
    if (activeLeftId === targetItem.id) {
      // CORRECT MATCH!
      const leftItem = level.items.find((i) => i.id === activeLeftId);
      const leftPeg = leftPegRefs.current[activeLeftId];
      const rightPeg = rightPegRefs.current[targetItem.id];
      const leftPoint = getPegCenter(leftPeg);
      const rightPoint = getPegCenter(rightPeg);

      if (leftPoint && rightPoint && leftItem) {
        const newConnection: MatchConnection = {
          leftId: activeLeftId,
          rightId: targetItem.id,
          color: leftItem.leftColor,
          leftPoint,
          rightPoint,
        };

        const nextConnections = [...connections, newConnection];
        setConnections(nextConnections);

        // Sound & speech
        soundManager.playCorrect();
        soundManager.speak(leftItem.phonics);
        onMascotReact('cheering', `Awesome! ${leftItem.leftValue} is for ${leftItem.rightValue}!`);

        // Check if all items are matched!
        if (nextConnections.length === level.items.length) {
          setTimeout(() => {
            handleLevelVictory();
          }, 600);
        }
      }
    } else {
      // WRONG MATCH
      soundManager.playBoing();
      onMascotReact('thinking', 'Try again! You can do it!');
    }

    setActiveLeftId(null);
    setDragCurrentPoint(null);
  };

  // End drag
  const handlePointerUp = (e: React.PointerEvent) => {
    if (!activeLeftId) return;

    // Check if released over a right side item element
    const elem = document.elementFromPoint(e.clientX, e.clientY);
    const rightCard = elem?.closest('[data-right-id]');
    if (rightCard) {
      const rightId = rightCard.getAttribute('data-right-id');
      const targetItem = shuffledRightItems.find((i) => i.id === rightId);
      if (targetItem) {
        handleConnectTarget(targetItem);
        return;
      }
    }

    // Dropped on empty space
    setActiveLeftId(null);
    setDragCurrentPoint(null);
  };

  // Level Complete Celebration
  const handleLevelVictory = () => {
    setIsLevelFinished(true);
    soundManager.playFanfare();
    soundManager.speak('Super job! You matched them all!');
    onMascotReact('cheering', 'Hooray! Level Complete!');

    // Trigger colorful confetti
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#FF2A6D', '#05D9E8', '#00E676', '#FFD700', '#E040FB'],
    });

    onLevelComplete(3);
  };

  // Active line start point
  const activeStartPoint = useMemo(() => {
    if (!activeLeftId) return null;
    const peg = leftPegRefs.current[activeLeftId];
    return getPegCenter(peg);
  }, [activeLeftId, getPegCenter]);

  return (
    <div
      id="connect-game-screen"
      className="relative w-full max-w-2xl mx-auto flex flex-col items-center select-none"
    >
      {/* Subtitle & Phonics Prompt */}
      <div className="text-center mb-3">
        <h2 className="text-xl sm:text-2xl font-black text-amber-300 drop-shadow flex items-center justify-center gap-2">
          <span>{level.title}</span>
          <button
            onClick={() => soundManager.speak(level.subtitle)}
            className="p-1 text-amber-300 hover:text-white transition"
            title="Read instructions"
          >
            <Volume2 className="w-5 h-5 inline" />
          </button>
        </h2>
        <p className="text-sm font-bold text-amber-100/90">{level.subtitle}</p>
      </div>

      {/* Main Game Blackboard / Sky Board - Inspired by screenshot */}
      <div
        ref={containerRef}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className="relative w-full bg-[#35d0ea] border-4 border-[#0284c7] rounded-3xl p-4 sm:p-6 shadow-2xl overflow-hidden touch-none"
        style={{
          boxShadow: 'inset 0 4px 12px rgba(255,255,255,0.4), 0 10px 25px rgba(0,0,0,0.3)',
        }}
      >
        {/* SVG Drawing Layer for Connected & Dragging Lines */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
          style={{ overflow: 'visible' }}
        >
          <defs>
            <filter id="lineGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.4" />
            </filter>
          </defs>

          {/* Locked In Connections - Bold black line as seen in screenshot */}
          {connections.map((conn) => (
            <g key={`${conn.leftId}-${conn.rightId}`}>
              {/* Outer stroke shadow for contrast */}
              <line
                x1={conn.leftPoint.x}
                y1={conn.leftPoint.y}
                x2={conn.rightPoint.x}
                y2={conn.rightPoint.y}
                stroke="#1e293b"
                strokeWidth="8"
                strokeLinecap="round"
                filter="url(#lineGlow)"
              />
              {/* Inner stroke */}
              <line
                x1={conn.leftPoint.x}
                y1={conn.leftPoint.y}
                x2={conn.rightPoint.x}
                y2={conn.rightPoint.y}
                stroke="#0f172a"
                strokeWidth="6"
                strokeLinecap="round"
              />
              {/* Animated star in the center of the line */}
              <circle
                cx={(conn.leftPoint.x + conn.rightPoint.x) / 2}
                cy={(conn.leftPoint.y + conn.rightPoint.y) / 2}
                r="7"
                fill="#FDE047"
                stroke="#1E293B"
                strokeWidth="2"
              />
            </g>
          ))}

          {/* Active Dragging Line */}
          {activeStartPoint && dragCurrentPoint && (
            <line
              x1={activeStartPoint.x}
              y1={activeStartPoint.y}
              x2={dragCurrentPoint.x}
              y2={dragCurrentPoint.y}
              stroke="#0f172a"
              strokeWidth="7"
              strokeLinecap="round"
              strokeDasharray="8,8"
              filter="url(#lineGlow)"
            />
          )}
        </svg>

        {/* Playfield Columns: Left Letters & Right Pictures */}
        <div className="grid grid-cols-2 gap-8 sm:gap-14 relative z-0">
          {/* LEFT COLUMN: Letters / Values */}
          <div className="flex flex-col gap-3 sm:gap-4">
            {level.items.map((item) => {
              const isMatched = connections.some((c) => c.leftId === item.id);
              const isActive = activeLeftId === item.id;

              return (
                <div
                  key={item.id}
                  id={`matching-left-${item.id}`}
                  onPointerDown={(e) => handleStartConnect(item, e)}
                  onClick={() => {
                    if (!isMatched && !activeLeftId) {
                      setActiveLeftId(item.id);
                      soundManager.playPop();
                      soundManager.speak(item.leftValue);
                    }
                  }}
                  className={`relative flex items-center justify-between bg-white/95 hover:bg-white rounded-2xl p-2.5 sm:p-3 shadow-md border-3 transition-all cursor-pointer select-none ${
                    isActive
                      ? 'ring-4 ring-amber-400 scale-105 border-amber-500'
                      : isMatched
                      ? 'border-emerald-500 bg-emerald-50 opacity-90'
                      : 'border-slate-800/20 active:scale-95'
                  }`}
                >
                  {/* Left Big Friendly Letter */}
                  <div
                    className="font-black text-3xl sm:text-4xl px-2"
                    style={{
                      color: item.leftColor,
                      textShadow: '2px 2px 0px rgba(0,0,0,0.15)',
                    }}
                  >
                    {item.leftValue}
                  </div>

                  {/* Connector Peg / Button */}
                  <button
                    ref={(el) => (leftPegRefs.current[item.id] = el)}
                    id={`peg-left-${item.id}`}
                    aria-label={`Connect letter ${item.leftValue}`}
                    className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full border-3 flex items-center justify-center transition-all ${
                      isMatched
                        ? 'bg-emerald-500 border-slate-900 text-white'
                        : isActive
                        ? 'bg-amber-400 border-slate-900 scale-125'
                        : 'bg-slate-900 border-white text-transparent'
                    }`}
                  >
                    {isMatched && <Check className="w-3.5 h-3.5 stroke-[4]" />}
                  </button>
                </div>
              );
            })}
          </div>

          {/* RIGHT COLUMN: Shuffled Pictures */}
          <div className="flex flex-col gap-3 sm:gap-4">
            {shuffledRightItems.map((item) => {
              const isMatched = connections.some((c) => c.rightId === item.id);

              return (
                <div
                  key={item.id}
                  id={`matching-right-${item.id}`}
                  data-right-id={item.id}
                  onClick={() => {
                    if (activeLeftId) {
                      handleConnectTarget(item);
                    } else {
                      soundManager.playPop();
                      soundManager.speak(item.rightValue);
                    }
                  }}
                  className={`relative flex items-center justify-between bg-white/95 hover:bg-white rounded-2xl p-2 sm:p-2.5 shadow-md border-3 transition-all cursor-pointer select-none ${
                    isMatched
                      ? 'border-emerald-500 bg-emerald-50 opacity-90'
                      : activeLeftId
                      ? 'border-amber-400 animate-pulse active:scale-95'
                      : 'border-slate-800/20 active:scale-95'
                  }`}
                >
                  {/* Connector Peg / Button */}
                  <button
                    ref={(el) => (rightPegRefs.current[item.id] = el)}
                    id={`peg-right-${item.id}`}
                    aria-label={`Connect image ${item.rightLabel}`}
                    className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full border-3 flex items-center justify-center transition-all ${
                      isMatched
                        ? 'bg-emerald-500 border-slate-900 text-white'
                        : 'bg-slate-900 border-white'
                    }`}
                  >
                    {isMatched && <Check className="w-3.5 h-3.5 stroke-[4] text-white" />}
                  </button>

                  {/* Picture Emoji / Artwork + Label */}
                  <div className="flex items-center gap-2 pr-2">
                    <span className="text-3xl sm:text-4xl drop-shadow-sm filter">
                      {item.rightEmoji}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-slate-700 hidden sm:inline">
                      {item.rightLabel}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Guidance tip on bottom */}
        <div className="mt-4 text-center">
          <p className="text-xs sm:text-sm font-bold text-sky-950/80 bg-white/60 inline-block px-3 py-1 rounded-full border border-sky-400">
            👉 Tip: Drag or tap a letter, then touch its picture!
          </p>
        </div>
      </div>

      {/* Level Victory Modal Overlay */}
      <AnimatePresence>
        {isLevelFinished && (
          <motion.div
            id="modal-level-complete"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute inset-0 z-30 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs rounded-3xl"
          >
            <div className="bg-amber-100 border-4 border-amber-400 rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center shadow-2xl flex flex-col items-center">
              {/* Stars animation */}
              <div className="flex items-center gap-2 mb-2">
                {[1, 2, 3].map((starIdx) => (
                  <motion.div
                    key={starIdx}
                    initial={{ scale: 0, rotate: -30 }}
                    animate={{ scale: [0, 1.3, 1], rotate: 0 }}
                    transition={{ delay: starIdx * 0.15 }}
                  >
                    <Star className="w-10 h-10 text-yellow-400 fill-yellow-400 drop-shadow-md" />
                  </motion.div>
                ))}
              </div>

              <h3 className="text-2xl font-black text-amber-900 mb-1">
                GREAT JOB! 🌟
              </h3>
              <p className="text-sm font-bold text-amber-800 mb-5">
                You matched all the pairs perfectly!
              </p>

              <div className="flex flex-col sm:flex-row gap-3 w-full">
                {hasMoreLevels ? (
                  <button
                    id="btn-next-level"
                    onClick={() => {
                      soundManager.playPop();
                      if (onNextLevel) onNextLevel();
                    }}
                    className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-black py-3 px-4 rounded-2xl shadow-lg border-2 border-emerald-400 flex items-center justify-center gap-2 text-lg active:scale-95 transition"
                  >
                    <span>Next Level</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                ) : (
                  <button
                    id="btn-replay-level"
                    onClick={() => {
                      setConnections([]);
                      setIsLevelFinished(false);
                      soundManager.playPop();
                    }}
                    className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-black py-3 px-4 rounded-2xl shadow-lg border-2 border-amber-400 flex items-center justify-center gap-2 text-lg active:scale-95 transition"
                  >
                    <span>Play Again</span>
                    <Sparkles className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
