import { TreeSelect } from '@cinna-design/react';
import { useState } from 'react';
export default function SearchTreeDemo() {
  const [value, setValue] = useState('');
  return (
    <TreeSelect
      value={value}
      onChange={setValue}
      showSearch
      allowClear
      placeholder="Find a recipe"
      defaultExpandedKeys={['recipes']}
      treeData={[
        {
          key: 'recipes',
          title: 'Recipes',
          children: [
            { key: 'cloud', title: <strong>Cloud cake</strong> },
            { key: 'cinnamon', title: 'Cinnamon tart' },
            { key: 'locked', title: 'Archived recipe', disabled: true },
          ],
        },
      ]}
    />
  );
}
