import { Select } from '@cinna-design/react';
import { useState } from 'react';
export default function SearchSelectDemo() {
  const [value, setValue] = useState<string | string[]>([]);
  return (
    <Select
      showSearch
      allowClear
      mode="multiple"
      value={value}
      onChange={setValue}
      placeholder="Search ingredients"
      options={[
        { value: 'cream', label: 'Cream' },
        { value: 'cinnamon', label: 'Cinnamon' },
        { value: 'blueberry', label: 'Blueberry' },
        { value: 'sold-out', label: 'Vanilla (sold out)', disabled: true },
      ]}
    />
  );
}
