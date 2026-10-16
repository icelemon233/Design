// Generated from component types. Run pnpm docs:api after changing props.
import type { ApiSection, SiteLanguage } from '../../types';
export const treeApiRows: Record<SiteLanguage, ApiSection[]> = {
  zh: [
    {
      title: 'Tree',
      rows: [
        ['treeData', '含嵌套 children 的树节点。', 'TreeNodeData[]', '-'],
        ['defaultExpandAll', 'defaultExpandAll 的配置或回调。', 'boolean', 'true'],
        ['defaultExpandedKeys', 'defaultExpandedKeys 的配置或回调。', 'string[]', '-'],
        ['expandedKeys', '受控的展开节点键值。', 'string[]', '-'],
        ['onExpand', '展开节点变化时调用。', '((keys: string[]) => void)', '-'],
        ['selectable', '允许选择节点。', 'boolean', 'true'],
        ['selectedKey', '受控的当前选中节点。', 'string', '-'],
        ['defaultSelectedKey', 'defaultSelectedKey 的配置或回调。', 'string', '-'],
        ['onSelect', '选中项目时调用。', '((key: string) => void)', '-'],
        ['multiple', '允许选择多个项目。', 'boolean', '-'],
        ['selectedKeys', '受控的选中项目键值。', 'string[]', '-'],
        ['defaultSelectedKeys', 'defaultSelectedKeys 的配置或回调。', 'string[]', '[]'],
        [
          'onSelectedKeysChange',
          'onSelectedKeysChange 的配置或回调。',
          '((keys: string[]) => void)',
          '-',
        ],
        ['checkable', '显示复选框并启用父子级联。', 'boolean', '-'],
        ['checkedKeys', '受控的勾选节点键值。', 'string[]', '-'],
        ['defaultCheckedKeys', 'defaultCheckedKeys 的配置或回调。', 'string[]', '[]'],
        ['onCheck', '勾选节点变化时调用。', '((keys: string[]) => void)', '-'],
        ['disabled', '禁用用户输入和操作。', 'boolean', '-'],
      ],
    },
  ],
  en: [
    {
      title: 'Tree',
      rows: [
        ['treeData', 'Tree nodes with nested children.', 'TreeNodeData[]', '-'],
        ['defaultExpandAll', 'Configuration or callback for defaultExpandAll.', 'boolean', 'true'],
        [
          'defaultExpandedKeys',
          'Configuration or callback for defaultExpandedKeys.',
          'string[]',
          '-',
        ],
        ['expandedKeys', 'Controlled expanded node keys.', 'string[]', '-'],
        ['onExpand', 'Called when expanded nodes change.', '((keys: string[]) => void)', '-'],
        ['selectable', 'Allow node selection.', 'boolean', 'true'],
        ['selectedKey', 'Controlled selected node.', 'string', '-'],
        ['defaultSelectedKey', 'Configuration or callback for defaultSelectedKey.', 'string', '-'],
        ['onSelect', 'Called when an item is selected.', '((key: string) => void)', '-'],
        ['multiple', 'Allow multiple selected items.', 'boolean', '-'],
        ['selectedKeys', 'Controlled selected item keys.', 'string[]', '-'],
        [
          'defaultSelectedKeys',
          'Configuration or callback for defaultSelectedKeys.',
          'string[]',
          '[]',
        ],
        [
          'onSelectedKeysChange',
          'Configuration or callback for onSelectedKeysChange.',
          '((keys: string[]) => void)',
          '-',
        ],
        ['checkable', 'Show checkboxes with parent-child selection.', 'boolean', '-'],
        ['checkedKeys', 'Controlled checked node keys.', 'string[]', '-'],
        [
          'defaultCheckedKeys',
          'Configuration or callback for defaultCheckedKeys.',
          'string[]',
          '[]',
        ],
        ['onCheck', 'Called when checked nodes change.', '((keys: string[]) => void)', '-'],
        ['disabled', 'Disable user input and interaction.', 'boolean', '-'],
      ],
    },
  ],
};
