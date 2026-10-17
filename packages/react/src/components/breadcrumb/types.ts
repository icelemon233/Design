import React from 'react';
import type { MenuItem } from '../menu';

export interface BreadcrumbItem {
  key?: string;
  title: React.ReactNode;
  href?: string;
  icon?: React.ReactNode;
  menu?: MenuItem[];
  separator?: React.ReactNode;
  color?: string;
  fontStyle?: React.CSSProperties['fontStyle'];
  fontWeight?: React.CSSProperties['fontWeight'];
  className?: string;
  style?: React.CSSProperties;
}

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  onItemClick?: (
    event: React.MouseEvent<HTMLAnchorElement>,
    item: BreadcrumbItem,
    index: number,
  ) => void;
  onMenuSelect?: (key: string, item: BreadcrumbItem, index: number) => void;
}
