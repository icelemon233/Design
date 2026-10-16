import type { ApiRow, SiteLanguage } from '../../../types';

export const flexApiRows: Record<SiteLanguage, ApiRow[]> = {
  zh: [
    ['vertical', '切换为垂直方向排列。', 'boolean', 'false'],
    ['align', '交叉轴对齐方式，对应 CSS align-items。', 'CSSProperties["alignItems"]', '-'],
    ['justify', '主轴对齐方式，对应 CSS justify-content。', 'CSSProperties["justifyContent"]', '-'],
    [
      'gap',
      '元素间距，支持预设尺寸或像素数值。',
      "'small' | 'medium' | 'large' | number",
      "'medium'",
    ],
    ['wrap', '内容超出时自动换行。', 'boolean', 'false'],
    ['inline', '渲染为 inline-flex。', 'boolean', 'false'],
    ['children', '布局内容。', 'ReactNode', '-'],
    ['className', '自定义 className。', 'string', '-'],
    ['style', '自定义样式。', 'CSSProperties', '-'],
  ],
  en: [
    ['vertical', 'Switches the main axis to vertical.', 'boolean', 'false'],
    [
      'align',
      'Cross-axis alignment mapped to CSS align-items.',
      'CSSProperties["alignItems"]',
      '-',
    ],
    [
      'justify',
      'Main-axis alignment mapped to CSS justify-content.',
      'CSSProperties["justifyContent"]',
      '-',
    ],
    [
      'gap',
      'Spacing between items, using presets or a pixel number.',
      "'small' | 'medium' | 'large' | number",
      "'medium'",
    ],
    ['wrap', 'Allows items to wrap when space is limited.', 'boolean', 'false'],
    ['inline', 'Renders as inline-flex.', 'boolean', 'false'],
    ['children', 'Layout content.', 'ReactNode', '-'],
    ['className', 'Custom className.', 'string', '-'],
    ['style', 'Custom inline styles.', 'CSSProperties', '-'],
  ],
};
