import { Deck } from '../data/types';
import { CardSchedule } from '../types/study';

// Derive a "mastery" figure for a deck from its cards' scheduling state.
// A card is considered learned once its interval reaches the review threshold
// (default 21 days), which under SM-2 means it has survived several successful
// recalls.

const MASTERED_INTERVAL_DAYS = 21;

export interface DeckProgress {
  deckId: string;
  total: number;
  learned: number;
  mastery: number; // 0..1
}

export function deckProgress(
  deck: Deck,
  schedules: CardSchedule[],
  threshold = MASTERED_INTERVAL_DAYS
): DeckProgress {
  const byCard = new Map(schedules.map((s) => [s.cardId, s]));
  const total = deck.cards.length;
  const learned = deck.cards.reduce((count, card) => {
    const schedule = byCard.get(card.id);
    return schedule && schedule.interval >= threshold ? count + 1 : count;
  }, 0);

  return {
    deckId: deck.id,
    total,
    learned,
    mastery: total === 0 ? 0 : learned / total,
  };
}
