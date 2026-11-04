import React, { useState, useEffect } from 'react';
import { ALPHABET, LetterData } from './types/alphabet';
import { MainScreen } from './components/MainScreen';
import { LearningGame } from './components/LearningGame';
import { FingerTracing } from './components/FingerTracing';
import { AlphabetDrawer } from './components/AlphabetDrawer';
import { AndroidInstallModal } from './components/AndroidInstallModal';
import { soundEngine } from './utils/soundEngine';

type ActiveScreen = 'main' | 'learning' | 'tracing';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ActiveScreen>('main');
  const [currentLetterIndex, setCurrentLetterIndex] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isAndroidModalOpen, setIsAndroidModalOpen] = useState<boolean>(false);
  const [completedLetters, setCompletedLetters] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('abc_completed_letters');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Persist completed letters
  useEffect(() => {
    try {
      localStorage.setItem('abc_completed_letters', JSON.stringify(completedLetters));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [completedLetters]);

  const currentLetter: LetterData = ALPHABET[currentLetterIndex];

  const handlePrevLetter = () => {
    soundEngine.playPop();
    setCurrentLetterIndex((prev) => (prev === 0 ? ALPHABET.length - 1 : prev - 1));
  };

  const handleNextLetter = () => {
    soundEngine.playPop();
    setCurrentLetterIndex((prev) => (prev === ALPHABET.length - 1 ? 0 : prev + 1));
  };

  const handleSelectLetter = (index: number) => {
    setCurrentLetterIndex(index);
    if (currentScreen === 'main') {
      setCurrentScreen('learning');
    }
  };

  const handleLetterCompleted = (letter: string) => {
    if (!completedLetters.includes(letter)) {
      setCompletedLetters((prev) => [...prev, letter]);
    }
  };

  const toggleMute = () => {
    const muted = soundEngine.toggleMute();
    setIsMuted(muted);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-indigo-100 via-purple-50 to-pink-50 flex flex-col justify-between overflow-x-hidden font-['Fredoka',sans-serif]">
      {/* Background playful floating shapes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-30">
        <div className="absolute top-10 left-8 w-28 h-28 rounded-full bg-amber-300 blur-2xl" />
        <div className="absolute top-1/3 right-10 w-36 h-36 rounded-full bg-pink-300 blur-2xl" />
        <div className="absolute bottom-12 left-1/4 w-44 h-44 rounded-full bg-blue-300 blur-3xl" />
      </div>

      {/* Screen Routing */}
      {currentScreen === 'main' && (
        <MainScreen
          onStart={() => {
            setCurrentScreen('learning');
            setCurrentLetterIndex(0);
          }}
          onStartTracing={() => {
            setCurrentScreen('tracing');
          }}
          onOpenDrawer={() => setIsDrawerOpen(true)}
          onOpenAndroidModal={() => setIsAndroidModalOpen(true)}
          isMuted={isMuted}
          onToggleMute={toggleMute}
          completedLettersCount={completedLetters.length}
        />
      )}

      {currentScreen === 'learning' && (
        <LearningGame
          currentIndex={currentLetterIndex}
          letterData={currentLetter}
          onPrev={handlePrevLetter}
          onNext={handleNextLetter}
          onGoHome={() => setCurrentScreen('main')}
          onOpenDrawer={() => setIsDrawerOpen(true)}
          onStartTracing={() => setCurrentScreen('tracing')}
          isMuted={isMuted}
          onToggleMute={toggleMute}
          completedLetters={completedLetters}
        />
      )}

      {currentScreen === 'tracing' && (
        <FingerTracing
          letterData={currentLetter}
          onPrev={handlePrevLetter}
          onNext={handleNextLetter}
          onBackToGame={() => setCurrentScreen('learning')}
          onLetterComplete={handleLetterCompleted}
        />
      )}

      {/* Alphabet Jump Drawer / Modal */}
      <AlphabetDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        currentIndex={currentLetterIndex}
        onSelectLetter={handleSelectLetter}
        completedLetters={completedLetters}
      />

      {/* Android Installation & APK Modal */}
      <AndroidInstallModal
        isOpen={isAndroidModalOpen}
        onClose={() => setIsAndroidModalOpen(false)}
      />
    </div>
  );
}
