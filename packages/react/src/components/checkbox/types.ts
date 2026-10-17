import React from 'react';
import type { CinnaSize } from '../shared';

export interface CheckboxProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type' | 'size'
> {
  label?: React.ReactNode;
  indeterminate?: boolean;
  size?: CinnaSize;
  animation?: CheckboxAnimation;
  labelColor?: string;
  checkedColor?: string;
  boxColor?: string;
  borderColor?: string;
  fontSize?: number | string;
  fontWeight?: React.CSSProperties['fontWeight'];
  ripple?: boolean;
  rippleParticleColors?: string | string[];
  rippleParticleOpacity?: number;
}

export interface CheckboxGroupOption {
  label: React.ReactNode;
  value: string;
  disabled?: boolean;
  indeterminate?: boolean;
}

export interface CheckboxGroupProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'onChange' | 'defaultValue'
> {
  options: CheckboxGroupOption[];
  value?: string[];
  defaultValue?: string[];
  name?: string;
  disabled?: boolean;
  direction?: 'horizontal' | 'vertical';
  size?: CinnaSize;
  animation?: CheckboxAnimation;
  onChange?: (checkedValues: string[]) => void;
  labelColor?: string;
  checkedColor?: string;
  boxColor?: string;
  borderColor?: string;
  fontSize?: number | string;
  fontWeight?: React.CSSProperties['fontWeight'];
  ripple?: boolean;
  rippleParticleColors?: string | string[];
  rippleParticleOpacity?: number;
}

export type CheckboxAnimation = 'particles' | 'pop' | 'handwriting' | 'none';
