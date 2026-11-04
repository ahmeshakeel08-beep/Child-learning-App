import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  Volume2,
  Home,
  Grid,
  PenTool,
  VolumeX,
  Sparkles,
} from 'lucide-react';
import { LetterData, ALPHABET } from '../types/alphabet';
import { LetterIllustration } from './Illustrations';
import { soundEngine } from '../utils/soundEngine';

interface LearningGameProps {
  currentIndex: number;
  letterData: LetterData;
  onPrev: () => void;
  onNext: () => void;
  onGoHome: () => void;
  onOpenDrawer: () => void;
  onStartTracing: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  completedLetters: string[];
}

export const LearningGame: React.FC<LearningGameProps> = ({
  currentIndex,
  letterData,
  onPrev,
  onNext,
  onGoHome,
  onOpenDrawer,
  onStartTracing,
  isMuted,
  onToggleMute,
  completedLetters,
}) => {
  const [isWobbling, setIsWobbling] = useState(false);

  // Auto-speak letter when it appears
  useEffect(() => {
    const timer = setTimeout(() => {
      soundEngine.speakLetter(
        letterData.letter,
        letterData.word,
        letterData.phonicsExample
      );
    }, 200);

    return () => clearTimeout(timer);
  }, [letterData]);

  const handleLetterTap = () => {
    soundEngine.playPop();
    setIsWobbling(true);
    soundEngine.speakLetterOnly(letterData.letter);
    setTimeout(() => setIsWobbling(false), 600);
  };

  const handleWordCardTap = () => {
    soundEngine.playPop();
    setIsWobbling(true);
    soundEngine.speakLetter(
      letterData.letter,
      letterData.word,
      letterData.phonicsExample
    );
    setTimeout(() => setIsWobbling(false), 600);
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-3 sm:p-5 max-w-4xl mx-auto w-full select-none">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between gap-2">
        <button
          onClick={() => {
            soundEngine.playPop();
            onGoHome();
          }}
          className="p-2.5 sm:p-3 rounded-2xl bg-white hover:bg-gray-100 text-gray-700 font-extrabold shadow-sm border-2 border-indigo-100 active:scale-90 transition flex items-center gap-1.5"
          title="Home"
        >
          <Home className="w-5 h-5 text-indigo-600" />
          <span className="hidden sm:inline text-xs font-bold">Home</span>
        </button>

        {/* Letter Counter Badge & A-Z Picker */}
        <button
          onClick={() => {
            soundEngine.playPop();
            onOpenDrawer();
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-gray-50 shadow-sm border-2 border-indigo-200 active:scale-95 transition"
        >
          <Grid className="w-4 h-4 text-indigo-600" />
          <span className="text-sm sm:text-base font-black text-indigo-950">
            Letter {currentIndex + 1} of 26
          </span>
          <span className="text-xs bg-indigo-100 text-indigo-800 font-black px-2 py-0.5 rounded-full">
            A-Z
          </span>
        </button>

        {/* Sound Toggle */}
        <button
          onClick={onToggleMute}
          className="p-2.5 sm:p-3 rounded-2xl bg-white hover:bg-gray-100 text-gray-700 font-bold shadow-sm border-2 border-indigo-100 active:scale-90 transition"
          title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5 text-rose-500" />
          ) : (
            <Volume2 className="w-5 h-5 text-emerald-600" />
          )}
        </button>
      </div>

      {/* Main Full-Screen Learning Stage */}
      <div className="flex-1 flex flex-col items-center justify-center my-auto py-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={letterData.letter}
            initial={{ scale: 0.85, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: -20 }}
            transition={{ type: 'spring', damping: 20, stiffness: 260 }}
            className="w-full flex flex-col md:flex-row items-center justify-center gap-5 sm:gap-8"
          >
            {/* BIG CAPITAL LETTER CARD */}
            <motion.div
              animate={isWobbling ? { rotate: [-4, 4, -4, 4, 0], scale: [1, 1.05, 1] } : {}}
              onClick={handleLetterTap}
              className="relative cursor-pointer group flex flex-col items-center justify-center w-60 sm:w-72 md:w-80 h-64 sm:h-76 md:h-84 rounded-3xl bg-white shadow-2xl border-6 transition-transform active:scale-95 overflow-hidden"
              style={{ borderColor: letterData.color }}
            >
              {/* Background Glow */}
              <div
                className="absolute inset-0 opacity-15"
                style={{
                  background: `radial-gradient(circle, ${letterData.color} 20%, transparent 70%)`,
                }}
              />

              {/* Large 3D Capital Letter */}
              <span
                className="text-8xl sm:text-9xl md:text-[150px] font-black leading-none drop-shadow-md select-none tracking-tight transform group-hover:scale-105 transition-transform"
                style={{
                  color: letterData.color,
                  textShadow: `0 8px 16px rgba(0,0,0,0.12)`,
                }}
              >
                {letterData.letter}
              </span>

              {/* Tap to Hear Hint */}
              <div className="mt-2 flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-bold">
                <Volume2 className="w-3.5 h-3.5" />
                <span>Tap to hear "{letterData.letter}"</span>
              </div>
            </motion.div>

            {/* PICTURE & WORD CARD */}
            <motion.div
              onClick={handleWordCardTap}
              className="relative cursor-pointer group flex flex-col items-center justify-center w-60 sm:w-72 md:w-80 h-64 sm:h-76 md:h-84 rounded-3xl bg-white shadow-2xl border-6 transition-transform active:scale-95 p-4 overflow-hidden border-indigo-200"
            >
              {/* Top Phonics tag */}
              <div className="text-xs font-extrabold text-indigo-500 uppercase tracking-widest mb-1">
                {letterData.letter} is for...
              </div>

              {/* Colorful Vector Illustration */}
              <div className="w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center group-hover:scale-110 transition-transform">
                <LetterIllustration letter={letterData.letter} className="w-32 h-32 sm:w-40 sm:h-40 drop-shadow-md" />
              </div>

              {/* Word Display with Highlighted First Letter */}
              <div className="mt-2 text-2xl sm:text-3xl font-black text-gray-900 tracking-wide text-center">
                <span style={{ color: letterData.color }} className="text-3xl sm:text-4xl underline decoration-wavy">
                  {letterData.word[0]}
                </span>
                <span>{letterData.word.slice(1)}</span>
              </div>

              {/* Phonics pill */}
              <div className="mt-1 text-xs text-gray-500 font-bold">
                "{letterData.phonicsExample}"
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* FINGER TRACING SHORTCUT BUTTON */}
        <div className="mt-4 sm:mt-6 w-full max-w-sm">
          <button
            onClick={() => {
              soundEngine.playPop();
              onStartTracing();
            }}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 hover:from-amber-500 hover:to-orange-500 active:scale-95 text-amber-950 font-black text-base sm:text-lg shadow-xl border-3 border-amber-200 transition flex items-center justify-center gap-2.5 animate-pulse"
          >
            <PenTool className="w-5 h-5 text-amber-950" />
            <span>Trace Letter {letterData.letter} with Finger! ✏️</span>
          </button>
        </div>
      </div>

      {/* Quick A-Z Horizontal Scroll Ribbon */}
      <div className="my-2 py-1 px-1 overflow-x-auto scrollbar-none flex items-center gap-1.5 bg-white/70 backdrop-blur-xs rounded-2xl border border-indigo-100 max-w-2xl mx-auto w-full">
        {ALPHABET.map((item, idx) => {
          const isCurrent = idx === currentIndex;
          return (
            <button
              key={item.letter}
              onClick={() => {
                soundEngine.playPop();
                if (idx !== currentIndex) {
                  onOpenDrawer();
                }
              }}
              className={`flex-shrink-0 w-8 h-8 rounded-xl font-black text-sm flex items-center justify-center transition-all ${
                isCurrent
                  ? 'bg-indigo-600 text-white scale-110 shadow-md ring-2 ring-amber-400'
                  : 'bg-white text-gray-600 hover:bg-indigo-50 border border-gray-200'
              }`}
            >
              {item.letter}
            </button>
          );
        })}
      </div>

      {/* Bottom Large Touch Controls */}
      <div className="flex items-center justify-between gap-3 max-w-lg mx-auto w-full">
        {/* Previous Button */}
        <button
          onClick={() => {
            soundEngine.playPop();
            onPrev();
          }}
          className="flex-1 py-3.5 px-4 rounded-2xl bg-white hover:bg-gray-100 text-gray-800 font-black text-base sm:text-lg shadow-lg border-3 border-indigo-200 active:scale-95 transition flex items-center justify-center gap-1.5"
        >
          <ArrowLeft className="w-6 h-6 text-indigo-600 stroke-[3]" />
          <span>Previous</span>
        </button>

        {/* Repeat Sound Button */}
        <button
          onClick={() => {
            soundEngine.playPop();
            soundEngine.speakLetter(
              letterData.letter,
              letterData.word,
              letterData.phonicsExample
            );
          }}
          className="p-3.5 rounded-2xl bg-amber-400 hover:bg-amber-500 text-amber-950 font-black shadow-lg border-3 border-amber-300 active:scale-95 transition flex items-center justify-center"
          title="Repeat Letter Sound"
        >
          <Volume2 className="w-7 h-7 stroke-[2.5]" />
        </button>

        {/* Next Button */}
        <button
          onClick={() => {
            soundEngine.playPop();
            onNext();
          }}
          className="flex-1 py-3.5 px-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-black text-base sm:text-lg shadow-lg border-3 border-indigo-300 active:scale-95 transition flex items-center justify-center gap-1.5"
        >
          <span>Next</span>
          <ArrowRight className="w-6 h-6 stroke-[3]" />
        </button>
      </div>
    </div>
  );
};
