import { FloatingPanel } from '../../internal/FloatingPanel';
import React, { useRef, useState } from 'react';
import { useOutside } from '../../hooks/useOutside';
import { useDisabled } from '../../internal/DisabledContext';
import { inputChange } from '../../internal/inputChange';
import { cx } from '../../utils/cx';
import { Calendar } from '../calendar';
import { Icon } from '../icon';
import type { DatePickerProps } from './types';
export type { DatePickerProps } from './types';

export const DatePicker = React.forwardRef<HTMLInputElement, DatePickerProps>(
  (
    {
      controlSize = 'medium',
      status,
      allowClear,
      disabledDate,
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
      [open, setOpen] = useState(false),
      [viewDate, setViewDate] = useState(new Date());
    const current = String(value ?? inner);
    const root = useRef<HTMLSpanElement>(null),
      input = useRef<HTMLInputElement | null>(null);
    useOutside(root, open, () => setOpen(false));
    const parse = (date: string) => {
      const [year, month, day] = date.split('-').map(Number);
      return year && month && day ? new Date(year, month - 1, day) : new Date();
    };
    const format = (date: Date) =>
      date.getFullYear() +
      '-' +
      String(date.getMonth() + 1).padStart(2, '0') +
      '-' +
      String(date.getDate()).padStart(2, '0');
    const blocked = (date: Date) =>
      !!disabledDate?.(date) ||
      (min !== undefined && format(date) < String(min)) ||
      (max !== undefined && format(date) > String(max));
    const commit = (next: string) => {
      if (disabled || readOnly) return;
      if (next && blocked(parse(next))) return;
      if (value === undefined) setInner(next);
      if (input.current) onChange?.(inputChange(input.current, next));
      setOpen(false);
      input.current?.focus();
    };
    return (
      <span ref={root} className="cinna-picker">
        <input
          {...rest}
          ref={(node) => {
            input.current = node;
            if (typeof ref === 'function') ref(node);
            else if (ref) ref.current = node;
          }}
          type="date"
          min={min}
          max={max}
          disabled={disabled}
          readOnly={readOnly}
          value={current}
          aria-label={rest['aria-label'] ?? 'Choose date'}
          className={cx(
            'cinna-native-input',
            'cinna-native-input--' + controlSize,
            status && 'cinna-native-input--' + status,
            className,
          )}
          onChange={(event) => {
            if (event.target.value && blocked(parse(event.target.value))) return;
            if (value === undefined) setInner(event.target.value);
            onChange?.(event);
          }}
        />
        <button
          type="button"
          className="cinna-picker__trigger"
          aria-label="Open calendar"
          aria-haspopup="dialog"
          aria-expanded={open && !disabled && !readOnly}
          disabled={disabled || readOnly}
          onClick={() => {
            setViewDate(current ? parse(current) : new Date());
            setOpen(!open);
          }}
        >
          <Icon name="chevron-down" size={12} />
        </button>
        {allowClear && current && (
          <button
            className="cinna-picker__clear"
            type="button"
            aria-label="Clear date"
            disabled={disabled || readOnly}
            onClick={() => commit('')}
          >
            ×
          </button>
        )}
        {open && !disabled && !readOnly && (
          <FloatingPanel anchor={root}>
            <div className="cinna-picker__popup" role="dialog" aria-label="Choose date">
              <Calendar
                value={viewDate}
                disabledDate={blocked}
                onChange={setViewDate}
                onSelect={(date) => commit(format(date))}
              />
              <button
                type="button"
                disabled={blocked(new Date())}
                onClick={() => commit(format(new Date()))}
              >
                Today
              </button>
            </div>
          </FloatingPanel>
        )}
      </span>
    );
  },
);

DatePicker.displayName = 'DatePicker';
