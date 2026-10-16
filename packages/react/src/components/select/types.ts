import React from 'react';
import type { CinnaSize, CinnaStatus } from '../shared';

export interface SelectOption {
  label: React.ReactNode;
  value: string;
  disabled?: boolean;
  searchLabel?: string;
}

export interface SelectProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'onChange' | 'defaultValue'
> {
  options: SelectOption[];
  controlSize?: CinnaSize;
  placeholder?: string;
  value?: string | string[];
  defaultValue?: string | string[];
  onChange?: (value: string | string[]) => void;
  allowClear?: boolean;
  disabled?: boolean;
  mode?: 'single' | 'multiple';
  showSearch?: boolean;
  notFoundContent?: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  status?: Exclude<CinnaStatus, 'info'>;
  loading?: boolean;
}
