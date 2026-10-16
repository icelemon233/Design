import { act, fireEvent, render, screen } from '@testing-library/react';
import { useEffect } from 'react';
import { afterEach, vi } from 'vitest';
import * as C from '../../index';
afterEach(() => {
  vi.useRealTimers();
});

describe('message behavior', () => {
  it('keeps its API stable and updates keyed messages', () => {
    vi.useFakeTimers();
    let api!: C.MessageApi;
    const Example = () => {
      const [instance, holder] = C.Message.useMessage();
      api = instance;
      useEffect(() => {
        instance.success('Ready', 0);
      }, [instance]);
      return holder;
    };
    render(<Example />);
    expect(screen.getAllByText('Ready')).toHaveLength(1);
    act(() => {
      api.open({ key: 'job', content: 'Mixing', duration: 0 });
      api.open({ key: 'job', content: 'Done', duration: 1 });
    });
    expect(screen.queryByText('Mixing')).not.toBeInTheDocument();
    expect(screen.getByText('Done')).toBeInTheDocument();
    act(() => vi.advanceTimersByTime(1000));
    expect(screen.queryByText('Done')).not.toBeInTheDocument();
  });
  it('does not dismiss twice after a manual close', () => {
    vi.useFakeTimers();
    const close = vi.fn();
    render(<C.Message content="Saved" duration={1} closable onClose={close} />);
    fireEvent.click(screen.getByLabelText('Close message'));
    act(() => vi.advanceTimersByTime(1000));
    expect(close).toHaveBeenCalledOnce();
  });
});
