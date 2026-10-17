import React from 'react';
import type { ButtonRippleEffect } from '../button/ripple';
import type { ButtonThemeInput } from '../button/theme';

export interface FloatButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  shape?: 'circle' | 'square';
  tooltip?: React.ReactNode;
  badge?: React.ReactNode;
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

export interface FloatButtonMenuItem extends Omit<FloatButtonProps, 'content'> {
  key?: React.Key;
  label?: React.ReactNode;
  content?: React.ReactNode;
}

export interface FloatButtonGroupProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'onClick'
> {
  shape?: 'circle' | 'square';
  placement?: 'top' | 'right' | 'bottom' | 'left';
  trigger?: 'click' | 'hover';
  open?: boolean;
  defaultOpen?: boolean;
  icon?: React.ReactNode;
  closeIcon?: React.ReactNode;
  tooltip?: React.ReactNode;
  items?: FloatButtonMenuItem[];
  onOpenChange?: (open: boolean) => void;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export interface FloatButtonBackTopProps extends FloatButtonProps {
  duration?: number;
  visibilityHeight?: number;
  target?: () => HTMLElement | Window;
}
