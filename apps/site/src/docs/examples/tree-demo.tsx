import { Tree } from '@cinna-design/react';
import { useState } from 'react';
export default function CheckedTreeDemo() {
  const [checked, setChecked] = useState<string[]>([]);
  const [expanded, setExpanded] = useState(['recipes']);
  return (
    <>
      <Tree
        checkable
        checkedKeys={checked}
        onCheck={setChecked}
        expandedKeys={expanded}
        onExpand={setExpanded}
        treeData={[
          {
            key: 'recipes',
            title: 'Recipes',
            children: [
              { key: 'cloud', title: 'Cloud cake' },
              { key: 'cinnamon', title: 'Cinnamon tart' },
              { key: 'locked', title: 'Archived recipe', disabled: true },
            ],
          },
        ]}
      />
      <p role="status">Checked: {checked.join(', ') || 'none'}</p>
    </>
  );
}
