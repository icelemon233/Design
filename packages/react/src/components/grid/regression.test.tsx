import { render } from '@testing-library/react';
import { Col, Grid, Row } from '../../index';

describe('grid regression', () => {
  it('renders the simplified grid and row gutter styles', () => {
    const { container } = render(
      <>
        <Grid columns={3} gap={[24, '12px']}>
          <div>One</div>
          <div>Two</div>
        </Grid>
        <Row gutter={[24, 16]} wrap={false}>
          <Col span={12} offset={6} order={2}>
            Half
          </Col>
        </Row>
      </>,
    );

    const grid = container.querySelector('.cinna-grid');
    expect(grid).toHaveStyle({
      '--cinna-grid-template': 'repeat(3, minmax(0, 1fr))',
      '--cinna-grid-gap-x': '24px',
      '--cinna-grid-gap-y': '12px',
    });

    const row = container.querySelector('.cinna-row');
    expect(row).toHaveClass('cinna-row--nowrap');
    expect(row).toHaveStyle({
      '--cinna-row-gutter-x': '24px',
      rowGap: '16px',
    });

    const col = container.querySelector('.cinna-col');
    expect(col).toHaveStyle({
      flexBasis: '50%',
      maxWidth: '50%',
      marginLeft: '25%',
      order: '2',
    });
  });
});
