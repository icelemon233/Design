import React from 'react';

export type AnchorTarget = string | Element | (() => Element | null);

export interface AnchorItem {
  key: string;
  href: string;
  title: React.ReactNode;
  anchorTarget?: AnchorTarget;
  targetOffset?: number;
}

export type AnchorDirection = 'vertical' | 'horizontal';

export interface AnchorProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onChange'> {
  items: AnchorItem[];
  offsetTop?: number;
  targetOffset?: number;
  direction?: AnchorDirection;
  affix?: boolean;
  getContainer?: () => HTMLElement | Window | null;
  defaultActiveHref?: string;
  onItemClick?: (event: React.MouseEvent<HTMLAnchorElement>, item: AnchorItem) => void;
  onChange?: (activeHref: string) => void;
}
