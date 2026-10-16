import { fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, vi } from 'vitest';
import * as C from '../../index';
afterEach(() => {
  vi.useRealTimers();
});

describe('time-picker behavior', () => {
  it('selects stepped minutes and blocks disabled hours', () => {
    const change = vi.fn();
    render(
      <C.TimePicker
        defaultValue="09:00"
        minuteStep={15}
        disabledHours={() => [10]}
        onChange={change}
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Open time panel' }));
    expect(
      within(screen.getByRole('listbox', { name: 'Hours' })).getByRole('option', { name: '10' }),
    ).toBeDisabled();
    fireEvent.click(
      within(screen.getByRole('listbox', { name: 'Minutes' })).getByRole('option', { name: '30' }),
    );
    expect(screen.getByLabelText('Choose time')).toHaveValue('09:30');
    expect(change).toHaveBeenCalled();
  });
});
