// Generated from component types. Run pnpm docs:api after changing props.
import type { ApiSection, SiteLanguage } from '../../types';
export const radioApiRows: Record<SiteLanguage, ApiSection[]> = {
  zh: [
    {
      title: 'Radio',
      rows: [['label', '关联控件的标签。', 'React.ReactNode', '-']],
    },
    {
      title: 'RadioGroup',
      rows: [
        ['options', '可选项数据及禁用配置。', 'RadioGroupOption[]', '-'],
        ['value', '受控值；变更后由父组件更新。', 'string', '-'],
        ['defaultValue', '非受控模式的初始值。', 'string', '-'],
        ['name', '字段名或原生输入 name。', 'string', '-'],
        ['onChange', '值变更时调用。', '(value: string) => void', '-'],
        ['direction', 'direction 的配置或回调。', "'horizontal' | 'vertical'", "'horizontal'"],
        ['optionType', 'optionType 的配置或回调。', "'default' | 'button'", "'default'"],
        ['size', '组件尺寸。', 'CinnaSize', "'medium'"],
        ['disabled', '禁用用户输入和操作。', 'boolean', '-'],
      ],
    },
  ],
  en: [
    {
      title: 'Radio',
      rows: [['label', 'Label for the associated control.', 'React.ReactNode', '-']],
    },
    {
      title: 'RadioGroup',
      rows: [
        ['options', 'Available options and per-option disabled state.', 'RadioGroupOption[]', '-'],
        ['value', 'Controlled value; update it from the parent.', 'string', '-'],
        ['defaultValue', 'Initial value in uncontrolled mode.', 'string', '-'],
        ['name', 'Field name or native input name.', 'string', '-'],
        ['onChange', 'Called when the value changes.', '(value: string) => void', '-'],
        [
          'direction',
          'Configuration or callback for direction.',
          "'horizontal' | 'vertical'",
          "'horizontal'",
        ],
        [
          'optionType',
          'Configuration or callback for optionType.',
          "'default' | 'button'",
          "'default'",
        ],
        ['size', 'Component size.', 'CinnaSize', "'medium'"],
        ['disabled', 'Disable user input and interaction.', 'boolean', '-'],
      ],
    },
  ],
};
