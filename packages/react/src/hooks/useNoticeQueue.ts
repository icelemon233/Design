import { useCallback, useEffect, useRef, useState, type Key } from 'react';

export interface NoticeConfig {
  key?: Key;
  duration?: number;
  onClose?: () => void;
}
export function useNoticeQueue<T extends NoticeConfig>(defaultDuration: number) {
  const [items, setItems] = useState<Array<T & { key: Key }>>([]);
  const current = useRef(items),
    timers = useRef(new Map<Key, ReturnType<typeof setTimeout>>());
  const sequence = useRef(0);
  const remove = useCallback((key?: Key) => {
    const removed =
      key === undefined ? current.current : current.current.filter((item) => item.key === key);
    for (const item of removed) {
      clearTimeout(timers.current.get(item.key));
      timers.current.delete(item.key);
    }
    current.current = key === undefined ? [] : current.current.filter((item) => item.key !== key);
    setItems(current.current);
    removed.forEach((item) => item.onClose?.());
  }, []);
  const open = useCallback(
    (config: T) => {
      const key = config.key ?? `cinna-notice-${++sequence.current}`;
      const next = { ...config, key };
      const index = current.current.findIndex((item) => item.key === key);
      current.current =
        index >= 0
          ? current.current.map((item) => (item.key === key ? next : item))
          : [...current.current, next];
      setItems(current.current);
      clearTimeout(timers.current.get(key));
      const duration = config.duration ?? defaultDuration;
      if (duration > 0)
        timers.current.set(
          key,
          setTimeout(() => remove(key), duration * 1000),
        );
      return () => remove(key);
    },
    [defaultDuration, remove],
  );
  useEffect(
    () => () => {
      timers.current.forEach((timer) => clearTimeout(timer));
      timers.current.clear();
    },
    [],
  );
  return { items, open, destroy: remove };
}
