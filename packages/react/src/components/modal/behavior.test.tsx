import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, vi } from 'vitest';
import * as C from '../../index';
afterEach(() => {
  vi.useRealTimers();
});

describe('modal behavior', () => {
  it('skips hidden fields and preserves ConfigProvider styles through its portal', () => {
    render(
      <C.ConfigProvider theme={{ primary: '#123456' }}>
        <C.Modal open closable={false} footer={null} title="Hidden fields">
          <input type="hidden" />
          <button style={{ display: 'none' }}>Hidden</button>
          <button>Inside</button>
        </C.Modal>
      </C.ConfigProvider>,
    );
    expect(screen.getByRole('button', { name: 'Inside' })).toHaveFocus();
    expect(screen.getByRole('dialog').parentElement).toHaveStyle({
      '--cinna-color-primary': '#123456',
    });
    fireEvent.keyDown(document, { key: 'Tab' });
    expect(screen.getByRole('button', { name: 'Inside' })).toHaveFocus();
  });
  it('closes a nested select before dismissing its modal', () => {
    const cancel = vi.fn();
    render(
      <C.Modal open title="Nested" onCancel={cancel}>
        <C.Select options={[{ value: 'a', label: 'A' }]} />
      </C.Modal>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Select' }));
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    expect(cancel).not.toHaveBeenCalled();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(cancel).toHaveBeenCalledOnce();
  });

  it('supports a null footer and prevents panel clicks from dismissing', () => {
    const cancel = vi.fn(),
      click = vi.fn();
    render(
      <C.Modal open title="Recipe" footer={null} onCancel={cancel} onClick={click}>
        Body
      </C.Modal>,
    );
    expect(screen.queryByText('OK')).not.toBeInTheDocument();
    fireEvent.click(screen.getByText('Body'));
    expect(click).toHaveBeenCalledOnce();
    expect(cancel).not.toHaveBeenCalled();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(cancel).toHaveBeenCalledOnce();
  });
  it('renders async confirmation failures without dismissing', async () => {
    render(
      <C.Modal
        open
        title="Save"
        onOk={async () => {
          throw new Error('Save failed');
        }}
      >
        Body
      </C.Modal>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'OK' }));
    expect(await screen.findByRole('alert')).toHaveTextContent('Save failed');
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});
