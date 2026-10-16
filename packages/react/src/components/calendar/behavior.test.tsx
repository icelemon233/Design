import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, vi } from 'vitest';
import * as C from '../../index';
afterEach(() => {
  vi.useRealTimers();
});

describe('calendar behavior', () => {
  it('moves from January 31 to February without overflow', () => {
    const change = vi.fn();
    render(
      <C.Calendar
        defaultValue={new Date(2026, 0, 31)}
        onChange={change}
        disabledDate={(date) => date.getDate() === 1}
      />,
    );
    fireEvent.click(screen.getByLabelText('Next month'));
    const next = change.mock.calls[0][0] as Date;
    expect(next.getMonth()).toBe(1);
    expect(next.getDate()).toBe(28);
    expect(
      screen
        .getAllByRole('button')
        .filter((button) => button.textContent === '1')
        .every((button) => (button as HTMLButtonElement).disabled),
    ).toBe(true);
  });
});
