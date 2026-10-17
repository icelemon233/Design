import React from 'react';
import type { CinnaSize } from '../shared';

export interface SpaceProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: 'horizontal' | 'vertical';
  size?: CinnaSize | number;
  align?: React.CSSProperties['alignItems'];
  justify?: React.CSSProperties['justifyContent'];
  wrap?: boolean;
  split?: React.ReactNode;
  block?: boolean;
}
