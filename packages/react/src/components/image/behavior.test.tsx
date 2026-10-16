import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, vi } from 'vitest';
import * as C from '../../index';
afterEach(() => {
  vi.useRealTimers();
});

describe('image behavior', () => {
  it('updates src after a fallback and closes preview with Escape', () => {
    const { rerender } = render(
      <C.Image src="bad.png" fallback="fallback.png" alt="Cloud" preview />,
    );
    const image = screen.getByRole('button', { name: 'Preview Cloud' });
    fireEvent.error(image);
    expect(image).toHaveAttribute('src', 'fallback.png');
    rerender(<C.Image src="new.png" fallback="fallback.png" alt="Cloud" preview />);
    expect(image).toHaveAttribute('src', 'new.png');
    fireEvent.keyDown(image, { key: 'Enter' });
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
