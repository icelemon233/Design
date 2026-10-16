import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, vi } from 'vitest';
import * as C from '../../index';
afterEach(() => {
  vi.useRealTimers();
});

describe('segmented behavior', () => {
  it('starts at and navigates between enabled options', () => {
    render(
      <C.Segmented
        options={[
          { value: 'a', label: 'A', disabled: true },
          { value: 'b', label: 'B' },
          { value: 'c', label: 'C' },
        ]}
      />,
    );
    const b = screen.getByRole('radio', { name: 'B' });
    expect(b).toHaveAttribute('aria-checked', 'true');
    fireEvent.keyDown(b, { key: 'ArrowRight' });
    expect(screen.getByRole('radio', { name: 'C' })).toHaveAttribute('aria-checked', 'true');
    fireEvent.keyDown(screen.getByRole('radio', { name: 'C' }), { key: 'ArrowRight' });
    expect(b).toHaveFocus();
  });
});
