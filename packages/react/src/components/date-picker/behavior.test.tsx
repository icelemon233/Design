import { fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, vi } from 'vitest';
import * as C from '../../index';
afterEach(() => {
  vi.useRealTimers();
});

describe('date-picker behavior', () => {
  it('commits a valid date through the native change contract', () => {
    const change = vi.fn();
    render(<C.DatePicker defaultValue="2026-01-15" min="2026-01-10" onChange={change} />);
    fireEvent.click(screen.getByRole('button', { name: 'Open calendar' }));
    const days = within(screen.getByRole('dialog'))
      .getAllByRole('button')
      .filter((button) => button.getAttribute('aria-pressed') !== null);
    expect(days.some((button) => (button as HTMLButtonElement).disabled)).toBe(true);
    fireEvent.click(
      days.find(
        (button) => button.textContent === '20' && !(button as HTMLButtonElement).disabled,
      )!,
    );
    expect(change).toHaveBeenCalled();
    expect(screen.getByLabelText('Choose date')).toHaveValue('2026-01-20');
  });
  it('does not open a read-only calendar', () => {
    render(<C.DatePicker readOnly />);
    expect(screen.getByRole('button', { name: 'Open calendar' })).toBeDisabled();
  });
});
