import type { ApiSection, SiteLanguage } from '../../../types';

export const gridApiRows: Record<SiteLanguage, ApiSection[]> = {
  zh: [
    {
      title: 'Grid',
      rows: [
        [
          'columns',
          '固定列数，传入字符串时作为 CSS grid-template-columns 使用。',
          'number | string',
          '1',
        ],
        [
          'gap',
          '网格间距，支持预设、数字、CSS 长度，或 [水平, 垂直]。',
          "'small' | 'medium' | 'large' | number | string | array",
          "'medium'",
        ],
        [
          'minColumnWidth',
          '开启自适应列宽，列宽不小于该值，容器变窄时自动换行。',
          'number | string',
          '-',
        ],
        ['inline', '渲染为 inline-grid。', 'boolean', 'false'],
        ['children', '网格内容。', 'ReactNode', '-'],
        ['className', '自定义 className。', 'string', '-'],
        ['style', '自定义样式。', 'CSSProperties', '-'],
      ],
    },
    {
      title: 'Row',
      rows: [
        [
          'gutter',
          '栅格间距；数字或字符串表示水平间距，数组表示 [水平间距, 垂直间距]。',
          "number | string | 'small' | 'medium' | 'large' | array",
          '0',
        ],
        ['align', '交叉轴对齐方式，对应 CSS align-items。', 'CSSProperties["alignItems"]', '-'],
        [
          'justify',
          '主轴对齐方式，对应 CSS justify-content。',
          'CSSProperties["justifyContent"]',
          '-',
        ],
        ['wrap', '是否允许列自动换行。', 'boolean', 'true'],
        ['children', '仅建议直接放置 Col。', 'ReactNode', '-'],
        ['className', '自定义 className。', 'string', '-'],
        ['style', '自定义样式。', 'CSSProperties', '-'],
      ],
    },
    {
      title: 'Col',
      rows: [
        ['span', '列宽占位，按 24 等分计算。', 'number', '24'],
        ['offset', '列左侧偏移格数。', 'number', '0'],
        ['order', '列的视觉排序。', 'number', '-'],
        ['flex', '自定义 flex 布局属性。', 'CSSProperties["flex"]', '-'],
        ['children', '列内容。', 'ReactNode', '-'],
        ['className', '自定义 className。', 'string', '-'],
        ['style', '自定义样式。', 'CSSProperties', '-'],
      ],
    },
  ],
  en: [
    {
      title: 'Grid',
      rows: [
        [
          'columns',
          'Fixed column count, or a CSS grid-template-columns string.',
          'number | string',
          '1',
        ],
        [
          'gap',
          'Grid spacing with presets, numbers, CSS lengths, or [horizontal, vertical].',
          "'small' | 'medium' | 'large' | number | string | array",
          "'medium'",
        ],
        [
          'minColumnWidth',
          'Enables adaptive columns with this minimum width before wrapping.',
          'number | string',
          '-',
        ],
        ['inline', 'Renders as inline-grid.', 'boolean', 'false'],
        ['children', 'Grid content.', 'ReactNode', '-'],
        ['className', 'Custom className.', 'string', '-'],
        ['style', 'Custom inline styles.', 'CSSProperties', '-'],
      ],
    },
    {
      title: 'Row',
      rows: [
        [
          'gutter',
          'Grid gutter. Number or string sets horizontal spacing; array sets [horizontal, vertical].',
          "number | string | 'small' | 'medium' | 'large' | array",
          '0',
        ],
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
        ['wrap', 'Allows columns to wrap.', 'boolean', 'true'],
        ['children', 'Use Col as direct children.', 'ReactNode', '-'],
        ['className', 'Custom className.', 'string', '-'],
        ['style', 'Custom inline styles.', 'CSSProperties', '-'],
      ],
    },
    {
      title: 'Col',
      rows: [
        ['span', 'Column width measured on a 24-column grid.', 'number', '24'],
        ['offset', 'Grid columns reserved on the left.', 'number', '0'],
        ['order', 'Visual order of the column.', 'number', '-'],
        ['flex', 'Custom flex layout property.', 'CSSProperties["flex"]', '-'],
        ['children', 'Column content.', 'ReactNode', '-'],
        ['className', 'Custom className.', 'string', '-'],
        ['style', 'Custom inline styles.', 'CSSProperties', '-'],
      ],
    },
  ],
};
