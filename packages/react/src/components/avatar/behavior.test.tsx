import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, vi } from 'vitest';
import * as C from '../../index';
afterEach(() => {
  vi.useRealTimers();
});

describe('avatar behavior', () => {
  it('falls back after an image error and recovers for a new src', () => {
    const { rerender } = render(
      <C.Avatar src="bad.png" alt="Cinna">
        CN
      </C.Avatar>,
    );
    fireEvent.error(screen.getByRole('img'));
    expect(screen.getByText('CN')).toBeInTheDocument();
    rerender(
      <C.Avatar src="new.png" alt="Cinna">
        CN
      </C.Avatar>,
    );
    expect(screen.getByRole('img')).toHaveAttribute('src', 'new.png');
  });
});
