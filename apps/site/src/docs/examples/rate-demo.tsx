import { Rate } from '@cinna-design/react';
import { useState } from 'react';
export default function HalfRatingDemo() {
  const [value, setValue] = useState(3.5);
  return (
    <>
      <Rate allowHalf value={value} onChange={setValue} aria-label="Rate the recipe" />
      <p role="status">Rating: {value} / 5. Use arrow keys for half-star steps.</p>
    </>
  );
}
