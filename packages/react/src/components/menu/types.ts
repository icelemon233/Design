import React from 'react';
import type { PopupStyles } from '../popup';

export type MenuMode = 'vertical' | 'horizontal' | 'inline';

export type MenuTheme = 'light' | 'dark';

export type MenuTriggerSubMenuAction = 'hover' | 'click';

export type MenuSemanticSlot =
  | 'root'
  | 'item'
  | 'itemIcon'
  | 'itemContent'
  | 'itemExtra'
  | 'subMenuTitle'
  | 'subMenuList'
  | 'group'
  | 'groupTitle'
  | 'divider'
  | 'popup';

export interface MenuClickInfo {
  key: string;
  keyPath: string[];
  domEvent: React.MouseEvent<HTMLElement>;
}

export interface MenuSelectInfo extends MenuClickInfo {
  selectedKeys: string[];
}

export type MenuClassNames =
  | Partial<Record<MenuSemanticSlot, string>>
  | ((info: { props: MenuProps }) => Partial<Record<MenuSemanticSlot, string>>);

export type MenuStyles =
  | Partial<Record<MenuSemanticSlot, React.CSSProperties>>
  | ((info: { props: MenuProps }) => Partial<Record<MenuSemanticSlot, React.CSSProperties>>);

export type MenuExpandIcon =
  | React.ReactNode
  | ((info: { item: MenuItem; open: boolean; mode: MenuMode; level: number }) => React.ReactNode);

export type MenuPopupRender = (
  node: React.ReactElement,
  info: { item: MenuItem; keyPath: string[] },
) => React.ReactElement;

export type MenuItem =
  | {
      key: string;
      label: React.ReactNode;
      disabled?: boolean;
      icon?: React.ReactNode;
      children?: MenuItem[];
      danger?: boolean;
      extra?: React.ReactNode;
      title?: React.ReactNode;
      theme?: MenuTheme;
      popupClassName?: string;
      popupOffset?: [number, number];
      popupRender?: MenuPopupRender;
      onTitleClick?: (info: MenuClickInfo) => void;
      className?: string;
      style?: React.CSSProperties;
      type?: 'item';
    }
  | {
      key?: string;
      label?: never;
      disabled?: never;
      icon?: never;
      children?: never;
      danger?: never;
      extra?: never;
      title?: never;
      theme?: never;
      popupClassName?: never;
      popupOffset?: never;
      popupRender?: never;
      onTitleClick?: never;
      className?: string;
      style?: React.CSSProperties;
      type: 'divider';
      dashed?: boolean;
    }
  | {
      key?: string;
      label: React.ReactNode;
      children: MenuItem[];
      disabled?: never;
      icon?: never;
      danger?: never;
      extra?: never;
      title?: never;
      theme?: never;
      popupClassName?: never;
      popupOffset?: never;
      popupRender?: never;
      onTitleClick?: never;
      className?: string;
      style?: React.CSSProperties;
      type: 'group';
    };

export interface MenuProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'onClick' | 'onSelect'
> {
  items: MenuItem[];
  selectedKey?: string;
  defaultSelectedKey?: string;
  selectedKeys?: string[];
  defaultSelectedKeys?: string[];
  openKeys?: string[];
  defaultOpenKeys?: string[];
  mode?: MenuMode;
  theme?: MenuTheme;
  inlineCollapsed?: boolean;
  collapsedWidth?: number | string;
  selectable?: boolean;
  multiple?: boolean;
  triggerSubMenuAction?: MenuTriggerSubMenuAction;
  expandIcon?: MenuExpandIcon;
  forceSubMenuRender?: boolean;
  subMenuOpenDelay?: number;
  subMenuCloseDelay?: number;
  tooltip?:
    | false
    | {
        placement?: 'top' | 'bottom' | 'left' | 'right';
        styles?: PopupStyles;
      };
  popupRender?: MenuPopupRender;
  classNames?: MenuClassNames;
  styles?: MenuStyles;
  onClick?: (info: MenuClickInfo) => void;
  onSelect?: (key: string, info: MenuSelectInfo) => void;
  onDeselect?: (key: string, info: MenuSelectInfo) => void;
  onOpenChange?: (openKeys: string[]) => void;
  inlineIndent?: number;
}

export interface MenuRenderOptions {
  mode: MenuMode;
  theme: MenuTheme;
  inlineIndent: number;
  collapsed: boolean;
  selectedKeys: string[];
  openKeys: string[];
  triggerSubMenuAction: MenuTriggerSubMenuAction;
  forceSubMenuRender: boolean;
  tooltip: MenuProps['tooltip'];
  expandIcon?: MenuExpandIcon;
  popupRender?: MenuPopupRender;
  semanticClassNames: Partial<Record<MenuSemanticSlot, string>>;
  semanticStyles: Partial<Record<MenuSemanticSlot, React.CSSProperties>>;
  onItemSelect: (item: MenuItem, keyPath: string[], event: React.MouseEvent<HTMLElement>) => void;
  onSubMenuToggle: (
    item: MenuItem,
    keyPath: string[],
    event: React.MouseEvent<HTMLElement>,
  ) => void;
  onSubMenuOpen: (key: string) => void;
  onSubMenuClose: (key: string) => void;
}
