import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, vi } from 'vitest';
import * as C from '../../index';
afterEach(() => {
  vi.useRealTimers();
});

describe('collapse behavior', () => {
  it('separates extra actions and honors controlled accordion state', () => {
    const action = vi.fn(),
      change = vi.fn();
    render(
      <C.Collapse
        accordion
        activeKey="a"
        onChange={change}
        items={[
          {
            key: 'a',
            label: 'A',
            children: 'Alpha',
            extra: <button onClick={action}>Edit</button>,
          },
          { key: 'b', label: 'B', children: 'Beta' },
        ]}
      />,
    );
    fireEvent.click(screen.getByText('Edit'));
    expect(action).toHaveBeenCalledOnce();
    expect(change).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: /B/ }));
    expect(change).toHaveBeenCalledWith(['b']);
    expect(screen.getByText('Alpha')).toBeVisible();
  });
});
