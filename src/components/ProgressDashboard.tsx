import React from 'react';
import { currentStreak, longestStreak } from '../utils/streak';
import { getAttempts } from '../store/quizStore';

interface StatCardProps {
  label: string;
  value: string | number;
  accent?: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, accent = '#2563eb' }) => (
  <div style={{ ...cardStyle, borderTop: `3px solid ${accent}` }}>
    <div style={{ fontSize: '2rem', fontWeight: 700 }}>{value}</div>
    <div style={{ color: '#64748b', fontSize: '0.85rem' }}>{label}</div>
  </div>
);

interface ProgressDashboardProps {
  studyDates: string[];
}

const ProgressDashboard: React.FC<ProgressDashboardProps> = ({ studyDates }) => {
  const attempts = getAttempts();
  const avgAccuracy =
    attempts.length === 0
      ? 0
      : attempts.reduce((sum, a) => sum + a.accuracy, 0) / attempts.length;

  return (
    <section>
      <h2>Your progress</h2>
      <div style={gridStyle}>
        <StatCard label="Current streak (days)" value={currentStreak(studyDates)} accent="#f59e0b" />
        <StatCard label="Longest streak (days)" value={longestStreak(studyDates)} accent="#10b981" />
        <StatCard label="Quizzes taken" value={attempts.length} accent="#2563eb" />
        <StatCard label="Average accuracy" value={`${Math.round(avgAccuracy * 100)}%`} accent="#7c3aed" />
      </div>
    </section>
  );
};

const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
  gap: '1rem',
};

const cardStyle: React.CSSProperties = {
  background: '#fff',
  borderRadius: 12,
  padding: '1.25rem',
  boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
};

export default ProgressDashboard;
