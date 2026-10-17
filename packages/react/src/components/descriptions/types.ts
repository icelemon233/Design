import React from 'react';
import type { CinnaSize } from '../shared';

export interface DescriptionItem {
  label: React.ReactNode;
  children: React.ReactNode;
  span?: number;
  key?: React.Key;
}

export interface DescriptionsProps extends React.HTMLAttributes<HTMLDListElement> {
  items: DescriptionItem[];
  column?: number;
  bordered?: boolean;
  size?: CinnaSize;
}
