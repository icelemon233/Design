import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { AutoComplete } from '../../index';

describe('auto-complete regression', () => {
  it('keeps autocomplete suggestions closed until user interaction', () => {
    const onSelect = vi.fn();
    render(
      <AutoComplete options={['docs', 'design', 'tokens']} defaultValue="do" onSelect={onSelect} />,
    );

    expect(screen.queryByRole('option', { name: 'docs' })).not.toBeInTheDocument();

    fireEvent.focus(screen.getByRole('combobox'));
    expect(screen.getByRole('option', { name: 'docs' })).toBeInTheDocument();

    fireEvent.pointerDown(document.body);
    expect(screen.queryByRole('option', { name: 'docs' })).not.toBeInTheDocument();

    fireEvent.focus(screen.getByRole('combobox'));
    fireEvent.click(screen.getByRole('option', { name: 'docs' }));

    expect(onSelect).toHaveBeenCalledWith('docs', expect.objectContaining({ value: 'docs' }));
    expect(screen.getByRole('combobox')).toHaveValue('docs');
    expect(screen.queryByRole('option', { name: 'docs' })).not.toBeInTheDocument();
  });

  it('supports autocomplete filtering, clear, keyboard backfill, and empty content', () => {
    const onChange = vi.fn();
    const onClear = vi.fn();
    const { rerender } = render(
      <AutoComplete
        allowClear
        backfill
        defaultValue="d"
        options={['docs', 'design', 'tokens']}
        onChange={onChange}
        onClear={onClear}
      />,
    );
    const input = screen.getByRole('combobox');

    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    expect(input).toHaveValue('design');

    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onChange).toHaveBeenLastCalledWith('design');
    expect(screen.queryByRole('option', { name: 'design' })).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Clear input' }));
    expect(onClear).toHaveBeenCalled();
    expect(input).toHaveValue('');

    rerender(<AutoComplete open options={[]} notFoundContent="No matching resource" />);
    expect(screen.getByText('No matching resource')).toHaveClass('cinna-auto-complete__empty');
  });

  it('supports autocomplete custom filtering and semantic styles', () => {
    const { container } = render(
      <AutoComplete
        defaultValue="zz"
        open
        filterOption={false}
        popupMatchInputWidth={320}
        options={[{ label: 'Docs', value: 'docs', description: 'Guide' }]}
        classNames={{ option: 'custom-option' }}
        styles={{ popup: { borderColor: '#73c4e0' }, option: { color: '#46332a' } }}
      />,
    );

    const popup = container.querySelector('.cinna-auto-complete__popup') as HTMLElement;
    const option = screen.getByRole('option', { name: /Docs/ });

    expect(option).toHaveClass('custom-option');
    expect(option).toHaveStyle({ color: '#46332a' });
    expect(screen.getByText('Guide')).toBeInTheDocument();
    expect(popup).toHaveStyle({ width: '320px', borderColor: '#73c4e0' });
  });
});
