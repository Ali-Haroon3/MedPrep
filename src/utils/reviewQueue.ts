import { CardSchedule } from '../types/study';

// Build the review queue for a session: cards that are due (dueDate <= now),
// ordered by how overdue they are, then by lowest ease (hardest first).

export interface QueuedCard {
  cardId: string;
  overdueDays: number;
  easeFactor: number;
}

const MS_PER_DAY = 1000 * 60 * 60 * 24;

export function dueCards(schedules: CardSchedule[], now: Date = new Date()): QueuedCard[] {
  const nowMs = now.getTime();

  return schedules
    .map((s) => ({
      cardId: s.cardId,
      overdueDays: (nowMs - new Date(s.dueDate).getTime()) / MS_PER_DAY,
      easeFactor: s.easeFactor,
    }))
    .filter((c) => c.overdueDays >= 0)
    .sort((a, b) => {
      if (b.overdueDays !== a.overdueDays) return b.overdueDays - a.overdueDays;
      return a.easeFactor - b.easeFactor;
    });
}

/** How many cards are due at or before `now`. */
export function dueCount(schedules: CardSchedule[], now: Date = new Date()): number {
  return dueCards(schedules, now).length;
}
