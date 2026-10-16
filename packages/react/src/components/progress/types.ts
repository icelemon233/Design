import React from 'react';
import type { CinnaStatus } from '../shared';

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  percent?: number;
  status?: Exclude<CinnaStatus, 'info'> | 'normal';
  showInfo?: boolean;
  type?: 'line' | 'circle';
  strokeColor?: string;
  format?: (percent: number) => React.ReactNode;
}
