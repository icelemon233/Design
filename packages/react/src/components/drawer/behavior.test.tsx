import { fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';
import { afterEach, vi } from 'vitest';
import * as C from '../../index';
afterEach(() => {
  vi.useRealTimers();
});

describe('drawer behavior', () => {
  it('closes with Escape and restores focus and scrolling', () => {
    const Example = () => {
      const [open, setOpen] = useState(false);
      return (
        <>
          <button onClick={() => setOpen(true)}>Open</button>
          <C.Drawer open={open} title="Recipe" onClose={() => setOpen(false)}>
            <input aria-label="Name" />
          </C.Drawer>
        </>
      );
    };
    render(<Example />);
    const opener = screen.getByText('Open');
    opener.focus();
    fireEvent.click(opener);
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-labelledby');
    expect(document.body.style.overflow).toBe('hidden');
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(opener).toHaveFocus();
    expect(document.body.style.overflow).not.toBe('hidden');
  });
});
