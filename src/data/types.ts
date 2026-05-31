// Data-layer types for decks and cards. Kept separate from UI/study types so
// seed content and import/export can depend on a stable shape.

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface DeckCard {
  id: string;
  front: string;
  back: string;
  difficulty: Difficulty;
  tags: string[];
}

export interface Deck {
  id: string;
  name: string;
  subject: string;      // e.g. "Biology", "Biochemistry"
  description: string;
  color: string;        // hex used for deck badge / accents
  cards: DeckCard[];
}

export function countByDifficulty(deck: Deck): Record<Difficulty, number> {
  return deck.cards.reduce(
    (acc, c) => {
      acc[c.difficulty] += 1;
      return acc;
    },
    { easy: 0, medium: 0, hard: 0 } as Record<Difficulty, number>
  );
}
