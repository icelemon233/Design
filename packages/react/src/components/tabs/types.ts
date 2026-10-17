import React from 'react';
import type { CinnaSize } from '../shared';

export type TabsPosition = 'top' | 'bottom' | 'left' | 'right';
export type TabsVariant = 'borderless' | 'bordered';

export interface TabsItem {
  key: string;
  label: React.ReactNode;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
  closable?: boolean;
  closeIcon?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  items: TabsItem[];
  activeKey?: string;
  defaultActiveKey?: string;
  onChange?: (key: string) => void;
  tabPosition?: TabsPosition;
  variant?: TabsVariant;
  size?: CinnaSize;
  disabled?: boolean;
  emptyContent?: React.ReactNode;
  addable?: boolean;
  addIcon?: React.ReactNode;
  closeIcon?: React.ReactNode;
  closable?: boolean;
  draggable?: boolean;
  onAdd?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onClose?: (
    key: string,
    item: TabsItem,
    event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>,
  ) => void;
  onOrderChange?: (
    keys: string[],
    items: TabsItem[],
    info: { fromKey: string; toKey: string },
  ) => void;
  tabFontSize?: number | string;
  tabFontWeight?: React.CSSProperties['fontWeight'];
  tabColor?: string;
  activeTabColor?: string;
  tabBackgroundColor?: string;
  activeTabBackgroundColor?: string;
  tabBorderColor?: string;
  activeTabBorderColor?: string;
  tabRadius?: number | string;
  listBackgroundColor?: string;
  panelColor?: string;
  panelFontSize?: number | string;
  panelBackgroundColor?: string;
  panelBorderColor?: string;
  destroyInactiveTabPanel?: boolean;
}
