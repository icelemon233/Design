import { render, screen } from '@testing-library/react';
import { RadioGroup } from '../../index';

describe('radio regression', () => {
  it('supports controlled-like selection components', () => {
    render(
      <RadioGroup
        defaultValue="a"
        options={[
          { label: 'A', value: 'a' },
          { label: 'B', value: 'b' },
        ]}
      />,
    );
    expect(screen.getByLabelText('A')).toBeChecked();
  });
});
