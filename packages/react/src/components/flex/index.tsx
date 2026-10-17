import React from 'react';
import { cx } from '../../utils/cx';
import type { FlexProps } from './types';
export type { FlexProps } from './types';

export const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  ({ vertical, align, justify, gap = 'medium', wrap, inline, className, style, ...rest }, ref) => {
    const resolvedGap = typeof gap === 'number' ? `${gap}px` : undefined;
    return (
      <div
        ref={ref}
        className={cx(
          'cinna-flex',
          inline && 'cinna-flex--inline',
          vertical && 'cinna-flex--vertical',
          typeof gap === 'string' && `cinna-flex--${gap}`,
          wrap && 'cinna-flex--wrap',
          className,
        )}
        style={{ alignItems: align, justifyContent: justify, gap: resolvedGap, ...style }}
        {...rest}
      />
    );
  },
);

Flex.displayName = 'Flex';
