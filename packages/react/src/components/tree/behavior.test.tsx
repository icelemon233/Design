import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, vi } from 'vitest';
import * as C from '../../index';
afterEach(() => {
  vi.useRealTimers();
});

describe('tree behavior', () => {
  it('normalizes default checked parents while leaving disabled children unchanged', () => {
    render(
      <C.Tree
        checkable
        defaultCheckedKeys={['root']}
        treeData={[
          {
            key: 'root',
            title: 'Root',
            children: [
              { key: 'a', title: 'A' },
              { key: 'b', title: 'B', disabled: true },
            ],
          },
        ]}
      />,
    );
    expect(screen.getByLabelText('Check A')).toBeChecked();
    expect(screen.getByLabelText('Check B')).not.toBeChecked();
  });

  it('skips disabled nodes and cascades keyboard checks', () => {
    const check = vi.fn();
    render(
      <C.Tree
        checkable
        onCheck={check}
        treeData={[
          { key: 'disabled', title: 'Locked', disabled: true },
          {
            key: 'root',
            title: 'Root',
            children: [
              { key: 'a', title: 'A' },
              { key: 'b', title: 'B' },
            ],
          },
        ]}
      />,
    );
    const root = screen.getByRole('treeitem', { name: 'Root' });
    expect(root).toHaveAttribute('tabindex', '0');
    fireEvent.keyDown(root, { key: ' ' });
    expect(check).toHaveBeenCalledWith(expect.arrayContaining(['root', 'a', 'b']));
    fireEvent.keyDown(root, { key: 'ArrowDown' });
    expect(screen.getByRole('treeitem', { name: 'A' })).toHaveFocus();
  });
});
