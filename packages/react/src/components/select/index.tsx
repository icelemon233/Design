import { FloatingPanel } from '../../internal/FloatingPanel';
import React, { useId, useRef, useState } from 'react';
import { useControllable } from '../../hooks/useControllable';
import { useOutside } from '../../hooks/useOutside';
import { useDisabled } from '../../internal/DisabledContext';
import { cx } from '../../utils/cx';
import { Icon } from '../icon';
import type { SelectProps } from './types';
export type { SelectOption, SelectProps } from './types';

export const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      options,
      controlSize = 'medium',
      placeholder = 'Select',
      value,
      defaultValue,
      onChange,
      allowClear,
      disabled: disabledProp,
      mode = 'single',
      showSearch,
      notFoundContent = 'No options',
      open: openProp,
      defaultOpen = false,
      onOpenChange,
      status,
      loading,
      className,
      ...rest
    },
    ref,
  ) => {
    const disabled = useDisabled(disabledProp);
    const root = useRef<HTMLDivElement | null>(null);
    const control = useRef<HTMLButtonElement | null>(null);
    const id = useId();
    const [open, setOpen] = useControllable(openProp, defaultOpen, onOpenChange);
    const [selected, setSelected] = useControllable<string | string[]>(
      value,
      defaultValue ?? (mode === 'multiple' ? [] : ''),
      onChange,
    );
    const [query, setQuery] = useState('');
    const [highlight, setHighlight] = useState(-1);
    const actualOpen = open && !disabled;
    const selectedValues = Array.isArray(selected) ? selected : selected ? [selected] : [];
    const selectedOptions = selectedValues.map(
      (key) => options.find((option) => option.value === key) ?? { value: key, label: key },
    );
    const filtered = options.filter(
      (option) =>
        !query ||
        String(
          option.searchLabel ?? (typeof option.label === 'string' ? option.label : option.value),
        )
          .toLowerCase()
          .includes(query.toLowerCase()),
    );
    useOutside(root, actualOpen, () => setOpen(false));
    const choose = (key: string) => {
      if (disabled || options.find((option) => option.value === key)?.disabled) return;
      setSelected(
        mode === 'multiple'
          ? selectedValues.includes(key)
            ? selectedValues.filter((item) => item !== key)
            : [...selectedValues, key]
          : key,
      );
      if (mode === 'single') {
        setOpen(false);
        setQuery('');
        control.current?.focus();
      }
    };
    const keyboard = (event: React.KeyboardEvent) => {
      if (disabled || event.nativeEvent.isComposing) return;
      if (
        event.key === 'Enter' &&
        event.target instanceof HTMLButtonElement &&
        event.target !== control.current
      )
        return;
      if (event.key === 'Escape' && actualOpen) {
        event.preventDefault();
        event.stopPropagation();
        setOpen(false);
        control.current?.focus();
        return;
      }
      const enabled = filtered
        .map((option, index) => (!option.disabled ? index : -1))
        .filter((index) => index >= 0);
      if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
        event.preventDefault();
        setOpen(true);
        let index = enabled.indexOf(highlight);
        index =
          event.key === 'Home'
            ? 0
            : event.key === 'End'
              ? enabled.length - 1
              : event.key === 'ArrowDown'
                ? (index + 1) % enabled.length
                : index < 0
                  ? enabled.length - 1
                  : (index - 1 + enabled.length) % enabled.length;
        setHighlight(enabled[index] ?? -1);
      } else if (event.key === 'Enter' && actualOpen) {
        event.preventDefault();
        if (filtered[highlight]) choose(filtered[highlight].value);
      }
    };
    return (
      <div
        {...rest}
        ref={(node) => {
          root.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        className={cx(
          'cinna-select',
          `cinna-select--${controlSize}`,
          actualOpen && 'cinna-select--open',
          disabled && 'cinna-select--disabled',
          status && `cinna-select--${status}`,
          className,
        )}
        onKeyDown={(event) => {
          rest.onKeyDown?.(event);
          if (!event.defaultPrevented) keyboard(event);
        }}
        onBlur={(event) => {
          rest.onBlur?.(event);
          if (actualOpen && !event.currentTarget.contains(event.relatedTarget)) setOpen(false);
        }}
      >
        <button
          ref={control}
          type="button"
          className="cinna-select__control"
          aria-labelledby={
            rest['aria-labelledby'] ? rest['aria-labelledby'] + ' ' + id + '-value' : undefined
          }
          disabled={disabled}
          aria-label={rest['aria-labelledby'] ? undefined : (rest['aria-label'] ?? placeholder)}
          aria-haspopup="listbox"
          aria-expanded={actualOpen}
          aria-controls={actualOpen ? id : undefined}
          onClick={() => {
            if (!actualOpen) {
              const current = filtered.findIndex(
                (option) => !option.disabled && selectedValues.includes(option.value),
              );
              setHighlight(
                current >= 0 ? current : filtered.findIndex((option) => !option.disabled),
              );
            }
            setOpen(!actualOpen);
          }}
        >
          <span
            id={id + '-value'}
            className={cx(!selectedOptions.length && 'cinna-select__placeholder')}
          >
            {selectedOptions.length
              ? mode === 'multiple'
                ? selectedOptions.map((option) => <em key={option.value}>{option.label}</em>)
                : selectedOptions[0].label
              : placeholder}
          </span>
          <span className="cinna-select__arrow" aria-hidden="true">
            {loading ? '…' : <Icon name="chevron-down" size={13} />}
          </span>
        </button>
        {allowClear && selectedValues.length > 0 && (
          <button
            type="button"
            className="cinna-select__clear"
            aria-label="Clear selection"
            disabled={disabled}
            onClick={() => {
              setSelected(mode === 'multiple' ? [] : '');
              setQuery('');
            }}
          >
            <Icon name="close-blue" size={12} />
          </button>
        )}
        {actualOpen && (
          <FloatingPanel anchor={root} matchWidth>
            <div className="cinna-select__popup">
              {showSearch && (
                <input
                  autoFocus
                  data-cinna-autofocus
                  aria-label="Search options"
                  role="combobox"
                  aria-autocomplete="list"
                  aria-expanded={actualOpen}
                  aria-controls={id}
                  aria-activedescendant={highlight >= 0 ? `${id}-${highlight}` : undefined}
                  className="cinna-select__search"
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value);
                    setHighlight(-1);
                  }}
                />
              )}
              <div
                id={id}
                role="listbox"
                className="cinna-select__list"
                aria-label={rest['aria-label'] ?? placeholder}
                aria-labelledby={rest['aria-labelledby']}
                aria-multiselectable={mode === 'multiple' || undefined}
                aria-activedescendant={
                  !showSearch && highlight >= 0 ? `${id}-${highlight}` : undefined
                }
                tabIndex={-1}
                data-cinna-autofocus={!showSearch || undefined}
              >
                {!filtered.length && (
                  <span className="cinna-select__empty" role="status">
                    {notFoundContent}
                  </span>
                )}
                {filtered.map((option, index) => (
                  <button
                    key={option.value}
                    id={`${id}-${index}`}
                    type="button"
                    role="option"
                    tabIndex={-1}
                    aria-selected={selectedValues.includes(option.value)}
                    aria-disabled={option.disabled || undefined}
                    disabled={option.disabled}
                    className={cx(
                      'cinna-select__option',
                      selectedValues.includes(option.value) && 'cinna-select__option--active',
                      highlight === index && 'cinna-select__option--highlighted',
                    )}
                    onPointerMove={(event) => {
                      if (event.pointerType === 'mouse' && (event.movementX || event.movementY))
                        setHighlight(index);
                    }}
                    onClick={() => choose(option.value)}
                  >
                    <span>{option.label}</span>
                    {selectedValues.includes(option.value) && (
                      <svg
                        className="cinna-select__check"
                        viewBox="0 0 12 10"
                        focusable="false"
                        aria-hidden="true"
                      >
                        <path d="M1.6 5.2 4.7 8.1 10.5 1.8" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </FloatingPanel>
        )}
      </div>
    );
  },
);

Select.displayName = 'Select';
