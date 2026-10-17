import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, vi } from 'vitest';
import * as C from '../../index';
afterEach(() => {
  vi.useRealTimers();
});

describe('slider behavior', () => {
  it('updates the native range and bounds equal-range mark positions', () => {
    const change = vi.fn();
    const { rerender } = render(
      <C.Slider min={0} max={100} defaultValue={20} showValue tooltip onChange={change} />,
    );
    fireEvent.change(screen.getByRole('slider'), { target: { value: '55' } });
    expect(change).toHaveBeenCalled();
    expect(screen.getByRole('slider')).toHaveValue('55');
    rerender(<C.Slider min={5} max={5} marks={{ 5: 'Only' }} />);
    expect(screen.getByText('Only')).toHaveStyle({ left: '0%' });
  });
});
