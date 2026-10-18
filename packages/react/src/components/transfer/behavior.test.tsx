import { fireEvent, render, screen, within } from '@testing-library/react';
import { vi } from 'vitest';
import { Transfer } from '../../index';

const data = [
  { key: 'a', title: 'Alpha' },
  { key: 'b', title: 'Beta', disabled: true },
  { key: 'c', title: 'Cream' },
];

describe('transfer behavior', () => {
  it('shows every item when search is hidden and restores the query when shown again', () => {
    const { rerender } = render(<Transfer dataSource={data} showSearch />);
    fireEvent.change(screen.getByRole('textbox', { name: 'Source: Search items' }), {
      target: { value: 'cream' },
    });
    expect(screen.queryByRole('checkbox', { name: 'Alpha' })).not.toBeInTheDocument();
    rerender(<Transfer dataSource={data} showSearch={false} />);
    expect(screen.getByRole('checkbox', { name: 'Alpha' })).toBeInTheDocument();
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    rerender(<Transfer dataSource={data} showSearch />);
    expect(screen.getByRole('textbox', { name: 'Source: Search items' })).toHaveValue('cream');
    expect(screen.queryByRole('checkbox', { name: 'Alpha' })).not.toBeInTheDocument();
  });
  it('retains default labels when a partial locale contains undefined values', () => {
    render(
      <Transfer dataSource={[]} locale={{ sourceTitle: undefined, moveToTarget: undefined }} />,
    );
    expect(screen.getByRole('region', { name: 'Source' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Move selected to target' })).toBeDisabled();
  });
  it('keeps controlled target keys authoritative and reports moved keys', () => {
    const onChange = vi.fn();
    const { rerender } = render(<Transfer targetKeys={[]} dataSource={data} onChange={onChange} />);
    fireEvent.click(screen.getByRole('checkbox', { name: 'Alpha' }));
    fireEvent.click(screen.getByRole('button', { name: 'Move selected to target' }));
    expect(onChange).toHaveBeenCalledWith(['a'], 'toTarget', ['a']);
    expect(
      within(screen.getByRole('region', { name: 'Source' })).getByText('Alpha'),
    ).toBeInTheDocument();
    rerender(<Transfer targetKeys={['a']} dataSource={data} onChange={onChange} />);
    expect(
      within(screen.getByRole('region', { name: 'Target' })).getByText('Alpha'),
    ).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: 'Beta' })).toBeDisabled();
  });
  it('moves selected items in both directions and leaves disabled items in place', () => {
    render(<Transfer dataSource={data} />);
    const source = screen.getByRole('region', { name: 'Source' });
    fireEvent.click(within(source).getByRole('checkbox', { name: 'Select all' }));
    expect(within(source).getByRole('checkbox', { name: 'Beta' })).not.toBeChecked();
    fireEvent.click(screen.getByRole('button', { name: 'Move selected to target' }));
    const target = screen.getByRole('region', { name: 'Target' });
    expect(within(target).getByText('Alpha')).toBeInTheDocument();
    expect(within(target).getByText('Cream')).toBeInTheDocument();
    expect(within(source).getByText('Beta')).toBeInTheDocument();
    fireEvent.click(within(target).getByRole('checkbox', { name: 'Select all' }));
    fireEvent.click(screen.getByRole('button', { name: 'Move selected to source' }));
    expect(within(target).getByText('No items')).toBeInTheDocument();
    expect(within(source).getByText('Alpha')).toBeInTheDocument();
  });
  it('selects visible search results while retaining other selected items', () => {
    const change = vi.fn();
    render(<Transfer dataSource={data} showSearch defaultSelectedKeys={['a']} onChange={change} />);
    fireEvent.change(screen.getByRole('textbox', { name: 'Source: Search items' }), {
      target: { value: 'cream' },
    });
    const source = screen.getByRole('region', { name: 'Source' });
    fireEvent.click(within(source).getByRole('checkbox', { name: 'Select all' }));
    fireEvent.click(screen.getByRole('button', { name: 'Move selected to target' }));
    expect(change).toHaveBeenCalledWith(['a', 'c'], 'toTarget', ['a', 'c']);
    expect(within(source).getByText('No matching items')).toBeInTheDocument();
  });
  it('keeps controlled selection unchanged until the parent supplies its next value', () => {
    const select = vi.fn();
    const { rerender } = render(
      <Transfer dataSource={data} selectedKeys={[]} onSelectChange={select} />,
    );
    fireEvent.click(screen.getByRole('checkbox', { name: 'Alpha' }));
    expect(select).toHaveBeenCalledWith(['a'], []);
    expect(screen.getByRole('checkbox', { name: 'Alpha' })).not.toBeChecked();
    expect(screen.getByRole('button', { name: 'Move selected to target' })).toBeDisabled();
    rerender(<Transfer dataSource={data} selectedKeys={['a']} onSelectChange={select} />);
    expect(screen.getByRole('checkbox', { name: 'Alpha' })).toBeChecked();
    expect(screen.getByRole('button', { name: 'Move selected to target' })).toBeEnabled();
  });
  it('disables search, selection and both move actions together', () => {
    render(<Transfer dataSource={data} showSearch disabled defaultSelectedKeys={['a']} />);
    for (const input of screen.getAllByRole('checkbox')) expect(input).toBeDisabled();
    for (const input of screen.getAllByRole('textbox')) expect(input).toBeDisabled();
    for (const button of screen.getAllByRole('button')) expect(button).toBeDisabled();
  });
  it('uses supplied interface text for empty lists and actions', () => {
    render(
      <Transfer
        dataSource={[]}
        locale={{
          sourceTitle: '待选',
          targetTitle: '已选',
          empty: '暂无项目',
          moveToTarget: '移入',
          moveToSource: '移出',
        }}
      />,
    );
    expect(screen.getByRole('region', { name: '待选' })).toHaveTextContent('暂无项目');
    expect(screen.getByRole('button', { name: '移入' })).toBeDisabled();
  });
});
