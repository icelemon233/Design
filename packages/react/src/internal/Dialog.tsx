import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useEscapeLayer } from '../hooks/useEscapeLayer';
import { usePortalTheme } from './ThemeContext';
const dialogs: symbol[] = [];
let savedOverflow = '';
const focusable =
  'button:not(:disabled),[href],input:not(:disabled),select:not(:disabled),textarea:not(:disabled),[tabindex]';
export interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onDismiss?: () => void;
  maskClosable?: boolean;
  keyboard?: boolean;
  maskClassName?: string;
}
export const Dialog = React.forwardRef<HTMLDivElement, DialogProps>(
  (
    {
      open,
      onDismiss,
      maskClosable = true,
      keyboard = true,
      maskClassName,
      children,
      onClick,
      ...props
    },
    forwardedRef,
  ) => {
    const panel = useRef<HTMLDivElement | null>(null);
    const [mounted, setMounted] = useState(false);
    const theme = usePortalTheme();
    const dismissRef = useRef(onDismiss);
    dismissRef.current = onDismiss;
    const openRef = useRef(open);
    openRef.current = open;
    const opener = useRef<HTMLElement | null>(
      typeof document === 'undefined' ? null : (document.activeElement as HTMLElement),
    );
    useEffect(() => {
      setMounted(true);
      const remember = (event: FocusEvent) => {
        if (!openRef.current) opener.current = event.target as HTMLElement;
      };
      document.addEventListener('focusin', remember);
      return () => document.removeEventListener('focusin', remember);
    }, []);
    useEscapeLayer(open && mounted, panel, () => {
      if (keyboard) dismissRef.current?.();
    });
    useEffect(() => {
      if (!open || !mounted) return;
      const token = Symbol('dialog');
      if (!dialogs.length) {
        savedOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
      }
      dialogs.push(token);
      const targets = () => {
        const candidates = Array.from(
          panel.current?.querySelectorAll<HTMLElement>(focusable) ?? [],
        ).filter((node) => {
          if (
            node.tabIndex < 0 ||
            node.closest('[hidden],[inert]') ||
            (node instanceof HTMLInputElement && node.type === 'hidden')
          )
            return false;
          for (
            let current: HTMLElement | null = node;
            current && current !== panel.current?.parentElement;
            current = current.parentElement
          ) {
            const style = getComputedStyle(current);
            if (style.display === 'none' || style.visibility === 'hidden') return false;
          }
          return true;
        });
        return candidates.filter((node) => {
          if (!(node instanceof HTMLInputElement) || node.type !== 'radio' || !node.name)
            return true;
          const group = candidates.filter(
            (item): item is HTMLInputElement =>
              item instanceof HTMLInputElement && item.type === 'radio' && item.name === node.name,
          );
          return node === (group.find((item) => item.checked) ?? group[0]);
        });
      };
      if (!panel.current?.contains(document.activeElement))
        (targets()[0] ?? panel.current)?.focus();
      const keydown = (event: KeyboardEvent) => {
        if (dialogs[dialogs.length - 1] !== token || event.key !== 'Tab' || event.defaultPrevented)
          return;
        const nodes = targets(),
          first = nodes[0],
          last = nodes[nodes.length - 1];
        if (!first) {
          event.preventDefault();
          panel.current?.focus();
        } else if (
          event.shiftKey &&
          (document.activeElement === first || !panel.current?.contains(document.activeElement))
        ) {
          event.preventDefault();
          last.focus();
        } else if (
          !event.shiftKey &&
          (document.activeElement === last || !panel.current?.contains(document.activeElement))
        ) {
          event.preventDefault();
          first.focus();
        }
      };
      const contain = (event: FocusEvent) => {
        if (dialogs[dialogs.length - 1] === token && !panel.current?.contains(event.target as Node))
          (targets()[0] ?? panel.current)?.focus();
      };
      document.addEventListener('keydown', keydown, true);
      document.addEventListener('focusin', contain);
      return () => {
        const index = dialogs.indexOf(token);
        if (index >= 0) dialogs.splice(index, 1);
        if (!dialogs.length) document.body.style.overflow = savedOverflow;
        document.removeEventListener('keydown', keydown, true);
        document.removeEventListener('focusin', contain);
        if (opener.current?.isConnected) opener.current.focus();
      };
    }, [open, mounted]);
    if (!open || !mounted) return null;
    return createPortal(
      <div
        className={maskClassName}
        style={{ fontFamily: 'var(--cinna-font-family)', ...theme }}
        onClick={(event) => {
          if (maskClosable && event.target === event.currentTarget) onDismiss?.();
        }}
      >
        <div
          {...props}
          ref={(node) => {
            panel.current = node;
            if (typeof forwardedRef === 'function') forwardedRef(node);
            else if (forwardedRef) forwardedRef.current = node;
          }}
          role="dialog"
          aria-modal="true"
          tabIndex={-1}
          onClick={(event) => {
            event.stopPropagation();
            onClick?.(event);
          }}
        >
          {children}
        </div>
      </div>,
      document.body,
    );
  },
);
Dialog.displayName = 'Dialog';
