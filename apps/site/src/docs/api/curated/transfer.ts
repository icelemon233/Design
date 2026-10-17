import type { ApiSection, SiteLanguage } from '../../../types';

export const transferApiRows: Record<SiteLanguage, ApiSection[]> = {
  zh: [
    {
      title: 'TransferProps',
      rows: [
        ['dataSource', '项目数据；key 需唯一。', 'TransferItem[]', '-'],
        ['targetKeys', '受控目标项；移动后由父组件更新。', 'string[]', '-'],
        ['defaultTargetKeys', '非受控模式的初始目标项。', 'string[]', '[]'],
        ['selectedKeys', '受控勾选项；与目标项独立。', 'string[]', '-'],
        ['defaultSelectedKeys', '非受控模式的初始勾选项。', 'string[]', '[]'],
        [
          'onChange',
          '移动后返回目标 key、移动意图及本次移动的 key。',
          '(targetKeys, direction, movedKeys) => void',
          '-',
        ],
        [
          'onSelectChange',
          '勾选变化时，分别返回来源和目标列表的勾选 key。',
          '(source, target) => void',
          '-',
        ],
        ['titles', '覆盖两个列表的标题。', '[ReactNode, ReactNode]', '-'],
        ['showSearch', '各列表独立搜索；全选作用于当前搜索结果。', 'boolean', 'false'],
        ['disabled', '禁用搜索、勾选和穿梭操作。', 'boolean', 'false'],
        [
          'locale',
          '覆盖列表标题、操作名称、搜索提示和空态文字。',
          'Partial<TransferLocale>',
          '英文文案',
        ],
      ],
    },
  ],
  en: [
    {
      title: 'TransferProps',
      rows: [
        ['dataSource', 'Items with unique keys.', 'TransferItem[]', '-'],
        [
          'targetKeys',
          'Controlled target keys; update them from the parent after a move.',
          'string[]',
          '-',
        ],
        ['defaultTargetKeys', 'Initial target keys in uncontrolled mode.', 'string[]', '[]'],
        ['selectedKeys', 'Controlled checked keys, independent of target keys.', 'string[]', '-'],
        ['defaultSelectedKeys', 'Initial checked keys in uncontrolled mode.', 'string[]', '[]'],
        [
          'onChange',
          'Returns target keys, move intent and the keys moved by this action.',
          '(targetKeys, direction, movedKeys) => void',
          '-',
        ],
        [
          'onSelectChange',
          'Returns checked source and target keys separately.',
          '(source, target) => void',
          '-',
        ],
        ['titles', 'Override the two list headings.', '[ReactNode, ReactNode]', '-'],
        [
          'showSearch',
          'Search each list independently; select all applies to visible results.',
          'boolean',
          'false',
        ],
        ['disabled', 'Disable searching, selection and move actions.', 'boolean', 'false'],
        [
          'locale',
          'Override headings, actions, search prompts and empty messages.',
          'Partial<TransferLocale>',
          'English',
        ],
      ],
    },
  ],
};
