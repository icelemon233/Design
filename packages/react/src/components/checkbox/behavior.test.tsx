import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { afterEach, vi } from 'vitest';
import * as C from '../../index';
afterEach(() => {
  vi.useRealTimers();
});

describe('checkbox behavior', () => {
  it('exposes native indeterminate state and blocks disabled choices', () => {
    const change = vi.fn();
    const ref = React.createRef<HTMLInputElement>();
    render(<C.Checkbox ref={ref} label="Mixed" indeterminate disabled onChange={change} />);
    expect(ref.current?.indeterminate).toBe(true);
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-checked', 'mixed');
    fireEvent.click(screen.getByLabelText('Mixed'));
    expect(change).not.toHaveBeenCalled();
  });
});
