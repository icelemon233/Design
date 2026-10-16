import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, vi } from 'vitest';
import * as C from '../../index';
afterEach(() => {
  vi.useRealTimers();
});

describe('alert behavior', () => {
  it('announces errors and dismisses once', () => {
    const close = vi.fn();
    render(<C.Alert type="error" message="Recipe failed" closable onClose={close} />);
    expect(screen.getByRole('alert')).toHaveTextContent('Recipe failed');
    fireEvent.click(screen.getByLabelText('Close alert'));
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(close).toHaveBeenCalledOnce();
  });
});
