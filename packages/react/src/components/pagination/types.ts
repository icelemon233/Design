import React from 'react';

export type PaginationSize = 'small' | 'medium' | 'large';

export type PaginationAlign = 'start' | 'center' | 'end';

export type PaginationItemType = 'page' | 'prev' | 'next' | 'jump-prev' | 'jump-next';

export type PaginationSimple = boolean | { readOnly?: boolean };

export interface PaginationProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  current?: number;
  defaultCurrent?: number;
  total?: number;
  pageSize?: number;
  defaultPageSize?: number;
  pageSizeOptions?: number[];
  onChange?: (page: number, pageSize: number) => void;
  onShowSizeChange?: (current: number, size: number) => void;
  simple?: PaginationSimple;
  size?: PaginationSize;
  responsive?: boolean;
  align?: PaginationAlign;
  disabled?: boolean;
  hideOnSinglePage?: boolean;
  showLessItems?: boolean;
  showAllPages?: boolean;
  showQuickJumper?: boolean | { goButton?: React.ReactNode };
  showSizeChanger?: boolean;
  totalBoundaryShowSizeChanger?: number;
  showTitle?: boolean;
  prevIcon?: React.ReactNode;
  nextIcon?: React.ReactNode;
  itemRender?: (
    page: number,
    type: PaginationItemType,
    originalElement: React.ReactNode,
  ) => React.ReactNode;
  showTotal?: (total: number, range: [number, number]) => React.ReactNode;
  pageFontSize?: number | string;
  pageFontWeight?: React.CSSProperties['fontWeight'];
  pageColor?: string;
  pageBorderColor?: string;
  pageBorderWidth?: number | string;
  pageBorderStyle?: React.CSSProperties['borderStyle'];
  pageRadius?: number | string;
  activePageColor?: string;
  activePageBackgroundColor?: string;
  activePageBorderColor?: string;
  activePageUnderline?: boolean;
  activePageUnderlineColor?: string;
  activePageUnderlineWidth?: number | string;
  activePageUnderlineHeight?: number | string;
  activePageUnderlineRadius?: number | string;
  activePageUnderlineBottom?: number | string;
}

export type PaginationToken = number | 'jump-prev' | 'jump-next';

export type PaginationButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;
