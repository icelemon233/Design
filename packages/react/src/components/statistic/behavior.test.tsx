import { render, screen } from '@testing-library/react';
import { afterEach, vi } from 'vitest';
import * as C from '../../index';
afterEach(() => {
  vi.useRealTimers();
});

describe('statistic behavior', () => {
  it('formats precision, separators and custom values', () => {
    const { rerender } = render(<C.Statistic value={12345.6} precision={2} />);
    expect(screen.getByText('12,345.60')).toBeInTheDocument();
    rerender(<C.Statistic value={20} formatter={(value) => String(value) + ' clouds'} />);
    expect(screen.getByText('20 clouds')).toBeInTheDocument();
  });
});
