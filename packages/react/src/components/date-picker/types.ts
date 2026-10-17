import React from 'react';
import type { CinnaSize, CinnaStatus } from '../shared';

export interface DatePickerProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type' | 'size'
> {
  controlSize?: CinnaSize;
  status?: Exclude<CinnaStatus, 'info'>;
  allowClear?: boolean;
  disabledDate?: (date: Date) => boolean;
}
