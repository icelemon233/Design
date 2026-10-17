import { useEffect, useRef, useState } from 'react';
import type React from 'react';
import { useIsomorphicLayoutEffect as useLayoutEffect } from '../../hooks/useIsomorphicLayoutEffect';
import type { TabsItem, TabsProps } from './types';

interface Options {
  items: TabsItem[];
  enabled: boolean;
  vertical: boolean;
  onOrderChange: TabsProps['onOrderChange'];
  wrappers: React.MutableRefObject<Map<string, HTMLDivElement>>;
  buttons: React.MutableRefObject<Map<string, HTMLButtonElement>>;
  viewportRef: React.MutableRefObject<HTMLDivElement | null>;
  reveal: (key: string) => void;
}
interface PointerDrag {
  key: string;
  target: string;
  pointer: number;
  x: number;
  y: number;
}

export function useTabReorder(options: Options) {
  const latest = useRef(options);
  const origin = useRef<string | null>(null);
  const pointer = useRef<PointerDrag | null>(null);
  const frame = useRef(0);
  const clickTimer = useRef(0);
  const ignoreClick = useRef(false);
  const [state, setState] = useState<{ key: string; target: string } | null>(null);
  useLayoutEffect(() => {
    latest.current = options;
  });

  const finish = () => {
    origin.current = null;
    pointer.current = null;
    window.cancelAnimationFrame(frame.current);
    setState(null);
    window.clearTimeout(clickTimer.current);
    clickTimer.current = window.setTimeout(() => {
      ignoreClick.current = false;
    }, 0);
  };
  useEffect(() => {
    if (!options.enabled) finish();
  }, [options.enabled]);
  useLayoutEffect(
    () => () => {
      window.cancelAnimationFrame(frame.current);
      window.clearTimeout(clickTimer.current);
      pointer.current = null;
      origin.current = null;
    },
    [],
  );

  const reorder = (from: string, to: string) => {
    const current = latest.current;
    if (!current.enabled || from === to) return;
    const fromIndex = current.items.findIndex((item) => item.key === from && !item.disabled);
    const toIndex = current.items.findIndex((item) => item.key === to && !item.disabled);
    if (fromIndex < 0 || toIndex < 0) return;
    const focused = current.buttons.current.get(from);
    const restore = focused === document.activeElement;
    const next = [...current.items],
      [moving] = next.splice(fromIndex, 1);
    next.splice(toIndex, 0, moving);
    current.onOrderChange?.(
      next.map((item) => item.key),
      next,
      { fromKey: from, toKey: to },
    );
    if (restore)
      window.requestAnimationFrame(() => {
        if (document.activeElement === document.body || document.activeElement === focused) {
          latest.current.buttons.current.get(from)?.focus({ preventScroll: true });
          latest.current.reveal(from);
        }
      });
  };
  const pointerFrame = () => {
    const drag = pointer.current,
      current = latest.current,
      viewport = current.viewportRef.current;
    if (!drag || !viewport || !current.enabled || !current.wrappers.current.has(drag.key)) {
      finish();
      return;
    }
    const bounds = viewport.getBoundingClientRect();
    const position = current.vertical ? drag.y : drag.x;
    const start = current.vertical ? bounds.top : bounds.left;
    const end = current.vertical ? bounds.bottom : bounds.right;
    const cross = current.vertical ? drag.x : drag.y;
    const nearStrip =
      cross >= (current.vertical ? bounds.left : bounds.top) - 24 &&
      cross <= (current.vertical ? bounds.right : bounds.bottom) + 24;
    if (nearStrip) {
      const delta =
        position < start + 24
          ? -Math.min(20, Math.ceil((start + 24 - position) / 2))
          : position > end - 24
            ? Math.min(20, Math.ceil((position - end + 24) / 2))
            : 0;
      if (current.vertical) viewport.scrollTop += delta;
      else viewport.scrollLeft += delta;
    }
    let nearest = drag.target,
      distance = Infinity;
    for (const item of current.items) {
      if (item.disabled) continue;
      const rect = current.wrappers.current.get(item.key)?.getBoundingClientRect();
      if (!rect) continue;
      const next = Math.abs(
        (current.vertical ? rect.top + rect.height / 2 : rect.left + rect.width / 2) - position,
      );
      if (next < distance) {
        distance = next;
        nearest = item.key;
      }
    }
    drag.target = nearest;
    setState((previous) =>
      previous?.key === drag.key && previous.target === nearest
        ? previous
        : { key: drag.key, target: nearest },
    );
    frame.current = window.requestAnimationFrame(pointerFrame);
  };

  const itemHandlers = (key: string): React.HTMLAttributes<HTMLDivElement> => ({
    draggable: options.enabled && !options.items.find((item) => item.key === key)?.disabled,
    onDragStart: (event) => {
      if (
        !latest.current.enabled ||
        latest.current.items.find((item) => item.key === key)?.disabled
      )
        return;
      origin.current = key;
      ignoreClick.current = true;
      setState({ key, target: key });
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('text/plain', key);
    },
    onDragOver: (event) => {
      if (
        !origin.current ||
        !latest.current.enabled ||
        latest.current.items.find((item) => item.key === key)?.disabled
      )
        return;
      event.preventDefault();
      setState({ key: origin.current, target: key });
    },
    onDrop: (event) => {
      event.preventDefault();
      if (origin.current) reorder(origin.current, key);
      finish();
    },
    onDragEnd: finish,
  });
  const gripHandlers = (key: string): React.HTMLAttributes<HTMLSpanElement> => ({
    onPointerDown: (event) => {
      if (
        event.button !== 0 ||
        !latest.current.enabled ||
        latest.current.items.find((item) => item.key === key)?.disabled
      )
        return;
      event.preventDefault();
      event.stopPropagation();
      pointer.current = {
        key,
        target: key,
        pointer: event.pointerId,
        x: event.clientX,
        y: event.clientY,
      };
      ignoreClick.current = true;
      setState({ key, target: key });
      event.currentTarget.setPointerCapture(event.pointerId);
      latest.current.buttons.current.get(key)?.focus({ preventScroll: true });
      frame.current = window.requestAnimationFrame(pointerFrame);
    },
    onPointerMove: (event) => {
      if (!pointer.current || pointer.current.pointer !== event.pointerId) return;
      event.preventDefault();
      pointer.current.x = event.clientX;
      pointer.current.y = event.clientY;
    },
    onPointerUp: (event) => {
      const drag = pointer.current;
      if (!drag || drag.pointer !== event.pointerId) return;
      event.preventDefault();
      event.stopPropagation();
      const bounds = latest.current.viewportRef.current?.getBoundingClientRect();
      if (
        bounds &&
        event.clientX >= bounds.left - 24 &&
        event.clientX <= bounds.right + 24 &&
        event.clientY >= bounds.top - 24 &&
        event.clientY <= bounds.bottom + 24
      )
        reorder(drag.key, drag.target);
      finish();
    },
    onPointerCancel: finish,
    onLostPointerCapture: () => {
      if (pointer.current) finish();
    },
  });
  return {
    dragKey: state?.key,
    dragOver: state?.target,
    reorder,
    itemHandlers,
    gripHandlers,
    consumeClick: () => {
      const ignored = ignoreClick.current;
      ignoreClick.current = false;
      return ignored;
    },
  };
}
