import { fireEvent, render, screen } from '@testing-library/react';
import { Mentions } from '../../index';

describe('mentions regression', () => {
  it('inserts mention options into the textarea', () => {
    render(<Mentions options={['cloud']} defaultValue="Invite" />);
    expect(screen.queryByRole('option', { name: '@cloud' })).not.toBeInTheDocument();

    (screen.getByRole('textbox') as HTMLTextAreaElement).setSelectionRange(6, 6);
    fireEvent.focus(screen.getByRole('textbox'));
    expect(screen.getByRole('option', { name: '@cloud' })).toBeInTheDocument();

    fireEvent.pointerDown(document.body);
    expect(screen.queryByRole('option', { name: '@cloud' })).not.toBeInTheDocument();

    (screen.getByRole('textbox') as HTMLTextAreaElement).setSelectionRange(6, 6);
    fireEvent.focus(screen.getByRole('textbox'));
    fireEvent.click(screen.getByRole('option', { name: '@cloud' }));
    expect(screen.getByRole('textbox')).toHaveValue('Invite @cloud ');
    expect(screen.queryByRole('option', { name: '@cloud' })).not.toBeInTheDocument();
  });
});
