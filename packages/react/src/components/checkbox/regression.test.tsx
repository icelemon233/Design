import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { Checkbox, CheckboxGroup } from '../../index';

describe('checkbox regression', () => {
  it('renders checkbox motion, disabled state, custom styles, and group linkage', () => {
    const onGroupChange = vi.fn();
    const { container } = render(
      <>
        <Checkbox
          label="Styled checkbox"
          defaultChecked
          animation="particles"
          fontSize={18}
          labelColor="#46332a"
          checkedColor="#73c4e0"
          borderColor="#8a6c5f"
          rippleParticleColors={['#73c4e0', '#ffd8c2']}
        />
        <Checkbox label="Pop checkbox" animation="pop" />
        <Checkbox label="Handwriting checkbox" animation="handwriting" />
        <Checkbox label="Disabled checkbox" disabled />
        <CheckboxGroup
          options={[
            { label: 'Docs', value: 'docs' },
            { label: 'Tokens', value: 'tokens' },
          ]}
          defaultValue={['docs']}
          onChange={onGroupChange}
        />
      </>,
    );

    const styled = screen.getByLabelText('Styled checkbox').closest('.cinna-check');
    const styledBox = styled?.querySelector('.cinna-check__box');
    expect(styled).toHaveStyle({
      '--cinna-check-font-size': '18px',
      '--cinna-check-label-color': '#46332a',
      '--cinna-check-checked-color': '#73c4e0',
      '--cinna-check-border-color': '#8a6c5f',
    });
    expect(styled).toHaveClass('cinna-check--animation-particles');
    expect(screen.getByLabelText('Pop checkbox').closest('.cinna-check')).toHaveClass(
      'cinna-check--animation-pop',
    );
    expect(screen.getByLabelText('Handwriting checkbox').closest('.cinna-check')).toHaveClass(
      'cinna-check--animation-handwriting',
    );
    expect(screen.getByLabelText('Disabled checkbox').closest('.cinna-check')).toHaveClass(
      'cinna-check--disabled',
    );

    const styledLabel = styled?.querySelector('.cinna-check__label');
    fireEvent.click(styledLabel!);
    expect(styledBox!.querySelectorAll('.cinna-button__ripple-particle')).toHaveLength(6);
    expect(styled!.querySelector('.cinna-check__label .cinna-button__ripple-particle')).toBeNull();
    expect(styledBox!.querySelector('.cinna-check__mark-path')).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText('Tokens'));
    expect(onGroupChange).toHaveBeenCalledWith(['docs', 'tokens']);
  });
});
