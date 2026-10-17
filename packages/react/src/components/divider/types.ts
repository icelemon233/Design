import React from 'react';

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'left' | 'center' | 'right';
  vertical?: boolean;
  dashed?: boolean;
  plain?: boolean;
  color?: string;
  character?: string;
  left?: boolean | number | string;
  right?: boolean | number | string;
}
