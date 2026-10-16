import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, vi } from 'vitest';
import * as C from '../../index';
afterEach(() => {
  vi.useRealTimers();
});

describe('upload behavior', () => {
  it('reports progress, success and removal for custom requests', async () => {
    const request = vi.fn(({ onProgress, onSuccess }: C.UploadRequestOptions) => {
      onProgress(42);
      onSuccess('ok');
    });
    const changed = vi.fn();
    render(<C.Upload customRequest={request} onFilesChange={changed} />);
    fireEvent.change(screen.getByLabelText('Choose file'), {
      target: { files: [new File(['cloud'], 'cloud.txt', { type: 'text/plain' })] },
    });
    await screen.findByText('Uploaded');
    expect(request).toHaveBeenCalledOnce();
    expect(changed.mock.calls.some(([files]) => files[0]?.percent === 42)).toBe(true);
    fireEvent.click(screen.getByLabelText('Remove cloud.txt'));
    await waitFor(() => expect(screen.queryByText('cloud.txt')).not.toBeInTheDocument());
  });
  it('cancels a pending validation on unmount', async () => {
    let approve!: (value: boolean) => void;
    const request = vi.fn();
    const { unmount } = render(
      <C.Upload
        beforeUpload={() =>
          new Promise<boolean>((resolve) => {
            approve = resolve;
          })
        }
        customRequest={request}
      />,
    );
    fireEvent.change(screen.getByLabelText('Choose file'), {
      target: { files: [new File(['x'], 'x.txt')] },
    });
    unmount();
    await act(async () => {
      approve(true);
      await Promise.resolve();
    });
    expect(request).not.toHaveBeenCalled();
  });
});
