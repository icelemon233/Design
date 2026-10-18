import * as Cinna from '@cinna-design/react';
import React from 'react';
import TransferSample from '../examples/transfer-sample';
import transferSampleSource from '../examples/transfer-sample?raw';
import type { ComponentDocConfig } from '../../types';

export const transferDoc: ComponentDocConfig = {
  examples: [
    {
      id: 'transfer-sample',
      zh: {
        title: '交互样板',
        description: '检查勾选、搜索、穿梭、禁用、空数据与窄容器。',
        codeToggle: '查看样板源码',
      },
      en: {
        title: 'Interactive sample',
        description:
          'Try selection, searching, both move directions, disabled items, empty data and a narrow container.',
        codeToggle: 'View sample source',
      },
      code: transferSampleSource,
      render: (language) => <TransferSample language={language} />,
    },

    {
      id: 'basic-transfer',
      zh: {
        title: '基本用法',
        description: 'dataSource 提供源数据，勾选条目后，通过中间按钮移动到另一栏。',
        codeToggle: '查看基本用法代码',
      },
      en: {
        title: 'Basic transfer',
        description:
          'Provide dataSource and select items before moving them with the middle buttons.',
        codeToggle: 'View basic transfer code',
      },
      code: `import { Transfer } from '@cinna-design/react';

const dataSource = [
  { key: 'docs', title: 'Docs' },
  { key: 'tokens', title: 'Tokens' },
  { key: 'icons', title: 'Icons' },
];

export default () => <Transfer dataSource={dataSource} />;`,
      render: () => (
        <Cinna.Transfer
          dataSource={[
            { key: 'docs', title: 'Docs' },
            { key: 'tokens', title: 'Tokens' },
            { key: 'icons', title: 'Icons' },
          ]}
        />
      ),
    },
    {
      id: 'transfer-target-keys',
      zh: {
        title: '默认目标项',
        description: 'defaultTargetKeys 决定初始展示在右侧目标栏的条目。',
        codeToggle: '查看默认目标项代码',
      },
      en: {
        title: 'Initial target items',
        description:
          'defaultTargetKeys decides which items are initially displayed in the target list.',
        codeToggle: 'View target keys code',
      },
      code: `import { Transfer } from '@cinna-design/react';

const dataSource = [
  { key: 'overview', title: 'Overview' },
  { key: 'api', title: 'API' },
  { key: 'changelog', title: 'Changelog' },
];

export default () => (
  <Transfer dataSource={dataSource} defaultTargetKeys={['api']} />
);`,
      render: () => (
        <Cinna.Transfer
          dataSource={[
            { key: 'overview', title: 'Overview' },
            { key: 'api', title: 'API' },
            { key: 'changelog', title: 'Changelog' },
          ]}
          defaultTargetKeys={['api']}
        />
      ),
    },
    {
      id: 'transfer-search',
      zh: {
        title: '搜索筛选',
        description: 'showSearch 会显示搜索框，并按条目 title 过滤左右两栏。',
        codeToggle: '查看搜索筛选代码',
      },
      en: {
        title: 'Search filter',
        description: 'showSearch displays a search field and filters both lists by item title.',
        codeToggle: 'View search filter code',
      },
      code: `import { Transfer } from '@cinna-design/react';

const dataSource = [
  { key: 'research', title: 'Research notes' },
  { key: 'design', title: 'Design draft' },
  { key: 'release', title: 'Release checklist' },
  { key: 'archive', title: 'Archive plan' },
];

export default () => <Transfer showSearch dataSource={dataSource} />;`,
      render: () => (
        <Cinna.Transfer
          showSearch
          dataSource={[
            { key: 'research', title: 'Research notes' },
            { key: 'design', title: 'Design draft' },
            { key: 'release', title: 'Release checklist' },
            { key: 'archive', title: 'Archive plan' },
          ]}
        />
      ),
    },
    {
      id: 'transfer-titles',
      zh: {
        title: '自定义标题',
        description: 'titles 用于定义左右两栏的标题，方便贴合具体业务语义。',
        codeToggle: '查看自定义标题代码',
      },
      en: {
        title: 'Custom titles',
        description: 'Use titles to name the two lists with product-specific language.',
        codeToggle: 'View custom titles code',
      },
      code: `import { Transfer } from '@cinna-design/react';

const dataSource = [
  { key: 'draft', title: 'Draft' },
  { key: 'review', title: 'Review' },
  { key: 'ready', title: 'Ready' },
];

export default () => (
  <Transfer
    titles={['Available stages', 'Selected stages']}
    dataSource={dataSource}
    defaultTargetKeys={['review']}
  />
);`,
      render: () => (
        <Cinna.Transfer
          titles={['Available stages', 'Selected stages']}
          dataSource={[
            { key: 'draft', title: 'Draft' },
            { key: 'review', title: 'Review' },
            { key: 'ready', title: 'Ready' },
          ]}
          defaultTargetKeys={['review']}
        />
      ),
    },
    {
      id: 'transfer-on-change',
      zh: {
        title: '变化回调',
        description: 'onChange 会在条目移动后返回新的目标 key 列表。',
        codeToggle: '查看变化回调代码',
      },
      en: {
        title: 'Change callback',
        description: 'onChange returns the next target key list after an item moves.',
        codeToggle: 'View change callback code',
      },
      code: `import { Space, Text, Transfer } from '@cinna-design/react';
import { useState } from 'react';

const dataSource = [
  { key: 'alpha', title: 'Alpha' },
  { key: 'beta', title: 'Beta' },
  { key: 'gamma', title: 'Gamma' },
];

export default () => {
  const [selected, setSelected] = useState(['beta']);

  return (
    <Space direction="vertical" align="stretch">
      <Transfer dataSource={dataSource} targetKeys={selected} onChange={setSelected} />
      <Text tone="secondary">Selected keys: {selected.join(', ') || 'none'}</Text>
    </Space>
  );
};`,
      render: () => {
        const TransferChangeDemo = () => {
          const [selected, setSelected] = React.useState(['beta']);

          return (
            <Cinna.Space direction="vertical" align="stretch">
              <Cinna.Transfer
                dataSource={[
                  { key: 'alpha', title: 'Alpha' },
                  { key: 'beta', title: 'Beta' },
                  { key: 'gamma', title: 'Gamma' },
                ]}
                targetKeys={selected}
                onChange={setSelected}
              />
              <Cinna.Text tone="secondary">
                Selected keys: {selected.join(', ') || 'none'}
              </Cinna.Text>
            </Cinna.Space>
          );
        };

        return <TransferChangeDemo />;
      },
    },
  ],
};
