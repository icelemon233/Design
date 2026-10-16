import React from 'react';
import { type CinnaSize } from '../shared';

export interface TableColumn<T extends Record<string, unknown> = Record<string, unknown>> {
  title: React.ReactNode;
  dataIndex?: keyof T;
  key?: string;
  render?: (value: unknown, record: T, index: number) => React.ReactNode;
  align?: 'left' | 'center' | 'right';
  sorter?: (a: T, b: T) => number;
  width?: number | string;
  sortOrder?: 'asc' | 'desc' | null;
  filters?: Array<{ text: React.ReactNode; value: string }>;
  onFilter?: (value: string, record: T) => boolean;
  filteredValue?: string;
}

export interface TablePagination {
  current?: number;
  defaultCurrent?: number;
  pageSize?: number;
  onChange?: (page: number, pageSize: number) => void;
}

export interface TableProps<
  T extends Record<string, unknown> = Record<string, unknown>,
> extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  columns: TableColumn<T>[];
  dataSource: T[];
  rowKey?: keyof T | ((record: T, index: number) => React.Key);
  bordered?: boolean;
  size?: CinnaSize;
  emptyText?: React.ReactNode;
  loading?: boolean;
  pagination?: boolean | TablePagination;
  scroll?: { x?: number | string; y?: number | string };
  onSortChange?: (sort: { key: string; direction: 'asc' | 'desc' } | null) => void;
  onFilterChange?: (filters: Record<string, string>) => void;
  rowSelection?: {
    selectedRowKeys?: React.Key[];
    onChange?: (keys: React.Key[], rows: T[]) => void;
    getCheckboxProps?: (record: T) => { disabled?: boolean };
  };
  expandable?: {
    expandedRowKeys?: React.Key[];
    defaultExpandedRowKeys?: React.Key[];
    expandedRowRender: (record: T, index: number) => React.ReactNode;
    onExpandedRowsChange?: (keys: React.Key[]) => void;
  };
  onRow?: (record: T, index: number) => React.HTMLAttributes<HTMLTableRowElement>;
}
