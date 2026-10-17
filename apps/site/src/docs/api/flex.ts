// Generated from component types. Run pnpm docs:api after changing props.
import type { ApiSection, SiteLanguage } from '../../types';
import { flexApiRows as curated } from './curated/flex';
import { mergeApiSections } from './merge';
const generated: Record<SiteLanguage, ApiSection[]> = {
  zh: [
    {
      title: 'Flex',
      rows: [
        ['vertical', 'vertical 的配置或回调。', 'boolean', '-'],
        ['align', 'align 的配置或回调。', "React.CSSProperties['alignItems']", '-'],
        ['justify', 'justify 的配置或回调。', "React.CSSProperties['justifyContent']", '-'],
        ['gap', '项目或平铺之间的间距。', 'CinnaSize | number', "'medium'"],
        ['wrap', 'wrap 的配置或回调。', 'boolean', '-'],
        ['inline', 'inline 的配置或回调。', 'boolean', '-'],
      ],
    },
  ],
  en: [
    {
      title: 'Flex',
      rows: [
        ['vertical', 'Configuration or callback for vertical.', 'boolean', '-'],
        ['align', 'Configuration or callback for align.', "React.CSSProperties['alignItems']", '-'],
        [
          'justify',
          'Configuration or callback for justify.',
          "React.CSSProperties['justifyContent']",
          '-',
        ],
        ['gap', 'Spacing between items or tiles.', 'CinnaSize | number', "'medium'"],
        ['wrap', 'Configuration or callback for wrap.', 'boolean', '-'],
        ['inline', 'Configuration or callback for inline.', 'boolean', '-'],
      ],
    },
  ],
};
export const flexApiRows = {
  zh: mergeApiSections(curated.zh, generated.zh),
  en: mergeApiSections(curated.en, generated.en),
};
