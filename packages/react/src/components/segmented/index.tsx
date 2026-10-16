import React, { useRef } from 'react';
import { useControllable } from '../../hooks/useControllable';
import { useDisabled } from '../../internal/DisabledContext';
import { cx } from '../../utils/cx';
import type { SegmentedProps } from './types';
export type { SegmentedOption, SegmentedProps } from './types';

export const Segmented = React.forwardRef<HTMLDivElement, SegmentedProps>(
  (
    {
      options,
      value,
      defaultValue,
      onChange,
      block,
      size = 'medium',
      disabled: disabledProp,
      className,
      ...rest
    },
    ref,
  ) => {
    const disabled = useDisabled(disabledProp);
    const first = options.find((option) => !option.disabled)?.value;
    const [inner, setSelected] = useControllable(value, defaultValue ?? first ?? '', onChange);
    const selected = options.some((option) => option.value === inner && !option.disabled)
      ? inner
      : first;
    const buttons = useRef<Record<string, HTMLButtonElement | null>>({});
    return (
      <div
        {...rest}
        ref={ref}
        role="radiogroup"
        aria-label={rest['aria-label'] ?? 'Options'}
        aria-disabled={disabled || undefined}
        className={cx(
          'cinna-segmented',
          'cinna-segmented--' + size,
          block && 'cinna-segmented--block',
          className,
        )}
      >
        {options.map((option) => (
          <button
            ref={(node) => {
              buttons.current[option.value] = node;
            }}
            key={option.value}
            type="button"
            role="radio"
            aria-checked={selected === option.value}
            tabIndex={selected === option.value ? 0 : -1}
            disabled={disabled || option.disabled}
            className={cx(
              'cinna-segmented__item',
              selected === option.value && 'cinna-segmented__item--active',
            )}
            onClick={() => setSelected(option.value)}
            onKeyDown={(event) => {
              const enabled = options.filter((item) => !item.disabled);
              const index = enabled.findIndex((item) => item.value === option.value);
              const next =
                event.key === 'Home'
                  ? 0
                  : event.key === 'End'
                    ? enabled.length - 1
                    : ['ArrowRight', 'ArrowDown'].includes(event.key)
                      ? (index + 1) % enabled.length
                      : ['ArrowLeft', 'ArrowUp'].includes(event.key)
                        ? (index - 1 + enabled.length) % enabled.length
                        : -1;
              if (next >= 0) {
                event.preventDefault();
                setSelected(enabled[next].value);
                buttons.current[enabled[next].value]?.focus();
              }
            }}
          >
            {option.icon}
            {option.label}
          </button>
        ))}
      </div>
    );
  },
);

Segmented.displayName = 'Segmented';
