import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { Alert, Modal, Tabs } from '../../index';

describe('tabs regression', () => {
  it('renders overlays and tabs', () => {
    const { container } = render(
      <>
        <Alert message="Saved" />
        <Modal open title="Recipe">
          Modal content
        </Modal>
        <Tabs items={[{ key: 'one', label: 'One', children: 'Panel one' }]} />
      </>,
    );

    expect(screen.getByRole('dialog')).toHaveTextContent('Modal content');
    expect(screen.getByRole('tab', { name: 'One' })).toHaveAttribute('aria-selected', 'true');
    expect(container.querySelector('.cinna-tabs__active-pill')).toBeInTheDocument();
  });

  it('keeps bordered tab panels stable without switch fade motion', () => {
    const { container } = render(
      <>
        <Tabs
          items={[
            { key: 'overview', label: 'Overview', children: 'Overview panel' },
            { key: 'activity', label: 'Activity', children: 'Activity panel' },
          ]}
        />
        <Tabs
          variant="bordered"
          items={[
            { key: 'tab-1', label: 'Tab 1', children: 'Tab 1 panel' },
            { key: 'tab-2', label: 'Tab 2', children: 'Tab 2 panel' },
          ]}
        />
      </>,
    );

    const [borderlessPanel, borderedPanel] = Array.from(
      container.querySelectorAll('.cinna-tabs__panel'),
    );
    expect(borderlessPanel.className).toContain('cinna-tabs__panel--motion-');
    expect(borderedPanel.className).not.toContain('cinna-tabs__panel--motion-');

    fireEvent.click(screen.getByRole('tab', { name: 'Tab 2' }));
    expect(borderedPanel.className).not.toContain('cinna-tabs__panel--motion-');
  });

  it('supports rich tabs with icons, editing, dragging, and style variables', () => {
    const onChange = vi.fn();
    const onAdd = vi.fn();
    const onClose = vi.fn();
    const onOrderChange = vi.fn();
    const { container } = render(
      <Tabs
        variant="bordered"
        tabPosition="left"
        size="large"
        draggable
        addable
        closable
        defaultActiveKey="activity"
        onChange={onChange}
        onAdd={onAdd}
        onClose={onClose}
        onOrderChange={onOrderChange}
        tabFontSize={16}
        tabFontWeight={800}
        tabColor="#6b584b"
        activeTabColor="#3d8eaa"
        activeTabBackgroundColor="#ffffff"
        tabBorderColor="#ead8c0"
        activeTabBorderColor="#8bd4eb"
        tabRadius={12}
        panelColor="#513323"
        panelBackgroundColor="#fffcf6"
        panelBorderColor="#ead8c0"
        items={[
          { key: 'overview', icon: 'O', label: 'Overview', children: 'Overview panel' },
          { key: 'activity', icon: 'A', label: 'Activity', children: 'Activity panel' },
          {
            key: 'settings',
            icon: 'S',
            label: 'Settings',
            children: 'Settings panel',
            disabled: true,
          },
        ]}
      />,
    );
    const root = container.querySelector('.cinna-tabs');

    expect(root).toHaveClass(
      'cinna-tabs--bordered',
      'cinna-tabs--left',
      'cinna-tabs--large',
      'cinna-tabs--draggable',
    );
    expect(root).toHaveStyle({
      '--cinna-tabs-tab-font-size': '16px',
      '--cinna-tabs-tab-font-weight': '800',
      '--cinna-tabs-tab-color': '#6b584b',
      '--cinna-tabs-active-color': '#3d8eaa',
      '--cinna-tabs-active-bg': '#ffffff',
      '--cinna-tabs-tab-border': '#ead8c0',
      '--cinna-tabs-active-border': '#8bd4eb',
      '--cinna-tabs-tab-radius': '12px',
      '--cinna-tabs-panel-color': '#513323',
      '--cinna-tabs-panel-bg': '#fffcf6',
      '--cinna-tabs-panel-border': '#ead8c0',
    });
    expect(screen.getByRole('tab', { name: /Activity/ })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('A')).toHaveClass('cinna-tabs__icon');

    fireEvent.click(screen.getByRole('tab', { name: /Overview/ }));
    expect(onChange).toHaveBeenCalledWith('overview');

    fireEvent.click(screen.getByRole('button', { name: 'Add tab' }));
    expect(onAdd).toHaveBeenCalled();

    fireEvent.click(screen.getByRole('button', { name: 'Close Overview' }));
    expect(onClose).toHaveBeenCalledWith(
      'overview',
      expect.objectContaining({ key: 'overview' }),
      expect.any(Object),
    );

    fireEvent.dragStart(screen.getByRole('tab', { name: /Overview/ }), {
      dataTransfer: { effectAllowed: '', setData: vi.fn() },
    });
    fireEvent.dragOver(screen.getByRole('tab', { name: /Activity/ }), {
      dataTransfer: { dropEffect: '' },
    });
    fireEvent.drop(screen.getByRole('tab', { name: /Activity/ }), {
      dataTransfer: { dropEffect: '' },
    });
    expect(onOrderChange).toHaveBeenCalledWith(
      ['activity', 'overview', 'settings'],
      expect.arrayContaining([expect.objectContaining({ key: 'overview' })]),
      { fromKey: 'overview', toKey: 'activity' },
    );
  });
});
