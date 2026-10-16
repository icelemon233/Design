import React, { useEffect, useState } from 'react';
import { useDisabled } from '../../internal/DisabledContext';
import { cx } from '../../utils/cx';
import {
  normalizeButtonRippleOpacity,
  renderButtonRipples,
  useButtonRipple,
} from '../button/ripple';
import { getButtonThemeStyles } from '../button/theme';
import { Icon } from '../icon';
import type { FloatButtonBackTopProps, FloatButtonGroupProps, FloatButtonProps } from './types';
export type {
  FloatButtonBackTopProps,
  FloatButtonGroupProps,
  FloatButtonMenuItem,
  FloatButtonProps,
} from './types';

const normalizeFloatButtonCssValue = (value: number | string | undefined) => {
  if (typeof value === 'number') return `${value}px`;
  return value;
};

const FloatButtonBase = React.forwardRef<HTMLButtonElement, FloatButtonProps>(
  (
    {
      icon = '+',
      shape = 'circle',
      tooltip,
      badge,
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
      className,
      children,
      disabled: disabledProp,
      onClick,
      style,
      ...rest
    },
    ref,
  ) => {
    const disabled = useDisabled(disabledProp);
    const { activeRippleEffects, ripples, triggerButtonRipple } = useButtonRipple({
      enabled: ripple,
      disabled,
      effects: rippleEffects,
      particleColors: rippleParticleColors,
    });
    const customStyle = {
      ...getButtonThemeStyles({ theme, color, backgroundColor, borderColor, shadow, activeShadow }),
      ...(radius !== undefined
        ? { '--button-radius': normalizeFloatButtonCssValue(radius) }
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
        type="button"
        className={cx('cinna-float-button', `cinna-float-button--${shape}`, className)}
        title={typeof tooltip === 'string' ? tooltip : undefined}
        disabled={disabled}
        style={customStyle}
        onClick={handleClick}
        {...rest}
      >
        <span className="cinna-float-button__icon">{icon}</span>
        {children && <small className="cinna-float-button__label">{children}</small>}
        {badge && <em>{badge}</em>}
        {tooltip && <span className="cinna-float-button__tooltip">{tooltip}</span>}
        {renderButtonRipples(ripples, activeRippleEffects)}
      </button>
    );
  },
);

FloatButtonBase.displayName = 'FloatButton';

const renderFloatButtonGroupChildren = (children: React.ReactNode, shape: 'circle' | 'square') =>
  React.Children.map(children, (child) => {
    if (!React.isValidElement<FloatButtonProps>(child)) return child;
    return React.cloneElement(child, { shape: child.props.shape ?? shape });
  });

export const FloatButtonGroup = React.forwardRef<HTMLDivElement, FloatButtonGroupProps>(
  (
    {
      shape = 'circle',
      placement = 'top',
      trigger,
      open,
      defaultOpen = false,
      icon = '+',
      closeIcon = <Icon name="close-blue" size={14} />,
      tooltip,
      items,
      children,
      className,
      onOpenChange,
      onClick,
      onMouseEnter,
      onMouseLeave,
      ...rest
    },
    ref,
  ) => {
    const isControlled = open !== undefined;
    const [innerOpen, setInnerOpen] = useState(defaultOpen);
    const mergedOpen = isControlled ? Boolean(open) : innerOpen;
    const menuMode = Boolean(trigger);
    const setOpen = (nextOpen: boolean) => {
      if (!isControlled) setInnerOpen(nextOpen);
      onOpenChange?.(nextOpen);
    };
    const listContent = items
      ? items.map(({ key, label, content, onClick: itemOnClick, ...item }, index) => (
          <FloatButtonBase
            key={key ?? index}
            {...item}
            shape={item.shape ?? shape}
            onClick={(event) => {
              itemOnClick?.(event);
              if (trigger === 'click') setOpen(false);
            }}
          >
            {content ?? label ?? item.children}
          </FloatButtonBase>
        ))
      : renderFloatButtonGroupChildren(children, shape);
    const list = <div className="cinna-float-button-group__list">{listContent}</div>;
    const triggerButton = menuMode ? (
      <FloatButtonBase
        className="cinna-float-button-group__trigger"
        shape={shape}
        icon={mergedOpen ? closeIcon : icon}
        tooltip={tooltip}
        aria-expanded={mergedOpen}
        aria-haspopup="menu"
        onClick={(event) => {
          onClick?.(event);
          if (trigger === 'click') setOpen(!mergedOpen);
        }}
      />
    ) : null;
    const listFirst = placement === 'top' || placement === 'left';

    return (
      <div
        ref={ref}
        className={cx(
          'cinna-float-button-group',
          `cinna-float-button-group--${shape}`,
          `cinna-float-button-group--${placement}`,
          menuMode && 'cinna-float-button-group--menu',
          mergedOpen && 'cinna-float-button-group--open',
          className,
        )}
        onMouseEnter={(event) => {
          if (trigger === 'hover') setOpen(true);
          onMouseEnter?.(event);
        }}
        onMouseLeave={(event) => {
          if (trigger === 'hover') setOpen(false);
          onMouseLeave?.(event);
        }}
        {...rest}
      >
        {listFirst && list}
        {triggerButton}
        {!listFirst && list}
      </div>
    );
  },
);

FloatButtonGroup.displayName = 'FloatButtonGroup';

const getBackTopTarget = (target?: () => HTMLElement | Window) => target?.() ?? window;

const getBackTopScrollTop = (target: HTMLElement | Window) => {
  if (target === window)
    return window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
  return (target as HTMLElement).scrollTop;
};

const setBackTopScrollTop = (target: HTMLElement | Window, top: number) => {
  if (target === window) {
    window.scrollTo(0, top);
    return;
  }

  (target as HTMLElement).scrollTop = top;
};

const scrollBackTop = (target: HTMLElement | Window, duration: number) => {
  const start = getBackTopScrollTop(target);

  if (duration <= 0 || start <= 0) {
    setBackTopScrollTop(target, 0);
    return;
  }

  const startTime = performance.now();
  const step = (time: number) => {
    const progress = Math.min((time - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    setBackTopScrollTop(target, Math.round(start * (1 - eased)));

    if (progress < 1) window.requestAnimationFrame(step);
  };

  window.requestAnimationFrame(step);
};

export const FloatButtonBackTop = React.forwardRef<HTMLButtonElement, FloatButtonBackTopProps>(
  (
    {
      icon = <Icon name="arrow-tail-up" size={18} />,
      tooltip = 'Back to top',
      duration = 450,
      visibilityHeight = 400,
      target,
      onClick,
      style,
      className,
      ...rest
    },
    ref,
  ) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
      const scrollTarget = getBackTopTarget(target);
      const updateVisible = () => {
        setVisible(getBackTopScrollTop(scrollTarget) >= visibilityHeight);
      };

      updateVisible();
      scrollTarget.addEventListener('scroll', updateVisible, { passive: true });
      window.addEventListener('resize', updateVisible);

      return () => {
        scrollTarget.removeEventListener('scroll', updateVisible);
        window.removeEventListener('resize', updateVisible);
      };
    }, [target, visibilityHeight]);

    return (
      <FloatButtonBase
        ref={ref}
        icon={icon}
        tooltip={tooltip}
        aria-label={typeof tooltip === 'string' ? tooltip : 'Back to top'}
        className={cx(
          'cinna-float-button--back-top',
          !visible && 'cinna-float-button--hidden',
          className,
        )}
        style={{ pointerEvents: visible ? undefined : 'none', ...style }}
        onClick={(event) => {
          onClick?.(event);
          scrollBackTop(getBackTopTarget(target), duration);
        }}
        {...rest}
      />
    );
  },
);

FloatButtonBackTop.displayName = 'FloatButtonBackTop';

export const FloatButton = Object.assign(FloatButtonBase, {
  Group: FloatButtonGroup,
  BackTop: FloatButtonBackTop,
});
