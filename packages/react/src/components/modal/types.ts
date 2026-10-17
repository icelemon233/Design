import React from 'react';

export interface ModalProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  open: boolean;
  title?: React.ReactNode;
  onCancel?: () => void;
  onOk?: () => void | Promise<void>;
  onOkError?: (error: unknown) => void;
  confirmLoading?: boolean;
  keyboard?: boolean;
  closable?: boolean;
  footer?: React.ReactNode;
  okText?: React.ReactNode;
  cancelText?: React.ReactNode;
  maskClosable?: boolean;
  width?: number | string;
  centered?: boolean;
}
