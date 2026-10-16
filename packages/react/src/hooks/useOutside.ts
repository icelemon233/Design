import { useEffect, type RefObject } from 'react';
import { useEscapeLayer } from './useEscapeLayer';
export function useOutside(ref: RefObject<HTMLElement>, open: boolean, close: () => void) {
  useEscapeLayer(open, ref, () => {
    close();
    ref.current?.querySelector<HTMLElement>('[aria-haspopup],textarea,input')?.focus();
  });
  useEffect(() => {
    if (!open) return;
    const pointer = (event: PointerEvent) => {
      if (!ref.current?.contains(event.target as Node)) close();
    };
    document.addEventListener('pointerdown', pointer, true);
    return () => document.removeEventListener('pointerdown', pointer, true);
  }, [ref, open, close]);
}
