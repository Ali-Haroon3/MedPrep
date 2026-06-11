import React, { useMemo, useState } from 'react';
import { DeckCard } from '../data/types';
import { Quality } from '../utils/spacedRepetition';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';

interface FlashcardReviewProps {
  cards: DeckCard[];
  onGrade: (card: DeckCard, quality: Quality) => void;
  onComplete?: () => void;
}

// Keyboard-first review: Space flips the card, 1-4 grade recall quality and
// advance to the next card.
const FlashcardReview: React.FC<FlashcardReviewProps> = ({ cards, onGrade, onComplete }) => {
  const [index, setIndex] = useState(0);
  const [showBack, setShowBack] = useState(false);

  const card = cards[index];

  const advance = (quality: Quality) => {
    if (!card) return;
    onGrade(card, quality);
    setShowBack(false);
    if (index + 1 >= cards.length) {
      onComplete?.();
    } else {
      setIndex((i) => i + 1);
    }
  };

  const shortcuts = useMemo(
    () => ({
      ' ': () => setShowBack((s) => !s),
      '1': () => showBack && advance(1),
      '2': () => showBack && advance(3),
      '3': () => showBack && advance(4),
      '4': () => showBack && advance(5),
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [showBack, index, card]
  );

  useKeyboardShortcuts(shortcuts);

  if (!card) {
    return <p>No cards to review.</p>;
  }

  return (
    <div style={{ maxWidth: 520, margin: '0 auto', textAlign: 'center' }}>
      <div style={{ color: '#64748b', fontSize: '0.85rem' }}>
        Card {index + 1} of {cards.length}
      </div>
      <div
        onClick={() => setShowBack((s) => !s)}
        style={{
          minHeight: 160,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem',
          margin: '1rem 0',
          border: '1px solid #e2e8f0',
          borderRadius: 12,
          cursor: 'pointer',
          fontSize: '1.15rem',
        }}
      >
        {showBack ? card.back : card.front}
      </div>
      {showBack ? (
        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
          <button onClick={() => advance(1)}>Again (1)</button>
          <button onClick={() => advance(3)}>Hard (2)</button>
          <button onClick={() => advance(4)}>Good (3)</button>
          <button onClick={() => advance(5)}>Easy (4)</button>
        </div>
      ) : (
        <p style={{ color: '#94a3b8' }}>Press Space or click to reveal</p>
      )}
    </div>
  );
};

export default FlashcardReview;
