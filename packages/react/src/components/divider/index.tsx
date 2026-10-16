import React from 'react';
import { cx } from '../../utils/cx';
import type { DividerProps } from './types';
export type { DividerProps } from './types';

const normalizeDividerCssValue = (value: boolean | number | string | undefined) => {
  if (typeof value === 'number') return `${value}px`;
  if (typeof value === 'string') return value;
  return undefined;
};

const getDividerOrientation = (
  orientation: DividerProps['orientation'],
  left: DividerProps['left'],
  right: DividerProps['right'],
) => {
  if (right !== undefined && right !== false) return 'right';
  if (left !== undefined && left !== false) return 'left';
  return orientation ?? 'center';
};

const getDividerCharacterRepeat = (character: string | undefined) => {
  if (!character) return undefined;
  return Array.from({ length: 36 }, () => character).join('');
};

export const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  (
    {
      orientation,
      vertical,
      dashed = true,
      plain,
      color,
      character,
      left,
      right,
      className,
      children,
      style,
      ...rest
    },
    ref,
  ) => {
    const resolvedOrientation = getDividerOrientation(orientation, left, right);
    const dividerStyle = {
      ...(color ? { '--cinna-divider-color': color } : null),
      ...(left !== undefined && left !== false
        ? { '--cinna-divider-left': normalizeDividerCssValue(left) }
        : null),
      ...(right !== undefined && right !== false
        ? { '--cinna-divider-right': normalizeDividerCssValue(right) }
        : null),
      ...style,
    } as React.CSSProperties;
    const characterRepeat = getDividerCharacterRepeat(character);

    return (
      <div
        ref={ref}
        role="separator"
        className={cx(
          'cinna-divider',
          vertical ? 'cinna-divider--vertical' : 'cinna-divider--horizontal',
          `cinna-divider--${resolvedOrientation}`,
          dashed && 'cinna-divider--dashed',
          plain && 'cinna-divider--plain',
          character && 'cinna-divider--character',
          left !== undefined && left !== false && left !== true && 'cinna-divider--custom-left',
          right !== undefined && right !== false && right !== true && 'cinna-divider--custom-right',
          className,
        )}
        data-divider-character={characterRepeat}
        style={dividerStyle}
        {...rest}
      >
        {children && <span>{children}</span>}
      </div>
    );
  },
);

Divider.displayName = 'Divider';
