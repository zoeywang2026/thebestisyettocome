/**
 * PomodoroTimer Component — Egg / Focus Space Edition
 * Design: Minimal meditation aesthetic (ref: variant.com focus space)
 *   - Vertical oval "egg" card as main container
 *   - Italic serif mode label + large bold sans-serif time
 *   - Ultra-minimal controls: reset icon / START text / skip icon
 *   - Stats row: TODAY / TOTAL / STREAK
 *   - Bottom icon nav: timer / music / heart / settings
 * Position: fixed bottom-left, anchored to edge
 * Colors: warm cream bg, white egg card, charcoal text
 */
import { useState, useEffect, useRef } from 'react';
import { RotateCcw, SkipForward, Timer, Music2, Heart, Settings, ChevronDown, ChevronUp } from 'lucide-react';

type Mode = 'focus' | 'short' | 'long';

const MODES: Record<Mode, { label: string; duration: number }> = {
  focus: { label: 'Focus',       duration: 25 * 60 },
  short: { label: 'Short Break', duration: 5  * 60 },
  long:  { label: 'Long Break',  duration: 15 * 60 },
};

const EGG_W = 190;
const EGG_H = 240;

export default function PomodoroTimer() {
  const [mode, setMode] = useState<Mode>('focus');
  const [timeLeft, setTimeLeft] = useState(MODES.focus.duration);
  const [isRunning, setIsRunning] = useState(false);
  const [sessions, setSessions] = useState(0);
  const [totalMinutes, setTotalMinutes] = useState(0);
  const [streak, setStreak] = useState(1);
  const [minimized, setMinimized] = useState(false);
  const [justFinished, setJustFinished] = useState(false);
  const [activeNav, setActiveNav] = useState<'timer' | 'music' | 'heart' | 'settings'>('timer');
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const totalDuration = MODES[mode].duration;
  const progress = (totalDuration - timeLeft) / totalDuration;

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

  const handleSkip = () => {
    setTimeLeft(0);
    setIsRunning(false);
    setJustFinished(true);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const handleToggle = () => {
    if (justFinished) {
      handleReset();
      return;
    }
    setIsRunning(r => !r);
  };

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) {
            clearInterval(intervalRef.current!);
            setIsRunning(false);
            setJustFinished(true);
            setSessions(s => s + 1);
            setTotalMinutes(m => m + Math.floor(MODES[mode].duration / 60));
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

  // Egg SVG path
  const eggPath = `M${EGG_W / 2} 10 C${EGG_W * 0.84} 10, ${EGG_W - 10} ${EGG_H * 0.40}, ${EGG_W - 10} ${EGG_H * 0.60} C${EGG_W - 10} ${EGG_H - 18}, ${EGG_W * 0.72} ${EGG_H - 10}, ${EGG_W / 2} ${EGG_H - 10} C${EGG_W * 0.28} ${EGG_H - 10}, 10 ${EGG_H - 18}, 10 ${EGG_H * 0.60} C10 ${EGG_H * 0.40}, ${EGG_W * 0.16} 10, ${EGG_W / 2} 10 Z`;

  // Ellipse progress ring params
  const rx = EGG_W / 2 - 14;
  const ry = EGG_H / 2 - 14;
  const cx = EGG_W / 2;
  const cy = EGG_H / 2 + 4;
  const circumference = 2 * Math.PI * Math.sqrt((rx * rx + ry * ry) / 2);
  const strokeOffset = circumference * (1 - progress);

  // Minimized pill
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
          padding: '8px 14px',
          borderRadius: '50px',
          background: 'rgba(255,253,251,0.95)',
          boxShadow: '0 4px 20px rgba(160,145,135,0.22)',
          cursor: 'pointer',
          fontFamily: 'var(--font-nav)',
          userSelect: 'none',
          border: '1px solid rgba(210,200,195,0.5)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <div style={{
          width: '7px', height: '7px', borderRadius: '50%',
          backgroundColor: isRunning ? '#c8907a' : 'oklch(0.75 0.010 65)',
          boxShadow: isRunning ? '0 0 6px #c8907a' : 'none',
          animation: isRunning ? 'neuPulse 2s ease-in-out infinite' : 'none',
        }} />
        <span style={{
          fontSize: '0.78rem', fontWeight: 600,
          letterSpacing: '0.05em',
          color: 'oklch(0.25 0.010 60)',
          fontFamily: 'var(--font-nav)',
        }}>
          {formatTime(timeLeft)}
        </span>
        <ChevronUp size={11} style={{ color: 'oklch(0.55 0.010 65)' }} />
      </div>
    );
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '0px',
        left: '20px',
        zIndex: 50,
        width: '230px',
        background: 'oklch(0.972 0.010 75)',
        borderRadius: '20px 20px 0 0',
        boxShadow: '0 -8px 40px rgba(160,145,135,0.18), 0 -2px 12px rgba(160,145,135,0.10)',
        fontFamily: 'var(--font-nav)',
        userSelect: 'none',
        animation: isRunning ? 'eggFloat 5s ease-in-out infinite' : 'none',
        border: '1px solid rgba(210,200,195,0.4)',
        borderBottom: 'none',
      }}
    >
      {/* ── Top bar ── */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '12px 16px 4px',
      }}>
        <span style={{
          fontSize: '0.58rem', fontWeight: 700,
          letterSpacing: '0.22em', textTransform: 'uppercase',
          color: 'oklch(0.60 0.010 65)',
        }}>
          Focus Space
        </span>
        <button
          onClick={() => setMinimized(true)}
          style={{
            width: '22px', height: '22px', borderRadius: '50%',
            border: '1px solid rgba(200,190,185,0.5)',
            background: 'transparent',
            cursor: 'pointer',
            color: 'oklch(0.60 0.010 65)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
          aria-label="Minimize"
        >
          <ChevronDown size={11} />
        </button>
      </div>

      {/* ── Mode tabs ── */}
      <div style={{
        display: 'flex', justifyContent: 'center', gap: '4px',
        padding: '4px 16px 8px',
      }}>
        {(Object.keys(MODES) as Mode[]).map(m => (
          <button
            key={m}
            onClick={() => handleModeChange(m)}
            style={{
              padding: '3px 8px',
              borderRadius: '50px',
              border: mode === m ? '1px solid rgba(180,165,155,0.7)' : '1px solid transparent',
              background: mode === m ? 'rgba(255,253,251,0.9)' : 'transparent',
              fontSize: '0.5rem',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: mode === m ? 'oklch(0.25 0.010 60)' : 'oklch(0.60 0.010 65)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              fontFamily: 'var(--font-nav)',
            }}
          >
            {m === 'focus' ? 'Focus' : m === 'short' ? 'Short' : 'Long'}
          </button>
        ))}
      </div>

      {/* ── Egg Card ── */}
      <div style={{ position: 'relative', width: `${EGG_W}px`, height: `${EGG_H}px`, margin: '0 auto 8px' }}>
        {/* SVG egg + progress ring */}
        <svg
          width={EGG_W}
          height={EGG_H}
          viewBox={`0 0 ${EGG_W} ${EGG_H}`}
          style={{ position: 'absolute', top: 0, left: 0 }}
        >
          <defs>
            <filter id="eggShadow2" x="-20%" y="-15%" width="140%" height="140%">
              <feDropShadow dx="0" dy="5" stdDeviation="10" floodColor="rgba(170,155,145,0.20)" />
            </filter>
          </defs>

          {/* Egg fill */}
          <path d={eggPath} fill="rgba(255,253,251,0.97)" filter="url(#eggShadow2)" />

          {/* Progress track */}
          <ellipse
            cx={cx} cy={cy} rx={rx} ry={ry}
            fill="none"
            stroke="rgba(210,200,195,0.30)"
            strokeWidth="2"
          />
          {/* Progress fill */}
          <ellipse
            cx={cx} cy={cy} rx={rx} ry={ry}
            fill="none"
            stroke={justFinished ? '#90b898' : 'rgba(170,148,135,0.65)'}
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={`${circumference}`}
            strokeDashoffset={`${strokeOffset}`}
            transform={`rotate(-90 ${cx} ${cy})`}
            style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.4s ease' }}
          />

          {/* Top decorative mark */}
          <g opacity="0.35">
            <line x1={cx - 5} y1="24" x2={cx + 5} y2="24" stroke="#9a8e88" strokeWidth="1" strokeLinecap="round" />
            <path d={`M${cx - 4} 24 Q${cx} 31 ${cx + 4} 24`} fill="none" stroke="#9a8e88" strokeWidth="1" strokeLinecap="round" />
            <path d={`M${cx - 4} 24 Q${cx} 17 ${cx + 4} 24`} fill="none" stroke="#9a8e88" strokeWidth="1" strokeLinecap="round" />
          </g>
        </svg>

        {/* Content inside egg */}
        <div style={{
          position: 'absolute', top: 0, left: 0,
          width: `${EGG_W}px`, height: `${EGG_H}px`,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          paddingTop: '12px',
        }}>
          {/* Mode label — italic serif */}
          <span style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: '0.88rem',
            color: 'oklch(0.48 0.010 65)',
            letterSpacing: '0.02em',
            marginBottom: '6px',
          }}>
            {justFinished ? 'Well done!' : MODES[mode].label}
          </span>

          {/* Time — large bold */}
          <span style={{
            fontFamily: 'var(--font-nav)',
            fontWeight: 700,
            fontSize: '2.5rem',
            color: justFinished ? '#90b898' : 'oklch(0.14 0.008 55)',
            letterSpacing: '-0.03em',
            lineHeight: 1,
            marginBottom: '20px',
            transition: 'color 0.4s ease',
          }}>
            {formatTime(timeLeft)}
          </span>

          {/* Controls row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Reset */}
            <button
              onClick={handleReset}
              aria-label="Reset"
              style={{
                width: '28px', height: '28px', borderRadius: '50%',
                border: '1px solid rgba(200,190,185,0.55)',
                background: 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
                color: 'oklch(0.55 0.010 65)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(200,190,185,0.15)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}
            >
              <RotateCcw size={11} />
            </button>

            {/* Start / Pause */}
            <button
              onClick={handleToggle}
              style={{
                padding: '7px 18px',
                borderRadius: '50px',
                border: '1px solid rgba(170,155,145,0.65)',
                background: isRunning ? 'oklch(0.25 0.008 55)' : 'transparent',
                fontSize: '0.6rem',
                fontWeight: 700,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: isRunning ? 'oklch(0.97 0.005 75)' : 'oklch(0.25 0.008 55)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontFamily: 'var(--font-nav)',
              }}
              onMouseEnter={e => {
                if (!isRunning) {
                  (e.currentTarget as HTMLButtonElement).style.background = 'rgba(170,155,145,0.12)';
                }
              }}
              onMouseLeave={e => {
                if (!isRunning) {
                  (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                }
              }}
            >
              {isRunning ? 'PAUSE' : justFinished ? 'AGAIN' : 'START'}
            </button>

            {/* Skip */}
            <button
              onClick={handleSkip}
              aria-label="Skip"
              style={{
                width: '28px', height: '28px', borderRadius: '50%',
                border: '1px solid rgba(200,190,185,0.55)',
                background: 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
                color: 'oklch(0.55 0.010 65)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(200,190,185,0.15)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}
            >
              <SkipForward size={11} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Stats row ── */}
      <div style={{
        display: 'flex', justifyContent: 'center', gap: '0',
        padding: '4px 20px 10px',
        borderTop: '1px solid rgba(210,200,195,0.30)',
        marginTop: '2px',
      }}>
        {[
          { value: sessions, label: 'TODAY' },
          { value: `${totalMinutes}m`, label: 'TOTAL' },
          { value: `#${streak}`, label: 'STREAK' },
        ].map((stat, i) => (
          <div key={stat.label} style={{
            flex: 1,
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            padding: '6px 0',
            borderRight: i < 2 ? '1px solid rgba(210,200,195,0.30)' : 'none',
          }}>
            <span style={{
              fontSize: '0.85rem', fontWeight: 700,
              color: 'oklch(0.22 0.008 55)',
              fontFamily: 'var(--font-nav)',
              letterSpacing: '-0.01em',
            }}>
              {stat.value}
            </span>
            <span style={{
              fontSize: '0.45rem', fontWeight: 600,
              letterSpacing: '0.16em', textTransform: 'uppercase',
              color: 'oklch(0.60 0.010 65)',
              marginTop: '1px',
            }}>
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* ── Bottom nav icons ── */}
      <div style={{
        display: 'flex', justifyContent: 'space-around', alignItems: 'center',
        padding: '8px 16px 14px',
        borderTop: '1px solid rgba(210,200,195,0.25)',
      }}>
        {([
          { key: 'timer', Icon: Timer },
          { key: 'music', Icon: Music2 },
          { key: 'heart', Icon: Heart },
          { key: 'settings', Icon: Settings },
        ] as { key: typeof activeNav; Icon: typeof Timer }[]).map(({ key, Icon }) => (
          <button
            key={key}
            onClick={() => setActiveNav(key)}
            style={{
              width: '32px', height: '32px',
              border: 'none', background: 'transparent',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: activeNav === key ? 'oklch(0.22 0.008 55)' : 'oklch(0.65 0.010 65)',
              transition: 'color 0.2s ease',
              position: 'relative',
            }}
          >
            <Icon size={15} strokeWidth={activeNav === key ? 2 : 1.5} />
            {activeNav === key && (
              <div style={{
                position: 'absolute', bottom: '2px',
                width: '4px', height: '4px', borderRadius: '50%',
                background: 'oklch(0.22 0.008 55)',
              }} />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
