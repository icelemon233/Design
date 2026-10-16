import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { Anchor } from '../../index';

describe('anchor regression', () => {
  it('scrolls anchor targets inside a local container', () => {
    const onChange = vi.fn();
    const { container } = render(
      <div>
        <div data-testid="scroll-pane">
          <section id="anchor-target">Target section</section>
        </div>
        <Anchor
          affix
          offsetTop={12}
          direction="horizontal"
          getContainer={() => screen.getByTestId('scroll-pane')}
          items={[{ key: 'target', href: '#anchor-target', title: 'Target' }]}
          onChange={onChange}
        />
      </div>,
    );
    const scrollPane = screen.getByTestId('scroll-pane') as HTMLDivElement;
    const scrollTo = vi.fn();
    Object.defineProperty(scrollPane, 'scrollTo', { value: scrollTo, configurable: true });

    fireEvent.click(screen.getByRole('link', { name: 'Target' }));

    expect(container.querySelector('.cinna-anchor')).toHaveClass('cinna-anchor--horizontal');
    expect(container.querySelector('.cinna-anchor')).toHaveClass('cinna-anchor--affix');
    expect(container.querySelector('.cinna-anchor')).toHaveStyle({ top: '12px' });
    expect(scrollTo).toHaveBeenCalled();
    expect(screen.getByRole('link', { name: 'Target' })).toHaveClass('cinna-anchor__item--active');
    expect(onChange).toHaveBeenCalledWith('#anchor-target');
    expect(window.location.hash).not.toBe('#anchor-target');
  });

  it('supports custom anchor target points and item offsets', () => {
    const { container } = render(
      <div>
        <div data-testid="custom-scroll-pane">
          <section data-anchor-point="custom">Custom target section</section>
        </div>
        <Anchor
          targetOffset={8}
          getContainer={() => screen.getByTestId('custom-scroll-pane')}
          items={[
            {
              key: 'custom',
              href: '#custom-anchor-link',
              title: 'Custom target',
              anchorTarget: '[data-anchor-point="custom"]',
              targetOffset: 32,
            },
          ]}
        />
      </div>,
    );
    const scrollPane = screen.getByTestId('custom-scroll-pane') as HTMLDivElement;
    const scrollTo = vi.fn();
    Object.defineProperty(scrollPane, 'scrollTo', { value: scrollTo, configurable: true });

    fireEvent.click(screen.getByRole('link', { name: 'Custom target' }));

    expect(container.querySelector('.cinna-anchor__item--active')).toHaveTextContent(
      'Custom target',
    );
    expect(scrollTo).toHaveBeenCalledWith({ top: -32, behavior: 'smooth' });
    expect(window.location.hash).not.toBe('#custom-anchor-link');
  });
});
