import React from 'react';
import { cx } from '../../utils/cx';
import type { TimelineProps } from './types';
export type { TimelineItem, TimelineProps } from './types';

export const Timeline = React.forwardRef<HTMLOListElement, TimelineProps>(
  ({ items, mode = 'left', reverse, pending, className, ...rest }, ref) => (
    <ol ref={ref} className={cx('cinna-timeline', `cinna-timeline--${mode}`, className)} {...rest}>
      {(reverse ? [...items].reverse() : items).map((item, index) => (
        <li key={index} className={cx(item.color && `cinna-timeline__item--${item.color}`)}>
          {item.label && <em>{item.label}</em>}
          <span>{item.dot}</span>
          <div>{item.children}</div>
        </li>
      ))}
      {pending && (
        <li className="cinna-timeline__pending">
          <span aria-hidden="true">…</span>
          <div>{pending}</div>
        </li>
      )}
    </ol>
  ),
);

Timeline.displayName = 'Timeline';
