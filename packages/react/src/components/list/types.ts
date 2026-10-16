import React from 'react';

export interface ListProps<T = unknown> extends React.HTMLAttributes<HTMLDivElement> {
  dataSource: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  bordered?: boolean;
  rowKey?: (item: T, index: number) => React.Key;
  emptyText?: React.ReactNode;
  loading?: boolean;
  loadMore?: React.ReactNode;
  itemLayout?: 'horizontal' | 'vertical';
}
