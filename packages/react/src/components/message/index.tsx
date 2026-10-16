import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNoticeQueue } from '../../hooks/useNoticeQueue';
import { usePortalTheme } from '../../internal/ThemeContext';
import { cx } from '../../utils/cx';
import { statusIcon } from '../shared';
import type { MessageApi, MessageConfig, MessageProps } from './types';
export type { MessageApi, MessageConfig, MessageProps } from './types';

const MessageBase = React.forwardRef<HTMLDivElement, MessageProps>(
  ({ type = 'info', content, icon, closable, onClose, duration = 0, className, ...rest }, ref) => {
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
        className={cx('cinna-message', `cinna-message--${type}`, className)}
        role="status"
        {...rest}
      >
        {icon ?? statusIcon(type)} <span>{content}</span>
        {closable && (
          <button
            type="button"
            aria-label="Close message"
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

MessageBase.displayName = 'Message';

export function useMessage(): [MessageApi, React.ReactNode] {
  const theme = usePortalTheme();
  const queue = useNoticeQueue<MessageConfig>(3);
  const api = useMemo<MessageApi>(
    () => ({
      open: queue.open,
      destroy: queue.destroy,
      info: (content, duration) => queue.open({ type: 'info', content, duration }),
      success: (content, duration) => queue.open({ type: 'success', content, duration }),
      warning: (content, duration) => queue.open({ type: 'warning', content, duration }),
      error: (content, duration) => queue.open({ type: 'error', content, duration }),
    }),
    [queue.open, queue.destroy],
  );
  const holder =
    typeof document === 'undefined'
      ? null
      : createPortal(
          <div
            className="cinna-message-stack"
            style={{ fontFamily: 'var(--cinna-font-family)', ...theme }}
            aria-label="Messages"
          >
            {queue.items.map((item) => (
              <MessageBase
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

export const Message = Object.assign(MessageBase, { useMessage });
