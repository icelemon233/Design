import React, { useEffect, useRef, useState } from 'react';
import { useIsomorphicLayoutEffect } from '../hooks/useIsomorphicLayoutEffect';

interface FloatingPanelProps {
  anchor: React.RefObject<HTMLElement>;
  children: React.ReactElement;
  placement?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
  matchWidth?: boolean;
}

/** Fixed positioning escapes ordinary overflow containers and follows the viewport. */
export function FloatingPanel({
  anchor,
  children,
  placement = 'bottomLeft',
  matchWidth,
}: FloatingPanelProps) {
  const panel = useRef<HTMLElement | null>(null);
  const updateRef = useRef<(() => void) | null>(null);
  const [position, setPosition] = useState<React.CSSProperties>({ visibility: 'hidden' });
  useIsomorphicLayoutEffect(() => {
    let frame = 0;
    const update = () => {
      if (!anchor.current || !panel.current) return;
      const trigger = anchor.current.getBoundingClientRect();
      const bounds = panel.current.getBoundingClientRect();
      const margin = 12;
      const gap = 8;
      const availableWidth = Math.max(0, innerWidth - margin * 2);
      const width = Math.min(matchWidth ? trigger.width : bounds.width, availableWidth);
      const naturalHeight = Math.max(panel.current.scrollHeight, bounds.height);
      const below = Math.max(0, innerHeight - trigger.bottom - gap - margin);
      const above = Math.max(0, trigger.top - gap - margin);
      let topSide = placement.startsWith('top');
      if (topSide && above < naturalHeight && below > above) topSide = false;
      if (!topSide && below < naturalHeight && above > below) topSide = true;
      const maxHeight = Math.min(innerHeight - margin * 2, topSide ? above : below);
      const height = Math.min(naturalHeight, maxHeight);
      const preferredLeft = placement.endsWith('Right') ? trigger.right - width : trigger.left;
      const next: React.CSSProperties = {
        position: 'fixed',
        visibility: 'visible',
        left: Math.max(margin, Math.min(preferredLeft, innerWidth - width - margin)),
        right: 'auto',
        top: Math.max(margin, topSide ? trigger.top - gap - height : trigger.bottom + gap),
        bottom: 'auto',
        transform: 'none',
        maxWidth: availableWidth,
        minWidth: 0,
        maxHeight: Math.max(0, maxHeight),
        overflow: 'auto',
        ...(matchWidth ? { width } : {}),
      };
      setPosition((previous) =>
        JSON.stringify(previous) === JSON.stringify(next) ? previous : next,
      );
    };
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    updateRef.current = update;
    update();
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(schedule);
    if (anchor.current) observer?.observe(anchor.current);
    if (panel.current) observer?.observe(panel.current);
    window.addEventListener('resize', schedule);
    window.addEventListener('scroll', schedule, true);
    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      window.removeEventListener('resize', schedule);
      window.removeEventListener('scroll', schedule, true);
    };
  }, [anchor, matchWidth, placement, children]);
  // A default-open panel's layout effect can precede its parent's anchor ref.
  useEffect(() => updateRef.current?.(), []);
  useEffect(() => {
    if (position.visibility === 'visible') {
      panel.current?.querySelector<HTMLElement>('[data-cinna-autofocus]')?.focus();
    }
  }, [position.visibility]);
  const child = children as React.ReactElement<React.HTMLAttributes<HTMLElement>>;
  const childRef = (children as React.ReactElement & { ref?: React.Ref<HTMLElement> }).ref;
  return React.cloneElement(child, {
    style: { ...child.props.style, ...position },
    ref: (node: HTMLElement | null) => {
      panel.current = node;
      if (typeof childRef === 'function') childRef(node);
      else if (childRef) (childRef as React.MutableRefObject<HTMLElement | null>).current = node;
    },
  } as React.HTMLAttributes<HTMLElement>);
}
