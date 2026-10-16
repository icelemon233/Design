import React from 'react';
import type { ButtonRippleEffect } from './ripple';
import type { ButtonThemeInput } from './theme';

export type ButtonVariant =
  'primary' | 'secondary' | 'cream' | 'ghost' | 'text' | 'danger' | 'dashed';

export type ButtonSize = 'small' | 'medium' | 'large';

export type ButtonShape = 'default' | 'round' | 'circle';

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  shape?: ButtonShape;
  htmlType?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  loading?: boolean;
  loadingSpeed?: number | string;
  block?: boolean;
  danger?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'start' | 'end';
  ripple?: boolean;
  rippleEffects?: ButtonRippleEffect | ButtonRippleEffect[];
  rippleParticleColors?: string | string[];
  rippleParticleOpacity?: number;
  theme?: ButtonThemeInput;
  color?: string;
  backgroundColor?: string;
  borderColor?: string;
  radius?: number | string;
  shadow?: string;
  activeShadow?: string;
}
