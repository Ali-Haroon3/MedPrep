import { schedule, DEFAULT_SCHEDULING, SchedulingState } from './spacedRepetition';

describe('SM-2 schedule', () => {
  it('sets a 1-day interval on the first successful review', () => {
    const next = schedule(DEFAULT_SCHEDULING, 4);
    expect(next.repetitions).toBe(1);
    expect(next.interval).toBe(1);
  });

  it('grows to a 6-day interval on the second success', () => {
    const first = schedule(DEFAULT_SCHEDULING, 4);
    const second = schedule(first, 4);
    expect(second.repetitions).toBe(2);
    expect(second.interval).toBe(6);
  });

  it('multiplies the interval by the ease factor after the second review', () => {
    let state: SchedulingState = DEFAULT_SCHEDULING;
    state = schedule(state, 5); // rep 1 -> interval 1
    state = schedule(state, 5); // rep 2 -> interval 6
    const third = schedule(state, 5);
    expect(third.repetitions).toBe(3);
    expect(third.interval).toBe(Math.round(6 * state.easeFactor));
  });

  it('resets repetitions and interval on a lapse (quality < 3)', () => {
    let state = schedule(DEFAULT_SCHEDULING, 5);
    state = schedule(state, 5);
    const lapsed = schedule(state, 1);
    expect(lapsed.repetitions).toBe(0);
    expect(lapsed.interval).toBe(1);
  });

  it('never lets the ease factor drop below 1.3', () => {
    let state = DEFAULT_SCHEDULING;
    for (let i = 0; i < 10; i++) {
      state = schedule(state, 0);
    }
    expect(state.easeFactor).toBeGreaterThanOrEqual(1.3);
  });
});
