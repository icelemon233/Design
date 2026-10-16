import React from 'react';
import { cx } from '../../utils/cx';
import type { BadgeProps } from './types';
export type { BadgeProps } from './types';

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      count,
      dot,
      status: statusProp,
      overflowCount = 99,
      showZero,
      text,
      offset,
      className,
      children,
      ...rest
    },
    ref,
  ) => {
    const status = statusProp ?? 'info';
    const statusOnly = statusProp !== undefined && count === undefined && !dot;
    const numericCount = typeof count === 'number' ? count : undefined;
    const hidden = !dot && count === undefined && !text && !statusOnly;
    const displayCount =
      numericCount !== undefined && numericCount > overflowCount ? `${overflowCount}+` : count;
    const markStyle = offset ? { right: offset[0], top: offset[1] } : undefined;
    return (
      <span
        ref={ref}
        className={cx(
          'cinna-badge',
          !children && 'cinna-badge--standalone',
          statusOnly && 'cinna-badge--status',
          className,
        )}
        {...rest}
      >
        {children}
        {!hidden && (showZero || dot || count !== 0 || text) && (
          <span
            className={cx(
              'cinna-badge__mark',
              (dot || statusOnly) && 'cinna-badge__mark--dot',
              Boolean(text && !count && !statusOnly && !dot) && 'cinna-badge__mark--text',
              `cinna-badge__mark--${status}`,
            )}
            style={markStyle}
          >
            {dot || statusOnly ? null : (text ?? displayCount)}
          </span>
        )}
        {statusOnly && text && <span className="cinna-badge__text">{text}</span>}
      </span>
    );
  },
);

Badge.displayName = 'Badge';
