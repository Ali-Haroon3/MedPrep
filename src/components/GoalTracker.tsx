import React from 'react';
import { StudyGoal } from '../types/study';
import { goalProgress } from '../store/goalStore';

interface GoalTrackerProps {
  goals: StudyGoal[];
  currentScore: number;
  onToggle: (id: string) => void;
}

const GoalTracker: React.FC<GoalTrackerProps> = ({ goals, currentScore, onToggle }) => {
  if (goals.length === 0) {
    return <p style={{ color: '#64748b' }}>Set a target score to start tracking a goal.</p>;
  }

  return (
    <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '0.75rem' }}>
      {goals.map((goal) => {
        const pct = Math.round(goalProgress(goal, currentScore) * 100);
        return (
          <li key={goal.id} style={itemStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <label style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <input type="checkbox" checked={goal.completed} onChange={() => onToggle(goal.id)} />
                <strong>{goal.title}</strong>
              </label>
              <span style={{ color: '#64748b', fontSize: '0.85rem' }}>
                target {goal.targetScore}
              </span>
            </div>
            <div style={trackStyle}>
              <div style={{ ...fillStyle, width: `${pct}%` }} />
            </div>
            <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{pct}% of target</div>
          </li>
        );
      })}
    </ul>
  );
};

const itemStyle: React.CSSProperties = {
  background: '#fff',
  border: '1px solid #e2e8f0',
  borderRadius: 10,
  padding: '0.9rem',
};
const trackStyle: React.CSSProperties = {
  height: 8,
  background: '#e2e8f0',
  borderRadius: 999,
  overflow: 'hidden',
  margin: '0.5rem 0 0.25rem',
};
const fillStyle: React.CSSProperties = {
  height: '100%',
  background: '#10b981',
  transition: 'width 0.3s ease',
};

export default GoalTracker;
