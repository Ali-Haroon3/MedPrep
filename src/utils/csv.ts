import { DeckCard, Difficulty } from '../data/types';

// Parse Anki-style CSV exports ("front,back,tags") into DeckCards. Handles
// quoted fields containing commas and escaped quotes.

function parseLine(line: string): string[] {
  const fields: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"' && line[i + 1] === '"') {
        current += '"';
        i++;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        current += ch;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ',') {
      fields.push(current);
      current = '';
    } else {
      current += ch;
    }
  }
  fields.push(current);
  return fields.map((f) => f.trim());
}

const VALID_DIFFICULTY: Difficulty[] = ['easy', 'medium', 'hard'];

export function parseCsvCards(csv: string): DeckCard[] {
  const lines = csv.split(/\r?\n/).filter((l) => l.trim().length > 0);
  return lines.map((line, index) => {
    const [front, back, tagsRaw, difficultyRaw] = parseLine(line);
    const difficulty = VALID_DIFFICULTY.includes(difficultyRaw as Difficulty)
      ? (difficultyRaw as Difficulty)
      : 'medium';
    return {
      id: `import-${index}-${Date.now()}`,
      front: front ?? '',
      back: back ?? '',
      tags: tagsRaw ? tagsRaw.split(/[; ]+/).filter(Boolean) : [],
      difficulty,
    };
  });
}
