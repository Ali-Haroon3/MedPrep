import React from 'react';
import { QuizResult } from '../utils/quizEngine';
import { formatDuration } from '../hooks/useTimer';

interface SessionSummaryProps {
  result: QuizResult;
  durationSeconds: number;
  nextDueCount: number;
  onRestart: () => void;
}

// End-of-session recap: accuracy, cards reviewed, time spent and what's left
// in the queue. Shown after a review or quiz round completes.
const SessionSummary: React.FC<SessionSummaryProps> = ({
  result,
  durationSeconds,
  nextDueCount,
  onRestart,
}) => {
  const pct = Math.round(result.accuracy * 100);
  const encouragement =
    pct >= 90 ? 'Excellent recall!' : pct >= 70 ? 'Solid session.' : 'Keep at it — repetition pays off.';

  return (
    <div style={panel} role="status" aria-live="polite">
      <h2 style={{ marginTop: 0 }}>Session complete</h2>
      <p style={{ color: 'var(--text-muted, #64748b)' }}>{encouragement}</p>

      <div style={statRow}>
        <Stat label="Accuracy" value={`${pct}%`} />
        <Stat label="Correct" value={`${result.correct}/${result.total}`} />
        <Stat label="Time" value={formatDuration(durationSeconds)} />
        <Stat label="Still due" value={nextDueCount} />
      </div>

      <button style={button} onClick={onRestart}>
        {nextDueCount > 0 ? 'Review the rest' : 'Study again'}
      </button>
    </div>
  );
};

const Stat: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
  <div style={{ textAlign: 'center' }}>
    <div style={{ fontSize: '1.75rem', fontWeight: 700 }}>{value}</div>
    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted, #64748b)' }}>{label}</div>
  </div>
);

const panel: React.CSSProperties = {
  maxWidth: 460,
  margin: '0 auto',
  padding: '1.5rem',
  background: 'var(--surface, #fff)',
  border: '1px solid var(--border, #e2e8f0)',
  borderRadius: 12,
  textAlign: 'center',
};
const statRow: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-around',
  gap: '1rem',
  margin: '1.25rem 0',
};
const button: React.CSSProperties = {
  padding: '0.6rem 1.5rem',
  background: 'var(--accent, #2563eb)',
  color: 'var(--accent-contrast, #fff)',
  border: 'none',
  borderRadius: 8,
  cursor: 'pointer',
};

export default SessionSummary;
