// Generated from component types. Run pnpm docs:api after changing props.
import type { ApiSection, SiteLanguage } from '../../types';
import { gridApiRows as curated } from './curated/grid';
import { mergeApiSections } from './merge';
const generated: Record<SiteLanguage, ApiSection[]> = {
  zh: [
    {
      title: 'Grid',
      rows: [
        ['columns', '列定义，支持渲染、排序与筛选。', 'string | number', '1'],
        ['gap', '水印平铺间距。', 'GridGap | [GridGap, GridGap]', "'medium'"],
        ['minColumnWidth', 'minColumnWidth 的配置或回调。', 'string | number', '-'],
        ['inline', 'inline 的配置或回调。', 'boolean', '-'],
      ],
    },
    {
      title: 'Row',
      rows: [
        ['gutter', 'gutter 的配置或回调。', 'GridGap | [GridGap, GridGap]', '0'],
        [
          'align',
          'align 的配置或回调。',
          'import("C:/Users/icy/Documents/Codex/2026-10-17/https-github-com-icelemon233-cinna-design/work/cinna-design/node_modules/.pnpm/csstype@3.2.3/node_modules/csstype/index").Property.AlignItems',
          '-',
        ],
        [
          'justify',
          'justify 的配置或回调。',
          'import("C:/Users/icy/Documents/Codex/2026-10-17/https-github-com-icelemon233-cinna-design/work/cinna-design/node_modules/.pnpm/csstype@3.2.3/node_modules/csstype/index").Property.JustifyContent',
          '-',
        ],
        ['wrap', 'wrap 的配置或回调。', 'boolean', 'true'],
      ],
    },
    {
      title: 'Col',
      rows: [
        ['span', '占据的描述列数。', 'number', '24'],
        ['offset', 'offset 的配置或回调。', 'number', '0'],
        ['order', 'order 的配置或回调。', 'number', '-'],
        [
          'flex',
          'flex 的配置或回调。',
          'import("C:/Users/icy/Documents/Codex/2026-10-17/https-github-com-icelemon233-cinna-design/work/cinna-design/node_modules/.pnpm/csstype@3.2.3/node_modules/csstype/index").Property.Flex<string | number>',
          '-',
        ],
      ],
    },
  ],
  en: [
    {
      title: 'Grid',
      rows: [
        [
          'columns',
          'Column definitions with rendering, sorting and filtering.',
          'string | number',
          '1',
        ],
        ['gap', 'Watermark tile spacing.', 'GridGap | [GridGap, GridGap]', "'medium'"],
        ['minColumnWidth', 'Configuration or callback for minColumnWidth.', 'string | number', '-'],
        ['inline', 'Configuration or callback for inline.', 'boolean', '-'],
      ],
    },
    {
      title: 'Row',
      rows: [
        ['gutter', 'Configuration or callback for gutter.', 'GridGap | [GridGap, GridGap]', '0'],
        [
          'align',
          'Configuration or callback for align.',
          'import("C:/Users/icy/Documents/Codex/2026-10-17/https-github-com-icelemon233-cinna-design/work/cinna-design/node_modules/.pnpm/csstype@3.2.3/node_modules/csstype/index").Property.AlignItems',
          '-',
        ],
        [
          'justify',
          'Configuration or callback for justify.',
          'import("C:/Users/icy/Documents/Codex/2026-10-17/https-github-com-icelemon233-cinna-design/work/cinna-design/node_modules/.pnpm/csstype@3.2.3/node_modules/csstype/index").Property.JustifyContent',
          '-',
        ],
        ['wrap', 'Configuration or callback for wrap.', 'boolean', 'true'],
      ],
    },
    {
      title: 'Col',
      rows: [
        ['span', 'Number of description columns spanned.', 'number', '24'],
        ['offset', 'Configuration or callback for offset.', 'number', '0'],
        ['order', 'Configuration or callback for order.', 'number', '-'],
        [
          'flex',
          'Configuration or callback for flex.',
          'import("C:/Users/icy/Documents/Codex/2026-10-17/https-github-com-icelemon233-cinna-design/work/cinna-design/node_modules/.pnpm/csstype@3.2.3/node_modules/csstype/index").Property.Flex<string | number>',
          '-',
        ],
      ],
    },
  ],
};
export const gridApiRows = {
  zh: mergeApiSections(curated.zh, generated.zh),
  en: mergeApiSections(curated.en, generated.en),
};
