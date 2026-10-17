import { Button, Card, Spin } from '@cinna-design/react';
import { useState } from 'react';
export default function WrappedSpinDemo() {
  const [loading, setLoading] = useState(false);
  return (
    <>
      <Button onClick={() => setLoading(!loading)}>
        {loading ? 'Stop loading' : 'Start loading'}
      </Button>
      <Spin spinning={loading} delay={150} tip="Preparing recipe">
        <Card title="Cloud cake">
          <p>Wrapped content remains visible while the loading layer blocks interaction.</p>
          <Button variant="cream">Edit recipe</Button>
        </Card>
      </Spin>
    </>
  );
}
