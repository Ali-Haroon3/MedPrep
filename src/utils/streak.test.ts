import { currentStreak, longestStreak, dayKey } from './streak';

const today = new Date(2026, 5, 15); // 2026-06-15

function daysAgo(n: number): string {
  const d = new Date(today.getTime());
  d.setDate(d.getDate() - n);
  return dayKey(d);
}

describe('currentStreak', () => {
  it('returns 0 with no study dates', () => {
    expect(currentStreak([], today)).toBe(0);
  });

  it('counts consecutive days ending today', () => {
    const dates = [daysAgo(0), daysAgo(1), daysAgo(2)];
    expect(currentStreak(dates, today)).toBe(3);
  });

  it('stays alive if the last study day was yesterday', () => {
    const dates = [daysAgo(1), daysAgo(2)];
    expect(currentStreak(dates, today)).toBe(2);
  });

  it('breaks when there is a gap', () => {
    const dates = [daysAgo(0), daysAgo(2), daysAgo(3)];
    expect(currentStreak(dates, today)).toBe(1);
  });
});

describe('longestStreak', () => {
  it('finds the longest consecutive run', () => {
    const dates = [daysAgo(10), daysAgo(5), daysAgo(4), daysAgo(3), daysAgo(1)];
    expect(longestStreak(dates)).toBe(3);
  });
});
