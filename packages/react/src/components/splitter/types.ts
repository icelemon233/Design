import React from 'react';

export type SplitterOrientation = 'horizontal' | 'vertical';

export interface SplitterDividerOptions {
  color?: string;
  dashed?: boolean;
  size?: number | string;
  thickness?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

export interface SplitterPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultSize?: number | string;
  size?: number | string;
  min?: number | string;
  max?: number | string;
  resizable?: boolean;
}

export interface SplitterPanelConfig {
  key: React.Key;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  defaultSize?: number | string;
  size?: number | string;
  min?: number | string;
  max?: number | string;
  resizable: boolean;
}

export interface SplitterDragState {
  index: number;
  startPoint: number;
  startSizes: number[];
}

export interface SplitterProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'children' | 'onResize'
> {
  children?: React.ReactNode;
  first?: React.ReactNode;
  second?: React.ReactNode;
  orientation?: SplitterOrientation;
  vertical?: boolean;
  defaultSize?: number;
  min?: number;
  max?: number;
  disabled?: boolean;
  lazy?: boolean;
  divider?: SplitterDividerOptions;
  resetOnDoubleClick?: boolean;
  onResizeStart?: (sizes: number[]) => void;
  onResize?: (sizes: number[]) => void;
  onResizeEnd?: (sizes: number[]) => void;
  onDraggerDoubleClick?: (index: number) => void;
}
