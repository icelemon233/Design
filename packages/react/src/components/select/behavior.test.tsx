import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, vi } from 'vitest';
import * as C from '../../index';
afterEach(() => {
  vi.useRealTimers();
});

describe('select behavior', () => {
  it('filters and selects an enabled keyboard option', () => {
    const change = vi.fn();
    render(
      <C.Select
        showSearch
        onChange={change}
        options={[
          { value: 'a', label: 'Apple', disabled: true },
          { value: 'b', label: 'Blueberry' },
          { value: 'c', label: 'Cream' },
        ]}
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Select' }));
    fireEvent.change(screen.getByLabelText('Search options'), { target: { value: 'blue' } });
    fireEvent.keyDown(screen.getByLabelText('Search options'), { key: 'ArrowDown' });
    fireEvent.keyDown(screen.getByLabelText('Search options'), { key: 'Enter' });
    expect(change).toHaveBeenCalledWith('b');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });
  it('blocks clear and controlled-open content when disabled', () => {
    const change = vi.fn();
    render(
      <C.Select
        disabled
        open
        allowClear
        value="a"
        options={[{ value: 'a', label: 'A' }]}
        onChange={change}
      />,
    );
    expect(screen.getByLabelText('Clear selection')).toBeDisabled();
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    fireEvent.click(screen.getByLabelText('Clear selection'));
    expect(change).not.toHaveBeenCalled();
  });
  it('notifies multiple changes without mutating controlled state', () => {
    const change = vi.fn();
    render(
      <C.Select
        open
        mode="multiple"
        value={['a']}
        onChange={change}
        options={[
          { value: 'a', label: 'A' },
          { value: 'b', label: 'B' },
        ]}
      />,
    );
    fireEvent.click(screen.getByRole('option', { name: 'B' }));
    expect(change).toHaveBeenCalledWith(['a', 'b']);
    expect(screen.getByRole('option', { name: 'B' })).toHaveAttribute('aria-selected', 'false');
  });
});
