import { FloatingPanel } from '../../internal/FloatingPanel';
import React, { useEffect, useRef, useState } from 'react';
import { useOutside } from '../../hooks/useOutside';
import { useDisabled } from '../../internal/DisabledContext';
import { inputChange } from '../../internal/inputChange';
import { cx } from '../../utils/cx';
import { Icon } from '../icon';
import type { TimePickerProps } from './types';
export type { TimePickerProps } from './types';

export const TimePicker = React.forwardRef<HTMLInputElement, TimePickerProps>(
  (
    {
      controlSize = 'medium',
      status,
      allowClear,
      hourStep = 1,
      minuteStep = 1,
      use12Hours,
      disabledHours,
      disabledMinutes,
      className,
      value,
      defaultValue,
      onChange,
      disabled: disabledProp,
      readOnly,
      min,
      max,
      ...rest
    },
    ref,
  ) => {
    const disabled = useDisabled(disabledProp);
    const [inner, setInner] = useState(String(defaultValue ?? '')),
      [open, setOpen] = useState(false);
    const current = String(value ?? inner);
    const [hour, minute] = current.split(':').map(Number);
    const root = useRef<HTMLSpanElement>(null),
      input = useRef<HTMLInputElement | null>(null);
    useOutside(root, open, () => setOpen(false));
    useEffect(() => {
      if (open) {
        root.current
          ?.querySelectorAll<HTMLElement>('.cinna-time-panel [aria-selected="true"]')
          .forEach((option) => option.scrollIntoView?.({ block: 'nearest', inline: 'nearest' }));
      }
    }, [open, current]);
    const pad = (number: number) => String(number).padStart(2, '0');
    const blocked = (nextHour: number, nextMinute: number) =>
      disabledHours?.().includes(nextHour) ||
      disabledMinutes?.(nextHour).includes(nextMinute) ||
      (min !== undefined && pad(nextHour) + ':' + pad(nextMinute) < String(min)) ||
      (max !== undefined && pad(nextHour) + ':' + pad(nextMinute) > String(max));
    const commit = (nextHour: number, nextMinute: number) => {
      if (disabled || readOnly || blocked(nextHour, nextMinute)) return;
      const next = pad(nextHour) + ':' + pad(nextMinute);
      if (value === undefined) setInner(next);
      if (input.current) onChange?.(inputChange(input.current, next));
    };
    const clear = () => {
      if (value === undefined) setInner('');
      if (input.current) onChange?.(inputChange(input.current, ''));
    };
    const hours = Array.from({ length: 24 }, (_, i) => i).filter(
        (i) => i % Math.max(1, hourStep) === 0,
      ),
      minutes = Array.from({ length: 60 }, (_, i) => i).filter(
        (i) => i % Math.max(1, minuteStep) === 0,
      );
    return (
      <span ref={root} className="cinna-picker">
        <input
          {...rest}
          ref={(node) => {
            input.current = node;
            if (typeof ref === 'function') ref(node);
            else if (ref) ref.current = node;
          }}
          type="time"
          disabled={disabled}
          readOnly={readOnly}
          min={min}
          max={max}
          value={current}
          aria-label={rest['aria-label'] ?? 'Choose time'}
          className={cx(
            'cinna-native-input',
            'cinna-native-input--' + controlSize,
            status && 'cinna-native-input--' + status,
            className,
          )}
          onChange={(event) => {
            const [h, m] = event.target.value.split(':').map(Number);
            if (event.target.value && blocked(h, m)) return;
            if (value === undefined) setInner(event.target.value);
            onChange?.(event);
          }}
        />
        <button
          type="button"
          className="cinna-picker__trigger"
          aria-label="Open time panel"
          aria-haspopup="dialog"
          aria-expanded={open && !disabled && !readOnly}
          disabled={disabled || readOnly}
          onClick={() => setOpen(!open)}
        >
          <Icon name="chevron-down" size={12} />
        </button>
        {allowClear && current && (
          <button
            className="cinna-picker__clear"
            type="button"
            aria-label="Clear time"
            disabled={disabled || readOnly}
            onClick={clear}
          >
            ×
          </button>
        )}
        {open && !disabled && !readOnly && (
          <FloatingPanel anchor={root}>
            <div className="cinna-picker__popup" role="dialog" aria-label="Time selection">
              <div className="cinna-time-panel">
                <div role="listbox" aria-label="Hours">
                  {hours.map((h) => (
                    <button
                      type="button"
                      key={h}
                      role="option"
                      aria-selected={h === hour}
                      disabled={disabledHours?.().includes(h)}
                      onClick={() => commit(h, Number.isFinite(minute) ? minute : 0)}
                    >
                      {use12Hours ? pad(h % 12 || 12) + (h < 12 ? ' AM' : ' PM') : pad(h)}
                    </button>
                  ))}
                </div>
                <div role="listbox" aria-label="Minutes">
                  {minutes.map((m) => (
                    <button
                      type="button"
                      key={m}
                      role="option"
                      aria-selected={m === minute}
                      disabled={blocked(Number.isFinite(hour) ? hour : 0, m)}
                      onClick={() => commit(Number.isFinite(hour) ? hour : 0, m)}
                    >
                      {pad(m)}
                    </button>
                  ))}
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  input.current?.focus();
                }}
              >
                Done
              </button>
            </div>
          </FloatingPanel>
        )}
      </span>
    );
  },
);

TimePicker.displayName = 'TimePicker';
