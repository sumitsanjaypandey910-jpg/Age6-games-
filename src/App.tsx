/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { GameMode } from './types';
import { Header } from './components/Header';
import { Mascot } from './components/Mascot';
import { ConnectLineGame } from './components/ConnectLineGame';
import { OddOneOutGame } from './components/OddOneOutGame';
import { ColorSortGame } from './components/ColorSortGame';
import { StickerRewardsModal } from './components/StickerRewardsModal';
import { MusicPlayerModal } from './components/MusicPlayerModal';
import { MATCHING_LEVELS, ODD_ONE_OUT_LEVELS, SORTING_LEVELS } from './data/gameData';
import { getMatchingLevel, getOddOneOutLevel, getSortingLevel } from './utils/levelGenerator';
import { soundManager } from './utils/audio';
import { bgmEngine, MusicTrack } from './utils/bgm';
import { Sparkles, Trophy, ChevronLeft, ChevronRight, CheckCircle2, Music } from 'lucide-react';

export default function App() {
  // Game mode
  const [currentMode, setCurrentMode] = useState<GameMode>('matching');

  // Level indices
  const [matchingLevelIdx, setMatchingLevelIdx] = useState(0);
  const [oddLevelIdx, setOddLevelIdx] = useState(0);
  const [sortLevelIdx, setSortLevelIdx] = useState(0);

  // Restart key to trigger component remount if needed
  const [restartKey, setRestartKey] = useState(0);

  // Audio settings
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [speechEnabled, setSpeechEnabled] = useState(true);

  // Background Music state
  const [isMusicModalOpen, setIsMusicModalOpen] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [selectedTrackId, setSelectedTrackId] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('kids_app_best_music');
      return saved || 'sunny_playground';
    } catch {
      return 'sunny_playground';
    }
  });

  // Age selection
  const [ageBracket, setAgeBracket] = useState('5 to 9');

  // Mascot state
  const [mascotMood, setMascotMood] = useState<'happy' | 'cheering' | 'talking' | 'thinking'>('happy');
  const [mascotSpeech, setMascotSpeech] = useState<string>('Welcome little friend! Let’s play & learn!');

  // Star points & sticker modal
  const [stars, setStars] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('kids_app_stars');
      return saved ? parseInt(saved, 10) : 3;
    } catch {
      return 3;
    }
  });
  const [isStickersOpen, setIsStickersOpen] = useState(false);

  // Sync BGM Engine changes
  useEffect(() => {
    // Set initial track from storage
    bgmEngine.setTrack(selectedTrackId, false);

    const updateBgm = () => {
      const status = bgmEngine.getStatus();
      setIsMusicPlaying(status.isPlaying);
      setSelectedTrackId(status.currentTrackId);
    };

    updateBgm();
    const unsub = bgmEngine.subscribe(updateBgm);
    return unsub;
  }, [selectedTrackId]);

  // Save stars to local storage
  useEffect(() => {
    try {
      localStorage.setItem('kids_app_stars', stars.toString());
    } catch {
      // Storage fallback
    }
  }, [stars]);

  // Handle mascot reaction
  const triggerMascotReaction = (
    mood: 'happy' | 'cheering' | 'talking' | 'thinking',
    message?: string
  ) => {
    setMascotMood(mood);
    if (message) {
      setMascotSpeech(message);
    }
    if (mood === 'cheering' || mood === 'talking') {
      setTimeout(() => {
        setMascotMood('happy');
      }, 3500);
    }
  };

  // Add stars
  const handleEarnStars = (amount: number) => {
    setStars((prev) => prev + amount);
  };

  // Audio toggles
  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundManager.enabled = next;
    if (next) soundManager.playPop();
  };

  const handleToggleSpeech = () => {
    const next = !speechEnabled;
    setSpeechEnabled(next);
    soundManager.speechEnabled = next;
    if (next) {
      soundManager.speak('Voice is on!');
    }
  };

  const handleToggleMusic = () => {
    soundManager.playPop();
    bgmEngine.togglePlay();
  };

  const handleSelectBestTrack = (track: MusicTrack) => {
    setSelectedTrackId(track.id);
    try {
      localStorage.setItem('kids_app_best_music', track.id);
    } catch {
      // fallback
    }
    triggerMascotReaction('cheering', `I love this host music: ${track.name}!`);
  };

  const handleUnlimitedInfo = () => {
    soundManager.playFanfare();
    soundManager.speak('Unlimited Lives and Unlimited Levels are active! Play, learn, and explore endlessly with zero pressure!');
    triggerMascotReaction('cheering', '❤️ Unlimited Lives & Levels! Play forever! ✨');
  };

  // Restart current level
  const handleResetLevel = () => {
    soundManager.playPop();
    setRestartKey((k) => k + 1);
    triggerMascotReaction('talking', 'Let’s restart this activity!');
  };

  const currentMatchingLevel = getMatchingLevel(matchingLevelIdx);
  const currentOddLevel = getOddOneOutLevel(oddLevelIdx);
  const currentSortLevel = getSortingLevel(sortLevelIdx);

  return (
    <div
      id="kids-app-container"
      className="min-h-screen w-full flex flex-col items-center justify-between text-slate-800 bg-[#4a2818] overflow-x-hidden font-['Fredoka',sans-serif]"
      style={{
        backgroundImage:
          'radial-gradient(ellipse at center top, #6e3922 0%, #3e1f13 60%, #2a140b 100%)',
      }}
    >
      {/* 1. Header Bar: No Ads, Age 5 to 9, Logo, Audio Controls */}
      <Header
        stars={stars}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        speechEnabled={speechEnabled}
        onToggleSpeech={handleToggleSpeech}
        onResetLevel={handleResetLevel}
        onOpenStickers={() => setIsStickersOpen(true)}
        ageBracket={ageBracket}
        onChangeAgeBracket={setAgeBracket}
        isMusicPlaying={isMusicPlaying}
        currentMusicName={bgmEngine.getCurrentTrack().name}
        onToggleMusic={handleToggleMusic}
        onOpenMusicSelector={() => setIsMusicModalOpen(true)}
        onUnlimitedInfo={handleUnlimitedInfo}
      />

      {/* 2. Main Interactive Play Area (Inspired directly by Screenshot) */}
      <main className="w-full max-w-6xl mx-auto px-2 sm:px-4 py-1 flex-1 flex flex-col items-center justify-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-4 items-center justify-center">
          
          {/* LEFT COLUMN (2 Cols on desktop): Animated Cute Mascot Leo the Lion Cub */}
          <div className="lg:col-span-2 flex flex-col items-center justify-center order-2 lg:order-1">
            <Mascot
              mood={mascotMood}
              speechMessage={mascotSpeech}
              onTap={() => {
                soundManager.playPop();
                soundManager.speak('Hi there! You are doing super awesome! Tap any card to play!');
                triggerMascotReaction('cheering', 'High five! 🐾');
              }}
            />

            {/* Level Navigator for Current Game */}
            <div className="mt-3 bg-black/40 border border-amber-500/40 rounded-2xl p-2 flex flex-col items-center gap-1 w-full max-w-[170px]">
              <div className="flex items-center gap-1">
                <span className="text-[11px] font-black text-amber-300 uppercase tracking-wide">
                  Activity Level
                </span>
                <span className="text-[9px] bg-emerald-500 text-white font-black px-1.5 py-0.2 rounded-full shadow-xs">
                  Unlimited ✨
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  id="btn-level-prev"
                  aria-label="Previous level"
                  onClick={() => {
                    soundManager.playPop();
                    if (currentMode === 'matching') {
                      setMatchingLevelIdx((i) => Math.max(0, i - 1));
                    } else if (currentMode === 'odd_one_out') {
                      setOddLevelIdx((i) => Math.max(0, i - 1));
                    } else {
                      setSortLevelIdx((i) => Math.max(0, i - 1));
                    }
                  }}
                  className="p-1 rounded-full bg-amber-500 hover:bg-amber-400 text-white disabled:opacity-30 disabled:pointer-events-none transition cursor-pointer"
                  disabled={
                    currentMode === 'matching'
                      ? matchingLevelIdx === 0
                      : currentMode === 'odd_one_out'
                      ? oddLevelIdx === 0
                      : sortLevelIdx === 0
                  }
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <span className="text-sm font-black text-white px-1 whitespace-nowrap">
                  Level {currentMode === 'matching' ? matchingLevelIdx + 1 : currentMode === 'odd_one_out' ? oddLevelIdx + 1 : sortLevelIdx + 1}
                </span>

                <button
                  id="btn-level-next"
                  aria-label="Next level"
                  onClick={() => {
                    soundManager.playPop();
                    if (currentMode === 'matching') {
                      setMatchingLevelIdx((i) => i + 1);
                    } else if (currentMode === 'odd_one_out') {
                      setOddLevelIdx((i) => i + 1);
                    } else {
                      setSortLevelIdx((i) => i + 1);
                    }
                  }}
                  className="p-1 rounded-full bg-amber-500 hover:bg-amber-400 text-white transition active:scale-95 cursor-pointer shadow-sm"
                  title="Next Level (Unlimited)"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* CENTER HERO AREA (7 Cols on desktop): The Active Game Board */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center order-1 lg:order-2 w-full">
            {currentMode === 'matching' && (
              <ConnectLineGame
                key={`match-${matchingLevelIdx}-${restartKey}`}
                level={currentMatchingLevel}
                onLevelComplete={handleEarnStars}
                onNextLevel={() => {
                  setMatchingLevelIdx((i) => i + 1);
                }}
                hasMoreLevels={true}
                onMascotReact={triggerMascotReaction}
              />
            )}

            {currentMode === 'odd_one_out' && (
              <OddOneOutGame
                key={`odd-${oddLevelIdx}-${restartKey}`}
                level={currentOddLevel}
                onLevelComplete={handleEarnStars}
                onNextLevel={() => {
                  setOddLevelIdx((i) => i + 1);
                }}
                hasMoreLevels={true}
                onMascotReact={triggerMascotReaction}
              />
            )}

            {currentMode === 'sorting' && (
              <ColorSortGame
                key={`sort-${sortLevelIdx}-${restartKey}`}
                level={currentSortLevel}
                onLevelComplete={handleEarnStars}
                onNextLevel={() => {
                  setSortLevelIdx((i) => i + 1);
                }}
                hasMoreLevels={true}
                onMascotReact={triggerMascotReaction}
              />
            )}
          </div>

          {/* RIGHT COLUMN (3 Cols on desktop): Activity Selection Cards as seen in screenshot! */}
          <div className="lg:col-span-3 flex flex-row lg:flex-col gap-3 justify-center w-full order-3">
            
            {/* Card 1: Lucas & Friends Bee Card */}
            <div
              id="card-game-branding"
              className="hidden sm:flex bg-gradient-to-r from-purple-700 to-indigo-800 border-3 border-purple-400 rounded-2xl p-2.5 shadow-lg items-center gap-2 cursor-pointer hover:brightness-110 active:scale-95 transition flex-1 lg:flex-initial"
              onClick={() => {
                soundManager.playPop();
                soundManager.speak('Buzz buzz! Welcome to Lucas and Friends learning adventure!');
                triggerMascotReaction('cheering', 'Buzz! Hello friends! 🐝');
              }}
            >
              <span className="text-3xl filter drop-shadow">🐝</span>
              <div className="text-left">
                <div className="text-xs font-black text-yellow-300 uppercase tracking-wider">
                  Lucas &amp; Friends
                </div>
                <div className="text-[10px] font-bold text-purple-200">
                  Fun &amp; Safe Learning
                </div>
              </div>
            </div>

            {/* Card 2: Main Match Line Game (Screenshot Hero) */}
            <button
              id="btn-mode-matching"
              onClick={() => {
                soundManager.playPop();
                setCurrentMode('matching');
                soundManager.speak('Letter and picture line matching!');
                triggerMascotReaction('talking', 'Draw lines to match!');
              }}
              className={`p-2.5 rounded-2xl border-3 text-left transition-all active:scale-95 cursor-pointer flex-1 lg:flex-initial shadow-lg flex items-center justify-between gap-2 ${
                currentMode === 'matching'
                  ? 'bg-sky-400 border-white ring-4 ring-sky-300 scale-[1.02]'
                  : 'bg-sky-700/80 border-sky-500 hover:bg-sky-600/90 text-white'
              }`}
            >
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-xl font-black text-rose-500 border border-slate-300 shadow-xs">
                  A
                </div>
                <div>
                  <div className={`text-xs font-black uppercase ${currentMode === 'matching' ? 'text-slate-900' : 'text-yellow-300'}`}>
                    ABC Match Lines
                  </div>
                  <div className={`text-[10px] font-bold ${currentMode === 'matching' ? 'text-sky-950' : 'text-sky-200'}`}>
                    Connect Letter to Picture
                  </div>
                </div>
              </div>
              {currentMode === 'matching' && (
                <CheckCircle2 className="w-5 h-5 text-emerald-900 fill-emerald-400 shrink-0" />
              )}
            </button>

            {/* Card 3: Odd One Out Game (Screenshot middle-right card: lollipops vs ice cream) */}
            <button
              id="btn-mode-odd-one"
              onClick={() => {
                soundManager.playPop();
                setCurrentMode('odd_one_out');
                soundManager.speak('Odd one out! Tap the one that is different!');
                triggerMascotReaction('talking', 'Which one is different?');
              }}
              className={`p-2.5 rounded-2xl border-3 text-left transition-all active:scale-95 cursor-pointer flex-1 lg:flex-initial shadow-lg flex items-center justify-between gap-2 ${
                currentMode === 'odd_one_out'
                  ? 'bg-amber-400 border-white ring-4 ring-amber-300 scale-[1.02]'
                  : 'bg-amber-800/80 border-amber-600 hover:bg-amber-700/90 text-white'
              }`}
            >
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-2xl border border-slate-300 shadow-xs">
                  🍭
                </div>
                <div>
                  <div className={`text-xs font-black uppercase ${currentMode === 'odd_one_out' ? 'text-amber-950' : 'text-yellow-300'}`}>
                    Odd One Out
                  </div>
                  <div className={`text-[10px] font-bold ${currentMode === 'odd_one_out' ? 'text-amber-900' : 'text-amber-200'}`}>
                    Spot What’s Different
                  </div>
                </div>
              </div>
              {currentMode === 'odd_one_out' && (
                <CheckCircle2 className="w-5 h-5 text-emerald-900 fill-emerald-400 shrink-0" />
              )}
            </button>

            {/* Card 4: Color Sorting Game (Screenshot bottom-right card: yellow duck into baskets) */}
            <button
              id="btn-mode-sorting"
              onClick={() => {
                soundManager.playPop();
                setCurrentMode('sorting');
                soundManager.speak('Color baskets! Sort objects into matching bins!');
                triggerMascotReaction('talking', 'Drop in the right basket!');
              }}
              className={`p-2.5 rounded-2xl border-3 text-left transition-all active:scale-95 cursor-pointer flex-1 lg:flex-initial shadow-lg flex items-center justify-between gap-2 ${
                currentMode === 'sorting'
                  ? 'bg-emerald-400 border-white ring-4 ring-emerald-300 scale-[1.02]'
                  : 'bg-emerald-800/80 border-emerald-600 hover:bg-emerald-700/90 text-white'
              }`}
            >
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-2xl border border-slate-300 shadow-xs">
                  🦆
                </div>
                <div>
                  <div className={`text-xs font-black uppercase ${currentMode === 'sorting' ? 'text-emerald-950' : 'text-yellow-300'}`}>
                    Basket Sort
                  </div>
                  <div className={`text-[10px] font-bold ${currentMode === 'sorting' ? 'text-emerald-900' : 'text-emerald-200'}`}>
                    Color &amp; Shape Drop
                  </div>
                </div>
              </div>
              {currentMode === 'sorting' && (
                <CheckCircle2 className="w-5 h-5 text-emerald-900 fill-emerald-400 shrink-0" />
              )}
            </button>

            {/* Card 5: Sticker Album Quick Access */}
            <button
              id="btn-sidebar-stickers"
              onClick={() => {
                soundManager.playPop();
                setIsStickersOpen(true);
              }}
              className="bg-purple-900/60 hover:bg-purple-900/90 border-2 border-purple-400/80 text-purple-200 p-2 rounded-2xl flex items-center justify-center gap-2 text-xs font-black transition active:scale-95 cursor-pointer"
            >
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>Sticker Album ({stars} ⭐)</span>
            </button>

            {/* Card 6: Background Host Music Samples */}
            <button
              id="btn-sidebar-music"
              onClick={() => {
                soundManager.playPop();
                setIsMusicModalOpen(true);
              }}
              className="bg-amber-900/60 hover:bg-amber-900/90 border-2 border-amber-400/80 text-amber-200 p-2 rounded-2xl flex items-center justify-center gap-2 text-xs font-black transition active:scale-95 cursor-pointer shadow-sm"
            >
              <Music className="w-4 h-4 text-amber-300" />
              <span>Host Music Samples 🎵</span>
            </button>

            {/* Card 7: Unlimited Lives & Levels */}
            <button
              id="btn-sidebar-unlimited"
              onClick={handleUnlimitedInfo}
              className="bg-rose-950/70 hover:bg-rose-900/90 border-2 border-rose-400/80 text-rose-200 p-2 rounded-2xl flex items-center justify-center gap-2 text-xs font-black transition active:scale-95 cursor-pointer shadow-sm"
              title="Unlimited Lives ❤️ & Unlimited Levels ✨: Click to hear cheer!"
            >
              <span className="text-sm">❤️</span>
              <span>Unlimited Lives &amp; Levels (∞)</span>
            </button>
          </div>

        </div>
      </main>

      {/* 3. Bottom Hero Banner - "45+ ACTIVITIES FOR KIDS" matching screenshot! */}
      <footer
        id="app-footer-banner"
        className="w-full bg-[#e11d48] border-t-4 border-amber-400 py-2 sm:py-3 px-4 text-center shadow-2xl relative overflow-hidden select-none"
      >
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-2 sm:gap-4">
          <span
            className="text-2xl sm:text-4xl md:text-5xl font-black text-lime-400 drop-shadow-[0_4px_4px_rgba(0,0,0,0.6)] tracking-wider"
            style={{
              WebkitTextStroke: '2px #15803d',
            }}
          >
            45+ ACTIVITIES
          </span>
          <span className="text-xl sm:text-3xl md:text-4xl font-black text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
            FOR KIDS
          </span>

          <div className="flex items-center gap-2 ml-2">
            <span className="bg-yellow-300 text-slate-900 text-xs sm:text-sm font-black px-2.5 py-0.5 rounded-full shadow">
              ABC Phonics
            </span>
            <span className="bg-cyan-300 text-slate-900 text-xs sm:text-sm font-black px-2.5 py-0.5 rounded-full shadow">
              Logic &amp; Sort
            </span>
            <span className="bg-pink-300 text-slate-900 text-xs sm:text-sm font-black px-2.5 py-0.5 rounded-full shadow">
              Observations
            </span>
          </div>
        </div>
      </footer>

      {/* Sticker Album Modal */}
      <StickerRewardsModal
        isOpen={isStickersOpen}
        onClose={() => setIsStickersOpen(false)}
        stars={stars}
      />

      {/* Background Music Samples & Jukebox Modal */}
      <MusicPlayerModal
        isOpen={isMusicModalOpen}
        onClose={() => setIsMusicModalOpen(false)}
        onSelectBestTrack={handleSelectBestTrack}
        selectedTrackId={selectedTrackId}
      />
    </div>
  );
}
