import { act, render, screen } from '@testing-library/react';
import { afterEach, vi } from 'vitest';
import * as C from '../../index';
afterEach(() => {
  vi.useRealTimers();
});

describe('spin behavior', () => {
  it('delays its overlay and releases wrapped content', () => {
    vi.useFakeTimers();
    const { container, rerender } = render(
      <C.Spin spinning delay={100} tip="Mixing">
        <button>Edit</button>
      </C.Spin>,
    );
    expect(screen.queryByText('Mixing')).not.toBeInTheDocument();
    act(() => vi.advanceTimersByTime(100));
    expect(screen.getByText('Mixing')).toBeInTheDocument();
    expect(container.querySelector('.cinna-spin__content')).toHaveAttribute('inert');
    rerender(
      <C.Spin spinning={false}>
        <button>Edit</button>
      </C.Spin>,
    );
    expect(container.querySelector('.cinna-spin__content')).not.toHaveAttribute('inert');
  });
});
