import React from 'react';
import { cx } from '../../utils/cx';
import type { CardProps } from './types';
export type { CardProps, CardTone } from './types';

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      tone = 'cream',
      title,
      extra,
      interactive = false,
      padded = true,
      className,
      children,
      ...rest
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cx(
          'cinna-card',
          `cinna-card--${tone}`,
          interactive && 'cinna-card--interactive',
          padded && 'cinna-card--padded',
          className,
        )}
        {...rest}
      >
        {(title || extra) && (
          <div className="cinna-card__header">
            {title && <div className="cinna-card__title">{title}</div>}
            {extra && <div className="cinna-card__extra">{extra}</div>}
          </div>
        )}
        <div className="cinna-card__body">{children}</div>
      </div>
    );
  },
);

Card.displayName = 'Card';
