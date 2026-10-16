import { fireEvent, render, screen } from '@testing-library/react';
import { Notification, Tag } from '../../index';

describe('notification regression', () => {
  it('closes closable tags and notifications', () => {
    render(
      <>
        <Tag closable>Berry</Tag>
        <Notification title="Published" content="Ready" closable />
      </>,
    );

    fireEvent.click(screen.getByLabelText('Close tag'));
    expect(screen.queryByText('Berry')).not.toBeInTheDocument();

    fireEvent.click(screen.getByLabelText('Close notification'));
    expect(screen.queryByText('Ready')).not.toBeInTheDocument();
  });
});
