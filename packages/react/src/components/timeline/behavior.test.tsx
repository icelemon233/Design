import { render, screen } from '@testing-library/react';
import { afterEach, vi } from 'vitest';
import * as C from '../../index';
afterEach(() => {
  vi.useRealTimers();
});

describe('timeline behavior', () => {
  it('reverses entries and renders a pending item', () => {
    const { container } = render(
      <C.Timeline
        reverse
        pending="Baking"
        items={[{ children: 'Prepare' }, { children: 'Mix' }]}
      />,
    );
    expect(container.querySelector('li')).toHaveTextContent('Mix');
    expect(screen.getByText('Baking')).toBeInTheDocument();
  });
});
