import { FloatingPanel } from '../../internal/FloatingPanel';
import React, { useId, useRef, useState } from 'react';
import { useOutside } from '../../hooks/useOutside';
import { useDisabled } from '../../internal/DisabledContext';
import { cx } from '../../utils/cx';
import { TextArea } from '../textarea';
import type { MentionsProps } from './types';
export type { MentionsProps } from './types';

export const Mentions = React.forwardRef<HTMLTextAreaElement, MentionsProps>(
  (
    {
      options = [],
      prefix = '@',
      onSelect,
      className,
      value,
      defaultValue = '',
      onChange,
      onFocus,
      onBlur,
      onKeyDown,
      disabled: disabledProp,
      readOnly,
      ...rest
    },
    ref,
  ) => {
    const disabled = useDisabled(disabledProp);
    const root = useRef<HTMLDivElement>(null),
      input = useRef<HTMLTextAreaElement | null>(null);
    const [inner, setInner] = useState(String(defaultValue));
    const [open, setOpen] = useState(false);
    const [caret, setCaret] = useState(0);
    const [active, setActive] = useState(0);
    const id = useId();
    const current = String(value ?? inner);
    const before = current.slice(0, caret);
    const start = before.lastIndexOf(prefix);
    const query =
      start >= 0 && !/\s/.test(before.slice(start + prefix.length))
        ? before.slice(start + prefix.length)
        : '';
    const normalized = options
      .map((option) => (typeof option === 'string' ? { label: option, value: option } : option))
      .filter((option) => option.value.toLowerCase().includes(query.toLowerCase()));
    const canOpen = !disabled && !readOnly && normalized.length > 0;
    useOutside(root, open, () => setOpen(false));
    const insert = (nextValue: string) => {
      const node = input.current;
      if (!node || disabled || readOnly) return;
      const replaceStart =
        start >= 0 && !/\s/.test(before.slice(start + prefix.length)) ? start : caret;
      const separator = replaceStart > 0 && !/\s/.test(current[replaceStart - 1]) ? ' ' : '';
      const insertion = separator + prefix + nextValue + ' ';
      const next = current.slice(0, replaceStart) + insertion + current.slice(caret);
      if (value === undefined) setInner(next);
      // Dispatch the same change event shape as TextArea so controlled forms update too.
      const setter = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value')?.set;
      setter?.call(node, next);
      const event = {
        target: node,
        currentTarget: node,
        type: 'change',
        nativeEvent: new Event('input', { bubbles: true }),
        bubbles: true,
        cancelable: false,
        defaultPrevented: false,
        eventPhase: 3,
        isTrusted: false,
        timeStamp: Date.now(),
        preventDefault() {},
        stopPropagation() {},
        isDefaultPrevented: () => false,
        isPropagationStopped: () => false,
        persist() {},
      } as React.ChangeEvent<HTMLTextAreaElement>;
      onChange?.(event);
      onSelect?.(nextValue);
      setOpen(false);
      requestAnimationFrame(() => {
        node.focus();
        const position = replaceStart + insertion.length;
        node.setSelectionRange(position, position);
      });
    };
    return (
      <div ref={root} className={cx('cinna-mentions', open && 'cinna-mentions--open', className)}>
        <TextArea
          {...rest}
          ref={(node) => {
            input.current = node;
            if (typeof ref === 'function') ref(node);
            else if (ref) ref.current = node;
          }}
          value={current}
          onClick={(event) => {
            setCaret(event.currentTarget.selectionStart);
            rest.onClick?.(event);
          }}
          onKeyUp={(event) => {
            setCaret(event.currentTarget.selectionStart);
            rest.onKeyUp?.(event);
          }}
          disabled={disabled}
          readOnly={readOnly}
          aria-controls={open ? id : undefined}
          aria-autocomplete="list"
          aria-activedescendant={open && normalized[active] ? id + '-' + active : undefined}
          onFocus={(event) => {
            setCaret(event.currentTarget.selectionStart);
            if (canOpen) setOpen(true);
            onFocus?.(event);
          }}
          onBlur={(event) => {
            setOpen(false);
            onBlur?.(event);
          }}
          onChange={(event) => {
            if (value === undefined) setInner(event.currentTarget.value);
            setCaret(event.currentTarget.selectionStart);
            setActive(0);
            if (!disabled && !readOnly) setOpen(true);
            onChange?.(event);
          }}
          onKeyDown={(event) => {
            onKeyDown?.(event);
            if (event.defaultPrevented || event.nativeEvent.isComposing || !open) return;
            if (event.key === 'Escape') {
              event.preventDefault();
              event.stopPropagation();
              setOpen(false);
            }
            if (['ArrowDown', 'ArrowUp'].includes(event.key)) {
              event.preventDefault();
              setActive(
                (index) =>
                  (index + (event.key === 'ArrowDown' ? 1 : -1) + normalized.length) %
                  normalized.length,
              );
            }
            if (event.key === 'Enter' && normalized[active] && !normalized[active].disabled) {
              event.preventDefault();
              insert(normalized[active].value);
            }
          }}
        />
        {open && canOpen && (
          <FloatingPanel anchor={root} matchWidth>
            <div
              id={id}
              className="cinna-mentions__options"
              role="listbox"
              aria-label="Mention suggestions"
            >
              {normalized.map((option, index) => (
                <button
                  id={id + '-' + index}
                  key={option.value}
                  type="button"
                  tabIndex={-1}
                  role="option"
                  aria-selected={index === active}
                  disabled={option.disabled}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => insert(option.value)}
                >
                  {prefix}
                  {option.label}
                </button>
              ))}
            </div>
          </FloatingPanel>
        )}
      </div>
    );
  },
);

Mentions.displayName = 'Mentions';
