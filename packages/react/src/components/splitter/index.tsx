import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDisabled } from '../../internal/DisabledContext';
import { cx } from '../../utils/cx';
import { clampNumber } from '../shared';
import type {
  SplitterDragState,
  SplitterOrientation,
  SplitterPanelConfig,
  SplitterPanelProps,
  SplitterProps,
} from './types';
export type {
  SplitterDividerOptions,
  SplitterOrientation,
  SplitterPanelProps,
  SplitterProps,
} from './types';

const getSplitterPreviewPosition = (sizes: number[], index: number, dividerSize: number) =>
  sizes.slice(0, index + 1).reduce((sum, size) => sum + size, 0) +
  index * dividerSize +
  dividerSize / 2;

export const SplitterPanel = React.forwardRef<HTMLDivElement, SplitterPanelProps>(
  ({ className, ...rest }, ref) => (
    <div ref={ref} className={cx('cinna-splitter__panel', className)} {...rest} />
  ),
);

SplitterPanel.displayName = 'SplitterPanel';

const isSplitterPanelElement = (
  child: React.ReactNode,
): child is React.ReactElement<SplitterPanelProps> =>
  React.isValidElement(child) && child.type === SplitterPanel;

const normalizeSplitterSize = (
  value: number | string | undefined,
  total: number,
): number | undefined => {
  if (value === undefined) return undefined;
  if (typeof value === 'number') return value;
  const trimmed = value.trim();
  if (trimmed.endsWith('%')) return total * (Number.parseFloat(trimmed) / 100);
  const parsed = Number.parseFloat(trimmed);
  return Number.isFinite(parsed) ? parsed : undefined;
};

const getSplitterPanelMin = (panel: SplitterPanelConfig, total: number) =>
  normalizeSplitterSize(panel.min, total) ?? 48;

const getSplitterPanelMax = (panel: SplitterPanelConfig, total: number) =>
  normalizeSplitterSize(panel.max, total) ?? Number.POSITIVE_INFINITY;

const balanceSplitterSizes = (sizes: number[], panels: SplitterPanelConfig[], total: number) => {
  if (!panels.length) return [];
  const available = Math.max(total, panels.length * 24);
  const minSizes = panels.map((panel) => getSplitterPanelMin(panel, available));
  const maxSizes = panels.map((panel, index) =>
    Math.max(minSizes[index], getSplitterPanelMax(panel, available)),
  );
  const nextSizes = panels.map((_, index) =>
    clampNumber(sizes[index] ?? available / panels.length, minSizes[index], maxSizes[index]),
  );

  let guard = 0;
  while (
    Math.abs(nextSizes.reduce((sum, size) => sum + size, 0) - available) > 0.5 &&
    guard < panels.length * 4
  ) {
    guard += 1;
    const current = nextSizes.reduce((sum, size) => sum + size, 0);
    const diff = available - current;
    const grow = diff > 0;
    const adjustable = nextSizes
      .map((size, index) => ({
        size,
        index,
        room: grow ? maxSizes[index] - size : size - minSizes[index],
      }))
      .filter((item) => item.room > 0.5);
    if (!adjustable.length) break;
    const share = Math.abs(diff) / adjustable.length;
    adjustable.forEach(({ index, room }) => {
      const delta = Math.min(share, room);
      nextSizes[index] += grow ? delta : -delta;
    });
  }

  return nextSizes;
};

const formatSplitterCssSize = (value: number | string | undefined, fallback: number) => {
  if (value === undefined) return `${fallback}px`;
  return typeof value === 'number' ? `${value}px` : value;
};

const getSplitterPoint = (event: PointerEvent, orientation: SplitterOrientation) =>
  orientation === 'horizontal' ? event.clientX : event.clientY;

const getSplitterDragRange = (
  panels: SplitterPanelConfig[],
  sizes: number[],
  index: number,
  total: number,
) => {
  const beforeSize = sizes[index] ?? 0;
  const afterSize = sizes[index + 1] ?? 0;
  const beforeMin = getSplitterPanelMin(panels[index], total);
  const beforeMax = getSplitterPanelMax(panels[index], total);
  const afterMin = getSplitterPanelMin(panels[index + 1], total);
  const afterMax = getSplitterPanelMax(panels[index + 1], total);

  return {
    minDelta: Math.max(beforeMin - beforeSize, afterSize - afterMax),
    maxDelta: Math.min(beforeMax - beforeSize, afterSize - afterMin),
  };
};

const SplitterBase = React.forwardRef<HTMLDivElement, SplitterProps>(
  (
    {
      children,
      first,
      second,
      orientation,
      vertical,
      defaultSize = 48,
      min = 24,
      max = 76,
      disabled: disabledProp,
      lazy,
      divider,
      resetOnDoubleClick = true,
      onResizeStart,
      onResize,
      onResizeEnd,
      onDraggerDoubleClick,
      className,
      style,
      ...rest
    },
    ref,
  ) => {
    const disabled = useDisabled(disabledProp);
    const rootRef = useRef<HTMLDivElement | null>(null);
    const dragStateRef = useRef<SplitterDragState | null>(null);
    const draftSizesRef = useRef<number[] | null>(null);
    const [sizes, setSizes] = useState<number[]>([]);
    const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
    const [previewPosition, setPreviewPosition] = useState<number | null>(null);
    const resolvedOrientation: SplitterOrientation =
      orientation ?? (vertical ? 'vertical' : 'horizontal');
    const dividerSize = normalizeSplitterSize(divider?.size, 0) ?? 14;
    const dividerCssSize = formatSplitterCssSize(divider?.size, 14);
    const dividerLineThickness = formatSplitterCssSize(divider?.thickness, 1.5);

    const panels = useMemo<SplitterPanelConfig[]>(() => {
      const childList = React.Children.toArray(children).filter(Boolean);
      if (childList.length) {
        return childList.map((child, index) => {
          if (isSplitterPanelElement(child)) {
            const {
              children: panelChildren,
              className: panelClassName,
              style: panelStyle,
              defaultSize: panelDefaultSize,
              size,
              min: panelMin,
              max: panelMax,
              resizable = true,
            } = child.props;
            return {
              key: child.key ?? index,
              children: panelChildren,
              className: panelClassName,
              style: panelStyle,
              defaultSize: panelDefaultSize,
              size,
              min: panelMin,
              max: panelMax,
              resizable,
            };
          }

          return { key: index, children: child, resizable: true };
        });
      }

      return [
        {
          key: 'first',
          children: first,
          defaultSize: `${defaultSize}%`,
          min: `${min}%`,
          max: `${max}%`,
          resizable: true,
        },
        { key: 'second', children: second, resizable: true },
      ].filter((panel) => panel.children !== undefined);
    }, [children, defaultSize, first, max, min, second]);

    const getPanelSpace = () => {
      const rect = rootRef.current?.getBoundingClientRect();
      const rawSize = resolvedOrientation === 'horizontal' ? rect?.width : rect?.height;
      return Math.max(
        (rawSize || 640) - Math.max(0, panels.length - 1) * dividerSize,
        panels.length * 48,
      );
    };

    const buildInitialSizes = (total: number) => {
      const resolved = panels.map((panel) =>
        normalizeSplitterSize(panel.size ?? panel.defaultSize, total),
      );
      const fixedTotal = resolved.reduce<number>((sum, size) => sum + (size ?? 0), 0);
      const missingCount = resolved.filter((size) => size === undefined).length;
      const remaining = Math.max(0, total - fixedTotal);
      const fallback = missingCount ? remaining / missingCount : total / panels.length;

      return balanceSplitterSizes(
        resolved.map((size) => size ?? fallback),
        panels,
        total,
      );
    };

    const setRootRef = (node: HTMLDivElement | null) => {
      rootRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) ref.current = node;
    };

    useEffect(() => {
      if (!panels.length) return;
      const total = getPanelSpace();
      setSizes((current) => {
        const controlled = panels.some((panel) => panel.size !== undefined);
        if (!current.length || current.length !== panels.length || controlled)
          return buildInitialSizes(total);
        return balanceSplitterSizes(current, panels, total);
      });
    }, [panels, resolvedOrientation, dividerSize]);

    useEffect(() => {
      const node = rootRef.current;
      if (!node || typeof ResizeObserver === 'undefined') return;

      const observer = new ResizeObserver(() => {
        const total = getPanelSpace();
        setSizes((current) =>
          current.length ? balanceSplitterSizes(current, panels, total) : buildInitialSizes(total),
        );
      });
      observer.observe(node);

      return () => observer.disconnect();
    }, [panels, resolvedOrientation, dividerSize]);

    useEffect(() => {
      if (draggingIndex === null) return;

      const handlePointerMove = (event: PointerEvent) => {
        const dragState = dragStateRef.current;
        if (!dragState) return;
        event.preventDefault();

        const total = getPanelSpace();
        const rawDelta = getSplitterPoint(event, resolvedOrientation) - dragState.startPoint;
        const { minDelta, maxDelta } = getSplitterDragRange(
          panels,
          dragState.startSizes,
          dragState.index,
          total,
        );
        const delta = clampNumber(rawDelta, minDelta, maxDelta);
        const nextSizes = [...dragState.startSizes];
        nextSizes[dragState.index] += delta;
        nextSizes[dragState.index + 1] -= delta;
        draftSizesRef.current = nextSizes;

        if (lazy) {
          setPreviewPosition(getSplitterPreviewPosition(nextSizes, dragState.index, dividerSize));
        } else {
          setSizes(nextSizes);
          onResize?.(nextSizes);
        }
      };

      const handlePointerUp = () => {
        const nextSizes = draftSizesRef.current;
        if (nextSizes) {
          setSizes(nextSizes);
          onResizeEnd?.(nextSizes);
          if (lazy) onResize?.(nextSizes);
        }
        dragStateRef.current = null;
        draftSizesRef.current = null;
        setDraggingIndex(null);
        setPreviewPosition(null);
      };

      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp, { once: true });

      return () => {
        window.removeEventListener('pointermove', handlePointerMove);
        window.removeEventListener('pointerup', handlePointerUp);
      };
    }, [draggingIndex, lazy, onResize, onResizeEnd, panels, resolvedOrientation]);

    const activeSizes = sizes.length === panels.length ? sizes : buildInitialSizes(getPanelSpace());

    const startDrag = (event: React.PointerEvent<HTMLButtonElement>, index: number) => {
      if (disabled || !panels[index]?.resizable || !panels[index + 1]?.resizable) return;
      event.preventDefault();
      const total = getPanelSpace();
      const balancedSizes = balanceSplitterSizes(activeSizes, panels, total);
      dragStateRef.current = {
        index,
        startPoint: resolvedOrientation === 'horizontal' ? event.clientX : event.clientY,
        startSizes: balancedSizes,
      };
      draftSizesRef.current = balancedSizes;
      setDraggingIndex(index);
      if (lazy) setPreviewPosition(getSplitterPreviewPosition(balancedSizes, index, dividerSize));
      onResizeStart?.(balancedSizes);
      event.currentTarget.setPointerCapture?.(event.pointerId);
    };

    const resetPanels = (index: number) => {
      if (!resetOnDoubleClick || disabled) return;
      const total = getPanelSpace();
      const resetSizes = buildInitialSizes(total);
      setSizes(resetSizes);
      onDraggerDoubleClick?.(index);
      onResize?.(resetSizes);
      onResizeEnd?.(resetSizes);
    };

    return (
      <div
        ref={setRootRef}
        className={cx(
          'cinna-splitter',
          `cinna-splitter--${resolvedOrientation}`,
          disabled && 'cinna-splitter--disabled',
          lazy && 'cinna-splitter--lazy',
          className,
        )}
        style={
          {
            '--cinna-splitter-dragger-size': dividerCssSize,
            '--cinna-splitter-divider-color': divider?.color,
            '--cinna-splitter-line-thickness': dividerLineThickness,
            ...style,
          } as React.CSSProperties
        }
        {...rest}
      >
        {panels.map((panel, index) => {
          const draggerDisabled = Boolean(
            disabled || !panel.resizable || !panels[index + 1]?.resizable,
          );
          const panelStyle = {
            '--cinna-splitter-panel-size': `${activeSizes[index] ?? 0}px`,
            ...panel.style,
          } as React.CSSProperties;

          return (
            <React.Fragment key={panel.key}>
              <div className={cx('cinna-splitter__panel', panel.className)} style={panelStyle}>
                {panel.children}
              </div>
              {index < panels.length - 1 && (
                <button
                  type="button"
                  className={cx(
                    'cinna-splitter__dragger',
                    divider?.dashed !== false && 'cinna-splitter__dragger--dashed',
                    draggingIndex === index && 'cinna-splitter__dragger--active',
                    draggerDisabled && 'cinna-splitter__dragger--disabled',
                    divider?.className,
                  )}
                  style={divider?.style}
                  role="separator"
                  aria-label="Resize panels"
                  aria-orientation={
                    resolvedOrientation === 'horizontal' ? 'vertical' : 'horizontal'
                  }
                  aria-disabled={draggerDisabled || undefined}
                  onPointerDown={(event) => startDrag(event, index)}
                  onDoubleClick={() => resetPanels(index)}
                >
                  <span aria-hidden="true" />
                </button>
              )}
            </React.Fragment>
          );
        })}
        {lazy && draggingIndex !== null && previewPosition !== null && (
          <span
            className="cinna-splitter__preview"
            style={
              { '--cinna-splitter-preview-position': `${previewPosition}px` } as React.CSSProperties
            }
            aria-hidden="true"
          />
        )}
      </div>
    );
  },
);

SplitterBase.displayName = 'Splitter';

export const Splitter = Object.assign(SplitterBase, { Panel: SplitterPanel });
