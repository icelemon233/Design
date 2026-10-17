import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, vi } from 'vitest';
import * as C from '../../index';
afterEach(() => {
  vi.useRealTimers();
});

describe('textarea behavior', () => {
  it('counts controlled text and accepts bounded auto size', () => {
    const change = vi.fn();
    render(
      <C.TextArea
        value="cloud"
        maxLength={10}
        showCount
        autoSize={{ minRows: 2, maxRows: 4 }}
        onChange={change}
      />,
    );
    expect(screen.getByText('5 / 10')).toBeInTheDocument();
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'cream' } });
    expect(change).toHaveBeenCalled();
    expect(screen.getByRole('textbox')).toHaveValue('cloud');
  });
});
