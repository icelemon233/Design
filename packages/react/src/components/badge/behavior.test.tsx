import { render, screen } from '@testing-library/react';
import { afterEach, vi } from 'vitest';
import * as C from '../../index';
afterEach(() => {
  vi.useRealTimers();
});

describe('badge behavior', () => {
  it('shows status dots and handles zero and overflow counts', () => {
    const { container, rerender } = render(<C.Badge status="success" text="Ready" />);
    expect(container.querySelector('.cinna-badge__mark--dot')).toBeInTheDocument();
    expect(screen.getByText('Ready')).toBeInTheDocument();
    rerender(<C.Badge count={0} />);
    expect(container.querySelector('.cinna-badge__mark')).not.toBeInTheDocument();
    rerender(<C.Badge count={101} overflowCount={99} />);
    expect(screen.getByText('99+')).toBeInTheDocument();
  });
});
