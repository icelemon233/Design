import React from 'react';
import type { CinnaSize } from '../shared';

export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  vertical?: boolean;
  align?: React.CSSProperties['alignItems'];
  justify?: React.CSSProperties['justifyContent'];
  gap?: CinnaSize | number;
  wrap?: boolean;
  inline?: boolean;
}
