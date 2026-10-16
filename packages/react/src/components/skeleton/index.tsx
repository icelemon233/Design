import React from 'react';
import { cx } from '../../utils/cx';
import type { SkeletonProps } from './types';
export type { SkeletonProps } from './types';

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      loading = true,
      children,
      rows = 3,
      avatar,
      active = true,
      title = true,
      round,
      className,
      ...rest
    },
    ref,
  ) =>
    loading ? (
      <div
        ref={ref}
        className={cx(
          'cinna-skeleton',
          active && 'cinna-skeleton--active',
          round && 'cinna-skeleton--round',
          className,
        )}
        {...rest}
      >
        {avatar && <span className="cinna-skeleton__avatar" />}
        <div className="cinna-skeleton__lines">
          {title && <span className="cinna-skeleton__line cinna-skeleton__line--title" />}
          {Array.from({ length: Math.max(0, Math.floor(rows)) }).map((_, index) => (
            <span
              key={index}
              className="cinna-skeleton__line"
              style={{ width: index === rows - 1 ? '68%' : '100%' }}
            />
          ))}
        </div>
      </div>
    ) : (
      <>{children}</>
    ),
);

Skeleton.displayName = 'Skeleton';
