import { useEffect, useState } from 'react';

// Stretch 4: a generic hook that persists a typed value of whatever type in localStorage.
// T is inferred from `initial`. Because stored JSON can be anything, the
// caller passes a type guard that proves the loaded value really is a T.
export function useLocalStorage<T>(
  key: string,
  initial: T,
  isValid: (value: unknown) => value is T,
) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw === null) return initial;
      // JSON.parse gives no guarantees, so treat its result as unknown...
      const parsed: unknown = JSON.parse(raw);
      // ...and only trust it after the guard has checked it.
      return isValid(parsed) ? parsed : initial;
    } catch {
      return initial; // storage blocked or corrupt JSON
    }
  });

  // Save whenever the value changes.
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage full or blocked: the app still works, it just won't persist.
    }
  }, [key, value]);

  // Return a tuple type so callers get [T, setter] rather than (T | setter)[].
  return [value, setValue] satisfies [T, typeof setValue];
}
