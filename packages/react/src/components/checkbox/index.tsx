import React, { useEffect, useId, useRef, useState } from 'react';
import { useDisabled } from '../../internal/DisabledContext';
import { cx } from '../../utils/cx';
import {
  normalizeButtonRippleOpacity,
  renderButtonRipples,
  useButtonRipple,
} from '../button/ripple';
import type { CinnaSize } from '../shared';
import type { CheckboxAnimation, CheckboxGroupProps, CheckboxProps } from './types';
export type {
  CheckboxAnimation,
  CheckboxGroupOption,
  CheckboxGroupProps,
  CheckboxProps,
} from './types';

const normalizeCheckboxCssValue = (value: number | string | undefined) =>
  typeof value === 'number' ? `${value}px` : value;

const checkboxParticleCountBySize: Record<CinnaSize, number> = {
  small: 5,
  medium: 6,
  large: 7,
};

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      indeterminate,
      size = 'medium',
      animation,
      labelColor,
      checkedColor,
      boxColor,
      borderColor,
      fontSize,
      fontWeight,
      ripple = true,
      rippleParticleColors = ['#73c4e0', '#a8dff1', '#ffd8c2', '#fff0a6', '#df6677'],
      rippleParticleOpacity = 0.72,
      className,
      style,
      disabled: disabledProp,
      onClick,
      onChange,
      ...rest
    },
    ref,
  ) => {
    const disabled = useDisabled(disabledProp);
    const boxRef = useRef<HTMLSpanElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    useEffect(() => {
      if (inputRef.current) inputRef.current.indeterminate = !!indeterminate;
    }, [indeterminate]);
    const resolvedAnimation: CheckboxAnimation = animation ?? (ripple ? 'particles' : 'none');
    const rippleState = useButtonRipple({
      enabled: resolvedAnimation === 'particles' && ripple,
      disabled,
      effects: 'particles',
      particleColors: rippleParticleColors,
      particleCount: checkboxParticleCountBySize[size],
    });
    const checkboxStyle = {
      '--cinna-check-label-color': labelColor,
      '--cinna-check-checked-color': checkedColor,
      '--cinna-check-box-color': boxColor,
      '--cinna-check-border-color': borderColor,
      '--cinna-check-font-size': normalizeCheckboxCssValue(fontSize),
      '--cinna-check-font-weight': fontWeight,
      '--button-particle-opacity': normalizeButtonRippleOpacity(rippleParticleOpacity),
      ...style,
    } as React.CSSProperties;
    const triggerCheckboxRipple = (event: React.MouseEvent<HTMLLabelElement>) => {
      const target = event.target as HTMLElement | null;
      if (target?.tagName === 'INPUT') return;

      const box = boxRef.current;
      if (!box) return;

      const boxRect = box.getBoundingClientRect();
      const point = box.contains(target)
        ? { clientX: event.clientX, clientY: event.clientY }
        : { clientX: boxRect.left + boxRect.width / 2, clientY: boxRect.top + boxRect.height / 2 };

      rippleState.triggerButtonRippleAt(box, point);
    };

    return (
      <label
        className={cx(
          'cinna-check',
          `cinna-check--${size}`,
          `cinna-check--animation-${resolvedAnimation}`,
          indeterminate && 'cinna-check--indeterminate',
          disabled && 'cinna-check--disabled',
          className,
        )}
        style={checkboxStyle}
        onClick={triggerCheckboxRipple}
      >
        <input
          ref={(node) => {
            inputRef.current = node;
            if (typeof ref === 'function') ref(node);
            else if (ref) ref.current = node;
          }}
          type="checkbox"
          disabled={disabled}
          aria-checked={indeterminate ? 'mixed' : undefined}
          onClick={onClick}
          onChange={(event) => {
            if (!disabled) onChange?.(event);
          }}
          {...rest}
        />
        <span
          ref={boxRef}
          className={cx('cinna-check__box', indeterminate && 'cinna-check__box--indeterminate')}
          aria-hidden="true"
        >
          <svg className="cinna-check__mark" viewBox="0 0 12 10" focusable="false">
            <path className="cinna-check__mark-path" d="M1.6 5.2 4.7 8.1 10.5 1.8" />
          </svg>
          <span className="cinna-check__mixed" />
          {renderButtonRipples(rippleState.ripples, rippleState.activeRippleEffects)}
        </span>
        {label && <span className="cinna-check__label">{label}</span>}
      </label>
    );
  },
);

Checkbox.displayName = 'Checkbox';

export const CheckboxGroup = React.forwardRef<HTMLDivElement, CheckboxGroupProps>(
  (
    {
      options,
      value,
      defaultValue = [],
      name,
      disabled: disabledProp,
      direction = 'horizontal',
      size = 'medium',
      animation,
      onChange,
      labelColor,
      checkedColor,
      boxColor,
      borderColor,
      fontSize,
      fontWeight,
      ripple,
      rippleParticleColors,
      rippleParticleOpacity,
      className,
      ...rest
    },
    ref,
  ) => {
    const disabled = useDisabled(disabledProp);
    const generatedName = useId();
    const [inner, setInner] = useState(defaultValue);
    const selected = value ?? inner;
    const groupName = name ?? generatedName;
    const update = (nextValue: string, checked: boolean) => {
      const next = checked
        ? [...selected, nextValue]
        : selected.filter((item) => item !== nextValue);
      if (value === undefined) setInner(next);
      onChange?.(next);
    };

    return (
      <div
        ref={ref}
        className={cx('cinna-check-group', `cinna-check-group--${direction}`, className)}
        {...rest}
      >
        {options.map((option) => (
          <Checkbox
            key={option.value}
            name={groupName}
            value={option.value}
            checked={selected.includes(option.value)}
            disabled={disabled || option.disabled}
            indeterminate={option.indeterminate}
            size={size}
            animation={animation}
            label={option.label}
            labelColor={labelColor}
            checkedColor={checkedColor}
            boxColor={boxColor}
            borderColor={borderColor}
            fontSize={fontSize}
            fontWeight={fontWeight}
            ripple={ripple}
            rippleParticleColors={rippleParticleColors}
            rippleParticleOpacity={rippleParticleOpacity}
            onChange={(event) => update(option.value, event.currentTarget.checked)}
          />
        ))}
      </div>
    );
  },
);

CheckboxGroup.displayName = 'CheckboxGroup';
