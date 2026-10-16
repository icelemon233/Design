import { createEvent, fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { Popup } from '../../index';

describe('popup regression', () => {
  it('opens popup menus by click and closes after menu selection', () => {
    const onSelect = vi.fn();
    const { container } = render(
      <Popup
        mode="menu"
        label="Actions"
        onSelect={onSelect}
        items={[
          { key: 'edit', label: 'Edit' },
          { type: 'divider' },
          { key: 'publish', label: 'Publish', disabled: true },
        ]}
      />,
    );
    const root = container.querySelector('.cinna-popup--menu');

    expect(root).not.toHaveClass('cinna-popup--open');
    fireEvent.click(screen.getByRole('button', { name: 'Actions' }));

    expect(root).toHaveClass('cinna-popup--open');
    expect(screen.getByRole('separator')).toHaveClass('cinna-menu__divider');
    expect(screen.getByRole('menuitem', { name: 'Publish' })).toBeDisabled();

    fireEvent.click(screen.getByRole('menuitem', { name: 'Edit' }));

    expect(onSelect).toHaveBeenCalledWith('edit');
    expect(root).not.toHaveClass('cinna-popup--open');
  });

  it('supports popup menu hover placement, arrows, and context menu coordinates', () => {
    const { container } = render(
      <>
        <Popup
          mode="menu"
          trigger="hover"
          placement="top"
          align="right"
          arrow
          label="Hover menu"
          items={[{ key: 'preview', label: 'Preview' }]}
        />
        <Popup
          mode="menu"
          trigger="contextMenu"
          label="Context menu"
          items={[{ key: 'rename', label: 'Rename' }]}
        />
      </>,
    );
    const [hoverRoot, contextRoot] = Array.from(container.querySelectorAll('.cinna-popup--menu'));

    expect(hoverRoot).toHaveClass(
      'cinna-popup--hover',
      'cinna-popup--top',
      'cinna-popup--align-right',
      'cinna-popup--arrow',
    );
    fireEvent.mouseEnter(hoverRoot);
    expect(hoverRoot).toHaveClass('cinna-popup--open');
    fireEvent.mouseLeave(hoverRoot);
    expect(hoverRoot).not.toHaveClass('cinna-popup--open');

    const contextEvent = createEvent.contextMenu(
      screen.getByRole('button', { name: 'Context menu' }),
      {
        clientX: 128,
        clientY: 240,
      },
    );
    fireEvent(screen.getByRole('button', { name: 'Context menu' }), contextEvent);

    expect(contextEvent.defaultPrevented).toBe(true);
    expect(contextRoot).toHaveClass('cinna-popup--contextMenu', 'cinna-popup--open');
    expect(contextRoot.querySelector('.cinna-popup__panel')).toHaveStyle({
      '--cinna-popup-context-x': '128px',
      '--cinna-popup-context-y': '240px',
    });
  });

  it('supports popup visual styles and customized confirm actions', () => {
    const onConfirm = vi.fn();
    const { container } = render(
      <Popup
        mode="confirm"
        trigger="click"
        title="Ship release?"
        description="The release will be visible to everyone."
        styles={{
          backgroundColor: '#123456',
          titleColor: '#fff7e6',
          titleFontSize: 18,
          contentColor: '#dcefff',
          contentFontSize: '13px',
        }}
        okButtonProps={{ theme: 'berry', children: 'Ship' }}
        cancelButtonProps={{ color: '#594335', backgroundColor: '#fff6df', children: 'Wait' }}
        onConfirm={onConfirm}
      >
        <button type="button">Open confirm</button>
      </Popup>,
    );
    const root = container.querySelector('.cinna-popup');

    expect(root).toHaveStyle({
      '--cinna-popup-bg': '#123456',
      '--cinna-popup-title-color': '#fff7e6',
      '--cinna-popup-title-font-size': '18px',
      '--cinna-popup-content-color': '#dcefff',
      '--cinna-popup-content-font-size': '13px',
    });

    fireEvent.click(screen.getByRole('button', { name: 'Open confirm' }));
    expect(root).toHaveClass('cinna-popup--open', 'cinna-popup--confirm');
    expect(screen.getByText('Ship release?')).toHaveClass('cinna-popup__title');

    fireEvent.click(screen.getByRole('button', { name: 'Ship' }));
    expect(onConfirm).toHaveBeenCalled();
    expect(root).not.toHaveClass('cinna-popup--open');
  });

  it('renders tooltip through popup mode and accepts popup styles', () => {
    const { container } = render(
      <Popup
        mode="tooltip"
        trigger="click"
        title="Helpful hint"
        styles={{ backgroundColor: '#fff8d8', contentColor: '#60452f', contentFontSize: 12 }}
      >
        <button type="button">Need help</button>
      </Popup>,
    );
    const root = container.querySelector('.cinna-popup--tooltip');

    expect(root).toHaveClass('cinna-popup', 'cinna-popup--tooltip');
    expect(root).toHaveStyle({
      '--cinna-popup-bg': '#fff8d8',
      '--cinna-popup-content-color': '#60452f',
      '--cinna-popup-content-font-size': '12px',
    });

    fireEvent.click(screen.getByRole('button', { name: 'Need help' }));

    expect(root).toHaveClass('cinna-popup--open');
    expect(screen.getByRole('tooltip')).toHaveTextContent('Helpful hint');
  });
});
