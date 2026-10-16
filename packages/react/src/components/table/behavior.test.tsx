import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, vi } from 'vitest';
import * as C from '../../index';
afterEach(() => {
  vi.useRealTimers();
});

describe('table behavior', () => {
  it('preserves numeric row keys through sorting and selection', () => {
    const change = vi.fn();
    render(
      <C.Table
        columns={[
          {
            title: 'Name',
            dataIndex: 'name',
            sorter: (a, b) => String(a.name).localeCompare(String(b.name)),
          },
        ]}
        dataSource={[
          { key: 1, name: 'Berry' },
          { key: 2, name: 'Apple' },
        ]}
        rowSelection={{ selectedRowKeys: [1], onChange: change }}
      />,
    );
    expect(screen.getByLabelText('Select row 1')).toBeChecked();
    fireEvent.click(screen.getByRole('button', { name: /Name/ }));
    expect(screen.getByLabelText('Select row 2')).toBeChecked();
    fireEvent.click(screen.getByLabelText('Select row 1'));
    expect(change.mock.calls[0][0]).toEqual([1, 2]);
    expect(change.mock.calls[0][1]).toHaveLength(2);
  });
  it('filters, paginates and selects the current page', () => {
    const change = vi.fn();
    render(
      <C.Table
        pagination={{ pageSize: 1 }}
        columns={[
          {
            title: 'Name',
            dataIndex: 'name',
            filters: [{ text: 'Clouds', value: 'cloud' }],
            onFilter: (value, record) => record.kind === value,
          },
        ]}
        dataSource={[
          { key: 'a', name: 'Cloud 1', kind: 'cloud' },
          { key: 'b', name: 'Cloud 2', kind: 'cloud' },
          { key: 'c', name: 'Berry', kind: 'berry' },
        ]}
        rowSelection={{ onChange: change }}
      />,
    );
    fireEvent.change(screen.getByLabelText('Filter Name'), { target: { value: 'cloud' } });
    expect(screen.queryByText('Berry')).not.toBeInTheDocument();
    fireEvent.click(screen.getByLabelText('Select all rows'));
    expect(change.mock.calls[0][0]).toEqual(['a']);
    expect(screen.queryByText('Cloud 2')).not.toBeInTheDocument();
  });
});
