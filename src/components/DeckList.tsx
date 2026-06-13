import React from 'react';
import { Deck, countByDifficulty } from '../data/types';
import { CardSchedule } from '../types/study';
import { deckProgress } from '../utils/deckProgress';
import { dueCount } from '../utils/reviewQueue';

interface DeckListProps {
  decks: Deck[];
  schedules: CardSchedule[];
  onSelect: (deckId: string) => void;
}

const DeckList: React.FC<DeckListProps> = ({ decks, schedules, onSelect }) => {
  if (decks.length === 0) {
    return <p style={{ color: 'var(--text-muted, #64748b)' }}>No decks yet — create or import one to start.</p>;
  }

  return (
    <div style={grid}>
      {decks.map((deck) => {
        const counts = countByDifficulty(deck);
        const progress = deckProgress(deck, schedules);
        const scheduleIds = new Set(deck.cards.map((c) => c.id));
        const due = dueCount(schedules.filter((s) => scheduleIds.has(s.cardId)));
        const pct = Math.round(progress.mastery * 100);

        return (
          <button key={deck.id} onClick={() => onSelect(deck.id)} style={{ ...card, borderTop: `4px solid ${deck.color}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong>{deck.name}</strong>
              {due > 0 && <span style={badge}>{due} due</span>}
            </div>
            <div style={{ color: 'var(--text-muted, #64748b)', fontSize: '0.8rem', margin: '0.25rem 0 0.5rem' }}>
              {deck.subject} · {deck.cards.length} cards
            </div>
            <div style={track}>
              <div style={{ ...fill, width: `${pct}%`, background: deck.color }} />
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted, #64748b)', marginTop: '0.3rem' }}>
              {pct}% mastered · {counts.easy}E / {counts.medium}M / {counts.hard}H
            </div>
          </button>
        );
      })}
    </div>
  );
};

const grid: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
  gap: '1rem',
};
const card: React.CSSProperties = {
  textAlign: 'left',
  background: 'var(--surface, #fff)',
  border: '1px solid var(--border, #e2e8f0)',
  borderRadius: 12,
  padding: '1rem',
  cursor: 'pointer',
  color: 'inherit',
};
const badge: React.CSSProperties = {
  background: '#f59e0b',
  color: '#fff',
  borderRadius: 999,
  padding: '0.1rem 0.55rem',
  fontSize: '0.72rem',
  fontWeight: 600,
};
const track: React.CSSProperties = {
  height: 6,
  background: 'var(--border, #e2e8f0)',
  borderRadius: 999,
  overflow: 'hidden',
};
const fill: React.CSSProperties = { height: '100%', transition: 'width 0.3s ease' };

export default DeckList;
