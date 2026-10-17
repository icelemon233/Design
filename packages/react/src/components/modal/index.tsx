import React from 'react';
import { Dialog } from '../../internal/Dialog';
import { cx } from '../../utils/cx';
import { Button } from '../button';
import type { ModalProps } from './types';
export type { ModalProps } from './types';

export const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      open,
      title,
      onCancel,
      onOk,
      onOkError,
      confirmLoading,
      keyboard = true,
      closable = true,
      footer,
      okText = 'OK',
      cancelText = 'Cancel',
      maskClosable = true,
      width,
      centered = true,
      className,
      children,
      style,
      ...rest
    },
    ref,
  ) => {
    const titleId = React.useId();
    const [pending, setPending] = React.useState(false);
    const [error, setError] = React.useState('');
    const version = React.useRef(0),
      openNow = React.useRef(open);
    openNow.current = open;
    React.useEffect(
      () => () => {
        version.current++;
      },
      [],
    );
    const cancel = () => {
      version.current++;
      setPending(false);
      setError('');
      onCancel?.();
    };
    React.useEffect(() => {
      if (!open) {
        version.current++;
        setError('');
        setPending(false);
      }
    }, [open]);
    const confirm = async () => {
      if (pending || confirmLoading) return;
      const request = ++version.current;
      setError('');
      setPending(true);
      try {
        await onOk?.();
      } catch (cause) {
        if (request === version.current && openNow.current) {
          setError(cause instanceof Error ? cause.message : 'Unable to confirm. Try again.');
          onOkError?.(cause);
        }
      } finally {
        if (request === version.current) setPending(false);
      }
    };
    return (
      <Dialog
        open={open}
        ref={ref}
        maskClassName={cx('cinna-overlay', centered && 'cinna-overlay--centered')}
        maskClosable={maskClosable}
        keyboard={keyboard}
        onDismiss={cancel}
        className={cx('cinna-modal', className)}
        aria-labelledby={title ? titleId : undefined}
        aria-label={title ? undefined : 'Dialog'}
        style={{ width, ...style }}
        {...rest}
      >
        <div className="cinna-modal__header">
          <strong id={titleId}>{title}</strong>
          {closable && (
            <button type="button" aria-label="Close modal" onClick={cancel}>
              ×
            </button>
          )}
        </div>
        <div className="cinna-modal__body">{children}</div>
        {error && (
          <p role="alert" className="cinna-modal__error">
            {error}
          </p>
        )}
        {footer !== null && (
          <div className="cinna-modal__footer">
            {footer !== undefined ? (
              footer
            ) : (
              <>
                <Button variant="cream" onClick={cancel}>
                  {cancelText}
                </Button>
                <Button onClick={confirm} loading={pending || confirmLoading}>
                  {okText}
                </Button>
              </>
            )}
          </div>
        )}
      </Dialog>
    );
  },
);

Modal.displayName = 'Modal';
