import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, vi } from 'vitest';
import * as C from '../../index';
afterEach(() => {
  vi.useRealTimers();
});

describe('card behavior', () => {
  it('renders a title, working extra action and body', () => {
    const click = vi.fn();
    render(
      <C.Card title="Cloud" extra={<button onClick={click}>Edit</button>}>
        Recipe
      </C.Card>,
    );
    fireEvent.click(screen.getByText('Edit'));
    expect(click).toHaveBeenCalledOnce();
    expect(screen.getByText('Recipe')).toBeInTheDocument();
  });
});
