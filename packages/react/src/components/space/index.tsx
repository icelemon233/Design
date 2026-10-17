import React from 'react';
import { cx } from '../../utils/cx';
import type { SpaceProps } from './types';
export type { SpaceProps } from './types';

export const Space = React.forwardRef<HTMLDivElement, SpaceProps>(
  (
    {
      direction = 'horizontal',
      size = 'medium',
      align = 'center',
      justify,
      wrap = false,
      split,
      block,
      className,
      style,
      children,
      ...rest
    },
    ref,
  ) => {
    const gap = typeof size === 'number' ? `${size}px` : undefined;
    const childList = React.Children.toArray(children).filter(Boolean);
    return (
      <div
        ref={ref}
        className={cx(
          'cinna-space',
          `cinna-space--${direction}`,
          typeof size === 'string' && `cinna-space--${size}`,
          wrap && 'cinna-space--wrap',
          block && 'cinna-space--block',
          className,
        )}
        style={{ alignItems: align, justifyContent: justify, gap, ...style }}
        {...rest}
      >
        {split
          ? childList.map((child, index) => (
              <React.Fragment key={index}>
                {index > 0 && <span className="cinna-space__split">{split}</span>}
                {child}
              </React.Fragment>
            ))
          : children}
      </div>
    );
  },
);

Space.displayName = 'Space';
