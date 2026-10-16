import { render, screen } from '@testing-library/react';
import { afterEach, vi } from 'vitest';
import * as C from '../../index';
afterEach(() => {
  vi.useRealTimers();
});

describe('progress behavior', () => {
  it('clamps values and exposes circle progress', () => {
    const { container, rerender } = render(
      <C.Progress type="circle" percent={42} strokeColor="#123456" />,
    );
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '42');
    expect(container.querySelector('.cinna-progress__track')).toHaveStyle({
      '--cinna-progress-percent': '42',
      '--cinna-progress-color': '#123456',
    });
    rerender(<C.Progress percent={140} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100');
  });
});
