import React from 'react';
import { Quality } from '../utils/spacedRepetition';

// Anki-style grading row. Each button maps to an SM-2 recall quality and shows
// the projected next interval so the learner understands the consequence.

interface GradeOption {
  label: string;
  quality: Quality;
  color: string;
}

const OPTIONS: GradeOption[] = [
  { label: 'Again', quality: 1, color: '#ef4444' },
  { label: 'Hard', quality: 3, color: '#f59e0b' },
  { label: 'Good', quality: 4, color: '#10b981' },
  { label: 'Easy', quality: 5, color: '#2563eb' },
];

interface GradeButtonsProps {
  onGrade: (quality: Quality) => void;
  intervalPreview?: (quality: Quality) => string;
}

const GradeButtons: React.FC<GradeButtonsProps> = ({ onGrade, intervalPreview }) => (
  <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
    {OPTIONS.map((opt) => (
      <button
        key={opt.label}
        onClick={() => onGrade(opt.quality)}
        style={{
          flex: 1,
          padding: '0.6rem',
          border: 'none',
          borderRadius: 8,
          background: opt.color,
          color: '#fff',
          cursor: 'pointer',
        }}
      >
        <div style={{ fontWeight: 600 }}>{opt.label}</div>
        {intervalPreview && (
          <div style={{ fontSize: '0.7rem', opacity: 0.85 }}>{intervalPreview(opt.quality)}</div>
        )}
      </button>
    ))}
  </div>
);

export default GradeButtons;
