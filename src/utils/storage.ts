// Lightweight localStorage wrapper with JSON (de)serialization and safe fallbacks.
// Used across the study store so persistence has a single, testable entry point.

const NAMESPACE = 'medprep';

function key(name: string): string {
  return `${NAMESPACE}:${name}`;
}

export function loadItem<T>(name: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key(name));
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch (err) {
    // Corrupt data or unavailable storage (e.g. private mode) — never crash the app.
    console.warn(`[storage] failed to load "${name}":`, err);
    return fallback;
  }
}

export function saveItem<T>(name: string, value: T): void {
  try {
    window.localStorage.setItem(key(name), JSON.stringify(value));
  } catch (err) {
    console.warn(`[storage] failed to save "${name}":`, err);
  }
}

export function removeItem(name: string): void {
  try {
    window.localStorage.removeItem(key(name));
  } catch (err) {
    console.warn(`[storage] failed to remove "${name}":`, err);
  }
}

export function clearAll(): void {
  try {
    Object.keys(window.localStorage)
      .filter((k) => k.startsWith(`${NAMESPACE}:`))
      .forEach((k) => window.localStorage.removeItem(k));
  } catch (err) {
    console.warn('[storage] failed to clear namespace:', err);
  }
}
