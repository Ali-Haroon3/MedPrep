import { DeckCard } from '../data/types';

// Simple client-side search + tag filtering over cards. Matching is
// case-insensitive across the front, back and tags of each card.

export interface CardFilter {
  query?: string;
  tags?: string[];
  difficulty?: DeckCard['difficulty'];
}

function matchesQuery(card: DeckCard, query: string): boolean {
  const q = query.toLowerCase();
  return (
    card.front.toLowerCase().includes(q) ||
    card.back.toLowerCase().includes(q) ||
    card.tags.some((t) => t.toLowerCase().includes(q))
  );
}

export function filterCards(cards: DeckCard[], filter: CardFilter): DeckCard[] {
  return cards.filter((card) => {
    if (filter.query && filter.query.trim() && !matchesQuery(card, filter.query)) {
      return false;
    }
    if (filter.difficulty && card.difficulty !== filter.difficulty) {
      return false;
    }
    if (filter.tags && filter.tags.length > 0) {
      const cardTags = new Set(card.tags.map((t) => t.toLowerCase()));
      const hasAll = filter.tags.every((t) => cardTags.has(t.toLowerCase()));
      if (!hasAll) return false;
    }
    return true;
  });
}

/** Collect the unique set of tags present across a list of cards. */
export function collectTags(cards: DeckCard[]): string[] {
  const set = new Set<string>();
  cards.forEach((c) => c.tags.forEach((t) => set.add(t)));
  return Array.from(set).sort();
}
