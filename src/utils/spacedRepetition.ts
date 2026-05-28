// Implementation of the SM-2 spaced repetition algorithm (SuperMemo 2).
// Given a card's current scheduling state and a recall quality (0-5),
// returns the next interval, repetition count and updated ease factor.

export type Quality = 0 | 1 | 2 | 3 | 4 | 5;

export interface SchedulingState {
  /** Repetition count (number of consecutive successful reviews). */
  repetitions: number;
  /** Ease factor, minimum 1.3. */
  easeFactor: number;
  /** Interval in days until the next review. */
  interval: number;
}

export const DEFAULT_SCHEDULING: SchedulingState = {
  repetitions: 0,
  easeFactor: 2.5,
  interval: 0,
};

const MIN_EASE = 1.3;

/**
 * Compute the next scheduling state for a card.
 * @param state current scheduling state
 * @param quality recall quality, 0 (total blackout) to 5 (perfect recall)
 */
export function schedule(state: SchedulingState, quality: Quality): SchedulingState {
  let { repetitions, easeFactor, interval } = state;

  if (quality < 3) {
    // Lapse — reset the repetition streak but keep the (reduced) ease factor.
    repetitions = 0;
    interval = 1;
  } else {
    repetitions += 1;
    if (repetitions === 1) {
      interval = 1;
    } else if (repetitions === 2) {
      interval = 6;
    } else {
      interval = Math.round(interval * easeFactor);
    }
  }

  // Update ease factor per the SM-2 formula.
  easeFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  if (easeFactor < MIN_EASE) easeFactor = MIN_EASE;

  return { repetitions, easeFactor: round(easeFactor), interval };
}

/** Convert an interval (in days) from a base date into an ISO due date. */
export function nextDueDate(intervalDays: number, from: Date = new Date()): string {
  const due = new Date(from.getTime());
  due.setDate(due.getDate() + intervalDays);
  return due.toISOString();
}

function round(n: number): number {
  return Math.round(n * 100) / 100;
}
