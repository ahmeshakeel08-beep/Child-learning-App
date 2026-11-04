import React from 'react';
import { X, Check, Star } from 'lucide-react';
import { ALPHABET, LetterData } from '../types/alphabet';
import { soundEngine } from '../utils/soundEngine';

interface AlphabetDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentIndex: number;
  onSelectLetter: (index: number) => void;
  completedLetters: string[];
}

export const AlphabetDrawer: React.FC<AlphabetDrawerProps> = ({
  isOpen,
  onClose,
  currentIndex,
  onSelectLetter,
  completedLetters,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-xl max-h-[88vh] flex flex-col rounded-3xl bg-white shadow-2xl border-4 border-indigo-400 p-5 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🔤</span>
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-indigo-950">
                Choose a Letter
              </h3>
              <p className="text-xs text-gray-500 font-bold">
                Tap any letter from A to Z to start
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition active:scale-90"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 26 Letters Grid */}
        <div className="flex-1 overflow-y-auto py-4 grid grid-cols-4 sm:grid-cols-6 gap-2.5 sm:gap-3">
          {ALPHABET.map((item, index) => {
            const isSelected = index === currentIndex;
            const isCompleted = completedLetters.includes(item.letter);

            return (
              <button
                key={item.letter}
                onClick={() => {
                  soundEngine.playPop();
                  onSelectLetter(index);
                  onClose();
                }}
                className={`relative aspect-square rounded-2xl flex flex-col items-center justify-center transition-all transform active:scale-90 shadow-md ${
                  isSelected
                    ? 'ring-4 ring-amber-400 scale-105 shadow-lg'
                    : 'hover:scale-102 hover:shadow-md'
                }`}
                style={{
                  background: isSelected
                    ? `linear-gradient(135deg, ${item.color}, #4F46E5)`
                    : '#F8FAFC',
                  borderColor: item.color,
                  borderWidth: '3px',
                }}
              >
                {/* Completed Star badge */}
                {isCompleted && (
                  <span className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs border-2 border-white">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                )}

                <span
                  className={`text-2xl sm:text-3xl font-black ${
                    isSelected ? 'text-white' : ''
                  }`}
                  style={{ color: isSelected ? '#FFFFFF' : item.color }}
                >
                  {item.letter}
                </span>

                <span
                  className={`text-[10px] sm:text-xs font-black truncate max-w-[90%] ${
                    isSelected ? 'text-white/90' : 'text-gray-600'
                  }`}
                >
                  {item.word}
                </span>
              </button>
            );
          })}
        </div>

        {/* Progress Footer */}
        <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-gray-600">
          <span>Completed: {completedLetters.length} / 26 Letters</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold active:scale-95 transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
