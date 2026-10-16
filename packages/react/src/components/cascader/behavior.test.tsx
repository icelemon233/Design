import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, vi } from 'vitest';
import * as C from '../../index';
afterEach(() => {
  vi.useRealTimers();
});

import { act } from '@testing-library/react';
describe('cascader behavior', () => {
  it('opens with omitted options without an update loop and blocks disabled loading', () => {
    const load = vi.fn();
    const { rerender } = render(<C.Cascader />);
    fireEvent.click(screen.getByRole('combobox'));
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'true');
    rerender(
      <C.Cascader
        disabled
        open
        loadData={load}
        options={[{ value: 'a', label: 'A', isLeaf: false }]}
      />,
    );
    expect(screen.queryByRole('option')).not.toBeInTheDocument();
    expect(load).not.toHaveBeenCalled();
  });
  it('removes a selected branch through its parent tag', () => {
    const change = vi.fn();
    render(
      <C.Cascader
        multiple
        defaultOpen
        onChange={change}
        options={[
          {
            value: 'r',
            label: 'Root',
            children: [
              { value: 'a', label: 'A' },
              { value: 'b', label: 'B' },
            ],
          },
        ]}
      />,
    );
    fireEvent.click(screen.getByRole('option', { name: /Root/ }));
    fireEvent.click(screen.getByLabelText('Remove selected path'));
    expect(change.mock.calls[change.mock.calls.length - 1][0]).toEqual([]);
  });
  it('discards outdated loader results after options change', async () => {
    let resolve!: (options: C.CascaderOption[]) => void;
    const loader = () =>
      new Promise<C.CascaderOption[]>((done) => {
        resolve = done;
      });
    const { rerender } = render(
      <C.Cascader
        defaultOpen
        options={[{ value: 'r', label: 'Root', isLeaf: false }]}
        loadData={loader}
      />,
    );
    fireEvent.click(screen.getByRole('option', { name: /Root/ }));
    rerender(
      <C.Cascader
        defaultOpen
        options={[{ value: 'r', label: 'Root', children: [{ value: 'new', label: 'New child' }] }]}
        loadData={loader}
      />,
    );
    await act(async () => {
      resolve([{ value: 'old', label: 'Old child' }]);
      await Promise.resolve();
    });
    fireEvent.click(screen.getByRole('option', { name: /Root/ }));
    expect(screen.getByRole('option', { name: 'New child' })).toBeInTheDocument();
    expect(screen.queryByRole('option', { name: 'Old child' })).not.toBeInTheDocument();
  });
  it('checks enabled descendants when a parent is selected', () => {
    const change = vi.fn();
    render(
      <C.Cascader
        multiple
        defaultOpen
        onChange={change}
        options={[
          {
            value: 'r',
            label: 'Root',
            children: [
              { value: 'a', label: 'A' },
              { value: 'b', label: 'B' },
              { value: 'locked', label: 'Locked', disabled: true },
            ],
          },
        ]}
      />,
    );
    fireEvent.click(screen.getByRole('option', { name: /Root/ }));
    expect(change.mock.calls[0][0]).toEqual(
      expect.arrayContaining([['r'], ['r', 'a'], ['r', 'b']]),
    );
    expect(change.mock.calls[0][0]).not.toEqual(expect.arrayContaining([['r', 'locked']]));
  });

  it('blocks disabled search paths and never nests buttons', () => {
    const change = vi.fn();
    render(
      <C.Cascader
        showSearch
        defaultOpen
        onChange={change}
        options={[
          {
            value: 'locked',
            label: 'Locked',
            disabled: true,
            children: [{ value: 'leaf', label: 'Leaf' }],
          },
        ]}
      />,
    );
    fireEvent.change(screen.getByPlaceholderText('Search path'), { target: { value: 'Leaf' } });
    expect(screen.getByRole('option')).toBeDisabled();
    fireEvent.click(screen.getByRole('option'));
    expect(change).not.toHaveBeenCalled();
    expect(document.querySelector('button button')).toBeNull();
  });
  it('expands parents on hover without selecting them', () => {
    const change = vi.fn();
    render(
      <C.Cascader
        multiple
        expandTrigger="hover"
        defaultOpen
        onChange={change}
        options={[{ value: 'root', label: 'Root', children: [{ value: 'leaf', label: 'Leaf' }] }]}
      />,
    );
    fireEvent.mouseEnter(screen.getByRole('option', { name: /Root/ }));
    expect(change).not.toHaveBeenCalled();
    expect(screen.getByRole('option', { name: 'Leaf' })).toBeInTheDocument();
  });
});
