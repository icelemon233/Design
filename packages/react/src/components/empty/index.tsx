import React from 'react';
import { cx } from '../../utils/cx';
import type { EmptyProps } from './types';
export type { EmptyProps } from './types';

export const Empty = React.forwardRef<HTMLDivElement, EmptyProps>(
  ({ description = 'No data yet', image, actions, className, children, ...rest }, ref) => (
    <div ref={ref} className={cx('cinna-empty', className)} {...rest}>
      <div className="cinna-empty__cloud" aria-hidden="true">
        {image}
      </div>
      {description !== false && description !== null && (
        <div className="cinna-empty__description">{description}</div>
      )}
      {actions ?? children}
    </div>
  ),
);

Empty.displayName = 'Empty';
