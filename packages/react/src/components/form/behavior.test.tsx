import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, vi } from 'vitest';
import * as C from '../../index';
afterEach(() => {
  vi.useRealTimers();
});

describe('form behavior', () => {
  it('disables composite controls even outside a FormItem', () => {
    const check = vi.fn();
    render(
      <C.Form disabled>
        <C.Tree checkable treeData={[{ key: 'a', title: 'A' }]} onCheck={check} />
        <C.Select options={[{ value: 'a', label: 'A' }]} />
      </C.Form>,
    );
    expect(screen.getByRole('treeitem')).toHaveAttribute('aria-disabled', 'true');
    fireEvent.keyDown(screen.getByRole('treeitem'), { key: ' ' });
    expect(check).not.toHaveBeenCalled();
    expect(screen.getByRole('button', { name: 'Select' })).toBeDisabled();
  });

  it('validates, submits values and restores initial values', async () => {
    const finish = vi.fn();
    render(
      <C.Form initialValues={{ name: 'Cinna' }} onFinish={finish}>
        <C.FormItem
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Name is required' }]}
        >
          <input />
        </C.FormItem>
        <button type="submit">Save</button>
        <button type="reset">Reset</button>
      </C.Form>,
    );
    const input = screen.getByRole('textbox', { name: 'Name' });
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.click(screen.getByText('Save'));
    expect(await screen.findByRole('alert')).toHaveTextContent('Name is required');
    expect(finish).not.toHaveBeenCalled();
    fireEvent.change(input, { target: { value: 'Cloud' } });
    fireEvent.click(screen.getByText('Save'));
    await waitFor(() => expect(finish).toHaveBeenCalledWith({ name: 'Cloud' }));
    fireEvent.click(screen.getByText('Reset'));
    expect(input).toHaveValue('Cinna');
  });
  it('propagates disabled and required-mark settings', () => {
    render(
      <C.Form disabled requiredMark={false}>
        <C.FormItem label="Name" required>
          <input />
        </C.FormItem>
        <C.FormItem name="tree">
          <C.Tree checkable treeData={[{ key: 'a', title: 'A' }]} />
        </C.FormItem>
      </C.Form>,
    );
    expect(screen.getByRole('textbox', { name: 'Name' })).toBeDisabled();
    expect(screen.getByRole('treeitem')).toHaveAttribute('aria-disabled', 'true');
    expect(screen.queryByText('*')).not.toBeInTheDocument();
  });
  it('binds Upload through its file-list contract', async () => {
    const finish = vi.fn();
    render(
      <C.Form onFinish={finish}>
        <C.FormItem name="files">
          <C.Upload />
        </C.FormItem>
        <button type="submit">Save</button>
      </C.Form>,
    );
    fireEvent.change(screen.getByLabelText('Choose file'), {
      target: { files: [new File(['cloud'], 'cloud.txt', { type: 'text/plain' })] },
    });
    await screen.findByText('cloud.txt');
    fireEvent.click(screen.getByText('Save'));
    await waitFor(() => expect(finish).toHaveBeenCalled());
    expect(finish.mock.calls[0][0].files[0].name).toBe('cloud.txt');
  });
  it('refreshes rule closures after parent changes', async () => {
    const finish = vi.fn();
    const Example = ({ expected }: { expected: string }) => (
      <C.Form onFinish={finish} initialValues={{ name: 'cloud' }}>
        <C.FormItem
          name="name"
          rules={[
            {
              validator: async (value) => {
                if (value !== expected) throw new Error('Mismatch');
              },
            },
          ]}
        >
          <input aria-label="Name" />
        </C.FormItem>
        <button type="submit">Save</button>
      </C.Form>
    );
    const { rerender } = render(<Example expected="cloud" />);
    rerender(<Example expected="cream" />);
    fireEvent.click(screen.getByText('Save'));
    expect(await screen.findByRole('alert')).toHaveTextContent('Mismatch');
    expect(finish).not.toHaveBeenCalled();
  });
});
