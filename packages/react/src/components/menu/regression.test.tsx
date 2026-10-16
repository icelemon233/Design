import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { Menu } from '../../index';

describe('menu regression', () => {
  it('supports rich menu selection, groups, and submenu open state', () => {
    const onSelect = vi.fn();
    const onDeselect = vi.fn();
    const onOpenChange = vi.fn();
    const { container } = render(
      <Menu
        mode="inline"
        multiple
        defaultSelectedKeys={['draft']}
        defaultOpenKeys={['content']}
        onSelect={onSelect}
        onDeselect={onDeselect}
        onOpenChange={onOpenChange}
        items={[
          {
            type: 'group',
            label: 'Workspace',
            children: [
              { key: 'draft', label: 'Draft', icon: 'D', extra: '3' },
              { type: 'divider', dashed: true },
              {
                key: 'content',
                label: 'Content',
                children: [
                  { key: 'article', label: 'Article' },
                  { key: 'release', label: 'Release', danger: true },
                ],
              },
            ],
          },
        ]}
      />,
    );

    expect(container.querySelector('.cinna-menu')).toHaveClass('cinna-menu--inline');
    expect(screen.getByText('Workspace')).toHaveClass('cinna-menu__group-title');
    expect(screen.getByRole('separator')).toHaveClass('cinna-menu__divider--dashed');
    expect(screen.getByRole('menuitem', { name: /Draft/ })).toHaveClass('cinna-menu__item--active');
    expect(screen.getByRole('menuitem', { name: 'Release' })).toHaveClass(
      'cinna-menu__item--danger',
    );

    fireEvent.click(screen.getByRole('menuitem', { name: 'Article' }));
    expect(onSelect).toHaveBeenCalledWith(
      'article',
      expect.objectContaining({
        selectedKeys: ['draft', 'article'],
        keyPath: ['article', 'content'],
      }),
    );

    fireEvent.click(screen.getByRole('menuitem', { name: /Draft/ }));
    expect(onDeselect).toHaveBeenCalledWith(
      'draft',
      expect.objectContaining({ selectedKeys: ['article'] }),
    );

    fireEvent.click(screen.getByRole('menuitem', { name: /Content/ }));
    expect(onOpenChange).toHaveBeenCalledWith([]);
  });

  it('supports collapsed inline menu tooltip and semantic styling hooks', () => {
    const { container } = render(
      <Menu
        mode="inline"
        inlineCollapsed
        defaultSelectedKey="mail"
        classNames={{ item: 'custom-menu-item' }}
        styles={{ root: { borderColor: '#123456' }, itemIcon: { color: '#df6677' } }}
        items={[
          { key: 'mail', icon: 'M', label: 'Mail', title: 'Mailbox' },
          { key: 'files', icon: 'F', label: 'Files' },
        ]}
      />,
    );
    const root = container.querySelector('.cinna-menu');

    expect(root).toHaveClass('cinna-menu--collapsed');
    expect(root).toHaveStyle({ borderColor: '#123456' });
    expect(screen.getByRole('menuitem', { name: 'M' })).toHaveClass(
      'custom-menu-item',
      'cinna-menu__item--title-only',
    );
    expect(container.querySelector('.cinna-menu__icon')).toHaveStyle({ color: '#df6677' });
    expect(container.querySelector('.cinna-popup--tooltip')).toBeInTheDocument();
  });

  it('renders a movable selected layer for horizontal menu', () => {
    const { container } = render(
      <Menu
        mode="horizontal"
        defaultSelectedKey="dashboard"
        items={[
          { key: 'dashboard', label: 'Dashboard' },
          { key: 'settings', label: 'Settings' },
        ]}
      />,
    );

    expect(container.querySelector('.cinna-menu')).toHaveClass('cinna-menu--horizontal');
    expect(container.querySelector('.cinna-menu__active-pill')).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: 'Dashboard' })).toHaveClass(
      'cinna-menu__item--active',
    );
  });

  it('keeps the submenu popup shell when popupRender customizes menu content', () => {
    const { container } = render(
      <Menu
        triggerSubMenuAction="click"
        styles={{ popup: { minWidth: 220 }, subMenuList: { gap: 10 } }}
        popupRender={(node) => <div data-testid="menu-popup-render">{node}</div>}
        items={[
          {
            key: 'create',
            label: 'Create',
            children: [
              { key: 'doc', label: 'Document' },
              { key: 'board', label: 'Board' },
            ],
          },
        ]}
      />,
    );

    fireEvent.click(screen.getByRole('menuitem', { name: /Create/ }));

    const subMenu = container.querySelector('.cinna-menu__submenu') as HTMLElement;
    const popup = Array.from(subMenu.children).find((child) =>
      child.classList.contains('cinna-menu__submenu-popup'),
    ) as HTMLElement | undefined;
    const customContent = screen.getByTestId('menu-popup-render');
    const list = customContent.querySelector('.cinna-menu__submenu-list') as HTMLElement;

    expect(popup).toBeInTheDocument();
    expect(popup).toHaveClass('cinna-menu__submenu-popup--open');
    expect(popup).toHaveStyle({ minWidth: '220px' });
    expect(popup).toContainElement(customContent);
    expect(list).toHaveStyle({ gap: '10px' });
    expect(list).toContainElement(screen.getByRole('menuitem', { name: 'Document' }));
    expect(list).toContainElement(screen.getByRole('menuitem', { name: 'Board' }));
  });
});
