import { render, screen } from '@testing-library/react';
import { Divider } from '../../index';

describe('divider regression', () => {
  it('supports themed divider color, character lines, and custom text placement', () => {
    const { container } = render(
      <>
        <Divider color="#ef8f8f" character="*" left="24%">
          Sweet break
        </Divider>
        <Divider right={40}>Right break</Divider>
      </>,
    );

    const [leftDivider, rightDivider] = Array.from(container.querySelectorAll('.cinna-divider'));
    expect(leftDivider).toHaveClass(
      'cinna-divider--left',
      'cinna-divider--character',
      'cinna-divider--custom-left',
    );
    expect(leftDivider).toHaveStyle({
      '--cinna-divider-color': '#ef8f8f',
      '--cinna-divider-left': '24%',
    });
    expect(leftDivider?.getAttribute('data-divider-character')).toContain('*');
    expect(screen.getByText('Sweet break')).toBeInTheDocument();
    expect(rightDivider).toHaveClass('cinna-divider--right', 'cinna-divider--custom-right');
    expect(rightDivider).toHaveStyle({ '--cinna-divider-right': '40px' });
  });
});
