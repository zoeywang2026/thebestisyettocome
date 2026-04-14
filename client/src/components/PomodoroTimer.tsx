/**
 * PomodoroTimer Component
 * Design: Neumorphism / Soft UI — adapted to lifestyle blog warm palette
 * 
 * Neumorphism parameters:
 *   Base: #ede8e3 (warm cream, matches blog's white)
 *   Raised shadow: -6px -6px 16px #ffffff, 6px 6px 16px #ccc5bc
 *   Pressed shadow: inset -3px -3px 8px #ffffff, inset 3px 3px 8px #ccc5bc
 *   Accent: warm rose #c8907a
 *   Border radius: 16px
 * 
 * Size: ~220px wide (phone-sized widget per reference screenshot)
 * Position: fixed bottom-left
 * 
 * Features:
 *   - Focus (25min) / Short Break (5min) / Long Break (15min) modes
 *   - Animated SVG ring progress
 *   - Play/Pause/Reset controls
 *   - Session counter
 *   - Minimizable to a small pill
 *   - Subtle breathing animation when running
 */
import { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, RotateCcw, ChevronDown, ChevronUp, Coffee, Zap, Clock } from 'lucide-react';

type Mode = 'focus' | 'short' | 'long';

const MODES: Record<Mode, { label: string; duration: number; color: string; icon: React.ReactNode }> = {
  focus: { label: 'Focus', duration: 25 * 60, color: '#c8907a', icon: <Zap size={10} /> },
  short: { label: 'Short Break', duration: 5 * 60, color: '#90b8a0', icon: <Coffee size={10} /> },
  long: { label: 'Long Break', duration: 15 * 60, color: '#a0b8d0', icon: <Clock size={10} /> },
};

const RADIUS = 68;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function PomodoroTimer() {
  const [mode, setMode] = useState<Mode>('focus');
  const [timeLeft, setTimeLeft] = useState(MODES.focus.duration);
  const [isRunning, setIsRunning] = useState(false);
  const [sessions, setSessions] = useState(0);
  const [minimized, setMinimized] = useState(false);
  const [justFinished, setJustFinished] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const totalDuration = MODES[mode].duration;
  const progress = (totalDuration - timeLeft) / totalDuration;
  const strokeDashoffset = CIRCUMFERENCE * (1 - progress);
  const accent = MODES[mode].color;

  // Format time as MM:SS
  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  const handleModeChange = useCallback((newMode: Mode) => {
    setMode(newMode);
    setTimeLeft(MODES[newMode].duration);
    setIsRunning(false);
    setJustFinished(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  const handleReset = useCallback(() => {
    setTimeLeft(MODES[mode].duration);
    setIsRunning(false);
    setJustFinished(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, [mode]);

  const handleToggle = useCallback(() => {
    setIsRunning(r => !r);
    setJustFinished(false);
  }, []);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) {
            clearInterval(intervalRef.current!);
            setIsRunning(false);
            setJustFinished(true);
            if (mode === 'focus') setSessions(s => s + 1);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isRunning, mode]);

  // Session dots (max 4 shown)
  const sessionDots = Array.from({ length: 4 }, (_, i) => i < (sessions % 4 || (sessions > 0 && sessions % 4 === 0 ? 4 : 0)));

  if (minimized) {
    return (
      <div
        className="fixed bottom-5 left-5 z-50 flex items-center gap-2 px-4 py-2.5 cursor-pointer select-none"
        style={{
          background: '#ede8e3',
          borderRadius: '50px',
          boxShadow: '-4px -4px 10px #ffffff, 4px 4px 10px #ccc5bc',
          fontFamily: 'var(--font-nav)',
        }}
        onClick={() => setMinimized(false)}
      >
        <div
          className="w-2 h-2 rounded-full"
          style={{
            backgroundColor: accent,
            boxShadow: isRunning ? `0 0 6px ${accent}` : 'none',
            animation: isRunning ? 'neuPulse 2s ease-in-out infinite' : 'none',
          }}
        />
        <span className="text-xs font-semibold tracking-wider" style={{ color: '#7a6e68' }}>
          {formatTime(timeLeft)}
        </span>
        <ChevronUp size={12} style={{ color: '#9a8e88' }} />
      </div>
    );
  }

  return (
    <div
      className="fixed bottom-5 left-5 z-50 select-none"
      style={{
        width: '220px',
        background: '#ede8e3',
        borderRadius: '20px',
        boxShadow: '-8px -8px 20px #ffffff, 8px 8px 20px #ccc5bc',
        padding: '18px 16px 16px',
        fontFamily: 'var(--font-nav)',
      }}
    >
      {/* Header row */}
      <div className="flex items-center justify-between mb-3">
        <span
          className="text-xs font-semibold tracking-widest uppercase"
          style={{ color: '#9a8e88' }}
        >
          Pomodoro
        </span>
        <button
          onClick={() => setMinimized(true)}
          className="p-1 rounded-full transition-all"
          style={{
            background: '#ede8e3',
            boxShadow: '-2px -2px 5px #ffffff, 2px 2px 5px #ccc5bc',
            color: '#9a8e88',
          }}
          aria-label="Minimize"
        >
          <ChevronDown size={12} />
        </button>
      </div>

      {/* Mode selector pills */}
      <div
        className="flex gap-1.5 mb-4 p-1 rounded-xl"
        style={{
          background: '#ede8e3',
          boxShadow: 'inset -2px -2px 6px #ffffff, inset 2px 2px 6px #ccc5bc',
        }}
      >
        {(Object.keys(MODES) as Mode[]).map(m => (
          <button
            key={m}
            onClick={() => handleModeChange(m)}
            className="flex-1 py-1 text-center transition-all duration-200"
            style={{
              fontSize: '0.55rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              borderRadius: '10px',
              color: mode === m ? '#fff' : '#9a8e88',
              background: mode === m ? accent : 'transparent',
              boxShadow: mode === m
                ? `-2px -2px 6px rgba(255,255,255,0.6), 2px 2px 6px rgba(0,0,0,0.12)`
                : 'none',
              transition: 'all 0.2s ease',
            }}
          >
            {m === 'focus' ? 'FOCUS' : m === 'short' ? 'SHORT' : 'LONG'}
          </button>
        ))}
      </div>

      {/* SVG Ring Timer */}
      <div className="flex items-center justify-center mb-4">
        <div
          style={{
            position: 'relative',
            width: '160px',
            height: '160px',
            animation: isRunning ? 'neuBreath 4s ease-in-out infinite' : 'none',
          }}
        >
          <svg width="160" height="160" viewBox="0 0 160 160">
            {/* Background track */}
            <circle
              cx="80" cy="80" r={RADIUS}
              fill="none"
              stroke="#ddd8d2"
              strokeWidth="9"
              strokeLinecap="round"
            />
            {/* Progress arc */}
            <circle
              cx="80" cy="80" r={RADIUS}
              fill="none"
              stroke={accent}
              strokeWidth="9"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={strokeDashoffset}
              transform="rotate(-90 80 80)"
              style={{
                transition: 'stroke-dashoffset 1s linear, stroke 0.4s ease',
                filter: isRunning ? `drop-shadow(0 0 4px ${accent}80)` : 'none',
              }}
            />
            {/* Glow dot at progress head */}
            {isRunning && progress > 0 && (
              <circle
                cx={80 + RADIUS * Math.cos(-Math.PI / 2 + 2 * Math.PI * progress)}
                cy={80 + RADIUS * Math.sin(-Math.PI / 2 + 2 * Math.PI * progress)}
                r="4.5"
                fill={accent}
                style={{ filter: `drop-shadow(0 0 4px ${accent})` }}
              />
            )}
            {/* Inner circle (neumorphic inset) */}
            <circle
              cx="80" cy="80" r="56"
              fill="#ede8e3"
            />
          </svg>

          {/* Time display inside ring */}
          <div
            className="absolute flex flex-col items-center justify-center"
            style={{ top: 0, left: 0, width: '160px', height: '160px', pointerEvents: 'none' }}
          >
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                fontSize: '2rem',
                fontWeight: 400,
                color: justFinished ? accent : '#4a3f3a',
                lineHeight: 1,
                letterSpacing: '-0.02em',
                transition: 'color 0.4s ease',
              }}
            >
              {formatTime(timeLeft)}
            </span>
            <span
              style={{
                fontSize: '0.6rem',
                fontWeight: 600,
                letterSpacing: '0.14em',
                color: accent,
                marginTop: '4px',
                textTransform: 'uppercase',
              }}
            >
              {justFinished ? '✓ Done!' : MODES[mode].label}
            </span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 mb-4">
        {/* Reset */}
        <button
          onClick={handleReset}
          className="flex items-center justify-center transition-all duration-150 active:scale-95"
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: '#ede8e3',
            boxShadow: '-4px -4px 10px #ffffff, 4px 4px 10px #ccc5bc',
            color: '#9a8e88',
            border: 'none',
          }}
          onMouseDown={e => {
            (e.currentTarget as HTMLButtonElement).style.boxShadow = 'inset -2px -2px 6px #ffffff, inset 2px 2px 6px #ccc5bc';
          }}
          onMouseUp={e => {
            (e.currentTarget as HTMLButtonElement).style.boxShadow = '-4px -4px 10px #ffffff, 4px 4px 10px #ccc5bc';
          }}
          aria-label="Reset"
        >
          <RotateCcw size={14} />
        </button>

        {/* Play/Pause — larger */}
        <button
          onClick={handleToggle}
          className="flex items-center justify-center transition-all duration-150 active:scale-95"
          style={{
            width: '52px',
            height: '52px',
            borderRadius: '50%',
            background: isRunning ? accent : '#ede8e3',
            boxShadow: isRunning
              ? `inset -3px -3px 8px rgba(255,255,255,0.4), inset 3px 3px 8px rgba(0,0,0,0.15), 0 0 12px ${accent}60`
              : '-6px -6px 14px #ffffff, 6px 6px 14px #ccc5bc',
            color: isRunning ? '#fff' : accent,
            border: 'none',
            transition: 'all 0.2s ease',
          }}
          aria-label={isRunning ? 'Pause' : 'Start'}
        >
          {isRunning ? <Pause size={20} /> : <Play size={20} style={{ marginLeft: '2px' }} />}
        </button>

        {/* Mode icon indicator */}
        <div
          className="flex items-center justify-center"
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: '#ede8e3',
            boxShadow: '-4px -4px 10px #ffffff, 4px 4px 10px #ccc5bc',
            color: accent,
          }}
        >
          {MODES[mode].icon}
        </div>
      </div>

      {/* Session dots */}
      <div className="flex items-center justify-center gap-2">
        {Array.from({ length: 4 }, (_, i) => (
          <div
            key={i}
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: i < sessions % 4 || (sessions > 0 && sessions % 4 === 0 && i < 4)
                ? accent
                : '#d8d2cc',
              boxShadow: i < sessions % 4
                ? `-1px -1px 3px #ffffff, 1px 1px 3px #ccc5bc`
                : 'inset -1px -1px 3px #ffffff, inset 1px 1px 3px #ccc5bc',
              transition: 'all 0.3s ease',
            }}
          />
        ))}
        {sessions > 0 && (
          <span
            style={{
              fontSize: '0.55rem',
              color: '#9a8e88',
              letterSpacing: '0.08em',
              marginLeft: '4px',
            }}
          >
            ×{sessions}
          </span>
        )}
      </div>
    </div>
  );
}
