import React from 'react';
import type { TreeNodeData } from '../shared';

export interface TreeProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'onSelect' | 'onChange'
> {
  treeData: TreeNodeData[];
  defaultExpandAll?: boolean;
  defaultExpandedKeys?: string[];
  expandedKeys?: string[];
  onExpand?: (keys: string[]) => void;
  selectable?: boolean;
  selectedKey?: string;
  defaultSelectedKey?: string;
  onSelect?: (key: string) => void;
  multiple?: boolean;
  selectedKeys?: string[];
  defaultSelectedKeys?: string[];
  onSelectedKeysChange?: (keys: string[]) => void;
  checkable?: boolean;
  checkedKeys?: string[];
  defaultCheckedKeys?: string[];
  onCheck?: (keys: string[]) => void;
  disabled?: boolean;
}
