import type { ApiSection, SiteLanguage } from '../../../types';

export const checkboxApiRows: Record<SiteLanguage, ApiSection[]> = {
  zh: [
    {
      title: '复选框',
      rows: [
        ['label', '复选框旁的说明内容。', 'ReactNode', '-'],
        ['checked', '是否选中，传入后进入受控模式。', 'boolean', '-'],
        ['defaultChecked', '非受控模式下的默认选中状态。', 'boolean', 'false'],
        ['indeterminate', '半选态，只表达视觉上的部分选中状态。', 'boolean', 'false'],
        ['disabled', '禁用复选框，并以置灰方式展示。', 'boolean', 'false'],
        ['size', '复选框尺寸。', "'small' | 'medium' | 'large'", "'medium'"],
        ['onChange', '选中状态变化时触发。', 'ChangeEventHandler<HTMLInputElement>', '-'],
      ],
    },
    {
      title: '复选框组',
      rows: [
        ['options', '复选框选项列表。', 'CheckboxGroupOption[]', '[]'],
        ['value', '当前选中的 value 列表，传入后进入受控模式。', 'string[]', '-'],
        ['defaultValue', '非受控模式下的默认选中 value 列表。', 'string[]', '[]'],
        ['name', '组内原生 input name。', 'string', '自动生成'],
        ['direction', '排列方向。', "'horizontal' | 'vertical'", "'horizontal'"],
        ['disabled', '禁用整组复选框。', 'boolean', 'false'],
        ['onChange', '选中列表变化时触发。', '(checkedValues: string[]) => void', '-'],
      ],
    },
    {
      title: '复选框与复选框组样式动效',
      rows: [
        ['fontSize', '自定义说明文本字号，数字按 px 处理。', 'number | string', '-'],
        ['fontWeight', '自定义说明文本字重。', 'CSSProperties["fontWeight"]', '-'],
        ['labelColor', '自定义说明文本颜色。', 'string', '-'],
        ['checkedColor', '自定义选中方框颜色。', 'string', '-'],
        ['boxColor', '自定义未选中方框背景色。', 'string', '-'],
        ['borderColor', '自定义未选中方框边框色。', 'string', '-'],
        [
          'animation',
          '勾选动效。点击文字也会触发动效；particles 的粒子范围只作用于方框区域，pop 为勾号弹出，handwriting 为手写勾号，none 关闭动效。',
          "'particles' | 'pop' | 'handwriting' | 'none'",
          "'particles'",
        ],
        ['ripple', '是否启用粒子动效，保留用于兼容旧用法。', 'boolean', 'true'],
        [
          'rippleParticleColors',
          '自定义粒子颜色，支持颜色数组。',
          'string | string[]',
          '主题色数组',
        ],
        ['rippleParticleOpacity', '自定义粒子透明度。', 'number', '0.72'],
      ],
    },
    {
      title: '选项类型',
      rows: [
        ['CheckboxGroupOption.label', '选项说明内容。', 'ReactNode', '-'],
        ['CheckboxGroupOption.value', '选项值。', 'string', '-'],
        ['CheckboxGroupOption.disabled', '禁用当前选项。', 'boolean', 'false'],
        ['CheckboxGroupOption.indeterminate', '当前选项展示半选态。', 'boolean', 'false'],
      ],
    },
  ],
  en: [
    {
      title: 'Checkbox',
      rows: [
        ['label', 'Description content next to the checkbox.', 'ReactNode', '-'],
        ['checked', 'Whether checked. Enables controlled mode when provided.', 'boolean', '-'],
        ['defaultChecked', 'Initial checked state in uncontrolled mode.', 'boolean', 'false'],
        ['indeterminate', 'Visual partial-selection state.', 'boolean', 'false'],
        ['disabled', 'Disables the checkbox and renders a muted gray state.', 'boolean', 'false'],
        ['size', 'Checkbox size.', "'small' | 'medium' | 'large'", "'medium'"],
        [
          'onChange',
          'Fires when checked state changes.',
          'ChangeEventHandler<HTMLInputElement>',
          '-',
        ],
      ],
    },
    {
      title: 'CheckboxGroup',
      rows: [
        ['options', 'Checkbox option list.', 'CheckboxGroupOption[]', '[]'],
        [
          'value',
          'Current checked value list. Enables controlled mode when provided.',
          'string[]',
          '-',
        ],
        ['defaultValue', 'Initial checked value list in uncontrolled mode.', 'string[]', '[]'],
        ['name', 'Native input name for the group.', 'string', 'Generated'],
        ['direction', 'Layout direction.', "'horizontal' | 'vertical'", "'horizontal'"],
        ['disabled', 'Disables the whole group.', 'boolean', 'false'],
        ['onChange', 'Fires when checked values change.', '(checkedValues: string[]) => void', '-'],
      ],
    },
    {
      title: 'Checkbox And Group Style And Motion',
      rows: [
        ['fontSize', 'Custom label font size. Numbers are treated as px.', 'number | string', '-'],
        ['fontWeight', 'Custom label font weight.', 'CSSProperties["fontWeight"]', '-'],
        ['labelColor', 'Custom label color.', 'string', '-'],
        ['checkedColor', 'Custom checked box color.', 'string', '-'],
        ['boxColor', 'Custom unchecked box background.', 'string', '-'],
        ['borderColor', 'Custom unchecked box border color.', 'string', '-'],
        [
          'animation',
          'Checkbox animation. Clicking the label also triggers motion; particles stay scoped to the box, pop bounces the check mark, handwriting draws the check mark, and none disables motion.',
          "'particles' | 'pop' | 'handwriting' | 'none'",
          "'particles'",
        ],
        [
          'ripple',
          'Whether particle animation is enabled. Kept for backward compatibility.',
          'boolean',
          'true',
        ],
        [
          'rippleParticleColors',
          'Custom particle color or color list.',
          'string | string[]',
          'Theme color list',
        ],
        ['rippleParticleOpacity', 'Custom particle opacity.', 'number', '0.72'],
      ],
    },
    {
      title: 'Option Type',
      rows: [
        ['CheckboxGroupOption.label', 'Option description content.', 'ReactNode', '-'],
        ['CheckboxGroupOption.value', 'Option value.', 'string', '-'],
        ['CheckboxGroupOption.disabled', 'Disables this option.', 'boolean', 'false'],
        [
          'CheckboxGroupOption.indeterminate',
          'Shows this option as indeterminate.',
          'boolean',
          'false',
        ],
      ],
    },
  ],
};
