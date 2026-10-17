import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, vi } from 'vitest';
import * as C from '../../index';
afterEach(() => {
  vi.useRealTimers();
});

describe('input behavior', () => {
  it('forwards controlled changes and native disabled behavior', () => {
    const change = vi.fn();
    const { rerender } = render(<C.Input label="Email" value="a@b.com" onChange={change} />);
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'c@d.com' } });
    expect(change).toHaveBeenCalled();
    expect(screen.getByLabelText('Email')).toHaveValue('a@b.com');
    rerender(<C.Input label="Email" disabled />);
    expect(screen.getByLabelText('Email')).toBeDisabled();
  });
});
