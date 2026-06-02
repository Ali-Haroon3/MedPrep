import { QuizResult } from '../utils/quizEngine';
import { loadItem, saveItem } from '../utils/storage';

// Persists a rolling history of completed quiz attempts so the dashboard can
// chart accuracy over time.

export interface QuizAttempt {
  id: string;
  topic: string;
  takenAt: string; // ISO timestamp
  total: number;
  correct: number;
  accuracy: number;
}

const STORAGE_KEY = 'quiz-attempts';
const MAX_HISTORY = 200;

let attempts: QuizAttempt[] = loadItem<QuizAttempt[]>(STORAGE_KEY, []);

export function getAttempts(): QuizAttempt[] {
  return attempts;
}

export function recordAttempt(topic: string, result: QuizResult, takenAt: string): QuizAttempt {
  const attempt: QuizAttempt = {
    id: `attempt-${attempts.length + 1}-${takenAt}`,
    topic,
    takenAt,
    total: result.total,
    correct: result.correct,
    accuracy: result.accuracy,
  };
  attempts = [attempt, ...attempts].slice(0, MAX_HISTORY);
  saveItem(STORAGE_KEY, attempts);
  return attempt;
}

export function clearAttempts(): void {
  attempts = [];
  saveItem(STORAGE_KEY, attempts);
}
