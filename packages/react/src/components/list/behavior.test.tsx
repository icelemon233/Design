import { render, screen } from '@testing-library/react';
import { afterEach, vi } from 'vitest';
import * as C from '../../index';
afterEach(() => {
  vi.useRealTimers();
});

describe('list behavior', () => {
  it('distinguishes empty and loading states', () => {
    const { rerender } = render(
      <C.List dataSource={[]} renderItem={String} emptyText="Nothing yet" />,
    );
    expect(screen.getByText('Nothing yet')).toBeInTheDocument();
    rerender(<C.List loading dataSource={[]} renderItem={String} />);
    expect(screen.getByRole('status')).toHaveTextContent('Loading');
  });
});
