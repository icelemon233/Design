import React, { useState } from 'react';
import { cx } from '../../utils/cx';
import { Icon } from '../icon';
import { statusIcon } from '../shared';
import type { AlertProps } from './types';
export type { AlertProps } from './types';

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      type = 'info',
      message,
      description,
      closable,
      icon,
      showIcon = true,
      action,
      closeText,
      banner,
      onClose,
      className,
      ...rest
    },
    ref,
  ) => {
    const [visible, setVisible] = useState(true);
    if (!visible) return null;

    return (
      <div
        ref={ref}
        className={cx(
          'cinna-alert',
          `cinna-alert--${type}`,
          banner && 'cinna-alert--banner',
          className,
        )}
        role={type === 'error' ? 'alert' : 'status'}
        {...rest}
      >
        {showIcon && (
          <span className="cinna-alert__icon" aria-hidden="true">
            {icon ?? statusIcon(type)}
          </span>
        )}
        <div className="cinna-alert__content">
          <div className="cinna-alert__message">{message}</div>
          {description && <div className="cinna-alert__description">{description}</div>}
        </div>
        {action && <div className="cinna-alert__action">{action}</div>}
        {closable && (
          <button
            className="cinna-alert__close"
            type="button"
            aria-label="Close alert"
            onClick={() => {
              setVisible(false);
              onClose?.();
            }}
          >
            {closeText ?? <Icon name={type === 'error' ? 'close-red' : 'close-blue'} size={12} />}
          </button>
        )}
      </div>
    );
  },
);
