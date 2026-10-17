import React, { useState, type RefObject } from 'react';
import { useIsomorphicLayoutEffect as useLayoutEffect } from './useIsomorphicLayoutEffect';

const textOf = (node: React.ReactNode): string => {
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(textOf).join('');
  if (React.isValidElement<{ children?: React.ReactNode }>(node))
    return textOf(node.props.children);
  return '';
};

export function useResponsiveTagCount(
  ref: RefObject<HTMLElement>,
  labels: React.ReactNode[],
  enabled: boolean,
) {
  const [count, setCount] = useState(1);
  const signature = labels.map(textOf).join('\0');
  useLayoutEffect(() => {
    const root = ref.current;
    if (!enabled || !root) return;
    let alive = true;
    const update = () => {
      if (!alive) return;
      const width = root.getBoundingClientRect().width;
      if (!width) return;
      const measure = document.createElement('span');
      measure.style.cssText =
        'position:fixed;visibility:hidden;white-space:nowrap;pointer-events:none;';
      measure.style.font = getComputedStyle(root).font;
      document.body.appendChild(measure);
      let used = 70,
        visible = 0;
      for (const label of signature.split('\0')) {
        measure.textContent = label;
        const next = measure.getBoundingClientRect().width + 40;
        if (visible && used + next > width) break;
        used += next;
        visible++;
      }
      measure.remove();
      setCount(Math.max(1, visible));
    };
    update();
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(update);
    observer?.observe(root);
    window.addEventListener('resize', update);
    document.fonts?.ready.then(update);
    return () => {
      alive = false;
      observer?.disconnect();
      window.removeEventListener('resize', update);
    };
  }, [ref, signature, enabled]);
  return count;
}
