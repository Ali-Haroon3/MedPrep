import { Deck } from '../data/types';

// JSON import/export for decks. Export produces a stable, pretty-printed
// string; import validates the minimal shape before trusting the payload.

export function exportDeck(deck: Deck): string {
  return JSON.stringify(deck, null, 2);
}

export function exportDecks(decks: Deck[]): string {
  return JSON.stringify(decks, null, 2);
}

function isDeckLike(value: unknown): value is Deck {
  if (!value || typeof value !== 'object') return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.id === 'string' &&
    typeof v.name === 'string' &&
    Array.isArray(v.cards)
  );
}

export function importDecks(json: string): Deck[] {
  let parsed: unknown;
  try {
    parsed = JSON.parse(json);
  } catch {
    throw new Error('Import failed: file is not valid JSON.');
  }

  const list = Array.isArray(parsed) ? parsed : [parsed];
  const decks = list.filter(isDeckLike);
  if (decks.length === 0) {
    throw new Error('Import failed: no valid decks found in file.');
  }
  return decks;
}

/** Trigger a browser download of exported deck JSON. */
export function downloadJson(filename: string, json: string): void {
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
