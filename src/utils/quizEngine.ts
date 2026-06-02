import { QuizQuestion } from '../types/study';

// Pure helpers for running a quiz: shuffling, scoring and building a summary.
// No React or global state here so the logic is trivially unit testable.

export interface AnswerRecord {
  questionId: string;
  selected: string;
  correct: boolean;
}

export interface QuizResult {
  total: number;
  correct: number;
  accuracy: number; // 0..1
  answers: AnswerRecord[];
}

/** Fisher-Yates shuffle. Returns a new array; does not mutate the input. */
export function shuffle<T>(items: T[]): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/** Build a randomized quiz of at most `size` questions. */
export function buildQuiz(pool: QuizQuestion[], size: number): QuizQuestion[] {
  return shuffle(pool).slice(0, Math.max(0, size));
}

export function gradeAnswer(question: QuizQuestion, selected: string): AnswerRecord {
  return {
    questionId: question.id,
    selected,
    correct: selected === question.correctAnswer,
  };
}

export function summarize(answers: AnswerRecord[]): QuizResult {
  const total = answers.length;
  const correct = answers.filter((a) => a.correct).length;
  return {
    total,
    correct,
    accuracy: total === 0 ? 0 : correct / total,
    answers,
  };
}
