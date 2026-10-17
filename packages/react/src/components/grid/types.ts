import React from 'react';
import type { GridGap } from '../shared';

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: number | string;
  gap?: GridGap | [GridGap, GridGap];
  minColumnWidth?: number | string;
  inline?: boolean;
}

export interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
  gutter?: GridGap | [GridGap, GridGap];
  align?: React.CSSProperties['alignItems'];
  justify?: React.CSSProperties['justifyContent'];
  wrap?: boolean;
}

export interface ColProps extends React.HTMLAttributes<HTMLDivElement> {
  span?: number;
  offset?: number;
  order?: number;
  flex?: React.CSSProperties['flex'];
}
