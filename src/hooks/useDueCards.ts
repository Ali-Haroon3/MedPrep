import { useMemo } from 'react';
import { CardSchedule } from '../types/study';
import { dueCards, QueuedCard } from '../utils/reviewQueue';

// Convenience hook that memoizes the due-card queue and its count so review
// screens can badge "N due" without recomputing on every render.

interface DueCardsResult {
  queue: QueuedCard[];
  count: number;
}

export function useDueCards(schedules: CardSchedule[], now?: Date): DueCardsResult {
  return useMemo(() => {
    const queue = dueCards(schedules, now);
    return { queue, count: queue.length };
    // `now` is intentionally excluded so the queue is stable within a render
    // pass; pass a fresh array of schedules to force recomputation.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schedules]);
}
