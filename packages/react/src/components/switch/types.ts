import React from 'react';
import type { CinnaSize } from '../shared';

export interface SwitchProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'onChange'
> {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  size?: CinnaSize;
  checkedChildren?: React.ReactNode;
  unCheckedChildren?: React.ReactNode;
  loading?: boolean;
}
