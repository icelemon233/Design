import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, vi } from 'vitest';
import * as C from '../../index';
afterEach(() => {
  vi.useRealTimers();
});

describe('tag behavior', () => {
  it('allows a close handler to prevent removal', () => {
    render(
      <C.Tag closable onClose={(event) => event.preventDefault()}>
        Keep
      </C.Tag>,
    );
    fireEvent.click(screen.getByLabelText('Close tag'));
    expect(screen.getByText('Keep')).toBeInTheDocument();
  });
});
