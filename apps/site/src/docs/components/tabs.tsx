import * as Cinna from '@cinna-design/react';
import EditableTabsExample from '../examples/tabs-editable';
import editableSource from '../examples/tabs-editable?raw';
import DraggableTabsExample from '../examples/tabs-draggable';
import draggableSource from '../examples/tabs-draggable?raw';
import TabsSample from '../examples/tabs-sample';
import tabsSampleSource from '../examples/tabs-sample?raw';
import type { ComponentDocConfig } from '../../types';

const manyTabs = Array.from({ length: 14 }, (_, index) => ({
  key: `tab-${index + 1}`,
  label: `Tab ${index + 1}`,
  children: `Panel ${index + 1}`,
}));

export const tabsDoc: ComponentDocConfig = {
  examples: [
    {
      id: 'tabs-sample',
      zh: {
        title: '交互样板',
        description: '切换样式、四个方向与尺寸，检查增删、拖动、禁用及内容状态。',
        codeToggle: '查看样板源码',
      },
      en: {
        title: 'Interactive sample',
        description:
          'Try both variants, all positions, sizes, editing, reordering, disabled state and panel preservation.',
        codeToggle: 'View sample source',
      },
      code: tabsSampleSource,
      render: (language) => <TabsSample language={language} />,
    },

    {
      id: 'basic-tabs',
      zh: {
        title: '基本用法',
        description: '默认是无边框标签页，用于在同一层级的内容区域之间切换。',
        codeToggle: '查看基本用法代码',
      },
      en: {
        title: 'Basic tabs',
        description: 'The default borderless tabs switch between content areas on the same level.',
        codeToggle: 'View basic tabs code',
      },
      code: `import { Tabs } from '@cinna-design/react';

export default () => (
  <Tabs
    items={[
      { key: 'overview', label: 'Overview', children: 'Overview content' },
      { key: 'activity', label: 'Activity', children: 'Activity content' },
      { key: 'settings', label: 'Settings', children: 'Settings content' },
    ]}
  />
);`,
      render: () => (
        <Cinna.Tabs
          items={[
            { key: 'overview', label: 'Overview', children: 'Overview content' },
            { key: 'activity', label: 'Activity', children: 'Activity content' },
            { key: 'settings', label: 'Settings', children: 'Settings content' },
          ]}
        />
      ),
    },
    {
      id: 'bordered-tabs',
      zh: {
        title: '有边框模式',
        description: 'variant="bordered" 会让标签呈现为卡片式入口，适合更明确的页面分组。',
        codeToggle: '查看有边框模式代码',
      },
      en: {
        title: 'Bordered tabs',
        description: 'variant="bordered" renders card-like tab entries for stronger grouping.',
        codeToggle: 'View bordered tabs code',
      },
      code: `import { Tabs } from '@cinna-design/react';

export default () => (
  <Tabs
    variant="bordered"
    defaultActiveKey="tab-1"
    items={[
      { key: 'tab-1', label: 'Tab 1', children: 'Tab 1 content' },
      { key: 'tab-2', label: 'Tab 2', children: 'Tab 2 content' },
      { key: 'tab-3', label: 'Tab 3', children: 'Tab 3 content' },
    ]}
  />
);`,
      render: () => (
        <Cinna.Tabs
          variant="bordered"
          defaultActiveKey="tab-1"
          items={[
            { key: 'tab-1', label: 'Tab 1', children: 'Tab 1 content' },
            { key: 'tab-2', label: 'Tab 2', children: 'Tab 2 content' },
            { key: 'tab-3', label: 'Tab 3', children: 'Tab 3 content' },
          ]}
        />
      ),
    },
    {
      id: 'direction-tabs',
      zh: {
        title: '横向和纵向',
        description: '可放在上、下、左、右。容器宽度不超过 480px 时，纵向标签转为顶部横向滚动。',
        codeToggle: '查看横向和纵向代码',
      },
      en: {
        title: 'Horizontal and vertical',
        description:
          'Place the strip on any side. In containers 480px wide or narrower, vertical tabs move to the top and scroll horizontally.',
        codeToggle: 'View direction code',
      },
      code: `import { Space, Tabs } from '@cinna-design/react';

export default () => (
  <Space direction="vertical" align="stretch" style={{ width: '100%' }}>
    <Tabs tabPosition="top" items={[
      { key: 'north', label: 'North', children: 'Top tabs content' },
      { key: 'south', label: 'South', children: 'Top tabs content' },
    ]} />
    <Tabs tabPosition="left" variant="bordered" items={[
      { key: 'profile', label: 'Profile', children: 'Profile settings' },
      { key: 'billing', label: 'Billing', children: 'Billing settings' },
      { key: 'team', label: 'Team', children: 'Team settings' },
    ]} />
  </Space>
);`,
      render: () => (
        <Cinna.Space direction="vertical" align="stretch" style={{ width: '100%' }}>
          <Cinna.Tabs
            tabPosition="top"
            items={[
              { key: 'north', label: 'North', children: 'Top tabs content' },
              { key: 'south', label: 'South', children: 'Top tabs content' },
            ]}
          />
          <Cinna.Tabs
            tabPosition="left"
            variant="bordered"
            items={[
              { key: 'profile', label: 'Profile', children: 'Profile settings' },
              { key: 'billing', label: 'Billing', children: 'Billing settings' },
              { key: 'team', label: 'Team', children: 'Team settings' },
            ]}
          />
        </Cinna.Space>
      ),
    },
    {
      id: 'icon-size-tabs',
      zh: {
        title: '图标和尺寸',
        description: '每个标签可以设置 icon，size 支持 small、medium、large。',
        codeToggle: '查看图标和尺寸代码',
      },
      en: {
        title: 'Icons and sizes',
        description: 'Each tab can render an icon, and size supports small, medium, and large.',
        codeToggle: 'View icons and sizes code',
      },
      code: `import { Icon, Space, Tabs } from '@cinna-design/react';

const items = [
  { key: 'overview', icon: <Icon name="grid" size={18} />, label: 'Overview', children: 'Overview content' },
  { key: 'activity', icon: <Icon name="activity" size={18} />, label: 'Activity', children: 'Activity content' },
  { key: 'settings', icon: <Icon name="settings" size={18} />, label: 'Settings', children: 'Settings content' },
];

export default () => (
  <Space direction="vertical" align="stretch" style={{ width: '100%' }}>
    <Tabs size="small" items={items} />
    <Tabs size="medium" items={items} />
    <Tabs size="large" items={items} />
  </Space>
);`,
      render: () => {
        const items = [
          {
            key: 'overview',
            icon: <Cinna.Icon name="grid" size={18} />,
            label: 'Overview',
            children: 'Overview content',
          },
          {
            key: 'activity',
            icon: <Cinna.Icon name="activity" size={18} />,
            label: 'Activity',
            children: 'Activity content',
          },
          {
            key: 'settings',
            icon: <Cinna.Icon name="settings" size={18} />,
            label: 'Settings',
            children: 'Settings content',
          },
        ];

        return (
          <Cinna.Space direction="vertical" align="stretch" style={{ width: '100%' }}>
            <Cinna.Tabs size="small" items={items} />
            <Cinna.Tabs size="medium" items={items} />
            <Cinna.Tabs size="large" items={items} />
          </Cinna.Space>
        );
      },
    },
    {
      id: 'scrollable-tabs',
      zh: {
        title: '超多标签',
        description: '标签数量很多时，标签栏会在对应方向上滚动，内容区保持稳定。',
        codeToggle: '查看超多标签代码',
      },
      en: {
        title: 'Many tabs',
        description: 'When there are many tabs, the tab bar scrolls while the panel stays stable.',
        codeToggle: 'View many tabs code',
      },
      code: `import { Tabs } from '@cinna-design/react';

const items = Array.from({ length: 14 }, (_, index) => ({
  key: \`tab-\${index + 1}\`,
  label: \`Tab \${index + 1}\`,
  children: \`Panel \${index + 1}\`,
}));

export default () => <Tabs items={items} />;`,
      render: () => <Cinna.Tabs items={manyTabs} />,
    },
    {
      id: 'editable-tabs',
      zh: {
        title: '新增和关闭',
        description: 'addable 展示新增入口，closable 或单项 closable 可以展示关闭按钮。',
        codeToggle: '查看新增和关闭代码',
      },
      en: {
        title: 'Add and close',
        description:
          'addable renders an add entry, and closable can be enabled globally or per item.',
        codeToggle: 'View add and close code',
      },
      code: editableSource,
      render: () => <EditableTabsExample />,
    },
    {
      id: 'draggable-tabs',
      zh: {
        title: '拖动排序',
        description: 'draggable 开启后可以拖动标签改变顺序，onOrderChange 返回新的顺序。',
        codeToggle: '查看拖动排序代码',
      },
      en: {
        title: 'Drag to reorder',
        description: 'draggable lets users reorder tabs; onOrderChange returns the next order.',
        codeToggle: 'View drag reorder code',
      },
      code: draggableSource,
      render: () => <DraggableTabsExample />,
    },
    {
      id: 'custom-tabs',
      zh: {
        title: '自定义字体和颜色',
        description: '可以分别调整标签、激活态、内容面板的字体、颜色、背景和边框。',
        codeToggle: '查看自定义样式代码',
      },
      en: {
        title: 'Custom font and color',
        description: 'Customize tab, active state, panel font, color, background, and border.',
        codeToggle: 'View custom style code',
      },
      code: `import { Tabs } from '@cinna-design/react';

export default () => (
  <Tabs
    variant="bordered"
    tabFontSize={15}
    tabFontWeight={900}
    tabColor="#6b584b"
    activeTabColor="#28738d"
    tabBackgroundColor="#fff8ee"
    activeTabBackgroundColor="#ffffff"
    tabBorderColor="#ead8c0"
    activeTabBorderColor="#8a6048"
    tabRadius={12}
    panelFontSize={16}
    panelColor="#513323"
    panelBackgroundColor="#fffcf6"
    panelBorderColor="#ead8c0"
    items={[
      { key: 'tone', label: 'Tone', children: 'Custom tone panel' },
      { key: 'motion', label: 'Motion', children: 'Custom motion panel' },
      { key: 'access', label: 'Access', children: 'Custom access panel' },
    ]}
  />
);`,
      render: () => (
        <Cinna.Tabs
          variant="bordered"
          tabFontSize={15}
          tabFontWeight={900}
          tabColor="#6b584b"
          activeTabColor="#28738d"
          tabBackgroundColor="#fff8ee"
          activeTabBackgroundColor="#ffffff"
          tabBorderColor="#ead8c0"
          activeTabBorderColor="#8a6048"
          tabRadius={12}
          panelFontSize={16}
          panelColor="#513323"
          panelBackgroundColor="#fffcf6"
          panelBorderColor="#ead8c0"
          items={[
            { key: 'tone', label: 'Tone', children: 'Custom tone panel' },
            { key: 'motion', label: 'Motion', children: 'Custom motion panel' },
            { key: 'access', label: 'Access', children: 'Custom access panel' },
          ]}
        />
      ),
    },
  ],
};
