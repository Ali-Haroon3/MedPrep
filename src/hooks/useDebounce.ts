import { useEffect, useState } from 'react';

// Returns a debounced copy of a rapidly-changing value. Useful for search
// inputs so filtering does not run on every keystroke over large decks.

export function useDebounce<T>(value: T, delayMs = 250): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const handle = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(handle);
  }, [value, delayMs]);

  return debounced;
}
