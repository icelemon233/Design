import React from 'react';
import { cx } from '../../utils/cx';
import type { DescriptionsProps } from './types';
export type { DescriptionItem, DescriptionsProps } from './types';

export const Descriptions = React.forwardRef<HTMLDListElement, DescriptionsProps>(
  ({ items, column, bordered = true, size = 'medium', className, style, ...rest }, ref) => (
    <dl
      ref={ref}
      className={cx(
        'cinna-descriptions',
        `cinna-descriptions--${size}`,
        !bordered && 'cinna-descriptions--borderless',
        className,
      )}
      style={{
        gridTemplateColumns: column ? `repeat(${column}, minmax(0, 1fr))` : undefined,
        ...style,
      }}
      {...rest}
    >
      {items.map((item, index) => (
        <div
          key={item.key ?? index}
          style={{ gridColumn: item.span ? 'span ' + Math.min(item.span, column ?? 1) : undefined }}
        >
          <dt>{item.label}</dt>
          <dd>{item.children}</dd>
        </div>
      ))}
    </dl>
  ),
);

Descriptions.displayName = 'Descriptions';
