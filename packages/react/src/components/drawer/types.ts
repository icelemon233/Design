import React from 'react';

export interface DrawerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  open: boolean;
  title?: React.ReactNode;
  placement?: 'left' | 'right' | 'top' | 'bottom';
  onClose?: () => void;
  extra?: React.ReactNode;
  width?: number | string;
  height?: number | string;
  maskClosable?: boolean;
  keyboard?: boolean;
  closable?: boolean;
  footer?: React.ReactNode;
}
