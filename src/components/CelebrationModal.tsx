import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Star, ArrowRight, RotateCcw, Volume2 } from 'lucide-react';
import { LetterData } from '../types/alphabet';
import { LetterIllustration } from './Illustrations';
import { soundEngine } from '../utils/soundEngine';

interface CelebrationModalProps {
  isOpen: boolean;
  letterData: LetterData;
  onNext: () => void;
  onRetry: () => void;
}

export const CelebrationModal: React.FC<CelebrationModalProps> = ({
  isOpen,
  letterData,
  onNext,
  onRetry,
}) => {
  useEffect(() => {
    if (isOpen) {
      soundEngine.playCelebration();
      const timer = setTimeout(() => {
        soundEngine.speakPraise(letterData.letter);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen, letterData.letter]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
        {/* Floating Celebration Stars Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(16)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                y: '100vh',
                x: `${(i * 6.5) % 100}vw`,
                scale: 0.5,
                opacity: 0,
                rotate: 0,
              }}
              animate={{
                y: '-20vh',
                opacity: [0, 1, 1, 0],
                scale: [0.5, 1.2, 1],
                rotate: 360,
              }}
              transition={{
                duration: 2.2 + (i % 4) * 0.4,
                repeat: Infinity,
                delay: (i * 0.15) % 1.5,
                ease: 'easeOut',
              }}
              className="absolute text-yellow-300 drop-shadow-md"
            >
              <Star className="w-8 h-8 fill-yellow-400 stroke-yellow-500" />
            </motion.div>
          ))}
        </div>

        {/* Modal Card */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: 'spring', damping: 18, stiffness: 220 }}
          className="relative w-full max-w-sm sm:max-w-md rounded-3xl bg-white shadow-2xl border-6 border-emerald-400 p-6 text-center overflow-hidden"
        >
          {/* Top Sunburst Glow */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-emerald-100 rounded-full blur-2xl pointer-events-none" />

          {/* Big Green Tick Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.25, 1] }}
            transition={{ delay: 0.15, type: 'spring', stiffness: 280 }}
            className="w-24 h-24 mx-auto rounded-full bg-gradient-to-tr from-emerald-500 to-green-400 flex items-center justify-center shadow-xl border-4 border-white ring-4 ring-emerald-200"
          >
            <Check className="w-14 h-14 text-white stroke-[4]" />
          </motion.div>

          {/* Stars Rating */}
          <div className="flex justify-center items-center gap-1.5 mt-3">
            {[1, 2, 3].map((starIndex) => (
              <motion.div
                key={starIndex}
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.25 + starIndex * 0.1, type: 'spring' }}
              >
                <Star className="w-9 h-9 fill-amber-400 stroke-amber-500 drop-shadow-sm" />
              </motion.div>
            ))}
          </div>

          {/* Cheerful Title */}
          <h2 className="mt-2 text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            GREAT JOB!
          </h2>
          <p className="text-base sm:text-lg font-extrabold text-emerald-600 mt-0.5">
            You Traced Letter {letterData.letter}!
          </p>

          {/* Letter & Picture Mini Card */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="mt-4 p-3 rounded-2xl bg-indigo-50/80 border-2 border-indigo-100 flex items-center justify-center gap-4"
          >
            <span
              className="text-5xl font-black drop-shadow-sm"
              style={{ color: letterData.color }}
            >
              {letterData.letter}
            </span>
            <div className="w-14 h-14 bg-white rounded-xl shadow-xs flex items-center justify-center p-1 border border-indigo-100">
              <LetterIllustration letter={letterData.letter} className="w-12 h-12" />
            </div>
            <div className="text-left">
              <span className="text-xs uppercase font-black text-indigo-400 block tracking-wider">
                Letter {letterData.letter}
              </span>
              <span className="text-xl font-black text-indigo-950">
                {letterData.word}
              </span>
            </div>
          </motion.div>

          {/* Sound Repeat Pill */}
          <button
            onClick={() => soundEngine.speakLetter(letterData.letter, letterData.word, letterData.phonicsExample)}
            className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-xs shadow-xs active:scale-95 transition"
          >
            <Volume2 className="w-3.5 h-3.5 text-amber-600" />
            <span>Hear "{letterData.letter} for {letterData.word}"</span>
          </button>

          {/* Action Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              onClick={onRetry}
              className="flex-1 py-3.5 px-4 rounded-2xl bg-gray-100 hover:bg-gray-200 active:scale-95 text-gray-700 font-extrabold text-base transition flex items-center justify-center gap-2 border-2 border-gray-200"
            >
              <RotateCcw className="w-5 h-5 text-gray-500" />
              <span>Trace Again</span>
            </button>

            <button
              onClick={onNext}
              className="flex-2 py-3.5 px-5 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 active:scale-95 text-white font-black text-lg shadow-lg hover:shadow-xl transition flex items-center justify-center gap-2 border-2 border-emerald-300"
            >
              <span>Next Letter</span>
              <ArrowRight className="w-6 h-6 stroke-[3]" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
