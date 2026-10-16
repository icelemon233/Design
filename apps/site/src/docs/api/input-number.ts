// Generated from component types. Run pnpm docs:api after changing props.
import type { ApiSection, SiteLanguage } from '../../types';
export const inputNumberApiRows: Record<SiteLanguage, ApiSection[]> = {
  zh: [
    {
      title: 'InputNumber',
      rows: [
        ['value', '受控值；变更后由父组件更新。', 'number | string | null', '-'],
        ['defaultValue', '非受控模式的初始值。', 'number | string | null', '-'],
        ['controlSize', '控件尺寸。', 'CinnaSize', "'medium'"],
        ['controls', '显示数值增减按钮。', 'boolean', 'true'],
        ['onChange', '值变更时调用。', '(value: number | null) => void', '-'],
        ['precision', '保留的小数位数。', 'number', '-'],
      ],
    },
  ],
  en: [
    {
      title: 'InputNumber',
      rows: [
        ['value', 'Controlled value; update it from the parent.', 'number | string | null', '-'],
        ['defaultValue', 'Initial value in uncontrolled mode.', 'number | string | null', '-'],
        ['controlSize', 'Control size.', 'CinnaSize', "'medium'"],
        ['controls', 'Show number increment/decrement controls.', 'boolean', 'true'],
        ['onChange', 'Called when the value changes.', '(value: number | null) => void', '-'],
        ['precision', 'Number of decimal places.', 'number', '-'],
      ],
    },
  ],
};
