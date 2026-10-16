import { render, screen } from '@testing-library/react';
import { afterEach, vi } from 'vitest';
import * as C from '../../index';
afterEach(() => {
  vi.useRealTimers();
});

describe('loading behavior', () => {
  it('announces the label and supports inactive rendering', () => {
    const { rerender } = render(<C.Loading label="Mixing" />);
    expect(screen.getByRole('status')).toHaveTextContent('Mixing');
    rerender(<C.Loading active={false} />);
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });
});
