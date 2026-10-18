import { Tabs, type TabsItem } from '@cinna-design/react';
import { useRef, useState } from 'react';

export default function EditableTabsExample() {
  const nextId = useRef(4);
  const [items, setItems] = useState<TabsItem[]>([
    { key: 'tab-1', label: 'Tab 1', children: 'Tab 1 content', closable: true },
    { key: 'tab-2', label: 'Tab 2', children: 'Tab 2 content', closable: true },
    { key: 'tab-3', label: 'Tab 3', children: 'Tab 3 content' },
  ]);
  return (
    <Tabs
      variant="bordered"
      items={items}
      addable
      onAdd={() => {
        const id = nextId.current++;
        setItems((current) => [
          ...current,
          {
            key: 'tab-' + id,
            label: 'Tab ' + id,
            children: 'Tab ' + id + ' content',
            closable: true,
          },
        ]);
      }}
      onClose={(key) => setItems((current) => current.filter((item) => item.key !== key))}
    />
  );
}
