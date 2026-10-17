import React from 'react';

export interface SkeletonProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  rows?: number;
  loading?: boolean;
  avatar?: boolean;
  active?: boolean;
  title?: boolean;
  round?: boolean;
}
