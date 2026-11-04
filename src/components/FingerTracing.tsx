import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  Volume2,
  RotateCcw,
  Sparkles,
  CheckCircle,
  HelpCircle,
  Play,
  Layers,
} from 'lucide-react';
import { LetterData, Point } from '../types/alphabet';
import { soundEngine } from '../utils/soundEngine';
import { CelebrationModal } from './CelebrationModal';
import { LetterIllustration } from './Illustrations';

interface FingerTracingProps {
  letterData: LetterData;
  onPrev: () => void;
  onNext: () => void;
  onBackToGame: () => void;
  onLetterComplete?: (letter: string) => void;
}

interface SparkleParticle {
  id: number;
  x: number;
  y: number;
  color: string;
}

export const FingerTracing: React.FC<FingerTracingProps> = ({
  letterData,
  onPrev,
  onNext,
  onBackToGame,
  onLetterComplete,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  // Tracing State
  const [currentStrokeIdx, setCurrentStrokeIdx] = useState<number>(0);
  const [completedStrokes, setCompletedStrokes] = useState<number[]>([]);
  const [activeStrokePassedPoints, setActiveStrokePassedPoints] = useState<number[]>([]);
  const [userDrawnPath, setUserDrawnPath] = useState<Point[]>([]);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [sparkles, setSparkles] = useState<SparkleParticle[]>([]);
  const [showCelebration, setShowCelebration] = useState<boolean>(false);

  // Animated guide hand position
  const [guidePos, setGuidePos] = useState<Point>({ x: 0, y: 0 });

  // Reset tracing whenever letter changes
  useEffect(() => {
    setCurrentStrokeIdx(0);
    setCompletedStrokes([]);
    setActiveStrokePassedPoints([]);
    setUserDrawnPath([]);
    setIsDrawing(false);
    setShowCelebration(false);

    // Initial guide position to start of stroke 0
    if (letterData.strokes.length > 0 && letterData.strokes[0].points.length > 0) {
      setGuidePos(letterData.strokes[0].points[0]);
    }

    // Announce letter and tracing instruction
    soundEngine.speak(`Trace letter ${letterData.letter}`);
  }, [letterData]);

  // Animate the guiding dot along the active stroke to demonstrate movement
  useEffect(() => {
    const stroke = letterData.strokes[currentStrokeIdx];
    if (!stroke || stroke.points.length === 0 || isDrawing) return;

    let step = 0;
    const interval = setInterval(() => {
      step = (step + 1) % stroke.points.length;
      setGuidePos(stroke.points[step]);
    }, 700);

    return () => clearInterval(interval);
  }, [currentStrokeIdx, letterData.strokes, isDrawing]);

  // Convert client pointer coordinate to SVG coordinate
  const getSvgCoordinates = useCallback((clientX: number, clientY: number): Point | null => {
    if (!svgRef.current) return null;
    const rect = svgRef.current.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 300;
    const y = ((clientY - rect.top) / rect.height) * 360;
    return { x, y };
  }, []);

  // Distance helper
  const distance = (p1: Point, p2: Point) => {
    return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    const pt = getSvgCoordinates(e.clientX, e.clientY);
    if (!pt) return;

    setIsDrawing(true);
    setUserDrawnPath([pt]);

    checkProximityToCheckpoints(pt);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDrawing) return;
    e.preventDefault();
    const pt = getSvgCoordinates(e.clientX, e.clientY);
    if (!pt) return;

    setUserDrawnPath((prev) => [...prev, pt]);
    checkProximityToCheckpoints(pt);

    // Add star sparkle particle
    if (Math.random() > 0.4) {
      const colors = ['#F59E0B', '#EF4444', '#10B981', '#3B82F6', '#8B5CF6'];
      const newSparkle: SparkleParticle = {
        id: Date.now() + Math.random(),
        x: pt.x,
        y: pt.y,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
      setSparkles((prev) => [...prev.slice(-12), newSparkle]);
    }
  };

  const handlePointerUp = () => {
    setIsDrawing(false);
  };

  // Check if pointer hit checkpoints of current stroke
  const checkProximityToCheckpoints = (currentPoint: Point) => {
    const stroke = letterData.strokes[currentStrokeIdx];
    if (!stroke) return;

    const threshold = 40; // generous touch-friendly radius for toddlers

    stroke.points.forEach((checkpoint, index) => {
      if (!activeStrokePassedPoints.includes(index)) {
        if (distance(currentPoint, checkpoint) <= threshold) {
          // Play sparkle chime
          soundEngine.playSparkle(index);

          const updatedPassed = [...activeStrokePassedPoints, index];
          setActiveStrokePassedPoints(updatedPassed);

          // If all checkpoints of this stroke are visited, stroke is completed!
          if (updatedPassed.length === stroke.points.length) {
            handleStrokeCompleted();
          }
        }
      }
    });
  };

  const handleStrokeCompleted = () => {
    soundEngine.playPop();
    const nextCompleted = [...completedStrokes, currentStrokeIdx];
    setCompletedStrokes(nextCompleted);
    setActiveStrokePassedPoints([]);

    // Check if whole letter is completed
    if (nextCompleted.length === letterData.strokes.length) {
      if (onLetterComplete) {
        onLetterComplete(letterData.letter);
      }
      setTimeout(() => {
        setShowCelebration(true);
      }, 350);
    } else {
      // Advance to next stroke of this letter
      const nextIdx = currentStrokeIdx + 1;
      setCurrentStrokeIdx(nextIdx);
      if (letterData.strokes[nextIdx]?.points.length > 0) {
        setGuidePos(letterData.strokes[nextIdx].points[0]);
      }
    }
  };

  // Reset current letter tracing
  const handleReset = () => {
    soundEngine.playPop();
    setCurrentStrokeIdx(0);
    setCompletedStrokes([]);
    setActiveStrokePassedPoints([]);
    setUserDrawnPath([]);
    setIsDrawing(false);
    setShowCelebration(false);
    if (letterData.strokes[0]?.points.length > 0) {
      setGuidePos(letterData.strokes[0].points[0]);
    }
  };

  // Total checkpoints across letter
  const totalLetterCheckpoints = letterData.strokes.reduce((acc, s) => acc + s.points.length, 0);
  const completedCheckpointsCount =
    letterData.strokes
      .filter((_, idx) => completedStrokes.includes(idx))
      .reduce((acc, s) => acc + s.points.length, 0) + activeStrokePassedPoints.length;

  const progressPercent = Math.min(
    100,
    Math.round((completedCheckpointsCount / Math.max(1, totalLetterCheckpoints)) * 100)
  );

  return (
    <div className="flex-1 flex flex-col justify-between p-3 sm:p-5 max-w-4xl mx-auto w-full select-none">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <button
          onClick={() => {
            soundEngine.playPop();
            onBackToGame();
          }}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-white hover:bg-gray-100 text-gray-700 font-extrabold text-sm sm:text-base shadow-sm border-2 border-indigo-100 active:scale-95 transition"
        >
          <ArrowLeft className="w-5 h-5 text-indigo-600" />
          <span>Exit Tracing</span>
        </button>

        {/* Letter & Word Title */}
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white shadow-sm border-2 border-indigo-100">
          <span
            className="text-2xl sm:text-3xl font-black"
            style={{ color: letterData.color }}
          >
            {letterData.letter}
          </span>
          <span className="text-gray-400 font-bold">is for</span>
          <span className="text-lg sm:text-xl font-black text-gray-800">
            {letterData.word}
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => {
              soundEngine.playPop();
              soundEngine.speakLetter(letterData.letter, letterData.word, letterData.phonicsExample);
            }}
            className="p-2 sm:p-2.5 rounded-2xl bg-amber-400 hover:bg-amber-500 text-amber-950 font-black shadow-md border-2 border-amber-300 active:scale-90 transition"
            title="Hear Sound"
          >
            <Volume2 className="w-5 h-5" />
          </button>
          <button
            onClick={handleReset}
            className="p-2 sm:p-2.5 rounded-2xl bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-bold shadow-sm border border-indigo-200 active:scale-90 transition"
            title="Start Over"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Progress Bar for Kids */}
      <div className="w-full bg-white/80 p-2 rounded-2xl shadow-xs border border-indigo-100 mb-2 flex items-center gap-3">
        <div className="flex-1 bg-gray-200 h-4 rounded-full overflow-hidden p-0.5">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-amber-400 via-emerald-400 to-green-500"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ ease: 'easeOut', duration: 0.2 }}
          />
        </div>
        <div className="flex items-center gap-1 font-black text-xs sm:text-sm text-emerald-600">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>{progressPercent}%</span>
        </div>
      </div>

      {/* Interactive Whiteboard Canvas */}
      <div className="relative flex-1 flex items-center justify-center min-h-[360px] max-h-[560px] my-auto">
        <div className="relative w-full max-w-[340px] sm:max-w-[420px] aspect-[5/6] bg-white rounded-3xl shadow-xl border-6 border-indigo-300 overflow-hidden touch-none select-none">
          {/* Subtle tracing grid pattern */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage:
                'radial-gradient(circle, #6366F1 1.5px, transparent 1.5px)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* SVG Canvas for Dotted Letter & Finger Tracing */}
          <svg
            ref={svgRef}
            viewBox="0 0 300 360"
            className="w-full h-full cursor-pointer touch-none"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          >
            {/* 1. Base Dotted Outline of All Strokes */}
            {letterData.strokes.map((stroke, idx) => (
              <path
                key={`base-${idx}`}
                d={stroke.pathData}
                fill="none"
                stroke="#E2E8F0"
                strokeWidth="38"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ))}

            {letterData.strokes.map((stroke, idx) => (
              <path
                key={`dotted-${idx}`}
                d={stroke.pathData}
                fill="none"
                stroke="#94A3B8"
                strokeWidth="6"
                strokeDasharray="10 12"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ))}

            {/* 2. Completed Strokes (Vibrant Solid with Glow) */}
            {letterData.strokes.map((stroke, idx) => {
              if (completedStrokes.includes(idx)) {
                return (
                  <path
                    key={`done-${idx}`}
                    d={stroke.pathData}
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="32"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="drop-shadow-md"
                  />
                );
              }
              return null;
            })}

            {/* 3. Active Stroke Guide Glow */}
            {letterData.strokes[currentStrokeIdx] && (
              <path
                d={letterData.strokes[currentStrokeIdx].pathData}
                fill="none"
                stroke={letterData.color}
                strokeWidth="12"
                strokeDasharray="8 8"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.45"
              />
            )}

            {/* 4. Active Checkpoints on Current Stroke */}
            {letterData.strokes[currentStrokeIdx]?.points.map((pt, pIdx) => {
              const isPassed = activeStrokePassedPoints.includes(pIdx);
              const isFirst = pIdx === 0;

              return (
                <g key={`cp-${pIdx}`}>
                  {/* Outer Checkpoint Circle */}
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={isFirst ? 18 : 14}
                    fill={isPassed ? '#10B981' : isFirst ? letterData.color : '#FFFFFF'}
                    stroke={isPassed ? '#059669' : letterData.color}
                    strokeWidth={isFirst ? '4' : '3'}
                    className="transition-all duration-150"
                  />

                  {/* Inner Label / Star */}
                  {isPassed ? (
                    <text
                      x={pt.x}
                      y={pt.y + 4}
                      textAnchor="middle"
                      fill="#FFFFFF"
                      fontSize="14"
                      fontWeight="bold"
                    >
                      ✓
                    </text>
                  ) : isFirst ? (
                    <text
                      x={pt.x}
                      y={pt.y + 5}
                      textAnchor="middle"
                      fill="#FFFFFF"
                      fontSize="13"
                      fontWeight="900"
                    >
                      {currentStrokeIdx + 1}
                    </text>
                  ) : (
                    <circle cx={pt.x} cy={pt.y} r="4" fill={letterData.color} />
                  )}
                </g>
              );
            })}

            {/* 5. Live User Drawn Finger Path */}
            {userDrawnPath.length > 1 && (
              <path
                d={`M ${userDrawnPath.map((p) => `${p.x} ${p.y}`).join(' L ')}`}
                fill="none"
                stroke={letterData.color}
                strokeWidth="24"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.85"
              />
            )}

            {/* 6. Animated Guide Dot or Star (guides the child) */}
            {!isDrawing && letterData.strokes[currentStrokeIdx] && (
              <g transform={`translate(${guidePos.x}, ${guidePos.y})`}>
                <circle cx="0" cy="0" r="16" fill="#FBBF24" opacity="0.4" className="animate-ping" />
                <circle cx="0" cy="0" r="10" fill="#F59E0B" />
                <text x="0" y="4" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="bold">
                  👆
                </text>
              </g>
            )}

            {/* 7. Sparkling Trail Particles */}
            {sparkles.map((sp) => (
              <g key={sp.id} transform={`translate(${sp.x}, ${sp.y})`}>
                <circle cx="0" cy="0" r="5" fill={sp.color} />
              </g>
            ))}
          </svg>

          {/* Child Hint Banner at bottom of whiteboard */}
          <div className="absolute bottom-2 left-2 right-2 py-1.5 px-3 rounded-xl bg-indigo-50/90 border border-indigo-200 text-center flex items-center justify-center gap-1.5">
            <span className="text-xs font-bold text-indigo-900">
              👉 Follow the numbered dots with your finger!
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Large Touch Controls */}
      <div className="mt-3 flex items-center justify-between gap-3 max-w-lg mx-auto w-full">
        {/* Previous Button */}
        <button
          onClick={() => {
            soundEngine.playPop();
            onPrev();
          }}
          className="flex-1 py-3.5 px-3 rounded-2xl bg-white hover:bg-gray-100 text-gray-800 font-black text-sm sm:text-base shadow-md border-3 border-indigo-200 active:scale-95 transition flex items-center justify-center gap-1.5"
        >
          <ArrowLeft className="w-6 h-6 text-indigo-600 stroke-[3]" />
          <span>Previous</span>
        </button>

        {/* Sound Repeat Center Button */}
        <button
          onClick={() => {
            soundEngine.playPop();
            soundEngine.speakLetter(letterData.letter, letterData.word, letterData.phonicsExample);
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
          className="flex-1 py-3.5 px-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-black text-sm sm:text-base shadow-md border-3 border-indigo-300 active:scale-95 transition flex items-center justify-center gap-1.5"
        >
          <span>Next</span>
          <ArrowRight className="w-6 h-6 stroke-[3]" />
        </button>
      </div>

      {/* Celebration Modal on Tracing Finish */}
      <CelebrationModal
        isOpen={showCelebration}
        letterData={letterData}
        onNext={() => {
          setShowCelebration(false);
          onNext();
        }}
        onRetry={handleReset}
      />
    </div>
  );
};
