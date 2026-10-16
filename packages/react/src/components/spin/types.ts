import React from 'react';
import { type LoadingProps } from '../loading';

export interface SpinProps extends LoadingProps {
  spinning?: boolean;
  delay?: number;
  tip?: React.ReactNode;
}
