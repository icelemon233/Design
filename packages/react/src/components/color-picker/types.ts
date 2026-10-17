import React from 'react';

export interface ColorPickerProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type' | 'size' | 'onChange'
> {
  presets?: string[];
  showText?: boolean;
  onChange?: (value: string) => void;
}
