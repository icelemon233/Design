import React from 'react';

export interface TourStep {
  title: React.ReactNode;
  description?: React.ReactNode;
  target?: HTMLElement | string | (() => HTMLElement | null);
  placement?: 'top' | 'bottom';
}

export interface TourProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  open?: boolean;
  current?: number;
  defaultCurrent?: number;
  steps: TourStep[];
  onChange?: (current: number) => void;
  onClose?: () => void;
  onFinish?: () => void;
}
