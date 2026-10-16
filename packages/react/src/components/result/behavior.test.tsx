import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, vi } from 'vitest';
import * as C from '../../index';
afterEach(() => {
  vi.useRealTimers();
});

describe('result behavior', () => {
  it('shows an HTTP error result and a working recovery action', () => {
    const click = vi.fn();
    render(
      <C.Result
        status="404"
        title="Recipe missing"
        extra={<button onClick={click}>Back</button>}
      />,
    );
    expect(screen.getByText('404')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Back'));
    expect(click).toHaveBeenCalledOnce();
  });
});
