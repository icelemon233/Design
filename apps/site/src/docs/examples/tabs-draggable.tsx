import { Icon, Tabs, type TabsItem } from '@cinna-design/react';
import { useState } from 'react';

export default function DraggableTabsExample() {
  const [items, setItems] = useState<TabsItem[]>([
    {
      key: 'overview',
      icon: <Icon name="grid" size={18} />,
      label: 'Overview',
      children: 'Overview content',
    },
    {
      key: 'activity',
      icon: <Icon name="activity" size={18} />,
      label: 'Activity',
      children: 'Activity content',
    },
    {
      key: 'settings',
      icon: <Icon name="settings" size={18} />,
      label: 'Settings',
      children: 'Settings content',
    },
    { key: 'team', icon: <Icon name="users" size={18} />, label: 'Team', children: 'Team content' },
  ]);
  return (
    <Tabs draggable variant="bordered" items={items} onOrderChange={(_, next) => setItems(next)} />
  );
}
