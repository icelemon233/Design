import { useCallback, useState } from 'react';

/** Keep controlled props authoritative; notify parents without changing their value. */
export function useControllable<T>(
  value: T | undefined,
  defaultValue: T,
  onChange?: (value: T) => void,
) {
  const [inner, setInner] = useState(defaultValue);
  const current = value === undefined ? inner : value;
  const update = useCallback(
    (next: T) => {
      if (value === undefined) setInner(next);
      onChange?.(next);
    },
    [value, onChange],
  );
  return [current, update] as const;
}
