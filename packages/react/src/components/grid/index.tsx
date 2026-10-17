import React from 'react';
import { cx } from '../../utils/cx';
import type { CinnaSize, GridGap } from '../shared';
import type { ColProps, GridProps, RowProps } from './types';
export type { ColProps, GridProps, RowProps } from './types';

const gridGapPresets: Record<CinnaSize, string> = {
  small: '8px',
  medium: '16px',
  large: '24px',
};

const normalizeGridCssValue = (value: number | string | undefined, fallback: string) => {
  if (value === undefined) return fallback;
  if (typeof value === 'number') return `${value}px`;
  return value;
};

const normalizeGridGapValue = (value: GridGap | undefined, fallback: string) => {
  if (value === undefined) return fallback;
  if (typeof value === 'number') return `${value}px`;
  return gridGapPresets[value as CinnaSize] ?? value;
};

const normalizeGridGapPair = (
  value: GridGap | [GridGap, GridGap] | undefined,
  fallback = '16px',
): [string, string] => {
  if (Array.isArray(value))
    return [normalizeGridGapValue(value[0], fallback), normalizeGridGapValue(value[1], fallback)];
  const gap = normalizeGridGapValue(value, fallback);
  return [gap, gap];
};

const normalizeRowGutter = (value: RowProps['gutter']): [string, string] => {
  if (Array.isArray(value))
    return [normalizeGridGapValue(value[0], '0px'), normalizeGridGapValue(value[1], '0px')];
  return [normalizeGridGapValue(value, '0px'), '0px'];
};

const normalizeGridTemplateColumns = (
  columns: GridProps['columns'],
  minColumnWidth: GridProps['minColumnWidth'],
) => {
  if (minColumnWidth !== undefined)
    return `repeat(auto-fit, minmax(${normalizeGridCssValue(minColumnWidth, '220px')}, 1fr))`;
  if (typeof columns === 'number')
    return `repeat(${Math.max(1, Math.floor(columns))}, minmax(0, 1fr))`;
  return columns ?? 'repeat(1, minmax(0, 1fr))';
};

export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ columns = 1, gap = 'medium', minColumnWidth, inline, className, style, ...rest }, ref) => {
    const [columnGap, rowGap] = normalizeGridGapPair(gap);

    return (
      <div
        ref={ref}
        className={cx('cinna-grid', inline && 'cinna-grid--inline', className)}
        style={
          {
            '--cinna-grid-template': normalizeGridTemplateColumns(columns, minColumnWidth),
            '--cinna-grid-gap-x': columnGap,
            '--cinna-grid-gap-y': rowGap,
            ...style,
          } as React.CSSProperties
        }
        {...rest}
      />
    );
  },
);

Grid.displayName = 'Grid';

export const Row = React.forwardRef<HTMLDivElement, RowProps>(
  ({ gutter = 0, align, justify, wrap = true, className, style, ...rest }, ref) => {
    const [horizontalGutter, verticalGutter] = normalizeRowGutter(gutter);

    return (
      <div
        ref={ref}
        className={cx('cinna-row', !wrap && 'cinna-row--nowrap', className)}
        style={
          {
            alignItems: align,
            justifyContent: justify,
            rowGap: verticalGutter,
            '--cinna-row-gutter-x': horizontalGutter,
            ...style,
          } as React.CSSProperties
        }
        {...rest}
      />
    );
  },
);

Row.displayName = 'Row';

export const Col = React.forwardRef<HTMLDivElement, ColProps>(
  ({ span = 24, offset = 0, order, flex, className, style, ...rest }, ref) => {
    const width = `${(span / 24) * 100}%`;
    const columnLayoutStyle =
      flex === undefined ? { flex: '0 0 auto', flexBasis: width, maxWidth: width } : { flex };

    return (
      <div
        ref={ref}
        className={cx('cinna-col', className)}
        style={{
          ...columnLayoutStyle,
          marginLeft: offset ? `${(offset / 24) * 100}%` : undefined,
          order,
          ...style,
        }}
        {...rest}
      />
    );
  },
);

Col.displayName = 'Col';
