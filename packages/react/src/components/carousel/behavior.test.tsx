import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, vi } from 'vitest';
import * as C from '../../index';
afterEach(() => {
  vi.useRealTimers();
});

describe('carousel behavior', () => {
  it('clamps removed slides and pauses autoplay on hover', () => {
    vi.useFakeTimers();
    const { container, rerender } = render(
      <C.Carousel defaultActiveIndex={2} items={['A', 'B', 'C']} />,
    );
    rerender(<C.Carousel items={['A']} />);
    expect(container.querySelector('.cinna-carousel__track')).toHaveStyle({
      transform: 'translateX(-0%)',
    });
    rerender(<C.Carousel autoplay autoplaySpeed={100} items={['A', 'B']} />);
    fireEvent.mouseEnter(screen.getByRole('region'));
    act(() => vi.advanceTimersByTime(200));
    expect(container.querySelector('.cinna-carousel__track')).toHaveStyle({
      transform: 'translateX(-0%)',
    });
  });
});
