import React from 'react';
import type { CinnaSize } from '../shared';

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: React.ReactNode;
}

export interface RadioGroupOption {
  label: React.ReactNode;
  value: string;
  disabled?: boolean;
}

export interface RadioGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  options: RadioGroupOption[];
  value?: string;
  defaultValue?: string;
  name?: string;
  onChange?: (value: string) => void;
  direction?: 'horizontal' | 'vertical';
  optionType?: 'default' | 'button';
  size?: CinnaSize;
  disabled?: boolean;
}
