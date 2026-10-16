import { useEffect, useRef, type RefObject } from 'react';

type Layer = { id: symbol; root: RefObject<HTMLElement>; close: () => void };
const layers: Layer[] = [];
const handleEscape = (event: KeyboardEvent) => {
  if (event.key !== 'Escape' || event.defaultPrevented || !layers.length) return;
  event.preventDefault();
  event.stopImmediatePropagation();
  layers[layers.length - 1].close();
};

/** One Escape closes the innermost active layer, preserving its parent dialog. */
export function useEscapeLayer(open: boolean, root: RefObject<HTMLElement>, close: () => void) {
  const callback = useRef(close);
  callback.current = close;
  useEffect(() => {
    if (!open) return;
    const layer: Layer = { id: Symbol('layer'), root, close: () => callback.current() };
    const descendant = layers.findIndex(
      (other) => root.current?.contains(other.root.current) && root.current !== other.root.current,
    );
    if (descendant < 0) layers.push(layer);
    else layers.splice(descendant, 0, layer);
    if (layers.length === 1) document.addEventListener('keydown', handleEscape);
    return () => {
      const index = layers.findIndex((item) => item.id === layer.id);
      if (index >= 0) layers.splice(index, 1);
      if (!layers.length) document.removeEventListener('keydown', handleEscape);
    };
  }, [open, root]);
}
