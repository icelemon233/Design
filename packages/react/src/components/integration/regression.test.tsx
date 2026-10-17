import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { Paragraph, Progress, Table, Tag, Text } from '../../index';

describe('integration regression', () => {
  it('renders data display primitives', () => {
    render(
      <>
        <Tag>Cloud</Tag>
        <Progress percent={42} />
        <Table
          columns={[{ title: 'Name', dataIndex: 'name' }]}
          dataSource={[{ key: 'cloud', name: 'Cloud' }]}
        />
      </>,
    );

    expect(screen.getAllByText('Cloud')).toHaveLength(2);
    expect(screen.getByText('42%')).toBeInTheDocument();
  });

  it('renders typography disabled text and links', () => {
    render(
      <>
        <Text disabled>Unavailable copy</Text>
        <Text link href="#docs">
          Docs link
        </Text>
      </>,
    );

    expect(screen.getByText('Unavailable copy').closest('.cinna-text')).toHaveClass(
      'cinna-text--disabled',
    );
    expect(screen.getByText('Unavailable copy').closest('.cinna-text')).toHaveAttribute(
      'aria-disabled',
      'true',
    );
    expect(screen.getByRole('link', { name: 'Docs link' })).toHaveAttribute('href', '#docs');
    expect(screen.getByRole('link', { name: 'Docs link' })).toHaveClass('cinna-text--link');
  });

  it('expands typography ellipsis content', () => {
    const { container } = render(
      <Paragraph ellipsis={{ rows: 2, expandable: true, moreText: 'More', lessText: 'Less' }}>
        Long typography content that can be expanded when readers need more detail.
      </Paragraph>,
    );

    const content = container.querySelector('.cinna-typography__content');
    expect(content).toHaveClass('cinna-typography__content--ellipsis');

    fireEvent.click(screen.getByRole('button', { name: 'More' }));

    expect(screen.getByRole('button', { name: 'Less' })).toBeInTheDocument();
    expect(content).not.toHaveClass('cinna-typography__content--ellipsis');
  });

  it('copies typography content with themed action feedback', async () => {
    const writeText = vi.fn(() => Promise.resolve());
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      configurable: true,
    });

    render(
      <Text copyable={{ text: 'copy me', copyText: 'Copy', copiedText: 'Done' }}>Shown text</Text>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Copy' }));

    await waitFor(() => expect(writeText).toHaveBeenCalledWith('copy me'));
    expect(screen.getByRole('button', { name: 'Done' })).toHaveClass('cinna-typography__copy');
  });
});
