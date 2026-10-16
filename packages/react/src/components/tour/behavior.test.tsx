import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, vi } from 'vitest';
import * as C from '../../index';
afterEach(() => {
  vi.useRealTimers();
});

describe('tour behavior', () => {
  it('handles empty steps, advances and finishes', () => {
    const finish = vi.fn();
    const { rerender } = render(<C.Tour steps={[]} />);
    expect(screen.queryByText('Next')).not.toBeInTheDocument();
    rerender(<C.Tour onFinish={finish} steps={[{ title: 'Welcome' }, { title: 'Ready' }]} />);
    fireEvent.click(screen.getByText('Next'));
    expect(screen.getByText('Ready')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Done'));
    expect(finish).toHaveBeenCalledOnce();
    expect(screen.queryByText('Ready')).not.toBeInTheDocument();
  });
});
