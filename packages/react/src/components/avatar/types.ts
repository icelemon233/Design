import React from 'react';
import type { CinnaSize } from '../shared';

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  src?: string;
  alt?: string;
  size?: CinnaSize | number;
  shape?: 'circle' | 'square';
  icon?: React.ReactNode;
}
