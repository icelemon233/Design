import React from 'react';
import type { ButtonProps } from '../button';
import type { MenuItem } from '../menu';

export type PopupMode = 'tooltip' | 'menu' | 'popover' | 'confirm';

export type PopupTrigger = 'click' | 'hover' | 'contextMenu';

export type PopupPlacement = 'top' | 'bottom' | 'left' | 'right';

export type PopupAlign = 'left' | 'center' | 'right';

export interface PopupStyles {
  backgroundColor?: string;
  color?: string;
  borderColor?: string;
  radius?: number | string;
  shadow?: string;
  fontSize?: number | string;
  minWidth?: number | string;
  width?: number | string;
  padding?: number | string;
  titleColor?: string;
  titleFontSize?: number | string;
  titleFontWeight?: React.CSSProperties['fontWeight'];
  contentColor?: string;
  contentFontSize?: number | string;
  menuColor?: string;
  menuFontSize?: number | string;
  menuHoverColor?: string;
  menuHoverBackgroundColor?: string;
  menuActiveColor?: string;
  menuActiveBackgroundColor?: string;
  menuDisabledColor?: string;
  dividerColor?: string;
  arrowColor?: string;
  arrowBorderColor?: string;
  triggerColor?: string;
  triggerBackgroundColor?: string;
  triggerBorderColor?: string;
  triggerFontSize?: number | string;
  triggerShadow?: string;
}

export interface PopupProps extends Omit<
  React.HTMLAttributes<HTMLSpanElement>,
  'title' | 'content' | 'onSelect'
> {
  mode?: PopupMode;
  label?: React.ReactNode;
  items?: MenuItem[];
  menu?: React.ReactNode;
  title?: React.ReactNode;
  content?: React.ReactNode;
  description?: React.ReactNode;
  trigger?: PopupTrigger;
  placement?: PopupPlacement;
  align?: PopupAlign;
  arrow?: boolean;
  open?: boolean;
  defaultOpen?: boolean;
  disabled?: boolean;
  closeOnSelect?: boolean;
  overlayClassName?: string;
  overlayStyle?: React.CSSProperties;
  styles?: PopupStyles;
  onOpenChange?: (open: boolean) => void;
  onSelect?: (key: string) => void;
  okText?: React.ReactNode;
  cancelText?: React.ReactNode;
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void;
  okButtonProps?: ButtonProps;
  cancelButtonProps?: ButtonProps;
}
