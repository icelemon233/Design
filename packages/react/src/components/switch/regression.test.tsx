import { fireEvent, render, screen } from '@testing-library/react';
import { Switch } from '../../index';

describe('switch regression', () => {
  it('switch toggles when clicked', () => {
    render(<Switch aria-label="soft switch" />);
    const control = screen.getByRole('switch', { name: 'soft switch' });
    fireEvent.click(control);
    expect(control).toHaveAttribute('aria-checked', 'true');
  });
});
