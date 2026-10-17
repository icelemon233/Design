import { useEffect, useRef, useState } from 'react';
import type React from 'react';
import { useIsomorphicLayoutEffect as useLayoutEffect } from '../../hooks/useIsomorphicLayoutEffect';
import type { TabsProps } from './types';

type Options = Pick<
  TabsProps,
  'items' | 'variant' | 'size' | 'tabPosition' | 'closable' | 'addable'
> & { selected?: string };

export function useTabsLayout({
  items,
  selected,
  variant,
  size,
  tabPosition,
  closable,
  addable,
}: Options) {
  const navRef = useRef<HTMLDivElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const addRef = useRef<HTMLButtonElement | null>(null);
  const buttons = useRef(new Map<string, HTMLButtonElement>());
  const wrappers = useRef(new Map<string, HTMLDivElement>());
  const [pill, setPill] = useState<React.CSSProperties>({});
  const [closePositions, setClosePositions] = useState<Record<string, React.CSSProperties>>(() =>
    Object.create(null),
  );
  const [scrollState, setScrollState] = useState({
    overflow: false,
    backward: false,
    forward: false,
  });
  const vertical = tabPosition === 'left' || tabPosition === 'right';
  const updateScroll = () => {
    const list = listRef.current,
      viewport = viewportRef.current,
      nav = navRef.current;
    if (!list || !viewport || !nav) return;
    const total = vertical ? viewport.scrollHeight : list.scrollWidth;
    const visible = vertical ? viewport.clientHeight : viewport.clientWidth;
    const offset = vertical ? viewport.scrollTop : viewport.scrollLeft;
    const available = vertical
      ? visible
      : nav.clientWidth - (addable ? (addRef.current?.offsetWidth ?? 0) + 8 : 0);
    const next = {
      overflow: total > available + 1,
      backward: offset > 1,
      forward: offset + visible < total - 1,
    };
    setScrollState((current) =>
      current.overflow === next.overflow &&
      current.backward === next.backward &&
      current.forward === next.forward
        ? current
        : next,
    );
  };
  const reveal = (key: string) => {
    const item = wrappers.current.get(key),
      viewport = viewportRef.current;
    if (!item || !viewport) return;
    const start = vertical ? item.offsetTop : item.offsetLeft;
    const length = vertical ? item.offsetHeight : item.offsetWidth;
    const visible = vertical ? viewport.clientHeight : viewport.clientWidth;
    const offset = vertical ? viewport.scrollTop : viewport.scrollLeft;
    const next =
      start < offset
        ? start
        : start + length > offset + visible
          ? start + length - visible
          : offset;
    if (vertical) viewport.scrollTop = next;
    else viewport.scrollLeft = next;
  };
  const scrollTabs = (forward: boolean) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const distance =
      (vertical ? viewport.clientHeight : viewport.clientWidth) * 0.75 * (forward ? 1 : -1);
    viewport.scrollBy({
      [vertical ? 'top' : 'left']: distance,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    });
  };

  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const update = () => {
      const item = selected ? wrappers.current.get(selected) : null;
      setPill(
        variant === 'borderless' && item
          ? {
              width: item.offsetWidth,
              height: item.offsetHeight,
              transform: 'translate(' + item.offsetLeft + 'px, ' + item.offsetTop + 'px)',
              opacity: 1,
            }
          : {},
      );
      const positions: Record<string, React.CSSProperties> = Object.create(null);
      for (const entry of items) {
        const wrapper = wrappers.current.get(entry.key);
        if (wrapper && (entry.closable ?? closable))
          positions[entry.key] = {
            left: wrapper.offsetLeft + wrapper.offsetWidth,
            top: wrapper.offsetTop + wrapper.offsetHeight / 2,
          };
      }
      setClosePositions(positions);
      updateScroll();
    };
    update();
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(update);
    observer?.observe(list);
    if (viewportRef.current) observer?.observe(viewportRef.current);
    for (const item of wrappers.current.values()) observer?.observe(item);
    window.addEventListener('resize', update);
    return () => {
      observer?.disconnect();
      window.removeEventListener('resize', update);
    };
  }, [items, selected, variant, size, tabPosition, closable, addable]);

  useEffect(() => {
    if (selected) reveal(selected);
  }, [selected, tabPosition, items]);
  return {
    navRef,
    viewportRef,
    listRef,
    addRef,
    buttons,
    wrappers,
    pill,
    closePositions,
    scrollState,
    updateScroll,
    scrollTabs,
    reveal,
  };
}
