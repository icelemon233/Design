import React from 'react';
import type { CinnaStatus } from '../shared';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: CinnaStatus;
  message: React.ReactNode;
  description?: React.ReactNode;
  closable?: boolean;
  icon?: React.ReactNode;
  showIcon?: boolean;
  action?: React.ReactNode;
  closeText?: React.ReactNode;
  banner?: boolean;
  onClose?: () => void;
}
