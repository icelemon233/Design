import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, vi } from 'vitest';
import * as C from '../../index';
afterEach(() => {
  vi.useRealTimers();
});

import { act } from '@testing-library/react';
describe('popup behavior', () => {
  it('merges consumer mouse handlers with hover opening', () => {
    const mouse = vi.fn();
    const { container } = render(<C.Popup label="Hover" content="Details" onMouseEnter={mouse} />);
    fireEvent.mouseEnter(container.firstElementChild!);
    expect(mouse).toHaveBeenCalledOnce();
    expect(screen.getByRole('button', { name: 'Hover' })).toHaveAttribute('aria-expanded', 'true');
  });
  it('ignores stale confirmation results after cancellation and reopening', async () => {
    let resolve!: () => void;
    render(
      <C.Popup
        mode="confirm"
        label="Save"
        onConfirm={() =>
          new Promise<void>((done) => {
            resolve = done;
          })
        }
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));
    fireEvent.click(screen.getByRole('button', { name: 'OK' }));
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));
    await act(async () => {
      resolve();
      await Promise.resolve();
    });
    expect(screen.getByRole('button', { name: 'Save' })).toHaveAttribute('aria-expanded', 'true');
  });
  it('awaits confirmation and shows failures without closing', async () => {
    render(
      <C.Popup
        mode="confirm"
        label="Save"
        defaultOpen
        title="Confirm"
        onConfirm={async () => {
          throw new Error('Save failed');
        }}
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: 'OK' }));
    expect(await screen.findByRole('alert')).toHaveTextContent('Save failed');
    expect(screen.getByRole('button', { name: 'Save' })).toHaveAttribute('aria-expanded', 'true');
  });

  it('respects controlled-closed and disabled hover popups', () => {
    const { container, rerender } = render(
      <C.Popup label="Info" content="Details" trigger="hover" open={false} />,
    );
    fireEvent.mouseEnter(container.firstElementChild!);
    expect(container.querySelector('.cinna-popup')).not.toHaveClass('cinna-popup--open');
    rerender(<C.Popup label="Info" content="Details" disabled open />);
    expect(screen.getByRole('button', { name: 'Info' })).toBeDisabled();
    expect(container.querySelector('.cinna-popup__panel')).toHaveAttribute('aria-hidden', 'true');
  });
});
