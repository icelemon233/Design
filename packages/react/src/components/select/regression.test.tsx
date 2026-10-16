import { fireEvent, render, screen } from '@testing-library/react';
import { Select } from '../../index';

describe('select regression', () => {
  it('closes select popups when clicking outside', () => {
    render(
      <>
        <Select placeholder="Pick resource" options={[{ label: 'Docs', value: 'docs' }]} />
        <button type="button">Outside</button>
      </>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Pick resource' }));
    expect(screen.getByRole('listbox')).toBeInTheDocument();

    fireEvent.pointerDown(screen.getByRole('button', { name: 'Outside' }));
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });
});
