// Generated from component types. Run pnpm docs:api after changing props.
import type { ApiSection, SiteLanguage } from '../../types';
export const treeSelectApiRows: Record<SiteLanguage, ApiSection[]> = {
  zh: [
    {
      title: 'TreeSelect',
      rows: [
        ['treeData', '含嵌套 children 的树节点。', 'TreeNodeData[]', '-'],
        ['placeholder', '没有选中内容时的提示。', 'string', "'Select node'"],
        ['value', '受控值；变更后由父组件更新。', 'string', '-'],
        ['defaultValue', '非受控模式的初始值。', 'string', "''"],
        ['onChange', '值变更时调用。', '((value: string) => void)', '-'],
        ['allowClear', '显示清除操作。', 'boolean', '-'],
        ['disabled', '禁用用户输入和操作。', 'boolean', '-'],
        ['showSearch', '显示搜索输入。', 'boolean', '-'],
        ['defaultExpandedKeys', 'defaultExpandedKeys 的配置或回调。', 'string[]', '[]'],
      ],
    },
  ],
  en: [
    {
      title: 'TreeSelect',
      rows: [
        ['treeData', 'Tree nodes with nested children.', 'TreeNodeData[]', '-'],
        ['placeholder', 'Placeholder when no value is selected.', 'string', "'Select node'"],
        ['value', 'Controlled value; update it from the parent.', 'string', '-'],
        ['defaultValue', 'Initial value in uncontrolled mode.', 'string', "''"],
        ['onChange', 'Called when the value changes.', '((value: string) => void)', '-'],
        ['allowClear', 'Show a clear action.', 'boolean', '-'],
        ['disabled', 'Disable user input and interaction.', 'boolean', '-'],
        ['showSearch', 'Show the search input.', 'boolean', '-'],
        [
          'defaultExpandedKeys',
          'Configuration or callback for defaultExpandedKeys.',
          'string[]',
          '[]',
        ],
      ],
    },
  ],
};
