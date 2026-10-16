import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNoticeQueue } from '../../hooks/useNoticeQueue';
import { usePortalTheme } from '../../internal/ThemeContext';
import { cx } from '../../utils/cx';
import { statusIcon } from '../shared';
import type {
  NotificationApi,
  NotificationConfig,
  NotificationPlacement,
  NotificationProps,
} from './types';
export type {
  NotificationApi,
  NotificationConfig,
  NotificationPlacement,
  NotificationProps,
} from './types';

const NotificationBase = React.forwardRef<HTMLDivElement, NotificationProps>(
  (
    {
      title,
      content,
      type = 'info',
      icon,
      actions,
      closable,
      onClose,
      duration = 0,
      className,
      ...rest
    },
    ref,
  ) => {
    const [visible, setVisible] = useState(true);
    const closeRef = useRef(onClose);
    closeRef.current = onClose;
    useEffect(() => {
      if (!duration || !visible) return;
      const timer = setTimeout(() => {
        setVisible(false);
        closeRef.current?.();
      }, duration * 1000);
      return () => clearTimeout(timer);
    }, [duration, visible]);
    if (!visible) return null;
    return (
      <div
        ref={ref}
        className={cx(
          'cinna-notification',
          `cinna-notification--${type}`,
          closable && 'cinna-notification--closable',
          className,
        )}
        role="status"
        {...rest}
      >
        <strong>
          {icon ?? statusIcon(type)} {title}
        </strong>
        <span>{content}</span>
        {actions && <div className="cinna-notification__actions">{actions}</div>}
        {closable && (
          <button
            type="button"
            className="cinna-notification__close"
            aria-label="Close notification"
            onClick={() => {
              setVisible(false);
              onClose?.();
            }}
          >
            x
          </button>
        )}
      </div>
    );
  },
);

NotificationBase.displayName = 'Notification';

export function useNotification(
  options: { placement?: NotificationPlacement } = {},
): [NotificationApi, React.ReactNode] {
  const theme = usePortalTheme();
  const queue = useNoticeQueue<NotificationConfig>(4.5);
  const api = useMemo<NotificationApi>(
    () => ({ open: queue.open, destroy: queue.destroy }),
    [queue.open, queue.destroy],
  );
  const holder =
    typeof document === 'undefined'
      ? null
      : createPortal(
          <div
            className={
              'cinna-notification-stack cinna-notification-stack--' +
              (options.placement ?? 'topRight')
            }
            style={{ fontFamily: 'var(--cinna-font-family)', ...theme }}
            aria-label="Notifications"
          >
            {queue.items.map((item) => (
              <NotificationBase
                {...item}
                key={item.key}
                duration={0}
                closable
                onClose={() => queue.destroy(item.key)}
              />
            ))}
          </div>,
          document.body,
        );
  return [api, holder];
}

export const Notification = Object.assign(NotificationBase, { useNotification });
