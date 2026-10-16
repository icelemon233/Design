// Generated from component types. Run pnpm docs:api after changing props.
import type { ApiSection, SiteLanguage } from '../../types';
export const calendarApiRows: Record<SiteLanguage, ApiSection[]> = {
  zh: [
    {
      title: 'Calendar',
      rows: [
        ['value', '受控值；变更后由父组件更新。', 'Date', '-'],
        ['defaultValue', '非受控模式的初始值。', 'Date', '-'],
        ['onChange', '值变更时调用。', '((date: Date) => void)', '-'],
        ['fullscreen', '使用完整日历外观。', 'boolean', '-'],
        ['headerRender', '自定义日历标题。', '((date: Date) => React.ReactNode)', '-'],
        ['disabledDate', '禁止选择指定日期。', '((date: Date) => boolean)', '-'],
        ['cellRender', '自定义日期单元格内容。', '((date: Date) => React.ReactNode)', '-'],
        ['onSelect', '选中项目时调用。', '((date: Date) => void)', '-'],
      ],
    },
  ],
  en: [
    {
      title: 'Calendar',
      rows: [
        ['value', 'Controlled value; update it from the parent.', 'Date', '-'],
        ['defaultValue', 'Initial value in uncontrolled mode.', 'Date', '-'],
        ['onChange', 'Called when the value changes.', '((date: Date) => void)', '-'],
        ['fullscreen', 'Use the full calendar appearance.', 'boolean', '-'],
        ['headerRender', 'Custom calendar header.', '((date: Date) => React.ReactNode)', '-'],
        ['disabledDate', 'Prevent selection of specific dates.', '((date: Date) => boolean)', '-'],
        ['cellRender', 'Custom date-cell content.', '((date: Date) => React.ReactNode)', '-'],
        ['onSelect', 'Called when an item is selected.', '((date: Date) => void)', '-'],
      ],
    },
  ],
};
