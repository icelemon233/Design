import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, vi } from 'vitest';
import * as C from '../../index';
afterEach(() => {
  vi.useRealTimers();
});

describe('tabs behavior', () => {
  it('navigates past disabled tabs and associates panels', () => {
    render(
      <C.Tabs
        items={[
          { key: 'a', label: 'A', children: 'Alpha' },
          { key: 'b', label: 'B', disabled: true },
          { key: 'c', label: 'C', children: 'Cream' },
        ]}
      />,
    );
    const a = screen.getByRole('tab', { name: 'A' });
    fireEvent.keyDown(a, { key: 'ArrowRight' });
    const c = screen.getByRole('tab', { name: 'C' });
    expect(c).toHaveAttribute('aria-selected', 'true');
    expect(c).toHaveFocus();
    expect(screen.getByRole('tabpanel')).toHaveAttribute('aria-labelledby', c.id);
    fireEvent.keyDown(c, { key: 'Home' });
    expect(a).toHaveAttribute('aria-selected', 'true');
  });
  it('keeps controlled selection authoritative', () => {
    const change = vi.fn();
    render(
      <C.Tabs
        activeKey="a"
        onChange={change}
        items={[
          { key: 'a', label: 'A' },
          { key: 'b', label: 'B' },
        ]}
      />,
    );
    fireEvent.click(screen.getByRole('tab', { name: 'B' }));
    expect(change).toHaveBeenCalledWith('b');
    expect(screen.getByRole('tab', { name: 'A' })).toHaveAttribute('aria-selected', 'true');
  });
  it('preserves inactive panel state when requested', () => {
    render(
      <C.Tabs
        destroyInactiveTabPanel={false}
        items={[
          { key: 'a', label: 'A', children: <input aria-label="Draft" /> },
          { key: 'b', label: 'B', children: 'Berry' },
        ]}
      />,
    );
    fireEvent.change(screen.getByLabelText('Draft'), { target: { value: 'saved' } });
    fireEvent.click(screen.getByRole('tab', { name: 'B' }));
    fireEvent.click(screen.getByRole('tab', { name: 'A' }));
    expect(screen.getByLabelText('Draft')).toHaveValue('saved');
  });
});
