import { act, fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import type { CascaderOption } from '../../index';
import { Cascader } from '../../index';

describe('cascader regression', () => {
  it('selects cascader paths from column menus and closes outside', () => {
    const onChange = vi.fn();
    render(
      <>
        <Cascader
          options={[
            {
              label: 'Docs',
              value: 'docs',
              children: [{ label: 'API', value: 'api' }],
            },
          ]}
          placeholder="Choose path"
          onChange={onChange}
        />
        <button type="button">Outside</button>
      </>,
    );

    fireEvent.click(screen.getByRole('combobox', { name: 'Choose path' }));
    expect(document.querySelectorAll('.cinna-cascader__menu')).toHaveLength(1);
    fireEvent.click(screen.getByRole('option', { name: /Docs/ }));
    expect(document.querySelectorAll('.cinna-cascader__menu')).toHaveLength(2);
    fireEvent.click(screen.getByRole('option', { name: 'API' }));

    expect(onChange).toHaveBeenCalledWith(
      ['docs', 'api'],
      expect.arrayContaining([expect.objectContaining({ value: 'docs' })]),
    );
    expect(screen.queryByRole('option', { name: 'API' })).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('combobox', { name: 'Choose path' }));
    expect(screen.getByRole('option', { name: /Docs/ })).toBeInTheDocument();
    fireEvent.pointerDown(screen.getByRole('button', { name: 'Outside' }));
    expect(screen.queryByRole('option', { name: /Docs/ })).not.toBeInTheDocument();
  });

  it('shows loading state while lazy loading cascader children', async () => {
    vi.useFakeTimers();

    try {
      const loadData = vi.fn(
        () =>
          new Promise<CascaderOption[]>((resolve) => {
            setTimeout(() => {
              resolve([{ label: 'API', value: 'api' }]);
            }, 500);
          }),
      );
      const { container } = render(
        <Cascader
          options={[{ label: 'Docs', value: 'docs', isLeaf: false }]}
          loadData={loadData}
          placeholder="Choose path"
        />,
      );

      fireEvent.click(screen.getByRole('combobox', { name: 'Choose path' }));
      fireEvent.click(screen.getByRole('option', { name: /Docs/ }));

      expect(loadData).toHaveBeenCalledWith([expect.objectContaining({ value: 'docs' })]);
      expect(screen.getByRole('option', { name: /Docs/ })).toHaveAttribute('aria-busy', 'true');
      expect(container.querySelector('.cinna-cascader__loading')).toBeInTheDocument();
      expect(document.querySelectorAll('.cinna-cascader__menu')).toHaveLength(1);

      await act(async () => {
        vi.advanceTimersByTime(500);
        await Promise.resolve();
      });

      expect(document.querySelectorAll('.cinna-cascader__menu')).toHaveLength(2);
      expect(screen.getByRole('option', { name: 'API' })).toBeInTheDocument();
      expect(container.querySelector('.cinna-cascader__loading')).not.toBeInTheDocument();
    } finally {
      vi.useRealTimers();
    }
  });

  it('supports cascader search, multiple values, field names, and custom popup styles', () => {
    const onSearchChange = vi.fn();
    const onChange = vi.fn();
    const { container, rerender } = render(
      <Cascader
        showSearch={{
          onSearch: onSearchChange,
          render: (_, path) => path.map((item) => item.label).join(' -> '),
        }}
        options={[
          {
            label: 'Docs',
            value: 'docs',
            children: [{ label: 'API', value: 'api' }],
          },
        ]}
        onChange={onChange}
      />,
    );

    fireEvent.click(screen.getByRole('combobox', { name: 'Select path' }));
    fireEvent.change(screen.getByPlaceholderText('Search path'), { target: { value: 'api' } });
    expect(onSearchChange).toHaveBeenCalledWith('api');
    fireEvent.click(screen.getByRole('option', { name: 'Docs -> API' }));
    expect(onChange).toHaveBeenCalledWith(['docs', 'api'], expect.any(Array));

    rerender(
      <Cascader
        multiple
        open
        defaultValue={[['docs', 'api']]}
        maxTagCount={1}
        fieldNames={{ label: 'name', value: 'id', children: 'nodes' }}
        options={[
          {
            name: 'Docs',
            id: 'docs',
            nodes: [{ name: 'API', id: 'api' }],
          },
        ]}
        styles={{ popup: { borderColor: '#73c4e0' } }}
      />,
    );

    expect(screen.getByText('Docs / API')).toHaveClass('cinna-cascader__tag');
    expect(container.querySelector('.cinna-cascader__popup')).toHaveStyle({
      borderColor: '#73c4e0',
    });
    expect(screen.getByRole('option', { name: /Docs/ })).toBeInTheDocument();
  });
});
