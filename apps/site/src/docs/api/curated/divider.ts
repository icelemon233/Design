import type { ApiRow, SiteLanguage } from '../../../types';

export const dividerApiRows: Record<SiteLanguage, ApiRow[]> = {
  zh: [
    ['orientation', '文字位置，保留兼容用法。', "'left' | 'center' | 'right'", "'center'"],
    [
      'left',
      '将文字放到左侧；传入数字或 CSS 长度时控制左侧距离。',
      'boolean | number | string',
      '-',
    ],
    [
      'right',
      '将文字放到右侧；传入数字或 CSS 长度时控制右侧距离。',
      'boolean | number | string',
      '-',
    ],
    ['color', '自定义分割线和文字颜色。', 'string', '-'],
    ['character', '使用自定义字符重复组成分割线。', 'string', '-'],
    ['dashed', '使用虚线样式，设为 false 时为实线。', 'boolean', 'true'],
    ['plain', '弱化文字粗细。', 'boolean', 'false'],
    ['vertical', '展示为垂直分割线。', 'boolean', 'false'],
    ['children', '分割线中的文字或自定义内容。', 'ReactNode', '-'],
    ['className', '自定义 className。', 'string', '-'],
    ['style', '自定义样式。', 'CSSProperties', '-'],
  ],
  en: [
    [
      'orientation',
      'Text placement kept for compatibility.',
      "'left' | 'center' | 'right'",
      "'center'",
    ],
    [
      'left',
      'Places text on the left; pass a number or CSS length to control the left offset.',
      'boolean | number | string',
      '-',
    ],
    [
      'right',
      'Places text on the right; pass a number or CSS length to control the right offset.',
      'boolean | number | string',
      '-',
    ],
    ['color', 'Custom divider line and label color.', 'string', '-'],
    ['character', 'Repeats a custom character to build the divider line.', 'string', '-'],
    ['dashed', 'Uses a dashed line, or a solid line when false.', 'boolean', 'true'],
    ['plain', 'Uses lighter label weight.', 'boolean', 'false'],
    ['vertical', 'Renders a vertical divider.', 'boolean', 'false'],
    ['children', 'Divider label or custom content.', 'ReactNode', '-'],
    ['className', 'Custom className.', 'string', '-'],
    ['style', 'Custom inline styles.', 'CSSProperties', '-'],
  ],
};
