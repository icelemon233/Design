import React, { useState } from 'react';
import { cx } from '../../utils/cx';
import type { SliderProps } from './types';
export type { SliderProps } from './types';

export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  (
    {
      showValue,
      marks,
      tooltip,
      className,
      value,
      defaultValue,
      onChange,
      min = 0,
      max = 100,
      ...rest
    },
    ref,
  ) => {
    const [inner, setInner] = useState(String(defaultValue ?? min));
    const current = String(value ?? inner);
    const currentNumber = Number(current);
    const minNumber = Number(min);
    const maxNumber = Number(max);
    const percent =
      maxNumber === minNumber
        ? 0
        : Math.max(0, Math.min(100, ((currentNumber - minNumber) / (maxNumber - minNumber)) * 100));

    return (
      <label
        className={cx('cinna-slider', className)}
        style={{ ['--cinna-slider-percent' as string]: `${percent}%` }}
      >
        <span className="cinna-slider__track">
          <input
            ref={ref}
            type="range"
            aria-label={rest['aria-label'] ?? 'Slider'}
            value={current}
            min={min}
            max={max}
            onChange={(event) => {
              setInner(event.currentTarget.value);
              onChange?.(event);
            }}
            {...rest}
          />
          {tooltip && <em className="cinna-slider__tooltip">{current}</em>}
        </span>
        {showValue && <span className="cinna-slider__value">{current}</span>}
        {marks && (
          <span className="cinna-slider__marks">
            {Object.entries(marks).map(([mark, label]) => (
              <small
                key={mark}
                style={{
                  left: `${maxNumber === minNumber ? 0 : Math.max(0, Math.min(100, ((Number(mark) - minNumber) / (maxNumber - minNumber)) * 100))}%`,
                }}
              >
                {label}
              </small>
            ))}
          </span>
        )}
      </label>
    );
  },
);

Slider.displayName = 'Slider';
