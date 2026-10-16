import { render, screen } from '@testing-library/react';
import { afterEach, vi } from 'vitest';
import * as C from '../../index';
afterEach(() => {
  vi.useRealTimers();
});

describe('watermark behavior', () => {
  it('tiles escaped text while preserving child content', () => {
    const { container } = render(
      <C.Watermark content={'A < B & C'} opacity={0.2}>
        <div>Private recipe</div>
      </C.Watermark>,
    );
    expect(screen.getByText('Private recipe')).toBeInTheDocument();
    const tile = container.querySelector('.cinna-watermark__tile') as HTMLElement;
    expect(decodeURIComponent(tile.style.backgroundImage)).toContain('A &lt; B &amp; C');
    expect(tile).toHaveAttribute('aria-hidden', 'true');
  });
});
