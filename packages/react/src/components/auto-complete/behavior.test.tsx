import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, vi } from 'vitest';
import * as C from '../../index';
afterEach(() => {
  vi.useRealTimers();
});

describe('auto-complete behavior', () => {
  it('does not select a suggestion while composing with an IME', () => {
    const select = vi.fn();
    render(<C.AutoComplete defaultOpen options={['cloud', 'cream']} onSelect={select} />);
    const input = screen.getByRole('combobox');
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    fireEvent.keyDown(input, { key: 'Enter', isComposing: true });
    expect(select).not.toHaveBeenCalled();
  });
});
