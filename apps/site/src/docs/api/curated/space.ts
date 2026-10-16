import type { ApiRow, SiteLanguage } from '../../../types';

export const spaceApiRows: Record<SiteLanguage, ApiRow[]> = {
  zh: [
    [
      'direction',
      '排列方向，horizontal 为横向排列，vertical 为纵向堆叠。',
      "'horizontal' | 'vertical'",
      "'horizontal'",
    ],
    [
      'size',
      '间距大小，支持 small、medium、large，或传入数字作为 px 间距。',
      "'small' | 'medium' | 'large' | number",
      "'medium'",
    ],
    ['align', '交叉轴对齐方式，对应 CSS align-items。', 'CSSProperties["alignItems"]', "'center'"],
    ['justify', '主轴分布方式，对应 CSS justify-content。', 'CSSProperties["justifyContent"]', '-'],
    ['wrap', '横向内容超出时是否自动换行。', 'boolean', 'false'],
    ['split', '相邻项之间插入的分隔元素。', 'ReactNode', '-'],
    ['block', '是否占满父容器宽度。', 'boolean', 'false'],
    ['children', '需要排列的内容。', 'ReactNode', '-'],
    ['className', '自定义 className。', 'string', '-'],
    ['style', '自定义样式。', 'CSSProperties', '-'],
  ],
  en: [
    [
      'direction',
      'Layout direction: horizontal rows or vertical stacks.',
      "'horizontal' | 'vertical'",
      "'horizontal'",
    ],
    [
      'size',
      'Spacing size using small, medium, large, or a numeric px value.',
      "'small' | 'medium' | 'large' | number",
      "'medium'",
    ],
    [
      'align',
      'Cross-axis alignment mapped to CSS align-items.',
      'CSSProperties["alignItems"]',
      "'center'",
    ],
    [
      'justify',
      'Main-axis distribution mapped to CSS justify-content.',
      'CSSProperties["justifyContent"]',
      '-',
    ],
    ['wrap', 'Allows horizontal content to wrap when space is limited.', 'boolean', 'false'],
    ['split', 'Separator inserted between neighboring items.', 'ReactNode', '-'],
    ['block', 'Expands the Space container to the full parent width.', 'boolean', 'false'],
    ['children', 'Items to arrange.', 'ReactNode', '-'],
    ['className', 'Custom className.', 'string', '-'],
    ['style', 'Custom inline styles.', 'CSSProperties', '-'],
  ],
};
