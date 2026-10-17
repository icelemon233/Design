import { render } from '@testing-library/react';
import { afterEach, vi } from 'vitest';
import * as C from '../../index';
afterEach(() => {
  vi.useRealTimers();
});

describe('descriptions behavior', () => {
  it('renders semantic labels and column spans', () => {
    const { container } = render(
      <C.Descriptions column={3} items={[{ label: 'Dessert', children: 'Cloud cake', span: 2 }]} />,
    );
    expect(container.querySelector('dt')).toHaveTextContent('Dessert');
    expect(container.querySelector('dd')).toHaveTextContent('Cloud cake');
    expect(container.querySelector('dl > div')).toHaveStyle({ gridColumn: 'span 2' });
  });
});
