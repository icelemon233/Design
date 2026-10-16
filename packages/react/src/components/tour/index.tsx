import React, { useEffect, useState } from 'react';
import { useControllable } from '../../hooks/useControllable';
import { useIsomorphicLayoutEffect as useLayoutEffect } from '../../hooks/useIsomorphicLayoutEffect';
import { Dialog } from '../../internal/Dialog';
import { cx } from '../../utils/cx';
import type { TourProps } from './types';
export type { TourProps, TourStep } from './types';

export const Tour = React.forwardRef<HTMLDivElement, TourProps>(
  (
    {
      open: openProp,
      current,
      defaultCurrent = 0,
      steps,
      onChange,
      onClose,
      onFinish,
      className,
      style,
      ...rest
    },
    ref,
  ) => {
    const [open, setOpen] = useControllable(openProp, true);
    const [inner, setStep] = useControllable(current, defaultCurrent, onChange);
    const active = Math.max(0, Math.min(steps.length - 1, inner)),
      step = steps[active];
    const [rect, setRect] = useState<DOMRect | null>(null);
    const resolve = () => {
      const target = step?.target;
      if (typeof target === 'function') return target();
      if (typeof target === 'string') {
        try {
          return document.querySelector<HTMLElement>(target);
        } catch {
          return null;
        }
      }
      return target ?? null;
    };
    useLayoutEffect(() => {
      if (!open || !step?.target) {
        setRect(null);
        return;
      }
      const update = () => setRect(resolve()?.getBoundingClientRect() ?? null);
      resolve()?.scrollIntoView?.({ block: 'center', behavior: 'instant' as ScrollBehavior });
      update();
      window.addEventListener('resize', update);
      window.addEventListener('scroll', update, true);
      return () => {
        window.removeEventListener('resize', update);
        window.removeEventListener('scroll', update, true);
      };
    }, [open, active, step?.target]);
    useEffect(() => {
      if (!open || step?.target) return;
      const close = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          setOpen(false);
          onClose?.();
        }
      };
      document.addEventListener('keydown', close);
      return () => document.removeEventListener('keydown', close);
    }, [open, step?.target, onClose, setOpen]);
    if (!open || !step) return null;
    const close = () => {
      setOpen(false);
      onClose?.();
    };
    const finish = () => {
      onFinish?.();
      close();
    };
    const content = (
      <>
        <button className="cinna-tour__close" type="button" aria-label="Close tour" onClick={close}>
          ×
        </button>
        <strong>{step.title}</strong>
        {step.description && <span>{step.description}</span>}
        <small aria-live="polite">
          {active + 1} / {steps.length}
        </small>
        <span className="cinna-tour__actions">
          <button type="button" disabled={active <= 0} onClick={() => setStep(active - 1)}>
            Prev
          </button>
          {active < steps.length - 1 ? (
            <button type="button" onClick={() => setStep(active + 1)}>
              Next
            </button>
          ) : (
            <button type="button" onClick={finish}>
              Done
            </button>
          )}
        </span>
      </>
    );
    if (!step.target)
      return (
        <div {...rest} ref={ref} className={cx('cinna-tour', className)} style={style}>
          {content}
        </div>
      );
    const width = Math.min(320, window.innerWidth - 32);
    const left = rect
      ? Math.max(16, Math.min(window.innerWidth - width - 16, rect.left))
      : Math.max(16, (window.innerWidth - width) / 2);
    const below = rect ? rect.bottom + 16 : window.innerHeight / 2 - 100;
    const top =
      rect && step.placement === 'top'
        ? Math.max(16, rect.top - 200)
        : Math.max(16, Math.min(window.innerHeight - 220, below));
    return (
      <Dialog
        {...rest}
        ref={ref}
        open={open}
        onDismiss={close}
        maskClassName="cinna-overlay cinna-tour-overlay"
        className={cx('cinna-tour', 'cinna-tour--positioned', className)}
        style={{ position: 'fixed', left, top, width, ...style }}
        aria-label={typeof step.title === 'string' ? step.title : 'Guided tour'}
      >
        {rect && (
          <span
            className="cinna-tour__spotlight"
            aria-hidden="true"
            style={{
              position: 'fixed',
              left: rect.left - 6,
              top: rect.top - 6,
              width: rect.width + 12,
              height: rect.height + 12,
            }}
          />
        )}
        {content}
      </Dialog>
    );
  },
);

Tour.displayName = 'Tour';
