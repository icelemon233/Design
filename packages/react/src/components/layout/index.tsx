import React, { useState } from 'react';
import { cx } from '../../utils/cx';
import { Icon } from '../icon';
import { Menu } from '../menu';
import type { LayoutFooterProps, LayoutHeaderProps, LayoutProps, LayoutSiderProps } from './types';
export type {
  LayoutFooterProps,
  LayoutHeaderProps,
  LayoutProps,
  LayoutSiderPlacement,
  LayoutSiderProps,
} from './types';

const normalizeLayoutCssValue = (value: number | string | undefined) => {
  if (typeof value === 'number') return `${value}px`;
  return value;
};

export const Layout = React.forwardRef<HTMLDivElement, LayoutProps>(
  ({ hasSider, className, ...rest }, ref) => (
    <div
      ref={ref}
      className={cx('cinna-layout', hasSider && 'cinna-layout--has-sider', className)}
      {...rest}
    />
  ),
);

Layout.displayName = 'Layout';

export const LayoutHeader = React.forwardRef<HTMLElement, LayoutHeaderProps>(
  ({ sticky, offsetTop = 0, height, className, style, ...rest }, ref) => (
    <header
      ref={ref}
      className={cx('cinna-layout__header', sticky && 'cinna-layout__header--sticky', className)}
      style={
        {
          ...(sticky ? { '--cinna-layout-header-top': normalizeLayoutCssValue(offsetTop) } : null),
          ...(height !== undefined
            ? { '--cinna-layout-header-height': normalizeLayoutCssValue(height) }
            : null),
          ...style,
        } as React.CSSProperties
      }
      {...rest}
    />
  ),
);

LayoutHeader.displayName = 'LayoutHeader';

export const LayoutSider = React.forwardRef<HTMLElement, LayoutSiderProps>(
  (
    {
      width = 200,
      collapsedWidth = 72,
      collapsed,
      defaultCollapsed = false,
      collapsible,
      trigger,
      menu,
      menuProps,
      sticky,
      offsetTop = 0,
      placement = 'left',
      expandOnHover,
      onCollapse,
      className,
      style,
      children,
      onMouseEnter,
      onMouseLeave,
      ...rest
    },
    ref,
  ) => {
    const [innerCollapsed, setInnerCollapsed] = useState(defaultCollapsed);
    const mergedCollapsed = collapsed ?? innerCollapsed;

    const setCollapsed = (nextCollapsed: boolean) => {
      if (collapsed === undefined) setInnerCollapsed(nextCollapsed);
      onCollapse?.(nextCollapsed);
    };

    return (
      <aside
        ref={ref}
        className={cx(
          'cinna-layout__sider',
          `cinna-layout__sider--${placement}`,
          sticky && 'cinna-layout__sider--sticky',
          collapsible && 'cinna-layout__sider--collapsible',
          mergedCollapsed && 'cinna-layout__sider--collapsed',
          menu && 'cinna-layout__sider--with-menu',
          className,
        )}
        style={
          {
            '--cinna-layout-sider-width': normalizeLayoutCssValue(width),
            '--cinna-layout-sider-collapsed-width': normalizeLayoutCssValue(collapsedWidth),
            ...(sticky ? { '--cinna-layout-sider-top': normalizeLayoutCssValue(offsetTop) } : null),
            ...style,
          } as React.CSSProperties
        }
        aria-expanded={collapsible ? !mergedCollapsed : undefined}
        onMouseEnter={(event) => {
          onMouseEnter?.(event);
          if (expandOnHover && collapsible && mergedCollapsed) setCollapsed(false);
        }}
        onMouseLeave={(event) => {
          onMouseLeave?.(event);
          if (expandOnHover && collapsible && !mergedCollapsed) setCollapsed(true);
        }}
        {...rest}
      >
        <div className="cinna-layout__sider-content">
          {menu ? (
            <Menu mode="inline" {...menuProps} items={menu} inlineCollapsed={mergedCollapsed} />
          ) : (
            children
          )}
        </div>
        {collapsible && trigger !== null && (
          <button
            type="button"
            className="cinna-layout__sider-trigger"
            aria-label={mergedCollapsed ? 'Expand sider' : 'Collapse sider'}
            onClick={() => setCollapsed(!mergedCollapsed)}
          >
            {trigger ??
              (mergedCollapsed ? (
                <Icon name="chevron-right" size={12} />
              ) : (
                <Icon name="chevron-left" size={12} />
              ))}
          </button>
        )}
      </aside>
    );
  },
);

LayoutSider.displayName = 'LayoutSider';

export const LayoutContent = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...rest }, ref) => (
    <main ref={ref} className={cx('cinna-layout__content', className)} {...rest} />
  ),
);

LayoutContent.displayName = 'LayoutContent';

export const LayoutFooter = React.forwardRef<HTMLElement, LayoutFooterProps>(
  ({ sticky, offsetBottom = 0, height, className, style, ...rest }, ref) => (
    <footer
      ref={ref}
      className={cx('cinna-layout__footer', sticky && 'cinna-layout__footer--sticky', className)}
      style={
        {
          ...(sticky
            ? { '--cinna-layout-footer-bottom': normalizeLayoutCssValue(offsetBottom) }
            : null),
          ...(height !== undefined
            ? { '--cinna-layout-footer-height': normalizeLayoutCssValue(height) }
            : null),
          ...style,
        } as React.CSSProperties
      }
      {...rest}
    />
  ),
);
