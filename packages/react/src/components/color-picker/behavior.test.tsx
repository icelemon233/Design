import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, vi } from 'vitest';
import * as C from '../../index';
afterEach(() => {
  vi.useRealTimers();
});

describe('color-picker behavior', () => {
  it('blocks presets when disabled and preserves controlled color', () => {
    const change = vi.fn();
    const { rerender } = render(
      <C.ColorPicker disabled presets={['#ffffff']} defaultValue="#000000" onChange={change} />,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Pick #ffffff' }));
    expect(change).not.toHaveBeenCalled();
    rerender(<C.ColorPicker value="#000000" showText presets={['#ffffff']} onChange={change} />);
    fireEvent.click(screen.getByRole('button', { name: 'Pick #ffffff' }));
    expect(change).toHaveBeenCalledWith('#ffffff');
    expect(screen.getByText('#000000')).toBeInTheDocument();
  });
});
