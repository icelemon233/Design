import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { Layout, LayoutContent, LayoutFooter, LayoutHeader, LayoutSider } from '../../index';

describe('layout regression', () => {
  it('supports sticky layout regions and collapsible sider sizing', () => {
    const onCollapse = vi.fn();
    const { container } = render(
      <Layout hasSider>
        <LayoutSider
          width={188}
          collapsedWidth={76}
          collapsible
          defaultCollapsed
          sticky
          expandOnHover
          onCollapse={onCollapse}
        >
          Project navigation
        </LayoutSider>
        <Layout>
          <LayoutHeader sticky offsetTop={12} height={56}>
            Header
          </LayoutHeader>
          <LayoutContent>Content</LayoutContent>
          <LayoutFooter sticky offsetBottom={8} height={48}>
            Footer
          </LayoutFooter>
        </Layout>
      </Layout>,
    );

    const layout = container.querySelector('.cinna-layout');
    const sider = container.querySelector('.cinna-layout__sider');
    const header = container.querySelector('.cinna-layout__header');
    const footer = container.querySelector('.cinna-layout__footer');

    expect(layout).toHaveClass('cinna-layout--has-sider');
    expect(sider).toHaveClass(
      'cinna-layout__sider--sticky',
      'cinna-layout__sider--collapsible',
      'cinna-layout__sider--collapsed',
    );
    expect(sider).toHaveStyle({
      '--cinna-layout-sider-width': '188px',
      '--cinna-layout-sider-collapsed-width': '76px',
    });
    expect(header).toHaveClass('cinna-layout__header--sticky');
    expect(header).toHaveStyle({
      '--cinna-layout-header-top': '12px',
      '--cinna-layout-header-height': '56px',
    });
    expect(footer).toHaveClass('cinna-layout__footer--sticky');
    expect(footer).toHaveStyle({
      '--cinna-layout-footer-bottom': '8px',
      '--cinna-layout-footer-height': '48px',
    });

    fireEvent.click(screen.getByRole('button', { name: 'Expand sider' }));
    expect(onCollapse).toHaveBeenCalledWith(false);
    expect(sider).not.toHaveClass('cinna-layout__sider--collapsed');
  });

  it('renders layout sider navigation through menu and syncs collapsed state', () => {
    const { container } = render(
      <Layout hasSider>
        <LayoutSider
          collapsible
          defaultCollapsed
          menu={[
            { key: 'dashboard', icon: 'D', label: 'Dashboard' },
            { key: 'settings', icon: 'S', label: 'Settings' },
          ]}
          menuProps={{ defaultSelectedKey: 'dashboard' }}
        />
        <LayoutContent>Content</LayoutContent>
      </Layout>,
    );
    const sider = container.querySelector('.cinna-layout__sider');
    const menu = container.querySelector('.cinna-menu');

    expect(sider).toHaveClass('cinna-layout__sider--with-menu', 'cinna-layout__sider--collapsed');
    expect(menu).toHaveClass('cinna-menu--inline', 'cinna-menu--collapsed');
    expect(screen.getByRole('menuitem', { name: 'D' })).toHaveClass('cinna-menu__item--active');

    fireEvent.click(screen.getByRole('button', { name: 'Expand sider' }));
    expect(menu).not.toHaveClass('cinna-menu--collapsed');
  });
});
