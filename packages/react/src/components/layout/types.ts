import React from 'react';
import type { MenuItem, MenuProps } from '../menu';

export interface LayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  hasSider?: boolean;
}

export interface LayoutHeaderProps extends React.HTMLAttributes<HTMLElement> {
  sticky?: boolean;
  offsetTop?: number | string;
  height?: number | string;
}

export type LayoutSiderPlacement = 'left' | 'right';

export interface LayoutSiderProps extends React.HTMLAttributes<HTMLElement> {
  width?: number | string;
  collapsedWidth?: number | string;
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  collapsible?: boolean;
  trigger?: React.ReactNode | null;
  menu?: MenuItem[];
  menuProps?: Omit<MenuProps, 'items' | 'inlineCollapsed'>;
  sticky?: boolean;
  offsetTop?: number | string;
  placement?: LayoutSiderPlacement;
  expandOnHover?: boolean;
  onCollapse?: (collapsed: boolean) => void;
}

export interface LayoutFooterProps extends React.HTMLAttributes<HTMLElement> {
  sticky?: boolean;
  offsetBottom?: number | string;
  height?: number | string;
}
