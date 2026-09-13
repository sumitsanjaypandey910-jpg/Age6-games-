import React from 'react';
import { Volume2, VolumeX, Sparkles, RotateCcw, Trophy, Mic, MicOff, Music, Play, Pause, Heart } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface HeaderProps {
  stars: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
  speechEnabled: boolean;
  onToggleSpeech: () => void;
  onResetLevel: () => void;
  onOpenStickers: () => void;
  ageBracket: string;
  onChangeAgeBracket: (age: string) => void;
  isMusicPlaying: boolean;
  currentMusicName: string;
  onToggleMusic: () => void;
  onOpenMusicSelector: () => void;
  onUnlimitedInfo?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  stars,
  soundEnabled,
  onToggleSound,
  speechEnabled,
  onToggleSpeech,
  onResetLevel,
  onOpenStickers,
  ageBracket,
  onChangeAgeBracket,
  isMusicPlaying,
  currentMusicName,
  onToggleMusic,
  onOpenMusicSelector,
  onUnlimitedInfo,
}) => {
  return (
    <header
      id="app-header"
      className="w-full max-w-5xl mx-auto px-3 py-2 sm:px-4 sm:py-3 flex flex-wrap items-center justify-between gap-2 select-none"
    >
      {/* Left badges - just like in the screenshot! */}
      <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
        {/* No Ads badge */}
        <div
          id="badge-no-ads"
          className="bg-amber-300 text-red-600 font-extrabold px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm tracking-wide shadow-md border-2 border-amber-400 uppercase transform -rotate-2"
        >
          No Ads
        </div>

        {/* Unlimited Lives & Levels badge */}
        <button
          id="badge-unlimited"
          onClick={onUnlimitedInfo}
          className="flex items-center gap-1.5 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-black px-2.5 py-1 rounded-full text-xs shadow-md border-2 border-rose-300 transition active:scale-95 cursor-pointer"
          title="Unlimited Lives ❤️ & Unlimited Levels ✨: Play endlessly with zero pressure!"
        >
          <Heart className="w-3.5 h-3.5 text-white fill-white animate-pulse" />
          <span className="tracking-wide">∞ Lives &amp; Levels</span>
        </button>

        {/* Age selector pill */}
        <div
          id="badge-age-bracket"
          className="relative inline-flex items-center bg-rose-600 text-white font-black text-xs sm:text-sm px-2.5 sm:px-3 py-1 rounded-full shadow-md border-2 border-rose-400"
        >
          <span>Age:</span>
          <select
            value={ageBracket}
            onChange={(e) => {
              onChangeAgeBracket(e.target.value);
              soundManager.playPop();
            }}
            aria-label="Select age bracket"
            className="bg-transparent font-black ml-1 cursor-pointer outline-none text-yellow-200"
          >
            <option value="5 to 9" className="bg-rose-700 text-white">5 To 9</option>
            <option value="3 to 5" className="bg-rose-700 text-white">3 To 5</option>
            <option value="7 to 10" className="bg-rose-700 text-white">7 To 10</option>
          </select>
        </div>
      </div>

      {/* Brand Center Title */}
      <div className="flex items-center gap-1.5 font-black text-lg sm:text-2xl drop-shadow-md">
        <span className="text-amber-400 text-2xl sm:text-3xl">🐝</span>
        <span className="text-yellow-300">KIDS</span>
        <span className="text-pink-400">&amp;</span>
        <span className="text-cyan-300">FRIENDS</span>
      </div>

      {/* Right controls: Music Samples, Stars, Sound, Reset, Stickers */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Background Music Button & Samples Picker */}
        <div className="flex items-center bg-amber-950/70 border-2 border-amber-400/70 rounded-full p-0.5 shadow-sm">
          <button
            id="btn-toggle-bgm"
            onClick={onToggleMusic}
            className={`p-1.5 rounded-full transition active:scale-95 flex items-center justify-center cursor-pointer ${
              isMusicPlaying
                ? 'bg-emerald-500 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
            title={isMusicPlaying ? 'Pause background music' : 'Play background music'}
          >
            {isMusicPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
          </button>

          <button
            id="btn-open-music-samples"
            onClick={onOpenMusicSelector}
            className="flex items-center gap-1 px-2 py-0.5 text-xs font-black text-amber-200 hover:text-white transition cursor-pointer"
            title="Listen to all music samples & pick the best one"
          >
            <Music className="w-3.5 h-3.5 text-yellow-400" />
            <span className="hidden md:inline max-w-[90px] truncate">{currentMusicName}</span>
            <span className="bg-amber-400/30 text-[10px] px-1.5 py-0.2 rounded-full font-bold text-amber-200">
              Samples
            </span>
          </button>
        </div>

        {/* Stars counter */}
        <button
          id="btn-stars-counter"
          onClick={onOpenStickers}
          className="flex items-center gap-1.5 bg-amber-400/20 hover:bg-amber-400/30 text-yellow-300 border-2 border-yellow-400/60 font-black px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm shadow-sm transition active:scale-95"
          title="View unlocked stickers"
        >
          <Sparkles className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          <span>{stars}</span>
        </button>

        {/* Sticker Book Button */}
        <button
          id="btn-sticker-book"
          onClick={onOpenStickers}
          className="bg-purple-600 hover:bg-purple-500 text-white p-1.5 sm:p-2 rounded-full shadow-md border-2 border-purple-400 transition active:scale-95 flex items-center justify-center cursor-pointer"
          title="Stickers & Badges"
        >
          <Trophy className="w-4 h-4 text-amber-300" />
        </button>

        {/* Voice Speech Toggle */}
        <button
          id="btn-toggle-speech"
          onClick={onToggleSpeech}
          className={`p-1.5 sm:p-2 rounded-full shadow-md border-2 transition active:scale-95 flex items-center justify-center cursor-pointer ${
            speechEnabled
              ? 'bg-emerald-600 border-emerald-400 text-white'
              : 'bg-slate-700 border-slate-500 text-slate-400'
          }`}
          title={speechEnabled ? 'Voice guide: ON' : 'Voice guide: OFF'}
        >
          {speechEnabled ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
        </button>

        {/* Sound Effects Toggle */}
        <button
          id="btn-toggle-sound"
          onClick={onToggleSound}
          className={`p-1.5 sm:p-2 rounded-full shadow-md border-2 transition active:scale-95 flex items-center justify-center cursor-pointer ${
            soundEnabled
              ? 'bg-blue-600 border-blue-400 text-white'
              : 'bg-slate-700 border-slate-500 text-slate-400'
          }`}
          title={soundEnabled ? 'Sound FX: ON' : 'Sound FX: OFF'}
        >
          {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>

        {/* Reset / Restart Level */}
        <button
          id="btn-reset-level"
          onClick={onResetLevel}
          className="bg-amber-500 hover:bg-amber-400 text-white p-1.5 sm:p-2 rounded-full shadow-md border-2 border-amber-300 transition active:scale-95 flex items-center justify-center cursor-pointer"
          title="Restart this activity"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
