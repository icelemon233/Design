import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { Select } from '../../index';

describe('select regression', () => {
  it('focuses the listbox, selects with the keyboard and returns focus to the trigger', () => {
    const change = vi.fn();
    render(
      <Select
        placeholder="Variant"
        defaultValue="pill"
        onChange={change}
        options={[
          { value: 'pill', label: 'Pill' },
          { value: 'card', label: 'Connected card' },
        ]}
      />,
    );
    const trigger = screen.getByRole('button', { name: 'Variant' });
    fireEvent.click(trigger);
    const list = screen.getByRole('listbox', { name: 'Variant' });
    expect(list).toHaveFocus();
    expect(trigger).not.toHaveAttribute('aria-activedescendant');
    expect(list).toHaveAttribute(
      'aria-activedescendant',
      screen.getByRole('option', { name: 'Pill' }).id,
    );
    fireEvent.keyDown(list, { key: 'End' });
    fireEvent.keyDown(list, { key: 'Enter' });
    expect(change).toHaveBeenCalledWith('card');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it('closes on keyboard focus leaving the control', () => {
    render(
      <>
        <Select placeholder="Variant" options={[{ value: 'pill', label: 'Pill' }]} />
        <button>Next field</button>
      </>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Variant' }));
    fireEvent.blur(screen.getByRole('listbox'), {
      relatedTarget: screen.getByRole('button', { name: 'Next field' }),
    });
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

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
