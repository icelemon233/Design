import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { Breadcrumb } from '../../index';

describe('breadcrumb regression', () => {
  it('allows breadcrumb links to be handled locally', () => {
    const onItemClick = vi.fn((event: { preventDefault: () => void }) => event.preventDefault());
    window.location.hash = '#/breadcrumb';

    render(
      <Breadcrumb
        items={[
          { key: 'dashboard', title: 'Dashboard', href: '#dashboard' },
          { key: 'navigation', title: 'Navigation' },
        ]}
        onItemClick={onItemClick}
      />,
    );

    fireEvent.click(screen.getByRole('link', { name: 'Dashboard' }));

    expect(onItemClick).toHaveBeenCalledWith(
      expect.any(Object),
      { key: 'dashboard', title: 'Dashboard', href: '#dashboard' },
      0,
    );
    expect(window.location.hash).toBe('#/breadcrumb');
  });

  it('renders breadcrumb icons, menu levels, separators, and item styles', () => {
    const onMenuSelect = vi.fn();
    const { container } = render(
      <Breadcrumb
        separator=">"
        items={[
          {
            key: 'home',
            title: 'Home',
            icon: 'H',
            separator: ':',
            color: '#3d8eaa',
            fontWeight: 900,
          },
          {
            key: 'section',
            title: 'Section',
            color: '#8a6c5f',
            fontWeight: 700,
            menu: [
              { key: 'general', label: 'General' },
              { key: 'navigation', label: 'Navigation' },
            ],
          },
          { key: 'current', title: 'Current', fontStyle: 'italic' },
        ]}
        onMenuSelect={onMenuSelect}
      />,
    );

    expect(container.querySelector('.cinna-breadcrumb__icon')).toHaveTextContent('H');
    expect(screen.getByText(':')).toBeInTheDocument();
    expect(screen.getByText('>')).toBeInTheDocument();
    expect(screen.getByText('Home').closest('.cinna-breadcrumb__item')).toHaveStyle({
      color: '#3d8eaa',
      fontWeight: '900',
    });
    expect(screen.getByText('Section').closest('summary')).toHaveStyle({
      color: '#8a6c5f',
      fontWeight: '700',
    });
    expect(screen.getByText('Current').closest('.cinna-breadcrumb__item')).toHaveStyle({
      fontStyle: 'italic',
    });

    fireEvent.click(screen.getByRole('menuitem', { name: 'Navigation' }));
    expect(onMenuSelect).toHaveBeenCalledWith(
      'navigation',
      expect.objectContaining({ key: 'section' }),
      1,
    );
  });
});
