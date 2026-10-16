import React from 'react';
import type { CinnaSize } from '../shared';

export interface InputNumberProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type' | 'size' | 'onChange' | 'value' | 'defaultValue'
> {
  value?: number | string | null;
  defaultValue?: number | string | null;
  controlSize?: CinnaSize;
  controls?: boolean;
  onChange?: (value: number | null) => void;
  precision?: number;
}
