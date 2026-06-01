import React from 'react';
import { useTimer, formatDuration } from '../hooks/useTimer';

interface StudyTimerProps {
  onSessionEnd?: (seconds: number) => void;
}

const StudyTimer: React.FC<StudyTimerProps> = ({ onSessionEnd }) => {
  const { seconds, running, start, pause, reset } = useTimer();

  const handleEnd = () => {
    if (onSessionEnd) onSessionEnd(seconds);
    reset();
  };

  return (
    <div className="study-timer" style={styles.container}>
      <div style={styles.display}>{formatDuration(seconds)}</div>
      <div style={styles.controls}>
        {running ? (
          <button style={styles.button} onClick={pause}>Pause</button>
        ) : (
          <button style={styles.button} onClick={start}>Start</button>
        )}
        <button style={styles.button} onClick={reset}>Reset</button>
        <button style={{ ...styles.button, ...styles.end }} onClick={handleEnd}>
          End session
        </button>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: { textAlign: 'center', padding: '1rem' },
  display: { fontSize: '2.5rem', fontVariantNumeric: 'tabular-nums', fontWeight: 700 },
  controls: { display: 'flex', gap: '0.5rem', justifyContent: 'center', marginTop: '0.75rem' },
  button: { padding: '0.5rem 1rem', borderRadius: 8, border: '1px solid #cbd5e1', cursor: 'pointer' },
  end: { background: '#2563eb', color: '#fff', borderColor: '#2563eb' },
};

export default StudyTimer;
