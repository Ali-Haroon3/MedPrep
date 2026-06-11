import { useEffect } from 'react';

// Registers a map of key -> handler on the document while mounted. Ignores
// keystrokes originating from text inputs so typing in a note never fires a
// review shortcut.

export type ShortcutMap = Record<string, (event: KeyboardEvent) => void>;

function isEditable(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName.toLowerCase();
  return tag === 'input' || tag === 'textarea' || target.isContentEditable;
}

export function useKeyboardShortcuts(shortcuts: ShortcutMap, enabled = true): void {
  useEffect(() => {
    if (!enabled) return;

    const handler = (event: KeyboardEvent) => {
      if (isEditable(event.target)) return;
      const fn = shortcuts[event.key];
      if (fn) {
        event.preventDefault();
        fn(event);
      }
    };

    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [shortcuts, enabled]);
}
