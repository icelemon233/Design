import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { Splitter } from '../../index';

describe('splitter regression', () => {
  it('resizes splitter panels by dragging the separator', () => {
    const onResizeEnd = vi.fn();
    const { container } = render(
      <Splitter onResizeEnd={onResizeEnd}>
        <Splitter.Panel defaultSize="40%" min={120}>
          Left
        </Splitter.Panel>
        <Splitter.Panel min={120}>Right</Splitter.Panel>
      </Splitter>,
    );

    const panels = container.querySelectorAll('.cinna-splitter__panel');
    const dragger = screen.getByRole('separator', { name: 'Resize panels' });
    const initialSize = Number.parseFloat(
      (panels[0] as HTMLElement).style.getPropertyValue('--cinna-splitter-panel-size'),
    );

    fireEvent.pointerDown(dragger, { clientX: 260, pointerId: 1 });
    fireEvent.pointerMove(window, { clientX: 320 });
    fireEvent.pointerUp(window);

    const resizedSize = Number.parseFloat(
      (panels[0] as HTMLElement).style.getPropertyValue('--cinna-splitter-panel-size'),
    );
    expect(resizedSize).toBeGreaterThan(initialSize);
    expect(onResizeEnd).toHaveBeenCalled();
    expect(container.querySelector('input[type="range"]')).not.toBeInTheDocument();
  });

  it('supports splitter disabled drag, lazy resize, custom divider, and double click reset', () => {
    const onResize = vi.fn();
    const onDoubleClick = vi.fn();
    const { container, rerender } = render(
      <Splitter
        lazy
        divider={{ color: '#73c4e0', dashed: false, thickness: 3 }}
        onResize={onResize}
        onDraggerDoubleClick={onDoubleClick}
      >
        <Splitter.Panel defaultSize="50%" min={120}>
          First
        </Splitter.Panel>
        <Splitter.Panel min={120}>Second</Splitter.Panel>
      </Splitter>,
    );

    const panels = container.querySelectorAll('.cinna-splitter__panel');
    const dragger = screen.getByRole('separator', { name: 'Resize panels' });
    const initialSize = Number.parseFloat(
      (panels[0] as HTMLElement).style.getPropertyValue('--cinna-splitter-panel-size'),
    );

    expect(dragger).not.toHaveClass('cinna-splitter__dragger--dashed');
    expect(dragger.querySelector('span')).not.toHaveAttribute('data-divider-character');

    fireEvent.pointerDown(dragger, { clientX: 260, pointerId: 1 });
    fireEvent.pointerMove(window, { clientX: 330 });
    const lazySize = Number.parseFloat(
      (panels[0] as HTMLElement).style.getPropertyValue('--cinna-splitter-panel-size'),
    );
    const preview = container.querySelector('.cinna-splitter__preview') as HTMLElement;

    expect(lazySize).toBeCloseTo(initialSize);
    expect(preview).toBeInTheDocument();
    expect(
      Number.parseFloat(preview.style.getPropertyValue('--cinna-splitter-preview-position')),
    ).toBeGreaterThan(initialSize);
    expect(onResize).not.toHaveBeenCalled();
    fireEvent.pointerUp(window);
    expect(onResize).toHaveBeenCalled();
    expect(container.querySelector('.cinna-splitter__preview')).not.toBeInTheDocument();

    const resizedSize = Number.parseFloat(
      (panels[0] as HTMLElement).style.getPropertyValue('--cinna-splitter-panel-size'),
    );
    expect(resizedSize).toBeGreaterThan(initialSize);

    fireEvent.doubleClick(dragger);
    expect(onDoubleClick).toHaveBeenCalledWith(0);
    expect(
      Number.parseFloat(
        (panels[0] as HTMLElement).style.getPropertyValue('--cinna-splitter-panel-size'),
      ),
    ).toBeCloseTo(initialSize);

    rerender(
      <Splitter disabled>
        <Splitter.Panel defaultSize="50%">First</Splitter.Panel>
        <Splitter.Panel>Second</Splitter.Panel>
      </Splitter>,
    );

    const disabledDragger = screen.getByRole('separator', { name: 'Resize panels' });
    expect(disabledDragger).toHaveAttribute('aria-disabled', 'true');
  });
});
