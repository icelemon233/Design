import { fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';
import { afterEach, vi } from 'vitest';
import * as C from '../../index';
afterEach(() => {
  vi.useRealTimers();
});

describe('mentions behavior', () => {
  it('replaces a partial query in a controlled textarea', () => {
    const Example = () => {
      const [value, setValue] = useState('Hi @cl');
      return (
        <C.Mentions
          value={value}
          options={['cloud']}
          onChange={(event) => setValue(event.target.value)}
        />
      );
    };
    render(<Example />);
    const input = screen.getByRole('textbox') as HTMLTextAreaElement;
    input.setSelectionRange(6, 6);
    fireEvent.focus(input);
    fireEvent.click(screen.getByRole('option', { name: '@cloud' }));
    expect(input).toHaveValue('Hi @cloud ');
  });
  it('inserts at the current cursor', () => {
    render(<C.Mentions defaultValue="Hello world" options={['cloud']} />);
    const input = screen.getByRole('textbox') as HTMLTextAreaElement;
    fireEvent.focus(input);
    input.setSelectionRange(5, 5);
    fireEvent.click(input);
    fireEvent.click(screen.getByRole('option', { name: '@cloud' }));
    expect(input).toHaveValue('Hello @cloud  world');
  });
});
