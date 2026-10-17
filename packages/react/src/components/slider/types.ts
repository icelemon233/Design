import React from 'react';

export interface SliderProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type' | 'size'
> {
  showValue?: boolean;
  marks?: Record<number, React.ReactNode>;
  tooltip?: boolean;
}
