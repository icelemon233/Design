// Generated from component types. Run pnpm docs:api after changing props.
import type { ApiSection, SiteLanguage } from '../../types';
export const datePickerApiRows: Record<SiteLanguage, ApiSection[]> = {
  zh: [
    {
      title: 'DatePicker',
      rows: [
        ['controlSize', '控件尺寸。', 'CinnaSize', "'medium'"],
        ['status', '语义状态及反馈颜色。', '"success" | "warning" | "error"', '-'],
        ['allowClear', '显示清除操作。', 'boolean', '-'],
        ['disabledDate', '禁止选择指定日期。', '((date: Date) => boolean)', '-'],
      ],
    },
  ],
  en: [
    {
      title: 'DatePicker',
      rows: [
        ['controlSize', 'Control size.', 'CinnaSize', "'medium'"],
        ['status', 'Semantic status and feedback color.', '"success" | "warning" | "error"', '-'],
        ['allowClear', 'Show a clear action.', 'boolean', '-'],
        ['disabledDate', 'Prevent selection of specific dates.', '((date: Date) => boolean)', '-'],
      ],
    },
  ],
};
