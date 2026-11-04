import React from 'react';
import { motion } from 'motion/react';
import {
  Play,
  PenTool,
  Grid,
  Volume2,
  VolumeX,
  Smartphone,
  Sparkles,
  Star,
  CheckCircle2,
} from 'lucide-react';
import { PWAInstallButton } from './PWAInstallButton';
import { soundEngine } from '../utils/soundEngine';
import { AbcAppIcon } from './AbcAppIcon';

interface MainScreenProps {
  onStart: () => void;
  onStartTracing: () => void;
  onOpenDrawer: () => void;
  onOpenAndroidModal: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  completedLettersCount: number;
}

export const MainScreen: React.FC<MainScreenProps> = ({
  onStart,
  onStartTracing,
  onOpenDrawer,
  onOpenAndroidModal,
  isMuted,
  onToggleMute,
  completedLettersCount,
}) => {
  return (
    <div className="flex-1 flex flex-col justify-between p-4 sm:p-6 max-w-lg mx-auto w-full select-none text-center">
      {/* Top Header Utilities */}
      <div className="flex items-center justify-between gap-2">
        {/* Sound toggle */}
        <button
          onClick={onToggleMute}
          className="p-3 rounded-2xl bg-white hover:bg-gray-100 text-gray-700 font-bold shadow-md border-2 border-indigo-100 active:scale-90 transition"
          title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5 text-rose-500" />
          ) : (
            <Volume2 className="w-5 h-5 text-emerald-600" />
          )}
        </button>

        {/* Android Installation Button */}
        <button
          onClick={onOpenAndroidModal}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black text-xs sm:text-sm shadow-md border-2 border-emerald-300 active:scale-95 transition"
        >
          <Smartphone className="w-4 h-4" />
          <span>Install on Android</span>
        </button>
      </div>

      {/* Main Center Content: ABC Fun Learning Logo & Start Button */}
      <div className="flex-1 flex flex-col items-center justify-center my-auto py-4">
        {/* Animated 3D ABC Logo Artwork */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 15, stiffness: 200 }}
          className="relative inline-block mb-3"
        >
          {/* Pulsing Sun Glow behind Logo */}
          <div className="absolute inset-0 bg-gradient-to-tr from-amber-300 via-rose-300 to-indigo-300 rounded-full blur-2xl opacity-60 scale-125 pointer-events-none animate-pulse" />

          {/* Actual 3D ABC Logo Artwork */}
          <motion.div
            animate={{ y: [-4, 4, -4] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="relative drop-shadow-2xl mx-auto"
          >
            <AbcAppIcon className="w-40 h-40 sm:w-48 sm:h-48 mx-auto drop-shadow-xl" />
          </motion.div>

          {/* Floating decorative star badges */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
            className="absolute -top-2 -right-2 text-amber-400 drop-shadow-md"
          >
            <Star className="w-8 h-8 fill-amber-400 stroke-amber-500" />
          </motion.div>
          <motion.div
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -bottom-2 -left-2 text-rose-500 drop-shadow-md"
          >
            <Sparkles className="w-7 h-7 fill-rose-400" />
          </motion.div>
        </motion.div>

        {/* App Branding: ONLY ABC Fun Learning */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-4xl sm:text-5xl font-black tracking-tight text-indigo-950"
        >
          ABC Fun Learning
        </motion.h1>

        <p className="mt-1 text-sm sm:text-base font-bold text-indigo-600">
          Letters A to Z • Finger Tracing • Voice & Phonics
        </p>

        {/* ONE LARGE START BUTTON (Designed for small children) */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-6 sm:mt-8 w-full max-w-xs"
        >
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.94 }}
            animate={{
              boxShadow: [
                '0 10px 25px -5px rgba(79, 70, 229, 0.4)',
                '0 20px 35px -5px rgba(79, 70, 229, 0.6)',
                '0 10px 25px -5px rgba(79, 70, 229, 0.4)',
              ],
            }}
            transition={{ repeat: Infinity, duration: 2 }}
            onClick={() => {
              soundEngine.playPop();
              onStart();
            }}
            className="w-full py-5 px-8 rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 hover:from-indigo-700 hover:to-pink-600 text-white font-black text-2xl sm:text-3xl tracking-wide shadow-2xl border-4 border-amber-300 flex items-center justify-center gap-3 transition"
          >
            <Play className="w-8 h-8 fill-white stroke-none" />
            <span>START</span>
          </motion.button>
        </motion.div>

        {/* Secondary Toddler Modes */}
        <div className="mt-4 flex items-center justify-center gap-3 w-full max-w-xs">
          <button
            onClick={() => {
              soundEngine.playPop();
              onStartTracing();
            }}
            className="flex-1 py-3 px-3 rounded-2xl bg-white hover:bg-gray-50 text-indigo-950 font-black text-sm shadow-md border-2 border-indigo-200 active:scale-95 transition flex items-center justify-center gap-1.5"
          >
            <PenTool className="w-4 h-4 text-amber-500" />
            <span>Tracing</span>
          </button>

          <button
            onClick={() => {
              soundEngine.playPop();
              onOpenDrawer();
            }}
            className="flex-1 py-3 px-3 rounded-2xl bg-white hover:bg-gray-50 text-indigo-950 font-black text-sm shadow-md border-2 border-indigo-200 active:scale-95 transition flex items-center justify-center gap-1.5"
          >
            <Grid className="w-4 h-4 text-purple-500" />
            <span>Choose A-Z</span>
          </button>
        </div>

        {/* Progress Pill if any letters completed */}
        {completedLettersCount > 0 && (
          <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black border border-emerald-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>{completedLettersCount} of 26 Letters Traced!</span>
          </div>
        )}
      </div>

      {/* Footer Info & Android APK trigger */}
      <div className="pt-2 text-xs text-gray-500 font-bold flex flex-col items-center gap-1">
        <button
          onClick={onOpenAndroidModal}
          className="text-indigo-600 hover:underline flex items-center gap-1 font-extrabold"
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Android App & APK Download Options</span>
        </button>
        <span className="text-[11px] text-gray-400">
          Made for ages 2–6 • 100% Kid Safe • No Ads • No Login
        </span>
      </div>
    </div>
  );
};
