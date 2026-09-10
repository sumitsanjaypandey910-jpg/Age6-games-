import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Music,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Sparkles,
  Check,
  Disc,
  Radio,
} from 'lucide-react';
import { MUSIC_TRACKS, MusicTrack, bgmEngine } from '../utils/bgm';
import { soundManager } from '../utils/audio';

interface MusicPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectBestTrack: (track: MusicTrack) => void;
  selectedTrackId: string;
}

export const MusicPlayerModal: React.FC<MusicPlayerModalProps> = ({
  isOpen,
  onClose,
  onSelectBestTrack,
  selectedTrackId,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackId, setCurrentTrackId] = useState(selectedTrackId);
  const [volume, setVolume] = useState(0.22);

  // Sync state from engine
  useEffect(() => {
    const update = () => {
      const status = bgmEngine.getStatus();
      setIsPlaying(status.isPlaying);
      setCurrentTrackId(status.currentTrackId);
      setVolume(status.volume);
    };

    update();
    const unsub = bgmEngine.subscribe(update);
    return unsub;
  }, []);

  if (!isOpen) return null;

  const handlePlayTrack = (track: MusicTrack) => {
    soundManager.playPop();
    if (currentTrackId === track.id && isPlaying) {
      bgmEngine.stop();
    } else {
      bgmEngine.setTrack(track.id, true);
    }
  };

  const handleSetBest = (track: MusicTrack) => {
    soundManager.playCorrect();
    soundManager.speak(`Selected ${track.name} as your host music!`);
    bgmEngine.setTrack(track.id, true);
    onSelectBestTrack(track);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    bgmEngine.setVolume(val);
  };

  return (
    <AnimatePresence>
      <div
        id="modal-music-overlay"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs select-none"
      >
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.85, opacity: 0 }}
          className="relative w-full max-w-2xl bg-amber-50 border-4 border-amber-400 rounded-3xl p-5 sm:p-6 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b-2 border-amber-200 pb-3 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-amber-400 rounded-2xl flex items-center justify-center text-xl shadow-md border-2 border-amber-500">
                <Music className="w-6 h-6 text-amber-950" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-amber-950 flex items-center gap-2">
                  <span>Host Background Music</span>
                  <span className="text-xs bg-emerald-500 text-white font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                    5 Samples
                  </span>
                </h3>
                <p className="text-xs font-bold text-amber-800">
                  Listen to the samples below and pick the best one for the game!
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                soundManager.playPop();
                onClose();
              }}
              className="p-2 rounded-full hover:bg-amber-200 text-amber-900 transition active:scale-90 cursor-pointer"
              title="Close"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Master Volume & Live Playing Indicator */}
          <div className="bg-amber-200/80 border-2 border-amber-300 rounded-2xl p-3 mb-3 flex flex-wrap items-center justify-between gap-3 shadow-inner">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  soundManager.playPop();
                  bgmEngine.togglePlay();
                }}
                className={`px-3 py-1.5 rounded-xl font-black text-xs sm:text-sm flex items-center gap-1.5 shadow-md transition active:scale-95 cursor-pointer ${
                  isPlaying
                    ? 'bg-rose-500 hover:bg-rose-600 text-white'
                    : 'bg-emerald-500 hover:bg-emerald-600 text-white'
                }`}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4 fill-white" />
                    <span>Pause Music</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-white" />
                    <span>Play Music</span>
                  </>
                )}
              </button>

              {isPlaying && (
                <div className="flex items-center gap-1 text-xs font-black text-amber-900 animate-pulse">
                  <Radio className="w-4 h-4 text-emerald-600" />
                  <span>Now Playing: {bgmEngine.getCurrentTrack().name}</span>
                </div>
              )}
            </div>

            {/* Volume Slider */}
            <div className="flex items-center gap-2">
              {volume === 0 ? (
                <VolumeX className="w-4 h-4 text-amber-800" />
              ) : (
                <Volume2 className="w-4 h-4 text-amber-800" />
              )}
              <span className="text-xs font-black text-amber-900">Volume</span>
              <input
                type="range"
                min="0"
                max="0.6"
                step="0.02"
                value={volume}
                onChange={handleVolumeChange}
                aria-label="Background music volume"
                className="w-24 sm:w-32 accent-amber-600 cursor-pointer"
              />
              <span className="text-[10px] font-bold text-amber-800 w-8">
                {Math.round((volume / 0.6) * 100)}%
              </span>
            </div>
          </div>

          {/* Music Samples List */}
          <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 py-1">
            {MUSIC_TRACKS.map((track) => {
              const isSelected = selectedTrackId === track.id;
              const isCurrentPlaying = currentTrackId === track.id && isPlaying;

              return (
                <div
                  key={track.id}
                  id={`track-card-${track.id}`}
                  className={`p-3 sm:p-3.5 rounded-2xl border-3 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-amber-100/90 border-amber-500 shadow-md ring-2 ring-amber-400'
                      : 'bg-white border-amber-200/90 hover:border-amber-400 shadow-xs'
                  }`}
                >
                  {/* Track Info */}
                  <div className="flex items-start sm:items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-sm shrink-0 border-2"
                      style={{
                        backgroundColor: `${track.color}20`,
                        borderColor: track.color,
                      }}
                    >
                      {isCurrentPlaying ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
                        >
                          <Disc className="w-7 h-7" style={{ color: track.color }} />
                        </motion.div>
                      ) : (
                        <span>{track.icon}</span>
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-black text-base sm:text-lg text-slate-800">
                          {track.name}
                        </h4>
                        <span
                          className="text-[10px] font-black px-2 py-0.5 rounded-full text-white"
                          style={{ backgroundColor: track.color }}
                        >
                          {track.tag}
                        </span>
                        <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                          {track.bpm} BPM
                        </span>
                      </div>

                      <p className="text-xs font-semibold text-slate-600 mt-0.5 line-clamp-1 sm:line-clamp-none">
                        {track.description}
                      </p>
                      <p className="text-[11px] font-bold text-slate-500 mt-0.5">
                        🎵 Instruments: {track.instrument}
                      </p>
                    </div>
                  </div>

                  {/* Actions: Test Play & Keep Best */}
                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    {/* Play/Stop Preview */}
                    <button
                      id={`btn-preview-${track.id}`}
                      onClick={() => handlePlayTrack(track)}
                      className={`px-3 py-1.5 rounded-xl font-black text-xs flex items-center gap-1.5 transition active:scale-95 cursor-pointer shadow-xs ${
                        isCurrentPlaying
                          ? 'bg-rose-600 hover:bg-rose-500 text-white'
                          : 'bg-slate-800 hover:bg-slate-700 text-white'
                      }`}
                    >
                      {isCurrentPlaying ? (
                        <>
                          <Pause className="w-3.5 h-3.5 fill-white" />
                          <span>Stop</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 fill-white" />
                          <span>Preview</span>
                        </>
                      )}
                    </button>

                    {/* Set as Best */}
                    <button
                      id={`btn-select-${track.id}`}
                      onClick={() => handleSetBest(track)}
                      className={`px-3 py-1.5 rounded-xl font-black text-xs flex items-center gap-1.5 transition active:scale-95 cursor-pointer shadow-sm ${
                        isSelected
                          ? 'bg-emerald-600 text-white ring-2 ring-emerald-400'
                          : 'bg-amber-400 hover:bg-amber-500 text-amber-950'
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                          <span>Active Best</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Keep This Best</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom helper info */}
          <div className="mt-3 pt-2 border-t border-amber-200 text-center flex items-center justify-between text-xs font-bold text-amber-900">
            <span>💡 Tap "Preview" to listen or "Keep This Best" to lock it in!</span>
            <button
              onClick={() => {
                soundManager.playPop();
                onClose();
              }}
              className="bg-amber-800 hover:bg-amber-900 text-amber-100 px-4 py-1 rounded-xl text-xs font-black transition cursor-pointer"
            >
              Done
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
