import { FloatingPanel } from '../../internal/FloatingPanel';
import React, { useEffect, useId, useMemo, useRef, useState } from 'react';
import { useEscapeLayer } from '../../hooks/useEscapeLayer';
import { useDisabled } from '../../internal/DisabledContext';
import { cx } from '../../utils/cx';
import { Icon } from '../icon';
import type { AutoCompleteOption, AutoCompleteProps } from './types';
export type {
  AutoCompleteOption,
  AutoCompleteProps,
  AutoCompleteSemanticSlot,
  AutoCompleteVariant,
} from './types';

const normalizeAutoCompleteOptions = (
  options: Array<string | AutoCompleteOption> = [],
): AutoCompleteOption[] =>
  options.map((option) =>
    typeof option === 'string'
      ? { label: option, value: option }
      : { ...option, label: option.label ?? option.value },
  );

const getAutoCompleteText = (node: React.ReactNode) => {
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  return '';
};

const getFirstEnabledAutoCompleteIndex = (options: AutoCompleteOption[]) =>
  options.findIndex((option) => !option.disabled);

const getNextAutoCompleteIndex = (options: AutoCompleteOption[], current: number, step: 1 | -1) => {
  if (!options.length) return -1;
  let next = current;
  for (let index = 0; index < options.length; index += 1) {
    next = (next + step + options.length) % options.length;
    if (!options[next]?.disabled) return next;
  }
  return -1;
};

export const AutoComplete = React.forwardRef<HTMLInputElement, AutoCompleteProps>(
  (
    {
      options = [],
      children,
      controlSize = 'medium',
      variant = 'outlined',
      status,
      allowClear,
      backfill = false,
      defaultActiveFirstOption = true,
      open,
      defaultOpen = false,
      onOpenChange,
      onChange,
      onSelect,
      onSearch,
      onClear,
      onInputKeyDown,
      onPopupScroll,
      filterOption = true,
      notFoundContent = null,
      popupRender,
      popupMatchInputWidth = true,
      classNames,
      styles,
      className,
      style,
      value,
      defaultValue = '',
      disabled: disabledProp,
      readOnly,
      onFocus,
      onBlur,
      onKeyDown,
      ...rest
    },
    ref,
  ) => {
    const disabled = useDisabled(disabledProp);
    const rootRef = useRef<HTMLSpanElement>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [inner, setInner] = useState(String(defaultValue));
    const [innerOpen, setInnerOpen] = useState(defaultOpen);
    const [activeIndex, setActiveIndex] = useState(-1);
    const [previewValue, setPreviewValue] = useState<string | null>(null);
    const isOpenControlled = open !== undefined;
    const actualOpen = isOpenControlled ? Boolean(open) : innerOpen;
    const current = String(value ?? inner);
    const inputValue = previewValue ?? current;
    const normalized = useMemo(() => normalizeAutoCompleteOptions(options), [options]);
    const filtered = useMemo(() => {
      if (filterOption === false) return normalized;
      if (typeof filterOption === 'function')
        return normalized.filter((option) => filterOption(current, option));
      const query = current.trim().toLowerCase();
      if (!query) return normalized;
      return normalized.filter((option) => {
        const label = getAutoCompleteText(option.label).toLowerCase();
        return option.value.toLowerCase().includes(query) || label.includes(query);
      });
    }, [current, filterOption, normalized]);
    const canOpen = !disabled && !readOnly;
    const popupVisible = canOpen && actualOpen && (filtered.length > 0 || notFoundContent !== null);
    const listId = useId();

    const setInputRef = (node: HTMLInputElement | null) => {
      inputRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) ref.current = node;
    };

    const setPopupOpen = (nextOpen: boolean) => {
      const allowedOpen = canOpen ? nextOpen : false;
      if (!isOpenControlled) setInnerOpen(allowedOpen);
      if (actualOpen !== allowedOpen) onOpenChange?.(allowedOpen);
      if (!allowedOpen) {
        setActiveIndex(-1);
        setPreviewValue(null);
      }
    };

    useEscapeLayer(popupVisible, rootRef, () => setPopupOpen(false));
    const update = (next: string) => {
      setPreviewValue(null);
      setInner(next);
      onChange?.(next);
    };

    const selectOption = (option: AutoCompleteOption) => {
      if (option.disabled) return;
      update(option.value);
      onSelect?.(option.value, option);
      setPopupOpen(false);
    };

    const clearValue = () => {
      update('');
      onClear?.();
      setPopupOpen(false);
      inputRef.current?.focus();
    };

    useEffect(() => {
      if (!actualOpen) return;

      const closeOnOutsidePointer = (event: PointerEvent) => {
        if (!rootRef.current?.contains(event.target as Node)) setPopupOpen(false);
      };

      document.addEventListener('pointerdown', closeOnOutsidePointer, true);
      return () => {
        document.removeEventListener('pointerdown', closeOnOutsidePointer, true);
      };
    }, [actualOpen, canOpen, isOpenControlled, onOpenChange]);

    useEffect(() => {
      if (!actualOpen) {
        setActiveIndex(-1);
        return;
      }
      setActiveIndex((currentIndex) => {
        if (!defaultActiveFirstOption) return currentIndex;
        if (currentIndex >= 0 && filtered[currentIndex] && !filtered[currentIndex].disabled)
          return currentIndex;
        return getFirstEnabledAutoCompleteIndex(filtered);
      });
    }, [actualOpen, defaultActiveFirstOption, filtered]);

    const childInputProps = React.isValidElement(children) ? children.props : undefined;
    const inputClassName = cx(
      'cinna-native-input',
      `cinna-native-input--${controlSize}`,
      status && `cinna-native-input--${status}`,
      classNames?.input,
      childInputProps?.className,
    );
    const commonInputProps = {
      ...rest,
      ref: setInputRef,
      className: inputClassName,
      style: { ...styles?.input, ...childInputProps?.style },
      value: inputValue,
      disabled,
      readOnly,
      role: 'combobox',
      'aria-autocomplete': 'list',
      'aria-expanded': popupVisible,
      'aria-controls': popupVisible ? listId : undefined,
      'aria-activedescendant':
        popupVisible && activeIndex >= 0 ? `${listId}-option-${activeIndex}` : undefined,
      onFocus: (event: React.FocusEvent<HTMLInputElement>) => {
        childInputProps?.onFocus?.(event);
        if (canOpen) setPopupOpen(true);
        onFocus?.(event);
      },
      onBlur: (event: React.FocusEvent<HTMLInputElement>) => {
        childInputProps?.onBlur?.(event);
        onBlur?.(event);
        window.setTimeout(() => {
          if (!rootRef.current?.contains(document.activeElement)) setPopupOpen(false);
        });
      },
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        childInputProps?.onChange?.(event);
        const next = event.currentTarget.value;
        update(next);
        onSearch?.(next);
        if (canOpen) setPopupOpen(true);
      },
      onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => {
        childInputProps?.onKeyDown?.(event);
        onInputKeyDown?.(event);
        onKeyDown?.(event);
        if (event.defaultPrevented || event.nativeEvent.isComposing) return;

        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
          event.preventDefault();
          if (!actualOpen) setPopupOpen(true);
          const nextIndex = getNextAutoCompleteIndex(
            filtered,
            activeIndex,
            event.key === 'ArrowDown' ? 1 : -1,
          );
          setActiveIndex(nextIndex);
          if (backfill && nextIndex >= 0) setPreviewValue(filtered[nextIndex].value);
        } else if (
          event.key === 'Enter' &&
          popupVisible &&
          activeIndex >= 0 &&
          filtered[activeIndex]
        ) {
          event.preventDefault();
          selectOption(filtered[activeIndex]);
        } else if (event.key === 'Escape' && popupVisible) {
          event.preventDefault();
          event.stopPropagation();
          setPopupOpen(false);
        } else if (event.key === 'Tab') {
          setPopupOpen(false);
        }
      },
    } satisfies React.InputHTMLAttributes<HTMLInputElement> & React.RefAttributes<HTMLInputElement>;

    const clearIcon =
      allowClear && typeof allowClear === 'object' ? (
        (allowClear.clearIcon ?? <Icon name="close-blue" size={11} />)
      ) : (
        <Icon name="close-blue" size={11} />
      );
    const popupWidth =
      typeof popupMatchInputWidth === 'number'
        ? popupMatchInputWidth
        : popupMatchInputWidth === false
          ? 'max-content'
          : undefined;
    const list = (
      <span
        id={listId}
        className={cx('cinna-auto-complete__list', classNames?.list)}
        role="listbox"
        onScroll={onPopupScroll}
        style={styles?.list}
      >
        {filtered.length > 0 ? (
          filtered.map((option, index) => {
            const active = index === activeIndex;
            return (
              <button
                key={`${option.value}-${index}`}
                id={`${listId}-option-${index}`}
                type="button"
                role="option"
                aria-selected={active}
                disabled={option.disabled}
                className={cx(
                  'cinna-auto-complete__option',
                  active && 'cinna-auto-complete__option--active',
                  option.disabled && 'cinna-auto-complete__option--disabled',
                  classNames?.option,
                  option.className,
                )}
                style={{ ...styles?.option, ...option.style }}
                onMouseDown={(event) => event.preventDefault()}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => selectOption(option)}
              >
                <span className="cinna-auto-complete__label">{option.label}</span>
                {option.description && <small>{option.description}</small>}
              </button>
            );
          })
        ) : (
          <span
            className={cx('cinna-auto-complete__empty', classNames?.empty)}
            style={styles?.empty}
          >
            {notFoundContent}
          </span>
        )}
      </span>
    );

    return (
      <span
        ref={rootRef}
        className={cx(
          'cinna-auto-complete',
          `cinna-auto-complete--${controlSize}`,
          `cinna-auto-complete--${variant}`,
          status && `cinna-auto-complete--${status}`,
          actualOpen && 'cinna-auto-complete--open',
          disabled && 'cinna-auto-complete--disabled',
          readOnly && 'cinna-auto-complete--readonly',
          classNames?.root,
          className,
        )}
        style={{ ...styles?.root, ...style }}
      >
        {React.isValidElement(children) ? (
          React.cloneElement(children, commonInputProps)
        ) : (
          <input {...commonInputProps} />
        )}
        {allowClear && current && !disabled && !readOnly && (
          <button
            type="button"
            className={cx('cinna-auto-complete__clear', classNames?.clear)}
            style={styles?.clear}
            aria-label="Clear input"
            onMouseDown={(event) => event.preventDefault()}
            onClick={clearValue}
          >
            {clearIcon}
          </button>
        )}
        {popupVisible && (
          <FloatingPanel anchor={rootRef} matchWidth={popupMatchInputWidth === true}>
            <span
              className={cx('cinna-auto-complete__popup', classNames?.popup)}
              style={{ width: popupWidth, ...styles?.popup }}
            >
              {popupRender ? popupRender(list) : list}
            </span>
          </FloatingPanel>
        )}
      </span>
    );
  },
);

AutoComplete.displayName = 'AutoComplete';
