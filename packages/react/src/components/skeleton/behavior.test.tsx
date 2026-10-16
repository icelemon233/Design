import { render, screen } from '@testing-library/react';
import { afterEach, vi } from 'vitest';
import * as C from '../../index';
afterEach(() => {
  vi.useRealTimers();
});

describe('skeleton behavior', () => {
  it('reveals children after loading and bounds row counts', () => {
    const { container, rerender } = render(<C.Skeleton rows={-2}>Loaded</C.Skeleton>);
    expect(screen.queryByText('Loaded')).not.toBeInTheDocument();
    expect(container.querySelectorAll('.cinna-skeleton__line')).toHaveLength(1);
    rerender(<C.Skeleton loading={false}>Loaded</C.Skeleton>);
    expect(screen.getByText('Loaded')).toBeInTheDocument();
  });
});
