import React from 'react';
import { Dialog } from '../../internal/Dialog';
import { cx } from '../../utils/cx';
import type { DrawerProps } from './types';
export type { DrawerProps } from './types';

export const Drawer = React.forwardRef<HTMLDivElement, DrawerProps>(
  (
    {
      open,
      title,
      placement = 'right',
      onClose,
      extra,
      width,
      height,
      maskClosable = true,
      keyboard = true,
      closable = true,
      footer,
      className,
      children,
      style,
      ...rest
    },
    ref,
  ) => {
    const titleId = React.useId();
    return (
      <Dialog
        ref={ref}
        open={open}
        maskClassName="cinna-overlay cinna-overlay--drawer"
        onDismiss={onClose}
        maskClosable={maskClosable}
        keyboard={keyboard}
        className={cx('cinna-drawer', `cinna-drawer--${placement}`, className)}
        aria-labelledby={title ? titleId : undefined}
        aria-label={title ? undefined : 'Drawer'}
        style={{ width, height, ...style }}
        {...rest}
      >
        <div className="cinna-drawer__header">
          <strong id={titleId}>{title}</strong>
          <span className="cinna-drawer__extra">
            {extra}
            {closable && (
              <button type="button" aria-label="Close drawer" onClick={onClose}>
                ×
              </button>
            )}
          </span>
        </div>
        <div className="cinna-drawer__body">{children}</div>
        {footer && <div className="cinna-drawer__footer">{footer}</div>}
      </Dialog>
    );
  },
);
