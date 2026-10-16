// Generated from component types. Run pnpm docs:api after changing props.
import type { ApiSection, SiteLanguage } from '../../types';
export const segmentedApiRows: Record<SiteLanguage, ApiSection[]> = {
  zh: [
    {
      title: 'Segmented',
      rows: [
        ['options', '可选项数据及禁用配置。', 'SegmentedOption[]', '-'],
        ['value', '受控值；变更后由父组件更新。', 'string', '-'],
        ['defaultValue', '非受控模式的初始值。', 'string', '-'],
        ['onChange', '值变更时调用。', '((value: string) => void)', '-'],
        ['block', '铺满父容器宽度。', 'boolean', '-'],
        ['size', '组件尺寸。', 'CinnaSize', "'medium'"],
        ['disabled', '禁用用户输入和操作。', 'boolean', '-'],
      ],
    },
  ],
  en: [
    {
      title: 'Segmented',
      rows: [
        ['options', 'Available options and per-option disabled state.', 'SegmentedOption[]', '-'],
        ['value', 'Controlled value; update it from the parent.', 'string', '-'],
        ['defaultValue', 'Initial value in uncontrolled mode.', 'string', '-'],
        ['onChange', 'Called when the value changes.', '((value: string) => void)', '-'],
        ['block', 'Fill the parent width.', 'boolean', '-'],
        ['size', 'Component size.', 'CinnaSize', "'medium'"],
        ['disabled', 'Disable user input and interaction.', 'boolean', '-'],
      ],
    },
  ],
};
