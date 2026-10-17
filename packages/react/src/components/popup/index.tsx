import React, { useEffect, useId, useRef, useState } from 'react';
import { useEscapeLayer } from '../../hooks/useEscapeLayer';
import { useIsomorphicLayoutEffect as useLayoutEffect } from '../../hooks/useIsomorphicLayoutEffect';
import { useDisabled } from '../../internal/DisabledContext';
import { cx } from '../../utils/cx';
import { Button } from '../button';
import { Menu } from '../menu';
import { normalizePopupCssValue } from '../shared';
import type { PopupProps, PopupStyles } from './types';
export type {
  PopupAlign,
  PopupMode,
  PopupPlacement,
  PopupProps,
  PopupStyles,
  PopupTrigger,
} from './types';

const getPopupStyleVars = (styles: PopupStyles | undefined) => {
  if (!styles) return {};
  return {
    ...(styles.backgroundColor ? { '--cinna-popup-bg': styles.backgroundColor } : null),
    ...(styles.color ? { '--cinna-popup-color': styles.color } : null),
    ...(styles.borderColor ? { '--cinna-popup-border': styles.borderColor } : null),
    ...(styles.radius !== undefined
      ? { '--cinna-popup-radius': normalizePopupCssValue(styles.radius) }
      : null),
    ...(styles.shadow ? { '--cinna-popup-shadow': styles.shadow } : null),
    ...(styles.fontSize !== undefined
      ? { '--cinna-popup-font-size': normalizePopupCssValue(styles.fontSize) }
      : null),
    ...(styles.minWidth !== undefined
      ? { '--cinna-popup-min-width': normalizePopupCssValue(styles.minWidth) }
      : null),
    ...(styles.width !== undefined
      ? { '--cinna-popup-width': normalizePopupCssValue(styles.width) }
      : null),
    ...(styles.padding !== undefined
      ? { '--cinna-popup-padding': normalizePopupCssValue(styles.padding) }
      : null),
    ...(styles.titleColor ? { '--cinna-popup-title-color': styles.titleColor } : null),
    ...(styles.titleFontSize !== undefined
      ? { '--cinna-popup-title-font-size': normalizePopupCssValue(styles.titleFontSize) }
      : null),
    ...(styles.titleFontWeight !== undefined
      ? { '--cinna-popup-title-font-weight': styles.titleFontWeight }
      : null),
    ...(styles.contentColor ? { '--cinna-popup-content-color': styles.contentColor } : null),
    ...(styles.contentFontSize !== undefined
      ? { '--cinna-popup-content-font-size': normalizePopupCssValue(styles.contentFontSize) }
      : null),
    ...(styles.menuColor ? { '--cinna-popup-menu-color': styles.menuColor } : null),
    ...(styles.menuFontSize !== undefined
      ? { '--cinna-popup-menu-font-size': normalizePopupCssValue(styles.menuFontSize) }
      : null),
    ...(styles.menuHoverColor ? { '--cinna-popup-menu-hover-color': styles.menuHoverColor } : null),
    ...(styles.menuHoverBackgroundColor
      ? { '--cinna-popup-menu-hover-bg': styles.menuHoverBackgroundColor }
      : null),
    ...(styles.menuActiveColor
      ? { '--cinna-popup-menu-active-color': styles.menuActiveColor }
      : null),
    ...(styles.menuActiveBackgroundColor
      ? { '--cinna-popup-menu-active-bg': styles.menuActiveBackgroundColor }
      : null),
    ...(styles.menuDisabledColor
      ? { '--cinna-popup-menu-disabled-color': styles.menuDisabledColor }
      : null),
    ...(styles.dividerColor ? { '--cinna-popup-divider-color': styles.dividerColor } : null),
    ...(styles.arrowColor ? { '--cinna-popup-arrow-bg': styles.arrowColor } : null),
    ...(styles.arrowBorderColor ? { '--cinna-popup-arrow-border': styles.arrowBorderColor } : null),
    ...(styles.triggerColor ? { '--cinna-popup-trigger-color': styles.triggerColor } : null),
    ...(styles.triggerBackgroundColor
      ? { '--cinna-popup-trigger-bg': styles.triggerBackgroundColor }
      : null),
    ...(styles.triggerBorderColor
      ? { '--cinna-popup-trigger-border': styles.triggerBorderColor }
      : null),
    ...(styles.triggerFontSize !== undefined
      ? { '--cinna-popup-trigger-font-size': normalizePopupCssValue(styles.triggerFontSize) }
      : null),
    ...(styles.triggerShadow ? { '--cinna-popup-trigger-shadow': styles.triggerShadow } : null),
  } as React.CSSProperties;
};

export const Popup = React.forwardRef<HTMLSpanElement, PopupProps>(
  (
    {
      mode = 'popover',
      label,
      items,
      menu,
      title,
      content,
      description,
      trigger = mode === 'menu' || mode === 'confirm' ? 'click' : 'hover',
      placement = 'bottom',
      align = 'center',
      arrow = false,
      open,
      defaultOpen = false,
      disabled: disabledProp = false,
      closeOnSelect = true,
      overlayClassName,
      overlayStyle,
      styles,
      onOpenChange,
      onSelect,
      okText = 'OK',
      cancelText = 'Cancel',
      onConfirm,
      onCancel,
      okButtonProps,
      cancelButtonProps,
      className,
      children,
      style,
      onMouseEnter,
      onMouseLeave,
      onFocus,
      onBlur,
      onContextMenu,
      ...rest
    },
    ref,
  ) => {
    const disabled = useDisabled(disabledProp);
    const rootRef = useRef<HTMLSpanElement | null>(null);
    const panelRef = useRef<HTMLSpanElement | null>(null);
    const shiftRef = useRef({ x: 0, y: 0 });
    const [shift, setShift] = useState({ x: 0, y: 0 });
    const [confirming, setConfirming] = useState(false);
    const [confirmError, setConfirmError] = useState('');
    const confirmationVersion = useRef(0),
      openNow = useRef(false);
    useEffect(
      () => () => {
        confirmationVersion.current++;
      },
      [],
    );
    const panelId = useId();
    const [innerOpen, setInnerOpen] = useState(defaultOpen);
    const [contextPosition, setContextPosition] = useState<{ x: number; y: number } | null>(null);
    const isControlled = open !== undefined;
    const actualOpen = !disabled && (isControlled ? open : innerOpen);
    openNow.current = !!actualOpen;
    const isContextMenu = trigger === 'contextMenu';
    useLayoutEffect(() => {
      if (!actualOpen) {
        confirmationVersion.current++;
        setConfirming(false);
        shiftRef.current = { x: 0, y: 0 };
        setShift({ x: 0, y: 0 });
        setConfirmError('');
        return;
      }
      const update = () => {
        const rect = panelRef.current?.getBoundingClientRect();
        if (!rect) return;
        const left = rect.left - shiftRef.current.x,
          right = rect.right - shiftRef.current.x;
        const top = rect.top - shiftRef.current.y,
          bottom = rect.bottom - shiftRef.current.y;
        const x =
          left < 12
            ? 12 - left
            : right > window.innerWidth - 12
              ? window.innerWidth - 12 - right
              : 0;
        const y =
          top < 12
            ? 12 - top
            : bottom > window.innerHeight - 12
              ? window.innerHeight - 12 - bottom
              : 0;
        shiftRef.current = { x, y };
        setShift((current) => (current.x === x && current.y === y ? current : { x, y }));
      };
      update();
      const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(update);
      if (panelRef.current) observer?.observe(panelRef.current);
      window.addEventListener('resize', update);
      window.addEventListener('scroll', update, true);
      return () => {
        observer?.disconnect();
        window.removeEventListener('resize', update);
        window.removeEventListener('scroll', update, true);
      };
    }, [actualOpen, placement, align, contextPosition]);

    const setRefs = (node: HTMLSpanElement | null) => {
      rootRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) ref.current = node;
    };

    const setPopupOpen = (nextOpen: boolean) => {
      if (disabled && nextOpen) return;
      if (!nextOpen || !actualOpen) {
        confirmationVersion.current++;
        setConfirming(false);
        setConfirmError('');
      }
      if (!isControlled) setInnerOpen(nextOpen);
      if (!nextOpen) setContextPosition(null);
      onOpenChange?.(nextOpen);
    };

    useEscapeLayer(!!actualOpen, rootRef, () => {
      setPopupOpen(false);
      rootRef.current
        ?.querySelector<HTMLElement>(
          '.cinna-popup__trigger button, .cinna-popup__trigger [tabindex]',
        )
        ?.focus();
    });
    useEffect(() => {
      if (!actualOpen) return undefined;
      const close = (event: MouseEvent | KeyboardEvent) => {
        if (event instanceof KeyboardEvent && event.key !== 'Escape') return;
        if (event instanceof MouseEvent && rootRef.current?.contains(event.target as Node)) return;
        setPopupOpen(false);
      };
      document.addEventListener('mousedown', close);
      return () => {
        document.removeEventListener('mousedown', close);
      };
    }, [actualOpen, trigger, disabled, isControlled, onOpenChange]);

    const select = (key: string) => {
      onSelect?.(key);
      if (closeOnSelect) setPopupOpen(false);
    };

    const contextStyle =
      isContextMenu && contextPosition
        ? ({
            '--cinna-popup-context-x': `${contextPosition.x}px`,
            '--cinna-popup-context-y': `${contextPosition.y}px`,
          } as React.CSSProperties)
        : undefined;

    const panelClassName = cx(
      'cinna-popup__panel',
      `cinna-popup__panel--${mode}`,
      overlayClassName,
    );

    const panel = (
      <span
        ref={panelRef}
        id={panelId}
        className={panelClassName}
        role={mode === 'tooltip' ? 'tooltip' : undefined}
        style={{ ...contextStyle, ...overlayStyle, translate: shift.x + 'px ' + shift.y + 'px' }}
        aria-hidden={!actualOpen}
        {...(!actualOpen ? { inert: '' } : {})}
      >
        <span className="cinna-popup__surface">
          {mode === 'tooltip' ? (
            <span className="cinna-popup__content">{title ?? content}</span>
          ) : mode === 'menu' ? (
            items ? (
              <Menu items={items} onSelect={select} />
            ) : (
              menu
            )
          ) : mode === 'confirm' ? (
            <>
              {title && <strong className="cinna-popup__title">{title}</strong>}
              {description && <span className="cinna-popup__content">{description}</span>}
              {content && <span className="cinna-popup__content">{content}</span>}
              {confirmError && (
                <span className="cinna-popup__error" role="alert">
                  {confirmError}
                </span>
              )}
              <span className="cinna-popup__actions">
                <Button
                  size="small"
                  variant="cream"
                  {...cancelButtonProps}
                  onClick={(event) => {
                    cancelButtonProps?.onClick?.(event);
                    if (event.defaultPrevented) return;
                    setPopupOpen(false);
                    onCancel?.();
                  }}
                >
                  {cancelButtonProps?.children ?? cancelText}
                </Button>
                <Button
                  size="small"
                  variant="primary"
                  {...okButtonProps}
                  loading={confirming || okButtonProps?.loading}
                  onClick={async (event) => {
                    okButtonProps?.onClick?.(event);
                    if (event.defaultPrevented || confirming) return;
                    const version = ++confirmationVersion.current;
                    setConfirming(true);
                    setConfirmError('');
                    try {
                      const result = onConfirm?.();
                      if (result && typeof result.then === 'function') await result;
                      if (version === confirmationVersion.current && openNow.current)
                        setPopupOpen(false);
                    } catch (error) {
                      if (version === confirmationVersion.current && openNow.current)
                        setConfirmError(
                          error instanceof Error ? error.message : 'Unable to confirm. Try again.',
                        );
                    } finally {
                      if (version === confirmationVersion.current) setConfirming(false);
                    }
                  }}
                >
                  {okButtonProps?.children ?? okText}
                </Button>
              </span>
            </>
          ) : (
            <>
              {title && <strong className="cinna-popup__title">{title}</strong>}
              {content && <span className="cinna-popup__content">{content}</span>}
            </>
          )}
        </span>
      </span>
    );

    const triggerNode =
      label !== undefined ? (
        <button
          type="button"
          className={cx('cinna-popup__trigger', 'cinna-popup__trigger--button')}
          disabled={disabled}
          aria-haspopup={mode === 'tooltip' ? undefined : mode === 'menu' ? 'menu' : 'dialog'}
          aria-expanded={actualOpen}
          aria-describedby={mode === 'tooltip' && actualOpen ? panelId : undefined}
          onClick={trigger === 'click' ? () => setPopupOpen(!actualOpen) : undefined}
        >
          {label}
        </button>
      ) : (
        <span className="cinna-popup__trigger cinna-popup__trigger--custom">
          {React.isValidElement<React.HTMLAttributes<HTMLElement> & { disabled?: boolean }>(
            children,
          ) ? (
            React.cloneElement(children, {
              role: children.props.role ?? 'button',
              'aria-haspopup': mode === 'tooltip' ? undefined : mode === 'menu' ? 'menu' : 'dialog',
              'aria-expanded': mode === 'tooltip' ? undefined : actualOpen,
              'aria-describedby': mode === 'tooltip' && actualOpen ? panelId : undefined,
              'aria-disabled': disabled || undefined,
              disabled: disabled || children.props.disabled,
              tabIndex: disabled ? -1 : (children.props.tabIndex ?? 0),
              onClick: (event: React.MouseEvent<HTMLElement>) => {
                if (disabled) return;
                children.props.onClick?.(event);
                if (!event.defaultPrevented && trigger === 'click') setPopupOpen(!actualOpen);
              },
              onKeyDown: (event: React.KeyboardEvent<HTMLElement>) => {
                children.props.onKeyDown?.(event);
                if (
                  !disabled &&
                  !event.defaultPrevented &&
                  trigger === 'click' &&
                  event.currentTarget.tagName !== 'BUTTON' &&
                  ['Enter', ' '].includes(event.key)
                ) {
                  event.preventDefault();
                  setPopupOpen(!actualOpen);
                }
              },
            })
          ) : (
            <button
              type="button"
              disabled={disabled}
              aria-expanded={actualOpen}
              onClick={trigger === 'click' ? () => setPopupOpen(!actualOpen) : undefined}
            >
              {children}
            </button>
          )}
        </span>
      );

    return (
      <span
        ref={setRefs}
        className={cx(
          'cinna-popup',
          `cinna-popup--${mode}`,
          `cinna-popup--${trigger}`,
          `cinna-popup--${placement}`,
          `cinna-popup--align-${align}`,
          arrow && 'cinna-popup--arrow',
          actualOpen && 'cinna-popup--open',
          disabled && 'cinna-popup--disabled',
          className,
        )}
        style={{ ...getPopupStyleVars(styles), ...style }}
        onMouseEnter={(event) => {
          onMouseEnter?.(event);
          if (!event.defaultPrevented && trigger === 'hover') setPopupOpen(true);
        }}
        onMouseLeave={(event) => {
          onMouseLeave?.(event);
          if (
            !event.defaultPrevented &&
            trigger === 'hover' &&
            !rootRef.current?.contains(document.activeElement)
          )
            setPopupOpen(false);
        }}
        onFocus={(event) => {
          onFocus?.(event);
          if (
            !event.defaultPrevented &&
            trigger === 'hover' &&
            !event.currentTarget.contains(event.relatedTarget as Node)
          )
            setPopupOpen(true);
        }}
        onBlur={(event) => {
          onBlur?.(event);
          if (
            !event.defaultPrevented &&
            trigger === 'hover' &&
            !event.currentTarget.contains(event.relatedTarget as Node)
          )
            setPopupOpen(false);
        }}
        onContextMenu={(event) => {
          onContextMenu?.(event);
          if (!event.defaultPrevented && isContextMenu) {
            event.preventDefault();
            setContextPosition({ x: event.clientX, y: event.clientY });
            setPopupOpen(true);
          }
        }}
        {...rest}
      >
        {triggerNode}
        {panel}
      </span>
    );
  },
);

Popup.displayName = 'Popup';
