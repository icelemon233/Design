import { fireEvent, render, screen } from '@testing-library/react';
import { FloatButton, FloatButtonBackTop, FloatButtonGroup } from '../../index';

describe('float-button regression', () => {
  it('renders float button ripple effects when clicked', () => {
    const { container } = render(
      <FloatButton
        icon="+"
        rippleEffects={['outer', 'inner', 'particles']}
        rippleParticleColors={['#ef8f8f', '#54b6cd']}
        rippleParticleOpacity={0.64}
      />,
    );
    const button = screen.getByRole('button', { name: '+' });
    button.getBoundingClientRect = () => ({
      x: 0,
      y: 0,
      width: 56,
      height: 56,
      top: 0,
      right: 56,
      bottom: 56,
      left: 0,
      toJSON: () => ({}),
    });

    fireEvent.click(button, { clientX: 28, clientY: 28 });

    expect(container.querySelector('.cinna-button__ripple--outer')).toBeInTheDocument();
    expect(container.querySelector('.cinna-button__ripple--inner')).toBeInTheDocument();
    expect(container.querySelectorAll('.cinna-button__ripple-particle').length).toBeGreaterThan(0);
    expect(button).toHaveStyle({ '--button-particle-opacity': '0.64' });
  });

  it('does not render float button ripple effects when disabled', () => {
    const { container } = render(
      <FloatButton icon="x" disabled rippleEffects={['outer', 'inner', 'particles']} />,
    );
    fireEvent.click(screen.getByRole('button', { name: 'x' }));

    expect(container.querySelector('.cinna-button__ripple')).not.toBeInTheDocument();
    expect(container.querySelector('.cinna-button__ripple-particle')).not.toBeInTheDocument();
  });

  it('supports float button theme presets', () => {
    render(
      <FloatButton
        icon="T"
        shape="square"
        theme="mint"
        color="#111111"
        backgroundColor="#222222"
      />,
    );

    expect(screen.getByRole('button', { name: 'T' })).toHaveStyle({
      '--button-color': '#263a30',
      '--button-bg': '#9bcb8e',
      '--button-border': 'rgba(74, 130, 79, 0.24)',
      '--button-shadow': '0 5px 0 #72b866',
    });
  });

  it('opens float button groups with click trigger', () => {
    const { container } = render(
      <FloatButtonGroup
        trigger="click"
        items={[
          { key: 'edit', icon: 'E', tooltip: 'Edit' },
          { key: 'share', icon: 'S', tooltip: 'Share' },
        ]}
      />,
    );

    expect(container.querySelector('.cinna-float-button-group')).not.toHaveClass(
      'cinna-float-button-group--open',
    );
    fireEvent.click(screen.getByRole('button', { name: '+' }));
    expect(container.querySelector('.cinna-float-button-group')).toHaveClass(
      'cinna-float-button-group--open',
    );
  });

  it('scrolls target to top from the back top float button', () => {
    const target = document.createElement('div');
    target.scrollTop = 160;

    render(<FloatButtonBackTop target={() => target} visibilityHeight={10} duration={0} />);
    fireEvent.click(screen.getByRole('button', { name: 'Back to top' }));

    expect(target.scrollTop).toBe(0);
  });
});
