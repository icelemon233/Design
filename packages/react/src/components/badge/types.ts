import React from 'react';
import type { CinnaStatus } from '../shared';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  count?: React.ReactNode;
  dot?: boolean;
  status?: CinnaStatus;
  overflowCount?: number;
  showZero?: boolean;
  text?: React.ReactNode;
  offset?: [number, number];
}
