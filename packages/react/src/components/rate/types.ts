import React from 'react';

export interface RateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  count?: number;
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  allowClear?: boolean;
  allowHalf?: boolean;
  tooltips?: string[];
  character?: React.ReactNode | ((index: number) => React.ReactNode);
  disabled?: boolean;
}
