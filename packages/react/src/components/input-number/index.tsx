import React, { useState } from 'react';
import { useDisabled } from '../../internal/DisabledContext';
import { cx } from '../../utils/cx';
import { clampNumber } from '../shared';
import type { InputNumberProps } from './types';
export type { InputNumberProps } from './types';

export const InputNumber = React.forwardRef<HTMLInputElement, InputNumberProps>(
  (
    {
      controlSize = 'medium',
      controls = true,
      className,
      value,
      defaultValue,
      min,
      max,
      step = 1,
      disabled: disabledProp,
      readOnly,
      precision,
      onChange,
      ...rest
    },
    ref,
  ) => {
    const disabled = useDisabled(disabledProp);
    const [inner, setInner] = useState<number | null>(
      defaultValue === undefined || defaultValue === null || defaultValue === ''
        ? null
        : Number(defaultValue),
    );
    const current =
      value === undefined ? inner : value === null || value === '' ? null : Number(value);
    const rawIncrement = step === 'any' ? 1 : Number(step);
    const increment = Number.isFinite(rawIncrement) && rawIncrement > 0 ? rawIncrement : 1;
    const fractionDigits = (number: number) => {
      const [coefficient, exponent = '0'] = String(number).toLowerCase().split('e');
      return Math.max(0, (coefficient.split('.')[1]?.length ?? 0) - Number(exponent));
    };
    const decimals =
      precision ?? Math.min(15, Math.max(fractionDigits(increment), fractionDigits(current ?? 0)));
    const update = (next: number | null, stepping = false) => {
      if (disabled || readOnly || (next !== null && !Number.isFinite(next))) return;
      const rounded =
        next === null
          ? null
          : !stepping && precision === undefined
            ? next
            : Number(next.toFixed(Math.max(0, Math.min(15, decimals))));
      const normalized =
        rounded === null
          ? null
          : clampNumber(
              rounded,
              min === undefined ? -Infinity : Number(min),
              max === undefined ? Infinity : Number(max),
            );
      setInner(normalized);
      onChange?.(normalized);
    };

    return (
      <span
        className={cx(
          'cinna-input-number',
          `cinna-input-number--${controlSize}`,
          disabled && 'cinna-input-number--disabled',
          className,
        )}
      >
        {controls && (
          <button
            type="button"
            disabled={
              disabled ||
              readOnly ||
              (min !== undefined && current !== null && current <= Number(min))
            }
            aria-label="Decrease value"
            onClick={() => update((current ?? 0) - increment, true)}
          >
            -
          </button>
        )}
        <input
          ref={ref}
          type="number"
          aria-label={rest['aria-label'] ?? 'Number'}
          value={current ?? ''}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          readOnly={readOnly}
          onChange={(event) =>
            update(event.currentTarget.value === '' ? null : Number(event.currentTarget.value))
          }
          {...rest}
        />
        {controls && (
          <button
            type="button"
            disabled={
              disabled ||
              readOnly ||
              (max !== undefined && current !== null && current >= Number(max))
            }
            aria-label="Increase value"
            onClick={() => update((current ?? 0) + increment, true)}
          >
            +
          </button>
        )}
      </span>
    );
  },
);

InputNumber.displayName = 'InputNumber';
