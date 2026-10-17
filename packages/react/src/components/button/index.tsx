import React from 'react';
import { useDisabled } from '../../internal/DisabledContext';
import { cx } from '../../utils/cx';
import type { ButtonRippleEffect } from './ripple';
import { normalizeButtonRippleOpacity, renderButtonRipples, useButtonRipple } from './ripple';
import { getButtonThemeStyles } from './theme';
import type { ButtonProps } from './types';
export type { ButtonProps, ButtonShape, ButtonSize, ButtonVariant } from './types';

export type { ButtonRippleEffect };

const normalizeCssValue = (value: number | string | undefined) => {
  if (typeof value === 'number') return `${value}px`;
  return value;
};

const normalizeDuration = (value: number | string | undefined) => {
  if (typeof value === 'number') return `${value}ms`;
  return value;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'medium',
      shape = 'round',
      htmlType = 'button',
      loading = false,
      loadingSpeed,
      block = false,
      danger = false,
      icon,
      iconPosition = 'start',
      ripple = true,
      rippleEffects,
      rippleParticleColors,
      rippleParticleOpacity,
      theme,
      color,
      backgroundColor,
      borderColor,
      radius,
      shadow,
      activeShadow,
      children,
      disabled: disabledProp,
      className,
      style,
      onClick,
      ...rest
    },
    ref,
  ) => {
    const disabled = useDisabled(disabledProp);
    const isDisabled = disabled || loading;
    const isDanger = danger || variant === 'danger';
    const { activeRippleEffects, ripples, triggerButtonRipple } = useButtonRipple({
      enabled: ripple,
      disabled: isDisabled,
      effects: rippleEffects,
      particleColors: rippleParticleColors,
    });
    const customStyle = {
      ...getButtonThemeStyles({ theme, color, backgroundColor, borderColor, shadow, activeShadow }),
      ...(radius !== undefined ? { '--button-radius': normalizeCssValue(radius) } : null),
      ...(loadingSpeed !== undefined
        ? { '--button-loading-speed': normalizeDuration(loadingSpeed) }
        : null),
      ...(rippleParticleOpacity !== undefined
        ? { '--button-particle-opacity': normalizeButtonRippleOpacity(rippleParticleOpacity) }
        : null),
      ...style,
    } as React.CSSProperties;

    const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
      triggerButtonRipple(event);
      onClick?.(event);
    };

    return (
      <button
        ref={ref}
        type={htmlType}
        className={cx(
          'cinna-button',
          `cinna-button--${variant}`,
          `cinna-button--${size}`,
          `cinna-button--${shape}`,
          block && 'cinna-button--block',
          isDanger && 'cinna-button--danger-tone',
          className,
        )}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        style={customStyle}
        onClick={handleClick}
        {...rest}
      >
        {iconPosition === 'start' &&
          (loading ? (
            <span className="cinna-button__spinner" aria-hidden="true" />
          ) : icon ? (
            <span className="cinna-button__icon">{icon}</span>
          ) : null)}
        {children ? <span className="cinna-button__label">{children}</span> : null}
        {iconPosition === 'end' &&
          (loading ? (
            <span className="cinna-button__spinner" aria-hidden="true" />
          ) : icon ? (
            <span className="cinna-button__icon">{icon}</span>
          ) : null)}
        {renderButtonRipples(ripples, activeRippleEffects)}
      </button>
    );
  },
);

Button.displayName = 'Button';
