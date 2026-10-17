import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, vi } from 'vitest';
import * as C from '../../index';
afterEach(() => {
  vi.useRealTimers();
});

describe('radio behavior', () => {
  it('keeps a controlled group unchanged and disables the whole group', () => {
    const change = vi.fn();
    const options = [
      { value: 'a', label: 'A' },
      { value: 'b', label: 'B' },
    ];
    const { rerender } = render(<C.RadioGroup value="a" options={options} onChange={change} />);
    fireEvent.click(screen.getByLabelText('B'));
    expect(change).toHaveBeenCalledWith('b');
    expect(screen.getByLabelText('A')).toBeChecked();
    rerender(<C.RadioGroup disabled options={options} />);
    expect(screen.getByLabelText('B')).toBeDisabled();
  });
});
