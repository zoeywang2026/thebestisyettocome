/**
 * PomodoroTimer Component — Cat on Sofa Edition
 * Design: Neumorphism / Soft UI — warm cream palette
 *
 * Scene: White cat lying on pink sofa, blue floor lamp, tail wagging animation
 * Timer: SVG ring progress, FOCUS/SHORT/LONG modes, play/pause/reset
 * Position: fixed bottom-left corner of viewport
 * 
 * Animations:
 *   - catTailWag: cat tail swings left-right (always active)
 *   - catBreath: cat body subtle rise/fall when idle
 *   - lampGlow: lamp light pulses when timer running
 *   - neuBreath: widget subtle scale pulse when running
 *   - neuPulse: minimized dot pulse
 */
import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, ChevronDown, ChevronUp } from 'lucide-react';

type Mode = 'focus' | 'short' | 'long';

const MODES: Record<Mode, { label: string; duration: number; color: string }> = {
  focus:  { label: 'Focus',       duration: 25 * 60, color: '#c8907a' },
  short:  { label: 'Short Break', duration: 5  * 60, color: '#90b8a0' },
  long:   { label: 'Long Break',  duration: 15 * 60, color: '#a0b8d0' },
};

const RADIUS = 52;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

// ─── SVG Cat Scene ──────────────────────────────────────────────────────────
function CatScene({ isRunning }: { isRunning: boolean }) {
  return (
    <svg
      viewBox="0 0 200 140"
      width="220"
      height="140"
      style={{ display: 'block', overflow: 'visible', margin: '0 auto' }}
      aria-hidden="true"
    >
      <defs>
        {/* Lamp glow filter */}
        <radialGradient id="lampGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#b8d8f8" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#b8d8f8" stopOpacity="0" />
        </radialGradient>
        {/* Soft shadow for sofa */}
        <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="2" dy="4" stdDeviation="4" floodColor="#c8b0a8" floodOpacity="0.35" />
        </filter>
        {/* Inner shadow for sofa seat */}
        <filter id="innerShadow">
          <feOffset dx="0" dy="2" />
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* ── Floor / Rug ── */}
      {/* Soft oval rug — blue/navy */}
      <ellipse cx="105" cy="118" rx="72" ry="14"
        fill="#7090b8" opacity="0.55" />
      {/* Pink rug accent stripe */}
      <ellipse cx="105" cy="120" rx="55" ry="8"
        fill="#e8a0b0" opacity="0.45" />

      {/* ── Floor Lamp ── */}
      {/* Lamp base */}
      <rect x="152" y="108" width="6" height="4" rx="2" fill="#8090a0" />
      {/* Lamp pole */}
      <line x1="155" y1="108" x2="155" y2="55" stroke="#8090a0" strokeWidth="2.5" strokeLinecap="round" />
      {/* Lamp arm curve */}
      <path d="M155 55 Q158 42 148 38" stroke="#8090a0" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Lamp shade — blue */}
      <ellipse cx="145" cy="34" rx="14" ry="7" fill="#5080c0" />
      <path d="M131 34 Q133 50 145 52 Q157 50 159 34" fill="#4070b0" opacity="0.9" />
      {/* Lamp bulb */}
      <circle cx="145" cy="46" r="3" fill="#fffde0" opacity="0.9" />
      {/* Lamp glow — animated */}
      <ellipse cx="145" cy="60" rx="22" ry="16"
        fill="url(#lampGlow)"
        opacity={isRunning ? 1 : 0.3}
        style={{
          transition: 'opacity 0.5s ease',
          animation: isRunning ? 'lampGlowAnim 2.5s ease-in-out infinite' : 'none',
        }}
      />

      {/* ── Sofa (pink) ── */}
      {/* Sofa base/legs */}
      <rect x="62" y="106" width="8" height="10" rx="3" fill="#c8788a" />
      <rect x="118" y="106" width="8" height="10" rx="3" fill="#c8788a" />
      {/* Sofa body */}
      <rect x="55" y="72" width="80" height="38" rx="14" fill="#f0a0b4" filter="url(#softShadow)" />
      {/* Sofa seat cushion highlight */}
      <rect x="60" y="78" width="70" height="26" rx="10" fill="#f8c0cc" opacity="0.7" />
      {/* Sofa back */}
      <rect x="55" y="58" width="80" height="22" rx="12" fill="#f0a0b4" filter="url(#softShadow)" />
      {/* Sofa back highlight */}
      <rect x="62" y="62" width="66" height="14" rx="8" fill="#f8c0cc" opacity="0.6" />
      {/* Left armrest */}
      <rect x="48" y="68" width="18" height="28" rx="9" fill="#e890a8" filter="url(#softShadow)" />
      {/* Right armrest */}
      <rect x="124" y="68" width="18" height="28" rx="9" fill="#e890a8" filter="url(#softShadow)" />

      {/* ── White Cat ── */}
      {/* Cat body — lying down, white */}
      <g style={{ animation: 'catBreath 3.5s ease-in-out infinite', transformOrigin: '95px 88px' }}>
        {/* Body oval */}
        <ellipse cx="95" cy="90" rx="28" ry="14" fill="#f5f5f5" />
        {/* Body highlight */}
        <ellipse cx="90" cy="85" rx="16" ry="7" fill="#ffffff" opacity="0.8" />
        {/* Head */}
        <circle cx="70" cy="82" r="13" fill="#f5f5f5" />
        {/* Head highlight */}
        <circle cx="67" cy="79" r="7" fill="#ffffff" opacity="0.7" />
        {/* Left ear */}
        <polygon points="62,72 58,62 70,68" fill="#f5f5f5" />
        <polygon points="63,71 60,64 69,68" fill="#f0c0c8" opacity="0.8" />
        {/* Right ear */}
        <polygon points="72,70 76,61 80,68" fill="#f5f5f5" />
        <polygon points="73,70 76,63 79,68" fill="#f0c0c8" opacity="0.8" />
        {/* Eyes — closed/sleeping */}
        <path d="M64 82 Q67 80 70 82" stroke="#888" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M72 81 Q75 79 78 81" stroke="#888" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* Nose */}
        <ellipse cx="71" cy="85" rx="2" ry="1.2" fill="#f0a0a8" />
        {/* Whiskers left */}
        <line x1="60" y1="84" x2="68" y2="85" stroke="#ccc" strokeWidth="0.8" opacity="0.9" />
        <line x1="59" y1="87" x2="68" y2="86" stroke="#ccc" strokeWidth="0.8" opacity="0.9" />
        {/* Whiskers right */}
        <line x1="74" y1="85" x2="82" y2="84" stroke="#ccc" strokeWidth="0.8" opacity="0.9" />
        <line x1="74" y1="87" x2="82" y2="87" stroke="#ccc" strokeWidth="0.8" opacity="0.9" />
        {/* Front paws */}
        <ellipse cx="80" cy="98" rx="9" ry="5" fill="#f0f0f0" />
        <ellipse cx="78" cy="99" rx="5" ry="3.5" fill="#ffffff" opacity="0.7" />
        {/* Paw toe lines */}
        <line x1="76" y1="101" x2="76" y2="103" stroke="#ddd" strokeWidth="0.8" />
        <line x1="79" y1="102" x2="79" y2="104" stroke="#ddd" strokeWidth="0.8" />
        <line x1="82" y1="101" x2="82" y2="103" stroke="#ddd" strokeWidth="0.8" />
      </g>

      {/* ── Cat Tail (animated separately) ── */}
      <g
        style={{
          transformOrigin: '118px 92px',
          animation: 'catTailWag 1.8s ease-in-out infinite',
        }}
      >
        {/* Tail — curved, white with pink tip */}
        <path
          d="M118 92 Q130 80 138 88 Q144 94 136 102"
          stroke="#f0f0f0"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
        />
        {/* Tail tip — pink */}
        <circle cx="136" cy="102" r="4" fill="#f0c0c8" />
        {/* Tail highlight */}
        <path
          d="M118 92 Q129 81 136 89"
          stroke="#ffffff"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          opacity="0.8"
        />
      </g>

      {/* ── Side Table ── */}
      {/* Table top */}
      <ellipse cx="38" cy="94" rx="16" ry="7" fill="#90c8a0" filter="url(#softShadow)" />
      <ellipse cx="38" cy="92" rx="13" ry="5" fill="#a8d8b0" opacity="0.8" />
      {/* Table leg */}
      <line x1="38" y1="100" x2="38" y2="114" stroke="#78a888" strokeWidth="3" strokeLinecap="round" />
      {/* Drink on table — coconut style */}
      <ellipse cx="38" cy="88" rx="7" ry="4" fill="#a0d8a0" />
      <rect x="31" y="84" width="14" height="8" rx="4" fill="#b0e0b0" />
      {/* Straw */}
      <line x1="42" y1="84" x2="46" y2="76" stroke="#f08080" strokeWidth="1.5" strokeLinecap="round" />
      {/* Straw tip */}
      <circle cx="46" cy="76" r="1.5" fill="#f08080" />
    </svg>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
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

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  const handleModeChange = (newMode: Mode) => {
    setMode(newMode);
    setTimeLeft(MODES[newMode].duration);
    setIsRunning(false);
    setJustFinished(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const handleReset = () => {
    setTimeLeft(MODES[mode].duration);
    setIsRunning(false);
    setJustFinished(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const handleToggle = () => {
    setIsRunning(r => !r);
    setJustFinished(false);
  };

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

  // ── Minimized pill ──
  if (minimized) {
    return (
      <div
        onClick={() => setMinimized(false)}
        style={{
          position: 'fixed',
          bottom: '20px',
          left: '20px',
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 16px',
          borderRadius: '50px',
          background: 'oklch(0.972 0.010 75)',
          boxShadow: '-4px -4px 10px rgba(255,252,248,0.9), 4px 4px 10px rgba(190,180,168,0.5)',
          cursor: 'pointer',
          fontFamily: 'var(--font-nav)',
          userSelect: 'none',
        }}
      >
        <div style={{
          width: '8px', height: '8px', borderRadius: '50%',
          backgroundColor: accent,
          boxShadow: isRunning ? `0 0 6px ${accent}` : 'none',
          animation: isRunning ? 'neuPulse 2s ease-in-out infinite' : 'none',
        }} />
        <span style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.08em', color: 'oklch(0.35 0.010 60)' }}>
          {formatTime(timeLeft)}
        </span>
        <ChevronUp size={12} style={{ color: 'oklch(0.52 0.012 65)' }} />
      </div>
    );
  }

  // ── Full widget ──
  return (
    <div
      style={{
        position: 'fixed',
        bottom: '0px',
        left: '20px',
        zIndex: 50,
        width: '250px',
        background: 'oklch(0.972 0.010 75)',
        borderRadius: '20px 20px 0 0',
        boxShadow: '-8px -8px 24px rgba(255,252,248,0.9), 8px 0px 24px rgba(190,180,168,0.5), 0 -4px 16px rgba(190,180,168,0.4)',
        fontFamily: 'var(--font-nav)',
        userSelect: 'none',
        animation: isRunning ? 'neuBreath 4s ease-in-out infinite' : 'none',
      }}
    >
      {/* ── Header ── */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '12px 16px 6px',
      }}>
        <span style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.2em', color: 'oklch(0.52 0.012 65)', textTransform: 'uppercase' }}>
          Pomodoro
        </span>
        <button
          onClick={() => setMinimized(true)}
          style={{
            width: '24px', height: '24px', borderRadius: '50%',
            background: '#ede8e3',
            boxShadow: '-2px -2px 5px #ffffff, 2px 2px 5px #ccc5bc',
            border: 'none', cursor: 'pointer', color: '#9a8e88',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
          aria-label="Minimize"
        >
          <ChevronDown size={12} />
        </button>
      </div>

      {/* ── Cat Scene ── */}
      <div style={{ padding: '0 4px 0', lineHeight: 0, background: 'linear-gradient(180deg, oklch(0.985 0.012 60) 0%, oklch(0.960 0.012 75) 100%)', borderRadius: '12px', margin: '0 10px 4px', overflow: 'hidden' }}>
        <CatScene isRunning={isRunning} />
      </div>

      {/* ── Timer Ring ── */}
      <div style={{ display: 'flex', justifyContent: 'center', margin: '8px 0 4px' }}>
        <div style={{ position: 'relative', width: '120px', height: '120px' }}>
          <svg width="120" height="120" viewBox="0 0 120 120">
            {/* Track */}
            <circle cx="60" cy="60" r={RADIUS}
              fill="none" stroke="#ddd8d2" strokeWidth="8" />
            {/* Progress */}
            <circle cx="60" cy="60" r={RADIUS}
              fill="none" stroke={accent} strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={strokeDashoffset}
              transform="rotate(-90 60 60)"
              style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.4s ease',
                filter: isRunning ? `drop-shadow(0 0 3px ${accent}90)` : 'none' }}
            />
            {/* Progress head dot */}
            {isRunning && progress > 0 && (
              <circle
                cx={60 + RADIUS * Math.cos(-Math.PI / 2 + 2 * Math.PI * progress)}
                cy={60 + RADIUS * Math.sin(-Math.PI / 2 + 2 * Math.PI * progress)}
                r="4" fill={accent}
                style={{ filter: `drop-shadow(0 0 3px ${accent})` }}
              />
            )}
            {/* Inner fill */}
            <circle cx="60" cy="60" r="44" fill="oklch(0.972 0.010 75)" />
          </svg>
          {/* Time text */}
          <div style={{
            position: 'absolute', top: 0, left: 0, width: '120px', height: '120px',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            pointerEvents: 'none',
          }}>
            <span style={{
              fontFamily: 'var(--font-display)', fontStyle: 'italic',
              fontSize: '1.6rem', fontWeight: 400, color: justFinished ? accent : 'oklch(0.18 0.010 58)',
              lineHeight: 1, letterSpacing: '-0.02em',
              transition: 'color 0.4s ease',
            }}>
              {formatTime(timeLeft)}
            </span>
            <span style={{
              fontSize: '0.55rem', fontWeight: 700, letterSpacing: '0.14em',
              color: accent, marginTop: '3px', textTransform: 'uppercase',
            }}>
              {justFinished ? '✓ Done!' : MODES[mode].label}
            </span>
          </div>
        </div>
      </div>

      {/* ── Mode Pills ── */}
      <div style={{
        display: 'flex', gap: '6px', margin: '0 14px 10px',
        padding: '4px',
        borderRadius: '12px',
        background: 'oklch(0.960 0.012 75)',
        boxShadow: 'inset -2px -2px 6px rgba(255,252,248,0.9), inset 2px 2px 6px rgba(190,180,168,0.45)',
      }}>
        {(Object.keys(MODES) as Mode[]).map(m => (
          <button key={m} onClick={() => handleModeChange(m)}
            style={{
              flex: 1, padding: '5px 0', border: 'none', cursor: 'pointer',
              borderRadius: '9px', fontSize: '0.5rem', fontWeight: 700,
              letterSpacing: '0.08em', textTransform: 'uppercase',
              color: mode === m ? '#fff' : 'oklch(0.52 0.012 65)',
              background: mode === m ? accent : 'transparent',
              boxShadow: mode === m ? '-2px -2px 5px rgba(255,255,255,0.5), 2px 2px 5px rgba(0,0,0,0.12)' : 'none',
              transition: 'all 0.2s ease',
              fontFamily: 'var(--font-nav)',
            }}>
            {m === 'focus' ? 'FOCUS' : m === 'short' ? 'SHORT' : 'LONG'}
          </button>
        ))}
      </div>

      {/* ── Controls ── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', marginBottom: '12px' }}>
        {/* Reset */}
        <button onClick={handleReset}
          style={{
            width: '34px', height: '34px', borderRadius: '50%', border: 'none', cursor: 'pointer',
            background: 'oklch(0.972 0.010 75)',
            boxShadow: '-4px -4px 10px rgba(255,252,248,0.9), 4px 4px 10px rgba(190,180,168,0.5)',
            color: 'oklch(0.52 0.012 65)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'box-shadow 0.15s ease',
          }}
          onMouseDown={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = 'inset -2px -2px 5px #ffffff, inset 2px 2px 5px #ccc5bc'; }}
          onMouseUp={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = '-4px -4px 10px #ffffff, 4px 4px 10px #ccc5bc'; }}
          aria-label="Reset"
        >
          <RotateCcw size={13} />
        </button>

        {/* Play/Pause */}
        <button onClick={handleToggle}
          style={{
            width: '48px', height: '48px', borderRadius: '50%', border: 'none', cursor: 'pointer',
            background: isRunning ? accent : 'oklch(0.972 0.010 75)',
            boxShadow: isRunning
              ? `inset -3px -3px 7px rgba(255,255,255,0.35), inset 3px 3px 7px rgba(0,0,0,0.15), 0 0 12px ${accent}50`
              : '-6px -6px 14px rgba(255,252,248,0.9), 6px 6px 14px rgba(190,180,168,0.5)',
            color: isRunning ? '#fff' : accent,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s ease',
          }}
          aria-label={isRunning ? 'Pause' : 'Start'}
        >
          {isRunning
            ? <Pause size={18} />
            : <Play size={18} style={{ marginLeft: '2px' }} />}
        </button>

        {/* Session counter */}
        <div style={{
          width: '34px', height: '34px', borderRadius: '50%',
          background: '#ede8e3',
          boxShadow: '-4px -4px 10px #ffffff, 4px 4px 10px #ccc5bc',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexDirection: 'column',
        }}>
          <span style={{ fontSize: '0.65rem', fontWeight: 700, color: accent, lineHeight: 1 }}>
            {sessions}
          </span>
          <span style={{ fontSize: '0.4rem', color: '#9a8e88', letterSpacing: '0.05em' }}>
            done
          </span>
        </div>
      </div>

      {/* ── Session dots ── */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', paddingBottom: '14px' }}>
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} style={{
            width: '7px', height: '7px', borderRadius: '50%',
            background: i < (sessions % 4 === 0 && sessions > 0 ? 4 : sessions % 4) ? accent : '#d8d2cc',
            boxShadow: i < (sessions % 4 === 0 && sessions > 0 ? 4 : sessions % 4)
              ? `0 0 4px ${accent}80`
              : 'inset -1px -1px 3px #ffffff, inset 1px 1px 3px #ccc5bc',
            transition: 'all 0.3s ease',
          }} />
        ))}
      </div>
    </div>
  );
}
