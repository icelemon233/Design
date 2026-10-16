import React from 'react';
import { cx } from '../../utils/cx';
import type { AffixProps } from './types';
export type { AffixProps } from './types';

export const Affix = React.forwardRef<HTMLDivElement, AffixProps>(
  ({ offsetTop, offsetBottom, className, style, ...rest }, ref) => (
    <div
      ref={ref}
      className={cx('cinna-affix', className)}
      style={{ top: offsetTop, bottom: offsetBottom, ...style }}
      {...rest}
    />
  ),
);
