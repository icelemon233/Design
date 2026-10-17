import { InputNumber } from '@cinna-design/react';
export default function DecimalNumberDemo() {
  return (
    <InputNumber
      defaultValue={0.1}
      min={0}
      max={1}
      step={0.2}
      precision={2}
      aria-label="Cream ratio"
    />
  );
}
