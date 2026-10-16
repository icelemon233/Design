// Generated from component types. Run pnpm docs:api after changing props.
import type { ApiSection, SiteLanguage } from '../../types';
export const selectApiRows: Record<SiteLanguage, ApiSection[]> = {
  zh: [
    {
      title: 'Select',
      rows: [
        ['options', '可选项数据及禁用配置。', 'SelectOption[]', '-'],
        ['controlSize', '控件尺寸。', 'CinnaSize', "'medium'"],
        ['placeholder', '没有选中内容时的提示。', 'string', "'Select'"],
        ['value', '受控值；变更后由父组件更新。', 'string | string[]', '-'],
        ['defaultValue', '非受控模式的初始值。', 'string | string[]', '-'],
        ['onChange', '值变更时调用。', '(value: string | string[]) => void', '-'],
        ['allowClear', '显示清除操作。', 'boolean', '-'],
        ['disabled', '禁用用户输入和操作。', 'boolean', '-'],
        ['mode', '显示或选择模式。', "'single' | 'multiple'", "'single'"],
        ['showSearch', '显示搜索输入。', 'boolean', '-'],
        ['notFoundContent', '没有匹配选项时显示的内容。', 'React.ReactNode', "'No options'"],
        ['open', '受控的打开状态。', 'boolean', '-'],
        ['defaultOpen', '初始打开状态。', 'boolean', 'false'],
        ['onOpenChange', '打开状态变化时调用。', '(open: boolean) => void', '-'],
        ['status', '语义状态及反馈颜色。', "Exclude<CinnaStatus, 'info'>", '-'],
        ['loading', '展示加载状态。', 'boolean', '-'],
      ],
    },
  ],
  en: [
    {
      title: 'Select',
      rows: [
        ['options', 'Available options and per-option disabled state.', 'SelectOption[]', '-'],
        ['controlSize', 'Control size.', 'CinnaSize', "'medium'"],
        ['placeholder', 'Placeholder when no value is selected.', 'string', "'Select'"],
        ['value', 'Controlled value; update it from the parent.', 'string | string[]', '-'],
        ['defaultValue', 'Initial value in uncontrolled mode.', 'string | string[]', '-'],
        ['onChange', 'Called when the value changes.', '(value: string | string[]) => void', '-'],
        ['allowClear', 'Show a clear action.', 'boolean', '-'],
        ['disabled', 'Disable user input and interaction.', 'boolean', '-'],
        ['mode', 'Display or selection mode.', "'single' | 'multiple'", "'single'"],
        ['showSearch', 'Show the search input.', 'boolean', '-'],
        [
          'notFoundContent',
          'Content displayed when no options match.',
          'React.ReactNode',
          "'No options'",
        ],
        ['open', 'Controlled open state.', 'boolean', '-'],
        ['defaultOpen', 'Initial open state.', 'boolean', 'false'],
        ['onOpenChange', 'Called when the open state changes.', '(open: boolean) => void', '-'],
        ['status', 'Semantic status and feedback color.', "Exclude<CinnaStatus, 'info'>", '-'],
        ['loading', 'Show the loading state.', 'boolean', '-'],
      ],
    },
  ],
};
