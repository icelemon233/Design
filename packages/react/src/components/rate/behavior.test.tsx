import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, vi } from 'vitest';
import * as C from '../../index';
afterEach(() => {
  vi.useRealTimers();
});

describe('rate behavior', () => {
  it('supports half-star keyboard steps and disabled state', () => {
    const change = vi.fn();
    const { rerender } = render(<C.Rate allowHalf defaultValue={2} onChange={change} />);
    fireEvent.keyDown(screen.getByRole('slider'), { key: 'ArrowRight' });
    expect(change).toHaveBeenLastCalledWith(2.5);
    expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '2.5');
    fireEvent.keyDown(screen.getByRole('slider'), { key: 'End' });
    expect(change).toHaveBeenLastCalledWith(5);
    rerender(<C.Rate disabled onChange={change} />);
    expect(screen.getByRole('slider')).toHaveAttribute('tabindex', '-1');
  });
});
