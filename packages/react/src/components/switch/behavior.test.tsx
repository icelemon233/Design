import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, vi } from 'vitest';
import * as C from '../../index';
afterEach(() => {
  vi.useRealTimers();
});

describe('switch behavior', () => {
  it('combines click handlers and blocks loading interaction', () => {
    const click = vi.fn(),
      change = vi.fn();
    const { rerender } = render(<C.Switch onClick={click} onChange={change} />);
    fireEvent.click(screen.getByRole('switch'));
    expect(click).toHaveBeenCalledOnce();
    expect(change).toHaveBeenCalledWith(true);
    rerender(<C.Switch loading onChange={change} />);
    expect(screen.getByRole('switch')).toBeDisabled();
  });
});
