import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, vi } from 'vitest';
import * as C from '../../index';
afterEach(() => {
  vi.useRealTimers();
});

describe('input-number behavior', () => {
  it('preserves typed fractions and accepts a controlled empty value', () => {
    const { rerender } = render(<C.InputNumber />);
    fireEvent.change(screen.getByRole('spinbutton'), { target: { value: '3.141' } });
    expect(screen.getByRole('spinbutton')).toHaveValue(3.141);
    rerender(<C.InputNumber value={null} />);
    expect(screen.getByRole('spinbutton')).toHaveValue(null);
  });

  it('steps decimals exactly and respects boundaries and read-only mode', () => {
    const change = vi.fn();
    const { rerender } = render(
      <C.InputNumber defaultValue={0.1} step={0.2} max={0.3} onChange={change} />,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Increase value' }));
    expect(screen.getByRole('spinbutton')).toHaveValue(0.3);
    expect(screen.getByRole('button', { name: 'Increase value' })).toBeDisabled();
    rerender(<C.InputNumber readOnly value={2} onChange={change} />);
    expect(screen.getByRole('button', { name: 'Decrease value' })).toBeDisabled();
  });
});
