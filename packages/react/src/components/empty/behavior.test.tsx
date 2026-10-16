import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, vi } from 'vitest';
import * as C from '../../index';
afterEach(() => {
  vi.useRealTimers();
});

describe('empty behavior', () => {
  it('suppresses descriptions and keeps actions working', () => {
    const click = vi.fn();
    const { container } = render(
      <C.Empty description={false} actions={<button onClick={click}>Create</button>} />,
    );
    expect(container.querySelector('.cinna-empty__description')).not.toBeInTheDocument();
    fireEvent.click(screen.getByText('Create'));
    expect(click).toHaveBeenCalledOnce();
  });
});
