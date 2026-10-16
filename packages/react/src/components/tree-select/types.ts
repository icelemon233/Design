import React from 'react';
import type { TreeNodeData } from '../shared';

export interface TreeSelectProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'onChange' | 'defaultValue'
> {
  treeData: TreeNodeData[];
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  allowClear?: boolean;
  disabled?: boolean;
  showSearch?: boolean;
  defaultExpandedKeys?: string[];
}
