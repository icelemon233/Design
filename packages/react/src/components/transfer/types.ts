import React from 'react';

export interface TransferItem {
  key: string;
  title: string;
  disabled?: boolean;
}

export interface TransferProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  dataSource: TransferItem[];
  targetKeys?: string[];
  defaultTargetKeys?: string[];
  onChange?: (targetKeys: string[]) => void;
  titles?: [React.ReactNode, React.ReactNode];
  showSearch?: boolean;
  disabled?: boolean;
  selectedKeys?: string[];
  onSelectChange?: (source: string[], target: string[]) => void;
}
