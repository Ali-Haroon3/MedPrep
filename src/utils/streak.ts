// Compute the current daily study streak from a list of study dates.
// A streak is the number of consecutive days (ending today or yesterday)
// on which at least one study session was logged.

/** Normalize a date to a YYYY-MM-DD key in local time. */
export function dayKey(date: Date): string {
  const y = date.getFullYear();
  const m = (date.getMonth() + 1).toString().padStart(2, '0');
  const d = date.getDate().toString().padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function addDays(key: string, delta: number): string {
  const [y, m, d] = key.split('-').map(Number);
  const dt = new Date(y, m - 1, d);
  dt.setDate(dt.getDate() + delta);
  return dayKey(dt);
}

export function currentStreak(studyDates: string[], today: Date = new Date()): number {
  if (studyDates.length === 0) return 0;
  const days = new Set(studyDates);
  const todayKey = dayKey(today);

  // Allow the streak to be "alive" if the user studied today or yesterday.
  let cursor = days.has(todayKey) ? todayKey : addDays(todayKey, -1);
  if (!days.has(cursor)) return 0;

  let streak = 0;
  while (days.has(cursor)) {
    streak += 1;
    cursor = addDays(cursor, -1);
  }
  return streak;
}

export function longestStreak(studyDates: string[]): number {
  const sorted = Array.from(new Set(studyDates)).sort();
  let best = 0;
  let run = 0;
  let prev: string | null = null;
  for (const key of sorted) {
    if (prev !== null && addDays(prev, 1) === key) {
      run += 1;
    } else {
      run = 1;
    }
    best = Math.max(best, run);
    prev = key;
  }
  return best;
}
