import { act, render, screen } from '@testing-library/react';
import { useEffect } from 'react';
import { afterEach, vi } from 'vitest';
import * as C from '../../index';
afterEach(() => {
  vi.useRealTimers();
});

describe('notification behavior', () => {
  it('opens and destroys a positioned notification with a stable API', () => {
    let api!: C.NotificationApi;
    const Example = () => {
      const [instance, holder] = C.Notification.useNotification({ placement: 'bottomLeft' });
      api = instance;
      useEffect(() => {
        instance.open({ key: 'job', title: 'Recipe', content: 'Ready', duration: 0 });
      }, [instance]);
      return holder;
    };
    render(<Example />);
    expect(screen.getAllByText('Ready')).toHaveLength(1);
    expect(document.querySelector('.cinna-notification-stack--bottomLeft')).toBeInTheDocument();
    act(() => api.destroy('job'));
    expect(screen.queryByText('Ready')).not.toBeInTheDocument();
  });
});
