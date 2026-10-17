import React from 'react';

export interface TransferItem {
  key: string;
  title: string;
  disabled?: boolean;
}

export interface TransferLocale {
  sourceTitle: string;
  targetTitle: string;
  selectAll: string;
  searchPlaceholder: string;
  empty: string;
  noResults: string;
  moveToTarget: string;
  moveToSource: string;
}

export interface TransferProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  dataSource: TransferItem[];
  targetKeys?: string[];
  defaultTargetKeys?: string[];
  onChange?: (
    targetKeys: string[],
    direction: 'toTarget' | 'toSource',
    movedKeys: string[],
  ) => void;
  titles?: [React.ReactNode, React.ReactNode];
  showSearch?: boolean;
  disabled?: boolean;
  selectedKeys?: string[];
  defaultSelectedKeys?: string[];
  locale?: Partial<TransferLocale>;
  onSelectChange?: (source: string[], target: string[]) => void;
}
