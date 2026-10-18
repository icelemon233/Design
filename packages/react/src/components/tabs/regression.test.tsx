import React, { useState } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { Tabs, type TabsItem } from '../../index';

const items: TabsItem[] = [
  { key: 'a', label: 'Alpha', children: 'Panel A', closable: true },
  { key: 'b', label: 'Beta', children: 'Panel B', closable: true },
  { key: 'c', label: 'Cream', children: 'Panel C', closable: true },
];

describe('tabs editing and lifecycle', () => {
  it('keeps focus in the widget when only disabled tabs remain after closing', () => {
    const Demo = () => {
      const [tabs, setTabs] = useState<TabsItem[]>([
        items[0],
        { ...items[1], disabled: true, closable: false },
      ]);
      return (
        <Tabs
          items={tabs}
          emptyContent="No available tabs"
          onClose={(key) => setTabs((current) => current.filter((item) => item.key !== key))}
        />
      );
    };
    const { container } = render(<Demo />);
    const active = screen.getByRole('tab', { name: 'Alpha' });
    active.focus();
    fireEvent.keyDown(active, { key: 'Delete' });
    expect(container.querySelector('.cinna-tabs')).toHaveFocus();
    expect(screen.getByRole('status')).toHaveTextContent('No available tabs');
  });
  it('treats an empty string key as an ordinary active and reorderable tab', () => {
    const order = vi.fn();
    const { container } = render(
      <Tabs
        items={[
          { key: '', label: 'Alpha', children: 'Panel A' },
          { key: 'b', label: 'Beta' },
        ]}
        draggable
        onOrderChange={order}
        emptyContent="No tabs"
      />,
    );
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Panel A');
    expect(screen.queryByText('No tabs')).not.toBeInTheDocument();
    expect(container.querySelector('.cinna-tabs__active-pill')).toBeInTheDocument();
    fireEvent.dragStart(screen.getByRole('tab', { name: 'Alpha' }), {
      dataTransfer: { effectAllowed: '', setData: vi.fn() },
    });
    fireEvent.dragOver(screen.getByRole('tab', { name: 'Beta' }), {
      dataTransfer: { dropEffect: '' },
    });
    fireEvent.drop(screen.getByRole('tab', { name: 'Beta' }));
    expect(order).toHaveBeenCalledWith(['b', ''], expect.any(Array), { fromKey: '', toKey: 'b' });
  });
  it('returns focus to the tab selected by the parent after closing', () => {
    const Demo = () => {
      const [tabs, setTabs] = useState(items);
      const [active, setActive] = useState('b');
      return (
        <Tabs
          items={tabs}
          activeKey={active}
          onClose={(key) => {
            setTabs((current) => current.filter((item) => item.key !== key));
            setActive('a');
          }}
        />
      );
    };
    render(<Demo />);
    fireEvent.click(screen.getByRole('button', { name: 'Close Beta' }));
    expect(screen.getByRole('tab', { name: 'Alpha' })).toHaveFocus();
    expect(screen.getByRole('tab', { name: 'Alpha' })).toHaveAttribute('aria-selected', 'true');
  });
  it('supports reserved object-property names as ordinary item keys', () => {
    render(
      <Tabs
        closable
        onClose={vi.fn()}
        items={[
          { key: '__proto__', label: 'Prototype' },
          { key: 'constructor', label: 'Constructor' },
        ]}
      />,
    );
    expect(screen.getByRole('tab', { name: 'Prototype' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('button', { name: 'Close Constructor' })).toBeEnabled();
  });
  it('allows a single item to opt out of global closing', () => {
    const close = vi.fn();
    render(
      <Tabs
        items={[...items.slice(0, 1), { ...items[1], closable: false }]}
        closable
        onClose={close}
      />,
    );
    expect(screen.queryByRole('button', { name: 'Close Beta' })).not.toBeInTheDocument();
    fireEvent.keyDown(screen.getByRole('tab', { name: 'Beta' }), { key: 'Delete' });
    expect(close).not.toHaveBeenCalled();
  });
  it('does not steal focus when the parent completes closing after the user has moved on', () => {
    const close = vi.fn();
    const view = (tabs: TabsItem[]) => (
      <>
        <Tabs items={tabs} onClose={close} />
        <input aria-label="Outside editor" />
      </>
    );
    const { rerender } = render(view(items));
    fireEvent.click(screen.getByRole('button', { name: 'Close Alpha' }));
    screen.getByLabelText('Outside editor').focus();
    rerender(view(items.slice(1)));
    expect(screen.getByLabelText('Outside editor')).toHaveFocus();
  });
  it('closes the active tab and focuses its next available neighbor', () => {
    const Demo = () => {
      const [tabs, setTabs] = useState(items);
      return (
        <Tabs
          items={tabs}
          defaultActiveKey="b"
          onClose={(key) => setTabs((current) => current.filter((item) => item.key !== key))}
        />
      );
    };
    render(<Demo />);
    fireEvent.click(screen.getByRole('button', { name: 'Close Beta' }));
    expect(screen.getByRole('tab', { name: 'Cream' })).toHaveFocus();
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Panel C');
    fireEvent.keyDown(screen.getByRole('tab', { name: 'Cream' }), { key: 'Delete' });
    expect(screen.getByRole('tab', { name: 'Alpha' })).toHaveFocus();
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Panel A');
  });
  it('moves focus to the add action when the last tab is removed', () => {
    const Demo = () => {
      const [tabs, setTabs] = useState(items.slice(0, 1));
      return (
        <Tabs
          items={tabs}
          addable
          emptyContent="No open tabs"
          onClose={() => setTabs([])}
          onAdd={() => setTabs(items.slice(0, 1))}
        />
      );
    };
    render(<Demo />);
    fireEvent.keyDown(screen.getByRole('tab'), { key: 'Delete' });
    expect(screen.queryByRole('tablist')).not.toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveTextContent('No open tabs');
    expect(screen.getByRole('button', { name: 'Add tab' })).toHaveFocus();
    fireEvent.click(screen.getByRole('button', { name: 'Add tab' }));
    expect(screen.getByRole('tab')).toHaveAttribute('aria-selected', 'true');
  });
  it('requests keyboard and mouse reordering without mutating supplied items', () => {
    const onOrderChange = vi.fn();
    render(<Tabs items={items} draggable onOrderChange={onOrderChange} />);
    fireEvent.keyDown(screen.getByRole('tab', { name: 'Alpha' }), {
      key: 'ArrowRight',
      altKey: true,
    });
    expect(onOrderChange).toHaveBeenLastCalledWith(['b', 'a', 'c'], expect.any(Array), {
      fromKey: 'a',
      toKey: 'b',
    });
    fireEvent.dragStart(screen.getByRole('tab', { name: 'Alpha' }), {
      dataTransfer: { effectAllowed: '', setData: vi.fn() },
    });
    fireEvent.dragOver(screen.getByRole('tab', { name: 'Cream' }), {
      dataTransfer: { dropEffect: '' },
    });
    fireEvent.drop(screen.getByRole('tab', { name: 'Cream' }));
    expect(onOrderChange).toHaveBeenLastCalledWith(['b', 'c', 'a'], expect.any(Array), {
      fromKey: 'a',
      toKey: 'c',
    });
    expect(items.map((item) => item.key)).toEqual(['a', 'b', 'c']);
  });
  it('disables all operations while keeping the selected content visible', () => {
    const onAdd = vi.fn(),
      onClose = vi.fn(),
      onChange = vi.fn();
    render(
      <Tabs items={items} disabled addable onAdd={onAdd} onClose={onClose} onChange={onChange} />,
    );
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Panel A');
    for (const button of screen.getAllByRole('tab')) expect(button).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Add tab' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Close Alpha' })).toBeDisabled();
    fireEvent.click(screen.getByRole('tab', { name: 'Beta' }));
    expect(onChange).not.toHaveBeenCalled();
  });
  it('keeps tab and panel relationships valid for keys containing spaces', () => {
    render(<Tabs items={[{ key: 'a b', label: 'Notes', children: 'Draft' }]} />);
    const tab = screen.getByRole('tab'),
      panel = screen.getByRole('tabpanel');
    expect(tab.id).not.toMatch(/\s/);
    expect(tab).toHaveAttribute('aria-controls', panel.id);
    expect(panel).toHaveAttribute('aria-labelledby', tab.id);
  });
});
