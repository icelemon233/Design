import React from 'react';
import { cx } from '../../utils/cx';
import { Icon } from '../icon';
import { Menu } from '../menu';
import type { BreadcrumbItem, BreadcrumbProps } from './types';
export type { BreadcrumbItem, BreadcrumbProps } from './types';

const renderBreadcrumbContent = (item: BreadcrumbItem, hasMenu = false) => (
  <span className="cinna-breadcrumb__content">
    {item.icon && (
      <span className="cinna-breadcrumb__icon" aria-hidden="true">
        {item.icon}
      </span>
    )}
    <span>{item.title}</span>
    {hasMenu && (
      <span className="cinna-breadcrumb__caret" aria-hidden="true">
        <Icon name="chevron-down" size={12} />
      </span>
    )}
  </span>
);

export const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ items, separator = '/', onItemClick, onMenuSelect, className, ...rest }, ref) => (
    <nav ref={ref} className={cx('cinna-breadcrumb', className)} aria-label="Breadcrumb" {...rest}>
      {items.map((item, index) => {
        const itemStyle = {
          color: item.color,
          fontStyle: item.fontStyle,
          fontWeight: item.fontWeight,
          ...item.style,
        } as React.CSSProperties;
        const content = item.menu?.length ? (
          <details className={cx('cinna-breadcrumb__dropdown', item.className)}>
            <summary style={itemStyle}>{renderBreadcrumbContent(item, true)}</summary>
            <div className="cinna-breadcrumb__menu">
              <Menu items={item.menu} onSelect={(key) => onMenuSelect?.(key, item, index)} />
            </div>
          </details>
        ) : item.href ? (
          <a
            className={cx('cinna-breadcrumb__item', item.className)}
            style={itemStyle}
            href={item.href}
            onClick={(event) => onItemClick?.(event, item, index)}
          >
            {renderBreadcrumbContent(item)}
          </a>
        ) : (
          <span className={cx('cinna-breadcrumb__item', item.className)} style={itemStyle}>
            {renderBreadcrumbContent(item)}
          </span>
        );

        return (
          <React.Fragment key={item.key ?? index}>
            {content}
            {index < items.length - 1 && <em>{item.separator ?? separator}</em>}
          </React.Fragment>
        );
      })}
    </nav>
  ),
);

Breadcrumb.displayName = 'Breadcrumb';
