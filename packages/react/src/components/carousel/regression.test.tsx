import { act, render } from '@testing-library/react';
import { vi } from 'vitest';
import { Carousel } from '../../index';

describe('carousel regression', () => {
  it('autoplays carousel slides', () => {
    vi.useFakeTimers();
    const { container } = render(<Carousel autoplay autoplaySpeed={1000} items={['One', 'Two']} />);
    const track = container.querySelector('.cinna-carousel__track');

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(track).toHaveStyle({ transform: 'translateX(-100%)' });
    vi.useRealTimers();
  });
});
