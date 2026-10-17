import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, vi } from 'vitest';
import * as C from '../../index';
afterEach(() => {
  vi.useRealTimers();
});

describe('transfer behavior', () => {
  it('honors controlled target keys and disabled items', () => {
    const change = vi.fn();
    const data = [
      { key: 'a', title: 'A' },
      { key: 'b', title: 'B', disabled: true },
    ];
    const { rerender } = render(<C.Transfer targetKeys={[]} dataSource={data} onChange={change} />);
    fireEvent.click(screen.getByLabelText('Add A'));
    expect(change).toHaveBeenCalledWith(['a']);
    expect(screen.getByRole('region', { name: 'Source items' })).toHaveTextContent('A');
    rerender(<C.Transfer targetKeys={['a']} dataSource={data} onChange={change} />);
    expect(screen.getByRole('region', { name: 'Target items' })).toHaveTextContent('A');
    expect(screen.getByLabelText('Add B')).toBeDisabled();
  });
});
