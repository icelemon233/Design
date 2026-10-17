import React from 'react';
import type { CinnaSize, CinnaStatus } from '../shared';

export interface TimePickerProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type' | 'size'
> {
  controlSize?: CinnaSize;
  status?: Exclude<CinnaStatus, 'info'>;
  allowClear?: boolean;
  hourStep?: number;
  minuteStep?: number;
  use12Hours?: boolean;
  disabledHours?: () => number[];
  disabledMinutes?: (hour: number) => number[];
}
