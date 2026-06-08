import { StudyGoal } from '../types/study';
import { loadItem, saveItem } from '../utils/storage';

// Manages study goals (target score by a target date) with progress toward
// each target derived from the user's latest performance.

const STORAGE_KEY = 'goals';

let goals: StudyGoal[] = loadItem<StudyGoal[]>(STORAGE_KEY, []);

function persist(): void {
  saveItem(STORAGE_KEY, goals);
}

export function getGoals(): StudyGoal[] {
  return goals;
}

export function addGoal(input: Omit<StudyGoal, 'id' | 'completed'>): StudyGoal {
  const goal: StudyGoal = { id: `goal-${Date.now()}`, completed: false, ...input };
  goals = [...goals, goal];
  persist();
  return goal;
}

export function toggleGoal(id: string): void {
  goals = goals.map((g) => (g.id === id ? { ...g, completed: !g.completed } : g));
  persist();
}

export function removeGoal(id: string): void {
  goals = goals.filter((g) => g.id !== id);
  persist();
}

/** Progress toward a goal as a 0..1 fraction of the target score. */
export function goalProgress(goal: StudyGoal, currentScore: number): number {
  if (goal.targetScore <= 0) return 1;
  return Math.min(1, currentScore / goal.targetScore);
}
