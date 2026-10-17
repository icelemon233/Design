import React from 'react';

export type CinnaSize = 'small' | 'medium' | 'large';

export type CinnaStatus = 'info' | 'success' | 'warning' | 'error';

export type GridGap = CinnaSize | number | string;

export interface TreeNodeData {
  key: string;
  title: React.ReactNode;
  children?: TreeNodeData[];
  disabled?: boolean;
  disableCheckbox?: boolean;
  selectable?: boolean;
}
