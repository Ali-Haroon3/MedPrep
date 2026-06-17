// Barrel that re-exports the individual store slices under namespaces so
// callers can import a single module: `import { decks, notes } from '../store'`.

import * as deckStore from './deckStore';
import * as notesStore from './notesStore';
import * as goalStore from './goalStore';
import * as quizStore from './quizStore';

export const decks = deckStore;
export const notes = notesStore;
export const goals = goalStore;
export const quiz = quizStore;

export type { QuizAttempt } from './quizStore';
