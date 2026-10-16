import React, { useState } from 'react';
import { useControllable } from '../../hooks/useControllable';
import { useDisabled } from '../../internal/DisabledContext';
import { cx } from '../../utils/cx';
import type { RateProps } from './types';
export type { RateProps } from './types';

export const Rate = React.forwardRef<HTMLDivElement, RateProps>(
  (
    {
      count = 5,
      value,
      defaultValue = 0,
      onChange,
      allowClear = true,
      allowHalf,
      tooltips,
      character = '★',
      disabled: disabledProp,
      className,
      ...rest
    },
    ref,
  ) => {
    const disabled = useDisabled(disabledProp);
    const [current, setCurrent] = useControllable(value, defaultValue, onChange);
    const [hover, setHover] = useState<number | null>(null);
    const safeCount = Math.max(0, Math.floor(count));
    const shown = hover ?? current;
    const choose = (next: number) => {
      if (!disabled) setCurrent(allowClear && current === next ? 0 : next);
    };
    const pointValue = (event: React.MouseEvent<HTMLSpanElement>, next: number) =>
      allowHalf &&
      event.clientX - event.currentTarget.getBoundingClientRect().left <
        event.currentTarget.offsetWidth / 2
        ? next - 0.5
        : next;
    return (
      <div
        {...rest}
        ref={ref}
        className={cx('cinna-rate', disabled && 'cinna-rate--disabled', className)}
        role="slider"
        aria-label={rest['aria-label'] ?? 'Rating'}
        aria-valuemin={0}
        aria-valuemax={safeCount}
        aria-valuenow={current}
        aria-disabled={disabled || undefined}
        aria-valuetext={tooltips?.[Math.ceil(current) - 1] ?? current + ' / ' + safeCount}
        tabIndex={disabled ? -1 : 0}
        onMouseDown={(event) => {
          if (!disabled) event.currentTarget.focus();
        }}
        onMouseLeave={() => setHover(null)}
        onKeyDown={(event) => {
          rest.onKeyDown?.(event);
          if (disabled || event.defaultPrevented) return;
          const delta = allowHalf ? 0.5 : 1;
          const next =
            event.key === 'Home'
              ? 0
              : event.key === 'End'
                ? safeCount
                : ['ArrowRight', 'ArrowUp'].includes(event.key)
                  ? Math.min(safeCount, current + delta)
                  : ['ArrowLeft', 'ArrowDown'].includes(event.key)
                    ? Math.max(0, current - delta)
                    : undefined;
          if (next !== undefined) {
            event.preventDefault();
            setCurrent(next);
          }
        }}
      >
        {Array.from({ length: safeCount }, (_, index) => {
          const next = index + 1;
          const filled = Math.max(0, Math.min(1, shown - index));
          const glyph = typeof character === 'function' ? character(next) : character;
          return (
            <span
              key={next}
              aria-hidden="true"
              title={tooltips?.[index]}
              className={cx(
                'cinna-rate__star',
                filled === 1 && 'cinna-rate__star--active',
                filled === 0.5 && 'cinna-rate__star--half',
              )}
              onMouseMove={(event) => !disabled && setHover(pointValue(event, next))}
              onClick={(event) => choose(pointValue(event, next))}
            >
              <span>{glyph}</span>
              {filled === 0.5 && (
                <span className="cinna-rate__half" aria-hidden="true">
                  {glyph}
                </span>
              )}
            </span>
          );
        })}
      </div>
    );
  },
);

Rate.displayName = 'Rate';
