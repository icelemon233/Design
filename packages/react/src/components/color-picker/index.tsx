import React, { useState } from 'react';
import { useDisabled } from '../../internal/DisabledContext';
import { cx } from '../../utils/cx';
import type { ColorPickerProps } from './types';
export type { ColorPickerProps } from './types';

export const ColorPicker = React.forwardRef<HTMLInputElement, ColorPickerProps>(
  (
    {
      presets = [],
      showText,
      className,
      value,
      defaultValue = '#A8DFF1',
      disabled: disabledProp,
      readOnly,
      onChange,
      ...rest
    },
    ref,
  ) => {
    const disabled = useDisabled(disabledProp);
    const [inner, setInner] = useState(String(defaultValue));
    const current = String(value ?? inner);
    const update = (next: string) => {
      if (disabled || readOnly) return;
      setInner(next);
      onChange?.(next);
    };
    return (
      <span className={cx('cinna-color-picker', className)}>
        <input
          ref={ref}
          type="color"
          disabled={disabled || readOnly}
          aria-label={rest['aria-label'] ?? 'Choose color'}
          value={current}
          onChange={(event) => update(event.currentTarget.value)}
          {...rest}
        />
        {showText && <code>{current}</code>}
        {presets.length > 0 && (
          <span className="cinna-color-picker__presets">
            {presets.map((color) => (
              <button
                key={color}
                type="button"
                disabled={disabled || readOnly}
                aria-label={`Pick ${color}`}
                aria-pressed={current.toLowerCase() === color.toLowerCase()}
                style={{ background: color }}
                onClick={() => update(color)}
              />
            ))}
          </span>
        )}
      </span>
    );
  },
);

ColorPicker.displayName = 'ColorPicker';
