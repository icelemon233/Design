import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { Pagination } from '../../index';

describe('pagination regression', () => {
  it('changes pagination pages and page sizes', () => {
    const onChange = vi.fn();
    const onShowSizeChange = vi.fn();

    render(
      <Pagination
        total={120}
        defaultCurrent={2}
        defaultPageSize={10}
        pageSizeOptions={[10, 20, 40]}
        onChange={onChange}
        onShowSizeChange={onShowSizeChange}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: '3' }));
    expect(onChange).toHaveBeenCalledWith(3, 10);

    expect(document.querySelector('select.cinna-pagination__size-changer')).not.toBeInTheDocument();
    fireEvent.click(screen.getByLabelText('Page size'));
    expect(screen.getByRole('listbox', { name: 'Page size options' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('option', { name: '20 / page' }));
    expect(onShowSizeChange).toHaveBeenCalledWith(3, 20);
    expect(onChange).toHaveBeenLastCalledWith(3, 20);
    expect(screen.queryByRole('listbox', { name: 'Page size options' })).not.toBeInTheDocument();
  });

  it('supports pagination quick jump, hidden single-page state, and custom visuals', () => {
    const onChange = vi.fn();
    const { container, rerender } = render(
      <Pagination
        total={200}
        showQuickJumper={{ goButton: 'Go' }}
        showSizeChanger={false}
        onChange={onChange}
      />,
    );

    fireEvent.change(screen.getByLabelText('Jump to page'), { target: { value: '7' } });
    fireEvent.click(screen.getByRole('button', { name: 'Go' }));

    expect(onChange).toHaveBeenCalledWith(7, 10);
    expect(screen.getByRole('button', { name: '7' })).toHaveClass('cinna-pagination__page--active');

    rerender(<Pagination total={8} hideOnSinglePage />);
    expect(container.firstChild).toBeNull();

    rerender(
      <Pagination
        total={30}
        showSizeChanger={false}
        prevIcon="Prev"
        nextIcon="Next"
        pageFontSize={16}
        pageFontWeight={800}
        pageColor="#6b584b"
        pageBorderColor="#efb8c8"
        pageBorderWidth={2}
        pageBorderStyle="dashed"
        pageRadius={12}
        activePageColor="#513323"
        activePageBackgroundColor="#ffe8a8"
        activePageBorderColor="#d8984f"
        activePageUnderlineColor="#fff3c2"
        activePageUnderlineWidth={24}
        activePageUnderlineHeight={4}
        activePageUnderlineRadius={8}
        activePageUnderlineBottom={6}
      />,
    );

    expect(container.querySelector('.cinna-pagination')).toHaveStyle({
      '--cinna-pagination-font-size': '16px',
      '--cinna-pagination-font-weight': '800',
      '--cinna-pagination-color': '#6b584b',
      '--cinna-pagination-border-color': '#efb8c8',
      '--cinna-pagination-border-width': '2px',
      '--cinna-pagination-border-style': 'dashed',
      '--cinna-pagination-radius': '12px',
      '--cinna-pagination-active-color': '#513323',
      '--cinna-pagination-active-bg': '#ffe8a8',
      '--cinna-pagination-active-border': '#d8984f',
      '--cinna-pagination-active-underline-color': '#fff3c2',
      '--cinna-pagination-active-underline-width': '24px',
      '--cinna-pagination-active-underline-height': '4px',
      '--cinna-pagination-active-underline-radius': '8px',
      '--cinna-pagination-active-underline-bottom': '6px',
    });
    expect(screen.getByRole('button', { name: 'Previous page' })).toHaveTextContent('Prev');
    expect(screen.getByRole('button', { name: 'Next page' })).toHaveTextContent('Next');

    fireEvent.mouseDown(screen.getByRole('button', { name: 'Previous page' }), {
      clientX: 8,
      clientY: 8,
    });
    expect(container.querySelector('.cinna-button__ripple--inner')).toBeInTheDocument();

    rerender(<Pagination total={30} activePageUnderline={false} />);
    expect(container.querySelector('.cinna-pagination')).toHaveClass(
      'cinna-pagination--no-active-underline',
    );
  });
});
