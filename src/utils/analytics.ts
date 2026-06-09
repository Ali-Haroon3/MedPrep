import { QuizAttempt } from '../store/quizStore';
import { dayKey } from './streak';

// Aggregation helpers that turn raw quiz attempts into series suitable for
// charting (accuracy over time, review counts per day).

export interface AccuracyPoint {
  date: string;   // YYYY-MM-DD
  accuracy: number; // 0..100 (percent, averaged across attempts that day)
}

export function accuracyOverTime(attempts: QuizAttempt[]): AccuracyPoint[] {
  const byDay = new Map<string, { sum: number; count: number }>();
  for (const a of attempts) {
    const key = dayKey(new Date(a.takenAt));
    const bucket = byDay.get(key) ?? { sum: 0, count: 0 };
    bucket.sum += a.accuracy;
    bucket.count += 1;
    byDay.set(key, bucket);
  }
  return Array.from(byDay.entries())
    .map(([date, { sum, count }]) => ({
      date,
      accuracy: Math.round((sum / count) * 100),
    }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

export interface DayCount {
  date: string;
  count: number;
}

export function reviewsPerDay(attempts: QuizAttempt[]): DayCount[] {
  const byDay = new Map<string, number>();
  for (const a of attempts) {
    const key = dayKey(new Date(a.takenAt));
    byDay.set(key, (byDay.get(key) ?? 0) + a.total);
  }
  return Array.from(byDay.entries())
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date));
}
