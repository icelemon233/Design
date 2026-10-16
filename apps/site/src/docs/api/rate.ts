// Generated from component types. Run pnpm docs:api after changing props.
import type { ApiSection, SiteLanguage } from '../../types';
export const rateApiRows: Record<SiteLanguage, ApiSection[]> = {
  zh: [
    {
      title: 'Rate',
      rows: [
        ['count', '星数或计数。', 'number', '5'],
        ['value', '受控值；变更后由父组件更新。', 'number', '-'],
        ['defaultValue', '非受控模式的初始值。', 'number', '0'],
        ['onChange', '值变更时调用。', '((value: number) => void)', '-'],
        ['allowClear', '显示清除操作。', 'boolean', 'true'],
        ['allowHalf', '允许半星，键盘步进为半星。', 'boolean', '-'],
        ['tooltips', '每颗星的辅助文本。', 'string[]', '-'],
        [
          'character',
          '自定义评分字符。',
          'React.ReactNode | ((index: number) => React.ReactNode)',
          "'★'",
        ],
        ['disabled', '禁用用户输入和操作。', 'boolean', '-'],
      ],
    },
  ],
  en: [
    {
      title: 'Rate',
      rows: [
        ['count', 'Star count or item count.', 'number', '5'],
        ['value', 'Controlled value; update it from the parent.', 'number', '-'],
        ['defaultValue', 'Initial value in uncontrolled mode.', 'number', '0'],
        ['onChange', 'Called when the value changes.', '((value: number) => void)', '-'],
        ['allowClear', 'Show a clear action.', 'boolean', 'true'],
        ['allowHalf', 'Allow half stars and half-star keyboard steps.', 'boolean', '-'],
        ['tooltips', 'Tooltip for each star.', 'string[]', '-'],
        [
          'character',
          'Custom rating character.',
          'React.ReactNode | ((index: number) => React.ReactNode)',
          "'★'",
        ],
        ['disabled', 'Disable user input and interaction.', 'boolean', '-'],
      ],
    },
  ],
};
