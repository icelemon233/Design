import { fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';
import { vi } from 'vitest';
import { Steps } from '../../index';

describe('steps regression', () => {
  it('supports clickable steps, automatic finish state, and status overrides', () => {
    const onChange = vi.fn();
    const ClickableStepsTest = () => {
      const [current, setCurrent] = useState(1);
      return (
        <Steps
          clickable
          current={current}
          onChange={(next, item, event) => {
            setCurrent(next);
            onChange(next, item, event);
          }}
          items={[
            { title: 'Upload' },
            { title: 'Build', description: 'Running checks' },
            { title: 'Verify', description: 'Token mismatch' },
          ]}
        />
      );
    };
    const { container } = render(<ClickableStepsTest />);

    expect(container.querySelectorAll('.cinna-step')[0]).toHaveClass('cinna-step--finish');
    expect(container.querySelectorAll('.cinna-step')[1]).toHaveClass(
      'cinna-step--process',
      'cinna-step--current',
    );

    fireEvent.click(screen.getByRole('button', { name: /Verify/ }));
    expect(onChange).toHaveBeenCalledWith(
      2,
      expect.objectContaining({ title: 'Verify' }),
      expect.any(Object),
    );
    expect(container.querySelectorAll('.cinna-step')[2]).toHaveClass('cinna-step--motion-current');
    expect(container.querySelectorAll('.cinna-step__connector')[1]).toHaveClass(
      'cinna-step__connector--motion',
    );
  });

  it('renders vertical, logo, underline, minimal, and custom connector steps', () => {
    const { container } = render(
      <>
        <Steps
          direction="vertical"
          labelPlacement="bottom"
          underline
          markerShape="rounded"
          connector="→"
          connectorCount={3}
          connectorColor="#df6677"
          markerFontSize={15}
          markerBackgroundColor="#ffe8a8"
          titleFontSize={18}
          titleColor="#46332a"
          items={[
            { title: 'Logo', logo: '☁' },
            { title: 'Review', subTitle: 'Owner', description: 'Check content' },
          ]}
        />
        <Steps
          type="minimal"
          defaultCurrent={1}
          items={[
            { title: 'Queued', description: 'Waiting' },
            { title: 'Running', description: 'One title with one description' },
            { title: 'Done' },
          ]}
        />
      </>,
    );

    const root = container.querySelector('.cinna-steps');
    expect(root).toHaveClass(
      'cinna-steps--vertical',
      'cinna-steps--label-bottom',
      'cinna-steps--marker-rounded',
      'cinna-steps--underline',
    );
    expect(root).toHaveStyle({
      '--cinna-steps-connector-color': '#df6677',
      '--cinna-steps-marker-font-size': '15px',
      '--cinna-steps-marker-bg': '#ffe8a8',
      '--cinna-steps-title-font-size': '18px',
      '--cinna-steps-title-color': '#46332a',
    });
    expect(container.querySelectorAll('.cinna-step__connector-token')).toHaveLength(3);
    expect(screen.getByText('☁')).toHaveClass('cinna-step__marker');
    expect(screen.getByText('Owner')).toHaveClass('cinna-step__subtitle');
    expect(container.querySelector('.cinna-steps--minimal')).toBeInTheDocument();
    expect(screen.getByText('One title with one description')).toHaveClass(
      'cinna-step__description',
    );
  });
});
