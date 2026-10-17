import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, vi } from 'vitest';
import * as C from '../../index';
afterEach(() => {
  vi.useRealTimers();
});

describe('tree-select behavior', () => {
  it('selects from a visible hierarchy and restores focus', () => {
    const change = vi.fn();
    render(
      <C.TreeSelect
        showSearch
        onChange={change}
        treeData={[
          { key: 'root', title: <strong>Root</strong>, children: [{ key: 'leaf', title: 'Leaf' }] },
        ]}
        defaultExpandedKeys={['root']}
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Select node' }));
    expect(screen.getAllByRole('treeitem')).toHaveLength(2);
    fireEvent.click(screen.getByRole('button', { name: 'Leaf' }));
    expect(change).toHaveBeenCalledWith('leaf');
    expect(screen.queryByRole('tree')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Select node' })).toHaveFocus();
  });
});
