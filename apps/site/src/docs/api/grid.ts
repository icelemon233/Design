// Generated from component types. Run pnpm docs:api after changing props.
import type { ApiSection, SiteLanguage } from '../../types';
import { gridApiRows as curated } from './curated/grid';
import { mergeApiSections } from './merge';
const generated: Record<SiteLanguage, ApiSection[]> = {
  zh: [
    {
      title: 'Grid',
      rows: [
        ['columns', '列定义，支持渲染、排序与筛选。', 'number | string', '1'],
        ['gap', '项目或平铺之间的间距。', 'GridGap | [GridGap, GridGap]', "'medium'"],
        ['minColumnWidth', 'minColumnWidth 的配置或回调。', 'number | string', '-'],
        ['inline', 'inline 的配置或回调。', 'boolean', '-'],
      ],
    },
    {
      title: 'Row',
      rows: [
        ['gutter', 'gutter 的配置或回调。', 'GridGap | [GridGap, GridGap]', '0'],
        ['align', 'align 的配置或回调。', "React.CSSProperties['alignItems']", '-'],
        ['justify', 'justify 的配置或回调。', "React.CSSProperties['justifyContent']", '-'],
        ['wrap', 'wrap 的配置或回调。', 'boolean', 'true'],
      ],
    },
    {
      title: 'Col',
      rows: [
        ['span', '占据的列数。', 'number', '24'],
        ['offset', 'offset 的配置或回调。', 'number', '0'],
        ['order', 'order 的配置或回调。', 'number', '-'],
        ['flex', 'flex 的配置或回调。', "React.CSSProperties['flex']", '-'],
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
          'number | string',
          '1',
        ],
        ['gap', 'Spacing between items or tiles.', 'GridGap | [GridGap, GridGap]', "'medium'"],
        ['minColumnWidth', 'Configuration or callback for minColumnWidth.', 'number | string', '-'],
        ['inline', 'Configuration or callback for inline.', 'boolean', '-'],
      ],
    },
    {
      title: 'Row',
      rows: [
        ['gutter', 'Configuration or callback for gutter.', 'GridGap | [GridGap, GridGap]', '0'],
        ['align', 'Configuration or callback for align.', "React.CSSProperties['alignItems']", '-'],
        [
          'justify',
          'Configuration or callback for justify.',
          "React.CSSProperties['justifyContent']",
          '-',
        ],
        ['wrap', 'Configuration or callback for wrap.', 'boolean', 'true'],
      ],
    },
    {
      title: 'Col',
      rows: [
        ['span', 'Number of columns spanned.', 'number', '24'],
        ['offset', 'Configuration or callback for offset.', 'number', '0'],
        ['order', 'Configuration or callback for order.', 'number', '-'],
        ['flex', 'Configuration or callback for flex.', "React.CSSProperties['flex']", '-'],
      ],
    },
  ],
};
export const gridApiRows = {
  zh: mergeApiSections(curated.zh, generated.zh),
  en: mergeApiSections(curated.en, generated.en),
};
