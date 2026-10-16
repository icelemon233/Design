import { fireEvent, render, screen } from '@testing-library/react';
import { Tree } from '../../index';

describe('tree regression', () => {
  it('supports uncontrolled tree selection', () => {
    render(
      <Tree
        selectable
        treeData={[{ key: 'root', title: 'Root', children: [{ key: 'leaf', title: 'Leaf' }] }]}
      />,
    );
    const leaf = screen.getByRole('button', { name: 'Leaf' });
    fireEvent.click(leaf);
    expect(leaf).toHaveClass('cinna-tree__node--selected');
  });
});
