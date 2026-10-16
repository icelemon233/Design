import type { ApiSection, SiteLanguage } from '../../../types';

export const typographyApiRows: Record<SiteLanguage, ApiSection[]> = {
  zh: [
    {
      title: 'Typography',
      rows: [
        ['muted', '降低排版区域整体对比。', 'boolean', 'false'],
        ['compact', '使用更紧凑的段落间距。', 'boolean', 'false'],
      ],
    },
    {
      title: 'Title',
      rows: [
        ['level', '标题等级。', '1 | 2 | 3 | 4 | 5', '2'],
        ['muted', '降低标题对比。', 'boolean', 'false'],
        ['disabled', '展示禁用状态。', 'boolean', 'false'],
        [
          'ellipsis',
          '省略配置，支持 rows、expandable、moreText、lessText。',
          'boolean | object',
          '-',
        ],
        ['copyable', '复制配置，支持自定义复制文本和反馈文案。', 'boolean | object', '-'],
      ],
    },
    {
      title: 'Text',
      rows: [
        [
          'tone',
          '文本语义色。',
          "'default' | 'secondary' | 'muted' | 'info' | 'success' | 'warning' | 'error'",
          "'default'",
        ],
        ['strong', '加粗文本。', 'boolean', 'false'],
        ['code', '展示为代码文本。', 'boolean', 'false'],
        ['mark', '展示标记背景。', 'boolean', 'false'],
        ['delete', '展示删除线。', 'boolean', 'false'],
        ['underline', '展示下划线。', 'boolean', 'false'],
        ['disabled', '禁用文本或链接。', 'boolean', 'false'],
        ['link / href', '渲染为主题风格链接。', 'boolean | string', '-'],
        [
          'ellipsis',
          '省略配置，支持 rows、expandable、moreText、lessText。',
          'boolean | object',
          '-',
        ],
        ['copyable', '复制配置，支持自定义复制文本和反馈文案。', 'boolean | object', '-'],
      ],
    },
  ],
  en: [
    {
      title: 'Typography',
      rows: [
        ['muted', 'Reduces contrast across the typography area.', 'boolean', 'false'],
        ['compact', 'Uses tighter paragraph spacing.', 'boolean', 'false'],
      ],
    },
    {
      title: 'Title',
      rows: [
        ['level', 'Heading level.', '1 | 2 | 3 | 4 | 5', '2'],
        ['muted', 'Reduces heading contrast.', 'boolean', 'false'],
        ['disabled', 'Shows the disabled state.', 'boolean', 'false'],
        [
          'ellipsis',
          'Ellipsis config with rows, expandable, moreText, and lessText.',
          'boolean | object',
          '-',
        ],
        [
          'copyable',
          'Copy config with custom copied text and feedback label.',
          'boolean | object',
          '-',
        ],
      ],
    },
    {
      title: 'Text',
      rows: [
        [
          'tone',
          'Semantic text tone.',
          "'default' | 'secondary' | 'muted' | 'info' | 'success' | 'warning' | 'error'",
          "'default'",
        ],
        ['strong', 'Renders bold text.', 'boolean', 'false'],
        ['code', 'Renders code text.', 'boolean', 'false'],
        ['mark', 'Renders marked text.', 'boolean', 'false'],
        ['delete', 'Renders deleted text.', 'boolean', 'false'],
        ['underline', 'Renders underlined text.', 'boolean', 'false'],
        ['disabled', 'Disables text or links.', 'boolean', 'false'],
        ['link / href', 'Renders themed link text.', 'boolean | string', '-'],
        [
          'ellipsis',
          'Ellipsis config with rows, expandable, moreText, and lessText.',
          'boolean | object',
          '-',
        ],
        [
          'copyable',
          'Copy config with custom copied text and feedback label.',
          'boolean | object',
          '-',
        ],
      ],
    },
  ],
};
