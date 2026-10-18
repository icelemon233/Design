// Generated from component types. Run pnpm docs:api after changing props.
import type { ApiSection, SiteLanguage } from '../../types';
import { transferApiRows as curated } from './curated/transfer';
import { mergeApiSections } from './merge';
const generated: Record<SiteLanguage, ApiSection[]> = {
  zh: [
    {
      title: 'Transfer',
      rows: [
        ['dataSource', '数据记录。', 'TransferItem[]', '-'],
        ['targetKeys', '受控的目标栏键值。', 'string[]', '-'],
        ['defaultTargetKeys', '目标栏的初始键值。', 'string[]', '[]'],
        [
          'onChange',
          '值变更时调用。',
          "( targetKeys: string[], direction: 'toTarget' | 'toSource', movedKeys: string[], ) => void",
          '-',
        ],
        ['titles', '源栏和目标栏的标题。', '[React.ReactNode, React.ReactNode]', '-'],
        ['showSearch', '显示搜索输入。', 'boolean', 'false'],
        ['disabled', '禁用用户输入和操作。', 'boolean', '-'],
        ['selectedKeys', '受控的选中项目键值。', 'string[]', '-'],
        ['defaultSelectedKeys', '非受控模式的初始勾选项。', 'string[]', '[]'],
        ['locale', '按字段覆盖界面文案。', 'Partial<TransferLocale>', '-'],
        [
          'onSelectChange',
          'onSelectChange 的配置或回调。',
          '(source: string[], target: string[]) => void',
          '-',
        ],
      ],
    },
  ],
  en: [
    {
      title: 'Transfer',
      rows: [
        ['dataSource', 'Data records.', 'TransferItem[]', '-'],
        ['targetKeys', 'Controlled keys in the target list.', 'string[]', '-'],
        ['defaultTargetKeys', 'Initial keys in the target list.', 'string[]', '[]'],
        [
          'onChange',
          'Called when the value changes.',
          "( targetKeys: string[], direction: 'toTarget' | 'toSource', movedKeys: string[], ) => void",
          '-',
        ],
        ['titles', 'Source and target list titles.', '[React.ReactNode, React.ReactNode]', '-'],
        ['showSearch', 'Show the search input.', 'boolean', 'false'],
        ['disabled', 'Disable user input and interaction.', 'boolean', '-'],
        ['selectedKeys', 'Controlled selected item keys.', 'string[]', '-'],
        ['defaultSelectedKeys', 'Initial checked keys in uncontrolled mode.', 'string[]', '[]'],
        ['locale', 'Override interface text by field.', 'Partial<TransferLocale>', '-'],
        [
          'onSelectChange',
          'Configuration or callback for onSelectChange.',
          '(source: string[], target: string[]) => void',
          '-',
        ],
      ],
    },
  ],
};
export const transferApiRows = {
  zh: mergeApiSections(curated.zh, generated.zh),
  en: mergeApiSections(curated.en, generated.en),
};
