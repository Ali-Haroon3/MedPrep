import { Deck, DeckCard } from '../data/types';
import { seedDecks } from '../data/decks';
import { loadItem, saveItem } from '../utils/storage';

// Minimal observable deck store. Kept framework-agnostic (no React import) so
// it can be unit tested and later wrapped by a hook or zustand slice.

type Listener = () => void;

const STORAGE_KEY = 'decks';

let decks: Deck[] = loadItem<Deck[]>(STORAGE_KEY, seedDecks);
const listeners = new Set<Listener>();

function emit(): void {
  saveItem(STORAGE_KEY, decks);
  listeners.forEach((l) => l());
}

export function getDecks(): Deck[] {
  return decks;
}

export function getDeck(id: string): Deck | undefined {
  return decks.find((d) => d.id === id);
}

export function addDeck(deck: Deck): void {
  decks = [...decks, deck];
  emit();
}

export function removeDeck(id: string): void {
  decks = decks.filter((d) => d.id !== id);
  emit();
}

export function addCard(deckId: string, card: DeckCard): void {
  decks = decks.map((d) =>
    d.id === deckId ? { ...d, cards: [...d.cards, card] } : d
  );
  emit();
}

export function subscribe(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
